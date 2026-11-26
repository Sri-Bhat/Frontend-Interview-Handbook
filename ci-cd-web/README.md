# CI/CD (Web)

Production-oriented interview preparation for Senior Frontend, Tech Lead, Platform and Frontend Architect roles: how to design, secure, speed up, operate and evolve CI/CD for web applications and libraries, with GitHub Actions as the reference platform (org defaults: `bby-ubuntu` runners, Artifactory registries, GIAM credentials action). Each document follows the repository template: verification note, TOC, TL;DR with diagram, concepts and trade-offs, pitfalls, fundamentals Q&A, senior scenario Q&A, cheat sheet, glossary and further reading.

## Documents

| # | Document | Focus |
|---|---|---|
| 01 | [CI/CD Principles and Pipeline Design](01-cicd-principles-and-pipeline-design.md) | CI vs CD, pipeline anatomy, design principles, pipeline types and triggers, gate placement, metrics (DORA), platform choice, pipeline as code |
| 02 | [GitHub Actions Fundamentals](02-github-actions-fundamentals-workflows-and-runners.md) | Workflows, events, jobs, `needs`, contexts, matrix, concurrency, runners (hosted/larger/self-hosted), permissions, environments, services, verified limits |
| 03 | [Reuse, Caching, Artifacts and Speed](03-github-actions-reuse-caching-artifacts-and-speed.md) | Reusable workflows, composite actions, templates, cache semantics and security, remote task caches, artifacts, speed playbook, cost control |
| 04 | [Pipeline Security, Secrets and Supply Chain](04-pipeline-security-secrets-and-supply-chain.md) | Threat model, token permissions, script injection, privileged triggers, secrets/OIDC, third-party actions, SBOM/provenance, runners, governance, incident response |
| 05 | [Building and Packaging Web Applications](05-building-and-packaging-web-applications.md) | Deterministic builds, outputs by app type, asset hashing/source maps, Docker, build metadata, publishing libraries, build gates, runtime config |
| 06 | [Deployment Strategies, Environments and Infrastructure](06-deployment-strategies-environments-and-infrastructure.md) | Targets, previews, IaC/GitOps, blue/green/canary/flags, compatibility and migrations, guardrails, rollback, CDN, deploy workflow pattern |
| 07 | [Release Automation, Observability and Pipeline Operations](07-release-automation-observability-and-pipeline-operations.md) | Versioning, release PRs, change management, flag lifecycle, pipeline observability, DORA in practice, operations, ChatOps, cost |
| 08 | [CI/CD Scenarios and Troubleshooting](08-cicd-scenarios-and-troubleshooting.md) | Reference pipelines (SSR, SPA/CDN, monorepo), symptom-to-fix playbook, CI migration, interview design template, senior scenarios |
| 09 | [Recall Map](09-cicd-recall-map.md) | One-page mental model, diagrams, decision tables, numbers, mnemonics, scripts, flags |

## Suggested Order

1. **[01 Principles](01-cicd-principles-and-pipeline-design.md) → [02 GitHub Actions fundamentals](02-github-actions-fundamentals-workflows-and-runners.md)** — the model and the platform.
2. **[03 Reuse, caching and speed](03-github-actions-reuse-caching-artifacts-and-speed.md) → [04 Pipeline security](04-pipeline-security-secrets-and-supply-chain.md)** — scaling and safety.
3. **[05 Building and packaging](05-building-and-packaging-web-applications.md) → [06 Deployment](06-deployment-strategies-environments-and-infrastructure.md) → [07 Release automation and operations](07-release-automation-observability-and-pipeline-operations.md)** — from artifact to production to operations.
4. **[08 Scenarios and troubleshooting](08-cicd-scenarios-and-troubleshooting.md)** — practice and debugging.
5. **[09 Recall Map](09-cicd-recall-map.md)** the day before and the hour before.

## Related Material

- Using delivery metrics responsibly and leading engineering-productivity initiatives: [leadership/04](../leadership/04-planning-estimation-prioritization-and-delivery.md) · [leadership/06](../leadership/06-leading-technical-initiatives-and-organizational-change.md)
- Debugging build, dependency and CI-only failures: [debugging-scenarios/08](../debugging-scenarios/08-build-tooling-typescript-dependency-and-ci-debugging.md)
- Test strategy, flakiness, sharding, CI test pipelines and the testing reference workflow: [testing/](../testing/README.md)
- Monorepo task graphs, remote caching, release architecture, trunk-based development, DORA and platform engineering: [frontend-architecture/](../frontend-architecture/README.md)
- Next.js deployment, self-hosting, multi-instance, Docker and release strategies: [nextjs-and-rendering/08](../nextjs-and-rendering/08-deployment-runtimes-and-operations.md)
- Supply chain for the shipped application, CSP, secrets and secure patterns: [web-security/](../web-security/README.md)
- Performance budgets, caching and CDN delivery used as pipeline gates: [web-performance/](../web-performance/README.md)
- Mobile pipelines (signing, OTA, stores, EAS): [react-native/14](../react-native/14-ci-cd-with-github-actions.md) and [13](../react-native/13-ota-updates-and-store-releases.md)
- Contract and API compatibility between independently deployed frontends and backends: [networking-and-apis/](../networking-and-apis/README.md)

## Version Notes

Verified against the GitHub Actions documentation (docs.github.com, 2026-11-19): **Actions limits** (workflow file ≤ 500 KB, matrix ≤ 256, hosted job ≤ 6 h, workflow run ≤ 35 days, concurrency queue up to 100, per-plan concurrency, rate limits, artifact storage), **dependency caching** (key/eviction/scope rules, 10 GB default, read-only caches for low-trust triggers, `cache-mode`), **reusable workflows** (nesting 10 levels, 50 unique, `env` not propagated, permissions only downgraded), **secure use** (read-only token default, script injection patterns, privileged triggers, secrets handling, workflow dependency lockfiles and SHA pinning, OIDC, JIT runners, CODEOWNERS on workflows, Dependabot/CodeQL/Scorecards/dependency review), and **DORA's five metrics** (dora.dev, Jan 2026). Action major versions in examples (`checkout@v6`, `setup-node@v7`, `cache@v4`) follow current docs examples and should be re-checked. Tool and product specifics (Changesets, semantic-release, release-please, Argo CD/Flux/Rollouts, Terraform/OpenTofu/Pulumi, Sigstore/SLSA, CDN invalidation APIs, other CI platforms, hosting platforms, the GIAM action's inputs) are established practice marked *(hedged)* and should be verified before adoption.
