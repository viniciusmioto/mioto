# Academic Website Migration Plan
### Hugo/Wowchemy → Next.js — Merged & Consolidated

---

## Before the plan: two things to fix from the agent's draft

The agent's plan is solid in structure, but has two issues worth resolving upfront:

**1. Drop Contentlayer.** The agent recommended it, but it's been effectively abandoned since early 2024. Its main sponsor was acquired, the maintainer has publicly stated they can spare one day a month, and it breaks with the Next.js App Router. Use **Velite** instead — same mental model, active maintenance, Zod-typed schemas, and critically, it handles `.yaml` files alongside `.mdx`, which matters for publications.

**2. Don't rebuild the widget system.** The agent proposed a `SectionRenderer` that maps frontmatter section types to components — essentially re-implementing what Wowchemy already does. This is the thing you're trying to escape. Your home page sections are just React components arranged in `page.tsx`. Configure layout in code, not YAML.

Everything else from both plans converges cleanly.

---

## The Stack

```
Next.js 15 (App Router, static export)
TypeScript (strict)
Velite (content layer — replaces Contentlayer)
MDX (content format)
Tailwind CSS v4
shadcn/ui (pull in only what you need as source)
rehype-pretty-code + shiki (syntax highlighting)
rehype-katex + remark-math (LaTeX math)
Vercel (deployment)
```

No headless CMS. No database. No server runtime. Fully static.

---

## Project Structure

```
viniciusmioto.com/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout: fonts, analytics, theme provider
│   ├── page.tsx                  # Home — imports and arranges section components
│   ├── publications/
│   │   ├── page.tsx              # All publications, sorted by year
│   │   └── [slug]/page.tsx       # Individual publication
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── posts/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── talks/
│   │   └── page.tsx              # List only — talks rarely need a detail page
│   └── cv/
│       └── page.tsx              # Printable CV
│
├── content/                      # All content lives here — this is your CMS
│   ├── about.yaml                # Your bio, avatar, social links
│   ├── publications/
│   │   └── paper-slug-2024.yaml  # One file per paper
│   ├── projects/
│   │   └── network-analysis/
│   │       ├── index.mdx         # Description + optional embedded components
│   │       └── featured.jpg      # Image lives next to the content
│   ├── posts/
│   │   └── 2024-10-my-post/
│   │       ├── index.mdx
│   │       └── figure.png
│   └── talks/
│       └── conference-2024.yaml
│
├── components/
│   ├── ui/                       # shadcn primitives (copied-in source, edit freely)
│   ├── academic/                 # Your domain components
│   │   ├── PublicationCard.tsx
│   │   ├── PublicationList.tsx
│   │   ├── ProjectCard.tsx
│   │   └── TalkCard.tsx
│   ├── home/                     # Home page sections — plain React, no magic
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── FeaturedPublications.tsx
│   │   └── RecentPosts.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileNav.tsx
│   └── mdx/
│       ├── MDXComponents.tsx     # Component map passed to MDX renderer
│       └── CodeBlock.tsx
│
├── lib/
│   ├── content.ts                # Re-exports from .velite, shared query helpers
│   └── utils.ts                  # cn(), date formatting
│
├── scripts/
│   └── bib-to-yaml.py            # Convert .bib exports → content/publications/*.yaml
│
├── styles/
│   └── globals.css               # Tailwind base + CSS custom properties
│
├── public/
│   └── cv.pdf
│
├── velite.config.ts              # Content schemas (define once, forget about it)
├── next.config.ts
└── tsconfig.json                 # "strict": true from day one
```

### Key decisions in this structure

- **Publications are YAML, not MDX.** A paper has structured fields (title, authors, DOI, venue, year, abstract, links). YAML is terser, more git-diffable, and easier to generate from BibTeX. You almost never need to embed a React component in a paper's abstract.
- **Projects and posts are MDX.** These have narrative body content and occasionally need an embedded figure or component.
- **Images live next to their content.** Not in `/public`. Velite copies and processes them; `next/image` optimizes them.
- **Home page is just `page.tsx`** assembling section components in order. No YAML-configured widget system.

---

## Content Layer: Velite Config

Define schemas once. After this, adding content is just dropping a file.

```typescript
// velite.config.ts
import { defineConfig, defineCollection, s } from 'velite'

const publications = defineCollection({
  name: 'Publication',
  pattern: 'publications/**/*.yaml',
  schema: s.object({
    title:       s.string(),
    authors:     s.array(s.string()),
    year:        s.number(),
    venue:       s.string(),
    venueShort:  s.string().optional(),
    abstract:    s.string().optional(),
    doi:         s.string().optional(),
    arxiv:       s.string().optional(),
    pdf:         s.string().optional(),
    code:        s.string().optional(),
    tags:        s.array(s.string()).default([]),
    featured:    s.boolean().default(false),
    type:        s.enum(['journal', 'conference', 'workshop', 'preprint']),
    slug:        s.slug('publications'),
  }),
})

const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.mdx',
  schema: s.object({
    title:       s.string(),
    date:        s.isodate(),
    description: s.string().optional(),
    tags:        s.array(s.string()).default([]),
    draft:       s.boolean().default(false),
    slug:        s.slug('posts'),
    body:        s.mdx(),
  }),
})

const projects = defineCollection({
  name: 'Project',
  pattern: 'projects/**/*.mdx',
  schema: s.object({
    title:       s.string(),
    date:        s.isodate(),
    summary:     s.string(),
    tags:        s.array(s.string()).default([]),
    featured:    s.boolean().default(false),
    projectUrl:  s.string().optional(),
    codeUrl:     s.string().optional(),
    slug:        s.slug('projects'),
    body:        s.mdx(),
  }),
})

const talks = defineCollection({
  name: 'Talk',
  pattern: 'talks/**/*.yaml',
  schema: s.object({
    title:       s.string(),
    event:       s.string(),
    date:        s.isodate(),
    location:    s.string().optional(),
    slidesUrl:   s.string().optional(),
    videoUrl:    s.string().optional(),
    abstract:    s.string().optional(),
  }),
})

export default defineConfig({
  root: 'content',
  output: { data: '.velite' },
  collections: { publications, posts, projects, talks },
})
```

---

## Content Authoring Workflow

### Adding a publication

```yaml
# content/publications/network-gnn-survey-2025.yaml
title: "Graph Neural Networks for Network Science: A Survey"
authors:
  - "Vinicius Mioto"
  - "Co-Author Name"
year: 2025
venue: "IEEE Transactions on Network Science and Engineering"
venueShort: "TNSE"
abstract: "In this paper we survey…"
doi: "10.1109/TNSE.2025.0000000"
arxiv: "2501.00000"
pdf: "/papers/gnn-survey-2025.pdf"
tags: ["network science", "GNN", "survey"]
type: "journal"
featured: true
```

### Adding a blog post

```
content/posts/2025-03-my-post/
  index.mdx
  figure.png
```

```mdx
---
title: "Notes on Graph Attention Networks"
date: 2025-03-15
description: "Quick notes after reading GAT v2."
tags: ["GNN", "reading-notes"]
---

Regular markdown here. Drop in a component when needed:

<CodeBlock language="python">...</CodeBlock>
```

### Importing from BibTeX

```python
# scripts/bib-to-yaml.py — run once, then maintain YAML directly
import bibtexparser, yaml, re
from pathlib import Path

def bib_to_yaml(bib_file, out_dir='content/publications'):
    with open(bib_file) as f:
        db = bibtexparser.load(f)
    for entry in db.entries:
        slug = re.sub(r'[^a-z0-9]+', '-', entry['ID'].lower())
        data = {
            'title':   entry.get('title','').replace('{','').replace('}',''),
            'authors': [a.strip() for a in entry.get('author','').split(' and ')],
            'year':    int(entry.get('year', 0)),
            'venue':   entry.get('journal') or entry.get('booktitle',''),
            'doi':     entry.get('doi') or None,
            'type':    'journal' if 'journal' in entry else 'conference',
        }
        Path(out_dir).mkdir(exist_ok=True)
        with open(f"{out_dir}/{slug}.yaml", 'w') as f:
            yaml.dump({k: v for k, v in data.items() if v}, f, allow_unicode=True)
```

---

## Consuming Content in Pages

```typescript
// app/publications/page.tsx
import { publications } from '@/.velite'  // fully typed, zero boilerplate

export default function PublicationsPage() {
  const sorted = publications
    .filter(p => !p.draft)
    .sort((a, b) => b.year - a.year)

  return <PublicationList publications={sorted} />
}
```

```typescript
// app/publications/[slug]/page.tsx
import { publications } from '@/.velite'

export function generateStaticParams() {
  return publications.map(p => ({ slug: p.slug }))
}

export default function PublicationPage({ params }: { params: { slug: string } }) {
  const pub = publications.find(p => p.slug === params.slug)!
  return <PublicationDetail publication={pub} />
}
```

Types for `Publication`, `Post`, `Project`, `Talk` are auto-generated by Velite from your Zod schemas. Your editor autocompletes frontmatter field names.

---

## What to NOT Build (Anti-Patterns)

| Temptation | Why to skip it |
|---|---|
| `SectionRenderer` / YAML-driven layout | This is just rebuilding Wowchemy. Arrange sections in `page.tsx` directly. |
| Headless CMS (Sanity, Contentful) | You're a developer with git. The filesystem IS your CMS and it's better. |
| Database / server runtime | You don't need it. Keep `output: 'export'`. |
| Contentlayer | Abandoned, App Router broken. Use Velite. |
| Full component library | Write your own cards. shadcn primitives for interactive UI only. |
| Dynamic features in Phase 1 | Comments, views, real-time anything — none of it for a research CV. |
| Pagination before you need it | You have ~50 publications, not 5000. A flat list is fine. |

---

## Phased Roadmap

### Phase 1 — Foundation & Parity (3–4 weekends)

Get a working site that matches what you have now.

1. `npx create-next-app@latest viniciusmioto-site --ts --tailwind --eslint --app`
2. Install Velite, configure schemas for all four collections
3. Migrate `content/` — copy structure, normalize YAML frontmatter field names
4. Run `bib-to-yaml.py` on existing `.bib` file, audit output
5. Build pages: home, `/publications`, `/projects`, `/posts`, `/talks`, `/cv`
6. Build components: `PublicationCard`, `ProjectCard`, `TalkCard`, `PostCard`
7. Build layout: `Header`, `Footer`, mobile nav
8. SEO: `metadata` on every page, sitemap, robots.txt, OpenGraph
9. Deploy to Vercel

**Done when:** site is live, all existing content is accessible, looks clean.

---

### Phase 2 — Enhancements (a few more weekends, whenever)

Only build these once Phase 1 is solid and you actually want them.

- Client-side search with Fuse.js over a static JSON index
- Tag filter on publications and posts
- Per-publication OpenGraph image (Next.js `opengraph-image.tsx`)
- BibTeX citation export button on publication pages
- JSON-LD structured data on publication pages
- Reading time on posts
- CV print stylesheet (and optionally a PDF export)
- Dark/light mode

---

### Phase 3 — Distinctive Features (ongoing, as research interests evolve)

These are the things that make a custom build worth it over any template:

- Co-authorship network graph (D3/Sigma.js, computed from your YAML at build time)
- Research notes collection with series/thread support
- Talk pages with embedded slides and video
- RSS feed
- Programmatic CV JSON (JSON Resume spec)

---

## Setup Commands (Phase 1 Quickstart)

```bash
npx create-next-app@latest viniciusmioto-site \
  --typescript --tailwind --eslint --app --no-src-dir

cd viniciusmioto-site

# Content layer
npm install velite --save-dev

# MDX + rehype pipeline
npm install @mdx-js/react rehype-pretty-code rehype-katex remark-math shiki

# Utilities
npm install date-fns clsx tailwind-merge

# shadcn (pull in components individually as needed)
npx shadcn@latest init
```

Add to `next.config.ts`:

```typescript
import { build } from 'velite'

const withVelite = (config: any) => {
  config.plugins = [...(config.plugins ?? []), new VeliteWebpackPlugin()]
  return config
}

class VeliteWebpackPlugin {
  apply(compiler: any) {
    let started = false
    compiler.hooks.beforeCompile.tapPromise('VelitePlugin', async () => {
      if (started) return
      started = true
      await build({ watch: compiler.watchMode })
    })
  }
}

export default withVelite({ output: 'export' })
```

---

## Summary

The agent's structural plan is sound. The key corrections are: swap Contentlayer for Velite, and don't build a `SectionRenderer` abstraction — that's the complexity you're escaping, not recreating. Your home page is just React components stacked in `page.tsx`. Your content is typed YAML and MDX files in a `content/` folder. Everything else flows from those two decisions.

Start with Phase 1 only. Ship content. Design later.