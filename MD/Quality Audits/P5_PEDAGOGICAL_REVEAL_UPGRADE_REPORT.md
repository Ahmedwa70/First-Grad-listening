# P5 Pedagogical Reveal Upgrade Report
# تقرير ترقية الكشف التدريجي التربوي في P5

> **التاريخ:** 2026-08-14
> **النطاق:** P5 فقط — لم تتأثر أي مرحلة أخرى (P1-P4, P6-P7)
> **الملفات المعدّلة:** `js/app.js` | `css/style.css`
> **الملفات المجمّدة (لم تُعدَّل):** `js/lesson-01.js` | `lecture-01.html`
> **الحالة:** مكتمل — اختبار Regression: PASS

---

## 1. ملخص التغييرات

### 1.1 نظام كشف تدريجي جديد من 5 خطوات (كان 4)

**قبل (lesson-01.js — 4 خطوات):**
```
word → target → audio → meaning
```

**بعد (P5_REVEAL_STEPS — 5 خطوات):**
```
word (بدون تلوين) → تمييز الحرف → اسم الحرف → الصوت → المعنى
```

**التبرير التربوي:**
- فصل المعلومات يمنع الحمل المعرفي الزائد (Cognitive Load Theory)
- الطالب يرى الكلمة أولاً بدون أي تمييز لوني — يقرأها كوحدة
- ثم يُبرَز الحرف المستهدف بالتلوين (خطوة مستقلة)
- ثم اسم الحرف يظهر منفصلاً عن صوته
- ثم الصوت (مع التشغيل التلقائي)
- أخيراً المعنى (إيموجي + عربي + صيني)

### 1.2 فصل اسم الحرف عن صوته

**قبل:** `.p5-target-label` واحد يعرض الاسم والصوت معاً
**بعد:** عنصران منفصلان:
- `.p5-target-name` — اسم الحرف (مثال: باء)
- `.p5-target-phoneme` — صوت الحرف (مثال: /ب/)

يتم التحكم بظهورهما عبر CSS classes:
- `name-visible` — يظهر عند step ≥ 2
- `phoneme-visible` — يظهر عند step ≥ 3

### 1.3 تلوين الحرف المستهدف عبر CSS Variable

**قبل:** `style="color:${word.color}"` — التلوين مباشر دائماً
**بعد:** `style="--tc:${word.color}"` — CSS variable يُفعَّل فقط عند `.target-active`

هذا يعني أن الحرف المستهدف في الكلمة لا يظهر ملوناً عند خطوة `word` (step 0)، بل يُلوَّن فقط عند step ≥ 1 عبر:
```css
.p5-card.target-active .p5-target-char { color: var(--tc); }
```

### 1.4 معالجة كلمة "باب" — الموضع الأول فقط

**المشكلة:** كلمة "باب" تحتوي على حرف ب في موضعين (0 و 2). عرض كليهما يُربك المبتدئين.
**الحل:** دالة `p5DisplayPositions(word)` تُرجع الموضع الأول فقط إذا تعددت المواضع.

```javascript
function p5DisplayPositions(word) {
  return word.targetPositions.length > 1 ? [word.targetPositions[0]] : word.targetPositions;
}
```

تُستخدم في: `renderP5()`, `renderP5Quad()`, شريط التاريخ (history strip).

### 1.5 إزالة الإنجليزية من عرض المعنى

**قبل:** `'باب (door)'` — يظهر الإنجليزي
**بعد:** `word.meaning.replace(/\s*\(.*?\)\s*$/, '')` — يُحذف النص بين الأقواس

يُطبَّق في: `renderP5()` (Single View) و `renderP5Quad()` (Quad View).

### 1.6 تحسين Assess — إضافة علامة الحرف المستهدف

**قبل:** كل خيار يعرض: رقم الإصبع + إيموجي + كلمة
**بعد:** كل خيار يعرض: رقم الإصبع + إيموجي + كلمة + **حرف مستهدف ملوّن**

```html
<span class="p5-assess-letter-tag" style="color:${w.letter.color}">${w.letter.char}</span>
```

**تلميح الإجابة محسّن:**
```
قبل: الإجابة: باب (🚪) — اضغط Space للسؤال التالي
بعد: الإجابة: باب — الحرف: ب (باء) — اضغط Space للسؤال التالي
```

هذا يعزز ربط الحرف بالكلمة (letter-in-word recognition) بدلاً من حفظ الكلمة فقط.

---

## 2. التفاصيل التقنية

### 2.1 الثوابت الجديدة (app.js)

| الثابت/الدالة | السطر | الوصف |
|---------------|-------|-------|
| `P5_REVEAL_STEPS` | 1198 | مصفوفة 5 خطوات كشف — تتجاوز 4 خطوات lesson-01.js |
| `p5DisplayPositions()` | 1206 | تحدّ من مواضع الحرف المستهدف للموضع الأول فقط |

### 2.2 الدوال المعدّلة

| الدالة | التغيير |
|--------|---------|
| `advanceP5()` | `maxStep = P5_REVEAL_STEPS.length - 1` (كان 3). التشغيل التلقائي عند step 3 (كان 2) |
| `renderP5()` | إضافة `displayPos`، تلوين عبر `--tc`، فصل name/phoneme، حذف الإنجليزية، history strip يستخدم `p5DisplayPositions()` |
| `renderP5Card()` | إعادة كتابة كاملة: 5 خطوات بدل 4، classes جديدة (`target-active`, `name-visible`, `phoneme-visible`) |
| `p5PrevWord()` | `P5_REVEAL_STEPS.length - 1` بدل 3 |
| `renderP5Quad()` | `p5DisplayPositions()` + حذف الإنجليزية |
| `renderP5Assess()` | إضافة `letter` object + `.p5-assess-letter-tag` + تلميح محسّن |
| Retreat handler (case P5) | `P5_REVEAL_STEPS.length - 1` في quad→single و word→word |
| Emergency reveal (case P5) | `P5_REVEAL_STEPS.length - 1` |

### 2.3 تسلسل الكشف التدريجي الجديد

```
Step -1: لا شيء ظاهر (الحالة الأولية)
Step  0: الكلمة كاملة — بدون تلوين الحرف المستهدف
Step  1: تمييز الحرف — الحرف المستهدف يُلوَّن + بطاقة التمييز تظهر
Step  2: اسم الحرف — يظهر (مثال: باء)
Step  3: الصوت — صوت الحرف يظهر + التشغيل التلقائي
Step  4: المعنى — إيموجي + عربي + صيني
```

### 2.4 CSS Classes الجديدة (مطلوبة)

| Class | الوظيفة | تُضاف على |
|-------|---------|-----------|
| `target-active` | تفعيل تلوين الحرف المستهدف | `.p5-card` |
| `name-visible` | إظهار اسم الحرف | `#p5-target` |
| `phoneme-visible` | إظهار صوت الحرف | `#p5-target` |

### 2.5 HTML Structure (Single View — لم يتغير HTML الملف)

```
.p5-card[data-word]
  ├── #p5-word.reveal-block
  │     └── .p5-word-display
  │           └── .p5-char / .p5-target-char[style="--tc:COLOR"]
  ├── #p5-target.reveal-block
  │     └── .p5-highlight-box
  │           ├── .p5-target-letter
  │           ├── .p5-target-name      ← جديد (كان .p5-target-label)
  │           └── .p5-target-phoneme   ← جديد
  ├── #p5-audio.reveal-block
  │     └── .p5-play-btn + .ctrl-btn.choral
  └── #p5-meaning.reveal-block
        └── .p5-meaning-box
```

---

## 3. ما لم يُعدَّل (بالتصميم)

- ❌ `lecture-01.html` — لا تغيير
- ❌ `lesson-01.js` — مجمّد، لا تغيير
- ❌ P1-P4, P6-P7 — لا تأثر
- ❌ معمارية DATA → ENGINE → VIEW — محافظ عليها
- ❌ QD-16 (الرموز الصوتية /ب/ وليس /b/) — لا تغيير

---

## 4. تعديلات CSS المنفّذة

تم تعديل `css/style.css` لتفعيل نظام الكشف الجديد:

| القاعدة | الوظيفة |
|---------|---------|
| `.p5-target-char` | لون محايد `var(--text-primary)` افتراضياً + transition |
| `.p5-card.target-active .p5-target-char` | تفعيل التلوين `color: var(--tc)` |
| `.p5-target-char::after` | خط سفلي مخفي `opacity: 0` افتراضياً |
| `.p5-card.target-active .p5-target-char::after` | إظهار الخط `opacity: 0.7` |
| `.p5-target-name`, `.p5-target-phoneme` | مخفيان `opacity: 0; max-width: 0` + transition |
| `#p5-target.name-visible .p5-target-name` | إظهار اسم الحرف |
| `#p5-target.phoneme-visible .p5-target-phoneme` | إظهار صوت الحرف |
| `.p5-assess-letter-tag` | تنسيق علامة الحرف في التقييم |

استُبدل `.p5-target-label` القديم بـ `.p5-target-name` و `.p5-target-phoneme`.

---

## 5. اختبار Regression

### 5.1 P5 — الكشف التدريجي (5 خطوات)

| الخطوة | المتوقع | النتيجة |
|--------|---------|---------|
| Step -1 | بطاقة فارغة | ✅ |
| Step 0 (word) | الكلمة بدون تلوين الحرف | ✅ |
| Step 1 (target) | الحرف الأول فقط ملوّن + خط سفلي + بطاقة التمييز | ✅ |
| Step 2 (name) | اسم الحرف يظهر (مثال: باء) | ✅ |
| Step 3 (audio) | صوت الحرف (/ب/) + زر تشغيل | ✅ |
| Step 4 (meaning) | إيموجي + عربي + صيني — بدون إنجليزي | ✅ |

### 5.2 باب — الموضع الأول فقط

| العرض | المتوقع | النتيجة |
|-------|---------|---------|
| Single (step 1) | ب الأولى ملوّنة، ب الثانية محايدة | ✅ |
| Quad | ب الأولى فقط ملوّنة | ✅ |
| History strip | ب الأولى فقط | ✅ |

### 5.3 التراجع (Retreat)

| المسار | النتيجة |
|--------|---------|
| step 2→1→0→-1 | ✅ |
| quad → single (آخر كلمة، step 4) | ✅ |
| assess (index 0, unrevealed) → quad | ✅ |

### 5.4 Assess — علامة الحرف

| الفحص | النتيجة |
|-------|---------|
| كل خيار يعرض حرف مستهدف ملوّن | ✅ |
| تلميح الإجابة يحتوي اسم الحرف | ✅ |

### 5.5 انحدار المراحل الأخرى

| المرحلة | الحالة |
|---------|--------|
| P1 — الافتتاح | ✅ |
| P2 — الصوت أولاً | ✅ |
| P3 — كشف الحروف | ✅ |
| P4 — تدريب الكتابة | ✅ |
| P6 — التمييز السمعي | ✅ |
| P7 — التقييم الختامي | ✅ |
| Console errors | ✅ صفر أخطاء |

---

## 6. القيود المحترمة

- ✅ لم يُعاد بناء P5 — تعديلات دقيقة فقط
- ✅ لم تتغير المعمارية (DATA → ENGINE → VIEW)
- ✅ لم يتغير HTML
- ✅ لم يُعدَّل lesson-01.js
- ✅ لا مكتبات خارجية
- ✅ يعمل offline (file:// protocol)
- ✅ لا تأثير على P1-P4 أو P6-P7
