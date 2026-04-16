# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server on port 3000
npm run build     # Production build
npm run preview   # Preview production build
npm run test      # Run tests with Vitest (single run)
```

Convex backend (run in a separate terminal):
```bash
npx convex dev    # Start Convex dev server (required for DB/backend)
```

Add Shadcn components:
```bash
pnpm dlx shadcn@latest add <component>
```

## Architecture

This is a **TanStack Start** (SSR React framework) app backed by **Convex** (real-time backend-as-a-service).

### Key layers

- **`convex/`** — Backend: schema definitions and server-side query/mutation functions. `schema.ts` defines the DB tables; individual `.ts` files export Convex queries and mutations. The generated API types live in `convex/_generated/`.
- **`src/integrations/convex/provider.tsx`** — Wraps the app in `ConvexProvider` using `ConvexQueryClient` from `@convex-dev/react-query`, bridging Convex with TanStack Query.
- **`src/routes/`** — File-based routing via TanStack Router. `__root.tsx` is the shell layout (wraps everything in `ConvexProvider` + `Header`). Route files export a `Route` via `createFileRoute`. `routeTree.gen.ts` is auto-generated — do not edit manually.
- **`src/components/`** — Shared UI components (Header, Footer, ThemeToggle).
- **`src/lib/utils.ts`** — Utility helpers (e.g., `cn()` for class merging with `clsx` + `tailwind-merge`).

### Data flow

Convex queries/mutations defined in `convex/*.ts` → imported via `convex/_generated/api` → called from React components using Convex React hooks (`useQuery`, `useMutation`) or TanStack Query via `@convex-dev/react-query`.

### Environment variables

Required in `.env.local`:
- `VITE_CONVEX_URL` — Convex deployment URL
- `CONVEX_DEPLOYMENT` — Convex deployment name

Run `npx convex init` to set these automatically.

### Path aliases

- `#/*` and `@/*` both resolve to `./src/*`

### Styling

Tailwind CSS v4 via `@tailwindcss/vite` plugin. Theme toggling (light/dark/auto) is handled by an inline script in `__root.tsx` and stored in `localStorage` under the key `theme`.
