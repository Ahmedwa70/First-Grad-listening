# P3 Letter Discovery — Improvement Report

**التاريخ**: 2026-08-13
**الحالة**: مكتمل
**المرجع**: `md/Quality Audits/P3_LETTER_DISCOVERY_DEEP_REVIEW.md`

---

## الملفات المعدلة

| الملف | نوع التعديل |
|-------|------------|
| `js/app.js` | إضافة اسم الحرف + Micro-Assessment + تحديث retreat handler |
| `css/style.css` | تحسين تعليمة P3 + CSS اسم الحرف + CSS التقييم السريع |

---

## التغييرات المنفذة

### 1. إضافة اسم الحرف في Single View

**المشكلة**: البطاقة تعرض شكل الحرف (ب) والفونيم (/ب/) لكنها لا تعرض اسم الحرف (باء).

**التنفيذ**:
- أضيف `<span class="card-char-name">${letter.name}</span>` أسفل `card-char` داخل `card-char-zone` في `renderP3()`.
- CSS جديد: `.card-char-name` — `font-size: var(--fs-md)`, `font-weight: 600`, `color: var(--text-secondary)`.
- البيانات من `letter.name` الموجود مسبقاً في `lesson-01.js` — لا حقول جديدة.
- يظهر تلقائياً مع كشف الحرف (جزء من `reveal-char` block).

### 2. تحسين وضوح تعليمات P3

**المشكلة**: تعليمة "اضغط Space لكشف معلومات الحرف تدريجياً" كانت بـ `--fs-xs` و`--text-dim` و`italic` — ضعيفة للبروجكتور.

**التنفيذ** (CSS فقط):
- `font-size`: `var(--fs-xs)` → `var(--fs-sm)`
- `color`: `var(--text-dim)` → `var(--text-secondary)`
- `font-style`: `italic` → `normal`
- أضيف `font-weight: 500`
- لم يتغير النص.

### 3. Micro-Assessment بعد كشف الحروف

**المشكلة**: لا يوجد تقييم تكويني داخل P3.

**التنفيذ**:
- **View mode جديد**: `STATE.p3ViewMode = 'assess'` — يُضاف بعد Quad View.
- **التدفق**: Single → Quad → **Assess** → P4
  - من Quad: Space أو زر "التقييم السريع" → يبدأ التقييم
  - من Assess: Space = كشف الإجابة → Space = السؤال التالي → بعد 4 أسئلة = P4
  - زر "تخطّي التقييم" متاح دائماً → ينتقل مباشرة لـ P4
  - ← (retreat) يعمل بالكامل: يتراجع خطوة بخطوة حتى يعود لـ Quad

**النشاط**:
1. تُعرض الحروف الأربعة بأرقام أصابع (1-4)
2. المعلم يضغط زر الصوت 🔊 لتشغيل صوت حرف عشوائي
3. الطلاب يرفعون الأصبع المناسب
4. المعلم يضغط Space لكشف الإجابة (الحرف الصحيح يُبرز بـ ✓)
5. Space مرة أخرى = السؤال التالي

**الخصائص**:
- ترتيب عشوائي (Fisher-Yates shuffle) — مختلف كل مرة
- Teacher-Controlled بالكامل — لا إدخال طالب
- لا نظام درجات — لا تخزين نتائج
- قابل للتخطي — لا يعطل التدفق
- لا تأثير على P2 أو P4-P7

**الدوال الجديدة** (6 دوال):
- `p3StartAssess()` — تهيئة وترتيب عشوائي
- `renderP3Assess(container)` — رسم شاشة التقييم
- `p3AssessPlay()` — تشغيل صوت الحرف المطلوب
- `advanceP3Assess()` — كشف الإجابة أو الانتقال للسؤال التالي
- `p3SkipAssess()` — تخطي التقييم والانتقال لـ P4

**State جديد** (3 متغيرات):
- `STATE.p3AssessIndex` — فهرس السؤال الحالي
- `STATE.p3AssessRevealed` — هل الإجابة مكشوفة
- `STATE.p3AssessOrder` — ترتيب الحروف العشوائي

**Retreat handler محدّث**:
- Assess mode: ← يتراجع (إخفاء إجابة → سؤال سابق → عودة لـ Quad)
- Quad mode: ← يعود لآخر حرف في Single View (لم يكن موجوداً سابقاً)

---

## CSS الجديد

| Selector | الوظيفة |
|----------|---------|
| `.card-char-name` | اسم الحرف أسفل الشكل الكبير |
| `.p3-assess-header` | عنوان شاشة التقييم |
| `.p3-assess-badge` | شارة رقم السؤال (1/4) |
| `.p3-assess-title` | عنوان "استمع واختر الحرف" |
| `.p3-assess-subtitle` | تعليمة فرعية |
| `.p3-assess-play` | حاوية زر الصوت |
| `.p3-assess-sound-btn` | زر تشغيل الصوت |
| `.p3-assess-choices` | شبكة الخيارات (4 أعمدة) |
| `.p3-assess-choice` | بطاقة خيار واحد |
| `.p3-assess-choice.correct` | تمييز الإجابة الصحيحة |
| `.p3-assess-finger` | رقم الأصبع (1-4) |
| `.p3-assess-char` | شكل الحرف في الخيار |
| `.p3-assess-name` | اسم الحرف في الخيار |
| `.p3-assess-nav` | حاوية زر التخطي |
| Responsive `@media` | `.p3-assess-choices` → 2 أعمدة عند `≤900px` |

---

## القيود المُحترمة

| القيد | الحالة |
|-------|--------|
| لا تغيير في `lesson-01.js` | ✅ |
| لا تغيير في P2 | ✅ |
| لا تغيير في P4-P7 | ✅ |
| لا حذف Quad View | ✅ — يبقى كما هو |
| لا تغيير نظام الألوان | ✅ — يستخدم المتغيرات الموجودة |
| لا مكتبات خارجية | ✅ |
| لا تغيير معماري | ✅ — نفس نمط DATA→ENGINE→VIEW |
| Progressive Reveal محفوظ | ✅ |
| Grid Layout محفوظ | ✅ |
| Teacher Controlled | ✅ — كل شيء بـ Space / أزرار |

---

## نتائج التحقق

| الفحص | النتيجة |
|-------|---------|
| بنية JS (syntax) | ✅ لا أخطاء — جميع الدوال معرّفة ومرجعة بشكل صحيح |
| P3 Single View — اسم الحرف | ✅ `letter.name` يظهر أسفل الحرف الكبير |
| P3 Instruction visibility | ✅ `--fs-sm` + `--text-secondary` + `weight 500` |
| P3 Quad View | ✅ لم يتغير — نفس الهيكل |
| P3 Micro-Assessment | ✅ تدفق: Quad → Assess (4 أسئلة) → P4 |
| P3 Skip Assessment | ✅ زر "تخطّي التقييم" → P4 مباشرة |
| P3 Retreat (←) | ✅ يعمل في الاتجاهين عبر جميع الأوضاع |
| P2 regression | ✅ لا تعديل — الكود بدون تغيير |
| P4-P7 regression | ✅ لا تعديل — الدوال بدون تغيير |
| Emergency R/H | ✅ يعمل في single mode — لا تأثير على assess |
| Theme compatibility | ✅ جميع الألوان عبر CSS variables |
| Responsive | ✅ `.p3-assess-choices` → 2 أعمدة عند ≤900px |
