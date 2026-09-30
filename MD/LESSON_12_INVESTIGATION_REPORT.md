# LESSON 12 INVESTIGATION REPORT

> **Date:** 2026-09-19
> **Type:** CURRICULUM + PEDAGOGICAL + ARCHITECTURAL EVIDENCE AUDIT — audit only, no implementation.
> **Verdict:** ⛔ **BLOCKED (CASE B).** Lesson 12 is official, clearly defined, and belongs to the recurring orthography/diacritics family — the current architecture cannot represent it faithfully.

---

## 1. Executive Verdict

- **Official identity:** Lesson 12 = «المدود — الحروف الطويلة» (The Madd — the Long Letters)
- **Lesson family:** ORTHOGRAPHY / DIACRITICS (sound-length: short vowel vs. long vowel) — the fourth consecutive member of the Framework-documented «المرحلة الثالثة │ علامات الضبط والقراءة — المحاضرات 9-12» family (Framework L81–83)
- **CASE:** **B — official, well-defined, but the current template cannot represent it faithfully.**
- **Confidence:** HIGH (two independent authoritative sources agree; lesson card is fully specified)
- **Conclusion:** The entire pedagogical target of L12 — *distinguishing the short sound from the long (madd) sound in pronunciation and in writing*, via explicit minimal pairs (بَبٌ/بَابٌ، كُرٌ/كُورٌ، بِدٌ/بِيدٌ) — is encoded in **short-vowel harakat and tanwin** that the schema's character whitelist `[\u0621-\u064A]` forbids, and its mandated activities (kinesthetic rhythm taps, minimal-pair reading, two-column classification writing, own-sentence generation, audio-recording homework, 8-pair madd discrimination assessment) have **no existing activity or assessment round type**. Its "new letters" (ا و ي) are already owned by runtime lessons 05/06, so a letter-lesson implementation would both misrepresent the pedagogy and artificially relabel owned letters. Per protocol: this is an architecture capability gap, **not** a curriculum defect.

## 2. Audit Scope

- Determine the official Lesson 12 identity from authoritative curriculum sources only.
- Build a content inventory (language target, vocabulary, sentences, activities, assessment, homework).
- Run a Unicode/orthography audit against `schema/lesson-schema.js`.
- Audit P1–P7 phase compatibility and the activity engine.
- Cross-reference L09→L10→L11→L12→L13 chains and letter ownership across L01–L11.
- Produce CASE classification, blocker severity, architectural implications, and an updated L01–L12 curriculum map WITHOUT designing architecture.
- Verified protected files remain byte-identical (SHA-256) — audit touched zero runtime files.
- **Out of scope:** no `lesson-12.js`, no schema/engine/activity/HTML/CSS/assets changes, no refactor, no architecture design, no Lesson 13 audit.

## 3. Source Hierarchy

| Level | Source | Used for |
|-------|--------|----------|
| 1 | `03_Pedagogical Blueprint (…).md` L404–433 | Official L12 card: title, objective, content, vocab, sentences, 8-step plan, homework, assessment |
| 1 | `03_Pedagogical Blueprint` L435–445 | L13 dependency (first full text) |
| 2 | `01_Pedagogical Framework (…).md` L81–83 | Stage family «علامات الضبط والقراءة — المحاضرات 9-12» |
| 2 | `01_Pedagogical Framework` L186 | Lesson-map row 12: «المدود — الإطالة الصوتية» + wave-visualizer activity |
| 2 | `01_Pedagogical Framework` L91–104 | Diacritics progression matrix: madd (ا/و/ي) roots at lessons 2–4, dedicated consolidation at 12 |
| 6 | `js/lesson-05.js`, `js/lesson-06.js`, `js/lesson-09.js…11` (reports) | STRUCTURAL EVIDENCE only — letter ownership |
| 6 | `schema/lesson-schema.js` | Character whitelist, 15-root contract, round-type enums |

**Policy:** runtime behavior is not curriculum evidence. `meta.nextLesson` is never authoritative.

## 4. Official Evidence

| # | Evidence (exact) | Source | Kind |
|---|------------------|--------|------|
| 1 | Title: «المدود — الحروف الطويلة» | Blueprint L404 | OFFICIAL FACT |
| 2 | Sequencing rationale: «المدود تؤثر على المعنى: كَتَبَ ≠ كَاتِب. يجب تعليمها قبل القراءة المستقلة» | Blueprint L409 | OFFICIAL FACT |
| 3 | «الحروف الجديدة: ا — و — ي كحروف مد في سياق الكلمات» | Blueprint L410 | OFFICIAL FACT |
| 4 | Vocab: «كِتَاب — نُور — بَيْت — طَيْر — كَاتِب» | Blueprint L411 | OFFICIAL FACT |
| 5 | Sentences: «فِي البَيْتِ كِتَاب. أَرَى نُورًا.» | Blueprint L412 | OFFICIAL FACT |
| 6 | Objective: «يُميّز الطالب بين الصوت القصير والصوت الطويل في النطق والكتابة» | Blueprint L414 | OFFICIAL FACT |
| 7 | 8-step lesson plan (review lam → gesture intro → rhythm taps → minimal pairs → read words → classification table → own sentences → explain HW) | Blueprint L419–426 | OFFICIAL FACT |
| 8 | Teacher note: «اللحن في المد أمر طبيعي. لا تقاطع الطالب حين يقرأ…» | Blueprint L428 | OFFICIAL FACT |
| 9 | Homework: «تسجيل صوتي: قراءة 5 كلمات بمدود مختلفة» | Blueprint L433 | OFFICIAL FACT |
| 10 | Assessment: «تمييز 8 أزواج: أيها يحتوي مدًا؟» | Blueprint L433 | OFFICIAL FACT |
| 11 | Stage family: «المرحلة الثالثة │ علامات الضبط والقراءة — المحاضرات 9-12 › إتقان الشدة والتنوين واللام الشمسية والقمرية والمدود للوصول لقراءة مستقلة» | Framework L81–83 | OFFICIAL FACT |
| 12 | Lesson-map row 12: «**المدود — الإطالة الصوتية** ◎ يميّز القصير من الطويل \| visualizer: موجة صوتية قصيرة / موجة ممتدة مرئية» | Framework L186 | OFFICIAL FACT |
| 13 | Madd seeding: «مد الألف ا\|المحاضرة 2» , «مد الواو و\|المحاضرة 3», «مد الياء ي\|المحاضرة 4» | Framework L96/L98/L100 | OFFICIAL FACT |
| 14 | L13 first full text: «الهدف ليس حرفًا جديدًا بل توظيف ما تعلّمه في قراءة حقيقية» | Blueprint L440 | OFFICIAL FACT |
| 15 | Runtime letter ownership: lesson-05 = م ي ا ه; lesson-06 = ف و ق ك (ا، و، ي owned) | `js/lesson-05.js`, `js/lesson-06.js` | STRUCTURAL EVIDENCE |
| 16 | Schema whitelist `isArabicChar = /^[\u0621-\u064A]$/` | `lesson-schema.js` L82–83 | OFFICIAL FACT (contract) |

## 5. Official Lesson Identity

| Field | Value |
|-------|-------|
| Official number | 12 |
| Official title | **«المدود — الحروف الطويلة»** (Framework lesson-map title: «المدود — الإطالة الصوتية») |
| Pedagogical stage | Stage 3 — «علامات الضبط والقراءة», lessons 9–12 (Framework L81–83) |
| Family | ORTHOGRAPHY / DIACRITICS (sound-length / madd) |
| Official target | Distinguishing **short sound (حركة قصيرة)** from **long sound (مد/حرف + حركة)** in pronunciation **and** writing |

No new letter is genuinely introduced: the letter list «ا — و — ي» is explicitly labeled «**كحروف مد في سياق الكلمات**» (as *madd* letters in word context) — they are vehicles for the long-vowel orthographic concept, exactly as ج was for shadda (L09), د ذ ط ظ for tanwin (L10), and ل for lam al-ta'rif (L11).

## 6. Official Pedagogical Objective

«**يُميّز الطالب بين الصوت القصير والصوت الطويل في النطق والكتابة**» — the student distinguishes the short sound (single short vowel) from the long sound (madd letter preceded by the matching short vowel), both aurally/orally (النطق) and in orthography (الكتابة). This is a **phonological + orthographic discrimination** objective, explicitly demonstrated via meaning pairs: كَتَبَ ≠ كَاتِب (Blueprint L409).

## 7. Official Content Inventory

### A. Target language
- **Letters (recycled as madd vehicles):** ا (madd alif ← fatha), و (madd waw ← damma), ي (madd ya ← kasra) — Blueprint L410
- **Required orthographic marks (to make short/long visible):** فتحة (U+064E), ضمة (U+064F), كسرة (U+0650) on the preceding letter; **تنوين** on the pair endpoints (U+064B/064C/064D) in the minimal pairs — Blueprint L422
- **Concept:** madd letter = preceding short vowel + letter (بَا، كُو، بِـي…)
- **Review content:** lam shamsiya/qamariya (minute 1), existing reading skills

### B. Vocabulary (exactly as officially written)
| Word | Harakat/marks | Madd letter | Semantic role | New or review |
|------|---------------|-------------|---------------|---------------|
| كِتَاب | كسرة on ك | ا (madd/فتحة) | long-vowel example | NEW example word (letters already known) |
| نُور | ضمة on ن | و (madd/ضمة) | long-vowel example | NEW example word |
| بَيْت | فتحة on ب + ي | ي (madd/فتحة) | long-vowel example | NEW example word |
| طَيْر | فتحة on ط + ي | ي (madd/فتحة) | long-vowel example | NEW example word |
| كَاتِب | فتحة on ك | ا (madd/فتحة) | long-vowel example | NEW example word |

All five words carry **short-vowel harakat** in their official written form — none is schematically representable verbatim.

### C. Sentences
«**فِي البَيْتِ كِتَاب. أَرَى نُورًا.**» — contains kasra (في), kasra + madd (في البيتِ), madd alif (كَتَاب), **alif maqsura ى** (أَرَى, U+0649 — in-range), **tanwin fath + alif** (نُورًا: U+064B [+ ا]) — the tanwin mark falls outside the whitelist.

### D. Activities
See §10. Eight officially specified steps; **none has a runtime round type**.

### E. Assessment
{{"تمييز 8 أزواج: أيها يحتوي مدًا؟"}} — 8-pair short-vs-long discrimination. No P6/P7 type expresses this (see §18).

## 8. Official Vocabulary

| Word | Purpose in lesson | Contains مadd letter? | Orthographic marks | Source | Status |
|------|-------------------|----------------------|--------------------|--------|--------|
| كِتَاب | madd-alif example | ا | كسرة (U+0650) on ك | L411 | grammar/orthography example — not representable (خارج النطاق) |
| نُور | madd-waw example | و | ضمة (U+064F) on ن | L411 | same |
| بَيْت | madd-ya example | ي | فتحة (U+064E) on ب | L411 | same |
| طَيْر | madd-ya example | ي | فتحة (U+064E) on ط | L411 | same |
| كَاتِب | madd-alif example | ا | فتحة (U+064E) on ك | L411 | same |

The word set is **letter-independent example vocabulary for the madd orthographic feature** — letters ك ت ا ب ن و ر ي ط (ط) exist solely to carry the madd. No word is letter-teaching vocabulary; لا توجد أي كلمة تصلح كبطاقة حرفية مستقلة لدرس الحروف.

Also required (Blueprint L422): **مقاطع متناظرة** بَبٌ / بَابٌ — كُرٌ / كُورٌ — بِدٌ / بِيدٌ — each pair contains **تنوين** (U+064C) and **حركات** (U+064E/064F/0650); these are the core pedagogical minimal pairs.

## 9. Official Sentence Patterns

| Pattern | Example | Marks | Required beyond whitelist |
|---------|---------|-------|---------------------------|
| «فِي البَيْتِ كِتَاب» | madd-alif noun in a definite phrase | كسرة, مدة, فتحة | كسرة U+0650 (خارج) |
| «أَرَى نُورًا» | verb + madd-noun with tanwin | فتحة, alif maqsura, tanwin fath | فتحة U+064E, **تنوين U+064B** (خارج) |

No sentence is exactly representable (harakat/tanwin required). Stripping marks destroys the madd identity the lesson teaches.

## 10. Official Activity Sequence

| Step | Official activity (Blueprint L419–426) | Learning purpose | Existing runtime type? |
|------|---------------------------------------|------------------|------------------------|
| 1 | مراجعة اللام الشمسية والقمرية | review/retrieval | ❌ (L11 itself CASE B) |
| 2 | تقديم المدود: ابسط يديك ببطء حين تنطق الصوت الطويل | gesture-mediated concept intro | ❌ no type |
| 3 | تمييز القصير والطويل: الطالب يدق الطاولة مرة أو مرتين | kinesthetic listening discrimination | ❌ no type |
| 4 | قراءة أزواج: بَبٌ / بَابٌ — كُرٌ / كُورٌ — بِدٌ / بِيدٌ | minimal-pair reading | ❌ no type (and marks outside whitelist) |
| 5 | قراءة الكلمات الجديدة بالتناوب | structured reading | ❌ no reading round |
| 6 | نشاط الكتابة التصنيفية: جدول عمودين (قصير / طويل) | classification writing | ❌ (P4 = letter-stroke only) |
| 7 | الجملتان الجديدتان ثم جملة خاصة بنفس النمط | sentence generation | ❌ no sentence builder |
| 8 | شرح الواجب | admin | n/a |

Framework L186 adds the signature activity: **«visualizer: موجة صوتية قصيرة / موجة ممتدة مرئية»** — a sound-wave visualizer (short vs. extended waveform), a capability that does not exist in the activity engine.

## 11. Official Assessment

«**تمييز 8 أزواج: أيها يحتوي مدًا؟**» — the student hears/sees 8 short/long pairs and decides which contains a madd. This is a **phonological minimal-pair classification** (short vs. long), at the level of sound-length — not letter identification, dot-counting, or letter-sound matching. Current `assessmentRounds` enum = `show-letter | count-dots | sound` (schema L511) → **no compatible type**; `discriminationRounds` enum = `identify | sameordiff | close` (schema L36–37/L441) operates on *letters*, not short-vs-long length.

## 12. Official Homework

«**تسجيل صوتي: قراءة 5 كلمات بمدود مختلفة**» — the student **records an audio file** reading 5 words with different madds. The runtime has **no audio-recording capability** (no microphone/record/upload primitive anywhere in the activity model).

## 13. L09 → L10 → L11 → L12 Pedagogical Chain

| Lesson | Official content introduced | Evidence |
|--------|----------------------------|----------|
| L09 | الشدة (gemination) | Blueprint L342–371 |
| L10 | التنوين — الاسم في الجملة (noun-endings) | Blueprint L342–371; Framework L103 |
| L11 | اللام الشمسية والقمرية (assimilation of ل) | Blueprint L373–402; Framework L104 |
| **L12** | **المدود — الحروف الطويلة (short vs. long sound)** | Blueprint L404–433; Framework L186 |

The **Framework explicitly defines this as a coherent sequence** (Framework L81–83): «المرحلة الثالثة │ علامات الضبط والقراءة — المحاضرات 9-12 › الهدف: إتقان الشدة والتنوين واللام الشمسية والقمرية **والمدود** للوصول لقراءة مستقلة». L12's own first minute is a review of L11 (لام شمسية وقمرية) — chain continuity is **documented, not inferred**.

Additionally, the diacritics matrix (Framework L96–104) roots each diacritic at its first encounter: madd alif/waw/ya seeded at lessons 2/3/4 as extensions of الحركات — and **consolidated as a dedicated concept at lesson 12**. The matrix and the Blueprint card are consistent: the letters appear early; the madd orthographic concept is the lesson 12 target.

## 14. L12 → L13 Dependency

L13 = «أول نص كامل — القراءة المستقلة» (Blueprint L435–445): «الهدف ليس حرفًا جديدًا بل توظيف ما تعلّمه في قراءة حقيقية» — a 6-sentence first connected text. L13's official vocabulary (جَامِعَة — ي، أَذْهَب، اللُّغَة، العَرَبِيَّة — يّ، أُحِبّ) **requires correct madd reading** of a real text.

The L12 rationale makes the dependency **explicit**: «المدود تؤثر على المعنى… **يجب تعليمها قبل القراءة المستقلة**» (Blueprint L409). L12 is the final orthography gate required to "open" the reading stage; L13 opens actual reading. **L12 is a bridge lesson closing the diacritics family and handing off to the READING family.**

## 15. Unicode / Orthography Audit

| Official item | Marks required (exact codepoints) | In whitelist `[\u0621-\u064A]`? (schema L82–83) | Verdict |
|---------------|-----------------------------------|-----------------------------------------------|---------|
| كِتَاب | كسرة U+0650 | ❌ | unrepresentable verbatim |
| نُور | ضمة U+064F | ❌ | unrepresentable verbatim |
| بَيْت | فتحة U+064E + sukun on ي (U+0652) | ❌ | unrepresentable verbatim |
| طَيْر | فتحة U+064E + ي | ❌ | unrepresentable verbatim |
| كَاتِب | فتحة U+064E | ❌ | unrepresentable verbatim |
| بَبٌ / بَابٌ | فتحة/تنوين ضم U+064E / **U+064C** | ❌ | unrepresentable verbatim |
| كُرٌ / كُورٌ | ضمة/تنوين U+064F / U+064C | ❌ | unrepresentable verbatim |
| بِدٌ / بِيدٌ | كسرة/تنوين U+0650 / U+064C | ❌ | unrepresentable verbatim |
| في البيتِ كِتَاب | كسرة/فتح U+0650, U+064E | ❌ | unrepresentable verbatim |
| أَرَى نُورًا | فتحة U+064E, alif maqsura ى (U+0649 in-range), **تنوين فتح U+064B** | ى ✅ / تنوين ❌ | mixed — unrepresentable verbatim |
| baselines (ا و ي ب ت ك ن ر ط) | base letters U+0621–064A | ✅ | ✓ ONLY base letters pass |

**1. What the lesson requires:** full short-vowel harakat (فتحة/ضمة/كسرة), tanwin (U+064B/064C), and madd-context reading.
**2. What the schema permits:** base letters `[\u0621-\u064A]` and *letter-shape-only* lessons, incl. alif maqsura ى (U+0649) — but **no harakat, no tanwin, no sukun** anywhere.
**3. Impossible to represent exactly:** all official vocabulary, all minimal pairs, both official sentences.
**4. Stripping marks would destroy the pedagogical target:** YES — the short-vs-long distinction **is** the marks. بَب vs بَاب differ *only* by the presence of ا (that part is representable), but the broader lesson's written-form contrast (كُو vs كُ / مدة visible through harakat + letter) and the tanwin pair endpoints (بَبٌ) are pedagogically essential and require الشكل. Removing diacritics voids the "الكتابة" half of the objective (التمييز في النطق والكتابة).

## 16. Current Schema Compatibility

| Requirement | Contract (lesson-schema.js) | L12 official content | Verdict |
|-------------|----------------------------|----------------------|---------|
| 15 root keys + Object.freeze | schema | no madd/harakat/tanwin fields | PARTIAL (structure intact; content unrepresentable) |
| `meta.targetLetters` ≥ 2 | L152 | ا و ي «كحروف مد» would have to be re-listed | FAIL — letters already owned (structural/factual conflict with L05/L06) |
| `letters[].char` single [\u0621-\u064A] | L200 | no diacritics allowed | FAIL |
| `words[].chars[]` each [\u0621-\u064A] | L300 | harakat/tanwin rejected | FAIL |
| `words[].targetPositions` char===target | L311–313 | no genuine new target | FAIL |
| `discriminationRounds` enum | L36–37/L441 | no short/long length type | FAIL |
| `assessmentRounds` enum | L511 | no madd-pair type | FAIL |
| audio/video namespaced refs | loader possibly | homework = student recording (inverse direction) | FAIL |

No schema modification was made, and none should be made unilaterally by this audit.

## 17. Current Runtime Compatibility

P1–P7 are a **letter-acquisition pipeline** (phoneme intro → letter button → reveal → strokes → letter-vocab cards → letter-sound discrimination → letter assessment). L12's target (oral+orthographic distinction of short/long vowels, via rhythm, minimal pairs, classification, sentence generation) has **no home in any phase**:

| Phase | Can it represent L12? | Why |
|-------|----------------------|-----|
| P1 | FAIL | target is a *diacritic length concept*, not 4 named letters |
| P2 | FAIL | phoneme dtype `'/' + char + '/'` = base letter only; no madd/harakat phonetics |
| P3 | FAIL | reveal model is char/dots/phoneme/fact per letter |
| P4 | FAIL | letter-stroke writing only; L12 asks word classification writing |
| P5 | FAIL | word cards attach to *target letters*; L12 has no new target letter |
| P6 | FAIL | `identify/sameordiff/close` are letter-sound rounds, not short/long length |
| P7 | FAIL | `show-letter/count-dots/sound` are letter assessments, not madd-pair discrimination |

Conclusion: **0 of 7 phases are pedagogically applicable.**

## 18. Activity Engine Compatibility

| Official activity | Required capability | Classification |
|-------------------|--------------------|----------------|
| Review sun/moon lam (minute 1) | lam-vs-lam review tool | MISSING (L11 concept itself unrepresented) |
| Gesture-based madd intro | physical/gesture model | MISSING |
| Tap table once/twice (short/long) | rhythm/kinesthetic response | MISSING |
| Read minimal pairs بَبٌ/بَابٌ… | minimal-pair reading + diacritic rendering | MISSING |
| Read new words alternately | audio-word reading control | MISSING |
| Two-column classification table | writing/classification canvas | MISSING (P4 is strokes only) |
| Own-sentence generation | sentence builder | MISSING (documented as unbuilt) |
| Audio-recording homework | mic/record primitive | MISSING |
| Wave visualizer (Framework L186) | short vs extended waveform display | MISSING |
| Assessment: 8 madd pairs | length-discrimination rounds | MISSING |

Classification: **EXISTS: 0 · ADAPTABLE: 0 · MISSING: 10 · CONFLICT: 0.** No existing activity can even be adapted via data for any step.

## 19. Cross-Lesson Ownership Audit

| Letter | Official L12 role | Runtime owner | Ownership verdict |
|--------|-------------------|---------------|-------------------|
| ا | "madd letter" | **lesson-05** (م ي ا ه) | NEW? NO — owned; re-tasked orthographically |
| و | "madd letter" | **lesson-06** (ف و ق ك) | NEW? NO — owned; re-tasked orthographically |
| ي | "madd letter" | **lesson-05** (م ي ا ه) | NEW? NO — owned; re-tasked orthographically |
| ب ت ك ن ر (َُِ context) | support letters in examples | lessons 01–07 | REVIEW/APPLICATION |

Content classification: **NEW CONTENT = the madd orthographic concept only** (no new letters, no new words as *letter-teaching*); **REVIEW CONTENT = lam review (minute 1)**; **APPLICATION = reading example words with madd**; **PREREQUISITE = الحركات الثلاث (فتحة/ضمة/كسرة), letter recognition of all 28 under runtime lessons 01–07**.

**Reuse verdict:** pedagogically legitimate to reuse ا و ي for a madd lesson — BUT a letter-lesson implementation would mislabel the reuse as "new letters" and artificially satisfy the `targetLetters ≥ 2` rule, which the audit rules forbid (architectural contamination).

## 20. Blockers

| Blocker | Severity | Evidence | Consequence |
|---------|----------|----------|-------------|
| Core orthographic content (harakat U+064E/064F/0650, tanwin U+064B/064C/064D) rejected by whitelist `[\u0621-\u064A]` | **CRITICAL** | schema L82–83/200/300; Blueprint L411/412/422 | Cannot represent the exact official written forms or the minimal pairs; a project without them cannot teach مدة in writing |
| Core pedagogical objective (short vs. long sound). unsupported by any phase | **CRITICAL** | Blueprint L414; P1–P7 audit (§17) | The lesson's fundamental discrimination cannot be expressed |
| All 10 official activities missing (incl. rhythm, classification table, sentence builder, wave visualizer) | **HIGH** | Blueprint L419–426; Framework L186 | Faithful activity sequence impossible |
| Assessment (8-pair madd discrimination) has no round type | **HIGH** | Blueprint L433; schema L36/511 | Official assessment unrepresentable |
| Homework (audio recording of reading) has no recorder primitive | **MEDIUM** | Blueprint L433 | Official homework unimplementable |
| «New letters» ا و ي already owned by lessons 05/06 | **HIGH** | lesson-05/06 targetLetterIds | Letter-lesson framing would be artificial + cross-lesson re-labeling; violates «do not invent target letters» |
| Explicit concept/letter conflict: "ا — و — ي كحروف مد" is a *diacritic* framing, not letter acquisition | **HIGH** | Blueprint L410 vs. schema letter model | A letter-implementation would silently change pedagogical meaning |

## 21. CASE Classification

**CASE B — OFFICIAL LESSON; CURRENT ARCHITECTURE CANNOT REPRESENT IT.**

Conditions satisfied: the lesson is clearly official (Blueprint L404–433 + Framework L186/L81–83), fully specified, and well defined. The architecture gap is total: 0/7 phases, 0/10 activities, whitelist rejects the orthographic marks that are the lesson's essence, and the homework/assessment directions (recording, length-discrimination) do not exist. This is NOT a curriculum defect.

## 22. Architectural Implications

*Evidence only — no design, no implementation.*

- **Confirmed recurring family:** L12 is the 4th consecutive (with L09/L10/L11) member of the Framework-documented «علامات الضبط والقراءة» (9–12) family — plus L07 (sukun) opens it. **A second, orthography/diacritics lesson engine is now strongly motivated by accumulated official evidence**, not by one stray lesson.
- **Schema is too letter-centric:** whitelist and the 15-root contract have no slot for harakat/tanwin/sukun/madd and no *word-level orthographic rule* abstraction.
- **Activity abstraction insufficient:** rhythm/kinesthetic, classification-writing, sentence generation, waveform visualization, and student audio recording would all be new primitives.
- **Assessment model insufficient:** length-discrimination rounds (and 8-pair madd test) are not expressible in `identify/sameordiff/close` or `show-letter/count-dots/sound`.
- **Phase pipeline too rigid:** P1–P7 fixed letter sequence cannot host a diacritic consolidation like madd.
- **Bridge role identified:** L12 closes orthography and hands off to READING (L13) — architecture for L13 may need its own reading/text primitives.

## 23. Updated L01–L12 Curriculum Map

| Lesson | Official Title | Pedagogical Family | Runtime Status |
|--------|----------------|--------------------|----------------|
| 01 | الحروف الأولى — ب ت ث ن | LETTER ACQUISITION | Implemented (runtime 01) |
| 02 | م ي ا — وأول مقاطع | LETTER ACQUISITION (+ syllables) | Implemented (layout memo; runtime re-sequence) |
| 03 | ف و ق ك — والضمة | LETTER ACQUISITION (+ damma) | Implemented (runtime 06) |
| 04 | ع غ ح خ — والكسرة | LETTER ACQUISITION (+ kasra) | Implemented (runtime 02/07 letters) |
| 05 | التعارف الكامل | COMMUNICATION | Not built |
| 06 | الأرقام وأيام الأسبوع | COMMUNICATION / VOCABULARY | Not built |
| 07 | السكون — الحروف الساكنة | **ORTHOGRAPHY / DIACRITICS** | Unsupported (CASE B) |
| 08 | اختبار المنتصف + مراجعة | ASSESSMENT / REVIEW | Not built (CASE B report) |
| 09 | الشدة — حرفان في واحد | **ORTHOGRAPHY / DIACRITICS** | Unsupported (CASE B) |
| 10 | التنوين — الاسم في الجملة | **ORTHOGRAPHY / DIACRITICS** | Unsupported (CASE B) |
| 11 | اللام الشمسية والقمرية | **GRAMMAR / READING CONVENTION** | Unsupported (CASE B) |
| **12** | **المدود — الحروف الطويلة (الإطالة الصوتية)** | **ORTHOGRAPHY / DIACRITICS (madd)** | **Unsupported (CASE B — this audit)** |

Corrective note vs. the earlier preliminary map: none of the L01–L11 rows required reclassification; L07 stays under the same family and L09–L11 rows are confirmed by their own reports. **L12 freshly confirms the family** (Framework L81–83 names it explicitly).

## 24. Emerging Pedagogical Families

| Family | Members (official evidence) | Momentum |
|--------|------------------------------|----------|
| **A — LETTER ACQUISITION** | L01–L04 (+part 05/06) | runtime-supported |
| **B — ORTHOGRAPHY / DIACRITICS** | L07 (sukun), L09 (shadda), L10 (tanwin), L12 (madd) | **recurring — 4 lessons and counting** |
| **C — GRAMMAR / READING CONVENTION** | L11 (lam al-ta'rif) | confirmed member of stage 9–12 |
| **D — READING** | L13 (first full text) pending audit | evidenced title/objective (Blueprint L435–445) |
| **E — ASSESSMENT / REVIEW** | L08, L16 | midterm + final |
| **F — COMMUNICATION / VOCAB** | L05, L06, L15 | evidenced but unaudited in depth |

Conclusion: **recurring families are now beyond doubt.** Family B+C represents roughly 33% of lessons 01–12 with zero runtime coverage.

## 25. Evidence Confidence

| Conclusion | Confidence | Basis |
|------------|-----------|-------|
| L12 identity/title/objective/vocab/sentences/plan/HW/assessment | HIGH | Blueprint L404–433 (direct, complete card) |
| L12 is orthography/diacritics family member (stage 9–12) | HIGH | Framework L81–83 + L186 + Blueprint title/card |
| Madd letters' letters ا و ي already owned at runtime | HIGH | lesson-05/06 `targetLetterIds` (直接) |
| Whitelist excludes all required harakat/tanwin | HIGH | schema L82–83/200/300 + codepoint check |
| No activity/assessment/enum can host L12 tasks | HIGH | schema enums + activity inventory |
| Architectural implication (2nd engine likely) | MEDIUM | multiple consistent official sources; final framing awaits L13–L16 audit |

No LOW-confidence values were promoted to fact.

## 26. Protected-File Integrity

SHA-256 verified this session before and after the audit — **0 unexpected changes**:

| File | Hash prefix | Status |
|------|-------------|--------|
| js/lesson-01.js | 591804C3… | unchanged |
| js/lesson-02.js | 96BEB452… | unchanged |
| js/lesson-03.js | 8912D70E… | unchanged |
| js/lesson-04.js | 35609CD8… | unchanged |
| js/lesson-05.js | 0A89060A… | unchanged |
| js/lesson-06.js | 51CDB211… | unchanged |
| js/lesson-07.js | 1FE9C896… | unchanged |
| js/app.js | 87B37E6B… | unchanged |
| js/loader.js | B335E6EE… | unchanged |
| schema/lesson-schema.js | 8E6B3EB8… | unchanged |
| lecture.html | CB2C9D3C… | unchanged |
| css/style.css | 7D459C6A… | unchanged |

Only file created this audit: `MD/LESSON_12_INVESTIGATION_REPORT.md`.

## 27. Final Decision

**BLOCKED.**

**Why:** Official Lesson 12 («المدود — الحروف الطويلة» / «الإطالة الصوتية») is a fully specified, authoritative **orthography/diacritics lesson** whose pedagogical essence — distinguishing the short sound from the long (madd) sound in **النطق والكتابة** — is carried by short-vowel harakat (U+064E/064F/0650) and tanwin (U+064B/064C) that the schema's `isArabicChar` whitelist `[\u0621-\u064A]` forbids; its "new letters" (ا و ي) are already owned by runtime lessons 05/06; and **none** of its mandated activities, assessment (8-pair madd discrimination), homework (student audio recording), or Framework signature activity (wave-form visualizer) exists anywhere in the runtime. Representing it as a letter lesson would falsify the official pedagogy and artificially re-list owned letters.

Per protocol the blocker is **not solved here**: future resolution belongs to the post-L13–L16 architecture decision. **No `lesson-12.js` was created. No file other than the audit report was touched. STOPPED after audit — Lesson 13 is not begun.**

---

**Evidence discipline:** all OFFICIAL FACTS cited above are from Blueprint L404–433 / L435–445 and Framework L81–83/L91–104/L186; STRUCTURAL EVIDENCE from `lesson-*.js`; the whitelist is OFFICIAL FACT of the schema (`lesson-schema.js` L82–83). No inference is presented as curriculum. Conflicts: none between authoritative sources; the Framework's madd seeding (lessons 2–4) and the dedicated lesson 12 were reconciled *as the sources themselves frame them* (introduce letters early → consolidate the concept at 12), and that reconciliation is reported, not silent.