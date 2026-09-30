# ACTIVE_TASK.md

## Current Status

Status:
Phase 1.2 — Classroom Validation


## Current Development Target

**Phase 1.2: Classroom Validation**

Goal:
التحضير والتنفيذ للتحقق النهائي من Lesson 01 داخل الفصل الحقيقي.

أهداف التحقق:
- [ ] اختبار تدفق الدرس الكامل من P1 إلى P7 في ظروف الفصل الحقيقية
- [ ] التحقق من عرض الصفحة عبر جهاز العرض (Projector)
- [ ] التحقق من وضوح الصوت عبر سماعات الفصل
- [ ] ملاحظة تفاعل الطلاب والزمن الفعلي لكل نشاط
- [ ] تسجيل أي مشاكل تربوية أو تقنية تظهر أثناء الاستخدام


## Phase 1.1 — Audio Asset Foundation (Completed ✅)

Completed (analysis):
- [x] Audio system audit completed (AudioManager architecture, all call sites P1-P7)
- [x] Audio architecture documented (CURRENT_STATE.md — قسم النظام الصوتي)
- [x] Audio naming convention decided (QD-05 — keep current naming)

Completed (implementation):
- [x] 1. P2 (app.js:556): `AudioManager.speak(letter.phoneme)` → `AudioManager.playLetter(STATE.p2ActiveLetter)`
- [x] 2. P3 choral (app.js:801): `AudioManager.speak(letter.phoneme)` → `AudioManager.playLetter(letterId)`
- [x] 3. Fallback (app.js:97): `letter.phoneme` → `letter.name` in `playLetter()`

Completed (audio assets & verification):
- [x] تمت إضافة الملفات الصوتية والتحقق منها (9 ملفات MP3 — ~482 KB)
- [x] تم التحقق من بنية AudioManager التي تعتمد على MP3 أولاً
- [x] تم التحقق من عمل نظام Web Speech fallback عند الحاجة
- [x] تم التحقق من تدفق الصوت في المراحل P2/P3/P5/P6
- [x] تم التحقق من تشغيل الصوت وفق مبدأ Offline First
- [x] تم إجراء اختبار صوتي حقيقي داخل بيئة الفصل بنجاح
- [x] تم تحديث ملفات التوثيق المرتبطة بالنظام الصوتي


## Phase 0 (Completed)

- [x] 0.1 — QD-01: P4 → Keep Writing Practice (PROJECT_DECISIONS.md)
- [x] 0.2 — QD-02: P6 → Keep Auditory Discrimination (PROJECT_DECISIONS.md)
- [x] 0.3 — QD-03: P5b → Add simplified (PROJECT_DECISIONS.md)
- [x] 0.4 — QD-04: Dictation/Exit/Homework → All postponed (PROJECT_DECISIONS.md)
- [ ] 0.5 — اختبار صفي: فتح lecture-01.html على جهاز الصف + بروجكتور
- [ ] 0.6 — تسجيل نتائج الاختبار وأي أخطاء مكتشفة


## Completed

✓ AI Memory System created
✓ PHASE_PROTOCOL.md created
✓ COMPONENT_REGISTRY.md created
✓ CURRENT_STATE synchronized
✓ P6 Classroom Visual Redesign (Phase 0→1→2→3→3.1 — all complete)
✓ Visual fixes: P1 hero wave, P2 badge removal, P4 height lock
✓ Project Understanding Report (5-phase study: 11 md + 7 docx + 4 code files)
✓ CURRENT_STATE.md rewritten with full gap analysis
✓ PROJECT_DECISIONS.md created with pending decisions
✓ DEVELOPMENT_ROADMAP.md created with full plan (Lesson 01 → Template)
✓ Phase 1.1 — Audio Asset Foundation (code fixes + 9 MP3 files + verification)


## What Comes After Phase 1.2

See DEVELOPMENT_ROADMAP.md for the full plan:
- Phase 1: Complete Lesson 01 content (remaining approved activities)
- Phase 2: Polish & stability testing
- Phase 3: Extract Template (Lesson 01 → reusable engine)
- Phase 4: Lesson 02+


## Before Execution (any future phase)

Required Reading:

- DEVELOPMENT_ROADMAP.md
- PROJECT_DECISIONS.md
- CURRENT_STATE.md
- DESIGN_PHILOSOPHY.md
- ARCHITECTURE_RULES.md
- COMPONENT_REGISTRY.md
- PHASE_PROTOCOL.md


## Current Rule

No implementation should start before:

1. All Phase 0 decisions are resolved (QD-01 through QD-04).
2. Classroom test completed and issues documented.
3. Reading the required memory files.
4. Defining Phase scope.
5. Confirming allowed and forbidden files.
6. Creating an implementation plan.
