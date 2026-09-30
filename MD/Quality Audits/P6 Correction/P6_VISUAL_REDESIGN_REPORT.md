# P6 Visual Redesign Report — Professional Learning Experience

> **التاريخ:** 15 أغسطس 2026  
> **النطاق:** P6 Presentation Layer فقط (CSS + Demo Rendering)  
> **الحالة:** مكتمل — جميع الشاشات مختبرة بدون أخطاء

---

## الهدف

تحويل P6 من شاشة تشبه اختبارًا تقليديًا إلى تجربة تعلم احترافية مع:
- هرمية طباعية واضحة
- توزيع متوازن للمساحات
- أزرار تنقل ثانوية بصريًا
- إطار تعلم ثابت
- انتقالات هادئة

---

## المشكلات المحلولة

### 1. العناوين الكبيرة جدًا
| العنصر | قبل | بعد |
|--------|-----|-----|
| `.p6-instruction` | `clamp(1.2rem, 2.15vw, 1.8rem)` weight 800 | `clamp(0.95rem, 1.7vw, 1.25rem)` weight 700 |
| `.p6-question-text` | `clamp(1.35rem, 2.5vw, 2rem)` weight 800 | `clamp(1.15rem, 2vw, 1.55rem)` weight 700 |
| `.p6-demo-text-ar` | `clamp(1.3rem, 2.5vw, 2rem)` weight 800 | `clamp(1.1rem, 2vw, 1.5rem)` weight 700 |

**النتيجة:** التركيز انتقل من العنوان إلى النشاط التعليمي.

### 2. الفراغات الكبيرة غير المستغلة
| العنصر | قبل | بعد |
|--------|-----|-----|
| `.p6-container` width | `min(100%, 1180px)` | `min(100%, 960px)` |
| `.p6-container` gap | `clamp(0.5rem, 1vh, 0.85rem)` | `clamp(0.3rem, 0.7vh, 0.5rem)` |
| `.p6-main` justify | `flex-start` | `center` |
| `.p6-main` gap | `clamp(0.6rem, 1.4vh, 1rem)` | `clamp(0.4rem, 1vh, 0.7rem)` |
| `.p6-play-zone` max-height | `clamp(14rem, 32vh, 22rem)` | `clamp(10rem, 24vh, 16rem)` |

**النتيجة:** المحتوى متمركز بصريًا بدون فراغات مهدرة.

### 3. صفحات التعليمات الموحدة (Static Frame)
- `renderP6Demo()` يبني الإطار مرة واحدة ويحدث المحتوى فقط
- الانتقال بـ opacity fade 250ms
- Header, badge, progress, footer ثابتة بين الخطوات
- Step 2: شبكة بطاقات بصرية (`.p6-finger-grid`)
- Step 3: مقارنة بصرية واضحة (`.p6-demo-compare`)

### 4. هرمية التعليمات → الصوت → التفاعل → التغذية الراجعة
- `.p6-instruction` أصبح ثانويًا (color: `--text-secondary`)
- زر الصوت أصغر وأوضح كعنصر تفاعل أساسي
- منطقة الإجابة مضغوطة (`min-height: clamp(4.5rem, 10vh, 7rem)`)
- أزرار التنقل ثانوية بصريًا

### 5. الانتقالات الهادئة
- جميع transitions مخفضة إلى 200-300ms ease-out
- لا scale في أي hover (فقط `translateY(-2px)`)
- لا blur أو filter في أي animation
- Demo content fade: 250ms

### 6. أزرار التنقل الثانوية
| العنصر | قبل | بعد |
|--------|-----|-----|
| `.p6-reveal-btn, .p6-next-btn` width | `min(100%, 560px)` | `min(100%, 420px)` |
| min-height | `3.2rem` | `2.6rem` |
| font-size | `clamp(1.05rem, 1.9vw, 1.3rem)` | `clamp(0.9rem, 1.6vw, 1.1rem)` |
| font-weight | 800 | 700 |
| box-shadow | `0 6px 18px rgba(0,0,0,0.16)` | `0 2px 8px rgba(0,0,0,0.1)` |

---

## الملفات المعدلة

### `css/style.css` — تغييرات CSS فقط

| القسم | عدد القواعد المعدلة | نوع التغيير |
|-------|---------------------|-------------|
| `.p6-container` | 3 | width, gap, padding مضغوطة |
| `.p6-instruction` | 4 | حجم أصغر، وزن أخف، لون ثانوي |
| `.p6-main` | 3 | justify center, gap أصغر |
| `.p6-stage` | 2 | justify center, gap أصغر |
| `.p6-controls` | 1 | gap أصغر |
| `.p6-big-play` | 8 | أبعاد أصغر، border أنحف، shadow أخف |
| `.p6-big-play::before` | 3 | أيقونة أصغر |
| `.p6-question-text` | 2 | حجم ووزن أصغر |
| `.p6-answer-zone` | 4 | width, min-height, gap, padding أصغر |
| `.p6-answer-zone::before` | 1 | إزالة نص "لوحة الإجابة" |
| `.p6-answer-char` | 1 | حجم أصغر |
| `.p6-same-badge` | 3 | حجم ووزن و padding أصغر |
| `.p6-pair-zone` | 2 | max-height, gap أصغر |
| `.p6-pair-play` | 8 | أبعاد وخط أصغر، transitions أقصر |
| `.p6-pair-play::before` | 2 | أيقونة أصغر |
| `.p6-pair-sep` | 3 | أصغر |
| `.p6-close-zone` | 2 | max-height, gap أصغر |
| `.p6-close-btn` | 2 | min-width, min-height أصغر |
| `.p6-close-char` | 1 | حجم أصغر |
| `.p6-note-box` | 3 | حجم أصغر، border أنحف |
| `.p6-reveal-btn, .p6-next-btn` | 6 | أصغر وأخف بصريًا |
| `.p6-pair-play:hover` | 2 | بدون scale |
| `.p6-close-btn:hover` | 2 | بدون scale |
| `.p6-pair-zone::before` | 2 | حجم ووزن أصغر |
| `.p6-demo` | 3 | gap, padding, animation أصغر |
| `.p6-demo-text-ar` | 2 | حجم ووزن أصغر |
| `.p6-demo-play` | 2 | أصغر |
| `.p6-demo-footer` | 1 | width أصغر |
| `.p6-demo-footer .p6-next-btn` | 1 | width محددة |

### `js/app.js` — `renderP6Demo()` (سطر 1916)
- Static Frame pattern: بناء الإطار مرة واحدة
- DOM API للتحديثات بدل innerHTML
- Step 2: `.p6-finger-grid` بطاقات بصرية
- Step 3: `.p6-demo-compare` مقارنة بصرية
- Opacity fade 250ms للمحتوى الديناميكي

---

## التأكد أن Activity Engine لم يتأثر

| الفحص | النتيجة |
|-------|---------|
| `advanceP6()` | لم يتغير |
| `renderP6()` | لم يتغير |
| `p6ApplyReveal()` | لم يتغير |
| `getCurrentP6Round()` | لم يتغير |
| `P6Performance` | لم يتغير |
| `STATE` variables | لم تتغير |
| `LESSON_01` data | لم يتغير |
| Keyboard navigation | يعمل كما كان |
| P1-P5, P7 | لا تأثير |

---

## نتائج الاختبار

| السيناريو | Dark | Light |
|-----------|------|-------|
| Demo Step 1 (Activity Introduction) | ✅ | ✅ |
| Demo Step 2 (Finger Mapping Grid) | ✅ | ✅ |
| Demo Step 3 (Same/Different Compare) | ✅ | ✅ |
| Demo → D1 transition | ✅ | ✅ |
| D1 — play + reveal + advance | ✅ | ✅ |
| D2 — pair play + reveal | ✅ | ✅ |
| D3 — close buttons + reveal | ✅ | ✅ |
| Round navigation (tabs) | ✅ | ✅ |
| Retreat navigation | ✅ | ✅ |
| Obs buttons (✓/✗) | ✅ | ✅ |
| P1 regression | ✅ | — |
| Console errors | ✅ صفر | ✅ صفر |

---

## مبادئ التصميم المطبقة

| المبدأ | التطبيق |
|--------|---------|
| Stable Learning Frame | الإطار ثابت، المحتوى فقط يتغير |
| Typography Hierarchy | 4 مستويات: عنوان المرحلة → هدف التعلم → تعليمات → صيني |
| Cognitive Load Reduction | أحجام أصغر، فراغات أقل، تركيز على النشاط |
| Secondary Navigation | أزرار أصغر، ظلال أخف، ألوان أهدأ |
| Motion Rules | opacity fade فقط، 200-300ms، بدون scale/blur/slide |
| Fixed Learning Layout | منطقة الصوت والسؤال ثابتة، منطقة الإجابة تمتص المساحة المتبقية |
| Professional Learning Tool | شبكة بطاقات بصرية، مقارنة واضحة، هرمية طباعية |

---

## إصلاح ثبات التخطيط (Layout Stability Fix) — 15 أغسطس 2026

### المشكلة
عند كشف الإجابة في D1/D2/D3، كان زر تشغيل الصوت وعنوان السؤال والترجمة الصينية تقفز عموديًا بسبب إعادة توزيع المساحة في `justify-content: center`.

### السبب الجذري
- `.p6-stage` يستخدم `justify-content: center` — يعيد توزيع المساحة عند تغير حجم الأبناء
- `.p6-play-zone` / `.p6-pair-zone` / `.p6-close-zone` تستخدم `flex: 1 0 auto` — تنمو لملء المساحة
- عند ظهور محتوى الإجابة، تتقلص المناطق الأخرى ويتغير مركز التوزيع

### الحل

| التغيير | قبل | بعد |
|---------|-----|-----|
| `.p6-stage` justify-content | `center` | `flex-start` |
| `.p6-play-zone` flex | `1 0 auto` + `max-height` | `0 0 auto` (حجم ثابت) |
| `.p6-pair-zone` flex | `1 0 auto` + `max-height` | `0 0 auto` (حجم ثابت) |
| `.p6-close-zone` flex | `1 0 auto` + `max-height` | `0 0 auto` (حجم ثابت) |
| `.p6-answer-zone` flex | (غير محدد) | `1 0 0` (تمتص المساحة المتبقية) |

### نتائج القياس (بكسل)

| العنصر | قبل الكشف | بعد الكشف | الفرق |
|--------|-----------|-----------|-------|
| D1 play button top | 170.917 | 170.917 | 0 |
| D1 question top | 282.021 | 282.021 | 0 |
| D2 pair1 top | 225.792 | 225.792 | 0 |
| D2 question top | 483.135 | 483.135 | 0 |
| D3 btn1 top | 247.125 | 247.125 | 0 |
| D3 question top | 354.708 | 354.708 | 0 |
| Q1→Q2 play top | 170.917 | 170.917 | 0 |
