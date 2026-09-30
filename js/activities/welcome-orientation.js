/**
 * js/activities/welcome-orientation.js
 * Extracted verbatim from app.js during Phase 2 engine cleanup.
 */
'use strict';
// ══════════════════════════════════════════════════════════════
// P1 — افتتاح الدرس
// ══════════════════════════════════════════════════════════════
function initP1() {
  STATE.currentStep = 0;
  const zone = document.getElementById('content-zone');
  zone.innerHTML = buildP1HTML();
  renderP1();
  updatePhaseBar();
  PhaseTimer.start('P1');
}

function advanceP1() {
  const phase = getCurrentPhase();
  if (STATE.currentStep < phase.steps.length - 1) {
    STATE.currentStep++;
    renderP1();
  } else {
    goToPhase(1);
  }
}

function renderP1() {
  const phase = getCurrentPhase();
  const step = phase.steps[STATE.currentStep];
  const stage = document.querySelector('.p1-container');
  if (stage) {
    const isIntro = STATE.currentStep === 0;
    const isSpotlight = STATE.currentStep === 2;
    stage.dataset.step = String(STATE.currentStep);
    stage.classList.toggle('is-spotlight', isSpotlight);
    const intro = stage.querySelector('.p1-stage-intro');
    const alphabetScene = stage.querySelector('.p1-stage-alphabet-scene');
    if (intro) { intro.classList.toggle('is-active', isIntro); intro.setAttribute('aria-hidden', String(!isIntro)); }
    if (alphabetScene) { alphabetScene.classList.toggle('is-active', !isIntro); alphabetScene.setAttribute('aria-hidden', String(isIntro)); }
  }
  if (STATE.currentStep === 0) {
    updateHint(LESSON.meta.welcomeHintAr, LESSON.meta.welcomeHintZh);
  } else {
    updateHint(step.hint);
  }
}

// ترتيب مجموعة الحروف يُشتق من رقم المحاضرة (meta.number) بدل نص ثابت.
const P1_GROUP_ORDINALS = [
  'الأولى', 'الثانية', 'الثالثة', 'الرابعة', 'الخامسة', 'السادسة', 'السابعة', 'الثامنة', 'التاسعة', 'العاشرة',
  'الحادية عشرة', 'الثانية عشرة', 'الثالثة عشرة', 'الرابعة عشرة', 'الخامسة عشرة', 'السادسة عشرة',
  'السابعة عشرة', 'الثامنة عشرة', 'التاسعة عشرة', 'العشرون'
];
function p1GroupLabel(n) {
  const ord = P1_GROUP_ORDINALS[n - 1];
  return ord ? `المجموعة ${ord}` : 'مجموعة';
}

function buildP1HTML() {
  const { meta, arabicAlphabet, targetLetterIds } = LESSON;
  const makeAlphabetGrid = (spotlight = false) => arabicAlphabet.map(ch => {
    const isTarget = targetLetterIds.includes(ch);
    return `<span class="alpha-char ${isTarget ? 'is-target' : ''} ${spotlight && isTarget ? 'target' : ''}" data-char="${ch}">${ch}</span>`;
  }).join('');
  const stepGuide = text => `<div class="p1-step-guide"><span class="p1-step-guide-key">␣</span><span>${text}</span></div>`;

  return `
    <div class="p1-container" data-step="0">
      <section class="p1-stage p1-stage-intro" aria-hidden="false">
        <div class="p1-welcome-layout">
          <div class="p1-hero-stage-card">

            <div class="p1-card-watermarks" aria-hidden="true">
              ${meta.targetLetters.map((ch, i) => `<span class="p1-wm p1-wm-${i + 1}">${ch}</span>`).join('')}
            </div>
            <div class="p1-card-geometric" aria-hidden="true"></div>
            <div class="p1-hero-title-stack">
              <h1 class="lesson-main-title">${meta.title}</h1>
              <p class="p1-title-zh secondary-language" lang="zh">阿拉伯字母</p>
              <div class="p1-title-divider" aria-hidden="true"><span class="p1-divider-dot"></span></div>
              <p class="p1-subtitle-ar">✿ تعلم ${p1GroupLabel(meta.number)} من الحروف العربية ✿</p>
            </div>
            <div class="target-chars-hero p1-hero-letters" aria-label="حروف درس اليوم">
              ${meta.targetLetters.map(ch => {
                    const l = LESSON.letters.find(x => x.char === ch);
                    const c = (l && (l.heroColor || l.color)) || '';
                    const style = c ? ` style="--p1-letter-color:${c};color:${c}"` : '';
                    return `<span class="hero-char p6-letter-glyph"${style}>${ch}</span>`;
                  }).join('')}
            </div>
            <div class="p1-card-method-bar" aria-hidden="true">
              <span class="p1-method-item"><span class="p1-method-icon">🔊</span> استمع</span>
              <span class="p1-method-sep">|</span>
              <span class="p1-method-item"><span class="p1-method-icon">👁</span> شاهد</span>
              <span class="p1-method-sep">|</span>
              <span class="p1-method-item"><span class="p1-method-icon">🔄</span> كرر</span>
            </div>
          </div>
          <div class="p1-welcome-action">
            <button class="p1-start-capsule" onclick="advanceP1()" aria-label="ابدأ الدرس — اضغط Space">
              <span>ابدأ الدرس</span><span>▶</span>
            </button>
          </div>
          <div class="p1-welcome-footer">
            <span class="p1-footer-ornament" aria-hidden="true">❁✿❁</span>
            <span class="p1-footer-line2">اللغة العربية للناطقين بغيرها</span>
          </div>
        </div>
      </section>

      <section class="p1-stage p1-stage-alphabet-scene" aria-hidden="true">
        <div class="p1-scene-bg" aria-hidden="true">
          <div class="p1-scene-geo-tl"></div>
          <div class="p1-scene-geo-br"></div>
        </div>
        <div class="p1-direction-card">
          <div class="p1-direction-badge" aria-hidden="true">
            <span class="p1-dir-arrow">←</span>
          </div>
          <div class="p1-direction-body">
            <p class="p1-direction-ar">اللغة العربية تُكتب من اليمين إلى اليسار</p>
            <p class="p1-direction-zh secondary-language" lang="zh">阿拉伯语从右向左书写 · 从右到左</p>
          </div>
          <div class="p1-direction-ornament" aria-hidden="true">✦</div>
        </div>
        <div class="alpha-section p1-spotlight-alphabet">
          <div class="p1-alpha-header">
            <span class="p1-alpha-ornament" aria-hidden="true">❊</span>
            <p class="alpha-label">الأبجدية العربية — ٢٨ حرفاً</p>
            <span class="p1-alpha-ornament" aria-hidden="true">❊</span>
          </div>
          <div class="alpha-grid">${makeAlphabetGrid()}</div>
        </div>
        <div class="p1-scene-guide-slot">
          ${stepGuide('اضغط المسطرة لتمييز حروف درس اليوم')}
          <div class="p1-spotlight-capsule"><span aria-hidden="true">🎯</span><span>هذه هي حروف درس اليوم — اضغط المسطرة للبدء</span></div>
        </div>
      </section>
    </div>
  `;
}
