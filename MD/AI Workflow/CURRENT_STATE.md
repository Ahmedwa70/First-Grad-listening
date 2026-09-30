# CURRENT_STATE.md — الحالة الحالية للمشروع

> آخر تحديث: 2026-08-06 (Layout Validated across 4 resolutions ✅ + Phase 1.2 + Phase 1.1 Audio ✅). حدّث بعد أي تغيير.

## هيكل المشروع الفعلي

```
Lesson-01-classroom-P6-Fixed/
├── lecture-01.html          (194 سطر — حاوية التطبيق)
├── css/style.css            (3192 سطر — نظام التصميم الكامل)
├── js/app.js                (1900 سطر — محرك التطبيق)
├── js/lesson-01.js          (444 سطر — بيانات الدرس مجمّدة)
├── assets/fonts/            (خطوط Noto محلية — woff2 + ttf)
├── assets/audio/            (فارغ — README فقط، لا MP3)
├── md/                      (11 ملف توثيق)
│   └── Phase Reports/       (تقارير المراحل السابقة)
└── Work plan/               (7 ملفات .docx — مصادر الحقيقة)
```

## ما هو مكتمل ويعمل

### البنية التحتية
- صفحة `lecture-01.html`: Teacher HUD مدمج (badge + عنوان + تلميح + مؤقت مرحلة في الشريط العلوي + لوحة مساعدة منسدلة)، أزرار تنقل خافتة (تظهر عند hover)، منطقة محتوى ديناميكية، شريط تقدم gradient.
- `lesson-01.js`: بيانات مجمّدة (Object.freeze) — 4 حروف + أدلة كتابة SVG + 5 كلمات + 3 جولات تمييز سمعي + 3 جولات تقييم + الأبجدية الكاملة + 7 مراحل بأوقاتها.
- `app.js`: STATE مركزي، AudioManager (Web Speech API ar-SA + بنية MP3)، PhaseTimer، التنقل Space/←/1-7/A/F، وضع الانتباه (overlay)، لافتة الإنجاز.
- `style.css`: CSS variables كاملة، @font-face offline (Noto Naskh + Noto Sans Arabic)، RTL كامل، تصميم بروجكتور أولاً (clamp())، responsive @media (max-width: 900px).
- الخطوط: Noto Naskh Arabic (Regular+Bold woff2+ttf) + Noto Sans Arabic (Regular+Bold woff2+ttf + Variable) — محلية بالكامل.

### المراحل السبع
- **P1 — افتتاح الدرس**: بطاقة عنوان + حروف hero بحركة موجة ارتدادية (bouncing wave) + ترحيب + شبكة أبجدية 28 حرف + تمييز 4 حروف مستهدفة.
- **P2 — الصوت أولاً**: 4 أزرار صوت بألوان الحروف (CSS :has) + speaker zone + ترديد جماعي (3s auto-stop) + دليل عدّ الأصابع + زر انتقال لـ P3.
- **P3 — كشف الحروف**: كشف تدريجي 4 خطوات (حرف/نقاط/صوت/حقيقة) + تخطيط أفقي Grid 3 أعمدة + عرض رباعي مقارن + Chinese pinyin hint.
- **P4 — تدريب الكتابة**: SVG متحرك لمسار الكتابة (stroke-dasharray animation) + خطوات تدريجية بارتفاع ثابت (4.8rem triple lock) + نقاط تكشف تدريجياً + عرض مقارنة.
- **P5 — الحروف في الكلمات**: 5 كلمات بكشف تدريجي 4 خطوات (كلمة/تمييز الحرف/صوت/معنى) + تخطيط أفقي Grid 4 أعمدة + ذاكرة بصرية (History Strip) + مراجعة المعلم (Review Mode) + تثبيت (Pin).
- **P6 — التمييز السمعي**: 3 جولات (D1 تعرّف 8 أصوات / D2 نفس أم مختلف 6 أزواج / D3 أصوات متقاربة 2 مجموعة) + كشف تدريجي 3 خطوات لـ D1 + تغذية صوتية بصرية (ripple + icon wave) + إرشاد معلم inline + بطاقة إجابة تعليمية.
- **P7 — التقييم الختامي**: 3 جولات (Q1 ما الحرف / Q2 كم نقطة / Q3 ما الصوت) + تقييم الصف (ممتاز/جيد/مراجعة) + ملخص نتائج + لافتة إنجاز + زر إعادة.

### تعديلات الجلسة الحالية (قبل مهمة الفهم)
1. `.hero-char` — حركة موجة ارتدادية (bouncing wave) بتأخيرات متتابعة 0s/0.15s/0.3s/0.45s مع ألوان الحروف الأربعة.
2. إزالة P2 feedback badge ("✓ ممتاز") — حُذفت `setP2Feedback()`/`clearP2Feedback()` من app.js و`.p2-feedback` من style.css.
3. `.p4-step-item` — ارتفاع ثابت بـ 5 طبقات حماية: triple height lock (height=min-height=max-height=4.8rem) + flex-shrink/grow:0 + overflow hidden + line-clamp + box-sizing.

## محتوى الدرس (المراجع السريعة)

- الحروف: ب (فيروزي #0E7C7B)، ت (أخضر #1E8449)، ث (بنفسجي #8B5CF6)، ن (ذهبي #C9A227).
- كلمات P5: بَاب، بَيْت، تَمْر، ثَوْب، نَار.
- P6: D1 عدّ الأصابع (8 أصوات)، D2 نفس أم مختلف (6 أزواج)، D3 الأصوات المتقاربة (2 مجموعة).
- P7: Q1 ما هذا الحرف؟، Q2 كم نقطة؟، Q3 ما صوت الحرف؟.

## النظام الصوتي — حالة AudioManager

### البنية الحالية (app.js:42-114)

```
AudioManager
├── play(filePath, fallbackText, rate)
│   ├── يحاول MP3 من filePath (new Audio + cache)
│   └── عند فشل Promise → speak(fallbackText)
├── playLetter(letterId)  → play(letter.audioFile, letter.name)
├── playWord(wordId)      → play(word.audioFile, word.audioText)
├── speak(text, rate)     → Web Speech API (ar-SA) مباشرة
├── stop()                → يوقف speechSynthesis
└── init()                → يبحث عن صوت ar-SA في المتصفح
```

### مشاكل مكتشفة وإصلاحها (Phase 1.1)

1. ~~**P2 يتجاوز MP3** (app.js:556)~~ — ✅ تم الإصلاح: `AudioManager.playLetter(STATE.p2ActiveLetter)`.
2. ~~**P3 choral يتجاوز MP3** (app.js:801)~~ — ✅ تم الإصلاح: `AudioManager.playLetter(letterId)`.
3. ~~**Fallback text خاطئ** (app.js:97)~~ — ✅ تم الإصلاح: `letter.name` ('باء') بدل `letter.phoneme` ('/b/').
4. ~~**لا ملفات MP3 موجودة**~~ — ✅ تم إضافة 9 ملفات MP3 (4 حروف + 5 كلمات) — الحجم الإجمالي ~482 KB.

### خريطة استخدام الصوت عبر المراحل

| المرحلة | الدالة | يستخدم MP3؟ | ملاحظة |
|---|---|---|---|
| P2 | `AudioManager.playLetter()` | نعم + fallback | ✅ Verified — MP3 يعمل |
| P3 | `AudioManager.playLetter()` | نعم + fallback | ✅ Verified — MP3 يعمل |
| P3 choral | `AudioManager.playLetter()` | نعم + fallback | ✅ Verified — MP3 يعمل |
| P5 | `AudioManager.playWord()` | نعم + fallback | ✅ Verified — 5 كلمات تعمل |
| P6 | `p3PlaySound()` → `playLetter()` | نعم + fallback | ✅ Verified — MP3 يعمل |
| P7 | `p7PlaySound()` → `playLetter()` | نعم + fallback | ✅ زر "شغّل الصوت" مع تغذية بصرية (is-playing) |

### الملفات الصوتية (9 ملفات — ✅ موجودة ومُتحقق منها)

```
assets/audio/
├── ba.mp3    (44 KB)  ← بَ — Phoneme Audio
├── ta.mp3    (45 KB)  ← تَ
├── tha.mp3   (51 KB)  ← ثَ
├── nun.mp3   (49 KB)  ← نَ
├── word_bab.mp3   (58 KB)  ← بَابْ
├── word_bayt.mp3  (60 KB)  ← بَيْتْ
├── word_tamr.mp3  (61 KB)  ← تَمْرْ
├── word_thawb.mp3 (58 KB)  ← ثَوْبْ
└── word_nar.mp3   (56 KB)  ← نَارْ
    الإجمالي: ~482 KB
```

### نتائج التحقق (2026-08-06)

- ✅ جميع 9 ملفات MP3 تُحمَّل وتُشغَّل عبر AudioManager بدون أخطاء
- ✅ AudioManager Cache يعمل — 9 ملفات مُخزّنة بعد التشغيل
- ✅ Fallback إلى Web Speech API يعمل عند فشل تحميل الملف
- ✅ Offline First — جميع الطلبات محلية (`file:///`)، لا طلبات شبكة خارجية
- ✅ لا أخطاء Console (لا 404، لا أخطاء تطبيقية)
- ✅ No Critical Issues

### الحالة: 🟢 جاهز — إصلاحات الكود + 9 ملفات MP3 مكتملة ومُتحقق منها

## فلسفة Layout — Viewport Constraint Architecture

### المبدأ
التطبيق مُقيّد ضمن viewport واحد (`height: 100vh`) — لا يتمدد خارج الشاشة أبداً. كل مرحلة تتصرف حسب محتواها:

### الآلية (CSS فقط)
```
.app-layout       → height: 100vh; overflow: hidden   (الشبكة ثابتة)
#content-zone     → overflow: auto; align-items: flex-start  (scroll داخلي عند الحاجة)
```

### سلوك كل مرحلة
| المرحلة | سلوك Scroll | السبب |
|---|---|---|
| P1 | scroll داخلي ✅ | محتوى ~1125px > 677px متاح |
| P2–P6 | لا scroll | المحتوى يتسع ضمن المتاح |
| P7 | لا scroll (classroom) | أحجام `clamp()` تتكيف مع `vh` |

### حالة التحقق: ✅ مُتحقق — 4 دقات (2026-08-06)
| الدقة | P1 | P2–P6 | P7 | HUD | Transition |
|---|---|---|---|---|---|
| 1366×768 | scroll ✅ | no-scroll ✅ | fullscreen ✅ | ثابت ✅ | لا shift ✅ |
| 1280×720 | scroll ✅ | no-scroll ✅ | fullscreen ✅ | ثابت ✅ | لا shift ✅ |
| 1024×768 | scroll ✅ | no-scroll ✅ | fullscreen ✅ | ثابت ✅ | لا shift ✅ |
| 1920×1080 | scroll ✅ | no-scroll ✅ | fullscreen ✅ | ثابت ✅ | لا shift ✅ |

### ملاحظات مهمة
- `align-items: flex-start` ضروري — `center` يقصّ أعلى المحتوى عند overflow.
- P7 تستخدم `clamp(min, vh, max)` لكل الأحجام فتتكيف مع أي شاشة.
- لا تُغيِّر `.app-layout` إلى `min-height: 100vh` — سيكسر P7 على 1366×768.

### ملاحظة: فصل Phoneme/Name (QD-06)

Doc 06 §13.1 يُحدد طبقتين صوتيتين منفصلتين: Phoneme Audio (بَ) و Grapheme Audio (باء). Doc 07 Q09 يُفصلهما إلى ملفين: `p2_phoneme_b.mp3` + `letter_ba.mp3`. الكود الحالي يستخدم حقل `audioFile` واحد لكل حرف يخدم P2 وP3 وP6 معاً.

**القرار (QD-06)**: ملفات الحروف الحالية تمثل Phoneme Audio (بَ، تَ، ثَ، نَ). فصل `phonemeAudioFile` و`nameAudioFile` كحقلين منفصلين في بنية البيانات مؤجل إلى Phase 3 Template Extraction.

## ما هو ناقص / غير مؤكد

### فجوات جوهرية (محتوى تعليمي مفقود حسب Doc 07):
1. **P5b — إنتاج الجمل**: جملتان "هذا باب"/"هذا بيت" بكشف كلمة-كلمة + عمل ثنائي — **غير موجود تماماً**.
2. **P6a — سباق التعزيز (Consolidation Race)**: بطاقات flashcard بـ 3 ثوانٍ auto-advance + مؤقت 8 دقائق — **غير موجود** (P6 الحالي تمييز سمعي يدوي مختلف).
3. **الإملاء (Dictation)**: إملاء صامت لحرفي ب وث — **غير موجود**.
4. **بطاقة الخروج (Exit Ticket)**: كل طالب ينتج جملة — **غير موجود**.
5. **بطاقة الواجب (Homework)**: عرض الواجب في الختام — **غير موجود**.

### فجوات تقنية:
6. ~~**ملفات MP3**~~ — ✅ مكتمل ومُتحقق منه: 9 ملفات (4 حروف + 5 كلمات) موجودة وتعمل. **انظر قسم "النظام الصوتي" أعلاه.**
7. **اختصارات مفاتيح ناقصة**: Doc 06 يحدد S (spotlight)، H (إخفاء طوارئ)، R (كشف الكل)، T (مؤقت)، D (إملاء)، P (اختيار طالب) — **غير مبنية**.
8. **نظام كشف 5 حالات**: Doc 05 يحدد hidden→hinted→partial→full→receded — **الكود يستخدم ثنائي hidden/visible فقط**.
9. **18 مكوّن تفاعلي**: Doc 05 يحدد م-01 إلى م-18 — **مبني فقط: letter card, word card, audio reveal, choral cue; الباقي غير موجود**.

### تناقضات موثقة:
10. **P4 المسمّى**: Doc 07 يسمّيه "Dot Game" (عزل النقاط)، الكود يسمّيه "تدريب الكتابة" (مسار SVG) — **نشاطان مختلفان**.
11. **عدد كلمات P5**: Doc 04 يحدد 4 كلمات، الكود يحتوي 5 (أضاف تمر).
12. **هيكل المراحل**: Doc 07 يحدد 9 أقسام، الكود يحتوي 7 مراحل.

### ملفات مذكورة لكن غير موجودة:
13. مجلد `Opencode\ai\` — مذكور سابقاً في هذا الملف وفي CLAUDE_PROJECT_MAP.md لكنه **غير موجود فعلياً**.
14. `offline-check.html` — مذكور سابقاً لكنه **غير موجود**.

## متطلبات الأداء (من Doc 06 — Architecture)

| المتطلب | القيمة | ملاحظة |
|---|---|---|
| تحميل أولي | < 2 ثانية | من القرص المحلي |
| استجابة تفاعل | < 50 مللي ثانية | أي زر أو مفتاح |
| بدء صوت | < 100 مللي ثانية | من الضغط حتى الصوت |
| إطارات الرسم | 60fps | أثناء الحركات والانتقالات |
| ذاكرة المتصفح | < 50 ميغابايت | بدون تسرب |
| استقرار مستمر | 120 دقيقة | بدون إعادة تحميل |

> هذه متطلبات Doc 06 — لم تُقاس فعلياً بعد. تحتاج اختبار على جهاز الصف الفعلي.

## حد أدنى قبل الاستخدام الصفي

1. ✅ تطبيق 3 إصلاحات في app.js (مكتمل). ✅ توفير 9 ملفات MP3 (مكتمل ومُتحقق منه).
2. فتح الصفحة من القرص أو خادم محلي والتحقق: الخطوط، التنقل P1-P7 الكامل، الصوت، الشاشة الكاملة.
3. ✅ القرارات التربوية حُسمت (PROJECT_DECISIONS.md): P4 يبقى، P6 يبقى، P5b يُضاف مبسّطاً، إملاء/خروج/واجب مؤجلة.
