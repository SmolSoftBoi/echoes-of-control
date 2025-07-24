# 🚀 Next.js 15 Specifics
- Use **App Router** (`/app` directory) – no pages router.
- Implement new **Server Actions** for data mutations; keep them in `/app/_actions`.
- Ensure React 18 **strict mode** remains enabled in `layout.tsx`.
- Optimise images with `next/image`; set `sizes="100vw"` unless another value is clearer.

# 📜 File & Folder Guide
| Folder | Purpose |
|--------|---------|
| `/app` | Route tree, layouts, Server Components |
| `/app/(auth)` | Auth‑related routes (do not refactor without story) |
| `/app/_actions` | **Server Actions only** |
| `/components` | Client components only |
| `/lib` | Typed helpers shared across components |
| `/public` | Static assets (immutable after design review) |

# 🖍️ Styling Rules
- Tailwind **utility‑first**; never mix CSS‑modules and Tailwind in the same file.
- Global styles belong in `/app/globals.css`.
- Use the **`cn()`** helper from `packages/utils` for class merging.

# ✅ Accessibility
Every new component must:
1. Pass **`@axe-core/react`** checks in dev
2. Export a **Storybook story** with `aria-*` props demonstrated

# 🔥 Performance
- Bundle budget: ≤ 200 kB initial JS (after gzip)
- Use `next/dynamic` for any component > 10 kB that isn’t required above the fold.

# 🧩 Integration Points
- API calls go through the **tRPC** client in `/lib/trpc`.
- Analytics via **Vercel Analytics**; wrap new routes with `<Suspense>` to keep traces intact.

# ⛔ Do Not Touch (web)
- `middleware.ts`  – security rules; edits require security‑team story
- `.env.production`  – managed by Ops

# 🛠️ Agent Notes
- When updating dependencies, run `yarn web:upgrade --interactive` (custom script).
- After edits, run `yarn web:ci` to lint, test, and type‑check **before** pushing a PR.
