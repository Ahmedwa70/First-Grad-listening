# Professional Learning Activity Engine — Architecture

**المشروع:** First-Grad-WorkSync  
**الحالة:** Architecture Proposal v1  
**النطاق:** نواة قابلة للإضافة تدريجياً دون كسر الدرس الحالي  
**القرار:** اعتماد Engine كطبقة مستقلة، مع إبقاء renderers الحالية تعمل أثناء فترة الترحيل

---

## 1. الملخص التنفيذي

المشروع الحالي يملك عناصر مهمة لبناء محرك أنشطة: حالة مركزية، بيانات درس منفصلة، AudioManager، تحكم بالمعلم، وكشف تدريجي. لكنه يطبق كل مرحلة تقريباً عبر مجموعة دوال وDOM خاصين بها داخل `app.js`. هذا يجعل النشاط مرتبطاً بالمرحلة، ويجعل إعادة الاستخدام والاختبار والتحليلات المستقبلية صعبة.

المقترح ليس إعادة كتابة `app.js` دفعة واحدة، بل إضافة طبقة `Activity Engine` بين بيانات الدرس والتحكم والعرض. في المرحلة الأولى يعمل المحرك كطبقة مستقلة وموثقة، ويمكنه تسجيل النشاط وإدارته وإعادة تهيئته وحفظ سجل الأحداث، بينما يستمر renderer الحالي في العمل. بعد إثبات النواة، تُرحّل أنشطة P6 واحدة تلو الأخرى إلى Activities حقيقية.

> **المبدأ الحاكم:** المرحلة تحدد سياق الاستخدام، أما النشاط فيحدد السلوك التعليمي القابل لإعادة الاستخدام.

---

## 2. الوضع الحالي

| المجال | الوضع الحالي | أثره |
|---|---|---|
| البيانات | `LESSON_01` في `js/lesson-01.js`، مجمدة في التشغيل | نقطة قوة يمكن الحفاظ عليها |
| الحالة | كائن `STATE` واحد يحتوي مفاتيح خاصة بكل مرحلة | مركزي لكنه غير قابل للتوسع بأمان |
| العرض | `renderP<n>()` وtemplate strings داخل `app.js` | اقتران قوي بين المنطق وDOM |
| التحكم | `advance()`, `retreat()` واختصارات عامة مع switch على المرحلة | جيد للدرس الحالي، غير موحد للنشاطات |
| الصوت | `AudioManager` مشترك | نقطة إعادة استخدام قوية |
| P6 | D1/D2/D3 داخل renderer وبيانات خاصة | نشاط مخصص، وليس Activity مستقلاً |
| المحرك | غير موجود؛ السجل الحالي يصفه بأنه Planned | فجوة أساسية قبل Vue/TypeScript |
| الاختبار | لا يوجد عقد اختبار للنشاط أو state machine | يصعب ضمان السلوك عبر دروس متعددة |

التدقيق الأخير لـP6 أكد أن المشكلة ليست بصرية فقط: P6 الحالي يحقق تدريباً سمعياً جزئياً، لكنه لا يطابق عقد P6 الرسمي الذي يتطلب Rapid Retrieval وDictation وSentence Production. لذلك يجب فصل مفهوم النشاط عن اسم المرحلة قبل أي Migration.

---

## 3. الطبقات المقترحة

```text
Lesson Definition
      ↓
Activity Definitions / Activity Library
      ↓
Activity Engine
  ├── Registry
  ├── Instance Lifecycle
  ├── State Store
  ├── Transition Guard
  ├── Teacher Command Bus
  ├── Event Log
  └── Reset / Undo
      ↓
Renderer Adapter
  ├── Projector Renderer
  ├── Teacher Hint Renderer
  └── Future Student/App Renderer
      ↓
Existing HTML/CSS shell or future Vue renderer
```

### 3.1 Lesson Definition

يصف الدرس ترتيب الأنشطة ووقت استخدامها، لكنه لا يحتوي منطق النشاط. مثال مفاهيمي:

```js
{
  id: 'lesson-01',
  activities: [
    { activityId: 'rapid-retrieval.v1', contentRef: 'lesson-01.retrieval-01' },
    { activityId: 'silent-dictation.v1', contentRef: 'lesson-01.dictation-01' }
  ]
}
```

### 3.2 Activity Definition

تعريف ثابت، محايد عن الدرس، يصف الهدف والحالات والأوامر والأحداث. لا يخلق DOM، ولا يعرف `#content-zone`، ولا يعتمد على `P6`.

### 3.3 Activity Engine

المحرك ينشئ instance من تعريف نشاط مع بيانات محتوى، ويملك دورة حياته، والحالة الحالية، والتحقق من الانتقالات، وسجل الأحداث. لا يعرف شكل الشاشة؛ بل يرسل snapshots وevents إلى renderer adapter.

### 3.4 Renderer Adapter

يحوّل snapshot إلى واجهة. في المرحلة الحالية يمكن أن يكون DOM adapter بسيطاً، وفي Vue يصبح component renderer. هذا الفصل يسمح بتجربة النشاط نفسه في classroom projector أو teacher preview أو student app.

### 3.5 Teacher Command Bus

بدلاً من أن يعرف كل renderer اختصارات لوحة المفاتيح، يرسل النظام أوامر موحدة مثل `ADVANCE`, `BACK`, `REVEAL`, `RESET`, `PAUSE`, `EMERGENCY_HIDE`, و`SELECT_STUDENT`. يحدد النشاط ما هو مسموح في حالته الحالية.

---

## 4. مبادئ التصميم غير القابلة للتفاوض

1. **Teacher Controlled:** لا يحدث انتقال تعليمي تلقائياً إلا إذا كان جزءاً صريحاً من عقد النشاط، مثل تبديل بطاقات السباق بعد تشغيله من المعلم.
2. **Offline First:** لا يعتمد المحرك على شبكة أو CDN أو API خارجي كي يعمل. كل البيانات والأصول الصوتية محلية.
3. **Audio First:** النشاط يستطيع تقديم الصوت قبل الشكل، ويستطيع renderer إخفاء التمثيل البصري حتى يسمح المعلم بالكشف.
4. **Progressive Reveal:** الكشف حالة من حالات النشاط، وليس مجرد class CSS عابر.
5. **Data/Logic/Presentation Separation:** البيانات لا تحتوي DOM، والمنطق لا يحتوي markup، وrenderer لا يقرر الهدف التعليمي.
6. **Reusability:** لا يظهر `P6` أو `lesson-01` في تعريف النشاط العام.
7. **Testability:** كل transition يمكن تشغيله ببيانات وهمية في بيئة بلا DOM وبلا صوت.
8. **Reversibility:** كل أمر يحدد ما إذا كان قابلاً للعكس، وما snapshot الذي يعود إليه.
9. **Accessibility and projector clarity:** يرسل النشاط semantic state يمكن عرضه بصرياً بحجم كبير، ولا يعتمد على اللون وحده.
10. **Migration safety:** يمكن تشغيل legacy renderer وengine renderer بالتوازي حتى اكتمال التحقق.

---

## 5. دورة حياة Activity Instance

```text
created → ready → active → paused → completed
                 ↓        ↓
               reset    undo
                 ↓        ↓
                ready ← previous snapshot
```

كل instance له:

- `instanceId` فريد.
- `definitionId` مثل `auditory-identify.v1`.
- `contentRef` يحدد بيانات الدرس دون نسخها داخل المنطق.
- `status`.
- `state` خاص بالنشاط.
- `history` محدود لتجنب نمو الذاكرة بلا نهاية.
- `eventLog` قابل للتصدير لاحقاً للتحليلات.

---

## 6. فصل P6 عن النشاط

لا ينبغي أن يكون `D1` اسمه المعماري `P6D1`. الصياغة الصحيحة:

| النشاط المستقل | يمكن استخدامه في |
|---|---|
| `auditory-identify.v1` | P2، P3، P6 كمراجعة، دروس لاحقة |
| `same-or-different.v1` | P2، P6، مراجعة النطق |
| `close-sound-compare.v1` | P2/P3 قبل الشكل، أو مراجعة بعد الكلمات |
| `rapid-retrieval.v1` | P6a، مراجعات دورية، بداية درس لاحق |
| `silent-dictation.v1` | P6b، اختبارات قصيرة، واجبات صفية |
| `sentence-production.v1` | P5b، P6b، أنشطة محادثة لاحقة |

المرحلة تستخدم النشاط عبر configuration فقط:

```js
{
  phaseId: 'P6b',
  activityId: 'silent-dictation.v1',
  contentRef: 'lesson-01.p6.dictation'
}
```

---

## 7. قرارات واعية ومفاضلات

### 7.1 لماذا Engine صغير وليس Framework كامل؟

الهدف الحالي هو حماية المشروع من إعادة كتابة كبيرة. نحتاج lifecycle وcontract وcommands وevents فقط في البداية. إدخال dependency injection معقد أو state library خارجية سيزيد المخاطر، خصوصاً مع Offline First ونسخة HTML الحالية.

### 7.2 لماذا لا نبدأ بـVue؟

Vue يحل مشكلة component rendering، لكنه لا يحل وحده تعريف النشاط، الانتقالات، التحكم، التراجع، أو التحليلات. إذا انتقلنا إلى Vue قبل تثبيت هذه العقود فسنعيد إنتاج الارتباط الحالي داخل مكونات TypeScript.

### 7.3 لماذا snapshots بدلاً من Undo مخصص لكل نشاط؟

في المرحلة الأولى يكون snapshot-based undo أبسط وأكثر أماناً. لاحقاً يمكن للنشاط ذي البيانات الكبيرة استخدام command-specific inverse operation. يظل العقد ثابتاً، بينما تتغير الاستراتيجية داخلياً.

### 7.4 لماذا event log محلي؟

لأنه يتيح بناء Teacher Dashboard وLearning Analytics لاحقاً دون ربط المحرك فوراً بخدمة خارجية. في النسخة الأولى هو سجل ذاكرة محلي قابل للتصدير؛ لا توجد مزامنة أو بيانات شخصية.

---

## 8. حدود المسؤولية

| المسؤولية | Activity Definition | Engine | Renderer | Lesson |
|---|---:|---:|---:|---:|
| الهدف التعليمي | نعم | لا | لا | سياق فقط |
| قواعد الانتقال | نعم | ينفذ | لا | لا |
| إدارة lifecycle | لا | نعم | لا | لا |
| DOM/CSS | لا | لا | نعم | لا |
| ترتيب الأنشطة | لا | لا | لا | نعم |
| محتوى الحروف/الكلمات | مرجع فقط | لا | لا | نعم |
| تسجيل الأحداث | يعرّف النوع | ينفذ | يعرض اختيارياً | يستهلك لاحقاً |
| Teacher commands | يعلن المسموح | يوجه | يرسل | يربط السياق |

---

## 9. معايير نجاح النواة

تعتبر النواة صالحة للمرحلة التالية عندما:

1. يمكن إنشاء نشاط من تعريف مستقل عن `P6`.
2. يمكن تشغيله وإيقافه وإعادة تهيئته من دون DOM.
3. يمكن منع انتقال غير مسموح حسب الحالة.
4. يمكن تنفيذ Undo حيث يسمح العقد.
5. يسجل المحرك أحداث `created`, `started`, `advanced`, `revealed`, `reset`, `undone`, `completed`.
6. يمكن للمحرك إصدار snapshot إلى renderer دون معرفة شكل العرض.
7. يظل `lecture-01.html` و`app.js` الحاليان يعملان عند عدم تفعيل adapter الجديد.

---

## 10. المراجع الداخلية

- `md/Governance/PROJECT_CONTEXT.md`
- `md/Governance/DESIGN_PHILOSOPHY.md`
- `md/Architecture/ARCHITECTURE_RULES.md`
- `md/Architecture/COMPONENT_REGISTRY.md`
- `Work plan/06_HTML_Lesson_Architecture_RTL_هندسة_صفحات_الدروس.md`
- `Work plan/07_Lesson_01_HTML_Implementation_Map_RTL(خريطة_تنفيذ_المحاضرة_الأولى).md`
- `APP/P6_AUDIT_REPORT.md` — إن توفر في نسخة العمل الحالية؛ نتائج التدقيق الأساسية مضمّنة في هذا التصميم.
