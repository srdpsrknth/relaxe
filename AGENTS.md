# Relaxe for Reddit

## Start here

- Read `docs/ROADMAP.md` for the current milestone, verification status, and next task.
- Read `docs/ARCHITECTURE.md` before changing application behavior or architecture.
- Read `docs/DESIGN.md` for approved product and interface constraints.
- Read `docs/UPSTREAM.md` when synchronizing Continuum or preparing a release.
- Treat source code and current command output as evidence. Documentation can become stale.

## Working agreements

- Product name: **Relaxe for Reddit**. Approved future application ID: `com.zweilous.relaxe`.
  These are decisions, not evidence that rebranding has been implemented.
- Follow approach B: replace presentation incrementally, extracting small behavior/state
  boundaries as needed. Retain Continuum's Reddit API-key and access mechanisms.
- Preserve account scope, sort/filter behavior, read/save/vote side effects, media policy,
  restoration, and accessibility when replacing a UI component.
- Reuse existing upstream abstractions before adding parallel implementations. Avoid broad
  package renames, Java-to-Kotlin conversions, formatting sweeps, or a wholesale Compose rewrite.
- Use Reddit terminology in UI and design work: subreddits, users, subscriptions and
  multireddits. See the terminology rules in `docs/DESIGN.md`; preserve upstream identifiers.
- Use short-lived `codex/...` branches from the reviewed fork baseline. Worktrees are useful
  for concurrent edits or integration experiments, not required for every task.
- Inspect working-tree changes before editing and preserve unrelated user work.
- For implementation, state a focused objective and acceptance criteria, inspect relevant
  code, then deliver a reviewable change with appropriate verification.
- Commit, push, merge, release, and external automation actions must stay within the user's
  authorized task. Do not infer publishing authorization from a local implementation request.
- Use bounded subagents only when independent work adds clear value. Prefer the user's
  lower-cost model preference for straightforward delegated tasks where supported.

## Verification

Use the repository Gradle wrapper. The daemon is configured for JDK 25; the app targets
Java 24 bytecode. A JDK 17 launcher alone is not the complete build toolchain.

Windows desktop baseline:

```powershell
.\gradlew.bat :app:assembleDebug :app:testDebugUnitTest :app:lintDebug --console=plain
.\gradlew.bat :app:verifyRoborazziDebug --console=plain
```

Use checks appropriate to the change. `:app:check` also includes screenshot verification,
shipped subreddit-list validation, and instrumented device tests. Its explicit desktop-only
form is `:app:check -PskipDeviceTests=true`; report device coverage as not run when using it.
See `TESTS.md` and `docs/UPSTREAM.md` for device-test and build-environment limitations.

Never re-record screenshot goldens or regenerate a lint baseline merely to turn a failure
green. First establish whether it is an intended change, an upstream defect, or an
environment difference. Build output from a previous commit is not current verification.

## Documentation and handoffs

Use the repository skill at `.agents/skills/project-documentation/SKILL.md` after significant
approved decisions, substantial implementation, verification changes, or milestone completion.
Read it directly if automatic skill discovery has not refreshed yet. Documentation is part
of completing the authorized task; routine updates do not need a separate approval round.

Update existing documents rather than creating parallel logs. Distinguish approved decisions,
proposals, implemented behavior, and verification. Record unresolved failures and the next
useful task. Do not document every minor edit or duplicate Git history.

At a milestone boundary, report what is complete, what remains, and whether to continue the
chat or start a separate task. Provide a documentation-based handoff when recommending a new
chat. Never store credentials, signing material, personal device identifiers, or account data
in shared documentation.
