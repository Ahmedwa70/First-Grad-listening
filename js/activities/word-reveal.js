/**
 * js/activities/word-reveal.js
 * Extracted verbatim from app.js during Phase 2 engine cleanup.
 */
'use strict';
// ══════════════════════════════════════════════════════════════
// P5 — الحروف في الكلمات
// ══════════════════════════════════════════════════════════════


function p5DisplayPositions(word) {
  return word.targetPositions.length > 1 ? [word.targetPositions[0]] : word.targetPositions;
}

function initP5() {
  STATE.p5WordIndex  = 0;
  STATE.p5RevealStep = -1;
  STATE.p5ViewMode   = 'single';
  STATE.p5AssessIndex = 0;
  STATE.p5AssessRevealed = false;
  p5PinnedWordId = null;
  const zone = document.getElementById('content-zone');
  zone.innerHTML = `<div class="p5-container" id="p5-container"></div>`;
  renderP5();
  updatePhaseBar();
  PhaseTimer.start('P5');
}

function advanceP5() {
  const phase = LESSON.phases.find(p => p.id === 'P5');

  if (STATE.p5ViewMode === 'assess') {
    advanceP5Assess();
    return;
  }
  if (STATE.p5ViewMode === 'quad') {
    p5StartAssess();
    return;
  }

  const maxStep = LESSON.p5RevealSteps.length - 1;
  if (STATE.p5RevealStep < maxStep) {
    STATE.p5RevealStep++;
    renderP5Card();
    if (LESSON.p5RevealSteps[STATE.p5RevealStep]?.key === 'audio') {
      const wordId = phase.wordOrder[STATE.p5WordIndex];
      AudioManager.playWord(wordId);
    }
  } else {
    const nextIndex = STATE.p5WordIndex + 1;
    if (nextIndex < phase.wordOrder.length) {
      p5TransitionWord(nextIndex);
    } else {
      p5ShowQuad();
    }
  }
}

var _p5Transitioning = false;
function p5TransitionWord(nextIndex, direction) {
  if (_p5Transitioning) return;
  const card = document.querySelector('.p5-card');
  if (!card) {
    STATE.p5WordIndex = nextIndex;
    STATE.p5RevealStep = -1;
    renderP5();
    return;
  }
  _p5Transitioning = true;
  const exitClass = direction === 'prev' ? 'p5-exit-right' : 'p5-exit-left';
  card.classList.add(exitClass);
  setTimeout(() => {
    STATE.p5WordIndex = nextIndex;
    STATE.p5RevealStep = -1;
    renderP5();
    const newCard = document.querySelector('.p5-card');
    if (newCard) {
      const enterClass = direction === 'prev' ? 'p5-enter-right' : 'p5-enter-left';
      newCard.classList.add(enterClass);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => newCard.classList.remove(enterClass));
      });
    }
    _p5Transitioning = false;
  }, 280);
}

function renderP5() {
  const container = document.getElementById('p5-container');
  if (!container) return;
  const phase  = LESSON.phases.find(p => p.id === 'P5');

  if (STATE.p5ViewMode === 'quad') {
    renderP5Quad(container);
    return;
  }
  if (STATE.p5ViewMode === 'assess') {
    renderP5Assess(container);
    return;
  }

  const wordId = phase.wordOrder[STATE.p5WordIndex];
  const word   = LESSON.words.find(w => w.id === wordId);
  const letter = LESSON.letters.find(l => l.id === word.targetLetterId);
  const meta   = LESSON.p5WordMeta[word.id] || {};
  const displayPos = p5DisplayPositions(word);
  const previousWords = phase.wordOrder.slice(0, STATE.p5WordIndex);
  p5ReviewWordId = null;

  container.innerHTML = `
    <div class="p5-header">
      <div class="p6-counter">
        ${progressDots(STATE.p5WordIndex, phase.wordOrder.length)}
      </div>
    </div>

    ${previousWords.length > 0 ? `
    <div class="p5-history" aria-label="الكلمات السابقة">
      <span class="p5-history-label">الكلمات السابقة</span>
      <div class="p5-history-strip">
        ${previousWords.map(wid => {
          const w = LESSON.words.find(x => x.id === wid);
          const m = LESSON.p5WordMeta[w.id] || {};
          const dp = p5DisplayPositions(w);
          return `
          <div class="p5-mini" data-word="${wid}" onclick="p5Review('${wid}')" style="--mini-color:${w.color}">
            <div class="p5-mini-word" dir="rtl">
              ${w.chars.map((ch, i) => `
                <span class="p5-mini-char ${dp.includes(i) ? 'p5-mini-char-target' : ''}"
                  ${dp.includes(i) ? `style="color:${w.color}"` : ''}>${ch}</span>
              `).join('')}
            </div>
            <span class="p5-mini-meaning">${m.emoji || ''}</span>
          </div>`;
        }).join('')}
      </div>
    </div>
    <div class="p5-review" id="p5-review" hidden></div>` : ''}

    <div class="p5-card-wrapper">
      <div class="p5-card" data-word="${word.id}" style="--wc:${word.color}">

        <div class="p5-zone-word">
          <div class="p5-block reveal-block" id="p5-context">
            <span class="p5-hero-emoji">${meta.emoji || '🔤'}</span>
            <div class="p5-word-display">
              ${word.chars.map((ch, i) => {
                const isTarget = displayPos.includes(i);
                return `<span class="p5-char ${isTarget ? 'p5-target-char' : ''}"
                  ${isTarget ? `style="--tc:${word.color}"` : ''}>
                  ${ch}
                </span>`;
              }).join('')}
            </div>
            <div class="p5-meaning-caption">
              <span class="p5-meaning-text">${word.meaning.replace(/\s*\(.*?\)\s*$/, '')}</span>
              ${meta.zh ? `<span class="p5-meaning-zh secondary-language">${meta.zh}</span>` : ''}
            </div>
          </div>
        </div>

        <div class="p5-zone-info">
          <div class="p5-block reveal-block" id="p5-target">
            <div class="p5-identity-card" style="--lc:${word.color}">
              <span class="p5-id-letter">${letter.char}</span>
              <span class="p5-id-sep"></span>
              <span class="p5-target-name">${letter.name}</span>
              <span class="p5-id-sep"></span>
              <span class="p5-target-phoneme">${letter.phoneme}</span>
            </div>
          </div>

          <div class="p5-block reveal-block" id="p5-audio">
            <div class="p5-audio-row">
              <button class="p5-listen-btn" onclick="p5PlayWord('${word.id}')" style="--lc:${word.color}">
                <span class="p5-listen-icon">▶</span>
                <span class="p5-listen-label">${word.word}</span>
              </button>
              <button class="p5-choral-btn" onclick="p5ChoralWord('${word.id}')">👥 ردّد</button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="p5-nav">
      ${STATE.p5WordIndex > 0
        ? `<button class="nav-btn secondary" onclick="p5PrevWord()">→ السابق</button>`
        : '<span></span>'}
      ${STATE.p5WordIndex < phase.wordOrder.length - 1
        ? `<button class="nav-btn primary" onclick="advanceP5()">التالي ←</button>`
        : `<button class="nav-btn success" onclick="p5ShowQuad()">مراجعة الكلمات ←</button>`}
    </div>
  `;

  renderP5Card();

  if (p5PinnedWordId) showP5Review(p5PinnedWordId, false);
}

function renderP5Card() {
  const step = STATE.p5RevealStep;
  const card = document.querySelector('.p5-card');

  const ctxEl = document.getElementById('p5-context');
  if (ctxEl) ctxEl.classList.toggle('revealed', step >= 0);

  if (card) card.classList.toggle('target-active', step >= 1);
  const targetEl = document.getElementById('p5-target');
  if (targetEl) {
    targetEl.classList.toggle('revealed', step >= 1);
    targetEl.classList.toggle('name-visible', step >= 2);
    targetEl.classList.toggle('phoneme-visible', step >= 2);
  }

  const audioEl = document.getElementById('p5-audio');
  if (audioEl) audioEl.classList.toggle('revealed', step >= 3);

  if (step < LESSON.p5RevealSteps.length - 1) {
    const next = LESSON.p5RevealSteps[step + 1];
    updateHint(`اضغط Space لكشف: ${next.label}`);
  } else {
    updateHint('الكلمة مكتملة — اضغط Space للكلمة التالية');
  }
}

// Phase 2 — Interactive Review: مراجعة سريعة لكلمة سابقة (نظرة سريعة فقط)
// Phase 3.2 — Teacher Pin Review: تثبيت المراجعة لتظل ظاهرة أثناء التنقل
let p5ReviewWordId = null;
let p5PinnedWordId  = null;

function p5Review(wordId) {
  if (p5ReviewWordId === wordId) {
    p5ReviewWordId = null;
    p5PinnedWordId = null;
    document.querySelectorAll('.p5-mini').forEach(m => m.classList.toggle('review-active', false));
    const panel = document.getElementById('p5-review');
    if (panel) panel.hidden = true;
    return;
  }
  if (p5PinnedWordId) p5PinnedWordId = wordId;
  p5ReviewWordId = wordId;
  showP5Review(wordId, true);
}

function showP5Review(wordId, animate) {
  const word  = LESSON.words.find(w => w.id === wordId);
  const letter = word ? LESSON.letters.find(l => l.id === word.targetLetterId) : null;
  const panel = document.getElementById('p5-review');
  if (!word || !panel) return;

  panel.innerHTML = `
    <span class="p5-review-label">مراجعة المعلم</span>
    <div class="p5-review-word" style="color:${word.color}">${word.word}</div>
    <div class="p5-review-chars" dir="rtl">
      ${word.chars.map((ch, i) => `
        <span class="p5-review-char ${word.targetPositions.includes(i) ? 'p5-review-char-target' : ''}"
          ${word.targetPositions.includes(i) ? `style="color:${word.color}"` : ''}>${ch}</span>
      `).join('')}
    </div>
    ${letter ? `<div class="p5-review-ipa">${letter.phoneme}</div>` : ''}
    <button class="p5-review-play" onclick="p5PlayWord('${word.id}')" style="border-color:${word.color}">▶ صوت</button>
    <button class="p5-review-pin" onclick="p5PinReview()" title="تثبيت المراجعة" aria-label="تثبيت المراجعة">📌</button>
    <button class="p5-review-close" onclick="p5CloseReview()" title="إغلاق المراجعة" aria-label="إغلاق المراجعة">×</button>
  `;
  document.querySelectorAll('.p5-mini').forEach(m => m.classList.toggle('review-active', m.dataset.word === wordId));
  panel.classList.toggle('pinned', !!p5PinnedWordId);
  panel.hidden = false;
  if (animate) {
    panel.classList.remove('review-in');
    void panel.offsetWidth;
    panel.classList.add('review-in');
  }
}

function p5PinReview() {
  const panel = document.getElementById('p5-review');
  if (!panel || !p5ReviewWordId) return;
  p5PinnedWordId = p5PinnedWordId ? null : p5ReviewWordId;
  panel.classList.toggle('pinned', !!p5PinnedWordId);
}

// Phase 3 — Teacher Review Mode: إغلاق لوحة المراجعة فقط (لا يؤثر على Pin)
function p5CloseReview() {
  const panel = document.getElementById('p5-review');
  if (!panel) return;
  p5ReviewWordId = null;
  document.querySelectorAll('.p5-mini').forEach(m => m.classList.toggle('review-active', false));
  panel.hidden = true;
}

function p5PlayWord(wordId) {
  AudioManager.playWord(wordId);
}

function p5ChoralWord(wordId) {
  const word = LESSON.words.find(w => w.id === wordId);
  if (!word) return;
  const container = document.getElementById('p5-container');
  if (container) {
    container.classList.add('choral-flash');
    setTimeout(() => container.classList.remove('choral-flash'), 900);
  }
  AudioManager.playWord(wordId);
  updateHint('الطلاب يُرددون الكلمة...');
  setTimeout(() => updateHint('اضغط Space للمتابعة'), 2500);
}

function p5PrevWord() {
  if (STATE.p5WordIndex > 0 && !_p5Transitioning) {
    _p5Transitioning = true;
    const prevIndex = STATE.p5WordIndex - 1;
    const card = document.querySelector('.p5-card');
    if (!card) {
      STATE.p5WordIndex = prevIndex;
      STATE.p5RevealStep = LESSON.p5RevealSteps.length - 1;
      renderP5();
      _p5Transitioning = false;
      return;
    }
    card.classList.add('p5-exit-right');
    setTimeout(() => {
      STATE.p5WordIndex = prevIndex;
      STATE.p5RevealStep = LESSON.p5RevealSteps.length - 1;
      renderP5();
      const newCard = document.querySelector('.p5-card');
      if (newCard) {
        newCard.classList.add('p5-enter-right');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => newCard.classList.remove('p5-enter-right'));
        });
      }
      _p5Transitioning = false;
    }, 280);
  }
}

// ── P5 Quad View ────────────────────────────────────────
function p5ShowQuad() {
  STATE.p5ViewMode = 'quad';
  renderP5();
}

function renderP5Quad(container) {
  const phase = LESSON.phases.find(p => p.id === 'P5');
  const allWords = phase.wordOrder.map(wid => {
    const w = LESSON.words.find(x => x.id === wid);
    const l = LESSON.letters.find(x => x.id === w.targetLetterId);
    const m = LESSON.p5WordMeta[w.id] || {};
    const dp = p5DisplayPositions(w);
    return { ...w, letter: l, meta: m, dp };
  });

  container.innerHTML = `
    <div class="p5-quad-header">
      <h2 class="p5-quad-title">الكلمات الخمس — مراجعة</h2>
      <p class="p5-quad-subtitle">لاحظ الحرف المستهدف في كل كلمة</p>
    </div>
    <div class="p5-quad-grid">
      ${allWords.map(w => `
        <div class="p5-quad-card" style="--card-color:${w.color}">
          <span class="p5-quad-emoji">${w.meta.emoji || ''}</span>
          <div class="p5-quad-word" dir="rtl">
            ${w.chars.map((ch, i) => `
              <span class="${w.dp.includes(i) ? 'p5-quad-target' : ''}"
                style="${w.dp.includes(i) ? 'color:' + w.color : ''}">${ch}</span>
            `).join('')}
          </div>
          <span class="p5-quad-letter" style="color:${w.color}">${w.letter.char} ${w.letter.name}</span>
          <span class="p5-quad-meaning">${w.meaning.replace(/\s*\(.*?\)\s*$/, '')}</span>
          ${w.meta.zh ? `<span class="p5-quad-zh secondary-language">${w.meta.zh}</span>` : ''}
          <button class="p5-quad-play" onclick="p5PlayWord('${w.id}')" style="border-color:${w.color}">▶</button>
        </div>
      `).join('')}
    </div>
    <div class="p5-quad-nav">
      <button class="ctrl-btn" onclick="p5StartAssess()">التقييم السريع ←</button>
    </div>
  `;
  updateHint('مراجعة الكلمات — اضغط Space للتقييم السريع');
}

// ── P5 Micro-Assessment ─────────────────────────────────
function p5StartAssess() {
  STATE.p5ViewMode = 'assess';
  STATE.p5AssessIndex = 0;
  STATE.p5AssessRevealed = false;
  const phase = LESSON.phases.find(p => p.id === 'P5');
  const order = phase.wordOrder.slice();
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  STATE.p5AssessOrder = order;
  renderP5();
}

function renderP5Assess(container) {
  const phase = LESSON.phases.find(p => p.id === 'P5');
  const allWords = phase.wordOrder.map(wid => {
    const w = LESSON.words.find(x => x.id === wid);
    const l = LESSON.letters.find(x => x.id === w.targetLetterId);
    const m = LESSON.p5WordMeta[w.id] || {};
    return { ...w, letter: l, meta: m };
  });
  const targetId = STATE.p5AssessOrder[STATE.p5AssessIndex];
  const target = LESSON.words.find(w => w.id === targetId);
  const targetLetter = LESSON.letters.find(l => l.id === target.targetLetterId);
  const targetMeta = LESSON.p5WordMeta[targetId] || {};
  const total = STATE.p5AssessOrder.length;
  const current = STATE.p5AssessIndex + 1;

  container.innerHTML = `
    <div class="p5-assess-header">
      <div class="p6-counter">${progressDots(STATE.p5AssessIndex, total)}</div>
      <h2 class="p5-assess-title">استمع واختر الكلمة</h2>
      <p class="p5-assess-subtitle">شغّل الصوت — الطلاب يرفعون أصابعهم</p>
    </div>
    <div class="p5-assess-play">
      <button class="p5-assess-sound-btn" onclick="p5AssessPlay()">
        <span class="p5-assess-sound-icon">🔊</span>
        <span>اضغط لتشغيل الصوت</span>
      </button>
    </div>
    <div class="p5-assess-choices">
      ${allWords.map((w, i) => `
        <div class="p5-assess-choice ${STATE.p5AssessRevealed && w.id === targetId ? 'correct' : ''}"
             style="--choice-color: ${w.color}">
          <span class="p5-assess-finger">${i + 1}</span>
          <span class="p5-assess-emoji">${w.meta.emoji || ''}</span>
          <span class="p5-assess-word" dir="rtl">${w.word}</span>
          <span class="p5-assess-letter-tag" style="color:${w.letter.color}">${w.letter.char}</span>
        </div>
      `).join('')}
    </div>
    <div class="p5-assess-nav">
      <button class="ctrl-btn" onclick="p5SkipAssess()">تخطّي التقييم ←</button>
    </div>
  `;

  if (STATE.p5AssessRevealed) {
    updateHint(`الإجابة: ${target.word} — الحرف: ${targetLetter.char} (${targetLetter.name}) — اضغط Space للسؤال التالي`);
  } else {
    updateHint('شغّل الصوت ثم اضغط Space لكشف الإجابة');
  }
}

function p5AssessPlay() {
  const targetId = STATE.p5AssessOrder[STATE.p5AssessIndex];
  AudioManager.playWord(targetId);
}

function advanceP5Assess() {
  if (!STATE.p5AssessRevealed) {
    STATE.p5AssessRevealed = true;
    const targetId = STATE.p5AssessOrder[STATE.p5AssessIndex];
    AudioManager.playWord(targetId);
    renderP5();
    return;
  }
  if (STATE.p5AssessIndex < STATE.p5AssessOrder.length - 1) {
    STATE.p5AssessIndex++;
    STATE.p5AssessRevealed = false;
    renderP5();
  } else {
    goToPhase(5);
  }
}

function p5SkipAssess() {
  goToPhase(5);
}
