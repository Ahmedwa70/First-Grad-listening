# QD-17 AMLSA — Layer 5 Foundation Implementation Report

---

| الحقل | القيمة |
|-------|--------|
| **Decision** | QD-17 — AMLSA Layer 5 Foundation |
| **Date** | 2026-08-10 |
| **Scope** | DATA layer only — lesson-01.js |

---

## 1. الهدف

إنشاء نموذج بيانات `articulation` قابل للتوسع داخل `lesson-01.js` كأساس معماري لـ Layer 5 (Articulation Visualization) ضمن AMLSA.

---

## 2. الملفات المعدلة

| الملف | التغيير |
|-------|---------|
| `js/lesson-01.js` | إضافة كائن `articulation` لحرف `tha` (سطور 70–99) |
| `md/Governance/CHANGELOG.md` | سجل مختصر |

---

## 3. القرار المعماري

- `articulation` = حقل اختياري داخل كائن الحرف (نفس مستوى `phoneme`, `ipa`, `color`)
- يتوافق مع DATA→ENGINE→VIEW: بيانات فقط، لا عرض، لا منطق
- الحروف بدون `articulation` (ب، ت، ن) تعمل كالسابق — لا تغيير في السلوك

---

## 4. ما تم تنفيذه

كائن `articulation` لحرف ث يتضمن:

| الحقل | القيمة | الوظيفة |
|-------|--------|---------|
| `place` / `placeAr` | `interdental` / `بين-أسنانية` | مكان خروج الصوت |
| `manner` / `mannerAr` | `fricative` / `احتكاكي` | طريقة مرور الهواء |
| `voicing` / `voicingAr` | `voiceless` / `مهموس` | الجهر/الهمس |
| `emphasis` | `false` | التفخيم |
| `nasality` | `false` | الغنة |
| `difficulty` | `critical` | درجة الصعوبة |
| `template` | `interdental` | نموذج SVG المستقبلي |
| `tongue` / `tongueAr` | `tip-between-teeth` / وصف عربي | وضع اللسان |
| `lips` / `lipsAr` | `relaxed` / `مسترخيتان` | وضع الشفتين |
| `airflow` / `airflowAr` | `continuous-oral` / وصف عربي | مسار الهواء |
| `svgFile` | `null` | ملف SVG (مؤجل) |
| `slowAudio` | `null` | ملف صوت بطيء (مؤجل) |
| `description` | `{ar, zh, en}` | وصف متعدد اللغات |
| `steps` | 3 خطوات `{id, ar, zh}` | خطوات الإنتاج الصوتي |

---

## 5. ما لم يتم تنفيذه

| البند | السبب |
|-------|-------|
| SVG templates | مرحلة لاحقة |
| Slow audio files | مرحلة لاحقة |
| ENGINE (app.js) | لا حاجة — البيانات لا تُعرض بعد |
| VIEW (HTML/CSS) | لا حاجة — لا UI بعد |
| باقي الحروف (ب، ت، ن) | Proof of Concept = ث فقط |

---

## 6. الخطوة القادمة

إضافة `articulation` لباقي حروف المحاضرة 1 (ب، ت، ن) عند الحاجة، ثم بناء ENGINE function لقراءة البيانات وعرضها في P2 (ن-04).
