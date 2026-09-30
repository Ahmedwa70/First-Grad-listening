# QD-17: SVG Articulation Asset Architecture
# معمارية أصول SVG لتصوير النطق العربي

---

| الحقل | القيمة |
|-------|--------|
| **Decision ID** | QD-17-SVG |
| **Date** | 2026-08-10 |
| **Status** | **Approved** |
| **Approved** | 2026-08-10 — Hybrid Layered SVG System معتمد رسمياً كمعمارية أصول L5 |
| **Parent** | QD-17 — AMLSA (Approved) |
| **Layer** | L5 — Articulation Visualization |
| **Scope** | Asset Architecture — نظام ملفات SVG وعلاقتها بالبيانات |
| **Roles** | Arabic Phonetics Visualization Specialist, SVG System Architect, Instructional Designer, Language Learning Experience Designer |

---

## 1. Context — السياق

### 1.1 ما تم إنجازه

| المرحلة | الحالة |
|---------|-------|
| AMLSA Architecture | ✅ Approved |
| L5 Data Foundation (`articulation` object) | ✅ Implemented — حرف ث |
| L5 Engine (`ArticulationEngine`) | ✅ Implemented — 9 دوال |
| L5 Viewer MVP (بطاقة نصية في P2) | ✅ Implemented — نصوص فقط |
| **L5 SVG Assets** | **❌ هذا القرار** |

### 1.2 الحاجة

Viewer MVP يعرض نصوصاً فقط ("طرف اللسان بين الأسنان"). الطالب A0 يحتاج **صورة** — رسم بصري يُظهر ما لا يمكن شرحه بالكلمات. Doc 07 تحدد `mouth_th_1.svg`, `mouth_th_2.svg`, `mouth_th_3.svg` كأصول مطلوبة.

### 1.3 القيود الحاكمة

| القيد | المصدر |
|-------|--------|
| Offline-first — لا مكتبات خارجية | PROJECT_CONTEXT |
| بروجكتور 1920×1080 — وضوح من مسافة 5+ أمتار | PROJECT_CONTEXT |
| RTL + عربي أولاً | DESIGN_PHILOSOPHY |
| Dark/Light themes | النظام الحالي |
| `DATA → ENGINE → VIEW` | ARCHITECTURE_RULES |
| 28 حرف عبر 16 محاضرة | المنهج |

---

## 2. Design Goals — أهداف التصميم

| الهدف | الأولوية | الوصف |
|-------|---------|-------|
| **الوضوح التعليمي** | P0 | الطالب يفهم أين يضع لسانه من النظرة الأولى |
| **القراءة من بعد** | P0 | مرئي على بروجكتور من آخر صف (5+ أمتار) |
| **قابلية التوسع** | P1 | نفس النظام يغطي 28 حرفاً بدون إعادة تصميم |
| **خفة الوزن** | P1 | ملفات صغيرة — لا تبطئ تحميل الصفحة |
| **التوافق مع الثيم** | P2 | يعمل في Dark و Light |
| **القابلية للتحريك** | P2 | يدعم CSS animation مستقبلاً |

---

## 3. Compared Models — المقارنة بين أنواع الرسم

### Model A: رسم فم واقعي (Realistic)

```
صورة فوتوغرافية أو رسم واقعي تفصيلي لتجويف الفم
```

| الجانب | التقييم |
|--------|---------|
| الدقة التشريحية | ✅ عالية جداً |
| الوضوح من بعد | ❌ التفاصيل تتلاشى على البروجكتور |
| الوزن | ❌ ثقيل (صور أو SVG معقد) |
| القابلية للتحريك | ❌ صعب — كل إطار ملف منفصل |
| التوسع | ❌ يحتاج رسام محترف لكل صوت |
| الملاءمة للجمهور | ❌ A0 لا يحتاج تشريح طبي — يحتاج توجيه حركي |
| Dark/Light | ❌ يحتاج نسختين |

**مرفوض**: مبالغة تشريحية لا تخدم المبتدئ.

### Model B: رسم تشريحي مبسط (Simplified Anatomical)

```
مقطع جانبي (sagittal cross-section) مبسط للرأس
يُظهر: الشفتين، الأسنان، اللسان، الحنك، الحلق
```

| الجانب | التقييم |
|--------|---------|
| الدقة | ✅ كافية — يُظهر المخرج بوضوح |
| الوضوح من بعد | ✅ خطوط واضحة بألوان متباينة |
| الوزن | ✅ SVG بسيط (<5KB) |
| القابلية للتحريك | ✅ عناصر منفصلة يمكن تحريكها بـ CSS |
| التوسع | ⚠️ يحتاج تعديل وضع اللسان لكل صوت |
| الملاءمة | ✅ معيار عالمي في تعليم الصوتيات |
| Dark/Light | ✅ currentColor + CSS variables |

**مقبول جزئياً**: الأقرب للحل لكن يحتاج نظام طبقات.

### Model C: رسم تعليمي Vector (Instructional Vector)

```
أيقونات بسيطة جداً — سهم + فم مفتوح + موضع لسان
بدون مقطع جانبي — منظر أمامي فقط
```

| الجانب | التقييم |
|--------|---------|
| البساطة | ✅ أبسط ما يمكن |
| الوضوح من بعد | ✅ ممتاز |
| الدقة | ❌ لا تُظهر مخارج الحروف الحلقية والبلعومية (ع، ح، خ، غ) |
| التوسع | ❌ المنظر الأمامي لا يكفي — الأصوات الخلفية غير مرئية |
| الملاءمة | ⚠️ جيد للشفوية والأسنانية، عاجز عن الحلقية |

**مرفوض**: لا يغطي أصوات العربية الفريدة (الحلقية والبلعومية).

### Model D: Hybrid System — نظام هجين

```
Base Anatomy (مقطع جانبي ثابت)
  + Dynamic Tongue Layer (وضع اللسان متغير)
  + Dynamic Airflow Layer (مسار الهواء متغير)
  + Highlight Markers (تمييز منطقة النطق)
```

| الجانب | التقييم |
|--------|---------|
| الدقة | ✅ مقطع جانبي يُظهر كل المخارج |
| الوضوح | ✅ طبقة التمييز تلفت النظر للمنطقة الصحيحة |
| الوزن | ✅ قاعدة واحدة (<3KB) + طبقات صغيرة (<1KB) |
| القابلية للتحريك | ✅ كل طبقة مستقلة — CSS transitions |
| التوسع | ✅ نفس القاعدة لـ 28 حرف — فقط الطبقات تتغير |
| الصيانة | ✅ تعديل طبقة واحدة لا يكسر الباقي |
| Dark/Light | ✅ currentColor + CSS variables |

**✅ مقبول**: الأفضل لكل المعايير.

---

## 4. Chosen Architecture — المعمارية المختارة

### 4.1 القرار

**Model D — Hybrid Layered SVG System**

### 4.2 المبدأ

```
Base Anatomy (ثابت لكل الحروف)
     ↓
Tongue Position (متغير حسب الحرف)
     ↓
Airflow Path (متغير حسب الحرف)
     ↓
Highlight Zone (متغير حسب الحرف)
```

### 4.3 لماذا هذا الحل؟

| البديل | السبب الرئيسي للرفض |
|--------|---------------------|
| A (واقعي) | ثقيل + لا يتكيف مع الثيم + يحتاج رسام |
| B (تشريحي) | جيد لكن بدون نظام طبقات = ملف لكل حرف |
| C (أيقوني) | لا يغطي الحلقية والبلعومية |
| **D (هجين)** | **قاعدة واحدة + طبقات = أقل ملفات + أعلى مرونة** |

---

## 5. Asset Structure — هيكل الملفات

### 5.1 الهيكل المقترح

```
assets/
└── articulation/
    ├── base/
    │   └── sagittal-base.svg          ← المقطع الجانبي الأساسي (واحد لكل الحروف)
    │
    ├── tongue/
    │   ├── tongue-tip-between-teeth.svg    ← ث ذ ظ
    │   ├── tongue-tip-alveolar.svg         ← ت د ن ل ر ط ض ص ز س
    │   ├── tongue-blade-postalveolar.svg   ← ش ج
    │   ├── tongue-back-velar.svg           ← ك غ خ
    │   ├── tongue-back-uvular.svg          ← ق
    │   ├── tongue-root-pharyngeal.svg      ← ع ح
    │   └── tongue-neutral.svg             ← ب م و ف هـ ء ي
    │
    ├── airflow/
    │   ├── airflow-oral-continuous.svg     ← احتكاكي (ث ذ ف س ز ش خ غ ح هـ)
    │   ├── airflow-oral-stop.svg           ← انفجاري (ب ت د ط ض ك ق ء)
    │   ├── airflow-nasal.svg              ← أنفي (ن م)
    │   ├── airflow-lateral.svg            ← جانبي (ل)
    │   └── airflow-trill.svg              ← تكراري (ر)
    │
    └── highlight/
        ├── highlight-lips.svg             ← ب م و ف
        ├── highlight-teeth.svg            ← ث ذ ظ
        ├── highlight-alveolar.svg         ← ت د ن ل ر ط ض ص ز س
        ├── highlight-postalveolar.svg     ← ش ج
        ├── highlight-velar.svg            ← ك غ خ
        ├── highlight-uvular.svg           ← ق
        ├── highlight-pharyngeal.svg       ← ع ح
        └── highlight-glottal.svg          ← هـ ء
```

### 5.2 إحصائيات

| النوع | العدد | الوصف |
|-------|-------|-------|
| Base | 1 | مقطع جانبي واحد |
| Tongue | 7 | أوضاع اللسان الرئيسية |
| Airflow | 5 | أنماط مرور الهواء |
| Highlight | 8 | مناطق التمييز (= مخارج الحروف) |
| **المجموع** | **21** | **تغطي 28 حرفاً** |

**مقارنة**: 21 ملف SVG بسيط بدلاً من 28+ ملف معقد (Model A/B).

### 5.3 كيف يُبنى رسم كل حرف؟

```
حرف ث = sagittal-base + tongue-tip-between-teeth + airflow-oral-continuous + highlight-teeth
حرف ب = sagittal-base + tongue-neutral          + airflow-oral-stop       + highlight-lips
حرف ع = sagittal-base + tongue-root-pharyngeal  + airflow-oral-continuous + highlight-pharyngeal
حرف ن = sagittal-base + tongue-tip-alveolar     + airflow-nasal          + highlight-alveolar
```

كل حرف = **تركيب 4 طبقات** — لا ملف فريد.

---

## 6. Data Integration Strategy — استراتيجية ربط البيانات

### 6.1 القرار: نظام هجين (Lesson Data + Asset Registry)

#### داخل lesson-01.js (ما هو موجود + التوسعة)

```javascript
articulation: {
  // --- موجود حالياً ---
  place:       'interdental',
  manner:      'fricative',
  voicing:     'voiceless',
  tongue:      'tip-between-teeth',
  lips:        'relaxed',
  airflow:     'continuous-oral',
  difficulty:  'critical',
  template:    'interdental',
  
  // --- توسعة مقترحة ---
  svgFile:     null,  // يبقى null — يُحسب تلقائياً من الطبقات
  layers: {
    base:      'sagittal-base',
    tongue:    'tongue-tip-between-teeth',
    airflow:   'airflow-oral-continuous',
    highlight: 'highlight-teeth',
  },
}
```

#### لماذا `layers` بدلاً من `svgFile`؟

| `svgFile` (ملف واحد) | `layers` (تركيب) |
|----------------------|------------------|
| ❌ يحتاج ملف فريد لكل حرف | ✅ يُركّب من 4 طبقات مشتركة |
| ❌ لا يدعم Animation بين الأوضاع | ✅ كل طبقة مستقلة = CSS transition |
| ❌ تكرار (كل ملف يحتوي المقطع الجانبي) | ✅ القاعدة مشتركة |

#### متى يُحسب `svgFile`؟

`svgFile` يبقى كحقل **للتوافق المستقبلي** — إذا كان حرف يحتاج رسماً مخصصاً لا يتبع نظام الطبقات (حالة نادرة)، يُملأ `svgFile` ويتجاوز `layers`.

### 6.2 ENGINE Extension المقترح

```javascript
// في ArticulationEngine — دالة مستقبلية
getLayerPaths(letterId) {
  const art = this.getArticulation(letterId);
  if (!art) return null;
  
  if (art.svgFile) return { single: art.svgFile };
  
  if (art.layers) return {
    base:      `assets/articulation/base/${art.layers.base}.svg`,
    tongue:    `assets/articulation/tongue/${art.layers.tongue}.svg`,
    airflow:   `assets/articulation/airflow/${art.layers.airflow}.svg`,
    highlight: `assets/articulation/highlight/${art.layers.highlight}.svg`,
  };
  
  return null;
}
```

---

## 7. Animation Strategy — استراتيجية التحريك

### 7.1 المبدأ

```
لا JavaScript animation.
CSS transitions + CSS keyframes فقط.
المعلم يتحكم بالتقدم — لا تشغيل تلقائي.
```

### 7.2 كيف يعمل؟

كل إطار من `articulation.steps` يقابل **حالة CSS class**:

```
Step 1: .art-frame-1  → القاعدة + الفم مفتوح (tongue مخفي)
Step 2: .art-frame-2  → اللسان يظهر في موضعه (tongue visible, transition)
Step 3: .art-frame-3  → مسار الهواء يظهر (airflow visible, highlight pulse)
```

المعلم يضغط Space للانتقال بين الإطارات — نفس نظام Progressive Reveal الموجود.

### 7.3 تطبيق على حرف ث

| الإطار | الحالة البصرية | الطبقات المرئية |
|--------|---------------|----------------|
| **Frame 1** | فم مفتوح — وضع البداية | `base` فقط |
| **Frame 2** | اللسان يظهر بين الأسنان | `base` + `tongue` (fade-in) |
| **Frame 3** | مسار الهواء يتدفق | `base` + `tongue` + `airflow` (dash animation) |
| **Frame 4** | تمييز منطقة النطق | `base` + `tongue` + `airflow` + `highlight` (pulse) |

### 7.4 CSS Transitions المقترحة

```css
.art-tongue    { opacity: 0; transition: opacity 0.4s ease; }
.art-airflow   { opacity: 0; stroke-dashoffset: 100%; transition: all 0.6s ease; }
.art-highlight { opacity: 0; transition: opacity 0.3s ease; }

.art-frame-2 .art-tongue    { opacity: 1; }
.art-frame-3 .art-airflow   { opacity: 1; stroke-dashoffset: 0; }
.art-frame-4 .art-highlight { opacity: 1; animation: pulse 1.5s ease infinite; }
```

---

## 8. Scalability Analysis — تحليل القابلية للتوسع

### 8.1 اختبار على 11 حرفاً

| الحرف | Place | Tongue | Airflow | Highlight | يحتاج ملف جديد؟ |
|-------|-------|--------|---------|-----------|----------------|
| **ب** | شفوية | neutral | oral-stop | lips | ❌ كل الملفات موجودة |
| **ت** | لثوية | tip-alveolar | oral-stop | alveolar | ❌ |
| **ث** | بين-أسنانية | tip-between-teeth | oral-continuous | teeth | ❌ |
| **ع** | بلعومية | root-pharyngeal | oral-continuous | pharyngeal | ❌ |
| **ح** | بلعومية | root-pharyngeal | oral-continuous | pharyngeal | ❌ (نفس ع) |
| **خ** | طبقية | back-velar | oral-continuous | velar | ❌ |
| **غ** | طبقية | back-velar | oral-continuous | velar | ❌ (نفس خ) |
| **ص** | لثوية مفخمة | tip-alveolar | oral-continuous | alveolar | ⚠️ يحتاج طبقة emphasis إضافية |
| **ض** | لثوية مفخمة | tip-alveolar | oral-stop | alveolar | ⚠️ emphasis |
| **ط** | لثوية مفخمة | tip-alveolar | oral-stop | alveolar | ⚠️ emphasis |
| **ظ** | بين-أسنانية مفخمة | tip-between-teeth | oral-continuous | teeth | ⚠️ emphasis |

### 8.2 اكتشاف: طبقة خامسة — Emphasis

الأصوات المفخمة (ص ض ط ظ) تحتاج **طبقة إضافية** تُظهر تراجع اللسان وتضخم تجويف الفم:

```
assets/articulation/
└── emphasis/
    └── emphasis-retracted-tongue.svg   ← طبقة واحدة لكل المفخمات
```

**التحديث**: المجموع = **22 ملف SVG** (21 + 1 emphasis).

### 8.3 تغطية 28 حرفاً

| المجموعة | الحروف | Tongue | Airflow | ملاحظة |
|----------|--------|--------|---------|--------|
| شفوية | ب م و ف | neutral | stop/nasal/cont. | ف: continuous |
| بين-أسنانية | ث ذ ظ | tip-between-teeth | continuous | ظ: +emphasis |
| لثوية | ت د ن ل ر ط ض ص ز س | tip-alveolar | متنوع | ط ض ص: +emphasis |
| غاري-لثوية | ش ج | blade-postalveolar | continuous/stop | — |
| طبقية | ك غ خ | back-velar | stop/continuous | — |
| لهوية | ق | back-uvular | stop | — |
| بلعومية | ع ح | root-pharyngeal | continuous | — |
| حنجرية | هـ ء | neutral | continuous/stop | — |
| شبه صوتية | ي | blade-postalveolar | continuous | يشارك مع ش ج |

**النتيجة**: 22 ملف SVG تغطي 28 حرفاً بالكامل. لا حرف يحتاج ملفاً فريداً.

---

## 9. SVG Design Specifications — مواصفات تصميم SVG

### 9.1 ViewBox

```
viewBox="0 0 200 200"
```

مربع 200×200 — يتكيف مع أي حجم عرض.

### 9.2 لغة التصميم

| العنصر | المواصفة |
|--------|---------|
| **الخطوط** | `stroke: currentColor` — يتكيف مع الثيم |
| **السماكة** | `stroke-width: 2` — مرئي من بعد |
| **الألوان** | متغيرات CSS: `var(--teal)` للسان، `var(--gold)` للهواء، `var(--th-error)` للتمييز |
| **الزوايا** | مدورة — `stroke-linecap: round`, `stroke-linejoin: round` |
| **الاتجاه** | مقطع جانبي — الفم يسار، الحلق يمين (معيار صوتيات) |
| **التعقيد** | ≤ 15 path عنصر لكل طبقة |
| **الحجم** | ≤ 3KB لكل ملف SVG |

### 9.3 تعريف الطبقات داخل SVG

```xml
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Base: دائماً مرئي -->
  <g class="art-base" data-layer="base">
    <!-- الشفتان، الأسنان، الحنك، الجدار الخلفي -->
  </g>
  
  <!-- Tongue: يظهر في Frame 2 -->
  <g class="art-tongue" data-layer="tongue">
    <!-- شكل اللسان في الوضع المطلوب -->
  </g>
  
  <!-- Airflow: يظهر في Frame 3 -->
  <g class="art-airflow" data-layer="airflow">
    <!-- أسهم/خطوط متقطعة لمسار الهواء -->
  </g>
  
  <!-- Highlight: يظهر في Frame 4 -->
  <g class="art-highlight" data-layer="highlight">
    <!-- دائرة/حلقة نابضة حول منطقة النطق -->
  </g>
</svg>
```

---

## 10. مثال تفصيلي: حرف ث

### 10.1 التركيب

```
ث = sagittal-base
  + tongue-tip-between-teeth
  + airflow-oral-continuous
  + highlight-teeth
```

### 10.2 الإطارات

| الإطار | ما يُضاف | ما يراه الطالب | ما يقوله المعلم |
|--------|---------|---------------|----------------|
| **F1** | `base` | فم مفتوح — أسنان ظاهرة | "شاهدوا الفم" |
| **F2** | `+ tongue` | لسان يخرج بين الأسنان العليا والسفلى | "اللسان يخرج بين الأسنان" |
| **F3** | `+ airflow` | سهم هواء يتدفق فوق اللسان | "الهواء يمر فوق اللسان" |
| **F4** | `+ highlight` | منطقة الأسنان تنبض بلون مميز | "هذا هو مخرج صوت ث" |

### 10.3 البيانات في lesson-01.js

```javascript
articulation: {
  // ... الحقول الموجودة حالياً ...
  layers: {
    base:      'sagittal-base',
    tongue:    'tongue-tip-between-teeth',
    airflow:   'airflow-oral-continuous',
    highlight: 'highlight-teeth',
  },
  frames: [
    { id: 1, layers: ['base'],                                ar: 'افتح فمك قليلاً' },
    { id: 2, layers: ['base', 'tongue'],                      ar: 'أخرج طرف لسانك بين أسنانك' },
    { id: 3, layers: ['base', 'tongue', 'airflow'],           ar: 'انفخ الهواء برفق' },
    { id: 4, layers: ['base', 'tongue', 'airflow', 'highlight'], ar: 'هذا مخرج صوت الثاء' },
  ],
}
```

---

## 11. Implementation Roadmap — خطة التنفيذ

### المرحلة 1: حرف ث (Proof of Concept)

| الخطوة | الوصف | الملفات |
|--------|-------|---------|
| 1.1 | رسم `sagittal-base.svg` | `assets/articulation/base/` |
| 1.2 | رسم `tongue-tip-between-teeth.svg` | `assets/articulation/tongue/` |
| 1.3 | رسم `airflow-oral-continuous.svg` | `assets/articulation/airflow/` |
| 1.4 | رسم `highlight-teeth.svg` | `assets/articulation/highlight/` |
| 1.5 | إضافة `layers` + `frames` في lesson-01.js | `js/lesson-01.js` |
| 1.6 | توسعة `ArticulationEngine.getLayerPaths()` | `js/app.js` |
| 1.7 | توسعة Viewer لعرض SVG بدل النص | `js/app.js` + `css/style.css` |
| 1.8 | اختبار على بروجكتور | — |

### المرحلة 2: حروف المحاضرة 1 (ب ت ن)

| الخطوة | الوصف |
|--------|-------|
| 2.1 | إضافة `articulation` لـ ب ت ن |
| 2.2 | رسم الطبقات المفقودة: `tongue-neutral`, `tongue-tip-alveolar`, `airflow-oral-stop`, `airflow-nasal`, `highlight-lips`, `highlight-alveolar` |
| 2.3 | اختبار التبديل بين الحروف في P2 |

### المرحلة 3: باقي المحاضرات (2–16)

| الخطوة | الوصف |
|--------|-------|
| 3.1 | إضافة `articulation` لكل حرف جديد |
| 3.2 | رسم الطبقات المفقودة حسب الحاجة |
| 3.3 | إضافة `emphasis-retracted-tongue.svg` عند الوصول للمفخمات |

---

## 12. Risks & Mitigations — المخاطر

| المخاطرة | الاحتمال | التخفيف |
|----------|---------|---------|
| رسم SVG يحتاج وقتاً طويلاً | متوسط | البدء بحرف واحد (ث) + القاعدة تُعاد استخدامها |
| المقطع الجانبي غير واضح للطفل | منخفض | الجمهور جامعي 18+ — المقطع الجانبي معيار صوتيات |
| أداء تحميل 22 SVG | منخفض | Lazy load — يُحمّل فقط عند الحاجة + حجم ≤ 3KB/ملف |
| عدم توافق مع ثيم | منخفض | `currentColor` + CSS variables |

---

## 13. القرار النهائي

### المعمارية

**Model D — Hybrid Layered SVG System** مع 5 أنواع طبقات:
1. **Base** (1 ملف) — المقطع الجانبي الثابت
2. **Tongue** (7 ملفات) — أوضاع اللسان
3. **Airflow** (5 ملفات) — أنماط الهواء
4. **Highlight** (8 ملفات) — مناطق التمييز
5. **Emphasis** (1 ملف) — طبقة التفخيم

**المجموع**: 22 ملف SVG تغطي 28 حرفاً.

### ربط البيانات

نظام هجين: `layers` object داخل `articulation` في lesson data + `getLayerPaths()` في ENGINE.

### التحريك

CSS transitions + teacher-controlled Progressive Reveal (Space). لا JavaScript animation.

---

*هذه وثيقة Architecture Decision. لا تتضمن أي تنفيذ أو أصول SVG.*

*Status: Approved — اعتُمد رسمياً بتاريخ 2026-08-10.*
