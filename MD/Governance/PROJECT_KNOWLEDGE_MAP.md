# Project Knowledge Architecture Map

> خريطة مرجعية بصرية لفهم مكان كل نوع من المعرفة داخل المشروع.
> آخر تحديث: 2026-08-17 — Repository Architecture Audit.
> هذا الملف هو **المرجع الوحيد** لشجرة md/. النسخة في `md/` الجذرية أُُوقفت.

---

## 1. شجرة المجلدات النهائية (الحالة الفعلية على القرص)

```
md/
├── Governance/                                    (15 ملف — الحوكمة)
│   ├── PROJECT_CONTEXT.md                          السياق العام للمشروع
│   ├── DESIGN_PHILOSOPHY.md                        فلسفة التصميم التربوي
│   ├── SOURCE_OF_TRUTH.md                          تسلسل المرجعيات (⚠ يحتوي مسارات قديمة لملفات docx أُزيلت)
│   ├── PHASE_PROTOCOL.md                           بروتوكول العمل بالمراحل
│   ├── CLAUDE_PROJECT_MAP.md                       خريطة توجيهية لوكيل Claude
│   ├── DEVELOPMENT_ROADMAP.md                      خارطة طريق التطوير
│   ├── PROJECT_DECISIONS.md                        سجل القرارات المعمارية والتربوية
│   ├── PROJECT_KNOWLEDGE_MAP.md                    هذا الملف
│   ├── CHANGELOG.md                                سجل التغييرات الزمني
│   ├── QD-16_ARABIC_SOUND_REPRESENTATION_STRATEGY.md   استراتيجية تمثيل الصوت العربي
│   ├── QD-16_PHONETIC_REPRESENTATION_DECISION.md      قرار التمثيل الصوتي (QD-16)
│   ├── QD-17_ARTICULATION_VISUALIZATION_ARCHITECTURE.md معمارية تصوير النطق البصري
│   ├── QD-17_ADAPTIVE_MULTI_LAYER_SOUND_ARCHITECTURE.md بنية الصوت متعددة الطبقات
│   ├── QD-17_SVG_ARTICULATION_ASSET_ARCHITECTURE.md    معمارية أصول SVG للنطق
│   └── SYSTEM_ARCHITECTURE_COMPLETENESS_AUDIT.md       فحص اكتمال البنية النظامية
│
├── Pedagogy/                                      (2 ملف — التربية)
│   ├── PHONETIC_REPRESENTATION_DECISION_RECORD.md    سجل قرار التمثيل الصوتي
│   └── AUDIO_RECORDING_SCRIPT.md                     سكريبت التسجيل الصوتي
│
├── Architecture/                                  (4 ملفات + Activity Engine/ — البنية)
│   ├── ARCHITECTURE_RULES.md                        القواعد المعمارية الإلزامية
│   ├── COMPONENT_REGISTRY.md                        سجل المكونات (⚠ بعض أرقام الأسطر قديمة)
│   ├── THEME_ARCHITECTURE_ANALYSIS.md               تحليل بنية الثيم
│   ├── THEME_RUNTIME_ANALYSIS.md                    تحليل تشغيل الثيم في runtime
│   └── Activity Engine/                             (3 ملفات — محرك الأنشطة)
│       ├── ACTIVITY_CONTRACT.md                      عقد الأنشطة المطلوب
│       ├── ACTIVITY_ENGINE_ARCHITECTURE.md           معمارية محرك الأنشطة
│       └── ACTIVITY_ENGINE_ROADMAP.md                خارطة طريق الترحيل
│
├── Phase Documentation/                           (14 ملف — توثيق المراحل)
│   ├── P1/
│   │   └── P1_VIEWPORT_BEHAVIOR_ANALYSIS.md
│   ├── P2/
│   │   ├── P2_AUDIO_HEADER_STATE_ANALYSIS.md
│   │   ├── P2_IMPLEMENTATION_PLAN.md
│   │   ├── P2_IMPLEMENTATION_REVIEW.md
│   │   └── P2_VISUAL_DESIGN_ANALYSIS.md
│   ├── P4/
│   │   ├── P4_CONTAINER_LAYOUT_ANALYSIS.md
│   │   ├── P4_FINAL_CONTAINER_VISUAL_ANALYSIS.md
│   │   ├── P4_LAYOUT_ANALYSIS.md
│   │   └── P4_TRUE_CONTAINER_ARCHITECTURE_ANALYSIS.md
│   └── P6/
│       ├── P6_LAYOUT_ANALYSIS.md
│       └── Phase Reports/
│           ├── Phase-1-P6-Visual-Structure-Report.md
│           ├── Phase-2-P6-Interaction-Polish-Report.md
│           ├── Phase-3-P6-Teacher-Guidance-Mode-Report.md
│           ├── Phase-3.1-P6-Progressive-Reveal-Refinement-Report.md
│           └── P6-Classroom-Redesign-Analysis.md
│
├── Implementation Reports/                        (17 ملف — تقارير التنفيذ)
│   ├── ACTIVE-TASK-UPDATE-REPORT.md
│   ├── AI-Memory-Creation-Report.md
│   ├── AI-Memory-Finalization-Report.md
│   ├── Component-Registry-Creation-Report.md
│   ├── FAST_CLASSROOM_UX_PASS_REPORT.md
│   ├── P3_LETTER_DISCOVERY_IMPROVEMENT_REPORT.md
│   ├── P6_AUDIT_AND_UIUX_REFACTORING_REPORT.md
│   ├── P6_D2_ACTIVITY_MIGRATION_REPORT.md
│   ├── P6_ENHANCEMENT_PHASE1_REPORT.md
│   ├── PHASE4_ACTIVITY_COMPLETENESS_IMPLEMENTATION_REPORT.md
│   ├── PHASE5_TEACHER_UX_IMPLEMENTATION_REPORT.md
│   ├── QD-16_IMPLEMENTATION_REPORT.md
│   ├── QD-17_AMLSA_LAYER5_ENGINE_IMPLEMENTATION_REPORT.md
│   ├── QD-17_AMLSA_LAYER5_FOUNDATION_IMPLEMENTATION_REPORT.md
│   ├── QD-17_AMLSA_LAYER5_VIEWER_MVP_IMPLEMENTATION_REPORT.md
│   ├── QD-17_SVG_PROTOTYPE_PHASE1_IMPLEMENTATION_REPORT.md
│   └── QD-17_SVG_PROTOTYPE_ROLLBACK_REPORT.md
│
├── AI Workflow/                                   (3 ملفات — أدوات الجلسات)
│   ├── AI_WORKFLOW_RULES.md                         قواعد عمل الوكيل الآلي
│   ├── ACTIVE_TASK.md                               المهمة النشطة الحالية
│   └── CURRENT_STATE.md                             الحالة الراهنة للمشروع
│
└── Quality Audits/                                (12 ملف + P6 Correction/ — مراجعات الجودة)
    ├── LIGHT_MODE_READABILITY_ANALYSIS.md
    ├── P3_LETTER_DISCOVERY_DEEP_REVIEW.md
    ├── P5_FINAL_VISUAL_POLISH_REPORT.md
    ├── P5_PEDAGOGICAL_REVEAL_UPGRADE_REPORT.md
    ├── P5_PREMIUM_VISUAL_REFINEMENT_REPORT.md
    ├── P5_SINGLE_PEDAGOGICAL_REDESIGN_REPORT.md
    ├── P5_VISUAL_REVIEW_AND_TRANSITION_REPORT.md
    ├── P5_WORDS_PHASE_DEEP_ANALYSIS_REPORT.md
    ├── P5_WORDS_PHASE_ENHANCEMENT_REPORT.md
    ├── P6_AUDIT_REPORT.md
    ├── P6_COMPLIANCE_AUDIT.md
    ├── THEME_VISUAL_QUALITY_AUDIT.md
    └── P6 Correction/                              (7 ملفات — تصحيح P6)
        ├── 01_P6_CURRENT_STATE_AUDIT.md
        ├── 02_P6_REDESIGN_BLUEPRINT.md
        ├── 03_P6_ACTIVITY_MAPPING.md
        ├── 04_P6_IMPLEMENTATION_PLAN.md
        ├── P6_CORRECTION_DOCUMENTATION_REPORT.md
        ├── P6_VISUAL_FIX_REPORT.md
        └── P6_VISUAL_REDESIGN_REPORT.md
```

---

## 2. وظيفة كل مجلد

### Governance/ — الحوكمة (15 ملف)

- **الوظيفة**: الهوية والسياق والقواعد المرجعية العليا للمشروع — "لماذا" وما هو الصواب.
- **أنواع الملفات**: ملفات سياق، فلسفة، مصدر حقيقة، بروتوكولات، قرارات، سجل تغييرات، تحليلات QD-16/QD-17.
- **متى يُرجع إليه**: عند بدء أي عمل جديد، عند تعارض الوثائق، عند الحاجة لمعرفة «ماذا قررنا ولماذا».
- **ملاحظة**: `SOURCE_OF_TRUTH.md` يحتوي مسارات قديمة لملفات docx لم تعد موجودة — الحالة الحالية: الملفات مُستخرجة كـ .md في `Work plan/`.

### Pedagogy/ — التربية (2)

- **الوظيفة**: القرارات والمحتوى التربوي التعليمي — طريقة تقديم الحروف والأصوات والصوتيات.
- **أنواع الملفات**: سجل قرار صوتي، سكريبت تسجيل.
- **متى يُرجع إليه**: عند مناقشة أي جانب تربوي (نطق، ترتيب تقديم، صوتيات).

### Architecture/ — البنية (7 ملفات)

- **الوظيفة**: القواعد المعمارية وسجل المكونات وتحليلات البنية والثيم ومحرك الأنشطة.
- **أنواع الملفات**: قواعد، سجلات مكونات، تحليلات معمارية/زمن تشغيل، عقد وعمارية وخارطة طريق محرك الأنشطة.
- **متى يُرجع إليه**: قبل إنشاء/تعديل أي مكوّن، عند تحليل تفاعل الثيم مع الكود، عند مراجعة الامتثال للقواعد.
- **ملاحظة**: `COMPONENT_REGISTRY.md` بعض أرقام الأسطر فيه قديمة (مثال: `AudioManager` في app.js ذُكر أنه "سطر 41-113" وهو الآن في السطور 50-128).

### Phase Documentation/ — توثيق المراحل (14)

- **الوظيفة**: تحليلات وتقارير كل مرحلة — «ماذا حدث ولماذا» في كل مرحلة.
- **نطاق المراحل الموثقة**: P1، P2، P4، P6. (P3، P5، P7 لا يوجد توثيق خاص بها في هذا المجلد).
- **P6 Phase Reports/**: تقارير مراحل تصحيح P6 البصري والتفاعلي (Phase 1–3.1).

### Implementation Reports/ — تقارير التنفيذ (17)

- **الوظيفة**: سجل «ما تم إنجازه فعلياً» من عمليات الترحيل والتنفيذ على مستوى المشروع.
- **النطاق**: إنشاء ذاكرة AI، سجل المكونات، تحسينات P3/P6، ترحيل محرك الأنشطة، تنفيذ QD-16/QD-17، تحسينات UX.
- **ملاحظة**: هذا المجلد يحتوي أكبر عدد من الملفات في التوثيق — انعكاس لنشاط التطوير المكثف.

### AI Workflow/ — سير عمل AI (3)

- **الوظيفة**: أدوات تشغيل الجلسات الآلية — قواعد العمل، المهمة الحالية، الحالة الراهنة.
- **متى يُرجع إليه**: في بداية كل جلسة عمل (ACTIVE_TASK + CURRENT_STATE).

### Quality Audits/ — مراجعات الجودة (19)

- **الوظيفة**: تدقيق بصري ووظيفي بعد التنفيذ.
- **النطاق**: قراءة Light mode، تدقيق P3/P5/P6 البصري، تدقيق P6 للتوافق، مراجعة شاملة.
- **P6 Correction/**: 7 ملفات متسلسلة (Audit → Blueprint → Mapping → Plan → Reports).

---

## 3. Project Knowledge Flow — رحلة المعرفة

```
Educational Philosophy         ← Governance/DESIGN_PHILOSOPHY.md + PROJECT_CONTEXT.md
        ↓
Pedagogical Decisions          ← Pedagogy/ + Governance/PROJECT_DECISIONS.md
        ↓
Architecture Rules             ← Architecture/ARCHITECTURE_RULES.md + COMPONENT_REGISTRY.md
        ↓
Phase Analysis                 ← Phase Documentation/ (P1, P2, P4, P6)
        ↓
Implementation                 ← Implementation Reports/ + Governance/CHANGELOG.md
        ↓
Quality Validation             ← Quality Audits/ + Governance/CHANGELOG.md
```

| المرحلة | الموقع المرجعي |
|---|---|
| Educational Philosophy | `md/Governance/DESIGN_PHILOSOPHY.md` · `md/Governance/PROJECT_CONTEXT.md` |
| Pedagogical Decisions | `md/Pedagogy/PHONETIC_REPRESENTATION_DECISION_RECORD.md` · `md/Governance/PROJECT_DECISIONS.md` |
| Architecture Rules | `md/Architecture/ARCHITECTURE_RULES.md` · `md/Architecture/COMPONENT_REGISTRY.md` |
| Activity Engine | `md/Architecture/Activity Engine/ACTIVITY_ENGINE_ARCHITECTURE.md` · `CONTRACT.md` · `ROADMAP.md` |
| Phase Analysis | `md/Phase Documentation/` (P1, P2, P4, P6) |
| Implementation | `md/Implementation Reports/` (17 ملف) · `md/Governance/CHANGELOG.md` |
| Quality Validation | `md/Quality Audits/` (19 ملف) · `md/Governance/CHANGELOG.md` |

---

## 4. Source of Truth Hierarchy — ترتيب المرجعية

```
1. Governance       (أعلى مرجعية)
2. Pedagogy
3. Architecture
4. Phase Documentation
5. Implementation Reports   (أدنى مرجعية)
```

| الترتيب | المصدر | الدور |
|---|---|---|
| 1 | **Governance** | السياق، الفلسفة، القرارات، مصدر الحقيقة، السجل الزمني |
| 2 | **Pedagogy** | المحتوى التربوي عند تداخل البعد التعليمي مع التقني |
| 3 | **Architecture** | البنية والمكونات عند الحديث عن «كيف بُني» |
| 4 | **Phase Documentation** | ما حدث داخل كل مرحلة |
| 5 | **Implementation Reports** | سرد تنفيذي لتوثيق العمليات |

---

## 5. ملاحظات التدقيق (2026-08-17)

- **ملف مكرر أُوقف**: كان يوجد نسخة من هذا الملف في `md/PROJECT_KNOWLEDGE_MAP.md` (أقل تحدّثاً). تم إيقافها والإشارة هنا كلمرجع وحيد.
- **SOURCE_OF_TRUTH.md** يحتوي مسارات قديمة: يُشير إلى ملفات `.docx` في `Work plan/` لم تعد موجودة (استُبدلت بـ `.md`). كما يُشير إلى `before-order.txt` و`Work plan\البرومبت.txt` و`lectures\` — لا شيء منها موجود.
- **COMPONENT_REGISTRY.md**: بعض أرقام الأسطر قديمة بعد تعديلات app.js المتعددة.
- **assets/articulation/*.svg**: 4 ملفات SVG أُنشئت في إطار QD-17 لكنها غير مستخدمة حالياً في أي كود.
- **محرك الأنشطة**: Phase 1 (Foundation) مكتملة + Phase 2 (Read-only bridge) جزئية عبر `p6-d2-bridge.js`. لا يزال P6 D1 وD3 يعملان بالكود legacy في app.js.
