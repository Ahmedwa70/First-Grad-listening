# LESSON 14 INVESTIGATION REPORT

> **Date:** 2026-09-19
> **Type:** ADVANCED CURRICULUM / PEDAGOGY / UX / ARCHITECTURE EVIDENCE AUDIT — audit only.
> **Verdict:** ⛔ **BLOCKED (CASE B).** Lesson 14 is the official first **connected-writing / Arabic-handwriting** lesson. The current runtime has **no student handwriting input, capture, tracing, positional/connected-form model, or dictation capture**; P4 is passive stroke-video playback.

---

## 1. Executive Verdict

- **Official identity:** Lesson 14 = **«الكتابة المتصلة — الحروف في مواضعها»** (Connected Writing — Letters in Their Positions)
- **Lesson family:** **WRITING** — specifically **HANDWRITING / CONNECTED WRITING**, with an orthography-accuracy and word/sentence-copying layer. It establishes family **E — WRITING** as first-class.
- **CASE:** **B — official, fully specified, not faithfully representable.**
- **Confidence:** HIGH (Blueprint card complete: title, rationale, letters, vocab, sentences, objective, 8-step plan, teacher note, HW, assessment; Framework row + Stage IV agree).
- **Conclusion:** L14's core competence is the student physically **producing connected Arabic handwriting** — tracing words, writing from memory, writing the two official sentences, and writing 3 connected words from dictation, all while observing the **four positional forms** of the 7 shape-changing letters (ع غ ح خ ك م ه), on wide-lined paper, corrected by peer/teacher. The runtime's P4 is a **play-only letter-stroke animation viewer** ("compare" = a static 4-letter card grid) with **no input mechanism, no ink capture, no canvas, no overlay comparison, no dictation capture, and no positional/connected-form data model**. The Framework's own signature activity (L188) — «Canvas للتتبع + لوحة كتابة حرة مع مقارنة overlay» — does not exist. Additionally, the official words/sentences bear شدة/سكون/حركات rejected by the schema whitelist.

## 2. Audit Scope

- Locate and capture the complete official L14 card (all lines, not just title).
- Locate Framework stage/lesson-map/competency entries for writing.
- Audit L14's writing competence across 20 dimensions and the Arabic handwriting specifics.
- Audit positional forms, target letters, words, connected writing, writing process, teacher control, materials, digital-medium requirement, orthography/Unicode, assessment, error taxonomy.
- Test the 15-root schema, P1–P7, the activity engine, and the actual P4 implementation.
- Establish L13→L14 and L14→L15 dependency evidence only.
- Update the L01–L14 curriculum map and family map.
- Verify protected-file integrity; create only the audit report.

## 3. Source Hierarchy

| Level | Source | Used for |
|-------|--------|----------|
| 1 | `03_Pedagogical Blueprint` L466–495 | Official L14 card (complete) |
| 2 | `01_Pedagogical Framework` L85–87 | Stage IV «التواصل والتكامل — المحاضرات 13-16», goal includes «كتابة متصلة» |
| 2 | `01_Pedagogical Framework` L188 | Lesson-map row 14 + signature activity (canvas/trace/free-write/compare overlay) |
| 5 | `MD/LESSON_13_INVESTIGATION_REPORT.md` §19 | L13→L14 dependency evidence |
| 6 | `schema/lesson-schema.js`; `js/activities/stroke-video.js`; `js/engine/activity-definitions.js`; `js/lesson-0*.js` | STRUCTURAL EVIDENCE — actual capability |

**Policy:** runtime is not curriculum authority. `meta.nextLesson` is not authoritative. Existing `.js` files are structural evidence only.

## 4. Official Evidence

| # | Evidence (exact) | Source | Kind |
|---|------------------|--------|------|
| 1 | Title: «**الكتابة المتصلة — الحروف في مواضعها**» | Blueprint L466 | OFFICIAL FACT |
| 2 | Rationale: «الكتابة المتصلة تحدٍّ كبير لمن تعلّم بالصينية. هذا الدرس يبني الجسر بين معرفة الحروف والكتابة الفعلية» | Blueprint L471 | OFFICIAL FACT |
| 3 | Target letters: «مراجعة الحروف المتغيّرة: **ع غ ح خ ك م ه**» | Blueprint L472 | OFFICIAL FACT |
| 4 | Vocab: «**عَرَبِيَّة — مَعْرِفَة — حَقِيقَة**» | Blueprint L473 | OFFICIAL FACT |
| 5 | Sentences: «**اللُّغَةُ العَرَبِيَّةُ جَمِيلَة. أَكْتُبُ بِالعَرَبِيَّة.**» | Blueprint L474 | OFFICIAL FACT |
| 6 | Objective: «يكتب الطالب الكلمات بصورة متصلة صحيحة مراعيًا شكل الحرف في أول الكلمة ووسطها وآخرها» | Blueprint L476 | OFFICIAL FACT |
| 7 | 8-step plan: review shape table (4 positions) → guided tracing → write from memory + compare → pair correction → write sentences → display best → **final dictation (5 words)** → HW | Blueprint L481–488 | OFFICIAL FACT |
| 8 | Teacher note: «استخدم دفاتر ذات أسطر واسعة…» | Blueprint L490 | OFFICIAL FACT |
| 9 | HW: «**نسخ نص المحاضرة 13** خطًا يدويًا في دفتر الكتابة» | Blueprint L495 | OFFICIAL FACT |
| 10 | Assessment: «**كتابة 3 كلمات متصلة من الإملاء بدقة**» | Blueprint L495 | OFFICIAL FACT |
| 11 | Stage IV goal includes «**كتابة متصلة**»; exit «يكتب فقرة صحيحة» | Framework L86–87 | OFFICIAL FACT |
| 12 | Signature activity: «Canvas للتتبع + لوحة كتابة حرة مع مقارنة overlay» | Framework L188 | OFFICIAL FACT |
| 13 | L15 card (title/objective only, for dependency) | Blueprint L497–521 | OFFICIAL FACT |
| 14 | Schema `strokeGuides` model: one `videoFile` per letter; length must equal `letters.length` | `lesson-schema.js` L240–272 | OFFICIAL FACT (contract) |
| 15 | P4 implementation: video playback + step reveal, no input | `js/activities/stroke-video.js` (205 lines) | STRUCTURAL EVIDENCE |
| 16 | Engine defines `silent-dictation.v1` (prompt→reveal state machine) and `sentence-production.v1` | `js/engine/activity-definitions.js` L260–289 | STRUCTURAL EVIDENCE |
| 17 | Whitelist `isArabicChar = /^[\u0621-\u064A]$/` | `lesson-schema.js` L82–83 | OFFICIAL FACT (contract) |

## 5. Official Lesson Identity

| Field | Value |
|-------|-------|
| Official number | 14 |
| Official Arabic title | **«الكتابة المتصلة — الحروف في مواضعها»** |
| Stage | Stage IV — «التواصل والتكامل — المحاضرات 13-16» (Framework L85) |
| Family | **WRITING (Handwriting / Connected Writing)** |
| Objective | Write words in correct **connected** form, observing each letter's shape at the **beginning, middle, and end** of the word (L476) |
| New skill | Positional/connected handwriting of the 7 shape-changing letters; word & sentence production by hand; writing from dictation |
| Recycled skills | Letter recognition (reading), harakat/shadda/sukun knowledge, vocabulary (L13 text) |
| Target letters | **ع غ ح خ ك م ه** — labeled «مراجعة الحروف المتغيّرة» (review of *shape-changing* letters, not new letters) |
| Vocabulary | عَرَبِيَّة — مَعْرِفَة — حَقِيقَة |
| Sentences | اللُّغَةُ العَرَبِيَّةُ جَمِيلَة. أَكْتُبُ بِالعَرَبِيَّة. |
| Assessment | Write 3 connected words from dictation, accurately (L495) |
| Homework | Copy L13's text by hand in the writing notebook (L495) |
| Teacher note | Use wide-lined notebooks (L490) |

## 6. Pedagogical Family

**WRITING — HANDWRITING + CONNECTED WRITING + ORTHOGRAPHY + WORD/SENTENCE PRODUCTION.** Layers present, per evidence:

| Layer | Present? | Evidence |
|-------|----------|----------|
| Handwriting (physical formation) | **YES** | «يكتب الطالب الكلمات… شكل الحرف» (L476); trace/write steps (L482–483) |
| Connected writing (joining) | **YES** | «بصورة متصلة صحيحة», «كتابة 3 كلمات متصلة» (L476/L495) |
| Positional forms | **YES** | «شكل الحرف في أول الكلمة ووسطها وآخرها»; «مواضعها الأربعة» (L476/L481) |
| Orthography accuracy (spelling/diacritics) | **YES** | «بدقة» (L495); diacritics in official words |
| Word production | **YES** | write words from memory, dictation |
| Sentence production | **COPY only** | write the two official sentences (L485) — not generated |
| Paragraph production | NO | not in L14 |
| Letter recognition | NO (review only) | L472 |

This is unambiguously a **distinct family (WRITING)**, established by objective + activities + assessment — not merely by the title.

## 7. Official Objective

«**يكتب الطالب الكلمات بصورة متصلة صحيحة مراعيًا شكل الحرف في أول الكلمة ووسطها وآخرها**» — the student writes words in correct connected form, observing the letter's shape at word-initial, medial, and final positions. The target is **orthographic/handwriting production accuracy**, not recognition.

## 8. Learner Outcome

After L14 the student produces connected handwritten words and the two model sentences, observing positional forms, and can write 3 connected words correctly from dictation; homework extends to copying L13's full text by hand (L495). Framework Stage-IV outcome: «يكتب فقرة صحيحة» (L87).

## 9. Prerequisites

| Prerequisite | Evidence |
|--------------|----------|
| Letter recognition of all 28 letters (esp. the 7 shape-changers ع غ ح خ ك م ه) | L472 «مراجعة الحروف المتغيّرة» |
| Harakat/shadda/sukun knowledge | L07/L09/L10; present in official words |
| MADD knowledge | L12; present in مَعْرِفَة/حَقِيقَة/عَرَبِيَّة |
| Lam al-ta'rif | L11; present in «اللُّغَة» |
| Connected-text awareness | L13 first full text (source of HW copy text) |

## 10. Writing Competence Model

| Dimension | Required? | Evidence |
|-----------|-----------|----------|
| A. Letter formation | YES | trace/write steps (L482–483); «يكتب» (L476) |
| B. Positional forms (isolated/initial/medial/final) | **YES** | «أول الكلمة ووسطها وآخرها»; «مواضعها الأربعة» (L476/L481) |
| C. Connecting letters | **YES** | «بصورة متصلة صحيحة» (L476) |
| D. Shape-changing letters | **YES** | «الحروف المتغيّرة: ع غ ح خ ك م ه» (L472) |
| E. Word copying | YES | trace (L482); HW «نسخ» (L495) |
| F. Word construction | YES | «كتابة الكلمات من الذاكرة» + dictation (L483/L487) |
| G. Sentence copying | YES | «كتابة الجملتين» (L485) |
| H. Sentence generation | NO | sentences are copied, not generated |
| I. Guided writing | YES | tracing + model (L482) |
| J. Controlled writing | YES | fixed words/sentences |
| K. Independent writing | PARTIAL | write from memory (L483); dictated words (L487) |
| L. Paragraph writing | NO | not in L14 |
| M. Orthographic accuracy | YES | «بدقة» (L495) |
| N. Handwriting accuracy | YES | shape in 3 word positions (L476) |
| O. Legibility | YES | «جودة الخط», wide ruled lines (L490) |
| P. Directionality (RTL) | NOT SPECIFIED (implicit in Arabic script) | — |
| Q. Spacing | NOT SPECIFIED IN OFFICIAL SOURCES | — |
| R. Punctuation | NOT SPECIFIED as target (period appears in the model sentences) | L474 |
| S. Revision | **YES** | compare with model, pair correction (L483–484) |
| T. Peer/teacher feedback | **YES** | «تصحيح ثنائي», «المعلم يمشي ويوجّه», «عرض أفضل الكتابات» (L484–L486) |

## 11. Arabic Handwriting-Specific Audit

| # | Question | Answer |
|---|----------|--------|
| 1 | Which letters targeted? | **ع غ ح خ ك م ه** (L472) |
| 2 | Why selected? | They are «الحروف المتغيّرة» — the shape-changing letters (greatest positional variation) |
| 3 | Do they change shape by position? | YES (that is the lesson's premise) |
| 4 | Which four positions required? | «مواضعها الأربعة» (L481) — isolated / initial / medial / final |
| 5 | Letters connecting only one side? | NOT SPECIFIED IN OFFICIAL SOURCES |
| 6 | Joining points explicitly taught? | NOT SPECIFIED IN OFFICIAL SOURCES |
| 7 | Stroke order specified? | NOT SPECIFIED IN OFFICIAL SOURCES (P4 runtime has stroke *videos*, but the L14 card does not state stroke order) |
| 8 | Letter size specified? | NOT SPECIFIED (only "wide lines" L490) |
| 9 | Baseline placement specified? | NOT SPECIFIED IN OFFICIAL SOURCES |
| 10 | Ascenders/descenders specified? | NOT SPECIFIED IN OFFICIAL SOURCES |
| 11 | Dots part of assessment? | NOT SPECIFIED IN L14 card |
| 12 | Connections between letters assessed? | YES implicitly — «بصورة متصلة صحيحة» (L476) |
| 13 | Spaces between words assessed? | NOT SPECIFIED IN OFFICIAL SOURCES |

Evidence discipline applied: general Arabic-handwriting rules were **not** imported to fill gaps.

## 12. Target Letter Audit

| Letter | Officially targeted? | Previous owner (reading) | Position forms (official) | Writing role |
|--------|----------------------|--------------------------|---------------------------|--------------|
| ع | YES (L472) | lesson-02 (ج ح خ ع) | 4 positions | review shape-changing letter → connected writing |
| غ | YES (L472) | lesson-07 (غ ض ر ز) | 4 positions | same |
| ح | YES (L472) | lesson-02 (ج ح خ ع) | 4 positions | same |
| خ | YES (L472) | lesson-02 (ج ح خ ع) | 4 positions | same |
| ك | YES (L472) | lesson-06 (ف و ق ك) | 4 positions | same |
| م | YES (L472) | lesson-05 (م ي ا ه) | 4 positions | same |
| ه | YES (L472) | lesson-05 (م ي ا ه) | 4 positions | same |

**Critical distinction:** all 7 were previously taught as **recognition/reading letters**; their **positional handwriting forms are NEW** — official wording «مراجعة الحروف المتغيّرة» reviews the letters but the *skill* (connected positional writing) is new. Letter recognition ≠ handwriting mastery.

## 13. Positional-Form Audit

For every target letter, L14 requires the four positions (isolated, initial, medial, final) per «أول الكلمة ووسطها وآخرها» and «مواضعها الأربعة» (L476/L481).

**Explicit positional-form glyphs per letter: NOT SHOWN/NOT NAMED in the official L14 card.** The card references the concept and a "shape table" (L481) but does not enumerate the 28 glyph forms. This is **MISSING EVIDENCE at the data level** (the table itself is not reproduced); no forms are invented here.

| Letter | Isolated | Initial | Medial | Final |
|--------|----------|---------|--------|-------|
| ع غ ح خ ك م ه | required (L481) | required | required | required |
| (glyphs) | NOT SPECIFIED IN OFFICIAL CARD | NOT SPECIFIED | NOT SPECIFIED | NOT SPECIFIED |

## 14. Word-Level Writing Audit

| Word (exact) | Harakat / marks | Target letters present | Copy / independent | Classification |
|--------------|-----------------|------------------------|--------------------|----------------|
| عَرَبِيَّة | فتحة، كسرة، **شدة** (U+0651)، تاء مربوطة ة | ع، ة | write/copy; from-memory | APPLICATION |
| مَعْرِفَة | فتحة، **سكون** (U+0652)، كسرة، ة | م، ع، ة | write/copy | APPLICATION |
| حَقِيقَة | فتحة، كسرة، ة | ح، ة | write/copy | APPLICATION |

Plus the dictation set: 5 words pronounced by the teacher (L487) — the exact 5 words are **NOT SPECIFIED** in the card → MISSING EVIDENCE (not reconstructed).

## 15. Sentence / Connected-Writing Audit

| Official sentence | Type | Marks | Requirement |
|-------------------|------|-------|-------------|
| اللُّغَةُ العَرَبِيَّةُ جَمِيلَة. | nominal, definite | شدة، ضمة، فتحة، تاء مربوطة | **sentence copying** (L485) |
| أَكْتُبُ بِالعَرَبِيَّة. | verbal | فتحة، ضمة، كسرة | **sentence copying** (L485) |

No sentence-completion, construction, or generation is specified. Paragraph production is **not** in L14 (it belongs to L13's parallel-writing step and the Stage-IV outcome). The writing model/template: the two model sentences themselves; the HW model is L13's text (L495). Missing items are not reconstructed.

## 16. Writing Process Audit

Official progression, taken strictly from the 8 steps (L481–488):

**MODEL (shape table, L481) → TRACE (guided tracing, L482) → WRITE-FROM-MEMORY + COMPARE (L483) → PEER-CORRECT (L484) → WRITE SENTENCES (L485) → DISPLAY/WHOLE-CLASS FEEDBACK (L486) → DICTATION (L487) → HOMEWORK (copy L13 text, L495).**

Stages NOT present (not assumed): no explicit REVISE-after-feedback-and-rewrite loop beyond pair correction; no stroke-order teaching; no spacing/baseline drills.

## 17. Teacher Control Audit

**EXPLICITLY REQUIRED:**
- Model/reveal the shape table (L481)
- Demonstrate and supervise tracing (L482)
- Walk and guide while students write sentences (L485)
- Check/correct via pair exchange (L484)
- Display best writing on the board (L486)
- Conduct end-of-lesson dictation (L487)
- Explain homework (L488)

**POSSIBLE BUT NOT SPECIFIED:** individual pacing control, per-student error annotation, rubric scoring, per-student comparison overlays.

## 18. Classroom Material Audit

| Material | Required? | Evidence |
|----------|-----------|----------|
| Writing notebook (دفتر الكتابة) | YES | L490, L495 |
| Wide ruled lines (أسطر واسعة) | YES | L490 |
| Pen (بالقلم) | YES | L482 |
| Paper (للتبادل) | YES | L484 (exchange papers) |
| Board (اللوح) | YES | L486 |
| Projector / digital canvas / worksheet | NOT SPECIFIED IN OFFICIAL SOURCES | — |

**Classroom medium is fundamentally physical handwriting on paper.** The Framework (L188) adds a required *platform* representation (canvas/trace/free-write/compare-overlay) — see §19.

## 19. Digital Writing / Handwriting Audit

| Digital equivalent | Officially implied? | Evidence |
|--------------------|---------------------|----------|
| Handwriting overlay | YES (platform requirement) | Framework L188 «مقارنة overlay» |
| Trace layer | YES | Framework L188 «Canvas للتتبع» |
| Free-writing board | YES | Framework L188 «لوحة كتابة حرة» |
| Compare-with-model layer | YES | Framework L188 «مقارنة overlay» |
| Stroke-order animation | PARTIALLY (runtime has it; L14 card does not require) | `stroke-video.js` |
| Writing grid / baseline / size guides | NOT SPECIFIED IN OFFICIAL SOURCES | — |
| Student writing input/capture | Required by implication of «لوحة كتابة حرة» | Framework L188 |
| Typed Arabic | NOT SPECIFIED — official pedagogy is **handwriting** | L482/L490 |
| Handwriting capture | Implied by «لوحة كتابة حرة» | L188 |

**Medium distinction (task §16):** the *classroom* medium is pen-and-notebook; the *platform* requirement (Framework) is a tracing canvas + free-write board + comparison overlay to support that handwriting. Typing is **not** an official substitute.

## 20. Orthography / Unicode Audit

| Mark | Codepoint | Example | In whitelist `[\u0621-\u064A]`? |
|------|-----------|---------|----------------------------------|
| فتحة | U+064E | عَرَبِيَّة، أَكْتُبُ | ❌ |
| ضمة | U+064F | اللُّغَةُ | ❌ |
| كسرة | U+0650 | مَعْرِفَة | ❌ |
| **شدة** | U+0651 | عَرَبِيَّة، اللُّغَة، العَرَبِيَّة | ❌ |
| **سكون** | U+0652 | مَعْرِفَة | ❌ |
| تاء مربوطة ة | U+0629 | عَرَبِيَّة، جَمِيلَة | ✅ |
| ع غ ح خ ك م ه | U+0621–064A | target letters | ✅ |

**1. Representable:** base letters only (incl. ة U+0629).
**2. Not representable:** every diacritic in the official words/sentences (fatha/damma/kasra/shadda/sukun).
**3. Can exact official writing content be stored?** **NO** — official words and sentences cannot be stored with their required marks.
**4. Does stripping marks change the objective?** **YES** — «بدقة» (accuracy) explicitly assesses correct written form; شدة/سكون are part of that accuracy; stripping them voids the orthographic-accuracy dimension.

## 21. Official Activity Sequence

| # | Activity (L481–488) | Learner action | Teacher action | Required capability | Exists? |
|---|---------------------|----------------|----------------|---------------------|---------|
| 1 | Review shape table (7 letters × 4 positions) | observe/recall | display | positional-form table model | MISSING |
| 2 | Guided tracing of large connected words | trace with pen | demonstrate | trace canvas/layer | MISSING |
| 3 | Write words from memory, then compare | write + self-compare | guide | handwriting input + model compare | MISSING |
| 4 | Pair correction (exchange papers) | compare peer work | orchestrate | peer/annotation model | MISSING |
| 5 | Write the two sentences in orderly hand | write sentences | walk & guide | sentence handwriting | MISSING |
| 6 | Display best writing on board | present | select/display | show/collect student work | MISSING |
| 7 | Final dictation (5 words) | write dictated words | pronounce | audio prompt + handwriting capture | MISSING |
| 8 | Explain HW | copy L13 text | assign | copy task + persistence | MISSING |

**EXISTS: 0 · ADAPTABLE: 0 · MISSING: 8.** (P4's stroke-video is a passive *letter animation viewer*, not the required trace/write/capture.)

## 22. Writing Assessment

«**كتابة 3 كلمات متصلة من الإملاء بدقة**» (L495) — a product/performance assessment of connected-word handwriting accuracy from dictation, plus pair correction and board display as formative feedback.

**Model:** **PERFORMANCE-BASED + PRODUCT-BASED + TEACHER OBSERVATION (HYBRID)**; formative during the lesson (pair correction, teacher guidance) and a summative product at the end (3 dictated words). **No numerical scoring model is specified — none invented.**

Current runtime representation: `assessmentRounds` = `show-letter | count-dots | sound` and `discriminationRounds` = `identify | sameordiff | close` — all **letter-recognition** rounds; none captures or evaluates produced handwriting. **No compatible assessment type.**

## 23. Error Taxonomy

The L14 card identifies accuracy expectations but does **not** publish an error taxonomy. Observed correction behaviors (L483 compare-with-model, L484 pair correction, L485 teacher guiding) imply correction, but official sources do **not** enumerate categories.

**Architecture implication (evidence-supported only):** because the lesson's assessment is "write connected words accurately" with explicit model comparison and correction steps, a faithful implementation would eventually need to represent handwriting accuracy/correction. **No error categories are asserted as official facts.**

## 24. L13 → L14 Dependency

| L13 does (per L13 audit) | L14 adds |
|--------------------------|----------|
| Reads a 6-sentence connected text independently | Writes connected words/sentences by hand |
| Parallel-writing step (informal paragraph production, L13 L456) | Formal **handwriting mechanics**: positional forms, connection, tracing, dictation |
| Completes the reading family (Stage IV opens) | Opens the writing family within Stage IV |

**Evidence of continuity:** L14 homework = «نسخ نص المحاضرة 13» (L495) — the official lesson explicitly reuses L13's text as the handwriting-copy source. L13's parallel-writing is prerequisite *production practice*; L14 formalizes the *mechanics* (positional forms/connection). Framework Stage IV goal joins both: «قراءة نصوص وكتابة متصلة» (L86). Dependency: **real and explicit (HW reuse).**

## 25. L14 → L15 Dependency

L15 = «حوار حر موسّع — اعرف فصلك» (Blueprint L497–521): objective «يُجري الطالب حوارًا تعارف موسّعًا (8-10 تبادلات) بدون الرجوع للورقة»; activities are oral/dialogue (modeling, pair practice, mingling, presentations), **no writing step**. L14→L15 dependency is therefore **indirect**: L14 completes the written-production strand, while L15 is oral communication/application preparing for the final exam (L502: «المحاضرة قبل الأخيرة تُعدّ للاختبار النهائي»). No explicit writing prerequisite binds L15. (L15 not fully audited.)

## 26. Current Schema Compatibility

| Requirement | Contract element | L14 official content | Verdict |
|-------------|------------------|----------------------|---------|
| 15-root schema | `letters, strokeGuides, words, p4WritingPracticeDeferred…` | no writing-task/handwriting result root key | FAIL |
| Positional forms | `strokeGuides` = one video per **letter** (L240–272; length must = letters.length) | requires 4 forms/letter + connected words | CONFLICT |
| Handwriting targets | `strokeGuides[].steps` (video steps) | passive animation ≠ produced writing | FAIL |
| Writing sequence (trace→write→correct) | — | no sequence model | MISSING |
| Word-writing / sentence-writing tasks | — | no root key | MISSING |
| Paragraph writing | — | no root key | MISSING |
| Handwriting assessment | `assessmentRounds` = letter-level | no produced-work assessment | MISSING |
| Error categories / feedback | — | no model | MISSING |
| Student-produced writing | — | no input/capture/persistence | MISSING |
| Diacritics in words/sentences | whitelist `[\u0621-\u064A]` L82–83 | شدة/سكون/حركات required | FAIL |

## 27. P1–P7 Compatibility

| Phase | Verdict | Reason |
|-------|---------|--------|
| P1 | NOT APPLICABLE | no new letter sound |
| P2 | NOT APPLICABLE | no target-letter phonemic stage |
| P3 | NOT APPLICABLE | no letter reveal |
| **P4** | **FAIL** | P4 is passive letter-stroke **video playback + step reveal** (`stroke-video.js`); no input, no ink, no canvas, isolated letter only, no positional/connected forms, no capture/compare/feedback |
| P5 | FAIL | word cards are letter-anchored recognition, not writing |
| P6 | FAIL | letter-sound discrimination; `silent-dictation.v1` is a prompt→reveal state machine, not handwriting capture |
| P7 | FAIL | letter-level assessments only |

**P4 is NOT a pass** despite being named "writing": its actual capability (play-only animation) does not match L14's required production competence.

## 28. Activity Engine Compatibility

| Capability | Status |
|------------|--------|
| Letter stroke practice (passive) | EXISTS (`stroke-video.js`) — passive only |
| Positional writing | MISSING |
| Connected writing | MISSING |
| Word writing | MISSING |
| Sentence writing | MISSING |
| Paragraph writing | MISSING |
| Handwriting input | MISSING |
| Tracing | MISSING |
| Model hide/show | MISSING |
| Compare (vs. student work) | MISSING |
| Correction | MISSING |
| Teacher annotation | MISSING |
| Student submission | MISSING |
| Writing assessment | MISSING |

**EXISTS: 1 (passive stroke video) · ADAPTABLE: 0 · MISSING: 13 · CONFLICT: 0.** The definitions `silent-dictation.v1`/`sentence-production.v1` exist in `activity-definitions.js` but are **prompt/reveal or answer-production state machines with no ink capture**, and are not used by any current lesson. They do not satisfy L14's handwriting production requirement.

## 29. Current P4 Writing Capability

Exact capability of the implemented P4 (`stroke-video.js`):

| Aspect | Actual capability |
|--------|-------------------|
| Input mechanism | **None** — video playback + keyboard/Space advance |
| Target granularity | One isolated **letter** per `strokeGuide` |
| Letter vs word | **Letter** only |
| Isolated vs connected | **Isolated** only |
| Positional forms | **None** (no initial/medial/final model) |
| Stroke order | Pre-rendered video `steps` (passive viewing) |
| Model visibility | Always visible (video) |
| Hide/show model | **No** |
| Compare | Static 4-letter card grid («الحروف الأربعة») — **not** vs. student work |
| Feedback | **None** |
| Assessment | **None** |
| Persistence | **None** |
| Teacher control | Phase navigation only (Space / top bar) |

The P4 compare screen (`renderP4Compare`) lists the lesson's 4 letters (`LESSON.strokeGuides.length`) — it is structurally bound to the 4-letter-per-lesson letter model and cannot host 7 shape-changing letters with 4 positions each, let alone words/sentences.

## 30. Cross-Lesson Ownership

| Item | L01–L13 status | L14 classification |
|------|----------------|--------------------|
| Letters ع غ ح خ ك م ه (recognition) | Taught (L02/L05/L06/L07) | **REVIEW** (recognition) / **NEW** (positional handwriting) |
| Other letters (all 28) | Taught L01–L07 | PREREQUISITE |
| Harakat/shadda/sukun | Taught L07/L09/L10 | PREREQUISITE / APPLICATION |
| Madd | Taught L12 | APPLICATION (عَرَبِيَّة) |
| Lam al-ta'rif | Taught L11 | APPLICATION (اللُّغَة) |
| Connected writing (production) | L13 parallel-writing step (informal) | **NEW FORMAL SKILL** |
| Positional/connected forms | — | **NEW CONTENT** |
| Dictation (produced handwriting) | — | **NEW CONTENT** |

**letter recognition ≠ letter handwriting form:** the 7 letters are NOT new letters (the official card says «مراجعة»), but their **positional connected forms are genuinely new handwriting content.**

## 31. Blockers

| Blocker | Severity | Evidence | Consequence |
|---------|----------|----------|-------------|
| No student handwriting input/capture at all | **CRITICAL** | `stroke-video.js` = play-only; schema has no input/capture key | Core objective «يكتب الطالب…» unrepresentable |
| No positional/connected-form model; `strokeGuides` is per-letter isolated video | **CRITICAL** | schema L240–272; objective L476; 4 positions L481 | Cannot teach/represent the four positional forms |
| No tracing canvas / trace layer | **HIGH** | Framework L188 «Canvas للتتبع» | Step 2 impossible |
| No compare-with-model overlay for produced work | **HIGH** | L483/L188 «مقارنة overlay» | Steps 3–4 impossible |
| No dictation capture (silent-dictation.v1 is prompt→reveal only) | **HIGH** | L487; `activity-definitions.js` L260–277 | Step 7 + assessment impossible |
| No peer/teacher correction / annotation / feedback model | **MEDIUM** | L484/L485/L486 | Formative feedback impossible |
| No persistence of student writing | **MEDIUM** | — | HW copy (L495) and display (L486) impossible |
| Orthography marks (شدة/سكون/حركات) outside whitelist | **MEDIUM** | schema L82–83; official words/sentences | Exact official content unrepresentable |

## 32. CASE Classification

**CASE B — OFFICIAL, WELL-DEFINED; CURRENT ARCHITECTURE CANNOT REPRESENT IT FAITHFULLY.**

Conditions met: identity clear (Blueprint L466–495 + Framework L85–87/L188), pedagogy decisive (WRITING/HANDWRITING), content specified (7 letters, 3 words, 2 sentences, 8 activities, HW, assessment). The runtime gap is total: 0/8 activities exist; P4 is passive; no input/capture model; schema is per-letter isolated-video. **This is an architecture capability gap, not a curriculum defect.**

## 33. Architectural Implications

*Evidence only — no design, no code, no schema proposal.*

- **Handwriting requires a different granularity than letter cards:** production of glyphs (isolated/initial/medial/final) plus connected words is not expressible by an isolated-letter video model.
- **Positional forms require contextual letter representation:** each letter needs 4 positional variants and joins.
- **Connected writing requires word/connection-level modeling** (not per-letter cards).
- **Student writing requires an input/capture capability** (handwriting surface), which the platform lacks entirely.
- **Trace/model/overlay/compare require a layered canvas model** (trace layer, hide/show model, comparison overlay) — matching Framework L188.
- **Writing assessment may require product/performance representation** (capture of produced handwriting + model comparison), beyond letter-level rounds.
- **P4 is insufficient as-is** and its letter-bound `strokeGuides` contract (length = letters.length) is incompatible with a 7-letter × 4-position + word/sentence writing lesson.
- **Writing is a distinct family**, evidenced by objective + activities + assessment — joining the already-confirmed Letters, Orthography, and Reading families. **No Writing Engine is designed in this audit.**

## 34. Updated L01–L14 Curriculum Map

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
| **14** | **الكتابة المتصلة — الحروف في مواضعها** | **WRITING (Handwriting / Connected Writing)** | **Unsupported (this audit)** |

Prior classifications: no correction required by new evidence.

## 35. Emerging Pedagogical Families

| Family | Members | Status |
|--------|---------|--------|
| A — LETTER ACQUISITION | L01–L04 (+part 05/06) | runtime-supported |
| B — ORTHOGRAPHY / DIACRITICS | L07, L09, L10, L12 | recurring; unsupported |
| C — GRAMMAR / READING CONVENTION | L11 | confirmed; unsupported |
| D — READING | L13 | confirmed; unsupported |
| **E — WRITING** | **L14** | **established this audit; unsupported** |
| F — COMMUNICATION / VOCABULARY | L05, L06, L15 (pending) | evidence pending |
| G — ASSESSMENT / REVIEW | L08, L16 (pending) | midterm documented |

**L14 establishes E — WRITING as a distinct first-class family** (objective = handwrite connected words with positional forms; activities = trace/write/correct/dictate; assessment = write 3 dictated connected words) — not merely a title containing "writing".

## 36. Evidence Confidence

| Conclusion | Confidence | Basis |
|------------|-----------|-------|
| L14 identity/family/objective | HIGH | Blueprint L466–495 (complete card) |
| Handwriting + positional forms + connected writing required | HIGH | L476 + L481–488 + L495 |
| Dictation production + recorded/copy HW | HIGH | L487/L495 |
| P4 is play-only, no input | HIGH | `stroke-video.js` full read |
| Schema cannot represent positional/connected writing or capture | HIGH | schema L240–272 + whitelist L82–83 |
| Writing is a distinct family | HIGH | objective + activities + assessment |
| Exact positional glyph forms enumerated | LOW/MISSING | card references table but does not reproduce it (marked MISSING, not invented) |
| Dictation's exact 5 words | MISSING | not published in card |

## 37. Protected-File Integrity

Pre-audit and post-audit SHA-256 verified — **0 unexpected changes** across all 12 protected files (`lesson-01…07.js`, `app.js`, `loader.js`, `schema/lesson-schema.js`, `lecture.html`, `css/style.css`). Only file created: `MD/LESSON_14_INVESTIGATION_REPORT.md`. No `lesson-14.js` exists.

## 38. Final Decision

**BLOCKED.**

**Exactly which official capabilities cannot be represented:**
1. **Student handwriting production** — the core objective («يكتب الطالب الكلمات بصورة متصلة صحيحة») requires an input/capture surface; the runtime has none (P4 = passive video).
2. **Positional forms (isolated/initial/medial/final)** — no model exists; `strokeGuides` is per-letter isolated video bound to `letters.length`.
3. **Connected word/sentence writing with model comparison** — no trace layer, hide/show, or overlay.
4. **Dictation writing** — no handwriting capture; `silent-dictation.v1` is a prompt→reveal state machine.
5. **Writing feedback/correction/persistence** — no annotation, peer-compare, or saved student work.
6. **Exact official orthography** — شدة/سكون/حركات rejected by the schema whitelist.

Per protocol the blockers are **not solved here**. No Writing Engine is designed, no schema field proposed, no `lesson-14.js` created. **STOPPED after audit — L15 is not begun.**

---

**Evidence discipline:** OFFICIAL FACTS from Blueprint L466–495 and Framework L85–87/L188; STRUCTURAL EVIDENCE from `schema/lesson-schema.js`, `js/activities/stroke-video.js`, `js/engine/activity-definitions.js`. No LOW-confidence inference promoted to fact; unpublished items (positional glyph table, the 5 dictation words) explicitly marked MISSING EVIDENCE. No source conflicts found.
