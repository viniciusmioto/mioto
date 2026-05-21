# Author Profile Structure and Generation Flow

This repository uses Hugo with Hugo Blox Builder. Author profiles live under `content/authors/` and are rendered into static HTML pages under `public/author/`.

## Content structure

- `content/authors/` is the Hugo section for author profiles.
- Each author profile is stored in a folder under `content/authors/`.
- The primary site user profile is in `content/authors/admin/_index.md`.
- The author folder name becomes the author page slug in the generated URL.
  - Example: `content/authors/admin/_index.md` becomes `public/author/vinicius-mioto/index.html`.
- The folder may also contain media assets such as profile images or other attachments.

## Author markdown file fields

The author page content is stored as front matter followed by optional Markdown body content.

Important front matter fields in `content/authors/admin/_index.md` include:

- `title`: display name of the author.
- `first_name` and `last_name`: full name fields used for SEO and structured profile rendering.
- `status.icon`: a small emoji icon shown in the author profile.
- `superuser`: marks the primary user profile for special rendering.
- `highlight_name`: if true, highlights this author in author lists.
- `role`: author role or position, like `MSc Computer Science`.
- `organizations`: a list of affiliations with `name` and `url`.
- `profiles`: social network links with icon, URL, and label.
- `interests`: list of interest tags displayed on the profile.
- `education`: list of academic history entries.
- `work`: list of professional experience entries.
- `awards`: optional list of awards or certifications.

The Markdown body below the front matter is rendered as the author biography or about section.

Example content body from `content/authors/admin/_index.md`:

```md
## About Me

Hello, World! I am Vinicius Mioto, a Master's student in Computer Science at Concordia University, Montreal (Canada). I am a member of the [Ptidej Team](https://www.ptidej.net/).
```

## Hugo configuration for authors

Relevant configuration is in `config/_default/hugo.yaml`.

Key setting:

- `taxonomies:`
  - `author: authors`

This tells Hugo to treat `author` as a taxonomy and generate author pages under the `author` URL path.

The `permalinks` config maps author taxonomies with:

- `authors: '/author/:slug/'`

This means author profile pages are published at:

- `public/author/<slug>/index.html`

## Generated HTML output

When Hugo builds the site, each author profile becomes a static page under `public/author/`.

For example:

- `content/authors/admin/_index.md` → `public/author/vinicius-mioto/index.html`

The generated author HTML includes:

- page metadata (`title`, `canonical`, `og:*`, `twitter:*`)
- author profile details rendered from front matter
- author image and social links if available
- biography content from the Markdown body
- links to publications, talks, and projects associated with that author
- navigation and site chrome from the Hugo theme
- the same JS/CSS assets included on other pages (`public/js/hugo-blox-en.min.js`, `public/js/hb-head.min.*.js`, `public/css/themes/sky.min.css`)

## How author pages are used

- `author` taxonomies link authors to content items like publications, events, and projects.
- Other content files use `authors:` in front matter to reference author names.
- Hugo resolves those names to author profile pages under `public/author/<slug>/`.
- The site also generates an author listing page at `public/authors/index.html`.

## Summary

1. The author profile source is `content/authors/<folder>/_index.md`.
2. Folder name and front matter determine the author page slug and metadata.
3. Hugo config maps `authors` to `author` URLs.
4. Hugo renders static HTML under `public/author/<slug>/`.
5. Author pages are used for profile display and content attribution across the site.
