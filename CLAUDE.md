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
- **framer-motion** — page/section animations via `FadeUp` component
- **next-mdx-remote/rsc** — renders MDX blog posts as React Server Components
- **gray-matter** — parses frontmatter from `.mdx` files
- **next-themes** — dark/light/system mode via `class` attribute on `<html>`
- **Geist** font via `next/font/google`

## Project Structure

```
app/
  layout.tsx           # Root: font, ThemeProvider, Nav, Footer
  globals.css          # Design system CSS variables + prose styles
  page.tsx             # Home (hero, featured projects, latest posts)
  projects/page.tsx    # Full project list
  blog/page.tsx        # Blog post list
  blog/[slug]/page.tsx # Dynamic MDX post renderer
  about/page.tsx       # Bio + stack + links
  not-found.tsx        # Custom 404 page
  sitemap.ts           # Auto-generated sitemap
  robots.ts
components/
  Nav.tsx              # "use client" — uses usePathname
  Footer.tsx
  Hero.tsx             # Landing hero section
  FadeUp.tsx           # "use client" — framer-motion fade-in wrapper
content/blog/          # MDX source files (frontmatter: title, date, description)
lib/posts.ts           # getAllPosts(), getPost(slug), formatDate()
```

## Design System

CSS variables defined in `:root` / `.dark` in `globals.css`:

| Token    | Light     | Dark      |
|----------|-----------|-----------|
| `--bg`   | `#fafaf9` | `#0c0c0b` |
| `--text` | `#111110` | `#f2f0ed` |
| `--muted`| `#78716c` | `#78716c` |
| `--subtle`| `#e7e5e4`| `#1c1b1a` |
| `--card` | `#f5f4f2` | `#161514` |
| `--accent`| `#2563eb`| `#2563eb` |

Max content width: `660px`, `28px` horizontal padding. No shadows, no gradients.

Reusable CSS classes: `.section-label`, `.tag`, `.pulse-dot`, `.prose`

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

- **Live URL:** https://portfolio-website-rosy-pi-50.vercel.app
- **GitHub:** https://github.com/abhijitdalal26/portfolio
- **Vercel project:** `portfolio-website` (abhijit-dalals-projects team)
- To enable auto-deploy on push: Vercel dashboard → Settings → Git → connect repo
