# LESSON 16 INVESTIGATION REPORT

> **Date:** 2026-09-19
> **Type:** FINAL-EXAM / INTEGRATION / ASSESSMENT / ARCHITECTURE EVIDENCE AUDIT — audit only.
> **Verdict:** ⛔ **BLOCKED (CASE B) — but with a precision: L16 is primarily a TEACHER-MEDIATED final examination; the platform is NOT required to automate the exam. The blockers concern the platform's officially assigned artifacts (a personalized certificate with name+grade+print, and any assessment-result representation), which do not exist.**

---

## 1. Executive Verdict

- **Official identity:** Lesson 16 = **«الاختبار النهائي والاحتفاء بالإنجاز»** (The Final Exam and Celebration of Achievement).
- **Pedagogical function:** **Summative Final Examination + Integrated Performance Assessment + Review/Celebration + Course Completion** (four functions; see §6). It is the terminal lesson of the 16-lesson course.
- **Lesson family:** **G — ASSESSMENT / REVIEW**, realized as a **cross-family summative assessment layer** over Reading (D), Writing (E), and Speaking (F) — plus a celebratory letter review reusing family A.
- **CASE:** **B — the official lesson is clear, but the current architecture cannot faithfully represent its required platform obligations.**
- **Confidence:** HIGH (L16 card complete, including an explicit assessment system with weights; Framework Stage IV + lesson-map row + exit outcomes agree).
- **Precision (mandatory by directive §38):** L16's *exam* (oral 25 %, reading 20 %, writing 15 %; midterm 30 %; continuous 10 %) is **classroom/teacher-mediated**. The platform is **not** required to run an automated exam. What the official sources **do** assign to the platform for L16 is a **personalized certificate** («اسم الطالب + درجته + الطباعة», Framework L190) and the general per-lesson 10-section structure. The current runtime has **no student name, no grade aggregation, no scoring model, no printing, no assessment-result persistence, and no cross-lesson combination**; even the completion banner is a generic per-lesson overlay. Therefore the *platform's own L16 mandate* is unrepresentable. The exam's **capture/automation** is a separate (larger) gap that would matter only for platform-**assisted** assessment, which the documents do not require.

## 2. Audit Scope

- Capture the complete official L16 card (all fields) and the official assessment system (weights, criteria, thresholds).
- Locate Framework Stage IV, L16 lesson-map row, final outcomes, and any final-exam/assessment/mastery statements.
- Search supporting curriculum documents (Roadmap, Instructional Blueprint, Architecture/Design System) for L16/assessment evidence.
- Audit the final-exam structure, performance tasks, skill integration, assessment purpose/blueprint/rubrics/mastery/scoring.
- Audit oral, reading, writing, and listening assessment components.
- Audit the runtime's actual assessment capability (P7, `assessmentRounds`, `p7Prompts`, activity engine, `app.js`, `lecture.html`).
- Separate **human-assessor vs platform vs student** obligations.
- Establish L13→L16, L14→L16, L15→L16 dependency evidence only.
- Produce the final L01–L16 curriculum map, family map, and system gap map.
- Verify protected-file integrity; create only the audit report.

## 3. Source Hierarchy

| Level | Source | Used for |
|-------|--------|----------|
| 1 | `03_Pedagogical Blueprint` L528–582 | Official L16 card + **official assessment system** (continuous 10 %, midterm 30 %, final 60 %) |
| 1 | `03_Pedagogical Blueprint` §◈ (L557–582) | Weighting, criteria, thresholds, error list |
| 2 | `01_Pedagogical Framework` L85–87 | Stage IV goal/exit; final integration outcome |
| 2 | `01_Pedagogical Framework` L190 | L16 lesson-map row + signature activity (certificate: name + grade + print) |
| 2 | `01_Pedagogical Framework` L108–124 | The 10-section fixed HTML structure (incl. §8 activity, §9 assessment, §10 homework/next) |
| 2 | `01_Pedagogical Framework` L205–208 | Build plan: lessons 13-16 «أضف Canvas والشهادة» |
| 3 | `02_Course Roadmap` §4/§11/§12/§16/§18 | Learning cycle, error policy, four assessment levels, platform-is-a-tool, success indicators |
| 3 | `04_Instructional Blueprint`; `06_HTML_Lesson_Architecture` | P6b assessment component model; assessment zone |
| 4 | `MD/LESSON_13…15_INVESTIGATION_REPORT.md` | Integration context only |
| 5 | `schema/lesson-schema.js`; `js/engine/*`; `js/activities/*`; `js/app.js`; `lecture.html` | STRUCTURAL EVIDENCE — actual capability |

**Policy:** runtime is not curriculum authority. Prior audits are not authority over the original documents. `meta.nextLesson` is not authoritative.

## 4. Official Evidence

| # | Evidence (exact) | Source | Kind |
|---|------------------|--------|------|
| 1 | Title: «**الاختبار النهائي والاحتفاء بالإنجاز**» | Blueprint L528 | OFFICIAL FACT |
| 2 | Rationale: «الاختبار النهائي ليس فقط للتقييم — هو **احتفاء بالإنجاز**. يجب أن يخرج الطالب شاعرًا بأنه تعلّم شيئًا حقيقيًا» | Blueprint L533 | OFFICIAL FACT |
| 3 | Letters: «**جميع الحروف** — مراجعة ختامية احتفالية» | Blueprint L534 | OFFICIAL FACT |
| 4 | Vocabulary: «**جميع المفردات المكتسبة**» | Blueprint L535 | OFFICIAL FACT |
| 5 | Sentences: «**حوار تعارف كامل + قراءة نص + كتابة جملة**» | Blueprint L536 | OFFICIAL FACT |
| 6 | Objective: «**قياس مستوى الطالب في جميع المهارات وتكريم إنجازه** في تعلّم العربية» | Blueprint L538 | OFFICIAL FACT |
| 7 | Step 1 (0–15): «**مراجعة احتفالية**: بطاقات الحروف كلها — الطلاب ينطقون» | Blueprint L543 | OFFICIAL FACT |
| 8 | Step 2 (15–55): «**الاختبار الشفهي**: عرض تعريفي (1 دق) + **حوار مع زميل** (1 دق) لكل طالب» | Blueprint L544 | OFFICIAL FACT |
| 9 | Step 3 (55–90): «**الاختبار الكتابي**: إملاء 8 كلمات (15 دق) + كتابة 3 جمل (20 دق)» | Blueprint L545 | OFFICIAL FACT |
| 10 | Step 4 (90–105): «**الاختبار القرائي**: نص جديد من 4 جمل لم يرَه الطالب» | Blueprint L546 | OFFICIAL FACT |
| 11 | Step 5 (105–115): «**استعراض الإنجازات**: أعمال الطلاب المميزة + ماذا تعلّمتم؟» | Blueprint L547 | OFFICIAL FACT |
| 12 | Step 6 (115–120): «**الختام**: شهادة إنجاز وتوجيهات للاستمرار» | Blueprint L548 | OFFICIAL FACT |
| 13 | Teacher note: «خصّص **دقيقتين للحديث مع كل طالب** بعد الاختبار: نقطة أجادها + نقطة يُحسّنها» | Blueprint L550 | OFFICIAL FACT |
| 14 | Homework: «**لا واجب.** بل: اختر موردًا لمتابعة تعلّم العربية بعد الفصل» | Blueprint L553 | OFFICIAL FACT |
| 15 | Assessment summary: «**الاختبار النهائي: شفهي (40٪) + كتابي (40٪) + قراءة (20٪)**» | Blueprint L555 | OFFICIAL FACT (weighting; see conflict §16) |
| 16 | Continuous assessment (every lesson, 10 %): letter-card reading 4 % + participation 4 % + homework 2 % | Blueprint L560–566 | OFFICIAL FACT |
| 17 | Midterm (L8, 30 %): reading 24 letters 10 % (10/10 excellent; 8–9 good; <8 needs support) + oral dialogue 12 % (fluency 4 + accuracy 4 + vocab 4) + reading 3 sentences + dictation 5 words 8 % | Blueprint L568–574 | OFFICIAL FACT |
| 18 | Final exam (L16, **60 %**): oral presentation & dialogue **25 %** (fluency 5 + pronunciation 5 + vocab 5 + accuracy 5 + communication 5) + oral reading **20 %** (new 5-sentence text — 4 marks/sentence) + writing & dictation **15 %** (8 words + 3 correct sentences) | Blueprint L576–582 | OFFICIAL FACT |
| 19 | Stage IV: «التواصل والتكامل — المحاضرات 13-16»; goal «… وقراءة نصوص وكتابة متصلة **وحوار حر موسّع**»; exit «**يُجري الطالب حوارًا تعارف كاملًا ويكتب فقرة صحيحة ويقرأ نصًا مستقلًا**» | Framework L85–87 | OFFICIAL FACT |
| 20 | Signature activity: «**شهادة إنجاز مخصّصة: اسم الطالب + درجته + الطباعة**» | Framework L190 | OFFICIAL FACT |
| 21 | Build plan: «المحاضرات 13-16: التواصل │ 🟢 عادي │ **أضف Canvas والشهادة**» | Framework L208 | OFFICIAL FACT |
| 22 | Fixed 10-section structure: §8 «نشاط التواصل» (varies), §9 «تقييم ختامي» 5–10 questions, §10 «الواجب والتالي» | Framework L113–124 | OFFICIAL FACT |
| 23 | Roadmap ultimate goals: recognise all letters; read short texts; write basic words; **hold simple daily conversations**; understand classroom instructions; confidence | Roadmap L26–33 | OFFICIAL FACT |
| 24 | Four assessment levels: pre / formative / summative / delayed | Roadmap §12 (L236–245) | OFFICIAL FACT (framework) |
| 25 | Platform is a supporting tool, **not** a substitute for the teacher | Roadmap §16 (L279–283) | OFFICIAL FACT (framework) |
| 26 | P7 runtime: `assessmentRounds` types `show-letter`/`count-dots`/`sound`; teacher scoring `correct`/`partial`/`wrong`; per-lesson summary; certificate **banner** button | `js/activities/assessment-quiz.js` L9–264 | STRUCTURAL EVIDENCE |
| 27 | `assessmentRounds` (L37) / `discriminationRounds` / `p7Prompts` are letter-level; no exam/score/result root key | `schema/lesson-schema.js` L36–49 | OFFICIAL FACT (contract) |
| 28 | `completion-banner` = generic overlay with title/chars/subtitle; no name/grade/print | `lecture.html` L172–187; `app.js` L512–520 | STRUCTURAL EVIDENCE |
| 29 | `localStorage` used only for theme; no score/progress persistence | `js/app.js` L703–706 | STRUCTURAL EVIDENCE |
| 30 | Activity definitions: `auditory-identify`, `same-or-different`, `close-sound-compare`, `rapid-retrieval`, `silent-dictation`, `sentence-production` | `js/engine/activity-definitions.js` L62–311 | STRUCTURAL EVIDENCE |

## 5. Official Lesson Identity

| Field | Value |
|-------|-------|
| Official number | 16 |
| Official Arabic title | **«الاختبار النهائي والاحتفاء بالإنجاز»** |
| Position | Terminal lesson (16 of 16); Stage IV «التواصل والتكامل — المحاضرات 13-16» |
| Family | **G — ASSESSMENT / REVIEW** (cross-family summative layer) |
| Objective | «قياس مستوى الطالب في جميع المهارات وتكريم إنجازه» (L538) |
| Skills assessed | Speaking (oral presentation + dialogue), Writing (dictation + sentences), Reading (new unseen text); plus celebratory review of all letters/vocabulary |
| Exam weight | **60 %** of the course (final); with continuous 10 % + midterm 30 % |
| Homework | **None** — instead, choose a resource to continue learning Arabic (L553) |
| Teacher note | Spend 2 minutes with each student post-exam: one strength + one improvement (L550) |
| Deliverable | Certificate of achievement + guidance to continue (L548) |
| Signature platform activity | Personalized certificate: student name + grade + print (Framework L190) |

## 6. Pedagogical Function

The directive requires separating **Teaching / Practice / Review / Formative / Summative / Final Examination**. L16's functions, by evidence:

| Function | Applies? | Evidence |
|----------|----------|----------|
| Teaching (new content) | **NO** | no new letters/vocab; «جميع الحروف… مراجعة» (L534) |
| Practice | **PARTIAL** | celebratory review closure (L543), but not skill practice as in earlier lessons |
| Review | **YES** | «مراجعة ختامية احتفالية» (L534); «مراجعة احتفالية: بطاقات الحروف كلها» (L543) |
| Formative assessment | **NO** (except the L550 2-minute feedback talk) | L550 |
| Summative assessment | **YES** | Final exam 60 % (L576–582) |
| Final examination | **YES** | «الاختبار النهائي» (L528/L555); oral + written + reading (L544–546) |
| Integrated performance assessment | **YES** | multi-skill: speaking + writing + reading in one sittings (L544–546) |
| Celebration / course completion | **YES** | «احتفاء بالإنجاز» (L533); certificate (L548) |

**Separation recorded:** L16 is **not** a teaching lesson; it is a **summative final examination + integrated performance assessment + celebratory review/course-closure**. It combines assessment and celebration as two distinct layers per the source itself (L533).

## 7. Final Exam / Assessment Role

- **Why L16 exists (assessment purpose):** to **measure the student's level in all skills and honor their achievement** (L538) — i.e., **mastery verification + performance demonstration + course certification**, framed as celebration (L533).
- **Role in the course's assessment architecture:** it is the **summative terminal exam (60 %)** of a three-tier system: continuous 10 % (every lesson) + midterm 30 % (L8) + final 60 % (L16) (L560–582).
- **Teacher-mediated:** the exam is administered and scored by the teacher in the classroom (dictation dictated by the teacher, oral performance observed by the teacher, reading performed aloud to the teacher); the documents assign **no automated-exam behavior** to the platform.

## 8. Learner Outcome

**L16 outcome:** the student demonstrates, in one sitting, an integrated performance — a 1-minute self-introduction presentation, a 1-minute dialogue with a peer, dictation of 8 words, writing of 3 correct sentences, and oral reading of a new unseen text — and is honored with a certificate and next-step guidance (L544–L548).

**Framework Stage-IV exit (aligned):** «يُجري الطالب حوارًا تعارف كاملًا ويكتب فقرة صحيحة ويقرأ نصًا مستقلًا» (L87). **Roadmap ultimate goals** (L26–33): read short texts, write basic words, hold simple conversations, understand instructions, confidence.

**Alignment observation (INFERENCE, evidence-based):** the Stage-IV exit mentions writing **«فقرة صحيحة»** (a correct paragraph), while the L16 writing exam is **8 dictated words + 3 sentences** (L545/L582) — not a paragraph. The paragraph-writing appeared in L13's parallel-writing step (L456). This is a **fidelity nuance**, not a contradiction; recorded, not resolved.

## 9. Skill-Integration Audit

| Skill | Required by L16? | Evidence |
|-------|------------------|----------|
| Listening | **PARTIAL** | the teacher dictates words (L545); exam instructions are heard; no separate listening assessment is defined |
| Speaking | **REQUIRED** | oral exam: 1-min self-intro presentation + 1-min peer dialogue (L544); 25 % (L580) |
| Reading | **REQUIRED** | reading exam: a **new unseen text** read aloud (L546); 20 % (L581) |
| Writing | **REQUIRED** | written exam: 8-word dictation + 3 sentences (L545); 15 % (L582) |
| Vocabulary | **REQUIRED (assessed within speaking/writing)** | «جميع المفردات المكتسبة» (L535); vocab is a scored oral criterion (5 marks, L580) |
| Orthography / diacritics | **PARTIAL** | dictation requires correct written form; «قراءة فقط النصوص المشكّلة كاملًا» (L591); assessed only implicitly in writing/reading |
| Grammar | **PARTIAL / NOT SPECIFIED** | «كتابة 3 جمل صحيحة» (L582) implies correct sentences, but no grammar domain is separately scored |
| Interaction | **REQUIRED** | «حوار مع زميل» (L544); scored within oral «تواصل» (communication, 5 marks, L580) |

No skill is asserted beyond the sources; every row carries evidence.

## 10. Final Exam Structure

| Component | Official Task | Student Action | Duration | Individual/Pair | Assessment? |
|-----------|---------------|----------------|----------|-----------------|-------------|
| Celebratory review | All letter cards; students pronounce | pronounces letters from cards | 15 min (0–15) | whole class | Not scored in L16 (review) |
| **Oral — presentation** | Self-introduction presentation | speaks 1 minute | part of 15–55 | individual | **YES — scored** (fluency/pronunciation/vocab/accuracy/communication, L580) |
| **Oral — dialogue** | Dialogue with a peer | converses 1 minute | part of 15–55 | **pair** | **YES — scored** |
| **Written — dictation** | Dictation of 8 words | writes dictated words | 15 min | individual | **YES — scored** |
| **Written — sentences** | Write 3 sentences | writes 3 sentences | 20 min | individual | **YES — scored** |
| **Reading** | New text (4 sentences per L546; 5 per L581) read aloud | reads aloud an unseen text | 15 min (90–105) | individual | **YES — scored** (4 marks/sentence, L581) |
| Achievements review | Distinguished work + «ماذا تعلّمتم؟» | reflects/presents work | 10 min | whole class | Not scored |
| Closing | Certificate + guidance | receives certificate | 5 min | individual | course completion |

**Per-student time budget (L544):** 1-min presentation + 1-min dialogue = **2 minutes per student** in the 40-minute oral block (15–55). This is an explicit feasibility constraint for class size.

**SOURCE AMBIGUITY (recorded):** the reading text is **4 sentences** in the minute plan (L546) but **5 sentences** in the scoring table (L581). Not reconciled by the source.

## 11. Performance Task Audit

| Task | Input | Student Action | Output | Mode | Individual/Pair/Group |
|------|-------|----------------|--------|------|-----------------------|
| Self-introduction | Prompt (own info) | produce a 1-min presentation | **spoken** | speaking | individual |
| Peer dialogue | Partner + prompts | hold a 1-min dialogue | **spoken / interactive** | speaking + interaction | pair |
| Word dictation | Teacher-dictated 8 words | write words | **written** | writing (orthography) | individual |
| Sentence writing | Instruction | write 3 sentences | **written** | writing | individual |
| Oral reading | A new unseen text | read aloud | **spoken reading** | reading (performance) | individual |
| Letter review | Letter cards | pronounce | spoken (review) | reading/recognition | whole class |

All five assessed tasks demand **production/performance**, not recognition/selection.

## 12. L13 → L16 Dependency

- **L13** established **independent reading** of a connected text (a 6-sentence text; oral reading assessment; comprehension Q&A; recorded-reading homework — per L13 audit).
- **L16 uses it:** the Reading exam is «**نص جديد … لم يرَه الطالب**» read aloud (L546/L581) — exactly the independent-reading competence L13 introduced, now assessed summatively.
- **Classification:** **EXPLICIT** (the skill and its summative assessment are explicitly present in L16; L13 established it). NOTE: the L16 card does not name L13; the dependency is skill-level and explicit, not citation-level.

## 13. L14 → L16 Dependency

- **L14** established **connected handwriting + dictation** (writing connected words accurately, dictation of 3 words — per L14 audit).
- **L16 uses it:** the Written exam is «**إملاء 8 كلمات + كتابة 3 جمل صحيحة**» (L545/L582) — a scaled-up version of L14's handwriting/dictation competence.
- **Classification:** **EXPLICIT** (writing/dictation is explicitly assessed in L16; L14 established it).

## 14. L15 → L16 Dependency

- **L15** explicitly prepared students for the final exam: step 8 «تحضير الاختبار النهائي» (L519); teacher note «أخبر الطلاب بكل تفاصيل الاختبار النهائي» (L521); HW «تحضير عرض تعريفي شخصي لمدة دقيقة كاملة للاختبار النهائي» (L526).
- **L16 uses it:** the Oral exam («عرض تعريفي (1 دق) + حوار مع زميل (1 دق)», L544) directly consumes L15's practiced presentation and free dialogue.
- **Classification:** **EXPLICIT** (the strongest dependency in the course; L15 names the final exam and its format).

**Dependency summary matrix:**

| Previous Lesson | Skill Established | How L16 Uses It | Classification |
|-----------------|-------------------|-----------------|----------------|
| L13 | Reading (independent connected text) | Reading exam: new unseen text read aloud (L546/L581) | **EXPLICIT** (skill-level) |
| L14 | Writing (connected handwriting + dictation) | Written exam: dictation 8 words + 3 sentences (L545/L582) | **EXPLICIT** |
| L15 | Speaking (1-min presentation + free dialogue) | Oral exam: 1-min presentation + 1-min peer dialogue (L544) | **EXPLICIT** (named) |

## 15. Assessment Purpose

Per the official card: «قياس مستوى الطالب في جميع المهارات **وتكريم إنجازه**» (L538) — i.e., **mastery verification + performance demonstration + certification/celebration**.

| Possible purpose | Specified? | Evidence |
|------------------|-----------|----------|
| Certification | **YES** | certificate L548; «شهادة إنجاز» |
| Mastery verification | **YES** | «قياس مستوى الطالب في جميع المهارات» L538 |
| Final course evaluation | **YES** | 60 % final weight (L576) |
| Progress measurement | **PARTIAL** | continuous 10 % + midterm 30 % measure progress; L16 is terminal |
| Performance demonstration | **YES** | oral/written/reading performance tasks L544–546 |
| Preparation only | **NO** | L16 *is* the exam; L15 was the preparation |

## 16. Assessment Blueprint

The official blueprint is **explicit and weighted** — a rarity in this curriculum:

| Domain | Weight | Detail | Source |
|--------|--------|--------|--------|
| Continuous (every lesson) | **10 %** | letter-card reading 4 % + participation 4 % + homework 2 % | L560–566 |
| Midterm (L8) | **30 %** | letter reading 10 % + oral dialogue 12 % (fluency 4 + accuracy 4 + vocab 4) + reading/writing 8 % | L568–574 |
| **Final (L16)** | **60 %** | oral presentation & dialogue 25 % (fluency 5 + pronunciation 5 + vocab 5 + accuracy 5 + communication 5) + oral reading 20 % (4 marks/sentence) + writing & dictation 15 % | L576–582 |

**SOURCE AMBIGUITY / CONFLICT (recorded, not resolved):** L555 states the final exam split as «شفهي (40٪) + كتابي (40٪) + قراءة (20٪)», while L576–582 gives **25 % / 20 % / 15 %** (which sum to the 60 % final weight). The 40/40/20 breakdown (of the final exam) does not match 25/20/15 (of the course). **SOURCE CONFLICT.**

**What is NOT specified:** a pass/fail mark, retake policy, examiner script, order of candidates, or accommodations. (See §16-B fairness, §19.)

## 17. Rubric Audit

| Rubric | Status | Evidence |
|--------|--------|----------|
| Pronunciation rubric | **PARTIAL** | scored as 5 marks in the oral exam (L580); no descriptor levels |
| Fluency rubric | **PARTIAL** | 5 marks (L580); midterm used a 4-mark fluency (L573); no descriptors |
| Accuracy rubric | **PARTIAL** | 5 marks (L580); no descriptors |
| Vocabulary rubric | **PARTIAL** | 5 marks (L580); no descriptors |
| Communication/interaction rubric | **PARTIAL** | 5 marks «تواصل» (L580); no descriptors |
| Reading rubric | **PARTIAL** | 4 marks per sentence (L581); no error/accuracy descriptors |
| Writing rubric | **PARTIAL** | «3 جمل **صحيحة**» (L582); dictation 8 words; no descriptors |
| Handwriting rubric | **NOT SPECIFIED** | not scored in L16 |
| Task-completion rubric | **NOT SPECIFIED** | — |

**Findings:** L16 has **scoring dimensions with mark allotments**, but **no published rubric descriptors** (no criteria levels for 5/5 vs 3/5). Recorded as **PARTIAL**; no rubric is invented.

## 18. Mastery Audit

The directive requires separating **performance conditions** from **quality criteria**:

**Performance conditions (EXPLICIT):**
- Speak for 1 minute (self-introduction) (L544)
- Dialogue for 1 minute with a peer (L544)
- Dictate 8 words (L545)
- Write 3 sentences (L545)
- Read a **new unseen** text aloud (L546)
- 8–10 exchanges in the earlier objective framing (L507, L15) / 1-min dialogue (L544)

**Quality thresholds (mostly NOT SPECIFIED):**
- The **midterm** provides one threshold for letter reading: «10/10 = ممتاز │ 8-9 = جيد │ أقل من 8 = يحتاج دعمًا» (L572) — but this is for the **midterm**, not L16.
- For L16: **no pass mark, no minimum score, no accuracy percentage, no fluency band** is published.
- The marking scheme gives **maximum marks per dimension** (e.g., 5) but **no minimum-to-pass**.

**Verdict: MASTERY THRESHOLD INCOMPLETE.** Performance conditions are well specified; quality thresholds for the final exam are not. (No threshold is invented.)

### 18-B. Examination Fairness / Consistency (directive §16)

| Fairness element | Specified? | Evidence |
|------------------|-----------|----------|
| Same task for all students | **IMPLIED** | a common exam format (L544–546); not stated as policy |
| Same time | **IMPLIED** | fixed minute plan; 2 min/student (L544) |
| Same prompts | **NOT SPECIFIED** | — |
| Same materials | **PARTIAL** | teacher dictates; new reading text (L545–L546) |
| Equivalent difficulty | **NOT SPECIFIED** | — |
| Examiner conditions | **NOT SPECIFIED** (except the L550 2-min feedback talk) | L550 |
| Order of candidates | **NOT SPECIFIED** | — |
| Retake conditions | **NOT SPECIFIED** | — |
| Accommodations | **NOT SPECIFIED** | — |

**NOT SPECIFIED** — no fairness policy is added from general knowledge.

## 19. Scoring Audit

**An official scoring model DOES exist** (unlike other audited lessons) — a weighted percentage system:

| Level | Weight | Scoring detail |
|-------|--------|----------------|
| Continuous | 10 % | 4 % + 4 % + 2 % |
| Midterm | 30 % | 10 % + 12 % (4+4+4) + 8 % |
| Final | 60 % | 25 % (5+5+5+5+5) + 20 % (4×5) + 15 % |

**Present:** numeric weights, per-dimension mark allotments, one categorical band (midterm letter reading, L572).
**NOT present:** a **pass mark**, **grade bands** for the final exam, a **numeric total conversion**, or a **retake policy**.

**Verdict: partial official scoring model found — weighted marks with no pass threshold.** No score is invented. A **SOURCE CONFLICT** exists between the 40/40/20 split (L555) and the 25/20/15-of-60 split (L580–582).

## 20. Oral Assessment Audit

| Element | Finding | Evidence |
|---------|---------|----------|
| Duration | 1-min presentation + 1-min peer dialogue per student | L544 |
| Dialogue | YES — with a classmate («حوار مع زميل») | L544 |
| Presentation | YES — self-introduction | L544 |
| Partner | YES — a peer | L544 |
| Examiner | Teacher (observes and scores) | L550/L580 |
| Spontaneous vs memorized | **Not specified** for L16 (L15 objective was «حوار حر… بدون ورقة», but L16 does not restate it) | L544 vs L526 |
| Prompts | **NOT SPECIFIED** | — |
| Paper / no paper | **NOT SPECIFIED** in L16 (L15 assessment was «بدون ورقة») | — |
| Recording | **NOT SPECIFIED** | — |
| Teacher observation | **YES** | L550 |
| Scoring | fluency 5 + pronunciation 5 + vocabulary 5 + accuracy 5 + communication 5 = 25 marks (25 %) | L580 |

**L15 (practice) vs L16 (summative):** L15 *rehearsed* the 2-minute no-paper free dialogue and the 1-minute presentation as **homework/practice**; L16 **summatively scores** a 1-minute presentation + 1-minute dialogue across five 5-mark dimensions. The move is practice → scored performance.

## 21. Reading Assessment Audit

| Element | Finding | Evidence |
|---------|---------|----------|
| Text | A **new unseen text** | L546/L581 |
| Sentence count | **4** (minute plan L546) vs **5** (scoring table L581) — **SOURCE AMBIGUITY** | L546/L581 |
| Silent reading | **NOT SPECIFIED** | — |
| Oral reading | **YES** — «الاختبار القرائي» implied aloud; scored per sentence | L546/L581 |
| Comprehension | **NOT SPECIFIED** as a separate score | — |
| Meaning extraction | **NOT SPECIFIED** | — |
| Accuracy | **PARTIAL** — 4 marks per sentence (implies accuracy), no percentage | L581 |
| Speed | **NOT SPECIFIED** | — |
| Assistance | **NOT SPECIFIED** | — |
| Prompts | **NOT SPECIFIED** | — |

## 22. Writing Assessment Audit

| Element | Finding | Evidence |
|---------|---------|----------|
| Copying | **NOT SPECIFIED** | — |
| Dictation | **YES — 8 words** | L545/L582 |
| Guided writing | **NOT SPECIFIED** | — |
| Sentence writing | **YES — 3 sentences** | L545/L582 |
| Independent writing | **PARTIAL** — writing 3 sentences | L582 |
| Connected handwriting | **IMPLIED** (from L14 competence; not restated in L16) | L14 audit |
| Paragraph | **NOT** in L16 (although Stage-IV exit mentions «فقرة», L87) | L87 vs L582 |
| Spelling / orthography | **YES** — «جمل **صحيحة**»; marked text norm (L591) | L582/L591 |
| Positional forms | **NOT SPECIFIED** in L16 | — |
| Handwriting quality | **NOT SPECIFIED** | — |

**Comparison with L14:** L14 established connected handwriting + dictation of 3 connected words; L16 scales this to **8 dictated words + 3 written sentences** and scores it at 15 %. L16 does **not** re-specify handwriting quality or positional forms.

## 23. Listening Assessment Audit

| Element | Finding | Evidence |
|---------|---------|----------|
| Audio input | **PARTIAL** — the teacher dictates words (live speech) | L545 |
| Teacher speech | **YES** — dictation is teacher-spoken | L545 |
| Comprehension | **NOT SPECIFIED** as a scored domain | — |
| Discrimination | **NOT SPECIFIED** in L16 | — |
| Response modality | Written (dictation) | L545 |
| Repeat / select / answer | **NOT SPECIFIED** | — |
| Spoken response | **NOT SPECIFIED** | — |

**Critical distinction:** listening exists **only as the input channel for dictation**; there is **no standalone listening assessment domain** in L16. The platform's audio **playback** (MP3/TTS) is *not* a listening assessment and is not required for the exam, which is teacher-spoken.

## 24. Student Output Modality

| Task | Required Output | Runtime can receive it? |
|------|-----------------|--------------------------|
| Reading (aloud, unseen text) | **spoken reading** | **NO** (no audio capture) |
| Writing — dictation 8 words | **handwritten words** | **NO** (no writing capture) |
| Writing — 3 sentences | **handwritten sentences** | **NO** |
| Speaking — presentation | **spoken 1 min** | **NO** |
| Speaking — dialogue | **spoken interaction** | **NO** |
| Listening response | written (dictation) | **NO** |
| Interaction | spoken peer dialogue | **NO** |
| Letter review | spoken pronunciation | **NO** (teacher-observed only) |

**Every assessed output modality is outside the runtime's input capabilities.** The runtime's only student "responses" are **selection/choice** (P6 same/different) and **reveal-reveal self-check** (P7/dictation) — none of which is production/performance.

## 25. Human Assessor vs Platform

| Actor | Required role (evidence) |
|-------|--------------------------|
| **Teacher/examiner** | Dictate 8 words (L545); observe/score the oral presentation + dialogue on 5 dimensions (L580); score oral reading 4 marks/sentence (L581); score the written work (L582); give each student a 2-min strength+improvement talk (L550); honor achievements (L547); award the certificate (L548) |
| **Student** | Perform the presentation, dialogue, dictation, sentence writing, and oral reading (L544–546) |
| **Platform** | Officially assigned: **a personalized certificate** (name + grade + print, Framework L190); a celebratory review surface; the generic per-lesson close. **No automation of the exam is required by any document.** |

**Assessment type:** **teacher-mediated** (core exam) + **platform-completed artifact** (certificate) + the general **platform-independent** classroom environment. The Roadmap is explicit that the platform is a tool, **not** a teacher substitute (§16). Therefore the platform does **not** need to administer or score the exam — this distinction is decisive for the CASE classification (§40).

## 26. Digital Platform Requirements

| Requirement | Required by sources? | Evidence | Runtime |
|-------------|----------------------|----------|---------|
| Certificate (name + grade + print) | **YES** | Framework L190 | **MISSING** (generic banner only, `lecture.html` L172–187) |
| Celebratory letter-card review | **YES** | L543 | PARTIAL (letter cards exist via other phases) |
| Display of exam tasks | **NOT SPECIFIED** | — | — |
| Exam timer | **NOT SPECIFIED** | — | PhaseTimer exists per phase, not per exam task |
| Prompt display | **NOT SPECIFIED** for L16 | — | — |
| Audio model | **NOT SPECIFIED** for L16 (teacher dictates) | L545 | playback exists (not required) |
| Recording / submission | **NOT SPECIFIED** | — | MISSING |
| Result display / scoring | **NOT SPECIFIED** for platform; certificate needs a grade | L190 | MISSING |
| Teacher control of exam | **NOT SPECIFIED** as platform feature | — | — |
| Score/result persistence | **NOT SPECIFIED** for platform | — | MISSING (localStorage = theme only) |

**Only the certificate is an explicit platform requirement**, and it is missing. No other feature is asserted as required.

## 27. Current Assessment Engine Audit

| System | What it can assess | Output type | Formative/Summative? |
|--------|--------------------|-------------|----------------------|
| `assessmentRounds` (P7) | letter recognition: `show-letter`, `count-dots`, `sound` | **recognition** | formative (per-lesson) |
| `discriminationRounds` (P6) | letter/phoneme discrimination: `identify`, `sameordiff`, `close` | **recognition** | formative |
| `p7Prompts` | per-round teacher prompt text | — | — |
| P7 scoring (`p7Score`) | teacher marks class response correct/partial/wrong | **teacher-observed recognition** | formative |
| `silent-dictation.v1` | prompt → student writes → self-reveal | **production intended, but not captured** | formative (self-check) |
| `sentence-production.v1` | teacher-observed single-student oral production | **production intended, teacher-observed, not captured** | formative |
| `completion-banner` | generic per-lesson overlay | none | none |
| `localStorage` | theme only | none | none |

**What it can assess:** letter **recognition/discrimination** and a teacher-marked **class-response tally**.
**What it cannot:** any **production/performance** output (speech, handwriting, reading aloud), any **score/weight aggregation**, any **cross-lesson/course-level** result, any **exam orchestration**, any **certificate generation**.
**Summative usability:** **NO.** `p7Scores` lives in memory (`STATE.p7Scores`), is per-letter, is not persisted, and is discarded on reload. It cannot serve as a summative record.
**CRITICAL DISTINCTION (directive §25):** recognition ≠ production ≠ performance ≠ interaction ≠ assessment. The runtime operates at **recognition** (P6/P7 selection + teacher tally); L16 requires **production, performance, interaction, and their assessment**.

## 28. P1–P7 Compatibility

| Phase | Applicable? | Evidence | Runtime |
|-------|-------------|----------|---------|
| P1 | NO | no new sound | letter intro |
| P2 | NO | no new phoneme | phoneme-explore |
| P3 | NO | no letter reveal; L16 reviews all letters | letter-reveal |
| P4 | NO | no writing instruction | stroke-video |
| P5 | NO | no new vocabulary | word-reveal |
| P6 | **NO** (partial review only) | L16 reviews letters, doesn't discriminate phonemes | discrimination |
| P7 | **PARTIAL/CONFLICT** | P7 is per-lesson **letter** assessment; L16 is a **course-level multi-skill final exam** | letter assessment |

**PIPELINE MISMATCH.** P1–P7 is a **letter/phoneme acquisition and per-lesson check pipeline**. L16 is a **course-level summative examination and celebration**. The only nominal overlap (P7 "assessment" and letter review) is superficial: P7 assesses 4 letters per lesson; L16 assesses speaking, writing, and reading across the whole course. **Forcing L16 into P1–P7 would be a category error.**

## 29. Schema Compatibility

The 15-root schema keys: `meta, p4WritingPracticeDeferred, letters, strokeGuides, words, p5WordMeta, p5RevealSteps, p6Demo, p6Strings, discriminationRounds, p7Prompts, assessmentRounds, arabicAlphabet, targetLetterIds, phases` (`lesson-schema.js` L45–49).

| L16 requirement | Schema element | Verdict |
|-----------------|----------------|---------|
| exam | — | **MISSING** |
| exam tasks / sections | — | **MISSING** |
| assessment domains | `assessmentRounds` = letter types only | **CONFLICT** (letter-level, not domains) |
| scoring / weighting | — | **MISSING** |
| student result / grade | — | **MISSING** |
| performance (oral/written/reading) | — | **MISSING** |
| speaking | — | **MISSING** |
| writing (sentences/dictation) | `p4WritingPracticeDeferred` (a deferral flag) | **MISSING** (explicitly deferred) |
| reading (text) | — (no text root; L13 finding) | **MISSING** |
| listening | audio refs only (playback) | **PARTIAL** |
| examiner observation | `p7Prompts`/P7 scoring outside schema | **PARTIAL** (not a data contract) |
| certificate / name | `meta.title/subtitle` (display text only) | **MISSING** |
| cross-lesson aggregation | — | **MISSING** |

**Where the current schema contract ends:** it models **one lesson's letter/phoneme/word items and a per-lesson letter check**. It has **no concept of an exam, a score, a grade, a course-level result, a performance task, or a certificate**. L16 is a *course-scope* artifact; the schema is *lesson-scope* and *item-scope*. **No schema proposal is made.**

## 30. Activity Engine Compatibility

| Definition | Category | Usable for L16? |
|------------|----------|-----------------|
| `auditory-identify.v1` | auditory-discrimination | NO |
| `same-or-different.v1` | auditory-discrimination | NO |
| `close-sound-compare.v1` | auditory-discrimination | NO |
| `rapid-retrieval.v1` | retrieval | NO |
| `silent-dictation.v1` | written-assessment | **PARTIAL/CONFLICT** — prompt→write→self-reveal; **no capture, no scoring**, not L16's 8-word exam |
| `sentence-production.v1` | oral-production | **PARTIAL** — teacher-observed single-student; no peer dialogue, no 1-min timing, no scoring, no capture |

**Verdict:** **EXISTS (usable for L16): none. ADAPTABLE (without architectural change): none.** `silent-dictation.v1` and `sentence-production.v1` are **formative, capture-less state machines**; using them for a *summative* exam with **mark aggregation** would require **new architecture** (result capture, scoring, persistence, course scope) — i.e., they are **MISSING** as summative tools, not ADAPTABLE.

## 31. Assessment Architecture Question

**Can L16 run as a data-only lesson in the current system?** **NO.** There is no exam, score, result, certificate, or course-scope data structure.

**Does L16 need an independent Assessment Engine?** For the **platform's explicit obligation** (certificate with name + grade + print) and any result representation, **yes** — the current model cannot store or aggregate a result. For the **exam itself**, **no engine is required** because the exam is teacher-mediated.

**Is L16 primarily a teacher-mediated final assessment needing only limited platform support?** **YES.** The sources assign the teacher the exam administration and scoring, and assign the platform only the **certificate artifact** (+ celebratory review + generic close). The Roadmap states the platform is a tool, **not** a teacher substitute (§16). So the architecture question resolves to: **L16 needs a small amount of platform support (a result/certificate capability), not an automated exam engine.**

**Precise conclusion:** L16's *assessment* is **teacher-mediated**; its *platform footprint* is **certificate + closure**, which the current architecture cannot produce. This is why it is not CASE A.

## 32. Assessment Alignment Matrix

| Competence | Taught in | Practiced in | Assessed in L16 | Evidence |
|------------|-----------|--------------|-----------------|----------|
| Letter recognition | L01–L07 | L08, L09–L12 | Review (not scored in L16) | L534/L543 |
| Reading (independent text) | L13 | L13 | **YES — oral reading of new text (20 %)** | L546/L581 |
| Writing (connected + dictation) | L14 | L14 | **YES — dictation 8 words + 3 sentences (15 %)** | L545/L582 |
| Speaking (presentation) | L15 (and earlier) | L15 | **YES — 1-min presentation (part of 25 %)** | L544/L580 |
| Speaking (dialogue/interaction) | L15 | L15 | **YES — 1-min peer dialogue (part of 25 %)** | L544/L580 |
| Vocabulary | L01–L15 | throughout | **YES — scored within oral (5 marks)** | L535/L580 |
| Orthography/diacritics | L07/L09/L10/L12 | throughout | **PARTIAL — implicit in writing/reading** | L582/L591 |
| Listening | L01–L15 | L15 | **PARTIAL — input channel for dictation only** | L545 |

**Instruction → Practice → Performance → Assessment alignment is present and explicit** for the three core skills (reading, writing, speaking) at the assessment level. (This is a description of alignment evidence only — no pedagogical theory is used to alter the curriculum.)

## 33. Curriculum Completion Audit

| Official outcome | Achieved/Assessed by L16? | Evidence |
|------------------|----------------------------|----------|
| Reading outcome (independent text) | **YES — assessed** (new unseen text) | L546/L581 |
| Writing outcome | **YES — assessed** (dictation + sentences) | L545/L582 |
| Speaking outcome | **YES — assessed** (presentation + dialogue) | L544/L580 |
| Integrated communication (Roadmap ultimate goal) | **YES — assessed** (dialogue + presentation) | L544/L580 |
| Final assessment | **YES** — 60 % terminal exam | L576–582 |
| Course completion / celebration | **YES** — certificate + guidance | L548 |
| Recognise all letters | **YES** — celebratory review of all letters | L534/L543 |

**Only what the documents establish is listed.** The Stage-IV exit's «فقرة صحيحة» is not separately assessed in L16 (writing = dictation + 3 sentences); recorded as a fidelity nuance (§8).

## 34. L01–L16 Curriculum Map

| Lesson | Official Title | Pedagogical Family | Runtime Status |
|--------|----------------|--------------------|----------------|
| 01 | الحروف الأولى — ب ت ث ن | LETTER ACQUISITION | Implemented |
| 02 | م ي ا — وأول مقاطع | LETTER ACQUISITION (+syllables) | Implemented |
| 03 | ف و ق ك — والضمة | LETTER ACQUISITION | Implemented (runtime mixed) |
| 04 | ع غ ح خ — والكسرة | LETTER ACQUISITION | Implemented (runtime mixed) |
| 05 | التعارف الكامل | COMMUNICATION | Not built |
| 06 | الأرقام وأيام الأسبوع | COMMUNICATION / VOCAB | Not built |
| 07 | السكون — الحروف الساكنة | ORTHOGRAPHY / DIACRITICS | Unsupported |
| 08 | اختبار المنتصف + مراجعة | ASSESSMENT / REVIEW | Unsupported |
| 09 | الشدة — حرفان في واحد | ORTHOGRAPHY / DIACRITICS | Unsupported |
| 10 | التنوين — الاسم في الجملة | ORTHOGRAPHY / DIACRITICS | Unsupported |
| 11 | اللام الشمسية والقمرية | GRAMMAR / READING CONVENTION | Unsupported |
| 12 | المدود — الحروف الطويلة | ORTHOGRAPHY / DIACRITICS | Unsupported |
| 13 | أول نص كامل — القراءة المستقلة | READING | Unsupported |
| 14 | الكتابة المتصلة — الحروف في مواضعها | WRITING (Handwriting) | Unsupported |
| 15 | حوار حر موسّع — اعرف فصلك | COMMUNICATION / SPEAKING | Unsupported |
| **16** | **الاختبار النهائي والاحتفاء بالإنجاز** | **ASSESSMENT / REVIEW (summative final exam)** | **Unsupported (this audit)** |

No prior classification is rewritten; L16 confirms the assessment family already represented by L08 (midterm).

## 35. Final Pedagogical Family Map

| Family | Members | Runtime status |
|--------|---------|----------------|
| **A — Letter Acquisition** | L01–L04 | supported (partial) |
| **B — Orthography / Diacritics** | L07, L09, L10, L12 | unsupported (whitelist blocks marks) |
| **C — Grammar / Reading Convention** | L11 | unsupported |
| **D — Reading** | L13 | unsupported |
| **E — Writing** | L14 | unsupported |
| **F — Communication / Speaking** | L05, L06, L15 | unsupported |
| **G — Assessment / Review** | L08 (midterm), L16 (final) | unsupported (letter-level P7 only) |

**Does L16 confirm Family G as an independent family, or an assessment layer over all families?**
**Evidence:** L16's objective is «قياس مستوى الطالب في جميع المهارات» (L538) and it assesses reading (D), writing (E), and speaking (F) together; it teaches no new family content. **Therefore L16 shows that Assessment (G) is best modeled as a cross-family summative layer, not merely a parallel content family** — it is a **summative function** spanning the other families. This is stated as an evidence-based distinction. (L08, the midterm, similarly assesses across skills.) No assumption is made beyond the sources.

## 36. Architectural Implications

*Analysis only — no design, no proposal.*

- The current lesson engine is an **item/pipeline engine** (letters/phonemes/words); it has **no assessment-result layer**, so **assessment is not integrated** with the teaching engine in any summative sense.
- Assessment in the runtime is **embedded per-lesson** (P7) and **ephemeral** (in-memory `p7Scores`); there is **no separation** of a course-scope assessment from the lesson engine.
- **Output capture does not exist** for speech, handwriting, or reading-aloud; the runtime only captures **selection** and **self-reveal**.
- **Teacher-mediated assessment does not need an engine** to function: the teacher can run and score the exam entirely offline. The platform's obligation is narrower.
- **L16 could be platform-light**: the documents require only a **certificate (name + grade + print)** and closure — a **result/certificate capability**, not an exam engine. However, that minimal capability is absent.
- The schema is **lesson-scoped**; a final-exam/certificate is **course-scoped** — a structural mismatch.
- Diacritics in dictation/reading text remain outside the representable character set (whitelist `[\u0621-\u064A]`).

## 37. Final System Gap Map — L01–L16

| Family | Lessons | Current Runtime Capability | Gap |
|--------|---------|----------------------------|-----|
| Letter | L01–L04 | letter cards, P1–P4, P6/P7 recognition (supports 4 letters/lesson; some official letters not owned) | partial coverage; recognition only |
| Orthography | L07, L09, L10, L12 | none (diacritics rejected by whitelist) | **full** |
| Grammar / Reading convention | L11 | none | **full** |
| Reading | L13 | none (no text/paragraph model) | **full** |
| Writing | L14 | none (P4 is passive stroke video; no capture) | **full** |
| Speaking | L05, L06, L15 | none (no speech input; playback only) | **full** |
| Assessment | L08, L16 | letter-level P7 recognition + in-memory teacher tally; no score/result/certificate/course scope | **full** (summative) |

**Compiled from audit evidence only. No redesign is begun.**

## 38. Evidence Confidence

| Conclusion | Confidence | Basis |
|------------|-----------|-------|
| L16 = final exam + integrated assessment + celebration | HIGH | Blueprint L528–555 (complete card) |
| Official weighting 10/30/60 and mark dimensions | HIGH | Blueprint L560–582 |
| Exam is teacher-mediated; platform duty = certificate | HIGH | L544–550/L580–582 + Framework L190 + Roadmap §16 |
| Runtime has no result/score/certificate model | HIGH | schema L45–49; `assessment-quiz.js`; `app.js`; `lecture.html` |
| Runtime has no production capture | HIGH | repo-wide grep; activity model read |
| P1–P7 mismatch | HIGH | schema/engine vs L16 card |
| Reading text 4 vs 5 sentences; 40/40/20 vs 25/20/15 | — | **SOURCE AMBIGUITY / SOURCE CONFLICT** (recorded, unresolved) |
| Mastery/pass threshold | MISSING | not published for L16 |

## 39. Protected-File Integrity

- **`js/lesson-16.js`: ABSENT** (verified — not created).
- **EXPECTED DIFF = 0** across all 12 protected files (verified post-audit by SHA-256; EXPECTED DIFF = 0):

| File | Baseline (SHA-256, first 8) | Status |
|------|------------------------------|--------|
| js/lesson-01.js | 591804C3 | MATCH |
| js/lesson-02.js | 96BEB452 | MATCH |
| js/lesson-03.js | 8912D70E | MATCH |
| js/lesson-04.js | 35609CD8 | MATCH |
| js/lesson-05.js | 0A89060A | MATCH |
| js/lesson-06.js | 51CDB211 | MATCH |
| js/lesson-07.js | 1FE9C896 | MATCH |
| js/app.js | 87B37E6B | MATCH |
| js/loader.js | B335E6EE | MATCH |
| schema/lesson-schema.js | 8E6B3EB8 | MATCH |
| lecture.html | CB2C9D3C | MATCH |
| css/style.css | 7D459C6A | MATCH |

Only file created: `MD/LESSON_16_INVESTIGATION_REPORT.md`. Any unexpected change would be recorded here (none found).

## 40. CASE Classification

**CASE B — BLOCKED.**

**Reasoning under the directive's caution:** L16 is **not** classified BLOCKED because "there is no automated exam." It is classified CASE B because the documents assign the platform a concrete, official L16 obligation — a **personalized certificate with the student's name, grade, and printing** (Framework L190), plus course closure (L548) — and the current architecture **cannot represent a result/grade at all**, let alone produce a printable personalized certificate, and is **lesson-scoped** rather than **course-scoped**. The teacher can run the exam, but the platform cannot fulfill its own L16 mandate.

- Not **CASE A**: the required platform artifact (certificate with grade) and any result representation are absent.
- Not **CASE C**: the documents are explicit and ample.

## 41. Blocker Severity

| Blocker | Severity | Evidence | Consequence |
|---------|----------|----------|-------------|
| No assessment-result / score / grade model (lesson- or course-scope) | **CRITICAL** | schema L45–49; P7 = in-memory letter tally | The 60 % final result and the certificate's grade have no representation |
| No personalized printable certificate (name + grade + print) — the platform's explicit L16 artifact | **HIGH** | Framework L190; `lecture.html` L172–187 (generic banner) | L16's required platform deliverable cannot be produced |
| No production/performance capture (speech, handwriting, reading-aloud) | **MEDIUM (conditional)** | repo-wide grep; activity model | Matters only for **platform-assisted** assessment, which the documents do **not** require |
| No cross-lesson/course persistence of results | **MEDIUM** | `app.js` localStorage = theme only | No 10/30/60 aggregation record |
| No per-exam-task timers | **MEDIUM** | PhaseTimer is per-phase | Exam pacing support absent |
| Diacritics outside whitelist for dictation/reading text | **MEDIUM** | schema L82–83 | Official marked text unrepresentable |

Severities are not inflated: the exam's **automation** gaps are deliberately graded MEDIUM/conditional because the sources make the exam **teacher-mediated**; the CRITICAL/HIGH items concern the platform's **actually required** obligations.

## 42. Final Decision

**BLOCKED.**

**What L16 officially requires (evidence):** a **teacher-mediated summative final examination** (oral presentation 1 min + peer dialogue 1 min; dictation 8 words; writing 3 sentences; oral reading of a new text) weighted **60 %** within a **10/30/60** course assessment system, with named mark dimensions (fluency/pronunciation/vocabulary/accuracy/communication), **plus** a **celebratory review** and a **personalized certificate**.

**What the current system can represent:** only **letter recognition assessment** (P7 `show-letter`/`count-dots`/`sound`) with an **in-memory teacher tally** (correct/partial/wrong) and a **generic per-lesson completion banner**. No score, grade, result, course aggregation, exam, or certificate.

**What it cannot represent:** any **assessment result/grade**, the **certificate (name + grade + print)**, any **course-level final weighting**, any **production/performance capture**, and the **course-scoped** nature of a final exam.

**The gap:** the curriculum's final assessment is **teacher-mediated** and could, in principle, run **offline**; therefore the runtime is not required to *automate* the exam. But the platform's **only explicit L16 assignment — the personalized, grade-bearing, printable certificate and course closure — is unrepresentable**, and the schema has **no result model** of any kind. This makes faithful representation impossible → **CASE B**.

Per protocol the blockers are **not solved here**. No Exam/Assessment/Speaking/Writing Engine is designed, no rubric/scoring system is invented, no schema field is proposed, and **no `lesson-16.js` is created**. **STOPPED after the L16 audit.**

---

### Additional sections (permitted)

**42-A. Report Structure Compliance.** All required sections are present: Executive Verdict, Audit Scope, Source Hierarchy, Official Evidence, Official Lesson Identity, Pedagogical Function, Final Exam / Assessment Role, Learner Outcome, Skill-Integration Audit, Final Exam Structure, Performance Task Audit, L13→L16, L14→L16, L15→L16, Assessment Purpose, Assessment Blueprint, Rubric Audit, Mastery Audit, Scoring Audit, Oral Assessment Audit, Reading Assessment Audit, Writing Assessment Audit, Listening Assessment Audit, Student Output Modality, Human Assessor vs Platform, Digital Platform Requirements, Current Assessment Engine Audit, P1–P7 Compatibility, Schema Compatibility, Activity Engine Compatibility, Assessment Architecture Question, Assessment Alignment Matrix, Curriculum Completion Audit, L01–L16 Curriculum Map, Final Pedagogical Family Map, Architectural Implications, Final System Gap Map, Evidence Confidence, Protected-File Integrity, CASE Classification, Blocker Severity, Final Decision.

**42-B. Evidence Discipline.** Every finding is labeled OFFICIAL FACT, STRUCTURAL EVIDENCE, MISSING EVIDENCE, INFERENCE, SOURCE AMBIGUITY, or SOURCE CONFLICT. Unpublished items (pass mark, grade bands, retake policy, examiner script, candidate order, accommodations, prompts) are marked **NOT SPECIFIED** and were not invented.

**42-C. No General Knowledge Fill-In.** No external assessment theory, CEFR level, grading standard, rubric, or pass mark was used. The only thresholds cited are those published in the Blueprint (L572 midterm bands; L580–582 final mark allotments).

**42-D. Answer to the Final Directive Question.** After L01–L16: L16 officially requires a **teacher-mediated, multi-skill summative final examination (60 %)** with an explicit weighting scheme, a **celebratory letter review**, and a **personalized certificate**. The current system can represent only **letter-level recognition checks** with an **ephemeral tally**; it cannot represent **any assessment result, course-level score, or certificate**, and it lacks **production/performance capture**. The gap is therefore **structural (no result/course scope)** and, secondarily, **modality-based (no production capture)** — with the platform's required artifact (certificate) entirely missing.

### FINAL STOP CONDITION

The L16 audit report is complete; `js/lesson-16.js` is ABSENT; all protected files are unchanged (EXPECTED DIFF = 0); no runtime edits, no Exam/Assessment/Speaking/Writing Engine, no schema proposal, no rubric, and no further lesson work were performed. **Architecture Synthesis is not begun. STOPPED.**

---

**FINAL PRINCIPLE observed:** Evidence first; assessment before automation; curriculum before architecture; **teacher-mediated ≠ platform-automated**; **recognition ≠ production ≠ performance ≠ assessment**; no invention; no silent assumptions; no runtime changes; L16 only.


