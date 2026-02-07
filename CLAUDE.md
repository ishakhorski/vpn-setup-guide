# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server with hot reload
npm run build        # Type-check and build for production
npm run lint         # Run oxlint then ESLint (both with --fix)
npm run format       # Format src/ with oxfmt
npm run type-check   # Run vue-tsc type checking only
npm run preview      # Preview production build
```

No test runner is configured yet.

## Architecture

Vue 3 + Vite + TypeScript application for VPN setup guides.

- **Routing**: Vue Router (HTML5 history mode) with lazy-loaded views (`/` -> HomeView, `/guide` -> GuideView, `/frequently-asked-questions` -> FaqView)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin
- **Markdown**: `.md` files can be imported as Vue components via `unplugin-vue-markdown`
- **SVG**: `.svg` files are imported as Vue components via `vite-svg-loader` (e.g., `import Icon from '@/components/icons/icon.svg'`)
- **Path alias**: `@/` maps to `src/`
- **Node requirement**: ^20.19.0 || >=22.12.0

### Component patterns

Base components (`src/components/base/`) wrap [reka-ui](https://reka-ui.com/) headless primitives and use `class-variance-authority` (CVA) for type-safe variant definitions with `tailwind-merge` for class composition. Each base component folder has an `index.ts` exporting the component and its CVA variants. Components use `reactiveOmit` from `@vueuse/core` to separate variant props from HTML attributes, and `useForwardProps` from reka-ui for delegating the rest.

The switch components use Vue `provide/inject` for parent-child context (BaseSwitchRoot provides size context to BaseSwitchThumb).

### Content pattern

Markdown content lives in `src/content/` (e.g., `faq/`, `guide/`). Files use YAML frontmatter (title, order) and are loaded via `import.meta.glob` with `eager: true`. Each `.md` file is auto-compiled into a Vue component by `unplugin-vue-markdown`.

### Styling entry point

`src/assets/main.css` imports Tailwind and `./theme.css`, then defines base page styles (font, background, color, font smoothing, min-height). The Tailwind CSS v4 vite plugin auto-discovers this file.

### Dark mode

Custom Tailwind v4 variant and CSS custom properties are defined in `src/assets/theme.css`. Colors use OKLCh format and are exposed as utilities via `@theme inline`. Dark mode uses `@custom-variant dark (&:is(.dark *))` and is activated by adding a `.dark` class to `<body>`, with `prefers-color-scheme` system preference fallback. Theme state is managed by the `useTheme` composable (`src/composables/useTheme.ts`) which persists to localStorage.

## Linting Setup

Uses a two-stage linting pipeline (oxlint runs first, ESLint second):
- oxlint: configured in `.oxlintrc.json` with eslint, typescript, unicorn, oxc, vue plugins
- ESLint: configured in `eslint.config.ts`, integrates with oxlint config to avoid duplicate rules
- Formatting handled separately by oxfmt (not Prettier)

## Code Style

- No semicolons, single quotes (configured in `.oxfmtrc.json`)
- Indent: 2 spaces, max line length: 100 (`.editorconfig`)
- Unused vars prefixed with `__` are allowed (`@typescript-eslint/no-unused-vars` config)
