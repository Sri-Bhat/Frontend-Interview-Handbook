# React Native Senior Interview Q&A Handbook (Tier 11 — App Store / Play Store Release)

> Tier 11 of the running, tiered senior React Native interview Q&A series — see [Document 4 §11.3 (Signing)](04-app-architecture-and-production-concerns.md#113-signing), [§11.4 (Android And iOS Builds)](04-app-architecture-and-production-concerns.md#114-android-and-ios-builds), and [§11.5 (Release Channels And App Store / Play Store)](04-app-architecture-and-production-concerns.md#115-release-channels-and-app-store--play-store) for the summary-level version of this material, and [Tier 10](14-tire10-ota-and-release-architecture.md) for everything about OTA releases this tier deliberately contrasts against.
>
> **One verification caveat stated up front:** Apple's own documentation page for phased release (Q11) could not be freshly re-fetched this session — three distinct candidate URLs on `developer.apple.com` all returned "Not Found." Q11's answer uses the long-standing, widely-documented mechanics of this feature (which have been stable for years), explicitly flagged as general platform knowledge rather than a freshly-quoted official source — consistent with how this series handles any answer it can't pin to a live, fetched citation.

## Table of Contents

1. [How To Use This Tier](#1-how-to-use-this-tier)
2. [Tier 11 — App Store / Play Store Release](#2-tier-11--app-store--play-store-release)
3. [Key Terms Glossary](#3-key-terms-glossary)
4. [Further Reading](#4-further-reading)

---

## 1. How To Use This Tier

Questions stay in original order, numbered 1–15, clustering into: OTA vs. store releases and what forces a new binary (Q1–3), the CI-to-store pipeline mechanics for both platforms (Q4–5), signing fundamentals (Q6–9), each store's staged-rollout model (Q10–11), and the hard realities of rolling back a published binary, including the critical native-vs-JS branching decision in an incident (Q12–15).

---

## 2. Tier 11 — App Store / Play Store Release

### 1. What is the difference between an OTA release and an App Store release?

| | OTA release ([Tier 10](14-tire10-ota-and-release-architecture.md)) | App Store / Play Store release |
|---|---|---|
| What can change | JS bundle + JS-bundled assets only | Anything — native code, permissions, the binary itself, plus JS/assets |
| Review process | None — bypasses store review entirely | Apple: manual-ish review. Google: largely automated + policy review |
| Typical time to reach users | Minutes (download + next restart) | Hours to days (review) plus any staged-rollout ramp |
| Requires a new binary install | No | Yes, always |
| Can touch native modules/dependencies/permissions | **Never** ([Tier 10 Q3–4](14-tire10-ota-and-release-architecture.md#3-can-native-code-be-updated-through-ota)) | Yes — this is the *only* path for any native change |
| Rollback | Near-instant (republish previous bundle) | Hard — no true "undo" (Q12–13) |

The practical dividing line is simple and comes straight out of Tier 10: if a fix needs anything beyond JS and JS-bundled assets, it **must** go through this pipeline, full stop.

### 2. When must you submit a new iOS binary?

Any time a change needs something OTA structurally cannot provide ([Tier 10 Q2–4](14-tire10-ota-and-release-architecture.md#2-what-exactly-gets-updated-during-an-ota-update)):

- A new or changed native module, or a new native dependency/SDK.
- New or changed permissions/entitlements (`Info.plist` keys, push notification/App Group/etc. entitlements).
- A React Native (or Expo SDK) upgrade that touches native code.
- New in-app purchase/StoreKit configuration, new app icons/launch screens, or App Store metadata/compliance declarations that must go through review.
- Whenever your OTA runtime-version policy ([Tier 10 Q5](14-tire10-ota-and-release-architecture.md#5-how-do-you-guarantee-ota-compatibility-with-the-installed-native-binary)) needs to be bumped because native code changed — by definition, that also means a new binary, since the runtime version *is* a statement about native compatibility.

### 3. When must you submit a new Android binary?

The same conceptual list as Q2, with Android-specific additions worth naming:

- Any native code change (Java/Kotlin, or C++/NDK).
- `AndroidManifest.xml` permission or component changes.
- A `targetSdkVersion`/`compileSdkVersion` bump — and separately, it's worth knowing that **Google Play enforces a minimum `targetSdkVersion` policy for new app submissions and updates**, meaning you may be *forced* into a new binary periodically just to keep publishing updates at all, independent of any feature work.
- New native dependencies or Gradle/build configuration changes that affect the compiled output.
- The same runtime-version-policy trigger as Q2 — a native change means a new compatibility version, which means a new binary.

### 4. How does an iOS .ipa get from CI to App Store Connect?

A typical pipeline, usually driven by **Fastlane** (the de facto standard tooling here, referenced already in [Document 4 §11.3](04-app-architecture-and-production-concerns.md#113-signing)):

1. CI checks out the repo, installs JS dependencies, then installs CocoaPods (`pod install`).
2. Signing is resolved — most commonly via **Fastlane `match`**, which pulls the correct certificate and provisioning profile for the target (Q6–7) from an encrypted, team-shared git repository, avoiding per-machine signing drift.
3. **`xcodebuild archive`** (often wrapped by Fastlane's `gym`/`build_app` action) compiles and archives the app into an `.xcarchive`.
4. **`xcodebuild -exportArchive`** (or `gym`'s export step) exports the archive into a signed `.ipa`, guided by an export-options plist specifying the distribution method (`app-store`).
5. The `.ipa` is uploaded to App Store Connect — via Fastlane's `pilot`/`deliver` actions, or direct App Store Connect API tooling — authenticated with an **App Store Connect API key** (preferred over a personal Apple ID for CI) stored as a secret ([Tier 12 Q4](16-tire12-github-actions-cicd.md#4-how-would-you-securely-store-signing-certificates-and-provisioning-profiles)).
6. Apple processes the build (automated validation and binary scanning); once processed, it appears under the app's **TestFlight** builds list.
7. From there, it's either auto-distributed to TestFlight testers, or promoted for App Store review and release — either manually in the App Store Connect UI, or automated via Fastlane `deliver`/the App Store Connect API.

### 5. How does an Android .aab get from CI to Google Play?

1. CI checks out the repo and installs JS dependencies (no CocoaPods-equivalent step needed).
2. The release keystore is decoded from a CI secret (Q8, [Tier 12 Q5](16-tire12-github-actions-cicd.md#5-how-would-you-securely-store-android-keystores)) and placed where Gradle expects it.
3. **`./gradlew bundleRelease`** runs — Gradle reads the `signingConfigs.release` block (credentials sourced from `gradle.properties`), compiles, and signs the release AAB, producing it at `android/app/build/outputs/bundle/release/app-release.aab` (confirmed path from React Native's own signing docs).
4. The AAB is uploaded to Google Play via the **Google Play Developer API** — typically through Fastlane's `supply` action or a dedicated GitHub Action for Play uploads — authenticated with a **Google Cloud service account JSON key** (granted Release Manager permissions in Play Console) stored as a CI secret.
5. The upload step creates an "edit" on Google Play, uploads the AAB to a chosen track (internal/closed/open testing, or production), optionally sets a staged-rollout percentage (Q10) and release notes, then commits the edit — after which Google runs its own automated review/policy checks before the release goes live on that track.

### 6. What is code signing on iOS?

The cryptographic mechanism iOS uses to verify two things before it will install or run a binary: **(a)** the binary genuinely comes from a known, registered developer/organization, and **(b)** it hasn't been tampered with since it was signed. Every app must be signed with a **certificate** (Q7) — generated from a private key you hold, with the public half countersigned by Apple — at build/archive time; iOS (and App Store Connect, at upload time) then verifies that signature against Apple's own trust chain. It's the same underlying *purpose* as Android's own signing (Q8) — proving authorship and integrity — just implemented through a materially different mechanism, with iOS additionally layering **provisioning profiles** (Q7) on top, which Android has no direct equivalent of.

### 7. What are provisioning profiles and certificates?

- **Certificate** — proves *identity*. A cryptographic credential (a key pair, with the public half signed by Apple) representing a developer or an organization, used to sign builds. Two broad kinds: **Development** certificates (for building/running on registered test devices) and **Distribution** certificates (for App Store or Ad Hoc/Enterprise distribution).
- **Provisioning profile** — a bundle tying together a certificate (or certificates), the app's **App ID** (bundle identifier), and — for development/ad hoc profiles specifically — a list of registered test device UDIDs, plus any entitlements the app declares (push notifications, App Groups, etc.). It's Apple's way of saying "this exact signing identity is authorized to run this exact app on these exact devices/channels." App Store distribution profiles don't carry a device list, since the binary ships through the Store rather than being sideloaded onto pre-registered hardware.

Both expire and need periodic renewal — exactly the recurring maintenance burden **Fastlane `match`** (Q4, [Document 4 §11.3](04-app-architecture-and-production-concerns.md#113-signing)) exists to centralize across a team instead of every developer or CI machine managing its own copies.

### 8. What is Android app signing?

Android's equivalent trust mechanism, structured differently from iOS: you generate a private **upload key** locally (`keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore ...`, per React Native's own signing docs), stored in a keystore file, and use it to sign your release AAB/APK. Under Google's current recommended model, **Play App Signing**, Google then **re-signs the final artifact it actually distributes to users** with a separate **app signing key** it holds securely — your upload key only proves to Google "this upload genuinely came from you"; it isn't the key that ultimately protects what gets installed on user devices. This is a meaningful improvement over the historical single-key model: if your upload key is lost or compromised, Google can help you reset/rotate it, since the final distributed artifact's trust never depended on it in the first place. Under the old single-key model, losing your one and only signing key permanently orphaned the app — you could never publish an update under that listing again.

### 9. What is the difference between APK and AAB?

- **APK (Android Package)** — the actual, final, directly-installable file format, traditionally containing compiled code and resources for every device configuration an app supports in one file.
- **AAB (Android App Bundle)** — **not** directly installable. Per Google's own definition: *"a publishing format that includes all your app's compiled code and resources, and defers APK generation and signing to Google Play."* You upload an AAB; Google's infrastructure then generates and serves **optimized, device-specific APKs** (split by CPU architecture, screen density, and language) to each user, so people download only what their specific device actually needs instead of one bloated universal APK. **AAB has been required for all new apps on Google Play since August 2021.** A plain APK can still be built directly (via Gradle's `assembleRelease` instead of `bundleRelease`) for distribution outside Google Play or for local testing.

### 10. How does Google Play staged rollout work?

Confirmed directly from Google's own support documentation:

- It's **percentage-based** — you choose what fraction of users receive the new release.
- Both new and existing users are selected **at random** for inclusion at each percentage step.
- **Halting and later resuming** a rollout affects the **same** set of users — it doesn't re-randomize on resume.
- A rollout can be **scoped to specific countries**.
- Users are **never notified** they're on a staged-rollout version — to them, it looks like any other update.
- Google explicitly recommends **closely monitoring crash reports, ANRs, and reviews** while a rollout is live, so you can halt before most users are affected if something's wrong.
- Staged rollout only applies to **updates to an already-published app** — you cannot stage an app's very first release.

### 11. How does Apple phased release work?

> *Flagged as general, well-established platform knowledge — Apple's own documentation page for this feature returned "Not Found" on every URL attempted this session, so this is not a freshly-quoted official source, though the mechanics described here have been stable for years.*

Apple's phased release (available in App Store Connect for apps with automatic updates enabled) rolls a new version out gradually over **7 days**, across **7 increasing stages**, commonly documented as approximately **1% → 2% → 5% → 10% → 20% → 50% → 100%** of eligible users per day. The developer can **pause** the rollout at any stage if a problem surfaces, resume it later, or **immediately release to 100%** of users at any point if confident (or under time pressure). One important distinction from Google's model: phased release **only affects users with automatic updates enabled** — anyone who manually checks the App Store and taps "Update" always gets the newest available version immediately, regardless of where the phased percentage currently stands.

### 12. How would you rollback an App Store release?

The foundational truth to state first: **you cannot truly "un-release" a binary that users have already downloaded.** "Rollback" at the store level is really about limiting further exposure and getting a fix out fast, not undoing what already happened:

- **Halt or freeze a staged/phased rollout** (Q10–11) — stops the bad version from reaching more users going forward; does nothing for users who already have it.
- **Google Play** supports something closer to a true rollback: you can create a new release that re-uploads a previous, known-good AAB/version as the current release on a track — practically the closest thing to "reverting," though technically it's still a new release pointing at old code, not a deletion of the bad one.
- **Apple** has historically offered **no self-service "revert to a previous binary" mechanism at all** — halting a phased rollout only stops further ramp-up of the *current* version; there's no way to make the Store start serving an older build again. Your only path forward is a fixed build with a **new, higher version number**, submitted through review again (ideally via **expedited review**, Apple's real, documented program for critical issues, to shorten the wait).
- **Levers that don't require any store action at all:** feature flags (an instant remote kill-switch), and — for anything JS-only — an OTA rollback ([Tier 10 Q7](14-tire10-ota-and-release-architecture.md#7-how-would-you-implement-ota-rollback)), which is precisely why "does this bug need native changes?" (Q14–15) is the first question in any real incident response.

### 13. Can you instantly rollback an App Store binary?

**No — not in the sense of truly undoing a release.** Google Play lets you relatively quickly push a new release pointing back at older code, and you can halt a staged rollout's further expansion instantly, but users who already auto-updated are not retroactively downgraded. Apple is even less flexible — there's no self-service revert at all; your fastest path is a new, reviewed build. The *only* thing that is genuinely instant at the release layer is an **OTA rollback** ([Tier 10 Q7](14-tire10-ota-and-release-architecture.md#7-how-would-you-implement-ota-rollback)) — which is exactly why a sound architecture strategy is to keep native surface area as stable/minimal as possible and put anything volatile behind OTA-updatable JS wherever feasible, so that "critical bug requiring a new binary" (Q15) stays the rare case rather than the common one.

### 14. How would you handle a critical production bug that doesn't require native changes?

This is the scenario [Tier 10](14-tire10-ota-and-release-architecture.md) exists for — the "good" branch of an incident:

1. Confirm the fix is genuinely pure-JS — no native module, dependency, or permission involvement.
2. Build and test the fix as fast as is responsible — don't skip your pipeline's lint/type-check/test gates even under pressure ([Document 4 §11.1](04-app-architecture-and-production-concerns.md#111-the-pipeline)).
3. Publish an OTA update targeting the affected runtime version(s) ([Tier 10 Q5](14-tire10-ota-and-release-architecture.md#5-how-do-you-guarantee-ota-compatibility-with-the-installed-native-binary)), choosing a staged percentage or going straight to 100% depending on severity and confidence ([Tier 10 Q8/Q11](14-tire10-ota-and-release-architecture.md#8-how-would-you-implement-staged-ota-rollout)).
4. Users get the fix within minutes, on the next app restart/foreground check — zero store review wait.
5. If the broken behavior already sits behind a feature flag, flipping it off is faster still than shipping any new code at all — [Document 4 §11.7](04-app-architecture-and-production-concerns.md#117-rollback-strategy) calls feature flags out directly as "the fastest lever of all."

### 15. How would you handle a critical production bug that requires native changes?

The genuinely hard branch — the one that must go through the full store pipeline:

1. Acknowledge immediately that this **cannot** be fixed via OTA ([Tier 10 Q3–4](14-tire10-ota-and-release-architecture.md#3-can-native-code-be-updated-through-ota)) — a new binary submission is unavoidable.
2. First reach for the fastest lever that *isn't* a new binary: a remote feature flag/kill-switch disabling the broken feature entirely, buying time without any release at all. If no such flag exists for this feature, that's a concrete lesson for next time — feature-flagging anything new or risky is cheap insurance against exactly this scenario.
3. In parallel, fix the native issue and push it through CI ([Tier 12](16-tire12-github-actions-cicd.md)) as fast as responsibly possible; for iOS, request Apple's **expedited review** program for critical bugs/security issues to shorten the wait (Google Play's review is typically faster/more automated already, but still not instant).
4. Once approved, release via a staged/phased rollout anyway where the situation allows it (Q10–11) — a severe bug is exactly when you most want telemetry confirming the *fix* didn't introduce a second problem, though sufficiently severe incidents may justify the judgment call of going straight to 100%.
5. Post-incident, treat this as the strongest possible argument for investing in Q14's path being available as often as possible — architecting volatile/risky logic to live in JS behind feature flags specifically so "critical bug needs a native fix" stays rare.

---

## 3. Key Terms Glossary

| Term | Meaning |
|---|---|
| **AAB (Android App Bundle)** | Google Play's required publishing format; defers APK generation/signing to Google, which serves optimized per-device APKs. |
| **Play App Signing** | Google's model where you hold an upload key and Google holds a separate app signing key that re-signs the distributed artifact. |
| **Provisioning profile** | Apple's bundle tying a certificate, App ID, device list (if applicable), and entitlements together, authorizing a signed build to run somewhere specific. |
| **Expedited review** | Apple's documented program for requesting faster-than-normal App Store review, typically used for critical bugs/security fixes. |
| **Staged rollout (Google Play)** | Percentage-based release to a random, stable user cohort, scoped optionally by country. |
| **Phased release (Apple)** | Apple's 7-day, 7-stage automatic-update rollout mechanism, affecting only users with automatic updates enabled. |

*(See [Tier 10's glossary](14-tire10-ota-and-release-architecture.md#3-key-terms-glossary) for **OTA update**, **runtime version**, and **republish**.)*

---

## 4. Further Reading

- Signed APK (React Native, Android build/signing flow) — https://reactnative.dev/docs/signed-apk-android
- Publishing to Apple App Store (React Native) — https://reactnative.dev/docs/publishing-to-app-store
- About Android App Bundles (Android Developers) — https://developer.android.com/guide/app-bundle
- Roll out a release in stages (Google Play Help) — https://support.google.com/googleplay/android-developer/answer/6346149
- Related: [Document 4 §11.3–§11.5](04-app-architecture-and-production-concerns.md#113-signing) (signing, builds, release channels summary)
- Related: [Tier 10](14-tire10-ota-and-release-architecture.md) (OTA releases, contrasted throughout this tier)
- Related: [Tier 12](16-tire12-github-actions-cicd.md) (the CI/CD pipeline producing the artifacts this tier publishes)
