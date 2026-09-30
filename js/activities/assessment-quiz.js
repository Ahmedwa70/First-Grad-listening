/**
 * js/activities/assessment-quiz.js
 * Extracted verbatim from app.js during Phase 2 engine cleanup.
 */
'use strict';
// ══════════════════════════════════════════════════════════════
// P7 — التقييم الختامي
// ══════════════════════════════════════════════════════════════
function initP7() {
  STATE.p7RoundIndex    = 0;
  STATE.p7ItemIndex     = 0;
  STATE.p7AnswerVisible = false;
  STATE.p7Scores        = {};
  const zone = document.getElementById('content-zone');
  zone.innerHTML = `<div class="p7-container" id="p7-container"></div>`;
  renderP7();
  updatePhaseBar();
  PhaseTimer.start('P7');
}

function advanceP7() {
  if (document.querySelector('.p7-summary')) {
    showCompletionBanner();
    return;
  }
  if (!STATE.p7AnswerVisible) {
    const glyphBefore = p7GlyphCentre();
    STATE.p7AnswerVisible = true;
    renderP7();
    // بعد انتهاء الانتقالات، لا قبلها: إزاحة مُتحرِّكة تُقرأ صفراً لحظةَ الرسم.
    setTimeout(() => p7AssertGlyphStable(glyphBefore), 450);
    return;
  }

  const round = getCurrentP7Round();
  STATE.p7AnswerVisible = false;

  if (STATE.p7ItemIndex < round.items.length - 1) {
    STATE.p7ItemIndex++;
    renderP7();
  } else {
    const phase = LESSON.phases.find(p => p.id === 'P7');
    if (STATE.p7RoundIndex < phase.roundOrder.length - 1) {
      STATE.p7RoundIndex++;
      STATE.p7ItemIndex  = 0;
      renderP7();
    } else {
      renderP7Summary();
    }
  }
}

function getCurrentP7Round() {
  const phase = LESSON.phases.find(p => p.id === 'P7');
  const roundId = phase.roundOrder[STATE.p7RoundIndex];
  return LESSON.assessmentRounds.find(r => r.id === roundId);
}

function p7PlaySound(letterId, el) {
  AudioManager.playLetter(letterId);
  if (el) {
    el.classList.add('is-playing');
    setTimeout(() => el.classList.remove('is-playing'), 2600);
  }
}

// مفتاح الرصد يُشتق وقت النقر لا وقت البناء.
// السبب: أزرار الرصد تُبنى مرة واحدة عند دخول P7 ولا يُعاد بناؤها مع
// كل سؤال، فمفتاحٌ محفور داخل onclick يتجمّد على السؤال الأول وتُدهس
// الرصدات الاثنتا عشرة فوق بعضها في خانة واحدة.
// ══════════════════════════════════════════════════════════════
// حارس ثبات الحرف عند كشف الإجابة.
// الثابت: كشف الإجابة لا يزحزح حرف السؤال ولو بكسل واحد.
// كُسر هذا الثابت ثلاث مرات من ثلاث جهات (إزاحة صريحة، نموّ خانة
// الإجابة، كِبَر البطاقة)، فكلّما أُصلحت جهة أعادته أخرى. الحارس
// لا يمنع الكسر — بل يجعله مسموعاً فوراً في طرفية المتصفح بدل أن
// يمرّ صامتاً إلى الفصل. التفصيل في كتلة «ثابت بنيوي» بـ style.css.
// ══════════════════════════════════════════════════════════════
function p7GlyphCentre() {
  const g = document.querySelector('.p7-stimulus-glyph, .p7-sound-answer-glyph');
  if (!g) return null;
  const r = g.getBoundingClientRect();
  return r.height ? r.top + r.height / 2 : null;
}

function p7AssertGlyphStable(before) {
  if (before == null) return;
  const after = p7GlyphCentre();
  if (after == null) return;
  const moved = Math.abs(after - before);
  if (moved > 1) {
    console.warn(
      `⚠️ ثابت P7 مكسور: الحرف تحرّك ${moved.toFixed(1)}px عند كشف الإجابة. ` +
      'السبب قاعدة تحت ‎.p7-assessment-card.revealed‎ تُغيّر ارتفاعاً أو حشواً أو transform. ' +
      'راجع كتلة «ثابت بنيوي» في css/style.css.'
    );
  }
}

function p7Score(val) {
  const key = `${STATE.p7RoundIndex}-${STATE.p7ItemIndex}`;
  STATE.p7Scores[key] = val;
  p7SyncScoreRow();
}

// يعكس رصد السؤال الحالي على الأزرار — عند النقر وعند كل سؤال جديد.
function p7SyncScoreRow() {
  const row = document.querySelector('.p7-score-row');
  if (!row) return;
  const chosen = STATE.p7Scores[`${STATE.p7RoundIndex}-${STATE.p7ItemIndex}`];
  row.classList.toggle('has-choice', !!chosen);
  row.querySelectorAll('.p7-score-btn').forEach(b =>
    b.classList.toggle('selected', chosen === b.dataset.val));
}

function p7PromptForRound(round) {
  const prompts = LESSON.p7Prompts;
  return prompts[round.id] || [round.label, ''];
}

function p7BuildQuestionBanner(round, item, letter) {
  const [ar, zh] = p7PromptForRound(round);
  return `<div class="p7-q-banner-ar">${ar}</div><div class="p7-q-banner-zh secondary-language">${zh}</div>`;
}

function p7BuildCardContent(round, item, letter) {
  const stimulus = round.type === 'sound'
    ? `<div class="p7-audio-platform" style="--sound-color:${letter.color}">
        <button class="p7-listen-ear" onclick="p7PlaySound('${item.letterId}', this)" aria-label="استمع إلى صوت الحرف">
          <span class="p7-listen-ear-icon" aria-hidden="true">👂</span>
        </button>
        <button class="p7-play-hint" onclick="p7PlaySound('${item.letterId}', this)" aria-label="تشغيل الصوت">
          <span aria-hidden="true">🔊</span> استمع
        </button>
      </div>
      <span class="p7-sound-answer-glyph p6-letter-glyph" style="color:${letter.color}" aria-hidden="true">${letter.char}</span>`
    : `<span class="p7-stimulus-glyph p6-letter-glyph" style="color:${letter.color}">${letter.char}</span>`;
  let answer = '';
  if (round.type === 'show-letter') {
    answer = `<div class="p7-answer-capsule"><span>${letter.name} &bull; ${letter.phoneme}</span><button class="p7-replay-btn" onclick="p7PlaySound('${item.letterId}', this)" style="--sound-color:${letter.color}" aria-label="إعادة الاستماع"><span aria-hidden="true">🔊</span></button></div>`;
  } else if (round.type === 'count-dots') {
    const dotLabels = { 1: 'نقطة واحدة', 2: 'نقطتان', 3: 'ثلاث نقاط' };
    const dotVisual = Array.from({ length: letter.dots }, () => '<span aria-hidden="true">●</span>').join('');
    const isBelow = letter.dotPosition === 'أسفل';
    const positionArrow = isBelow ? '⬇' : '⬆';
    const positionAr = isBelow ? 'أسفل الحرف' : 'أعلى الحرف';
    const positionZh = isBelow ? '下面' : '上面';
    answer = `<div class="p7-dot-chips-container" style="--dot-color:${letter.color}" aria-label="${dotLabels[letter.dots]}، ${positionAr}">
      <article class="p7-metric-chip p7-dot-count-chip">
        <span class="p7-metric-dots" aria-hidden="true">${dotVisual}</span>
        <span class="p7-metric-label">${dotLabels[letter.dots]}</span>
        <span class="cjk-hint secondary-language" lang="zh">(${letter.dots}点)</span>
      </article>
      <article class="p7-metric-chip p7-dot-position-chip">
        <span class="p7-metric-arrow" aria-hidden="true">${positionArrow}</span>
        <span class="p7-metric-label">${positionAr}</span>
        <span class="cjk-hint secondary-language" lang="zh">(${positionZh})</span>
      </article>
    </div>`;
  } else {
    answer = `<div class="p7-answer-capsule p7-sound-answer-capsule"><button class="p7-replay-btn" onclick="p7PlaySound('${item.letterId}', this)" style="--sound-color:${letter.color}" aria-label="إعادة الاستماع"><span aria-hidden="true">🔊</span></button><span class="p7-phoneme">${letter.phoneme}</span><span class="p7-sound-letter-name">• ${letter.name}</span></div>`;
  }
  return `<div class="p7-card-stimulus">${stimulus}</div><div class="p7-card-answer">${answer}</div>`;
}

function p7BuildHTML(round, item) {
  const phase = LESSON.phases.find(p => p.id === 'P7');
  const letter = LESSON.letters.find(l => l.id === item.letterId);
  const scoreKey = `${STATE.p7RoundIndex}-${STATE.p7ItemIndex}`;
  const roundNav = phase.roundOrder.map((rid, i) => {
    const r = LESSON.assessmentRounds.find(x => x.id === rid);
    return `<button class="p6-round-btn ${i === STATE.p7RoundIndex ? 'active' : ''}" onclick="p7GoRound(${i})">${r.label}</button>`;
  }).join('');
  const revealed = STATE.p7AnswerVisible ? 'revealed' : '';
  return `<div class="p7-shell">
    <header class="p7-header">
      <div class="p6-round-nav">${roundNav}</div>
    </header>
    <main class="p7-main">
      <div class="p7-floating-prompt">${p7BuildQuestionBanner(round, item, letter)}</div>
      <section class="p7-assessment-card ${revealed}" data-round="${round.id}">
        ${p7BuildCardContent(round, item, letter)}
      </section>
      <div class="p6-counter">${progressDots(STATE.p7ItemIndex, round.items.length)}</div>
      <div class="p7-controls ${revealed}">
        <button class="p7-primary-btn p7-reveal-btn ${revealed ? 'hidden' : ''}" onclick="advanceP7()">كشف الإجابة <span class="p6-kbd">Space ␣</span></button>
        <button class="p7-primary-btn p7-next-btn ${revealed ? '' : 'hidden'}" onclick="advanceP7()">السؤال التالي ← <span class="p6-kbd">Space ␣</span></button>
        <div class="p7-score-row ${revealed ? '' : 'hidden'} ${STATE.p7Scores[scoreKey] ? 'has-choice' : ''}" aria-label="رصد استجابة الصف">
          <button class="p7-score-btn correct ${STATE.p7Scores[scoreKey] === 'correct' ? 'selected' : ''}" data-val="correct" onclick="p7Score('correct')">✓ ممتاز</button>
          <button class="p7-score-btn partial ${STATE.p7Scores[scoreKey] === 'partial' ? 'selected' : ''}" data-val="partial" onclick="p7Score('partial')">◎ جيد</button>
          <button class="p7-score-btn wrong ${STATE.p7Scores[scoreKey] === 'wrong' ? 'selected' : ''}" data-val="wrong" onclick="p7Score('wrong')">✕ مراجعة</button>
        </div>
      </div>
    </main>
    <div class="p7-teacher-bar teacher-guide-strip"><span>💡</span><strong>للمعلم:</strong><span>${round.instruction}</span></div>
  </div>`;
}

function p7RenderInPlace() {
  const container = document.getElementById('p7-container');
  const round = getCurrentP7Round();
  if (!container || !round) return;
  const item = round.items[STATE.p7ItemIndex];
  const letter = LESSON.letters.find(l => l.id === item.letterId);
  const shell = container.querySelector('.p7-shell');
  if (!shell) {
    container.innerHTML = p7BuildHTML(round, item);
    return;
  }
  const card = shell.querySelector('.p7-assessment-card');
  const floatingPrompt = shell.querySelector('.p7-floating-prompt');
  const roundNav = shell.querySelector('.p6-round-nav');
  const controls = shell.querySelector('.p7-controls');
  const reveal = shell.querySelector('.p7-reveal-btn');
  const next = shell.querySelector('.p7-next-btn');
  const scoreRow = shell.querySelector('.p7-score-row');
  if (floatingPrompt) { floatingPrompt.innerHTML = p7BuildQuestionBanner(round, item, letter); }
  if (roundNav) roundNav.innerHTML = LESSON.phases.find(p => p.id === 'P7').roundOrder.map((rid, i) => { const r = LESSON.assessmentRounds.find(x => x.id === rid); return `<button class="p6-round-btn ${i === STATE.p7RoundIndex ? 'active' : ''}" onclick="p7GoRound(${i})">${r.label}</button>`; }).join('');
  if (card) { card.className = `p7-assessment-card ${STATE.p7AnswerVisible ? 'revealed' : ''}`; card.dataset.round = round.id; card.innerHTML = p7BuildCardContent(round, item, letter); }
  if (shell.querySelector('.p6-counter')) shell.querySelector('.p6-counter').innerHTML = progressDots(STATE.p7ItemIndex, round.items.length);
  if (controls) controls.classList.toggle('revealed', STATE.p7AnswerVisible);
  if (reveal) { reveal.classList.toggle('hidden', STATE.p7AnswerVisible); reveal.innerHTML = 'كشف الإجابة <span class="p6-kbd">Space ␣</span>'; }
  if (next) { next.classList.toggle('hidden', !STATE.p7AnswerVisible); next.innerHTML = 'السؤال التالي ← <span class="p6-kbd">Space ␣</span>'; }
  if (scoreRow) { scoreRow.classList.toggle('hidden', !STATE.p7AnswerVisible); p7SyncScoreRow(); }
  const teacher = shell.querySelector('.p7-teacher-bar span:last-child');
  if (teacher) teacher.textContent = round.instruction;
}

function renderP7() {
  p7RenderInPlace();
  // في P7: شريط المعلم داخل المرحلة وزر التحكم المركزي هما مصدر التوجيه الوحيد.
  updateHint('');
}

function p7GoRound(i) {
  STATE.p7RoundIndex    = i;
  STATE.p7ItemIndex     = 0;
  STATE.p7AnswerVisible = false;
  renderP7();
}

// الملخص يظهر أولاً — اللافتة تُفعَّل بزر يدوي فقط
function renderP7Summary() {
  PhaseTimer.stop();
  const container = document.getElementById('p7-container');
  if (!container) return;

  const total   = Object.keys(STATE.p7Scores).length;
  const correct = Object.values(STATE.p7Scores).filter(v => v === 'correct').length;
  const partial = Object.values(STATE.p7Scores).filter(v => v === 'partial').length;
  const wrong   = Object.values(STATE.p7Scores).filter(v => v === 'wrong').length;

  const dotLabel = n => n === 1 ? 'نقطة' : n === 2 ? 'نقطتان' : n + ' نقاط';
  const posIcon = p => p === 'أسفل' ? '⬇' : '⬆';

  const posLabel = p => p === 'أسفل' ? 'أسفل' : 'أعلى';

  container.innerHTML = `
    <div class="p7-summary">
      <div class="summary-topbar">
        <span class="summary-topbar-icon">🎓</span>
        <h2 class="summary-topbar-title">${LESSON.meta.summaryTitle}</h2>
        <span class="summary-topbar-sep">—</span>
        <span class="summary-topbar-sub">الحروف المكتسبة اليوم</span>
        ${total > 0 ? `
          <div class="summary-topbar-scores">
            <span class="ts-chip ts-correct">✓ ${correct}</span>
            <span class="ts-chip ts-partial">◎ ${partial}</span>
            <span class="ts-chip ts-wrong">✕ ${wrong}</span>
          </div>
        ` : ''}
      </div>
      <div class="summary-grid">
        ${LESSON.letters.map(l => `
          <article class="summary-card" style="--card-color:${l.color}">
            <div class="summary-zone-top">
              <span class="summary-letter-name">${l.name}</span>
            </div>
            <div class="summary-zone-hero">
              <span class="summary-char" style="color:${l.color}">${l.char}</span>
            </div>
            <div class="summary-zone-base">
              <span class="summary-base-dots" style="color:var(--card-color)">${'●'.repeat(l.dots)}</span>
              <span class="summary-base-desc">${l.dots} ${posLabel(l.dotPosition)}</span>
              <span class="summary-base-sep">•</span>
              <span class="summary-base-phoneme">${l.phoneme}</span>
            </div>
          </article>
        `).join('')}
      </div>
      <div class="summary-dock">
        <div class="summary-next-bar">
          <span class="summary-next-icon">⏭️</span>
          <span class="summary-next-label">المحاضرة القادمة:</span>
          <span class="summary-next-chars">${LESSON.meta.nextLesson.chars}</span>
          <span class="summary-next-sep">—</span>
          <span class="summary-next-hint">${LESSON.meta.nextLesson.hint}</span>
        </div>
        <div class="summary-actions">
          <button class="summary-btn summary-btn-success" onclick="showCompletionBanner()">🎓 عرض شهادة الإنجاز</button>
          <button class="summary-btn summary-btn-secondary" onclick="ClassReport.open()">📄 ورقة النتيجة</button>
          <button class="summary-btn summary-btn-secondary" onclick="goToPhase(0)">↺ إعادة الدرس</button>
        </div>
      </div>
    </div>
  `;
  // تظل شاشة P7 الختامية خالية من نصوص التوجيه العائمة العامة.
  updateHint('');
}
