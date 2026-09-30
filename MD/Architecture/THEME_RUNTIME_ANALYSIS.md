# THEME_RUNTIME_ANALYSIS.md — تحليل معماري لتشغيل نظام Theme في Runtime

> تاريخ التحليل: 2026-08-07
> الحالة: تحليل وتخطيط فقط — لم يُنفَّذ أي كود.
> المتطلب: Phase 3A — تصميم Runtime Theme Switching قبل أي تنفيذ.
> السياق: Phase 1 (Theme Tokens) و Phase 2 (CSS Migration) مكتملتان.

---

## 1. الهدف

تصميم أفضل طريقة لإضافة Runtime Theme Switching (Dark ↔ Light) للمشروع مع الحفاظ الكامل على:

- **Classroom Application** — ليس موقع ويب تقليدي.
- **Offline First** — لا اعتماد على إنترنت أو مكتبات خارجية.
- **Fixed Classroom Shell** — `height: 100vh; overflow: hidden` على `.app-layout`.
- **Teacher HUD ثابت** — شريط 44px في الأعلى.
- **Content Zone متكيف** — `overflow: auto` على `#content-zone`.
- **P1 → P7** — جميع المراحل بنفس الجودة في الوضعين.
- **Dark Mode = الافتراضي** — الهوية الأساسية للمشروع.

---

## 2. الوضع الحالي (بعد Phase 1 + Phase 2)

### 2.1 ما تم إنجازه

| المرحلة | الحالة | الوصف |
|---|---|---|
| Phase 1 — Theme Tokens | ✅ مكتمل | 30 متغير `--th-*` في `:root` + كتلة `[data-theme="light"]` كاملة |
| Phase 2 — CSS Migration | ✅ مكتمل | ~80 لون مشفر استُبدل بمتغيرات semantic عبر P1–P7 |

### 2.2 البنية الحالية في style.css

```
:root {
  /* ألوان أساسية (ثابتة) */
  --navy, --teal, --gold, --bg-main, --bg-card, --text-primary...
  
  /* Theme Tokens (30 متغير --th-*) */
  --th-bg-body, --th-bg-surface, --th-bg-card...
  --th-border-subtle, --th-border-default, --th-border-strong...
  --th-text-primary, --th-text-secondary, --th-text-dim...
  --th-hud-bg, --th-ctrl-bg, --th-shadow-sm/md/lg...
  --th-success, --th-error, --th-gold-bg/border/hover...
}

[data-theme="light"] {
  /* 30 قيمة بديلة — جاهزة لكن غير مفعّلة */
  --th-bg-body: #F0F4F8;
  --th-text-primary: #1A202C;
  /* ... */
  --color-tha: #7C4DDB;  /* تعتيم طفيف للـ contrast */
  --color-nun: #A8851E;
}
```

### 2.3 جاهزية المشروع

| المعيار | الحالة |
|---|---|
| Theme Tokens معرّفة | ✅ 30 token في `:root` و `[data-theme="light"]` |
| CSS يستخدم Tokens | ✅ ~80 استخدام محوّل عبر P1–P7 |
| `[data-theme="light"]` موجودة | ✅ جاهزة للتفعيل |
| `body` يستخدم `var(--bg-main)` | ✅ جاهز |
| ألوان الحروف محمية | ✅ هوية تعليمية ثابتة (+ تعتيم ث/ن في light) |
| SVG في app.js | ⚠️ 5 أسطر `rgba(255,255,255,*)` مشفرة في P4 |
| Retreat button | ⚠️ 4 قيم `rgba(255,255,255,*)` خاصة (حالات الزر) |
| localStorage | لا يُستخدم حالياً |

**الخلاصة: المشروع جاهز بنسبة ~95% — يحتاج فقط: دالة JS (~10 أسطر) + زر HTML واحد + سكريبت FOUC في `<head>`.**

---

## 3. تحليل مكان زر Theme

### 3.1 مقارنة المواقع المرشحة

| المعيار | A) HUD — منطقة الأيقونات | B) Help Panel (زر ؟) | C) مكان مستقل | D) Controls Bar السفلي |
|---|---|---|---|---|
| **سهولة وصول المعلم** | ✅ نقرة واحدة — مرئي دائماً | ⚠️ نقرتان — فتح القائمة أولاً | ✅ نقرة واحدة | ✅ نقرة واحدة |
| **عدم تشتيت الطلاب** | ✅ منطقة صغيرة هادئة — الطلاب لا يركزون على HUD | ✅ مخفي تماماً داخل القائمة | ⛔ عنصر جديد مرئي للطلاب | ⚠️ قريب من أزرار التفاعل |
| **توافق Classroom Workflow** | ✅✅ نفس نمط ⛶ و ◎ — المعلم يعرف المكان | ⚠️ يحتاج تذكّر أن الخيار داخل القائمة | ⚠️ يكسر النمط المعتمد | ⚠️ يزاحم تقدم/تراجع |
| **تأثير على ارتفاع HUD** | ✅ صفر — نفس ارتفاع 44px (أيقونة 1.9rem) | ✅ صفر — داخل القائمة | ⚠️ قد يحتاج مساحة إضافية | ✅ صفر — ضمن الشريط |
| **تأثير على Responsive** | ✅ لا — الأيقونة صغيرة (1.9rem × 1.9rem) | ✅ لا | ⚠️ يحتاج responsive rules | ✅ لا |
| **اتساق التصميم** | ✅✅ نفس `.hud-icon-btn` الموجود | ⚠️ يحتاج تصميم داخل القائمة | ⛔ يحتاج تصميم جديد كلياً | ⚠️ يحتاج تصميم مختلف |

### 3.2 القرار: A) Teacher HUD — منطقة الأيقونات اليسرى

**الموقع الدقيق**: `div.hud-controls` — بين زر المؤقت وزر المساعدة (؟).

```
المنطقة اليسرى الحالية:
[المؤقت] [؟ مساعدة] [⛶ شاشة كاملة] [◎ انتباه]

بعد إضافة الزر:
[المؤقت] [☀ وضع] [؟ مساعدة] [⛶ شاشة كاملة] [◎ انتباه]
```

**الأسباب:**

1. **نمط موحد**: نفس class `.hud-icon-btn` المستخدم لـ ⛶ و ◎ — لا CSS جديد للزر نفسه.
2. **نقرة واحدة**: المعلم يرى الأيقونة ويضغط — لا قائمة ولا خطوات إضافية.
3. **منطقة المعلم فقط**: HUD مصمم ليكون هادئاً — أيقونات صغيرة (0.75rem) بلون `--text-dim` — الطلاب لا ينتبهون لها.
4. **لا تأثير على الارتفاع**: أيقونة 1.9rem × 1.9rem — نفس حجم الأزرار الحالية.
5. **لا تأثير على Responsive**: الأيقونات تتدفق أفقياً مع `gap` — إضافة واحدة لا تكسر أي layout.
6. **سبب رفض B**: المعلم قد يحتاج تبديل الوضع بسرعة أثناء الدرس (مثلاً: إضاءة الفصل تغيرت) — نقرتان بطيئة جداً.
7. **سبب رفض C/D**: كسر النمط المعتمد + تشتيت بصري غير مبرر.

---

## 4. تحليل تصميم الزر

### 4.1 الشكل العام

الزر يستخدم `.hud-icon-btn` الموجود — لا تصميم جديد مطلوب.

| الخاصية | القيمة | المصدر |
|---|---|---|
| العرض × الارتفاع | `1.9rem × 1.9rem` | `.hud-icon-btn` الحالي |
| الشكل | مربع مدور `border-radius: 5px` | `.hud-icon-btn` الحالي |
| الخلفية | `transparent` | `.hud-icon-btn` الحالي |
| اللون | `var(--text-dim)` → `var(--text-primary)` عند hover | `.hud-icon-btn` الحالي |
| الحد | `1px solid var(--th-border-default)` → `var(--th-border-strong)` عند hover | `.hud-icon-btn` الحالي |
| الحجم | `0.75rem` | `.hud-icon-btn` الحالي |

### 4.2 الأيقونة

| الوضع الحالي | الأيقونة المعروضة | title (tooltip) | المعنى |
|---|---|---|---|
| Dark (الافتراضي) | ☀ | "الوضع النهاري" | الزر يُظهر ما سيحدث عند الضغط |
| Light | ☾ | "الوضع الليلي" | الزر يُظهر ما سيحدث عند الضغط |

**لماذا ☀/☾ (Unicode) وليس SVG؟**
- الأزرار الحالية (⛶ و ◎) تستخدم Unicode — الاتساق.
- لا ملفات إضافية — Offline First.
- الحجم صغير (0.75rem) — Unicode كافٍ ومقروء.

### 4.3 حالات الزر

| الحالة | الوصف | السلوك |
|---|---|---|
| **Default (Dark)** | أيقونة ☀ بلون `--text-dim` | هادئ — لا يلفت الانتباه |
| **Default (Light)** | أيقونة ☾ بلون `--th-text-dim` | هادئ — نفس السلوك |
| **Hover** | اللون يتحول لـ `--text-primary` + الحد يتحول لـ `--th-border-strong` | نفس سلوك ⛶ و ◎ |
| **Active (click)** | `transform: scale(0.92)` لـ 100ms | إحساس بالضغط — نفس أزرار النظام |
| **Focus-visible** | `outline: 3px solid var(--gold)` | Accessibility — القاعدة العامة الموجودة |

### 4.4 Keyboard Shortcut

| المفتاح | الوظيفة |
|---|---|
| `T` | تبديل Dark ↔ Light |

يُضاف في نفس `keydown` listener الموجود في app.js (بجانب F/A/Space/1-7).

---

## 5. تحليل Runtime Architecture

### 5.1 مقارنة الخيارات

| المعيار | A) `data-theme` attribute | B) CSS class | C) JS يغيّر Variables مباشرة | D) Stylesheet swap |
|---|---|---|---|---|
| **سهولة الصيانة** | ✅ كتلة CSS واحدة لكل theme | ✅ مشابه | ⛔ كل variable يُغيّر بسطر JS | ⚠️ ملف CSS لكل theme |
| **توافق Offline** | ✅ CSS محلي | ✅ | ✅ | ⚠️ ملفات إضافية |
| **الأداء** | ✅ المتصفح يعيد حساب CSS variables فقط — لا reflow | ✅ مشابه | ⚠️ كل `setProperty` يُعيد الحساب | ⚠️ إعادة تحميل stylesheet |
| **قابلية التوسع** | ✅ إضافة theme = كتلة CSS جديدة | ✅ مشابه | ⛔ كل theme = كود JS إضافي | ⚠️ ملف CSS جديد |
| **توافق مع Tokens الحالية** | ✅✅ `[data-theme="light"]` موجود ومعرّف فعلاً | ⚠️ يحتاج تعديل الـ selector | ⛔ يتجاهل CSS تماماً | ⚠️ يحتاج نقل tokens |
| **FOUC Prevention** | ✅ سطر واحد في `<head>` | ✅ مشابه | ⚠️ يحتاج تحميل JS أولاً | ⚠️ يحتاج preload |
| **سطر التبديل** | `html.dataset.theme = 'light'` | `html.classList.toggle('light')` | `html.style.setProperty(...)` × 30 | `link.href = 'light.css'` |

### 5.2 القرار: A) `data-theme` attribute على `<html>`

**الأسباب:**

1. **الكتلة موجودة فعلاً**: `[data-theme="light"]` مع 30+ قيمة مُعرَّفة ومختبرة — لا عمل إضافي.
2. **سطر واحد للتبديل**: `document.documentElement.dataset.theme = 'light'` — أبسط ما يمكن.
3. **فصل المسؤوليات**: CSS تحدد الألوان، JS تحدد أي theme نشط — لا خلط.
4. **FOUC prevention بسيط**: `<script>` في `<head>` يقرأ localStorage ويضبط `data-theme` قبل أي render.
5. **الأداء الأفضل**: المتصفح يحسب CSS variables مرة واحدة عند تغيير attribute — أسرع من 30× `setProperty()`.
6. **قابلية التوسع**: إضافة `[data-theme="high-contrast"]` مستقبلاً = كتلة CSS جديدة فقط.

### 5.3 Runtime Flow المقترح

```
┌─────────────────────────────────────────────────────┐
│  تحميل الصفحة                                       │
│  ┌──────────────────────────────────────────────┐    │
│  │ <head>                                       │    │
│  │   <script>                                   │    │
│  │     const saved = localStorage               │    │
│  │       .getItem('lesson-theme');               │    │
│  │     if (saved) {                             │    │
│  │       document.documentElement               │    │
│  │         .dataset.theme = saved;              │    │
│  │     }                                        │    │
│  │   </script>                                  │    │
│  │   <link rel="stylesheet" href="style.css"/>  │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
│  ① إذا لا يوجد saved → لا data-theme →              │
│     :root يطبّق (= Dark Mode الافتراضي)               │
│                                                      │
│  ② إذا saved = "light" → data-theme="light" →       │
│     [data-theme="light"] يطبّق فوراً                  │
│     (قبل أي render = لا FOUC)                        │
│                                                      │
│  ③ CSS يُحمّل → المتغيرات تُحسب حسب data-theme →    │
│     الصفحة تُرسم بالوضع الصحيح من أول إطار           │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  المعلم يضغط زر Theme (أو مفتاح T)                  │
│                                                      │
│  toggleTheme() {                                     │
│    1. قراءة الوضع الحالي من html.dataset.theme       │
│    2. تبديل: dark → light / light → dark             │
│    3. حفظ في localStorage                            │
│    4. تحديث أيقونة الزر (☀ ↔ ☾)                      │
│    5. تحديث title attribute للزر                     │
│  }                                                   │
│                                                      │
│  النتيجة: CSS variables تتغير فورياً →               │
│  كل العناصر التي تستخدم --th-* تتحدث تلقائياً        │
└─────────────────────────────────────────────────────┘
```

---

## 6. تحليل إدارة الحالة

### 6.1 مقارنة الخيارات

| الخيار | المزايا | العيوب | ملاءمة المشروع |
|---|---|---|---|
| **بدون حفظ (جلسة واحدة)** | أبسط ما يمكن | المعلم يعيد الضبط كل مرة | ⛔ غير مقبول |
| **localStorage** | حفظ دائم + Offline + بسيط | لا شيء | ✅✅ الأنسب |
| **ملف configuration** | مرن | يحتاج بنية ملفات + قراءة/كتابة | ⛔ مبالغة |

### 6.2 القرار: localStorage

**المفتاح**: `lesson-theme`
**القيم**: `"dark"` أو `"light"`
**الافتراضي**: عدم وجود المفتاح = Dark Mode

### 6.3 سيناريوهات فتح الصفحة

| السيناريو | ماذا يحدث | النتيجة |
|---|---|---|
| **أول مرة — لا localStorage** | لا `data-theme` attribute → `:root` يُطبّق | Dark Mode (الافتراضي) ✅ |
| **المعلم اختار Light سابقاً** | `<script>` يقرأ `lesson-theme=light` → `data-theme="light"` | Light Mode فوراً — لا FOUC ✅ |
| **المعلم اختار Dark بعد Light** | `<script>` يقرأ `lesson-theme=dark` → `data-theme="dark"` | Dark Mode — أو يمكن حذف المفتاح لأن Dark هو الافتراضي ✅ |
| **localStorage غير متاح** | `try/catch` يمنع الخطأ → لا `data-theme` | Dark Mode (fallback آمن) ✅ |

### 6.4 منع FOUC (Flash of Unstyled Content)

**المشكلة**: إذا أُضيف `data-theme` بعد تحميل CSS، ستظهر الصفحة بالوضع الخاطئ لجزء من الثانية.

**الحل**: سكريبت مزامن (synchronous) في `<head>` — يُنفّذ **قبل** أي render:

```html
<head>
  <script>
    try {
      var t = localStorage.getItem('lesson-theme');
      if (t) document.documentElement.dataset.theme = t;
    } catch(e) {}
  </script>
  <link rel="stylesheet" href="css/style.css" />
</head>
```

**لماذا هذا آمن:**
- `<script>` بدون `defer`/`async` يُنفّذ مباشرة قبل أي parsing لاحق.
- `localStorage.getItem` = عملية مزامنة — لا promise ولا async.
- `dataset.theme = t` = تعيين attribute على `<html>` — لا DOM mutation مكلفة.
- المتصفح لم يبدأ render بعد = لا FOUC مطلقاً.
- `try/catch` يحمي من بيئات تمنع localStorage (iframe sandboxed).

---

## 7. تحليل تأثير Theme Runtime على المراحل

### 7.1 ما سيعمل تلقائياً بفضل Phase 2

جميع العناصر التي استُبدلت ألوانها بـ `--th-*` tokens ستتبدل تلقائياً عند تغيير `data-theme`. هذا يشمل:

| المنطقة | العناصر | الحالة |
|---|---|---|
| **Teacher HUD** | خلفية, حدود, أيقونات, مؤقت, لوحة مساعدة | ✅ تلقائي |
| **Controls Bar** | خلفية, حدود, زر تقدم hover | ✅ تلقائي |
| **Progress Rail** | خلفية الشريط | ✅ تلقائي |
| **P1** | حروف أبجدية borders, dir-label, target highlight | ✅ تلقائي |
| **P2** | أزرار صوت borders, controls, finger guide | ✅ تلقائي |
| **P3** | dots, ctrl-btn, letter-card border, nav-btn, quad-card | ✅ تلقائي |
| **P4** | card border, replay-btn, step-items borders/states | ✅ تلقائي |
| **P5** | card border, dividers, meaning-box, history, review | ✅ تلقائي |
| **P6** | round tabs, counter, answer-zone, reveal/next, pair/close | ✅ تلقائي |
| **P7** | answer-zone, score buttons, summary, score items | ✅ تلقائي |
| **Overlays** | attention-overlay, completion-banner, attention-pulse | ✅ تلقائي |
| **Status Colors** | success/error/warning backgrounds and text | ✅ تلقائي |

### 7.2 ما يحتاج معالجة خاصة

| العنصر | المشكلة | الحل المقترح | الأولوية |
|---|---|---|---|
| **SVG في app.js (P4)** | 5 أسطر `rgba(255,255,255,*)` مشفرة في template literal | استبدال بـ CSS class + `currentColor` أو CSS variables مقروءة من `getComputedStyle` | متوسطة — Phase 3B |
| **Retreat button** | 4 قيم `rgba(255,255,255,*)` خاصة بحالات الزر | يمكن ترك كما هو (يعمل جزئياً) أو إضافة tokens مخصصة | منخفضة |
| **P6 radial-gradient** | `radial-gradient(circle at 50% 28%, rgba(29,158,156,0.28), rgba(13,43,85,0.98) 68%)` | يحتاج light variant — يمكن إضافة `--th-p6-gradient-*` أو تركه (يعمل بشكل مقبول) | منخفضة |
| **P6 answer-zone gradient** | `linear-gradient(180deg, rgba(22,46,88,0.92), rgba(13,43,85,0.7))` | يحتاج light variant | منخفضة |
| **body `var(--bg-main)`** | يستخدم `--bg-main` وليس `--th-bg-body` | ربط `--bg-main` بـ `--th-bg-body` في `[data-theme="light"]` أو استبدال مباشر | عالية — Phase 3B |
| **`--text-primary` / `--text-secondary` / `--text-dim`** | `:root` يُعرّفها مباشرة — لا تتبدل مع theme | ربطها بـ tokens أو إعادة تعريفها في `[data-theme="light"]` | عالية — Phase 3B |

### 7.3 نقطة حاسمة: المتغيرات الأصلية vs Theme Tokens

حالياً يوجد مجموعتان من المتغيرات:

```css
:root {
  --bg-main: #0A1F3D;        /* ← أصلي — يُستخدم في body, P6 gradients */
  --th-bg-body: #0A1F3D;     /* ← theme token — نفس القيمة لكن يتبدل مع theme */
  
  --text-primary: #F8F9FA;   /* ← أصلي — يُستخدم في ~20 مكان مباشرة */
  --th-text-primary: #F8F9FA; /* ← theme token — نفس القيمة */
}
```

**المشكلة**: `body { background: var(--bg-main) }` لن يتبدل عند `data-theme="light"` لأن `--bg-main` لم يُعاد تعريفه في `[data-theme="light"]`.

**الحل في Phase 3B**: إضافة إعادة تعريف للمتغيرات الأصلية داخل `[data-theme="light"]`:

```css
[data-theme="light"] {
  /* ربط المتغيرات الأصلية بقيم Light */
  --bg-main:        var(--th-bg-body);
  --bg-card:        var(--th-bg-card);
  --surface:        var(--th-bg-surface);
  --bg-ctrl:        var(--th-bg-controls);
  --text-primary:   var(--th-text-primary);
  --text-secondary: var(--th-text-secondary);
  --text-dim:       var(--th-text-dim);
}
```

هذا يجعل كل الاستخدامات القديمة لـ `var(--bg-main)` تتبدل تلقائياً — بدون استبدالها واحدة واحدة.

### 7.4 المخاطر المحتملة لكل مرحلة

| المرحلة | المخاطر | الاحتمال | الحل |
|---|---|---|---|
| **P1** | حروف Hero (ب ت ث ن) — contrast على خلفية فاتحة | منخفض | `--color-tha` و `--color-nun` معتّمة فعلاً في `[data-theme="light"]` |
| **P2** | أيقونة السماعة + حجرة الترديد — ألوان teal على خلفية فاتحة | منخفض | teal (#0E7C7B) يعطي contrast >4:1 على #F0F4F8 |
| **P3** | بطاقة الكشف — حد الحرف + text-shadow | منخفض | text-shadow `rgba(0,0,0,0.4)` يعمل في الوضعين |
| **P4** | **SVG خطوط إرشادية** | **متوسط** | يحتاج تعديل 5 أسطر في app.js — الأولوية الأعلى |
| **P5** | لا مخاطر — الحدود والخلفيات كلها tokens | منخفض جداً | — |
| **P6** | radial-gradient + answer gradient | منخفض-متوسط | يعمل بشكل مقبول حتى لو لم يُعدّل |
| **P7** | لا مخاطر — الحالات كلها tokens | منخفض جداً | — |

---

## 8. خطة منع المشاكل

### 8.1 Flash of Wrong Theme (FOWT)

| الآلية | التفاصيل |
|---|---|
| **الحل** | `<script>` مزامن في `<head>` — قبل `<link rel="stylesheet">` |
| **السبب** | يُعيّن `data-theme` قبل أي CSS parsing أو rendering |
| **Fallback** | `try/catch` — إذا فشل localStorage → Dark Mode (الافتراضي) |
| **اختبار** | تحميل الصفحة مع `lesson-theme=light` في localStorage → لا وميض |

### 8.2 Layout Shift

| المخاطرة | الحل |
|---|---|
| تغيير Theme يُغيّر ارتفاع عناصر | ✅ Theme Tokens تغيّر ألواناً فقط — لا spacing أو sizing أو font-size |
| HUD يتغير حجمه | ✅ HUD ارتفاع ثابت 44px — لا يعتمد على لون |
| Content Zone يتحرك | ✅ Grid template ثابت — لا يتأثر بالألوان |

**الخلاصة: لا Layout Shift ممكن** — Theme Tokens تغيّر ألواناً فقط.

### 8.3 تغيير ألوان غير مقصود

| المخاطرة | الحل |
|---|---|
| ألوان الحروف تتغير | ✅ `--color-ba/ta/tha/nun` لا تُعاد تعريفها (ما عدا ث/ن بتعتيم طفيف) |
| ألوان inline style تتغير | ✅ ألوان الحروف في HTML/JS = هوية ثابتة لا تمر عبر tokens |
| لون accent (teal/gold) يختفي | ✅ teal/gold محفوظة — فقط hover variants تتعدل |

### 8.4 فقدان Contrast

| العنصر | Dark Contrast | Light Contrast | الحالة |
|---|---|---|---|
| نص أساسي (#F8F9FA على #0A1F3D) | >15:1 | (#1A202C على #F0F4F8) >12:1 | ✅ |
| نص ثانوي (#B0BEC5 على #0A1F3D) | ~7:1 | (#4A5568 على #F0F4F8) ~7:1 | ✅ |
| حرف ب (teal على خلفية) | >6:1 | ~4.1:1 | ✅ (large text) |
| حرف ث (violet على خلفية) | >5:1 | #7C4DDB على #F0F4F8 ~4.2:1 | ✅ (large text, معتّم) |
| حرف ن (gold على خلفية) | >4.5:1 | #A8851E على #F0F4F8 ~4.0:1 | ✅ (large text, معتّم) |
| gold accent على HUD | يعمل | يحتاج فحص على rgba(255,255,255,0.85) | ⚠️ فحص عند التنفيذ |

### 8.5 مشاكل البروجكتور

| المخاطرة | الحل |
|---|---|
| Light Mode على بروجكتور رديء | Dark Mode هو الافتراضي — Light Mode اختياري |
| ألوان باهتة في Light | ✅ ألوان Light محسوبة لخلفية #F0F4F8 — ليست بيضاء ناصعة |
| انعكاس الشاشة / glare | Light Mode يقلل glare في فصول مضاءة — ميزة وليس عيب |

### 8.6 مشاكل Offline

| المخاطرة | الحل |
|---|---|
| localStorage غير متاح | `try/catch` → fallback إلى Dark Mode |
| CSS لم يُحمّل | لا علاقة بـ Theme — CSS محلي |
| JS لم يُحمّل | FOUC prevention script في `<head>` = مستقل عن app.js |

---

## 9. خطة التنفيذ المستقبلية

### Phase 3B: Theme Controller (CSS + HTML)

**الملفات**: `css/style.css` + `lecture-01.html`

**المهام**:
1. إضافة `<script>` FOUC prevention في `<head>` (3 أسطر).
2. إضافة `<button id="theme-toggle" class="hud-icon-btn">` في `div.hud-controls`.
3. إضافة إعادة تعريف المتغيرات الأصلية في `[data-theme="light"]` (7 أسطر CSS).
4. معالجة SVG colors في P4 (إضافة CSS class بدل ألوان مشفرة — أو ترك لـ Phase لاحق).

**المخاطر**: منخفضة — إضافة فقط.

### Phase 3C: Theme Toggle Logic (JS)

**الملفات**: `js/app.js`

**المهام**:
1. إضافة دالة `toggleTheme()` (~12 سطر).
2. إضافة مفتاح `T` في keydown listener.
3. إضافة `initThemeButton()` في `init()` لتحديث أيقونة الزر عند التحميل.

**المخاطر**: منخفضة — إضافة ~20 سطر فقط، لا تعديل على STATE أو المنطق الحالي.

### Phase 3D: اختبارات Dark ↔ Light

**المهام**:
1. اختبار P1 → P7 في Dark Mode — التأكد من عدم وجود regression.
2. اختبار P1 → P7 في Light Mode — التأكد من contrast وجودة العرض.
3. اختبار التبديل أثناء كل مرحلة — لا layout shift ولا عناصر مكسورة.
4. اختبار FOUC prevention — تحميل الصفحة مع `lesson-theme=light`.
5. اختبار Keyboard shortcut (T).
6. اختبار عبر 4 دقات (1366×768, 1280×720, 1024×768, 1920×1080).

### Phase 3E: تحديث التوثيق

**الملفات**: `md/CHANGELOG.md` + `md/CURRENT_STATE.md`

**المهام**:
1. تسجيل إضافة نظام Theme في CHANGELOG.
2. تحديث قسم "البنية التحتية" في CURRENT_STATE لذكر Theme system.
3. تحديث قسم "المراحل" إذا لزم الأمر.

---

## 10. ملخص القرارات

| القرار | الاختيار | السبب الرئيسي |
|---|---|---|
| **مكان الزر** | Teacher HUD — منطقة الأيقونات | نقرة واحدة + نمط موحد + لا تشتيت |
| **شكل الزر** | `.hud-icon-btn` + أيقونة Unicode ☀/☾ | اتساق + Offline + لا CSS جديد |
| **Architecture** | `data-theme` attribute على `<html>` | `[data-theme="light"]` موجود فعلاً + سطر JS واحد |
| **إدارة الحالة** | `localStorage` بمفتاح `lesson-theme` | دائم + بسيط + Offline |
| **FOUC Prevention** | `<script>` مزامن في `<head>` | يُنفّذ قبل أي render |
| **الافتراضي** | Dark Mode (لا `data-theme` attribute) | الهوية الأساسية |
| **Keyboard** | مفتاح `T` | نفس نمط F/A الموجود |
