# DEVELOPMENT_ROADMAP.md — خطة التطوير

> آخر تحديث: 2026-08-05. خطة الانتقال من Lesson 01 المكتمل إلى Template قابل لإنتاج دروس متعددة.
> المصادر: CURRENT_STATE.md, PROJECT_DECISIONS.md, SOURCE_OF_TRUTH.md, Work Plan (Docs 01-07).

---

## نظرة عامة

```
Phase 0          Phase 1           Phase 2          Phase 3           Phase 4
القرارات ──────→ إكمال Lesson 01 ──→ تلميع ──────→ استخراج Template ──→ Lesson 02+
(لا كود)         (محتوى + صوت)      (اختبار)        (معمارية)           (إنتاج)
  1 يوم           3-5 أيام          1-2 يوم         3-5 أيام          1-2 يوم/درس
```

---

## Phase 0 — القرارات + الاختبار الصفي

**الحالة**: ◄ نحن هنا
**المدة**: يوم واحد
**كود**: لا

### لماذا هذه المرحلة أولاً؟

4 قرارات تربوية/معمارية معلّقة (PROJECT_DECISIONS.md). كتابة كود قبل حسمها تعني إما هدم العمل لاحقاً أو تراكم تناقضات. كذلك لم يُختبر الدرس على جهاز الصف ولا مرة.

### الخطوات

| # | المهمة | المخرج |
|---|---|---|
| 0.1 | حسم QD-01: P4 تدريب كتابة أم لعبة نقاط | قرار موثق |
| 0.2 | حسم QD-02: P6 تمييز سمعي أم سباق تعزيز | قرار موثق |
| 0.3 | حسم QD-03: P5b إنتاج جمل — الآن أم لاحقاً | قرار موثق |
| 0.4 | حسم QD-04: إملاء/خروج/واجب — أيها يُضاف | قرار موثق |
| 0.5 | اختبار صفي فعلي: lecture-01.html على بروجكتور | قائمة أخطاء |
| 0.6 | تحديث PROJECT_DECISIONS.md بالقرارات | ملف محدّث |

### معايير الانتقال إلى Phase 1

- جميع القرارات QD-01 إلى QD-04 لها حالة Decided.
- نتائج الاختبار الصفي موثقة.

---

## Phase 1 — إكمال محتوى Lesson 01

**المدة**: 3-5 أيام (حسب القرارات)
**كود**: نعم — بيانات + منطق + CSS

### المهام بحسب الأولوية

| # | المهمة | الملفات المتأثرة | الشرط |
|---|---|---|---|
| 1.1 | ملفات MP3 | `assets/audio/` فقط | دائماً (لا يعتمد على قرار) |
| 1.2 | P5b إنتاج الجمل | lesson-01.js + app.js + style.css | إذا أُقرّ QD-03 |
| 1.3 | حسم P4 | app.js + style.css (+ lesson-01.js إن تغيّر) | إذا أُقرّ تغيير QD-01 |
| 1.4 | الإملاء | lesson-01.js + app.js + style.css | إذا أُقرّ QD-04 |
| 1.5 | بطاقة الخروج | lesson-01.js + app.js + style.css | إذا أُقرّ QD-04 |
| 1.6 | بطاقة الواجب | lesson-01.js + app.js + style.css | إذا أُقرّ QD-04 |

### 1.1 — ملفات MP3 (أولوية قصوى)

الملفات المطلوبة (من lesson-01.js audioFile fields):
```
assets/audio/
├── ba.mp3          ← صوت حرف ب
├── ta.mp3          ← صوت حرف ت
├── tha.mp3         ← صوت حرف ث
├── nun.mp3         ← صوت حرف ن
├── word_bab.mp3    ← كلمة بَاب
├── word_bayt.mp3   ← كلمة بَيْت
├── word_tamr.mp3   ← كلمة تَمْر
├── word_thawb.mp3  ← كلمة ثَوْب
└── word_nar.mp3    ← كلمة نَار
```

AudioManager في app.js جاهز لتشغيلها — يبحث عن MP3 أولاً فإن لم يجد يستخدم Web Speech API. لا تغيير في الكود مطلوب.

### 1.2 — P5b إنتاج الجمل (إن أُقرّ)

المحتوى (من Doc 07): جملتان "هذا باب" و"هذا بيت" — كشف كلمة-كلمة.

التنفيذ يتبع نمط ARCHITECTURE_RULES القاعدة 2:
- `lesson-01.js`: إضافة `sentences[]` في `LESSON_01` (جملتان مع chars[] وaudioFile).
- `app.js`: 4 دوال `initP5b/advanceP5b/renderP5b/buildP5bHTML` + إضافة case في advance()/retreat()/goToPhase().
- `style.css`: قسم `.p5b-*` — تخطيط مشابه لـ P5 مع كشف كلمة-كلمة.
- STATE: إضافة `p5bSentenceIndex, p5bRevealStep`.

### 1.3 — حسم P4 (إن أُقرّ التغيير)

إذا أُبقي الحالي: لا تغيير.
إذا استُبدل بلعبة النقاط: إعادة بناء P4 بالكامل — حرف بدون نقاط → إضافة النقاط تدريجياً → مقارنة.
إذا دُمجا: إضافة خطوة "لعبة النقاط" قبل "تدريب الكتابة" الحالي.

### 1.4-1.6 — الأنشطة الإضافية (إن أُقرّت)

كل نشاط = بيانات في lesson-01.js + 4 دوال في app.js + قسم CSS.
- الإملاء: شاشة فراغ → كشف الإجابة (بسيط).
- بطاقة الخروج: عرض تعليمات + عدّ تنازلي.
- بطاقة الواجب: شاشة عرض ثابتة (أبسط نشاط).

### قواعد التنفيذ (من ARCHITECTURE_RULES)

1. كل بيانات جديدة في `lesson-01.js` فقط (Object.freeze).
2. كل منطق جديد في `app.js` فقط (init/advance/render/build).
3. كل مرحلة جديدة تحتاج: تلميح معلم (updateHint) + كشف تدريجي.
4. الصوت عبر AudioManager فقط.
5. كل حالة مرحلة في STATE بمفتاح `p<n>...`.

### معايير الانتقال إلى Phase 2

- MP3 موجودة وتعمل.
- الأنشطة المُقرَّة مبنية ومختبرة.
- CURRENT_STATE.md و CHANGELOG.md محدّثان.

---

## Phase 2 — التلميع والاستقرار

**المدة**: 1-2 يوم
**كود**: خفيف (إصلاحات فقط)

### المهام

| # | المهمة | التفصيل |
|---|---|---|
| 2.1 | اختبار P1→P7 كامل | كل مرحلة: تقدم + تراجع + قفز + شاشة كاملة + وضع انتباه |
| 2.2 | قياس الأداء | مقارنة مع متطلبات Doc 06 (CURRENT_STATE.md قسم متطلبات الأداء) |
| 2.3 | اختبار المتصفحات | Chrome + Edge على Windows (أجهزة الجامعة) |
| 2.4 | مراجعة Responsive | 720p (بروجكتور) + 1080p + 900px breakpoint |
| 2.5 | إصلاح أي أخطاء | فقط ما يمنع الاستخدام الصفي |

### متطلبات الأداء (من Doc 06)

| المتطلب | القيمة |
|---|---|
| تحميل أولي | < 2 ثانية |
| استجابة تفاعل | < 50 مللي ثانية |
| بدء صوت | < 100 مللي ثانية |
| إطارات الرسم | 60fps |
| ذاكرة المتصفح | < 50 ميغابايت |
| استقرار مستمر | 120 دقيقة |

### معايير الانتقال إلى Phase 3

- **Lesson 01 جاهز للاستخدام الصفي** — يعمل بلا أخطاء على الجهاز المستهدف.
- جميع المراحل تعمل بالتنقل الكامل.
- الصوت يعمل (MP3 أو Web Speech).

---

## Phase 3 — استخراج Template

**المدة**: 3-5 أيام
**كود**: نعم — تغييرات معمارية (لا محتوى جديد)

### لماذا هذه المرحلة ممكنة؟

المعمارية الحالية مهيّأة بنسبة ~80%:
- `lesson-01.js` منفصل ومجمّد — بيانات بلا منطق عرض.
- `app.js` يقرأ من `LESSON_01` ولا يحتوي بيانات.
- `style.css` يستخدم CSS variables — قابل للتبديل.
- نمط `init/advance/render/build` موحد لكل مرحلة.

### البنية المستهدفة

```
الحالي:                           المستهدف:

Lesson-01-classroom-P6-Fixed/     classroom-template/
├── lecture-01.html                ├── lecture-01.html
├── js/                           ├── lecture-02.html
│   ├── lesson-01.js              ├── engine/
│   └── app.js                    │   ├── app.js         (يقرأ LESSON_XX)
├── css/                          │   └── schema.js      (تحقق من البيانات)
│   └── style.css                 ├── lessons/
└── assets/                       │   ├── lesson-01.js   (LESSON_01)
                                  │   ├── lesson-02.js   (LESSON_02)
                                  │   └── lesson-03.js   (LESSON_03)
                                  ├── css/
                                  │   └── style.css      (CSS variables)
                                  └── assets/
                                      ├── fonts/
                                      └── audio/
                                          ├── lesson-01/
                                          └── lesson-02/
```

### الخطوات

#### 3.1 — تعريف Lesson Schema

توثيق بنية البيانات الإلزامية لأي `lesson-XX.js`:

```
LessonSchema = {
  meta: {
    id: string,              // "lesson-01"
    number: number,          // 1
    title: string,           // "الحروف الأولى"
    subtitle: string,        // "ب ت ث ن"
    level: string,           // "A0"
    duration: number,        // 120 (دقائق)
    targetLetters: string[]  // ["ب","ت","ث","ن"]
  },
  letters: [{                // إلزامي — كل درس يدرّس حروفاً
    id, char, name, phoneme, dots, dotPosition,
    ipa, chinesePinyin, fact, color, audioFile
  }],
  strokeGuides: [{...}],     // اختياري — فقط إن كان الدرس يتضمن P4
  words: [{...}],            // اختياري — فقط إن كان يتضمن P5
  sentences: [{...}],        // اختياري — P5b
  discriminationRounds: [],  // اختياري — P6
  assessmentRounds: [],      // اختياري — P7
  arabicAlphabet: [],        // ثابت — نفسه لكل الدروس
  targetLetterIds: [],       // يتغير حسب الدرس
  phases: [{                 // إلزامي — يحدد المراحل المطلوبة لهذا الدرس
    id, number, title, duration, goal
  }]
}
```

#### 3.2 — تعميم app.js

تغيير مركزي واحد:
```javascript
// الحالي:
const data = LESSON_01;

// المستهدف:
const data = window.CURRENT_LESSON;
```

ثم كل `LESSON_01.letters` → `data.letters`، إلخ. التغيير ميكانيكي.

#### 3.3 — المراحل المرنة

ليس كل درس يحتاج 7 مراحل. `phases[]` في lesson-XX.js يحدد المراحل المطلوبة.

تغييرات مطلوبة:
- `goToPhase()`: يقرأ من `data.phases` بدل قائمة ثابتة.
- `advance()`/`retreat()`: switch ديناميكي حسب phase.id.
- بناء `#phase-nav`: حسب `data.phases.length`.

#### 3.4 — ألوان ديناميكية

الحالي: ألوان الحروف ثابتة في `:root` (--color-ba, --color-ta...).
المستهدف: lesson-XX.js يحدد الألوان، و`initLesson()` يكتبها:

```javascript
data.letters.forEach(l => {
  document.documentElement.style.setProperty(`--color-${l.id}`, l.color);
});
```

#### 3.5 — تعميم lecture.html

**الخيار المرشّح: ملف لكل درس** (lecture-01.html, lecture-02.html).

السبب: المشروع offline-first — فتح ملف من القرص لا يدعم query parameters. كل ملف يختلف فقط في سطر `<script src>`:

```html
<!-- lecture-01.html -->
<script src="lessons/lesson-01.js"></script>
<script src="engine/app.js"></script>

<!-- lecture-02.html -->
<script src="lessons/lesson-02.js"></script>
<script src="engine/app.js"></script>
```

#### 3.6 — صوت لكل درس

تنظيم الصوت في مجلدات فرعية:
```
assets/audio/
├── lesson-01/   (ba, ta, tha, nun, words)
└── lesson-02/   (حروف الدرس الثاني)
```

`audioFile` في lesson-XX.js يشير للمسار الكامل.

### معايير الانتقال إلى Phase 4

- app.js يقرأ من `CURRENT_LESSON` عام.
- Lesson Schema موثق.
- Lesson 01 يعمل بنفس الجودة بعد التعميم.
- إنشاء lesson-02.js فارغ ناجح (يحمّل بدون أخطاء).

---

## Phase 4 — Lesson 02+

**المدة**: 1-2 يوم لكل درس
**كود**: محتوى (lesson-XX.js + MP3) — لا تغييرات في app.js

### إنشاء درس جديد

1. نسخ `lesson-01.js` → `lesson-02.js`.
2. تغيير `meta` (id, number, title, targetLetters).
3. تعبئة `letters[]` بالحروف الجديدة.
4. تعبئة `words[]`, `discriminationRounds[]`, `assessmentRounds[]`.
5. توليد MP3 في `assets/audio/lesson-02/`.
6. إنشاء `lecture-02.html` (نسخة من 01 مع تغيير script src).
7. اختبار.

### الحروف المتوقعة للدروس القادمة (من Doc 02 — Course Roadmap)

| الدرس | الحروف | الملاحظة |
|---|---|---|
| Lesson 01 | ب ت ث ن | ✓ مكتمل — مجموعة "نفس الجسم" |
| Lesson 02 | (يحتاج تحديداً من Doc 02) | مجموعة جديدة |
| Lesson 03+ | (يحتاج تحديداً) | تعقيد تدريجي |

### الأنشطة الإثرائية (من "انشطة يجب اضافتها.txt")

هذه أنشطة مستقبلية تُضاف تدريجياً حسب الحاجة — ليست مطلوبة لـ Lesson 01:

| النشاط | النوع | متى يُضاف |
|---|---|---|
| Odd One Out (أيها المختلف) | تمييز بصري | عندما تكثر الحروف المتشابهة |
| بناء الحرف (إضافة نقاط) | فهم النقاط | مع Lesson 01 أو 02 |
| Memory Game | تثبيت | Lesson 03+ (بعد تراكم حروف كافية) |
| Sound Hunt | تمييز سمعي | Lesson 03+ |
| سرعة القراءة | طلاقة | بعد 4+ دروس |
| Bingo | مراجعة شاملة | بعد 4+ دروس |
| أنشطة النموذج الذهني | RTL + نظام النقاط | Lesson 01-02 (أساسية للصينيين) |

---

## ما لا يُنفَّذ في هذه الخطة

| البند | السبب | متى يُعاد النظر |
|---|---|---|
| نظام كشف 5 حالات (Doc 05) | النظام الثنائي يكفي حالياً | عند بناء أنشطة تحتاج حالات وسيطة |
| 18 مكوّن تفاعلي (Doc 05) | Lesson 01 يحتاج 4-5 فقط وهي مبنية | عند بناء أنشطة تحتاج مكوّنات جديدة |
| اختصارات إضافية S/H/R/T/D/P (Doc 06) | Space/←/→/1-7/A/F تكفي | إذا طلب المعلم |
| Refactoring app.js | الكود يعمل | فقط إذا أصبح عائقاً أمام Template |
| تنظيف مراجع Opencode من md/ | تجميلي | بعد Phase 2 |

---

## خريطة الملفات حسب المرحلة

| الملف | Phase 0 | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|---|---|---|---|---|---|
| PROJECT_DECISIONS.md | قراءة + كتابة | قراءة | — | — | — |
| lesson-01.js | — | كتابة (بيانات) | — | تعميم | نسخ → lesson-XX |
| app.js | — | كتابة (دوال) | إصلاحات | تعميم | — |
| style.css | — | كتابة (أقسام) | إصلاحات | — | — |
| lecture-01.html | اختبار | — | — | تعميم | نسخ → lecture-XX |
| assets/audio/ | — | إضافة MP3 | — | إعادة تنظيم | MP3 جديدة |
| CURRENT_STATE.md | — | تحديث | تحديث | تحديث | تحديث |
| CHANGELOG.md | — | تحديث | تحديث | تحديث | تحديث |
| ACTIVE_TASK.md | تحديث | تحديث | تحديث | تحديث | تحديث |
