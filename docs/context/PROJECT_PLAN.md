# ShoeHub — World-Class Digital Experience Master Plan

## 1. Project Overview & Vision
ShoeHub is a flagship digital experience designed for a visionary luxury biomechanical footwear house. It bridges the gap between high-end fashion campaigns (Balenciaga, Acne Studios), Apple-level product engineering showcases, and modern luxury e-commerce with real-time 3D WebGL interactivity.

---

## 2. Core Architecture & Tech Stack
- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 + Custom Liquid Glass Design System
- **Responsive Root**: Liquid VW unit formula from reference:
  `@media (min-width: 48rem) { html { font-size: clamp(0.75rem, 1.1713vw, 2.8125rem); } }`
- **3D Graphics**: Three.js + `@react-three/fiber` + `@react-three/drei`
- **Animation & Motion**: Framer Motion + Lenis Smooth Scroll
- **Audio Architecture**: Web Audio API synthesized tactile haptics & luxury acoustic feedback
- **Iconography**: Lucide React

---

## 3. Design System & Brand Identity

### A. Color Palette
- **Obsidian Dark Void**: `#09090b` (Deep, pure slate background; eliminates generic AI color mud)
- **Elevated Glass Panels**: `#111116` / `#18181f` with 0.08 alpha white borders
- **Electric Volt Accent**: `#bef264` (Precise, surgical kinetic energy indicator)
- **Warm Champagne Titanium**: `#c9b07a` / `#f0ede6` (High-end metallic reflection)
- **Deep Cyan Technical**: `#38bdf8` / `#0e2433` (Aerospace grade accents)

### B. Typography Hierarchy
- **Headline & Primary**: Google Fonts `Outfit` (weights 300 to 800)
- **Technical & Telemetry**: Google Fonts `Space Grotesk`
- **Editorial Rule**: Strictly **no** screaming all-caps blocks and **zero** pseudo-hacker `//` markers. All headlines and subheads adhere to refined editorial Title Case and Sentence Case.

### C. Glassmorphism & Liquid Surfaces
- `.glass-panel`: Backdropped with `backdrop-filter: blur(24px)`, specular border highlights, and dark translucent pedestals.
- `.ios26-liquid-pill`: Dual radial gradient specular highlights simulating Apple VisionOS / iOS 26 fluid glass capsules.

---

## 4. 3D Scrollytelling Choreography (ShoeStage)
- **Model**: Khronos MaterialsVariants athletic sneaker (`public/models/shoe.glb`).
- **Scale Calibration**: Boosted to ~5.85x scale to fix the 0.297m raw model bounding box, giving it an imposing, commanding presence.
- **GLTF Variant Switching**: Real-time switching between embedded variants (`midnight`, `beach`, `street`) and tuned PBR roughness/metalness parameters.
- **Spin Flourish**: Dynamic 360° rotational flourish with scale bounce on colorway switch.
- **Continuous Scroll Keyframes**:
  - **Stage 0 (Hero, 0%–28%)**: Floating 3/4 beauty angle, organic breathing hover, live colorway picker.
  - **Stage 1 (Carbon Shank, 28%–55%)**: Smooth glide to the right, lateral profile revealing the Toray T700 carbon propulsion arch.
  - **Stage 2 (Traction Lugs, 55%–80%)**: Glides left, 45° upward pitch presenting the directional wet-grip rubber lugs.
  - **Stage 3 (Aeroweave Knit, 80%–100%)**: Top-down nose pitch detailing the Japanese monofilament seamless circular knit.

---

## 5. Sections & Narrative Architecture
1. **Navbar**: Floating liquid glass pill with brand wordmark, quick section jumps, currency switcher, sound toggle, and live cart drawer trigger.
2. **ScrollShoeStage**: Sticky WebGL canvas with synchronized story cards.
3. **Manifesto**: The brand philosophy ("We reject the compromise between raw velocity and quiet luxury") with telemetry metrics and editorial imagery.
4. **Collection (Permanent Archive)**: Curated silhouettes (`AERO-01`, `FORM-X`, `FLOW`, `CORE`, `STUDIO`) on cohesive dark studio pedestals with active colorway selection and Quick View modal.
5. **MaterialLab**: Interactive material telemetry comparator and laboratory specification breakdown.
6. **Lookbook (Field Dispatch)**: Editorial photography captured across Tokyo, Dolomites, and Zurich.
7. **Reviews**: High-fashion and athletic editorial critique (Highsmith Journal, Wired, Hypebeast).
8. **FinalCTA**: VIP allocation registry with instant access key confirmation.
9. **Footer**: Luxury sitemap, sustainability compliance disclosures, and back-to-top control.
10. **Cart Drawer & QuickView Modal**: Slide-over interactive cart with live shipping calculation, size selector, and free shipping progress meter.
