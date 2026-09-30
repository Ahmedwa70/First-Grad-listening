/**
 * js/dash-upload.js — فحص الملف المرفوع ثم إيصاله إلى مكانه.
 *
 * مسؤوليتان مفصولتان:
 *   MediaAudit  — يحكم على الملف قبل أن يُكتب. لا يلمس القرص.
 *   DashUpload  — الواجهة: السحب والإلقاء والحالات والمعاينة.
 * والكتابة نفسها في js/dash-store.js وحده.
 *
 * مبدأ الفحص: لا نثق بامتداد الملف ولا باسمه، بل نقرأ توقيعه من
 * بايتاته الأولى. ملف m4a مسمّى .mp3 يعمل في كروم ويصمت في غيره —
 * وهذا النوع من الأعطال يُكتشف أمام الطلاب، فيُرفض هنا.
 */
'use strict';

const MediaAudit = {
  LIMITS: {
    audio: { min: 0.2, max: 30 },
    video: { min: 0.3, max: 120 },
  },
  SILENT_PEAK: 0.02,
  QUIET_PEAK: 0.08,
  WAVE_BARS: 56,

  // ── توقيع الملف من بايتاته الأولى ───────────────────────────
  sniff(buf) {
    const b = new Uint8Array(buf);
    if (b.length < 12) return null;
    const ascii = (i, n) => String.fromCharCode.apply(null, b.subarray(i, i + n));

    if (ascii(0, 3) === 'ID3') return 'mp3';
    if (b[0] === 0xFF && (b[1] & 0xE0) === 0xE0) return 'mp3';
    if (ascii(0, 4) === 'RIFF' && ascii(8, 4) === 'WAVE') return 'wav';
    if (ascii(0, 4) === 'OggS') return 'ogg';
    if (b[0] === 0x1A && b[1] === 0x45 && b[2] === 0xDF && b[3] === 0xA3) return 'webm';
    if (ascii(4, 4) === 'ftyp') {
      const brand = ascii(8, 4);
      if (brand === 'qt  ') return 'mov';
      if (brand.slice(0, 3) === 'M4A' || brand === 'M4V ') return 'm4a';
      return 'mp4';
    }
    return null;
  },

  LABEL: { mp3: 'MP3', mp4: 'MP4', m4a: 'M4A', mov: 'MOV', wav: 'WAV', ogg: 'OGG', webm: 'WebM' },

  // ── تحليل الصوت: المدة والذروة وشكل الموجة ──────────────────
  async analyseAudio(buf) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    const ctx = new Ctx();
    try {
      const decoded = await ctx.decodeAudioData(buf.slice(0));
      const ch = decoded.getChannelData(0);
      const bars = new Array(this.WAVE_BARS).fill(0);
      const step = Math.max(1, Math.floor(ch.length / this.WAVE_BARS));
      let peak = 0, sum = 0, count = 0;
      for (let i = 0; i < ch.length; i++) {
        const v = Math.abs(ch[i]);
        if (v > peak) peak = v;
        sum += v * v; count++;
        const bi = Math.min(this.WAVE_BARS - 1, Math.floor(i / step));
        if (v > bars[bi]) bars[bi] = v;
      }
      return {
        duration: decoded.duration,
        peak,
        rms: Math.sqrt(sum / Math.max(1, count)),
        wave: bars,
      };
    } catch (e) {
      return null;
    } finally {
      try { ctx.close(); } catch (e) {}
    }
  },

  // ── تحليل الفيديو: المدة والأبعاد ───────────────────────────
  analyseVideo(blob) {
    return new Promise(resolve => {
      const url = URL.createObjectURL(blob);
      const v = document.createElement('video');
      let done = false;
      const finish = (out) => {
        if (done) return;
        done = true;
        clearTimeout(t);
        v.onloadedmetadata = v.onerror = null;
        try { v.removeAttribute('src'); v.load(); } catch (e) {}
        URL.revokeObjectURL(url);
        resolve(out);
      };
      const t = setTimeout(() => finish(null), 8000);
      v.preload = 'metadata';
      v.muted = true;
      v.onloadedmetadata = () => finish({
        duration: v.duration,
        width: v.videoWidth,
        height: v.videoHeight,
      });
      v.onerror = () => finish(null);
      v.src = url;
    });
  },

  // ── الحكم ───────────────────────────────────────────────────
  async inspect(file, targetPath) {
    const target = targetPath.slice(targetPath.lastIndexOf('/') + 1);
    const wantExt = target.slice(target.lastIndexOf('.') + 1).toLowerCase();
    const kind = wantExt === 'mp4' ? 'video' : 'audio';
    const errors = [], notes = [];

    if (!file.size) return { ok: false, kind, errors: ['الملف فارغ — حجمه صفر.'], notes };
    if (file.size > 120 * 1024 * 1024) {
      return { ok: false, kind, errors: ['الملف أكبر من 120 ميجابايت — تأكّد أنك اخترت الملف الصحيح.'], notes };
    }

    const head = await file.slice(0, 64).arrayBuffer();
    const sig = this.sniff(head);

    if (!sig) {
      errors.push('لم يُتعرَّف على هذا الملف كصوت أو فيديو.');
      return { ok: false, kind, errors, notes };
    }
    if (sig !== wantExt) {
      const got = this.LABEL[sig] || sig.toUpperCase();
      errors.push(`هذا ملف ${got}، والمطلوب ${wantExt.toUpperCase()}. صدّره بالصيغة المطلوبة ثم أعد الرفع.`);
      return { ok: false, kind, errors, notes, detected: sig };
    }

    const limits = this.LIMITS[kind];

    if (kind === 'audio') {
      const buf = await file.arrayBuffer();
      const a = await this.analyseAudio(buf);
      if (!a) {
        errors.push('تعذّر قراءة محتوى الملف الصوتي — قد يكون تالفاً.');
        return { ok: false, kind, errors, notes };
      }
      if (a.duration < limits.min) errors.push(`المدة ${a.duration.toFixed(2)} ثانية — قصيرة جداً.`);
      if (a.duration > limits.max) errors.push(`المدة ${Math.round(a.duration)} ثانية — أطول مما يليق بمقطع حرف أو كلمة.`);
      if (a.peak < this.SILENT_PEAK) errors.push('التسجيل صامت — تأكّد من الميكروفون ثم أعد التسجيل.');
      else if (a.peak < this.QUIET_PEAK) notes.push('مستوى الصوت منخفض — قد لا يُسمع في آخر القاعة.');
      return { ok: errors.length === 0, kind, errors, notes, meta: a };
    }

    const v = await this.analyseVideo(file);
    if (!v) {
      errors.push('تعذّر قراءة محتوى الفيديو — قد يكون تالفاً أو بترميز غير مدعوم.');
      return { ok: false, kind, errors, notes };
    }
    if (!v.duration || !isFinite(v.duration)) errors.push('لم تُقرأ مدة الفيديو.');
    else {
      if (v.duration < limits.min) errors.push(`المدة ${v.duration.toFixed(2)} ثانية — قصيرة جداً.`);
      if (v.duration > limits.max) errors.push(`المدة ${Math.round(v.duration)} ثانية — أطول مما يليق بمقطع حرف.`);
    }
    if (!v.width || !v.height) errors.push('لا توجد صورة في هذا الملف.');
    else if (v.width < 320) notes.push(`العرض ${v.width} بكسل — منخفض لشاشة القاعة.`);
    return { ok: errors.length === 0, kind, errors, notes, meta: v };
  },
};


const DashUpload = {
  _slots: new Map(),

  // ── التهيئة ─────────────────────────────────────────────────
  async init() {
    await DashStore.restore();
    this._renderBanner();
    this._bindBanner();
    this._bindGrid();
  },

  // ── لافتة حالة الاتصال ──────────────────────────────────────
  _renderBanner() {
    const el = document.getElementById('dash-connect');
    if (!el) return;
    const supported = DashStore.supported();
    const direct = DashStore.mode === 'direct';
    el.dataset.state = direct ? 'linked' : supported ? 'offer' : 'manual';
    el.innerHTML = direct ? `
        <span class="cn-dot" aria-hidden="true"></span>
        <div class="cn-text">
          <strong>المجلد موصول</strong>
          <span>الملفات تُحفظ في أماكنها مباشرة، ويعمل الدرس بها فوراً.</span>
        </div>
        <button class="cn-btn cn-btn-ghost" id="cn-forget">فصل</button>`
      : supported ? `
        <span class="cn-dot" aria-hidden="true"></span>
        <div class="cn-text">
          <strong>اربط مجلد المشروع</strong>
          <span>مرة واحدة فقط — بعدها يُحفظ كل ملف ترفعه في مكانه الصحيح تلقائياً.</span>
        </div>
        <button class="cn-btn" id="cn-link">اربط المجلد</button>`
      : `
        <span class="cn-dot" aria-hidden="true"></span>
        <div class="cn-text">
          <strong>وضع التنزيل</strong>
          <span>سيُفحص كل ملف ويُنزَّل باسمه الصحيح، وتضعه أنت في مجلده.</span>
        </div>`;
  },

  _bindBanner() {
    const el = document.getElementById('dash-connect');
    if (!el) return;
    el.addEventListener('click', async (e) => {
      if (e.target.id === 'cn-link') {
        const btn = e.target;
        btn.disabled = true; btn.textContent = 'في انتظار الإذن…';
        const r = await DashStore.connect();
        if (!r.ok) {
          this._toast(this._connectError(r.reason), 'error');
          this._renderBanner();
          return;
        }
        this._toast(`تم ربط المجلد «${r.name}» — الرفع صار تلقائياً.`, 'ok');
        this._renderBanner();
      }
      if (e.target.id === 'cn-forget') {
        await DashStore.forget();
        this._renderBanner();
        this._toast('فُصل المجلد. الرفع الآن بوضع التنزيل.', 'note');
      }
    });
  },

  _connectError(reason) {
    return {
      cancelled: 'أُلغي الاختيار.',
      denied: 'لم يُمنح الإذن بالكتابة.',
      'wrong-folder': 'هذا ليس مجلد المشروع — اختر المجلد الذي يحوي lecture.html.',
      unsupported: 'هذه الطريقة غير متاحة في هذا المتصفح أو بهذه الطريقة في الفتح.',
    }[reason] || 'تعذّر ربط المجلد.';
  },

  // ── ربط خانات الرفع ─────────────────────────────────────────
  _bindGrid() {
    const grid = document.getElementById('dash-grid');
    if (!grid) return;

    grid.addEventListener('click', (e) => {
      const slot = e.target.closest('.dl-slot');
      if (!slot || slot.dataset.busy === '1') return;
      if (e.target.closest('.slot-play')) return;
      this._pick(slot);
    });

    ['dragenter', 'dragover'].forEach(t => grid.addEventListener(t, (e) => {
      const slot = e.target.closest('.dl-slot');
      if (!slot) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      slot.classList.add('is-over');
    }));

    ['dragleave', 'dragend'].forEach(t => grid.addEventListener(t, (e) => {
      const slot = e.target.closest('.dl-slot');
      if (slot && !slot.contains(e.relatedTarget)) slot.classList.remove('is-over');
    }));

    grid.addEventListener('drop', (e) => {
      const slot = e.target.closest('.dl-slot');
      if (!slot) return;
      e.preventDefault();
      slot.classList.remove('is-over');
      const files = e.dataTransfer && e.dataTransfer.files;
      if (!files || !files.length) return;
      if (files.length === 1) { this._handle(slot, files[0]); return; }
      this._spread(slot, Array.from(files));
    });
  },

  // توزيع عدّة ملفات على الخانات الفارغة ابتداءً من خانة الإفلات
  _spread(startSlot, files) {
    const card = startSlot.closest('.dl-card');
    const all = Array.from(card.querySelectorAll('.dl-slot'))
      .filter(s => s.dataset.done !== '1' && s.dataset.busy !== '1');
    const from = all.indexOf(startSlot);
    const targets = all.slice(Math.max(0, from));
    files.slice(0, targets.length).forEach((f, i) => this._handle(targets[i], f));
    if (files.length > targets.length) {
      this._toast(`وُزّع ${targets.length} من ${files.length} — لا خانات فارغة لما بقي.`, 'note');
    }
  },

  _pick(slot) {
    const kind = slot.dataset.kind;
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.accept = kind === 'video' ? 'video/mp4,.mp4' : 'audio/mpeg,.mp3';
    inp.multiple = true;
    inp.addEventListener('change', () => {
      const files = Array.from(inp.files || []);
      if (!files.length) return;
      if (files.length === 1) this._handle(slot, files[0]);
      else this._spread(slot, files);
    });
    inp.click();
  },

  // ── المعالجة: فحص ثم إيصال ──────────────────────────────────
  async _handle(slot, file) {
    if (slot.dataset.busy === '1') return;
    slot.dataset.busy = '1';
    this._setState(slot, 'checking', 'جارٍ الفحص…');

    let report;
    try {
      report = await MediaAudit.inspect(file, slot.dataset.path);
    } catch (e) {
      slot.dataset.busy = '';
      this._setState(slot, 'error', 'تعذّر فحص الملف.');
      return;
    }

    if (!report.ok) {
      slot.dataset.busy = '';
      this._setState(slot, 'error', report.errors.join(' '));
      return;
    }

    this._setState(slot, 'saving', 'جارٍ الحفظ…');
    const res = await DashStore.deliver(slot.dataset.path, file);
    slot.dataset.busy = '';

    if (!res.ok) { this._setState(slot, 'error', 'تعذّر حفظ الملف.'); return; }

    slot.dataset.done = '1';
    const meta = report.meta || {};
    const dur = meta.duration ? meta.duration.toFixed(2) + ' ث' : '';
    const extra = report.notes.length ? ' · ' + report.notes.join(' ') : '';

    this._setState(slot, res.placed ? 'saved' : 'downloaded',
      (res.placed ? 'حُفظ في مكانه' : 'نُزّل باسمه — ضعه في مجلده') +
      (dur ? ' · ' + dur : '') + extra,
      report);

    if (res.placed && typeof Dash !== 'undefined' && Dash.markResolved) {
      Dash.markResolved(slot.dataset.path);
    }
  },

  // ── عرض الحالة ──────────────────────────────────────────────
  _setState(slot, state, message, report) {
    slot.dataset.state = state;
    const box = slot.querySelector('.slot-state');
    if (!box) return;
    box.textContent = '';

    if (report && report.meta && report.meta.wave && (state === 'saved' || state === 'downloaded')) {
      box.appendChild(this._wave(report.meta.wave, report.meta.peak));
    }
    const t = document.createElement('span');
    t.className = 'slot-msg';
    t.textContent = message;
    box.appendChild(t);
  },

  _wave(bars, peak) {
    const c = document.createElement('canvas');
    c.className = 'slot-wave';
    const w = 180, h = 26, dpr = Math.min(2, window.devicePixelRatio || 1);
    c.width = w * dpr; c.height = h * dpr;
    c.style.inlineSize = w + 'px'; c.style.blockSize = h + 'px';
    const g = c.getContext('2d');
    g.scale(dpr, dpr);
    const norm = Math.max(0.05, peak || 1);
    const bw = w / bars.length;
    g.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--teal').trim() || '#0E7C7B';
    bars.forEach((v, i) => {
      const bh = Math.max(1.5, (v / norm) * (h - 4));
      g.fillRect(i * bw + bw * 0.22, (h - bh) / 2, Math.max(1, bw * 0.56), bh);
    });
    return c;
  },

  // ── تنبيه عابر ──────────────────────────────────────────────
  _toast(msg, tone) {
    let host = document.getElementById('dash-toasts');
    if (!host) {
      host = document.createElement('div');
      host.id = 'dash-toasts';
      host.className = 'dash-toasts';
      document.body.appendChild(host);
    }
    const el = document.createElement('div');
    el.className = 'dash-toast';
    el.dataset.tone = tone || 'note';
    el.textContent = msg;
    host.appendChild(el);
    setTimeout(() => { el.classList.add('is-out'); setTimeout(() => el.remove(), 320); }, 4200);
  },
};
