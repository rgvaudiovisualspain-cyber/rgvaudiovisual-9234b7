# RGV Audiovisual

## Project Overview

Single-page presentation site for RGV Audiovisual, an independent audiovisual production company. The interface recreates the supplied bundled HTML as a polished, responsive cinematic experience.

## Architecture

- `src/routes/__root.tsx` defines the document shell and global metadata.
- `src/routes/index.tsx` contains the complete site experience and its client-side view navigation.
- `src/styles.css` contains the visual system, responsive layout, motion, poster artwork, and cinematic textures.
- `public/` contains static browser assets.
- `netlify.toml` and `vite.config.ts` configure TanStack Start for Netlify.

## Technologies

- TanStack Start and TanStack Router
- React 19 with TypeScript
- Vite 7
- Tailwind CSS 4 tooling, with custom global CSS
- Lucide React icons
- Netlify deployment adapter

## Conventions

- Use PascalCase for React components and camelCase for functions and local state.
- Keep the site copy in Spanish and preserve the supplied wording unless requested otherwise.
- Keep design tokens in `:root` and use the existing CSS variables for colors and typography.
- Prefer CSS-generated visual treatments over adding decorative image dependencies.
- Maintain keyboard-accessible buttons, dialogs, and form controls.
- Respect `prefers-reduced-motion` when adding animation.

## Non-obvious Decisions

- Navigation swaps the main view without a full page reload to match the behavior of the supplied HTML bundle.
- The supplied HTML referenced poster, still, and logo files that were not included in the attachment. These visuals are recreated with CSS so the project remains complete and self-contained.
- The contact form intentionally remains client-side, matching the non-submitting behavior of the supplied HTML.

## Local Development

Install dependencies with `pnpm install`, then run `pnpm dev`. The production build command is `pnpm build`.
