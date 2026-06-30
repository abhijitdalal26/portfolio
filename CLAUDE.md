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
- **next-mdx-remote/rsc** — renders MDX blog posts as React Server Components
- **gray-matter** — parses frontmatter from `.mdx` files
- **next-themes** — dark/light toggle via `class` on `<html>`; default `light`, no system detection
- **Inter / Instrument Serif / JetBrains Mono** via Google Fonts

## Project Structure

```
app/
  layout.tsx           # Root: Providers (ThemeProvider), Nav, Footer
  globals.css          # Design tokens, responsive breakpoints, utility classes
  page.tsx             # Home (aurora hero, featured projects, latest posts)
  projects/page.tsx    # Full project list
  blog/page.tsx        # Blog post list
  blog/[slug]/page.tsx # Dynamic MDX post renderer
  about/page.tsx       # Bio + scrolling marquee strips + links
  not-found.tsx        # Custom 404 page
  sitemap.ts           # Auto-generated sitemap
  robots.ts
components/
  Nav.tsx              # "use client" — sticky nav, hamburger menu on mobile, theme toggle
  Providers.tsx        # "use client" — wraps children with ThemeProvider
  Footer.tsx
  Hero.tsx             # Dark full-screen hero (used on homepage)
  AuroraBg.tsx         # Animated aurora gradient background
  FadeUp.tsx           # "use client" — IntersectionObserver scroll-reveal wrapper
content/blog/          # MDX source files (frontmatter: title, date, description)
lib/posts.ts           # getAllPosts(), getPost(slug), formatDate()
```

## Design System

CSS variables defined in `:root` / `.dark` in `globals.css`:

| Token      | Light       | Dark        |
|------------|-------------|-------------|
| `--bg`     | `#fafaf9`   | `#0c0c0b`   |
| `--panel`  | `#f2f0ed`   | `#161514`   |
| `--ink`    | `#111110`   | `#f2f0ed`   |
| `--sub`    | `#6b6966`   | `#78716c`   |
| `--faint`  | `#a09e9a`   | `#57534e`   |
| `--line`   | `rgba(0,0,0,0.09)` | `rgba(255,255,255,0.09)` |
| `--accent` | `#2563eb`   | `#3b82f6`   |

Dark theme is warm (stone/brown grays), not cold/blue-tinted.

### Responsive breakpoints (in globals.css)
- `max-width: 1024px` — tablet: 32px side padding
- `max-width: 720px` — mobile: 20px padding, single-column grids, hamburger nav
- `max-width: 560px` — blog rows stack vertically
- `max-width: 480px` — avatar shrinks
- `max-width: 400px` — 16px side padding

### Key utility classes
`.page-wrap`, `.grid-2`, `.grid-2-wide`, `.about-cols`, `.blog-row`, `.hero-content`, `.hero-avatar`, `.about-photo`, `.btn-primary`, `.btn-ghost`, `.chip`, `.prose`, `.pulse-dot`, `.s-pt-80`, `.s-pt-64`, `.s-pb-88`

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
```

Posts are sorted newest-first. The filename becomes the URL slug.

## Deployment

- **Live URL:** https://abhijitdalal-abhijit-dalals-projects.vercel.app
- **GitHub:** https://github.com/abhijitdalal26/portfolio
- **Vercel project:** `portfolio-website` (abhijit-dalals-projects team)
- To enable auto-deploy on push: Vercel dashboard → Settings → Git → connect repo
