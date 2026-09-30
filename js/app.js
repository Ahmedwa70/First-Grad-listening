/**
 * app.js — محرّك صفحة المحاضرة (الجزء الثابت القابل لإعادة الاستخدام)
 * Teacher-Controlled Interactive Classroom Environment
 * Classroom Readiness Fix — نسخة الفصل الدراسي
 * No automatic run — every action is teacher-triggered.
 * Phase 2 cleanup: P1–P7 activity logic lives in js/activities/.
 * Data (per-lesson) lives in js/lesson-XX.js (LESSON_XX).
 */

'use strict';

// ══════════════════════════════════════════════════════════════
// الحالة المركزية للتطبيق
// ══════════════════════════════════════════════════════════════
const STATE = {
  currentPhaseIndex: 0,
  currentStep: 0,
  p2ActiveLetter: null,
  p2Chorusing: false,
  p3LetterIndex: 0,
  p3RevealStep: -1,
  p3CompletedLetters: [],
  p3ViewMode: 'single',
  p4LetterIndex: 0,
  p4StepIndex: 0,
  p4ViewMode: 'single',
  p5WordIndex: 0,
  p5RevealStep: -1,
  p5ViewMode: 'single',
  p5AssessIndex: 0,
  p5AssessRevealed: false,
  p6RoundIndex: 0,
  p6PairIndex: 0,
  p6AnswerVisible: false,
  p6RevealStep: 0,
  p6SoundPlayed: false,
  p6DemoMode: true,
  p6DemoStep: 0,
  // Strangler migration: D2 engine instance runs beside legacy P6 state.
  p6D2Activity: null,
  p7RoundIndex: 0,
  p7ItemIndex: 0,
  p7AnswerVisible: false,
  p7Scores: {},
  attentionMode: false,
  audioPlaying: false,
  helpPanelOpen: false,
  // تفضيل عرض عام للمعلم: صالح لأي لغة ثانية، لا للغة بعينها.
  secondaryLanguageVisible: true,
};

// ══════════════════════════════════════════════════════════════
// حفظ الموضع — يحمي الحصة من تحديث الصفحة أو توقف المتصفح.
// يُحفظ رقم المرحلة فقط (مع رصد P7 وتفضيل اللغة الثانية)، لأن كل
// initPX تصفّر حالتها الداخلية عمداً — فلا يُوعَد بما لا يُضمن.
// كل وصول إلى localStorage مغلّف بـ try/catch: قد يُرمى في التصفح الخاص.
// ══════════════════════════════════════════════════════════════
const LessonProgress = {
  _VERSION: 1,
  _MAX_AGE: 12 * 60 * 60 * 1000,   // 12 ساعة — أطول من أي حصة
  _last: '',
  _timer: null,
  _suspended: false,   // معلّق ما دامت بطاقة الاستئناف مفتوحة

  _key() {
    const id = (typeof LESSON !== 'undefined' && LESSON.meta && LESSON.meta.id) || '';
    return id ? 'lesson-progress:' + id : '';
  },

  save() {
    // لا ندهس الموضع المحفوظ والمعلم لم يجب بعد عن بطاقة الاستئناف.
    if (this._suspended) return;
    const key = this._key();
    if (!key) return;
    let json;
    try {
      json = JSON.stringify({
        v: this._VERSION,
        at: Date.now(),
        currentPhaseIndex: STATE.currentPhaseIndex,
        p7Scores: STATE.p7Scores,
        secondaryLanguageVisible: STATE.secondaryLanguageVisible,
      });
    } catch (e) { return; }
    if (json === this._last) return;           // لا كتابة بلا تغيّر
    this._last = json;
    try { localStorage.setItem(key, json); } catch (e) {}
  },

  load() {
    const key = this._key();
    if (!key) return null;
    let raw = null;
    try { raw = localStorage.getItem(key); } catch (e) { return null; }
    if (!raw) return null;
    let d = null;
    try { d = JSON.parse(raw); } catch (e) { this.clear(); return null; }
    if (!d || d.v !== this._VERSION) { this.clear(); return null; }
    if (typeof d.at !== 'number' || Date.now() - d.at > this._MAX_AGE) { this.clear(); return null; }
    const i = d.currentPhaseIndex;
    // المرحلة الأولى لا تستحقّ سؤالاً — هي البداية أصلاً.
    if (!Number.isInteger(i) || i <= 0 || !Array.isArray(phases) || i >= phases.length) return null;
    return d;
  },

  clear() {
    const key = this._key();
    this._last = '';
    if (key) { try { localStorage.removeItem(key); } catch (e) {} }
  },

  start() {
    if (this._timer) return;
    this._timer = setInterval(() => this.save(), 2000);
    window.addEventListener('beforeunload', () => this.save());
    document.addEventListener('visibilitychange', () => { if (document.hidden) this.save(); });
  },
};

// ══════════════════════════════════════════════════════════════
// مؤشّر اكتمال الوسائط — نقطة صامتة في شريط المعلم.
// سبب وجوده: عند فقد ملف صوت يلجأ AudioManager إلى النطق الآلي
// بلا أي إشعار، فيظنّ المعلم أن تسجيله يعمل. وعند فقد فيديو
// يظهر إطار أسود صامت. النقطة تكشف الحالتين قبل الحصة.
// لا تظهر إطلاقاً ما دام كل شيء موجوداً — شاشة الفصل تبقى نظيفة.
// ══════════════════════════════════════════════════════════════
const MediaCheck = {
  _TIMEOUT: 5000,
  _AUDIO_FORMS: ['صوت واحد', 'صوتان', 'أصوات', 'صوتاً'],
  _VIDEO_FORMS: ['مقطع واحد', 'مقطعان', 'مقاطع', 'مقطعاً'],

  // جمع المراجع بمسح بنية الدرس كاملة، لا بأسماء أقسام ثابتة —
  // فأي درس جديد يُفحص تلقائياً مهما تغيّر موضع الحقل.
  _collect() {
    const audio = [], video = [], seen = new Set();
    const walk = (node, depth) => {
      if (!node || typeof node !== 'object' || depth > 8 || seen.has(node)) return;
      seen.add(node);
      if (Array.isArray(node)) { node.forEach(n => walk(n, depth + 1)); return; }
      Object.keys(node).forEach(k => {
        const v = node[k];
        if (typeof v === 'string' && v) {
          if (k === 'audioFile' && audio.indexOf(v) === -1) audio.push(v);
          else if (k === 'videoFile' && video.indexOf(v) === -1) video.push(v);
        } else if (v && typeof v === 'object') walk(v, depth + 1);
      });
    };
    try { walk(LESSON, 0); } catch (e) {}
    return { audio, video };
  },

  // يقرأ ترويسة الملف فقط (preload=metadata) — لا تشغيل ولا صوت ولا صورة.
  // عند انتهاء المهلة يُفترض الوجود: إنذار كاذب أسوأ من صمت.
  _probe(src, tag) {
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
      const timer = setTimeout(() => finish(true), this._TIMEOUT);
      el.preload = 'metadata';
      el.muted = true;
      el.onloadedmetadata = () => finish(true);
      el.onerror = () => finish(false);
      try { el.src = src; } catch (e) { finish(true); }
    });
  },

  _plural(n, forms) {
    if (n === 1) return forms[0];
    if (n === 2) return forms[1];
    return n + ' ' + (n <= 10 ? forms[2] : forms[3]);
  },

  _esc(s) {
    return String(s).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  },

  _group(icon, label, forms, paths) {
    if (!paths.length) return '';
    const dir = paths[0].slice(0, paths[0].lastIndexOf('/') + 1);
    const items = paths.map(p => `<li>${this._esc(p.slice(p.lastIndexOf('/') + 1))}</li>`).join('');
    return `
      <div class="media-group">
        <div class="media-group-head">${icon} ${label} — ${paths.length}</div>
        <div class="media-group-dir">${this._esc(dir)}</div>
        <ul class="media-list">${items}</ul>
      </div>`;
  },

  _render(missAudio, missVideo) {
    const host  = document.getElementById('media-check');
    const dot   = document.getElementById('media-dot');
    const panel = document.getElementById('media-panel');
    if (!host || !dot || !panel) return;

    if (!missAudio.length && !missVideo.length) { host.open = false; host.hidden = true; return; }

    const bits = [];
    if (missAudio.length) bits.push(this._plural(missAudio.length, this._AUDIO_FORMS));
    if (missVideo.length) bits.push(this._plural(missVideo.length, this._VIDEO_FORMS));
    const summary = 'ينقص ' + bits.join(' · ');

    dot.setAttribute('title', summary);
    dot.setAttribute('aria-label', summary);
    panel.innerHTML =
      `<div class="media-panel-title">ينقص من هذا الدرس</div>` +
      this._group('🔊', 'الصوت', this._AUDIO_FORMS, missAudio) +
      this._group('🎬', 'الفيديو', this._VIDEO_FORMS, missVideo) +
      `<div class="media-panel-note">ضع الملف باسمه في مجلده وأعد فتح الدرس.</div>`;
    host.hidden = false;
  },

  async run() {
    const { audio, video } = this._collect();
    const aPaths = audio.map(f => _resolveAudioPath(f));
    const vPaths = video.map(f => _resolveVideoPath(f));
    const [aOk, vOk] = await Promise.all([
      Promise.all(aPaths.map(s => this._probe(s, 'audio'))),
      Promise.all(vPaths.map(s => this._probe(s, 'video'))),
    ]);
    this._render(aPaths.filter((s, i) => !aOk[i]), vPaths.filter((s, i) => !vOk[i]));
  },

  start() {
    // إغلاق اللوحة عند النقر خارجها — نفس سلوك لوحة مساعدة المعلم.
    document.addEventListener('click', (e) => {
      const host = document.getElementById('media-check');
      if (host && host.open && !host.contains(e.target)) host.open = false;
    });
    this.run();
  },
};

// بطاقة الاستئناف — تظهر فوق المرحلة الأولى عند وجود موضع محفوظ.
function showResumePrompt(saved) {
  const i = saved.currentPhaseIndex;
  const ph = phases[i];
  if (!ph) { goToPhase(0); return; }

  const t = new Date(saved.at);
  const hhmm = String(t.getHours()).padStart(2, '0') + ':' + String(t.getMinutes()).padStart(2, '0');

  const overlay = document.createElement('div');
  overlay.className = 'resume-overlay';
  overlay.innerHTML = `
    <div class="resume-card" role="dialog" aria-modal="true" aria-labelledby="resume-title">
      <div class="resume-icon" aria-hidden="true">↩</div>
      <h2 class="resume-title" id="resume-title">هل تستكمل الحصة؟</h2>
      <p class="resume-body">توقّفتَ عند <strong>${ph.id} — ${ph.title}</strong></p>
      <p class="resume-time">آخر نشاط: ${hhmm}</p>
      <div class="resume-actions">
        <button class="resume-btn primary" id="resume-yes">استكمال من ${ph.id}</button>
        <button class="resume-btn ghost" id="resume-no">ابدأ من جديد</button>
      </div>
      <p class="resume-note">الاستكمال يعيدك إلى بداية ${ph.id}، لا إلى الشريحة نفسها.</p>
    </div>`;

  const pick = (resume) => {
    document.removeEventListener('keydown', guard, true);
    overlay.remove();
    LessonProgress._suspended = false;
    if (!resume) { LessonProgress.clear(); goToPhase(0); return; }
    goToPhase(i);
    // بعد goToPhase لا قبله: initP7 تصفّر p7Scores.
    if (saved.p7Scores && typeof saved.p7Scores === 'object') STATE.p7Scores = saved.p7Scores;
    if (typeof saved.secondaryLanguageVisible === 'boolean') {
      STATE.secondaryLanguageVisible = saved.secondaryLanguageVisible;
      syncSecondaryLanguageVisibility();
    }
  };

  // حاجز لوحة المفاتيح: منع Space/← من تحريك الدرس خلف البطاقة.
  const guard = (e) => {
    if (e.key === 'Enter')  { e.preventDefault(); e.stopPropagation(); pick(true);  return; }
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); pick(false); return; }
    e.stopPropagation();
  };

  LessonProgress._suspended = true;
  goToPhase(0);
  document.body.appendChild(overlay);
  document.addEventListener('keydown', guard, true);
  overlay.querySelector('#resume-yes').addEventListener('click', () => pick(true));
  overlay.querySelector('#resume-no').addEventListener('click', () => pick(false));
  const first = overlay.querySelector('#resume-yes');
  if (first) first.focus();
}

function _lessonAudioDir(meta) {
  const m = meta || (typeof LESSON !== 'undefined' ? LESSON.meta : null);
  if (!m) return null;
  if (typeof m.id === 'string' && /^lesson-\d+$/.test(m.id)) return m.id;
  if (Number.isInteger(m.number) && m.number > 0) return 'lesson-' + String(m.number).padStart(2, '0');
  return null;
}

function _resolveAudioPath(filePath, meta) {
  if (typeof filePath !== 'string') return filePath;
  const m = /^assets\/audio\/(.+)$/.exec(filePath);
  if (!m || m[1].indexOf('/') !== -1) return filePath;
  const dir = _lessonAudioDir(meta);
  return dir ? 'assets/audio/' + dir + '/' + m[1] : filePath;
}

function _resolveVideoPath(filePath, meta) {
  if (typeof filePath !== 'string') return filePath;
  const m = /^assets\/videos\/(.+)$/.exec(filePath);
  if (!m || m[1].indexOf('/') !== -1) return filePath;
  const dir = _lessonAudioDir(meta);
  return dir ? 'assets/videos/' + dir + '/' + m[1] : filePath;
}

// ══════════════════════════════════════════════════════════════
// Audio Manager — يدعم MP3 محلية + Web Speech API احتياطياً
// ══════════════════════════════════════════════════════════════
const AudioManager = {
  _cache: {},
  _synth: window.speechSynthesis,
  _arabicVoice: null,
  _currentAudio: null,

  init() {
    if (this._synth) {
      const tryFind = () => {
        const voices = this._synth.getVoices();
        this._arabicVoice = voices.find(v => v.lang === 'ar-SA')
          || voices.find(v => v.lang.startsWith('ar'))
          || null;
      };
      tryFind();
      this._synth.onvoiceschanged = tryFind;
    }
  },

  speak(text, rate = 0.8) {
    if (!this._synth) return;
    if (this._synth.speaking) this._synth.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'ar-SA';
    utt.rate = rate;
    utt.pitch = 1;
    utt.volume = 1;
    if (this._arabicVoice) utt.voice = this._arabicVoice;
    utt.onstart = () => { STATE.audioPlaying = true;  _updateAudioUI(true);  };
    utt.onend   = () => { STATE.audioPlaying = false; _updateAudioUI(false); };
    utt.onerror = () => { STATE.audioPlaying = false; _updateAudioUI(false); };
    this._synth.speak(utt);
  },

  play(filePath, fallbackText, rate = 0.8) {
    const src = _resolveAudioPath(filePath);
    if (!this._cache[src]) {
      this._cache[src] = new Audio(src);
    }
    const audio = this._cache[src];
    Object.values(this._cache).forEach(other => {
      if (other !== audio) {
        other.pause();
        other.currentTime = 0;
      }
    });
    this._currentAudio = audio;
    audio.currentTime = 0;
    const p = audio.play();
    if (p !== undefined) {
      p.then(() => {
        STATE.audioPlaying = true;
        _updateAudioUI(true);
        audio.onended = () => {
          if (this._currentAudio === audio) {
            this._currentAudio = null;
            STATE.audioPlaying = false;
            _updateAudioUI(false);
          }
        };
      }).catch(() => {
        this.speak(fallbackText, rate);
      });
    }
  },

  playLetter(letterId) {
    const letter = LESSON.letters.find(l => l.id === letterId);
    if (!letter) return;
    this.play(letter.audioFile, letter.name, 0.6);
    document.querySelectorAll('.audio-indicator').forEach(el => {
      el.classList.add('playing');
      setTimeout(() => el.classList.remove('playing'), 1500);
    });
  },

  playWord(wordId) {
    const word = LESSON.words.find(w => w.id === wordId);
    if (!word) return;
    this.play(word.audioFile, word.audioText, 0.7);
  },

  stop() {
    if (this._synth && this._synth.speaking) this._synth.cancel();
    Object.values(this._cache).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
      audio.onended = null;
    });
    this._currentAudio = null;
    STATE.audioPlaying = false;
    _updateAudioUI(false);
  }
};

function _updateAudioUI(playing) {
  document.querySelectorAll('.audio-indicator').forEach(el => {
    el.classList.toggle('playing', playing);
  });
}

// اختصار للتوافق مع الكود القديم
function speakArabic(text, rate = 0.8) { AudioManager.speak(text, rate); }

// ══════════════════════════════════════════════════════════════
// Phase Timer — مؤقت عرض بسيط للمعلم (غير إجباري)
// ══════════════════════════════════════════════════════════════
const PhaseTimer = {
  _start: null,
  _interval: null,
  _el: null,

  start(phaseId) {
    this.stop();
    this._start = Date.now();
    this._el = document.getElementById('phase-timer');
    // استخرج المدة من بيانات المرحلة (بالدقائق)
    const phase = LESSON.phases.find(p => p.id === phaseId);
    const duration = phase ? this._parseDuration(phase.duration) : null;

    this._interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this._start) / 1000);
      const m = Math.floor(elapsed / 60);
      const s = elapsed % 60;
      const elapsedStr = `${m}:${s.toString().padStart(2, '0')}`;
      if (this._el) {
        if (duration) {
          const remaining = duration * 60 - elapsed;
          const rm = Math.floor(Math.abs(remaining) / 60);
          const rs = Math.abs(remaining) % 60;
          const sign = remaining < 0 ? '+' : '';
          this._el.textContent = `${elapsedStr} / ${duration}د ${sign}${rm}:${rs.toString().padStart(2,'0')}`;
          this._el.classList.toggle('overtime', remaining < 0);
        } else {
          this._el.textContent = elapsedStr;
        }
      }
    }, 1000);
  },

  stop() {
    if (this._interval) { clearInterval(this._interval); this._interval = null; }
    if (this._el) { this._el.textContent = ''; this._el.classList.remove('overtime'); }
  },

  _parseDuration(str) {
    // يستخرج الرقم الثاني من "٠ — ١٠ دقائق" → 10
    const nums = str.match(/\d+/g);
    if (!nums || nums.length < 2) return null;
    return parseInt(nums[1]) - parseInt(nums[0]);
  }
};

// ══════════════════════════════════════════════════════════════
// مراحل الدرس
// ══════════════════════════════════════════════════════════════
const phases = LESSON.phases;

function getCurrentPhase() {
  return phases[STATE.currentPhaseIndex] || null;
}

// ══════════════════════════════════════════════════════════════
// تحديث واجهة التحكم — تعريف واحد نهائي
// ══════════════════════════════════════════════════════════════
function updatePhaseBar() {
  const phase = LESSON.phases[STATE.currentPhaseIndex];
  if (!phase) return;

  // badge يعرض id فقط
  const badge    = document.getElementById('phase-title');
  const titleTxt = document.getElementById('phase-title-text');
  const dur      = document.getElementById('phase-duration');
  const goal     = document.getElementById('phase-goal');

  if (badge)    badge.textContent    = phase.id;
  if (titleTxt) titleTxt.textContent = phase.title;
  if (dur)      dur.textContent      = phase.duration;
  if (goal)     goal.textContent     = phase.goal;

  document.querySelectorAll('.phase-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.phase === phase.id);
  });

  updateProgressRail();
}

function updateProgressRail() {
  const rail = document.getElementById('progress-rail-fill');
  if (!rail) return;
  const pct = ((STATE.currentPhaseIndex + 1) / phases.length) * 100;
  rail.style.width = pct + '%';
  rail.setAttribute('aria-valuenow', String(Math.round(pct)));
}

// تحديث كلا الموقعين معاً: teacher-hint (أعلى) + hint-zone (أسفل)
function updateHint(text, secondaryText = '') {
  const updateTarget = target => {
    if (!target) return;
    if (!secondaryText) {
      target.textContent = text;
      return;
    }
    target.replaceChildren(
      document.createTextNode(text),
      Object.assign(document.createElement('span'), {
        className: 'secondary-language',
        textContent: ` · ${secondaryText}`,
      })
    );
  };
  updateTarget(document.getElementById('teacher-hint'));
  updateTarget(document.getElementById('hint-zone'));
}

// ══════════════════════════════════════════════════════════════
// التحكم الرئيسي — Space / →
// ══════════════════════════════════════════════════════════════
function advance() {
  const phase = getCurrentPhase();
  if (!phase) return;
  if (STATE.attentionMode) { exitAttentionMode(); return; }

  switch (phase.id) {
    case 'P1': advanceP1(); break;
    case 'P2': advanceP2(); break;
    case 'P3': advanceP3(); break;
    case 'P4': advanceP4(); break;
    case 'P5': advanceP5(); break;
    case 'P6': advanceP6(); break;
    case 'P7': advanceP7(); break;
  }
}

function retreat() {
  const phase = getCurrentPhase();
  if (!phase) return;
  if (STATE.attentionMode) { exitAttentionMode(); return; }

  switch (phase.id) {
    case 'P1':
      if (STATE.currentStep > 0) { STATE.currentStep--; renderP1(); }
      break;
    case 'P3':
      if (STATE.p3ViewMode === 'assess') {
        if (STATE.p3AssessRevealed) {
          STATE.p3AssessRevealed = false;
          renderP3();
        } else if (STATE.p3AssessIndex > 0) {
          STATE.p3AssessIndex--;
          STATE.p3AssessRevealed = false;
          renderP3();
        } else {
          STATE.p3ViewMode = 'quad';
          renderP3();
        }
      } else if (STATE.p3ViewMode === 'quad') {
        STATE.p3ViewMode = 'single';
        const p3phase = LESSON.phases[2];
        STATE.p3LetterIndex = p3phase.letterOrder.length - 1;
        STATE.p3RevealStep = p3phase.revealSteps.length - 1;
        renderP3();
      } else if (STATE.p3RevealStep > -1) {
        STATE.p3RevealStep--;
        renderP3Card();
      } else if (STATE.p3LetterIndex > 0) {
        STATE.p3ViewMode = 'single';
        STATE.p3LetterIndex--;
        STATE.p3RevealStep = LESSON.phases[2].revealSteps.length - 1;
        renderP3();
      }
      break;
    case 'P4':
      if (STATE.p4StepIndex > 0) {
        STATE.p4StepIndex--;
        renderP4Card();
      } else if (STATE.p4LetterIndex > 0) {
        STATE.p4ViewMode = 'single';
        STATE.p4LetterIndex--;
        const guide = LESSON.strokeGuides[STATE.p4LetterIndex];
        STATE.p4StepIndex = guide.steps.length - 1;
        renderP4();
      }
      break;
    case 'P5':
      if (STATE.p5ViewMode === 'assess') {
        if (STATE.p5AssessRevealed) {
          STATE.p5AssessRevealed = false;
          renderP5();
        } else if (STATE.p5AssessIndex > 0) {
          STATE.p5AssessIndex--;
          STATE.p5AssessRevealed = false;
          renderP5();
        } else {
          STATE.p5ViewMode = 'quad';
          renderP5();
        }
      } else if (STATE.p5ViewMode === 'quad') {
        STATE.p5ViewMode = 'single';
        const p5phase = LESSON.phases.find(p => p.id === 'P5');
        STATE.p5WordIndex = p5phase.wordOrder.length - 1;
        STATE.p5RevealStep = LESSON.p5RevealSteps.length - 1;
        renderP5();
      } else if (STATE.p5RevealStep > -1) {
        STATE.p5RevealStep--;
        renderP5Card();
      } else if (STATE.p5WordIndex > 0) {
        p5PrevWord();
      }
      break;
    case 'P6': {
      if (STATE.p6DemoMode) {
        if (STATE.p6DemoStep > 0) {
          STATE.p6DemoStep--;
          renderP6Demo();
        }
        break;
      }
      const p6Round = getCurrentP6Round();
      if (STATE.p6AnswerVisible && p6Round.type === 'identify' && STATE.p6RevealStep > 1) {
        STATE.p6RevealStep--;
        p6ApplyReveal();
      } else if (STATE.p6AnswerVisible) {
        STATE.p6AnswerVisible = false;
        STATE.p6RevealStep = 0;
        p6ApplyReveal();
      } else if (STATE.p6PairIndex > 0) {
        STATE.p6PairIndex--;
        STATE.p6AnswerVisible = false;
        STATE.p6RevealStep = 0;
        renderP6();
      }
      break;
    }
    case 'P7':
      if (STATE.p7AnswerVisible) {
        STATE.p7AnswerVisible = false; renderP7();
      } else if (STATE.p7ItemIndex > 0) {
        STATE.p7ItemIndex--;
        STATE.p7AnswerVisible = false; renderP7();
      }
      break;
  }
}


// ----------------------------------------------------------
// Shared activity utilities kept in the engine (used by multiple activities)
// ----------------------------------------------------------
function progressDots(current, total) {
  let html = '';
  for (let i = 0; i < total; i++) {
    const cls = i < current ? 'done' : i === current ? 'active' : '';
    html += `<span class="p6-dot ${cls}"></span>`;
  }
  return html;
}



// ══════════════════════════════════════════════════════════════
// الانتقال بين المراحل
// ══════════════════════════════════════════════════════════════
function closeTeacherHelpPanel() {
  // The native <details> open flag is the panel's UI state; keep the central state in sync.
  STATE.helpPanelOpen = false;
  const panel = document.querySelector('.help-panel');
  if (panel) panel.open = false;
}

function goToPhase(index, options = {}) {
  // Phase navigation is a lifecycle boundary: never carry teacher-panel UI into a new phase.
  closeTeacherHelpPanel();
  if (STATE.currentPhaseIndex === 5 && index !== 5) p6DisposeD2Activity();
  // مسار الدخول للمرحلة: 'sequential' عند التقدّم من المرحلة السابقة،
  // و'direct' عند الاختيار من الشريط العلوي أو اختصارات الأرقام.
  STATE.p4EntryMode = options.sequential ? 'sequential' : 'direct';
  AudioManager.stop();
  STATE.currentPhaseIndex = index;
  const phase = phases[index];
  if (!phase) return;

  document.documentElement.classList.toggle('p7-clean-stage', phase.id === 'P7');

  updatePhaseBar();
  updateProgressRail();
  LessonProgress.save();

  switch (phase.id) {
    case 'P1': initP1(); break;
    case 'P2': initP2(); break;
    case 'P3': initP3(); break;
    case 'P4': initP4(); break;
    case 'P5': initP5(); break;
    case 'P6': initP6(); break;
    case 'P7': initP7(); break;
  }

  const zone = document.getElementById('content-zone');
  if (zone) {
    zone.scrollTop = 0;
    zone.classList.add('phase-enter');
    setTimeout(() => zone.classList.remove('phase-enter'), 350);
  }
}

// ══════════════════════════════════════════════════════════════
// وضع استعادة الانتباه
// ══════════════════════════════════════════════════════════════
function toggleAttentionMode() {
  STATE.attentionMode = !STATE.attentionMode;
  const overlay = document.getElementById('attention-overlay');
  if (!overlay) return;

  if (STATE.attentionMode) {
    overlay.classList.add('active');
    updateHint('وضع استعادة الانتباه — اضغط A أو Space للعودة');
    AudioManager.stop();
  } else {
    overlay.classList.remove('active');
    updateHint('تم استعادة الانتباه — استمر');
  }
}

function exitAttentionMode() {
  STATE.attentionMode = false;
  const overlay = document.getElementById('attention-overlay');
  if (overlay) overlay.classList.remove('active');
  updateHint('استمر في الدرس');
}

// ══════════════════════════════════════════════════════════════
// لافتة الإنجاز
// ══════════════════════════════════════════════════════════════
function showCompletionBanner() {
  const banner = document.getElementById('completion-banner');
  if (banner) banner.classList.add('visible');
}

function hideCompletionBanner() {
  const banner = document.getElementById('completion-banner');
  if (banner) banner.classList.remove('visible');
}

// ══════════════════════════════════════════════════════════════
// R — كشف طارئ | H — إخفاء طارئ
// ══════════════════════════════════════════════════════════════
function emergencyReveal() {
  const phase = getCurrentPhase();
  if (!phase) return;
  switch (phase.id) {
    case 'P1': {
      const p1phase = LESSON.phases.find(p => p.id === 'P1');
      STATE.currentStep = p1phase.steps.length - 1;
      renderP1();
      break;
    }
    case 'P3': {
      const p3phase = LESSON.phases.find(p => p.id === 'P3');
      STATE.p3RevealStep = p3phase.revealSteps.length - 1;
      renderP3Card();
      break;
    }
    case 'P4': {
      const guide = LESSON.strokeGuides[STATE.p4LetterIndex];
      STATE.p4StepIndex = guide.steps.length - 1;
      renderP4Card();
      break;
    }
    case 'P5': {
      if (STATE.p5ViewMode === 'single') {
        STATE.p5RevealStep = LESSON.p5RevealSteps.length - 1;
        renderP5Card();
      }
      break;
    }
    case 'P6': {
      const round = getCurrentP6Round();
      STATE.p6AnswerVisible = true;
      STATE.p6RevealStep = round.type === 'identify'
        ? 3
        : (round.type === 'close' ? p6D3RevealCount(round) : 1);
      renderP6();
      break;
    }
    case 'P7':
      STATE.p7AnswerVisible = true;
      renderP7();
      break;
  }
  updateHint('⚡ كشف طارئ — جميع عناصر الخطوة الحالية مكشوفة');
  _flashHint('flash-reveal');
}

function emergencyHide() {
  const phase = getCurrentPhase();
  if (!phase) return;
  switch (phase.id) {
    case 'P1':
      STATE.currentStep = 0;
      renderP1();
      break;
    case 'P3':
      STATE.p3RevealStep = -1;
      renderP3Card();
      break;
    case 'P4':
      STATE.p4StepIndex = 0;
      renderP4Card();
      break;
    case 'P5':
      if (STATE.p5ViewMode === 'single') {
        STATE.p5RevealStep = -1;
        renderP5Card();
      }
      break;
    case 'P6':
      STATE.p6AnswerVisible = false;
      STATE.p6RevealStep = 0;
      renderP6();
      break;
    case 'P7':
      STATE.p7AnswerVisible = false;
      renderP7();
      break;
  }
  updateHint('🔒 إخفاء طارئ — العناصر المكشوفة أُخفيت');
  _flashHint('flash-hide');
}

function _flashHint(cls) {
  const el = document.getElementById('teacher-hint');
  if (!el) return;
  el.classList.remove('flash-reveal', 'flash-hide');
  void el.offsetWidth;
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), 700);
}

// ══════════════════════════════════════════════════════════════
// التحكم بلوحة المفاتيح
// ══════════════════════════════════════════════════════════════
document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  switch (e.code) {
    case 'Space':
    case 'ArrowRight':
      e.preventDefault();
      advance();
      break;
    case 'ArrowLeft':
    case 'Backspace':
      e.preventDefault();
      retreat();
      break;
    case 'KeyA':
      toggleAttentionMode();
      break;
    case 'KeyF':
      e.preventDefault();
      toggleFullscreen();
      break;
    case 'KeyT':
      toggleTheme();
      break;
    case 'KeyR':
      emergencyReveal();
      break;
    case 'KeyH':
      emergencyHide();
      break;
    case 'Digit1': goToPhase(0); break;
    case 'Digit2': goToPhase(1); break;
    case 'Digit3': goToPhase(2); break;
    case 'Digit4': goToPhase(3); break;
    case 'Digit5': goToPhase(4); break;
    case 'Digit6': goToPhase(5); break;
    case 'Digit7': goToPhase(6); break;
  }
});

// ══════════════════════════════════════════════════════════════
// الشاشة الكاملة
// ══════════════════════════════════════════════════════════════
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}

// ══════════════════════════════════════════════════════════════
// ظهور / إخفاء اللغة الثانية — تفضيل عرض موحّد للمعلم
// ══════════════════════════════════════════════════════════════
function syncSecondaryLanguageVisibility() {
  const visible = STATE.secondaryLanguageVisible;
  document.documentElement.classList.toggle('secondary-language-hidden', !visible);

  const button = document.getElementById('secondary-language-toggle');
  if (!button) return;

  const actionLabel = visible ? 'إخفاء اللغة الثانية' : 'إظهار اللغة الثانية';
  button.setAttribute('aria-pressed', String(visible));
  button.setAttribute('aria-label', visible
    ? 'اللغة الثانية ظاهرة. اضغط لإخفائها'
    : 'اللغة الثانية مخفية. اضغط لإظهارها');
  button.title = actionLabel;
}

function toggleSecondaryLanguageVisibility() {
  STATE.secondaryLanguageVisible = !STATE.secondaryLanguageVisible;
  syncSecondaryLanguageVisibility();
}

// ══════════════════════════════════════════════════════════════
// نظام تبديل الوضع (Dark / Light)
// ══════════════════════════════════════════════════════════════
function toggleTheme() {
  const html = document.documentElement;
  const current = html.dataset.theme || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  if (next === 'dark') {
    html.removeAttribute('data-theme');
    try { localStorage.removeItem('lesson-theme'); } catch(e) {}
  } else {
    html.dataset.theme = next;
    try { localStorage.setItem('lesson-theme', next); } catch(e) {}
  }
  _updateThemeButton(next);
}

function _updateThemeButton(theme) {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const isDark = theme !== 'light';
  btn.textContent = isDark ? '☀' : '☾';
  btn.title = isDark ? 'الوضع النهاري' : 'الوضع الليلي';
  btn.setAttribute('aria-label', isDark ? 'تبديل إلى الوضع النهاري' : 'تبديل إلى الوضع الليلي');
}

// ══════════════════════════════════════════════════════════════
// تهيئة التطبيق
// ══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  AudioManager.init();

  // بناء لافتة الإنجاز من بيانات الدرس (قالب عام قابل لإعادة الاستخدام).
  const m = LESSON.meta;
  if (m && m.completion) {
    const banner = document.getElementById('completion-banner');
    if (banner) {
      const cTitle = banner.querySelector('.completion-title');
      if (cTitle) cTitle.textContent = m.completion.title || '';
      const cChars = banner.querySelector('.completion-chars');
      if (cChars && Array.isArray(m.completion.chars)) {
        const colorOf = id => {
          const l = (LESSON.letters || []).find(x => x.id === id);
          return l && l.color ? l.color : '';
        };
        cChars.innerHTML = m.completion.chars.map(ch =>
          `<span class="completion-char completion-char-${ch.id}" style="color:${colorOf(ch.id)}">${ch.char}</span>`
        ).join('');
      }
      const cSub = banner.querySelector('.completion-subtitle');
      if (cSub && m.completion.subtitle) {
        const title = m.completion.subtitle.title || '';
        const lines = (m.completion.subtitle.lines || []).join('&nbsp;&nbsp; ');
        cSub.innerHTML = `${title}<br />${lines}`;
      }
    }
  }

  const phaseNav = document.getElementById('phase-nav');
  if (phaseNav) {
    phaseNav.innerHTML = phases.map((ph, i) => `
      <button
        class="phase-nav-btn ${i === 0 ? 'active' : ''}"
        data-phase="${ph.id}"
        onclick="goToPhase(${i})"
        title="${ph.title}"
      >
        ${ph.id}
      </button>
    `).join('');
  }

  const _savedProgress = LessonProgress.load();
  if (_savedProgress) showResumePrompt(_savedProgress); else goToPhase(0);
  LessonProgress.start();
  MediaCheck.start();

  // Click-Outside Listener لإغلاق لوحة مساعدة المعلم
  // ─────────────────────────────────────────────────
  // السلوك الافتراضي لـ <details> يُبقيها مفتوحة حتى النقر على summary.
  // هذا المستمع يغلقها فور النقر خارجها — تجربة أطبع لسير الدرس.
  const helpPanel = document.querySelector('.help-panel');
  if (helpPanel) {
    helpPanel.addEventListener('toggle', () => {
      STATE.helpPanelOpen = helpPanel.open;
    });
  }

  document.addEventListener('click', (e) => {
    const panel = document.querySelector('.help-panel');
    if (panel && panel.open && !panel.contains(e.target)) {
      closeTeacherHelpPanel();
    }
  });

  syncSecondaryLanguageVisibility();
  _updateThemeButton(document.documentElement.dataset.theme || 'dark');

  console.log('✓ نظام المحاضرة جاهز — Classroom Readiness Fix');
  console.log('الاختصارات: Space=تقدم | ←=تراجع | A=انتباه | F=شاشة كاملة | T=تبديل الوضع | 1-7=قفز للمرحلة');
});
