# AGENTS.md – Repository Guidance

## 🎯 Purpose
This file defines the conventions and tooling expectations for **all agents** (including AI‑driven assistants) that interact with this codebase. It serves as a single source of truth for:
- Build, lint, and test commands (including single‑test execution)
- Comprehensive code‑style guidelines covering imports, formatting, typing, naming, error handling, etc.
- Any cursor or Copilot specific rules present in the repository.

The content is deliberately verbose (~150 lines) to give agents enough context without needing to infer defaults.

---

## 🛠️ Project Setup
| Item | Command |
|------|---------|
| **Node version** | `node >=18` (LTS) |
| **Package manager** | Detect automatically: if `yarn.lock` exists → `yarn`, otherwise → `npm` |
| **Install dependencies** | `npm install` or `yarn` |
| **Pre‑commit hooks** | Managed by `husky` (if present). Run `npm run prepare` to install them. |

---

## 📦 Build / Lint / Test Commands
### Detecting the package manager
```bash
if [ -f yarn.lock ]; then
  pm=yarn
else
  pm=npm
fi
```
All subsequent commands use `$pm`.

### Build
- **Full build** – Compiles the project for production.
```bash
$pm run build
```
- **Watch mode** – Re‑builds on file changes (if script defined).
```bash
$pm run build -- --watch
```

### Lint
- **Standard lint** – Checks code style and potential bugs.
```bash
$pm run lint
```
- **Fix‑able lint** – Auto‑fixes where possible.
```bash
$pm run lint -- --fix
```

### Test Suite (Vitest)
- **Run all tests**
```bash
$pm test   # defaults to "vitest run"
```
- **Watch mode**
```bash
$pm test -- --watch
```
- **Run a single test file** – Provide a relative path to the spec file.
```bash
# Example: tests/unit/button.spec.ts
$pm test -- tests/unit/button.spec.ts
```
- **Run a single test case** – Use Vitest's `-t`/`--testNamePattern` flag.
```bash
$pm test -- tests/unit/button.spec.ts -t "should render correctly"
```
- **Coverage report**
```bash
$pm test -- --coverage
```

---

## 🧹 Code‑Style Guidelines
### 1️⃣ Imports
| Order | Description |
|-------|-------------|
| **1. Node built‑ins** | `import fs from "fs"` |
| **2. Third‑party packages** | `import React from "react"` |
| **3. Internal aliases** | `import { fetchUser } from "@/services/api"` |
| **4. Relative imports** | `import Button from "./components/Button"` |

- Separate each group with a blank line.
- Use **ESM** syntax exclusively (`import … from …`).
- Remove any unused imports; lint will flag them.

### 2️⃣ Formatting
- **Prettier** – Enforced via `prettier --write .` (run as part of `npm run format`).
- **Indentation** – 2 spaces, no tabs.
- **Line length** – Aim for **≤ 100 characters**; longer lines may be wrapped.
- **Trailing commas** – Enable for arrays, objects, function parameters.
- **Quotes** – Prefer single quotes `'` for strings, double quotes only when nesting.

### 3️⃣ Types (TypeScript)
- **Strict mode** – `"strict": true` in `tsconfig.json`.
- **Prefer `interface`** for object shapes; use `type` for unions, tuples, and utility types.
- **Explicit return types** for all exported functions.
- **Avoid `any`**; resort to `unknown` if type cannot be known.
- **Reusable utility types** – place in `src/types/`.

### 4️⃣ Naming Conventions
| Entity | Convention |
|--------|------------|
| **Variables / functions** | `camelCase` (e.g., `fetchUserData`) |
| **React components** | `PascalCase` (e.g., `UserProfileCard`) |
| **Constants** | `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`) |
| **Enums** | Enum name `PascalCase`, members `UPPER_SNAKE_CASE` |
| **Files / folders** | `kebab-case` (e.g., `user-profile/`, `api-client.ts`) |

### 5️⃣ Error Handling
- **Async operations** – Wrap in `try { … } catch (err) { … }`.
- **Custom error classes** – Extend `Error` and provide a `name` property.
```ts
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}
```
- **Logging** – Use a centralized logger (e.g., `src/utils/logger.ts`).
- **User‑facing messages** – Keep them friendly, avoid leaking internal stack traces.

### 6️⃣ Documentation
- **JSDoc** for exported APIs, especially service functions.
- **Component prop docs** – Use `/** @component */` above component definitions.
- **README sections** – Keep a short description, setup instructions, and run scripts.

### 7️⃣ Testing Conventions
- **File naming** – `<module>.spec.ts` inside a matching folder (e.g., `src/components/button.spec.ts`).
- **Test style** – Vitest with `describe`/`it` blocks.
- **Coverage** – Aim for **≥ 80%** line coverage.
- **Mocking** – Use `vi.mock` for external dependencies.

---

## 📂 Directory Layout (recommended)
```
src/
├─ components/          # UI components (PascalCase files)
├─ hooks/               # Custom React hooks
├─ services/            # API clients, data fetching
├─ utils/               # Helper functions, logger
├─ types/               # Global TypeScript types
│
public/                  # Static assets
tests/                  # Additional integration/e2e tests
```

---

## 🧭 Cursor / Copilot Rules (if present)
The repository currently **does not contain** any of the following directories/files:
- `.cursor/rules/`
- `.cursorrules`
- `.github/copilot-instructions.md`

If such files are added in the future, append their contents verbatim under a new **"⚡ Cursor & Copilot Rules"** section.

---

## ✅ How Agents Should Use This File
1. **Read** `AGENTS.md` before performing any code‑affecting action.
2. **Validate** that the command you intend to run matches the entries above (e.g., use the single‑test command format).
3. **Enforce** style rules via the project’s linting configuration; if a rule is missing, raise a ticket.
4. **When in doubt**, fall back to the most restrictive rule (e.g., `strict` TypeScript, `no‑any`).

---

*This document is intentionally verbose to provide agents with a complete, self‑contained reference. Keep it up‑to‑date as the project's tooling or conventions evolve.*
