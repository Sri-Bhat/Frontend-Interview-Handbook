# Testing

Production-oriented testing interview preparation for Senior Frontend, Staff/Lead and Frontend Architect roles: strategy and test design, unit testing and test doubles, React component testing, end-to-end testing with Playwright, visual/accessibility/component-state testing, API contract and integration testing, flakiness/CI/non-functional testing, and testing in practice (TDD, architecture, migrations, React Native, AI-assisted testing). Each file covers **one topic end-to-end**: concept, mechanics, code, pitfalls, trade-offs, fundamentals Q&A and senior scenario Q&A. File 09 is the **last-minute recall map**.

## Documents

| # | Document | Focus |
|---|---|---|
| 01 | [Testing strategy and test design](01-testing-strategy-and-test-design.md) | Pyramid/trophy/honeycomb, risk-based planning, what to test, properties of good tests, techniques, coverage vs mutation, toolchain map, pipeline overview |
| 02 | [Unit testing and test doubles](02-unit-testing-and-test-doubles.md) | Vitest/Jest, dummies/stubs/spies/mocks/fakes, module mocking limits, DI and seams, time/randomness, async, parametrised/property-based tests, snapshots, reducers/hooks, test data |
| 03 | [Component testing (React)](03-component-testing-react.md) | Testing Library philosophy and queries, `user-event`, providers, hooks/context/forms, async UI, MSW, Next.js RSC/Server Actions, error/loading/empty states, jsdom vs happy-dom vs real browser |
| 04 | [End-to-end testing with Playwright](04-end-to-end-testing-with-playwright.md) | Config, locators, auto-waiting, fixtures/POM, auth `storageState`, data isolation/locks, network/clock, sharding, debugging/traces, GitHub Actions, Cypress/Selenium comparison |
| 05 | [Visual, accessibility and component-state testing](05-visual-accessibility-and-component-states-testing.md) | Deterministic screenshots, snapshot workflow, Storybook state matrices, axe, ARIA snapshots, keyboard/focus/AT testing, user-preference emulation, design-system and cross-browser testing |
| 06 | [API, contract and integration testing](06-api-contract-and-integration-testing.md) | Honest mocks, Pact vs OpenAPI contracts, breaking-change detection, Playwright API testing, BFF/route-handler tests, test data/environments, resilience/idempotency tests, webhooks, security API tests |
| 07 | [Flakiness, CI and non-functional testing](07-flakiness-ci-and-non-functional-testing.md) | Flake taxonomy/triage/quarantine, retry policy, CI pipeline design, sharding/caching, GitHub Actions workflow, Lighthouse CI/budgets, load testing, security guardrails, metrics, synthetics/canaries |
| 08 | [Testing in practice: TDD, architecture, mobile and AI](08-testing-in-practice-tdd-architecture-mobile-and-ai.md) | TDD/BDD/example mapping, repo layout and utilities, test review checklist, legacy and tool migrations, React Native testing, Next.js testing map, Playwright agents and AI-assisted testing, culture |
| 09 | [Recall map](09-testing-recall-map.md) | One-page mental model, diagrams, decision tables, version facts, mnemonics, rapid-fire, scripts, checklist |

## Suggested Order

1. **[01 Strategy](01-testing-strategy-and-test-design.md)** → **[02 Unit](02-unit-testing-and-test-doubles.md)** → **[03 Component](03-component-testing-react.md)** (the daily toolkit).
2. **[04 E2E with Playwright](04-end-to-end-testing-with-playwright.md)** → **[07 Flakiness and CI](07-flakiness-ci-and-non-functional-testing.md)** (the scenarios senior interviews probe).
3. **[06 API and contract testing](06-api-contract-and-integration-testing.md)** → **[05 Visual and accessibility](05-visual-accessibility-and-component-states-testing.md)**.
4. **[08 Testing in practice](08-testing-in-practice-tdd-architecture-mobile-and-ai.md)** (leadership, migrations, mobile, AI).
5. **[09 Recall map](09-testing-recall-map.md)** the day before and the hour before.

## Related Material

- Debugging methodology, Playwright debugging and CI-only failures: [debugging-scenarios/](../debugging-scenarios/README.md)
- Components, hooks and state under test: [react/](../react/README.md); typed test utilities and contracts: [typescript/](../typescript/README.md)
- Server Components, Server Actions, caching behaviour to verify: [nextjs-and-rendering/](../nextjs-and-rendering/README.md)
- Performance budgets and lab/field measurement: [web-performance/](../web-performance/README.md); browser behaviour behind jsdom limits and visual differences: [browser-internals/](../browser-internals/README.md)
- Security testing guardrails and CI hardening: [web-security/](../web-security/README.md); API clients, contracts and resilience: [networking-and-apis/](../networking-and-apis/README.md)
- Designing test strategy in interviews: [system-design/](../system-design/README.md); mobile counterpart and CI/CD: [react-native/](../react-native/README.md)
- Test architecture within module boundaries, monorepo CI and delivery gates: [frontend-architecture/](../frontend-architecture/README.md)
- What to test in CSS/HTML (visual, forms, responsive behavior): [html-and-css/](../html-and-css/README.md)
- Accessibility testing in depth (axe, keyboard E2E, ARIA snapshots, screen readers, CI gates): [accessibility/07](../accessibility/07-testing-tooling-and-accessibility-in-the-delivery-process.md)
- Pipeline design, caching, security and deployment gates around the test suite: [ci-cd-web/](../ci-cd-web/README.md)

## Version Notes

- Verified in Nov 2026: **Playwright release notes through 1.65** (Chromium 158, Firefox 159, WebKit 27.2; Node 20 no longer tested; Bun support; `failures` reporter; test locks; `--shuffle`; `retryStrategy: 'isolated'`; WebP snapshots; aria snapshot evolution through 1.63; `page.accessibility` removed in 1.57; Test Agents 1.56 and bundled MCP/CLI 1.62; 1.65 breaking changes incl. sharded runs with no tests failing) and **Vitest Browser Mode docs** (updated Oct 2026: playwright/webdriverio/preview providers, `expect.element`, `vitest-browser-*` renderers, `vi.mock(path, { spy: true })` instead of spying on ESM namespaces, visual regression, ARIA snapshots, migration guides).
- *General knowledge, marked "(hedged)" in the files:* Testing Library, MSW, jest-axe/axe-core coverage claims, Storybook/Chromatic/Percy, Pact, OpenAPI tooling, fast-check/Stryker, Lighthouse CI, k6, React Native testing tools (RNTL, Detox, Maestro, Appium), Expo/EAS workflows, TDD/BDD practices, flake SLO figures.
- Test tooling changes quickly: re-check release notes and official docs before relying on exact versions, option names or support claims. CI snippets use organisation defaults (`bby-ubuntu`, Artifactory registries, GIAM action) and placeholder action SHAs to confirm.
