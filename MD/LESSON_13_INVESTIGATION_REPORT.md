# LESSON 13 INVESTIGATION REPORT

> **Date:** 2026-09-19
> **Type:** CURRICULUM + PEDAGOGICAL + ARCHITECTURAL EVIDENCE AUDIT — audit only.
> **Verdict:** ⛔ **BLOCKED (CASE B).** Lesson 13 is the official first complete-text READING lesson. The current letter-centric runtime cannot represent connected-text reading, comprehension, oral reading, retelling, or parallel writing.

---

## 1. Executive Verdict

- **Official identity:** Lesson 13 = **«أول نص كامل — القراءة المستقلة»** (The First Complete Text — Independent Reading)
- **Lesson family:** **READING** (first connected-text lesson), with an embedded writing component (parallel paragraph). It opens the Framework's Stage IV «التواصل والتكامل — المحاضرات 13-16».
- **CASE:** **B — official, well-defined, not faithfully representable by the current architecture.**
- **Confidence:** HIGH (Blueprint card + Framework stage map + Framework lesson-map row agree; full 8-step activity sequence provided).
- **Conclusion:** L13's entire design is a teacher-mediated, comprehension-first, **connected-text** reading lesson: teacher reads aloud twice → meaning checks → silent reading with circling → alternating oral reading → oral comprehension → retelling with text hidden → parallel writing → presenting. It requires a **text-based reading primitive** (connected multi-sentence text with full diacritics, word-by-word reveal + audio — Framework L187 «مشغّل النص: تظليل كلمة كلمة مع الصوت — 3 سرعات»), oral-reading assessment («قراءة جملتين من النص بصوت عالٍ بدون مساعدة»), and recorded-reading homework. None of these exist in P1–P7, the activity engine, or the schema — and the exact official text (diacritics incl. shadda, tanwin, sukun) is unrepresentable under the current character whitelist.

## 2. Audit Scope

- Determine the official Lesson 13 identity, family, objective, outcomes, and prerequisites from authoritative curriculum sources only.
- Recover the official text and vocabulary exactly as written (no reconstruction, no normalization).
- Run a reading-specific audit (decoding, oral/silent reading, comprehension, fluency, interaction).
- Audit orthography/Unicode vs. `schema/lesson-schema.js` (no modification).
- Audit P1–P7, activity engine, schema, homework, and assessment compatibility.
- Establish L12→L13 and L13→L14 dependency evidence only; **do not audit L14 deeply**.
- Produce the updated L01–L13 curriculum map and architectural implications WITHOUT designing a Reading Engine.
- Verify protected-file integrity; create only the audit report.

## 3. Source Hierarchy

| Level | Source | Used for |
|-------|--------|----------|
| 1 | `03_Pedagogical Blueprint (…).md` L435–464 | Official L13 card: title, rationale, vocab, sentences, objective, 8-step plan, teacher note, HW, assessment |
| 2 | `01_Pedagogical Framework (…).md` L85–87 | Stage IV «التواصل والتكامل — المحاضرات 13-16»; stage goal «قراءة نصوص وكتابة متصلة وحوار حر موسّع»; exit outcome |
| 2 | `01_Pedagogical Framework` L187 | Lesson-map row 13: «أول نص كامل ◎ يقرأ نصًا ويُعيد روايته \| مشغّل النص: تظليل كلمة كلمة مع الصوت — 3 سرعات» |
| 5 | `MD/LESSON_12_INVESTIGATION_REPORT.md` §14 | Prior audit's L12→L13 dependency statement («يجب تعليمها قبل القراءة المستقلة») |
| 6 | `schema/lesson-schema.js`; `js/lesson-*.js` | STRUCTURAL EVIDENCE — whitelist, 15-root contract, word-modal letter-centrism, activity enums |

**Policy:** runtime behavior is not curriculum evidence. `meta.nextLesson` is never authoritative. Existing `.js` files are structural evidence only.

## 4. Official Evidence

| # | Evidence (exact) | Source | Kind |
|---|------------------|--------|------|
| 1 | Title: «**أول نص كامل — القراءة المستقلة**» | Blueprint L435 | OFFICIAL FACT |
| 2 | Rationale: «الهدف ليس حرفًا جديدًا بل توظيف ما تعلّمه في قراءة حقيقية. النص المترابط أهم من كلمات منفردة» | Blueprint L440 | OFFICIAL FACT |
| 3 | «الحروف الجديدة: توطيد جميع الحروف — لا حروف جديدة» | Blueprint L441 | OFFICIAL FACT |
| 4 | Vocab: «أَذْهَب — جَامِعَة — أَدْرُس — اللُّغَة — العَرَبِيَّة — أُحِبّ» | Blueprint L442 | OFFICIAL FACT |
| 5 | Sentences: «أنا طالبٌ. أذهب إلى الجامعة كل يوم. أدرس اللغة العربية. أحبّ اللغة العربية.» | Blueprint L443 | OFFICIAL FACT |
| 6 | Objective: «يقرأ الطالب نصًا من 6 جمل مستقلًا ويستوعب معناه ويُعيد روايته بكلماته» | Blueprint L445 | OFFICIAL FACT |
| 7 | 8-step minute-by-minute plan (استماع مغلق → استخراج المعنى → قراءة صامتة → قراءة جهرية بالتناوب → أسئلة فهم شفهية → إعادة سرد → كتابة موازية → قراءة 3 طلاب) | Blueprint L450–457 | OFFICIAL FACT |
| 8 | Teacher note: «اختر نصًا بسيطًا جدًا. النجاح في قراءة نص بسيط يبني الثقة…» | Blueprint L459 | OFFICIAL FACT |
| 9 | HW: «قراءة النص بصوت عالٍ في البيت 3 مرات وتسجيل المرة الثالثة» | Blueprint L464 | OFFICIAL FACT |
| 10 | Assessment: «قراءة جملتين من النص بصوت عالٍ بدون مساعدة» | Blueprint L464 | OFFICIAL FACT |
| 11 | Stage: «المرحلة الرابعة │ التواصل والتكامل — المحاضرات 13-16 › الهدف: توظيف كل المهارات في قراءة نصوص وكتابة متصلة وحوار حر موسّع› المخرج:… يقرأ نصًا مستقلًا» | Framework L85–87 | OFFICIAL FACT |
| 12 | Signature activity (Framework lesson map): «مشغّل النص: تظليل كلمة كلمة مع الصوت — 3 سرعات» | Framework L187 | OFFICIAL FACT |
| 13 | First-full-text rationale (L13 card): text-before-word isolation | Blueprint L440 | OFFICIAL FACT |
| 14 | Whitelist `isArabicChar = /^[\u0621-\u064A]$/` | `lesson-schema.js` L82–83 | OFFICIAL FACT (contract) |

## 5. Official Lesson Identity

| Field | Value |
|-------|-------|
| Official number | 13 |
| Official title | **«أول نص كامل — القراءة المستقلة»** |
| Stage | Stage IV — «التواصل والتكامل — المحاضرات 13-16» (Framework L85) |
| Family | **READING** (first connected, multi-sentence text), with a writing sub-step |
| Official target | Read a complete 6-sentence text **independently**, understand meaning, and **retell it in one's own words** (Blueprint L445) |
| New letters | **None** — «توطيد جميع الحروف — لا حروف جديدة» (Blueprint L441) |

## 6. Pedagogical Family

**READING.** The card is titled read-aloud-independent-text; the objective is «يقرأ… ويستوعب معناه ويُعيد روايته بكلماته»; activities 1–6 are all reading-comprehension behaviors (closed-listening, meaning extraction, silent reading, alternating oral reading, oral comprehension questions, retelling). Steps 7–8 add a **writing** component (parallel paragraph about oneself using the same pattern, then 3 students read theirs aloud) — L13 is primarily reading with an embedded writing rehearsal. This is the **first lesson of the READING family** and the first since L01 that is not letter/diacritic acquisition. No letter acquisition.

## 7. Official Objective

«**يقرأ الطالب نصًا من 6 جمل مستقلًا ويستوعب معناه ويُعيد روايته بكلماته**» — three measurable components: (1) read a 6-sentence connected text independently; (2) comprehend meaning; (3) retell in own words. All three are **discourse-level**, not word-level or letter-level.

## 8. Learner Outcome

Framework exit outcome requires: «يقرأ الطالب … نصًا مستقلًا» (Framework L87) — a student who can read a new simple connected text up to quality and accuracy sufficient for independent meaning extraction. L13's page outcome: after the lesson the student can produce an oral re-telling of the official text and a parallel written paragraph in the same pattern (Blueprint L455–457).

## 9. Prerequisites

| Prerequisite | Evidence |
|--------------|----------|
| All 28 letters mastered | L13 = «توطيد جميع الحروف — لا حروف جديدة» (L441); prior lessons 01–07 letters + cards 07–12 diacritics |
| الحركات الثلاث (fatha/damma/kasra) read fluently | Framework L95–100; prerequisite for 09–12 |
| Sukun (L07), Shadda (L09), Tanwin (L10), لام شمسية/قمرية (L11), Madd (L12) | Framework L81–83 stage goal «إتقان الشدة والتنوين واللام الشمسية والقمرية والمدود للوصول لقراءة مستقلة» |
| Continuous-text exposure | L12's explicit dependency: «المدود… يجب تعليمها قبل القراءة المستقلة» (Blueprint L409; L12 report §14) |

The curriculum explicitly positions L12 as the prologue to L13 reading (L12 rationale). The Framework's L81–83 stage goal names reading independence as the *product of* the diacritics stage — of which L12 is the last lesson.

## 10. Full Text Audit

The official card provides **partial text only**. Recovered verbatim; nothing reconstructed:

**Available sentences (Blueprint L443):**
1. أنا طالبٌ.
2. أذهب إلى الجامعة كل يوم.
3. أدرس اللغة العربية.
4. أحبّ اللغة العربية.

**Objective-stated text:** «نص من 6 جمل» (Blueprint L445) — the full text is specified as **6 sentences**, of which **4 are printed** in the card; the remaining 2 sentences are **not given verbatim** anywhere in the L13 card and are not reconstructed here.

**Vocabulary block (Blueprint L442, verbatim):** أَذْهَب، جَامِعَة، أَدْرُس، اللُّغَة، العَرَبِيَّة، أُحِبّ (note: «جَامِعَة» is in the vocabulary list but absent from the four printed sentences; the printed sentences add «الطالب، كل، يوم، إلى»).

**Structural units (from activities, no invention beyond what steps imply):**
- Sentence groups: yes (4–6 simple Subject+Predicate / VSO sentences)
- Repeated pattern: yes — sentence 3 and 4 share «أ… اللغة العربية»; the parallel-writing step (7) explicitly asks students to mirror "نفس النمط" (same pattern)
- Dialogue turns: no (monologue style, self-introduction narrative)
- Teacher prompts: comprehension Q&A «كم جملة في النص؟ من هو المتحدث؟ أين يذهب؟» (L451)
- Question/answer structures: oral comprehension questions (L454, L455)

**Full verbatim 6-sentence text status:** **PARTIAL / MISSING EVIDENCE** for sentences 5–6. The identity, theme, and pattern are fully clear; the exact 2 missing sentences are not auditable from available sources.

## 11. Vocabulary Audit

| Word | Official form | Diacritics/marks | Status in curriculum |
|------|---------------|------------------|----------------------|
| أَذْهَب | أ+ذ+ه+ب | فتحة on أ، سكون on ذ، فتحة on ه | APPLICATION (verb, common) |
| جَامِعَة | ج+ا+م+ع+ة | فتحة on ج، كسرة on م، تاء مربوطة ة | APPLICATION (madd-alif + ة) |
| أَدْرُس | أ+د+ر+س | فتحة on أ، سكون on د، ضمة on ر | APPLICATION |
| اللُّغَة | ا+ل+ل+غ+ة | شدة + ضمة on ل، فتحة on غ، ة | APPLICATION (lam al-ta'rif + ة، seced) |
| العَرَبِيَّة | ا+ل+ع+ر+ب+ي+ة | شدة، فتحات/كسرة، ة | APPLICATION (‑يـة pattern) |
| أُحِبّ | أ+ح+ب | ضمة on أ، كسرة on ح، **شدة on ب** | APPLICATION |

All six are **APPLICATION/recycling vocabulary** — letters all previously taught (01–07), orthography reuses madd (جَامِعَة), shadda (أُحِبّ، اللُّغَة), lam al-ta'rif (اللُّغَة، العَرَبِيَّة), tanwin (طالبٌ). No NEW letters and no letter-teaching vocabulary; the lesson is reading these diacritically-marked forms *in context*. All items carry diacritics explicitly in their official spelling.

## 12. Sentence Structure

- **Pattern 1 (original):** أنا طالبٌ — إسمية (subject + predicate noun), تنوين على خبر
- **Pattern 2 (المكان):** أذهب إلى الجامعة — فعلية (verb + prepositional phrase with lam-al-ta'rif noun), كل يوم adverbial
- **Pattern 3/4 (بنية متوازية):** أدرس اللغة العربية / أحبّ اللغة العربية — verb + object noun phrase with ال

The printed pattern is highly controlled and deliberately recyclable for the parallel-writing task («نفس النمط»). The text is a 4–6-sentence first-person narrative — the canonical "first connected text" for this level.

## 13. Reading-Specific Audit

| Dimension | Officials require? | Evidence | Current runtime support |
|-----------|--------------------|----------|--------------------------|
| A. Decoding unfamiliar words | Yes (silent reading + circling unknown words) | L452 | Covered at word level only in letter lessons (no text context) — PARTIAL concept |
| B. Word reading (specific words) | Yes (the 6 vocabulary items) | L442 | P5/P6 word cards exist — but diacritic forms unrepresentable (see §14) |
| C. Sentence reading | **Yes** — assessment = «قراءة جملتين من النص بصوت عالٍ» | L464 | No sentence unit exists — FAIL |
| D. Connected-text reading | **Yes** — «نص من 6 جمل مستقلًا» | L445/L443 | No text primitive — **FAIL** |
| E. Comprehension | **Yes** — «يستوعب معناه» + oral comprehension Q&A | L445/L454 | No comprehension interaction — **FAIL** |
| F. Oral reading | **Yes** — «قراءة جهرية بالتناوب» + assessment | L453/L464 | No oral-reading control — **FAIL** |
| G. Silent reading | Yes (with circling tool) | L452 | Not represented — FAIL |
| H. Pronunciation | Assessed implicitly via accuracy of oral reading | L464 | Letter pronunciation exists; sentence prosody not — FAIL |
| I. Fluency | Not explicitly as speed/rhythm in card; Framework player offers 3 reading speeds (word-by-word) | L187 | No fluency model — FAIL |
| J. Accuracy | Yes — «بدون مساعدة» (unaided) | L464 | Letter-accuracy exists; text accuracy not — FAIL |
| K. Meaning extraction | **Yes** — comprehension questions (كم جملة؟ من المتحدث؟ أين يذهب؟) | L451/L454 | No question-answer model — FAIL |
| L. Interaction | **Yes** — whole class: teacher reads aloud, students take turns, pairs correct, 3 present | L450/L453/L456/L457 | No classroom orchestration model — FAIL |

**Reading in L13 means:** connected, plausible, meaning-bearing multi-sentence Arabic text read silently AND aloud, comprehended, questioned about, retold, and finally re-written/re-read by students — a full discourse-level reading cycle. Only the letter-word level (A/B-partial) exists in the current runtime.

## 14. Orthography / Unicode Audit

**Official text marks present in the L13 vocabulary and sentences (verified codepoints):**

| Mark | Codepoint | Example | In whitelist `[\u0621-\u064A]`? |
|------|-----------|---------|----------------------------------|
| فتحة | U+064E | أَ، جَـ | ❌ |
| ضمة | U+064F | نُور، أُ | ❌ |
| كسرة | U+0650 | لغة | ❌ |
| **شدة** | U+0651 | أُحِبّ، اللُّغَة، العَرَبِيَّة | ❌ |
| سكون | U+0652 | أَذْهَب، أَدْرُس | ❌ |
| تنوين (ضمّ) | U+064C | طالبٌ | ❌ |
| تاء مربوطة ة | U+0629 | جَامِعَة، اللُّغَة، العَرَبِيَّة | ✅ |
| همزة أ | U+0623 | أَذْهَب، أَدْرُس، أُحِبّ | ✅ |
| alif | ا | الجامعة | ✅ |

**1. Supported chars:** all base letters (incl. ة U+0629, أ U+0623) — and only letters.
**2. Rejected marks:** fatha, damma, kasra, **shadda**, sukun, tanwin — **every diacritic** present in the L13 text.
**3. Exact L13 text representable?** **NO** — the sentence «أدرس اللغة العربية» written with its shadda/فتحات cannot be stored as officially written; «أُحِبّ»'s shadda is central to correct reading.
**4. Stripping marks changes the target?** **YES, critically.** This is a *reading* lesson: شدة/سكون/تنوين/حركات are the very features the student must decode fluently (شدة on محبوب/بّ، سكون in أَذْهَب). Without them the "connected text" is a different, easier text and the prior 09–12 instruction cannot be exercised. Silent stripping is forbidden by the audit rules and would falsify the reading target.

## 15. Official Activity Sequence

| # | Activity (Blueprint L450–457) | Learner action | Teacher action | Required capability | Exists? |
|---|-------------------------------|----------------|----------------|---------------------|---------|
| 1 | الاستماع المغلق (books closed) | Listen, no text | Reads aloud ×2 | audio/voice playback, controlled reveal-off | MISSING |
| 2 | استخراج المعنى | Answer (كم جملة؟ من المتحدث؟ أين يذهب؟) | Asks 3 questions | question/answer + sentence-count | MISSING |
| 3 | القراءة الصامتة + وضع دائرة | Silent read, circle unknown | Observe | text display + annotation/marking | MISSING |
| 4 | قراءة جهرية بالتناوب | Each reads one sentence aloud | Sequentially assigns | sentence-unit sequencing + audio/oral capture | MISSING |
| 5 | أسئلة الفهم الشفهية | Answer free Arabic questions | Asks about meaning | comprehension Q&A model | MISSING |
| 6 | إعادة السرد (text hidden) | Retell with own words | Collects retelling | oral retelling + text-hide | MISSING |
| 7 | كتابة موازية (نفس النمط) | Write parallel paragraph | Guides | writing canvas (paragraph-level) | MISSING (P4 = letter strokes) |
| 8 | قراءة الطلاب لما كتبوه | 3 students read theirs aloud | Facilitates | audio + peer presentation | MISSING |

Framework's signature capability (L187) adds two concrete primitives: **word-by-word text highlighting** and **3-speed audio playback**.

| Capability | Existing? |
|------------|-----------|
| Text unit (multi-sentence) | MISSING |
| Word-by-word highlight | MISSING |
| Line/sentence progression | MISSING |
| Audio playback (3 speeds) | MISSING (audio refs exist only for letters/words) |
| Comprehension Q&A | MISSING |
| Annotation (circle unknown) | MISSING |
| Oral reading capture | MISSING |
| Paragraph writing canvas | MISSING |
| Recording (homework) | MISSING |

## 16. Official Assessment

«**قراءة جملتين من النص بصوت عالٍ بدون مساعدة**» — an **oral reading accuracy/independence** assessment on connected text, with no scaffolding. Current `assessmentRounds` enum = `show-letter | count-dots | sound` (schema L511) — all three assess *letters*, none assesses **sentence-level oral reading**. `discriminationRounds` (identify/sameordiff/close) is also letter-sound. The official assessment dimension (decoding/sentence-reading/pronunciation/fluency on real text) has **no representation**.

## 17. Official Homework

«**قراءة النص بصوت عالٍ في البيت 3 مرات وتسجيل المرة الثالثة**» — requires (1) connected-text audio practice at home and (2) a **recorded reading** submission. The runtime has no recording primitive; its audio model is play-only, namespaced to lesson assets. Recording a *student's voice* is outside the model entirely.

## 18. L12 → L13 Dependency

**Documented & critical.** L12's own rationale: «المدود تؤثر على المعنى… يجب تعليمها قبل القراءة المستقلة» (Blueprint L409). Framework stage goal: «إتقان الشدة والتنوين واللام الشمسية والقمرية والمدود **لوصول لقراءة مستقلة**» (L82–83). L13's first activity is *listening to a text read aloud* — the first exercise to make all of L07–L12 orthographic knowledge productive. The 6 words exercise: madd (جَامِعَة), shadda (أُحِبّ، اللُّغَة), lam-al-ta'rif (اللُّغَة), tanwin (طالبٌ), sukun (أَذْهَب) — L13 reads *exactly* the marks L07–L12 taught. Dependency: **direct and complete**.

## 19. L13 → L14 Dependency

L14 = «الكتابة المتصلة — الحروف في مواضعها» (Blueprint L466–491): handwriting of the 7 shape-changing letters (ع غ ح خ ك م ه) in their 4 positions; vocab عَرَبِيَّة / مَعْرِفَة / حَقِيقَة; sentence اللُّغَةُ العَرَبِيَّةُ جَمِيلَة. A full L14 audit is **not** performed here. Explicit L13→L14 dependency evidence: L13's parallel-writing step (7) already demands students produce connected Arabic writing, and L13's presentation step (8) exposes handwriting quality — so L13 *practices* the writing that L14 then *teaches systematically*. The Framework Stage IV outcome «كتابة فقرة صحيحة» (L87) unifies both. Dependency is real but **indirect**; it does not affect L13's own blocking.

## 20. Current Schema Compatibility

| Requirement | Contract element | L13 official content | Verdict |
|-------------|------------------|----------------------|---------|
| 15-root lesson schema | `letters`, `words`, `targetLetters`, `p6Demo`, `assessmentRounds`… | no `text/paragraph/sentence` concept | FAIL |
| `testkernfeld` word-modal `words[].chars[]` | single-letter char array | connected text ≠ word cards | FAIL |
| `targetLetters ≥ 2` | meta | **«لا حروف جديدة»** — L13 has zero target letters | FAIL (contract requires ≥2) |
| diacritics | whitelist `[\u0621-\u064A]` L82–83 | شدة/سكون/تنوين/حركات required | FAIL |
| Sentence/text structural unit | — | absent root key | FAIL |
| Reading/comprehension features | — | no key | FAIL |
| 3-speed audio + word highlight | loader/player data | not in schema | FAIL |

No schema modification was made. L13 simply *has no home* in a letter-centric 15-root data model.

## 21. P1–P7 Compatibility

| Phase | Verdict | Reason |
|-------|---------|--------|
| P1 | NOT APPLICABLE | no new letter to sound-model |
| P2 | NOT APPLICABLE | no target-letter phonemic stage |
| P3 | NOT APPLICABLE | no letter reveal |
| P4 | PARTIAL | letter-stroke writing exists; L13's paragraph writing isn't a stroke drill |
| P5 | PARTIAL | word cards exist but are target-letter-anchored; L13 words aren't letter-taught & carry diacritics |
| P6 | FAIL | discrimination rounds = letter-sound; L13 = text comprehension/oral reading |
| P7 | FAIL | assessment types = letter-level; L13 = sentence oral reading |

**4 × NOT APPLICABLE, 2 × PARTIAL, 2 × FAIL** — no phase can host connected-text reading.

## 22. Activity Engine Compatibility

| Capability | Status |
|------------|--------|
| Reading connected text | MISSING |
| Sequential/line-by-line reveal | MISSING |
| Word-by-word highlight (Framework L187) | MISSING |
| Sentence focus/stepping | MISSING |
| Teacher-controlled progression (×2 reading, closed books) | MISSING |
| Comprehension Q&A | MISSING |
| Oral reading assessment round | MISSING |
| 3-speed audio playback | MISSING |
| Audio recording (HW) | MISSING |
| Text annotation (circle unknown) | MISSING |
| Paragraph writing overlay | MISSING |

**EXISTS: 0 · ADAPTABLE: 0 · MISSING: 11 · CONFLICT: 0.** The №known activity engine has no reading/annotation/oral-recording/paragraph capabilities.

## 23. Cross-Lesson Ownership

| Item | Ownership | Classification |
|------|-----------|----------------|
| Letters (all) | Lessons 01–07 (official 01–04) | REVIEW |
| Fatha/Damma/Kasra | L02–L04 | REVIEW (APPLICATION in text) |
| Sukun | L07 | REVIEW (APPLICATION: أَذْهَب) |
| Shadda | L09 | REVIEW (APPLICATION: أُحِبّ) |
| Tanwin | L10 | REVIEW (APPLICATION: طالبٌ) |
| Lam ش/ق | L11 | REVIEW (APPLICATION: اللُّغَة) |
| Madd | L12 | REVIEW (APPLICATION: جَامِعَة) |
| Vocabulary items | 01–04 words + patterns | APPLICATION (recycled/reused by design) |
| **Connected 6-sentence text** | — | **NEW CONTENT (L13)** |
| Comprehension/retelling/oral reading | — | **NEW CONTENT (L13)** |

No conflicting ownership: every *letter/diacritic* L13 uses is deliberately review/application; the genuinely NEW items are the text unit, comprehension, and oral-reading cycle.

## 24. Blockers

| Blocker | Severity | Evidence | Consequence |
|---------|----------|----------|-------------|
| No connected-text representation anywhere | **CRITICAL** | Objective L445 «نص من 6 جمل»; schema 15-root has no text key; Framework L187 text-player | Core reading objective unrepresentable |
| Diacritics (shadda/sukun/tanwin/harakat) rejected by whitelist | **CRITICAL** | schema L82–83; L442/L443 official forms | Exact official text unrepresentable; stripping destroys the reading target |
| No comprehension/meaning-extraction model | **CRITICAL** | L445/L451/L454 | «يستوعب معناه» unrepresentable |
| No oral-reading assessment round | **HIGH** | L453/L464 vs schema L511 | Official assessment (reading 2 sentences aloud unaided) impossible |
| No text-player primitives (word highlight, 3-speed audio) | **HIGH** | Framework L187 | Signature activity impossible |
| No recording capability | **MEDIUM** | L464 HW «تسجيل المرة الثالثة» | Homework impossible |
| No paragraph-writing canvas | **MEDIUM** | L456 كتابة موازية | Step 7/8 impossible (P4 only letter strokes) |
| Full official text partially unpublished (2 of 6 sentences not verbatim in card) | **MEDIUM** | L443 vs L445 | Exact final text requires author's text file (can't invent) — but this does NOT cause CASE B by itself |

## 25. CASE Classification

**CASE B — OFFICIAL, WELL-DEFINED; CURRENT ARCHITECTURE CANNOT REPRESENT IT FAITHFULLY.**

Conditions met: identity clear (Blueprint L435–445), pedagogy decisive (READING), content specified (vocab + 4/6 sentences + 8 activities), and the runtime gap is total and technical (no text unit, whitelist, no comprehension/oral-read/record capabilities). The partial-text status (2 missing sentences) is a supplementary content-completeness issue, not the reason for CASE B — even with the exact remaining sentences supplied, no current component could hold the lesson.

## 26. Architectural Implications

*Evidence only — no design, no code, no schema proposal.*

- **Reading requires a completely different data axis:** connected multi-sentence text with orthography, sentence boundaries, and word/sentence units — orthogonal to the letter/word card model.
- **Comprehension is a separate interaction model:** question/answer, meaning-extraction, and retelling are dialogue-adjacent, not round-based letter discrimination.
- **Text progression primitives are required:** word/sentence highlight, sequencing reveal, re-read/×2 mode, 3 speeds — a "presentation/player" layer.
- **Phonetics/audio is bidirectional for L13:** playbacks exist; but L13 also needs oral-reading capture (assessment + HW) and possibly TTS — the current audio is play-only.
- **Writing grows past strokes:** paragraph-scale writing with peer/teacher correction demands a bigger canvas model than P4.
- **This is the first lesson of a distinct READING family** (Stage IV), following the confirmed diacritics family — the audit trail now evidences **at least three families** (Letters, Orthography, Reading), with Writing (L14) and Communication (L15–16) already visible on the Framework map. **No Reading Engine is designed in this audit.**

## 27. Updated L01–L13 Curriculum Map

| Lesson | Official Title | Pedagogical Family | Runtime Status |
|--------|----------------|--------------------|----------------|
| 01 | الحروف الأولى — ب ت ث ن | LETTER ACQUISITION | Implemented |
| 02 | م ي ا — وأول مقاطع | LETTER ACQUISITION (+syllables) | Implemented (re-sequenced) |
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
| **13** | **أول نص كامل — القراءة المستقلة** | **READING** | **Unsupported (this audit)** |

Corrections to earlier map: none required by new evidence. L13 classification (READING) is *new* and cited to Blueprint L435/L445 + Framework L85–87/L187.

## 28. Emerging Pedagogical Families

| Family | Members | Evidence status |
|--------|---------|-----------------|
| A — Letter Acquisition | L01–L04 | runtime-supported |
| B — Orthography / Diacritics | L07, L09, L10, L12 | confirmed recurring (L12 report); unsupported |
| C — Grammar / Reading Convention | L11 | confirmed; unsupported |
| **D — Reading** | **L13** | **evidenced here (first member); unsupported** |
| E — Writing | L14 (pending) | evidence visible on card; not audited |
| F — Communication / Vocabulary | L05, L06, L15 (pending) | title-level evidence only |
| G — Assessment / Review | L08, L16 (pending) | midterm documented; final pending |

**L13 proves a distinct Reading family exists as a first-class curricular track**, crafted explicitly as «أول نص كامل». It is not a variant of letter lessons.

## 29. Evidence Confidence

| Conclusion | Confidence | Basis |
|------------|-----------|-------|
| L13 identity/family/objective | HIGH | Blueprint L435–445 (direct card) |
| Reading nature (connected text, comprehension, retelling) | HIGH | L445 objective + L450–457 steps |
| Oral-read assessment + recording HW | HIGH | L464 (verbatim) |
| Whitelist excludes all required marks | HIGH | schema L82–83 + codepoints |
| No text/comprehension/read activity anywhere | HIGH | schema + activity inventory |
| Reading family exists officially | HIGH | L435 title/L445 + Framework L85–87/L187 |
| Exact 6-sentence text complete? | MEDIUM (content gap) | 4 sentences printed, 2 not — marked MISSING, not reconstructed |
| Architecture conclusion (Reading engine eventually needed) | MEDIUM | consistent sources; final framing depends on L14–L16 audit |

## 30. Protected-File Integrity

Pre-audit and post-audit SHA-256 verified — **0 unexpected changes** across all 12 protected files (lesson-01…07.js, app.js, loader.js, schema/lesson-schema.js, lecture.html, css/style.css). Nothing was created except `MD/LESSON_13_INVESTIGATION_REPORT.md`; no `lesson-13.js` exists.

## 31. Final Decision

**BLOCKED.**

**Why:** Official Lesson 13 («أول نص كامل — القراءة المستقلة») is a connected-text READing lesson requiring: a multi-sentence Arabic text with full diacritics (fatِح/damma/kasra **شدة**/سكون/تنوين — all rejected by the schema's `[\u0621-\u064A]` whitelist, schema L82–83), word-by-word highlight + 3-speed audio player (Framework L187), comprehension Q&A, silent-reading annotation, oral reading assessment («قراءة جملتين… بدون مساعدة», L464), recorded-reading homework, and paragraph writing — **none of which exist** in the 15-root schema, P1–P7, or the activity engine (0 existing/adaptable capabilities found). Representing L13 under the letter pipeline would be a category error, not compatibility.

Per protocol the blockers are **not solved here**. No Reading Engine is designed, no schema proposed, no `lesson-13.js` created. **STOPPED after audit — L14 is not begun.**

---

**Evidence discipline:** all OFFICIAL FACTS from Blueprint L435–464 and Framework L85–87/L187; whitelist facts from `lesson-schema.js` L82–83 (STRUCTURAL/OFFICIAL contract); no inference promoted beyond MEDIUM confidence; the partial-text gap is explicitly marked MISSING EVIDENCE, not filled. No conflicts found among authoritative sources.