# echoes-of-control
Echoes of Control is a replay‑friendly, text‑first investigation game.

## Development environment

This repo provides a [Dev Container](https://containers.dev/) setup for VS Code and Codespaces. It installs Node.js and Yarn, then runs `yarn install` at the repository root.

## Repository structure

This project is a **Yarn workspaces** monorepo:

- **apps/web** – Next.js 15 front end
- **packages/ui** – shared React components styled with Tailwind
- **packages/utils** – internal helper utilities

## Local development

Install dependencies and start the web server:

```bash
yarn
yarn web:dev
```

Other useful commands:

- `yarn build` – create production builds for all packages
- `yarn lint:fix` – run ESLint with automatic fixes
- `yarn test` – execute unit tests with Vitest

## Database security

The Supabase schema uses **row-level security**. Each `game` record belongs to
a specific user, and policies ensure only its owner can access it. Apply the
policies locally with:

```bash
supabase db reset
```

## Contributing

Follow the **Conventional Commits** style for commit messages. Linting and tests must pass before opening a PR. Coverage should remain above 90 %.

