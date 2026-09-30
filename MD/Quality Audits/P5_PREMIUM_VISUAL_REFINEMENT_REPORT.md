# P5 Single View — Premium Visual Refinement Report
# تقرير التحسين البصري الفاخر لعرض P5 Single

> **التاريخ:** 2026-08-14
> **النطاق:** P5 Single View فقط — Quad و Assess لم يتأثرا
> **الملفات المعدّلة:** `js/app.js` | `css/style.css`
> **الملفات المجمّدة (لم تُعدَّل):** `js/lesson-01.js` | `lecture-01.html`
> **الحالة:** مكتمل — Regression PASS

---

## 1. الهدف

تحويل P5 Single من "عرض معلومات" إلى "تجربة تعلّم فاخرة" — الطالب يشعر بأنه يكتشف الحروف، لا يقرأ معلومات عنها. التصميم موجّه للبروجكتور (1366×768) مع دعم كامل للشاشات المختلفة.

---

## 2. التحسينات البصرية

### 2.1 بطاقة بعمق بصري (`.p5-card`)

| العنصر | التفصيل |
|--------|---------|
| العرض | `min(580px, 90vw)` — أضيق من السابق لتركيز أعلى |
| الظل | `box-shadow` متعدد الطبقات — عمق واقعي |
| الشريط العلوي | `::before` accent strip بلون الكلمة (`--wc`) — 3px |
| الزوايا | `border-radius: 18px` |
| الخلفية | `color-mix(in srgb, var(--wc) 6%, var(--card-bg))` — تلوين خفيف بلون الكلمة |

### 2.2 إيموجي بطل (`.p5-hero-emoji`)

| العنصر | التفصيل |
|--------|---------|
| الحجم | `clamp(3rem, 8vh, 5.5rem)` — كبير ولافت |
| التأثير | `drop-shadow` — بروز خفيف |
| الوظيفة | يعطي الطالب إشارة بصرية فورية عن معنى الكلمة |

### 2.3 الكلمة الأكبر (`.p5-char`)

| العنصر | التفصيل |
|--------|---------|
| الحجم | `clamp(3.2rem, 10vh, 6rem)` — أكبر من السابق |
| الحرف المستهدف | توهّج عبر `text-shadow` مع `color-mix()` |
| خط سفلي | `::after` مع `opacity` transition |

### 2.4 بطاقة الهوية (`.p5-identity-card`)

| العنصر | التفصيل |
|--------|---------|
| الخلفية | `color-mix(in srgb, var(--lc) 12%, var(--card-bg))` — ملوّنة بلون الحرف |
| الحد | `color-mix(in srgb, var(--lc) 25%, transparent)` |
| الظل | `color-mix(in srgb, var(--lc) 15%, transparent)` |
| الحرف | `clamp(2.5rem, 7vh, 4rem)` — بارز |
| التوزيع | أفقي: الحرف يساراً، الاسم والصوت يميناً |

### 2.5 أزرار الصوت الجديدة

| العنصر | التفصيل |
|--------|---------|
| `.p5-listen-btn` | خلفية ملوّنة بـ `color-mix()`، أيقونة ▶ + اسم الكلمة |
| `.p5-choral-btn` | خلفية رمادية محايدة، أيقونة 👥 + "ردّد" |
| التوزيع | أفقي على شاشات عريضة، عمودي على الموبايل (≤600px) |
| Hover | تغيير `opacity` + `transform: scale(1.04)` |

### 2.6 المعنى المبسّط (`.p5-meaning-caption`)

| العنصر | التفصيل |
|--------|---------|
| التصميم | نص بسيط بدل صندوق ذهبي — أنظف بصرياً |
| المحتوى | معنى عربي + ترجمة صينية بخط أصغر |

### 2.7 انتقالات الكشف (`.p5-block`)

| العنصر | التفصيل |
|--------|---------|
| التأثير | `scale(0.97) → scale(1)` + `translateY(12px → 0)` |
| التوقيت | `360ms ease-out` |
| الشفافية | `opacity: 0 → 1` |

---

## 3. التفاصيل التقنية

### 3.1 app.js — تغييرات `renderP5()`

| التغيير | التفصيل |
|---------|---------|
| Hero emoji | `<span class="p5-hero-emoji">${meta.emoji}</span>` |
| Identity card | `<div class="p5-identity-card" style="--lc:${word.color}">` بدل `.p5-highlight-box` |
| Audio row | `.p5-listen-btn` + `.p5-choral-btn` بدل `.p5-play-btn` + `.ctrl-btn.choral` |
| Meaning | `.p5-meaning-caption` بدل `.p5-meaning-box` |
| Card accent | `style="--wc:${word.color}"` على `.p5-card` |

### 3.2 css/style.css — Classes جديدة

| Class | الوظيفة |
|-------|---------|
| `.p5-hero-emoji` | إيموجي كبير في أعلى البطاقة |
| `.p5-identity-card` | بطاقة هوية الحرف بتلوين `color-mix()` |
| `.p5-id-letter` | الحرف الكبير في بطاقة الهوية |
| `.p5-id-info` | حاوية الاسم والصوت |
| `.p5-listen-btn` | زر تشغيل الصوت الجديد |
| `.p5-listen-icon` | أيقونة ▶ |
| `.p5-listen-label` | اسم الكلمة على الزر |
| `.p5-choral-btn` | زر الترديد الجماعي |
| `.p5-meaning-caption` | نص المعنى المبسّط |
| `.p5-meaning-text` | المعنى العربي |
| `.p5-meaning-zh` | الترجمة الصينية |

### 3.3 Classes محذوفة (استُبدلت)

| Class القديم | البديل |
|-------------|--------|
| `.p5-highlight-box` | `.p5-identity-card` |
| `.p5-target-letter` | `.p5-id-letter` |
| `.p5-meaning-box` | `.p5-meaning-caption` |
| `.p5-meaning-emoji` | `.p5-hero-emoji` (نُقل لأعلى البطاقة) |
| `.p5-meaning-lines` | `.p5-meaning-text` + `.p5-meaning-zh` |
| `.p5-play-btn` | `.p5-listen-btn` |
| `.p5-play-icon` | `.p5-listen-icon` |
| `.p5-play-word` | `.p5-listen-label` |

### 3.4 استخدام `color-mix()` CSS

تقنية حديثة تُمزج الألوان في CSS بدون JavaScript:

```css
/* خلفية بطاقة الهوية — 12% من لون الحرف */
background: color-mix(in srgb, var(--lc) 12%, var(--card-bg));

/* حد بطاقة الهوية — 25% من لون الحرف */
border-color: color-mix(in srgb, var(--lc) 25%, transparent);

/* توهّج الحرف المستهدف */
text-shadow: 0 0 18px color-mix(in srgb, var(--tc) 45%, transparent);
```

التحقق: `CSS.supports('color', 'color-mix(in srgb, red 20%, blue)')` = `true`

---

## 4. HTML Structure الجديد (Single View)

```
.p5-card[data-word][style="--wc:COLOR"]
  ├── #p5-context.reveal-block
  │     ├── .p5-hero-emoji                    ← جديد
  │     ├── .p5-word-display
  │     │     └── .p5-char / .p5-target-char[--tc]
  │     └── .p5-meaning-caption               ← بدل .p5-meaning-box
  │           ├── .p5-meaning-text
  │           └── .p5-meaning-zh
  ├── #p5-target.reveal-block
  │     └── .p5-identity-card[style="--lc:COLOR"]  ← بدل .p5-highlight-box
  │           ├── .p5-id-letter
  │           └── .p5-id-info
  │                 ├── .p5-target-name
  │                 └── .p5-target-phoneme
  └── #p5-audio.reveal-block
        └── .p5-audio-row
              ├── .p5-listen-btn[style="--lc:COLOR"]  ← بدل .p5-play-btn
              │     ├── .p5-listen-icon
              │     └── .p5-listen-label
              └── .p5-choral-btn                       ← بدل .ctrl-btn.choral
```

---

## 5. اختبار Regression

### 5.1 P5 Single — الكشف التدريجي (4 خطوات)

| الخطوة | المتوقع | النتيجة |
|--------|---------|---------|
| Step 0 (context) | إيموجي + كلمة + معنى — بدون تلوين الحرف | ✅ |
| Step 1 (target) | الحرف الأول ملوّن + توهّج + بطاقة هوية (حرف فقط) | ✅ |
| Step 2 (identity) | اسم الحرف + صوته في بطاقة الهوية | ✅ |
| Step 3 (audio) | أزرار تشغيل + ترديد | ✅ |

### 5.2 التراجع (Retreat)

| المسار | النتيجة |
|--------|---------|
| step 3→2→1→0→-1 | ✅ |
| quad → single (آخر كلمة، step 3) | ✅ |
| assess → quad | ✅ |

### 5.3 P5 Quad و Assess

| الفحص | النتيجة |
|-------|---------|
| Quad: 5 بطاقات مع حروف ملوّنة | ✅ |
| Assess: 5 خيارات + letter-tag | ✅ |

### 5.4 انحدار المراحل الأخرى

| المرحلة | النتيجة |
|---------|---------|
| P1 | ✅ |
| P2 | ✅ |
| P3 | ✅ |
| P4 | ✅ |
| P6 | ✅ |
| P7 | ✅ |
| Console errors | ✅ صفر |

### 5.5 Viewports — لا overflow، مركزي

| الدقة | مركزي | Overflow | النتيجة |
|-------|-------|---------|---------|
| 1920×1080 | ✅ center=960 | لا | ✅ |
| 1366×768 | ✅ center=683 | لا | ✅ |
| 1280×800 | ✅ center=640 | لا | ✅ |
| 1024×768 | ✅ center=512 | لا | ✅ |
| 768×1024 (tablet) | ✅ center=384 | لا | ✅ |
| 375×812 (mobile) | ✅ | لا | ✅ |

### 5.6 CSS `color-mix()`

| الفحص | النتيجة |
|-------|---------|
| `CSS.supports()` | ✅ true |
| Identity card background renders | ✅ |
| Target char glow renders | ✅ |

---

## 6. القيود المحترمة

- ✅ لم يُعاد بناء P5 — تحسينات بصرية فقط
- ✅ لم تتغير المعمارية (DATA → ENGINE → VIEW)
- ✅ لم يتغير HTML
- ✅ لم يُعدَّل lesson-01.js
- ✅ P5 Quad و Assess بدون تغيير
- ✅ State system محفوظ
- ✅ 4 خطوات كشف محفوظة
- ✅ Space navigation يعمل
- ✅ Audio system يعمل
- ✅ Offline يعمل (file:// protocol)
- ✅ لا مكتبات خارجية
- ✅ لا تأثير على P1-P4 أو P6-P7
