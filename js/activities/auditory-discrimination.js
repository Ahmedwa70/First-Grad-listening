/**
 * js/activities/auditory-discrimination.js
 * Extracted verbatim from app.js during Phase 2 engine cleanup.
 */
'use strict';
// ══════════════════════════════════════════════════════════════
// P6 — التمييز السمعي
// ══════════════════════════════════════════════════════════════
let p6SoundTimer = null;

// ── P6 Performance Tracker (DOM-independent) ─────────────────
const P6Performance = {
  _rounds: {},

  reset() {
    this._rounds = {};
  },

  initRound(roundId) {
    if (!this._rounds[roundId]) {
      this._rounds[roundId] = { correct: 0, wrong: 0, attempts: 0, items: [] };
    }
  },

  record(roundId, itemIndex, outcome) {
    this.initRound(roundId);
    const r = this._rounds[roundId];
    r.attempts++;
    if (outcome === 'correct') r.correct++;
    else if (outcome === 'wrong') r.wrong++;
    r.items[itemIndex] = outcome;
  },

  getRound(roundId) {
    this.initRound(roundId);
    return Object.assign({}, this._rounds[roundId]);
  },

  getSummary() {
    const rounds = Object.keys(this._rounds);
    let correct = 0, wrong = 0, attempts = 0;
    rounds.forEach(id => {
      const r = this._rounds[id];
      correct += r.correct;
      wrong += r.wrong;
      attempts += r.attempts;
    });
    return { rounds: rounds.length, correct, wrong, attempts };
  },

  getSnapshot() {
    const round = getCurrentP6Round();
    return {
      activity: 'auditory-discrimination',
      round: round ? round.id : null,
      roundType: round ? round.type : null,
      itemIndex: STATE.p6PairIndex,
      stats: round ? this.getRound(round.id) : null,
      summary: this.getSummary(),
    };
  },
};

function p6Str(key, sub) {
  const s = LESSON.p6Strings;
  const obj = sub ? (s[sub] && s[sub][key]) : s[key];
  if (!obj) return '';
  return typeof obj === 'string' ? obj : (obj.ar || '');
}

function p6StrZh(key, sub) {
  const s = LESSON.p6Strings;
  const obj = sub ? (s[sub] && s[sub][key]) : s[key];
  if (!obj) return '';
  return typeof obj === 'string' ? '' : (obj.zh || '');
}

// ══════════════════════════════════════════════════════════════
// P6 — Phase 3: Teacher Guidance Mode
// مؤشر هدف الجولة + إرشاد خطوة المعلم، يُدمجان inline مع
// round-nav في رأس الحصة نفسه — دون صف/ترويسة جديدة، ودون أي
// تغيير في منطق التعلم أو تجربة الطلاب (يراه المعلم فقط).
// ══════════════════════════════════════════════════════════════

// نص خطوة المعلم الحالية: قبل التشغيل ← بعد التشغيل ← بعد الكشف.
function p6GuideStepText(round) {
  const s = LESSON.p6Strings;
  const g = (s[round.type] && s[round.type].teacherGuide) || s.identify.teacherGuide;
  if (STATE.p6AnswerVisible) return g.reveal.ar;
  return STATE.p6SoundPlayed ? g.listen.ar : g.before.ar;
}

// تحديث نص الخطوة في DOM مباشرة دون إعادة رسم كاملة (حتى لا
// تُمسح حالة "جارٍ الاستماع" المرسومة عبر CSS في Phase 2).
function p6UpdateGuideStepEl() {
  const stepEl = document.querySelector('.p6-guide-step');
  if (!stepEl) return;
  stepEl.textContent = p6GuideStepText(getCurrentP6Round());
}

// تطبيق حالة الكشف على DOM القائم دون إعادة رسم كاملة:
// يبدّل data-reveal-step + class visible + نص زر المدرّس + التلميح +
// إرشاد الخطوة، فتُحرّك انتقالات CSS الظهور تدرّجياً (راحة وهدوء
// صفي) بدل الاستبدال المفاجئ الذي يحدثه renderP6 الكامل.
function p6ApplyReveal() {
  const round = getCurrentP6Round();
  const step  = STATE.p6AnswerVisible ? Math.max(1, STATE.p6RevealStep) : 0;
  const zone = document.querySelector('.p6-answer-zone');
  const d3Sequence = document.querySelector('.p6-d3-sequence');
  if (round.type === 'close' && d3Sequence) {
    d3Sequence.dataset.revealStep = String(step);
    d3Sequence.classList.toggle('visible', STATE.p6AnswerVisible);
  } else if (zone) {
    zone.dataset.revealStep = String(step);
    zone.classList.toggle('visible', STATE.p6AnswerVisible);
  } else {
    return;
  }

  const revealBtn = document.querySelector('.p6-reveal-btn');
  const actionRow = document.querySelector('.p6-action-row');
  const nextBtn   = document.querySelector('.p6-next-btn');
  const d3InProgress = round.type === 'close' && STATE.p6RevealStep < p6D3RevealCount(round);
  if (revealBtn) {
    revealBtn.classList.toggle('hidden', STATE.p6AnswerVisible && !d3InProgress);
    if (d3InProgress) revealBtn.innerHTML = p6FollowupActionLabel(round);
  }
  if (actionRow) actionRow.classList.toggle('hidden', !STATE.p6AnswerVisible || d3InProgress);
  if (nextBtn) nextBtn.innerHTML = p6FollowupActionLabel(round);

  updateHint('');
}

// حالة الاستماع الفورية: يُضاء الزر المضغوط + منطقته مع رسالة
// "جارٍ الاستماع" عبر CSS (content) دون أي DOM جديد أو تغيير في
// AudioManager — يُزال بعد انتهاء المدة الافتراضية أو إعادة الرسم.
function p6MarkSoundButton(el) {
  if (!el) return;
  const zone = el.closest('.p6-play-zone, .p6-pair-zone, .p6-close-zone');
  el.classList.add('is-playing');
  if (zone) zone.classList.add('is-playing');
  clearTimeout(p6SoundTimer);
  p6SoundTimer = setTimeout(() => {
    el.classList.remove('is-playing');
    if (zone) zone.classList.remove('is-playing');
  }, 2600);
}

function p6DisposeD2Activity() {
  if (!STATE.p6D2Activity || !window.ACTIVITY_ENGINE) return;
  window.ACTIVITY_ENGINE.destroy(STATE.p6D2Activity.instanceId);
  STATE.p6D2Activity = null;
}

function p6EnsureD2Activity(round) {
  if (!round || round.type !== 'sameordiff' || !window.P6D2Bridge) {
    p6DisposeD2Activity();
    return null;
  }

  const currentSource = STATE.p6D2Activity && STATE.p6D2Activity.content
    ? STATE.p6D2Activity.content.sourceRoundId
    : null;
  if (!STATE.p6D2Activity || currentSource !== round.id) {
    p6DisposeD2Activity();
    STATE.p6D2Activity = window.P6D2Bridge.createForRound(round, {
      instanceId: `p6-d2-${round.id}`
    });
  }

  const snapshot = STATE.p6D2Activity.getSnapshot();
  const currentIndex = snapshot.data && snapshot.data.state
    ? snapshot.data.state.itemIndex
    : -1;
  if (currentIndex !== STATE.p6PairIndex && STATE.p6D2Activity.can('PRESENT')) {
    STATE.p6D2Activity.dispatch('PRESENT', { index: STATE.p6PairIndex });
  }
  return STATE.p6D2Activity;
}

// Public observation hook for the existing teacher controller or a future
// response surface. It changes engine state only; the current P6 UI remains unchanged.
function p6ObserveD2Response(choice) {
  const round = getCurrentP6Round();
  const activity = p6EnsureD2Activity(round);
  if (!activity || round.type !== 'sameordiff' || !activity.can('OBSERVE_RESPONSE')) return null;
  return activity.dispatch('OBSERVE_RESPONSE', { choice });
}

// ══════════════════════════════════════════════════════════════
// حارس احتواء الحرف داخل صندوقه في جولة «تعرّف على الحرف».
// الثابت: حبر الحرف لا يتجاوز الصندوق المخصّص له، فلا يلامس ما تحته.
// الحروف العربية ذات الأقواس النازلة (غ ج ح ع ض) تكسر هذا الثابت
// متى عاد line-height إلى 1 — ولا يظهر الكسر إلا في بعض الحروف،
// فيسهل أن يمرّ دون انتباه. الحارس يقيس الحبر الحقيقي عبر Canvas
// (actualBoundingBox) ويقارنه بارتفاع الصندوق، ثم ينبّه في الطرفية.
// ══════════════════════════════════════════════════════════════
function p6AssertGlyphFits() {
  const el = document.querySelector('.p6-answer-d1 .p6-answer-char');
  if (!el || !el.textContent.trim()) return;
  let ink;
  try {
    const cs = getComputedStyle(el);
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) return;
    ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    const m = ctx.measureText(el.textContent.trim());
    if (m.actualBoundingBoxAscent == null) return;   // متصفّح لا يدعم القياس
    ink = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
  } catch (e) { return; }

  const box = el.getBoundingClientRect().height;
  if (ink > box + 0.5) {
    console.warn(
      `⚠️ ثابت P6 مكسور: حبر الحرف «${el.textContent.trim()}» ${ink.toFixed(1)}px ` +
      `يتجاوز صندوقه ${box.toFixed(1)}px، فسيلامس ما تحته. ` +
      'السبب غالباً line-height منخفض على ‎.p6-answer-d1 .p6-answer-char‎ — ' +
      'راجع التعليق فوق القاعدة في css/style.css.'
    );
  }

  // الثابت الثاني: البطاقة تسع محتواها كاملاً.
  // البطاقة overflow:hidden، فإن كبر الحرف أكثر مما يحتمل الارتفاع
  // اختفى الشرح أسفلها بصمت — لا شريط تمرير ولا أثر. يقع هذا على
  // الشاشات القصيرة وحدها، وهي التي لا نراها على جهاز التطوير.
  const zone = el.closest('.p6-answer-d1');
  if (zone && zone.scrollHeight > zone.clientHeight + 1) {
    const over = zone.scrollHeight - zone.clientHeight;
    console.warn(
      `⚠️ ثابت P6 مكسور: بطاقة «تعرّف على الحرف» تقصّ ${over}px من محتواها ` +
      `(الشاشة ${window.innerHeight}px، حجم الحرف ${getComputedStyle(el).fontSize}). ` +
      'الاسم أو الشرح أسفل الحرف مخفيّ الآن. ' +
      'صغّر ‎--p6-glyph-size‎ في النطاق المناسب — راجع التعليق فوق ‎.p6-answer-d1‎ في css/style.css.'
    );
  }
}

function p6PlaySound(letterId, el) {
  p3PlaySound(letterId);
  p6MarkSoundButton(el);
  STATE.p6SoundPlayed = true;

  const round = getCurrentP6Round();
  const activity = p6EnsureD2Activity(round);
  if (activity && round.type === 'sameordiff') {
    const pairButtons = Array.from(document.querySelectorAll('.p6-pair-play'));
    const pairIndex = pairButtons.indexOf(el);
    const command = pairIndex === 1 ? 'PLAY_SECOND' : 'PLAY_FIRST';
    if (activity.can(command)) activity.dispatch(command, { audioRef: letterId });
  }
  p6UpdateGuideStepEl();
}

function initP6() {
  p6DisposeD2Activity();
  P6Performance.reset();
  STATE.p6RoundIndex    = 0;
  STATE.p6PairIndex     = 0;
  STATE.p6AnswerVisible = false;
  STATE.p6RevealStep    = 0;
  STATE.p6SoundPlayed   = false;
  STATE.p6DemoMode      = true;
  STATE.p6DemoStep      = 0;
  const zone = document.getElementById('content-zone');
  zone.innerHTML = `<div class="p6-container" id="p6-container"></div>`;
  renderP6();
  updatePhaseBar();
  PhaseTimer.start('P6');
}

function renderP6Demo() {
  const container = document.getElementById('p6-container');
  if (!container) return;
  const demo = LESSON.p6Demo;
  const cur = STATE.p6DemoStep;
  const total = demo.steps.length;
  const step = demo.steps[cur];
  const isLast = cur >= total - 1;
  const letters = LESSON.letters;

  const frameExists = container.querySelector('.p6-stepper');

  if (!frameExists) {
    container.innerHTML = `
      <div class="p6-stepper">
        <div class="p6-stepper-nav">
          ${demo.steps.map((_, i) => `${i > 0 ? '<div class="p6-step-line"></div>' : ''}<button class="p6-step-ind" onclick="p6GoDemo(${i})">${i + 1}</button>`).join('')}
        </div>
        <span class="p6-stepper-badge"></span>
        <div class="p6-stepper-content"></div>
        <div class="p6-stepper-footer">
          <div class="p6-stepper-guide">
            <span class="p6-stepper-guide-label">💡 للمعلم:</span>
            <span class="p6-stepper-guide-text"></span>
          </div>
          <button class="p6-stepper-btn"></button>
        </div>
      </div>
    `;
  }

  const indicators = container.querySelectorAll('.p6-step-ind');
  const lines = container.querySelectorAll('.p6-step-line');
  indicators.forEach((ind, i) => {
    ind.classList.toggle('done', i < cur);
    ind.classList.toggle('active', i === cur);
  });
  lines.forEach((line, i) => {
    line.classList.toggle('done', i < cur);
  });

  container.querySelector('.p6-stepper-badge').textContent = `تعليمات النشاط ${cur + 1}/${total}`;
  container.querySelector('.p6-stepper-guide-text').textContent = step.teacherHint;

  const btn = container.querySelector('.p6-stepper-btn');
  btn.textContent = isLast ? 'ابدأ النشاط 🚀' : 'التالي ←';
  btn.className = isLast ? 'p6-stepper-btn start' : 'p6-stepper-btn';
  btn.onclick = isLast ? p6EndDemo : p6AdvanceDemo;

  let bodyHTML = '';
  const demoLetter = letters.find(l => l.id === step.exampleLetterId);
  if (step.id === 'demo-listen') {
    bodyHTML = `
      <p class="p6-stepper-title">${step.ar}</p>
      <p class="p6-stepper-zh secondary-language">${step.zh}</p>
      <div class="p6-stepper-audio" onclick="p6PlaySound('${step.exampleLetterId}', this)">
        <span class="p6-stepper-audio-icon">🔊</span>
        <div class="p6-stepper-waves"><span></span><span></span><span></span><span></span><span></span></div>
        <span class="p6-stepper-audio-label">اضغط لسماع صوت ال${demoLetter ? demoLetter.name : ''}</span>
      </div>`;
  } else if (step.id === 'demo-fingers') {
    bodyHTML = `
      <p class="p6-stepper-title">ارفعوا عدد الأصابع المناسب عند سماع الصوت</p>
      <p class="p6-stepper-zh secondary-language">听到声音时举起对应数量的手指</p>
      <div class="p6-finger-grid">
        ${letters.map((l, i) => `
          <div class="p6-finger-card" style="--fc-color:${l.color}">
            <span class="p6-finger-num">${i + 1}</span>
            <span class="p6-finger-char">${l.char}</span>
          </div>
        `).join('')}
      </div>`;
  } else if (step.id === 'demo-same-diff') {
    bodyHTML = `
      <p class="p6-stepper-title">${step.ar}</p>
      <p class="p6-stepper-zh secondary-language">${step.zh}</p>
      <div class="p6-compare-stack">
        <div class="p6-compare-card same">
          <div class="p6-compare-icons">
            <span>🔊</span>
            <span class="p6-compare-op">=</span>
            <span>🔊</span>
          </div>
          <div class="p6-compare-body">
            <span class="p6-compare-label">نفس الصوت (متماثل)</span>
            <span class="p6-compare-gesture">👍👍</span>
          </div>
        </div>
        <div class="p6-compare-card diff">
          <div class="p6-compare-icons">
            <span>🔊</span>
            <span class="p6-compare-op">≠</span>
            <span>🔊</span>
          </div>
          <div class="p6-compare-body">
            <span class="p6-compare-label">صوت مختلف</span>
            <span class="p6-compare-gesture">🙅</span>
          </div>
        </div>
      </div>`;
  }

  const content = container.querySelector('.p6-stepper-content');
  content.style.opacity = '0';
  requestAnimationFrame(() => {
    content.innerHTML = bodyHTML;
    requestAnimationFrame(() => { content.style.opacity = '1'; });
  });

  updateHint('');
}

function p6GoDemo(step) {
  const total = LESSON.p6Demo.steps.length;
  if (step >= 0 && step < total) {
    STATE.p6DemoStep = step;
    renderP6Demo();
  }
}

function p6AdvanceDemo() {
  if (STATE.p6DemoStep < LESSON.p6Demo.steps.length - 1) {
    STATE.p6DemoStep++;
    renderP6Demo();
  } else {
    p6EndDemo();
  }
}

function p6EndDemo() {
  STATE.p6DemoMode = false;
  STATE.p6DemoStep = 0;
  renderP6();
}

function p6SkipDemo() {
  STATE.p6DemoMode = false;
  STATE.p6DemoStep = 0;
  renderP6();
}

function p6D3RevealCount(round) {
  if (!round || round.type !== 'close') return 0;
  const items = round.triplets || [];
  return items[STATE.p6PairIndex]?.ids?.length || 0;
}

function p6InitialRevealLabel(round) {
  const kbd = '<span class="p6-kbd">Space ␣</span>';
  return round && round.type === 'close'
    ? `كشف الصوت الأول ${kbd}`
    : `كشف الإجابة ${kbd}`;
}

function p6FollowupActionLabel(round) {
  const kbd = '<span class="p6-kbd">Space ␣</span>';
  if (round && round.type === 'identify' && STATE.p6AnswerVisible) {
    setTimeout(p6AssertGlyphFits, 60);
  }
  if (round && round.type === 'identify' && STATE.p6RevealStep < 3) {
    return STATE.p6RevealStep === 1
      ? `كشف اسم الحرف ${kbd}`
      : `كشف عدد الأصابع ${kbd}`;
  }
  if (round && round.type === 'close') {
    const ordinals = ['الأول', 'الثاني', 'الثالث'];
    const total = p6D3RevealCount(round);
    if (STATE.p6RevealStep < total) {
      return `كشف الصوت ${ordinals[STATE.p6RevealStep]} ${kbd}`;
    }
  }
  return `السؤال التالي ← ${kbd}`;
}

function advanceP6() {
  if (STATE.p6DemoMode) {
    p6AdvanceDemo();
    return;
  }

  const round = getCurrentP6Round();
  const maxStep = round.type === 'identify'
    ? 3
    : (round.type === 'close' ? p6D3RevealCount(round) : 1);
  const d2Activity = p6EnsureD2Activity(round);

  if (!STATE.p6AnswerVisible) {
    if (d2Activity && d2Activity.can('REVEAL')) d2Activity.dispatch('REVEAL');
    STATE.p6AnswerVisible = true;
    STATE.p6RevealStep = 1;
    P6Performance.initRound(round.id);
    p6ApplyReveal();
    return;
  }

  if (STATE.p6RevealStep < maxStep) {
    STATE.p6RevealStep++;
    p6ApplyReveal();
    return;
  }

  const items  = round.pairs || round.triplets || [];
  if (d2Activity && d2Activity.can('NEXT')) d2Activity.dispatch('NEXT');
  STATE.p6AnswerVisible = false;
  STATE.p6RevealStep = 0;

  if (STATE.p6PairIndex < items.length - 1) {
    STATE.p6PairIndex++;
    STATE.p6SoundPlayed = false;
    if (!p6RenderCurrentItemInPlace()) renderP6();
  } else {
    const phase = LESSON.phases.find(p => p.id === 'P6');
    if (STATE.p6RoundIndex < phase.roundOrder.length - 1) {
      STATE.p6RoundIndex++;
      STATE.p6PairIndex = 0;
      STATE.p6SoundPlayed = false;
      renderP6();
    } else {
      goToPhase(6);
    }
  }
}

function getCurrentP6Round() {
  const phase = LESSON.phases.find(p => p.id === 'P6');
  const roundId = phase.roundOrder[STATE.p6RoundIndex];
  return LESSON.discriminationRounds.find(r => r.id === roundId);
}

function p6BuildItemHTML(round, item, revealStep = 0) {
  const s = LESSON.p6Strings;
  const visible = STATE.p6AnswerVisible ? 'visible' : '';

  if (round.type === 'identify') {
    const letter = LESSON.letters.find(l => l.id === item.playId);
    const dotsRow = Array.from({ length: letter.dots }, () => '<span class="dot-circle"></span>').join('');
    const fingerWord = item.answer === 1 ? s.ui.finger.ar : s.ui.fingers.ar;
    // الشريحة لمعلومة قصيرة محدّدة، والجملة التعليمية سطرٌ حرّ أسفلها.
    // كانت letter.fact — وهي جملة كاملة — تُحشر داخل شريحة بـ nowrap
    // فتبتلع عرض المنطقة كلّه.
    const dotWord = letter.dots === 1 ? 'نقطة واحدة'
                  : letter.dots === 2 ? 'نقطتان'
                  : letter.dots ? letter.dots + ' نقاط' : '';
    const dotsLabel = letter.dots ? dotWord + ' ' + (letter.dotPosition || '') : 'بلا نقاط';
    return `
      <div class="p6-q-banner">
        <div class="p6-q-banner-text">
          <span class="p6-question-text">${s.identify.question.ar}</span>
          ${s.identify.question.zh ? `<span class="p6-question-zh secondary-language">${s.identify.question.zh}</span>` : ''}
        </div>
        <button class="p6-play-pill" onclick="p6PlaySound('${item.playId}', this)" style="--sound-color:${letter.color}" aria-label="تشغيل الصوت">
          <span class="p6-play-pill-icon" aria-hidden="true">🔊</span>
        </button>
      </div>
      <div class="p6-answer-zone p6-answer-d1 ${visible}" data-reveal-step="${revealStep}">
        <div class="p6-card-prompt"><span class="p6-listen-icon">👂</span></div>
        <span class="p6-reveal-item r-char p6-answer-char p6-letter-glyph" style="color:${letter.color}">${letter.char}</span>
        <span class="p6-reveal-item r-name p6-answer-name">${letter.name} &bull; ${letter.phoneme}</span>
        <div class="p6-reveal-item r-fingers p6-answer-meta">
          <div class="p6-finger-chips">
            <div class="p6-chip p6-chip-finger"><span class="p6-chip-num">${item.answer}</span><span class="p6-chip-label">${fingerWord}</span></div>
            <div class="p6-chip p6-chip-dot"><span class="p6-chip-dots">${dotsRow}</span><span class="p6-chip-label">${dotsLabel}</span></div>
          </div>
          <p class="p6-answer-fact">${letter.fact}</p>
        </div>
      </div>`;
  }

  if (round.type === 'sameordiff') {
    const l1 = LESSON.letters.find(l => l.id === item.playIds[0]);
    const l2 = LESSON.letters.find(l => l.id === item.playIds[1]);
    const sameText = item.same ? s.sameordiff.same.ar : s.sameordiff.diff.ar;
    const gestureHint = item.same ? '👍👍 الإشارة: رفع الإبهامين للأعلى' : '🙅 الإشارة: عقد الأصابع (تقاطع اليدين)';
    const chips = item.same
      ? `<div class="p6-reveal-item r-chars p6-d2-same-detail"><span class="p6-d2-char p6-letter-glyph" style="color:${l1.color}">${l1.char}</span><span class="p6-d2-name">${l1.name} &bull; ${l1.phoneme}</span></div>`
      : `<div class="p6-reveal-item r-chars p6-d2-diff-chips">
          <div class="p6-d2-chip" style="border-color:${l1.color}"><span class="p6-d2-chip-label">الصوت الأول</span><span class="p6-d2-chip-char p6-letter-glyph" style="color:${l1.color}">${l1.char}</span><span class="p6-d2-chip-name">${l1.name} &bull; ${l1.phoneme}</span></div>
          <div class="p6-d2-chip" style="border-color:${l2.color}"><span class="p6-d2-chip-label">الصوت الثاني</span><span class="p6-d2-chip-char p6-letter-glyph" style="color:${l2.color}">${l2.char}</span><span class="p6-d2-chip-name">${l2.name} &bull; ${l2.phoneme}</span></div>
        </div>`;
    return `
      <div class="p6-compare-banner">
        <button class="p6-cmp-play" onclick="p6PlaySound('${item.playIds[0]}', this)" style="--sound-color:${l1.color}" aria-label="تشغيل الصوت الأول"><span class="p6-cmp-play-icon" aria-hidden="true">🔊</span></button>
        <div class="p6-cmp-center"><span class="p6-cmp-question">${s.sameordiff.question.ar}</span>${s.sameordiff.question.zh ? `<span class="p6-cmp-zh secondary-language">${s.sameordiff.question.zh}</span>` : ''}<span class="p6-cmp-vs">⟷</span></div>
        <button class="p6-cmp-play" onclick="p6PlaySound('${item.playIds[1]}', this)" style="--sound-color:${l2.color}" aria-label="تشغيل الصوت الثاني"><span class="p6-cmp-play-icon" aria-hidden="true">🔊</span></button>
      </div>
      <div class="p6-answer-zone p6-answer-d2 ${item.same ? 'p6-d2-same' : ''} ${visible}" data-reveal-step="${revealStep}">
        <div class="p6-d2-prompt"><span class="p6-listen-icon">👂</span></div>
        <span class="p6-reveal-item r-result p6-same-badge ${item.same ? 'same' : 'diff'}">${sameText}</span>
        ${chips}
        <div class="p6-reveal-item r-gesture p6-d2-gesture">${gestureHint}</div>
      </div>`;
  }

  const letters = item.ids.map(id => LESSON.letters.find(l => l.id === id));
  const d3Count = letters.length;
  return `
    <section class="p6-d3-sequence p6-d3-count-${d3Count}" style="--d3-columns:${d3Count}" data-reveal-step="${revealStep}">
      <div class="p6-sim-header"><span class="p6-sim-title">${s.close.listenPrompt.ar}</span><span class="p6-sim-zh secondary-language">${s.close.listenPrompt.zh}</span></div>
      <div class="p6-d3-columns p6-d3-letter-grid">
        ${letters.map((l, index) => `
          <article class="p6-d3-column" style="--sim-color:${l.color}">
            <button class="p6-sim-play" onclick="p6PlaySound('${l.id}', this)" aria-label="تشغيل الصوت ${index + 1}">
              <span class="p6-sim-play-icon" aria-hidden="true">🔊</span>
            </button>
            <div class="p6-d3-reveal-card p6-d3-letter-card" data-d3-index="${index + 1}">
              <div class="p6-d3-card-prompt"><span class="p6-listen-icon">👂</span></div>
              <div class="p6-d3-card-answer">
                <span class="p6-d3-lc-char p6-letter-glyph" style="color:${l.color}">${l.char}</span>
                <span class="p6-d3-lc-name">${l.name} &bull; ${l.phoneme}</span>
              </div>
            </div>
          </article>`).join('')}
      </div>
      <div class="p6-d3-rule"><span class="p6-d3-rule-icon">💡</span><span class="p6-d3-rule-text">القاعدة: ${item.note}</span></div>
    </section>`;
}

function renderP6() {
  if (STATE.p6DemoMode) {
    renderP6Demo();
    return;
  }

  const container = document.getElementById('p6-container');
  if (!container) return;
  const round  = getCurrentP6Round();
  p6EnsureD2Activity(round);
  const phase  = LESSON.phases.find(p => p.id === 'P6');
  const items  = round.pairs || round.triplets || [];
  const item   = items[STATE.p6PairIndex];
  const revealStep = STATE.p6AnswerVisible ? Math.max(1, STATE.p6RevealStep) : 0;
  const s = LESSON.p6Strings;

  const guideData = s[round.type] ? s[round.type].teacherGuide : s.identify.teacherGuide;

  const roundNav = phase.roundOrder.map((rid, i) => {
    const r = LESSON.discriminationRounds.find(x => x.id === rid);
    const perf = P6Performance.getRound(rid);
    const perfBadge = perf.attempts > 0
      ? `<span class="p6-round-perf">${perf.correct}/${perf.attempts}</span>`
      : '';
    return `<button class="p6-round-btn ${i === STATE.p6RoundIndex ? 'active' : ''}"
      onclick="p6GoRound(${i})">${r.label}${perfBadge}</button>`;
  }).join('');

  const itemHTML = p6BuildItemHTML(round, item, revealStep);
  const kbd = '<span class="p6-kbd">Space ␣</span>';
  const revealLabel = p6InitialRevealLabel(round);
  const nextLabel = STATE.p6AnswerVisible
    ? p6FollowupActionLabel(round)
    : revealLabel;

  container.innerHTML = `
    <div class="p6-header">
      <div class="p6-round-nav">${roundNav}</div>
    </div>

    <div class="p6-main">
      <div class="p6-stage">
        ${itemHTML}
      </div>
      <div class="p6-controls">
        <div class="p6-counter">
          ${progressDots(STATE.p6PairIndex, items.length)}
        </div>
        <button class="p6-reveal-btn ${STATE.p6AnswerVisible ? 'hidden' : ''}"
          onclick="advanceP6()">${revealLabel}</button>
        <div class="p6-action-row ${STATE.p6AnswerVisible ? '' : 'hidden'}">
          <div class="p6-obs-row">
            <button class="p6-obs-btn" data-val="correct" onclick="p6MarkResponse('correct')">✓</button>
            <button class="p6-obs-btn" data-val="wrong" onclick="p6MarkResponse('wrong')">✗</button>
          </div>
          <button class="p6-next-btn" onclick="advanceP6()">${nextLabel}</button>
        </div>
      </div>
    </div>

    <div class="p6-teacher-bar">
      <span class="p6-teacher-bar-icon">💡</span>
      <span class="p6-teacher-bar-label">للمعلم:</span>
      <span>${round.instruction}</span>
    </div>
  `;

  updateHint('');
}

function p6RenderCurrentItemInPlace() {
  const container = document.getElementById('p6-container');
  const round = getCurrentP6Round();
  const stage = container && container.querySelector('.p6-stage');
  if (!container || !round || !stage) return false;

  const items = round.pairs || round.triplets || [];
  const item = items[STATE.p6PairIndex];
  if (!item) return false;

  const template = document.createElement('template');
  template.innerHTML = p6BuildItemHTML(round, item, 0).trim();
  const nextNodes = Array.from(template.content.children);
  if (round.type === 'close') {
    const currentSequence = stage.querySelector('.p6-d3-sequence');
    const nextSequence = nextNodes[0];
    if (nextNodes.length !== 1 || !currentSequence || !nextSequence) return false;

    // Keep the D3 spatial shell mounted; change only its question-specific internals.
    currentSequence.innerHTML = nextSequence.innerHTML;
    currentSequence.className = nextSequence.className;
    currentSequence.setAttribute('style', nextSequence.getAttribute('style') || '');
    currentSequence.dataset.revealStep = '0';
  } else {
    const currentBanner = stage.children[0];
    const currentZone = stage.children[1];
    if (nextNodes.length !== 2 || !currentBanner || !currentZone) return false;

    // Preserve the two outer shells; only their inner content is replaced.
    currentBanner.innerHTML = nextNodes[0].innerHTML;
    currentZone.innerHTML = nextNodes[1].innerHTML;
    currentBanner.className = nextNodes[0].className;
    currentZone.className = nextNodes[1].className;
    currentZone.dataset.revealStep = '0';
  }

  const kbd = '<span class="p6-kbd">Space ␣</span>';
  const revealBtn = container.querySelector('.p6-reveal-btn');
  const actionRow = container.querySelector('.p6-action-row');
  const nextBtn = container.querySelector('.p6-next-btn');
  const counter = container.querySelector('.p6-counter');
  if (counter) counter.innerHTML = progressDots(STATE.p6PairIndex, items.length);
  if (revealBtn) {
    revealBtn.classList.remove('hidden');
    revealBtn.innerHTML = p6InitialRevealLabel(round);
  }
  if (actionRow) actionRow.classList.add('hidden');
  if (nextBtn) nextBtn.innerHTML = p6InitialRevealLabel(round);

  p6EnsureD2Activity(round);
  updateHint('');
  return true;
}

function p6GoRound(i) {
  STATE.p6RoundIndex    = i;
  STATE.p6PairIndex     = 0;
  STATE.p6AnswerVisible = false;
  STATE.p6RevealStep    = 0;
  STATE.p6SoundPlayed   = false;
  renderP6();
}

function p6MarkResponse(outcome) {
  const round = getCurrentP6Round();
  P6Performance.record(round.id, STATE.p6PairIndex, outcome);
  const btn = document.querySelector(`.p6-obs-btn[data-val="${outcome}"]`);
  document.querySelectorAll('.p6-obs-btn').forEach(b => b.classList.remove('selected'));
  if (btn) btn.classList.add('selected');
}
