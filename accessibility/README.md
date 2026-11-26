# Accessibility

Production-oriented interview preparation for Senior Frontend, UI-platform, Tech Lead and Frontend Architect roles: WCAG 2.2 and legal context, how assistive technology reads the accessibility tree, semantic HTML and ARIA, keyboard and focus management, accessible forms and dynamic content, visual design (contrast, zoom, motion, media, content), accessible component patterns, testing and delivery process, and React/Next.js/React Native specifics with an audit playbook. Each document follows the repository template: verification note, TOC, TL;DR with diagram, concepts and trade-offs, pitfalls, fundamentals Q&A, senior scenario Q&A, cheat sheet, glossary and further reading.

## Documents

| # | Document | Focus |
|---|---|---|
| 01 | [Foundations: WCAG, Standards and Assistive Technology](01-accessibility-foundations-wcag-and-assistive-technology.md) | Why it matters, disability categories, POUR and conformance, WCAG 2.1/2.2 changes (verified), laws/standards, how screen readers and other AT work, accessibility tree, myths |
| 02 | [Semantic HTML, ARIA and Accessible Names](02-semantic-html-aria-and-accessible-names.md) | Native semantics, ARIA roles/states, rules of ARIA, accessible name/description computation, text alternatives, landmarks/headings/tables, hiding techniques, shadow DOM |
| 03 | [Keyboard, Focus and Navigation](03-keyboard-focus-and-navigation.md) | Keyboard operability, focus order/visibility/not obscured, focus management patterns, roving tabindex vs `aria-activedescendant`, skip links, pointer/gesture alternatives, timing, testing |
| 04 | [Accessible Forms, Errors and Dynamic Content](04-accessible-forms-errors-and-dynamic-content.md) | Labels/instructions, error patterns, authentication and redundant entry, live regions, loading/optimistic states, SPA navigation, announce-vs-focus guide |
| 05 | [Visual Design, Color, Motion, Media and Content](05-visual-design-color-motion-media-and-content.md) | Contrast math and thresholds, color-not-alone, zoom/reflow/spacing, motion and flashing, captions/audio description, cognitive accessibility, preferences and forced colors |
| 06 | [Accessible Component Patterns](06-accessible-component-patterns.md) | Native vs custom, accordion, tabs, dialogs, tooltips, menus vs disclosure nav, combobox/listbox, controls, grids/trees/feeds, carousels, drag-and-drop alternatives |
| 07 | [Testing, Tooling and Process](07-testing-tooling-and-accessibility-in-the-delivery-process.md) | Testing pyramid, lint, component tests, axe with Playwright, manual screen-reader checklists, user testing, CI gates, DoD, audits/ACR, org practices, metrics |
| 08 | [React, Next.js and Mobile, Audit Playbook](08-accessibility-in-react-nextjs-mobile-and-scenarios.md) | React patterns, React 19 features, Next.js specifics, React Native accessibility APIs, before/after gallery, 30-minute audit, reading screen-reader output |
| 09 | [Recall Map](09-accessibility-recall-map.md) | One-page mental model, diagrams, decision tables, numbers, mnemonics, scripts, flags, checklist |

## Suggested Order

1. **[01 Foundations](01-accessibility-foundations-wcag-and-assistive-technology.md) → [02 Semantics and ARIA](02-semantic-html-aria-and-accessible-names.md)** — vocabulary and the accessibility tree.
2. **[03 Keyboard and focus](03-keyboard-focus-and-navigation.md) → [04 Forms and dynamic content](04-accessible-forms-errors-and-dynamic-content.md) → [05 Visual design](05-visual-design-color-motion-media-and-content.md)** — the core of what interviewers probe.
3. **[06 Component patterns](06-accessible-component-patterns.md)** — design-system level questions.
4. **[07 Testing and process](07-testing-tooling-and-accessibility-in-the-delivery-process.md) → [08 React/Next/RN and audit playbook](08-accessibility-in-react-nextjs-mobile-and-scenarios.md)** — senior scenarios.
5. **[09 Recall Map](09-accessibility-recall-map.md)** the day before and the hour before.

## Related Material

- HTML semantics, forms and CSS (focus, reduced motion, responsive, forced colors): [html-and-css/](../html-and-css/README.md)
- Accessibility tree and engine internals, dialogs/popovers/inert, Web Components: [browser-internals/](../browser-internals/README.md)
- Visual, accessibility and component-state testing; Playwright and Testing Library: [testing/](../testing/README.md)
- Design-system accessibility contracts, tokens and overlays: [system-design/06](../system-design/06-design-system-and-component-library.md)
- React patterns, React 19 Actions and metadata: [react/](../react/README.md); Next.js rendering and forms: [nextjs-and-rendering/](../nextjs-and-rendering/README.md)
- Governance, platform teams, definition of done, delivery metrics: [frontend-architecture/08](../frontend-architecture/08-teams-governance-platform-and-delivery.md); CI pipelines and gates: [ci-cd-web/](../ci-cd-web/README.md)
- Mobile accessibility, styling and localization: [react-native/07](../react-native/07-ui-styling-layout-accessibility-and-localization.md)
- Performance and layout stability intersections: [web-performance/](../web-performance/README.md)
- Focus, IME and assistive-technology environment bugs: [debugging-scenarios/05](../debugging-scenarios/05-browser-compatibility-storage-and-environment-bugs.md)

## Version Notes

Verified on the W3C WAI site (2026-11-26): **WCAG 2.2** (Recommendation 5 Oct 2023, updated 12 Dec 2024) with its **nine new success criteria** (2.4.11, 2.4.12, 2.4.13, 2.5.7, 2.5.8, 3.2.6, 3.3.7, 3.3.8, 3.3.9) and removal of **4.1.1 Parsing**; WCAG 2.1 additions and updates; **ISO/IEC 40500:2025** equals WCAG 2.2 (Oct 2023 text); **EN 301 549 (2026) uses WCAG 2.2**; **WCAG 3 is an early draft**. Earlier categories verified the Popover API, Playwright 1.65 (including `page.accessibility` removal and ARIA snapshots), React 19.x features, Next.js 16 behaviors and React Native 0.88 (including `sendAccessibilityEvent` replacing `setAccessibilityFocus`). **Legal details (EAA application scope/dates, ADA/Section 508/AODA), ARIA 1.3 status and newer attributes, screen-reader shortcuts and market share, the share of issues automated tools detect, library/tool versions (axe, jsx-a11y, headless component libraries), and framework route-announcer behavior are marked *(hedged)* and should be re-checked before relying on them.**
