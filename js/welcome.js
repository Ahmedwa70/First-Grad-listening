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

  _count(n) {
    const f = ['حرف واحد', 'حرفان', 'ثلاثة حروف', 'أربعة حروف',
               'خمسة حروف', 'ستة حروف', 'سبعة حروف', 'ثمانية حروف'];
    return f[n - 1] || n + ' حروف';
  },

  // كل بطاقة تأخذ لون حرفها الأول نبرةً لها — فالشبكة تصير متنوّعة
  // بألوان الدروس نفسها لا لوناً واحداً مكرّراً سبع مرات.
  _card(rec) {
    const id = String(rec.meta.number || 0).padStart(2, '0');
    const letters = rec.letters || [];
    const tone = (letters[0] && letters[0].color) || 'var(--gold)';
    const chips = letters.map((l, i) =>
      `<span class="wl-letter" style="--lc:${this._esc(l.color) || 'var(--gold)'};--i:${i}">${this._esc(l.char)}</span>`
    ).join('');
    return `
      <a class="wl-card" href="lecture.html?lesson=${id}" style="--tone:${this._esc(tone)}">
        <span class="wl-ghost" aria-hidden="true">${id}</span>
        <header class="wl-head">
          <h2 class="wl-name">${this._esc(rec.meta.title)}</h2>
          <span class="wl-count">${this._count(letters.length)}</span>
        </header>
        <div class="wl-letters">${chips}</div>
        <span class="wl-go">ابدأ <span class="wl-arrow" aria-hidden="true">◂</span></span>
      </a>`;
  },

  // أرقام الترويسة تُحسب مما قُرئ، لا تُكتب يدوياً.
  _stats(lessons, letters) {
    const box = document.getElementById('wel-stats');
    const a = document.getElementById('stat-lessons');
    const b = document.getElementById('stat-letters');
    const ar = (n) => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
    if (a) a.textContent = ar(lessons);
    if (b) b.textContent = ar(letters);
    if (box) box.hidden = false;
  },

  async run() {
    const grid = document.getElementById('wel-grid');
    const loading = document.getElementById('wel-loading');
    const empty = document.getElementById('wel-empty');
    let shown = 0;

    let letters = 0;
    for (let n = 1; n <= this.TOTAL; n++) {
      const r = await this.readLesson(n);
      if (!r || !r.ok || !r.meta) continue;      // درس لم يُبنَ بعد — لا يُعرض
      grid.insertAdjacentHTML('beforeend', this._card(r));
      letters += (r.letters || []).length;
      shown++;
      if (shown === 1) loading.hidden = true;     // أول بطاقة تُنهي الانتظار
    }

    loading.hidden = true;
    if (!shown) { empty.hidden = false; return; }

    this._stats(shown, letters);
    const next = document.getElementById('wel-next');
    if (next) next.hidden = false;
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
