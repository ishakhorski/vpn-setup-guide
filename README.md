# VPN Setup Guide

A step-by-step VPN setup guide built with Vue 3, Vite, and TypeScript. Content is authored in Markdown and rendered as interactive stepper and FAQ views.

## Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`

## Setup

```sh
npm install
```

## Development

```sh
npm run dev
```

Opens a local dev server with hot module replacement.

## Build

```sh
npm run build
```

Runs type checking (`vue-tsc`) and Vite production build in parallel. Output goes to `dist/`.

To preview the production build locally:

```sh
npm run preview
```

## Linting & Formatting

```sh
npm run lint       # oxlint (stage 1) then ESLint (stage 2), both with --fix
npm run format     # Format src/ with oxfmt
npm run type-check # Type checking only (vue-tsc)
```

Linting is a two-stage pipeline: [oxlint](https://oxc.rs/) runs first for fast Rust-based checks, then ESLint handles remaining rules. The `eslint-plugin-oxlint` integration disables duplicate rules automatically.

Formatting is handled by [oxfmt](https://oxc.rs/) (not Prettier) &mdash; no semicolons, single quotes.

## Project Structure

```
src/
├── assets/              # CSS: Tailwind entry, theme tokens, prose styles
├── components/
│   ├── base/            # Headless UI wrappers (accordion, button, stepper, switch)
│   └── icons/           # SVG icons (imported as Vue components)
├── composables/         # useTheme, useMarkdownContent
├── content/
│   ├── faq/             # FAQ markdown files
│   └── guide/           # Guide step markdown files
├── router/              # Vue Router config
└── views/               # Page components (Home, Guide, FAQ)
```

## Pages

| Route                       | View            | Description                            |
| --------------------------- | --------------- | -------------------------------------- |
| `/`                         | `HomeView`      | Landing page with navigation cards     |
| `/guide`                    | `GuideView`     | Interactive stepper with guide content |
| `/frequently-asked-questions` | `FaqView`     | Accordion-based FAQ                    |

## Markdown Content System

Content is written as Markdown files with YAML frontmatter and rendered as Vue components at build time via [`unplugin-vue-markdown`](https://github.com/unplugin/unplugin-vue-markdown).

### How it works

1. Vite is configured to treat `.md` files as Vue components:

   ```ts
   // vite.config.ts
   plugins: [
     vue({ include: [/\.vue$/, /\.md$/] }),
     markdown({}),
   ]
   ```

2. Markdown files in `src/content/` use YAML frontmatter to define metadata:

   ```markdown
   ---
   title: Step title here
   description: Optional description
   order: 1
   ---

   Markdown body content...
   ```

3. Files are loaded at build time with `import.meta.glob` (eager mode) and sorted by the `useMarkdownContent` composable:

   ```ts
   const steps = useMarkdownContent(
     import.meta.glob<{ default: Component; title: string; order: number }>(
       '@/content/guide/*.md',
       { eager: true },
     ),
   )
   // Returns: [{ title, order, component }, ...] sorted by `order`
   ```

4. Each entry's `component` is rendered with `<component :is="entry.component" />` inside a `.prose` container.

### Frontmatter fields

| Field         | Required | Used in | Description                        |
| ------------- | -------- | ------- | ---------------------------------- |
| `title`       | yes      | both    | Display title for the step or FAQ  |
| `order`       | yes      | both    | Sort order (ascending)             |
| `description` | no       | guide   | Subtitle shown in the step header  |

### File naming convention

Files are prefixed with a two-digit number for readability, though sorting is determined by the `order` frontmatter field:

```
src/content/guide/01-get-config.md
src/content/guide/02-install-client.md
src/content/faq/01-what-is-vless.md
src/content/faq/02-supported-platforms.md
```

### Adding new content

**Add a guide step** &mdash; create a new `.md` file in `src/content/guide/`:

```markdown
---
title: Your step title
description: Brief description
order: 5
---

Step content here...
```

**Add an FAQ item** &mdash; create a new `.md` file in `src/content/faq/`:

```markdown
---
title: Your question here?
order: 6
---

Answer content here...
```

No router or view changes are needed. Files are discovered automatically via `import.meta.glob`.

### Custom callout classes

Two styled callout boxes are available inside markdown content:

```markdown
<div class="tip">

**Tip:** helpful information here.

</div>

<div class="warning">

**Warning:** important caution here.

</div>
```

These are styled via `src/assets/prose.css` and adapt to both light and dark themes.

### Full markdown support

Standard markdown features are fully styled within `.prose` containers: headings, lists, tables, code blocks, blockquotes, links, images, and horizontal rules.
