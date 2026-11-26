# HTML & CSS

Production-oriented interview preparation for Senior Frontend and UI-focused roles: semantic and accessible HTML, forms and native interactive elements, the CSS cascade and custom properties, modern layout (Flexbox, Grid), responsive design with container queries, animation and View Transitions, CSS architecture and tooling, and hands-on coding-round and debugging scenarios. Each document follows the repository template: verification note, TOC, TL;DR with diagram, concepts and trade-offs, pitfalls, fundamentals Q&A, senior scenario Q&A, cheat sheet, glossary and further reading.

## Documents

| # | Document | Focus |
|---|---|---|
| 01 | [HTML Semantics, Structure and Metadata](01-html-semantics-document-structure-and-metadata.md) | Doctype/quirks, landmarks and headings, `<a>` vs `<button>`, images and responsive images, tables, SEO metadata, script loading, ARIA basics, security-relevant HTML |
| 02 | [HTML Forms and Interactive Elements](02-html-forms-and-interactive-elements.md) | Submission rules, labels, input types/`autocomplete`/`inputmode`, constraint validation and error UX, `<dialog>`, Popover, `<details>`, focus and keyboard, uploads, forms in frameworks |
| 03 | [CSS Cascade, Specificity and Custom Properties](03-css-cascade-specificity-and-custom-properties.md) | Cascade order, specificity, `@layer`, `@scope` (verified), nesting, `:is/:where/:has`, inheritance keywords, custom properties and `@property`, units, resets |
| 04 | [CSS Layout: Box Model, Flexbox and Grid](04-css-layout-box-model-flexbox-and-grid.md) | Box model and margin collapsing, positioning/stacking/sticky, Flexbox, Grid/subgrid, centering recipes, common patterns, overflow and layout stability |
| 05 | [Responsive Design and Modern CSS](05-responsive-design-and-modern-css.md) | Mobile-first, media and preference queries, container queries, fluid type, `dvh/svh`, safe areas, logical properties/RTL, color and theming, modern CSS feature map with progressive enhancement |
| 06 | [CSS Animation, Transitions and View Transitions](06-css-animation-transitions-and-view-transitions.md) | Transitions, keyframes, compositor-friendly animation, reduced motion, entry/exit and `auto` sizes, View Transitions (verified support), scroll-driven animations (unverified), WAAPI and FLIP |
| 07 | [CSS Architecture, Theming and Tooling](07-css-architecture-theming-and-tooling.md) | Styling approaches compared, BEM/ITCSS/utility-first, tokens and theming, component styling APIs, tooling, delivery/performance, governance, testing CSS |
| 08 | [HTML/CSS Coding Round and Debugging](08-html-css-coding-round-and-debugging-scenarios.md) | Machine-coding process, layout and component exercises with solutions, technique snippets, symptom-to-fix debugging playbook, rapid-fire questions |
| 09 | [Recall Map](09-html-and-css-recall-map.md) | One-page mental model, diagrams, decision tables, numbers, mnemonics, scripts, flags, checklist |

## Suggested Order

1. **[01 Semantics](01-html-semantics-document-structure-and-metadata.md) → [02 Forms and interactive elements](02-html-forms-and-interactive-elements.md)** — the platform primitives interviewers probe first.
2. **[03 Cascade](03-css-cascade-specificity-and-custom-properties.md) → [04 Layout](04-css-layout-box-model-flexbox-and-grid.md) → [05 Responsive and modern CSS](05-responsive-design-and-modern-css.md)** — core CSS skill.
3. **[06 Animation](06-css-animation-transitions-and-view-transitions.md) → [07 CSS architecture](07-css-architecture-theming-and-tooling.md)** — polish and scale.
4. **[08 Coding round and debugging](08-html-css-coding-round-and-debugging-scenarios.md)** — practice under time pressure.
5. **[09 Recall Map](09-html-and-css-recall-map.md)** the day before and the hour before.

## Related Material

- General debugging method and toolkit: [debugging-scenarios/](../debugging-scenarios/README.md)
- Engine internals (parsing, cascade mechanics, layout algorithms, stacking contexts, events, Web Components, dialogs/popovers/`inert`): [browser-internals/](../browser-internals/README.md)
- Performance of CSS, rendering, animation, CLS, fonts and images: [web-performance/](../web-performance/README.md)
- Design systems, tokens, theming, accessibility contracts: [system-design/06](../system-design/06-design-system-and-component-library.md)
- Component patterns and classic UI coding-round components in React: [react/07](../react/07-component-patterns-and-architecture.md)
- CSS and styling architecture at team/org scale: [frontend-architecture/](../frontend-architecture/README.md)
- Visual, accessibility and cross-browser testing: [testing/05](../testing/05-visual-accessibility-and-component-states-testing.md)
- XSS, CSP and safe HTML handling: [web-security/](../web-security/README.md)
- Mobile counterpart (StyleSheet/Yoga layout, accessibility): [react-native/07](../react-native/07-ui-styling-layout-accessibility-and-localization.md)
- Accessibility in depth (WCAG 2.2, ARIA, keyboard/focus, forms, patterns, testing): [accessibility/](../accessibility/README.md)

## Version Notes

Verified on MDN (2026-11-19): **`@scope`** (Baseline 2026 newly available — Chrome/Edge 118, Firefox 146, Safari 26.4; `&` behavior Chrome 143, Firefox 142, Safari 26.2) and the **View Transition API** (same-document: Chrome/Edge 111, Firefox 144, Safari 18; `types`/`update`: Chrome/Edge 125, Firefox 147, Safari 18.2; cross-document `@view-transition`: Chrome/Edge 126, Safari 18.2, Firefox Nightly only). Earlier categories verified the **Popover API** (Baseline 2025 newly available) and **`content-visibility: auto`**. **CSS anchor positioning and scroll-driven animations are documented on MDN but their browser support was not verified here.** Other modern CSS (container queries, `:has()`, `@layer`, nesting, subgrid, `dvh/svh/lvh`, `light-dark()`, `oklch()`, `@starting-style`, `interpolate-size`, `field-sizing`, `text-wrap`, `:user-invalid`) is established practice whose Baseline status and minimum versions should be re-checked on MDN/caniuse before use. Tooling and library specifics (Tailwind, CSS-in-JS libraries, Lightning CSS, Style Dictionary, stylelint rules) should be confirmed in current documentation. Accessibility is covered at interview depth; depth is in the [Accessibility category](../accessibility/README.md).
