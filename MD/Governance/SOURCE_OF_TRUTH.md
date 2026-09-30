# SOURCE_OF_TRUTH.md — مصادر الحقيقة

> المرجعيات الوحيدة المعتمدة. إذا تعارض ملفان في المعرفة، الترتيب هنا هو الفيصل.

## تسلسل المرجعية (الأعلى أولاً)

1. **`Work plan\07_Lesson 01 HTML Implementation Map (RTL)....docx`** — خريطة التنفيذ النهائية:
   تسلسل الكشف، القائمة، المدد، الإملاء، الواجب. (مصدر الإجابات التنفيذية)
2. **`Work plan\06_HTML Lesson Architecture RTL....docx`** — معمارية الصفحة (المعلم Controller وحيد، مناطق، عقد DOM).
3. **`Work plan\05_Classroom HTML Design System....docx`** — نظام التصميم (18 قسماً، المكوّنات م-01…م-17+).
4. **`Work plan\04_Instructional Blueprint....docx`** — المرجع التنفيذي الوحيد للأنشطة (P1–P7، أنشطة مرقمة).
5. **`Work plan\03_Pedagogical Blueprint....docx`** — تصميم المحاضرة الأولى تربوياً.
6. **`Work plan\02_Course Roadmap ....docx`** — الرؤية والفئة المستهدفة (جامعيون صينيون 18–22) والمنهج العام.
7. **`Work plan\01_Pedagogical Framework ....docx`** — الفلسفة الاستراتيجية العامة.

## مصادر الكود (المشروع الفعلي)

- **البيانات**: `Lesson-01-classroom-P6-Fixed\js\lesson-01.js` — محتوى الدرس الحقيقي (الحروف، الكلمات، الجولات، المراحل).
- **المنطق**: `Lesson-01-classroom-P6-Fixed\js\app.js` — التفاعل والتنقل والصوت.
- **التصميم**: `Lesson-01-classroom-P6-Fixed\css\style.css` — متغيرات `:root` + أقسام المراحل.
- **البنية**: `Lesson-01-classroom-P6-Fixed\lecture-01.html` — عقد DOM الفعلية.
- **حالة الصوت**: `Lesson-01-classroom-P6-Fixed\assets\audio\README.md` — قائمة MP3 المطلوبة وحالة الاحتياطي.

## الوثائق التنظيمية

- **`before-order.txt`** (في `First-Grad-WorkSync\`) — بروتوكول عمل الوكلاء وتحديد هيكل الذاكرة.
- **`Work plan\البرومبت.txt`** — التعليمات الأصلية التي ولّدت المحاضرة.
- **`Work plan\الاهداف الان.txt`** — أهداف الفصل الحالية.
- **`Work plan\انشطة يجب اضافتها.txt`** — نشاطات مقترحة لم تُنفَّذ بعد.

## النسخ النصية للقراءة (لا تُعدَّل)

نصوص docx المستخرجة للقراءة السريعة: `C:\Users\NextEdge\AppData\Local\Temp\opencode\workplan_txt\01_...txt` إلى `07_...txt`
(سكربت الاستخراج: `docx_extract.py` في نفس المجلد — Python stdlib، يُشغَّل مع `$env:PYTHONIOENCODING='utf-8'`).

## معلومات غير مؤكدة / تحتاج تحققاً

- الوثائق 03–07 قُرئت جزئياً فقط أثناء إنشاء الذاكرة — عند الحاجة للتفاصيل يُعاد قراءة النص الكامل من النسخ النصية.
- `البرومبت الذي تم استخدامه.docx` فارغ عملياً.
- لم تُسجَّل اختبارات صفية فعلية بعد.
- `lectures\` فارغ (لا دروس تالية بعد).
