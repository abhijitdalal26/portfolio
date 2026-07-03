# abhijit dalal / portfolio

Personal portfolio and blog. Built with Next.js 16, Tailwind CSS v4, and MDX.

**Live:** [abhijitdalal.vercel.app](https://abhijitdalal.vercel.app)

## Features

- Home page with a Three.js particle wave hero, "Currently Working On" section, and a project timeline
- Per-project detail pages (story, how it works, architecture) driven by a single data file — no per-project page files
- Blog with MDX posts, auto-generated table of contents, and anchor links on every heading
- Light/dark theme toggle with a circular reveal animation via the View Transitions API
- Scroll-reveal animations, fully SSR-safe and `prefers-reduced-motion`-aware

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4** (config via `app/globals.css`, no `tailwind.config.js`)
- **next-mdx-remote/rsc** (MDX blog posts as React Server Components) + `rehype-slug` / `rehype-autolink-headings`
- **framer-motion** + Three.js (`@tsparticles`, `vanta`) for background/page animation
- **next-themes** (light/dark toggle with View Transitions API ripple)

## Project structure

```
app/
  page.tsx              # Home — hero, current projects, timeline, blog list
  projects/[slug]/       # Shared project detail template, data-driven
  blog/[slug]/           # MDX post renderer + TOC sidebar
  about/                 # Bio + marquee strips
lib/
  projects.ts            # Single source of truth for all project cards/pages
  posts.ts                # Blog post loading (frontmatter + content)
  toc.ts                  # Heading extraction for the blog TOC
content/blog/             # MDX source files
```

## Dev

```bash
npm install
npm run dev      # http://localhost:3002
npm run build
npm run lint
```

## Adding a blog post

Create `content/blog/<slug>.mdx`:

```mdx
---
title: "Post Title"
date: "2026-06-15"
description: "One sentence summary."
---

Content here...
```

## Adding a project

Add an entry to the `projects` array in `lib/projects.ts` — `status: "current"` shows it under "Currently Working On", `status: "done"` puts it in the timeline. The detail page is generated automatically from this data.

## Deploy

Connected to Vercel. Pushing to `main` auto-deploys to production.

```bash
git push origin main
```
