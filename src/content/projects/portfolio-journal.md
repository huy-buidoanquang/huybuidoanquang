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

I wanted a personal corner of the web that could hold software projects and trip photo essays with the care of a printed photobook — while staying static, lightweight, and fast to open.

## Custom 3D canvas without heavy dependencies

Rather than shipping a giant 3D library for simple pages, the homepage terrain mesh and each trip's subtle background atmosphere (coastal light, drifting clouds, March peach petals, forest spores) run on small vanilla TypeScript `<canvas>` engines that pause in background tabs and respect `prefers-reduced-motion`.

## Bilingual, typed, and easy to add to

Every story and project is a plain Markdown/MDX file checked by Zod schemas at build time, compiled into mirrored English (`/`) and Vietnamese (`/vi/`) static pages with optimized WebP photos and deployed on **Cloudflare Workers Static Assets**.
