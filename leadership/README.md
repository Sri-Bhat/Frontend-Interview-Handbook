# Leadership

Production-oriented interview preparation for Senior Frontend, Tech Lead, Staff, Frontend Architect and Engineering Manager roles: what leadership means at each level, influence and technical decision-making, mentoring and hiring, planning and delivery, communication and conflict, leading initiatives and organizational change, plus a behavioral question bank with model answers and scenario case studies. This category covers the **people, influence and behavioral** side; technical architecture, ADRs/RFCs, team topologies and platform governance live in [frontend-architecture/](../frontend-architecture/README.md) and are linked rather than repeated. Each document follows the repository template: verification note, TOC, TL;DR with diagram, concepts, pitfalls, fundamentals Q&A, senior scenario Q&A, cheat sheet, glossary and further reading.

## Documents

| # | Document | Focus |
|---|---|---|
| 01 | [Roles, Levels and Interview Expectations](01-leadership-roles-levels-and-interview-expectations.md) | What leadership means, Tech Lead/Staff/Principal/Manager archetypes, level expectations, multiplier effect, what interviewers assess, STAR-L, story bank, leadership loop, transitions |
| 02 | [Influence, Stakeholders and Technical Decision-Making](02-influence-stakeholders-and-technical-decision-making.md) | Sources of influence, stakeholder mapping, decision rights (DACI/RACI), one-way vs two-way doors, proposals, cross-functional work, managing up, saying no, disagree-and-commit, build vs buy, AI tooling policy |
| 03 | [Mentoring, Coaching, Feedback and Hiring](03-mentoring-coaching-feedback-and-hiring.md) | Teach/coach/mentor/sponsor, onboarding, growth plans, delegation, SBI feedback, code review as teaching, 1:1s, underperformance, hiring loops and rubrics, bias reduction, promotion and retention |
| 04 | [Planning, Estimation, Prioritization and Delivery](04-planning-estimation-prioritization-and-delivery.md) | Outcome roadmaps and OKRs, vertical slicing, estimation under uncertainty, RICE/WSJF/MoSCoW, capacity, risk and dependencies, flow, frontend planning concerns, deadlines and bad news, launches, debt balance |
| 05 | [Communication, Conflict and Team Health](05-communication-conflict-and-team-health.md) | Written and async communication, meetings, remote and cross-cultural work, conflict modes and resolution, difficult conversations, psychological safety, working agreements, burnout, blameless culture, inclusion |
| 06 | [Leading Technical Initiatives and Organizational Change](06-leading-technical-initiatives-and-organizational-change.md) | Initiative lifecycle, business cases, sponsorship, change management, driving adoption, program governance, migrations as leadership problems, culture programs, sustaining change, reorgs and acquisitions, case studies |
| 07 | [Behavioral Interview Question Bank and Model Answers](07-behavioral-interview-question-bank-and-answers.md) | Question bank by competency with answer outlines and illustrative model answers, staff and manager questions, hypotheticals, questions to ask the company |
| 08 | [Leadership Scenarios and Case Studies](08-leadership-scenarios-and-case-studies.md) | People, delivery, technical direction, incident, stakeholder and organizational scenarios, first 30/60/90 days, extended case studies, AI-era scenarios |
| 09 | [Recall Map](09-leadership-recall-map.md) | One-page mental model, diagrams, decision tables, frameworks, mnemonics, rapid-fire Q&A, scripts, flags, checklist |

## Suggested Order

1. **[01 Roles and levels](01-leadership-roles-levels-and-interview-expectations.md)** — calibrate to your target level and build your story bank.
2. **[02 Influence and decisions](02-influence-stakeholders-and-technical-decision-making.md) → [03 Mentoring and hiring](03-mentoring-coaching-feedback-and-hiring.md)** — the core Senior/Tech Lead material.
3. **[04 Planning and delivery](04-planning-estimation-prioritization-and-delivery.md) → [05 Communication and conflict](05-communication-conflict-and-team-health.md)** — execution and team dynamics.
4. **[06 Leading initiatives](06-leading-technical-initiatives-and-organizational-change.md)** — Staff/Architect/Manager scope.
5. **[07 Question bank](07-behavioral-interview-question-bank-and-answers.md) → [08 Scenarios](08-leadership-scenarios-and-case-studies.md)** — practice aloud with real stories.
6. **[09 Recall Map](09-leadership-recall-map.md)** the day before and the hour before.

## Related Material

- Architecture decisions, ADRs/RFCs, team topologies, platform and governance, the architect/tech-lead role: [frontend-architecture/](../frontend-architecture/README.md) (especially [01 §8 and §10](../frontend-architecture/01-frontend-architecture-principles-and-decision-making.md#8-adrs-and-rfcs-recording-decisions), [07 §10](../frontend-architecture/07-migrations-modernization-and-technical-debt.md#10-managing-technical-debt), [08](../frontend-architecture/08-teams-governance-platform-and-delivery.md))
- Incident response, blameless postmortems, runbooks, production scenarios: [debugging-scenarios/07](../debugging-scenarios/07-production-incidents-observability-and-root-cause-analysis.md); debugging methodology for interviews: [debugging-scenarios/01](../debugging-scenarios/01-debugging-methodology-and-interview-approach.md)
- Delivery metrics (DORA) and release operations: [ci-cd-web/07](../ci-cd-web/07-release-automation-observability-and-pipeline-operations.md)
- Frontend system design interviews: [system-design/](../system-design/README.md)
- Design-system adoption and accessibility programs: [system-design/06](../system-design/06-design-system-and-component-library.md), [accessibility/07](../accessibility/07-testing-tooling-and-accessibility-in-the-delivery-process.md)
- Testing strategy and flakiness leadership: [testing/](../testing/README.md)
- Performance culture and budgets: [web-performance/07](../web-performance/07-performance-debugging-budgets-and-culture.md)

## Version Notes

Leadership material is **practice-based, not version-sensitive**. The only externally verified data reused is **DORA's five delivery metrics** (change lead time, deployment frequency, failed deployment recovery time, change fail rate, deployment rework rate), measured per service against the team's own baseline and never as targets (dora.dev, per earlier categories). Technical facts reused from other categories (Core Web Vitals thresholds, Next.js 16 and React 19.x behaviors, TypeScript 6/7 migration notes, Playwright and CI practices) were verified there. **Framework names and attributions (STAR, SBI, Situational Leadership, Tuckman, Thomas-Kilmann, DACI/RACI/RAPID, RICE/WSJF, Kotter/ADKAR, Radical Candor, Team Topologies, Staff Engineer archetypes), book titles and authors, level definitions and ladders, estimation and capacity heuristics, hiring and AI-tool policy practices, and all HR/legal/employment guidance are marked *(hedged)*; confirm them against current sources and your company's policies before relying on them.** Model answers and case studies are illustrative composites — replace them with your own true stories.
