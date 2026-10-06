# GLC UI implementation contract
All future screens must use the existing GLC design system. Read docs/design-system.md before UI work.
- Reuse src/components/ui primitives and compose feature components from them.
- Use semantic Tailwind tokens from src/app/globals.css. Do not create competing palettes, typefaces, or radius scales.
- Extend the shared system if a new pattern is necessary; document it on /design-system.
- Keep route files in src/app, shared primitives in components/ui, feature components in components/<feature>, and typed data in src/lib.
- Preserve supplied Figma static assets. Use lucide-react for additional icons.
- Make controls keyboard accessible, label icon buttons, and respect reduced motion.
- Use responsive layouts. Data tables scroll inside their container on mobile; numeric columns align right.
- Keep demo data explicit; do not invent live financial records or pretend a filter fetches server data.
- Run npm run build and npm run typecheck after substantive changes.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
