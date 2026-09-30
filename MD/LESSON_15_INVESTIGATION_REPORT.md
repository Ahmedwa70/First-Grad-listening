# LESSON 15 INVESTIGATION REPORT

> **Date:** 2026-09-19
> **Type:** ADVANCED CURRICULUM / SPEAKING / UX / ARCHITECTURE EVIDENCE AUDIT — audit only.
> **Verdict:** ⛔ **BLOCKED (CASE B).** Lesson 15 is the official **extended free interpersonal speaking** lesson. The current runtime has **no live speech, no microphone/recording, no speech recognition, no pair/turn-taking engine, no dialogue/interaction model, and no oral assessment**; its only speech-adjacent element is text-to-speech/audio **playback** (output). Its closest activity (`sentence-production.v1`) is a teacher-observed, single-student prompt/support state machine with no peer, no turns, no capture.

---

## 1. Executive Verdict

- **Official identity:** Lesson 15 = **«حوار حر موسّع — اعرف فصلك»** (Extended Free Dialogue — Get to Know Your Class).
- **Lesson family:** **COMMUNICATION / SPEAKING** — specifically **extended free interpersonal speaking** (guided free production with a consolidated review + oral-assessment/exam-preparation layer). It establishes family **F — COMMUNICATION / SPEAKING** as first-class.
- **CASE:** **B — official, fully specified, not faithfully representable.**
- **Confidence:** HIGH (Blueprint card complete: title, rationale, letters, vocab, sentences, objective, 8-step plan, teacher note, HW, assessment; Framework Stage IV + lesson-map row + learning cycle agree).
- **Conclusion:** L15's core competence is the student **producing spontaneous, extended, connected speech in live interaction** — modeling an 8-exchange dialogue, a 5-minute pair dialogue, a mingling activity meeting 4 new people, presenting a person, and a final 2-minute free dialogue **without relying on paper**. The runtime has **no student-speech input at all**: no microphone, no `getUserMedia`/`MediaRecorder`, no speech recognition; `AudioManager` only *plays* MP3s and uses `SpeechSynthesisUtterance` (TTS playback). The activity engine's `sentence-production.v1` is labeled `oral-production` but is a teacher-observed prompt/support state machine for **one** student, with no peer turn-taking, no information exchange, no 8–10-exchange model, no recording, and no speaking assessment. The Framework's own platform representation for L15 is a **dialogue *simulation*** (L189) — not a live pair-speaking system. Additionally, the official vocabulary/sentences carry شدة/سكون/حركات rejected by the schema whitelist.

## 2. Audit Scope

- Locate and capture the complete official L15 card (all fields, not just title).
- Locate Framework Stage IV, L15 lesson-map row, learning-cycle/progression, interaction patterns, feedback policy, and digital-platform statements.
- Search supporting curriculum documents for L15 / speaking evidence.
- Audit L15's speaking competence across 20 dimensions (A–T) and its dialogue architecture.
- Audit target letters, vocabulary, sentences, orthography/Unicode.
- Test the 15-root schema, P1–P7, the activity engine/definitions, and the actual runtime for speaking/dialogue capability.
- Distinguish classroom pedagogy vs teacher-mediated vs platform requirements.
- Establish L14→L15 and L15→L16 dependency evidence only.
- Update the L01–L15 curriculum map and family map.
- Verify protected-file integrity; create only the audit report.

## 3. Source Hierarchy

| Level | Source | Used for |
|-------|--------|----------|
| 1 | `03_Pedagogical Blueprint` L497–526 | Official L15 card (complete) |
| 2 | `01_Pedagogical Framework` L85–87 | Stage IV «التواصل والتكامل — المحاضرات 13-16»; goal «… وحوار حر موسّع»; exit outcome |
| 2 | `01_Pedagogical Framework` L189 | Lesson-map row 15 + signature activity «محاكاة حوار متقدمة: أسئلة متنوعة بمستويات صعوبة» |
| 2 | `02_Course Roadmap` (titled "الإطار التربوي") §4, §9, §11, §12, §16, §18 | Learning cycle (8 stages), interaction patterns, error-correction policy, assessment levels, platform philosophy, success indicators |
| 5 | `MD/LESSON_14_INVESTIGATION_REPORT.md`, `…13…` | L13/L14 dependency context only (not curriculum authority) |
| 5 | `schema/lesson-schema.js`; `js/engine/*`; `js/activities/*`; `js/app.js`; `js/lesson-0*.js` | STRUCTURAL EVIDENCE — actual capability |

**Policy:** runtime is not curriculum authority. Existing `.js` files are structural evidence only. Supporting docs are levels 1–3 by proximity to the official card.

## 4. Official Evidence

| # | Evidence (exact) | Source | Kind |
|---|------------------|--------|------|
| 1 | Title: «**حوار حر موسّع — اعرف فصلك**» | Blueprint L497 | OFFICIAL FACT |
| 2 | Rationale: «المحاضرة قبل الأخيرة تُعدّ للاختبار النهائي. الحوار الموسّع يجمع كل ما تعلّمه الطالب في **تواصل حقيقي**» | Blueprint L502 | OFFICIAL FACT |
| 3 | Letters: «الحروف النادرة في سياق: **ث — ذ — ظ** (توطيد أخير)» | Blueprint L503 | OFFICIAL FACT |
| 4 | Vocab: «**أُحِبّ — لَا أُحِبّ — أَسْكُن — أَعِيش — مَعَ — وَحْدِي**» | Blueprint L504 | OFFICIAL FACT |
| 5 | Sentences: «**أَسْكُنُ فِي... أُحِبُّ... مَاذَا تُحِبّ؟ مَاذَا تَعْمَل؟**» | Blueprint L505 | OFFICIAL FACT |
| 6 | Objective: «**يُجري الطالب حوارًا تعارف موسّعًا (8-10 تبادلات) بدون الرجوع للورقة**» | Blueprint L507 | OFFICIAL FACT |
| 7 | Step 1: «مراجعة سريعة: كل طالب يقدّم نفسه في جملتين فقط» | Blueprint L512 | OFFICIAL FACT |
| 8 | Step 2: «الحروف المتبقية: ث ذ ظ في سياق كلمات مألوفة» | Blueprint L513 | OFFICIAL FACT |
| 9 | Step 3: «تقديم المفردات الجديدة بالسياق» | Blueprint L514 | OFFICIAL FACT |
| 10 | Step 4: «**نمذجة الحوار الموسّع مع طالب متطوع لـ8 تبادلات طبيعية**» | Blueprint L515 | OFFICIAL FACT |
| 11 | Step 5: «**تدريب ثنائي: كل ثنائي يتحاور 5 دقائق كاملة**» | Blueprint L516 | OFFICIAL FACT |
| 12 | Step 6: «**حفلة التعارف: الجميع يقف ويتعارف مع 4 أشخاص جدد**» | Blueprint L517 | OFFICIAL FACT |
| 13 | Step 7: «**تقديمات: 5 طلاب يقدّمون شخصًا تعارفوا معه**» | Blueprint L518 | OFFICIAL FACT |
| 14 | Step 8: «تحضير الاختبار النهائي: اشرح ما سيكون فيه» | Blueprint L519 | OFFICIAL FACT |
| 15 | Teacher note: «**أخبر الطلاب بكل تفاصيل الاختبار النهائي** في هذه المحاضرة. الشفافية تُقلّل القلق وترفع الأداء» | Blueprint L521 | OFFICIAL FACT |
| 16 | HW: «**تحضير عرض تعريفي شخصي لمدة دقيقة كاملة** للاختبار النهائي» | Blueprint L526 | OFFICIAL FACT |
| 17 | Assessment: «**حوار حر لمدة دقيقتين بدون ورقة**» | Blueprint L526 | OFFICIAL FACT |
| 18 | Stage IV: «التواصل والتكامل — المحاضرات 13-16 › توظيف كل المهارات في قراءة نصوص وكتابة متصلة **وحوار حر موسّع**»; exit «يُجري الطالب حوار تعارف كاملًا…» | Framework L85–87 | OFFICIAL FACT |
| 19 | Signature activity: «**محاكاة حوار متقدمة: أسئلة متنوعة بمستويات صعوبة**» | Framework L189 | OFFICIAL FACT |
| 20 | Learning cycle (8 stages: exposure→observation→modeling→imitation→guided→semi-independent→independent→automatic) | Roadmap §4 (L102–128) | OFFICIAL FACT (framework) |
| 21 | Interaction patterns incl. «الطالب مع الطالب»، «العمل الثنائي»، «العمل الجماعي» | Roadmap §9 (L194–207) | OFFICIAL FACT (framework) |
| 22 | Error policy: «أخطاء حرجة: تصحح فورًا؛ أخطاء تعليمية: بعد النشاط؛ أخطاء التجريب: لا توقف النشاط» | Roadmap §11 (L224–232) | OFFICIAL FACT (framework) |
| 23 | Platform philosophy: «المنصة الرقمية والـHTML أدوات تعليمية مساعدة، **وليست بديلاً عن المعلم**» | Roadmap §16 (L279–283) | OFFICIAL FACT (framework) |
| 24 | `AudioManager` plays MP3 via `new Audio()` and TTS via `SpeechSynthesisUtterance` | `js/app.js` L79–111 | STRUCTURAL EVIDENCE |
| 25 | `sentence-production.v1` category `oral-production`; teacher `SELECT_STUDENT`/`PROMPT`/`SUPPORT`; events `student.response-observed`; no capture | `js/engine/activity-definitions.js` L285–309 | STRUCTURAL EVIDENCE |
| 26 | No `getUserMedia`/`MediaRecorder`/`SpeechRecognition` anywhere | repo-wide grep | STRUCTURAL EVIDENCE (absence) |
| 27 | 15-root schema keys; no dialogue/speaking root | `schema/lesson-schema.js` L45–49 | OFFICIAL FACT (contract) |
| 28 | Whitelist `isArabicChar = /^[\u0621-\u064A]$/` | `lesson-schema.js` L82–83 | OFFICIAL FACT (contract) |
| 29 | Retired pointer: «المحاضرات 5-8: الكلمة والحوار | **أضف مكوّن محاكاة الحوار هنا**»; «المحاضرات 13-16: التواصل | أضف Canvas والشهادة» | Framework L205–208 | OFFICIAL FACT (framework) |

**SOURCE AMBIGUITY (recorded, not resolved):** the model dialogue is «8 تبادلات» (L515) while the objective says «8-10 تبادلات» (L507). The source does not reconcile 8 vs 8–10.

## 5. Official Lesson Identity

| Field | Value |
|-------|-------|
| Official number | 15 |
| Official Arabic title | **«حوار حر موسّع — اعرف فصلك»** |
| Stage | Stage IV — «التواصل والتكامل — المحاضرات 13-16» (Framework L85) |
| Family | **COMMUNICATION / SPEAKING (extended free interpersonal speaking)** |
| Objective | Conduct an expanded getting-acquainted dialogue (8–10 exchanges) **without relying on paper** (L507) |
| New skill | Extended free oral interaction: spontaneous turn-taking, question-asking, information exchange, self/other presentation — extended longer than previous lessons (8–10 turns / 5-min pair / 2-min free) |
| Recycled skills | Letters (esp. rare ث ذ ظ «توطيد أخير»), vocabulary, self-introduction sentences |
| Target letters | **ث — ذ — ظ** (final consolidation, review) |
| Vocabulary | أُحِبّ — لَا أُحِبّ — أَسْكُن — أَعِيش — مَعَ — وَحْدِي |
| Sentences | أَسْكُنُ فِي... أُحِبُّ... مَاذَا تُحِبّ؟ مَاذَا تَعْمَل؟ |
| Assessment | Free dialogue for two minutes, without paper (L526) |
| Homework | Prepare a 1-minute personal self-introduction presentation for the final exam (L526) |
| Teacher note | Tell students, in this lesson, all final-exam details; transparency reduces anxiety and raises performance (L521) |
| Signature platform activity | Advanced dialogue simulation with varied questions at difficulty levels (Framework L189) |

## 6. Speaking Competence Model

| # | Dimension | Verdict | Evidence |
|---|-----------|---------|----------|
| A | Listening comprehension (understand teacher/peer) | **REQUIRED** | 8-turn model (L515); 5-min pair (L516); mingling (L517) |
| B | Speech perception (distinguish Q vs A) | **IMPLIED** | Dialogue inherently requires parsing; not stated as a discrete requirement in the L15 card |
| C | Pronunciation (specific requirements) | **NOT SPECIFIED** | No pronunciation criterion in the L15 card (framework has general pronunciation practice only, L119) |
| D | Vocabulary retrieval | **REQUIRED** | Vocab list L504; «بدون الرجوع للورقة» (L507) forces recall |
| E | Sentence production | **REQUIRED** | «أَسْكُنُ فِي... أُحِبُّ...» (L505); self-intro sentences (L512) |
| F | Question production | **REQUIRED** | «**مَاذَا تُحِبّ؟ مَاذَا تَعْمَل؟**» (L505); interviewer role |
| G | Answer production | **REQUIRED** | «أَسْكُنُ فِي...، أُحِبُّ...» (L505) |
| H | Turn-taking | **REQUIRED** | «8-10 تبادلات» (L507); «كل ثنائي يتحاور» (L516) |
| I | Interaction management (start/end/continue) | **IMPLIED** | «يتعارف مع 4 أشخاص **جدد**» (L517) implies initiating with strangers |
| J | Fluency (duration/flow/continuity) | **REQUIRED** | «5 دقائق كاملة» (L516); «حوار حر لمدة دقيقتين» (L526) — time-bound performance |
| K | Accuracy (specific linguistic accuracy) | **NOT SPECIFIED** | Assessment is «حوار حر» with no accuracy criterion |
| L | Pronunciation intelligibility | **NOT SPECIFIED** | No intelligibility criterion stated for L15 |
| M | Independence (speak without a model) | **REQUIRED** | «**بدون الرجوع للورقة**» (L507); «**بدون ورقة**» (L526) |
| N | Spontaneity (non-memorized) | **REQUIRED** | «**حوار حر**» (L507/L526); «تواصل حقيقي» (L502); «8 تبادلات **طبيعية**» (L515) |
| O | Information exchange | **REQUIRED** | Mingling + «يقدّمون **شخصًا تعارفوا معه**» (L518) requires obtaining new information |
| P | Meaningful communication | **REQUIRED** | Rationale «تواصل حقيقي» (L502) |
| Q | Repair (request clarification/repeat) | **NOT SPECIFIED** | Not mentioned |
| R | Peer interaction (speak with a classmate) | **REQUIRED** | «تدريب **ثنائي**» (L516); mingling (L517) |
| S | Whole-class speaking | **REQUIRED** | «**5 طلاب يقدّمون**» (L518); «كل طالب يقدّم نفسه» (L512) |
| T | Extended speaking (sustained series) | **REQUIRED** | 8–10 exchanges (L507); 5-minute pair (L516); 2-minute free dialogue (L526) |

*`NOT REQUIRED` was not used for any dimension, because no source explicitly excludes a dimension; `NOT SPECIFIED` is used strictly for silence in the official sources.*

## 7. Dialogue Architecture

No scripted dialogue, role definitions, substitutions, prompts, or cues are published in the L15 card. What the sources establish is the **interaction structure**:

| Element | Source | Status |
|---------|--------|--------|
| Roles | Getting-acquainted dyads (interviewer ↔ interviewee implied) | IMPLIED (L504–L507) |
| Exchanges | Model 8 (L515); objective 8–10 (L507) | OFFICIAL (numeric ambiguity) |
| Who initiates | Not published | NOT SPECIFIED |
| Who asks | Both may ask (questions present) | IMPLIED (L505) |
| Who answers | Both may answer | IMPLIED (L505) |
| Roles alternate | Both ask & answer | IMPLIED |
| Fixed vs variable dialogue | Variable / free («حوار حر») | OFFICIAL (L507/L526) |
| Alternatives/substitutions | Not published | NOT SPECIFIED |
| Prompts / cues | Not published | NOT SPECIFIED |
| Student can change information | Yes — personal information | IMPLIED (mingling, presenting a met person) |
| Memorized vs semi-controlled vs free | **Free production** (no paper) | OFFICIAL (L507/L526) |

### Interaction-Architecture Table

| Stage | Teacher | Student A | Student B | Input | Output | Control |
|-------|---------|-----------|-----------|-------|--------|---------|
| 1 Review self-intro (L512) | Selects | presents 2 sentences | listens | teacher cue | spoken self-intro | teacher-led |
| 4 Model dialogue (L515) | models with volunteer | — | — | teacher speech | 8 spoken exchanges | teacher-modeled |
| 5 Pair practice (L516) | monitors | asks/answers | asks/answers | peer speech | 5-min dialogue | peer / low support |
| 6 Mingling party (L517) | manages | meets 4 new people | meets 4 new people | peer speech | free exchanges | peer / no paper |
| 7 Presentations (L518) | selects 5 | presents a met person | (class listens) | peer info | spoken presentation | student-controlled |
| 8 Exam prep (L519) | explains | listens | listens | teacher speech | (no output) | teacher-led |

## 8. Critical Question — the "8–10 Exchanges"

The official objective states «حوارًا تعارف موسّعًا (**8-10 تبادلات**)» (L507), and the model is «**8 تبادلات طبيعية**» (L515).

- **Definition of "exchange" in the sources:** **NOT DEFINED.** Neither the Blueprint card nor the Framework defines whether an exchange means *Question → Answer*, *A-turn → B-turn*, or a full round trip. Recorded as **AMBIGUOUS / MISSING EVIDENCE** — no definition is invented here.
- **Numeric ambiguity:** model = 8 exchanges vs objective = 8–10 exchanges. Recorded as **SOURCE AMBIGUITY**.
- **What is unambiguous:** the exchange count is tied to a **live two-person interaction** producing a **connected, sustained dialogue**, and its partner metric is **duration** (5-minute pair practice; 2-minute free dialogue).

## 9. Speaking Progression Audit

| Stage | Status | Evidence |
|-------|--------|----------|
| MODEL | **EXPLICIT** | «نمذجة الحوار الموسّع مع طالب متطوع» (L515) |
| LISTEN | **EXPLICIT** | inherent in listening to the model / teacher (L512–L515) |
| REPEAT | **NOT SPECIFIED** | no repetition step in the L15 card |
| CONTROLLED PAIR PRACTICE | **EXPLICIT (partial)** | «تدريب ثنائي» (L516) — but called «حوار» not "controlled" |
| SUBSTITUTION | **NOT SPECIFIED** | not in the L15 card |
| GUIDED INTERACTION | **IMPLIED** | pair practice with teacher monitoring (L516) |
| REDUCED SUPPORT | **EXPLICIT** | «بدون الرجوع للورقة» (L507) |
| INDEPENDENT SPEAKING | **EXPLICIT** | «حوار حر… بدون ورقة» (L526); mingling with 4 new people (L517) |

The card's actual arc is: **review → model → pair practice → low-support free interaction → presenting → exam prep** — a **fast route to independent production**, not a repeat/substitution drill. This aligns with the curriculum's general learning cycle (Roadmap §4), whose later stages (semi-independent → independent) are the ones L15 occupies.

## 10. Paper → Speech Transition

- **Endpoint A (with paper):** implied by the very phrasing «بدون **الرجوع** للورقة» (L507) — some support artifact exists.
- **Endpoint B (without paper):** explicit and assessed — «بدون ورقة» (L526) and HW presentation (L526).
- **What the paper contains:** **NOT SPECIFIED.**
- **When it is used / when it disappears:** **NOT SPECIFIED** (no gradual-removal schedule published).
- **Alternative cues after removal:** **NOT SPECIFIED.**
- **Memorized vs meaning-retrieval:** the card says «حوار **حر**» and «تواصل حقيقي» (L502/L507), i.e., **meaning-based retrieval/improvisation**, not recitation of a memorized text. No memorized script is published.

**Recorded as:** endpoints EXPLICIT; the transition mechanism is **NOT SPECIFIED** — not reconstructed.

## 11. Authenticity / Independence Audit

| Level | Required by L15? | Evidence |
|-------|------------------|----------|
| Memorized dialogue | **NO** | «حوار حر» (L507), «تواصل حقيقي» (L502) |
| Controlled dialogue | **NO** (only the model is teacher-controlled) | L515 vs free pair/mingle L516–L517 |
| Information-gap interaction | **YES (implied)** | «يتعارف مع 4 أشخاص جدد»; «يقدّمون شخصًا تعارفوا معه» (L517–L518) |
| Guided free speaking | **YES** | pair practice + reduced support (L516/L507) |
| Genuine communicative exchange | **YES** | rationale «تواصل حقيقي» (L502); «حوار حر» at assessment (L526) |

**Established level:** **GUIDED FREE SPEAKING → GENUINE COMMUNICATIVE EXCHANGE**, culminating in a no-paper 2-minute free dialogue. This is an *interpersonal, meaning-focused* level, not a reproduction of predefined output.

## 12. Student A / Student B Audit

| Question | Finding | Evidence |
|----------|---------|----------|
| Do A and B have the same content? | **Same functional frame** (getting acquainted), **different personal information** | L504–L505, L517 |
| Different information each? | **YES (implied)** | «أَسْكُنُ فِي...»، «أُحِبُّ...» are personal; mingling with 4 new people |
| One interviewer / one interviewee? | **Not fixed** — both ask («مَاذَا تُحِبّ؟») and both answer | L505 |
| Roles swap? | **IMPLIED** | reciprocal questions/answers |
| Equal speaking volume? | **IMPLIED symmetric** | both participants are "getting acquainted" |
| Imbalance? | **Not published** | — |

**Explicit A/B role scripts (interviewer/interviewee cards, fixed turns): NOT SPECIFIED.** The evidence supports a **symmetric information-exchange dyad**, not a scripted two-role skit.

## 13. Teacher Control Audit

**OFFICIALLY REQUIRED:**
- Run the quick self-introduction review («كل طالب يقدّم نفسه», L512)
- Present the rare letters ث ذ ظ in context (L513)
- Introduce the new vocabulary in context (L514)
- **Model the expanded dialogue with a volunteer for 8 exchanges** (L515)
- Set up / monitor the 5-minute pair dialogue (L516)
- **Manage the mingling party** (everyone stands, meets 4 new people) (L517)
- **Select 5 students** to present a person they met (L518)
- **Explain the final-exam format** in detail (L519/L521)

**POSSIBLE BUT NOT SPECIFIED:** play/replay audio models, stop/restart the activity, swap partners, give/withdraw prompts, correct pronunciation, correct sentences, force retries, individual pacing control.

**Evidence note:** the framework error policy (Roadmap §11) assigns correction modes by error type, but the L15 card itself specifies **no** teacher-correction action for speaking.

## 14. Feedback Audit

| Feedback type | L15 card | Framework policy |
|---------------|----------|------------------|
| Pronunciation | **NOT SPECIFIED** | general pronunciation practice (Framework L119); no receipt/feedback of produced speech |
| Vocabulary | **NOT SPECIFIED** | — |
| Grammar | **NOT SPECIFIED** | — |
| Fluency | **NOT SPECIFIED** | — |
| Interaction | **NOT SPECIFIED** | — |

**Timing/mode:** the L15 card does **not** state whether correction is immediate, delayed, peer, teacher, repetition, recast, or model-and-repeat. The **general** curriculum policy (Roadmap §11) is: critical errors → immediately; teaching errors → after the activity; experimentation errors → do not interrupt. Applying that policy to speaking would require a means of detecting/perceiving speech — which the platform lacks. **Mode: NOT SPECIFIED at lesson level; general policy only.**

## 15. Speaking Assessment Audit

**Official assessment:** «**حوار حر لمدة دقيقتين بدون ورقة**» (L526).

| Question | Finding | Evidence |
|----------|---------|----------|
| What is measured? | Conducting a free dialogue for 2 minutes without paper | L526 |
| Who measures? | Teacher (only available observer) | Roadmap §5 |
| When? | End of lesson (assessment slot) | L526 |
| Individual / pair / group? | **AMBIGUOUS** — a «حوار» implies a partner, but the card does not state whether it is individual or paired | L526 |
| Duration | **2 minutes** (explicit) | L526 |
| Exchange count | 8–10 (objective) / 8 (model) — numeric ambiguity | L507/L515 |
| Rubric | **NOT SPECIFIED** | — |
| Pronunciation measured? | **NOT SPECIFIED** | — |
| Accuracy measured? | **NOT SPECIFIED** | — |
| Fluency measured? | **Duration is specified**; a fluency *score* is **NOT SPECIFIED** | L526 |
| Vocabulary measured? | **NOT SPECIFIED** | — |
| Independence measured? | **YES — «بدون ورقة»** | L526 |

**No numerical score or rubric is invented.** The only explicit measurable criteria are **duration (2 min)**, **no-paper independence**, and (from the objective) an **8–10-exchange** scope.

## 16. Mastery Criteria

The official sources provide **performance conditions** (2-minute free dialogue without paper; 8–10 exchanges; 5-minute pair dialogue) but **no quality thresholds** — no accuracy, fluency, vocabulary, or pronunciation criterion, and no pass mark.

**MASTERY CRITERIA INCOMPLETE.** (No mastery standard is invented here.)

## 17. Speaking Activity Inventory

| # | Official Activity | Student Action | Teacher Action | Speaking Output | Required Capability | Runtime Support |
|---|-------------------|----------------|----------------|-----------------|---------------------|-----------------|
| 1 | Quick self-intro review (L512) | presents self in 2 sentences | selects/cues | spoken self-intro | per-student spoken turn | MISSING |
| 2 | Rare letters ث ذ ظ in context (L513) | perceives/reads in words | presents | (reading, not speaking) | — | Partially (letter/word cards; diacritics blocked) |
| 3 | Introduce new vocab in context (L514) | listens/repeats meaning | presents | (receptive) | vocabulary-context presentation | MISSING (diacritics/context) |
| 4 | Model expanded dialogue, 8 exchanges (L515) | (volunteer) participates | models | 8 spoken exchanges | live 2-speaker dialogue (model) | MISSING |
| 5 | 5-minute pair dialogue (L516) | dialogues with peer | monitors | 5-min free dialogue | live pair speaking + turn-taking | MISSING |
| 6 | Mingling party — meet 4 new people (L517) | mingles, exchanges info | manages | multiple free exchanges | multi-partner live speaking | MISSING |
| 7 | Presentations — 5 students present a met person (L518) | presents a met person | selects/assesses | spoken presentation | whole-class oral production | MISSING |
| 8 | Final-exam preparation (L519) | listens | explains exam | (no output) | teacher explanation | Presentational only |

**EXISTS: 0 · PARTIALLY EXISTS: 1 (letters/word cards — receptive) · ADAPTABLE: 0 · MISSING: 7.** No official speaking activity can be represented by the current activity model.

## 18. Current Runtime Audit

| Capability searched | Present? | Evidence |
|---------------------|----------|----------|
| dialogue / dialogue engine | **NO** | no dialogue root key; no dialogue activity |
| speaking | **NO** | no speech input anywhere |
| conversation | **NO** | — |
| pair practice | **NO** | engine is single-student; no peer model |
| role play | **NO** | — |
| oral prompts | **PARTIAL (teacher-orchestrated only)** | `sentence-production.v1` `PROMPT`/`SUPPORT` |
| speech recording | **NO** | no `MediaRecorder`/`getUserMedia` |
| audio input / microphone | **NO** | no `navigator.mediaDevices` |
| student recording | **NO** | — |
| turn-taking | **NO** | — |
| timed speaking | **NO** | no speaking timer |
| response reveal | **YES (receptive)** | `silent-dictation.v1`, `auditory-identify.v1` reveal |
| speaking assessment | **NO** | `assessmentRounds` are letter-level |
| pronunciation feedback | **NO** | — |
| pair interaction | **NO** | — |
| **audio playback (teacher-to-student)** | **YES** | `AudioManager.play()` + `SpeechSynthesisUtterance` (`app.js` L79–111) |

**CRITICAL DISTINCTION (task §18/§20/§32):** *Audio playback* (teacher/MP3/TTS → student) is **not** *student speaking capability*. The runtime can make the student **hear** Arabic (A) and can display letters to **select** (C); it cannot capture, assess, or mediate the student **speaking** (E/F/G). The only `SpeechSynthesisUtterance` usage is **output** (TTS), the inverse of speaking.

## 19. Student Input Modality

| Modality L15 needs | Required? | Runtime has? |
|--------------------|-----------|--------------|
| Visual input (model/dialogue display) | YES | YES (display) |
| Audio input (hear teacher/model) | YES | YES (MP3/TTS playback) |
| Text input (type) | NO | YES (unused for L15) |
| **Student speech (live)** | **YES** | **NO** |
| **Microphone** | implied by live speech (classroom) / not stated for platform | **NO** |
| **Recording** | **NOT SPECIFIED** in L15 card | **NO** |
| Playback of student voice | NOT SPECIFIED | NO |
| Teacher observation | **YES** | (human only) |
| Peer interaction | **YES** | **NO** |

## 20. Important Distinction — Level of Speaking Capability

| Level | Description | Does L15 require it? |
|-------|-------------|----------------------|
| A | Student hears Arabic | YES (prerequisite) |
| B | Student repeats Arabic | **NOT the target** (no repeat step in L15) |
| C | Student selects Arabic | NO (not a speaking skill) |
| D | Student types Arabic | NO |
| E | Student records speech | **NOT SPECIFIED** |
| **F** | **Student speaks live to another student** | **YES** — pair practice, mingling (L516–L517) |
| **G** | **Student performs an extended dialogue** | **YES** — 8–10 exchanges, 2-min free dialogue (L507/L526) |

**L15 sits at levels F–G.** The runtime supports only A (and C/D text). The gap spans levels E–G.

## 21. Physical Classroom vs Digital Platform

| Requirement class | Content | Evidence |
|-------------------|---------|----------|
| **Curriculum requirement** | Perform an extended free getting-acquainted dialogue (8–10 exchanges), 2 min, without paper | L507, L526 |
| **Teacher-mediated requirement** | Model dialogue with a volunteer; run pair practice; run the mingling party; select presenters; assess; explain the exam | L515–L519 |
| **Platform requirement** | Signature activity = «محاكاة حوار متقدمة: أسئلة متنوعة بمستويات صعوبة» (an advanced dialogue **simulation**) | Framework L189 |

**Framework principle (Roadmap §16):** «المنصة الرقمية والـHTML أدوات تعليمية **مساعدة، وليست بديلاً عن المعلم**»; «ويُستخدم أي عنصر رقمي فقط إذا أضاف قيمة تعليمية حقيقية». Therefore the live pair/mingle/presentation speaking is **teacher-mediated classroom activity**, and the platform is **not** required to replace it. The platform's own declared L15 behavior remains a **simulation** — but even that simulation does not exist in the runtime.

**Distinction recorded:** classroom pedagogy (live speaking) ≠ teacher-mediated orchestration ≠ platform capability (a simulation). The platform does not need to *be* the pair work — but it must at minimum provide the declared **dialogue-simulation** component, which is absent.

## 22. Digital Speaking Audit

| Element | Required by official sources? | Evidence | Runtime |
|---------|-------------------------------|----------|---------|
| Dialogue display | Implied by «محاكاة حوار» | Framework L189 | MISSING |
| Prompt reveal | Framework section-8 «نشاط التواصل» | Framework L122 | MISSING (for dialogue) |
| Role cards | **NOT SPECIFIED** | — | MISSING |
| Turn indicator | **NOT SPECIFIED** | — | MISSING |
| Audio model | framework general (audio) | Framework L132 | EXISTS (playback) |
| Recording | **NOT SPECIFIED** | — | MISSING |
| Replay | framework general | — | EXISTS (audio replay) |
| Timer (speaking) | **NOT SPECIFIED** in L15 card | — | MISSING |
| Pair mode | **NOT SPECIFIED** as platform feature | — | MISSING |
| Speaking prompt | implied by simulation | L189 | MISSING |
| Hidden support / progressive scaffolding | **NOT SPECIFIED** | — | MISSING |

Only **audio playback/replay** exists. No dialogue-simulation UI, turn logic, role cards, recording, or speaking timer exists. **No element is treated as required beyond the sources.**

## 23. Activity Engine Audit

| Definition | Category | Could represent L15? |
|------------|----------|----------------------|
| `auditory-identify.v1` | auditory-discrimination | NO |
| `same-or-different.v1` | auditory-discrimination | NO |
| `close-sound-compare.v1` | auditory-discrimination | NO |
| `rapid-retrieval.v1` | retrieval | NO |
| `silent-dictation.v1` | written-assessment | NO (no capture; self-check reveal) |
| `sentence-production.v1` | **oral-production** | **NO — closest, but insufficient** |

`sentence-production.v1` (`activity-definitions.js` L285–309): `category: 'oral-production'`, goal «ينتج الطالب جملة عربية قصيرة شفهياً، مستقلاً أو مع دعم تدريجي», commands `SELECT_STUDENT`/`PROMPT`/`SUPPORT`/`COMPLETE_STUDENT`, events `student.response-observed`. It models **one student at a time**, **teacher-observed**, **prompt→support**, with **no peer, no turn-taking, no exchange count, no dialogue state, no audio input/capture, no duration, no assessment**. It is a **teacher-checklist state machine**, not a speaking engine.

**Verdict:** no single Activity Definition can represent L15's real behavior. Even `sentence-production.v1` would require **fundamental redesign** (multi-speaker, turn model, information state, capture) — beyond data-only changes. **MISSING** (not ADAPTABLE).

## 24. P1–P7 Compatibility

| Phase | Applicable? | Why? | Official Evidence | Runtime Capability |
|-------|-------------|------|-------------------|--------------------|
| P1 | NO | no new letter acquisition | L513 «توطيد أخير» | letter intro only |
| P2 | NO | no new phoneme perception | L513 review | phoneme-explore |
| P3 | NO | no letter reveal | — | letter-reveal |
| P4 | NO | writing, not speaking | — | stroke-video |
| P5 | PARTIAL | vocab introduced (L514), but letter-anchored in runtime | L514 | word-reveal (letter-centric) |
| P6 | NO | no discrimination/dictation as target | — | discrimination/dictation |
| P7 | NO | letter-level assessment, not oral | L526 | letter assessments |

**PIPELINE MISMATCH.** L15 is an oral-interaction lesson; P1–P7 is a **letter/phoneme acquisition pipeline**. Forcing L15 into P1–P7 would be a category error. P5 is at best a vocabulary-presentation overlap, not the lesson's competence. **The seven-phase pipeline is not suitable for a speaking lesson.**

## 25. Schema Audit

| Requirement | Schema element | L15 official content | Verdict |
|-------------|----------------|----------------------|---------|
| Dialogue | — | «حوار حر موسّع» (L507) | **MISSING** |
| Speakers | — | two/multiple students | **MISSING** |
| Turns / exchanges | — | «8-10 تبادلات» (L507) | **MISSING** |
| Prompts / cues | `p7Prompts` (letter assessment) | speaking cues | **MISSING** |
| Role | — | (implied) | **MISSING** |
| Substitution | — | NOT SPECIFIED | **MISSING** |
| Speaking task | — | pair/mingle/present | **MISSING** |
| Conversation stages | — | model→pair→mingle→present | **MISSING** |
| Independent speaking | — | «بدون الرجوع للورقة» | **MISSING** |
| Assessment (oral) | `assessmentRounds` = `show-letter`/`count-dots`/`sound` | 2-min free dialogue | **MISSING** |
| Audio model (input) | `words[].audioFile`, `meta` audio | yes | PRESENT (playback only) |
| Recording | — | NOT SPECIFIED | **MISSING** |
| Interaction state | — | live interaction | **MISSING** |
| Target letters ث ذ ظ | `targetLetterIds`, `letters`, `arabicAlphabet` | representable | PRESENT |
| Vocab/sentences with marks | whitelist `[\u0621-\u064A]` | أُحِبّ، أَسْكُن، أَعِيش… contain شدة/سكون/مد | **CONFLICT** |

**Where the current schema contract ends:** the 15 roots (`meta, p4WritingPracticeDeferred, letters, strokeGuides, words, p5WordMeta, p5RevealSteps, p6Demo, p6Strings, discriminationRounds, p7Prompts, assessmentRounds, arabicAlphabet, targetLetterIds, phases`) model **a single-student, teacher-led, letter/phoneme/word/item pipeline**. There is **no representation of a second speaker, a turn, a dialogue, a speaking task, an oral performance, or speech capture**. Introducing these would be new architecture, not a data change. **No schema proposal is made.**

## 26. Speaking Engine Question

**Answer from evidence (not impression):**

- Data-only change within the current lesson engine? **NO.** No dialogue/turn/speaker concept exists in the schema or activity model.
- Fundamental activity change? **NO, not by itself** — even a redesigned activity would still lack a schema for speakers/turns/dialogue and a capture modality.
- New pedagogical family requiring a **Speaking / Communication Engine**? **YES** — L15 is unambiguous evidence of a **distinct family (COMMUNICATION / SPEAKING)** whose competence (live, extended, free oral interaction) is not expressible by the letter-acquisition pipeline.

**Classification: CASE B — the official lesson is clear, but the current architecture cannot faithfully represent it.**

## 27. Blocker Severity

| Blocker | Severity | Evidence | Consequence |
|---------|----------|----------|-------------|
| **No live student speaking / speech input at all** | **CRITICAL** | repo-wide: no `getUserMedia`/`MediaRecorder`/`SpeechRecognition`; `AudioManager` = playback only (`app.js` L79–111) | The core objective «يُجري الطالب حوارًا…» cannot be produced or assessed |
| No dialogue / speakers / turns model in schema | **CRITICAL** | 15-root schema (`lesson-schema.js` L45–49); no dialogue root | The 8–10-exchange dialogue has no representation |
| No pair / multi-speaker interaction model | **CRITICAL** | engine is single-student; no peer concept | Pair practice (L516) and mingling (L517) unrepresentable |
| No oral assessment / speaking rubric | **HIGH** | `assessmentRounds` are letter-level; assessment L526 | «حوار حر… بدون ورقة» cannot be measured |
| No dialogue-simulation component (the declared signature activity) | **HIGH** | Framework L189; runtime has no such activity | The platform's own L15 representation is absent |
| No speaking timer / duration control | **MEDIUM** | 5-min & 2-min durations (L516/L526) | Duration-bound performance cannot be scaffolded |
| No independence/support scaffolding (with-paper → without-paper) | **MEDIUM** | L507/L526 | The paper-to-speech transition cannot be mediated |
| Official vocabulary/sentences contain شدة/سكون/مد outside whitelist | **MEDIUM** | schema L82–83; أُحِبّ، أَعِيش، أَسْكُن… | Exact official content unrepresentable |

Severities are not inflated: the CRITICAL items each independently prevent the lesson's core competence.

## 28. L14 → L15 Dependency

**Documents verified** (not assumed from ordering):

- L14 = handwriting/connected writing (Blueprint L466–495); L15 = free oral dialogue (L497–526). No source states that L14's **writing** is a prerequisite for L15's **speaking**.
- L15's own prerequisites are cumulative and oral/lexical: rare letters ث ذ ظ «توطيد أخير» (L503) depend on L01/L04 letter acquisition; the getting-acquainted frame and vocabulary depend on the earlier communication lessons.
- The Framework Stage-IV exit outcome unifies **reading + writing + free dialogue** (L87) across L13–L16 — a parallel integration, not an L14→L15 writing dependency.
- **Continuity:** real at the stage level (both integrate prior skills; L15 opens free production, L14 opened systematic writing). **But no explicit L14→L15 prerequisite is published** — writing is **not** shown to be a condition for L15.

**Verdict:** continuity YES (parallel strands of Stage IV); explicit dependency **NOT SPECIFIED** (writing is not evidenced as a prerequisite). Consistent with L14 report §25.

## 29. L15 → L16 Dependency

**Explicit in the sources (no L16 audit performed):**
- L15 step 8: «**تحضير الاختبار النهائي: اشرح ما سيكون فيه**» (L519).
- Teacher note: «**أخبر الطلاب بكل تفاصيل الاختبار النهائي** في هذه المحاضرة» (L521).
- HW: «**تحضير عرض تعريفي شخصي لمدة دقيقة كاملة للاختبار النهائي**» (L526).
- L16 preview (card L528–544, read only as a pointer): final exam = «عرض تعريفي (1 دق) + حوار مع زميل (1 دق) لكل طالب».

**Relationship:** L15 is the **explicit preparation lesson for the L16 final exam**; the oral production it practices (self-introduction presentation + free dialogue) is what L16 measures. **Dependency: EXPLICIT.** (L16 is not audited; audit stopped at L15.)

## 30. Updated L01–L15 Curriculum Map

| Lesson | Official Title | Pedagogical Family | Runtime Status |
|--------|----------------|--------------------|----------------|
| 01 | الحروف الأولى — ب ت ث ن | LETTER ACQUISITION | Implemented |
| 02 | م ي ا — وأول مقاطع | LETTER ACQUISITION (+syllables) | Implemented |
| 03 | ف و ق ك — والضمة | LETTER ACQUISITION | Implemented (runtime mixed) |
| 04 | ع غ ح خ — والكسرة | LETTER ACQUISITION | Implemented (runtime mixed) |
| 05 | التعارف الكامل | COMMUNICATION | Not built |
| 06 | الأرقام وأيام الأسبوع | COMMUNICATION / VOCAB | Not built |
| 07 | السكون — الحروف الساكنة | ORTHOGRAPHY / DIACRITICS | Unsupported |
| 08 | اختبار المنتصف + مراجعة | ASSESSMENT / REVIEW | Not built |
| 09 | الشدة — حرفان في واحد | ORTHOGRAPHY / DIACRITICS | Unsupported |
| 10 | التنوين — الاسم في الجملة | ORTHOGRAPHY / DIACRITICS | Unsupported |
| 11 | اللام الشمسية والقمرية | GRAMMAR / READING CONVENTION | Unsupported |
| 12 | المدود — الحروف الطويلة | ORTHOGRAPHY / DIACRITICS | Unsupported |
| 13 | أول نص كامل — القراءة المستقلة | READING | Unsupported |
| 14 | الكتابة المتصلة — الحروف في مواضعها | WRITING (Handwriting) | Unsupported |
| **15** | **حوار حر موسّع — اعرف فصلك** | **COMMUNICATION / SPEAKING** | **Unsupported (this audit)** |

No prior classification is revised; L15 confirms the communication strand visible on the Framework map (title-level evidence for L05/L06).

## 31. Emerging Pedagogical Families

| Family | Members | Status |
|--------|---------|--------|
| A — LETTER ACQUISITION | L01–L04 | runtime-supported |
| B — ORTHOGRAPHY / DIACRITICS | L07, L09, L10, L12 | unsupported |
| C — GRAMMAR / READING CONVENTION | L11 | unsupported |
| D — READING | L13 | unsupported |
| E — WRITING | L14 | unsupported |
| **F — COMMUNICATION / SPEAKING** | **L05, L06, L15 (L15 audited; F established)** | **unsupported** |
| G — ASSESSMENT / REVIEW | L08, L16 (pending) | midterm documented |

**Evidence-based refinement:** L15 shows that **COMMUNICATION is not monolithic**. The earlier communication lessons are vocabulary/self-introduction application; **L15 is the distinct *speaking-production* sub-family** (live, extended, free oral interaction). The audit records this as an evidence-based distinction rather than assuming all communication lessons are identical.

## 32. Critical Architectural Observations

1. **Speaking ≠ Audio playback.** The runtime's only speech-adjacent facility is *output*: `AudioManager.play()` (MP3) and `SpeechSynthesisUtterance` (TTS) in `app.js` L79–111. Playing a model to a student is the opposite direction from the student **producing** speech. Official L15 requires production (L507/L526); the runtime is receive-only. **This is the central gap.**
2. **Dialogue ≠ static dialogue display.** Even if a dialogue text were displayed, L15 requires students to **perform** an 8–10-exchange dialogue (L515–L517), not view it. A static display satisfies none of the interaction requirements.
3. **Pair interaction ≠ single-student interaction.** The activity engine models **one** student at a time (`sentence-production.v1` `SELECT_STUDENT`/`COMPLETE_STUDENT`). L15 requires **two live speakers** with turn-taking (L516) and **multiple** partners (L517). A single-student model cannot represent multi-party interaction.
4. **Independent speaking ≠ selecting a predefined answer.** L15's independence criterion is «بدون الرجوع للورقة» / «بدون ورقة» (L507/L526) and its authenticity is «حوار حر» / «تواصل حقيقي» (L502/L507). Choosing from predefined options (the runtime's `same/different`, `silent-dictation` reveal) is not spontaneous production and cannot satisfy this.
5. **Platform ≠ replacement for the teacher.** Per Roadmap §16, the platform is a *supporting* tool; live pair/mingle/presentation speaking is teacher-mediated classroom activity. The platform's obligation is narrower — yet even its **declared** L15 component («محاكاة حوار متقدمة», Framework L189) does not exist.

## 33. Evidence Discipline

Every material finding is labeled: **OFFICIAL FACT**, **STRUCTURAL EVIDENCE**, **MISSING EVIDENCE**, or **INFERENCE**. Unpublished items (exchange definition, paper content, A/B scripts, correction mode, rubric, mastery thresholds, the speaking timer) are recorded as **NOT SPECIFIED / MISSING**, not inferred. The one internal contradiction (8 vs 8–10 exchanges) is recorded as **SOURCE AMBIGUITY**. Structural absence (no `getUserMedia`/`MediaRecorder`/`SpeechRecognition`) is reported as **absence evidence**, not assumption.

## 34. No General Knowledge Fill-In

No external knowledge was used to define speaking levels, exchange counts, fluency criteria, pronunciation rubrics, mastery thresholds, dialogue turns, vocabulary, or assessment criteria. Every definition is sourced to the Blueprint card (L497–526), the Framework (L85–87/L189/L205–208), or the Roadmap (§4/§9/§11/§12/§16/§18). Where the sources are silent, the report says so.

## 35. Report Structure Compliance

This report contains all required sections: Executive Verdict, Audit Scope, Source Hierarchy, Official Evidence, Official Lesson Identity, Pedagogical Family, Official Objective, Learner Outcome, Prerequisites, Speaking Competence Model, Dialogue Architecture, Student A/B Roles, Speaking Progression, Paper-to-Speech Transition, Authenticity/Independence Audit, Listening–Speaking Relationship, Teacher Control, Feedback, Classroom Materials, Digital Platform Requirements, Official Activity Sequence, Speaking Assessment, Mastery Criteria, Error/Feedback Taxonomy, L14→L15 Dependency, L15→L16 Dependency, Schema Compatibility, P1–P7 Compatibility, Activity Engine Compatibility, Current Speaking Capability, Student Input Modality, Blockers, CASE Classification, Architectural Implications, Updated L01–L15 Curriculum Map, Emerging Pedagogical Families, Evidence Confidence, Protected-File Integrity, Final Decision.

### Additional sections (added as permitted)

**38-A. Official Objective (restated).** «يُجري الطالب حوارًا تعارف موسّعًا (8-10 تبادلات) بدون الرجوع للورقة» (L507).

**38-B. Learner Outcome.** After L15 the student conducts an extended getting-acquainted dialogue of 8–10 exchanges without paper, sustains a 5-minute pair dialogue and a 2-minute free dialogue, meets and presents new classmates, and is prepared for the final exam (L507/L516/L518/L526). Framework Stage-IV exit: «يُجري الطالب حوار تعارف كاملًا…» (L87).

**38-C. Prerequisites.** Letter recognition incl. ث ذ ظ (L503); getting-acquainted vocabulary/sentences (L504–L505); prior self-introduction ability (L512); the cumulative L01–L14 skills (Stage IV integration).

**38-D. Listening–Speaking Relationship.** Listening is **instrumental** (understanding teacher/peer models and partners, L515–L517); the target is **speaking**. No separate listening objective is stated for L15.

**38-E. Classroom Materials.** The card names **no** writing/paper requirement for L15; it references a *paper that is to be dispensed with* («بدون الرجوع للورقة», L507). No workbook/notebook is required. (Contrast L14, which required notebooks — evidence that L15 is deliberately oral.)

**38-F. Error / Feedback Taxonomy.** **NOT SPECIFIED in the L15 card.** The general curriculum policy (Roadmap §11) divides errors into critical/teaching/experimental with different correction timing, but no speaking-specific error taxonomy or feedback rubric is published.

## 36. Evidence Confidence

| Conclusion | Confidence | Basis |
|------------|-----------|-------|
| L15 identity/family/objective (extended free speaking) | HIGH | Blueprint L497–526 (complete card) |
| Live multi-party speaking required | HIGH | L515–L519 + L507/L526 |
| Independence (no paper) + spontaneity («حوار حر») required | HIGH | L507/L526/L502 |
| 8–10 exchanges / 5-min / 2-min durations | HIGH | L507/L516/L526 |
| L15 → L16 explicit exam-prep dependency | HIGH | L519/L521/L526 |
| Runtime has no speech input/recording/pair/dialogue | HIGH | repo-wide grep + `app.js` + engine read |
| Schema cannot represent dialogue/turns/speakers/oral task | HIGH | `lesson-schema.js` L45–49 + root audit |
| P1–P7 mismatch (letter pipeline vs speaking) | HIGH | schema/engine vs card |
| Communication/Speaking is a distinct family | HIGH | objective + activities + assessment |
| Meaning of "exchange" | LOW | NOT DEFINED in sources |
| Exact paper content / removal schedule | MISSING | not published |
| Mastery thresholds / rubric | MISSING | not published |

## 37. Protected-File Integrity

- **`js/lesson-15.js`: ABSENT** (verified — not created).
- Pre-audit and post-audit SHA-256 verified — **EXPECTED DIFF = 0** across all 12 protected files:

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

Only file created: `MD/LESSON_15_INVESTIGATION_REPORT.md`. No unexpected change was found; nothing was fixed silently.

## 38. Final Decision

**BLOCKED.**

**Exactly which official capabilities cannot be represented:**
1. **Live student speaking** — the core objective («يُجري الطالب حوارًا…») needs speech production in real time; the runtime has no speech input (only MP3/TTS **output**).
2. **Extended dialogue (8–10 exchanges / 5-min pair / 2-min free)** — no dialogue, speaker, turn, or exchange model exists in the schema or engine.
3. **Pair and multi-party interaction** — the engine is single-student; L15 requires two-speaker turn-taking and mingling with 4 new people.
4. **Independent/spontaneous production without paper** — the platform's interaction model is selection/reveal, not free production; no support-removal mechanism exists.
5. **Oral assessment** — «حوار حر لمدة دقيقتين بدون ورقة» cannot be performed or measured; `assessmentRounds` are letter-level.
6. **Dialogue simulation (the declared signature platform activity)** — «محاكاة حوار متقدمة» (Framework L189) does not exist.
7. **Exact official orthography** — شدة/سكون/مدّ in the vocabulary/sentences are rejected by the schema whitelist.

Per protocol the blockers are **not solved here**. No Speaking/Communication Engine is designed, no schema field is proposed, no audio/recording/pairs feature is created, and **no `lesson-15.js` is created**. **STOPPED after audit — L16 is not begun.**

---

**FINAL PRINCIPLE observed:** this audit did not try to prove the runtime can run L15, nor to work around its limits. It established what L15 officially requires pedagogically and communicatively, what the current system can actually represent, and where the gap lies. Evidence first; curriculum before code; capability before implementation; no invention; no silent assumptions; no runtime changes; L15 only.

