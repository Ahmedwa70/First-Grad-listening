# 03 — P6 Activity Mapping

**التاريخ:** 14 أغسطس 2026  
**النوع:** تحليل معماري وربط عقود فقط — لا تنفيذ برمجي  
**السؤال الحاكم:** ما الذي يبقى داخل Lesson Data، وما الذي ينتمي إلى Activity Definition، وما الذي يجب أن يبقى في Renderer؟

---

## 1. قاعدة الربط

المرحلة ليست Activity. المرحلة هي سياق زمني وتربوي داخل الدرس؛ Activity هو سلوك تعليمي قابل لإعادة الاستخدام ببيانات مختلفة. لذلك لا يربط تعريف النشاط نفسه بـ`P6` أو`lesson-01`. يختار Lesson Definition النشاط عبر `activityId` و`contentRef` فقط [1].

```text
Lesson P6A/P6B/P6C/P6D
          ↓ configuration
Activity Library
          ↓ instance
Activity Engine
          ↓ snapshot
Projector / Teacher Renderer
```

---

## 2. خريطة P6 الجديدة

| قسم P6 | Activity ID | الغرض | مصدر المحتوى الأولي | ملاحظة الترحيل |
|---|---|---|---|---|
| P6A | `rapid-retrieval.v1` | استرجاع سريع للحروف والكلمات | بطاقات جديدة داخل Lesson Data عند اعتماد التنفيذ | لا يعاد استخدام `renderP6()` للسباق |
| P6B | `silent-dictation.v1` | صوت → كتابة → تصحيح ذاتي | prompts جديدة داخل Lesson Data | لا يظهر الشكل قبل `REVEAL` |
| P6C | `sentence-production.v1` | إنتاج جملة شفهية فردية | sentence templates وchoices | roster adapter خارج Lesson Data الأساسي |
| P6D.1 | `auditory-identify.v1` | تعرف صوت منفرد | D1 من `discriminationRounds` عبر adapter | يحافظ على عد الأصابع كresponse mode |
| P6D.2 | `same-or-different.v1` | مقارنة صوتين | D2 من `discriminationRounds` عبر adapter | أول مرشح للترحيل لاحقاً |
| P6D.3 | `close-sound-compare.v1` | مقارنة أصوات متقاربة | D3 من `discriminationRounds` عبر adapter | يعرض الشكل بعد الاستجابة لا قبلها |

لا يستخدم أي تعريف أسماء مثل `P6D1` أو`P6D2`. تظل D1/D2/D3 **تسميات محتوى/موروث** في Lesson Data فقط حتى انتهاء الترحيل.

---

## 3. تحويل D1/D2/D3 إلى Activities مستقلة

### 3.1 D1 → `auditory-identify.v1`

#### المدخل الحالي

```js
{
  id: 'D1',
  type: 'identify',
  pairs: [{ playId: 'ba', answer: 1 }, ...]
}
```

#### محتوى Activity المقترح

```js
{
  items: [
    {
      id: 'identify-01',
      audioRef: 'ba',
      expectedResponse: { type: 'finger-count', value: 1 },
      reveal: { letterRef: 'ba', levels: ['letter', 'name', 'fingers', 'dots'] }
    }
  ],
  responseMode: 'choral-gesture'
}
```

#### حدود المسؤولية

| Lesson Data | Activity Definition | Renderer |
|---|---|---|
| `audioRef`, letter reference، الإجابة، reveal content | حالات `ready/response/reveal/completed`، commands `PLAY_AUDIO/REVEAL/NEXT`، success criteria | زر الصوت، بطاقة الإجابة، حركة ظهور المستويات، لون الحرف |

#### الحفاظ على القيمة الحالية

يحفظ النشاط عدّ الأصابع والاستماع قبل الكشف وتعدد خطوات D1. لا يحفظ `p6AnswerVisible` أو selectors CSS كجزء من core.

---

### 3.2 D2 → `same-or-different.v1`

#### المدخل الحالي

```js
{
  id: 'D2',
  type: 'sameordiff',
  pairs: [{ playIds: ['ba', 'ta'], same: false }, ...]
}
```

#### محتوى Activity المقترح

```js
{
  items: [
    {
      id: 'compare-01',
      leftAudio: 'ba',
      rightAudio: 'ta',
      expectedResponse: { type: 'same-or-different', value: 'different' },
      reveal: { showComparedLetters: true }
    }
  ],
  responseMode: 'choral-gesture'
}
```

#### لماذا D2 هو أول مرشح للترحيل؟

لأنه يحتوي مدخلين صوتيين ونتيجة واحدة وحالة كشف واحدة، ولا يحتاج reveal متعدد المستويات مثل D1. لذلك يسهل التحقق من تطابقه مع renderer القديم، ويثبت command model قبل نقل الأنشطة الأكثر تعقيداً [2].

#### حدود المسؤولية

| Lesson Data | Activity Definition | Renderer |
|---|---|---|
| مرجعا الصوت، النتيجة، عناصر الكشف | تسلسل `PLAY_FIRST/PLAY_SECOND/OBSERVE_RESPONSE/REVEAL/NEXT` | زران صوتيان، شارة «نفس/مختلف»، مواضع المقارنة البصرية |

---

### 3.3 D3 → `close-sound-compare.v1`

#### المدخل الحالي

```js
{
  id: 'D3',
  type: 'close',
  triplets: [{ ids: ['ba', 'ta', 'tha'], note: '...' }, ...]
}
```

#### محتوى Activity المقترح

```js
{
  items: [
    {
      id: 'close-01',
      audioRefs: ['ba', 'ta', 'tha'],
      learningNote: 'الجسم واحد — النقاط تغيّر الصوت',
      reveal: { letterRefs: ['ba', 'ta', 'tha'] }
    }
  ],
  responseMode: 'choral-response'
}
```

#### التصحيح التربوي المقترح

في النسخة المستقبلية لا تظهر الحروف كوسيلة اختبار قبل الاستجابة. يبدأ النشاط بالصوت/التعليمات، ثم يظهر الشكل والنقاط والملاحظة كتفسير بعد `REVEAL`. بذلك يبقى D3 مراجعة سمعية بدلاً من مقارنة بصرية مقنّعة.

---

## 4. P6A/P6B/P6C — بيانات جديدة مطلوبة لاحقاً

هذه البيانات **لا تضاف الآن** لأنها خارج نطاق التحليل. يحدد الجدول ما يجب أن يضاف عند بدء تنفيذ منفصل معتمد.

| Activity | Lesson Data المطلوب | لا ينتمي إلى Lesson Data |
|---|---|---|
| `rapid-retrieval.v1` | card id، نوع بطاقة، label، letter/word ref، audio optional، ترتيب/seed إن لزم | timer behavior، commands، lifecycle، DOM |
| `silent-dictation.v1` | prompt id، audio ref، answer ref، انتظار مقترح، reveal hints | حالة `writing/reveal/self-check`، keyboard policy، rendering |
| `sentence-production.v1` | template، choices، model audio optional، support text | roster/هوية الطالب، حالة الاختيار، الدعم المتدرج، DOM |

---

## 5. Activity Contract Mapping

| Activity | Pedagogical Goal | Student Response | Teacher Actions | Success Criteria | Completion Condition | Events |
|---|---|---|---|---|---|---|
| `rapid-retrieval.v1` | استدعاء سريع | جماعية شفوية | START/PAUSE/PRESENT/MARK_REVIEW | ≥70% خلال 3ث | جولتان أو تأكيد المعلم | presented, needs-review, completed |
| `silent-dictation.v1` | صوت→كتابة | كتابة فردية | START/PLAY/WAIT/REVEAL/BACK | ≥70% صحيح أو self-check | prompts مكتملة | audio-played, revealed, repeated |
| `sentence-production.v1` | إنتاج جملة | فردية شفوية | SELECT/PROMPT/SUPPORT/COMPLETE | ≥85% مستقل/دعم محدود | roster أو عينة معتمدة | student-selected, support-level, completed |
| `auditory-identify.v1` | تعرف صوت منفرد | إيماءة/أصابع | PLAY/OBSERVE/REVEAL/NEXT | ملاحظة المعلم | عناصر مكتملة | audio-played, response-observed, revealed |
| `same-or-different.v1` | مقارنة صوتين | إشارة جماعية | PLAY_FIRST/PLAY_SECOND/OBSERVE/REVEAL/NEXT | ملاحظة المعلم | عناصر مكتملة | audio-played, response-observed, revealed |
| `close-sound-compare.v1` | مقارنة متقاربة | اختيار/وصف قصير | PLAY_SEQUENCE/OBSERVE/REVEAL/NEXT | تحسن في العنصر المستهدف | عناصر مكتملة | audio-played, response-observed, revealed |

---

## 6. ما يبقى في كل طبقة

### 6.1 Lesson Data

يبقى المحتوى المتغير من درس إلى آخر فقط:

- الحروف والكلمات والبطاقات.
- مراجع ملفات الصوت المحلية.
- الإجابات الصحيحة والنصوص الخاصة بالدرس.
- ترتيب العناصر أو إعدادات السياق التعليمية.
- ملاحظات خاصة بمجموعة الحروف ب/ت/ث/ن.

لا يبقى في Lesson Data: DOM، أسماء classes، مفاتيح keyboard، منطق transitions، أو ألوان موزعة خارج design tokens.

### 6.2 Activity Definition

يبقى السلوك القابل لإعادة الاستخدام:

- الهدف التعليمي المحايد.
- schema والتحقق من المحتوى.
- lifecycle والحالات المسموحة.
- Teacher Commands وreversibility.
- response mode وsuccess/completion conditions.
- events وsnapshot view model.

لا يبقى في Activity Definition: `P6`, `lesson-01`, اسم حرف محدد، أو `#content-zone`.

### 6.3 Renderer

يبقى العرض المتغير حسب المنصة:

- projector layout وRTL وNaskh/Sans وألوان design tokens.
- أزرار الصوت والحركات ومناطق الكشف.
- ربط snapshot بعناصر DOM أوVue.
- إظهار `teacher-hint` و`hint-zone` وفق activity snapshot.

لا يقرر Renderer: ما الذي يتعلمه الطالب، متى ينجح النشاط، أو كيف ينتقل lesson إلى Activity التالية.

### 6.4 Activity Engine

يبقى orchestration العام:

- registry والـinstances.
- state transition guards.
- reset/undo/event log.
- command dispatch.
- subscriptions/snapshots.

لا يعرف Engine شكل ب/ت/ث/ن أو CSS P6 أو ترتيب الدرس النهائي.

---

## 7. Content Adapter Boundary

الـadapter هو طبقة انتقالية، لا مصدر حقيقة جديد. مهمته تحويل schema موروثة مؤقتاً إلى content schema لنشاط مستقل:

```text
LESSON_01.discriminationRounds
      ↓ legacy content adapter
same-or-different.v1 content
      ↓
Activity Engine instance
```

قواعده:

1. قراءة فقط؛ لا يغير `LESSON_01` المجمد.
2. لا يحتوي DOM أو calls إلى AudioManager.
3. يمكن اختباره ببيانات صغيرة.
4. يبقى مؤقتاً حتى تنتقل Lesson Data إلى schema صريحة مستقلة.

---

## 8. قرار الربط

**المعتمد:** P6 يبنى لاحقاً كorchestration لأنشطة مستقلة. لا ينشأ `P6Renderer` ضخم جديد يعرف كل الاختلافات. يبدأ الترحيل بـ`same-or-different.v1` عبر Read-only Bridge، ثم يسحب D1 وD3، ثم يضاف Rapid Retrieval وDictation وSentence Production بملفات محتوى معتمدة منفصلة.

---

## References

[1]: ../../Architecture/Activity%20Engine/ACTIVITY_ENGINE_ARCHITECTURE.md "Activity Engine Architecture — phase/activity separation"
[2]: ../../Architecture/Activity%20Engine/ACTIVITY_ENGINE_ROADMAP.md "Roadmap — D2 migration candidate"
[3]: ../../Architecture/Activity%20Engine/ACTIVITY_CONTRACT.md "Activity Contract"
[4]: 01_P6_CURRENT_STATE_AUDIT.md "P6 Current State Audit"
[5]: ../../AI%20Workflow/CURRENT_STATE.md "Current State — P6 data and behavior"
