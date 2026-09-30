# Phase Navigation Click Regression Fix Report

## Incident Summary

بعد صقل P3، أصبحت أزرار انتقال المراحل P1–P7 غير قابلة للنقر عند فتح قائمة المعلم. لم يكن السبب منطق JavaScript أو دوال `goToPhase()` أو بيانات الدرس؛ بل كان Regression في ترتيب طبقات CSS ظهر بعد إدخال طبقة الهوية العربية العالمية.

## السبب الحقيقي

في `css/style.css`، أنشأت طبقة الخلفية العالمية قاعدة تجعل عناصر التطبيق المباشرة فوق الخلفية:

```css
#app > .teacher-hud,
#app > #content-zone,
#app > .controls-bar,
#app > .progress-rail {
  position: relative;
  z-index: 1;
}
```

أعطت هذه القاعدة Teacher HUD ومنطقة المحتوى نفس طبقة الرسم (`z-index: 1`). وبما أن `#content-zone` يأتي بعد `teacher-hud` في بنية التطبيق، كان محتوى الدرس يرسم فوق قائمة المعلم المنسدلة عند تداخلها معه. ونتيجة ذلك، كان `document.elementFromPoint()` فوق زر P1 يعيد `.phoneme-btn` أو `.p1-hero-stage-card` بدلاً من الزر.

العناصر البصرية الجديدة في P3 لم تكن السبب المباشر: طبقات Ghost placeholders تستخدم `position: absolute` داخل مناطقها، ولا تستقبل النقر في حالتها غير المكتشفة. المشكلة كانت في تسوية طبقات الجذر العالمية، لا في كشف P3 نفسه.

## الإصلاح المطبق

أضيفت قاعدة CSS موضعية في نهاية `style.css` عند الأسطر **7678–7686**:

```css
#app > .teacher-hud {
  z-index: 20;
}

#app > .controls-bar,
#app > .progress-rail {
  z-index: 10;
}
```

تبقى منطقة محتوى الدرس على `z-index: 1`، بينما تصبح Teacher HUD وقائمتها المنسدلة أعلى منها. لم يتغير أي منطق أو عنصر DOM أو مظهر P3. كما بقيت طبقة الهوية الخلفية عند `z-index: 0` و`pointer-events: none`.

## تحقق DevTools

بعد الإصلاح، أعاد اختبار hit target عند مركز كل زر P1–P7 داخل القائمة المفتوحة الزر نفسه:

| الزر | العنصر المستقبِل للنقر بعد الإصلاح |
|---|---|
| P1 | `BUTTON.phase-nav-btn[data-phase="P1"]` |
| P2 | `BUTTON.phase-nav-btn[data-phase="P2"]` |
| P3 | `BUTTON.phase-nav-btn[data-phase="P3"]` |
| P4 | `BUTTON.phase-nav-btn[data-phase="P4"]` |
| P5 | `BUTTON.phase-nav-btn[data-phase="P5"]` |
| P6 | `BUTTON.phase-nav-btn[data-phase="P6"]` |
| P7 | `BUTTON.phase-nav-btn[data-phase="P7"]` |

## اختبار التنقل الفعلي

اختُبرت الأزرار بالنقر الحقيقي من قائمة المعلم المفتوحة. نجحت سلسلة التنقل التالية:

| الانتقال | النتيجة |
|---|---|
| P1 → P2 | ناجح |
| P2 → P3 | ناجح |
| P3 → P4 | ناجح |
| P4 → P5 | ناجح |
| P5 → P6 | ناجح |
| P6 → P7 | ناجح |
| P7 → P1 | ناجح |

## الملفات المعدلة

| الملف | التعديل |
|---|---|
| `css/style.css` | تصحيح z-index لـTeacher HUD وأشرطة التحكم، عند الأسطر 7678–7686. |
| `md/Implementation Reports/PHASE_NAVIGATION_CLICK_REGRESSION_FIX_REPORT.md` | توثيق السبب الحقيقي والإصلاح والتحقق. |

## القيود

لم يتم تعديل JavaScript أو بيانات الدرس أو منطق المراحل أو هيكل DOM أو تصميم P3. اقتصر الإصلاح على ترتيب طبقات CSS لاستعادة قابلية النقر على عناصر التحكم.
