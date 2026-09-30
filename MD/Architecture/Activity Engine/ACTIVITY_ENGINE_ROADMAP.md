# Activity Engine Migration Roadmap

**الهدف النهائي:** منصة صفية قابلة للتوسع تعمل بأنشطة تعليمية مستقلة فوق محرك مركزي.  
**الاستراتيجية:** Strangler Migration — إضافة الطبقة الجديدة تدريجياً حول النظام القائم، ثم نقل نشاط واحد في كل مرة.

---

## Phase 0 — Baseline and Safety

**الحالة:** مكتمل تحليلياً.

تم تثبيت الحقائق التالية:

- البيانات الحالية منفصلة في `lesson-01.js`.
- منطق الأنشطة موجود داخل `app.js`.
- الحالة مركزية لكنها phase-specific.
- AudioManager وTeacher HUD قابلان لإعادة الاستخدام.
- Activity Engine غير موجود.
- P6 الحالي يجب ألا يُرحّل كما هو قبل فصل الأنشطة عن تعريف P6.

**بوابة القبول:** لا تغيير مرئي على الدرس القائم، ولا فقدان لاختصارات Space/Back/A/F/1–7.

---

## Phase 1 — Engine Foundation

**الحالة:** منفذة في هذه الدفعة.

تمت إضافة:

- `js/engine/activity-engine.js`
- `js/engine/activity-definitions.js`
- `js/engine/activity-engine.smoke.test.js`

كما تم تحميل النواة والتعريفات قبل `app.js` في `lecture-01.html` دون استبدال أي renderer قائم.

تقدم النواة:

- Registry للتعريفات.
- إنشاء instances.
- lifecycle وsnapshots.
- command guards.
- reset.
- undo عبر snapshots.
- event log تعليمي.
- subscriptions للـ renderer.
- تعريفات أولية مستقلة لـ auditory-identify، same-or-different، close-sound-compare، rapid-retrieval، silent-dictation، sentence-production.

**بوابة القبول:** smoke tests ناجحة، والدرس الحالي يستمر في استخدام `app.js` القديم دون تداخل.

---

## Phase 2 — Read-only Bridge

**الهدف:** جعل المحرك يرى النشاط الحالي دون أن يتحكم به.

الخطوات:

1. بناء adapter يحول `LESSON_01.discriminationRounds` إلى content schema للأنشطة السمعية.
2. إنشاء engine instance عند دخول P6 في وضع observation فقط.
3. تسجيل `item.presented`, `audio.played`, و`answer.revealed` من renderer الحالي.
4. إضافة diagnostic panel للمعلم خلف وضع المساعدة، لا يظهر للطلاب افتراضياً.
5. مقارنة event log مع مسار `STATE` القديم.

**بوابة القبول:** event log يطابق ما حدث فعلياً، مع عدم تغيير HTML المرئي أو توقيت الصوت.

---

## Phase 3 — Migrate One Activity

**المرشح:** `same-or-different.v1` لأنه أصغر عقداً من Sprint وDictation.

الخطوات:

1. نقل D2 إلى content adapter مستقل.
2. بناء renderer adapter يحافظ على أسلوب CSS الحالي.
3. تحويل أزرار الصوت والكشف إلى commands.
4. إبقاء `renderP6()` كـ fallback toggle.
5. اختبار advance/back/reveal/reset/emergency hide.

**بوابة القبول:** تطابق السلوك التربوي الحالي، وعدم ظهور regression على 1280×720 و1920×1080.

---

## Phase 4 — Migrate Auditory Activities

ترحيل `auditory-identify.v1` ثم `close-sound-compare.v1`، مع تصحيح عقد P6 وفق تدقيق P6:

- إزالة انحياز الشكل أثناء سؤال السمع.
- إضافة state لاستجابة الصف أو ملاحظة المعلم.
- فصل التدريب من التقويم.
- إضافة مثال محلول قبل الاستقلال.

**بوابة القبول:** النشاط قابل لإعادة الاستخدام خارج P6 ببيانات مختلفة.

---

## Phase 5 — Build Canonical P6

إنشاء P6 من أنشطة مستقلة:

```text
P6a
 └── rapid-retrieval.v1
P6b
 ├── silent-dictation.v1
 └── sentence-production.v1
P7
 ├── lesson-summary.v1
 └── homework-briefing.v1
```

لا يحتوي P6 renderer على منطق خاص بالبطاقات أو الإملاء أو الجمل؛ ينسق فقط النشاط الحالي ويعرض Teacher Rail.

**بوابة القبول:** مطابقة كاملة لـBlueprint وImplementation Map، بما في ذلك شروط الانتقال والمعايير.

---

## Phase 6 — Unified Teacher Controller

توحيد الاختصارات والأوامر في command map:

| المفتاح | الأمر | نطاقه |
|---|---|---|
| Space / → | `ADVANCE` | عام، يفسره النشاط |
| ← / Backspace | `BACK` | عام، مع Undo مناسب |
| R | `REVEAL` | النشاط الحالي |
| H | `EMERGENCY_HIDE` | عام |
| A | `ATTENTION` | shell |
| D | `START_DICTATION` | Dictation |
| P | `SELECT_STUDENT` | Sentence Production |
| S | `SPOTLIGHT` | renderer |
| Shift+→ | `SKIP_ACTIVITY` | Controller مع تأكيد |

**بوابة القبول:** الدرس كامل من لوحة المفاتيح، وكل command له hint واضح وحالة منع عند عدم صلاحيته.

---

## Phase 7 — Analytics-ready Event Model

إضافة event schema versioning، export محلي JSON، وطبقة privacy. لا توجد مزامنة أو حسابات في هذه المرحلة. بعدها يمكن بناء Teacher Dashboard على سجل الأحداث نفسه.

الأحداث التي يجب تحليلها لاحقاً:

- زمن الاستجابة الجماعية.
- العناصر التي وُسمت `needs-review`.
- مرات إعادة الصوت.
- مستوى الدعم في Sentence Production.
- نسبة إكمال الأنشطة.

---

## Phase 8 — Vue + TypeScript Migration

لا تبدأ هذه المرحلة قبل نجاح Phase 5 وPhase 6. عندها فقط:

- ينقل core إلى TypeScript مع types مطابقة للعقد.
- يصبح كل renderer Vue adapter.
- يبقى lesson definition وactivity registry مستقلين.
- يتم الحفاظ على offline build وlocal assets.
- تستخدم snapshots/events كحدود اختبار بين core وUI.

---

## Rollback Strategy

كل مرحلة ترحيل يجب أن تملك feature flag محلياً:

```js
const RUNTIME_FLAGS = {
  activityEngine: true,
  p6ActivityRenderer: false
};
```

إذا فشل الاختبار، يُعاد `p6ActivityRenderer` إلى `false`، ويستمر renderer القديم. لا تُحذف الدوال القديمة قبل مرور نسخة واحدة على الأقل من التحقق الصفّي.

---

## Validation Matrix

| المجال | الاختبار |
|---|---|
| Core | smoke tests بلا DOM |
| Contract | رفض تعريف ناقص أو بيانات غير صحيحة |
| Lifecycle | create/start/pause/complete/reset |
| Undo | رجوع دون تشغيل صوت تلقائي أو فقد ملاحظات |
| Teacher | keyboard-only commands |
| Pedagogy | مطابقة goal/response/success/completion |
| Projector | 1280×720 و1920×1080، لا scroll غير مقصود |
| Offline | فتح `lecture-01.html` دون شبكة |
| Regression | P1–P7 الحالية تعمل عند تعطيل adapter الجديد |
| Reuse | نفس activity تعمل بمحتوى درس آخر |

---

## قرار التنفيذ الحالي

تم تنفيذ **Foundation فقط** عمداً. لم تتم إعادة كتابة P6، ولم يتم ربط renderer جديد به، لأن ذلك يجب أن يأتي بعد Read-only Bridge ومراجعة event log. هذه المحافظة تحمي القيمة التعليمية والتشغيل الحالي من Migration غير قابل للعكس.
