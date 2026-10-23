# Roadmap and handoff

## Product and agreed decisions

- Product: **Relaxe for Reddit**; future ID `com.zweilous.relaxe`, with `.debug` and `.beta`
  variants. Identity changes are approved but not implemented.
- Personal use initially, with user-reported Reddit API approval. Keep Continuum's existing
  API-key/access mechanisms.
- Approach B: incremental presentation separation using existing feed/network infrastructure.
  See [ARCHITECTURE.md](ARCHITECTURE.md).
- Progressive screen replacement with shared styling, visual-media Vertical Swipe, and a
  substantially denser compact feed. See [DESIGN.md](DESIGN.md).
- Reviewed upstream imports, no automatic merges. See [UPSTREAM.md](UPSTREAM.md).

## Milestones and checkout

| Milestone | Status | Completion condition |
| --- | --- | --- |
| Fresh baseline and direction | Complete | Prior fork work discarded; fork/local master synchronized to recorded upstream; product and architecture agreed. |
| Project foundations | Complete; recorded locally | Valid asset packaging and a recorded desktop verification baseline; shared guidance/skill and upstream procedure validated. Device coverage remains separate. |
| UI/UX exploration | Planned | Research references, inventory shared elements/states, compare alternatives, approve initial tokens and compact/media interactions. |
| Architecture proof of concept | Planned | One focused presentation slice reuses feed/actions with failure, state, restoration, and accessibility checks. |
| Progressive redesign | Planned | Replace selected feed, comments, media, shell, and settings surfaces through small reviewed changes. |
| Integration automation and refinement | Planned | Repeatable manual sync, useful detection/preparation automation, performance/device checks, eventual release decisions. |

Current branch: `codex/project-foundations`, based on Continuum
`ab9f3f59f0d5790f61a5acb71cd9f298798d6344` (2026-10-21, version `8.3.3.6`).
Production app behavior, layouts, identity, and CI remain unchanged. Current modifications
are foundation docs/skill, build validation, and screenshot comparison tests. The foundation
checkpoint is recorded in local commits on this branch; no push or merge has been performed.
Build/test repairs are in `cc7d8c9aa`; the accompanying documentation commit records this
handoff. Continue from this branch/its checkpoint, since `master` still contains upstream only.

## Verification and repairs (2026-10-23)

The initial untouched-source run assembled debug APKs and passed 2,535 ordinary JVM cases,
but lint failed while creating a missing ignored baseline, and explicit screenshot comparison
reported 1,216 mismatches/236 matches. The APK also contained invalid symlink placeholders.
Those results were diagnostic evidence, not a green runtime baseline.

Current results:

| Check | Result |
| --- | --- |
| Focused screenshot-policy tests | 7 passed, no failures/errors/skips |
| Lint | Passed; 0 errors and 956 warnings remain visible; no lint baseline generated |
| Asset gate negative case | Passed: both known placeholders rejected with the expected line-1 diagnostic |
| Full screenshot/JVM verification | Passed: 2,542 cases in 125 suites, 0 failures/errors/skips; all 1,452 image comparisons unchanged under the documented policy; exit 0 after 9m 15s |
| Asset restoration, positive gate, rebuilt APK content | Passed: both symlinks restored; asset gate and debug assembly passed without exclusions; both ARM APKs contain lists matching validated source bytes and SHA-256 hashes |
| Device behavior | Not run; no test installation selected |
| Documentation skill | Bundled validator passed; direct-read fallback in AGENTS.md; implicit discovery appeared in the next skill catalog |
| Foundation document links/formatting | Passed after repairs; tracked runtime source, UI resources, goldens, and CI remain unchanged |

### Lint policy

Removed the reference to the ignored, absent `app/lint-baseline.xml`. Errors fail the build;
warnings remain visible rather than being suppressed. This repairs fresh-checkout behavior
without claiming to fix the 956 warnings. The existing `MissingTranslation`/`LogNotTimber`
exclusions were retained. The focused tests plus lint exited 0 after 4m 31s.

The original auto-generated baseline is retained only as ignored diagnostic evidence at
`.gradle/foundations-generated-lint-baseline.xml`, not used by lint. Accessibility warnings,
including 207 `ContentDescription` findings, remain debt to review during relevant changes.

### Screenshot comparison policy

Analysed all 1,216 original mismatches: no dimension changes and at most 2-5/255 channel drift.
Shared `BaselineScreenshotOptions.kt` uses normalized RGBA distance 0.035, zero positional
shifts, and zero allowed out-of-tolerance pixels. This covers observed grayscale rounding;
small color changes within the distance are intentionally indistinguishable.

Seven policy tests verify matching/noise and rejection of a one-pixel shift, changed dimensions,
six-level grayscale changes, nine-level single-channel changes, and one changed pixel in a
large image. The three snapshot suites reuse these options. Goldens were not re-recorded.

Full visual/JVM command:

```powershell
.\gradlew.bat :app:verifyRoborazziDebug -x :app:verifyShippedSubredditLists --console=plain
```

This earlier isolated visual run explicitly excluded the asset gate while Windows setup was
unresolved. Asset validation and debug assembly subsequently passed without exclusions, with
APK contents verified separately below. No renderer/test code changed after the passing run.

### Asset data and completed Windows setup

The two tracked assets use Git symlink mode, but `core.symlinks=false` materialized 52/53-byte
files containing only relative link paths. The repaired `verifyShippedSubredditLists` streams
and validates every name, rejecting placeholders/malformed data as well as missing/empty files.
The negative check failed for the intended reason; it no longer packages placeholders silently.

Obtained upstream's declared sibling `subreddit-lists` checkout at
`8915d331f98ed653f7e4feb2b2769651286e8980`: 328,159 SFW and 37,897 NSFW names; no malformed
lines. Exact data hashes are recorded locally in `.gradle/subreddit-list-validation.json`.
This is an environment dependency, not data copied into tracked app files.

After the user enabled Windows Developer Mode, an unprivileged Python symlink/read probe
passed without restarting the PC. Enabled repository-local Git `core.symlinks=true` and
restored only the two unchanged tracked asset links. Their contents still match Git; no data
files or portable build fallback were added to the source tree.

```powershell
.\gradlew.bat :app:verifyShippedSubredditLists :app:assembleDebug --console=plain
```

The positive gate and debug assembly passed without exclusions (exit 0; 3 seconds with existing
compilation outputs reused). Asset merging, compression, and APK packaging executed again.
Both `armeabi-v7a` and `arm64-v8a` APKs contain the full SFW/NSFW lists: byte-for-byte matches
to the symlink targets and the previously validated hashes/counts. No APK was installed.

### Evidence locations

Local logs: `.gradle/baseline-repairs-focused.log`, `.gradle/baseline-repairs-asset-negative.log`,
`.gradle/baseline-repairs-screenshots.log`, `.gradle/baseline-repairs-assets-build.log`.
Packaged asset hashes/counts: `.gradle/baseline-repairs-apk-assets.json`.
Initial logs use the `foundations-` prefix.
Prior image analysis: `.gradle/screenshot-difference-analysis.json`. Gradle test/lint reports
and comparison artifacts remain under ignored `app/build/`. Do not confuse reports from
ordinary tests and explicit golden comparison; both use the same JVM test report directory.

## Next task

1. Start UI/UX exploration in a new chat using the existing checkout and foundation checkpoint.
   Check Git status and read this handoff before changing files. Research needs no new worktree
   or full baseline-test rerun. A later worktree must start from the checkpoint and have its own
   working sibling data dependency; the existing asset links are relative to the checkout.
2. Inventory shared components and states across the feed, comments, media, navigation, and
   settings. Research the agreed references with sources; distinguish source/screenshot evidence
   from behavior actually tested. Identify design choices that need user input.
3. Present two or three focused alternatives using identical realistic post content and device
   sizes. Cover a substantially denser compact feed and vertical photos/galleries/videos/GIFs,
   with light/dark and large-text checks. Recommend color/type/spacing/shape/icon/action rules
   and gallery/swipe/zoom interactions, including loading/error states and media lifecycle.
4. Record approved choices in DESIGN.md and select a small first implementation with measurable
   acceptance criteria. After design agreement, prioritize a dense compact-feed slice using
   existing Views/Paging; use the image-post save/comments scenario below to prove its behavior.
   Resolve the approved app identity and isolated device-test setup in a focused task before
   installing a personal build. Vertical playback follows with a dedicated lifecycle/gesture task.

Publication of the foundation branch/PR and merging are separate from this local checkpoint.
Do not start broad feature implementation or rebranding as part of design exploration.

## First proof of concept and chat handoff

Proposed after design approval: one redesigned image-post presentation with save/unsave and
opening comments, using the existing feed and a focused action boundary. Preserve account,
feed/sort/filter/order, cache/update/rollback behavior, selection/restoration, themes, large
text, TalkBack semantics, insets, and existing layouts. Video/media policy is a separate slice.

Baseline repairs are complete and recorded locally. Start a separate UI/UX exploration chat
in this project using the existing checkout. Suggested handoff:

> Continue Relaxe for Reddit from the local foundation checkpoint on codex/project-foundations
> in D:\coding\relax-red. Read AGENTS.md, docs/ROADMAP.md, docs/DESIGN.md, docs/ARCHITECTURE.md,
> and the relevant setup notes in docs/UPSTREAM.md. Check Git status and preserve existing work.
> This task is UI/UX research, design alternatives, and prototypes. Inventory shared components
> and states; research Sync/Boost and SnapReel or similar vertical viewers with sources.
> Compare two or three coherent directions using identical realistic posts: a substantially
> denser compact feed and vertical media covering photos, galleries, videos, and GIFs.
> Recommend shared visual rules, gesture/media behavior, and a small first implementation
> with measurable acceptance criteria. Preserve approach B, progressive shared styling, and
> Continuum's existing API/access behavior. com.zweilous.relaxe is approved but not implemented.
> Ask focused preference questions as needed, record approved decisions using the
> project-documentation skill, and update the handoff. Keep production features, identity,
> commits, pushes, and merges outside this design task. Reuse recorded baseline results unless
> changes justify new checks; no new worktree is needed for research.
