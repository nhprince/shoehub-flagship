# SHOEHUB — Flagship Autonomous Digital Experience

An immersive, production-grade digital flagship designed for a visionary luxury biomechanical footwear house. Built at the convergence of high-end fashion editorial presentation, Apple-tier engineering scrollytelling, and real-time 3D WebGL interactivity.

---

## 🏛️ Experience Pillars

1. **3D WebGL Scrollytelling Stage**
   - Built with Three.js and React Three Fiber.
   - Choreographed scroll states showcasing the Toray T700 carbon propulsion arch, directional micro-siped traction lugs, and seamless circular knit upper.
   - Dynamic PBR variant switching (`midnight`, `beach`, `street`) with 360° rotational flourish on color switch.
   - Responsive scaling calibrated for commanding viewport presence across standard and 4K displays.

2. **Liquid Glass Design System**
   - Sourced from the reference design system architecture.
   - Proportional root scale: `clamp(0.75rem, 1.1713vw, 2.8125rem)` on `html` ensuring 100% fluid responsive scaling across any resolution.
   - Dual-specular liquid pills (`.ios26-liquid-pill`) and backdrop-blurred glass pedestals (`.glass-panel`).

3. **Editorial Typography & Tone**
   - Typeset in Google Fonts `Outfit` and `Space Grotesk`.
   - Strictly no screaming all-caps blocks or pseudo-technical markers.
   - Refined Title Case and Sentence Case aligned with luxury fashion houses.

4. **Acoustic & Tactile Feedback**
   - Synthesized Web Audio API sound engine providing subtle luxury haptic clicks and alerts.

---

## 📁 Repository Context & Plans

- **Master Plan & Architecture**: [`PROJECT_PLAN.md`](./PROJECT_PLAN.md)
- **Active Progress Tracking**: [`PROGRESS.md`](./PROGRESS.md)
- **Design System Inspiration Reference**: Sourced in `docs/`

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Motion Engine**: Framer Motion
- **Smooth Scrolling**: Lenis
- **Icons**: Lucide React

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

© 2026 ShoeHub Atelier. All rights reserved.
