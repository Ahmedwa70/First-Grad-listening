# 04 — P6 Implementation Plan

**التاريخ:** 14 أغسطس 2026  
**الحالة:** خطة تنفيذ مستقبلية فقط — لا كود ولا تغييرات تشغيلية ضمن P6 Correction  
**الاستراتيجية:** Strangler Migration، لا Rewrite.

---

## 1. مبادئ التنفيذ الملزمة

1. لا تُعاد كتابة `app.js` أوP6 دفعة واحدة.
2. يبقى P6 الحالي هو fallback حتى تتجاوز Activity جديدة اختبارات القبول.
3. كل نشاط يرحّل منفرداً، مع feature flag واضح وقابل للإيقاف.
4. لا يربط تعريف Activity بـ`P6` أو`lesson-01` أوDOM خاص.
5. لا يغير أي Renderer هدف النشاط أوقواعد نجاحه؛ يستهلك snapshot فقط.
6. لا يتم لمس `lesson-01.js` إلا ضمن مرحلة تنفيذ معتمدة تضيف content data فقط.
7. يبقى الصوت عبر AudioManager المحلي، وتبقى Space/Back/A/F/1–7 فعالة طوال الترحيل.
8. لا يبدأ Vue/TypeScript قبل تثبيت Activity Contract ونجاح migration التدرجي في النسخة الحالية.

---

## 2. Phase 1 — Audit

### الهدف

توثيق واقع P6 وعقده المستقبلي قبل لمس التشغيل. هذه المرحلة هي محتوى حزمة `P6 Correction` الحالية.

### المخرجات

- `01_P6_CURRENT_STATE_AUDIT.md`
- `02_P6_REDESIGN_BLUEPRINT.md`
- `03_P6_ACTIVITY_MAPPING.md`
- هذه الخطة

### المخاطر

| الخطر | المعالجة |
|---|---|
| استنتاجات مبنية على CSS فقط | ربط كل قرار بالهدف التربوي والحالة والمنطق والوثائق المرجعية |
| خلط التمييز السمعي بالتقويم الختامي | فصل P6D عن P6A/P6B/P6C في الـBlueprint |
| تحويل الوثائق إلى وعد بتنفيذ فوري | تعريف صريح لخارج النطاق وعدم تعديل ملفات تشغيل |

### بوابة القبول

- جميع الوثائق داخل `md/Quality Audits/P6 Correction` فقط.
- لا تعديل في `app.js`, `lesson-01.js`, `css`, `lecture-01.html`, Activity Engine، أوrenderer.
- المسارات والقرارات والـrollback موثقة.

### Rollback

لا يلزم؛ المرحلة لا تغير التشغيل.

---

## 3. Phase 2 — Read-only Bridge

### الهدف

جعل Activity Engine يلاحظ P6 الحالي من دون التحكم به أو تغيير العرض المرئي.

### النطاق المسموح مستقبلاً

- إضافة content adapter للقراءة من `LESSON_01.discriminationRounds`.
- إضافة event bridge يترجم أحداث renderer القديم إلى event log.
- Feature flag محلي معطل افتراضياً في بيئة الصف.
- اختبارات بلا DOM للـadapter والـevents.

### ما لا يتغير

- `renderP6()` يبقى renderer الظاهر.
- `advanceP6()` يبقى مالك الانتقال الفعلي.
- CSS وDOM وتوقيت الصوت لا تتغير.
- لا تُضاف واجهة طالب أولوحة analytics مرئية.

### المخاطر

| الخطر | الأثر | الوقاية |
|---|---|---|
| event log لا يطابق الواقع | تحليلات خاطئة لاحقاً | مقارنة event sequence مع `STATE` بعد كل عنصر |
| bridge يبطئ P6 | ضرر للفصل | قياس زمن الضغط والاستماع؛ bridge read-only وصغير |
| تسريب lesson knowledge إلى engine | ضعف إعادة الاستخدام | adapter فقط، وdefinition بلا P6/lesson IDs |
| تغير غير مقصود في الصوت | كسر Audio First | لا calls جديدة إلى AudioManager في bridge؛ مراقبة فقط |

### اختبارات القبول

1. كل `audio.played`, `answer.revealed`, و`item.presented` في P6 القديم له event واحد مطابق.
2. لا error في console.
3. لا اختلاف مرئي في P6 عند تعطيل/تفعيل bridge.
4. Space وBack وسائر الاختصارات كما هي.
5. فتح الدرس offline بلا طلبات شبكة.

### Rollback

إيقاف feature flag للـbridge؛ يعود P6 إلى سلوكه القديم من دون إزالة كود.

---

## 4. Phase 3 — Migrate One Activity

### المرشح

`same-or-different.v1` المرتبط بمحتوى D2.

### لماذا هذا النشاط أولاً؟

- يملك دخلي صوت ونتيجة واحدة.
- لا يعتمد على reveal متعدد المستويات مثل D1.
- لا يتطلب كتابة أوroster أوtimer طويل.
- يمكن مقارنته بصرياً ومنطقياً مع D2 الحالي بسهولة.

### الخطوات المستقبلية

1. إنشاء content adapter لـD2 فقط.
2. تعريف instance بالنشاط في Activity Engine.
3. بناء renderer adapter يحاكي layout D2 الحالي من snapshot فقط.
4. ربط زر الصوت والكشف بأوامر activity، لا بدوال P6 مخصصة.
5. إبقاء `renderP6()` fallback خلف flag مثل:

```js
const RUNTIME_FLAGS = {
  p6SameOrDifferentEngineRenderer: false
};
```

6. اختبار التقدم والتراجع والكشف والإعادة و`EMERGENCY_HIDE`.

### المخاطر

| الخطر | الأثر | الوقاية |
|---|---|---|
| اختلاف ترتيب الكشف | تراجع تربوي | مقارنة state-by-state مع D2 الحالي قبل تفعيل flag |
| Undo يعيد صوتاً تلقائياً | تشويش صفّي | سياسة واضحة: undo بصري فقط، الصوت بأمر جديد من المعلم |
| renderer يغير contract | منطق موزع | Renderer يستهلك snapshot فقط؛ الاختبارات تعمل بلا DOM |
| فرق 720p/1080p | قص أوscroll | تحقق بصري في resolutions المعتمدة |

### اختبارات القبول

- التحول: `ready → response → reveal → next/completed` مطابق للعقد.
- زرا الصوت ينتجان نفس تشغيل AudioManager الحالي.
- Back يعيد الحالة الآمنة ولا يظهر الجواب قبل أوانه.
- renderer القديم والجديد متاحان عبر flag.
- لا تغير في P1–P5 أوP7.

### Rollback

إعادة flag إلى `false` والعودة للـlegacy D2. تبقى events للتشخيص فقط، ولا تُحذف الدوال القديمة.

---

## 5. Phase 4 — Full P6 Activity Migration

### الهدف

ترحيل أنشطة P6 الحالية D1/D2/D3 ثم بناء P6A/P6B/P6C من Activity Library، بعد نجاح D2 في بيئة صفية أواختبار قبول مكافئ.

### الترتيب

```text
4.1 auditory-identify.v1 (D1)
4.2 close-sound-compare.v1 (D3)
4.3 rapid-retrieval.v1 (P6A)
4.4 silent-dictation.v1 (P6B)
4.5 sentence-production.v1 (P6C)
4.6 orchestration + unified Teacher Controller
```

لا تنفذ هذه العناصر في commit واحد. لكل نشاط content contract، renderer adapter، feature flag، وreport تحقق مستقل.

### المخاطر

| الخطر | الأثر | الوقاية |
|---|---|---|
| تحويل P6 مرة واحدة إلى واجهة ضخمة | دين تقني جديد | نشاط واحد في كل مرة |
| إضافة الإملاء قبل اعتماد المحتوى/الصوت | تجربة ناقصة | اعتماد Lesson Data وملفات الصوت قبل renderer |
| انتقال فصل مبكر إلى إنتاج فردي | قلق لدى A0 | دعم متدرج وteacher-controlled pacing |
| خلط Summary/Homework مع P6 | مسار غير مطابق | يبقى P7 owner للإغلاق والواجب |
| استخدام analytics كدرجات علنية | ضرر نفسي | الأحداث خاصة بالمعلم، لا لوحة نتائج للطلاب |

### اختبارات القبول

| المحور | معيار القبول |
|---|---|
| التربوي | كل Activity تعلن goal/response/success/completion قبل التنفيذ |
| المعلم | كل إجراء قابل للتنبؤ، keyboard-only، وله hint واضح |
| الطالب | لقطة الشاشة تعرض هدفاً واحداً، ولا تكشف الحل قبل الاستجابة |
| الصوت | لا تشغيل تلقائي غير معتمد، وجميع الأصوات عبر AudioManager |
| العرض | 1280×720 و1366×768 و1920×1080 بلا قص للمحتوى الحرج |
| المعمارية | لا يظهر P6/lesson-01/DOM داخل Activity Definition |
| إعادة الاستخدام | تشغيل activity نفسها ببيانات وهمية أودرس آخر دون تغيير core |
| الرجوع | feature flag يعيد legacy renderer فوراً |
| الاستقرار | لا regression في P1–P7 أو navigation أوfullscreen |

### Rollback

- تعطيل renderer adapter الخاص بالنشاط المتأثر.
- إبقاء content adapter read-only إذا كان آمناً.
- العودة إلى legacy `renderP6()`.
- حفظ تقرير failure منفصل يوضح snapshot/command الذي اختلف، من دون تعديل عشوائي في الكود.

---

## 6. متى يصبح P6 جاهزاً لـVue أوTypeScript؟

ليس عند وجود ملفات Activity Engine فقط. الجاهزية تتحقق فقط عندما:

1. تعمل نشاطات P6 الأساسية فوق contracts مستقرة في HTML الحالي.
2. ينفصل core عن DOM ويُختبر بلا متصفح.
3. يصبح renderer adapter المستهلك الوحيد للـsnapshot.
4. يعمل Teacher Controller بقاموس أوامر موحد.
5. تنجح feature flags والـrollback في بيئة واقعية.
6. تصبح event schema مستقرة بما يكفي لبناء Teacher Dashboard لاحقاً.

بعدها يصبح تحويل core إلى TypeScript وتحويل renderers إلىVue **ترجمة تقنية لعقد مثبت**، لا محاولة لاكتشاف التصميم أثناء الترحيل.

---

## 7. Definition of Done لكل نشاط

لا يعلن أي Activity migrated إلا إذا حقق جميع البنود:

- [ ] تعريف مستقل معرف بالنسخة وهدف تربوي قابل للملاحظة.
- [ ] schema للبيانات والتحقق منها.
- [ ] states وcommands وsuccess/completion conditions موثقة.
- [ ] reset وundo policy محددان.
- [ ] event log مفيد للمعلم ولا يحمل بيانات شخصية افتراضياً.
- [ ] renderer لا يحمل منطقاً تربوياً.
- [ ] feature flag وrollback واضحان.
- [ ] اختبارات core بلا DOM.
- [ ] اختبار browser/offline.
- [ ] اختبار projector عند resolutions المستهدفة.
- [ ] عدم كسر المفاتيح والصوت والتنقل.
- [ ] تقرير تحقق داخل `md/Quality Audits`.

---

## References

[1]: ../../Architecture/Activity%20Engine/ACTIVITY_ENGINE_ROADMAP.md "Activity Engine Roadmap"
[2]: ../../Architecture/Activity%20Engine/ACTIVITY_CONTRACT.md "Activity Contract"
[3]: ../../Architecture/Activity%20Engine/ACTIVITY_ENGINE_ARCHITECTURE.md "Activity Engine Architecture"
[4]: ../../Governance/PHASE_PROTOCOL.md "Phase Protocol"
[5]: 01_P6_CURRENT_STATE_AUDIT.md "P6 Current State Audit"
[6]: 02_P6_REDESIGN_BLUEPRINT.md "P6 Redesign Blueprint"
[7]: 03_P6_ACTIVITY_MAPPING.md "P6 Activity Mapping"
