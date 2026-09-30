/*
 * lesson-schema.js — Phase 4: Formal Lesson Data Contract
 * ========================================================
 * المصدر الوحيد للعقد الرسمي لبيانات الدرس (LESSON) في new_template.
 *
 * - الملف للاستخدام المؤلّفي (Authoring-time) فقط، ولا يُحمَّل من lecture.html إطلاقاً.
 * - لا dependencies. يتطلب Node.js 12+.
 *
 * الاستخدام:
 *   node schema/lesson-schema.js                  ← يتحقق من كل js/lesson-*.js موجود
 *   node schema/lesson-schema.js js/lesson-XX.js  ← درس محدد قبل ضمّه
 *
 * - أخطاء (ERROR) = غياب/خطأ يكسر التشغيل → كود خروج 1.
 * - توصيات (WARNING) = حاضر في الدرسين الحاليين أو غير حرج، لا تحجب الدرس.
 * - الاختبار الذاتي السلبي مضمّن ويشغّل 4 نماذج مكسورة يتعيَّن كشفها.
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ══════════════════════════════════════════════════════════════
// ثوابت العقد
// ══════════════════════════════════════════════════════════════

const CANONICAL_ARABIC_ALPHABET = [
  'ا','ب','ت','ث','ج','ح','خ','د','ذ','ر',
  'ز','س','ش','ص','ض','ط','ظ','ع','غ','ف',
  'ق','ك','ل','م','ن','ه','و','ي'
];

const PHASE_IDS              = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7'];
const REQUIRED_P5_STEP_KEYS  = ['context', 'target', 'identity', 'audio'];
const REQUIRED_P3_STEP_KEYS  = ['char', 'dots', 'phoneme', 'fact'];
const P6_ROUND_TYPES         = ['identify', 'sameordiff', 'close'];
const P7_ASSESS_TYPES        = ['show-letter', 'count-dots', 'sound'];
const P6_DEMO_IDS            = ['demo-listen', 'demo-fingers', 'demo-same-diff'];
const P6_UI_KEYS             = [
  'playSound','sound1','sound2','revealBtn','nextBtn','revealName','revealFingers',
  'correctAnswer','answerPanel','forTeacher','listenCompare','finger','fingers',
  'demoTitle','startActivity'
];

const KNOWN_ROOT_KEYS = [
  'meta','p4WritingPracticeDeferred','letters','strokeGuides','words','p5WordMeta',
  'p5RevealSteps','p6Demo','p6Strings','discriminationRounds','p7Prompts',
  'assessmentRounds','arabicAlphabet','targetLetterIds','phases'
];

// ══════════════════════════════════════════════════════════════
// SCHEMA — وصف موجز قابِل للعرض (مرجع توثيقي؛ الكود أدناه هو الفحص)
// ══════════════════════════════════════════════════════════════
const SCHEMA = {
  version: '1.0.0',
  rootKeys: KNOWN_ROOT_KEYS.slice(),
  phaseOrder: PHASE_IDS.slice(),
  p5StepKeys: REQUIRED_P5_STEP_KEYS.slice(),
  p3StepKeys: REQUIRED_P3_STEP_KEYS.slice(),
  p6RoundTypes: P6_ROUND_TYPES.slice(),
  p7AssessTypes: P7_ASSESS_TYPES.slice(),
  note:
    'Lesson Data = كائن مُجمَّد (Object.freeze) بأعلى 15 مفتاحاً.\n' +
    'P1..P7 بترتيب ثابت — خط الأنابيب مبرمج في app.js/activities.\n' +
    'الحقول المطلوبة = ما يفك المرء مرجعه بلا حماية في الشيفرة الحالية.\n' +
    'الاختياري = محمي في العرض أو درجة توثيقية (heroColor / chinesePinyin / zh / emoji).\n' +
    'المراجع المفقودة والمكررات = فحوص مجمّعة في نهاية التحقق.'
};

// ══════════════════════════════════════════════════════════════
// أدوات مساعدة
// ══════════════════════════════════════════════════════════════

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

function isHexColor(v) {
  return typeof v === 'string' && /^#[0-9A-Fa-f]{6}$/.test(v);
}

function isArabicChar(v) {
  return typeof v === 'string' && /^[\u0621-\u064A]$/.test(v);
}

function isObject(v) {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function setEq(a, b) {
  const sa = new Set(a), sb = new Set(b);
  if (sa.size !== sb.size) return false;
  for (const x of sa) if (!sb.has(x)) return false;
  return true;
}

function findDuplicates(list) {
  const seen = {}, dup = [];
  list.forEach((x, i) => {
    if (seen[x] !== undefined) dup.push({ value: x, firstIndex: seen[x], index: i });
    else seen[x] = i;
  });
  return dup;
}

function report() {
  return { ok: true, errors: [], warnings: [] };
}

// ══════════════════════════════════════════════════════════════
// validateLesson — الفحص الكامل لكائن LESSON
// ══════════════════════════════════════════════════════════════

function validateLesson(data) {
  const rep = report();
  const E = (p, m) => { rep.ok = false; rep.errors.push({ path: p, message: m }); };
  const W = (p, m) => rep.warnings.push({ path: p, message: m });

  if (!isObject(data)) {
    E('', 'LESSON يجب أن يكون كائناً (object) غير مصفوفة');
    return rep;
  }

  // ── Root ────────────────────────────────────────────────────
  for (const key of KNOWN_ROOT_KEYS) {
    if (!(key in data)) E(key, 'مفتاح أعلى مستوى إلزامي مفقود');
  }
  for (const key of Object.keys(data)) {
    if (!KNOWN_ROOT_KEYS.includes(key)) W(key, 'مفتاح أعلى مستوى غير معروف (اُمْسح أو أضِفه للعقد)');
  }

  if (!Array.isArray(data.letters)) { E('letters', 'المصفوفة letters مطلوبة'); return rep; }
  if (!Array.isArray(data.phases))  { E('phases', 'المصفوفة phases مطلوبة'); return rep; }
  if (!isObject(data.meta))         { E('meta', 'كائن meta مطلوب'); return rep; }

  // ── meta ────────────────────────────────────────────────────
  const meta = data.meta;
  const M = (k) => `meta.${k}`;
  if (!(isNonEmptyString(meta.id) && /^lesson-\d{2}$/.test(meta.id))) {
    E(M('id'), `معرف غير صالح — متوقع بصيغة lesson-XX ("${meta.id}")`);
  }
  if (!Number.isInteger(meta.number) || meta.number < 1) E(M('number'), 'عدد صحيح ≥ 1');
  for (const k of ['title','subtitle','summaryTitle','welcomeHintAr','welcomeHintZh','description','docTitle']) {
    if (!isNonEmptyString(meta[k])) E(M(k), 'نص غير فارغ مطلوب');
  }
  if (!isNonEmptyString(meta.level)) E(M('level'), 'نص مستوى غير فارغ مطلوب');
  if (!Number.isInteger(meta.duration) || meta.duration <= 0) E(M('duration'), 'عدد صحيح > 0');
  if (!Array.isArray(meta.targetLetters) || meta.targetLetters.length < 2) {
    E(M('targetLetters'), 'مصفوفة ≥ 2 حروف مطلوبة');
  } else {
    meta.targetLetters.forEach((ch, i) => {
      if (!isArabicChar(ch)) E(M('targetLetters') + `[${i}]`, `حرف عربي متوقع ("${ch}")`);
    });
    if (findDuplicates(meta.targetLetters).length) E(M('targetLetters'), 'أحرف مكررة داخل الـ targetLetters');
  }

  // completion
  if (!isObject(meta.completion)) E(M('completion'), 'كائن completion مطلوب');
  else {
    if (!isNonEmptyString(meta.completion.title)) E(M('completion.title'), 'نص غير فارغ مطلوب');
    if (!Array.isArray(meta.completion.chars)) E(M('completion.chars'), 'مصفوفة chars مطلوبة');
    else {
      if (meta.completion.chars.length !== meta.targetLetters.length) {
        E(M('completion.chars'), `الطول يجب أن يساوي meta.targetLetters (${meta.completion.chars.length} != ${meta.targetLetters.length})`);
      }
      meta.completion.chars.forEach((ch, i) => {
        if (!isObject(ch) || !isNonEmptyString(ch.id) || !isNonEmptyString(ch.char)) {
          E(M('completion.chars') + `[${i}]`, 'كل عنصر يتطلب {id نص، char نص}');
        }
      });
      if (findDuplicates(meta.completion.chars.map(c => c && c.id)).length) {
        E(M('completion.chars'), 'معرفات chars مكررة');
      }
    }
    if (!isObject(meta.completion.subtitle) || !isNonEmptyString(meta.completion.subtitle.title) ||
        !Array.isArray(meta.completion.subtitle.lines)) {
      E(M('completion.subtitle'), 'subtitle يتطلب {title نص، lines مصفوفة}');
    }
  }

  if (!isObject(meta.nextLesson) || !isNonEmptyString(meta.nextLesson.chars) || !isNonEmptyString(meta.nextLesson.hint)) {
    E(M('nextLesson'), 'nextLesson يتطلب {chars نص، hint نص}');
  }

  // ── p4WritingPracticeDeferred ────────────────────────────────
  if (typeof data.p4WritingPracticeDeferred !== 'boolean') {
    E('p4WritingPracticeDeferred', 'قيمة منطقية (boolean) مطلوبة');
  }

  // ── letters ─────────────────────────────────────────────────
  const letters = data.letters;
  if (letters.length !== meta.targetLetters.length) {
    E('letters', `طول letters يجب أن يساوي meta.targetLetters (${letters.length} != ${meta.targetLetters.length})`);
  }
  const letterById = {};
  letters.forEach((l, i) => {
    const P = `letters[${i}]`;
    if (!isObject(l)) { E(P, 'كائن حرف مطلوب'); return; }
    if (!isNonEmptyString(l.id)) E(P + '.id', 'معرف نصي مطلوب');
    if (!isArabicChar(l.char)) E(P + '.char', 'حرف عربي واحد متوقع');
    for (const k of ['name','phoneme','ipa','fact','dotPosition']) {
      if (!isNonEmptyString(l[k])) E(P + '.' + k, 'نص غير فارغ مطلوب');
    }
    if (!Number.isInteger(l.dots) || l.dots < 0 || l.dots > 3) E(P + '.dots', 'عدد صحيح من 0 إلى 3');
    if (!isHexColor(l.color)) E(P + '.color', `صيغة hex #RRGGBB متوقعة ("${l.color}")`);
    if (!isNonEmptyString(l.audioFile) || !l.audioFile.includes('assets/audio/') || !l.audioFile.endsWith('.mp3')) {
      E(P + '.audioFile', 'مسار assets/audio/*.mp3 متوقع');
    }
    if (l.heroColor !== undefined && !isHexColor(l.heroColor)) E(P + '.heroColor', '(اختياري) صيغة hex #RRGGBB');
    if (l.chinesePinyin !== undefined && !isNonEmptyString(l.chinesePinyin)) E(P + '.chinesePinyin', '(اختياري) نص');
    if (l.id) letterById[l.id] = l;
  });
  const dupIds = findDuplicates(letters.map(l => l && l.id));
  dupIds.forEach(d => E(`letters[${d.index}].id`, `معرف مكرر: "${d.value}" ظهر في letters[${d.firstIndex}]`));
  const dupChars = findDuplicates(letters.map(l => l && l.char).filter(Boolean));
  dupChars.forEach(d => E('letters', `حرف مكرر: "${d.value}"`));

  // ── arabicAlphabet / targetLetterIds ─────────────────────────
  if (!Array.isArray(data.arabicAlphabet) || data.arabicAlphabet.length !== CANONICAL_ARABIC_ALPHABET.length) {
    E('arabicAlphabet', `الأبجدية يجب أن تضم 28 حرفاً (وُجد ${Array.isArray(data.arabicAlphabet) ? data.arabicAlphabet.length : 'غير مصفوفة'})`);
  } else if (!setEq(data.arabicAlphabet, CANONICAL_ARABIC_ALPHABET)) {
    E('arabicAlphabet', 'مجموعة الحروف لا تطابق الأبجدية العربية القياسية (28)');
  }
  if (!Array.isArray(data.targetLetterIds)) E('targetLetterIds', 'مصفوفة مطلوبة');
  else {
    if (findDuplicates(data.targetLetterIds).length) E('targetLetterIds', 'أحرف مكررة');
    data.targetLetterIds.forEach((ch, i) => {
      if (!isArabicChar(ch)) E(`targetLetterIds[${i}]`, `حرف عربي متوقع ("${ch}")`);
    });
    if (!setEq(data.targetLetterIds, letters.map(l => l.char).filter(Boolean))) {
      E('targetLetterIds', 'المجموعة يجب أن تطابق letters[].char');
    }
    if (setEq(data.targetLetterIds, meta.targetLetters || [])) {
      // مطابقة مقبولة
    } else {
      E('targetLetterIds', 'المجموعة يجب أن تطابق meta.targetLetters');
    }
  }

  // ── strokeGuides ─────────────────────────────────────────────
  if (!Array.isArray(data.strokeGuides)) E('strokeGuides', 'مصفوفة مطلوبة');
  else {
    if (data.strokeGuides.length !== letters.length) {
      E('strokeGuides', `الطول يجب أن يساوي letters.length (${data.strokeGuides.length} != ${letters.length})`);
    }
    const guideLetterIds = [];
    data.strokeGuides.forEach((g, i) => {
      const P = `strokeGuides[${i}]`;
      if (!isObject(g)) { E(P, 'كائن دليل مطلوب'); return; }
      if (!isNonEmptyString(g.letterId)) E(P + '.letterId', 'معرف حرف مطلوب');
      else {
        guideLetterIds.push(g.letterId);
        const target = letterById[g.letterId];
        if (!target) E(P + '.letterId', `مرجع مفقود: الحرف "${g.letterId}" غير موجود في letters`);
        else if (!isHexColor(g.color)) E(P + '.color', 'صيغة hex #RRGGBB متوقعة');
        else if (g.color !== target.color) E(P + '.color', `يجب أن يطابق لون الحرف الهدف letters.${g.letterId}.color (${target.color})`);
      }
      if (!isNonEmptyString(g.videoFile) || !g.videoFile.includes('assets/videos/') || !g.videoFile.endsWith('.mp4')) {
        E(P + '.videoFile', 'مسار assets/videos/*.mp4 متوقع');
      }
      if (!Array.isArray(g.steps) || g.steps.length < 1) E(P + '.steps', 'مصفوفة ≥ 1 خطوة مطلوبة');
      else g.steps.forEach((s, j) => {
        if (!isObject(s) || !isNonEmptyString(s.label) || !isNonEmptyString(s.desc)) {
          E(`${P}.steps[${j}]`, 'كل خطوة تتطلب {label نص، desc نص}');
        }
      });
    });
    guideLetterIds.forEach((id, i) => {
      if (guideLetterIds.indexOf(id) !== i) E(`strokeGuides`, `letterId مكرر: "${id}"`);
    });
    if (!setEq(guideLetterIds, letters.map(l => l.id).filter(Boolean))) {
      E('strokeGuides', 'دليل واحد لكل حرف إلزامي (مجموعة letterId == letters ids)');
    }
  }

  // ── words ────────────────────────────────────────────────────
  const words = data.words;
  if (!Array.isArray(words)) E('words', 'مصفوفة مطلوبة');
  else {
    if (words.length < 1) E('words', 'على الأقل كلمة واحدة');
    const wordById = {};
    const targetedLetters = new Set();
    words.forEach((w, i) => {
      const P = `words[${i}]`;
      if (!isObject(w)) { E(P, 'كائن كلمة مطلوب'); return; }
      if (!isNonEmptyString(w.id)) E(P + '.id', 'معرف نصي مطلوب');
      else wordById[w.id] = w;
      for (const k of ['word','meaning','audioText']) if (!isNonEmptyString(w[k])) E(P + '.' + k, 'نص غير فارغ مطلوب');
      if (!isNonEmptyString(w.targetLetterId)) E(P + '.targetLetterId', 'معرف حرف هدف مطلوب');
      else {
        const target = letterById[w.targetLetterId];
        if (!target) E(P + '.targetLetterId', `مرجع مفقود: الحرف "${w.targetLetterId}" غير موجود في letters`);
        else {
          targetedLetters.add(w.targetLetterId);
          if (!isHexColor(w.color)) E(P + '.color', 'صيغة hex #RRGGBB متوقعة');
          else if (w.color !== target.color) E(P + '.color', `يجب أن يطابق لون الحرف الهدف letters.${w.targetLetterId}.color (${target.color})`);
          if (!Array.isArray(w.chars) || w.chars.length < 2) E(P + '.chars', 'مصفوفة ≥ 2 حروف مطلوبة');
          else {
            w.chars.forEach((ch, j) => {
              if (!isArabicChar(ch)) E(`${P}.chars[${j}]`, `حرف عربي متوقع ("${ch}")`);
            });
            if (!Array.isArray(w.targetPositions) || w.targetPositions.length < 1) E(P + '.targetPositions', 'مصفوفة مواضع ≥ 1 مطلوبة');
            else {
              const seenPos = new Set();
              w.targetPositions.forEach((pos, j) => {
                if (!Number.isInteger(pos) || pos < 0 || pos >= w.chars.length) {
                  E(`${P}.targetPositions[${j}]`, `فهرس خارج الحدود (0..${w.chars.length - 1})`);
                } else {
                  if (seenPos.has(pos)) E(P + '.targetPositions', 'مواضع مكررة');
                  seenPos.add(pos);
                  if (w.chars[pos] !== target.char) {
                    E(`${P}.targetPositions[${j}]`, `الحرف عند الموضع ${pos} هو "${w.chars[pos]}" بينما الحرف الهدف "${target.char}"`);
                  }
                }
              });
            }
          }
        }
      }
      if (!isNonEmptyString(w.audioFile) || !w.audioFile.includes('assets/audio/') || !w.audioFile.endsWith('.mp3')) {
        E(P + '.audioFile', 'مسار assets/audio/*.mp3 متوقع');
      }
    });
    const dupW = findDuplicates(words.map(w => w && w.id));
    dupW.forEach(d => E(`words[${d.index}].id`, `معرف مكرر: "${d.value}"`));

    // كل حرف يجب أن يكون مستهدفاً بكلمة واحدة على الأقل (لا عناصر يتيمة في P5)
    const letterIdSet = new Set(letters.map(l => l.id).filter(Boolean));
    for (const id of letterIdSet) {
      if (!targetedLetters.has(id)) E('words', `الحرف "${id}" لا تستهدفه أي كلمة (يجب أن يظهر في words[].targetLetterId)`);
    }
  }

  // ── p5WordMeta ───────────────────────────────────────────────
  if (!isObject(data.p5WordMeta)) E('p5WordMeta', 'كائن مطلوب');
  else {
    const wordIds = new Set(words.map(w => w && w.id).filter(Boolean));
    for (const wid of wordIds) {
      if (!(wid in data.p5WordMeta)) E('p5WordMeta', `إدخال مفقود للكلمة "${wid}"`);
    }
    for (const key of Object.keys(data.p5WordMeta)) {
      if (!wordIds.has(key)) W('p5WordMeta.' + key, `مفتاح لا يقابل أي كلمة في words`);
      else {
        const entry = data.p5WordMeta[key];
        if (!isObject(entry)) E('p5WordMeta.' + key, 'كائن إدخال مطلوب');
        else if (!isNonEmptyString(entry.emoji) && !isNonEmptyString(entry.zh)) {
          W('p5WordMeta.' + key, 'بدون emoji ولا zh — غير مفيدات العرض، أضِف أحدهما');
        }
      }
    }
  }

  // ── p5RevealSteps ────────────────────────────────────────────
  if (!Array.isArray(data.p5RevealSteps) || data.p5RevealSteps.length !== 4) {
    E('p5RevealSteps', `4 خطوات بالضبط مطلوبة (المفاتيح بالترتيب: ${REQUIRED_P5_STEP_KEYS.join(',')})`);
  } else {
    const keys = data.p5RevealSteps.map(s => s && s.key);
    data.p5RevealSteps.forEach((s, i) => {
      if (!isObject(s) || !isNonEmptyString(s.key) || !isNonEmptyString(s.label)) {
        E(`p5RevealSteps[${i}]`, 'كل خطوة تتطلب {key نص، label نص}');
      }
    });
    if (JSON.stringify(keys) !== JSON.stringify(REQUIRED_P5_STEP_KEYS)) {
      E('p5RevealSteps', `الترتيب ثابت إلزامياً: ${REQUIRED_P5_STEP_KEYS.join(' → ')} (وُجد: ${keys.join(',')})`);
    }
  }

  // ── p6Demo ───────────────────────────────────────────────────
  if (!isObject(data.p6Demo) || !Array.isArray(data.p6Demo.steps) || data.p6Demo.steps.length < 1) {
    E('p6Demo', 'كائن بموجب steps ≥ 1 مطلوب');
  } else {
    const demoIds = [];
    data.p6Demo.steps.forEach((s, i) => {
      const P = `p6Demo.steps[${i}]`;
      if (!isObject(s)) { E(P, 'كائن خطوة مطلوب'); return; }
      if (!isNonEmptyString(s.id)) E(P + '.id', 'معرف نصي مطلوب');
      else {
        demoIds.push(s.id);
        if (!P6_DEMO_IDS.includes(s.id)) W(P + '.id', `معرف خطوة غير معروف ("${s.id}") — العارض يعرف: ${P6_DEMO_IDS.join(',')}`);
        if (s.id === 'demo-listen' && !isNonEmptyString(s.exampleLetterId)) {
          E(P + '.exampleLetterId', 'خطوة demo-listen تتطلب exampleLetterId (مرجع حرف)');
        }
      }
      for (const k of ['ar','zh','teacherHint']) if (!isNonEmptyString(s[k])) E(P + '.' + k, 'نص غير فارغ مطلوب');
      if (s.exampleLetterId && !letterById[s.exampleLetterId]) {
        E(P + '.exampleLetterId', `مرجع مفقود: الحرف "${s.exampleLetterId}" غير موجود في letters`);
      }
    });
    if (findDuplicates(demoIds).length) E('p6Demo.steps', 'معرفات خطوات مكررة');
  }

  // ── p6Strings ────────────────────────────────────────────────
  if (!isObject(data.p6Strings)) E('p6Strings', 'كائن مطلوب');
  else {
    const s = data.p6Strings;
    if (!isObject(s.phaseTitle) || !isNonEmptyString(s.phaseTitle.ar) || !isNonEmptyString(s.phaseTitle.zh)) {
      E('p6Strings.phaseTitle', '{ar، zh} نصّان غير فارغين مطلوبان');
    }
    const requireBiText = (P, sub) => {
      if (!isObject(sub)) { E(P, 'كائن {ar، zh} مطلوب'); return; }
      if (!isNonEmptyString(sub.ar)) E(P + '.ar', 'نص عربي غير فارغ إلزامي');
      if (sub.zh !== undefined && !isNonEmptyString(sub.zh)) E(P + '.zh', '(اختياري) نص');
    };
    P6_ROUND_TYPES.forEach(t => {
      const chunk = s[t];
      if (!isObject(chunk)) { E('p6Strings.' + t, 'كائن نوع الجولة مطلوب'); return; }
      requireBiText(`p6Strings.${t}.teacherGuide`, chunk.teacherGuide && chunk.teacherGuide.purpose);
      requireBiText(`p6Strings.${t}.teacherGuide.before`, chunk.teacherGuide && chunk.teacherGuide.before);
      requireBiText(`p6Strings.${t}.teacherGuide.listen`, chunk.teacherGuide && chunk.teacherGuide.listen);
      requireBiText(`p6Strings.${t}.teacherGuide.reveal`, chunk.teacherGuide && chunk.teacherGuide.reveal);
      requireBiText(`p6Strings.${t}.instruction`, chunk.instruction);
      if (t === 'identify') requireBiText(`p6Strings.${t}.question`, chunk.question);
      if (t === 'sameordiff') {
        requireBiText(`p6Strings.${t}.question`, chunk.question);
        requireBiText(`p6Strings.${t}.same`, chunk.same);
        requireBiText(`p6Strings.${t}.diff`, chunk.diff);
      }
      if (t === 'close') requireBiText(`p6Strings.${t}.listenPrompt`, chunk.listenPrompt);
    });
    const ui = s.ui;
    if (!isObject(ui)) E('p6Strings.ui', 'كائن ui مطلوب');
    else {
      requireBiText('p6Strings.ui.finger', ui.finger);
      requireBiText('p6Strings.ui.fingers', ui.fingers);
      for (const key of Object.keys(ui)) {
        if (!P6_UI_KEYS.includes(key)) W('p6Strings.ui.' + key, 'مفتاح ui غير معروف');
      }
    }
  }

  // ── discriminationRounds ─────────────────────────────────────
  if (!Array.isArray(data.discriminationRounds) || data.discriminationRounds.length < 1) {
    E('discriminationRounds', 'مصفوفة غير فارغة مطلوبة');
  } else {
    const roundById = {};
    data.discriminationRounds.forEach((r, i) => {
      const P = `discriminationRounds[${i}]`;
      if (!isObject(r)) { E(P, 'كائن جولة مطلوب'); return; }
      if (!isNonEmptyString(r.id)) E(P + '.id', 'معرف نصي مطلوب');
      else roundById[r.id] = r;
      if (!P6_ROUND_TYPES.includes(r.type)) E(P + '.type', `نوع غير معروف ("${r.type}") — المقبول: ${P6_ROUND_TYPES.join(',')}`);
      for (const k of ['label','instruction']) if (!isNonEmptyString(r[k])) E(P + '.' + k, 'نص غير فارغ مطلوب');

      if (r.type === 'identify') {
        if (!Array.isArray(r.pairs) || r.pairs.length < 1) E(P + '.pairs', 'مصفوفة ≥ 1 مطلوبة');
        else {
          r.pairs.forEach((p, j) => {
            const Q = `${P}.pairs[${j}]`;
            if (!isObject(p)) { E(Q, 'كائن عنصر مطلوب'); return; }
            if (!isNonEmptyString(p.playId)) E(Q + '.playId', 'معرف حرف مطلوب');
            else if (!letterById[p.playId]) E(Q + '.playId', `مرجع مفقود: الحرف "${p.playId}" غير موجود في letters`);
            if (!Number.isInteger(p.answer) || p.answer < 1) E(Q + '.answer', 'عدد صحيح ≥ 1');
          });
        }
      } else if (r.type === 'sameordiff') {
        if (!Array.isArray(r.pairs) || r.pairs.length < 1) E(P + '.pairs', 'مصفوفة ≥ 1 مطلوبة');
        else r.pairs.forEach((p, j) => {
          const Q = `${P}.pairs[${j}]`;
          if (!isObject(p)) { E(Q, 'كائن عنصر مطلوب'); return; }
          if (!Array.isArray(p.playIds) || p.playIds.length !== 2) E(Q + '.playIds', 'مصفوفة من معرفي حرف بالضبط');
          else {
            p.playIds.forEach((id, k) => {
              if (!isNonEmptyString(id) || !letterById[id]) E(`${Q}.playIds[${k}]`, `مرجع مفقود/فارغ: "${id}"`);
            });
            const [a, b] = p.playIds;
            if (typeof p.same !== 'boolean') E(Q + '.same', 'قيمة منطقية مطلوبة');
            else if (p.same === true && a !== b) E(Q + '.same', 'نفس الصوت (same=true) بينما الحرفان مختلفان');
            else if (p.same === false && a === b) W(Q + '.same', 'حرفان متطابقان مع same=false — مراجعة');
          }
        });
      } else if (r.type === 'close') {
        if (!Array.isArray(r.triplets) || r.triplets.length < 1) E(P + '.triplets', 'مصفوفة ≥ 1 مطلوبة');
        else r.triplets.forEach((tr, j) => {
          const Q = `${P}.triplets[${j}]`;
          if (!isObject(tr)) { E(Q, 'كائن عنصر مطلوب'); return; }
          if (isNonEmptyString(tr.note)) { /* جيد */ } else E(Q + '.note', 'نص ملاحظة مطلوب');
          if (!Array.isArray(tr.ids) || tr.ids.length < 2) E(Q + '.ids', 'مصفوفة ≥ 2 معرف حرف مطلوبة');
          else tr.ids.forEach((id, k) => {
            if (!isNonEmptyString(id) || !letterById[id]) E(`${Q}.ids[${k}]`, `مرجع مفقود: "${id}"`);
          });
        });
      }
    });
    if (findDuplicates(data.discriminationRounds.map(r => r && r.id)).length) E('discriminationRounds', 'معرفات جولات مكررة');
  }

  // ── p7Prompts ────────────────────────────────────────────────
  if (!isObject(data.p7Prompts)) E('p7Prompts', 'كائن مطلوب');
  else {
    for (const key of Object.keys(data.p7Prompts)) {
      const v = data.p7Prompts[key];
      if (!Array.isArray(v) || v.length < 2 || !isNonEmptyString(v[0]) || !isNonEmptyString(v[1])) {
        E('p7Prompts.' + key, 'قيمة مطلوبة كـ [نص عربي، نص صيني] بطول ≥ 2');
      }
    }
    if (Array.isArray(data.assessmentRounds)) {
      for (const r of data.assessmentRounds) {
        if (r && r.id && !(r.id in data.p7Prompts)) W('p7Prompts.' + r.id, 'مفتاح تلميح مفقود لجولة التقييم (العارض يستعمل fallback بالملصق)');
      }
    }
  }

  // ── assessmentRounds ─────────────────────────────────────────
  if (!Array.isArray(data.assessmentRounds) || data.assessmentRounds.length < 1) {
    E('assessmentRounds', 'مصفوفة غير فارغة مطلوبة');
  } else {
    data.assessmentRounds.forEach((r, i) => {
      const P = `assessmentRounds[${i}]`;
      if (!isObject(r)) { E(P, 'كائن جولة مطلوب'); return; }
      if (!isNonEmptyString(r.id)) E(P + '.id', 'معرف نصي مطلوب');
      if (!P7_ASSESS_TYPES.includes(r.type)) E(P + '.type', `نوع غير معروف ("${r.type}") — المقبول: ${P7_ASSESS_TYPES.join(',')}`);
      for (const k of ['label','instruction']) if (!isNonEmptyString(r[k])) E(P + '.' + k, 'نص غير فارغ مطلوب');
      if (!Array.isArray(r.items) || r.items.length < 1) E(P + '.items', 'مصفوفة ≥ 1 مطلوبة');
      else r.items.forEach((it, j) => {
        const Q = `${P}.items[${j}]`;
        if (!isObject(it)) { E(Q, 'كائن عنصر مطلوب'); return; }
        if (!isNonEmptyString(it.letterId)) E(Q + '.letterId', 'معرف حرف مطلوب');
        else {
          const l = letterById[it.letterId];
          if (!l) E(Q + '.letterId', `مرجع مفقود: الحرف "${it.letterId}" غير موجود في letters`);
          else if (r.type === 'count-dots' && (![1, 2, 3].includes(l.dots) || !['فوق','أسفل'].includes(l.dotPosition))) {
            W(Q + '.letterId', `نقاط/موضع الحرف "${l.id}" (${l.dots}، «${l.dotPosition}») خارج نطاق عرض p7 الكبير ثنائي (1-3 فوق/أسفل) — مشكلة معروفة غير حاجبة`);
          }
        }
        for (const k of ['question','answer']) if (!isNonEmptyString(it[k])) E(Q + '.' + k, 'نص غير فارغ مطلوب');
      });
    });
    if (findDuplicates(data.assessmentRounds.map(r => r && r.id)).length) E('assessmentRounds', 'معرفات جولات مكررة');
  }

  // ── phases — العقد الصلب P1..P7 ──────────────────────────────
  const phases = data.phases;
  const phaseIds = phases.map(p => p && p.id);
  if (phases.length !== 7) E('phases', `7 مراحل بالضبط مطلوبة (P1..P7 بالترتيب) — وُجد ${phases.length}`);
  else if (JSON.stringify(phaseIds) !== JSON.stringify(PHASE_IDS)) {
    E('phases', `المعرفات والترتيب ثابتان إلزامياً: ${PHASE_IDS.join(' → ')} (وُجد: ${phaseIds.join(',')})`);
  }

  const byId = {};
  phases.forEach((ph, i) => { if (ph && ph.id) byId[ph.id] = ph; });
  const phaseRef = (P, arr, allowedIds, what) => {
    if (!Array.isArray(arr)) { E(`${P}.${what}`, 'مصفوفة مطلوبة'); return; }
    if (findDuplicates(arr).length) E(`${P}.${what}`, 'معرفات مكررة');
    arr.forEach((id, j) => {
      if (!allowedIds.has(id)) E(`${P}.${what}[${j}]`, `مرجع مفقود: "${id}"`);
    });
  };

  phases.forEach((ph, i) => {
    const P = `phases[${i}]`;
    if (!isObject(ph)) { E(P, 'كائن مرحلة مطلوب'); return; }
    for (const k of ['title','goal']) if (!isNonEmptyString(ph[k])) E(P + '.' + k, 'نص غير فارغ مطلوب');
    if (!isNonEmptyString(ph.duration)) E(P + '.duration', 'نص غير فارغ مطلوب');
    if (ph.number !== i + 1) E(P + '.number', `يجب أن يساوي فهرس المرحلة + 1 (${i + 1}) — وُجد ${ph.number}`);

    if (ph.id === 'P1') {
      if (!Array.isArray(ph.steps) || ph.steps.length < 3) E(P + '.steps', '≥ 3 خطوات مطلوبة (الخطوة 0 = intro، الخطوة 2 = spotlight)');
      else ph.steps.forEach((s, j) => {
        if (!isObject(s) || !isNonEmptyString(s.id) || !isNonEmptyString(s.label) || !isNonEmptyString(s.hint) || !isNonEmptyString(s.content)) {
          E(`${P}.steps[${j}]`, 'كل خطوة تتطلب {id، label، hint، content} نصوصاً غير فارغة');
        }
      });
      const stepIds = ph.steps.map(s => s && s.id);
      if (findDuplicates(stepIds).length) E(P + '.steps', 'معرفات خطوات مكررة');
    }

    if (ph.id === 'P2') {
      phaseRef(P, ph.phonemeOrder, new Set(letters.map(l => l.id)), 'phonemeOrder');
      if (!setEq(ph.phonemeOrder || [], letters.map(l => l.id))) {
        E(P + '.phonemeOrder', 'يجب أن يغطي كل حرف مرة واحدة (المجموعة == letters ids)');
      }
      if (!Array.isArray(ph.activities) || ph.activities.length < 1) E(P + '.activities', 'مصفوفة ≥ 1 مطلوبة');
      else {
        ph.activities.forEach((a, j) => {
          if (!isObject(a) || !isNonEmptyString(a.id) || !isNonEmptyString(a.type) || !isNonEmptyString(a.label) || !isNonEmptyString(a.instruction)) {
            E(`${P}.activities[${j}]`, 'كل نشاط يتطلب {id، type، label، instruction} نصوصاً غير فارغة');
          }
        });
        if (findDuplicates(ph.activities.map(a => a && a.id)).length) E(P + '.activities', 'معرفات أنشطة مكررة');
      }
      if (!isObject(ph.fingerCountMap)) E(P + '.fingerCountMap', 'كائن مطلوب');
      else {
        const fcm = ph.fingerCountMap;
        if (!setEq(Object.keys(fcm), letters.map(l => l.id))) {
          E(P + '.fingerCountMap', 'مفاتيحه يجب أن تطابق letters ids تماماً');
        }
        for (const k of Object.keys(fcm)) {
          if (!Number.isInteger(fcm[k]) || fcm[k] < 1) E(P + '.fingerCountMap.' + k, 'عدد صحيح ≥ 1');
        }
      }
    }

    if (ph.id === 'P3') {
      phaseRef(P, ph.letterOrder, new Set(letters.map(l => l.id)), 'letterOrder');
      if (!setEq(ph.letterOrder || [], letters.map(l => l.id))) {
        E(P + '.letterOrder', 'يجب أن يغطي كل حرف مرة واحدة');
      }
      if (!Array.isArray(ph.revealSteps) || ph.revealSteps.length !== 4) {
        E(P + '.revealSteps', `4 خطوات بالضبط مطلوبة (المفاتيح بالترتيب: ${REQUIRED_P3_STEP_KEYS.join(',')})`);
      } else {
        const keys = ph.revealSteps.map(s => s && s.key);
        ph.revealSteps.forEach((s, j) => {
          if (!isObject(s) || !isNonEmptyString(s.key) || !isNonEmptyString(s.label)) E(`${P}.revealSteps[${j}]`, '{key، label} نصوص مطلوبة');
        });
        if (JSON.stringify(keys) !== JSON.stringify(REQUIRED_P3_STEP_KEYS)) {
          E(P + '.revealSteps', `الترتيب ثابت إلزامياً: ${REQUIRED_P3_STEP_KEYS.join(' → ')} (وُجد: ${keys.join(',')})`);
        }
      }
    }

    if (ph.id === 'P4') {
      phaseRef(P, ph.letterOrder, new Set(letters.map(l => l.id)), 'letterOrder');
      if (!setEq(ph.letterOrder || [], letters.map(l => l.id))) {
        E(P + '.letterOrder', 'يجب أن يغطي كل حرف مرة واحدة');
      }
    }

    if (ph.id === 'P5') {
      phaseRef(P, ph.wordOrder, new Set(words.map(w => w && w.id)), 'wordOrder');
      if (!setEq(ph.wordOrder || [], words.map(w => w && w.id))) {
        E(P + '.wordOrder', 'يجب أن يغطي كل كلمة مرة واحدة');
      }
    }

    if (ph.id === 'P6') {
      phaseRef(P, ph.roundOrder, new Set(data.discriminationRounds.map(r => r && r.id)), 'roundOrder');
      if (!setEq(ph.roundOrder || [], data.discriminationRounds.map(r => r && r.id))) {
        E(P + '.roundOrder', 'يجب أن يغطي كل جولة تمييز مرة واحدة');
      }
    }

    if (ph.id === 'P7') {
      phaseRef(P, ph.roundOrder, new Set(data.assessmentRounds.map(r => r && r.id)), 'roundOrder');
      if (!setEq(ph.roundOrder || [], data.assessmentRounds.map(r => r && r.id))) {
        E(P + '.roundOrder', 'يجب أن يغطي كل جولة تقييم مرة واحدة');
      }
    }
  });

  // ── مراجع عابرة إضافية (لا عناصر يتيمة) ─────────────────────
  // completion.chars id → letters ، و char == حرف الحرف
  if (Array.isArray(meta.completion.chars)) {
    meta.completion.chars.forEach((ch, i) => {
      if (ch && isNonEmptyString(ch.id)) {
        const l = letterById[ch.id];
        if (!l) E(`meta.completion.chars[${i}].id`, `مرجع مفقود: "${ch.id}" غير موجود في letters`);
        else if (ch.char !== l.char) E(`meta.completion.chars[${i}]`, `char "${ch.char}" يجب أن يطابق letters.${ch.id}.char ("${l.char}")`);
      }
    });
  }

  // كل حرف يجب أن يظهر في جولات التمييز وفي التقييم (لا يقبع حرف بدون تمرين)
  {
    const inD = new Set();
    (data.discriminationRounds || []).forEach(r => {
      if (r.type === 'identify') (r.pairs || []).forEach(p => p && isNonEmptyString(p.playId) && inD.add(p.playId));
      if (r.type === 'sameordiff') (r.pairs || []).forEach(p => (p && p.playIds || []).forEach(id => inD.add(id)));
      if (r.type === 'close') (r.triplets || []).forEach(tr => (tr && tr.ids || []).forEach(id => inD.add(id)));
    });
    const inQ = new Set();
    (data.assessmentRounds || []).forEach(r => (r.items || []).forEach(it => it && isNonEmptyString(it.letterId) && inQ.add(it.letterId)));
    for (const id of letters.map(l => l.id).filter(Boolean)) {
      if (!inD.has(id)) E('discriminationRounds', `الحرف "${id}" لا يظهر في أي جولة تمييز`);
      if (!inQ.has(id)) E('assessmentRounds', `الحرف "${id}" لا يظهر في أي جولة تقييم`);
    }
  }

  return rep;
}

// ══════════════════════════════════════════════════════════════
// تحميل مصدر درس (نص ملف) والتحقق منه
// ══════════════════════════════════════════════════════════════

function evaluateLessonSource(src) {
  // تقييم نص lesson-XX.js داخل scope خاص، وإرجاع LESSON
  const fn = new Function(src + '\n;return LESSON;');
  return fn();
}

function validateLessonSource(src, sourceName) {
  let lesson;
  try {
    lesson = evaluateLessonSource(src);
  } catch (e) {
    const rep = report();
    rep.ok = false;
    rep.errors.push({ path: '', message: `فشل تقييم الملف: ${e.message}` });
    return { lesson: null, report: rep };
  }

  if (!isObject(lesson)) {
    const rep = report();
    rep.ok = false;
    rep.errors.push({ path: '', message: 'LESSON غير معرَّف أو ليس كائناً بعد التقييم' });
    return { lesson: null, report: rep };
  }

  const rep = validateLesson(lesson);
  if (!Object.isFrozen(lesson)) {
    rep.ok = false;
    rep.errors.push({ path: '', message: 'LESSON غير مجمَّد — يتطلب Object.freeze(LESSON) في نهاية الملف' });
  }

  const fm = /lesson-(\d{2})/.exec(sourceName || '');
  if (fm && lesson.meta && isNonEmptyString(lesson.meta.id) && lesson.meta.id !== 'lesson-' + fm[1]) {
    rep.ok = false;
    rep.errors.push({ path: 'meta.id', message: `يجب أن يطابق اسم الملف: متوقع "lesson-${fm[1]}"، وُجد "${lesson.meta.id}"` });
  }

  return { lesson, report: rep };
}

function validateLessonFile(filePath) {
  const src = fs.readFileSync(filePath, 'utf8');
  return validateLessonSource(src, path.basename(filePath));
}

// ══════════════════════════════════════════════════════════════
// الاختبار الذاتي السلبي — 4 نماذج مكسورة يجب كشفها
// ══════════════════════════════════════════════════════════════

function runSelfTests() {
  const source01 = fs.readFileSync(path.join(__dirname, '..', 'js', 'lesson-01.js'), 'utf8');
  const base = evaluateLessonSource(source01); // كائن الدرس الحقيقي

  const cases = [
    {
      name: 'تكرار معرف حرف (letters.id)',
      mutate: l => { l.letters[1].id = l.letters[0].id; }
    },
    {
      name: 'مرجع كلمة مفقود (words.targetLetterId)',
      mutate: l => { l.words[0].targetLetterId = 'zzz'; }
    },
    {
      name: 'ترتيب P3 مكسور (revealSteps)',
      mutate: l => { l.phases[2].revealSteps.reverse(); }
    },
    {
      name: 'درس غير مجمَّد (Object.freeze محذوف)',
      source: source01.replace(/Object\.freeze\(LESSON\);\s*$/, ''),
      isSource: true
    }
  ];

  let passed = 0;
  const results = [];
  cases.forEach((c, i) => {
    let rep;
    if (c.isSource) {
      rep = validateLessonSource(c.source, 'lesson-01.js').report;
    } else {
      const clone = JSON.parse(JSON.stringify(base));
      c.mutate(clone);
      rep = validateLesson(clone);
    }
    const caught = rep.errors.length > 0;
    if (caught) passed++;
    results.push({ index: i + 1, name: c.name, caught, sample: rep.errors[0] ? rep.errors[0].message : '' });
  });
  return { passed, total: cases.length, results };
}

// ══════════════════════════════════════════════════════════════
// CLI — بوابة التحقق
// ══════════════════════════════════════════════════════════════

function discoverLessons() {
  const jsDir = path.join(__dirname, '..', 'js');
  return fs.readdirSync(jsDir)
    .filter(f => /^lesson-\d{2}\.js$/.test(f))
    .sort()
    .map(f => path.join(jsDir, f));
}

function printLine(prefix, item) {
  const p = item.path ? ` (${item.path})` : '';
  console.log(`  ${prefix} ${item.message}${p}`);
}

if (require.main === module) {
  const args = process.argv.slice(2).filter(a => !a.startsWith('--'));
  const files = args.length
    ? args.map(a => path.resolve(__dirname, '..', a))
    : discoverLessons();

  const selfTest = runSelfTests();

  if (!files.length) {
    console.log('لم يُعثر على أي ملف lesson-XX.js في js/');
    console.log(`SELF-TEST: ${selfTest.passed}/${selfTest.total}`);
    process.exit(1);
  }

  let totalErrors = 0;
  let totalWarnings = 0;
  console.log('═'.repeat(60));
  console.log('Phase 4 — Formal Lesson Data Contract — Validator');
  console.log('═'.repeat(60));

  files.forEach(file => {
    const name = path.basename(file);
    const { report: rep } = validateLessonFile(file);
    totalErrors += rep.errors.length;
    totalWarnings += rep.warnings.length;
    console.log('\n' + name);
    if (rep.errors.length === 0 && rep.warnings.length === 0) {
      console.log('  PASS — 0 أخطاء، 0 توصيات');
    }
    rep.errors.forEach(e => printLine('[ERROR]', e));
    rep.warnings.forEach(w => printLine('[WARN ]', w));
    console.log(`  summary: ${rep.errors.length} أخطاء | ${rep.warnings.length} توصيات`);
  });

  console.log('\n--- الاختبار الذاتي السلبي ---');
  selfTest.results.forEach(r => {
    console.log(`  ${r.caught ? 'PASS' : 'FAIL'}  تحقّق ${r.index}/4 — ${r.name}${r.sample ? ' → ' + r.sample : ''}`);
  });

  console.log('\n' + '═'.repeat(60));
  console.log(`RESULT: ${files.length} ملف | ${totalErrors} خطأ | ${totalWarnings} توصية`);
  console.log(`SELF-TEST: ${selfTest.passed}/${selfTest.total} حالات مكسورة مكتشفة`);
  console.log('═'.repeat(60));

  if (totalErrors > 0 || selfTest.passed !== selfTest.total) {
    process.exit(1);
  }
  process.exit(0);
}

module.exports = {
  SCHEMA,
  validateLesson,
  validateLessonSource,
  validateLessonFile,
  evaluateLessonSource,
  runSelfTests
};