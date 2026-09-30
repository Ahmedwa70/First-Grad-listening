/**
 * js/dash-store.js — طبقة التخزين للوحة التحكم.
 *
 * مسؤولية واحدة: إيصال ملف إلى مساره داخل المشروع. لا فحص ولا واجهة.
 *
 * وضعان، يُختار الأنسب تلقائياً:
 *   direct    — الكتابة في مجلد المشروع مباشرة (File System Access API).
 *               يحتاج سياقاً موثوقاً (خادم محلي) وإذناً من المعلم مرة واحدة.
 *   download  — تنزيل الملف بالاسم الصحيح ليضعه المعلم بنفسه.
 *               يعمل في كل مكان، وهو الملاذ حين يتعذّر الأول.
 *
 * مقبض المجلد يُحفظ في IndexedDB، فالإذن يبقى بعد إغلاق الصفحة ولا
 * يُطلب في كل مرة. المتصفح وحده يملك إبطاله.
 */
'use strict';

const DashStore = {
  DB_NAME: 'fusaha-dashboard',
  DB_STORE: 'handles',
  KEY_ROOT: 'project-root',

  // علامات تُثبت أن المجلد المختار هو جذر المشروع لا مجلداً آخر.
  SIGNATURE_FILES: ['lecture.html'],
  SIGNATURE_DIRS: ['assets', 'js'],

  mode: 'download',
  root: null,

  supported() {
    return typeof window.showDirectoryPicker === 'function' && window.isSecureContext;
  },

  // ── IndexedDB: حفظ مقبض المجلد بين الجلسات ──────────────────
  _db() {
    return new Promise((resolve, reject) => {
      let req;
      try { req = indexedDB.open(this.DB_NAME, 1); } catch (e) { reject(e); return; }
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(this.DB_STORE)) db.createObjectStore(this.DB_STORE);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },

  async _put(key, value) {
    try {
      const db = await this._db();
      await new Promise((res, rej) => {
        const tx = db.transaction(this.DB_STORE, 'readwrite');
        tx.objectStore(this.DB_STORE).put(value, key);
        tx.oncomplete = res;
        tx.onerror = () => rej(tx.error);
      });
      db.close();
    } catch (e) { /* الحفظ رفاهية لا شرط */ }
  },

  async _get(key) {
    try {
      const db = await this._db();
      const out = await new Promise((res, rej) => {
        const tx = db.transaction(this.DB_STORE, 'readonly');
        const r = tx.objectStore(this.DB_STORE).get(key);
        r.onsuccess = () => res(r.result || null);
        r.onerror = () => rej(r.error);
      });
      db.close();
      return out;
    } catch (e) { return null; }
  },

  async forget() {
    this.root = null;
    this.mode = 'download';
    await this._put(this.KEY_ROOT, null);
  },

  // ── الأذونات ────────────────────────────────────────────────
  async _permission(handle, interactive) {
    const opts = { mode: 'readwrite' };
    try {
      if ((await handle.queryPermission(opts)) === 'granted') return true;
      if (!interactive) return false;
      return (await handle.requestPermission(opts)) === 'granted';
    } catch (e) { return false; }
  },

  // ── التحقّق أن المجلد هو جذر المشروع ────────────────────────
  async verifyRoot(handle) {
    try {
      for (const f of this.SIGNATURE_FILES) await handle.getFileHandle(f);
      for (const d of this.SIGNATURE_DIRS) await handle.getDirectoryHandle(d);
      return true;
    } catch (e) { return false; }
  },

  // ── استعادة إذن سابق بلا مقاطعة المعلم ──────────────────────
  async restore() {
    if (!this.supported()) { this.mode = 'download'; return false; }
    const handle = await this._get(this.KEY_ROOT);
    if (!handle) return false;
    if (!(await this._permission(handle, false))) return false;
    if (!(await this.verifyRoot(handle))) return false;
    this.root = handle;
    this.mode = 'direct';
    return true;
  },

  // ── طلب المجلد من المعلم ────────────────────────────────────
  async connect() {
    if (!this.supported()) {
      return { ok: false, reason: 'unsupported' };
    }
    let handle;
    try {
      handle = await window.showDirectoryPicker({ id: 'fusaha-root', mode: 'readwrite' });
    } catch (e) {
      return { ok: false, reason: e && e.name === 'AbortError' ? 'cancelled' : 'picker-failed' };
    }
    if (!(await this._permission(handle, true))) return { ok: false, reason: 'denied' };
    if (!(await this.verifyRoot(handle))) return { ok: false, reason: 'wrong-folder' };

    this.root = handle;
    this.mode = 'direct';
    await this._put(this.KEY_ROOT, handle);
    return { ok: true, name: handle.name };
  },

  // ── الكتابة ─────────────────────────────────────────────────
  // path مسار نسبي مثل assets/audio/lesson-02/jeem.mp3
  async write(path, blob) {
    if (this.mode !== 'direct' || !this.root) return { ok: false, reason: 'not-connected' };
    const parts = String(path).split('/').filter(Boolean);
    const name = parts.pop();
    if (!name) return { ok: false, reason: 'bad-path' };
    try {
      let dir = this.root;
      for (const p of parts) dir = await dir.getDirectoryHandle(p, { create: true });
      const fh = await dir.getFileHandle(name, { create: true });
      const w = await fh.createWritable();
      await w.write(blob);
      await w.close();
      return { ok: true, path };
    } catch (e) {
      return { ok: false, reason: 'write-failed', detail: String(e && e.message) };
    }
  },

  // ── الملاذ: تنزيل بالاسم الصحيح ─────────────────────────────
  download(fileName, blob) {
    try {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
      return { ok: true, downloaded: true };
    } catch (e) {
      return { ok: false, reason: 'download-failed' };
    }
  },

  // ── الواجهة الموحّدة التي تستعملها اللوحة ────────────────────
  async deliver(path, blob) {
    if (this.mode === 'direct') {
      const r = await this.write(path, blob);
      if (r.ok) return { ok: true, placed: true, path };
      // فشل الكتابة رغم الاتصال — لا نترك المعلم بلا مخرج.
      const d = this.download(path.split('/').pop(), blob);
      return d.ok ? { ok: true, placed: false, fallback: true, reason: r.reason }
                  : { ok: false, reason: r.reason };
    }
    const d = this.download(path.split('/').pop(), blob);
    return d.ok ? { ok: true, placed: false } : { ok: false, reason: 'download-failed' };
  },
};
