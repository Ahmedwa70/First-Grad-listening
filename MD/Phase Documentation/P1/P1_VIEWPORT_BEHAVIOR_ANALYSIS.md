# P1 Viewport Behavior Analysis — تحليل سلوك العرض في مرحلة الافتتاح

> تاريخ التحليل: 2026-08-08
> الحالة: ✅ تم التنفيذ والتحقق
> النطاق: P1 فقط — لا تأثير على P2–P7

---

## 1. الحالة الحالية

### كيف يعمل P1 الآن

P1 (افتتاح الدرس) تتكون من 4 خطوات تُكشف تدريجياً:

| الخطوة | content ID | المحتوى | التلميح |
|--------|-----------|---------|---------|
| P1-S1 | `p1-title` | عنوان الدرس + الحروف الكبيرة | لبدء الدرس اضغط (مسطرة) |
| P1-S2 | `p1-welcome` | مربع ترحيب + اتجاه الكتابة RTL | اضغط Space لعرض الأبجدية |
| P1-S3 | `p1-alphabet` | شبكة الأبجدية العربية (28 حرفاً) | اضغط Space لتمييز الحروف |
| P1-S4 | `p1-highlight` | تمييز الحروف الأربعة المستهدفة | اضغط Space للانتقال لمرحلة الصوت |

### آلية الكشف

كل الخطوات موجودة في DOM منذ `initP1()`. الكشف يتم عبر **class toggle** فقط:

```
.p1-block          →  opacity: 0; transform: translateY(18px); pointer-events: none
.p1-block.visible  →  opacity: 1; transform: translateY(0); pointer-events: auto
```

الانتقال: `transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out)`

### المشكلة

عند كشف `p1-alphabet` (شبكة 28 حرفاً) أو `p1-highlight`، المحتوى الجديد يظهر **أسفل viewport**. المعلم يضطر لعمل scroll يدوي — مما يكسر تجربة العرض الصفي.

---

## 2. دورة حياة P1

```
Teacher Input (Space / →)
        │
        ▼
document.addEventListener('keydown')     ← app.js:1835
        │
        ▼
advance()                                 ← app.js:227
        │
        ▼
advanceP1()                               ← app.js:325
  ├── STATE.currentStep++                 ← state update
  └── renderP1()                          ← app.js:335
        │
        ├── إزالة .visible من كل .p1-block
        ├── إضافة .visible للخطوات 0..currentStep
        ├── updateHint(step.hint)
        └── (step === 'highlight') → إضافة .target للحروف المستهدفة
        │
        ▼
CSS Transition (--dur-slow ≈ 500ms)
        │
        ▼
العنصر الجديد يصبح مرئياً
        │
        ▼
⚠️ لا يوجد auto-scroll → المعلم يحتاج scroll يدوي
```

### خريطة المسؤوليات

| الوظيفة | المسؤولية | الملف | السطر |
|---------|----------|-------|-------|
| `advance()` | توجيه حسب المرحلة | app.js | 227 |
| `advanceP1()` | زيادة step + استدعاء render | app.js | 325 |
| `renderP1()` | toggle class `visible` + hint | app.js | 335 |
| `buildP1HTML()` | بناء DOM (مرة واحدة فقط) | app.js | 359 |
| `.p1-block` CSS | تحريك الظهور | style.css | 660 |

---

## 3. تحديد العنصر الهدف للـ scroll

عند كل ضغطة Space، **آخر عنصر يُكشف** هو الهدف:

```javascript
// في renderP1()، الخطوة الحالية هي:
const step = phase.steps[STATE.currentStep];
// العنصر الهدف:
const targetEl = document.getElementById('p1-' + step.content);
```

| currentStep | content | العنصر الهدف |
|-------------|---------|-------------|
| 0 | title | `#p1-title` |
| 1 | welcome | `#p1-welcome` |
| 2 | alphabet | `#p1-alphabet` ← هنا تبدأ المشكلة |
| 3 | highlight | `#p1-highlight` |

---

## 4. نقطة التحكم المناسبة

### الخيارات المدروسة

| الخيار | المكان | لماذا لا |
|--------|--------|----------|
| ❌ keyboard listener | `keydown` handler | عام — يؤثر على كل المراحل |
| ❌ `advance()` | switch statement | عام — يؤثر على كل المراحل |
| ❌ تعديل scroll عام | `#content-zone` CSS | يغير سلوك P2–P7 |
| ✅ **`renderP1()`** | بعد إضافة `.visible` | **خاص بـ P1، يُنفذ فقط بعد تفاعل المعلم** |

### لماذا `renderP1()` هو المكان الصحيح

1. **خاص بـ P1**: لا تُستدعى في أي مرحلة أخرى
2. **بعد state update**: `STATE.currentStep` محدّثة — نعرف العنصر الجديد
3. **بعد DOM change**: `.visible` مُضافة — العنصر جاهز للقياس
4. **بتفاعل المعلم فقط**: `renderP1()` تُستدعى من `advanceP1()` أو `retreat/P1` — دائماً بفعل المعلم
5. **لا تُستدعى تلقائياً**: لا يوجد timer أو observer يستدعيها

### متى يجب تنفيذ scroll

ليس فوراً — يجب انتظار بدء CSS transition. العنصر عند إضافة `.visible` لا يزال `opacity: 0` لحظياً. الحل: `requestAnimationFrame` أو `setTimeout` قصير لضمان بدء العنصر في الظهور قبل حساب موقعه.

---

## 5. القرار المعماري — اختيار الحل

### الحلول المقارنة

| الحل | المزايا | العيوب | التقييم |
|------|---------|--------|---------|
| `scrollIntoView({behavior:'smooth', block:'center'})` | بسيط، مدعوم، يضع العنصر في الوسط | لا تحكم دقيق في التوقيت | ⭐⭐⭐⭐ |
| `window.scrollTo()` | تحكم كامل | يحتاج حسابات يدوية | ⭐⭐⭐ |
| حساب position + `scrollTo` | أدق تحكم | تعقيد غير ضروري | ⭐⭐ |
| `scrollIntoView` + `requestAnimationFrame` | يضمن جاهزية DOM | أفضل توقيت | ⭐⭐⭐⭐⭐ |

### الحل المختار

**`scroller.scrollTo()` على `#content-zone` داخل `renderP1()` مع `setTimeout(80)`**

السبب:
1. **حساب centerOffset يدوي** يضع العنصر في منتصف `#content-zone` — مثالي للبروجكتور
2. **`behavior: 'smooth'`** حركة سلسة — لا قفزة مفاجئة
3. **`setTimeout(80)`** يضمن أن المتصفح أكمل reflow بعد إضافة `.visible` (rAF وحده لا يكفي)
4. **بدون dependencies** — API مدمج في المتصفح
5. **لا يؤثر على scroll في مراحل أخرى** — الاستدعاء محصور في `renderP1()`

### لماذا تغيّر الحل عن التحليل الأولي

- **`scrollIntoView`** يبحث عن **أقرب scrollable ancestor** — في هذا التطبيق يتخطى `#content-zone` ويحرّك `window` بدلاً منه. هذا أحدث scroll غير مرغوب على مستوى الصفحة.
- **`requestAnimationFrame`** يطلق قبل أن يكمل المتصفح reflow بعد toggle `.visible` — `scrollTop` يبقى 0. `setTimeout(80)` يعطي المتصفح وقتاً كافياً لحساب الأبعاد الجديدة.
- **الحل النهائي**: `scroller.scrollTo({top: centerOffset, behavior: 'smooth'})` مباشرة على `#content-zone` — تحكم كامل بالحاوية الصحيحة.

### لماذا ليس scroll عاماً

- P2–P7 مصممة لتكون **شاشة واحدة** (لا scroll). إضافة auto-scroll لها لا معنى لها بل قد تكسرها.
- P1 فريدة: المحتوى يتراكم عمودياً (4 blocks تُضاف فوق بعضها)، بينما المراحل الأخرى تستبدل المحتوى كلياً عبر `innerHTML`.
- P4 لها نظام container architecture خاص (QD-08/QD-09) يمنع scroll أصلاً.

### لماذا ليس في keyboard listener

- keyboard listener يُعالج كل المراحل. إضافة scroll هناك تتطلب `if (phase === 'P1')` — هذا يكسر separation of concerns.
- المبدأ المعماري: كل مرحلة تتحكم بسلوكها الخاص عبر دوالها (`initP<n>/advanceP<n>/renderP<n>`).

---

## 6. شرط عدم التأثير على P2–P7

| الحماية | الآلية |
|---------|-------|
| الكود محصور في `renderP1()` | لا تُستدعى من أي مرحلة أخرى |
| لا تعديل على CSS scroll | `#content-zone { overflow: auto }` يبقى كما هو |
| لا تعديل على `advance()` | التوجيه العام لا يتغير |
| لا state عام جديد | لا متغيرات عامة مضافة |
| لا تعديل على keyboard handler | Space/← يعملان كما هو |

---

## 7. التنفيذ المقترح

```javascript
function renderP1() {
  const phase = getCurrentPhase();
  const step = phase.steps[STATE.currentStep];

  document.querySelectorAll('.p1-block').forEach(el => el.classList.remove('visible'));

  for (let i = 0; i <= STATE.currentStep; i++) {
    const s = phase.steps[i];
    const el = document.getElementById('p1-' + s.content);
    if (el) el.classList.add('visible');
  }

  updateHint(step.hint);

  if (step.content === 'highlight') {
    document.querySelectorAll('.alpha-char').forEach(ch => {
      ch.classList.remove('target');
      if (LESSON_01.targetLetterIds.includes(ch.dataset.char)) {
        ch.classList.add('target');
      }
    });
  }

  // P1 auto-scroll: العنصر المكشوف الجديد يتمركز في content-zone
  if (STATE.currentStep > 0) {
    const targetEl = document.getElementById('p1-' + step.content);
    const scroller = document.getElementById('content-zone');
    if (targetEl && scroller) {
      setTimeout(() => {
        const elTop = targetEl.offsetTop - scroller.offsetTop;
        const centerOffset = elTop - (scroller.clientHeight - targetEl.offsetHeight) / 2;
        scroller.scrollTo({ top: Math.max(0, centerOffset), behavior: 'smooth' });
      }, 80);
    }
  }
}
```

### لماذا `STATE.currentStep > 0`

الخطوة الأولى (title) تكون في أعلى الصفحة — لا حاجة لـ scroll. الـ scroll يبدأ من الخطوة الثانية فصاعداً.

---

## 8. خطة الاختبار

| الاختبار | المتوقع |
|----------|---------|
| P1-S1 → P1-S2 (title → welcome) | scroll سلس، welcome في وسط الشاشة |
| P1-S2 → P1-S3 (welcome → alphabet) | scroll سلس، شبكة الأبجدية في الوسط |
| P1-S3 → P1-S4 (alphabet → highlight) | scroll سلس، رسالة التمييز في الوسط |
| P1-S4 → P2 (highlight → next phase) | انتقال طبيعي لـ P2، لا scroll غير مطلوب |
| فتح P1 مباشرة | لا scroll — الخطوة الأولى في الأعلى |
| ← (retreat) في P1 | scroll للخلف سلس |
| P2/P3/P4 | لا تأثير — لا scroll تلقائي |
| Light/Dark mode | لا فرق في السلوك |
| 1366×768 | يعمل بشكل صحيح |

---

## 9. نتائج الاختبار الفعلية

> تاريخ الاختبار: 2026-08-08
> الدقة: 1366×768 (inner viewport)
> المتصفح: Browser Preview

| الاختبار | النتيجة | القياس |
|----------|---------|--------|
| P1-S1 (title — step 0) | لا scroll (مرئي بالكامل) ✅ | `scrollTop=0` — الشرط `currentStep > 0` يمنع scroll |
| P1-S1 → P1-S2 (welcome — step 1) | scroll سلس للوسط ✅ | `scrollTop=211` — welcome متمركز (فرق 44px من المركز المثالي) |
| P1-S2 → P1-S3 (alphabet — step 2) | scroll لأقصى حد ✅ | `scrollTop=481` (maxScroll) — الأبجدية قرب نهاية المحتوى، لا يمكن توسيطها |
| P1-S3 → P1-S4 (highlight — step 3) | scroll لأقصى حد ✅ | `scrollTop=479` — العنصر الأخير مرئي |
| P4 (regression) | لا تأثير ✅ | `scrollTop=0`, `scrollH=clientH=677` — لا scroll أصلاً |

### ملاحظات

1. **Steps 2 و 3 لا يمكن توسيطها**: لأن المحتوى ينتهي قريباً بعدها — `centerOffset` المحسوب (527+) أكبر من `maxScroll` (481). المتصفح يقصّ تلقائياً عند الحد الأقصى. هذا سلوك صحيح ومتوقع.
2. **لا تأثير على P2–P7**: الكود محصور في `renderP1()` التي لا تُستدعى من أي مرحلة أخرى.
3. **التوافق مع فلسفة المشروع**: المعلم يتحكم (Space) → الكشف يحدث → الشاشة تتابع. لا حركة تلقائية بدون تفاعل المعلم.
