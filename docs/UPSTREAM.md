# Upstream and development workflow

## Recorded baseline

- Upstream: `https://github.com/cygnusx-1-org/continuum.git`, remote `upstream`, branch `master`.
- Fork: `https://github.com/srdpsrknth/relaxe.git`, remote `fork`, branch `master`.
- Last synchronized source: `ab9f3f59f0d5790f61a5acb71cd9f298798d6344`, dated 2026-10-21.
- Synchronization verified on 2026-10-23. This is a recorded observation, not a live claim
  that upstream has not advanced since then.
- The prior Relaxe feature branch, working changes, and ignored planning notes were discarded
  at the user's request. The new fork starts with upstream application behavior and identity.

`upstream/master` is a remote-tracking reference. Fork `master` is the reviewed integration
branch and tracks `fork/master`. Use focused `codex/...` branches for normal work. A branch
keeps a change reviewable; a separate worktree is useful when two changes need simultaneous
edits without sharing a working directory.

## Lightweight task workflow

1. Define the user-visible objective, scope, and acceptance criteria.
2. Inspect current Git status, relevant documentation, and source.
3. Explain the implementation approach and make a small change on a topic branch.
4. Run relevant checks; separate environmental limitations from application failures.
5. Update affected project documents through `project-documentation`.
6. Review the diff and report behavior, verification, risks, and remaining work.
7. When authorized, commit focused changes and use a PR for review before merging.

Use an issue for a coherent task that benefits from explicit acceptance criteria. Group related
issues into a milestone only when it helps track a deliverable. Do not add release branches,
multiple long-lived development branches, hooks, or new services without a concrete need.

## Upstream integration procedure

Run this when an upstream-sync task is authorized; it is not a background operation:

1. Inspect local changes and protect unrelated work. Fetch `upstream` and `fork` without
   altering their URLs. Review the new release/commit range and select an exact target.
2. Start a `codex/upstream-YYYY-MM-DD` branch from reviewed fork `master`, in an isolated
   worktree if other development is active.
3. Merge the selected upstream commit. Use a reviewed merge commit for imports once the fork
   diverges; do not repeatedly rebase published fork history or force-push fork `master`.
4. Inspect both conflicts and clean merges affecting actions, account settings, filters,
   restoration, database migrations, media providers, resources, and theme contracts.
5. Build debug APKs, run JVM tests, verify screenshot goldens, and run lint. Compile device
   tests and exercise selected isolated-device flows when the changed areas need them.
6. Prepare the integration PR with target SHA, behavior changes, resolutions, checks, and
   limitations. Human review/approval determines merging; clean text merges are not proof
   of compatibility.
7. After merging, update the recorded baseline and any affected architecture/design contracts.

Keep fork-owned component files and small upstream hooks. Avoid unnecessary package renames,
translation churn, and formatting changes in upstream files. Send useful generic fixes upstream
only when separately authorized.

## Verification commands and boundaries

Windows desktop checks, from the repository root:

```powershell
.\gradlew.bat :app:assembleDebug :app:testDebugUnitTest :app:lintDebug --console=plain
.\gradlew.bat :app:verifyRoborazziDebug --console=plain
```

The Gradle daemon uses JDK 25 criteria; the app targets Java 24. Configure an Android SDK
through the standard Gradle/Android environment; keep machine paths outside tracked files.
Use the wrapper rather than a system Gradle installation. Signing and test credentials stay
in ignored local configuration. Never copy secret values into a PR, report, or log excerpt.

`:app:check` additionally requires device tests by default. `-PskipDeviceTests=true` explicitly
omits that device gate and must be disclosed. Its custom helper is Bash-based; native Windows
support has not yet been validated. See `TESTS.md` and `scripts/run-device-tests.sh`.

The untouched app uses Continuum's application ID. Installing it can replace an existing
Continuum build with the same ID and affect its data. Device verification should use an
explicitly selected disposable emulator/test installation, or a separately authorized target.
Do not run blanket connected tests across every attached device.

The two bundled subreddit-name assets are Git symlinks to a sibling `subreddit-lists`
checkout. `verifyShippedSubredditLists` now streams and validates the names, accepting the
documented 2-21 character names and legacy `reddit.com` entry. It rejects missing/dangling
links, empty files, Windows symlink placeholders, and malformed downloaded text.

For a new environment, obtain `cygnusx-1-org/subreddit-lists` beside the app checkout. Inspect
an existing sibling checkout rather than cloning over it. The repair session obtained commit
`8915d331f98ed653f7e4feb2b2769651286e8980`: 328,159 SFW and 37,897 NSFW names, all valid.
Record the dependency commit when reproducing a build; updating it is a deliberate setup task.

Windows needs symlink capability (Developer Mode or an appropriately elevated setup) and local
Git `core.symlinks=true`. Confirm capability before restoring only the two tracked assets;
preserve unrelated work. After the user enabled Developer Mode, this session verified symlink
creation without a PC restart, enabled that repository-local Git setting, and restored the
two unchanged links. For future environments, inspect asset changes first, then restore only
these paths if unchanged:

```powershell
git config --local core.symlinks true
git checkout-index --force -- app/src/main/assets/random_subreddits/subreddits-sfw.txt app/src/main/assets/random_subreddits/subreddits-nsfw.txt
.\gradlew.bat :app:verifyShippedSubredditLists :app:assembleDebug --console=plain
```

Both ARM APKs were rebuilt and their bundled lists matched the validated source bytes and
hashes. See the roadmap for verification evidence. Do not replace tracked link blobs with list
contents, silently bypass the gate, or change Windows settings without user involvement.

Lint no longer depends on `app/lint-baseline.xml`: errors fail, warnings remain visible, and
no baseline is automatically generated. The 956 known warnings are debt to address during
relevant changes, not fixed findings. The original generated baseline remains ignored under
`.gradle/foundations-generated-lint-baseline.xml` as diagnostic evidence only.

Screenshot comparisons use a shared 0.035 normalized RGBA-distance tolerance for observed
native raster rounding, no pixel-position shifts, and no allowed out-of-tolerance pixel count.
Do not widen it or re-record goldens to hide a failure. The comparison-policy regression tests
must continue to reject real color/geometry/dimension changes. In an isolated visual test run,
an explicitly excluded asset gate is not evidence of a valid APK; final APK checks run without
that exclusion.

## Automation and distribution

The current inherited `.github/workflows/build.yml` skips its build job. No new CI, scheduled
monitor, dependency updater, or automatic integration workflow has been configured.

Introduce automation after the manual procedure works: first detect and summarize releases,
then prepare integration PRs and run checks, and retain human-approved merging. Prefer stable
releases as the routine trigger; import other commits deliberately for useful fixes.

Source synchronization does not publish an APK. A future release needs a separate version,
signing-key continuity, matching source availability, retained notices, and distribution
verification. The current scope is personal use with user-reported API approval. Relaxe release
versioning and distribution automation are still undecided.
