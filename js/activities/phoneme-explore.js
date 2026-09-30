/**
 * js/activities/phoneme-explore.js
 * Extracted verbatim from app.js during Phase 2 engine cleanup.
 */
'use strict';
// ══════════════════════════════════════════════════════════════
// P2 — الصوت أولاً
// ══════════════════════════════════════════════════════════════
// ─── Teacher Hint Indicator (P2) — تلميح معلم صغير داخل Teacher Strip ───
let p2TeacherHint = "listen";
function setP2TeacherHint(text) {
  p2TeacherHint = text;
  const el = document.getElementById('p2-teacher-hint');
  if (el) el.textContent = text;
}


function initP2() {
  STATE.p2ActiveLetter = null;
  STATE.p2Chorusing = false;
  const zone = document.getElementById('content-zone');
  zone.innerHTML = buildP2HTML();
  const controls = zone.querySelector('.p2-controls');
  if (controls && !controls.querySelector('.p2-teacher-hint')) {
    const hint = document.createElement('span');
    hint.className = 'p2-teacher-hint';
    hint.id = 'p2-teacher-hint';
    controls.appendChild(hint);
  }
  setP2TeacherHint('💡 استمع ثم اختر الصوت');
  updatePhaseBar();
  PhaseTimer.start('P2');
  updateHint('اختر حرفاً من الأزرار أدناه لتشغيل صوته · ابدأ بـ ب');
}

// Space في P2: إذا لا يوجد حرف مختار → تلميح، إذا يوجد → شغّل مرة أخرى
// إذا انتهى المعلم → زر "انتقل لـ P3" مرئي
function advanceP2() {
  if (!STATE.p2ActiveLetter) {
    updateHint('اختر حرفاً أولاً بالضغط على أحد أزرار الحروف في الأعلى');
    const btns = document.querySelectorAll('.sound-btn');
    btns.forEach(b => b.classList.add('pulse-attention'));
    setTimeout(() => btns.forEach(b => b.classList.remove('pulse-attention')), 800);
    return;
  }
  // إعادة تشغيل الصوت الحالي
  p2PlaySound();
  updateHint(`إعادة تشغيل ${LESSON.letters.find(l=>l.id===STATE.p2ActiveLetter)?.name} — اضغط زر "انتقل لـ P3" عند الانتهاء`);
}

function buildP2HTML() {
  const phase = LESSON.phases.find(p => p.id === 'P2');
  const letters = phase.phonemeOrder.map(id => LESSON.letters.find(l => l.id === id));

  const soundBtns = letters.map(l => `
    <button
      class="sound-btn"
      data-letter-id="${l.id}"
      onclick="p2SelectLetter('${l.id}')"
      aria-label="تشغيل صوت ${l.name}"
    >
      <span class="sound-btn-phoneme">${l.phoneme}</span>
      <span class="sound-btn-name">${l.name}</span>
      <span class="sound-btn-num">${phase.fingerCountMap[l.id]}</span>
    </button>
  `).join('');

  const fingerMap = letters.map(l => `
    <div class="finger-item">
      <span class="finger-num">${phase.fingerCountMap[l.id]}</span>
      <span class="finger-phoneme">${l.phoneme}</span>
    </div>
  `).join('');

  return `
    <div class="p2-container">
      <div class="p2-top">
        <div class="speaker-zone" id="speaker-zone">
          <div class="speaker-icon" id="speaker-icon">
            <svg viewBox="24 18 46 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28 28 L40 22 L40 58 L28 52 Z" fill="currentColor"/>
              <rect x="40" y="30" width="5" height="20" rx="2" fill="currentColor"/>
              <path class="wave w1" d="M50 30 Q58 40 50 50" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>
              <path class="wave w2" d="M55 24 Q67 40 55 56" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.6"/>
            </svg>
            <div class="audio-indicator" id="audio-indicator"></div>
          </div>
          <div class="active-phoneme" id="active-phoneme">اختر صوتاً</div>
          <div class="active-letter-name" id="active-letter-name">—</div>
        </div>
      </div>

      <div class="p2-sound-buttons">${soundBtns}</div>

      <div class="p2-controls">
        <button class="ctrl-btn primary" onclick="p2PlaySound()" id="btn-play">▶ تشغيل الصوت</button>
        <button class="ctrl-btn" onclick="p2PlaySound()" id="btn-replay">↻ إعادة</button>
        <button class="ctrl-btn choral" onclick="p2ToggleChoral()" id="btn-choral">👥 ردّد معي</button>
      </div>

      <div class="finger-count-guide">
        <div class="finger-title">دليل عدّ الأصابع</div>
        <div class="finger-map">${fingerMap}</div>
      </div>

      <div class="p2-activity-hint" id="p2-activity">
        <span class="activity-label">النشاط الحالي:</span>
        <span id="p2-activity-name">الاستماع الصامت — شغّل الصوت واطلب من الطلاب إغماض أعينهم</span>
      </div>

      <div class="p2-finish-zone">
        <p class="p2-finish-label">عند الانتهاء من تدريب الأصوات:</p>
        <button class="nav-btn primary p2-finish-btn" onclick="goToPhase(2)">
          انتقل إلى مرحلة كشف الحروف ←
        </button>
      </div>
    </div>
  `;
}

function p2SelectLetter(letterId) {
  STATE.p2ActiveLetter = letterId;
  const letter = LESSON.letters.find(l => l.id === letterId);
  if (!letter) return;

  document.querySelectorAll('.sound-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.letterId === letterId);
  });

  const phonemeEl = document.getElementById('active-phoneme');
  const nameEl    = document.getElementById('active-letter-name');
  if (phonemeEl) phonemeEl.textContent = letter.phoneme;
  if (nameEl)    nameEl.textContent    = letter.name;

  p2PlaySound();
  setP2TeacherHint('💡 ممتاز — ردّد الصوت مع الطلاب');
  updateHint(`صوت ${letter.name} · اضغط «ردّد معي» للترديد الجماعي · [ ␣ ] لإعادة الصوت`);
}

function p2PlaySound() {
  if (!STATE.p2ActiveLetter) {
    updateHint('اختر حرفاً أولاً بالضغط على أحد الأزرار أعلاه');
    return;
  }
  const letter = LESSON.letters.find(l => l.id === STATE.p2ActiveLetter);
  if (!letter) return;

  const icon = document.getElementById('speaker-icon');
  if (icon) {
    icon.classList.add('pulsing');
    setTimeout(() => icon.classList.remove('pulsing'), 800);
  }

  AudioManager.playLetter(STATE.p2ActiveLetter);
}

function p2ToggleChoral() {
  STATE.p2Chorusing = !STATE.p2Chorusing;
  const btn  = document.getElementById('btn-choral');
  const zone = document.getElementById('speaker-zone');

  if (STATE.p2Chorusing) {
    if (btn)  { btn.classList.add('active'); btn.textContent = '✋ توقف'; }
    if (zone) zone.classList.add('choral-active');
    updateHint('الطلاب يُرددون الآن · اضغط مجدداً للتوقف');
    setP2TeacherHint('💡 الطلاب يكررون الآن');
    if (STATE.p2ActiveLetter) p2PlaySound();
    setTimeout(() => { if (STATE.p2Chorusing) p2ToggleChoral(); }, 3000);
  } else {
    if (btn)  { btn.classList.remove('active'); btn.textContent = '👥 ردّد معي'; }
    if (zone) zone.classList.remove('choral-active');
    updateHint('اختر الصوت التالي أو اضغط "انتقل لمرحلة الحروف" عند الانتهاء');
    setP2TeacherHint('💡 اختر الصوت التالي');
  }
}
