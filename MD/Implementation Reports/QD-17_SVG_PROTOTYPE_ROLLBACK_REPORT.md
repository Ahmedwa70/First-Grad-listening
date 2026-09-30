# QD-17 SVG Prototype Rollback Report

**Date:** 2026-08-10
**Type:** Rollback (Partial)
**Scope:** All QD-17 AMLSA Layer 5 implementation code
**Status:** Completed

---

## Root Cause

`fetch()` API does not work with `file://` protocol due to CORS restrictions. The SVG Articulation Viewer used `fetch()` to load layered SVG files inline, which failed silently in the offline classroom environment. The SVG container rendered empty — no visual output.

## What Was Rolled Back

### js/lesson-01.js
- Removed `articulation` object from letter ث (lines 70–105)
- Letter ث now matches ب/ت/ن structure exactly
- QD-16 phoneme values preserved: `phoneme: '/ث/'`, `ipa: 'θ'`

### js/app.js
- Removed `ArticulationEngine` object (10 methods: init, hasArticulation, getArticulation, getDifficulty, needsArticulation, getSvgFile, getSlowAudio, getSteps, getDescription, getLayerPaths)
- Removed `p2UpdateArticulation()` function
- Removed `p2LoadArticulationSVGs()` function
- Removed `<div class="p2-articulation-zone">` from `buildP2HTML()`
- Removed `p2UpdateArticulation(letterId)` call from `p2SelectLetter()`
- Removed `ArticulationEngine.init(LESSON_01.letters)` from DOMContentLoaded

### css/style.css
- Removed entire "P2 Articulation Viewer (AMLSA L5)" CSS section (~83 lines)
- Classes removed: `.p2-articulation-zone`, `.art-card`, `.art-header`, `.art-card-body`, `.art-svg-viewer`, `.art-svg-container`, `.art-layer`, `.art-layer-base/tongue/airflow/highlight`, `.art-info`, `.art-details`, `.art-detail`, `.art-label`, `.art-value`, `.art-steps`, `.art-step`, `.art-step::before`

## What Was Preserved

### SVG Assets (4 files)
- `assets/articulation/base/sagittal-base.svg`
- `assets/articulation/tongue/tongue-tip-between-teeth.svg`
- `assets/articulation/airflow/airflow-oral-continuous.svg`
- `assets/articulation/highlight/highlight-teeth.svg`

### Governance Documents
- `QD-17_ADAPTIVE_MULTI_LAYER_SOUND_ARCHITECTURE.md` (Approved)
- `QD-17_SVG_ARTICULATION_ASSET_ARCHITECTURE.md` (Approved)
- `QD-17_ARTICULATION_VISUALIZATION_ARCHITECTURE.md`
- PROJECT_DECISIONS.md entries
- PROJECT_KNOWLEDGE_MAP.md entries

### Implementation Reports (historical record)
- `QD-17_AMLSA_LAYER5_FOUNDATION_IMPLEMENTATION_REPORT.md`
- `QD-17_AMLSA_LAYER5_ENGINE_IMPLEMENTATION_REPORT.md`
- `QD-17_AMLSA_LAYER5_VIEWER_MVP_IMPLEMENTATION_REPORT.md`
- `QD-17_SVG_PROTOTYPE_PHASE1_IMPLEMENTATION_REPORT.md`

## Post-Rollback State

- P2 displays all 4 letters (ب ت ث ن) uniformly — no articulation viewer
- No JavaScript errors — all removed references cleaned
- No orphaned CSS — all `.art-*` classes removed
- QD-16 compliance intact — Arabic phonemes used throughout
- Phases P1–P7 unaffected

## Lesson Learned

Any asset-loading mechanism for offline `file://` applications must avoid `fetch()`, `XMLHttpRequest`, and dynamic `import()`. Future QD-17 reimplementation should use one of:
1. **Inline SVG embedded directly in JavaScript** (data strings)
2. **CSS background-image with data: URIs**
3. **Pre-rendered composite SVG** (single file per letter)

## Verification

- `grep` for `ArticulationEngine|p2UpdateArticulation|p2-articulation|art-card|art-step|art-layer|articulation` across `*.js`, `*.css`, `*.html` — **0 matches**
- All 4 letter objects in lesson-01.js have identical property structure
- QD-16 phoneme `/ث/` confirmed at its original position
