# GLC Accounts Dashboard
Next.js App Router, TypeScript, Tailwind CSS v4, Lucide React, GSAP.

## Run
npm install
npm run dev

Open http://localhost:3000. The floating tabs switch between the Farmland Revenue screen and /design-system.

## Structure
- src/app: routes, layout, global design tokens
- src/components/ui: shared building blocks
- src/components/dashboard: revenue card composition
- src/lib: typed Figma sample data
- public/assets: downloaded original Figma SVGs
- docs/design-system.md: design decisions and extension rules
- AGENTS.md: instructions for future coding agents

## Validate
npm run build
npm run typecheck

Reference: Figma GLC Re-Design, screen 8119:11220. Financial figures are supplied sample values; no backend is connected. Region filtering, date selection and region dialogs are interactive preview features.
# Accounts-dashboard
