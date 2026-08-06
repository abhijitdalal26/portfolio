# Portfolio Website

Personal portfolio + blog for Abhijit Dalal.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3002)
npm run build    # Production build
npm run lint     # ESLint
vercel --prod    # Deploy to Vercel
```

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4** — configuration in `app/globals.css` via `@theme`, no `tailwind.config.js`
- **Scroll reveals** — `FadeUp` (`components/FadeUp.tsx`) is a dependency-free IntersectionObserver wrapper that fades + rises children into view once on scroll; honors `prefers-reduced-motion` and is SSR-safe. Reveal styles (`.reveal` / `.reveal-in`) live in `globals.css`.
- **next-mdx-remote/rsc** — renders MDX blog posts as React Server Components, with `rehype-slug` + `rehype-autolink-headings` (behavior: "wrap") so every `##`/`###` heading gets an anchor id and becomes clickable
- **gray-matter** — parses frontmatter from `.mdx` files
- **next-themes** — dark/light toggle via `class` on `<html>`; defaults to the visitor's OS preference (`system`, `enableSystem`)
- **Fonts** — Inter (`--sans`) is used everywhere: nav, hero, project pages, headings. Newsreader (`--disp`, serif, upright + italic) is reserved for the blog only — blog list/post titles, `.prose h2`/`h3`, and the homepage "Blog" section post titles. JetBrains Mono (`--mono`) is used for small uppercase labels, tags, and code blocks.

## Project Structure

```
app/
  layout.tsx           # Root: Providers (ThemeProvider), Nav, Footer
  globals.css          # Design tokens, responsive breakpoints, utility classes
  icon.svg             # Favicon — black "A" on off-white
  page.tsx             # Home (wave hero, "Currently Working On" + timeline projects, blog list) — Server Component
  projects/page.tsx    # Full project list (current + done, from lib/projects.ts)
  projects/[slug]/page.tsx # Project detail page (story, how it works, technical breakdown diagrams, my architecture, links/papers)
  blog/page.tsx         # Blog post list
  blog/[slug]/page.tsx  # Dynamic MDX post renderer + TOC sidebar
  about/page.tsx        # Bio + scrolling marquee strips (Areas/Stack) + links
  not-found.tsx         # Custom 404 page
  sitemap.ts            # Auto-generated sitemap (posts + projects)
  robots.ts
components/
  Nav.tsx              # "use client" — sticky nav, hamburger menu on mobile, theme toggle
  Providers.tsx        # "use client" — wraps children with ThemeProvider
  Footer.tsx
  ProjectCard.tsx      # "use client" — homepage/listing card: image (or cat/dog-style split cardPreview) + title/tagline, whole card links to detail page
  Toc.tsx              # "use client" — blog post table of contents: fixed toggle button in the post's own header (not the global nav), opens a left-side panel (not full-screen), stays open until explicitly closed
  WaveBg.tsx           # "use client" — Three.js particle wave background, used on homepage hero only
  JuliaHero.tsx        # "use client" — full-bleed canvas Julia-set fractal, absolutely positioned background behind the /blog hero title; cursor x maps across curated waypoint constants (rabbit, spiral, frost, filament, sparkle), idles through them when untouched
  FadeUp.tsx           # "use client" — IntersectionObserver scroll-reveal wrapper
  AnimatedSignature.tsx # Nav logo ("Ad" cursive signature)
content/blog/          # MDX source files (frontmatter: title, date, description)
lib/posts.ts           # getAllPosts(), getPost(slug), formatDate()
lib/projects.ts        # Project type + data (single source of truth for all project cards/pages)
lib/toc.ts             # extractHeadings() — parses ## headings from raw MDX, generates matching slugger ids for the TOC
```

Some older experimental background components (`Hero.tsx`, `AuroraBg.tsx`, `ParticlesBg.tsx`, `VantaBg.tsx`) and a shared `Marquee.tsx` are unused leftovers — not wired into any page. About page's scrolling strips use a local `Marquee` function defined inline in `app/about/page.tsx`, not the shared component.

## Design System

CSS variables defined in `:root` / `.dark` in `globals.css`:

| Token      | Light       | Dark        |
|------------|-------------|-------------|
| `--bg`     | `#fafaf9`   | `#121212`   |
| `--panel`  | `#f2f0ed`   | `#1a1918`   |
| `--ink`    | `#111110`   | `#f2f0ed`   |
| `--sub`    | `#6b6966`   | `#78716c`   |
| `--faint`  | `#a09e9a`   | `#57534e`   |
| `--line`   | `rgba(0,0,0,0.09)` | `rgba(255,255,255,0.09)` |
| `--accent` | `#2563eb`   | `#3b82f6`   |
| `--panel-glass` | `rgba(250,250,249,0.82)` | `rgba(26,25,24,0.72)` |

`--panel-glass` is a translucent, `backdrop-filter: blur(...)`-paired variant of `--panel` for frosted-glass overlays sitting on top of busy/animated backgrounds (e.g. the text scrim on the `/blog` hero over `JuliaHero`).

Dark theme background is `#121212` (Material Design's standard near-black), not pure `#000` — avoids harsh contrast/halation against light text. Still leans warm (stone/brown), not cold/blue-tinted.

Text hierarchy (Notion-style): headings, primary reading content (story paragraphs, blurbs, `howItWorks`/diagram captions, bio text, post descriptions), and tag chips (`.chip`) all use `--ink` (full contrast) — don't fade text that's meant to be read. `--sub`/`--faint` are reserved for true meta/decorative elements: dates, small uppercase mono eyebrow labels, "Read →" links, nav text.

### Responsive breakpoints (in globals.css)
- `max-width: 1024px` — tablet: 32px side padding
- `max-width: 720px` — mobile: 20px padding, single-column grids, hamburger nav
- `max-width: 560px` — blog rows stack vertically
- `max-width: 480px` — avatar shrinks
- `max-width: 400px` — 16px side padding

### Key utility classes
`.page-wrap`, `.grid-2`, `.grid-2-wide`, `.about-cols`, `.blog-row`, `.hero-content`, `.hero-avatar`, `.about-photo`, `.btn-primary`, `.btn-ghost`, `.chip`, `.prose`, `.pulse-dot`, `.s-pt-80`, `.s-pt-64`, `.s-pb-88`

`.prose h2`/`h3` have `scroll-margin-top: 160px` so jumping to a TOC anchor leaves the tail of the previous section visible instead of snapping the heading flush to the viewport top.

## Theme Toggle Animation

Uses the **View Transitions API** (`document.startViewTransition`) for a circular clip-path reveal expanding from the button click position. Falls back to instant switch on unsupported browsers (Firefox). Implementation in `components/Nav.tsx` → `ThemeToggle`.

## Adding Blog Posts

Create `content/blog/<slug>.mdx` with frontmatter:

```mdx
---
title: "Post Title"
date: "2026-06-15"
description: "One sentence for SEO and post list."
---

Content here...

## A section heading

Sections written as `##` automatically get a TOC entry and a clickable anchor — no extra setup needed.
```

Posts are sorted newest-first. The filename becomes the URL slug. The homepage "Blog" section and `/blog` both read from this directory automatically via `lib/posts.ts` — nothing else to wire up.

## Adding Projects

Add an entry to the `projects` array in `lib/projects.ts`. `status: "current"` shows it in "Currently Working On"; `status: "done"` puts it in the Timeline. Cards and the timeline sort newest-first (`getProjectsByStatus` sorts by `order` descending), so higher `order` = more recent. The detail page at `/projects/<slug>` (`app/projects/[slug]/page.tsx`) is a single shared template driven entirely by this data — no per-project page files to create.

**Content shape** (each project's write-up is split into two halves, written for two audiences at once — a casual reader who wants the cool factor, and a recruiter evaluating actual skill):
- `story` — the "what is this and why is it cool" hook. Casual-reader-facing.
- `howItWorks` — the technical explanation: what tech was used and how it actually works. No code blocks — GitHub already has the real code; this is prose.
- `diagramsIntro` + `diagrams` (`{ title, image, caption }[]`) — optional "Technical Breakdown" section: real diagrams/plots/screenshots (training curves, pipeline flowcharts, architecture diagrams) each with a caption explaining what it shows, replacing what would otherwise be a code dump.
- `architectureSteps` (`string[]`) — optional "My Architecture" section: an exact, numbered layer-by-layer model spec (e.g. `"Conv2D — 32 filters, 3×3, ReLU"`), rendered as a monospace stepped list. Pull real values from the actual model file/notebook when available (e.g. a TF.js `model.json`) rather than reconstructing from memory.
- `links` (`ProjectLink[]`) — action buttons at the bottom (Kaggle notebook, live demo, APK download, YouTube playlist). Rendered as `.btn-ghost` pill buttons.
- `papers` (`ProjectLink[]`) — research paper citations. Rendered as plain underlined text links, not buttons, distinct from `links`.
- `thumbnail` — optional, overrides what shows on the homepage/listing `ProjectCard`. Falls back to `heroImage` if unset. Use this when the best homepage-card image (e.g. an explainer diagram) differs from the best detail-page hero image (e.g. an actual demo screenshot).
- `heroEmbed` — optional, takes priority over `heroImage`/`heroVideo`. Renders the live site in a clickable `<iframe>` (pointer-events disabled on the iframe itself, wrapped in a link so any click opens the real URL in a new tab) instead of a static screenshot — use when the project has a live, presentable homepage (e.g. a live game). Since `ProjectCard` on the homepage can't embed an iframe, always pair with an explicit `thumbnail` for the card.

The GitHub button always renders with the actual GitHub logo icon (`GitHubIcon` in `page.tsx`), not just text.

**Assets**: project media (screenshots/video/logo/diagrams) go straight in `public/projects/<slug>/` — there is no separate staging/assets directory, drop files directly there.

## Deployment

- **Live URL:** https://abhijitdalal.vercel.app
- **GitHub:** https://github.com/abhijitdalal26/portfolio
- **Vercel project:** `portfolio-website` (abhijit-dalals-projects team)
- To enable auto-deploy on push: Vercel dashboard → Settings → Git → connect repo

## Project Content Status

Projects to feature on the site, in the order worked on (from `abhijitdalal26` GitHub, timeline-sorted). Being finished off one at a time, oldest first — each pass adds real screenshots/diagrams (dropped in `public/projects/<slug>/`), a proper `story`/`howItWorks` write-up, and a `diagrams`/`architectureSteps`/`papers` section where it makes sense.

**Done:**
- [x] PawVision (`cats-vs-dogs-android-app`) — cat vs dog Android classifier. Has `diagrams` (training/inference pipeline SVGs, loss curves, validation grid) + `architectureSteps`.
- [x] `ml-projects` — MNIST digit recognizer. `thumbnail` (neural-net intro diagram) differs from `heroImage` (actual demo screenshot). Has `diagrams` (real CNN architecture image) + `architectureSteps` (exact Conv2D/Dense layer spec pulled from the live `model.json` on GitHub).
- [x] `movie-vector-galaxy` — has `papers` (Sentence-BERT, UMAP, Multilingual SBERT).
- [x] `smart-agriculture-advisory-system` — Raspberry Pi IoT + XGBoost + OpenClaw. Has `openclaw` section (live Telegram bot screenshot).
- [x] `autonomous-racing-using-rl` — RL agents (PPO). `heroVideo` (real Unity kart recording, not a static hero image). Has `diagrams` (Gymnasium checkpoint progression triptych + reward/entropy curves + real Unity Editor/console/profiling captures, all pulled from the project's own `images/` dir, not generic screenshots) + `architectureSteps` (exact PPO hyperparams from the repo's `kart_config.yaml`) + `papers` (PPO, Unity ML-Agents).
- [x] `harry-potter-gpt` — nanoGPT-from-scratch GPT-2, taken through pretraining/SFT/DPO. Has `diagrams` (design/build-plan images) + `architectureSteps` (exact transformer spec) + `papers` (Attention Is All You Need, InstructGPT, DPO).
- [x] `mcp-audit` — MCP server security audit tool.
- [x] `bookscroller` (Skrolla) — TikTok-style book discovery. `heroVideo` is a real device screen recording (`public/projects/bookscroller/demo.mp4`, re-encoded to constant 30fps + faststart with ffmpeg — the raw iPhone screen recording was variable-frame-rate and stalled indefinitely in Chrome's `<video>` element); `logo`/`thumbnail` both point at the app icon since the hero slot is now the video, not the icon.
- [x] `skydrift` — solo flying sim built on top of the open-source `birds.cafe` (github.com/kanavtwtgg/birds.cafe), credited via a `links` entry. Uses `heroEmbed` (first project to do so) pointed at the live Cloudflare Pages deployment instead of a static hero image/video. `status: "done"` (not actively being worked on). Copy deliberately only covers what's live in v1 (solo flight + island biomes) — the repo also has a real-time multiplayer/stranger-chat layer, but it's disabled for the v1 launch, so it's left out of the write-up rather than describing an unshipped feature.
- [x] `play-store-app-analysis` — Play Store market research (2022 archive + fresh 2026 scrape). Has 19 real `diagrams` (static + interactive Plotly embeds) + `papers`/`links` to the Kaggle datasets/notebook.
- [x] `projects-wiki` — markdown-based persistent memory/wiki system for working with LLMs across sessions (`RICKPRIME.md`/`MORTY.md`/`portal` command catalog). `order: 6`, no `diagrams`/`architectureSteps` (nothing to benchmark or diagram — it's pure workflow/docs tooling), just `story`/`howItWorks`.

Every project currently in `lib/projects.ts` has a full write-up. `bookscroller` (Skrolla) is the only remaining `status: "current"` project (still being built out, not yet at final content).

When picking up the next one: ask what images/diagrams the user has ready in `public/projects/<slug>/` (or check what's already there), write `story` + `howItWorks` following the two-audience split above, and check if a real model/architecture file exists in the project's own GitHub repo before writing any specifics — pull exact values (layer configs, hyperparameters) from there rather than guessing.
