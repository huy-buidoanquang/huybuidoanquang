---
title: "Portfolio × Journal"
summary: "This static bilingual site — Astro, TypeScript, custom 3D Canvas atmospheres, bespoke expedition themes, and an interactive Vietnam map deployed on Cloudflare Workers."
cover: "../../assets/cosmos-impasto.webp"
coverAlt: "Painted nocturnal cosmos impasto backdrop of the Portfolio and Journal homepage"
theme: "night"
atmosphere: "clouds"
repoUrl: "https://github.com/huy-buidoanquang/huybuidoanquang"
liveUrl: "https://huybuidoanquang.com"
stack: ["Astro", "TypeScript", "MDX", "3D Canvas", "Cloudflare Workers"]
year: "2026"
role: "Design, Engineering & Photography"
order: 4
---

This site started with a simple goal: build a personal home on the web that feels as authored and atmospheric as a printed photo book while staying lightweight, static, and fast.

## Custom 3D atmospheres without heavy frameworks

Instead of pulling in bloated runtime dependencies for simple pages, the homepage's 3D topographic terrain and every destination's bespoke atmosphere (coastal light, drifting cloud seas, falling March peach blossoms, glowing alpine spores) are rendered on lightweight vanilla TypeScript `<canvas>` engines that pause automatically in background tabs and honor `prefers-reduced-motion`.

## Bilingual, schema-validated, and built to grow

Every story and project lives as plain Markdown/MDX validated at build time by strict Zod schemas, compiled into mirrored English (`/`) and Vietnamese (`/vi/`) static HTML pages with responsive WebP photo sets and deployed directly to **Cloudflare Workers Static Assets**.
