/**
 * js/welcome.js — صفحة الدروس (الصفحة الرئيسية للزائر).
 *
 * المعمارية نفسها التي تستعملها لوحة التحكم، بلا تكرار:
 * الدروس تُقرأ عبر js/lesson-reader.html في إطار معزول، لأن كل ملف
 * درس يُعرّف `const LESSON` فلا يجتمع درسان في صفحة واحدة.
 *
 * الصفحة تقرأ الحقيقة ولا تحفظ قائمة مكتوبة: درس يُضاف يظهر وحده،
 * ودرس يُحذف يختفي وحده. لا رقم ثابت يكذب مع الوقت.
 *
 * ولا تفحص الوسائط إطلاقاً — ذلك شأن لوحة التحكم، والزائر لا يعنيه.
 */
'use strict';

const Welcome = {
  TOTAL: 16,
  READ_TIMEOUT: 8000,
  _frame: null,

  readLesson(n) {
    const id = String(n).padStart(2, '0');
    return new Promise(resolve => {
      let done = false;
      const finish = (payload) => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        window.removeEventListener('message', onMessage);
        resolve(payload);
      };
      const onMessage = (e) => {
        const d = e.data;
        if (!d || typeof d !== 'object' || d.n !== id) return;
        finish(d);
      };
      const timer = setTimeout(() => finish({ ok: false }), this.READ_TIMEOUT);
      window.addEventListener('message', onMessage);
      this._frame.src = 'js/lesson-reader.html?n=' + id;
    });
  },

  _esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  },

  _card(rec) {
    const id = String(rec.meta.number || 0).padStart(2, '0');
    const chips = (rec.letters || []).map(l =>
      `<span class="wl-letter" style="--lc:${this._esc(l.color) || 'var(--gold)'}">${this._esc(l.char)}</span>`
    ).join('');
    return `
      <a class="wl-card" href="lecture.html?lesson=${id}">
        <span class="wl-num">${id}</span>
        <h2 class="wl-name">${this._esc(rec.meta.title)}</h2>
        <div class="wl-letters">${chips}</div>
        <span class="wl-go">ابدأ الدرس <span aria-hidden="true">▸</span></span>
      </a>`;
  },

  async run() {
    const grid = document.getElementById('wel-grid');
    const loading = document.getElementById('wel-loading');
    const empty = document.getElementById('wel-empty');
    let shown = 0;

    for (let n = 1; n <= this.TOTAL; n++) {
      const r = await this.readLesson(n);
      if (!r || !r.ok || !r.meta) continue;      // درس لم يُبنَ بعد — لا يُعرض
      grid.insertAdjacentHTML('beforeend', this._card(r));
      shown++;
      if (shown === 1) loading.hidden = true;     // أول بطاقة تُنهي الانتظار
    }

    loading.hidden = true;
    if (!shown) empty.hidden = false;
  },

  // ── مبدّل الوضع ─────────────────────────────────────────────
  // نفس مفتاح lesson-theme الذي تستعمله المحاضرة ولوحة التحكم،
  // ونفس السلوك: الليلي هو الافتراضي فلا يُخزَّن، والنهاري يُخزَّن.
  // الزر لا يحتفظ بحالة خاصة به — يقرؤها من <html> في كل مرة.
  _syncTheme() {
    const light = document.documentElement.dataset.theme === 'light';
    const btn = document.getElementById('wel-theme');
    const label = document.getElementById('wel-theme-label');
    if (!btn) return;
    const text = light ? 'التبديل إلى الوضع الليلي' : 'التبديل إلى الوضع النهاري';
    btn.setAttribute('aria-pressed', String(light));
    btn.setAttribute('aria-label', text);
    btn.setAttribute('title', text);
    if (label) label.textContent = text;
  },

  _bindTheme() {
    const btn = document.getElementById('wel-theme');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const html = document.documentElement;
      if (html.dataset.theme === 'light') {
        html.removeAttribute('data-theme');
        try { localStorage.removeItem('lesson-theme'); } catch (e) {}
      } else {
        html.dataset.theme = 'light';
        try { localStorage.setItem('lesson-theme', 'light'); } catch (e) {}
      }
      this._syncTheme();
    });
    this._syncTheme();
  },

  init() {
    this._bindTheme();

    const f = document.createElement('iframe');
    f.className = 'wel-reader';
    f.setAttribute('aria-hidden', 'true');
    f.setAttribute('tabindex', '-1');
    document.body.appendChild(f);
    this._frame = f;
    this.run();
  },
};

document.addEventListener('DOMContentLoaded', () => Welcome.init());
