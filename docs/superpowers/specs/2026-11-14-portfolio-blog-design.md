# Portfolio × Journal — Design

## Intent

Build a personal portfolio that draws visitors into an exploratory 3D scroll journey and leads them into writing about projects, interests, technical work, photography, and travel. The site should feel authored by one person rather than assembled from reusable cards. The first deliverable is a working preview with clearly labeled sample content; the owner will later publish through GitHub and deploy a static site to an existing Cloudflare Pages account and domain.

## Goals and boundaries

- The first visit moves through three connected chapters: **person → projects → journeys**. Scroll advances the camera; pointer and keyboard add small, optional interactions.
- Project and destination entrances lead to real, readable pages. Blog posts use each story's own palette, typography, imagery, and composition. Travel posts can have place-specific transitions or a small scene.
- The home page should be visually striking while remaining usable on phones, slow connections, reduced-motion settings, and devices without WebGL.
- Publishing a Markdown/MDX file and its images to GitHub should trigger a Pages rebuild once the GitHub repository is connected to Pages.
- The preview must include a plain-language editing guide and sample entries the owner can duplicate and change in GitHub's browser editor.
- The first release does not need accounts, comments, a browser editor, or a CMS. It must not require a 3D engine to read an article.

## Approaches considered

1. **Editorial portfolio with motion:** fast and straightforward, but lacks the exploration the owner wants.
2. **Navigable 3D world:** playful, but free roaming can hide projects and make navigation hard.
3. **Guided 3D journey:** selected. A continuous scroll path gives the immersive feeling the owner chose while preserving a clear route into the blog. Dennis Snellenberg informs the confident type and portfolio pacing; Lusion informs the sense of traveling through live 3D space. The scenes, objects, words, and images must express the owner's own identity.

## Experience

1. **Opening:** a cosmic environment comes into view; the owner's own portrait appears large when provided, while the name and one concise introduction stay legible over it. A visible scroll cue starts the trip.
2. **Personal chapter:** the camera passes details that reveal interests and background. Short text anchors the scene.
3. **Projects:** each project becomes a waypoint with a strong visual, name, role, and a direct link to a project page. Hover or focus can reveal more; clicking always works without precise 3D aiming.
4. **Travel:** the cosmic background crossfades smoothly into a location-verified photograph as the camera enters this chapter. Stars and orbits fade while the real landscape emerges. Each place has its own visual mood and leads to its travel story or photo essay.
5. **Journal:** a clear index offers travel, technical, photography, interests, and passion topics. Article pages prioritize text, images, captions, and navigation to the next story.

The 3D scene is an enhancement around semantic HTML links and headings. On mobile, reduced-motion, or unsupported devices, the same chapter order uses strong stills and direct links. Keyboard users can move between chapter targets and links without relying on camera controls.

## Content and visual authorship

Use Astro content collections for projects, destinations, and posts. Each entry supplies title, summary, date, category, cover image, alt text, and links; posts can also define palette, display type, section sequence, and a small set of layout treatments. Feature stories may use bespoke page components so every place is not forced into one template. Start with clearly marked sample content until the owner provides biography, project details, travel writing, and photographs.

The editing path is GitHub's web interface: edit a Markdown file for text and design fields, upload or replace images in the adjacent story folder, then commit to a branch and inspect its Pages preview before merging. Put the personal introduction and social links in one obvious profile data file. Include a `CONTENT_GUIDE.md` with annotated examples for adding a project, destination, or article; changing a cover and alt text; choosing a story style; and checking a preview. Invalid or missing required fields should fail the build with an understandable message.

Store original or preprocessed images with the GitHub project and publish optimized derivatives through the Pages build. GitHub is the content source; direct Google Drive image URLs are excluded from the primary delivery path because reliable sizing, caching, and availability are important to the experience.

## Implementation and performance

Use static Astro pages for navigation, SEO, and articles. Load one Three.js canvas on the home journey only, after the page's essential text and first visual are ready. Tie camera progress to scroll, keep scenes in one renderer, load later scene assets near their chapter, cap rendering resolution, pause when hidden, and dispose resources when leaving. Provide a static poster before 3D is ready. Keep article pages free of the journey bundle unless an individual story explicitly needs a small scene. Respect reduced motion and avoid hijacking ordinary scrolling.

Build a local preview first. Once the owner connects a GitHub repository, deploy static `dist/` output to Cloudflare Pages and use branch previews to review edits. Add the owner's existing domain after the preview is approved. The owner must supply the domain and Cloudflare access for that final setup.

## Open inputs and builder decisions

The owner still needs to provide the public name, introduction, initial projects, first destinations/posts, preferred contact links, original imagery, and the domain for launch. The builder may use labeled placeholders for this preview and should create one unmistakable scene motif before making many chapters. Visual treatment, exact 3D objects, and per-story compositions remain art-direction decisions to validate with a browser preview.

## References

- https://dennissnellenberg.com/
- https://lusion.co/
- https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
- https://docs.astro.build/en/guides/content-collections/
- https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files
