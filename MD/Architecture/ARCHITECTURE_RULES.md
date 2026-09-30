# ARCHITECTURE_RULES.md — قواعد المعمارية

> الوصف الفعلي لمعمارية `Lesson-01-classroom-P6-Fixed` + قواعد إلزامية للتطوير.
> المصدر: قراءة كاملة لـ `lesson-01.js` (444 سطر) و`app.js` (1752 سطر) و`style.css` (2831 سطر) و`lecture-01.html`.

## 1. الفصل الصارم بين الطبقات

| الطبقة | الملف | المسؤولية |
|---|---|---|
| البيانات | `js/lesson-01.js` | كل محتوى الدرس (حروف، كلمات، أسئلة، مراحل). **فارغ من أي منطق عرض.** |
| المنطق | `js/app.js` | محرك التفاعل والتنقل والصوت. |
| العرض | `lecture-01.html` + `css/style.css` | البنية والتنسيق؛ لا يحتوي بيانات الدرس. |

- `lesson-01.js` يُغلَّف بـ `Object.freeze(LESSON_01)` — البيانات مجمّدة لا تُعدَّل أثناء التشغيل.
- تعليق رأس الملف: "بيانات المحاضرة الأولى — منفصلة تماماً عن طريقة العرض".

## 2. بنية البيانات في `lesson-01.js`

`LESSON_01` = كائن واحد يحتوي:

- `meta` — id 'lesson-01', number 1, title 'الحروف الأولى', subtitle 'ب ت ث ن', level 'A0', duration 120, mvpPhases ['P1'..'P7'], targetLetters ['ب','ت','ث','ن'].
- `letters[]` — لكل حرف: `id, char, name, phoneme, dots, dotPosition, ipa, chinesePinyin, fact, color, audioFile`.
- `strokeGuides[]` — أدلة كتابة P4 لكل حرف: `letterId, steps[] (label+desc), svgPath, dotPositions[], startPoint, color`.
- `words[]` — كلمات P5: `id, word, meaning, targetLetterId, targetPositions[], chars[], audioText, audioFile, color`.
- `discriminationRounds[]` — جولات P6: D1 (identify — عد الأصابع)، D2 (sameordiff)، D3 (close — الأصوات المتقاربة).
- `assessmentRounds[]` — جولات P7: Q1 (show-letter)، Q2 (count-dots)، Q3 (sound).
- `arabicAlphabet[]` — 28 حرفاً (لحقل P1)، و`targetLetterIds`.
- `phases[]` — 7 مراحل P1..P7: `id, number, title, duration, goal, steps/activities/letterOrder/...`.

## 3. بنية `app.js`

ترتيب الأقسام (مع أرقام الأسطر المرجعية):

1. `STATE` (سطر 13) — الحالة المركزية: `currentPhaseIndex, currentStep` + حالة لكل مرحلة
   (`p2ActiveLetter, p3LetterIndex, p3RevealStep, p3CompletedLetters, p4StepIndex, p5WordIndex,
   p5RevealStep, p6RoundIndex, p6PairIndex, p6AnswerVisible, p7RoundIndex, p7ItemIndex, p7Scores`)
   + `attentionMode, audioPlaying`.
2. `AudioManager` (41) — `_cache` لملفات MP3، `_synth` لـ speechSynthesis،
   `init()` يبحث عن صوت ar-SA، `speak(text, rate)`، `play(filePath, fallbackText, rate)`
   (MP3 فإن رُفض Promise → Web Speech احتياطياً)، `playLetter`, `playWord`, `stop`.
3. `_updateAudioUI(playing)` (115) — يبدّل class `playing` على `.audio-indicator`.
4. `speakArabic(text, rate)` (122) — اختصار توافقي قديم.
5. `PhaseTimer` (127) — مؤقت للمعلم (غير إجباري)؛ `_parseDuration` يقرأ "٠ — ١٠ دقائق" → 10.
6. أدوات عامة: `phases` (176)، `getCurrentPhase` (178)، `updatePhaseBar` (185)،
   `updateProgressRail` (207)، `updateHint(text)` (215).
7. التنقل: `advance()` (225) و`retreat()` (241) — switch على phase.id يستدعي دوال المرحلة.
8. لكل مرحلة نمط موحد: **`initP<n>` / `advanceP<n>` / `renderP<n>` / `buildP<n>HTML`**
   + دوال تفاعل خاصة (مثل `p2PlaySound`, `p3ShowQuad`, `p4StartAnimation`, `p5Review`, `p6GoRound`, `p7Score`).
9. `goToPhase(index)` (1619) — يوقف الصوت، يحدّث الشريط، يهيئ المرحلة، يضيف انتقالاً.
10. `toggleAttentionMode`/`exitAttentionMode` (1648/1663) — وضع استعادة الانتباه.
11. `showCompletionBanner`/`hideCompletionBanner` (1673/1678).
12. ربط لوحة المفاتيح (1686): Space/→ = advance، ←/Backspace = retreat،
    A = انتباه، F = شاشة كاملة، 1-7 = قفز للمرحلة.
13. `toggleFullscreen` (1720)، و`DOMContentLoaded` (1731): تهيئة الصوت + بناء أزرار `phase-nav` + `goToPhase(0)`.

## 4. عقد DOM (معرّفات إلزامية — لا تغيّرها دون تحديث app.js)

`#content-zone`, `#phase-title`, `#phase-title-text`, `#phase-duration`, `#phase-goal`,
`#phase-timer`, `#phase-nav` (+ `button.phase-nav-btn[data-phase]`),
`#teacher-hint`, `#hint-zone`, `#progress-rail-fill`, `#attention-overlay`, `#completion-banner`,
class `.audio-indicator`, `.sound-btn[data-letter-id]`.

## 5. نظام التصميم في `style.css`

- `:root` (سطر 8) — متغيرات: ألوان أساسية (navy/teal/gold/amber/rust/green/violet)،
  ألوان الحروف `--color-ba/ta/tha/nun`، مقاسات خط `clamp()`، خطوط، مسافات، انتقالات.
- خطوط @font-face محلية فقط (Noto Sans Arabic + Noto Naskh Arabic) — لا Google Fonts.
- أقسام CSS على الترتيب: reset → HUD (شريط المعلم) → content-zone → P1..P7 → overlays.
- استهداف P2 عبر `:has(.sound-btn.active[data-letter-id="..."])` لتلوين الحرف النشط ديناميكياً.

## 6. قواعد إلزامية للتطوير

1. **لا تُعدَّل `lesson-01.js` من منطق العرض** — أي بيانات جديدة تُضاف ككائن في `LESSON_01` فقط.
2. **أي مرحلة جديدة = 4 دوال** (`init/advance/render/build`) + سطر في `advance()` و`retreat()` و`goToPhase()` + case في ربط المفاتيح.
3. **لا تكسر التحكم بلوحة المفاتيح** — Space/← أساسيان؛ أضف اختصارات بجانبها لا بدلاً منها.
4. **الصوت**: دائماً عبر `AudioManager` (يعطي الاحتياطي Web Speech تلقائياً)؛ لا `new Audio` مباشر خارج `AudioManager`.
5. **الحالة**: كل حالة مرحلة في `STATE` بمفتاح `p<n>...` — لا متغيرات عامة متناثرة (الاستثناءات الموثقة: `p2TeacherHint`, `p5ReviewWordId`, `p5PinnedWordId`).
6. **البيانات المجمّدة**: `Object.freeze(LESSON_01)` — لا تُحاول تعديله وقت التشغيل.
7. **معرّفات DOM**: أي معرّف HTML جديد يُستدعى من app.js يجب أن يظهر في HTML (عقد موثق أعلاه).
8. **الانتقالات**: `goToPhase` يضيف class `phase-enter` لـ `#content-zone` (350ms) — لا تزده.
9. **التلميحات**: أي خطوة جديدة تعرض `updateHint(...)` لكلا الموقعين (teacher-hint + hint-zone).
