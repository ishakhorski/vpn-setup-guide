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
│   ├── base/            # Headless UI wrappers (accordion, badge, button, dialog, sheet, stepper, switch)
│   ├── icons/           # SVG icons (imported as Vue components)
│   ├── GuideModule.vue  # Guide container with step navigation and extras dialog
│   └── ThemeSwitch.vue  # Dark/light mode toggle
├── composables/         # useTheme, useMarkdownContent
├── content/
│   ├── faq/             # FAQ markdown files
│   ├── images/          # Platform-specific setup screenshots
│   └── guides/          # Guide step markdown files
│       ├── windows/
│       │   └── extras/  # Supplementary content for steps
│       ├── android/
│       └── apple/
├── router/              # Vue Router config
└── views/               # Page components (Home, Guide, FAQ)
```

## Pages

| Route                                      | View        | Description                            |
| ------------------------------------------ | ----------- | -------------------------------------- |
| `/`                                        | `HomeView`  | Landing page with navigation cards     |
| `/guide/:platform(windows\|android\|apple)` | `GuideView` | Interactive stepper with guide content |
| `/frequently-asked-questions`              | `FaqView`   | Accordion-based FAQ                    |

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
     import.meta.glob<MarkdownModule>(
       '@/content/guides/windows/*.md',
       { eager: true },
     ),
   )
   // Returns: [{ title, order, component }, ...] sorted by `order`
   ```

4. Each entry's `component` is rendered with `<component :is="entry.component" />` inside a `.prose` container.

### Frontmatter fields

| Field         | Required | Used in | Description                              |
| ------------- | -------- | ------- | ---------------------------------------- |
| `title`       | yes      | both    | Display title for the step or FAQ        |
| `order`       | yes      | both    | Sort order (ascending)                   |
| `description` | no       | guide   | Subtitle shown in the step header        |
| `tags`        | no       | FAQ     | Array of category labels shown as badges |
| `step`        | yes      | extras  | Step number this extra content belongs to |

### File naming convention

Files are prefixed with a two-digit number for readability, though sorting is determined by the `order` frontmatter field:

```
src/content/guides/windows/01-get-config.md
src/content/guides/windows/02-install-client.md
src/content/guides/windows/extras/05-routing-details.md
src/content/faq/01-speed.md
src/content/faq/02-check-vpn.md
```

### Adding new content

**Add a guide step** &mdash; create a new `.md` file in `src/content/guides/<platform>/`:

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
tags: [компьютер, телефон]
---

Answer content here...
```

No router or view changes are needed. Files are discovered automatically via `import.meta.glob`.

**Add guide extras** &mdash; create a new `.md` file in `src/content/guides/<platform>/extras/`:

```markdown
---
title: Extra content title
step: 5
---

Additional details for step 5...
```

Extras are supplementary content linked to specific steps. When a step has extras, an info button appears that opens the content in a dialog.

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
