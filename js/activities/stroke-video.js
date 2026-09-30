/**
 * js/activities/stroke-video.js
 * Extracted verbatim from app.js during Phase 2 engine cleanup.
 */
'use strict';
// ══════════════════════════════════════════════════════════════
// P4 — تدريب الكتابة
// ══════════════════════════════════════════════════════════════
// بطاقات رسم الحروف في P4 مؤجَّلة حتى اكتمال إعداد مسارات الحروف كاملةً.
// أثناء التأجيل: التسلسل الطبيعي القادم من P3 يدخل على شاشة المقارنة مباشرةً،
// بينما الدخول المباشر من الشريط العلوي أو مفتاح 4 يفتح P4 كاملاً من بدايته.
// لرفع التأجيل: اجعل القيمة false — ولا يلزم أي تغيير آخر.

function p4WritingPracticeHidden() {
  return LESSON.p4WritingPracticeDeferred && STATE.p4EntryMode === 'sequential';
}

function initP4() {
  STATE.p4LetterIndex = 0;
  STATE.p4StepIndex   = 0;
  const zone = document.getElementById('content-zone');
  zone.innerHTML = `<div class="p4-container" id="p4-container"></div>`;

  // renderP4Compare يضبط p4ViewMode ويكتب تلميحه الخاص.
  if (p4WritingPracticeHidden()) {
    renderP4Compare();
    updatePhaseBar();
    PhaseTimer.start('P4');
    return;
  }

  STATE.p4ViewMode = 'single';
  renderP4();
  updatePhaseBar();
  PhaseTimer.start('P4');
  updateHint('راقب مسار الكتابة ثم اضغط Space لعرض الخطوات تدريجياً');
}

function advanceP4() {
  const guide = LESSON.strokeGuides[STATE.p4LetterIndex];

  if (STATE.p4ViewMode === 'compare') {
    goToPhase(4);
    return;
  }

  const maxStep = guide.steps.length - 1;
  if (STATE.p4StepIndex < maxStep) {
    STATE.p4StepIndex++;
    renderP4Card();
  } else {
    const nextIndex = STATE.p4LetterIndex + 1;
    if (nextIndex < LESSON.strokeGuides.length) {
      STATE.p4LetterIndex = nextIndex;
      STATE.p4StepIndex   = 0;
      renderP4();
    } else {
      STATE.p4ViewMode = 'compare';
      renderP4Compare();
    }
  }
}

function renderP4() {
  const container = document.getElementById('p4-container');
  if (!container) return;
  const guide  = LESSON.strokeGuides[STATE.p4LetterIndex];
  const letter = LESSON.letters.find(l => l.id === guide.letterId);

  container.innerHTML = `
    <div class="p4-header">
      <div class="p4-progress-dots">
        ${LESSON.strokeGuides.map((g, i) => {
          const l = LESSON.letters.find(x => x.id === g.letterId);
          return `<span class="p4-dot-char ${i < STATE.p4LetterIndex ? 'done' : ''} ${i === STATE.p4LetterIndex ? 'current' : ''}"
            style="color:${l.color}">${l.char}</span>`;
        }).join('')}
      </div>
      <p class="p4-instruction">كيف نكتب — ${letter.name}</p>
    </div>

    <div class="p4-card-wrapper">
      <div class="p4-card">

        <div class="p4-video-zone">
          <div class="p4-video-frame">
            <video id="p4-video" class="p4-stroke-video" src="${_resolveVideoPath(guide.videoFile)}"
              muted playsinline preload="auto"></video>
          </div>
          <button class="p4-replay-btn" onclick="p4ReplayAnimation()" title="إعادة الحركة">↻ إعادة</button>
        </div>

        <div class="p4-steps-panel">
          ${guide.steps.map((step, i) => `
            <div class="p4-step-item ${i === 0 ? 'active' : ''}" data-step="${i}">
              <span class="p4-step-num">${i + 1}</span>
              <div class="p4-step-body">
                <div class="p4-step-label">${step.label}</div>
                <div class="p4-step-desc">${i === 0 ? step.desc : '…'}</div>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    </div>

    <div class="p4-nav">
      ${STATE.p4LetterIndex > 0 ? `<button class="nav-btn secondary" onclick="p4PrevLetter()">→ السابق</button>` : '<span></span>'}
      <div class="p4-char-big" style="color:${guide.color}">${letter.char}</div>
      ${STATE.p4LetterIndex < LESSON.strokeGuides.length - 1
        ? `<button class="nav-btn primary" onclick="advanceP4()">التالي ←</button>`
        : `<button class="nav-btn success" onclick="renderP4Compare()">مقارنة ←</button>`}
    </div>
  `;

  renderP4Card();
  p4PauseAtStart();
}

function renderP4Card() {
  if (STATE.p4ViewMode === 'compare') return;
  document.querySelectorAll('.p4-step-item').forEach((el, i) => {
    const step = LESSON.strokeGuides[STATE.p4LetterIndex].steps[i];
    el.classList.toggle('active', i <= STATE.p4StepIndex);
    el.classList.toggle('done',   i < STATE.p4StepIndex);
    const descEl = el.querySelector('.p4-step-desc');
    if (descEl) descEl.textContent = i <= STATE.p4StepIndex ? step.desc : '…';
  });

  if (STATE.p4StepIndex === 1) p4PlayVideo();

  const guide = LESSON.strokeGuides[STATE.p4LetterIndex];
  const step  = guide.steps[STATE.p4StepIndex];
  updateHint(`الخطوة ${STATE.p4StepIndex + 1}/${guide.steps.length}: ${step.label} — ${step.desc}`);
}

function p4PauseAtStart() {
  const video = document.getElementById('p4-video');
  if (!video) return;
  video.currentTime = 0;
  video.pause();
}

function p4PlayVideo() {
  const video = document.getElementById('p4-video');
  if (!video) return;
  video.currentTime = 0;
  video.play().catch(() => {});
}

function p4ReplayAnimation() {
  p4PlayVideo();
}

function p4PrevLetter() {
  if (STATE.p4LetterIndex > 0) {
    STATE.p4LetterIndex--;
    const guide = LESSON.strokeGuides[STATE.p4LetterIndex];
    STATE.p4StepIndex = guide.steps.length - 1;
    renderP4();
    renderP4Card();
  }
}

function renderP4Compare() {
  STATE.p4ViewMode = 'compare';
  const container = document.getElementById('p4-container');
  if (!container) return;

  container.innerHTML = `
    <div class="p4-compare-header">
      <h2 class="compare-title">مقارنة الكتابة — الحروف الأربعة</h2>
      <p class="compare-subtitle">الجسم واحد — النقاط تُفرّق</p>
    </div>
    <div class="p4-compare-grid">
      ${LESSON.strokeGuides.map(guide => {
        const letter = LESSON.letters.find(l => l.id === guide.letterId);
        return `
          <div class="p4-compare-card" style="border-color:${guide.color}">
            <span class="compare-char" style="color:${guide.color}">${letter.char}</span>
            <div class="compare-label">${letter.name} — ${letter.dots} ${letter.dots === 1 ? 'نقطة' : 'نقاط'}</div>
            <button class="quad-sound" style="background:${guide.color}" onclick="p3PlaySound('${letter.id}')">
              ${letter.phoneme}
            </button>
          </div>
        `;
      }).join('')}
    </div>
    <div class="p4-compare-nav">
      ${p4WritingPracticeHidden() ? '' : `<button class="ctrl-btn" onclick="p4ExitCompare()">← عودة للبطاقات</button>`}
      <button class="ctrl-btn primary" onclick="goToPhase(4)">التالي: الكلمات ←</button>
    </div>
  `;
  updateHint('مقارنة الحروف الأربعة — اضغط Space للانتقال لمرحلة الكلمات');
}

function p4ExitCompare() {
  STATE.p4ViewMode = 'single';
  STATE.p4LetterIndex = LESSON.strokeGuides.length - 1;
  const guide = LESSON.strokeGuides[STATE.p4LetterIndex];
  STATE.p4StepIndex = guide.steps.length - 1;
  renderP4();
  renderP4Card();
}
