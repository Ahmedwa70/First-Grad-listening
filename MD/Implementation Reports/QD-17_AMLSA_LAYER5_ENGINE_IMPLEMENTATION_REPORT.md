# QD-17 AMLSA — Layer 5 Engine Foundation Implementation Report

---

| الحقل | القيمة |
|-------|--------|
| **Decision** | QD-17 — AMLSA Layer 5 Engine |
| **Date** | 2026-08-10 |
| **Scope** | ENGINE layer — app.js |

---

## 1. الهدف

بناء `ArticulationEngine` — واجهة برمجية داخلية لقراءة بيانات `letter.articulation` من DATA layer وتوفيرها لـ VIEW layer مستقبلاً.

---

## 2. الملفات المعدلة

| الملف | التغيير |
|-------|---------|
| `js/app.js` | إضافة `ArticulationEngine` object (سطور 126–181) + `init()` في DOMContentLoaded (سطر 1979) |

---

## 3. القرار المعماري

- `ArticulationEngine` = كائن singleton بنفس نمط `AudioManager`
- يُهيَّأ في `DOMContentLoaded` بعد `AudioManager.init()` مباشرة
- يقرأ من `LESSON_01.letters` — لا ينسخ البيانات
- يوفر API بسيطة — لا يعرض شيئاً (ENGINE فقط)

---

## 4. ما تم تنفيذه

| الدالة | الوظيفة |
|--------|---------|
| `init(letters)` | تهيئة بمصفوفة الحروف |
| `hasArticulation(id)` | هل الحرف يحتوي articulation؟ |
| `getArticulation(id)` | إرجاع كائن articulation كاملاً أو null |
| `getDifficulty(id)` | إرجاع درجة الصعوبة |
| `needsArticulation(id)` | هل الحرف يحتاج عرض articulation؟ (critical/important) |
| `getSvgFile(id)` | إرجاع مسار SVG أو null |
| `getSlowAudio(id)` | إرجاع مسار صوت بطيء أو null |
| `getSteps(id)` | إرجاع خطوات الإنتاج الصوتي أو [] |
| `getDescription(id, lang)` | إرجاع الوصف بلغة محددة |

---

## 5. ما لم يتم تنفيذه

| البند | السبب |
|-------|-------|
| VIEW (HTML/CSS) | مرحلة لاحقة |
| SVG rendering | مرحلة لاحقة |
| Teacher Controls | مرحلة لاحقة |
| Animation | مرحلة لاحقة |

---

## 6. الاختبار

| الاختبار | النتيجة |
|---------|---------|
| بنية الكود (مراجعة يدوية) | ✅ سليم — لا أخطاء صياغة |
| `ArticulationEngine` بنفس نمط `AudioManager` | ✅ متوافق |
| `init()` مربوط في DOMContentLoaded | ✅ سطر 1979 |
| لا تعديل على P1–P7 rendering | ✅ لا استدعاء للمحرك من أي دالة render |
| QD-16 سليم | ✅ لا تغيير في phoneme/ipa |

ملاحظة: المتصفح المدمج يعرض snapshot ثابتة لملفات file:// — الاختبار التفاعلي يتطلب فتح الملف في متصفح خارجي.

---

## 7. الخطوة التالية

بناء VIEW layer: دالة `buildArticulationHTML()` تستدعي `ArticulationEngine` وتعرض محتوى L5 في P2 (ن-04).
