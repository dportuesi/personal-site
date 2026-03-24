# CLAUDE.md

## Project Overview

Personal engineering portfolio & blog for Domenic Portuesi (domenicportuesi.com).
Originally forked from [timlrx/tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) v1.x, migrated to App Router architecture in March 2026.

## Tech Stack

- **Next.js 15** with App Router (`app/` directory, no `pages/`)
- **React 19**
- **Tailwind CSS 3.4** (not v4 — custom typography config is extensive, v4 migration is a separate task)
- **Contentlayer2** (`contentlayer2` / `next-contentlayer2`) for MDX processing
- **TypeScript** (strict: false, strictNullChecks: false)
- **next-themes** for dark mode (class-based)

## Upstream Template Reference

The upstream template is at https://github.com/timlrx/tailwind-nextjs-starter-blog (v2.4.0+).
This site diverges from the template in these key ways:

- **Font**: Outfit (template uses Space Grotesk)
- **Colors**: primary = sky, gray = neutral
- **Custom components**: `RecentProjects`, `HomePageCard`, `Card` (with `tools` array prop), SVG background gradients, social-buttons SVGs, 4-image gallery on About page
- **Layout**: Centered nav (no logo), SVG gradient backgrounds fixed behind content
- **pliny**: Listed as a dependency but not yet fully wired in — analytics/comments/newsletter still use hand-rolled components. Pliny adoption was planned but the custom components remain.

## Directory Structure

```
app/                    # Next.js App Router pages
  layout.tsx            # Root layout (font, theme, nav, footer, SVG gradients)
  page.tsx              # Home (author bio, recent projects, recent posts)
  theme-providers.tsx   # Client component wrapping next-themes
  seo.tsx               # genPageMetadata() helper for metadata exports
  not-found.tsx         # 404 page
  sitemap.ts            # Dynamic sitemap generation
  robots.ts             # robots.txt generation
  about/page.tsx        # About + image gallery
  blog/page.tsx         # Blog listing with search + pagination
  blog/[...slug]/page.tsx  # Individual blog posts
  blog/page/[page]/page.tsx  # Blog pagination
  projects/page.tsx     # Project cards
  tags/[tag]/page.tsx   # Tag-filtered posts
  api/newsletter/route.ts  # Buttondown newsletter API

components/             # React components
  Header.tsx            # Nav bar (extracted from old LayoutWrapper)
  MDXComponents.tsx     # MDX component map + MDXLayoutRenderer ('use client')
  Card.tsx              # Project card with tools prop
  HomePageCard.tsx       # Home page project card variant
  RecentProjects.tsx     # Recent projects section
  Footer.tsx            # Site footer with social icons
  ThemeSwitch.tsx       # Dark/light toggle ('use client')
  MobileNav.tsx         # Mobile hamburger menu ('use client')
  ScrollTopAndComment.tsx  # Scroll-to-top button ('use client')
  comments/             # Giscus/Utterances/Disqus ('use client')
  social-icons/         # Social media SVG icons
  social-buttons/       # Social button SVGs for AuthorLayoutIndex
  background/           # SVG gradient backgrounds

layouts/                # Page layout components
  PostLayout.tsx        # Full blog post with author sidebar, comments, prev/next
  PostSimple.tsx        # Simplified post layout
  ListLayout.tsx        # Blog list with search ('use client')
  AuthorLayout.tsx      # About page author profile
  AuthorLayoutIndex.tsx # Home page author bio with social buttons

data/                   # Content and config
  siteMetadata.js       # Site configuration (title, social links, providers)
  projectsData.ts       # Project entries (title, description, imgSrc, href, tools)
  headerNavLinks.ts     # Navigation menu items
  blog/*.mdx            # Blog posts
  authors/default.mdx   # Author profile

lib/                    # Utilities
  utils/contentlayer.ts # sortedBlogPost, coreContent, allCoreContent, getAllTags
  utils/formatDate.ts
  utils/kebabCase.ts
  remark-*.ts           # Custom remark plugins (code titles, img-to-jsx, TOC)
```

## Build & Dev Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build (next build)
npm run serve     # Start production server
npm run lint      # ESLint with auto-fix
npm run analyze   # Bundle analysis (ANALYZE=true)
```

## Key Patterns

### SEO

SEO is handled via Next.js metadata API — **not** custom `<SEO>` components:

- Static pages: `export const metadata = genPageMetadata({ title: '...' })`
- Dynamic pages: `export async function generateMetadata()`
- `app/seo.tsx` has the `genPageMetadata()` helper

### MDX Rendering

`MDXLayoutRenderer` in `components/MDXComponents.tsx` renders MDX content with layout selection. It's a `'use client'` component because it uses `useMDXComponent` hook from `next-contentlayer2/hooks`. Layouts are statically imported (no dynamic `require`).

### Data Fetching

All data fetching uses Server Components importing directly from `contentlayer/generated`. No `getStaticProps` or `getStaticPaths` — these are replaced by:

- Direct imports at module level (Server Components)
- `generateStaticParams()` for dynamic routes

### Client Components

Components using React hooks need `'use client'` directive. Currently marked:

- `MDXComponents.tsx`, `ThemeSwitch.tsx`, `MobileNav.tsx`, `ScrollTopAndComment.tsx`
- `ListLayout.tsx` (uses useState for search)
- `comments/index.tsx`, `comments/Giscus.tsx`
- `app/theme-providers.tsx`

### Content Pipeline

Configured in `contentlayer.config.ts`:

- Document types: `Blog` (blog/**/\*.mdx) and `Authors` (authors/**/\*.mdx)
- Computed fields: readingTime, slug, toc
- Remark plugins: remarkGfm, remarkCodeTitles, remarkMath, remarkImgToJsx, remarkExtractFrontmatter
- Rehype plugins: rehypeSlug, rehypeAutolinkHeadings, rehypeKatex, rehypeCitation, rehypePrismPlus, rehypePresetMinify

## Custom Styling Details

- **Font**: Outfit loaded in `app/layout.tsx` via `next/font/google`, applied as `--font-outfit` CSS variable
- **Colors**: Tailwind config maps `primary` to `colors.sky`, `gray` to `colors.neutral`
- **SVG Gradients**: `left-dark-gradient.svg` and `right-dark-gradient.svg` rendered in root layout with fixed positioning
- **Animations**: `tailwindcss-animate` plugin, `animate-in fade-in duration-700` on body for initial load
- **Typography**: Extensive light/dark prose variant customization in `tailwind.config.js` (~130 lines)
- **Dark mode**: Class-based via next-themes, `suppressHydrationWarning` on `<html>`

## Environment Variables

- `NEXT_PUBLIC_GISCUS_REPO`, `NEXT_PUBLIC_GISCUS_REPOSITORY_ID`, `NEXT_PUBLIC_GISCUS_CATEGORY`, `NEXT_PUBLIC_GISCUS_CATEGORY_ID` — Giscus comments
- `BUTTONDOWN_API_KEY`, `BUTTONDOWN_API_URL` — Newsletter
- `ANALYZE` — Bundle analyzer (set to "true" to enable)

## Things to Know

- `contentlayer.config.ts` imports from `contentlayer2/source-files` (not `contentlayer`)
- `next.config.js` uses `next-contentlayer2` wrapper and `@svgr/webpack` for SVG imports
- The `pages/` directory no longer exists — all routing is via `app/`
- `POSTS_PER_PAGE` is defined locally in `app/blog/page.tsx` and `app/blog/page/[page]/page.tsx` (not exported, as App Router restricts page exports)
- The template upstream has a `pliny` package that abstracts analytics/comments/newsletter/search — this project has it installed but hasn't fully wired it in yet
- Tailwind v4 migration is a planned follow-up (separate from the App Router migration)
