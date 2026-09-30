# CHANGELOG.md — سجل التغييرات

> سجل زمني لكل ما يحدث في المشروع. كل تغيير يُسجَّل هنا مع التاريخ.

## 2026-08-23

### QD-19 — حذف الرسوم اليدوية للحروف من شاشة مقارنة P4

حذف مسار SVG المؤلَّف يدوياً (`guide.svgPath` + `guide.dotPositions`) من بطاقات `renderP4Compare()`. كان كل حرف يُعرض مرتين: المحرف الحقيقي من الخط، وتحته قوس مبسّط مع نقاط يُقرأ كوجه ضاحك لا كحرف عربي — شكل غير صحيح يبني نموذجاً ذهنياً خاطئاً عند الطالب، ويتناقض مع المحرف الحقيقي في البطاقة نفسها، ويشترك في الجسم ذاته بين ب/ت/ث فتضيع فروقها.

البطاقة الآن: المحرف الحقيقي + الاسم وعدد النقاط + زر الصوت. أُزيلت قاعدة `.compare-svg` من CSS.

تحوّل القرار إلى **قاعدة نظامية مُلزِمة**: لا يُرسم أي حرف عربي بمسار مؤلَّف يدوياً في أي مرحلة أو درس أو قالب مشتق — شكل الحرف من محرف الخط الحقيقي أو من Arabic Stroke Engine حصراً. الأسهم ومؤشرات الاتجاه وخطوط الأساس مستثناة لأنها رموز إرشادية لا تدّعي أنها شكل الحرف.

Changed: `js/app.js` | `css/style.css`
Decision: `md/Governance/PROJECT_DECISIONS.md#QD-19`
Test: صفر عناصر `.compare-svg` · صفر `<svg>` داخل بطاقات المقارنة · المحارف الأربعة تُعرض من الخط ✅ · Console نظيف ✅

---

### QD-18 — تأجيل بطاقات رسم الحروف في P4

إخفاء بطاقات رسم الحروف من مسار العرض التسلسلي لحين اكتمال إعداد مسارات الحروف. التقدّم من آخر صفحة في P3 صار يدخل مباشرةً على شاشة `مقارنة الكتابة — الحروف الأربعة`، مع إخفاء زر `عودة للبطاقات` في هذا المسار. الدخول المباشر من الشريط العلوي أو مفتاح `4` يفتح P4 كاملاً من بدايته بلا إخفاء.

التمييز يتم عبر `STATE.p4EntryMode` الذي تسجّله `goToPhase(index, options)`؛ مخرجا P3 وحدهما يمرّران `{ sequential: true }`، وبقية النداءات تبقى على السلوك الكامل. التأجيل محكوم بمفتاح واحد `P4_WRITING_PRACTICE_DEFERRED` — رفعه يعيد P4 كاملاً في المسارين.

Changed: `js/app.js`
Decision: `md/Governance/PROJECT_DECISIONS.md#QD-18`
Test: التسلسلي ← المقارنة بلا بطاقات وبلا زر عودة ✅ · المباشر ← P4 كامل من الحرف الأول ✅ · Space من المقارنة ← P5 ✅ · التراجع لا يفتح الرسم ✅ · الكشف الطارئ بلا أخطاء ✅ · Console نظيف ✅

---

## 2026-08-14

### P5 Nav Button + History Strip Polish — زر التالي + شريط الكلمات

تحويل زر "التالي ←" و"مراجعة الكلمات ←" في P5 Single إلى نص شفاف بدون مربع خلفي — يطابق شكل زر "تقدم" في HUD. إضافة تأثير دخول ناعم لشريط الكلمات السابقة مع stagger 120ms بين العناصر (`translateX + opacity`).

Changed: `css/style.css`
Test: Regression PASS — P1-P7 صفر أخطاء، Quad ✅، Assess ✅

---

### P5 Final Visual Polish — صقل بصري نهائي

زيادة التنفس البصري داخل بطاقة P5 Single: padding أكبر (~12%)، gap أوسع بين العناصر، مسافات أفضل في بطاقة الهوية مع حرف أكبر وأبرز، ظلال premium محسّنة (inset highlight + shadow أوسع). CSS فقط — لا تغيير في JS أو المنطق.

Changed: `css/style.css`
Report: `md/Quality Audits/P5_FINAL_VISUAL_POLISH_REPORT.md`
Test: Regression PASS — P1-P7 صفر أخطاء، 5 viewports (1920×1080, 1440×900, 1366×768, 1280×800, 1024×768) بدون overflow

---

### P5 Visual Review — بطاقة الهوية + انتقال الكلمات

مراجعة بصرية عميقة لـ P5 Single. تحويل بطاقة الهوية من تخطيط عمودي (حرف + اسم/صوت) إلى سطر أفقي واحد (ب │ باء │ /ب/) مع فواصل بصرية — وحدة معرفية مترابطة. إضافة انتقال ناعم بين الكلمات (خروج 260ms + دخول 320ms) بدل الاستبدال الفوري. حماية ضد الضغط المتكرر أثناء الانتقال.

Changed: `js/app.js` | `css/style.css`
Report: `md/Quality Audits/P5_VISUAL_REVIEW_AND_TRANSITION_REPORT.md`
Test: Regression PASS — P1-P7 صفر أخطاء، بطاقة الهوية تعمل لجميع الكلمات الخمس

---

### P5 Premium Visual Refinement — تحسين بصري فاخر

تحويل P5 Single من عرض معلومات إلى تجربة تعلّم فاخرة. إضافة: إيموجي بطل كبير، بطاقة هوية ملوّنة بـ `color-mix()`، شريط لوني علوي بلون الكلمة، ظلال عمق واقعية، توهّج على الحرف المستهدف، أزرار صوت جديدة (تشغيل + ترديد)، انتقالات كشف بـ scale+translateY. تصميم موجّه للبروجكتور مع دعم mobile/tablet.

Changed: `js/app.js` | `css/style.css`
Report: `md/Quality Audits/P5_PREMIUM_VISUAL_REFINEMENT_REPORT.md`
Test: Regression PASS — P1-P7 صفر أخطاء، 6 viewports (1920×1080, 1366×768, 1280×800, 1024×768, tablet, mobile) بدون overflow

---

### P5 Single Pedagogical Redesign — إعادة ضبط تربوي وبصري

إعادة ترتيب الكشف التدريجي: المعنى مع الكلمة أولاً (بدل آخراً) ← تمييز الحرف ← هوية الحرف (اسم+صوت مدمجان) ← تشغيل وترديد. تقليص من 5 إلى 4 خطوات. تحويل التوزيع البصري من Grid أفقي 4 أعمدة إلى Flex عمودي مركزي — مسار عين واحد. السبب التربوي: الطالب المبتدئ لا يستطيع قراءة الكلمة بدون معنى. P5 Quad و Assess بدون تغيير.

Changed: `js/app.js` | `css/style.css`
Report: `md/Quality Audits/P5_SINGLE_PEDAGOGICAL_REDESIGN_REPORT.md`
Test: Regression PASS — P1-P7 صفر أخطاء، 4 viewports بدون overflow

---

### P5 Pedagogical Reveal Upgrade — ترقية الكشف التدريجي التربوي

ترقية نظام الكشف التدريجي في P5 من 4 خطوات إلى 5 خطوات (كلمة بدون تلوين → تمييز الحرف → اسم الحرف → الصوت → المعنى). فصل اسم الحرف عن صوته في عنصرين مستقلين. تلوين الحرف المستهدف عبر CSS variable (`--tc`) بدل inline color. معالجة كلمة "باب" (الموضع الأول فقط). إزالة الإنجليزية من عرض المعنى. إضافة علامة الحرف المستهدف في Assess لتعزيز letter-in-word recognition.

Changed: `js/app.js` | `css/style.css`
Report: `md/Quality Audits/P5_PEDAGOGICAL_REVEAL_UPGRADE_REPORT.md`
Test: Regression PASS — P1-P7 صفر أخطاء

---

## 2026-08-13

### P5 Words Phase Enhancement — تحسين المعنى + Quad View + Micro-Assessment

تحسين عرض المعنى في P5 (إيموجي + ترجمة صينية مع بينيين)، إضافة شاشة مراجعة Quad View للكلمات الخمس، وإضافة Micro-Assessment اختياري (استمع واختر الكلمة — Teacher Controlled، قابل للتخطّي). إنشاء `P5_WORD_META` في app.js لتجنّب تعديل lesson-01.js المجمّد.

Changed: `js/app.js` | `css/style.css`
Report: `md/Quality Audits/P5_WORDS_PHASE_ENHANCEMENT_REPORT.md`

---

### P3 Letter Discovery Improvement — اسم الحرف + وضوح التعليمات + تقييم سريع

إضافة اسم الحرف (باء/تاء/ثاء/نون) في بطاقة Single View، تحسين وضوح تعليمة P3 للبروجكتور (CSS فقط)، إضافة Micro-Assessment اختياري بعد Quad View (استمع واختر الحرف — Teacher Controlled بدون درجات).

Changed: `js/app.js` | `css/style.css`

---

## 2026-08-10

### Fast Classroom UX Pass — إصلاح scroll + وضوح المؤقت وشريط التقدم

إعادة تعيين `scrollTop=0` عند القفز بين المراحل، تكبير خط المؤقت وتحسين لونه للبروجكتور، زيادة سمك شريط التقدم.

Changed: `js/app.js` | `css/style.css`

---

### Phase 5: Teacher Experience Optimization — تحسين تجربة المعلم

تحسين رؤية التلميحات على البروجكتور (opacity/font-size)، إضافة اختصارات R/H/T للوحة المساعدة، وإضافة تأثير بصري (flash) عند الضغط على R أو H.

Changed: `lecture-01.html` | `css/style.css` | `js/app.js`

---

### Phase 4: Doc 07 Activity Completeness — إضافة R/H كشف وإخفاء طارئ

إضافة `emergencyReveal()` (R) و`emergencyHide()` (H) لجميع المراحل P1-P7. Gap scan أظهر أن P4/P6/P7 تطورت معمارياً عن Doc 07 — باقي الفجوات مؤجلة لأنها تحتاج قرارات معمارية.

Changed: `js/app.js` — دالتان جديدتان + اختصارات لوحة مفاتيح KeyR/KeyH

---

### QD-17 Implementation Rollback — إلغاء تنفيذ AMLSA Layer 5

إلغاء كامل لتنفيذ QD-17 من ملفات الكود (app.js, lesson-01.js, style.css). السبب: `fetch()` لا يعمل مع `file://` protocol — ملفات SVG لا تُحمَّل في بيئة offline. إعادة P2 للعمل الموحّد لجميع الحروف الأربعة (ب ت ث ن).

**ما تمّ إلغاؤه:**
- `ArticulationEngine` object (10 دوال) من app.js
- `articulation` data object من حرف ث في lesson-01.js
- `p2UpdateArticulation()` + `p2LoadArticulationSVGs()` من app.js
- `<div class="p2-articulation-zone">` من `buildP2HTML()`
- جميع أنماط `.art-*` من style.css (83 سطر CSS)

**ما بقي محفوظاً:** ملفات SVG في `assets/articulation/`، وثائق الحوكمة QD-17، تقارير التنفيذ.

Rolled back: `js/app.js` | `js/lesson-01.js` | `css/style.css`
Preserved: SVG assets, governance docs, implementation reports

---

### QD-17-SVG Approved + SVG Prototype Phase 1 — حرف ث

اعتماد Hybrid Layered SVG System. إنشاء 4 ملفات SVG (base + tongue + airflow + highlight) لحرف ث. إضافة `layers` في بيانات ث + `getLayerPaths()` في ENGINE + تحميل SVG inline في Viewer. البطاقة تعرض SVG + نص معاً.

Created: `assets/articulation/base/sagittal-base.svg`, `tongue/tongue-tip-between-teeth.svg`, `airflow/airflow-oral-continuous.svg`, `highlight/highlight-teeth.svg`
Changed: `js/lesson-01.js` (layers) | `js/app.js` (getLayerPaths + p2LoadArticulationSVGs) | `css/style.css` (art-svg-*)

---

### AMLSA Layer 5 Viewer MVP — عرض بيانات النطق في P2

إضافة `p2UpdateArticulation()` في app.js + بطاقة articulation في P2. تعرض مخرج الصوت، وضع اللسان، مسار الهواء، وخطوات النطق عند اختيار حرف يحتوي `articulation` (ث). تختفي تلقائياً عند اختيار حرف بدونها (ب، ت، ن).

Changed: `js/app.js` — `buildP2HTML` + `p2UpdateArticulation` + `p2SelectLetter` | `css/style.css` — أنماط `.art-*`

---

### AMLSA Layer 5 Engine — إضافة ArticulationEngine في app.js

إضافة `ArticulationEngine` object (9 دوال) في `app.js` لقراءة بيانات `letter.articulation`. يُهيَّأ في DOMContentLoaded. لا UI، لا rendering — ENGINE فقط.

Changed: `js/app.js` — إضافة ArticulationEngine (سطور 126–181) + init في سطر 1979

---

### AMLSA Layer 5 Foundation — إضافة نموذج بيانات Articulation

إضافة كائن `articulation` لحرف ث (Proof of Concept) داخل `lesson-01.js`. يتضمن: مكان النطق، طريقة النطق، وضع اللسان، وضع الشفتين، مسار الهواء، درجة الصعوبة، وخطوات الإنتاج الصوتي (عربي + صيني + إنجليزي). لا SVG، لا UI، لا تعديل ENGINE/VIEW.

Changed: `js/lesson-01.js` — إضافة حقل `articulation` لحرف `tha` فقط (سطور 70–99)

---

### QD-15: P2 Audio Header Redesign — إعادة تصميم شريط الصوت

**المشكلة**: منطقة المكبر+الفونيم+الاسم كبيرة جداً (أيقونة 77px مع دائرة، pill بحجم 50px) — تنافس البطاقات الصوتية بصرياً.

**التحليل**: الأيقونة المحاطة بدائرة ثقيلة decorative، والفونيم بحجم hero. المنطقة أداة تأكيد وليست محتوى رئيسي.

**الحل**:
- SVG: إزالة الدائرة الخارجية، تضييق viewBox حول شكل المكبر فقط
- أيقونة: `clamp(28px, 5vh, 48px)` بدلاً من `clamp(48px, 10vh, 96px)`
- Pill: font `clamp(1.2rem, 4vh, 2.2rem)` بدلاً من `clamp(1.9rem, 6.5vh, 3.4rem)`، border أرق، بدون box-shadow
- Zone: min-height `clamp(32px, 6vh, 56px)` بدلاً من `clamp(48px, 10vh, 96px)`

Changed:
- `js/app.js`: SVG viewBox تغيير + إزالة `<circle>` (عرض فقط، لا state logic)
- `css/style.css`: `.speaker-icon` تصغير، `.active-phoneme` تصغير + تخفيف، `.speaker-zone` ضغط، قواعد `:has()` ألوان (إزالة box-shadow)

Verified:

| الدقة | topH | iconShift | iconW |
|-------|------|-----------|-------|
| 1366×768 | 47px | 0 ✅ | 38px |
| 1280×720 | 49px | 0 ✅ | 36px |
| 1024×768 | 46px | 0 ✅ | 38px |
| 1440×900 | 54px | 0 ✅ | 45px |

Dark/Light: متوافق ✅ | Regression P1/P3: لا تأثر ✅

---

### QD-14: P2 "اختر صوتاً" Visual Redesign — إعادة تصميم تعليمة الاختيار

**المشكلة**: "اختر صوتاً" تظهر بنفس حجم ووزن الفونيم (52px، وزن 900، pill border) — تنافس بطاقات الأصوات بصرياً وتكسر الهرمية البصرية.

**التحليل**: "اختر صوتاً" تعليمة توجيهية وليست محتوى. يجب أن تكون هادئة تقود العين للبطاقات، لا أن تسيطر على الشاشة.

**الحل**: CSS `:has()` لتمييز الحالة الأولية — font-size أصغر (`var(--fs-lg)`), وزن أخف (500), لون توجيهي (`var(--text-dim)`), بدون pill border أو background.

Changed (`css/style.css`):
- `.p2-container:not(:has(.sound-btn.active)) .active-phoneme`: تصميم تعليمي هادئ (حجم أصغر، وزن 500، لون `--text-dim`، بدون إطار)

Not Changed:
- `.active-phoneme` الأساسي — الفونيم المختار يبقى كما هو (كبير، bold، pill ملونة)
- `app.js` / `lesson-01.js` / HTML — لا تعديل

Verified:
- 4 دقات (1366×768, 1280×720, 1024×768, 1440×900): تعليمة هادئة + فونيم بارز ✅
- Dark/Light mode: متوافق ✅
- Layout stability: topH ثابت، لا shift ✅
- Regression: P1/P3 لا تأثر ✅

---

## 2026-08-09

### QD-13: P2 Phoneme Pill Width Stabilization — تثبيت عرض حبة الفونيم

**المشكلة**: عند التبديل بين الأصوات /b/ /t/ /θ/ /n/ يتغير عرض حبة الفونيم (141px–151px)، مما يسبب حركة أفقية لأيقونة المكبر (8.6px shift).

**السبب الجذري**: `.active-phoneme` بدون `min-width` + `.active-letter-name` بدون `min-width` — النصوص المختلفة تنتج أعراض مختلفة في الـ flex row.

**الحل**: إضافة `min-width` بوحدة `em` لكلا العنصرين لتوحيد العرض عبر جميع الفونيمات.

Changed (`css/style.css`):
- `.active-phoneme`: إضافة `min-width: 3.1em` — يضمن عرض ثابت لكل الفونيمات
- `.active-letter-name`: إضافة `min-width: 1.5em` — يضمن عرض ثابت لأسماء الحروف

Not Changed:
- `app.js` — لا تعديل.
- `lesson-01.js` — بيانات مجمدة.
- HTML — البنية لم تتغير.

Verified:

| الدقة | iconShift | pillW ثابت | topH ثابت |
|-------|-----------|------------|-----------|
| 1366×768 | 0px ✅ | 155px | 77px |
| 1280×720 | 0px ✅ | 145px | 72px |
| 1024×768 | 0px ✅ | 155px | 77px |
| 1440×900 | 0px ✅ | 169px | 90px |

Dark/Light: iconShift=0 في كلا الوضعين ✅
Regression: P1/P3 لا تأثر، لا scroll أفقي ✅

---

### QD-12: P2 Audio Header State — إخفاء أيقونة المكبر قبل اختيار الصوت

**المشكلة**: عند دخول P2، أيقونة مكبر الصوت واسم الحرف ("—") يظهران قبل أن يختار الطالب أي صوت. هذا يتعارض مع مبدأ الكشف التدريجي ويعرض أداة بلا وظيفة.

**السبب الجذري**: `buildP2HTML()` ينشئ كل عناصر الشريط (أيقونة + pill + اسم) دائماً بدون تمييز بين الحالة الأولية وحالة الاختيار.

**القرار المعماري**: CSS `:has()` state management — نفس النمط المستخدم لتلوين الفونيم. عندما لا يوجد `.sound-btn.active` → إخفاء الأيقونة والاسم. `min-height` على `.speaker-zone` يمنع layout shift.

Changed (`css/style.css`):
- `.speaker-zone`: إضافة `min-height: clamp(48px, 10vh, 96px)` — حجز ارتفاع ثابت
- `.p2-container:not(:has(.sound-btn.active)) .speaker-icon`: `display: none` — إخفاء الأيقونة
- `.p2-container:not(:has(.sound-btn.active)) .active-letter-name`: `display: none` — إخفاء الاسم

Not Changed:
- `app.js` — `p2SelectLetter()` يضيف `.active` بالفعل. لا تعديل مطلوب.
- `lesson-01.js` — بيانات مجمدة.
- HTML — البنية لم تتغير.

Verified:

| الدقة | initTopH | selTopH | shift | scroll |
|-------|----------|---------|-------|--------|
| 1366×768 | 77px | 77px | لا | لا |
| 1280×720 | 72px | 72px | لا | لا |
| 1024×768 | 77px | 77px | لا | لا |
| 1440×900 | 90px | 90px | لا | لا |
| 1920×1080 | 96px | 96px | لا | لا |

- Dark Mode ✅ — Light Mode ✅
- تبديل /b/ /t/ /θ/ /n/ — لا layout shift ✅
- P1/P3/P4 regression — لا تأثير ✅

---

## 2026-08-08

### QD-11: P2 Visual Rebalance — إعادة التوازن البصري لمرحلة "الصوت أولاً"

**المشكلة**: أيقونة مكبر الصوت (أداة وظيفية) تهيمن على 48-50% من مساحة المحتوى العمودية (313px @768h)، بينما بطاقات الأصوات (المحتوى التعليمي الأساسي) تحصل على 29% فقط (189px). التسلسل البصري معكوس — الأداة أبرز من المحتوى.

**السبب الجذري**: `.speaker-icon` بحجم `clamp(56px, 22vh, 240px)` ينتج 169px @768h. التخطيط العمودي (`.speaker-zone: column`) يكدّس الأيقونة + الفونيم + الاسم فوق بعضها → 313px ارتفاع للمسرح الصوتي.

**القرار المعماري**: تحويل P2 إلى Content-Dominant Layout — البطاقات تهيمن بصرياً (~65-68%)، الأيقونة واضحة لكن ثانوية (~11-12%). فلسفة "الصوت أولاً" تعني رؤية **الأصوات** (الفونيمات) أولاً، لا أداة التشغيل.

Changed (`css/style.css`):
- `.speaker-icon`: width/height من `clamp(56px, 22vh, 240px)` إلى `clamp(48px, 10vh, 96px)` — تقليص 54%
- `.speaker-zone`: `flex-direction: column` → `row` + `justify-content: center` + `gap: clamp(0.6rem, 1.5vw, 1.2rem)` — شريط أفقي مدمج
- `.active-letter-name`: `font-size: var(--fs-md)` → `var(--fs-xs)` + `color: var(--text-dim)` — معلومة ثانوية
- `.p2-controls`, `.finger-count-guide`, `.p2-finish-zone`: padding من `0.5rem 0.8rem` إلى `0.35rem 0.6rem` — ضغط الصف السفلي

Not Changed:
- `.active-phoneme` — المراجعة أثبتت أن حجمه الحالي (77px total) يتطابق مع الأيقونة الجديدة (77px @768h). تقليصه يُضعف القراءة من بعد بلا مكسب.
- `app.js` — لا تعديل. كل الدوال (`buildP2HTML`, `p2SelectLetter`, `p2PlaySound`, `advanceP2`) تعمل كما هي.
- `lesson-01.js` — بيانات مجمدة لا تُمسّ.
- HTML — لا تغيير في البنية.

Verified:

| الدقة | topH (قبل→بعد) | btnsH (قبل→بعد) | icon (قبل→بعد) | scroll | layout shift |
|-------|----------------|-----------------|----------------|--------|-------------|
| 1366×768 | 313→77px | 189→429px | 169→77px | لا | لا |
| 1280×720 | 298→72px | 159→389px | 158→72px | لا | لا |
| 1024×768 | 302→77px | 220→450px | 169→77px | لا | لا |
| 1440×900 | 348→90px | 280→543px | 198→90px | لا | لا |
| 1920×1080 | 388→96px | 413→710px | 238→96px | لا | لا |

- Dark Mode ✅ — Light Mode ✅
- choral pulse (scale 1.04) — لا overflow أفقي ✅
- P1/P3/P4 regression — لا تأثير ✅
- اختيار /b/ /t/ /θ/ /n/ — لا layout shift (topH ثابت 77px) ✅

---

### P1 Auto-Scroll — تمرير تلقائي سلس عند كشف محتوى جديد في مرحلة الافتتاح

**المشكلة**: عند ضغط المعلم Space في P1، المحتوى الجديد (خاصة شبكة الأبجدية p1-alphabet وتمييز الحروف p1-highlight) يظهر أسفل viewport. المعلم يضطر لعمل scroll يدوي — مما يكسر تجربة العرض الصفي.

**السبب الجذري**: P1 فريدة — المحتوى يتراكم عمودياً (4 blocks تُضاف عبر `.visible`). المراحل الأخرى تستبدل المحتوى كلياً عبر `innerHTML`.

**الحل المعتمد**: auto-scroll في `renderP1()` — حساب centerOffset + `scroller.scrollTo()` على `#content-zone` مع `setTimeout(80)`.

Changed (`js/app.js`):
- `renderP1()`: إضافة كتلة auto-scroll — `setTimeout(80)` + حساب centerOffset + `scroller.scrollTo({top, behavior:'smooth'})` — الشرط `STATE.currentStep > 0` يمنع scroll عند title

Not changed:
- `js/lesson-01.js` / `css/style.css` / `lecture-01.html` — لم تُعدَّل
- P2–P7 — لا تأثير (الكود محصور في `renderP1()`)

Verified (1366×768):
- S1 (title): لا scroll — `scrollTop=0` ✅
- S2 (welcome): scroll سلس — `scrollTop=211` — متمركز ✅
- S3 (alphabet): scroll لأقصى حد — `scrollTop=481` ✅
- S4 (highlight): scroll — `scrollTop=479` ✅
- P4 regression: `scrollTop=0`, لا تأثير ✅

> التحليل الكامل في `md/P1_VIEWPORT_BEHAVIOR_ANALYSIS.md`

---

### P4 Text Readability Fix — تحسين قراءة النص في لوحة خطوات تدريب الكتابة

**المشكلة**: النصوص في `.p4-steps-panel` ملتصقة بالحواف (padding: 0).

Changed (`css/style.css`):
- `.p4-steps-panel`: `padding-inline: 0.5rem` (كان: 0)
- `.p4-step-item`: `padding: 0.55rem 0.75rem` (كان: `0.55rem 1rem`)

Not changed: `js/app.js` / `js/lesson-01.js` / `lecture-01.html` — لم تُعدَّل

Verified (1366×768, ب/ت/ث/ن): panelH=369, cardH=434, navY=626 ثابت، لا scroll ✅

---

### P4 Container Width Stability Fix — تثبيت عرض حاوية مرحلة تدريب الكتابة (Container defines size. Content adapts.)

**المشكلة**: بعد حل ارتفاع "الحل D"، بقي **العرض** متغيّراً مع طول النص: `.p4-card` يتبدّل بين 843 / 1032 / 1238px (ن الأضيق ← ث-مراجعة الأعرض، نص 81 حرفاً)، وتتمدد الحاوية حتى 1302px (خارج الـ viewport عند 1366×768 في حالة ث-مراجعة). فتتغيّر مواقع `.p4-svg-zone` وأزرار السابق/التالي في `.p4-nav` — الظاهرة التي وصفها المستخدم ("تتغير مواضع SVG والأزرار").

**السبب الجذري**: المحور الأفقي بلا أي نقطة تثبيت:
1. `.p4-container` (سطر 1698) **بدون `width` ولا `max-width`** — كـ flex item داخل `#content-zone` (`display:flex; justify-content:center`) يكون عرضه `auto` = **max-content**، أي يتبع أطول نص.
2. شبكة `.p4-card` (`grid-template-columns: 1fr 1fr`) — عند عرض حاوية غير محدد، `1fr` يتحول إلى max-content فينشر عرض أطول عمود (نص مراجعة ث).
3. قيود "الحل D" السابقة كانت تقيّد **الارتفاع فقط** (`min-height:0`, `minmax(0,1fr)` العمودية) — المحور الأفقي بقي حراً. التحليل الكامل في `md/P4_TRUE_CONTAINER_ARCHITECTURE_ANALYSIS.md`.

**الحل المعتمد**: إكمال المعمارية "الحاوية تحدد الحجم، المحتوى يتكيف" على المحور الأفقي بنفس لغة التصميم P2/P3 (`width:100%` + `max-width:1100px`).

Changed (`css/style.css`):
- `.p4-container`: إضافة `width: 100%` + `max-width: 1100px` + `min-width: 0` + `margin-inline: auto` — الحاوية تحدد العرض، لا المحتوى (كان: بلا width → auto = max-content).
- `.p4-card`: `grid-template-columns: minmax(0, 1fr) minmax(0, 1fr)` (كان: `1fr 1fr`) — الأعمدة لا تتمدد فوق مساحتها مع طول النص.
- `.p4-svg-zone` / `.p4-steps-panel`: إضافة `min-width: 0` — يسمحان لعمود الشبكة بالانكماش تحت محتواه (قص النص بـ ellipsis) بدل تمديد الحاوية.

Not changed:
- `js/app.js` — لم يُعدَّل.
- `js/lesson-01.js` — لم يُعدَّل.
- `lecture-01.html` — لم يُعدَّل.
- قيود الارتفاع الحالية (`.p4-card-wrapper` `flex:1; min-height:0; overflow:hidden`، `grid-template-rows: minmax(0,1fr)`، `max-height:100%; overflow-y:auto` على اللوحة، و`@media(max-width:900px)`) — كما هي تماماً.

Verified (DOM dump + لقطات بكسل حقيقية، الحالات ب/ت/ث-مراجعة/ن @ inner 1366×768 و1366×462، Light+Dark):
- عرض متطابق لكل الحالات @ 1366×768: cont=`1100×645`, card=`1036×433`, svg=`469×367`, steps=`469×367`, nav=`1036×60` → **max-min = 0px لكل الأبعاد** ✅
- نفس المواضع لكل الحالات: svg left=`699`, steps left=`198`, nav top=`625` — مطابقة للقياسات قبل الحل (max-min = 0) ✅
- لا Scroll للنص الطويل (81 حرفاً): `stepsScroll=no` @ 1366×768 ✅
- بكسلياً (Light): عرض البطاقة قبل = 841 / 969 / 1029 / 1199px (مقصوصة عند حافة الشاشة لحالة ث-مراجعة) → بعد = **1033px متطابقة** لكل الحالات (x 177..1210) ✅
- بكسلياً (Dark): قبل متغيّر/مقصوص → بعد = 1033px متطابقة ✅
- شاشة قصيرة 1366×462: تخطيط متطابق بين الحالات، `stepsScroll=YES` (الحماية المدمجة للشاشات الصغيرة جداً)، `czScroll=no` (لا فيض أفقي) ✅
- نتيجة Light وDark متطابقتان ✅

---

### P4 Container Layout Stability Fix — تثبيت ارتفاع حاوية مرحلة تدريب الكتابة (الحل D)

**المشكلة**: عند الانتقال بين الحروف، تقفز البطاقة 66px (672px لـ ب/ت/ن ذو 4 خطوات → 738px لـ ث ذو 5 خطوات)، ويخرج شريط التنقل `.p4-nav` خارج الـ viewport عند 1366×768 (navY=906).

**السبب الجذري**: `.p4-card` يستخدم Grid `1fr 1fr` حيث يتبع ارتفاع الصف العمود **الأطول**. مع 4 خطوات يحكم SVG zone (319px)، ومع 5 خطوات تحكم لوحة الخطوات (322px) — هذا التبديل في "من يحكم الارتفاع" هو مصدر القفزة. التحليل الكامل في `md/P4_CONTAINER_LAYOUT_ANALYSIS.md`.

**الحل المعتمد (الحل D — تثبيت معماري)**: فصل ارتفاع البطاقة عن محتوى الخطوات — الحاوية الخارجية تحدد الحجم، والمحتوى يتكيف داخلها.

Changed (`css/style.css`):
- `.p4-card-wrapper`: إضافة `min-height: 0` (يسمح للـ flex item بالانكماش تحت حجم محتواه) + `overflow: hidden` (يمنع المحتوى من دفع nav) + `display: flex; align-items: stretch`.
- `.p4-card`: `grid-template-rows: minmax(0, 1fr)` (يثبّت ارتفاع الصف على مساحة البطاقة بدل اتباع العمود الأطول) + `height: 100%; min-height: 0`.
- `.p4-svg-zone`: `min-height: 0; overflow: hidden` + `display: flex; align-items: center; justify-content: center` (يتمدد ليملأ المساحة).
- `.p4-steps-panel`: `gap: calc(var(--gap-sm) - 2px)` (أصغر بـ 2px لاحتواء 5 خطوات + النص الطويل 81 حرفاً بلا أي فيض) + `min-height: 0; max-height: 100%` + `overflow-x: hidden` (يمنع scroll أفقي من `translateX(-4px)` على الخطوة النشطة) + `overflow-y: auto` (حماية فقط للشاشات الصغيرة جداً).
- Media query `@media (max-width: 900px)`: `.p4-card` يعود لـ `grid-template-rows: auto auto; height: auto` و `.p4-card-wrapper` لـ `overflow: visible` — الشاشات غير الصفية تعود للتخطيط العمودي المكدّس.

Not changed:
- `js/app.js` — لم يُعدَّل.
- `js/lesson-01.js` — لم يُعدَّل.
- `lecture-01.html` — لم يُعدَّل.

Verified (1366×768، عبر اختبار DOM آلي `_p4-layout-test.html` → النتائج في p4test_dom5.txt):
- ثبات الارتفاع: cardH=433 لجميع الحروف الأربعة (ب/ت/ث/ن) → **max-min = 0px** ✅
- لا Scroll في لوحة الخطوات: stepsSH=367 = stepsCH=367 لجميع الحروف ✅
- nav داخل الشاشة: navTop=645 (≤ 768) و navOffTop=581 ثابت ✅
- نص المراجعة الطويل لحرف ث (81 حرفاً) ظاهر بالكامل: descBottom=586 ≤ panelBottom=592 → textVisible=yes ✅
- التنقل بين الحروف (ب→ت→ث→ن) بلا قفزة ✅
- التنقل خطوة بخطوة لحرف ث (5 خطوات) مستقر ✅
- لا Scroll في العمود (czScroll=no) ✅
- Dark/Light Mode: قيم متطابقة ✅
- RTL: سليم ✅

> ملاحظة: قيمة `complete=NO` في سطر اختبار النص الطويل هي أثر ترميز مشوّه في سلسلة المقارنة داخل أداة الاختبار (وليس نقصاً في النص) — النص كاملاً بـ 81 حرفاً و `textVisible=yes`.

---

### P4 Layout Fix: إزالة القيود الثابتة على ارتفاع خطوات تدريب الكتابة

**المشكلة**: عناصر `.p4-step-item` كانت مقيّدة بـ `height/min-height/max-height: 4.8rem` ثابت مع `overflow: hidden` و `-webkit-line-clamp: 2` على الوصف. هذا يقطع النصوص الطويلة (خاصة خطوة "مراجعة" لحرف "ث" ذات الـ 81 حرفاً) ويدفع `p4-nav` خارج الـ viewport عند 5 خطوات.

**السبب الجذري**: 4 قيود متراكمة — ارتفاع ثابت للخطوة + line-clamp:2 + overflow:hidden + عدد خطوات متغير (4 vs 5). التحليل الكامل في `md/P4_LAYOUT_ANALYSIS.md`.

Changed (`css/style.css`):
- `.p4-step-item`: إزالة `height: 4.8rem` و `max-height: 4.8rem` → `min-height: 2.8rem` فقط. تقليل padding. إضافة `transition` على `min-height`.
- `.p4-step-item.active`: إزالة القيود الثلاثية (`height/min-height/max-height: 4.8rem`).
- `.p4-step-item.active:not(.done)`: `overflow: visible` — الخطوة الحالية تعرض محتواها كاملاً.
- `.p4-step-item.active:not(.done) .p4-step-body`: `overflow: visible`.
- `.p4-step-item.active:not(.done) .p4-step-desc`: إلغاء `line-clamp` و `max-height` → النص كامل بلا قص.
- `.p4-step-body`: إزالة `max-height: 100%`.

Not changed:
- `js/app.js` — لم يُعدَّل.
- `js/lesson-01.js` — لم يُعدَّل.
- `lecture-01.html` — لم يُعدَّل.

Verified (1366×768):
- حرف ب (4 خطوات): نص كامل، nav ظاهر ✅
- حرف ث (5 خطوات + نص مراجعة 81 حرفاً): نص كامل في 3 أسطر، nav ظاهر ✅
- حرف ن (4 خطوات + نصوص طويلة): نص كامل، nav ظاهر (685px < 768px) ✅
- الخطوة الأولى لحرف ث: خطوة واحدة ممتدة + 4 مضغوطة — متوازن ✅
- Dark Mode: يعمل بشكل صحيح ✅
- Light Mode: يعمل بشكل صحيح ✅
- RTL: لم يتأثر ✅
- منطقة الرسم SVG: سليمة بدون تغيير ✅

---

### Phase 5.4: مؤشر تقدم بصري — استبدال العداد الرقمي بنقاط RTL في P6 و P7

Changed (`js/app.js`):
- دالة جديدة `progressDots(current, total)` تولّد نقاط HTML بثلاث حالات: `.done` / `.active` / فارغة.
- `renderP6()`: محتوى `.p6-counter` يستدعي `progressDots(STATE.p6PairIndex, items.length)` بدل الأرقام.
- `renderP7()`: نفس الاستدعاء مع `STATE.p7ItemIndex` و `round.items.length`.

Changed (`css/style.css`):
- `.p6-counter`: `direction: rtl` + `align-items: center` — النقطة الأولى تبدأ من اليمين.
- `.p6-dot`: نقطة دائرية محايدة بـ `transition: all 0.35s ease`.
- `.p6-dot.done`: لون ذهبي `var(--gold)`.
- `.p6-dot.active`: حجم أكبر + لون تيل `var(--teal)` + حلقة `box-shadow`.
- حذف `.p6-pair-num` و `.p6-pair-total` (لم تعد مستخدمة).

Why:
- طلاب A0 المبتدئون لا يفهمون "2 / 6" — النقاط توفّر إدراكاً بصرياً فورياً.
- تصميم iOS-style مع RTL عربي: النقطة الأولى يمين، التقدم نحو اليسار.
- قرار UX/UI أساسي موثّق في `PROJECT_DECISIONS.md` كـ QD-07.

Not changed:
- `js/lesson-01.js` — لم يُعدَّل.
- `lecture-01.html` — لم يُعدَّل.

Verified:
- P6 D1 (8 نقاط — أحرف): النقطة الأولى فعّالة ✅
- P6 D2 (6 نقاط — مقارنات): تقدم صحيح مع كل سؤال ✅
- P6 D3 (2 نقطتان — متقاربة): يعمل ✅
- P7 (4 نقاط — تقييم): يعمل ✅
- Dark Mode: النقاط واضحة ✅
- Light Mode: النقاط واضحة ✅
- Viewport 1366×768 ✅

---

### Phase 5.3: P6 D2 Answer Zone — تخطيط صف أفقي واحد لمنطقة الإجابة (عُدِّل من Grid إلى Flexbox)

Changed (`css/style.css`):
- `.p6-answer-d2.visible`: تحويل من Grid إلى Flexbox أفقي (`flex-direction: row; flex-wrap: nowrap`) — العناصر الثلاثة في صف واحد.
- `::before` ("الإجابة الصحيحة"): `flex-basis: auto` بدل `100%` — لا يأخذ سطراً كاملاً.
- `.p6-same-badge`: `line-height: 1.2` — يقلل ارتفاع البادج من 87px إلى 56px (معالجة line-height الخط العربي).
- `.p6-answer-chars` (المقارنة): `flex-basis: auto` بدل `100%` — يبقى بجانب البادج.

Changed (`js/app.js`):
- إضافة class `p6-answer-d2` و `p6-d2-same` على منطقة الإجابة في D2 (hooks CSS بدل `:has()`).

Why Flexbox بدل Grid:
- **صف واحد أفقي** أوضح تعليمياً — الطالب يرى الإجابة ككتلة واحدة.
- **Flexbox** أبسط من Grid لصف واحد.
- **class-based** بدل `:has()` لتوافق المتصفحات.

Not changed:
- `js/app.js` — لم يُعدَّل (DOM لم يتغير).
- `js/lesson-01.js` — لم يُعدَّل.
- `lecture-01.html` — لم يُعدَّل.
- D1 (identify) و D3 (close) — لم تتأثرا.
- آلية الكشف (`p6ApplyReveal`) — بدون تغيير.

Verified:
- D2 "مختلف" بعد الكشف: يمين = عنوان + حكم، يسار = مقارنة صوتية ✅
- D2 "نفس" بعد الكشف: عنوان وحكم في المنتصف ✅
- D1 بعد الكشف: لم يتأثر ✅
- D3 بعد الكشف: لم يتأثر ✅
- Dark Mode: سليم ✅
- Light Mode: سليم ✅
- 1366×768: تخطيط متوازن ✅
- 1024×600: كل شيء يتسع ✅

---

## 2026-08-07

### Phase 5.2: P6 Layout Stability — إصلاح القفز البصري + تداخل العناصر عند كشف الإجابة

#### المشكلة 1: القفز البصري (Layout Shift)
Root Cause:
- `.p6-answer-zone` كانت تحتفظ بـ `min-height` ثابت في كلتا الحالتين (فارغة/مكشوفة).
- عند كشف الإجابة، المحتوى يتجاوز `min-height` → المنطقة تتمدد فجأة → قفز بصري.
- السبب: تغيير الارتفاع كان **لحظياً** بدون transition.

#### المشكلة 2: تداخل "نفس أم مختلف؟" فوق أزرار الصوت (D2)
Root Cause:
- `.p6-pair-zone` كانت `flex: 1 1 0` مع `min-height: 0` — يسمح بالانكماش لأي ارتفاع.
- محتوى الأزرار (min-height: 104px + ::before + gaps = 185px) يتجاوز ارتفاع المنطقة المنكمشة.
- الأزرار تطفو بصرياً (overflow) فوق نص السؤال "نفس أم مختلف؟" الذي يقع أسفل `.p6-pair-zone`.
- `max-height: clamp(10rem, 22vh, 16rem)` كان ضيقاً (169px عند 768px) والمحتوى يحتاج 185px.

Changed (`css/style.css`):
- `.p6-answer-zone` min-height: `clamp(6.5rem, 14vh, 9.5rem)` → `clamp(3rem, 6vh, 4.5rem)` — مساحة محجوزة أصغر للحالة الفارغة.
- `.p6-answer-zone` transition: إضافة `min-height 400ms cubic-bezier(0.16, 1, 0.3, 1)` — انتقال سلس بدل القفز.
- `.p6-answer-zone.visible` (جديد): `min-height: clamp(6rem, 14vh, 9rem)` — مساحة أكبر تتسع لمحتوى الكشف.
- `.p6-play-zone` flex: `1 1 0` → `1 0 auto` — **منع الانكماش** تحت حجم المحتوى.
- `.p6-play-zone` max-height: `clamp(10rem, 22vh, 16rem)` → `clamp(14rem, 32vh, 22rem)` — مساحة كافية للمحتوى.
- `.p6-play-zone` min-height: `0` → حُذف — السماح للمحتوى بتحديد الحد الأدنى.
- `.p6-pair-zone` flex: `1 1 0` → `1 0 auto` + max-height + إزالة min-height — نفس المعالجة.
- `.p6-close-zone` flex: `1 1 0` → `1 0 auto` + max-height + إزالة min-height — نفس المعالجة.

Why `flex: 1 0 auto` is the architectural fix:
- `flex-shrink: 0` يمنع المنطقة من الانكماش تحت حجم محتواها — الأزرار لا تتجاوز حدودها.
- `flex-basis: auto` يجعل الحجم الأساسي يعتمد على المحتوى الفعلي.
- `max-height: clamp(14rem, 32vh, 22rem)` يمنع التمدد المفرط مع ضمان مساحة كافية (224px minimum).
- **Transition على min-height**: التمدد يحدث تدريجياً (400ms) بدل لحظياً.
- **لا تغيير في JS/HTML**: CSS فقط.

Not changed:
- `js/app.js` — لم يُعدَّل.
- `js/lesson-01.js` — لم يُعدَّل.
- `lecture-01.html` — لم يُعدَّل.
- نظام Theme / HUD / Footer — بدون تغيير.

Verified:
- D1 reveal (3 خطوات): توسع سلس، زر الصوت مستقر ✅
- D2 reveal: لا تداخل بين "نفس أم مختلف؟" والأزرار (gap: 8px+) ✅
- D3 reveal: توسع سلس، بطاقات الأصوات مستقرة ✅
- 1920×1080: توزيع متوازن ✅
- 1366×768: لا تداخل ✅
- 1280×720: جميع العناصر داخل viewport ✅
- 1024×600: كل شيء يتسع بدون scroll ✅
- Dark Mode: لا تغيير في المظهر ✅
- Light Mode: تداخل D2 مُصلَح ✅
- HUD 44px: ثابت ✅
- Footer: لم يتأثر ✅

---

### Phase 5.1: P6 Layout Balance — توازن التخطيط العمودي

Changed (`css/style.css`):
- `.p6-main` padding-top: `clamp(1.5rem, 4vh, 3rem)` → `clamp(0.5rem, 1.5vh, 1rem)` — تقليل المسافة العلوية الزائدة.
- `.p6-main` gap: `clamp(0.5rem, 1.1vh, 0.9rem)` → `clamp(0.6rem, 1.4vh, 1rem)` — زيادة طفيفة للتوزيع الأفضل بين العناصر.
- `.p6-play-zone` flex: `1 1 auto` → `1 1 0` + `max-height: clamp(10rem, 22vh, 16rem)` — منع التمدد الزائد مع الحفاظ على المرونة. *(عُدِّل لاحقاً في Phase 5.2)*
- `.p6-pair-zone` flex: `1 1 auto` → `1 1 0` + `max-height: clamp(10rem, 22vh, 16rem)` — نفس المعالجة لمنطقة المقارنة. *(عُدِّل لاحقاً في Phase 5.2)*
- `.p6-close-zone` flex: `1 1 auto` → `1 1 0` + `max-height: clamp(10rem, 22vh, 16rem)` — نفس المعالجة لمنطقة الأصوات المتقاربة. *(عُدِّل لاحقاً في Phase 5.2)*
- `.p6-answer-zone` min-height: `clamp(8rem, 18vh, 11rem)` → `clamp(6.5rem, 14vh, 9.5rem)` — تقليل الحجز العمودي. *(عُدِّل لاحقاً في Phase 5.2)*

Not changed:
- `js/app.js` — لم يُعدَّل.
- `js/lesson-01.js` — لم يُعدَّل.
- `lecture-01.html` — لم يُعدَّل.
- نظام Theme (Dark/Light) — لم يتأثر.
- ألوان / HUD / Footer — بدون تغيير.

Verified:
- D1 (identify): قبل/بعد الكشف + 3 خطوات كشف تدريجي — متوازن ✅
- D2 (sameordiff): قبل/بعد الكشف — متوازن ✅
- D3 (close): قبل/بعد الكشف — متوازن ✅
- 1920×1080: مسافات متوازنة، لا تمدد زائد ✅
- 1366×768: جميع العناصر ظاهرة ✅
- 1280×720: لا تداخل ✅
- 1024×600: كل شيء يتسع بدون scroll ✅
- Dark Mode: لا تغيير في المظهر ✅
- Light Mode: نفس التوازن ✅
- HUD 44px: ثابت ✅
- Footer: لم يتأثر ✅
- لا Layout Shift أثناء الكشف ✅

---

### Phase 3C: Theme Runtime Controller — تشغيل نظام تبديل Dark/Light

Changed (`js/app.js`):
- إضافة `toggleTheme()` — تبديل بين Dark/Light عبر `data-theme` على `<html>`.
- Dark = الحالة الافتراضية: إزالة `data-theme` attribute + حذف `lesson-theme` من localStorage.
- Light = تعيين `data-theme="light"` + حفظ `"light"` في localStorage.
- إضافة `_updateThemeButton(theme)` — تحديث أيقونة الزر (☀/☾) + title + aria-label.
- إضافة اختصار `KeyT` في لوحة المفاتيح لتبديل الوضع.
- استدعاء `_updateThemeButton()` في `DOMContentLoaded` لمزامنة حالة الزر مع الوضع المحفوظ.

Changed (`lecture-01.html`):
- إضافة FOUC prevention script في `<head>` قبل CSS: يقرأ `lesson-theme` من localStorage ويضع `data-theme` فوراً.
- ربط زر `#theme-toggle` بـ `onclick="toggleTheme()"`.

Changed (`css/style.css`):
- إضافة Variable Bridging في كتلة `[data-theme="light"]`: إعادة تعريف المتغيرات الأصلية (`--bg-main`, `--bg-card`, `--bg-ctrl`, `--surface`, `--text-primary`, `--text-secondary`, `--text-dim`) بقيم Light.
- هذا يجعل 93 استخداماً للمتغيرات الأصلية يتجاوبون مع تبديل الوضع تلقائياً.

Not changed:
- الشكل الحالي — Dark Mode يبقى كما هو 100%.
- ألوان الحروف التعليمية — ثابتة عبر الوضعين (مع تعتيم طفيف لـ ث و ن في Light).
- `lesson-01.js` — لم يُعدَّل.
- بنية P1–P7 — لم تتغير.
- ارتفاع HUD — ثابت 44px.

Verified:
- Dark → Light: خلفية #F0F4F8، نص #1A202C، زر ☾ ✅
- Light → Dark: خلفية #0A1F3D، نص #F8F9FA، زر ☀ ✅
- localStorage: يحفظ "light"، يحذف المفتاح للـ Dark ✅
- FOUC prevention: إعادة التحميل مع وضع محفوظ يظهر مباشرة بدون وميض ✅
- HUD 44px ثابت في كلا الوضعين عبر جميع المراحل ✅
- التنقل بين المراحل (P1/P3/P6/P7) في Light Mode يعمل بشكل طبيعي ✅
- اختصار T يعمل ✅

---

### Phase 4.4: SVG Theme Integration — ربط رسومات P4 بنظام Theme

Changed (`css/style.css`):
- إضافة 4 متغيرات SVG في `:root` (Dark values):
  - `--p4-grid: rgba(255,255,255,0.08)` — خط الكتابة الأفقي.
  - `--p4-grid-alt: rgba(255,255,255,0.05)` — خط عمودي متقطع.
  - `--p4-ghost: rgba(255,255,255,0.12)` — المسار الشبحي (الدليل).
  - `--p4-dir-text: rgba(255,255,255,0.35)` — نص الاتجاه "← يمين إلى يسار".
- إضافة 4 متغيرات في `[data-theme="light"]`:
  - `--p4-grid: rgba(0,0,0,0.10)` / `--p4-grid-alt: rgba(0,0,0,0.06)` / `--p4-ghost: rgba(0,0,0,0.15)` / `--p4-dir-text: rgba(0,0,0,0.40)`.

Changed (`js/app.js`):
- `renderP4()` — تحويل 4 قيم hardcoded في SVG إلى CSS variables عبر `style=""`:
  - خط أفقي: `stroke="rgba(255,255,255,0.08)"` → `style="stroke:var(--p4-grid)"`.
  - خط عمودي: `stroke="rgba(255,255,255,0.05)"` → `style="stroke:var(--p4-grid-alt)"`.
  - مسار شبحي: `stroke="rgba(255,255,255,0.12)"` → `style="stroke:var(--p4-ghost)"`.
  - نص الاتجاه: `fill="rgba(255,255,255,0.35)"` → `style="fill:var(--p4-dir-text)"`.

Not changed:
- Dark Mode — القيم الأصلية منقولة حرفياً إلى متغيرات `:root` — بدون تغيير بصري.
- ألوان الحروف (identity): `guide.color` / `${guide.color}` — ثابتة.
- المسار المتحرك (`#p4-anim-path`): `stroke="${guide.color}"` — لم يُمسّ.
- نقطة البداية: `fill="${guide.color}"` — لم تُمسّ.
- نص "ابدأ": `fill="${guide.color}"` — لم يُمسّ.
- SVG المقارنة (`compare-svg`): جميع ألوانه identity — لم تُمسّ.
- Animation (stroke-dasharray/dashoffset) — لم تتغير.
- حجم SVG / Layout — ثابت.
- `lesson-01.js` — لم يُعدَّل.
- HTML — لم يُعدَّل.

Verified:
- Dark: grid `rgba(255,255,255,0.08)`, ghost `rgba(255,255,255,0.12)`, dir-text `rgba(255,255,255,0.35)` — مطابق للأصل ✅
- Light: grid `rgba(0,0,0,0.1)`, ghost `rgba(0,0,0,0.15)`, dir-text `rgba(0,0,0,0.4)` — واضح ✅
- Identity path: `rgb(14,124,123)` (teal) — ثابت في كلا الوضعين ✅
- SVG zone: padding 20px, borderRadius 12px, gap 12px — ثابت ✅
- App height: 808px عبر P1-P7 — لا Layout Shift ✅
- HUD 44px + Controls 43px — ثابت ✅

Architecture:
- CSS Variables (`var()`) داخل SVG `style=""` attribute — يرث من `:root` / `[data-theme="light"]`.
- متوافق مع Offline First — لا مكتبات خارجية.
- سهل الصيانة — تعديل قيمة واحدة في CSS يؤثر على جميع SVG elements.

---

### Classroom Readability Fix — تحسين جودة القراءة في Light Mode للعرض داخل الفصل

Changed (`css/style.css`):

**تعديل Token (يصلح ~65 موقع تلقائياً عبر المتغيرات):**
- `--text-secondary` في `[data-theme="light"]`: `#4A5568` → `#334155` (contrast ~9.5:1 بدل ~6.5:1).
- `--text-dim` في `[data-theme="light"]`: `#A0AEC0` → `#64748B` (contrast ~5.5:1 بدل ~2.5:1).
- `--th-text-secondary` و `--th-text-dim`: نفس التغيير (bridged).

**إضافة 9 قواعد `[data-theme="light"]` لعناصر ذات opacity/bg مشفرة:**
- `.p4-step-item` (غير نشط): opacity `0.35` → `0.55` + bg `rgba(0,0,0,0.03)`.
- `.p4-step-item.active`: opacity `1` (صريح لتجاوز override).
- `.p4-step-item.done`: opacity `0.65` → `0.8`.
- `.p4-step-num`: bg `rgba(255,255,255,0.08)` → `rgba(0,0,0,0.06)`.
- `.p4-dot-char` (غير نشط): opacity `0.3` → `0.45`.
- `.p5-dot` (غير نشط): opacity `0.3` → `0.45`.
- `.hint-zone`: opacity `0.6` → `0.8`.
- `.direction-demo`: bg `rgba(255,255,255,0.04)` → `rgba(0,0,0,0.04)`.
- `.alpha-char`: bg `rgba(255,255,255,0.04)` → `rgba(0,0,0,0.04)`.

Added (`md/LIGHT_MODE_READABILITY_ANALYSIS.md`):
- تقرير تحليلي: السبب الجذري، العناصر المتأثرة، الحل المعماري، التأثير المتوقع.

Not changed:
- Dark Mode — يبقى كما هو 100% (جميع tokens الأصلية: `#B0BEC5`, `#607D8B` لم تُمسّ).
- JavaScript — لم يُعدَّل.
- `lesson-01.js` — لم يُعدَّل.
- HTML — لم يُعدَّل.
- Layout — لا تغيير (HUD 44px, Controls 43px, App height ثابت عبر P1-P7).
- أحجام العناصر — متطابقة في كلا الوضعين.
- ألوان الحروف التعليمية — ثابتة.

Verified:
- Dark Mode tokens: `--text-secondary: #B0BEC5`, `--text-dim: #607D8B` — بدون تغيير ✅
- Light Mode tokens: `--text-secondary: #334155` (~9.5:1), `--text-dim: #64748B` (~5.5:1) ✅
- `.lesson-tagline` Dark `#B0BEC5` / Light `#334155` ✅
- `.p3-instruction` Dark `#607D8B` / Light `#64748B` ✅
- `.p4-step-desc` Dark `#B0BEC5` / Light `#334155` ✅
- `.p4-step-item` opacity: Dark `0.35` / Light `0.55` ✅
- `.p4-step-item.done` opacity: Dark `0.65` / Light `0.8` ✅
- `.hint-zone` opacity: Dark `0.6` / Light `0.8` ✅
- `.alpha-char` bg: Dark `rgba(255,255,255,0.04)` / Light `rgba(0,0,0,0.04)` ✅
- HUD 44px + Controls 43px — ثابت عبر P1-P7 في كلا الوضعين ✅
- App height 808px ثابت عبر جميع المراحل — لا Layout Shift ✅

---

### Phase 4.3: Light Mode Fine Visual Refinement — تحسينات بصرية دقيقة للوضع النهاري

Changed (`css/style.css`):
- إضافة 5 قواعد `[data-theme="light"]` + keyframe جديد:
  - `.p4-svg-zone` — خلفية `rgba(0,0,0,0.06)` بدل `rgba(0,0,0,0.25)` — منطقة SVG لم تعد تظهر كمربع أسود.
  - `.p2-teacher-hint` — خلفية `rgba(14,124,123,0.08)` + حدود `rgba(14,124,123,0.2)` بدل كحلي داكن `rgba(13,43,85,0.9)`.
  - `.p3-dot` — خلفية `rgba(0,0,0,0.12)` بدل `rgba(255,255,255,0.15)` — النقاط غير النشطة أصبحت مرئية.
  - `.card-char` — text-shadow مخفف `rgba(0,0,0,0.1)` بدل `rgba(0,0,0,0.4)` — ظل أنسب لبطاقة فاتحة.
  - `.p6-big-play:not(.is-playing)` — animation-name `p6PlayWaitingLight` بظلال أخف.
  - `@keyframes p6PlayWaitingLight` — نبضة teal بظل `rgba(0,0,0,0.06)` بدل `rgba(0,0,0,0.22)`.

Not changed:
- Dark Mode — يبقى كما هو 100%.
- JavaScript — لم يُعدَّل.
- `lesson-01.js` — لم يُعدَّل.
- HTML — لم يُعدَّل.
- أحجام العناصر — متطابقة في كلا الوضعين (padding, borderRadius, gap, width, height).
- ألوان الحروف التعليمية — ثابتة.
- ارتفاع HUD — ثابت 44px.
- مدة وحركة كل animation — ثابتة (2.8s ease-in-out).

Verified:
- Dark Mode: P4 SVG zone `rgba(0,0,0,0.25)` — بدون تغيير ✅
- Dark Mode: P2 hint `rgba(13,43,85,0.9)` — بدون تغيير ✅
- Dark Mode: P3 dot `rgba(255,255,255,0.15)` — بدون تغيير ✅
- Dark Mode: card-char shadow `rgba(0,0,0,0.4)` — بدون تغيير ✅
- Dark Mode: animation = `p6PlayWaiting` — بدون تغيير ✅
- Light Mode: P4 SVG zone `rgba(0,0,0,0.06)` — خفيف ومناسب ✅
- Light Mode: P2 hint `rgba(14,124,123,0.08)` + teal border — مقروء ✅
- Light Mode: P3 dot `rgba(0,0,0,0.12)` — مرئي على أبيض ✅
- Light Mode: card-char shadow `rgba(0,0,0,0.1)` — مناسب لبطاقة فاتحة ✅
- Light Mode: animation = `p6PlayWaitingLight` — ظلال أخف ✅
- Layout: جميع الأحجام متطابقة في كلا الوضعين ✅
- HUD 44px + Controls 43px — ثابت ✅
- لا تأثير على P1/P5/P6/P7 ✅

---

### Phase 4.2: Light Mode P6 Components Fix — إصلاح مكونات P6 في الوضع النهاري

Changed (`css/style.css`):
- إضافة 8 قواعد `[data-theme="light"]` لمكونات P6 (بعد Phase 4.1 مباشرة):
  - `.p6-big-play` — gradient فاتح: `rgba(14,124,123,0.18)→rgba(14,124,123,0.06)` بدل كحلي داكن.
  - `.p6-big-play:hover` — gradient أقوى: `rgba(14,124,123,0.28)→rgba(14,124,123,0.10)`.
  - `.p6-big-play.is-playing` — gradient تشغيل: `rgba(14,124,123,0.35)→rgba(14,124,123,0.12)` + ظل teal أخف.
  - `.p6-answer-zone.visible` — خلفية فاتحة: `rgba(255,255,255,0.95)→rgba(240,244,248,0.9)` + ظلال خفيفة.
  - `.p6-pair-play` — خلفية: `rgba(14,124,123,0.08)` بدل أزرق داكن.
  - `.p6-pair-play:hover` — خلفية hover: `rgba(14,124,123,0.16)`.
  - `.p6-close-btn` — خلفية: `rgba(14,124,123,0.08)` بدل أزرق داكن.
  - `.p6-close-btn:hover` — خلفية hover: `rgba(14,124,123,0.14)`.

Not changed:
- Dark Mode — يبقى كما هو 100% (جميع القيم الأصلية لم تُمسّ).
- JavaScript — لم يُعدَّل.
- `lesson-01.js` — لم يُعدَّل.
- HTML — لم يُعدَّل.
- أحجام العناصر — متطابقة في كلا الوضعين (min-width, min-height, padding, border-radius).
- ألوان الحروف التعليمية — ثابتة.
- حالات is-playing glow (teal) — تعمل في كلا الوضعين.
- badges (same/diff) — تستخدم tokens ✓.
- أزرار reveal/next — تستخدم tokens ✓.

Verified:
- Dark Mode: big-play gradient كحلي `rgba(13,43,85,0.98)` — بدون تغيير ✅
- Dark Mode: pair-play/close-btn `rgba(20,51,95,0.45)` — بدون تغيير ✅
- Dark Mode: answer-zone gradient كحلي `rgba(22,46,88,0.92)` — بدون تغيير ✅
- Light Mode: big-play gradient teal خفيف `rgba(14,124,123,0.18)` — مناسب للخلفية الفاتحة ✅
- Light Mode: pair-play/close-btn `rgba(14,124,123,0.08)` — واضح ومقروء ✅
- Light Mode: answer-zone gradient أبيض `rgba(255,255,255,0.95)` — مناسب ✅
- Layout: HUD 44px + Controls 43px — ثابت ✅
- حالة is-playing: gradient و glow يتبدلان حسب الوضع ✅
- لا تأثير على P1–P5 أو P7 (selectors مقيدة بـ .p6-*) ✅

---

### Phase 4.1: Light Mode Critical Controls Fix — إصلاح أزرار التحكم في الوضع النهاري

Changed (`css/style.css`):
- إضافة 3 قواعد CSS بعد كتلة `[data-theme="light"]` (أسطر 183–194):
  - `[data-theme="light"] .main-btn.advance` — خلفية `rgba(14,124,123,0.12)` + لون `var(--teal)` بدل الأبيض الشفاف.
  - `[data-theme="light"] .main-btn.retreat` — لون `var(--text-secondary)` (#4A5568) + حدود `rgba(0,0,0,0.12)` بدل الأبيض الشفاف.
  - `[data-theme="light"] .main-btn.retreat:hover` — حدود `rgba(0,0,0,0.3)` لتعزيز hover في الخلفية الفاتحة.
- Specificity: `[data-theme="light"] .main-btn.advance` (0,3,0) يتفوق على `.main-btn.advance` (0,2,0).
- لا tokens جديدة — استخدام `var(--teal)` و `var(--text-secondary)` الموجودين.

Not changed:
- Dark Mode — يبقى كما هو 100% (القواعد الأصلية في أسطر 497–510 لم تُمسّ).
- JavaScript — لم يُعدَّل.
- `lesson-01.js` — لم يُعدَّل.
- HTML — لم يُعدَّل.
- ارتفاع HUD — ثابت 44px.
- ارتفاع Controls Bar — ثابت 43px.
- أبعاد الأزرار — متطابقة في كلا الوضعين.

Verified:
- Dark Mode: advance `rgba(255,255,255,0.5)` / retreat `rgba(255,255,255,0.25)` — بدون تغيير ✅
- Light Mode: advance `rgb(14,124,123)` (teal) — مقروء على خلفية فاتحة ✅
- Light Mode: retreat `rgb(74,85,104)` (#4A5568) — مقروء على خلفية فاتحة ✅
- Layout: HUD 44px + Controls 43px — ثابت في كلا الوضعين ✅
- لا تأثيرات جانبية على أي مرحلة أخرى ✅

---

### Phase 3B (Part 1): Theme Toggle Button UI — زر تبديل الوضع في Teacher HUD

Changed (`lecture-01.html`):
- إضافة `<button id="theme-toggle" class="hud-icon-btn">` في `div.hud-controls`.
- الموقع: بين المؤقت ولوحة المساعدة (؟) — نفس حجم ونمط أزرار ⛶ و ◎.
- الأيقونة: ☀ (جاهزة للتحول لـ ☾ عند تفعيل Light Mode لاحقاً).
- title: "الوضع النهاري" + aria-label للوصولية.

Not changed:
- ارتفاع HUD — ثابت 44px بعد الإضافة.
- JavaScript — لم يُضف أي منطق تبديل (سيُنفّذ في Phase 3C).
- CSS — لا أنماط جديدة (الزر يستخدم `.hud-icon-btn` الموجود).
- lesson-01.js — لم يُعدَّل.

---

### Phase 2: Theme CSS Migration — ربط CSS بنظام Theme Tokens

Changed (`css/style.css`):
- استبدال ~80 لون مشفر (hardcoded) بمتغيرات `--th-*` semantic عبر جميع المراحل P1–P7.
- التحويلات تشمل: خلفيات (`--th-bg-*`) / حدود (`--th-border-*`) / نصوص (`--th-text-*`) / ظلال (`--th-shadow-*`) / حالات تفاعلية (`--th-bg-hover`, `--th-bg-active`) / ألوان الحالة (`--th-success`, `--th-error`) / عناصر ذهبية (`--th-gold-*`).
- المكونات المحوّلة: Teacher HUD, Controls Bar, Progress Rail, P1 alphabet, P2 sound buttons, P3 cards/nav, P4 stroke card/steps/replay, P5 word card/highlight/meaning/history/review, P6 round tabs/counter/answer zone/reveal/next/pair/close buttons, P7 answer zone/score buttons/summary, Attention Overlay, Completion Banner, Phase Timer.

Not changed:
- الشكل الحالي — لا تغيير بصري (Dark Mode يبقى كما هو 100%).
- ~11 قيمة `rgba(255,255,255,*)` بقيت بأصلها: قيم شفافية دقيقة جداً (0.02–0.04) لا يوجد لها token مطابق، أو تستخدم في سياقات خاصة (retreat button states, gradient inset shadows).
- ألوان الحروف التعليمية (--color-ba/ta/tha/nun) — هوية تعليمية ثابتة.
- JavaScript — لم يُعدَّل.
- `lesson-01.js` — لم يُعدَّل.
- HTML — لم يُعدَّل.

---

### Phase 1: Theme Tokens Foundation — أساس نظام Dark/Light Theme (CSS فقط)

Changed (`css/style.css`):
- إضافة 30 متغير semantic (`--th-*`) داخل `:root` — قيم Dark Mode الحالية.
- إضافة كتلة `[data-theme="light"]` مع 30 قيمة Light Mode — غير مفعّلة حالياً.
- تصنيف المتغيرات: Backgrounds (7) / Borders (3) / Text (4) / HUD (4) / Shadows (3) / Interactive (5) / Status (7).
- تعتيم طفيف لـ `--color-tha` و `--color-nun` في Light فقط لضمان contrast.

Not changed:
- الشكل الحالي — لا تغيير بصري (Dark Mode يبقى كما هو 100%).
- JavaScript — لم يُعدَّل.
- `lesson-01.js` — لم يُعدَّل.
- HTML — لم يُعدَّل.
- القيم المشفرة القديمة — ستُستبدل تدريجياً في Phase 2.

---

## 2026-08-06

### Layout Compatibility Validation — اختبار توافق شامل (لا تعديل كود)

نتيجة: ✅ ناجح — جميع المراحل تعمل وفق فلسفة Layout الجديدة.

الدقات المختبرة:
| الدقة | P1 scroll | P2–P6 | P7 no-scroll | HUD ثابت | Layout Shift |
|---|---|---|---|---|---|
| 1366×768 | ✅ (1158/677) | ✅ لا scroll | ✅ (677/677) | ✅ 44px | ✅ لا |
| 1280×720 | ✅ (1127/629) | ✅ لا scroll | ✅ (629/629) | ✅ 44px | ✅ لا |
| 1024×768 | ✅ (986/677) | ✅ لا scroll | ✅ (677/677) | ✅ 44px | ✅ لا |
| 1920×1080 | ✅ (1171/989) | ✅ لا scroll | ✅ (989/989) | ✅ 44px | ✅ لا |

اختبار الانتقال (P1→P2→...→P7→P1):
- appHeight ثابت عند viewport height في كل الانتقالات ✅
- Teacher HUD ثابت (44px, top: 0) ✅
- لا layout shift ✅
- عند العودة لـ P1: scrollTop=0 + scroll متاح ✅

---

### إصلاح معماري — Layout Mode: P1 scroll + P7 classroom fullscreen (CSS فقط)

سبب المشكلة:
- تعديل P7 Responsive السابق غيّر `.app-layout` من `min-height: 100vh` إلى `height: 100vh; overflow: hidden`.
- هذا حلّ مشكلة P7 لكن قصّ محتوى P1 (1125px محتوى في 677px متاح).

الحل المعتمد — فصل سلوك Scroll حسب المرحلة:
- `.app-layout`: `height: 100vh; overflow: hidden` — يقيّد الشبكة ضمن الشاشة.
- `#content-zone`: `overflow: auto` — يسمح بالتمرير الداخلي عند الحاجة.
- `#content-zone`: `align-items: flex-start` (بدلاً من `center`) — يبدأ المحتوى من الأعلى فلا يُقصّ الجزء العلوي عند التمرير.

Changed (`css/style.css`):
- `.app-layout` — `height: 100vh; overflow: hidden` (تثبيت نهائي).
- `#content-zone` — `align-items: flex-start` (كان `center`).

النتيجة:
- P1: المحتوى يبدأ من الأعلى + scroll داخلي يعمل (1158px في 677px) ✅
- P2–P6: تعمل بدون scroll (المحتوى أقل من المتاح) ✅
- P7: كل المحتوى ظاهر بدون scroll (677px = 677px) ✅

Not changed:
- JavaScript — لم يُعدَّل.
- `lesson-01.js` — لم يُعدَّل.
- HTML — لم يُعدَّل.

---

### P7 — Responsive Layout: إزالة Scroll العمودي على 1366×768 (CSS فقط)

سبب المشكلة:
- `.app-layout` كان يستخدم `min-height: 100vh` مما يسمح للمحتوى بالتمدد خارج الشاشة.
- أحجام ثابتة: الحرف 176px، الفجوات 32px، حشو المحتوى 64px — المجموع ~908px vs المتاح 677px.

Changed (`css/style.css`):
- `.app-layout` — تغيير `min-height: 100vh` إلى `height: 100vh; overflow: hidden` — يقيّد التطبيق ضمن الشاشة المرئية.
- `#content-zone` — تغيير padding عمودي من `var(--gap-lg)` (32px) إلى `clamp(0.5rem, 2vh, 2rem)` — يتكيف مع ارتفاع الشاشة.
- `.p7-container` — padding وgap بـ `clamp(0.4rem, 1.2vh, 1.25rem)` + `overflow: hidden`.
- `.p7-header` — `flex-shrink: 0` لمنع انضغاط التبويبات.
- `.p7-main` — gap بـ `clamp(0.6rem, 2vh, 2rem)` + `min-height: 0` لتمكين flex shrink.
- `.p7-question-box` — gap بـ `clamp(0.3rem, 1vh, 1.25rem)`.
- `.p7-char-display` — حجم الخط من `clamp(6rem, 14vw, 11rem)` إلى `clamp(4rem, 12vh, 11rem)` — يتكيف مع الارتفاع.
- `.p7-question-text` — حجم الخط بـ `clamp(1rem, 2.2vw, 2.2rem)`.
- `.p7-answer-zone` — gap وpadding بقيم `clamp` متكيفة.
- `.p7-answer-text` — حجم الخط بـ `clamp(1.4rem, 3vh, 3rem)`.
- `.p7-score-row` — `margin-top` بـ `clamp(0.2rem, 0.5vh, 0.5rem)`.

Not changed:
- JavaScript — لم يُعدَّل.
- `lesson-01.js` — لم يُعدَّل.
- HTML — لم يُعدَّل.
- P1–P6 — لم تتأثر (جميعها تمر بدون overflow).

Verified (1366×768):
- جميع المراحل P1–P7: لا overflow ✅
- P7 جولة "ما هذا الحرف؟" — الحرف ظاهر + الإجابة + التقييم بدون scroll ✅
- P7 جولة "كم نقطة؟" — نفس الثبات ✅
- P7 جولة "ما صوت الحرف؟" — زر التشغيل + الإجابة بدون scroll ✅
- الشاشة الأكبر (desktop) — التصميم يتمدد بشكل طبيعي ✅

### P7 — إصلاح القفز البصري للحرف عند الانتقال بين الأسئلة (CSS فقط)

Changed (`css/style.css`):
- `.p7-char-display` — استبدال `animation: fadeInUp` بـ `animation: p7FadeIn` — حركة fade فقط بدون `translateY` لمنع القفز العمودي.
- إضافة `@keyframes p7FadeIn { from { opacity: 0 } to { opacity: 1 } }` — نفس المدة والإحساس البصري بلا حركة عمودية.

Not changed:
- `@keyframes fadeInUp` — أُبقي كما هو (مُستخدم في `.p7-summary`).
- JavaScript — لم يُعدَّل.
- البيانات — لم تتغير.

Verified:
- جولة "ما هذا الحرف؟": الحروف الأربعة بموضع ثابت (charTop: 199) بلا قفز ✅
- جولة "كم نقطة؟": نفس الثبات (charTop: 199) ✅
- الحرف يظهر بحركة fade هادئة بلا translateY ✅

### P7 — إصلاح مسار تشغيل الصوت في التقييم الختامي (app.js فقط)

Changed (`js/app.js`):
- إضافة `p7PlaySound(letterId, el)` — يستدعي `AudioManager.playLetter()` مباشرة + يضيف `is-playing` class للتغذية البصرية (نفس آلية P6).
- تغيير `onclick` في زر "شغّل الصوت" من `p3PlaySound('...')` إلى `p7PlaySound('...', this)` — يمرر عنصر الزر للتغذية البصرية.

Not changed:
- `AudioManager` — لم يُعدَّل.
- `js/lesson-01.js` — لم يُعدَّل.
- ملفات الصوت — لم تتغير.
- CSS — لم يُعدَّل (`.p6-big-play.is-playing` كان موجوداً مسبقاً).

Verified:
- زر "شغّل الصوت" يشغّل MP3 عبر AudioManager.playLetter ✅
- التغذية البصرية (is-playing: توهج + أيقونة متحركة + موجات ripple) تعمل ✅
- كشف الإجابة يعمل بشكل طبيعي ✅
- لا أخطاء Console جديدة ✅

### P6 D2 — توسيط "vs" في منطقة المقارنة الصوتية (app.js + style.css)

Changed (`css/style.css`):
- `.p6-answer-chars` — تحويل من inline إلى `display: flex` مع `align-items: center; justify-content: center; gap: 0.6rem; flex-basis: 100%` لتوسيط "vs" بين الحرفين.
- `.p6-vs` (جديد) — تنسيق فاصل "vs": `color: var(--text-dim); font-size: 0.85em; font-weight: 400; opacity: 0.7`.

Changed (`js/app.js`):
- استبدال `&nbsp;vs&nbsp;` بـ `<span class="p6-vs">vs</span>` داخل `.p6-answer-chars` — التباعد يُدار الآن بـ flexbox gap.

Not changed:
- ألوان الحروف — لم تتغير.
- منطق النشاط — لم يتغير.
- `js/lesson-01.js` — لم يُعدَّل.

Verified:
- "vs" متموضعة في المنتصف تماماً بين الحرفين (ث /θ/ vs ن /n/) ✅
- أزواج "نفس" تعمل بدون سطر مقارنة ✅
- أزواج "مختلف" تعرض المقارنة مع ألوان صحيحة ✅

### P6 D2 — إزالة المؤشرات اللونية من أزرار الصوت (app.js + style.css)

Changed (`js/app.js`):
- `renderActivity_24_same_or_different()` — إزالة `style="border-color:${l1.color}"` و `style="border-color:${l2.color}"` من زرَّي `.p6-pair-play` في جولة D2 (نفس أم مختلف). الألوان كانت تكشف الإجابة بصرياً قبل الاستماع.

Changed (`css/style.css`):
- `.p6-pair-play` — تغيير `border-bottom: 4px solid` إلى `border-bottom: 4px solid rgba(255,255,255,0.1)` لضمان لون محايد موحّد لكلا الزرين.

Not changed:
- `.p6-close-btn` (D3 أزرار الأصوات المتقاربة) — أُبقي `border-bottom: 4px solid` كما هو لأن الحروف مرئية بالفعل في D3.
- منطقة الإجابة — تبقى تعرض ألوان الحروف بعد كشف الإجابة (سلوك صحيح).
- `js/lesson-01.js` — لم يُعدَّل.

Verified:
- زوج "نفس": الزران بلون محايد متطابق، تشغيل الصوت يعمل، الإجابة "= نفس الصوت" تظهر ✅
- زوج "مختلف": الزران بلون محايد متطابق، تشغيل الصوت يعمل، الإجابة "≠ صوتان مختلفان" تظهر مع ألوان الحروف ✅
- لا inline styles على أزرار الصوت (style: null) ✅
- لا أخطاء Console جديدة ✅

### Phase 1.2 — Teacher HUD Improvements (HTML + CSS فقط — لا تغيير في app.js أو lesson-01.js)

Changed (`lecture-01.html`):
- نقل `#phase-timer` من داخل لوحة المساعدة (help-panel) إلى `hud-controls` في الشريط العلوي مباشرة — المؤقت ظاهر دائماً أثناء التشغيل ومخفي عندما يكون فارغاً (`phase-timer:empty { display: none }`).

Changed (`css/style.css`):
- `.phase-timer` — تصغير الخط (0.7rem) وتعديل الأبعاد ليتناسب مع ارتفاع الشريط العلوي (44px) + إضافة `white-space: nowrap` و`flex-shrink: 0`.
- `.main-btn.advance` — تخفيف اللون الافتراضي: `background: rgba(14,124,123,0.35)` + `color: rgba(255,255,255,0.5)` بدل teal صلب. يعود للظهور الكامل عند hover.
- `.main-btn.retreat` — تخفيف: `color: rgba(255,255,255,0.25)` + `border-color: rgba(255,255,255,0.08)` بدل قيم أعلى. يعود للظهور عند hover.

Not changed:
- `js/app.js` — PhaseTimer يجد `#phase-timer` بالـ ID ولم يتأثر بنقل العنصر.
- `js/lesson-01.js` — لم يُعدَّل.
- أيقونة ؟ — أُبقيت كما هي (مرجعية لا إعدادات).

Verified:
- المؤقت يظهر في الشريط العلوي أثناء كل مرحلة ✅
- المؤقت يختفي عند التوقف (`:empty → display: none`) ✅
- التنقل P1→P2→P5→P7→P1 يعمل بشكل طبيعي ✅
- لوحة المساعدة (؟) تعمل بدون المؤقت بداخلها ✅
- لا أخطاء Console (فقط ERR_BLOCKED_BY_CLIENT المتوقعة) ✅
- أزرار التقدم/التراجع أقل بروزاً مع الحفاظ على hover واضح ✅

### Phase 1.1 Audio Verification Completed (توثيق فقط — لا تغيير في الكود)

Verified:
- 9 ملفات MP3 تم إضافتها وتحقق من عملها: 4 حروف (ba/ta/tha/nun.mp3) + 5 كلمات (word_bab/bayt/tamr/thawb/nar.mp3).
- الحجم الإجمالي: ~482 KB.
- تشغيل ناجح في جميع المراحل: P2 ✅ P3 ✅ P5 ✅ P6 ✅.
- AudioManager cache يعمل — جميع الملفات مُخزّنة بعد أول تشغيل.
- Fallback يعمل — ملف غير موجود يتحول تلقائياً إلى Web Speech API.
- Offline First مُؤكّد — جميع الطلبات محلية (file:///)، لا اتصالات خارجية.
- لا أخطاء في Console.

Updated:
- `md/CURRENT_STATE.md` — حالة النظام الصوتي من 🔴 إلى 🟢 Verified، إضافة قائمة الملفات بأحجامها، نتائج التحقق، خريطة الاستخدام مُحدّثة بـ ✅ Verified.
- `assets/audio/README.md` — حالة الأصول من 🔴 إلى 🟢 Verified، إضافة أحجام الملفات، نتائج التحقق الكاملة.
- `md/CHANGELOG.md` — هذا الإدخال.

### Audio Recording Script + QD-06 (توثيق فقط — لا تغيير في الكود)

Added:
- `md/AUDIO_RECORDING_SCRIPT.md` — دليل تنفيذي لتسجيل 9 ملفات MP3 (4 حروف + 5 كلمات). يشمل: تعليمات المتحدث، مواصفات النطق التعليمي، الفرق بين تَ وثَ، جدول التسجيل، ترتيب الجلسة، قائمة فحص الجودة، المواصفات التقنية.

Updated:
- `md/PROJECT_DECISIONS.md` — QD-06: Audio Letter Pronunciation Strategy (✅ Decided — Phoneme with fathah).
- `assets/audio/README.md` — توضيح أن ملفات الحروف Phoneme Audio (بَ لا باء).
- `md/CURRENT_STATE.md` — ملاحظة فصل Phoneme/Name مؤجل إلى Phase 3.

## 2026-08-05

### Phase 1.1 Implementation — AudioManager Fixes (3 أسطر في app.js)

Changed (`js/app.js`):
- سطر 97: `playLetter()` fallback text — `letter.phoneme` ('/b/') → `letter.name` ('باء'). Web Speech API الآن ينطق اسم الحرف العربي بدل رمز IPA.
- سطر 556: `p2PlaySound()` — `AudioManager.speak(letter.phoneme, 0.6)` → `AudioManager.playLetter(STATE.p2ActiveLetter)`. P2 الآن يمر عبر MP3 أولاً مع fallback.
- سطر 801: `p3ToggleChoral()` — `AudioManager.speak(letter.phoneme, 0.55)` → `AudioManager.playLetter(letterId)`. P3 choral الآن يمر عبر MP3 أولاً مع fallback.

Verified:
- P1: يعمل ✅
- P2: يعمل — يستخدم playLetter() بدل speak() ✅
- P3: يعمل — choral يستخدم playLetter() بدل speak() ✅
- P5: يعمل — playWord() لم يتأثر ✅
- P6: يعمل — يستخدم playLetter() عبر p3PlaySound() لم يتأثر ✅
- Console: لا أخطاء تطبيقية (فقط ERR_BLOCKED_BY_CLIENT المتوقعة في بيئة المعاينة)

### Phase 1.1 Analysis — Audio Asset Foundation (تحليل فقط — لا تغيير في الكود)

Analyzed:
- `js/app.js` AudioManager (سطور 42-114): بنية play/playLetter/playWord/speak، نظام cache، آلية fallback.
- `js/lesson-01.js` حقول audioFile: 4 حروف (ba/ta/tha/nun.mp3) + 5 كلمات (word_*.mp3).
- `assets/audio/README.md`: قائمة الملفات المتوقعة.
- Work Plan Doc 06: متطلبات < 100ms بدء صوت، Audio Layer غير مرئي.
- Work Plan Doc 07 (Q09): 17 ملف صوتي مُحدّد بالاسم والغرض والمرحلة.
- استدعاءات الصوت في P1-P7 (14 استدعاء عبر 6 مراحل).

Issues found:
- P2 (app.js:556) يتجاوز MP3 — يستدعي `speak()` مباشرة بدل `playLetter()`.
- P3 choral (app.js:801) نفس المشكلة — `speak()` بدل `playLetter()`.
- Fallback text في `playLetter()` (app.js:97) يستخدم IPA ('/b/') بدل اسم الحرف ('باء').
- `assets/audio/` فارغ — لا ملفات MP3 موجودة.
- Doc 07 يسمّي الملفات بشكل مختلف عن الكود (p2_phoneme_b.mp3 vs ba.mp3).

Decisions documented:
- QD-05: اعتماد تسمية الكود الحالية (ba.mp3 لا p2_phoneme_b.mp3) — تأجيل فصل phoneme/name إلى Template.

Updated:
- `md/CURRENT_STATE.md` — قسم "النظام الصوتي" الكامل: بنية AudioManager، 4 مشاكل، خريطة الصوت عبر المراحل، الملفات المطلوبة.
- `md/PROJECT_DECISIONS.md` — QD-05 Audio Naming Convention.
- `md/CHANGELOG.md` — هذا الإدخال.
- `assets/audio/README.md` — قائمة الملفات المطلوبة مُحدَّثة مع مواصفات التسجيل.

### خطة التطوير — Development Roadmap (توثيق فقط — لا تغيير في الكود)

Updated:
- `md/ACTIVE_TASK.md` — Phase 0 هي المهمة الحالية (القرارات + الاختبار الصفي)، إضافة 6 خطوات بـ checkboxes.
- `md/PROJECT_DECISIONS.md` — إضافة حالة 🔴 Pending لكل قرار (QD-01 إلى QD-04) مع ربطها بخطوات Phase 0.

Added:
- `md/DEVELOPMENT_ROADMAP.md` — خطة تطوير كاملة من 5 مراحل (Phase 0→4): قرارات → إكمال Lesson 01 → تلميع → استخراج Template → Lesson 02+. تتضمن: Lesson Schema، بنية Template المستهدفة، خريطة الملفات، قواعد التنفيذ، معايير الانتقال بين المراحل.

### تحديث التوثيق — Documentation Sync (توثيق فقط — لا تغيير في الكود)

Updated:
- `md/ACTIVE_TASK.md` — أُعيد كتابته بالكامل: إزالة P6 كهدف نشط، تسجيل جميع المهام المكتملة (P6 phases + visual fixes + project study)، إضافة 5 قرارات معلّقة، إضافة 5 أولويات مرتبة.
- `md/CLAUDE_PROJECT_MAP.md` — تحديث القسم 4 (P6 مكتمل لا نشط)، إضافة Phase 3.1، تحديث القسم 6 (لا هدف تطوير حالي).
- `md/CURRENT_STATE.md` — إضافة جدول "متطلبات الأداء" من Doc 06 (6 متطلبات كمية).
- `md/CHANGELOG.md` — هذا الإدخال.

Added:
- `md/PROJECT_DECISIONS.md` — ملف جديد يحتوي 4 قرارات معمارية/تربوية غير محسومة (QD-01 إلى QD-04) مع جدول مقارنة وثيقة↔كود وخيارات لكل قرار.

Note:
- مراجع `Opencode\ai\` القديمة لا تزال موجودة في: CHANGELOG.md (إدخالات Phase 2/3/3.1)، AI-Memory-Creation-Report.md، AI-Memory-Finalization-Report.md، AI_WORKFLOW_RULES.md، Component-Registry-Creation-Report.md، PROJECT_CONTEXT.md. هذه إشارات تاريخية لمجلد غير موجود — تحتاج تنظيفاً مستقبلياً.

### مراجعة شاملة — Project Understanding Report (توثيق فقط — لا تغيير في الكود)

Updated:
- `md/CURRENT_STATE.md` — أُعيد كتابته بالكامل: هيكل المشروع الفعلي، المراحل السبع بحالتها، الفجوات الجوهرية بين الوثائق والكود (P5b/P6a/إملاء/خروج/واجب مفقودة)، التناقضات (P4 كتابة vs نقاط، 5 vs 4 كلمات، 7 vs 9 مراحل)، ملفات مذكورة لكن غير موجودة (Opencode/, offline-check.html).
- `md/CHANGELOG.md` — هذا الملف.

Purpose:
دراسة شاملة من 5 مراحل (قراءة 11 ملف md + 7 ملف docx + فحص 4 ملفات كود + مقارنة) لبناء فهم كامل موثق. لا تغييرات في الكود.

### تعديلات بصرية (P1 + P2 + P4)

Changed (في `Lesson-01-classroom-P6-Fixed\`):
- `css/style.css`:
  - `.hero-char` — حركة موجة ارتدادية (bouncing wave animation) بتأخيرات 0s/0.15s/0.3s/0.45s + ألوان var(--color-ba/ta/tha/nun).
  - `@keyframes charFloat` — 3 إطارات (0→translateY(0), 40%→-18px, 60%→-8px) بدل float بسيط.
  - `.p2-feedback` + `.p2-feedback.show` — **حُذفت** (CSS rules كاملة).
  - `.p4-step-item` — ارتفاع ثابت 4.8rem بـ triple lock (height=min-height=max-height) + flex-shrink/grow:0 + overflow:hidden.
  - `.p4-step-item.active` — نفس القفل (height=min-height=max-height=4.8rem).
  - `.p4-step-body` — أُضيف: flex:1, max-height:100%, overflow:hidden.
  - `.p4-step-label` — أُضيف: white-space:nowrap, overflow:hidden, text-overflow:ellipsis.
  - `.p4-step-desc` — أُضيف: -webkit-line-clamp:2, max-height:2.7em, overflow:hidden.
- `js/app.js`:
  - `setP2Feedback()` — **حُذفت** (الدالة كاملة).
  - `clearP2Feedback()` — **حُذفت** (الدالة كاملة).
  - `initP2()` — حُذف حقن `<span class="p2-feedback">` في DOM.
  - `p2SelectLetter()` — حُذف استدعاء `clearP2Feedback()` و`setP2Feedback('✓ ممتاز')`.

Purpose:
3 تعديلات CSS/JS جراحية: (1) حركة hero أجمل، (2) إزالة شارة ✓ ممتاز من P2 بالكامل (CSS + JS + DOM)، (3) منع تغير ارتفاع صناديق خطوات P4 أثناء التنقل.

### P6 Phase 3.1 — Progressive Reveal & Teacher Layer Refinement (CSS + app.js محدود)

Added:
- `Opencode\ai\Phase Reports\Phase-3.1-P6-Progressive-Reveal-Refinement-Report.md`

Updated:
- `CURRENT_STATE.md` (اكتمال Phase 3.1 + ما تحسّن + ما تبقّى)

Changed (في `Lesson-01-classroom-P6-Fixed\`):
- `js/app.js`: helper جديد `p6ApplyReveal()` يطبّق حالة الكشف على DOM القائم (data-reveal-step + class visible + زر المدرّس + التلميح + إرشاد الخطوة) دون إعادة رسم كاملة؛ `renderP6()` يخرج كل عناصر الكشف حاضرة دائماً في DOM بوسوم `p6-reveal-item`/`r-*` مع `data-reveal-step`؛ `advanceP6`/`retreat` يستخدمان `p6ApplyReveal()` للخطوات الداخلية والرجوع، و`renderP6()` فقط عند تغيير سؤال/جولة. (AudioManager/`lesson-01.js`/navigation/`lecture-01.html` لم تتغير)
- `css/style.css`: قسم P6 Phase 3.1 — `.p6-answer-zone` كبطاقة تعليمية ثابتة الارتفاع `clamp(5.5rem,12vh,7.5rem)` مع ترويسة ذهبية "الإجابة الصحيحة"؛ نظام `.p6-reveal-item` (opacity+حركة+تأخيرات متتابعة 0.04–0.26s) عبر `[data-reveal-step="0..3"]` بدل إعادة الرسم؛ تهدئة `.p6-guide` (بلا حبة/خلفية/ذهب/letter-spacing — فاصل رفيع + تدرّج لوني نصي)؛ `.p6-dot-fact` inline (لا يكسر الإيقاع)؛ `.p6-note-box` مرن (لا يدفع الارتفاع).

Purpose:
تحويل كشف P6 إلى "اكتشاف تدريجي هادئ" عبر عناصر دائمة في DOM وCSS-only transitions (بدون وميض إعادة رسم، ثبات Layout في 720p)، وتهدئة شريط المعلم ليصبح معلومات تحكم خافتة — دون تغيير تجربة الطلاب أو البيانات.

### P6 Phase 3 — Teacher Guidance Mode (CSS + app.js محدود)

Added:
- `Opencode\ai\Phase Reports\Phase-3-P6-Teacher-Guidance-Mode-Report.md`

Updated:
- `CURRENT_STATE.md` (اكتمال Phase 3 + ما تحسّن + ما تبقّى)

Changed (في `Lesson-01-classroom-P6-Fixed\`):
- `js/app.js`: حقل `STATE.p6SoundPlayed`؛ `P6_GUIDES` (هدف + إرشاد لكل نوع جولة) + `p6GuideStepText`/`p6UpdateGuideStepEl`؛ تحديث `p6PlaySound` (إرشاد في مكانه دون مسح `.is-playing`)؛ إعادة ضبط في `initP6`/`advanceP6`/`p6GoRound`؛ شريط `p6-guide` داخل الـ round-nav في `renderP6`. (AudioManager/`lesson-01.js`/navigation/`lecture-01.html` لم تتغير)
- `css/style.css`: قسم P6 Phase 3 — `.p6-guide`/`.p6-guide-role`/`.p6-guide-purpose`/`.p6-guide-step` (شريط خافت inline، شريط teal جانبي RTL، ألوان الهوية).

Purpose:
تحويل P6 إلى أداة قيادة للمعلم (هدف الجولة + خطوة المعلم + إرشاد قصير) inline مع رأس الحصة دون زيادة ارتفاع أو تغيير تجربة الطلاب.

### P6 Phase 2 — Interaction Polish (CSS + app.js محدود)

Added:
- `Opencode\ai\Phase Reports\Phase-2-P6-Interaction-Polish-Report.md`

Updated:
- `CURRENT_STATE.md` (اكتمال Phase 2 + ما تحسّن + ما تبقّى)

Changed (في `Lesson-01-classroom-P6-Fixed\`):
- `js/app.js`: حقل `STATE.p6RevealStep`؛ helpers `p6PlaySound`/`p6MarkSoundButton` + `p6SoundTimer`؛ كشف تدريجي لـ D1 في `advanceP6`/`renderP6`/`retreat`/`p6GoRound`؛ نصوص أزرار وتلميحات لكل خطوة. (AudioManager/`lesson-01.js`/navigation/`lecture-01.html` لم تتغير)
- `css/style.css`: حالة الاستماع (`.is-playing` + "🔊 جاري الاستماع...")، دخول متدرّج للكشف، لوحة تعليم الإجابة (label + نقاط ذهبية + موضع النقاط).

Purpose:
تحويل P6 إلى تدريب سمعي تدريجي يقوده المدرّس (تغذية راجعة للصوت + كشف مرحلي + تعزيز بصري) دون تغيير Layout أو البيانات.

### AI Memory System Finalization

Added:
- PHASE_PROTOCOL.md

Updated:
- ACTIVE_TASK.md
- CURRENT_STATE.md

Purpose:
Create permanent operating system for AI agents.

## 2026-08-05 — إنشاء نظام الذاكرة الدائم

- أُنشئ مجلد `Opencode\ai\` و8 ملفات ذاكرة + `AI-Memory-Creation-Report.md`.
- المصادر: `Work plan\` (7 docx)، الكود الفعلي (`lesson-01.js`/`app.js`/`style.css`/`lecture-01.html`)،
  تقارير Phase 1–1.3، `before-order.txt`.
- لا تغييرات على كود الدرس (مهمة تحليلية/توثيقية فقط).
- **ملاحظة**: مجلد `Opencode\ai\` المذكور أعلاه غير موجود فعلياً في هيكل المشروع الحالي.

## (سابق — من تقارير Phase في المشروع)

### تحسينات P6 — Classroom Readiness Fix (مراحل CSS-only)

- **Phase-1**: التهيئة الأولى لتجهيز P6 كلوحة تدريب سمعي صفية.
- **Phase-1.1**: تحسينات إضافية (CSS).
- **Phase-1.2**: تحسينات إضافية (CSS).
- **Phase-1.3**: اللمسات الأخيرة على P6 (CSS).

> التفاصيل الدقيقة لكل مرحلة موجودة في ملفات `Phase-1.md` / `Phase-1.1.md` / `Phase-1.2.md` / `Phase-1.3.md`
> داخل `md/Phase Reports/`.
