/**
 * js/activities/letter-reveal.js
 * Extracted verbatim from app.js during Phase 2 engine cleanup.
 */
'use strict';
// ══════════════════════════════════════════════════════════════
// P3 — كشف الحروف
// ══════════════════════════════════════════════════════════════
function initP3() {
  STATE.p3LetterIndex = 0;
  STATE.p3RevealStep  = -1;
  STATE.p3CompletedLetters = [];
  STATE.p3ViewMode = 'single';
  STATE.p3AssessIndex = 0;
  STATE.p3AssessRevealed = false;
  const zone = document.getElementById('content-zone');
  zone.innerHTML = `<div class="p3-container" id="p3-container"></div>`;
  renderP3();
  updatePhaseBar();
  PhaseTimer.start('P3');
}

function buildP3Shell() {
  return `<div class="p3-container" id="p3-container"></div>`;
}

function renderP3() {
  const phase = LESSON.phases.find(p => p.id === 'P3');
  const container = document.getElementById('p3-container');
  if (!container) return;

  if (STATE.p3ViewMode === 'quad') {
    renderP3Quad(container);
    return;
  }

  if (STATE.p3ViewMode === 'assess') {
    renderP3Assess(container);
    return;
  }

  const letterId = phase.letterOrder[STATE.p3LetterIndex];
  const letter   = LESSON.letters.find(l => l.id === letterId);
  if (!letter) return;

  container.innerHTML = `
    <div class="p3-header">
      <div class="p6-counter">
        ${progressDots(STATE.p3LetterIndex, phase.letterOrder.length)}
      </div>
      <p class="p3-instruction">اضغط Space لكشف معلومات الحرف تدريجياً</p>
    </div>

    <div class="p3-card-wrapper">
      <div class="letter-card" id="p3-card" data-letter="${letter.id}">

        <div class="card-char-zone reveal-block" id="reveal-char">
          <span class="card-char" style="color: ${letter.color}">${letter.char}</span>
          <span class="card-char-name">${letter.name}</span>
        </div>

        <div class="card-dots-zone reveal-block" id="reveal-dots">
          <div class="dots-visual">${renderDotsVisual(letter)}</div>
          <span class="dots-label">${letter.dotPosition} — ${letter.dots} ${letter.dots === 1 ? 'نقطة' : 'نقاط'}</span>
        </div>

        <div class="card-phoneme-zone reveal-block" id="reveal-phoneme">
          <button class="phoneme-btn" onclick="p3PlaySound('${letter.id}')">
            <span class="phoneme-text">${letter.phoneme}</span>
            <span class="phoneme-label">اضغط للصوت</span>
            <div class="audio-indicator"></div>
          </button>
          <span class="ipa-badge">IPA: /${letter.ipa}/</span>
        </div>

        <div class="card-fact-zone reveal-block" id="reveal-fact">
          <div class="fact-box">
            <span class="fact-icon">◈</span>
            <span class="fact-text">${letter.fact}</span>
          </div>
          ${letter.chinesePinyin ? `<div class="chinese-hint secondary-language">${letter.chinesePinyin}</div>` : ''}
        </div>

      </div>
    </div>

    <div class="p3-nav">
      ${STATE.p3LetterIndex > 0 ? `<button class="nav-btn secondary" onclick="p3PrevLetter()">→ السابق</button>` : '<span></span>'}
      <div class="p3-sound-mini">
        <button class="ctrl-btn" onclick="p3PlaySound('${letter.id}')">▶ صوت</button>
        <button class="ctrl-btn choral" onclick="p3ToggleChoral('${letter.id}')">👥 ردّد</button>
      </div>
      ${STATE.p3LetterIndex < phase.letterOrder.length - 1
        ? `<button class="nav-btn primary" onclick="p3NextLetter()">التالي ←</button>`
        : `<button class="nav-btn success" onclick="p3ShowQuad()">عرض الكل ←</button>`
      }
    </div>
  `;

  renderP3Card();
}

function renderP3Card() {
  const revealIds = ['reveal-char', 'reveal-dots', 'reveal-phoneme', 'reveal-fact'];
  revealIds.forEach((id, idx) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle('revealed', idx <= STATE.p3RevealStep);
  });

  const phase = LESSON.phases.find(p => p.id === 'P3');
  const totalSteps = phase.revealSteps.length - 1;
  if (STATE.p3RevealStep < totalSteps) {
    const nextStep = phase.revealSteps[STATE.p3RevealStep + 1];
    updateHint(`اضغط Space لكشف: ${nextStep ? nextStep.label : '—'}`);
  } else {
    const letterId = phase.letterOrder[STATE.p3LetterIndex];
    const letter   = LESSON.letters.find(l => l.id === letterId);
    if (STATE.p3LetterIndex < phase.letterOrder.length - 1) {
      updateHint(`الحرف ${letter?.name} مكتمل — اضغط Space للحرف التالي`);
    } else {
      updateHint('جميع الحروف مكتملة — اضغط Space لعرضها معاً');
    }
  }
}

function advanceP3() {
  const phase = LESSON.phases.find(p => p.id === 'P3');

  if (STATE.p3ViewMode === 'assess') {
    advanceP3Assess();
    return;
  }

  if (STATE.p3ViewMode === 'quad') {
    p3StartAssess();
    return;
  }

  const maxStep = phase.revealSteps.length - 1;

  if (STATE.p3RevealStep < maxStep) {
    STATE.p3RevealStep++;
    renderP3Card();
    if (STATE.p3RevealStep === 2) {
      const letterId = phase.letterOrder[STATE.p3LetterIndex];
      p3PlaySound(letterId);
    }
  } else {
    const letterId = phase.letterOrder[STATE.p3LetterIndex];
    if (!STATE.p3CompletedLetters.includes(letterId)) {
      STATE.p3CompletedLetters.push(letterId);
    }
    if (STATE.p3LetterIndex < phase.letterOrder.length - 1) {
      p3NextLetter();
    } else {
      p3ShowQuad();
    }
  }
}

function p3NextLetter() {
  const phase = LESSON.phases.find(p => p.id === 'P3');
  if (STATE.p3LetterIndex < phase.letterOrder.length - 1) {
    STATE.p3LetterIndex++;
    STATE.p3RevealStep = -1;
    renderP3();
  }
}

function p3PrevLetter() {
  if (STATE.p3LetterIndex > 0) {
    STATE.p3LetterIndex--;
    STATE.p3RevealStep = 3;
    renderP3();
    renderP3Card();
  }
}

function p3ShowQuad() {
  STATE.p3ViewMode = 'quad';
  const container = document.getElementById('p3-container');
  if (container) renderP3Quad(container);
  updateHint('عرض مقارن للحروف الأربعة — اضغط Space للتقييم السريع');
}

function renderP3Quad(container) {
  const phase = LESSON.phases.find(p => p.id === 'P3');
  const letters = phase.letterOrder.map(id => LESSON.letters.find(l => l.id === id));

  container.innerHTML = `
    <div class="p3-quad-header">
      <h2 class="quad-title">الحروف الأربعة — مقارنة</h2>
      <p class="quad-subtitle">لاحظ الشكل الأساسي واختلاف النقاط</p>
    </div>
    <div class="quad-grid">
      ${letters.map(letter => `
        <div class="quad-card" style="border-color:${letter.color}">
          <span class="quad-char" style="color:${letter.color}">${letter.char}</span>
          <div class="quad-meta">
            <span class="quad-name">${letter.name}</span>
            <button class="quad-sound" onclick="p3PlaySound('${letter.id}')" style="background:${letter.color}">
              ${letter.phoneme}
            </button>
          </div>
          <div class="quad-dots-row">${renderDotsVisual(letter)}</div>
          <span class="quad-fact">${letter.fact}</span>
        </div>
      `).join('')}
    </div>
    <div class="quad-nav">
      <button class="ctrl-btn" onclick="p3ExitQuad()">→ عودة للبطاقات</button>
      <button class="ctrl-btn primary" onclick="p3StartAssess()">التقييم السريع ←</button>
    </div>
  `;
}

function p3ExitQuad() {
  STATE.p3ViewMode = 'single';
  const phase = LESSON.phases.find(p => p.id === 'P3');
  STATE.p3LetterIndex = phase.letterOrder.length - 1;
  STATE.p3RevealStep = 3;
  renderP3();
  renderP3Card();
}

// ── P3 Micro-Assessment ─────────────────────────────────
function p3StartAssess() {
  STATE.p3ViewMode = 'assess';
  STATE.p3AssessIndex = 0;
  STATE.p3AssessRevealed = false;
  const phase = LESSON.phases.find(p => p.id === 'P3');
  const order = phase.letterOrder.slice();
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  STATE.p3AssessOrder = order;
  renderP3();
}

function renderP3Assess(container) {
  const phase = LESSON.phases.find(p => p.id === 'P3');
  const allLetters = phase.letterOrder.map(id => LESSON.letters.find(l => l.id === id));
  const targetId = STATE.p3AssessOrder[STATE.p3AssessIndex];
  const target = LESSON.letters.find(l => l.id === targetId);
  const total = STATE.p3AssessOrder.length;
  const current = STATE.p3AssessIndex + 1;

  container.innerHTML = `
    <div class="p3-assess-header">
      <span class="p3-assess-badge">${current} / ${total}</span>
      <h2 class="p3-assess-title">استمع واختر الحرف</h2>
      <p class="p3-assess-subtitle">شغّل الصوت — الطلاب يرفعون أصابعهم</p>
    </div>

    <div class="p3-assess-play">
      <button class="p3-assess-sound-btn" onclick="p3AssessPlay()">
        <span class="p3-assess-sound-icon">🔊</span>
        <span>اضغط لتشغيل الصوت</span>
      </button>
    </div>

    <div class="p3-assess-choices">
      ${allLetters.map((letter, i) => `
        <div class="p3-assess-choice ${STATE.p3AssessRevealed && letter.id === targetId ? 'correct' : ''}"
             style="--choice-color: ${letter.color}">
          <span class="p3-assess-finger">${i + 1}</span>
          <span class="p3-assess-char" style="color: ${letter.color}">${letter.char}</span>
          <span class="p3-assess-name">${letter.name}</span>
        </div>
      `).join('')}
    </div>

    <div class="p3-assess-nav">
      <button class="ctrl-btn" onclick="p3SkipAssess()">تخطّي التقييم ←</button>
    </div>
  `;

  if (STATE.p3AssessRevealed) {
    updateHint(`الإجابة: ${target.name} (${target.char}) — اضغط Space للسؤال التالي`);
  } else {
    updateHint('شغّل الصوت ثم اضغط Space لكشف الإجابة');
  }
}

function p3AssessPlay() {
  const targetId = STATE.p3AssessOrder[STATE.p3AssessIndex];
  AudioManager.playLetter(targetId);
}

function advanceP3Assess() {
  if (!STATE.p3AssessRevealed) {
    STATE.p3AssessRevealed = true;
    const targetId = STATE.p3AssessOrder[STATE.p3AssessIndex];
    AudioManager.playLetter(targetId);
    renderP3();
    return;
  }
  if (STATE.p3AssessIndex < STATE.p3AssessOrder.length - 1) {
    STATE.p3AssessIndex++;
    STATE.p3AssessRevealed = false;
    renderP3();
  } else {
    goToPhase(3, { sequential: true });
  }
}

function p3SkipAssess() {
  goToPhase(3, { sequential: true });
}

function p3PlaySound(letterId) {
  AudioManager.playLetter(letterId);
}

function p3ToggleChoral(letterId) {
  const letter = LESSON.letters.find(l => l.id === letterId);
  if (!letter) return;
  const container = document.getElementById('p3-container');
  if (container) {
    container.classList.add('choral-flash');
    setTimeout(() => container.classList.remove('choral-flash'), 1000);
  }
  AudioManager.playLetter(letterId);
  updateHint('الطلاب يُرددون الآن...');
  setTimeout(() => updateHint('اضغط Space لاستمرار الكشف'), 2500);
}

// للتوافق — الاسم القديم يُعيد التوجيه للجديد
function p2ToggleChoralsound(letterId) { p3ToggleChoral(letterId); }

// ══════════════════════════════════════════════════════════════
// مساعد — رسم النقاط بصرياً
// ══════════════════════════════════════════════════════════════
function renderDotsVisual(letter) {
  const dot = `<span class="dot-circle"></span>`;
  return `<div class="dots-row">${dot.repeat(letter.dots)}</div>`;
}
