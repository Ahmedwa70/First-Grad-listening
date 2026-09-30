/**
 * js/dashboard.js — لوحة التحكم: فحص وعرض.
 *
 * المنهج: لا اختراع. اللوحة تقرأ ما يقرؤه المشروع نفسه، وتتحقق من الملفات
 * بالطريقة التي يتحقق بها المتصفح وقت الدرس — فما تراه هنا هو ما سيحدث
 * في الفصل حرفياً.
 *
 *  ١ — بيانات الدرس: تُقرأ داخل js/lesson-reader.html في إطار مخفي، لأن كل
 *      ملف درس يُعرّف `const LESSON` فلا يجتمع درسان في صفحة واحدة.
 *  ٢ — مسار الوسائط: يُشتق في القارئ بنفس قاعدة _lessonAudioDir في app.js.
 *  ٣ — وجود الملف: يُفحص بقراءة ترويسته فقط (preload=metadata) بلا تشغيل،
 *      وهي الآلية نفسها التي يستعملها MediaCheck داخل المحاضرة.
 */
'use strict';

const Dash = {
  TOTAL: 16,
  PROBE_CONCURRENCY: 10,
  PROBE_TIMEOUT: 6000,
  READ_TIMEOUT: 8000,

  lessons: [],
  filter: 'all',
  _frame: null,

  // ── قراءة درس واحد في إطار معزول ─────────────────────────────
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
      const timer = setTimeout(() => finish({ ok: false, reason: 'timeout' }), this.READ_TIMEOUT);
      window.addEventListener('message', onMessage);
      this._frame.src = 'js/lesson-reader.html?n=' + id;
    });
  },

  // ── فحص وجود ملف واحد ────────────────────────────────────────
  probe(src, tag) {
    return new Promise(resolve => {
      let settled = false;
      const el = document.createElement(tag);
      const finish = (ok) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        el.onloadedmetadata = el.onerror = null;
        try { el.removeAttribute('src'); el.load(); } catch (e) {}
        resolve(ok);
      };
      // عند المهلة يُفترض الوجود: إنذار كاذب أسوأ من صمت.
      const timer = setTimeout(() => finish(true), this.PROBE_TIMEOUT);
      el.preload = 'metadata';
      el.muted = true;
      el.onloadedmetadata = () => finish(true);
      el.onerror = () => finish(false);
      try { el.src = src; } catch (e) { finish(true); }
    });
  },

  async probeAll(items) {
    const out = new Array(items.length);
    let i = 0;
    const worker = async () => {
      while (i < items.length) {
        const k = i++;
        out[k] = await this.probe(items[k].src, items[k].tag);
      }
    };
    await Promise.all(
      Array.from({ length: Math.min(this.PROBE_CONCURRENCY, items.length) }, worker)
    );
    return out;
  },

  // ── الفحص الكامل ─────────────────────────────────────────────
  async scan() {
    this.lessons = [];
    this._showScanning(0, 'جارٍ قراءة بيانات الدروس…');

    const read = [];
    for (let n = 1; n <= this.TOTAL; n++) {
      read.push(await this.readLesson(n));
      this._showScanning((n / this.TOTAL) * 0.45, `قُرئ ${n} من ${this.TOTAL}`);
    }

    // لو فشلت القراءة كلها فالسبب بيئة الفتح لا المشروع.
    if (read.every(r => !r.ok && r.reason !== 'not-built')) {
      this._showBlocked();
      return;
    }

    const queue = [];
    read.forEach(r => {
      if (!r.ok) {
        this.lessons.push({ n: Number(r.n), built: false });
        return;
      }
      const rec = {
        n: r.meta.number || Number(r.n),
        built: true,
        meta: r.meta,
        letters: r.letters || [],
        audio: r.audio.map(src => ({ src, ok: null })),
        video: r.video.map(src => ({ src, ok: null })),
      };
      this.lessons.push(rec);
      rec.audio.forEach(x => queue.push({ src: x.src, tag: 'audio', ref: x }));
      rec.video.forEach(x => queue.push({ src: x.src, tag: 'video', ref: x }));
    });

    this.lessons.sort((a, b) => a.n - b.n);
    this._showScanning(0.5, `جارٍ فحص ${queue.length} ملفاً…`);

    const results = await this.probeAll(queue);
    queue.forEach((q, k) => { q.ref.ok = results[k]; });

    this._showScanning(1, 'اكتمل');
    this.render();
  },

  // ── حسابات العرض ─────────────────────────────────────────────
  _tally(rec) {
    const c = (arr) => ({ have: arr.filter(x => x.ok).length, total: arr.length });
    const a = c(rec.audio), v = c(rec.video);
    return { audio: a, video: v, have: a.have + v.have, total: a.total + v.total };
  },

  _status(rec) {
    if (!rec.built) return 'unbuilt';
    const t = this._tally(rec);
    if (t.total === 0) return 'empty';
    return t.have === t.total ? 'complete' : 'incomplete';
  },

  // ── الرسم ────────────────────────────────────────────────────
  render() {
    const built = this.lessons.filter(l => l.built);
    const totals = built.reduce((acc, l) => {
      const t = this._tally(l);
      acc.aHave += t.audio.have; acc.aTotal += t.audio.total;
      acc.vHave += t.video.have; acc.vTotal += t.video.total;
      if (t.total > 0 && t.have === t.total) acc.done++;
      return acc;
    }, { aHave: 0, aTotal: 0, vHave: 0, vTotal: 0, done: 0 });

    const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
    set('stat-lessons', `${built.length} / ${this.TOTAL}`);
    set('stat-lessons-meta', built.length < this.TOTAL ? `${this.TOTAL - built.length} لم تُبنَ بعد` : 'الكل مبنيّ');
    set('stat-complete', `${totals.done} / ${built.length}`);
    set('stat-complete-meta', totals.done === built.length ? 'لا ينقص شيء' : `${built.length - totals.done} تحتاج ملفات`);
    set('stat-audio', `${totals.aHave} / ${totals.aTotal}`);
    set('stat-audio-meta', this._plural(totals.aTotal - totals.aHave, ['ملف ناقص', 'ملفان ناقصان', 'ملفات ناقصة', 'ملفاً ناقصاً']));
    set('stat-video', `${totals.vHave} / ${totals.vTotal}`);
    set('stat-video-meta', this._plural(totals.vTotal - totals.vHave, ['مقطع ناقص', 'مقطعان ناقصان', 'مقاطع ناقصة', 'مقطعاً ناقصاً']));

    if (typeof DashUpload !== 'undefined' && !this._uploadReady) {
      this._uploadReady = true;
      DashUpload.init();
    }
    document.getElementById('dash-scanning').hidden = true;
    document.getElementById('dash-summary').hidden = false;
    document.getElementById('dash-filters').hidden = false;

    const grid = document.getElementById('dash-grid');
    grid.innerHTML = this.lessons.map(l => this._card(l)).join('');
    this._applyFilter();
  },

  _plural(n, forms) {
    if (n === 0) return 'مكتمل';
    if (n === 1) return forms[0];
    if (n === 2) return forms[1];
    return n + ' ' + (n <= 10 ? forms[2] : forms[3]);
  },

  _esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  },

  _bar(label, have, total) {
    if (!total) return '';
    const pct = Math.round((have / total) * 100);
    const state = have === total ? 'full' : have === 0 ? 'none' : 'part';
    return `
      <div class="dl-bar" data-state="${state}">
        <div class="dl-bar-head"><span>${label}</span><span class="dl-bar-num">${have}/${total}</span></div>
        <div class="dl-bar-track"><div class="dl-bar-fill" style="inline-size:${pct}%"></div></div>
      </div>`;
  },

  // كل ملف ناقص خانة رفع قائمة بذاتها: اسمها هو الوجهة، فلا يكتب
  // المعلم اسماً ولا يفتح مجلداً. السلوك يُركَّب في js/dash-upload.js،
  // وإن غاب ذلك الملف تبقى الخانات قائمة تعرض الأسماء والمجلدات.
  _missingList(rec) {
    const group = (arr, icon, label, kind) => {
      const miss = arr.filter(x => !x.ok).map(x => x.src);
      if (!miss.length) return '';
      const dir = miss[0].slice(0, miss[0].lastIndexOf('/') + 1);
      return `
        <div class="dl-miss-group">
          <div class="dl-miss-head"><span>${icon} ${label} — ${miss.length}</span><code>${this._esc(dir)}</code></div>
          <ul class="dl-miss-list">${miss.map(m => `
            <li class="dl-slot" data-path="${this._esc(m)}" data-kind="${kind}" data-state="idle" tabindex="0" role="button">
              <span class="slot-name">${this._esc(m.slice(m.lastIndexOf('/') + 1))}</span>
              <span class="slot-cue">اسحب الملف هنا أو انقر للاختيار</span>
              <span class="slot-state"></span>
            </li>`).join('')}</ul>
        </div>`;
    };
    return group(rec.audio, '🔊', 'الصوت', 'audio')
         + group(rec.video, '🎬', 'الفيديو', 'video');
  },

  // يُستدعى بعد حفظ ملف في مكانه: تُحدَّث البيانات والبطاقة والخلاصة
  // في مكانها بلا إعادة فحص — فالحقيقة معروفة يقيناً لحظتَها.
  markResolved(path) {
    let rec = null;
    for (const l of this.lessons) {
      if (!l.built) continue;
      const hit = [...l.audio, ...l.video].find(x => x.src === path);
      if (hit) { hit.ok = true; rec = l; break; }
    }
    if (!rec) return;

    const card = document.querySelector(`.dl-card[data-lesson="${String(rec.n).padStart(2, '0')}"]`);
    if (card) {
      const t = this._tally(rec);
      const status = this._status(rec);
      card.dataset.status = status;
      const chip = card.querySelector('.dl-status');
      if (chip) {
        chip.textContent = status === 'complete' ? 'مكتمل'
          : this._plural(t.total - t.have, ['ملف ناقص', 'ملفان ناقصان', 'ملفات ناقصة', 'ملفاً ناقصاً']);
      }
      const pairs = [t.audio, t.video].filter(x => x.total);
      card.querySelectorAll('.dl-bar').forEach((bar, i) => {
        const p = pairs[i];
        if (!p) return;
        bar.dataset.state = p.have === p.total ? 'full' : p.have === 0 ? 'none' : 'part';
        const num = bar.querySelector('.dl-bar-num');
        if (num) num.textContent = `${p.have}/${p.total}`;
        const fill = bar.querySelector('.dl-bar-fill');
        if (fill) fill.style.inlineSize = Math.round((p.have / p.total) * 100) + '%';
      });
    }
    this._refreshSummary();
    this._applyFilter();
  },

  _refreshSummary() {
    const built = this.lessons.filter(l => l.built);
    const t = built.reduce((a, l) => {
      const x = this._tally(l);
      a.aHave += x.audio.have; a.aTotal += x.audio.total;
      a.vHave += x.video.have; a.vTotal += x.video.total;
      if (x.total > 0 && x.have === x.total) a.done++;
      return a;
    }, { aHave: 0, aTotal: 0, vHave: 0, vTotal: 0, done: 0 });
    const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
    set('stat-complete', `${t.done} / ${built.length}`);
    set('stat-complete-meta', t.done === built.length ? 'لا ينقص شيء' : `${built.length - t.done} تحتاج ملفات`);
    set('stat-audio', `${t.aHave} / ${t.aTotal}`);
    set('stat-audio-meta', this._plural(t.aTotal - t.aHave, ['ملف ناقص', 'ملفان ناقصان', 'ملفات ناقصة', 'ملفاً ناقصاً']));
    set('stat-video', `${t.vHave} / ${t.vTotal}`);
    set('stat-video-meta', this._plural(t.vTotal - t.vHave, ['مقطع ناقص', 'مقطعان ناقصان', 'مقاطع ناقصة', 'مقطعاً ناقصاً']));
  },

  _card(rec) {
    const id = String(rec.n).padStart(2, '0');
    const status = this._status(rec);

    if (!rec.built) {
      return `
        <article class="dl-card" data-status="unbuilt" data-lesson="${id}">
          <header class="dl-head">
            <span class="dl-badge">${id}</span>
            <div class="dl-titles"><h2 class="dl-title">الدرس ${id}</h2>
              <p class="dl-sub">لم يُبنَ بعد</p></div>
          </header>
          <p class="dl-empty-note">لا يوجد ملف بيانات لهذا الدرس.</p>
        </article>`;
    }

    const t = this._tally(rec);
    const chips = rec.letters.map(l =>
      `<span class="dl-letter" style="--lc:${this._esc(l.color) || 'var(--gold)'}">${this._esc(l.char)}</span>`
    ).join('');

    const statusText = status === 'complete' ? 'مكتمل'
      : status === 'empty' ? 'لا وسائط'
      : this._plural(t.total - t.have, ['ملف ناقص', 'ملفان ناقصان', 'ملفات ناقصة', 'ملفاً ناقصاً']);

    const details = status === 'incomplete' ? `
      <details class="dl-details">
        <summary>عرض الأسماء الناقصة</summary>
        <div class="dl-miss">${this._missingList(rec)}</div>
      </details>` : '';

    return `
      <article class="dl-card" data-status="${status}" data-lesson="${id}">
        <header class="dl-head">
          <span class="dl-badge">${id}</span>
          <div class="dl-titles">
            <h2 class="dl-title">${this._esc(rec.meta.title)}</h2>
            <p class="dl-sub">${this._esc(rec.meta.subtitle)}</p>
          </div>
          <span class="dl-status">${statusText}</span>
        </header>

        <div class="dl-letters">${chips}</div>

        <div class="dl-bars">
          ${this._bar('الصوت', t.audio.have, t.audio.total)}
          ${this._bar('الفيديو', t.video.have, t.video.total)}
        </div>

        ${details}

        <footer class="dl-actions">
          <a class="dl-open" href="lecture.html?lesson=${id}" target="_blank" rel="noopener">افتح الدرس ▸</a>
        </footer>
      </article>`;
  },

  _applyFilter() {
    document.querySelectorAll('.dl-card').forEach(card => {
      const s = card.dataset.status;
      const show = this.filter === 'all'
        || (this.filter === 'incomplete' && (s === 'incomplete' || s === 'empty'))
        || (this.filter === 'complete' && s === 'complete')
        || (this.filter === 'unbuilt' && s === 'unbuilt');
      card.hidden = !show;
    });
  },

  // ── حالات الواجهة ────────────────────────────────────────────
  _showScanning(ratio, note) {
    const box = document.getElementById('dash-scanning');
    if (box) box.hidden = false;
    const fill = document.getElementById('dash-scan-fill');
    if (fill) fill.style.inlineSize = Math.round(ratio * 100) + '%';
    const n = document.getElementById('dash-scan-note');
    if (n && note) n.textContent = note;
  },

  _showBlocked() {
    document.getElementById('dash-scanning').hidden = true;
    document.getElementById('dash-blocked').hidden = false;
  },

  // ── التهيئة ──────────────────────────────────────────────────
  init() {
    const f = document.createElement('iframe');
    f.className = 'dash-reader';
    f.setAttribute('aria-hidden', 'true');
    f.setAttribute('tabindex', '-1');
    document.body.appendChild(f);
    this._frame = f;

    document.getElementById('dash-refresh').addEventListener('click', () => {
      document.getElementById('dash-grid').innerHTML = '';
      document.getElementById('dash-summary').hidden = true;
      document.getElementById('dash-filters').hidden = true;
      document.getElementById('dash-blocked').hidden = true;
      this.scan();
    });

    // تبديل الوضع — نفس مفتاح المحاضرة، فالوضع يتبعك بين الواجهتين.
    const themeBtn = document.getElementById('dash-theme');
    const syncThemeBtn = () => {
      const light = document.documentElement.dataset.theme === 'light';
      themeBtn.textContent = light ? '☀' : '☾';
      themeBtn.title = light ? 'التبديل إلى الوضع الليلي' : 'التبديل إلى الوضع النهاري';
    };
    themeBtn.addEventListener('click', () => {
      const html = document.documentElement;
      if (html.dataset.theme === 'light') {
        html.removeAttribute('data-theme');
        try { localStorage.removeItem('lesson-theme'); } catch (e) {}
      } else {
        html.dataset.theme = 'light';
        try { localStorage.setItem('lesson-theme', 'light'); } catch (e) {}
      }
      syncThemeBtn();
    });
    syncThemeBtn();

    document.getElementById('dash-filters').addEventListener('click', (e) => {
      const btn = e.target.closest('.dash-filter');
      if (!btn) return;
      document.querySelectorAll('.dash-filter').forEach(b => b.classList.toggle('is-active', b === btn));
      this.filter = btn.dataset.filter;
      this._applyFilter();
    });

    this.scan();
  },
};

document.addEventListener('DOMContentLoaded', () => Dash.init());
