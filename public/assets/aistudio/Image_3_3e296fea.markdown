---
name: Precision Instrument
colors:
  surface: '#faf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#faf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f4f0'
  surface-container: '#efeeea'
  surface-container-high: '#e9e8e4'
  surface-container-highest: '#e3e2df'
  on-surface: '#1b1c1a'
  on-surface-variant: '#46464a'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ed'
  outline: '#77767b'
  outline-variant: '#c7c6ca'
  surface-tint: '#5f5e60'
  primary: '#010102'
  on-primary: '#ffffff'
  primary-container: '#1c1c1e'
  on-primary-container: '#858486'
  inverse-primary: '#c8c6c8'
  secondary: '#605e5a'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfd9'
  on-secondary-container: '#64635e'
  tertiary: '#020100'
  on-tertiary: '#ffffff'
  tertiary-container: '#2b1800'
  on-tertiary-container: '#b97500'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e4e2e4'
  primary-fixed-dim: '#c8c6c8'
  on-primary-fixed: '#1b1b1d'
  on-primary-fixed-variant: '#474649'
  secondary-fixed: '#e5e2dc'
  secondary-fixed-dim: '#c9c6c0'
  on-secondary-fixed: '#1c1c18'
  on-secondary-fixed-variant: '#484742'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#faf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e3e2df'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  mono-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: -0.01em
  mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system treats the digital interface as a calibrated physical instrument. Drawing direct cues from high-end industrial engineering consoles and deterministic developer tools, the aesthetic strips away ephemeral software ornamentation—gradients, faux blurs, and floating elevation—in favor of structural discipline, visible joints, and tangible surface contrast.

### Core Tenets
- **Machined Utility:** Every element occupies a functional position governed by physical container logic. Interactive components mimic physical keycaps, milled toggles, and screen-printed indicators.
- **Architectural Density:** Information density is embraced rather than diluted. Negative space operates as deliberate structural bracing, not arbitrary emptiness.
- **Audience & Resonance:** Built for engineers, system architects, and technical operators who demand low cognitive friction, instantaneous spatial orientation, and reliable feedback loops.

## Colors

The palette reproduces tactile hardware finishes: raw unbleached paper, powder-coated matte white steel, and precision-etched charcoal housings. Functional signaling relies on deliberate, single-wavelength accent strikes rather than decorative sweeps.

### Roles & Applications
- **Base Canvas (`#F7F6F2`):** The foundational substrate. Replaces clinical white with a warm, non-glare alabaster paper ground.
- **Panel Surface (`#FFFFFF`):** High-priority structural panels, input fields, and modular card interiors. Operates strictly in flush or inset contact with the base canvas.
- **Primary Ink / Hairline (`#1C1C1E`):** Pure functional charcoal. Applied to all structural 1px wireframes, structural dividers, primary typography, and active key surfaces.
- **Structural Slate (`#D6D3CD`):** Secondary structural dividers, inactive states, key boundaries, and background grid guides.
- **Signal Accents (Status & State):**
  - **Signal Amber (`#F59E0B`):** System warnings, focus retainers, active mechanical modes, and parameter highlights.
  - **Vermilion Red (`#EF4444`):** Hardware-level errors, destructive triggers, and critical thresholds.
  - **Forest Emerald (`#10B981`):** Verified telemetry, valid states, nominal system health, and execution success.
- **Restraint Rules:** Accent colors never cover large surface areas; they are applied exclusively to hairline pips, 2px state lines, micro-badges, and monospaced telemetry values.

## Typography

Typography establishes an uncompromising hierarchy between qualitative prose and deterministic data.

### Structural Division
- **Hanken Grotesk (Human Layer):** Handles semantic navigation, titles, structural labels, and long-form narrative. Scaled with tight, Swiss-influenced tracking to preserve optical density.
- **JetBrains Mono (System Layer):** Governs metrics, indices, timestamps, parameter keys, table values, status tags, and machine code. Always typeset with explicit tabular numerals (`tnum`).
- **Micro-Labels (`label-caps`):** Applied to group titles, port labels, and column headers. Rendered in all caps with expanded tracking (`0.08em`) to mirror screen-printed hardware faceplates.

## Layout & Spacing

Layout conforms strictly to an intersecting, non-collapsing multi-column framework. Modules abut one another with visible seams rather than drifting across free-floating space.

### Grid & Structure
- **Desktop (>= 1024px):** 12-column or 16-column fixed-ratio fluid grid. Outer margins are locked to `2rem` (`margin-desktop`), with `1.5rem` gutters. Panels are organized into interlocking modular tiles bounded by visible `1px` lines.
- **Tablet (768px - 1023px):** 8-column layout. Gutters compress to `1rem`. Secondary analytical modules collapse beneath operational controls.
- **Mobile (< 768px):** Single-column stacked vertical rail. Margins clamp to `1rem`. Horizontal scrolling trays are prohibited in favor of explicit vertical blocks or index-switched tabs.

### Boundary Rules
- Gaps and padding must adhere strictly to the 4px mathematical scale (`0.25rem`, `0.5rem`, `0.75rem`, `1.25rem`, `2rem`).
- Neighboring modules share a unified `1px` divider to avoid doubled boundary lines.

## Elevation & Depth

This system operates entirely without z-axis optical drop shadows. Visual depth is derived purely through surface value shifts, containment nesting, and high-precision line work.

### Depth Hierarchy
- **Level 0 (Base Canvas):** Background substrate (`#F7F6F2`). Never sits above components.
- **Level 1 (Panels & Enclosures):** Solid matte panels (`#FFFFFF`) bound by a continuous `1px solid #1C1C1E` or `1px solid #D6D3CD` perimeter stroke.
- **Level 2 (Recessed Wells & Trays):** Depressed interactive areas (search fields, terminal consoles, code blocks) rendered on base canvas (`#F7F6F2`) with an inner 1px border, creating a machined, inset physical pocket.
- **Level 3 (Tactile Overlays & Modals):** Flyout drawers and command palettes retain 100% opacity `#FFFFFF` fill with an intensified `2px solid #1C1C1E` outer boundary. Backdrops use a semi-opaque neutral scrim (`#1C1C1E` at 30% opacity) without blur filters.

## Shapes

The geometric silhouette evokes stamped aluminum, injection-molded chassis, and precision-milled hardware.

### Corner Radius System
- **Structural Modules & Cards:** Standard `rounded-sm` (4px). Matches the interior corner curvature of micro-milled instrument panels.
- **Interactive Units (Buttons, Inputs, Triggers):** `4px` to `6px`. Never circular, never pill-shaped.
- **Status Indicators & Micro Tags:** `2px` or sharp `0px` chamfered feel.
- **Tab Indicators & Active Indicators:** Strict rectangles (`0px` border-radius) clamped directly to panel edges.

## Components

### Buttons & Keycaps
- **Primary:** Background `#1C1C1E`, text `#FFFFFF`, 1px border `#1C1C1E`. On press, shifts instantaneously (0ms delay) to background `#2E2E32` with an active 1px inward offset to mimic a physical microswitch.
- **Secondary:** Background `#FFFFFF`, text `#1C1C1E`, 1px border `#1C1C1E`.
- **Tertiary / Subdued:** Background `#F7F6F2`, text `#1C1C1E`, 1px border `#D6D3CD`.
- **Key Caps (Hotkeys):** Rendered in JetBrains Mono (`label-caps`), framed in a 1px `#D6D3CD` border with a 1px solid bottom edge `#1C1C1E` to simulate key depth.

### Input Fields & Controls
- **Text Inputs:** Surface `#FFFFFF`, border `1px solid #1C1C1E`, corner radius 4px. Typographic entry in `mono-lg` or `body-sm`. Focused state introduces a sharp `2px solid #F59E0B` outline with zero blur ring.
- **Checkboxes & Radios:** Sharp geometric boxes (checkboxes: 4px corner; radios: rigid square with inner dot). Inactive border `1px solid #1C1C1E`. Checked state fills `#1C1C1E` with an internal crisp white cross or square.

### Chips & Parameter Tags
- Constructed with JetBrains Mono (`mono-sm`). Bound by `1px solid #D6D3CD` on `#FFFFFF`.
- State indicators utilize a leading 6px × 6px square glyph (e.g., `#10B981` for active nominal, `#F59E0B` for pending queue).

### Modular Cards & Instrument Panels
- Encased in `#FFFFFF` with `1px solid #1C1C1E` or `1px solid #D6D3CD`.
- **Panel Header:** Separated from card body by a continuous horizontal 1px hairline rule. Contains uppercase section labeling (`label-caps`) alongside technical metadata or monospaced serial references.

### Segmented Switch Controls
- Inline horizontally docked panels. Enclosed in a single `#D6D3CD` bounding container.
- Individual options are separated by internal 1px hairbars. The selected state inverts to `#1C1C1E` background with `#FFFFFF` text.

### Data Tables & Spec Lists
- Strict tabular data using `mono-sm` for values and `label-caps` for column headers.
- Alternating horizontal rules using `1px solid #E5E3DC`. Zero vertical cell borders except for freeze-pane separators. Row hover triggers a uniform `#F7F6F2` tint.