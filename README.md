# Utilities

Utilities is a Next.js + React + TypeScript web app that groups small browser tools in one place, with bilingual UI (English/Vietnamese) and a shared header menu.

## What this project does

- Provides a simple landing page and help page.
- Offers web utilities:
  - **Open multiple pages**: generate URLs from a pattern and open them in bulk.
  - **Find all resources**: fetch a page and extract linked resources (scripts, styles, images, media, iframe, and CSS `url(...)` entries).
- Includes quick links to external games.
- Supports runtime language switching (`en` / `vi`) with localStorage persistence.

## Tech stack

- Next.js 13 (App Router) + React 18 + TypeScript
- Tailwind CSS + global CSS
- `lucide-react` for icons
- `react-flagkit` for language flag display

## Code summary

### App routes (`src/app`)

- `layout.tsx`
  - Root layout for all pages.
  - Imports global styles.
  - Wraps the app with `LanguageProvider` and renders shared `Header`.
- `page.tsx`
  - Home page.
  - Reads localized title/description/body from language context.
- `help/page.tsx`
  - Help page.
  - Displays localized help rules for the Web tools section.
- `web/openMultiplePages/page.tsx`
  - Tool page for creating a sequence of URLs.
  - Supports pattern with `{page}` placeholder or direct suffix appending.
  - Computes `endPage` and URL list with `useMemo`.
  - Actions:
    - **List**: output URLs into a textarea.
    - **Open**: open each URL in new tab/window and advance current page.
- `web/findAllResources/page.tsx`
  - Tool page for extracting resources from a target URL.
  - Validates and normalizes URL input.
  - Fetches HTML and parses it with `DOMParser`.
  - Extracts from `href`, `src`, `srcset`, inline `style`, and `<style>` CSS `url(...)`.
  - Normalizes relative links against base URL and filters invalid protocols (`data:`, `javascript:`, anchors).
  - Outputs deduplicated/sorted resources or localized error/empty/loading states.

### Shared components (`src/components`)

- `Header.tsx`
  - Top bar containing app title (home link), `TopMenus`, language, help, and contact buttons.
- `TopMenus.tsx`
  - Renders dropdown menus from `topMenusConfig`.
  - Handles hover/click open state, delayed close on mouse leave, close on outside click, and close on `Escape`.
  - Supports internal and external submenu links.
- `LanguageButton.tsx`
  - Dropdown language switcher (`en`, `vi`).
  - Uses globe icon + country flag.
  - Closes on outside click.
- `HelpButton.tsx`
  - Help icon link to `/help`.
- `ContactButton.tsx`
  - Contact icon link from `NEXT_PUBLIC_CONTACT_URL` environment variable.

### Configuration and models

- `src/configs/topMenusConfig.ts`
  - Defines top-level menus and submenu items.
  - Builds internal URLs using optional `NEXT_PUBLIC_BASE_PATH`.
  - Includes external game links (Sudoku, Rubik, Werewolf).
- `src/models/topMenusModel.ts`
  - Type definitions for menu and submenu shape.

### Language and localization (`src/context`, `src/i18n`)

- `src/context/LanguageContext.tsx`
  - React context/provider for current language and translation dictionary.
  - Persists language to localStorage.
- `src/i18n/index.ts`
  - Localization helpers:
    - default locale (`en`)
    - read/write language from localStorage
    - translation selector by locale
- `src/i18n/en.ts`, `src/i18n/vi.ts`
  - English and Vietnamese translation objects for header, home, help, top menus, and utility pages.

### Styling

- `public/styles/globals.css`
  - Tailwind directives.
  - Global document sizing and base typography/colors.
  - Utility width classes used by the web tools (`open-multiple-pages-*`).

### Build/runtime config

- `next.config.js`
  - Static export mode (`output: 'export'`) with output directory `out`.
  - Optional base path support via `BASE_PATH`.
  - Exposes `NEXT_PUBLIC_BASE_PATH` to client runtime.
- `tailwind.config.cjs`
  - Tailwind content scanning paths.
- `postcss.config.cjs`
  - Tailwind + autoprefixer setup.
- `Dockerfile`
  - Multi-stage image build using Node 18 Alpine.
  - Installs dependencies, builds app, and prepares production image.

### Notes

- `src/utilities` currently exists but is empty.

## Environment variables

- `BASE_PATH`
  - Optional deployment base path used by Next.js config.
- `NEXT_PUBLIC_CONTACT_URL`
  - URL for the header contact button.

## Scripts

- `npm run dev` - Start development server.
- `npm run build` - Build app.
- `npm run start` - Start production server.
- `npm run export` - Export static output.
- `npm run format` - Format project with Prettier.
- `npm run format:check` - Check formatting.
