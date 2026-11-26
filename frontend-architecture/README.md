# Frontend Architecture

Production-oriented interview preparation for Senior Frontend, Staff/Lead, Tech Lead and Frontend Architect roles: how to make, justify, enforce and evolve the structural decisions of a large web (and mobile) frontend. Each document follows the repository template: verification note, TOC, TL;DR with diagram, concepts and trade-offs, pitfalls, fundamentals Q&A, senior scenario Q&A, cheat sheet, glossary and further reading.

## Documents

| # | Document | Focus |
|---|---|---|
| 01 | [Principles and Decision Making](01-frontend-architecture-principles-and-decision-making.md) | Quality attributes, Conway's law, evolutionary architecture and fitness functions, technology selection, ADRs/RFCs, trade-off communication |
| 02 | [Modularity, Layering and Boundaries](02-modularity-layering-and-boundaries.md) | Feature slices, Feature-Sliced Design, ports/adapters, DTO/domain/view models, barrels and cycles, boundary enforcement, DI in React |
| 03 | [State, Data Flow and Side Effects](03-state-data-flow-and-side-effect-architecture.md) | State ownership map, unidirectional flow, server-state boundary, state machines, effects, mutations/consistency, forms, offline/real-time |
| 04 | [Cross-Cutting Concerns](04-cross-cutting-concerns-architecture.md) | Error handling, observability, feature flags/experiments, authn/authz, i18n, analytics, configuration, paved-road defaults |
| 05 | [Monorepos, Build Systems and Code Sharing](05-monorepos-build-systems-and-code-sharing.md) | Monorepo vs polyrepo, workspaces/catalogs, Nx/Turborepo caching and affected, package design, CI shape, governance |
| 06 | [Micro-Frontends and Composition](06-micro-frontends-and-composition.md) | When and when not, Module Federation, import maps, Multi-Zones, iframes/Web Components, shell contracts, strangler routing |
| 07 | [Migrations, Modernization and Technical Debt](07-migrations-modernization-and-technical-debt.md) | Strangler/branch-by-abstraction/expand–contract, codemods and ratchets, concrete playbooks, rewrite vs refactor, debt management |
| 08 | [Teams, Governance, Platform and Delivery](08-teams-governance-platform-and-delivery.md) | Team models, platform as product, governance without bureaucracy, DORA, trunk-based development, release architecture, version skew, incidents |
| 09 | [Recall Map](09-frontend-architecture-recall-map.md) | One-page mental model, diagrams, decision tables, numbers, mnemonics, prompts, scripts, flags |

## Suggested Order

1. **[01 Principles](01-frontend-architecture-principles-and-decision-making.md)** — the vocabulary and decision framework used everywhere else.
2. **[02 Modularity](02-modularity-layering-and-boundaries.md) → [03 State and data flow](03-state-data-flow-and-side-effect-architecture.md) → [04 Cross-cutting concerns](04-cross-cutting-concerns-architecture.md)** — the architecture of one application.
3. **[05 Monorepos](05-monorepos-build-systems-and-code-sharing.md) → [06 Micro-frontends](06-micro-frontends-and-composition.md)** — scaling across teams and deployables.
4. **[07 Migrations and debt](07-migrations-modernization-and-technical-debt.md) → [08 Teams and delivery](08-teams-governance-platform-and-delivery.md)** — evolving and operating the system.
5. **[09 Recall Map](09-frontend-architecture-recall-map.md)** the day before and the hour before.

## Related Material

- Leadership, influence, mentoring, planning and behavioral interviews: [leadership/](../leadership/README.md)
- Production incidents, observability and RCA scenarios: [debugging-scenarios/07](../debugging-scenarios/07-production-incidents-observability-and-root-cause-analysis.md)
- Component-level patterns and a short folder-architecture section: [react/07](../react/07-component-patterns-and-architecture.md); state libraries: [react/06](../react/06-state-management-and-data-fetching.md)
- End-to-end design interviews using these building blocks: [system-design/](../system-design/README.md) (framework, design system, collaborative editor)
- Rendering and deployment models: [nextjs-and-rendering/](../nextjs-and-rendering/README.md)
- Performance budgets and culture: [web-performance/](../web-performance/README.md)
- Security architecture (BFF, CSP, supply chain): [web-security/](../web-security/README.md)
- API and contract architecture: [networking-and-apis/](../networking-and-apis/README.md)
- Test architecture and CI: [testing/](../testing/README.md)
- TypeScript at boundaries and in monorepos: [typescript/](../typescript/README.md)
- Mobile counterpart: [react-native/](../react-native/README.md) (app architecture, OTA/store releases, CI/CD)
- CSS architecture, theming and design tokens in depth: [html-and-css/07](../html-and-css/07-css-architecture-theming-and-tooling.md)
- Accessibility in the delivery process (definition of done, gates, audits): [accessibility/07](../accessibility/07-testing-tooling-and-accessibility-in-the-delivery-process.md)
- Pipeline design, GitHub Actions, deployment strategies and release automation in depth: [ci-cd-web/](../ci-cd-web/README.md)

## Version Notes

Verified on 2026-11-19: DORA's five delivery metrics (dora.dev, Jan 2026), Nx and Turborepo capabilities (caching, task graphs, affected, remote cache, boundaries), pnpm catalogs, Module Federation 2.0 (runtime, manifest, plugins, type hints; Rspack/webpack), import maps (Baseline; multiple import maps unsupported in Firefox), Next.js Multi-Zones, and Feature-Sliced Design layering. Methodology (Conway's law, fitness functions, ADR/RFC, strangler fig, expand–contract, ports/adapters, Team Topologies) is established practice; tool options and versions (ESLint boundary plugins, dependency-cruiser, Changesets, Renovate, codemod tools, OpenFeature, OpenTelemetry for browsers, CI action versions) should be re-checked against current documentation before adoption.
