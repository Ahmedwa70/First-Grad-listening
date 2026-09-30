# COMPONENT_REGISTRY.md — سجل المكونات الرسمي

> المرجع الرسمي للمكونات الموجودة في مشروع `Lesson-01-classroom-P6-Fixed`.
> **قاعدة إلزامية: قبل إنشاء أي مكون جديد، اقرأ هذا السجل أولاً.**
> إن كان المكوّن المقصود موجوداً أو يحقق نفس الغرض، لا تُنشئه من جديد.
> مصدر البيانات: `ARCHITECTURE_RULES.md` + قراءة الكود الفعلي (`app.js` / `lesson-01.js` / `style.css` / `lecture-01.html`).

---

## Component Registry

## Purpose

هذا الملف هو السجل الرسمي لمكونات المشروع. الغرض منه منع:

- **إنشاء مكونات مكررة** — أي مكوّن جديد يُقارن بما هو مسجل قبل اعتماده.
- **تغيير فلسفة التصميم** — السجل يوثّق القواعد المعتمدة لكل مكوّن فيجب الحفاظ عليها.
- **إعادة بناء عناصر موجودة** — إذا وُجد مكوّن يخدم الغرض، يُستخدم لا يُعاد بناؤه.
- **اتخاذ قرارات UI بدون معرفة النظام الحالي** — أي قرار واجهة يُبنى على معرفة ما هو موجود أصلاً.

---

## 1. Teacher HUD

Status:
Active

Location:
`Lesson-01-classroom-P6-Fixed\lecture-01.html` (أعلى الصفحة) + `css\style.css` (أقسام `.teacher-hud`, `.hud-phase`, `.hud-controls`) + `js\app.js` (`updatePhaseBar`, `updateHint`, `PhaseTimer`)

Purpose:
واجهة تحكم المعلم العلوية: تُظهر المرحلة الحالية (badge + العنوان)، المدة، الهدف، مؤقت المرحلة، أزرار التنقل، شريط التلميحات (teacher-hint)، وشريط التقدم.

Used By:
النظام كله — كل المراحل P1–P7 (إرشاد المعلم ووقته وتنقله).

Design Rules:
- موجود في أعلى الصفحة ويبقى ثابتاً (المعلم هو Controller وهو من يشغّل كل شيء).
- `#teacher-hint` و`#hint-zone` يتحدثان معاً عبر `updateHint(text)`.
- ألوان وأحجام من `:root`؛ وضوح من بعيد (projector-first).
- أزرار المراحل تُبنى ديناميكياً من `phases` في `DOMContentLoaded`.

Do Not:
- لا تجعل الواجهة تعتمد على تفاعل الطالب المباشر.
- لا تُخفِ شريط تلميحات المعلم.
- لا تُضف عناصر HUD جديدة دون تسجيلها هنا وفي `ARCHITECTURE_RULES.md` (عقد DOM).

Dependencies:
- `LESSON_01.phases` (بيانات المراحل)
- `PhaseTimer`
- `AudioManager` (عبر `_updateAudioUI` لمؤشر الصوت)

---

## 2. Phase Navigation System

Status:
Active

Location:
`js\app.js` — `advance()` (سطر 225)، `retreat()` (241)، `goToPhase()` (1619)، ربط لوحة المفاتيح (1686)، أزرار `#phase-nav` في HTML.

Purpose:
نظام التنقل بين المراحل P1–P7. يوجّه ضغطة التقدم/التراجع إلى دوال المرحلة الصحيحة، وينقل المعلم بين المراحل يدوياً (أزرار أو مفاتيح 1-7).

Used By:
النظام كله — المعلم ينتقل بين P1..P7.

Design Rules:
- المعلم المتحكم الوحيد: Space/→ = تقدم، ←/Backspace = تراجع، 1-7 = قفز للمرحلة، A = انتباه، F = شاشة كاملة.
- كل مرحلة تُسجَّل في switch الخاصة بـ `advance` و`retreat` و`goToPhase`.
- `goToPhase` يوقف الصوت (`AudioManager.stop()`) ثم يهيئ المرحلة.
- انتقال `phase-enter` لـ `#content-zone` (350ms).

Do Not:
- لا تكسر اختصارات لوحة المفاتيح الموجودة.
- لا تُضف انتقالاً بين المراحل دون تسجيل في الجمل الثلاث (`advance`/`retreat`/`goToPhase`).
- لا تُغيَّر آلية التنقل بدون سبب واضح — هو أساس "المعلم Controller".

Dependencies:
- دوال المراحل (`initP1..P7`, `advanceP1..P7`)
- `AudioManager` (إيقاف الصوت عند التنقل)
- `updatePhaseBar` / `updateProgressRail`

---

## 3. Progressive Reveal System

Status:
Active

Location:
`js\app.js` — نمط الكشف في كل مرحلة (`advanceP3`/`p3RevealStep`, `advanceP5`/`p5RevealStep`, `advanceP6`/`p6AnswerVisible`, `advanceP7`) + `css\style.css` (transition/reveal classes) + بيانات `revealSteps` في `lesson-01.js` (P3, P5).

Purpose:
الكشف التدريجي — كل ضغطة من المعلم تكشف عنصراً واحداً فقط (لا يُعرض المحتوى كاملاً دفعة واحدة).

Used By:
P3 (الحرف → النقاط → الصوت → القاعدة)، P5 (الكلمة → تمييز → صوت → معنى)، P6 (السؤال ثم كشف الإجابة)، P7.

Design Rules:
- خطوة واحدة لكل ضغطة Space؛ التراجع يقلّص خطوة (`retreat` يدير state لكل مرحلة).
- بيانات الكشف (`revealSteps`) تأتي من `lesson-01.js` ولا تُكتب في الكود.
- الحالة في `STATE` بمفاتيح `p<n>RevealStep`/`p<n>AnswerVisible`.

Do Not:
- لا تكشف كل المحتوى مرة واحدة — هذا كسر للفلسفة التربوية (راجع `DESIGN_PHILOSOPHY.md`).
- لا تعرض خطوة خارج ترتيب `revealSteps`.
- لا تخزّن حالة الكشف خارج `STATE`.

Dependencies:
- `LESSON_01.phases` (`revealSteps`, `roundOrder`)
- `STATE`

---

## 4. AudioManager

Status:
Active

Location:
`js\app.js` — كائن `AudioManager` (سطر 41–113) + `_updateAudioUI` (115).

Purpose:
المسؤول الوحيد عن الصوت في المشروع: تشغيل MP3 محلي مع احتياطي Web Speech API (ar-SA) عند فشل الملف.

Used By:
كل المراحل P1–P7 (أصوات الحروف، الكلمات، الجولات السمعية).

Design Rules:
- كل تشغيل صوت عبر `AudioManager.play` / `playLetter` / `playWord` / `speak`.
- MP3 من `assets/audio/` (بمسار من `lesson-01.js`)، وإن رُفض Promise → `speak(fallbackText)`.
- يبحث عن صوت عربي ar-SA ويستخدمه للـ speech.
- مؤشر `.audio-indicator` يتحدث عبر `_updateAudioUI`.
- `goToPhase` و`toggleAttentionMode` و`stop()` يوقفان الصوت.

Do Not:
- لا تُنشئ `new Audio(...)` مباشرة خارج `AudioManager`.
- لا تُعدَّل استراتيجية الصوت (MP3 + Web Speech fallback).
- لا تُمس الاستدعاءات الداخلية من المراحل.

Dependencies:
- `LESSON_01` (`audioFile`, `audioText`, `phoneme`)
- `STATE` (`audioPlaying`)
- Web Speech API (المتصفح)

---

## 5. Lesson Data Layer

Status:
Active

Location:
`js\lesson-01.js` — كائن `LESSON_01` كاملاً (444 سطراً)، مجمّد بـ `Object.freeze(LESSON_01)`.

Purpose:
طبقة البيانات المنفصلة تماماً عن العرض: الحروف، أدلة الكتابة، الكلمات، جولات P6، جولات P7، الأبجدية، المراحل. أي تعديل محتوى يتم هنا فقط.

Used By:
كل مكونات المشروع (قراءة فقط) — HUD، المراحل، AudioManager، السجل.

Design Rules:
- البيانات منفصلة عن العرض (تعليق رأس الملف: "بيانات المحاضرة الأولى — منفصلة تماماً عن طريقة العرض").
- كل عنصر يعرّف `color` و`audioFile` خاصاً به ويُستخدم عبر المراحل.
- مجمّد وقت التشغيل — قراءة فقط.

Do Not:
- لا تُعدَّل البيانات أثناء تحسين التصميم أو أي مهمة UI.
- لا تُضف منطق عرض داخل `lesson-01.js`.
- لا تُحاول تعديله وقت التشغيل (Object.freeze).

Dependencies:
- (لا يعتمد على مكونات أخرى — مصدر القراءة للجميع)

---

## 6. P5 Hybrid Review System

Status:
Active

Location:
`js\app.js` — `p5Review` (1209)، `showP5Review` (1223)، `p5PinReview` (1253)، `p5CloseReview` (1261)، `p5PlayWord` (1269)، `p5ChoralWord` (1273) + HTML/CSS (`#p5-review`, `.p5-review-*`, `.p5-mini`) + بيانات `LESSON_01.words`.

Purpose:
مراجعة المعلم للكلمات السابقة أثناء P5: لوحة مراجعة تعرض الكلمة وحروفها المستهدفة وصوتها، مع إمكانية **تثبيت المراجعة (Pin)** على الشاشة أثناء المتابعة.

Used By:
P5 (الحروف في الكلمات) — المعلم.

Design Rules:
- المراجعة تُفتح/تُغلق بالتزامن مع الحالة `p5ReviewWordId` و`p5PinnedWordId`.
- Pin يُبقي اللوحة ظاهرة أثناء مواصلة الدرس (class `pinned`).
- `p5CloseReview` يُغلق اللوحة فقط ولا يمس حالة Pin.
- الألوان من بيانات الكلمة/الحرف في `lesson-01.js`.

Do Not:
- لا تُحذف التثبيت (Pin) — خاصية أساسية لمراجعة المعلم.
- لا تجعل المراجعة توقف التنقل الرئيسي.
- لا تخزّن حالة المراجعة في `STATE` (متغيرات عامة موثقة: `p5ReviewWordId`, `p5PinnedWordId` — انظر `ARCHITECTURE_RULES.md`).

Dependencies:
- `LESSON_01.words` / `LESSON_01.letters`
- `AudioManager.playWord`
- `updateHint`

---

## 7. P6 Auditory Training System

Status:
Active

Location:
`js\app.js` — `initP6` (1297)، `advanceP6` (1308)، `getCurrentP6Round` (1334)، `renderP6` (1340)، `p6GoRound` (1436) + بيانات `LESSON_01.discriminationRounds` (D1 identify / D2 sameordiff / D3 close) + CSS (أقسام `.p6-*`).

Purpose:
تدريب التمييز السمعي: الاستماع أولاً ثم الإجابة. جولات: عدّ الأصابع (D1)، نفس أم مختلف (D2)، الأصوات المتقاربة (D3).

Used By:
P6 (التمييز السمعي، 80–100 دقيقة) — المعلم يقود النشاط.

Design Rules:
- **الاستماع قبل الإجابة**: زر الصوت أولاً ثم Space لكشف الإجابة (`p6AnswerVisible`).
- نمط "لوحة تدريب صفية" (Classroom Readiness Fix — تحسينات Phase 1/1.1/1.2/1.3).
- كل جولة تعرض: تلميح، عدّاد (الرقم/الإجمالي)، منطقة السؤال، منطقة الإجابة، زر كشف.
- العدّاد شارة صغيرة ذهبية؛ لوحة بحدود 1080px تمنع Scroll.
- أصوات الحروف عبر `p3PlaySound` (الذي يستخدم `AudioManager.playLetter`).

Do Not:
- لا تُظهر الإجابة قبل الاستماع (كسر الفلسفة السمعية).
- لا تُغيَّر نوعية الجولات (D1/D2/D3) دون تحديث البيانات والسجل.
- لا تُضف تمريراً للصفحة — المحتوى كامل ضمن `#content-zone`.

Dependencies:
- `LESSON_01.discriminationRounds` + `LESSON_01.phases` (`roundOrder`)
- `AudioManager` / `p3PlaySound`
- `STATE` (`p6RoundIndex`, `p6PairIndex`, `p6AnswerVisible`)

---

## 8. Activity Engine

Status:

**Foundation Active — Migration in Progress**

Location:

- `js\engine\activity-engine.js` — framework-agnostic core: registry, instance lifecycle, snapshots, command guards, reset, undo, subscriptions, and event log.
- `js\engine\activity-definitions.js` — reusable v1 definitions for auditory identify, same/different, close-sound comparison, rapid retrieval, silent dictation, and sentence production.
- `js\engine\activity-engine.smoke.test.js` — deterministic Node smoke tests.
- `md\Architecture\Activity Engine\` — architecture, contract, and migration roadmap.

Purpose:
محرك موحد لتشغيل الأنشطة عبر المراحل بدل تنفيذ كل نشاط داخل دوال مرحلة مستقلة. يعمل حالياً كطبقة foundation غير متداخلة مع legacy renderers؛ لم يُستبدل P6 بعد.

Used By:

- Registry and browser runtime are loaded by `lecture-01.html`.
- The current P1–P7 renderers remain the source of visible behavior until read-only bridge and activity migration gates pass.
- Target consumers: P2–P7, future lesson templates, teacher dashboard, and analytics layer.

Design Rules:

- Activity definitions are independent from lesson IDs and phase-specific DOM.
- Each definition declares pedagogical goal, required content, states, teacher commands, response mode, success/completion criteria, and educational events.
- Core contains no DOM, CSS, `window.document`, or lesson-specific content.
- State changes occur through `dispatch`; renderer consumes immutable snapshots.
- Reset and snapshot-based undo are available where the activity contract allows them.
- Teacher remains the Controller; no unsolicited educational transitions.
- Offline-first and local audio contracts remain mandatory.

Migration Status:

- **Phase 1 — Foundation:** complete and smoke-tested.
- **Phase 2 — Read-only bridge:** planned.
- **Phase 3+ — Activity renderer migration:** planned and gated by regression validation.

Do Not:

- Do not replace all phase renderers in one rewrite.
- Do not introduce Vue/TypeScript before the activity contracts and transition tests stabilize.
- Do not bind a reusable definition to `P6`, `lesson-01`, or a specific DOM selector.
- Do not remove legacy renderers until the feature-flagged replacement passes classroom and projector validation.

Dependencies:

- None for the core engine.
- Optional content adapters may depend on `LESSON_01`.
- Future renderers may depend on the engine snapshot contract, not on internal state.


---

## سجل فحص المكونات قبل إنشاء أي جديد

- [ ] هل المكوّن مسجل هنا؟
- [ ] هل يوجد مكوّن موجود يحقق نفس الغرض؟
- [ ] هل أي مكوّن موجود يمكن توسيعه بدل الإنشاء الجديد؟
- [ ] إن استلزم الإنشاء: يخضع لـ `PHASE_PROTOCOL.md` + تحديث هذا السجل.
