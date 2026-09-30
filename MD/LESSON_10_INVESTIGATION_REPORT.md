# LESSON 10 — INVESTIGATION / IMPLEMENTATION REPORT

> **Date:** 2026-09-19
> **Task rule:** SOURCE FIRST. CURRICULUM SECOND. CONTRACT THIRD. Implementation only if valid. Never reverse this order. Do not force L10 into the P1–P7 letter model.
> **Verdict:** ⛔ **CASE B — NOT fully supported.** No `js/lesson-10.js` is created. No template file is modified. This report identifies the gaps and what the pedagogical source/architect must decide before any implementation.

---

## 1. Executive Summary

Official Lesson 10 is **«التنوين — الاسم في الجملة»** — a **grammar / orthography (diacritics) lesson** teaching the three **tanwin** endings (ً ٍ ٌ). It is NOT a plain new-letter lesson, and it cannot be represented by the current P1–P7 letter pipeline without falsifying its pedagogy. Three independent, non-fixable-within-contract blockers:

1. **Lesson type mismatch:** the official core (reading nouns with double-Fatha/Damma/Kasra endings, the «بِطاقات الثلاثية الملوّنة» red/yellow/green tanwin-sort game, and the grammatical reading objective) has **no field and no activity type** in the runtime. P6 = `identify / sameordiff / close`; P7 = `show-letter / count-dots / sound`.
2. **Orthography incompatibility:** every official vocabulary word (طَالِبٌ، كِتَابًا، جَامِعَةٍ، وَلَدٌ) contains a tanwin mark — U+064B (ً), U+064C (ٌ), U+064D (ٍ) — all **outside** the schema's `isArabicChar` whitelist `[\u0621-\u064A]` (`lesson-schema.js` L82–84). The words cannot be stored verbatim; stripping the tanwin destroys the very feature the lesson teaches.
3. **Letter-set / vocabulary impossibility:** the officially named new letters **د ذ ط ظ** are exactly the **already-implemented runtime lesson-04 letters** (`js/lesson-04.js` → `targetLetters: [د، ذ، ط، ظ]`). Re-using them in L10 = cross-lesson leakage (L04 target letters). AND the official L10 vocabulary contains **no word containing ذ or ظ** at all — so even a hypothetical letter lesson would fail the vocabulary gate for two letters.

Additionally, the L08/L09 precedent applies: the blueprint's 16-pedagogy-lesson numbering and the runtime 01–07 letter-file numbering are two different sequences. Runtime `meta.nextLesson` — which points to «الحروف (ل)» — is editorial only (صupporting, never sufficient), and ل belongs to Blueprint Lesson 11.

---

## 2. Official Lesson 10 Identity

| Field | Official value | Source |
|-------|----------------|--------|
| Official lesson number | **10** | `03_Pedagogical Blueprint`, L342 |
| Official title | **«التنوين — الاسم في الجملة»** (Tanwin — the noun in the sentence) | Blueprint L342 |
| Official new letters | **د — ذ — ط — ظ** | Blueprint L348 |
| Official vocabulary | **طَالِبٌ — كِتَابًا — جَامِعَةٍ — وَلَدٌ** | Blueprint L349 |
| Official target sentences | **هُوَ طَالِبٌ. أَقْرَأُ كِتَابًا.** | Blueprint L350 |
| Official objective | «يقرأ الطالب الأسماء المنوّنة ويفهم كيف تغيّر نهاية الاسم حسب موقعه في الجملة» | Blueprint L352 |
| Sequencing rationale | «التنوين يأتي بعد إتقان الحركات الثلاث — فهو امتداد لها. يُقدَّم مع الحروف المتشابهة (د/ذ — ط/ظ)» | Blueprint L347 |
| Teacher note | «لا تُعقّد شرح التنوين بالمصطلحات النحوية. قدّمه كـ(نهايات الأسماء)» | Blueprint L366 |
| Homework | «تشكيل 5 أسماء بالتنوين المناسب: 2 بالضم + 2 بالفتح + 1 بالكسر» | Blueprint L371 |
| Assessment | «قراءة جملتين بتنوين صحيح: واحدة بالضم وواحدة بالفتح» | Blueprint L371 |

## 3. Authoritative Evidence

| Priority | Source | Evidence |
|----------|--------|----------|
| 1 | `03_Pedagogical Blueprint (…).md` | Lesson-10 card L342–371 (title, letters, vocab, sentences, objective, minute-by-minute plan, homework/assessment). Grouping table L56: «5 — المحاضرتان 9-10 \| ج د ذ ط ظ + الشدة والتنوين» — درس 10 = التنوين + د ذ ط ظ |
| 2 | `01_Pedagogical Framework (فلسفة التدريس).md` | L103: «التنوين ً ٍ ٌ \| المحاضرة 10 \| امتداد الحركات الثلاث \| الحركات الثلاث» — tanwin is lesson 10's official content. L184: «10 \| التنوين — نهايات الأسماء ◎ يقرأ الأسماء المنوّنة \| البطاقات الثلاثية الملوّنة: حمراء/صفراء/خضراء». L207: «9-10 \| المحاضرات 9-12: علامات الضبط» |
| 3 | `md/Pedagogy/PHONETIC_REPRESENTATION_DECISION_RECORD.md`, `md/Governance/QD-16_…md` | Phoneme convention `'/' + char + '/'` for BASE LETTERS only; **no representation for tanwin/diacritics** |
| 4 | `04_Instructional Blueprint (…).md` | Covers Lesson 01 implementation only; no L10 activity specification exists |
| 5 | `02_Course Roadmap (…).md` | Course framework; no runtime lesson grouping numbered 10 |
| 6 | `new_template/MD/LESSON_0{4,7,8,9}_*.md` | Case-B precedents; documentation that runtime L04 implements د ذ ط ظ letters |
| 7 | `new_template/js/lesson-01…07.js` | STRUCTURAL evidence only — runtime letter-file numbering ≠ blueprint lesson numbering (L04 already owns د ذ ط ظ) |

**Evidence classification:** L10 identity/title/type = **OFFICIAL FACT** (Blueprint L342–371 + Framework L103/L184). Tanwin codepoints and their exclusion from the schema whitelist = **OFFICIAL FACT** (Unicode + `lesson-schema.js` L82–84). L04 owning د ذ ط ظ = **OFFICIAL FACT** (`js/lesson-04.js`). Runtime L07 `meta.nextLesson` «الحروف (ل)» = **RUNTIME EVIDENCE** (editorial, unratified — see `LESSON_07_RESULT.md` L140). Compatibility conclusions = **INFERENCE from official facts**, not presented as curriculum.

## 4. Relationship to Lesson 09

- L09 = **«الشدة — حرفان في واحد»** (shadda). L10 = **«التنوين — الاسم في الجملة»** (tanwin). Both are **grammar / orthography (diacritics / علامات الضبط) lessons** — blueprint letter-group table L56 groups them together: «المحاضرتان 9-10 | ج د ذ ط ظ + الشدة والتنوين».
- L09's minute 1 is «مراجعة حروف السكون وص/س من الدرس قبل الماضي»; L10's minute 1 is «مراجعة الشدة بأزواج مقارنة سريعة» — a strict pedagogical sequence (sukun → shadda → tanwin → lam al-ta'rif).
- **Both are CASE B under the current contract** for the same architectural reason: the runtime has no diacritic data model and no diacritic activity/assessment round type.

## 5. Relationship to Lesson 11

- L11 = **«اللام الشمسية والقمرية»** (lam + lam al-ta'rif), whose official prerequisite is tanwin (Framework L104: «يُفهم بعد التنوين: نكرة ↔ معرفة | التنوين»). It is the same pedagogical *family*: grammar/orthography (علامات الضبط), not a plain letter lesson.
- The runtime chain's editorial «الحروف (ل)» points to lam, but lam is officially Lesson **11** — confirming once more that runtime metadata never determines curriculum placement.

## 6. Official Lesson Type

**GRAMMAR / ORTHOGRAPHY (DIACRITICS — TANWIN).** The lesson's target is the ability to *read and use the three noun endings* (double-Fatha ً, double-Kasra ٍ, double-Damma ٌ) and understand their sentence-position function. Its official 8-step plan (Blueprint L355–364):

1. Review shadda with rapid comparison pairs
2. Present the four similar letters د ذ ط ظ with direct comparison
3. **Introduce tanwin:** double-Damma = word at start of sentence; double-Fatha = after the verb; double-Kasra = after a preposition
4. Read sentences with tanwin aloud, focusing on the tanwin ending
5. **ربط/لعبة الأصناف الثلاثية:** red/yellow/green cards for the three tanwins
6. Build sentences: student picks a tanwin-noun and places it in a sentence
7. Writing: 5 short sentences with different tanwin nouns
8. Review the new letters and close the lesson

Even step 2 (the letters د ذ ط ظ) exists in service of the tanwin reading task, not as a standalone letter lesson.

## 7. Official Content

- **Diacritic concept:** tanwin ً ٍ ٌ — three noun endings tied to syntactic position (يبدأ الجملة / بعد الفعل / بعد حرف الجر).
- **Vehicle letters:** د ذ ط ظ (presented by shape-similarity pairs د/ذ — ط/ظ).
- **Vocabulary:** طَالِبٌ — كِتَابًا — جَامِعَةٍ — وَلَدٌ (all tanwin-marked).
- **Sentences:** هُوَ طَالِبٌ. أَقْرَأُ كِتَابًا.
- **Assessment:** read two sentences with correct tanwin (one Damma, one Fatha).

## 8. Target Letter Analysis

**Not directly applicable — L10 is not a new-letter lesson.** For completeness, the officially *named* letters are:

| Letter | Official source | Explicitly assigned? | Status |
|--------|-----------------|----------------------|--------|
| د | Blueprint L348 | Yes (as tanwin vehicle) | ⚠️ **Already runtime L04 target letter** → leak if reused |
| ذ | Blueprint L348 | Yes (as tanwin vehicle) | ⚠️ **Already runtime L04 target letter** → leak if reused |
| ط | Blueprint L348 | Yes (as tanwin vehicle) | ⚠️ **Already runtime L04 target letter** → leak if reused |
| ظ | Blueprint L348 | Yes (as tanwin vehicle) | ⚠️ **Already runtime L04 target letter** → leak if reused |

Runtime L04 = «الحروف الرابعة», `targetLetters: ["د","ذ","ط","ظ"]` (verified from `js/lesson-04.js`). Treating L10 as a letter lesson would trigger the cross-lesson leak gate (L01–L07 target letters) — and the schema's ≥2-target-letters rule, while satisfied in number, would be satisfied only by **re-using already-taught letters**, which is forbidden ("Do NOT copy a letter from another lesson merely to satisfy the schema").

## 9. Vocabulary Analysis

| Letter | Official word | Source | Orthography | Status |
|--------|---------------|--------|-------------|--------|
| د | وَلَدٌ (د at `[1]`) | Blueprint L349 | contains U+064C (ٌ) | ⚠️ not representable verbatim; no dedicated د-initial noun |
| ذ | — | — | — | ❌ **MISSING** (no official L10 word contains ذ) |
| ط | طَالِبٌ (ط at `[0]`) | Blueprint L349 | contains U+064C (ٌ) | ⚠️ not representable verbatim |
| ظ | — | — | — | ❌ **MISSING** (no official L10 word contains ظ) |

Tanwin codepoints verified: ً = U+064B, ٌ = U+064C, ٍ = U+064D — all excluded by schema whitelist `[\u0621-\u064A]` (`lesson-schema.js` L82–84). The vocabulary gate **fails for two letters (ذ، ظ)** and every official word is unrepresentable as officially written. No vocabulary may be invented (§6).

## 10. Runtime Compatibility

The P1–P7 letter pipeline boots arbitrary data, but its semantic surface is letter-centric: P2 phonemes, P3 char/dots/phoneme/fact reveal, P5 letter target cards, P6 three letter-sound discrimination rounds, P7 three letter assessment types. The official L10 pedagogy — reading tanwin endings, the triple-color sorting game, sentence-position grammar — **cannot be expressed** in P1–P7 without inventing concepts the runtime has no representation for. The runtime offers letter-discrimination cards, not noun-ending exercises; forcing the tanwin lesson into letter cards would be **falsifying its pedagogy** (explicitly forbidden: "Technically possible ≠ pedagogically correct").

## 11. Schema Compatibility

- `meta.targetLetters`: would need ≥ 2 letters → only satisfiable by re-using د ذ ط ظ (leak) — FAIL.
- `letters[].char` / `words[].chars[]` / `meta.completion.chars[].char`: whitelist `[\u0621-\u064A]` (L82–84, L200, L299–301) — **tanwin ً ٍ ٌ (U+064B/C/D) rejected** — official words FAIL verbatim.
- `words[].targetPositions` + `chars[pos]===target.char` (L311–313): unreachable (vocab fails first).
- `discriminationRounds` / `assessmentRounds`: only `identify|sameordiff|close` and `show-letter|count-dots|sound` (L36–37, L441, L511) — no tanwin/endings round — FAIL.
- No schema change permitted in this audit.

## 12. Activity Compatibility

| Official activity | Required round type | Exists in runtime? |
|-------------------|---------------------|--------------------|
| Review shadda pairs | — (oral review) | ◆ implicitly unavailable (shadda is CASE-B content) |
| Present د ذ ط ظ by pairs | P3-like reveal | letter reveal exists, but these letters belong to L04 → leak |
| **Introduce tanwin (دبل الضمتين/الفتحتين/الكسرتين)** | **new concept** | ❌ no field/round |
| **Read tanwin-noun sentences** | **reading-with-diacritic activity** | ❌ absent |
| **البطاقات الثلاثية الملوّنة (red/yellow/green sort)** | **new game type** | ❌ absent |
| Build sentences with tanwin nouns | sentence builder / P5b | ❌ P5b not built (documented) |
| Writing 5 tanwin sentences | writing activity | ❌ P4 is letter-stroke only |
| Assess: read 2 tanwin sentences | **tanwin assessment** | ❌ absent |

## 13. Orthography / Character Compatibility

Verified: ً = U+064B, ٌ = U+064C, ٍ = U+064D. The schema's `isArabicChar` = `/^[\u0621-\u064A]$/` (L82–84) admits base letters only. **Tanwin marks cannot be stored.** Stripping tanwin (e.g., storing طالب/كتاب/جامعة/ولد) would silently corrupt the exact orthographic feature Lesson 10 exists to teach — the precise "silent strip of meaningful characters" the task forbids.

## 14. Exact Blockers

1. **Lesson type:** grammar/orthography (tanwin) — the P1–P7 letter pipeline cannot represent reading noun-endings or the shadda→tanwin diacritic family without falsifying the pedagogy.
2. **Orthography:** tanwin marks U+064B/C/D outside the schema Arabic-char whitelist; official vocabulary cannot be represented verbatim.
3. **Letter reuse:** د ذ ط ظ are already the target letters of runtime lesson-04 → cross-lesson leakage if reused.
4. **Vocabulary:** no official word contains **ذ** or **ظ**; two of four named letters would be vocabulary-MISSING even in a letter-lesson interpretation.
5. **Activities/assessment:** the essential official activities (tanwin introduction, triple-color sort, sentence reading, tanwin reading assessment) have no existing round types.

## 15. CASE A / CASE B Decision

**CASE B.**

## 16. Required Author/Architect Decision

To enable Lesson 10 in a future state, the author/architect must decide and provide, **outside this audit**:

1. **Ratify the tanwin diacritic representation** — extend the data model to hold ً ٍ ٌ (and likely the whole ضبط family: ُ َ ِ ّ ْ ٰ …) in `letters`/`words`, i.e., an author-approved schema evolution for diacritic lessons (out of scope here).
2. **Design one or more new round/activity types** for tanwin-specific pedagogy (e.g., a noun-ending read/reveal, a three-color tanwin sort) — explicit engine/activity work, forbidden in this task.
3. **Resolve the letter-ownership conflict** for د ذ ط ظ — since runtime L04 owns them as letters, a future L10 must either (a) teach tanwin as grammar **without** re-listing those letters as target letters (pure grammar lesson — new lesson type), or (b) obtain an explicit author exemption permitting cross-lesson use in a diacritic context.
4. **Supply an officially documented tanwin word bank that includes words for each needed letter** (ذ، ظ currently have no L10 word) and ratify their exact spelled forms with tanwin.

## 17. Files Created

- `MD/LESSON_10_INVESTIGATION_REPORT.md` (this file) — CASE B report only.

## 18. Files Modified

None. No `js/lesson-10.js` was created. No runtime/schema/engine/activity/CSS/HTML file was touched.

## 19. Files Protected

`js/lesson-01.js … js/lesson-07.js`, `js/app.js`, `js/loader.js`, `js/engine/*`, `js/activities/*`, `schema/lesson-schema.js`, `css/*`, `lecture.html`, `MD/LESSON_08_*`, `MD/LESSON_09_*` — all unchanged.

## 20. Regression Verification

Protected SHA-256 hashes re-verified this session — **all match established baselines**:

| File | SHA-256 (first 8) | Status |
|------|-------------------|--------|
| `js/lesson-01.js` | `591804C3…` | unchanged |
| `js/lesson-02.js` | `96BEB452…` | unchanged |
| `js/lesson-03.js` | `8912D70E…` | unchanged |
| `js/lesson-04.js` | `35609CD8…` | unchanged |
| `js/lesson-05.js` | `0A89060A…` | unchanged |
| `js/lesson-06.js` | `51CDB211…` | unchanged |
| `js/lesson-07.js` | `1FE9C896…` | unchanged |
| `js/app.js` | `87B37E6B…` | unchanged |
| `js/loader.js` | `B335E6EE…` | unchanged |
| `schema/lesson-schema.js` | `8E6B3EB8…` | unchanged |
| `lecture.html` | `CB2C9D3C…` | unchanged |
| `css/style.css` | `7D459C6A…` | unchanged |

## 21. Final Verdict

**CASE B — BLOCKED.** Official Lesson 10 (identity: **«التنوين — الاسم في الجملة»**, a grammar/orthography tanwin lesson) cannot be implemented under the current lesson-data contract without: reusing L04's target letters (leak), representing tanwin marks outside the schema whitelist, and adding activity types that do not exist — each of which is forbidden. No fake/placeholder lesson was created, and no "implementation test" was run on a non-existent file. **Per CASE B protocol: only this report was created; the gate stays closed until the author/architect ratifies a diacritic-aware lesson model or re-scopes tanwin as a non-letter grammar lesson.**

---

**Evidence-discipline note:** identity/title/type/vocab/objective = OFFICIAL FACT (Blueprint L342–371; Framework L103/L184). Codepoints & whitelist = OFFICIAL FACT (Unicode; `lesson-schema.js` L82–84). L04 letter ownership = OFFICIAL FACT (`js/lesson-04.js`). Runtime `nextLesson` = RUNTIME EVIDENCE only. No inference is presented as curriculum.