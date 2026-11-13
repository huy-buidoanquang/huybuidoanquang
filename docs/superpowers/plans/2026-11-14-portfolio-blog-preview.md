# Portfolio × Journal Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a working personal portfolio preview with a guided 3D scroll journey, editable sample stories, and a GitHub publishing guide.

**Architecture:** Astro generates the portfolio, project, destination, and journal pages as static HTML. The home page progressively loads one Three.js scene whose camera follows scroll progress, while semantic HTML remains usable without WebGL. GitHub stores Markdown content and images; Cloudflare Pages serves the built `dist/` directory.

**Tech Stack:** Astro, TypeScript, Three.js, CSS, Markdown content collections, Cloudflare Pages.

**Spec:** `docs/superpowers/specs/2026-11-14-portfolio-blog-design.md`

## Global Constraints

- First deliverable is a working preview with clearly labeled sample content.
- Use Node.js v22.23.4 or higher, as required by current Astro installation docs; this machine currently has no `node` executable in PATH.
- Home journey order is person → projects → journeys; scroll drives the camera.
- Every project and destination waypoint has a direct HTML link.
- Articles remain readable without the 3D bundle.
- Reduced motion, no WebGL, keyboard, mobile, and slow connections retain the same content and links.
- Owner edits content and images through GitHub's browser interface.
- Deploy a static `dist/` build to Cloudflare Pages after a GitHub repository is connected; domain setup follows preview approval.
- Preserve the existing `AGENTS.md`; it describes an unrelated HMA solution and does not reflect this new site.

## Review Focus

- Missing cover image or alt text: content validation must fail with the entry name (Task 1).
- New post with unfamiliar style token: build must reject it clearly rather than silently misstyle the page (Task 1).
- WebGL unavailable: home page must show chapters and working links (Task 3).
- Reduced motion or keyboard navigation: scene motion is optional and every destination remains reachable (Task 3).
- Small viewport or slow network: essential text appears before the 3D code and images below the fold load later (Task 4).

---

### Task 1: Static project and editable content

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/content.config.ts`
- Create: `src/data/profile.json`, `src/content/{projects,destinations,posts}/` with labeled examples
- Create: `src/assets/` with local sample imagery or locally generated placeholders
- Create: `CONTENT_GUIDE.md`
- Preserve: `AGENTS.md`

**Interfaces:**
- Produces collections `projects`, `destinations`, `posts`; each entry has `title`, `summary`, `cover`, `coverAlt`, and `theme`. Project and destination entries expose a slug; posts also expose `date` and `category`.
- Produces `profile.json` with `name`, `intro`, `location`, and `socials`.

- [ ] Make a compatible Node.js runtime available, then install Astro, Three.js, `@astrojs/check`, and TypeScript; set `output: 'static'` and scripts `dev`, `build`, `check`, `test`.
- [ ] Define content collection schemas, including an enum of supported themes and required local image plus alt text. Add one sample entry per collection.
- [ ] Run `npm run build` with a deliberately invalid temporary entry for missing alt text and unknown theme; confirm a named validation error, then remove the temporary entry.
- [ ] Write `CONTENT_GUIDE.md`: edit profile and Markdown in GitHub, upload/replace a colocated image, duplicate a sample entry, choose a theme, create a branch, inspect its Pages preview, then merge.
- [ ] Run `npm run check && npm run build`; expected: zero diagnostics and generated `dist/`.
- [ ] Commit the task once a Git repository is available.

### Task 2: Portfolio and story pages

**Files:**
- Create: `src/layouts/BaseLayout.astro`, `src/layouts/StoryLayout.astro`
- Create: `src/pages/index.astro`, `src/pages/projects/[id].astro`, `src/pages/places/[id].astro`, `src/pages/journal/index.astro`, `src/pages/journal/[id].astro`
- Create: `src/styles/global.css`, `src/styles/stories.css`

**Interfaces:**
- Consumes Task 1 collections and profile.
- Produces static HTML routes and semantic `#person`, `#projects`, `#journeys` chapter targets for Task 3.

- [ ] Build the shared shell with navigation, responsive typography, SEO metadata, skip link, and visible focus states.
- [ ] Render home chapters as an editorial sequence with real links and labeled sample data; avoid card grids.
- [ ] Render project, destination, journal index, and article routes from content collections. Apply each entry's theme to typography, colors, image composition, and section rhythm while retaining readable body text.
- [ ] Run `npm run check && npm run build`; inspect generated routes and confirm each sample entry has a linked page.
- [ ] Commit the task once a Git repository is available.

### Task 3: Guided 3D journey

**Files:**
- Create: `src/journey/JourneyCanvas.ts`, `src/journey/scrollProgress.js`, `src/journey/scrollProgress.test.mjs`
- Modify: `src/pages/index.astro`, `src/styles/global.css`

**Interfaces:**
- Consumes home chapter targets from Task 2.
- Produces `getScrollProgress(scrollY, scrollableHeight)` returning a clamped number in `0..1`, plus one canvas enhancement that observes chapter positions, maps scroll to a camera path, and never owns navigation links.

- [ ] Write a small `node:test` check for scroll progress at the start, midpoint, end, and a zero-height document; expected progress stays within `0..1`.
- [ ] Implement `getScrollProgress(scrollY, scrollableHeight)` in `scrollProgress.js` and run `npm test`; expected: pass.
- [ ] Build one coherent scene motif that changes across the three chapters; interpolate camera position from scroll progress and add subtle pointer response. Keep a still poster visible until the scene is ready.
- [ ] Gate initialization for reduced motion and unavailable WebGL; stop the render loop when hidden and release GPU resources on teardown.
- [ ] Inspect home navigation by keyboard and with WebGL disabled; expected: all chapters and destination links work without canvas.
- [ ] Commit the task once a Git repository is available.

### Task 4: Performance, preview, and deployment handoff

**Files:**
- Modify: `src/pages/index.astro`, `src/layouts/BaseLayout.astro`, `src/styles/global.css`, `CONTENT_GUIDE.md`
- Create: `README.md`

**Interfaces:**
- Consumes the static pages and canvas from Tasks 2–3.
- Produces a local preview and documented Cloudflare Pages settings: build `npm run build`, output `dist`.

- [ ] Keep 3D imports on the home route and initialize after essential content; optimize sample images and lazy load offscreen media.
- [ ] Inspect desktop and phone layouts, reduced motion, low network speed, and no WebGL. Confirm first text is visible promptly and articles load without the 3D bundle.
- [ ] Run the scroll progress test, `npm run check`, and `npm run build`; expected: all pass and static routes exist.
- [ ] Document local preview commands, GitHub editing, Pages branch previews, and the later custom-domain handoff in `README.md`.
- [ ] If repository and Cloudflare access are available, publish a Pages preview only; otherwise provide the tested `dist/` build and exact connection steps.
- [ ] Commit the task once a Git repository is available.
