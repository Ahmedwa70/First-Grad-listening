# ⚠ DEPRECATED — انظر النسخة الرسمية

> **هذا الملف مُوقف** (2026-08-17 — Repository Architecture Audit).
> **المرجع الوحيد هو**: `md/Governance/PROJECT_KNOWLEDGE_MAP.md`
> هذا الملف يحتوي تدرجاً أقل تحدّثاً (missing Activity Engine subfolder, missing 12+ implementation reports).
> لا تُعدَّل هذا الملف — عدّل النسخة الرسمية فقط.

---

# Project Knowledge Architecture Map

> ~~خريطة مرجعية بصرية لفهم مكان كل نوع من المعرفة داخل المشروع.~~
> ~~الغرض: التوثيق فقط — لا تعتمد على أي إعادة هيكلة.~~
> **مُوقف — استخدم `md/Governance/PROJECT_KNOWLEDGE_MAP.md`**

---

## 1. شجرة المجلدات النهائية

```
md/
├── Governance/
│   ├── PROJECT_CONTEXT.md
│   ├── DESIGN_PHILOSOPHY.md
│   ├── SOURCE_OF_TRUTH.md
│   ├── PHASE_PROTOCOL.md
│   ├── CLAUDE_PROJECT_MAP.md
│   ├── DEVELOPMENT_ROADMAP.md
│   ├── PROJECT_DECISIONS.md
│   ├── CHANGELOG.md
│   └── PROJECT_KNOWLEDGE_MAP.md   ← هذا الملف
├── Pedagogy/
│   ├── PHONETIC_REPRESENTATION_DECISION_RECORD.md
│   └── AUDIO_RECORDING_SCRIPT.md
├── Architecture/
│   ├── ARCHITECTURE_RULES.md
│   ├── COMPONENT_REGISTRY.md
│   ├── THEME_ARCHITECTURE_ANALYSIS.md
│   └── THEME_RUNTIME_ANALYSIS.md
├── Phase Documentation/
│   ├── P1/
│   │   └── P1_VIEWPORT_BEHAVIOR_ANALYSIS.md
│   ├── P2/
│   │   ├── P2_AUDIO_HEADER_STATE_ANALYSIS.md
│   │   ├── P2_VISUAL_DESIGN_ANALYSIS.md
│   │   ├── P2_IMPLEMENTATION_PLAN.md
│   │   └── P2_IMPLEMENTATION_REVIEW.md
│   ├── P4/
│   │   ├── P4_LAYOUT_ANALYSIS.md
│   │   ├── P4_CONTAINER_LAYOUT_ANALYSIS.md
│   │   ├── P4_FINAL_CONTAINER_VISUAL_ANALYSIS.md
│   │   └── P4_TRUE_CONTAINER_ARCHITECTURE_ANALYSIS.md
│   └── P6/
│       ├── P6_LAYOUT_ANALYSIS.md
│       └── Phase Reports/
│           ├── P6-Classroom-Redesign-Analysis.md
│           ├── Phase-1-P6-Visual-Structure-Report.md
│           ├── Phase-2-P6-Interaction-Polish-Report.md
│           ├── Phase-3-P6-Teacher-Guidance-Mode-Report.md
│           └── Phase-3.1-P6-Progressive-Reveal-Refinement-Report.md
├── Implementation Reports/
│   ├── AI-Memory-Creation-Report.md
│   ├── AI-Memory-Finalization-Report.md
│   ├── Component-Registry-Creation-Report.md
│   ├── P6_AUDIT_AND_UIUX_REFACTORING_REPORT.md
│   └── ACTIVE-TASK-UPDATE-REPORT.md
├── AI Workflow/
│   ├── AI_WORKFLOW_RULES.md
│   ├── ACTIVE_TASK.md
│   └── CURRENT_STATE.md
└── Quality Audits/
    ├── THEME_VISUAL_QUALITY_AUDIT.md
    └── LIGHT_MODE_READABILITY_ANALYSIS.md
```

---

## 2. وظيفة كل مجلد

### Governance/ — الحوكمة (8 + هذا الملف = 9)

- **الوظيفة**: الهوية والسياق والقواعد المرجعية العليا للمشروع — "لماذا" وما هو الصواب.
- **أنواع الملفات**: ملفات سياق، فلسفة، مصدر حقيقة، بروتوكولات، قرارات، سجل تغييرات.
- **متى يُرجع إليه**: عند بدء أي عمل جديد، عند تعارض الوثائق، عند الحاجة لمعرفة «ماذا قررنا ولماذا»، وعند الحاجة لتوثيق أي تغيير (CHANGELOG).

### Pedagogy/ — التربية (2)

- **الوظيفة**: القرارات والمحتوى التربوي التعليمي — طريقة تقديم الحروف والأصوات والصوتيات.
- **أنواع الملفات**: سجلات قرارات تربوية، أدلة تنفيذية للتسجيل الصوتي.
- **متى يُرجع إليه**: عند مناقشة أي جانب تربوي (نطق، ترتيب تقديم، صوتيات)، وعند تنفيذ/مراجعة التسجيلات الصوتية.

### Architecture/ — البنية (4)

- **الوظيفة**: القواعد المعمارية وسجل المكونات وتحليلات البنية والثيم — كيف بُنيت البنية.
- **أنواع الملفات**: قواعد، سجلات مكونات، تحليلات معمارية/زمن تشغيل.
- **متى يُرجع إليه**: قبل إنشاء/تعديل أي مكوّن، عند تحليل تفاعل الثيم مع الكود، عند مراجعة الامتثال للقواعد.

### Phase Documentation/ — توثيق المراحل (14)

- **الوظيفة**: تحليلات وتقارير كل مرحلة (P1, P2, P4, P6) — «ماذا حدث ولماذا» في كل مرحلة.
- **أنواع الملفات**: تحليلات سلوك/تصميم/تخطيط، خطط تنفيذ، مراجعات، تقارير مراحل.
- **متى يُرجع إليه**: عند الرجوع لسياق مرحلة معينة أو لمشكلة شُخّصت سابقاً، وعند كتابة مراجعة لمرحلة جديدة.

  - `P1/`: تحليل سلوك العرض في المنفذ (viewport).
  - `P2/`: تحليلات الصوت والرأس والتصميم البصري + خطة التنفيذ ومراجعته.
  - `P4/`: سلسلة تحليلات تخطيط الحاوية (من القياس البسيط إلى البنية الكاملة).
  - `P6/`: تحليل التخطيط + تقارير المراحل (Phase-1..3.1) بما فيها `Phase Reports/`.

### Implementation Reports/ — تقارير التنفيذ (5)

- **الوظيفة**: سجل «ما تم إنجازه فعلياً» من عمليات تنظيم/تنفيذ على مستوى المشروع.
- **أنواع الملفات**: تقارير إنشاء/توحيد ذاكرة AI، إنشاء سجل المكونات، تحديثات المهام، وأرشفة إعادة هيكلة P6 وواجهة المستخدم.
- **متى يُرجع إليه**: عند الحاجة لسرد تنفيذي مختصر لأعمال سابقة دون تفاصيل التحليل الفني، أو لمراجعة تقرير [`P6_AUDIT_AND_UIUX_REFACTORING_REPORT.md`](Implementation%20Reports/P6_AUDIT_AND_UIUX_REFACTORING_REPORT.md).

### AI Workflow/ — سير عمل AI (3)

- **الوظيفة**: أدوات تشغيل الجلسات الآلية — قواعد العمل، المهمة الحالية، الحالة الراهنة.
- **أنواع الملفات**: قواعد، حالة نشطة، حالة حالية.
- **متى يُرجع إليه**: في بداية كل جلسة عمل (ACTIVE_TASK + CURRENT_STATE)، وعند التذكير بقواعد التعامل مع الذاكرة.

### Quality Audits/ — مراجعات الجودة (2)

- **الوظيفة**: تدقيق بصري وقرائي بعد التنفيذ — «هل النتيجة مطابقة للمعايير».
- **أنواع الملفات**: تدقيق جودة الثيم البصري، تحليل قابلية القراءة في الوضع الفاتح.
- **متى يُرجع إليه**: قبل إعلان اكتمال أي تغيير بصري/قرائي، وعند ظهور مشاكل قابلية قراءة أو انحراف عن التصميم.

---

## 3. Project Knowledge Flow — رحلة المعرفة

تسلسل منطقي لنضج المعرفة في المشروع من المبادئ إلى التحقق:

```
Educational Philosophy
        ↓
Pedagogical Decisions
        ↓
Architecture Rules
        ↓
Phase Analysis
        ↓
Implementation
        ↓
Quality Validation
```

| المرحلة | الموقع المرجعي |
|---|---|
| Educational Philosophy | `md/Governance/DESIGN_PHILOSOPHY.md` · `md/Governance/PROJECT_CONTEXT.md` |
| Pedagogical Decisions | `md/Pedagogy/PHONETIC_REPRESENTATION_DECISION_RECORD.md` · `md/Governance/PROJECT_DECISIONS.md` |
| Architecture Rules | `md/Architecture/ARCHITECTURE_RULES.md` · `md/Architecture/COMPONENT_REGISTRY.md` |
| Phase Analysis | `md/Phase Documentation/` (P1, P2, P4, P6) |
| Implementation | `md/Implementation Reports/` · `md/Governance/CHANGELOG.md` |
| Quality Validation | `md/Quality Audits/` · `md/Governance/CHANGELOG.md` |

---

## 4. Source of Truth Hierarchy — ترتيب المرجعية

عند تعارض الوثائق، يُرجَع بالترتيب التالي:

```
1. Governance
2. Pedagogy
3. Architecture
4. Phase Documentation
5. Implementation Reports
```

| الترتيب | المصدر | الدور في اتخاذ القرار |
|---|---|---|
| 1 | **Governance** | أعلى مرجعية: السياق، الفلسفة، القرارات، مصدر الحقيقة، السجل الزمني. |
| 2 | **Pedagogy** | مرجعية المحتوى التربوي عند تداخل البعد التعليمي مع التقني. |
| 3 | **Architecture** | مرجعية البنية والمكونات عند الحديث عن «كيف بُني». |
| 4 | **Phase Documentation** | سجل ما حدث داخل كل مرحلة — أدنى من القواعد، أعلى من التقارير. |
| 5 | **Implementation Reports** | سرد تنفيذي ثانوي لتوثيق العمليات، يُستشهد به ولا يحسم القرار. |
