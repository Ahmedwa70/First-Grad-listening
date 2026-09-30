# Theme Visual Quality Audit — تقرير فحص جودة نظام Theme

> **التاريخ:** 2026-08-07
> **الهدف:** تقييم شامل لجودة نظام Dark/Light Theme بعد اكتمال Phase 1 (Tokens) + Phase 2 (CSS Migration) + Phase 3C (Runtime Controller).
> **النطاق:** css/style.css · lecture-01.html · js/app.js · js/lesson-01.js
> **القيد:** Audit فقط — لم يُعدَّل أي ملف.

---

## 1. حالة Dark Mode (الوضع الافتراضي)

| البند | النتيجة | ملاحظة |
|---|---|---|
| خلفية الصفحة | ✅ `#0A1F3D` | مطابق للهوية الأصلية |
| لون النص الأساسي | ✅ `#F8F9FA` | واضح ومقروء |
| ارتفاع HUD | ✅ `44px` | ثابت |
| زر Theme | ✅ `☀` | صحيح — يعرض أيقونة الوضع البديل |
| شريط التحكم | ✅ | خلفية وحدود صحيحة |
| شريط التقدم | ✅ | تدرج teal→gold يعمل |
| Attention Overlay | ✅ | خلفية overlay داكنة صحيحة |
| Completion Banner | ✅ | خلفية وألوان صحيحة |

**الحكم:** ✅ Dark Mode مطابق 100% للهوية الأصلية. لم يتأثر بأي تغيير من نظام Theme.

---

## 2. حالة Light Mode

| البند | النتيجة | ملاحظة |
|---|---|---|
| خلفية الصفحة | ✅ `#F0F4F8` | فاتحة ومناسبة |
| لون النص الأساسي | ✅ `#1A202C` | داكن ومقروء على خلفية فاتحة |
| ارتفاع HUD | ✅ `44px` | ثابت — لا Layout Shift |
| HUD خلفية | ✅ `rgba(255,255,255,0.85)` | شبه شفاف مناسب |
| Controls Bar خلفية | ✅ `rgba(255,255,255,0.9)` | صحيح |
| Variable Bridging | ✅ | `--bg-main`, `--bg-card`, `--text-primary` وغيرها تتجاوب |

**الحكم:** ⚠️ Light Mode يعمل هيكلياً لكن يوجد **17 مشكلة بصرية** تحتاج معالجة — مفصّلة أدناه.

---

## 3. جدول فحص المراحل P1–P7

### P1 — افتتاح الدرس

| العنصر | Dark | Light | المشكلة | الأولوية |
|---|---|---|---|---|
| شاشة البداية (العنوان) | ✅ | ✅ | — | — |
| الحروف التعليمية (hero-char) | ✅ | ✅ | ألوان الهوية ثابتة ✓ | — |
| صندوق الترحيب (welcome-box) | ✅ | ✅ | `--bg-card` يتجاوب = أبيض ✓ | — |
| direction-demo خلفية | ✅ | ⚠️ | `rgba(255,255,255,0.04)` — شفاف تماماً على أبيض، لا يقدم فصلاً بصرياً | منخفضة |
| alpha-char (غير مستهدف) خلفية | ✅ | ⚠️ | `rgba(255,255,255,0.04)` — لا فرق عن الخلفية | منخفضة |
| alpha-char.target | ✅ | ✅ | يستخدم `--th-warning-bg` + `--gold` ✓ | — |
| خلفيات P1 | ✅ | ✅ | `--bg-card` يتجاوب ✓ | — |
| حدود P1 | ✅ | ✅ | `--th-border-subtle` يتجاوب ✓ | — |
| نصوص P1 | ✅ | ✅ | `--text-primary/secondary/dim` تتجاوب ✓ | — |

### P2 — الصوت أولاً

| العنصر | Dark | Light | المشكلة | الأولوية |
|---|---|---|---|---|
| أزرار الصوت (sound-btn) | ✅ | ✅ | `--bg-card` + `--th-border-default` ✓ | — |
| بطاقة نشطة (sound-btn.active) | ✅ | ✅ | ألوان الحرف inline (هوية) ✓ | — |
| active-phoneme | ✅ | ✅ | ألوان :has() — هوية تعليمية ✓ | — |
| أزرار التحكم (ctrl-btn) | ✅ | ✅ | `--th-bg-hover/active` + `--text-primary` ✓ | — |
| **p2-teacher-hint** | ✅ | 🔴 | **`background: rgba(13,43,85,0.9)`** — كتلة كحلية داكنة على خلفية فاتحة | **عالية** |
| p2-controls خلفية | ✅ | ⚠️ | `rgba(255,255,255,0.03)` — شفاف على أبيض | منخفضة |
| finger-count-guide خلفية | ✅ | ⚠️ | `rgba(255,255,255,0.03)` — شفاف على أبيض | منخفضة |

### P3 — كشف الحروف

| العنصر | Dark | Light | المشكلة | الأولوية |
|---|---|---|---|---|
| بطاقة الحرف (letter-card) | ✅ | ✅ | `--bg-card` = أبيض ✓ | — |
| حدود البطاقة | ✅ | ✅ | `--th-border-subtle` ✓ | — |
| النقاط (p3-dot) غير نشطة | ✅ | ⚠️ | `rgba(255,255,255,0.15)` — غير مرئي على أبيض | متوسطة |
| النقاط .done / .current | ✅ | ✅ | `--teal` / `--gold` ✓ | — |
| card-char text-shadow | ✅ | ⚠️ | `0 4px 20px rgba(0,0,0,0.4)` — ظل ثقيل على بطاقة بيضاء | متوسطة |
| الأزرار (nav-btn) | ✅ | ✅ | `--th-bg-hover/active` ✓ | — |
| phoneme-btn | ✅ | ✅ | `rgba(14,124,123,*)` — teal شبه شفاف، يعمل ✓ | — |
| fact-box | ✅ | ✅ | `rgba(201,162,39,0.08)` — ذهبي خفيف ✓ | — |
| العرض الرباعي (quad-card) | ✅ | ✅ | `--bg-card` + `--th-border-default` ✓ | — |

### P4 — تدريب الكتابة

| العنصر | Dark | Light | المشكلة | الأولوية |
|---|---|---|---|---|
| البطاقة (p4-card) | ✅ | ✅ | `--bg-card` + `--th-border-subtle` ✓ | — |
| **SVG zone خلفية** | ✅ | 🔴 | **`rgba(0,0,0,0.25)`** — مربع أسود شبه شفاف على بطاقة بيضاء | **عالية** |
| SVG grid/path strokes | ✅ | ⚠️ | `rgba(255,255,255,0.08/0.05/0.12)` — غير مرئي على خلفية فاتحة | متوسطة |
| SVG direction text | ✅ | ⚠️ | `fill="rgba(255,255,255,0.35)"` — غير مرئي | متوسطة |
| p4-step-item خلفية | ✅ | ⚠️ | `rgba(255,255,255,0.02)` — شفاف تماماً | منخفضة |
| p4-step-num خلفية | ✅ | ⚠️ | `rgba(255,255,255,0.08)` — شفاف | منخفضة |
| p4-replay-btn | ✅ | ✅ | `--th-bg-hover` ✓ | — |
| المقارنة (p4-compare-card) | ✅ | ✅ | `--bg-card` + inline border-color (هوية) ✓ | — |

### P5 — الحروف في الكلمات

| العنصر | Dark | Light | المشكلة | الأولوية |
|---|---|---|---|---|
| بطاقة الكلمة (p5-card) | ✅ | ✅ | `--bg-card` + `--th-border-subtle` ✓ | — |
| الحروف المستهدفة | ✅ | ✅ | inline colors (هوية) ✓ | — |
| صندوق المعنى (meaning-box) | ✅ | ✅ | `--th-gold-bg` + `--th-gold-border` ✓ | — |
| p5-highlight-box | ✅ | ✅ | `--th-bg-hover` + inline border ✓ | — |
| تاريخ الكلمات (history) | ✅ | ✅ | `--th-bg-hover` + `--th-border-subtle` ✓ | — |
| لوحة المراجعة (p5-review) | ✅ | ✅ | `--th-bg-hover` + `--th-hud-border` ✓ | — |
| p5-dot progression | ✅ | ✅ | inline colors (هوية) ✓ | — |

### P6 — التمييز السمعي

| العنصر | Dark | Light | المشكلة | الأولوية |
|---|---|---|---|---|
| round-btn | ✅ | ✅ | `--th-bg-hover` + `--th-gold-bg` ✓ | — |
| تعليمات (p6-instruction) | ✅ | ✅ | `--text-primary` يتجاوب ✓ | — |
| **big-play button gradient** | ✅ | 🔴 | **`radial-gradient(rgba(29,158,156,0.28), rgba(13,43,85,0.98))`** — خلفية كحلية داكنة صلبة على صفحة فاتحة | **حرجة** |
| **pair-play خلفية** | ✅ | 🔴 | **`rgba(20, 51, 95, 0.45)`** — أزرق داكن على صفحة فاتحة | **عالية** |
| **close-btn خلفية** | ✅ | 🔴 | **`rgba(20, 51, 95, 0.45)`** — نفس المشكلة | **عالية** |
| **answer-zone.visible gradient** | ✅ | 🔴 | **`linear-gradient(rgba(22,46,88,0.92), rgba(13,43,85,0.7))`** — لوحة إجابة كحلية داكنة | **حرجة** |
| answer-zone.visible inset shadow | ✅ | ⚠️ | `inset 0 1px 0 rgba(255,255,255,0.06)` — لا أثر | منخفضة |
| p6-counter | ✅ | ✅ | `--th-bg-hover` + `--th-border-default` ✓ | — |
| p6-reveal-btn | ✅ | ✅ | `--th-gold-border` + `--gold` ✓ | — |
| p6-next-btn | ✅ | ✅ | `--teal` + `--th-text-on-accent` ✓ | — |
| p6-guide | ✅ | ✅ | `--text-dim` + `--th-border-default` ✓ | — |
| ألوان الحروف | ✅ | ✅ | inline colors (هوية) — ثابتة ✓ | — |
| is-playing glow | ✅ | ✅ | `rgba(14,124,123,*)` — teal glow يعمل ✓ | — |
| **waiting animation shadows** | ✅ | ⚠️ | `p6PlayWaiting` keyframe يستخدم `rgba(0,0,0,0.22)` — ظل ثقيل على فاتح | متوسطة |

### P7 — التقييم الختامي

| العنصر | Dark | Light | المشكلة | الأولوية |
|---|---|---|---|---|
| عرض الحرف (p7-char-display) | ✅ | ✅ | inline color (هوية) ✓ | — |
| نص السؤال | ✅ | ✅ | `--text-secondary` = `#4A5568` ✓ | — |
| منطقة الإجابة (answer-zone) | ✅ | ✅ | `--th-bg-hover` + `--th-border-default` ✓ | — |
| أزرار التقييم (score-btn) | ✅ | ✅ | `--th-success/error/warning-bg` ✓ | — |
| الملخص (summary) | ✅ | ✅ | `--th-bg-hover` + `--gold` ✓ | — |
| **summary-next خلفية** | ✅ | ✅ | `rgba(14,124,123,0.12)` — teal خفيف ✓ | — |

### Teacher HUD

| العنصر | Dark | Light | المشكلة | الأولوية |
|---|---|---|---|---|
| شريط HUD | ✅ | ✅ | `--th-hud-bg/border` يتجاوب ✓ | — |
| زر Theme Toggle | ✅ | ✅ | يعمل — الأيقونة تتبدل ✓ | — |
| Timer | ✅ | ✅ | `--th-bg-hover` + `--th-border-subtle` ✓ | — |
| Timer overtime | ✅ | ✅ | `--th-error` + `--th-error-bg` ✓ | — |
| Help panel | ✅ | ⚠️ | `rgba(201,162,39,0.25)` حدود ذهبية خفيفة — مقبول | منخفضة |
| Fullscreen button | ✅ | ✅ | `--th-border-default` ✓ | — |
| Attention button | ✅ | ✅ | `--th-border-default` ✓ | — |
| ارتفاع HUD | ✅ 44px | ✅ 44px | ثابت ✓ | — |
| Layout Shift | ✅ لا | ✅ لا | — | — |

### شريط التحكم السفلي (Controls Bar)

| العنصر | Dark | Light | المشكلة | الأولوية |
|---|---|---|---|---|
| **زر التقدم (advance)** | ✅ | 🔴 | **`color: rgba(255,255,255,0.5)`** — أبيض شبه شفاف على خلفية فاتحة = غير مقروء | **حرجة** |
| **زر التقدم bg** | ✅ | ⚠️ | `rgba(14,124,123,0.35)` — teal خفيف، مقبول لكن ضعيف | متوسطة |
| **زر التراجع (retreat)** | ✅ | 🔴 | **`color: rgba(255,255,255,0.25)` + `border: rgba(255,255,255,0.08)`** — غير مرئي تماماً | **حرجة** |
| **زر التراجع hover** | ✅ | 🔴 | **`border-color: rgba(255,255,255,0.3)`** — غير مرئي | **عالية** |
| زر الانتباه | ✅ | ✅ | `--amber` + `rgba(212,115,10,*)` — يعمل ✓ | — |
| hint-zone | ✅ | ✅ | `--text-gold` ✓ | — |

---

## 4. جدول الحالات الخاصة

### ألوان Hardcoded متبقية في CSS (خارج :root و [data-theme])

| العنصر | الملف | القيمة | المشكلة | هل يحتاج إصلاح؟ |
|---|---|---|---|---|
| `.main-btn.advance` color | style.css:499 | `rgba(255,255,255,0.5)` | أبيض على فاتح = غير مقروء | ✅ نعم — حرج |
| `.main-btn.advance` bg | style.css:498 | `rgba(14,124,123,0.35)` | teal خفيف — ضعيف على فاتح | ✅ نعم |
| `.main-btn.retreat` color | style.css:507 | `rgba(255,255,255,0.25)` | غير مرئي على فاتح | ✅ نعم — حرج |
| `.main-btn.retreat` border | style.css:508 | `rgba(255,255,255,0.08)` | غير مرئي | ✅ نعم — حرج |
| `.main-btn.retreat:hover` border | style.css:510 | `rgba(255,255,255,0.3)` | غير مرئي | ✅ نعم |
| `.p6-big-play` gradient | style.css:2431 | `rgba(13,43,85,0.98)` | كتلة كحلية داكنة | ✅ نعم — حرج |
| `.p6-big-play:hover` gradient | style.css:2455 | `rgba(13,43,85,0.98)` | نفس المشكلة | ✅ نعم |
| `.p6-big-play.is-playing` gradient | style.css:2702 | `rgba(13,43,85,0.98)` | نفس المشكلة | ✅ نعم |
| `.p6-pair-play` bg | style.css:2578 | `rgba(20, 51, 95, 0.45)` | أزرق داكن على فاتح | ✅ نعم |
| `.p6-close-btn` bg | style.css:2631 | `rgba(20, 51, 95, 0.45)` | أزرق داكن على فاتح | ✅ نعم |
| `.p6-answer-zone.visible` gradient | style.css:2502 | `rgba(22,46,88,0.92)→rgba(13,43,85,0.7)` | لوحة كحلية داكنة | ✅ نعم — حرج |
| `.p6-answer-zone.visible` inset | style.css:2503 | `inset rgba(255,255,255,0.06)` | لا أثر بصري | ⚠️ منخفض |
| `.p4-svg-zone` bg | style.css:1648 | `rgba(0,0,0,0.25)` | مربع أسود على بطاقة بيضاء | ✅ نعم |
| `.p2-teacher-hint` bg | style.css:987 | `rgba(13,43,85,0.9)` | كتلة كحلية داكنة | ✅ نعم |
| `.p3-dot` bg (غير نشط) | style.css:1117 | `rgba(255,255,255,0.15)` | غير مرئي على أبيض | ✅ نعم |
| `.card-char` text-shadow | style.css:1213 | `rgba(0,0,0,0.4)` | ظل ثقيل على بطاقة بيضاء | ⚠️ متوسط |
| `.direction-demo` bg | style.css:648 | `rgba(255,255,255,0.04)` | شفاف على أبيض | ⚠️ منخفض |
| `.alpha-char` bg | style.css:713 | `rgba(255,255,255,0.04)` | شفاف على أبيض | ⚠️ منخفض |
| `.p4-step-item` bg | style.css:1704 | `rgba(255,255,255,0.02)` | شفاف على أبيض | ⚠️ منخفض |
| `.p4-step-num` bg | style.css:1730 | `rgba(255,255,255,0.08)` | شفاف على أبيض | ⚠️ منخفض |
| `.p2-controls` bg | style.css:971 | `rgba(255,255,255,0.03)` | شفاف على أبيض | ⚠️ منخفض |
| `.finger-count-guide` bg | style.css:1041 | `rgba(255,255,255,0.03)` | شفاف على أبيض | ⚠️ منخفض |

### Inline Styles في app.js (ألوان ديناميكية)

| العنصر | الملف | القيمة | هل يحتاج إصلاح؟ |
|---|---|---|---|
| `style="color:${letter.color}"` (P3/P4/P5/P6/P7) | app.js | ألوان الحروف التعليمية | ❌ هوية تعليمية — يبقى ثابتاً |
| `style="background:${letter.color}"` (quad-sound) | app.js | خلفية زر الصوت بلون الحرف | ❌ هوية — يبقى |
| `style="border-color:${letter.color}"` | app.js | حدود بلون الحرف | ❌ هوية — يبقى |
| `style="--mini-color:${w.color}"` | app.js | CSS custom property للهوية | ❌ يبقى |

### Inline Styles في lecture-01.html

| العنصر | الملف | القيمة | هل يحتاج إصلاح؟ |
|---|---|---|---|
| Completion banner `style="color:#0E7C7B"` إلخ | lecture-01.html:148-151 | ألوان الحروف الأربعة | ❌ هوية — يبقى |
| Loading text `color:var(--text-dim)` | lecture-01.html:88 | يستخدم متغير ✓ | ❌ صحيح |

### SVG Strokes في app.js (P4 رسم الحرف)

| العنصر | الملف | القيمة | هل يحتاج إصلاح؟ |
|---|---|---|---|
| Grid lines `stroke="rgba(255,255,255,*)"` | app.js:886-887 | خطوط مساعدة — غير مرئية على فاتح | ✅ نعم |
| Ghost path `stroke="rgba(255,255,255,0.12)"` | app.js:889 | مسار الظل — غير مرئي على فاتح | ✅ نعم |
| Direction text `fill="rgba(255,255,255,0.35)"` | app.js:901 | نص الاتجاه — غير مرئي على فاتح | ✅ نعم |

### Gradients

| العنصر | الملف | المشكلة | هل يحتاج إصلاح؟ |
|---|---|---|---|
| `.hero-char` gradient | style.css:598 | `linear-gradient(teal, gold)` — مقطوع بـ background-clip: text | ❌ يعمل (ألوان عالمية) |
| `#progress-rail-fill` | style.css:538 | `linear-gradient(teal, gold)` | ❌ يعمل |
| `.letter-card::before` top bar | style.css:1171 | `linear-gradient(transparent, teal, transparent)` | ❌ يعمل |
| `.p6-big-play` radial gradient | style.css:2431 | **كحلي داكن** | ✅ نعم — حرج |
| `.p6-answer-zone.visible` | style.css:2502 | **كحلي داكن** | ✅ نعم — حرج |
| `.nav-btn.success` | style.css:3269 | `--th-success-gradient-*` ✓ | ❌ يستخدم tokens |

### Shadows

| العنصر | القيمة | هل يحتاج إصلاح؟ |
|---|---|---|
| `--th-shadow-sm/md/lg` | ✅ tokens تتجاوب | ❌ |
| `.p6-big-play` box-shadow | `rgba(14,124,123,*) + rgba(0,0,0,*)` | ⚠️ مقبول — teal glow + ظل طبيعي |
| `p6PlayWaiting` keyframe | `rgba(0,0,0,0.22)` hardcoded | ⚠️ متوسط — ظل ثقيل نسبياً |
| `.p6-answer-zone.visible` shadow | `rgba(0,0,0,0.22) + inset rgba(255,255,255,0.06)` | ✅ نعم |
| `.card-char` text-shadow | `rgba(0,0,0,0.4)` | ⚠️ متوسط |

### Pseudo-elements (::before / ::after)

| العنصر | المشكلة | هل يحتاج إصلاح؟ |
|---|---|---|
| `.p6-big-play::before` (emoji 🔈) | ❌ emoji لا يتأثر بالألوان | ❌ |
| `.p6-pair-play::before` (emoji) | ❌ نفس السبب | ❌ |
| `.letter-card::before` (خط علوي) | gradient teal — يعمل على الوضعين | ❌ |
| `.p6-answer-zone:not(.visible)::before` | نص "لوحة الإجابة" — `--text-dim` ✓ | ❌ |
| `.p6-answer-zone.visible::before` | ترويسة ذهبية — `--gold` ✓ | ❌ |
| `.is-playing::after` ripple | `rgba(14,124,123,*)` — teal يعمل | ❌ |

---

## 5. تقييم قابلية القراءة (Accessibility)

### Contrast Analysis — Light Mode

| العنصر | اللون | الخلفية | النسبة التقريبية | الحكم |
|---|---|---|---|---|
| نص أساسي | `#1A202C` | `#F0F4F8` | ~14:1 | ✅ ممتاز |
| نص ثانوي | `#4A5568` | `#F0F4F8` | ~6.5:1 | ✅ جيد |
| نص خافت | `#A0AEC0` | `#F0F4F8` | ~2.5:1 | ⚠️ ضعيف (لكن بتصميم — عناصر ثانوية) |
| **زر التقدم** | **`rgba(255,255,255,0.5)`** | **`rgba(14,124,123,0.35)`** | **~1.2:1** | **🔴 فاشل** |
| **زر التراجع** | **`rgba(255,255,255,0.25)`** | **شفاف/فاتح** | **~1.1:1** | **🔴 فاشل** |
| ألوان الحروف على أبيض | `#0E7C7B` / `#1E8449` / `#7C4DDB` / `#A8851E` | `#FFFFFF` | 4.5–5.5:1 | ✅ مقبول |
| Gold accent | `#C9A227` → `#A8851E` (light) | `#F0F4F8` | ~3.8:1 → ~4.5:1 | ✅ مقبول (مُعتَّم) |

### Contrast Analysis — Dark Mode

| العنصر | اللون | الخلفية | النسبة التقريبية | الحكم |
|---|---|---|---|---|
| نص أساسي | `#F8F9FA` | `#0A1F3D` | ~15:1 | ✅ ممتاز |
| نص ثانوي | `#B0BEC5` | `#0A1F3D` | ~8:1 | ✅ ممتاز |
| نص خافت | `#607D8B` | `#0A1F3D` | ~3.5:1 | ⚠️ مقبول (بتصميم) |
| Gold accent | `#C9A227` | `#0A1F3D` | ~5:1 | ✅ جيد |
| حالة Success | `#4ade80` | داكن | ~9:1 | ✅ ممتاز |
| حالة Error | `#f87171` | داكن | ~5:1 | ✅ جيد |

### وضوح الحروف العربية

| الوضع | الحكم | ملاحظة |
|---|---|---|
| Dark | ✅ | الحروف واضحة بخط Noto Naskh — ألوان الهوية مشرقة على خلفية داكنة |
| Light | ✅ | تعتيم `--color-tha` (#7C4DDB) و `--color-nun` (#A8851E) يحسّن الـ contrast |

### وضوح حالات التفاعل

| الحالة | Dark | Light | ملاحظة |
|---|---|---|---|
| Success (`--th-success`) | ✅ `#4ade80` | ✅ `#16a34a` | تتجاوب — أخضر فاتح/داكن حسب الوضع |
| Error (`--th-error`) | ✅ `#f87171` | ✅ `#dc2626` | تتجاوب — أحمر فاتح/داكن |
| Warning (gold) | ✅ `--gold` | ✅ `--gold` | ثابت — مقروء على الوضعين |
| Active (teal) | ✅ | ✅ | ثابت — هوية |

---

## 6. تقييم عام

### جاهزية Theme

| البند | الحالة |
|---|---|
| Token Foundation (Phase 1) | ✅ مكتمل — 30 token في :root + [data-theme="light"] |
| CSS Migration (Phase 2) | ✅ مكتمل — ~80 قيمة مُحوّلة |
| Runtime Controller (Phase 3C) | ✅ مكتمل — toggle + localStorage + FOUC prevention |
| Variable Bridging | ✅ مكتمل — 7 متغيرات أصلية مربوطة (93 استخدام) |
| Dark Mode سلامة | ✅ 100% مطابق للأصل |
| **Light Mode جودة بصرية** | ⚠️ **يحتاج إصلاح — 17 مشكلة مكتشفة** |

### نسبة الاكتمال

| الفئة | المحوّل | المتبقي | النسبة |
|---|---|---|---|
| Token-based colors (--th-*) | ~80 | 0 | 100% |
| Variable bridging (--bg-*, --text-*) | 7/7 | 0 | 100% |
| **CSS hardcoded values** | — | **~22 قيمة** | **تحتاج [data-theme="light"] overrides** |
| **JS/SVG inline values** | — | **~4 قيم SVG** | **تحتاج theme-aware rendering** |
| Letter identity colors | ثابت | — | ✓ بتصميم |

### تصنيف المشاكل حسب الأولوية

| الأولوية | العدد | التفصيل |
|---|---|---|
| 🔴 حرجة (غير قابل للاستخدام) | **5** | أزرار التحكم (advance/retreat) + P6 gradients |
| 🟡 عالية (تجربة سيئة) | **4** | P4 SVG zone + P2 teacher hint + P6 pair/close bg |
| 🟠 متوسطة (ملحوظ لكن يعمل) | **5** | P3 dots + card text-shadow + P4 SVG strokes + P6 waiting animation |
| ⚪ منخفضة (تحسين بصري) | **7** | خلفيات شبه شفافة (direction-demo, alpha-char, step-items, etc.) |

### المخاطر المتبقية

1. **خطر حرج:** أزرار التقدم/التراجع غير مرئية في Light Mode — المعلم لا يستطيع التحكم.
2. **خطر عالٍ:** P6 (أكبر مرحلة تفاعلية) تظهر بمظهر "داكن مُلصق" على صفحة فاتحة.
3. **خطر متوسط:** P4 SVG zone يظهر كمربع أسود — يُشوّه تجربة تعليم الكتابة.
4. **لا خطر على Dark Mode:** جميع التغييرات المطلوبة هي إضافة overrides داخل `[data-theme="light"]` فقط.

---

## 7. خطة Phase التالية المقترحة

### Phase 4: Light Mode Visual Fix — إصلاح المشاكل البصرية في الوضع النهاري

**المبدأ:** إضافة قواعد `[data-theme="light"]` overrides فقط — لا تغيير في Dark Mode.

#### الخطوة 1 — حرجة (5 مشاكل):
- `[data-theme="light"] .main-btn.advance` — لون نص وخلفية مناسبين للفاتح.
- `[data-theme="light"] .main-btn.retreat` — لون نص وحدود مرئية.
- `[data-theme="light"] .p6-big-play` — gradient فاتح بدل كحلي.
- `[data-theme="light"] .p6-answer-zone.visible` — خلفية فاتحة.
- `[data-theme="light"] .p6-pair-play` / `.p6-close-btn` — خلفية فاتحة.

#### الخطوة 2 — عالية (4 مشاكل):
- `[data-theme="light"] .p4-svg-zone` — خلفية فاتحة شبه شفافة.
- `[data-theme="light"] .p2-teacher-hint` — خلفية فاتحة.
- P4 SVG strokes — تحويل `rgba(255,255,255,*)` إلى `currentColor` أو theme-aware (يتطلب JS).

#### الخطوة 3 — متوسطة (5 مشاكل):
- `.p3-dot` خلفية — `[data-theme="light"]` override.
- `.card-char` text-shadow — تخفيف أو إلغاء في Light.
- P6 waiting animations — تعديل keyframes أو override.

#### الخطوة 4 — منخفضة (7 مشاكل):
- استبدال `rgba(255,255,255,0.02–0.04)` بقيم `--th-bg-hover` أو إضافة light overrides.

**القيد الثابت:**
- لا تغيير lesson-01.js.
- لا تغيير Architecture.
- Dark Mode = لا تغيير 100%.
- ألوان الحروف التعليمية = ثابتة.

---

*نهاية التقرير*
