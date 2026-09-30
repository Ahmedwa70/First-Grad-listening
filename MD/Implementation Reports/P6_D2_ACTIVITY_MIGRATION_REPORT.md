# P6 D2 Activity Migration Report

**التاريخ:** 15 أغسطس 2026  
**المرحلة:** P6 Correction — Phase 3: Migrate One Activity  
**النطاق:** ترحيل D2 فقط إلى `same-or-different.v1` عبر Strangler Migration  
**الحالة:** مكتمل ومتحقق منه

---

## 1. الملخص التنفيذي

تم تحويل نشاط D2 داخل P6 إلى Activity مستقلة قابلة للإدارة تدريجياً فوق Activity Engine الحالي، مع إبقاء `renderP6()` و`advanceP6()` والـlegacy P6 state والواجهة المرئية تعمل كما كانت.

التغيير لا يعيد تصميم UI ولا يغيّر Lesson Schema. Activity الجديدة تعمل بجانب النظام الحالي وتستقبل محتوى D2 عبر adapter قراءة فقط. وبذلك أصبح Activity Engine مسؤولاً عن دورة حياة D2، وحالته، واختيار الطالب/ملاحظة الاستجابة، وتحديد النتيجة الصحيحة أو الخاطئة، بينما بقي Renderer الحالي مسؤولاً عن العرض.

> **قرار Strangler:** الواجهة الحالية هي مصدر العرض الفعلي، والنشاط الجديد هو مصدر الحالة/الأحداث الموازية. يمكن إيقاف الجسر أو إزالته دون حذف مسار D2 القديم.

---

## 2. ما تم نقله من D2

| العنصر | قبل الترحيل | بعد الترحيل |
|---|---|---|
| هوية النشاط | `round.type === 'sameordiff'` داخل `renderP6()` | `same-or-different.v1` داخل Activity Registry |
| البيانات | `LESSON_01.discriminationRounds` و`pairs` | نفس البيانات دون تغيير، عبر `P6D2Bridge.toActivityContent()` |
| الصوت الأول | `p6PlaySound()` وAudioManager | يبقى عبر AudioManager، مع dispatch `PLAY_FIRST` للنشاط |
| الصوت الثاني | `p6PlaySound()` وAudioManager | يبقى عبر AudioManager، مع dispatch `PLAY_SECOND` للنشاط |
| حالة النشاط | `p6AnswerVisible` و`p6PairIndex` للواجهة القديمة | Activity state: `ready`, `active`, `response`, `reveal`, `completed` بالتوازي |
| اختيار الطالب | غير ممثل في عقد مستقل | `OBSERVE_RESPONSE` عبر `p6ObserveD2Response(choice)` |
| النتيجة | تُستنتج من `item.same` عند الكشف | `outcome: unobserved/correct/incorrect` داخل Activity state |
| الكشف | `advanceP6()` الحالي | يستمر في الواجهة القديمة، مع dispatch `REVEAL` للنشاط |
| التقدم | `advanceP6()` الحالي | يستمر في الواجهة القديمة، مع dispatch `NEXT` للنشاط |
| الإكمال | انتقال P6 القديم بين العناصر والجولات | Activity تسجل `completed` عند إتمام عناصر D2؛ orchestration القديم لم يُستبدل |

---

## 3. الملفات الجديدة

| الملف | الغرض |
|---|---|
| `js/engine/p6-d2-bridge.js` | adapter قراءة فقط يحول `discriminationRounds` إلى content schema لعقد `same-or-different.v1` |
| `md/Implementation Reports/P6_D2_ACTIVITY_MIGRATION_REPORT.md` | هذا التقرير |

---

## 4. الملفات المعدلة

| الملف | التعديل |
|---|---|
| `js/engine/activity-definitions.js` | توسيع `same-or-different.v1` بعقد requiredData/states/teacherActions/studentResponse/successCriteria/completionCondition، وحالات الاختيار والنتيجة، و`PRESENT` و`MARK_REVIEW`، والتحقق من المحتوى |
| `js/app.js` | إضافة D2 activity slot، lifecycle helpers، bridge synchronization، audio command dispatch، observation API، وتفريغ instance عند مغادرة P6. لم يُحذف أي legacy P6 code |
| `lecture-01.html` | تحميل `p6-d2-bridge.js` قبل `app.js` فقط؛ لم يتغير markup أوCSS |
| `js/engine/activity-engine.smoke.test.js` | إضافة اختبارات adapter وD2 response/outcome/reveal/next/completion |

لم يتم تعديل:

- `js/lesson-01.js` أوLesson Schema.
- `css/style.css`.
- Renderer الخاص بأي مرحلة أخرى.
- منطق P1–P5 أوP7.
- تصميم P6 أوطريقة عرضه.

---

## 5. Activity Contract المنفذ

المعرف:

```text
same-or-different.v1
```

### الحالة

```text
ready → active → response → reveal → active → completed
```

### Teacher Actions

| الأمر | الوظيفة |
|---|---|
| `START` | بدء instance |
| `PRESENT` | مزامنة العنصر الحالي مع legacy `p6PairIndex` |
| `PLAY_FIRST` | تسجيل تشغيل الصوت الأول بعد أن يشغله AudioManager |
| `PLAY_SECOND` | تسجيل تشغيل الصوت الثاني بعد أن يشغله AudioManager |
| `OBSERVE_RESPONSE` | تسجيل اختيار `same` أو`different` وتحديد النتيجة |
| `REVEAL` | تسجيل كشف الإجابة بالتزامن مع الواجهة القديمة |
| `NEXT` | إكمال العنصر والانتقال إلى العنصر التالي |
| `MARK_REVIEW` | تسجيل العنصر للمراجعة لاحقاً |
| `RESET` | متاح عبر Activity Engine العام |

### النتيجة

يحسب النشاط:

```text
correct   عندما يطابق اختيار الطالب expectedResponse
incorrect عندما يختلف الاختيار عن expectedResponse
unobserved عندما لم تسجل استجابة
```

ولا يعرض هذه النتيجة داخل UI الحالي، حفاظاً على تجربة المعلم والتصميم الحاليين.

---

## 6. الاختبارات المنفذة

### 6.1 Smoke Tests — Core وD2

تم تشغيل:

```text
node activity-engine.smoke.test.js
```

النتيجة:

```text
Activity Engine smoke tests passed
```

وشملت الاختبارات:

- تسجيل `same-or-different.v1` في Registry.
- تحويل legacy D2 إلى content مستقل.
- إنشاء instance من bridge.
- دورة `START/PRESENT/PLAY_FIRST/PLAY_SECOND`.
- تسجيل response صحيح وتحقق `outcome: correct`.
- تسجيل response خاطئ وتحقق `outcome: incorrect`.
- `REVEAL` و`NEXT` وإكمال آخر عنصر.
- Reset/Undo واختبارات الأنشطة السابقة الموجودة.

### 6.2 Browser Runtime

تم فتح `lecture-01.html` من المسار المحلي والتحقق من:

| الاختبار | النتيجة |
|---|---|
| Activity Engine متاح | ناجح |
| `same-or-different.v1` مسجل | ناجح |
| `P6D2Bridge` متاح | ناجح |
| دخول P6 | ناجح |
| بقاء D2 UI الحالي | ناجح |
| بقاء زري الصوت الحاليين | ناجح |
| إنشاء D2 instance عند اختيار الجولة الثانية | ناجح |
| الانتقال من audio إلى response | ناجح |
| تسجيل استجابة صحيحة | ناجح |
| كشف legacy UI بالتزامن مع `REVEAL` | ناجح |
| event log: `audio.played`, `student.response-observed`, `answer.revealed` | ناجح |
| مغادرة P6 إلى P7 | ناجح |
| تفريغ D2 instance عند مغادرة P6 | ناجح |
| ظهور P7 بعد المغادرة | ناجح |
| أخطاء JavaScript بعد التشغيل | لا توجد أخطاء تطبيقية جديدة |

### 6.3 ما لم يُختبر بعد

لم يتم تشغيل اختبار صفّي فعلي مع الطلاب، ولم يتم تفعيل renderer جديد. كما لم تُستبدل أوتُحذف أي دوال legacy، لذلك لا يزال اختبار projector التفصيلي للـrenderer الجديد خارج نطاق هذه المرحلة.

---

## 7. الحفاظ على التجربة الحالية

تم الحفاظ على:

- نفس layout وCSS والألوان والخطوط.
- نفس أزرار الصوت ومحتواها.
- نفس ترتيب الكشف والتقدم.
- نفس Teacher Controller واختصاراته.
- نفس AudioManager ومسار MP3/fallback.
- نفس طريقة العرض في projector.
- نفس Lesson Data و`discriminationRounds`.

الإضافة غير المرئية هي أن D2 أصبح يسجل state وevents قابلة للاستخدام لاحقاً في renderer أوTeacher Dashboard، من دون فرض تغيير على الطلاب أوالمعلم الآن.

---

## 8. الخطوة التالية

الخطوة التالية المقترحة هي **Read-only Event Parity Review** قبل استبدال أي renderer:

1. مقارنة event sequence للنشاط مع كل خطوة في `p6PairIndex` و`p6AnswerVisible` القديم.
2. إضافة اختبار regression للعودة بـBack داخل D2 من دون تشغيل الصوت تلقائياً.
3. مراجعة `MARK_REVIEW` من خلال Teacher Controller، من دون عرض درجات للطلاب.
4. بعد اعتماد parity فقط، يمكن بناء `same-or-different` renderer adapter خلف feature flag.

لا يُنصح الآن بترحيل D1 أوD3 أوP6A/P6B/P6C قبل إغلاق هذه المراجعة.

---

## 9. قرار المرحلة

**D2 Activity Migration: READY FOR READ-ONLY EVENT PARITY REVIEW**

وليس:

```text
READY FOR FULL P6 MIGRATION
```

هذا يحافظ على استراتيجية Strangler ويمنع توسيع التغيير قبل إثبات أن النشاط الجديد يطابق السلوك التعليمي والتشغيلي الحالي.
