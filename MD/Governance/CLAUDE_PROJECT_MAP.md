# CLAUDE_PROJECT_MAP.md

# First-Grad-WorkSync Project Map

## Project Identity

Name:
First-Grad-WorkSync

Purpose:
Interactive Arabic Classroom Teaching System for Chinese Beginners.

Architecture:
Teacher-Controlled Offline HTML Classroom Application.

Core Philosophy:

Teacher controls the lesson flow.
Students interact through projected classroom activities.

Architecture Pattern:

DATA → ENGINE → VIEW


---

# 1. Project Memory (Core Context)

These files define the permanent project identity:

- PROJECT_CONTEXT.md
- DESIGN_PHILOSOPHY.md
- ARCHITECTURE_RULES.md
- SOURCE_OF_TRUTH.md
- COMPONENT_REGISTRY.md
- PHASE_PROTOCOL.md
- CURRENT_STATE.md
- ACTIVE_TASK.md
- CHANGELOG.md


Before any modification:

Read:

1. SOURCE_OF_TRUTH.md
2. DESIGN_PHILOSOPHY.md
3. ARCHITECTURE_RULES.md
4. CURRENT_STATE.md
5. Relevant Phase Report


---

# 2. Root Structure

Lesson-01-classroom-P6-Fixed/

│
├── lecture-01.html
│   └── Application Entry Point
│       - Main classroom container
│       - Loads CSS and JavaScript
│       - Contains static HTML structure only
│
│
├── css/
│   │
│   └── style.css
│       └── Complete Visual System
│           - Layout
│           - Classroom projector design
│           - Components styling
│           - Responsive behavior
│           - RTL design system
│
│
├── js/
│   │
│   ├── app.js
│   │   └── Application Engine
│   │       - State management
│   │       - Rendering
│   │       - User interaction
│   │       - Teacher controls
│   │       - Phase navigation
│   │
│   │
│   └── lesson-01.js
│       └── Lesson Data Layer
│           - Lesson content
│           - Vocabulary
│           - Exercises
│           - Letter data
│           - Audio references
│
│
└── assets/
    │
    ├── fonts/
    │   └── Local offline fonts
    │
    └── audio/
        └── Audio resources
		
# 3. Data Flow Architecture

The project follows:

DATA → ENGINE → VIEW


lesson-01.js

(Content + Pedagogical Data)

        ↓


app.js

(Application Logic + Rendering)

        ↓


lecture-01.html

(Classroom Container)


style.css

(Visual Presentation Layer)


IMPORTANT:

lesson-01.js = Data only

app.js = Logic only

style.css = Visual only

lecture-01.html = Container only


---

# 3. Architecture Rules


The project follows:


lesson-01.js
(Content Data)

↓

app.js
(Logic + Rendering)

↓

lecture-01.html
(Container)


style.css
(Visual Layer)


Never:

- Mix lesson data with application logic.
- Move content into app.js.
- Move rendering logic into lesson-01.js.
- Modify lecture-01.html for feature implementation.
- Add new features without Phase approval.


---

# 4. P6 Component Map


P6 — Auditory Training System (Development Complete — Phase 0→3.1)


Main files:

app.js:

- initP6()
- renderP6()
- advanceP6()
- p6PlaySound()
- p6GoRound()


lesson-01.js:

- discriminationRounds
- letter data


style.css:

- .p6-container
- .p6-main
- .p6-answer-zone
- .p6-guide


---

# 5. P6 Development History


## Phase 0
P6 Analysis

Purpose:
Identify visual and pedagogical problems.


## Phase 1
P6 Visual Structure

Status:
Completed

Goal:
Transform P6 into Classroom Stage.


## Phase 2
P6 Interaction Polish

Status:
Completed

Goal:

- Audio state
- Progressive Reveal
- Answer Zone


## Phase 3
P6 Teacher Guidance

Status:
Completed

Goal:

- Teacher guidance layer
- Round purpose
- Teacher actions


## Phase 3.1
P6 Progressive Reveal & Teacher Layer Refinement

Status:
Completed

Goal:

- DOM-persistent reveal elements (no re-render flash)
- CSS-only transitions with sequential delays
- Quieter teacher guidance bar
- Layout stability at 720p


---

# 6. Current Active Area


Project Understanding Complete — No Active Development Target.

See:
- ACTIVE_TASK.md for prioritized next steps.
- PROJECT_DECISIONS.md for pending architectural/pedagogical decisions.


---

# 7. Authority Order


When conflicts appear:


1. SOURCE_OF_TRUTH.md

2. DESIGN_PHILOSOPHY.md

3. ARCHITECTURE_RULES.md

4. PHASE_PROTOCOL.md

5. CURRENT_STATE.md

6. Phase Reports

7. Implementation Files


Claude must respect this order.