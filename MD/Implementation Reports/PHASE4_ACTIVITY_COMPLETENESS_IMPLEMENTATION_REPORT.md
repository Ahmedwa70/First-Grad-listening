# Phase 4: Activity & Component Completeness Report

**Date:** 2026-08-10
**Reference:** Doc 07 — Lesson 01 HTML Implementation Map
**Status:** Completed (Critical items only)

---

## Gap Scan Summary

| Category | Implemented | Partial | Different | Missing |
|----------|:-----------:|:-------:|:---------:|:-------:|
| Components (م-01..م-18) | 7 | 0 | 2 | 7 |
| Teacher Controls | 5 | 0 | 1 | 5 |
| Phases (P1-P7) | 3 | 1 | 3 | 0 |

## Architectural Divergence

P4/P6/P7 evolved from the Doc 07 blueprint during implementation:
- **P4**: Doc 07 = dot drag-and-drop game. Current = stroke writing guide.
- **P6**: Doc 07 = speed race + dictation + exit sentence. Current = auditory discrimination (D1/D2/D3).
- **P7**: Doc 07 = closing + homework card. Current = assessment rounds (Q1/Q2/Q3).

These are design evolution, not bugs. Changing them would require architecture decisions.

## Critical Items Implemented

### R — Emergency Reveal (KeyR)
- Reveals all elements of the current step immediately
- Works in all phases P1-P7
- P1: jumps to last step | P3/P5: reveals all reveal steps | P4: shows all stroke steps | P6/P7: shows answer
- Teacher hint: "كشف طارئ — جميع عناصر الخطوة الحالية مكشوفة"

### H — Emergency Hide (KeyH)
- Hides/resets all revealed elements of the current step
- Works in all phases P1-P7
- P1: resets to step 0 | P3/P5: hides all reveal steps | P4: resets to step 0 | P6/P7: hides answer
- Teacher hint: "إخفاء طارئ — العناصر المكشوفة أُخفيت"

## Files Modified

- `js/app.js` — Added `emergencyReveal()` and `emergencyHide()` functions + `KeyR`/`KeyH` keyboard bindings

## Deferred Items (Require Architecture Decisions)

| Item | Reason |
|------|--------|
| م-03 شريط الجملة | Needs P5b phase + sentence data schema |
| م-04 طبقة النقاط (drag) | Needs P4 redesign to dot game |
| م-08 الإضاءة الموجَّهة (S) | Needs overlay system + target element tracking |
| م-09 المحدد العشوائي (9) | Needs generic random picker component |
| م-10 المؤقت (T) | T key conflict with theme toggle; needs decision |
| م-11 سحب وإسقاط | Needs drag-and-drop engine |
| م-13 منشئ الجملة | Needs sentence builder component + data |
| م-14 منتقي الطالب (P) | Needs student list data + picker UI |
| م-16 وضع الإملاء (D) | Needs dictation mode overlay + audio |

## Verification

- `emergencyReveal()` and `emergencyHide()` added with switch cases for all 7 phases
- `KeyR` and `KeyH` added to keydown listener
- No conflicts with existing keyboard shortcuts
- No data schema changes
- No HTML structure changes
