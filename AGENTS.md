# 🗺️ Project Overview
This monorepo contains:
- **apps/web** – Next.js 15 front‑end
- **packages/ui** – shared React/Tailwind components
- **packages/utils** – TypeScript helper libs
Everything uses **Yarn** workspaces.

# ⚙️ Development Tasks
1. Install → `yarn`
2. Dev server (web) → `yarn web:dev`
3. Full build → `yarn build`
4. Lint & format → `yarn lint:fix`
5. Test (all) → `yarn test`

# 🎨 Coding Conventions
- Language: **TypeScript strict** (`"strict": true` in `tsconfig.json`)
- Framework: **Next.js 15 App Router**; use Server Actions where practical
- Styling: **Tailwind CSS** from `packages/ui/tailwind.config.ts`
- **Prettier + ESLint** (see configs in repo root); run `yarn lint:fix` on every edit
- Commit messages → **Conventional Commits** (`feat: …`, `fix: …`, etc.)

# 🔒 Secrets & ENV
- Never commit real secrets. Use placeholders like `NEXT_PUBLIC_API_KEY="YOUR_KEY_HERE"`.
- Store runtime secrets in **GitHub Actions** pipeline.  
  Agents should reference `.env.example` only.

# 🚫 Do Not Touch
- `/infra/terraform/**`  Infrastructure state
- `apps/web/public/icons/**`  – brand assets (managed by Design)  
- GitHub workflow files unless task explicitly says “update CI”.

# 🧪 Tests & Coverage
- Unit tests: **Vitest** (`yarn test`)
- E2E: **Playwright** (`yarn e2e`)
- PRs must keep coverage ≥ 90 %.

# ✅ Pull‑Request Checklist (auto)
- All changed files pass `yarn lint`
- Unit + e2e tests green
- No secrets leaked (`git secrets --scan`)
- Description includes **“Closes #<issue‑id>”** link

# 🛠️ Agent Behaviour
- Prefer creating *new* files over editing generated code in `.next/`.
- If upgrade chores arise, open a **separate PR per package**.
- When generating content, default to **English (UK)** spellings.
