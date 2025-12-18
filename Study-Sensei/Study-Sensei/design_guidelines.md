# M.I.R.E.N Design Guidelines

## Design Approach: Modern Productivity System

**Selected Approach:** Design System (inspired by Notion, Linear, Todoist)

**Rationale:** M.I.R.E.N is a utility-focused productivity tool where clarity, efficiency, and usability are paramount. Students need to quickly assess their revision status without visual distractions. The interface prioritizes information hierarchy and actionable insights over decorative elements.

**Core Principles:**
- Clarity over decoration: Information should be immediately scannable
- Confidence-driven visual language: Color indicators must be instantly recognizable
- Minimal cognitive load: Reduce decision fatigue during study sessions
- Data transparency: Dashboard provides clear snapshot without interpretation needed

---

## Typography System

**Font Family:**
- Primary: Inter or DM Sans (Google Fonts via CDN)
- Monospace: JetBrains Mono for counts/statistics (optional accent)

**Type Scale:**
- Page Headings (H1): text-3xl font-bold (Dashboard, Priority List)
- Section Titles (H2): text-xl font-semibold (Subject names)
- Topic Titles: text-base font-medium
- Body Text: text-sm for descriptions, labels
- Statistics: text-2xl font-bold for dashboard numbers
- Supporting Text: text-xs text-gray-500 for helper text

---

## Layout System

**Spacing Primitives:** Use Tailwind units of **2, 4, 6, and 8** consistently
- Component padding: p-4 or p-6
- Section gaps: gap-6 or gap-8
- Card spacing: space-y-4
- Icon-to-text: gap-2

**Container Strategy:**
- Main app wrapper: max-w-6xl mx-auto px-4
- Dashboard cards: Grid layout on desktop (grid-cols-3), stack on mobile
- Subject/topic lists: max-w-4xl for optimal readability
- Forms/inputs: max-w-2xl to prevent sprawl

**Grid Patterns:**
- Dashboard stats: 3-column grid (desktop), single column (mobile)
- Topic cards: Single column list with clear separation
- Subject overview: 2-column on tablet+, single on mobile

---

## Component Library

### Navigation
- **Top Bar:** App name (M.I.R.E.N) on left, "Add Subject" button on right, minimal border-bottom
- Sticky positioning for consistent access
- Height: h-16 with centered content

### Dashboard (Revision Snapshot)
- **Stats Cards:** Three cards displaying total topics, confidence breakdown (🔴/🟡/🟢 counts)
- Card structure: Icon/emoji, large number (text-2xl), label below
- **Progress Indicators:** Horizontal bars showing proportion of each confidence level
- Simple div-based bars with widths calculated from percentages, rounded corners

### Subject Management
- **Subject Cards:** Compact cards with subject name, topic count, quick actions (edit/delete icons)
- Expand/collapse pattern: Click subject to reveal topics beneath
- **Add Subject:** Prominent button or inline form at top of subjects list

### Topic Management
- **Topic List Items:** Each showing topic title, confidence badge, update controls
- Confidence badges: Pill-shaped with emoji prefix (🔴 Not Confident, 🟡 Somewhat, 🟢 Confident)
- **Confidence Toggle:** Radio group or segmented control allowing one-click updates
- **Add Topic:** "+ Add Topic" button within each subject section

### Priority List View
- **Auto-sorted Display:** All topics across subjects, sorted by confidence (red → yellow → green)
- Include subject tag/label for context ("Math: Calculus")
- Dividers between confidence groups with count headers ("🔴 Need Attention (5 topics)")
- Message banner at top: "Focus on these topics first" for red items

### Forms
- **Input Fields:** Clean text inputs with subtle borders, focus states
- Labels above inputs (text-sm font-medium)
- Submit buttons: Primary style, positioned bottom-right of forms
- Cancel/secondary actions: Ghost or outline style

### Visual Elements
- **Icons:** Lucide React for all UI icons (Plus, Edit, Trash, ChevronDown, AlertCircle)
- **Confidence Emojis:** Use actual emoji characters (🔴🟡🟢) for immediate recognition
- **Separators:** Subtle borders (border-gray-200 equivalent) between list items
- **Empty States:** Centered message with icon when no subjects/topics exist

---

## Interaction Patterns

**Confidence Updates:**
- Single-click toggle between three states
- Visual feedback on selection (selected state styling)
- Immediate update to priority list

**Subject Expansion:**
- Accordion-style: Click subject card to reveal/hide topics
- Smooth height transition (avoid jarring jumps)

**Adding Items:**
- Inline forms appear on click
- Auto-focus first input field
- Escape key to cancel, Enter to submit

**Deletion:**
- Confirmation step for subjects with topics
- Direct deletion for individual topics (with undo option preferred)

---

## Responsive Behavior

**Mobile (< 768px):**
- Stack all dashboard cards vertically
- Full-width subject/topic cards
- Simplified confidence toggle (vertical radio group)
- Hide secondary information, show only essentials

**Tablet (768px - 1024px):**
- 2-column dashboard grid
- Maintain card-based layout with comfortable touch targets

**Desktop (1024px+):**
- 3-column dashboard grid
- Side-by-side subject management and priority list (optional layout)
- Hover states for interactive elements

---

## Accessibility

- Semantic HTML: Use proper heading hierarchy, lists, buttons
- Focus indicators: Visible focus rings on all interactive elements
- ARIA labels: For icon-only buttons ("Edit subject", "Delete topic")
- Keyboard navigation: Tab through all controls, Enter to activate
- Screen reader friendly: Announce confidence level changes

---

## Images

**No hero image required.** This is a utility application where users want immediate access to their data. The dashboard serves as the entry point, prioritizing functional content over marketing visuals.