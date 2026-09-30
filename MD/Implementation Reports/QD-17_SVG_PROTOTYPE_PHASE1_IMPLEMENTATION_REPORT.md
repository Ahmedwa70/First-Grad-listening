# QD-17 SVG Prototype Phase 1 — Implementation Report

---

| الحقل | القيمة |
|-------|--------|
| **Decision** | QD-17-SVG Phase 1 |
| **Date** | 2026-08-10 |
| **Scope** | حرف ث فقط — Proof of Concept |

---

## 1. الملفات المنشأة

| الملف | النوع | الوصف |
|-------|-------|-------|
| `assets/articulation/base/sagittal-base.svg` | SVG | المقطع الجانبي الأساسي — شفتان، أسنان، حنك، بلعوم |
| `assets/articulation/tongue/tongue-tip-between-teeth.svg` | SVG | اللسان يخرج بين الأسنان (ث ذ ظ) |
| `assets/articulation/airflow/airflow-oral-continuous.svg` | SVG | مسار هواء مستمر — أسهم متقطعة |
| `assets/articulation/highlight/highlight-teeth.svg` | SVG | حلقة تمييز حول منطقة الأسنان |

---

## 2. الملفات المعدلة

| الملف | التغيير |
|-------|---------|
| `js/lesson-01.js` | إضافة `layers` object داخل `articulation` لحرف ث |
| `js/app.js` | إضافة `getLayerPaths()` في ArticulationEngine + `p2LoadArticulationSVGs()` + تحديث `p2UpdateArticulation()` لعرض SVG inline |
| `css/style.css` | إضافة أنماط `.art-svg-viewer`, `.art-svg-container`, `.art-layer`, `.art-card-body`, `.art-info` |
| `md/Governance/QD-17_SVG_ARTICULATION_ASSET_ARCHITECTURE.md` | Status: Proposed → Approved |
| `md/Governance/PROJECT_DECISIONS.md` | إضافة QD-17-SVG كقرار معتمد |
| `md/Governance/PROJECT_KNOWLEDGE_MAP.md` | إضافة مرجع QD-17-SVG |

---

## 3. ما تم تنفيذه

| العنصر | التفصيل |
|--------|---------|
| **4 ملفات SVG** | Base + Tongue + Airflow + Highlight — نظام طبقات حسب QD-17-SVG |
| **`layers` في البيانات** | `{ base, tongue, airflow, highlight }` في `articulation` لحرف ث |
| **`getLayerPaths()`** | دالة جديدة في ArticulationEngine — تبني مسارات الملفات من `layers` |
| **`p2LoadArticulationSVGs()`** | تحميل SVG كـ inline عبر fetch — يرث `currentColor` و CSS variables |
| **تحديث Viewer** | البطاقة تعرض SVG (يسار) + نص (يمين) بتخطيط flex RTL |
| **اعتماد QD-17-SVG** | Status: Approved + سجل في PROJECT_DECISIONS |

---

## 4. القرارات التقنية

| القرار | السبب |
|--------|-------|
| **Inline SVG عبر fetch** بدل `<object>` | `<object>` لا يرث `currentColor` من الصفحة الأم — inline SVG يتكيف مع الثيم |
| **CSS variables للألوان** | `--art-tongue`, `--art-airflow`, `--art-highlight` — قابلة للتخصيص |
| **Fallback colors** | كل SVG يحتوي fallback (`#E57373`, `#FFB74D`, `#4DD0E1`) إذا لم تتوفر المتغيرات |

---

## 5. نتائج الاختبار

| الاختبار | النتيجة |
|---------|---------|
| ث → SVG يظهر (4 طبقات متراكبة) + نص | ✅ |
| ب → القسم مخفي ومفرّغ | ✅ |
| ت → القسم مخفي | ✅ |
| ن → القسم مخفي | ✅ |
| ث مجدداً → SVG يعود | ✅ |
| P3 → لا تتأثر | ✅ |
| P4 → لا تتأثر | ✅ |
| P5 → لا تتأثر | ✅ |
| P6 → لا تتأثر | ✅ |
| QD-16 → `/ث/` سليم | ✅ |
| التصميم → بطاقة مدمجة مع SVG يسار ونص يمين | ✅ |

---

## 6. ملاحظات مستقبلية

| الملاحظة | التوصية |
|---------|---------|
| SVG Base يحتاج تحسين تشريحي | مراجعة بصرية مع متخصص صوتيات |
| CSS animation للإطارات غير منفذ | Phase 2: إضافة Progressive Reveal للطبقات |
| باقي الحروف (ب ت ن) بدون SVG | Phase 2: إضافة الطبقات المطلوبة |
| اختبار على بروجكتور حقيقي | مطلوب للتحقق من الوضوح من بعد |
