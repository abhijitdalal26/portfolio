# abhijit dalal / portfolio

Personal portfolio and blog. Built with Next.js 16, Tailwind CSS v4, and MDX.

**Live:** [abhijitdalal.vercel.app](https://abhijitdalal.vercel.app)

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4** (config via `app/globals.css`, no `tailwind.config.js`)
- **next-mdx-remote** (MDX blog posts as React Server Components)
- **framer-motion** (page animations)
- **next-themes** (light/dark toggle with View Transitions API ripple)

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

## Deploy

Connected to Vercel. Pushing to `main` auto-deploys to production.

```bash
git push origin main
```
