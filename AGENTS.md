# Repository Guidelines

## Project Overview

**Portfolio × Journal** is a static personal portfolio and travel/technical journal built with **Astro** (`output: 'static'`), `@astrojs/mdx`, TypeScript, and vanilla CSS. It deploys static output from `dist/` to **Cloudflare Pages**.

## Project Structure

- `src/pages/` — Static Astro routes (`index.astro`, `404.astro`, `journal/`, `places/`, `projects/`).
- `src/layouts/` — Shared layouts: `BaseLayout.astro` (shell, metadata, intro animation, header/footer) and `StoryLayout.astro` (detail layout for posts, projects, and destinations + lightbox dialog).
- `src/components/story/` — MDX story components (`Photo.astro`, `PhotoPair.astro`).
- `src/content/` — Content Collections (`projects/`, `destinations/`, `posts/`), validated by Zod schemas in `src/content.config.ts`.
- `src/data/profile.json` — Personal profile, responsive hero portrait paths, contact email, and social links.
- `src/assets/` — Optimized local imagery imported by Astro (`*.webp`, `*.svg`).
- `src/journey/` — Scroll-blending math (`scrollProgress.js`) and Node unit tests (`scrollProgress.test.mjs`).
- `src/styles/` — Stylesheets (`global.css`, `experience.css`, `story-themes.css`, `transitions.css`).
- `public/` — Static files served verbatim (`portrait*.webp`, `favicon.svg`).
- `docs/` — Design specs, plans, and per-destination art-direction briefs (`docs/art-direction/`).
- `CONTENT_GUIDE.md` — Authoring guide for editing content and photos directly via GitHub.

## Build, Check, and Test

Requires Node.js 22.23.4 or higher. Run from repository root:

- `npm run dev` — Start local Astro dev server.
- `npm test` — Run `node --test src/journey/*.test.mjs`.
- `npm run check` — Run `astro check` for TypeScript and Content Collection validation.
- `npm run build` — Build static site into `dist/`.

## Architecture & UX Rules

- Keep the site static and readable without JavaScript or WebGL; scroll-driven background crossfades are progressive enhancements.
- Preserve accessibility: semantic landmarks, skip link, `:focus-visible` outlines, descriptive `alt` text (enforced by `src/content.config.ts`), and `prefers-reduced-motion: reduce` fallbacks.
- Keep `src/content.config.ts` strict so missing images, missing alt text, or invalid `theme`/`category`/`storyStyle` fail the build clearly.
- Keep raw high-resolution source photos and local tooling inside `.tools/` (gitignored), not in the repository root.

## Coding Style

Follow `.editorconfig`: 4 spaces, UTF-8, LF line endings, trailing whitespace trimmed, and a final newline. Use TypeScript strict mode (`tsconfig.json`) and keep client scripts minimal and framework-free.

## Deployment & Security

- Do not commit secrets, credentials, or personal raw source assets.
- Deploy via GitHub connected to Cloudflare Pages (`npm run build`, output directory `dist`). Update `site` in `astro.config.mjs` once the production domain is configured.
