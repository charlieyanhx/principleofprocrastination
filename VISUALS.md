# Visual Design & Animation Inventory

All images, animations, icons, and visual design elements used on the site.

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#fafafa` | Page background |
| Foreground | `#0a0a0a` | Primary text |
| Muted | `#737373` | Secondary text |
| Border | `#e5e5e5` | Dividers, card borders |
| Accent | `#b98b55` | Gold — CTAs, highlights, animation accents |
| Font heading | Inter (bold/semibold) | All headings |
| Font body | Inter (regular) | Body text |
| Font CN | Noto Sans SC | Chinese text |
| Font decorative | serif variable (--font-serif) | "懒人原则" decorative heading |
| Radius | 12px cards, 8px buttons | Rounded corners |

**Visual philosophy:** Minimal, spatial. No glassmorphism, no gradients. Depth through whitespace and thin 1px borders. Apple/Linear/Notion-inspired.

---

## Logos & Static Images

| File | Location | Usage |
|------|----------|-------|
| `logo-authentic.png` | `public/` | English logo — used in header |
| `logo-authentic-zh.png` | `public/` | Chinese logo — used in header when locale=zh |
| `mark.svg` | `public/` | Logo mark only (no text) |
| `favicon.svg` | `public/` | Browser favicon |

---

## Art / Photography (Background images)

All in `public/art/`. Licensed — see `public/art/LICENSES.md`.

| File | Artist | Usage |
|------|--------|-------|
| `mehretu-howl-eon.jpg` | Julie Mehretu | Resource card background |
| `horn-estel-ferit.jpg` | Roni Horn | Resource card background |
| `chung-performance.jpg` | Y.Z. Kami / related | Resource card background |
| `tinguely-stravinsky-fountain.jpg` | Jean Tinguely | Resource card background |
| `serra-fulcrum.jpg` | Richard Serra | Resource card background |

---

## Canvas Animations (Complex, frame-by-frame)

### 1. Jacquard Loom — `HeroKineticMachine.tsx`
- **Location on site:** Hero section, right side
- **What it shows:** A vertical loom with punch card, heddle zone, shuttle crossing back and forth, warp threads lifting/lowering, woven fabric pattern emerging below
- **Tech:** Canvas API, requestAnimationFrame, retina-aware (devicePixelRatio)
- **Behavior:** Always running, fades on scroll-down (useScroll + useMotionValueEvent)
- **Size:** Full hero area (right 72% anchor, 35% vertical anchor)
- **Constants:** 32 threads, 14px spacing, 480px loom height, 48 pattern rows, 60px/s shuttle speed
- **Colors:** Gold (#b98b55) for threads/shuttle, light gray (#e5e5e5) for frame, dim gray for structure
- **Metaphor:** The machine that replaced mass human labor in textiles and birthed computing (punch cards → Babbage → modern programming). Threads = data streams, shuttle = coordinating agent, pattern = organized output.

### 2. Newton's Cradle — `JansenLinkage.tsx`
- **Location on site:** Philosophy section, above "懒人原则" text
- **What it shows:** Classic Newton's cradle — 5 balls on strings, outer balls swing alternately
- **Tech:** Canvas API, requestAnimationFrame, retina-aware
- **Behavior:** Starts on scroll-into-view (useInView), static until triggered
- **Size:** 420x240px
- **Colors:** Gold (#b98b55) for balls/highlight, gray (#d4d4d4) for frame/strings
- **Constants:** 5 balls, BALL_R=14, STRING_LEN=130, 45 degree max swing
- **Metaphor:** Energy transfers itself, the laziest machine. Momentum conservation as industrial philosophy.

---

## SVG Animations (CSS keyframes)

### 3. Conveyor Belt — `ChainReaction.tsx`
- **Location on site:** Industrial Break section (between "Built for industry" outcomes)
- **What it shows:** Two rollers with spinning spokes, belt lines, 5 packages moving continuously across
- **Tech:** SVG + CSS @keyframes, clipPath for infinite looping
- **Behavior:** Starts on scroll-into-view, rollers spin, packages loop infinitely
- **Size:** 600x100 viewBox, max-w-2xl
- **Colors:** Gold (#b98b55) for belt/rollers/packages when active, gray (#d4d4d4) when inactive
- **Key technique:** Packages use `animation: slidePackage infinite` with staggered negative `animation-delay` + `clipPath` to always show packages on belt

### 4. Signal Aggregate Icon — `SystemBoardIcons.tsx` (GearTrainIcon)
- **Location on site:** System Board section, "Signal agents" column
- **What it shows:** 3 input streams (dashed lines) converging to a center gold node, single output arrow
- **Tech:** SVG + CSS @keyframes (stream-flow, pulse-out, node-pulse)
- **Size:** 64x64px (viewBox 48x48, rendered at 64)
- **Colors:** White-40% for input streams, gold for merge node and output

### 5. Decision Router Icon — `SystemBoardIcons.tsx` (CamMechanismIcon)
- **Location on site:** System Board section, "Decision agents" column
- **What it shows:** Input line, junction node, switch arm toggles between two output routes (upper/lower paths)
- **Tech:** SVG + CSS @keyframes (switch-toggle, path-a-glow, path-b-glow)
- **Size:** 64x64px (viewBox 48x48, rendered at 64)
- **Colors:** White-40% for input, gold for active route, alternating

### 6. Execution Broadcast Icon — `SystemBoardIcons.tsx` (PistonIcon)
- **Location on site:** System Board section, "Execution agents" column
- **What it shows:** Center source node with expanding ring pulse, 5 broadcast lines radiating to endpoint nodes
- **Tech:** SVG + CSS @keyframes (broadcast-pulse, ring-expand)
- **Size:** 64x64px (viewBox 48x48, rendered at 64)
- **Colors:** Gold for source/lines, white-40% for endpoints

---

## Decorative / Structural Visual Components

### 7. Blueprint Grid — `BlueprintGrid.tsx`
- **Usage:** Background texture on certain sections
- **What it shows:** Faint grid lines, technical drawing feel

### 8. Blueprint Watermarks — `BlueprintWatermarks.tsx`
- **Usage:** Subtle background marks
- **What it shows:** Faint technical annotations/marks

### 9. Art Background — `ArtBackground.tsx`
- **Usage:** Background treatment using art images
- **What it shows:** Blurred/faded art photography as section backgrounds

### 10. Art Divider — `ArtDivider.tsx`
- **Usage:** Section separator
- **What it shows:** Thin decorative line with art treatment

### 11. Scroll Progress Bar — `ScrollProgressBar.tsx`
- **Usage:** Fixed element showing page scroll position
- **What it shows:** Thin gold bar at top of viewport

### 12. Resource Card Tops — `ResourceCardTops.tsx`
- **Usage:** Visual headers for resource/article cards
- **What it shows:** Art-based card top decorations

### 13. Technical Icons — `TechnicalIcons.tsx`
- **Usage:** Various technical/UI icons
- **What it shows:** Small utility icons

---

## Motion Components (Framer Motion)

### FadeUp — `motion/FadeUp.tsx`
- Wraps content, animates from opacity:0 + translateY to visible on scroll-into-view
- Uses IntersectionObserver via framer-motion useInView

### StaggerGroup — `motion/StaggerGroup.tsx`
- Container that staggers children's FadeUp animations with delay

### ParallaxBlock — `motion/ParallaxBlock.tsx`
- Applies parallax scroll effect to wrapped content

---

## Unused / Legacy Visual Components

These exist in the codebase but may not be actively used on the current site:

| File | Description |
|------|-------------|
| `ChainDrive.tsx` | Chain drive mechanism animation |
| `ConveyorBelt.tsx` | Alternative conveyor belt (separate from ChainReaction) |
| `HydraulicPiston.tsx` | Hydraulic piston animation |
| `ServiceMechanisms.tsx` | Service page mechanism illustrations |

---

## Layout Notes

- **Hero:** Full viewport height. Text left, Jacquard loom animation right. Content fades up in sequence.
- **Problem Framing:** Horizontal scroll cards on mobile, inline on desktop. Thin top-border accent.
- **System Board:** DARK section (black bg, white text). 3-column with animated icons. Strongest visual break.
- **Solution Path:** Giant numbered steps (01, 02, 03) with vertical progress line. Asymmetric layout.
- **Industrial Break:** Full-width. Large statement text. Conveyor belt animation. Thin rules above/below.
- **Credibility Grid:** 2-column asymmetric (60/40). Large card left, 3 stacked mini-cards right.
- **Philosophy Block:** Centered narrow column (max-640px). Newton's cradle above "懒人原则" decorative text.
- **Closing CTAs:** 3-column equal grid. Cards with hover lift.
