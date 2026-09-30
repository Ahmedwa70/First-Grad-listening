# P6 Visual Fix Report — Static Learning Frame

> **التاريخ:** 15 أغسطس 2026  
> **النطاق:** P6 Demo Instruction Flow فقط (3 صفحات تعليمات)  
> **الحالة:** مكتمل — تم الاختبار بدون أخطاء

---

## المشكلة

صفحات التعليمات الثلاث (Activity Introduction، Finger Mapping، Same/Different) كانت تعمل كصفحات منفصلة:
- كل ضغطة Space تعيد بناء الـ DOM بالكامل (`container.innerHTML`)
- Header, badge, progress, footer, button كلها تتحرك/تختفي وتعود
- فراغ بصري وانتقالات مشتتة
- لا إحساس بالتدرج التعليمي

## الحل — Static Learning Frame

### المبدأ: `Static Frame + Dynamic Content`

#### ما ثُبِّت (لا يتغير بين الخطوات):
| العنصر | الوصف |
|--------|-------|
| `.p6-demo-header` | Badge + Chinese label + progress counter |
| `.p6-demo-footer` | Teacher guide + navigation button |
| `.p6-demo` | Main container layout |

#### ما يتغير (بـ opacity fade 250ms):
| العنصر | الوصف |
|--------|-------|
| `.p6-demo-body` | النص العربي + الصيني + المثال البصري |
| Progress text | رقم الخطوة فقط (1/3 → 2/3 → 3/3) |
| Teacher hint text | نص التلميح فقط |
| Button text | التالي / ابدأ النشاط |

---

## الملفات المعدلة

### 1. `js/app.js` — `renderP6Demo()` (سطر 1916)

**قبل:** innerHTML كامل في كل خطوة → إعادة بناء DOM كاملة  
**بعد:** 
- أول استدعاء: بناء الإطار الثابت مرة واحدة
- الاستدعاءات التالية: تحديث المحتوى الديناميكي فقط عبر DOM API
- الجسم (`.p6-demo-body`): `opacity: 0` → تحديث innerHTML → `opacity: 1` (CSS transition 250ms)

**تحسينات بصرية خاصة:**

| الخطوة | التحسين |
|--------|---------|
| Step 2 (Finger Mapping) | شبكة بطاقات بصرية `.p6-finger-grid` — كل حرف في بطاقة بلونه مع الرقم المقابل وأيقونة ☝ |
| Step 3 (Same/Different) | مقارنة بصرية `.p6-demo-compare` — صفان: 🔊 = 🔊 → 👍 نفس / 🔊 ≠ 🔊 → ✋ مختلف |

### 2. `css/style.css` — أنماط جديدة

| القاعدة | الغرض |
|---------|-------|
| `.p6-demo-body { transition: opacity 250ms; min-height: clamp(8rem,22vh,16rem) }` | منع القفز + fade ناعم |
| `.p6-finger-grid` | شبكة flex لبطاقات الحروف/الأرقام |
| `.p6-finger-card` | بطاقة حرف مع border بلون الحرف |
| `.p6-finger-char`, `.p6-finger-num`, `.p6-finger-label` | حرف كبير + رقم + أيقونة |
| `.p6-demo-compare` | حاوية مقارنة الصوتين |
| `.p6-demo-compare-pair` | صف مقارنة واحد |
| `.p6-demo-compare-icon`, `-vs`, `-label` | أيقونة صوت + علامة = أو ≠ + وصف النتيجة |
| Light mode overrides | `.p6-finger-card`, `.p6-demo-compare-pair` |

---

## التأكد أن Activity Engine لم يتأثر

| الفحص | النتيجة |
|-------|---------|
| `advanceP6()` | لم يتغير — يستدعي `p6AdvanceDemo()` كما كان |
| `p6AdvanceDemo()` | لم يتغير — يزيد `STATE.p6DemoStep` ويستدعي `renderP6Demo()` |
| `p6EndDemo()` | لم يتغير — يضبط `STATE.p6DemoMode = false` ويستدعي `renderP6()` |
| `retreat()` case P6 demo | لم يتغير — يقلل `STATE.p6DemoStep` ويستدعي `renderP6Demo()` |
| `STATE` variables | لم تتغير — `p6DemoMode`, `p6DemoStep` كما هي |
| `LESSON_01.p6Demo` | لم يتغير — البيانات المجمدة في lesson-01.js |
| Keyboard navigation | Space/Back يعملان في Demo كما كان |

---

## نتيجة الاختبار

| السيناريو | النتيجة |
|-----------|---------|
| Step 1 → Step 2 (advance) | ✅ الإطار ثابت، المحتوى يتغير بـ fade |
| Step 2 → Step 3 (advance) | ✅ الإطار ثابت، المحتوى يتغير بـ fade |
| Step 3 → D1 (ابدأ النشاط) | ✅ انتقال سلس إلى أول سؤال D1 |
| Step 3 → Step 2 (retreat) | ✅ الإطار ثابت، المحتوى يعود بـ fade |
| Finger Grid (Step 2) | ✅ 4 بطاقات بألوان الحروف مع أرقام |
| Compare Visual (Step 3) | ✅ صفان واضحان: نفس/مختلف |
| D1/D2/D3 after demo | ✅ لا تأثير على الجولات |
| Console errors | ✅ صفر أخطاء |
| Light mode | ✅ بطاقات وصفوف المقارنة لها overrides |

---

## Animation Rules المطبقة

| القاعدة | التطبيق |
|---------|---------|
| ممنوع: slide | ✅ لا translateX/Y في الانتقال بين الخطوات |
| ممنوع: تغيير layout | ✅ min-height ثابتة تمنع القفز |
| ممنوع: تحريك الصفحة | ✅ لا scroll أو reflow |
| مسموح: opacity fade | ✅ 250ms ease-out على `.p6-demo-body` فقط |
| مسموح: 200-300ms | ✅ 250ms ضمن النطاق |
