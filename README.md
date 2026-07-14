# Vinicius Mioto — Academic & Professional Portfolio

A premium, modern, and highly responsive personal academic and professional website built with **Next.js 15**, **TypeScript**, and **Vanilla CSS**. Designed for researchers, software developers, and data scientists to showcase bio profiles, research publications, portfolio projects, professional history, and blog posts.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (version 18.x or higher) and npm installed.

### Installation
Clone the repository and install the dependencies:
```bash
git clone https://github.com/viniciusmioto/mioto.git
cd mioto
npm install
```

### Development Server
Run the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build and Static Export
Compile the production build:
```bash
npm run build
```
This builds and exports optimized static pages (SSG) for all routes.

### Linting
To check the code quality and static typing correctness:
```bash
npm run lint
```

---

## 📂 Repository Structure

```tree
├── app/                  # Next.js App Router pages and layouts
│   ├── blog/             # Blog page route (/blog)
│   ├── cv/               # CV detail page route (/cv)
│   ├── projects/         # Portfolio page listing and dynamic slug details (/projects)
│   ├── publications/     # Publications page listing and dynamic slug details (/publications)
│   ├── layout.tsx        # Global site layout, including Header & Footer shell
│   └── page.tsx          # Homepage (landing layout featuring top publications/projects)
├── components/           # Reusable React components
│   ├── Card.tsx          # Two-column layout card for projects and portfolios
│   ├── Header.tsx        # Top navigation bar
│   ├── Footer.tsx        # Footer signature and social links
│   ├── Hero.tsx          # Main profile introduction section
│   ├── PublicationListItem.tsx  # Dynamic list items for academic publications
│   └── SectionHeading.tsx # Component for section titles and descriptions
├── content/              # Markdown (md) source files for site content
│   ├── projects/         # Individual project folders (each with index.md and media)
│   ├── publications/     # Individual publication folders (each with index.md and cite.bib)
│   └── hero.md           # Professional summary, social links, and bio description
├── lib/                  # Business logic and content loading engines
│   ├── content.ts        # Dynamic content loaders using Gray-Matter and Remark
│   └── data.ts           # Shared TypeScript interfaces and mock/static datasets
├── public/               # Static assets (images, pdfs, and media files)
└── styles/               # Global styling sheets
    └── globals.css       # Fully customized dark-theme responsive design tokens and rules
```

---

## ✍️ Content Management Guide

The website is designed to be highly dynamic, drawing page details directly from markdown files (`.md`) inside the `content/` folder.

### 1. Updating the Bio & Work History
All core user metadata (names, roles, social links, education, work experiences, and short biography descriptions) is managed in [content/hero.md](file:///Users/viniciusmioto/Projects/mioto/content/hero.md).

Simply edit the front matter fields:
```yaml
---
name: "Vinicius Mioto"
role: "MSc Computer Science"
avatar: "/avatar.jpg"
email: "vinicius [dot] mioto@mail.concordia.ca"
github: "https://github.com/viniciusmioto"
linkedin: "https://www.linkedin.com/in/viniciusmioto"
scholar: "https://scholar.google.com/citations?user=UDQdcksAAAAJ&hl=en"
orcid: "https://orcid.org/0000-0003-1343-7183"

organizations:
  - name: "Concordia University Montréal"
    url: "https://www.concordia.ca/"

interests:
  - "🤖 Artificial Intelligence"
  - "📊 Data Science"

education:
  - area: "MSc Computer Science"
    institution: "Concordia University Montréal"
    date_start: "2026-05"
    date_end: "2028-07"

work:
  - position: "Data Scientist"
    company_name: "Driva"
    company_url: "https://www.driva.io/"
    date_start: "2024-11"
    date_end: "2026-03"
---

The markdown text written below the front matter divider acts as your profile's bio description!
```

---

### 2. Adding Academic Publications
Publications are dynamically fetched, parsed, and sorted by date.

To add a new publication:
1. Create a folder under `content/publications/<slug>/` (e.g. `content/publications/2025gas`).
2. Create an `index.md` inside that folder.
3. Configure the YAML front matter at the top:
   ```yaml
   ---
   title: "Recording-based Game Test Automation: A Systematic Mapping"
   authors:
     - "Vinicius Mioto"
     - "Co-Author Name"
   date: "2025-05-21"
   publication: "IEEE Transactions on Games"
   summary: "A short highlight snippet that displays on listing cards."
   abstract: "The full abstract description rendered on the detail page."
   tags:
     - "Software Testing"
     - "Video Games"
   featured: true   # Shows this publication at the top of lists
   doi: "10.1109/TG.2025.12345"
   links:
     - type: "pdf"
       url: "/publications/2025gas/paper.pdf"
   ---
   The main body of the index.md contains extra notes, citation guides, or custom markdown content to render on the detail page.
   ```
4. Optional: Put files like `cite.bib` or PDF assets in the folder and link them dynamically.

---

### 3. Adding Portfolio Projects
Projects are loaded dynamically from folders inside `content/projects/`.

To add a new project:
1. Create a folder under `content/projects/<slug>/` (e.g., `content/projects/network_science/`).
2. Add an `index.md` file:
   ```yaml
   ---
   title: "Social Network Analysis"
   date: "2024-12-01"
   website: "https://my-project-website.com"
   github: "https://github.com/viniciusmioto/social_networks_analysis"
   summary: "Brief project summary that displays in the project card."
   tags:
     - "Data Science"
     - "Network Science"
   ---
   Detailed project documentation in markdown. The title will link to the detail route (`/projects/<slug>`) where this markdown body is converted to HTML and fully rendered.
   ```
3. Optional: Include a cover image named `featured.png` (or `feature.png`, `featured.jpg`, `feature.jpg`) inside your project directory. The loader will automatically detect and sync this image to the public assets directory (`/public/projects/<slug>/`) at build time.

---

### 4. Adding Blog Posts
Blog posts are currently populated statically via the `blog` data array in [lib/data.ts](file:///Users/viniciusmioto/Projects/mioto/lib/data.ts).

To add a blog post, add a new object to the export array:
```typescript
export const blog: Blog[] = [
  {
    title: "My First Blog Post",
    event: "Tech Insights",
    date: "2026-05-21",
    location: "Montréal, QC",
    abstract: "A short preview of the blog post details..."
  }
];
```

---

## 🎨 UI & Custom Styling
The styles are fully controlled through Vanilla CSS in [styles/globals.css](file:///Users/viniciusmioto/Projects/mioto/styles/globals.css).

Key Design System Properties:
- **Dark Mode Palette**: Built with professional dark-theme colors utilizing CSS variables (e.g. `--background`, `--card-background`, `--accent-blue`).
- **Responsive Layouts**: Flexible flexbox/grid containers designed to scale gracefully from massive desktop screens down to narrow mobile viewports.
- **Dynamic Micro-animations**: Micro-animations on hover states for links, cards, and images, keeping the site interface engaging and responsive to user interaction.