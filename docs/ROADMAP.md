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
| Project foundations | Complete | Valid asset packaging and a recorded desktop verification baseline; shared guidance/skill and upstream procedure validated. Device coverage remains separate. |
| UI/UX exploration | Feed/media direction agreed at HTML design level | Research/inventory, comparison and accepted refined A behavior recorded; Android refinement/verification remains implementation work. |
| Post-details/comments review | Study 04 accepted for now; main-post Reply added | Full post first, top-right −/+ branch collapse and top-level Reply recorded; native preferences, composer integration and device refinement remain implementation work. |
| Whole-app styling | Separate chat planned | Review each UI area with the user using the tracker in DESIGN.md; select global foundations/shared components without inferring approval from the feed. |
| Architecture proof of concept | Planned | One focused presentation slice reuses feed/actions with failure, state, restoration, and accessibility checks. |
| Progressive redesign | Planned | Replace selected feed, comments, media, shell, and settings surfaces through small reviewed changes. |
| Integration automation and refinement | Planned | Repeatable manual sync, useful detection/preparation automation, performance/device checks, eventual release decisions. |

Current branch: `codex/project-foundations`, based on Continuum
`ab9f3f59f0d5790f61a5acb71cd9f298798d6344` (2026-10-21, version `8.3.3.6`).
Production app behavior, layouts, identity, and CI remain unchanged. Foundation changes
are docs/skill, build validation, and screenshot comparison tests. The foundation
checkpoint is `dd68e7479` on this branch. The user authorized committing and pushing the
completed design checkpoint to the fork's topic branch; merging remains outside this task.
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

## UI/UX exploration checkpoint (2026-10-23)

Read-only component/state inspection and primary-source Sync/Boost/SnapReel research are
complete. [DESIGN.md](DESIGN.md) owns approved review decisions, evidence/uncertainty, the UI
review tracker and first-slice criteria. [Open the local prototype](prototypes/relaxe-exploration/index.html):
Refined A is the default; original A/B/C remains selectable. Local fixtures cover compact
feed, photo/gallery/video/GIF, light/dark, 100/130/200% text, three sizes, loading/error/empty/
gate states and action success/failure. No Reddit access or external action execution.

User accepted refined **A · Index**, with compact cards, prefix-free community/author/flair metadata
(wrap when needed), bold points/comments/time below, no permanent card overflow, a revealed
long-press toolbar and customizable actions. A's media direction is selected with autoplay
required within existing content/data/mute policy. Media overlays now start hidden, reveal
on tap and hide after about four playing seconds; the user confirmed the timeout and its
paused/seeking/keyboard exceptions. Comments opens default post details. Exact global
colors/icons/navigation are not approved by this feed/media review. The accepted post-details study is
recorded below. See DESIGN.md for the authoritative details.

Refined A at 390×844/100% displays six complete collapsed fixture cards in a 650px feed area,
median 97px including the card composition. Expanded toolbars take extra room. This is a
browser result, not actual native Continuum density. Native comparison remains an acceptance
criterion. Historical original A/C: six rows, B: five; medians 96/98/123px respectively.

Prototype verification: JavaScript syntax and original comparison regression checks passed.
Revision 02 adds 36 Refined A size/theme/text/surface cases, including expanded toolbar feed
cases, with no horizontal-overflow or <48px button-bound findings or page exceptions.
Held-pointer/right-click/keyboard toolbar access, More/focus, vote/save rollback, customization,
separate detail destination, muted video/GIF autoplay, pause persistence, gate and dialog
suspension checks passed. Collapsed/expanded and narrow dark 200% feed captures were visually
reviewed. Ignored evidence: `.gradle/design-refinement-verification.json`,
`.gradle/design-refined-*.png`; original results remain under their previous design filenames.
Browser configuration changes last within the preview only; native persistence is not built.

Revision 03 adds source/documentation research on SnapReel, YouTube and VLC control visibility;
DESIGN.md distinguishes evidence from proposed/native behavior. Tests rechecked the original
36 and refined 36 configurations, plus 18 playing-video size/theme/text cases. Hidden entry,
tap without playback/reframing changes, four-second video/GIF hide, pause/seek/keyboard
retention, swipe/tap separation and Comments routing passed. Normal hidden/shown and narrow
dark 200% overlays were visually reviewed. Ignored evidence:
`.gradle/design-media-03-verification.json` and `.gradle/design-media-03-*.png`.

No app, identity, build, CI or native test changes; no merge, installation or release.
The user authorized committing/pushing the design documents and local prototype fixtures.
Gradle/device checks were not rerun; reuse the recorded foundation results above.
Browser checks cannot establish native TalkBack, process recreation, provider eligibility,
real-network action/cache behavior, streaming budgets or gesture/lifecycle correctness.

## Next task and handoff

The user accepted [study 04](prototypes/relaxe-exploration/details.html) for now: **full post
followed by comments**, with top-right “−” branch collapse (“+” to reopen). The requested
main-post Reply button now opens a top-level comment independently of child reply drafts.
The current mockup is the working direction, with native refinement expected. DESIGN.md owns
the decisions, source findings and limits. Preserve existing native gesture preferences;
the inline editor demonstrates the flow without authorizing replacement of CommentActivity.

New verification: 72 detail size/theme/text/presentation/action configurations passed, plus
nested collapse, vote/save rollback, reply drafts and failure, main-post Reply creating a root
without losing a child draft, links/spoilers, permissions,
retry/load-more, gallery and inline playback flows. No page exceptions, horizontal-overflow
findings or <48px visible button/select bounds. Full-post, discussion and narrow dark 200%
thread/editor captures were visually reviewed. Ignored evidence:
`.gradle/design-details-verification.json` and `.gradle/design-details-*.png`.

The feed direction is accepted; the requested media overlay changes and confirmed four-second
timeout are recorded and demonstrated. Further adjustments can be made while implementing on
Android, as the user requested. The HTML study does not finalize native geometry or behavior.
The user reviewed and approved revision 03, closing this feed/media mockup review.
The current post-details mockup review is also closed with the main-post Reply addition.
Native code/identity, build files and goldens remain unchanged; no Gradle/device checks were
rerun for this HTML work.
No production implementation is authorized by this design review.

Whole-app styling belongs in **its own chat**, when that task is started. Use DESIGN.md's UI
review tracker to ask focused preference questions for each area, and record its decisions
separately. Keep exact color/type/icon/shape/navigation choices provisional until reviewed.
Start that styling chat when requested; keep its decisions separate from this accepted feed direction.

After implementation authorization, begin a focused task: one optional refined Index-style
image-post holder in existing Views/Paging, save/unsave and comments using upstream actions and
restoration. DESIGN.md specifies measurable density, accessibility, action/rollback and
restoration criteria. Preserve existing layouts and account/sort/filter/API/access behavior;
vertical playback follows in a dedicated media-policy/lifecycle task. Resolve identity and
isolated device setup separately before a personal installation.

Recommended setup for the next design chat: **GPT-6.1 Sol / High** for synthesis and prototypes;
up to two **GPT-6 Luna / Medium** subagents for narrow read-only inventories or audits. Use
GPT-6.1 Sol / High only for a delegated task needing more demanding analysis. These are task
recommendations, not changed app settings. Availability depends on the client/account; see
[official model guidance](https://learn.chatgpt.com/docs/models).

Next-chat handoff:

> Continue Relaxe for Reddit with a separate whole-app styling/design task in
> D:\coding\relax-red. Start from the completed design checkpoint on
> codex/project-foundations (foundation dd68e7479 plus its design commit). Read AGENTS.md,
> docs/ROADMAP.md, docs/DESIGN.md, docs/ARCHITECTURE.md, relevant docs/UPSTREAM.md setup notes,
> and the project-documentation skill. Inspect Git status and preserve existing work; use a
> short-lived codex/... branch for new work from this reviewed checkpoint.
>
> The feed, vertical media and post-details HTML directions are accepted for now. Read their
> recorded decisions and inspect docs/prototypes/relaxe-exploration/index.html and details.html;
> preserve them as the behavior baseline while exploring shared styling. Exact global styling
> and shell/navigation remain open. Use DESIGN.md's UI review tracker to cover the whole app.
>
> First propose a staged review order and ask focused preference questions about each active
> UI area. Begin with shared color/theme roles, typography, icons, spacing and shapes, comparing
> 2–3 coherent directions with identical realistic content across representative surfaces.
> Then review shell/navigation and remaining UI areas in manageable groups, recording approved
> decisions and remaining work using the project-documentation skill. Maintain light/dark and
> dynamic/custom themes, interaction states, large text and accessibility requirements. Do not
> infer whole-app approval from a single screen or implement unreviewed styling in production.
>
> This is design/prototype work. Preserve incremental presentation separation, progressive
> shared styling, native preferences and Continuum API/access/account/media/restoration behavior.
> com.zweilous.relaxe remains approved but unimplemented. Keep production implementation,
> identity changes, installation and further Git publication outside this task unless requested.
> Reuse recorded verification; run new checks only when changes justify them.
>
> Use GPT-6.1 Sol with High reasoning as the main agent. Up to two subagents are authorized
> only when independent work materially helps: GPT-6 Luna / Medium for straightforward,
> narrow read-only inventory/audit work; GPT-6.1 Sol / High for demanding analysis. Give concise,
> non-overlapping tasks, avoid recursive delegation and unnecessary full-history context.
> The main agent owns synthesis, prototypes and documentation.
