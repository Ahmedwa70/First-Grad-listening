# P4 Layout Analysis — تحليل مشكلة تخطيط مرحلة تدريب الكتابة

> تاريخ التحليل: 2026-08-08
> الحالة: ✅ تم التنفيذ — الحل B المعدّل مطبّق ومختبر

---

## 1. وصف المشكلة

عند الوصول إلى حرف **"ث"** (5 خطوات)، تظهر المشاكل التالية:

1. **النص مقطوع**: وصف الخطوة الخامسة "مراجعة" يحتوي على 81 حرفاً:
   > "النقطة الثالثة تكتمل الشكل — قوس + ثلاث نقاط فوق = ث — الفرق الوحيد هو عدد النقاط"
   
   لكنه يُعرض مقطوعاً بسبب `-webkit-line-clamp: 2` و `max-height: 2.7em` على `.p4-step-desc`.

2. **شريط التنقل يخرج من Viewport**: أسفل `.p4-nav` عند `y=748px` بينما الـ viewport هو `768px` — مقطوع جزئياً.

3. **جميع الأوصاف مقطوعة**: حتى مع 4 خطوات فقط (ب، ت، ن)، كل الأوصاف `truncated: true` (`scrollHeight: 27 > clientHeight: 22`).

4. **الحاوية لا تتكيف**: ارتفاع المحتوى الفعلي (5 خطوات) يتجاوز المساحة المتاحة، لكن الحاوية لا تنمو لأنها مقيّدة بـ `height: 100%`.

---

## 2. خريطة DOM

```
#p4-container                           ← height: 100% (646px)
├── .p4-header                          ← 72px
│   ├── .p4-progress-dots               ← أحرف التقدم (ب ت ث ن)
│   └── p.p4-instruction                ← "كيف نكتب — ثاء"
│
├── .p4-card-wrapper                    ← flex: 1 (497px)
│   └── .p4-card                        ← CSS Grid: 1fr 1fr (497px)
│       ├── .p4-svg-zone                ← 432px (منطقة الرسم)
│       │   ├── svg.stroke-svg          ← viewBox 100×80
│       │   └── button.p4-replay-btn    ← زر إعادة
│       │
│       └── .p4-steps-panel             ← 432px (قائمة الخطوات)
│           ├── .p4-step-item[0]        ← 76.8px ثابت
│           │   ├── .p4-step-num        ← ①
│           │   └── .p4-step-body
│           │       ├── .p4-step-label  ← "رسم الجسم"
│           │       └── .p4-step-desc   ← نص الوصف (مقطوع)
│           ├── .p4-step-item[1]        ← 76.8px ثابت
│           ├── .p4-step-item[2]        ← 76.8px ثابت
│           ├── .p4-step-item[3]        ← 76.8px ثابت
│           └── .p4-step-item[4]        ← 76.8px ثابت (ث فقط)
│
└── .p4-nav                             ← 60px (يخرج جزئياً من VP)
    ├── button.nav-btn                  ← السابق/التالي
    └── .p4-char-big                    ← الحرف الكبير
```

---

## 3. قواعد CSS المؤثرة

### 3.1 الحاوية الرئيسية
```css
.p4-container {
  height: 100%;           /* ← مقيّد بارتفاع الأب = 646px */
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);     /* 1.25rem = 20px */
}
```
**المشكلة**: `height: 100%` يجعل الحاوية ثابتة عند 646px بغض النظر عن المحتوى.

### 3.2 مجمّع البطاقة
```css
.p4-card-wrapper {
  flex: 1;                /* ← يأخذ ما تبقى بعد header + nav + gaps */
  display: flex;
  align-items: stretch;
}
```
المساحة المتبقية: `646 - 72 (header) - 60 (nav) - 40 (gaps) = 474px`
لكنه فعلياً 497px — مما يعني أن nav يُدفع خارج الحاوية.

### 3.3 بطاقة الخطوات
```css
.p4-card {
  display: grid;
  grid-template-columns: 1fr 1fr;    /* عمودان متساويان */
  gap: var(--gap-lg);                 /* 2rem = 32px */
  padding: var(--gap-lg);             /* 32px */
}
```
ارتفاع البطاقة يُحدَّد بالعمود الأطول.

### 3.4 عنصر الخطوة — القيد الأساسي ⚠️
```css
.p4-step-item {
  height: 4.8rem;          /* 76.8px — ثابت */
  min-height: 4.8rem;      /* لا يقل عن 76.8px */
  max-height: 4.8rem;      /* لا يزيد عن 76.8px — محبوس! */
  overflow: hidden;         /* يخفي ما يتجاوز */
  flex-shrink: 0;           /* لا ينكمش */
  flex-grow: 0;             /* لا ينمو */
}
.p4-step-item.active {
  height: 4.8rem;          /* نفس القيد حتى عند التفعيل */
  min-height: 4.8rem;
  max-height: 4.8rem;
}
```

### 3.5 نص الوصف — مقطوع بتصميم
```css
.p4-step-desc {
  max-height: 2.7em;               /* ≈ سطران */
  display: -webkit-box;
  -webkit-line-clamp: 2;           /* أقصى سطرين */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### 3.6 جسم الخطوة
```css
.p4-step-body {
  max-height: 100%;        /* مقيّد بالأب (76.8px) */
  overflow: hidden;
}
```

---

## 4. السبب الجذري

المشكلة **ليست مشكلة واحدة** بل سلسلة من القيود المتراكمة:

### السبب الأول: ارتفاع ثابت لعنصر الخطوة
`height/min-height/max-height: 4.8rem` على `.p4-step-item` يجعل كل خطوة محبوسة عند 76.8px بغض النظر عن طول النص. هذا مع `overflow: hidden` يقطع أي محتوى يتجاوز هذا الارتفاع.

### السبب الثاني: قطع النص بـ line-clamp
`.p4-step-desc` مقيّد بسطرين (`-webkit-line-clamp: 2` + `max-height: 2.7em`). نص "مراجعة" لحرف "ث" يحتاج 3 أسطر (`scrollHeight: 49` vs `clientHeight: 32`).

### السبب الثالث: الحاوية لا تنمو
`.p4-container { height: 100% }` يمنع النمو. حتى لو أُزيل القيد عن step-item، الحاوية لن تتمدد لأنها مقيّدة بارتفاع الأب.

### السبب الرابع: عدد الخطوات المتغير
حرف "ث" يحتوي 5 خطوات بينما البقية 4 خطوات. الارتفاع الثابت يعمل مع 4 خطوات لكن يفيض مع 5:

| الحرف | الخطوات | ارتفاع القائمة | النتيجة |
|-------|---------|----------------|---------|
| ب     | 4       | 4×76.8 + 3×12 = 343px | يتسع |
| ت     | 4       | 343px | يتسع |
| **ث** | **5**   | **5×76.8 + 4×12 = 432px** | **يفيض** |
| ن     | 4       | 343px | يتسع |

الفرق: 432 - 343 = **89px** إضافية عند حرف "ث".

---

## 5. الحلول الممكنة

### الحل A: إزالة القيود الثابتة + تفعيل auto-sizing
- إزالة `height/max-height: 4.8rem` من `.p4-step-item`
- إبقاء `min-height: 4.8rem` فقط لضمان حد أدنى
- إزالة `line-clamp` من `.p4-step-desc`
- تحويل `.p4-container` من `height: 100%` إلى `min-height: 100%` أو `max-height: 100%` مع `overflow-y: auto`

**المزايا**: المحتوى يحدد الحجم — Content-driven layout.
**المخاطر**: قد يتسبب في اختلاف أحجام الخطوات بين الحروف.

### الحل B: تقليص حجم الخطوة + السماح بتمدد النص
- تقليل `min-height` من `4.8rem` إلى `3.5rem`
- إزالة `max-height` الثابت
- السماح للخطوة النشطة بالتمدد (`max-height: none` على `.active`)
- إبقاء `line-clamp` على الخطوات غير النشطة فقط

**المزايا**: الخطوة النشطة تعرض النص كاملاً، البقية مضغوطة.
**المخاطر**: تغيّر حجم البطاقة مع كل خطوة — layout shift.

### الحل C: تصغير الخطوات غير النشطة + تكبير النشطة (Accordion)
- الخطوات غير النشطة: `height: 2.5rem` (label فقط، بدون desc)
- الخطوة النشطة: `min-height: 4.8rem; max-height: none` (تعرض الوصف كاملاً)
- `transition` على height للانتقال السلس

**المزايا**: حجم إجمالي ثابت تقريباً، النص الحالي يظهر كاملاً.
**المخاطر**: تعقيد CSS إضافي.

### الحل D: Scroll داخلي لقائمة الخطوات
- `.p4-steps-panel { overflow-y: auto; max-height: ...}`
- إبقاء أحجام الخطوات كما هي
- scroll تلقائي للخطوة النشطة

**المزايا**: لا تغيير في أحجام العناصر.
**المخاطر**: scroll داخل صفحة العرض الصفي غير مناسب — صعب القراءة من مسافة 3-5 أمتار.

---

## 6. التوصية النهائية

**الحل B المعدّل** هو الأنسب لفلسفة المشروع:

### التغييرات المقترحة:

#### في `css/style.css`:

1. **`.p4-step-item`**: إزالة `height` و `max-height` الثابتين، إبقاء `min-height: 3.2rem` فقط:
   ```css
   .p4-step-item {
     min-height: 3.2rem;
     /* إزالة height, max-height */
     /* إبقاء بقية الخصائص */
   }
   ```

2. **`.p4-step-item.active`**: إزالة `height/max-height` القيود:
   ```css
   .p4-step-item.active {
     /* إزالة height, min-height, max-height الثابتة */
     min-height: 3.2rem;
   }
   ```

3. **`.p4-step-desc`**: إزالة `line-clamp` و `max-height` للخطوة النشطة:
   ```css
   .p4-step-item.active .p4-step-desc {
     -webkit-line-clamp: unset;
     max-height: none;
   }
   ```

4. **`.p4-step-body`**: إزالة `max-height: 100%`:
   ```css
   .p4-step-body {
     /* إزالة max-height: 100% */
   }
   ```

5. **`.p4-container`**: تحويل من `height: 100%` إلى `min-height: 100%`:
   ```css
   .p4-container {
     min-height: 100%;
     /* أو max-height: 100% مع overflow-y: auto كخطة بديلة */
   }
   ```

#### في `js/app.js`:
- **لا تغيير** في منطق `renderP4()` أو `renderP4Card()`.
- **لا تغيير** في بيانات `lesson-01.js`.

### لماذا هذا الحل:

| المعيار | التقييم |
|---------|---------|
| Content-driven layout | النص يحدد حجم الخطوة النشطة |
| Responsive | `min-height` مرن بدل `height` ثابت |
| Classroom-friendly | النص الكامل مقروء من 3-5 أمتار |
| RTL-safe | لا تأثير على اتجاه النص |
| لا يكسر مراحل أخرى | التغييرات محصورة في `.p4-*` selectors |
| أقل تعديل معماري | 4-5 قواعد CSS فقط، لا JS |

---

## 7. الملفات التي ستتأثر عند التنفيذ

| الملف | نوع التعديل |
|-------|-------------|
| `css/style.css` | تعديل 4-5 قواعد CSS في منطقة P4 |
| `js/app.js` | لا تعديل |
| `js/lesson-01.js` | لا تعديل |
| `lecture-01.html` | لا تعديل |

---

## 8. قياسات مرجعية (Viewport: 1366×768)

### حرف "ب" (4 خطوات) — الحالة الطبيعية:
- Container: 646px
- Steps panel: 343px (4 × 76.8 + 3 × 12)
- Nav visible: نعم

### حرف "ث" (5 خطوات) — الحالة المشكلة:
- Container: 646px (نفس الارتفاع المقيّد)
- Steps panel: 432px (5 × 76.8 + 4 × 12)
- Nav bottom: 748px > viewport 768px (مقطوع)
- خطوة "مراجعة" desc: scrollHeight=49 > clientHeight=32 (مقطوع)

### كل الأوصاف مقطوعة في جميع الحروف:
- حتى مع 4 خطوات، `scrollHeight (27) > clientHeight (22)` في كل desc
- السبب: `line-clamp: 2` + `max-height: 2.7em` يقطع حتى النصوص القصيرة
