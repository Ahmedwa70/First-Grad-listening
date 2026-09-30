# Activity Contract

**الإصدار:** v1  
**الغرض:** عقد موحد لكل نشاط تعليمي قابل لإعادة الاستخدام  
**المبدأ:** لا يُعد النشاط Activity حقيقياً إذا كان لا يمكن تشغيله خارج مرحلة واحدة ببيانات بديلة.

---

## 1. الشكل العام

```js
{
  id: 'auditory-identify.v1',
  version: 1,
  category: 'auditory-discrimination',
  pedagogicalGoal: '...',
  phaseUsage: ['P2', 'P6'],
  requiredData: {...},
  initialState: {...},
  states: {...},
  teacherActions: {...},
  studentResponse: {...},
  successCriteria: {...},
  completionCondition: {...},
  events: [...],
  capabilities: {...},
  createInstance(content, options) { ... }
}
```

التعريف نفسه لا يحتوي بيانات درس ثابتة ولا DOM ولا نصوصاً مرتبطة بصفحة واحدة. البيانات تأتي في `content`، والسياق يأتي في `options`.

---

## 2. حقول العقد

### 2.1 الهوية

| الحقل | النوع | القاعدة |
|---|---|---|
| `id` | string | معرف ثابت بصيغة `domain-purpose.version` |
| `version` | number | يزداد عند تغيير السلوك أو schema |
| `category` | string | تصنيف مثل `auditory`, `retrieval`, `production` |
| `phaseUsage` | string[] | مواضع استخدام مقترحة، لا قيد تشغيل |

### 2.2 الهدف التعليمي

`pedagogicalGoal` جملة واحدة قابلة للملاحظة. لا تكتب «تحسين اللغة»، بل «يميّز الطالب بين صوتين متقاربين قبل رؤية الحرف».

يستحسن إضافة:

```js
learningTargets: [
  { id: 'auditory-identification', observable: '...' }
]
```

### 2.3 البيانات المطلوبة

يصف `requiredData` schema لا نسخة البيانات:

```js
requiredData: {
  items: { type: 'array', min: 1 },
  audioResolver: { type: 'function' },
  answerResolver: { type: 'function' }
}
```

يجب التحقق من البيانات قبل إنشاء instance، مع رسالة خطأ تعليمية للمعلم وليس exception غامضاً.

### 2.4 الحالات

كل نشاط يعرّف states صريحة. مثال عام:

```js
states: {
  READY: 'ready',
  ACTIVE: 'active',
  RESPONSE: 'response',
  REVEAL: 'reveal',
  COMPLETED: 'completed'
}
```

لا يجوز للrenderer اختراع state جديدة. يمكن أن يشتق class بصرياً من snapshot، لكنه لا يغير state.

### 2.5 إجراءات المعلم

كل إجراء يصف:

```js
teacherActions: {
  ADVANCE: { allowedIn: ['ready', 'response'], reversible: true },
  BACK: { allowedIn: ['response', 'reveal'], reversible: true },
  REVEAL: { allowedIn: ['response'], reversible: true },
  RESET: { allowedIn: ['*'], reversible: false },
  EMERGENCY_HIDE: { allowedIn: ['*'], reversible: true }
}
```

يجب أن يعرف المعلم أثر الفعل قبل تنفيذه. الاختصارات تربط بالأفعال، لا بدوال renderer:

```js
{ key: ' ', command: 'ADVANCE' }
{ key: 'r', command: 'REVEAL' }
```

### 2.6 استجابة الطالب

يصف العقد ما يتوقعه النشاط، دون افتراض جهاز معين:

```js
studentResponse: {
  mode: 'choral-gesture',
  inputTypes: ['finger-count', 'thumbs-up'],
  required: false,
  capture: 'teacher-observation'
}
```

القيم المقترحة لـ`mode`:

- `observe`.
- `choral-response`.
- `gesture`.
- `written`.
- `individual-spoken`.
- `choice`.
- `mixed`.

### 2.7 شروط النجاح

النجاح ليس دائماً نسبة آلية. يمكن أن يكون:

```js
successCriteria: {
  type: 'teacher-observation',
  metric: 'response-within-window',
  threshold: 0.70,
  windowSeconds: 3
}
```

يدعم العقد أنواعاً مثل `automatic`, `teacher-observation`, `self-check`, و`hybrid`.

### 2.8 شروط الإكمال

يفصل العقد بين النجاح والإكمال. قد يكتمل النشاط حتى لو احتاج الطلاب إعادة:

```js
completionCondition: {
  type: 'all-items-reviewed',
  requiresTeacherConfirmation: true
}
```

### 2.9 الأحداث

الأحداث تعليمية وليست مجرد click tracking:

```js
[
  'activity.created',
  'activity.started',
  'item.presented',
  'audio.played',
  'student.response-observed',
  'answer.revealed',
  'item.repeated',
  'teacher.marked-needs-review',
  'activity.paused',
  'activity.reset',
  'activity.undone',
  'activity.completed'
]
```

كل event يحمل:

```js
{
  type,
  activityId,
  instanceId,
  itemId: null,
  timestamp,
  source: 'teacher' | 'student' | 'system',
  payload: {}
}
```

لا تسجل أسماء الطلاب في event log الأساسي. إذا احتاجت نسخة SaaS إلى roster، يكون ذلك من خلال طبقة خصوصية منفصلة.

---

## 3. واجهة instance

كل instance يجب أن يوفر واجهة متجانسة:

```js
const instance = engine.create('auditory-identify.v1', content, context);

instance.getSnapshot();
instance.dispatch({ type: 'START' });
instance.dispatch({ type: 'PLAY_AUDIO', itemId: 'ba-01' });
instance.dispatch({ type: 'REVEAL' });
instance.dispatch({ type: 'BACK' });
instance.reset();
instance.canUndo();
instance.undo();
instance.subscribe(listener);
instance.destroy();
```

`dispatch()` هو المسار الوحيد لتغيير الحالة. يمنع تعديل state من renderer أو من صفحة الدرس مباشرة.

---

## 4. Snapshot Contract

الـ renderer يستقبل snapshot غير قابل للتعديل:

```js
{
  activityId: 'auditory-identify.v1',
  instanceId: 'act-001',
  status: 'active',
  state: 'response',
  itemIndex: 2,
  itemCount: 8,
  reveal: { level: 0, visible: false },
  teacherHint: 'شغّل الصوت ثم انتظر استجابة الطلاب',
  studentPrompt: 'استمع ثم ارفع عدد الأصابع',
  availableCommands: ['PLAY_AUDIO', 'REVEAL', 'BACK', 'RESET'],
  progress: { completed: 2, total: 8, ratio: 0.25 },
  observations: { needsReview: false },
  lastEvent: null
}
```

هذا snapshot هو نقطة التقاء HTML الحالي وVue المستقبلي. لا يعتمد على `innerHTML` أو `onclick`.

---

## 5. Reset وUndo

### Reset

يعيد النشاط إلى `initialState` ويمسح history التشغيلي، مع إبقاء event log السابق كحدث `activity.reset` إذا سمحت سياسة الخصوصية.

### Undo / Back

يعود إلى آخر snapshot قابل للعكس. لا يجب أن يعيد تشغيل الصوت تلقائياً عند الرجوع، ولا أن يمحو ملاحظة المعلم دون تأكيد واضح. الأنشطة ذات التوقيت، مثل Rapid Retrieval، قد تستخدم `BACK` لإعادة العنصر الحالي بدلاً من إرجاع الساعة فعلياً.

### Emergency Hide

الأمر `EMERGENCY_HIDE` يخفي المحتوى البصري المكشوف ويترك النشاط في حالة قابلة للاستمرار. لا يعيد ضبط نتيجة التعلم ولا يمحو الملاحظات.

---

## 6. عقود أنشطة P6

### 6.1 `rapid-retrieval.v1`

- **الهدف:** استرجاع الحروف والكلمات بإيقاع سريع.
- **البيانات:** بطاقات قابلة للخلط، label، audio optional، timer.
- **الحالات:** `READY`, `RUNNING`, `PAUSED`, `ROUND_COMPLETE`, `COMPLETED`.
- **استجابة الطالب:** استجابة جماعية شفوية.
- **المعلم:** يبدأ Space، يوقف A، يعيد البطاقة، يعلّم العنصر الصعب.
- **النجاح:** استجابة خلال 3 ثوانٍ في 70% من البطاقات.
- **الإكمال:** دورتان أو تأكيد المعلم.

### 6.2 `silent-dictation.v1`

- **الهدف:** تحويل الصوت إلى كتابة مستقلة.
- **البيانات:** prompts صوتية، مدة انتظار، reveal content.
- **الحالات:** `HIDDEN`, `LISTENING`, `WRITING`, `REVEAL`, `SELF_CHECK`, `COMPLETED`.
- **استجابة الطالب:** كتابة على ورقة.
- **المعلم:** D يبدأ، R يكشف، Back يعيد السؤال.
- **النجاح:** معيار ملاحظة المعلم أو تصحيح ذاتي.
- **الإكمال:** جميع prompts عولجت.

### 6.3 `sentence-production.v1`

- **الهدف:** إنتاج جملة شفهية فردية.
- **البيانات:** sentence templates، word choices، roster adapter optional.
- **الحالات:** `READY`, `STUDENT_SELECTED`, `PROMPTING`, `SUPPORT_1`, `SUPPORT_2`, `COMPLETED`.
- **استجابة الطالب:** إنتاج شفهي مستقل أو مع دعم.
- **المعلم:** Space يظهر المنشئ، P يختار، Support يدرج مساعدة.
- **النجاح:** 85% إنتاج صحيح أو موثق كإنتاج مدعوم.
- **الإكمال:** كل الطلاب مروا أو أكد المعلم نهاية الجولة.

---

## 7. صلاحية العقد

قبل تسجيل أي Activity في registry يجب فحص:

- وجود `id` و`version`.
- وجود هدف تعليمي قابل للملاحظة.
- عدم وجود DOM أو `window` في core definition.
- وجود initial state وcompletion condition.
- تعريف كل command لحالات السماح والمنع.
- تعريف student response وsuccess criteria.
- وجود event types قابلة للتحليل.
- قدرة instance على reset وsnapshot.

