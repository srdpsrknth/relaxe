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
| Whole-app styling | Complete at HTML exploration scope: revision 149 directions, rendered fixture review and bounded observer follow-up | Observer reproduced independently of Relaxe code; native geometry, accessibility, lifecycle and performance remain Android work. |
| Architecture proof of concept | Planned | One focused presentation slice reuses feed/actions with failure, state, restoration, and accessibility checks. |
| Progressive redesign | Planned | Replace selected feed, comments, media, shell, and settings surfaces through small reviewed changes. |
| Integration automation and refinement | Planned | Repeatable manual sync, useful detection/preparation automation, performance/device checks, eventual release decisions. |

Current design branch: `codex/whole-app-styling`, created from `ee42cd9aa` on
`codex/project-foundations` after a clean-status check. Based on Continuum
`ab9f3f59f0d5790f61a5acb71cd9f298798d6344` (2026-10-21, version `8.3.3.6`).
Production app behavior, layouts, identity, and CI remain unchanged. Foundation changes
are docs/skill, build validation, and screenshot comparison tests. The foundation
checkpoint is `dd68e7479` on the foundation branch. On 2026-10-24 the user authorized
committing and pushing the current whole-app HTML exploration and documentation checkpoint
on this branch, then continuing the design review. This does not authorize native changes,
merging or release. Subsequent review work can remain uncommitted until its next checkpoint.
Build/test repairs are in `cc7d8c9aa`; the accompanying documentation commit records this
handoff. Continue from this branch/its checkpoint, since `master` still contains upstream only.

### Current review checkpoint and handoff (2026-11-05 closeout; prototype revision 149)

HTML/docs only on `codex/whole-app-styling`; all tracked/untracked work and attachments preserved.
No native/app/identity changes, installation, merge/release or Gradle/device run.
On 2026-11-05 the user authorized committing and pushing this completed HTML/docs checkpoint to
the existing fork branch. Include the prototype sources and three project documents; keep user
attachments and ignored local diagnostics out of Git. This publication authorization does not
extend to native implementation, merging or release.
**Whole-app HTML styling and the bounded follow-up are complete:** screen/workflow directions,
rendered fixture review and demonstrated fixes are recorded below. The observer error has been
isolated outside Relaxe scripts. Prototype revision 149 is unchanged by this closeout. Next comes
Android architecture proof-of-concept planning; native implementation remains unauthorized.

The user selected finishing option 2: genuinely new account/Guest onboarding highlights **Large
card / Card 1 / Filled**, with all four live samples selectable. Follow system theme mode, unified
Material styling, optional folder setup and Review/Finish stay. Returning/restored accounts retain
actual saved choices; there is no family/composition/context migration here. The common browse
direction is selected: Find in Saved under More, favorites once in a leading alphabetical group,
Recently visited inline filter and Visited-labelled times using native formatting contracts.
DESIGN.md is authoritative for all accepted behavior; ARCHITECTURE.md maps existing source owners.

Current review links (existing Tailscale docs setup unchanged):
- [Fresh onboarding](prototypes/relaxe-exploration/settings.html?rev=149&page=onboarding&focus=1&setup-account=newreader).
- [Saved-layout management](prototypes/relaxe-exploration/settings.html?rev=149&page=layouts&focus=1): shared device definitions including Guest; independent account/context snapshots, explicit Use, always-new-copy Save, Rename and confirmed Delete without changing active appearances.
- [Reader Appearance](prototypes/relaxe-exploration/details.html?rev=149&post=p5&appearance=1), [adaptive feed/reader](prototypes/relaxe-exploration/adaptive.html?rev=149&focus=1), and [adaptive Inbox/Settings/writing](prototypes/relaxe-exploration/adaptive-workflows.html?rev=149&focus=1).
- [Unified themes](prototypes/relaxe-exploration/settings.html?rev=149&page=themes&focus=1), [accounts/access](prototypes/relaxe-exploration/settings.html?rev=149&page=accounts&focus=1) and [Poll](prototypes/relaxe-exploration/compose.html?rev=145&type=poll).

**Revision-148 verification (historical, not rerun as models in revision 149):** actual setup-state model passes fresh signed-in/Guest Large + system,
returning Compact/Dark retention, chosen progress/account isolation and no completion on opening.
Updated account/setup workflow model passes new login→setup→Finish, optional folder deferral,
existing review/returning bypass, Guest/sign-in retention, logout and API guard cases. Targeted
normalization/browser-availability checks pass. One changed script passed syntax; 17 active pages
had zero static naming/ID/ARIA findings, 232 local references resolved and 18 served assets matched
workspace bytes. Ignored evidence: `.gradle/onboarding148-defaults.cjs`,
`.gradle/accounts148-model.cjs`, `.gradle/verification148.json`. These are source/model checks;
snapshot/rendered DOM, focus/bounds/themes/large-text/contrast are not proved. Prior library,
adaptive and theme models remain historical this turn. Browser opening again returned “Local
browser use is disabled in Work settings”. No native accessibility/performance verification.

Earlier browser-access troubleshooting (2026-11-01): both the desktop Browser control/site allowance
and **Settings → Configuration → Work → Local browser use** visibly show enabled/On. Read-only
inspection of the installed browser service and app identifies a separate host Work-access check
before backend discovery or URL access; this check produces the disabled error. The preview route
previously returned HTTP 200. A new chat, user restart, browser-session reset and re-selecting the
existing Work **On** preference through the supported UI have not restored access. The save attempt
temporarily disabled the preference control; it later became enabled again, but a subsequent fresh
browser-session opening still returned “Local browser use is disabled in Work settings”. A successful
server-side save was not independently established. The cause of the disagreement between the
visible preference and host authorization remains unresolved; do not claim a fix or ask the user to
repeat the same toggles/restart. No other permission was changed and no access gate was bypassed.
This historical mismatch still has no established cause or independently verified preference save;
use the normal support/feedback flow only with explicit authorization to send diagnostics. Never use
alternate automation to bypass an access denial.

**Current browser/preview evidence:** the first opening in this chat reached the URL and returned
`net::ERR_CONNECTION_RESET`, rather than the Work-settings denial. Tailscale forwarding remained
configured, but no process listened on the documented localhost docs-server port. Restarting the
existing `.gradle/tailnet-preview-server.py` restored HTTP 200 and supported in-app browser access.
No Work preference, permission, firewall, forwarding or security control was changed. This establishes
the current stopped-server failure and successful recovery, not the cause/fix of the earlier denial.

**Revision-149 rendered review:** actual browser DOM measurements and focused interaction/screenshot
review now cover the requested surfaces. Each matrix uses 360/390px, 720px landscape and 1280px wide;
100/130/200% text; Light/blue, Dark/rose, AMOLED/amber and Light/custom-amber fixtures. These are
rendered HTML fixtures, not Android dp/sp, real Material palette generation or exhaustive custom-role
contrast. Settings preview heights are 800/844/480/960; adaptive wide height is 900.

| Rendered coverage | Result and limit |
| --- | --- |
| Four onboarding steps | 48 parent bounds/target cases per step passed. Each of the four real nested feed samples also had 48 bounds checks; Compact/Large/Gallery text contrast passed. Vertical hidden-controls cases contain no text to contrast-test; a revealed-controls check passed, as did Next sample/album entry. |
| Saved layouts and four editors | Saved rows failed 28/48 before the CSS fix, then passed 48/48. All four editor parent matrices passed bounds, labelled targets and sampled text contrast. Gallery's intentionally clipped keyboard-only details shortcuts are an exception to idle target measurements; a focused shortcut expanded to a visible 48px target. |
| Themes and accounts/access | Appearance, chooser, Basics, Advanced, import text/review, accounts, sign-in and API screens each passed 48 parent bounds/target cases. Focused validation/failure/account checks below supplement these measurements. |
| Adaptive feed/reader and Appearance | 48 host/reader cases passed. After the short-height and focus fixes, 48 Appearance cases passed bounds/targets/sampled text contrast with at least 108.75px usable sample height; sampled text contrast minimum 5.35:1. |
| Adaptive Inbox/Settings/writing | PM, theme editor and all six composer types each passed 48 host/frame bounds/labelled-target/sampled text-contrast cases. Image/Gallery/Video used bundled selected media. Simulated-IME reachability was also checked; this is no native keyboard test. |

Focused browser checks passed: folder Cancel/Escape/focus return, denied choice/deferral/Finish;
layout dirty Keep/Discard, save/rename/delete failure retention and explicit retry, rename focus
return, and kept applied appearance after library deletion; theme invalid-field reveal/focus across
preview modes, copy/import without implicit Use, shared-update confirmation/Cancel/failure-local
feedback, malformed import retention, Online list/download retry, and signed-in Fern/Dark versus
Guest Wallpaper/Follow-system retention. Guest retained saved sign-ins, logout Cancel preserved the
current account, network sign-in failure/retry Cancel preserved setup, and API Cancel restored focus.
PM and writing text survived size/theme changes; a canceled thread switch left its target unread.
Composer missing-subreddit validation focused the field; synthetic submission failure retained the
draft and explicit retry completed. Reader Apply returned to Post options; sibling panes were inert
while editing. Theme/filter category and workflow exits passed repeated Keep/Escape/Discard replay.
No underlying native/API/account/context store or side-effect contract was changed or proved here.

Demonstrated fixes only: saved-row text inherited chevron sizing/non-shrinking flex; narrow short
reader Appearance forced two cramped columns and then left only a 10px sample; its dirty-guard focus
could be partly hidden; removed theme/filter dialogs lost the captured close event and stranded the
adaptive pending transition; theme success/preview state leaked into another account's fixture.
Revision 149 corrects those HTML boundaries and refreshes the affected asset references. Screenshot
review includes narrow Light onboarding, Dark/large-text saved rows, dark-rose onboarding/sample,
AMOLED/200% reader and Vertical controls, wide custom-theme editing and landscape/200% writing.

**Revision-149 diagnostic status (historical):** the `MutationObserver.observe` non-Node TypeError
recurred without source URL/stack attribution. The isolation follow-up below closes it as an HTML
blocker; it does not claim the browser diagnostic disappeared. Pure source/model checks never substitute for these rendered results;
the results still do not establish native accessibility, restoration, media lifecycle or performance.
Syntax checks passed for the three changed scripts; 52 local references resolved and seven served
assets matched workspace bytes with no-store headers. The starting inventory contained 102 changed/
untracked files: 92 remained byte-identical and ten received the intentional HTML/docs edits, with
no missing or unexpected changes, including preserved attachments. Ignored compact evidence is
`.gradle/rendered149-verification.json`; screenshot observations are in this chat. No Gradle/device
checks, native changes or Git publication were performed.

**Observer isolation closeout (2026-11-05):** a temporary local page and its `srcdoc` iframe contained
no JavaScript, stylesheets or Relaxe resources. In the supported in-app browser, initial opening
and three fresh reloads reproduced the exact non-Node observer error, one new error per reload.
The corresponding script-free page without an iframe produced zero new errors in three reloads.
An earlier instrumented minimal page also reproduced it with zero page-owned observer calls/errors.
This establishes an iframe observation/initialization diagnostic outside Relaxe page scripts.
The exact browser/runtime internal call site is not exposed by the supported console API; do not
claim a specific internal bug, a clean console, or a repaired browser. No prototype observer patch,
browser/app/plugin/security change or external diagnostic submission was needed or performed.

Focused real-route regression passed: adaptive Compact feed → exact post → 360px/200%/AMOLED
Appearance → visible dirty guard → Keep editing → Apply → return, with one explicit fixture post
open and none caused by resizing; four onboarding sample replacements, Vertical paging, folder
Escape/deferral/Finish; and adaptive Settings theme Keep/Escape/Discard transitions followed by
composer resize/draft retention and canceled workflow exit. The known diagnostic can still appear
during iframe initialization; it did not prevent those flows. Revision-149's full rendered matrices
remain the earlier evidence, not rerun in full here. Temporary served diagnostic HTML was removed;
minimal sources and compact results remain ignored under `.gradle/observer150-*`. No shipped HTML,
CSS or JavaScript changed during this observer follow-up. All original files/attachments were kept.
The closeout inventory confirmed 99 of 102 pre-existing changed/untracked files byte-identical;
only ROADMAP.md, DESIGN.md and ARCHITECTURE.md changed. Compact results are in
`.gradle/observer150-verification.json`. Documentation whitespace checks passed; no Gradle run,
device test, native change, commit, push, merge or release was performed during observer isolation.
The subsequent HTML/docs checkpoint publication is separately authorized above.

**Checkpoint validation (2026-11-05):** fresh syntax checks passed for all 54 prototype JavaScript
files; all 342 local references across 29 HTML files resolved. A targeted content scan found no
private-key blocks, recognized token patterns or hardcoded preview-machine address. These checks
supplement the recorded browser results; they do not rerun rendered matrices or native checks.

**Precise next task:** plan one bounded Android architecture proof of concept using approach B.
Start a new chat for that phase; read AGENTS.md, this handoff, ARCHITECTURE.md and DESIGN.md, inspect
and preserve the existing branch and any remaining work/attachments, then propose one presentation slice, existing
owners, acceptance criteria, verification and scope exclusions before implementation. Reuse the
feed/Paging/actions/account/API/media/restoration owners; no wholesale rewrite or accepted-design
re-review. Planning does not authorize native edits, installation, identity changes or Git publication.
Icons, exact native geometry/motion and the native preparation boundaries below stay deferred.

**Native preparation boundaries:** begin a separate explicitly authorized task before Android work.
Use approach B and existing account/API/access/feed/action/media/restoration owners. Prepare focused
mapping for legacy layout IDs/context precedence, shared preset identity/snapshots and backup/reset/
removal, per-account onboarding/default download location and URI grants, complete Reply/comment
Edit attachment drafts, real Material palette/role parity and shared-library/account-selection
migration. Native bottom-bar/Guest FAB mapping, account REPLACE/cascade, Add/API long-press and
Online/local theme-helper conflicts are recorded, not fixed. Validate native IME/Back/TalkBack/RTL,
restoration, media lifecycle and performance in the later slices; browser fixtures prove none of them.

Privacy policy remains a Relaxe draft: operator/contact, production URL and release-specific
data-flow/retention/deletion audit must be completed before distribution. Product identity is an
approved future decision, not implemented branding/application ID. No release or publication is
authorized. This HTML chat has reached its milestone boundary. Use this documentation handoff for
the next Android planning chat; native implementation needs its own explicit authorization.

### Previous handoff (revision 127; historical)



**Chat boundary and review pace:** a fresh chat is recommended now because this thread is
long and has accumulated many small preference comparisons. This is a handoff recommendation,
not a completed milestone. The last pending Sort Type decision is now resolved. The core feed,
media, shell, browse and create/act directions are established. Settings remains incomplete;
Android implementation has not begun under this HTML-only task. Group subsequent reviews by
screen/workflow, reuse selected control patterns and existing source behavior, and ask about
material UX choices rather than require a new approval for each routine control. This is the
agent's proposed working approach, not blanket user approval of unreviewed designs.

Remaining design review is concentrated in five groups:
1. Remaining Interface and detailed Settings: cover history/read and recently
   visited options, NSFW/spoiler and post/comment filters, miscellaneous/link behavior, and
   remaining notification/security/device/proxy/download/backup-management presentation as
   relevant. Existing mechanisms remain authoritative; not every preference needs a new mockup.
2. Accounts, Guest, login/API access and onboarding, including account-management boundaries.
3. Theme selection/custom editor and full existing color-role ownership; reuse the selected
   Fonts presentation instead of reopening it.
4. Tablet/landscape adaptation, including shell, pane arrangements and readable column limits.
5. Cross-surface consistency and accessibility/state review, including provisional create/act
   details. Native IME, Back, TalkBack, restoration, API and performance remain later verification.

**New-chat handoff:** continue in `D:\coding\relax-red` on `codex/whole-app-styling`; read AGENTS,
ROADMAP, ARCHITECTURE, DESIGN and the project-documentation skill. Inspect/preserve all tracked
and untracked work. Latest prototype is study 32 revision 127; **Sort Type ranges stay visible but disabled
except for Top/Controversial, as selected by the user.** No Sort Type question remains open.
Next: inspect the remaining Interface controls and platform-gated subpages, preserve source
behavior and produce one grouped, reviewable proposal. The Comments divider selector, four embedded-media
switches and Time format switch are selected. Use the existing tailnet preview route described
below. HTML/docs only: no native edits, identity changes, installation, commits/pushes, merges
or release without new authorization. Keep user attachments out of checkpoints. Revision 126
browser/source/HTTP checks are recorded below, not native proof. A stale browser session has
sometimes required resetting the CUA tool session; do not bypass its browser controls.

- **Selected directions:** compact feed/media/details; shared typography/rounding/icons;
  shell/drawer/search; subreddit and profile headers; subscriptions, Inbox, Saved, History
  and Recently visited; four customizable feed families and Gallery viewer navigation.
- **Current step:** Settings/accounts/onboarding, starting with study 32's root overview.
  Browse/layout and create/act direction choices are recorded; this is not blanket approval
  of detailed form fields, guards, report reasons, result feedback or exact native styling.
- **Precise next task:** audit the remaining Interface controls/platform-gated subpages and
  review them as a coherent screen group. Read interface_preferences.xml and its fragment;
  account for the currently omitted controls and gates without declaring Interface complete.
  Preserve accepted shell/layout behavior and existing navigation preferences; flag native
  mapping conflicts instead of silently changing defaults. Then proceed through the remaining
  five review groups listed above. Do not reopen accepted controls.
  Sort Type visible-disabled time ranges are selected; the hidden comparison is retired.
  [Current Sort Type preview](prototypes/relaxe-exploration/settings.html?rev=127&page=sort&focus=1&section=ranges).
  The Comments divider selector, four media switches, Time format switch and earlier directions
  remain selected. Native bottom-bar mapping/migration and Guest FAB discrepancy remain open.
  **Verification:** revision 126's browser checks are historical; revision 127 only removes the
  unselected branch and updates handoff/docs. Current syntax/source/reference/serving checks
  are recorded below; no new browser/native/device/Gradle verification is claimed.
  The selected media exit distinction remains: normal previews / Horizontal can close down;
  Vertical uses Back even at the start, with zoom ownership and Gallery album paging retained.
  Data Saving Mode now keeps dependent controls visible but disabled while Off, as selected;
  the hidden comparison is retired. Video's single-page organization remains selected.
  Separate Photos and albums / Videos and GIFs framing is now selected for Vertical swipe.
  Both start at Fit; accepted paging/hidden controls/timeout remain. Playback and data settings
  stay in their existing categories and outside saved layouts. Gallery Media only is selected:
  no visible grid More; tap opens its media-first viewer (Horizontal by default), hold opens
  the exact post-details route. The [revision 102 preview](prototypes/relaxe-exploration/gallery-titles.html?rev=102)
  replaces the title comparison. Optional titles, All posts and Vertical viewer paging remain
  configurable. Gallery retains seven-field family-scoped Use/new-copy/Discard snapshots,
  Fit and a two-column minimum. Details is a route dialog, not a full study 04 integration.
  Wider counts/tablet shell need later review.
  Compact Thumbnails-first group order is selected; its twelve fields and Large's fourteen
  remain separate. The intermittent observer diagnostic remains unresolved; no clean-console
  claim. Next: remaining Interface/detailed
  Settings/accounts/API access/themes/onboarding, tablet adaptation and consistency.
  Native implementation, preference migration, icon work and device verification remain later.
  A fresh chat is now recommended using the handoff above; whole-app styling is still in progress.
  Study 21 now follows the shared Reply/Edit comment style setting: Inline by default,
  Separate screen available. Its body-only eligibility, fixed title and no-draft contract
  remain distinct; HTML defaults changed, while native preference integration is unimplemented.
  Study 31 now has both Copy switches enabled by default, selected by the user, with independent
  Settings customization retained. Browser controls use only page-memory account/Guest buffers;
  no native persistence or gesture correctness is established. Study 30's inline notice is selected;
  its dialog comparison
  is retired. Download locations remains a route preview, with no setup or automatic retry.
  Download progress/results retain existing native service/notification mechanisms for later
  verification. Study 29 paired Share/Copy and study 28 separate download rows are selected;
  their comparisons
  and arrangement selectors are retired, with legacy overrides ignored. Moderator Remove/Spam
  requires the selected account/target/excerpt confirmation at design level; the immediate
  comparison is retired, with native work still unimplemented. Delete's excerpt is selected; the
  brief comparison is retired. Its synthetic outcomes establish no native correctness.
  Report's category-first flow now uses the selected bottom sheet for every stage; the screen
  comparison is retired. Exact category labels, pill transition and Spam detail/API mappings
  remain proposals, not native parity.
  Study 24's one More order per account is now selected across all feed layouts, including
  saved custom layouts; Guest stays separate. Section/action moves, reset and hidden-action
  positions remain demonstrated with page-memory buffers, not native persistence. PM bubbles/Preview/discard/Markdown remain selected;
  no saved PM drafts or Chat mechanisms are added.
  Use numbered choices directly in chat for mobile,
  and wait for the user's reply before advancing each open design decision. Retain alignment with
  Continuum's legacy PM read/compose/reply/API mechanisms, with the selected Markdown toolbar.
  Follow reviewed upstream compatibility fixes; defer external Chat and add no Chat client or
  custom detection/read-only system. Live API/rendering availability remains native verification
  work, not a new runtime feature. Exact thread geometry and PM drafts remain unselected.
  Study 21 preserves fixed title/body-only editing, ownership/type/media limits and
  discard-without-draft exit even with the selected shared presentation setting.
  Complete Reply and comment EDIT draft recovery is now required for the same account/target,
  with separate draft types; native storage remains unimplemented. Post-edit and private-
  message/action details remain for consistency/native review. Poll fields, optional caption geometry, guards and exact
  native geometry remain provisional for consistency review.
- **Remaining design groups:** Settings/accounts/onboarding is active; then tablet adaptation
  and cross-surface consistency, including documented provisional create/act details. Native
  architecture proof and implementation remain separately authorized future work.
- **Later milestones:** separately authorize a focused native architecture proof, incremental
  Android replacement and native accessibility/state/performance/device verification, then
  upstream integration/refinement and any release. No native implementation is authorized here.
- **Checkpoint scope:** the user authorized updating, committing and pushing documentation
  on this date. Include the HTML/CSS/JS design studies linked by the documents so the checkpoint
  is usable from a fresh checkout. User attachments and ignored diagnostics are not part of it.
  Existing browser results below are historical checks, not reruns for this documentation update.

A fresh chat is now recommended for the remaining grouped reviews; use the current checkpoint
handoff above. The Sort Type decision is resolved; remaining Interface controls are next. The earlier status-only update performed no new prototype verification; revision 127
selection/retirement checks are recorded below.

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

User accepted refined **A · Index**, with compact cards, prefix-free subreddit/author/flair metadata
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

The separate whole-app styling task is now active on `codex/whole-app-styling` from
`ee42cd9aa`. See DESIGN.md's **Whole-app styling review 07** and **Shell and search review 09** for
the selected foundation, theme mapping, requested navigation and preservation constraints.
Continue this chat with Inbox after the profile study 12 review; the shell/search, subreddit/shared-bar and current profile directions are recorded in DESIGN.md.
No whole-app design milestone is complete yet.

After implementation authorization, begin a focused task: one optional refined Index-style
image-post holder in existing Views/Paging, save/unsave and comments using upstream actions and
restoration. DESIGN.md specifies measurable density, accessibility, action/rollback and
restoration criteria. Preserve existing layouts and account/sort/filter/API/access behavior;
vertical playback follows in a dedicated media-policy/lifecycle task. Resolve identity and
isolated device setup separately before a personal installation.

### Styling task setup and resume

The user selected **A typography + B moderate rounding + C solid icons**. A/B colors are
liked fallback references, but resolved wallpaper/custom colors must come through Continuum's
existing light/dark/AMOLED, Material You Enable/Apply and custom-theme mechanisms. DESIGN.md
owns the source-backed component-role map. Native theme/font/account ownership is preserved.

[Foundation 07](prototypes/relaxe-exploration/foundations.html) shows one selected foundation
in neutral, warm and wallpaper-blue fixtures; earlier A/B/C remains selectable. Shared local
theme/icon helpers are in `foundations-theme.js` and are reused by the shell study. This is a
prototype adapter, not a new native theme engine or proof of Android extraction.

The user requested **Home · Saved · center Search · Inbox · Profile**, with Search opening
a bottom sheet and subreddits/accounts in a drawer. [Shell/search study 09](prototypes/relaxe-exploration/navigation.html)
demonstrates that structure, entry/history/scope/tools, failure/Retry and a full-screen result
route preview. Existing result fragments and search contracts remain reuse requirements.
The user accepted the current results presentation and requested a less cluttered entry.
Revision 09b uses the selected compact type/scope disclosure, fewer initial history controls,
and a header tools panel. The user accepted this refined entry design. DESIGN.md records the
accepted composition and Boost/Sync/Relay/Continuum evidence and limits. Keyboard behavior is
deferred to native review because HTML is insufficient to judge it; no keyboard default or
focus-on-open setting has been chosen.
Saved/Inbox/Profile/subreddit content has not been reviewed as a complete screen design.
Search layout responsiveness is demonstrated locally; no native latency claim is made.
The user selected a Continuum-like drawer and balanced → expanded search. The prototype now
shows the existing header/account-switcher and section organization, opens balanced, expands
on query focus/edit, and resets height on reopening while retaining query context. Heading
focus makes the initial state visible; it does not settle the deferred native keyboard policy.
Android SDK methods and constraints are explicit in DESIGN.md: reuse native drawer/sheet,
IME/insets/Back and lifecycle/accessibility support. The current shared sheet base forces
expanded state; balanced search needs local configuration in a separately authorized task.

Read-only native inventory found a configurable 2/4-command bottom bar, separate Search and
SearchResult Activities, account-partitioned recent-query records, 500ms/cancelled subreddit
autocomplete with OAuth/guest/NSFW context, existing scope/types/selection-return routes,
history deletion/Undo, keyboard privacy and account-switch finish behavior. Exact preservation
and Sync release-note evidence/limits are in DESIGN.md. Native command-bar customization
migration must be explicitly addressed during implementation, not silently overwritten.

Current HTML verification (2026-10-23):

- Selected foundation: **486 surface/appearance/text/width cases**, no page exceptions,
  horizontal overflow, out-of-width elements or visible targets below 48px; **360 base role
  contrast pairings** passed. Earlier recorded interaction coverage remains reference evidence.
- Shared role adapter: **468 component contrast pairings** passed, including toolbar/control,
  post/read/comment/info, links/votes and media badges. Independent custom post/read-title,
  comment surface/text and link overrides reached their own rendered components. Selected
  type/12px reference corners/solid icons and archived-comparison switching passed.
- Shell/search: **54 width/text/appearance/sheet-height cases** and **27 drawer cases** passed
  bounds/target checks, with no page exceptions. Focused flows passed for scope/query/type
  retention, submit/result/Back, concrete subreddit history, Users suppressing subreddit
  autocomplete, failure/Retry, history delete/Undo, guest/local-Saved/sign-in states, account
  history isolation, feed scroll return and the accepted feed toolbar/menu.
- Revision 09: **108 surface cases across 27 width/text/appearance configurations** passed
  balanced/expanded sheet, grouped drawer and account-list bounds/target checks with no page
  exceptions. Balanced → expanded, retained query/reopened balanced state, Escape focus return,
  account-list switching and guest availability passed. Drawer and both sheet states were
  visually reviewed. Earlier interaction results above remain recorded coverage.
- Revision 09b: **150 surface cases** (30 width/text/theme configurations × entry/options/
  tools/history/expanded query), plus **15 surfaces** across 360×800, 844×390 and 1280×900
  browser viewports passed horizontal bounds and ≥48px control checks. Light/dark/AMOLED,
  100/130/200% text and blue/rose/custom-amber/warm samples were covered. **23 interaction
  checks** passed scope/type/history retention, submit/results/Back focus, delete/clear+Undo,
  keyboard disclosure/Escape, secondary tools/privacy, suggestion error/Retry/empty,
  guest history isolation/local Saved/sign-in and custom-feed scope. Entry/options/tools and
  narrow dark 200% text captures were reviewed. JavaScript syntax and whitespace checks passed.
- Study 10: **144 layout views** passed horizontal bounds and ≥48px control checks, covering
  expanded/compact headers and About across width/text/theme combinations, header fallback/
  Guest/failure fixtures, rendered RTL direction and landscape sizing. **23 interaction checks**
  passed keyboard scrolling, direct-pointer Posts/About scroll retention, subscription gate/
  success/failure, header Retry, reused post-toolbar action redraw, media return, and the search
  bridge's Guest/subreddit scope and Posts/Subreddits/Users labels. A short-list scroll-range
  issue at 600px was repaired using minimum content height, without inventing additional posts.
  The scoped fixture hook captures scroll before post-action redraw. Sticky-tab locator actions
  scrolled before activation; retention was verified using direct pointer input instead.
  Expanded/compact and large-text captures were reviewed. Sort selection is a fixture; it
  does not implement ranking. Native IME, TalkBack, app-bar physics and process restoration
  remain unverified. The existing reload console diagnostic below also occurred in this run;
  these passing layout/flow checks do not establish an error-free console.
- Study 10 action revision: **36 focused header layouts** passed bounds and ≥48px target
  checks across both Subscribe placements, three widths, 100/200% text and light/dark/AMOLED.
  **Seven dialog layouts** passed at narrow 200% text across those appearances plus RTL
  landscape. **Nine interaction assertions** passed Continuum's time-option inventory,
  Top/Week and Controversial/Day application, direct Hot/New/Rising application, cancellation,
  focus return and retained selection through theme redraw/header collapse. These supplement
  the earlier study checks; the full 144-view matrix was not rerun. JavaScript syntax,
  whitespace and local/Tailscale HTTP checks passed. No native source changed or Gradle ran.
  Evidence: `.gradle/design-subreddit10-actions-verification.json`,
  `design-subreddit10-actions-{name,banner}.jpg` and `design-subreddit10-sort-time.jpg`.
- Study 10 paging revision: **75 focused layouts** passed horizontal bounds and ≥48px control
  checks: expanded/compact/About at three widths, 100/200% text and light/dark/AMOLED, plus
  RTL landscape and long-description/no-banner/Guest/header-failure cases. Compact-state
  checks confirmed that Posts/About scroll out of view. **16 interaction checks passed**, covering
  real horizontal/reverse/short/vertical drags, drag-to-click isolation, the disable-swiping
  preference, More/keyboard alternatives, sort/time retention, RTL gestures and post-action
  access. One additional offset comparison across locator keyboard/click actions was invalid
  because those actions moved focus/scroll before rendering; temporary capture/mount diagnostics
  confirmed that the received offset was restored. This does not
  establish native gesture, selection or restoration correctness. The full earlier matrices
  were not rerun. A cached iframe load race was repaired by initializing already-loaded
  documents as well as listening for load, with duplicate initialization guarded. An unwanted
  post click after a disabled drag was repaired and rechecked. The older console diagnostic
  remains recorded separately below. Evidence: `.gradle/design-subreddit10-paging-verification.json`
  and `design-subreddit10-paging-*.jpg`. No Gradle/device run was justified.
- A final reload/log check reported an unattributed `MutationObserver.observe` TypeError.
  The sheet and feed loaded and the layout/interaction checks above passed; this is not an
  error-free console result. A temporary iframe guard did not resolve the log diagnostic and
  was removed. Script-free and static-iframe diagnostic pages did not reproduce it; their
  temporary files were removed. Trace the reload diagnostic during follow-up prototype work.
- Light shell/search/drawer, dark narrow 200% error sheet, and light/dark selected-theme
  specimens were visually reviewed. JavaScript syntax/diff whitespace checks passed.

Shared-shell revision (2026-10-24): **54 focused layout views** passed bounds and ≥48px bar/
Search-control checks: 12 subreddit, 12 contextual Search, 12 details and 18 shell configurations.
These cover 360/390/600px, 100/200% text, light/dark and AMOLED where available. **33 focused
assertions passed** across shared destinations, contextual Search/results/Back, query and
account isolation, modal focus isolation, directional fade on subreddit/Home/details/results,
reply-draft retention and visible large-text composer clearance, immersive entry/reveal/return,
outer-shell routing, and two actual browser viewport overflow checks. Reduced-motion CSS was
reviewed; native accessibility/IME/gesture behavior and performance remain unverified. An
initial larger browser batch timed out; its unfinished results were not counted, and the
layout checks were completed in bounded batches. The earlier whole-study matrices were not
rerun. Syntax/whitespace and local/Tailscale HTTP checks passed; native source is unchanged and
Gradle/device checks were not run. Evidence: `.gradle/design-shared-shell-layouts.json`,
`.gradle/design-shared-shell-verification.json` and `design-shared-shell-*.jpg`.

Remote-preview follow-up (revision 12, 2026-10-24): the user reported the old top Search
and missing bottom bar. A fresh browser through the Tailscale endpoint showed the current
markup; stale browser content is the suspected cause, not a reproduced rendering failure.
Added explicit document revisions to the subreddit/feed/Search nesting and a workbench
revision badge. The docs-only preview server now sends `Cache-Control: no-store, max-age=0`
and ignores conditional cache headers. A conditional HTTP request returned fresh HTTP 200.
Browser checks through the Tailscale URL confirmed revision 12, no top Search, all five bottom
destinations, scoped bottom Search and dismissal, downward fade and upward return. Keyboard
focus in the bar retains its visibility as intended. Syntax/whitespace checks passed; earlier
layout matrices were not rerun for this cache fix. Capture: `.gradle/design-tailnet-revision12.png`.

Initial study 11 verification (2026-10-24), before the revision-14 density decision below:
Subscriptions/Multireddits reuse the existing HTML shell. Source inspection covered the four native browsing categories, account/Guest
lists, favorites, prefix filtering and add/selection routes; DESIGN.md owns those contracts.
**108 layout views passed** horizontal-bounds and ≥48px button/field checks across four list
types, 360/390/600px, 100/130/200% text and light/dark/AMOLED. The 200% toolbar was repaired
after visual review to avoid a split heading, and the matrix rerun. Five palette/RTL views
and actual 360×800 / 844×390 browser overflow checks passed. Interactions checked substring/
prefix filtering, favorite success/failure, Guest isolation and disabled Guest refresh,
owned/other-user multireddit separation, loading/empty/no-match/refresh failure and Retry,
add-route preview dismissal, drawer routes, list scroll/filter return, Search/results return
and directional bar visibility through the Tailscale endpoint. Light normal and narrow dark
200% captures were visually reviewed. The known reload `MutationObserver.observe` diagnostic
was observed again; it remains unresolved, so this is not an error-free-console claim.
Evidence: `.gradle/design-subscriptions11-layouts.json`,
`.gradle/design-subscriptions11-interactions.json` and `design-subscriptions11-*.png`.
JavaScript syntax/whitespace checks passed; no native source changed or Gradle/device checks ran.

Study 11 revision 14: the user accepted the single selector and requested tighter rows,
with final spacing explicitly deferred to real Android rendering. Reduced row padding,
decorative avatar size and section gaps; unchanged labels and ≥48px browser action targets.
Ordinary 390px/100% rows measured 65px before and 49px after, including the divider. No native
dp/sp specification or performance/density claim follows from that browser measurement.
The focused **108 layout views passed again** for all four list types, three widths,
100/130/200% text and light/dark/AMOLED, checking horizontal bounds, button/field sizes and
clipped row text. Normal light and narrow dark 200% captures were reviewed. Other interaction,
palette/RTL and actual-browser-breakpoint suites were not rerun for this spacing-only change.
Evidence: `.gradle/design-subscriptions14-layouts.json`, `design-subscriptions14-review.png`
and `design-subscriptions14-large.png`. Syntax/whitespace checks passed. Native checks were not
run; the existing reload diagnostic remains unresolved.

Profile study 12 (revisions 15–16, 2026-10-24): the user selected an expanding/collapsing header,
Follow beside the username with a separate Save user bookmark, and parent-post context before
comment text. Own/other-user and Guest fixtures reuse the compact feed/actions/media and
shared shell. User-targeted Search/history and per-tab sort/time/offset state are demonstrated;
native source boundaries and preservation constraints are recorded in DESIGN.md.
**108 own/other-user layout views passed** after the 200% name-row reflow repair: Posts/Comments,
360/390/600px, 100/130/200% text and light/dark/AMOLED. Eight Guest layouts, five palette/RTL
bounds checks and actual 360×800 / 844×390 browser overflow checks also passed. Interaction
checks covered Follow/Save independence, failure/eligibility, Guest isolation/gating, sort/time,
tab/keyboard/swipe preference, compact header/bar fade, Search/results return and media
entry/reveal/return/theme changes. Normal and narrow dark 200% views were visually reviewed.

Revision 16 adds fixture readiness controls and scoped render-completion mounting for profile
and hosted shell redraws. Eight focused own/other-user width/text redraw checks plus a
ready/reload/view-switch check passed afterward; the unchanged full style matrix was not
rerun for that lifecycle-only change. This repairs the separate null-document early-viewing
error observed during testing. The earlier `MutationObserver.observe` reload diagnostic still
appears and remains unresolved; do not claim error-free console output. Temporary trace
listeners were removed. Syntax/whitespace and remote asset checks passed. No Gradle/device
run, native/identity change, install or Git publication occurred.
The revision 16 Home/Search/Profile navigation smoke check also passed: the hosted feed
rendered with the shared bar, Search opened, and Profile routed to the signed-in user's profile.
Evidence: `.gradle/design-profile12-layouts.json`, `design-profile12-interactions.json`,
`design-profile16-render-smoke.json` and `design-profile12-*.png`.

The user authorized the styling checkpoint commit/push on 2026-10-24. Commits `a60c1aa53`
(HTML studies) and `f2cfa30bd` (decisions/handoff) were pushed to
`fork/codex/whole-app-styling`; the remote tip matched `f2cfa30bd` afterward. Inbox study 13
is subsequent local work, not part of that pushed checkpoint.

Inbox study 13 (revision 18): the user requested Boost-inspired All/Unread/Messages/Sent/
Mentions access after sharing a screenshot; tabs are optional. This supersedes the two-tab
selection. The user subsequently accepted the compact seven-view selector (also Comment
replies/Post replies) and two-line reply/message previews. Direct Mark all read/More placement
and exact native geometry remain later review work.
**126 layout views passed**: seven views × 360/390/600px × 100/200% text × light/dark/AMOLED.
**25 interaction checks passed**: each view's fixture contents, separate Sent recipients and
unread semantics, read success/removal from Unread while retained in All, read failure,
account-wide Mark all success/failure, Guest isolation and selected-view return, Search/results
return, compose route preview, paging retry, loading/error/empty/retry and shared-bar down/up
scroll. Five palette/RTL bounds checks and four actual 360×800 / 844×390 Guest/signed-in 200%
overflow checks passed. Normal and narrow dark 200% views were visually inspected. Revision 18
blue-fixture row and selector text contrast passed across light/dark/AMOLED (minimum 4.91:1).
JavaScript syntax and whitespace checks passed; no native source files changed.
Evidence: `.gradle/design-inbox18-verification.json`, `design-inbox13-before.png` and
`design-inbox18-*.png`. Revision 17's tab layout and interaction evidence is superseded.
No native changes, Gradle/device run, install, merge or release. The earlier
`MutationObserver.observe` diagnostic appeared again in Inbox browser logs and remains unresolved;
the passing fixture checks do not establish error-free console output or native correctness.

Saved study 14 (revision 19): the user selected Posts/Comments tabs plus a separate source
selector. Find in Saved inside More versus an always-visible field is still the review question.
The scoped post frame reuses compact rows, hidden actions and media; comments retain parent-post
context. The old Saved placeholder was shown before the draft. Guest uses device-local saved
posts, with source/Comments controls disabled rather than reusing signed-in recovered saves.
**108 final layout views passed** after repairs: two sources × two tabs × 360/390/600px ×
100/130/200% text × light/dark/AMOLED. **33 interaction checks passed**, covering text-only and
zero-result filtering, query/source/tab retention, exact subreddit and AND terms, comment route
previews, Saved-only versus global Search, Guest isolation, loading/empty/failure/retry,
save success/rollback/source retention, pending failure across account teardown, media hidden
entry/reveal/theme/return, Home/Inbox regression paths, cache-bypass scope, keyboard tab access
and shared-bar down/up reading. **30 extra checks passed**: 18 Guest layout views, five palette/
RTL bounds, three comment/source contrast checks (at least 4.5:1) and four actual 360×800 /
844×390 Guest/signed-in 200% overflow checks. Normal and narrow dark 200% views were visually
reviewed. Fixture controls now stay hidden outside their destination.

Testing found and repaired a renderer assumption that every filtered list contains media,
and stale optimistic save feedback when the iframe was destroyed during a pending demo action.
The fixture now safely handles text-only/empty lists and settles demo actions before teardown;
this is not a native request-lifecycle change. Final layout checks and focused interaction
retests passed afterward. Syntax/whitespace checks passed. The final Saved log sample was
empty, but the earlier reload diagnostic remains open rather than being claimed fixed.
Evidence: `.gradle/design-saved14-verification.json`, `design-saved14-before.png`,
`design-saved14-posts.png`, `design-saved14-comments.png` and `design-saved14-large.png`.
No Android, identity, Gradle/device, installation or new Git publication action was performed.

History study 15 revision 21 follows the agreed read-state model and selected Today / Yesterday /
Earlier headings. Added labels replace premature last-read/visit wording. A route notice now
hides during media viewing along with the surrounding list controls. **54 layout views passed**
(three appearances × three widths × three text sizes × both grouping comparisons), plus
**17 interaction checks** and **27 extra checks**: 18 Guest layouts, five RTL palette bounds,
three timestamp contrast checks (at least 4.5:1) and an actual 360×800 viewport at 200% text.
Interactions cover independent account grouping, loading/empty/failure/retry, settings route,
direct media entry/reveal/return, details and shared Search. The earlier Guest grouping failure
was a reset expectation: explicit state setup and account round trips confirm independent
retention. Search's accessible dialog name is Search; its test expectation was corrected.
The media Back locator reported a node-location error during pointer automation; a visible
coordinate click and keyboard return both passed. This does not establish native correctness.
The known MutationObserver reload diagnostic appeared again and remains unresolved.
Evidence: `.gradle/design-history15-rev21-verification.json`, `design-history15-before21.png`,
`design-history15-selected21.png` and `design-history15-large21.png`. Tailnet preview returned
HTTP 200. Native code remains unchanged; no Gradle/device run, installation or new publication.

Recently visited study 16 revision 23 uses the user's selected two visible tabs, replacing the
initial compact selector proposal. It reuses the shared shell and foundation roles, with a
local name filter, independent Follow/Save user actions and synthetic account-partitioned state.
**54 layout views passed** across three appearances, widths and text sizes and both tabs;
**26 interactions passed**, covering tab keyboard/focus, shared filtering, route return, action
failure, off/loading/empty/load-error/retry specimens, Guest boundaries, settings preview,
drawer/Search and bar down/up reading. **58 extra checks passed**: 36 Guest layouts, five RTL
palette bounds, three contrast groups (row time/action/selected tab, all at least 4.5:1) and
actual 360×800 and 844×390 viewports at 200% text, plus 12 focused narrow/200% views after
giving the longer Subreddits tab more width to avoid a mid-word break. Normal Subreddits/Users and large-text views
were captured. The known MutationObserver reload diagnostic appeared again and remains open.
Evidence: `.gradle/design-visited16-rev23-verification.json`, `design-visited16-before.png`,
`design-visited16-subreddits23.png`, `design-visited16-users23.png` and
`design-visited16-large23.png`. Browser action results and offsets do not establish native API,
recording, gestures, process restoration or performance. Android code and identity remain
unchanged; no Gradle/device, installation or publication action was taken.

Retained feed layouts study 17 revision 28 adds a source-derived comparison board for Card,
Card 2, Card 3, Compact 2 and Gallery using the same fixtures, plus temporary customization
controls. The user requested comparison before selecting layouts/settings and deferred the
isolated Card title-order decision. DESIGN.md owns the source inventory, historical primary
Sync/Boost references and open decisions. This historical comparison is superseded by the
revision 30 four-family selection below; no native preferences have been changed.

Browser checks during revisions 25–28: **135 final theme/width/text views passed**, checking
row count, horizontal bounds, vertical overlap/content containment, 48px target bounds (1px
rounding tolerance) and embedded-document overflow. **45 two-column views passed** after the
grid sizing repair. Earlier in this same study, **39 interaction checks** covered shared
customization, Gallery media-only filtering, media entry/reveal/return, content gates and
Guest save isolation; **49 extra checks** covered narrow/two-column/RTL bounds, contrast and
actual narrow/desktop viewports. These counts are not native or exhaustive action coverage.
Initial horizontal-only checks missed vertical overlap; the final matrix explicitly tests it.
Repairs addressed implicit grid rows shrinking below content, Compact 2 narrow wrapping,
refresh before fixture readiness, missed load events for already-loaded iframes and embedded
workbench overflow. Three subsequent warm reloads initialized all five feeds with ten rows.
Jump buttons work with pointer and keyboard. Normal Card/Gallery and 200% narrow views were
captured for visual review. The existing MutationObserver reload diagnostic recurred and
remains unresolved; do not claim a clean console. Media tap reveal and keyboard Back passed;
keyboard reveal was inconclusive in nested-frame automation. Album paging, feed autoplay,
native gestures, IME, TalkBack, restoration and performance remain unverified.

Evidence: `.gradle/design-layouts17-rev28-verification.json`, `design-layouts17-cards28.png`,
`design-layouts17-gallery27.png` and `design-layouts17-narrow27.png`. Local and tailnet HTTP
previews returned 200. Syntax/diff checks passed. No native source/identity, Gradle/device,
installation, new commit/push, merge or release action was taken for this study.

Revision 30 follows the user’s selected four-family model. Card 1/2 are retained Large card
compositions; Compact uses the accepted renderer, and Vertical swipe reuses the accepted
viewer. Compact 2 is rejected and Card 3 is not a separate proposed option. Per-family
settings are independent in-memory browser controls; the exact controls/defaults remain
proposals. No native layout IDs or saved preferences were changed.

Revision 30 checks: **108 family/theme/width/text views passed**, including row overlap,
horizontal bounds, visible targets (48px with 1px rounding tolerance), hidden media entry
controls and compact body width. **27 compact thumbnail positions at 200% text passed** after
repairing a conflict with the existing large-text grid placement; **nine Card 2 large-text
views passed**. **11 focused interactions passed** for independent family choices, element
visibility, Card 2 order, compact keyboard toolbar/customization, Gallery media-only filtering,
media tap reveal, shared Search and synthetic save. Twelve surface-bound checks also passed;
actual 360×800/200% and 1280×1000 parent bounds passed. Desktop families and narrow compact
captures were reviewed. This does not establish final native density or native behavior.
The existing reload diagnostic remains unresolved; no clean-console claim or Gradle/device
run. Evidence: `.gradle/design-layouts17-rev30-verification.json`,
`design-layouts17-families30.png`, `design-layouts17-narrow30.png` and
`design-layouts17-settings30.png`. Local/tailnet preview and syntax/diff checks passed.
No new commit/push, native source/identity, installation, merge or release action was taken.

On 2026-10-26 the user selected Card 1 (text above preview) as the Large card default;
Card 2 remains selectable/customizable. Revision 31 marks that existing preview default in
labels and records the decision. Syntax/diff checks and tailnet HTTP 200/default-label checks
passed. This was a documentation/copy update; the revision 30 browser matrix was not rerun.

Revision 32 adds a focused Filled/Outlined/Flat rows comparison, with a Large/Compact family
selector. It reuses the existing validated iframe bridge, renderer, theme roles and actions;
no surface default or native behavior changed. **108 layout views passed** across both families,
three appearances, three widths, 100/200% text and all three surfaces. **Five interactions
passed** (compact keyboard toolbar, shared Search and three narrow-screen keyboard jumps),
plus **15 extra checks** covering actual narrow/desktop parent bounds, tailnet rendering,
RTL and title contrast (all nine tested title/surface/theme pairs at least 4.5:1). Large-card
comparison and narrow 200% Compact captures were visually reviewed. The initial border test
assumed exactly 1px; the browser computed 0.666667px, so the assertion now checks a positive
border. No renderer repair was needed. Syntax/diff checks passed. Shell HTTP probes were
unavailable under current socket restrictions; the tailnet page and all frames were verified
in the browser. Earlier reload diagnostics remain unresolved; no Gradle/device run or new Git
publication. Evidence: `.gradle/design-surfaces17-rev32-verification.json`,
`design-surfaces17-large32.png` and `design-surfaces17-narrow32.png`.

Revision 33 records Filled as the selected Large card default, with Outlined/Flat retained,
and the user’s Save as layout requirement for named custom configurations (including size,
icons/positions, feed gaps and title/preview/toolbar arrangement). The first working HTML flow
saves and reapplies current presentation controls plus padding/gaps/preview limits/thumbnail
size. It rejects blank/duplicate names, preserves saved snapshots while editing drafts, and
keeps named copies through family Reset. Names are rendered as text. The prototype library
clears on reload; native persistence, account/context mapping, picker organization and the
complete icon/toolbar editor are not implemented.

Current checks: **108 family/theme/width/text views passed**, plus **27 extreme size/spacing
views** at 200% text. **23 interaction checks passed** for defaults, validation, cancel/Escape,
name creation, immutable snapshots, applying controls to the renderer, global-theme exclusion,
family filtering, reset/reapply, draft selection and forward/reverse modal focus wrapping.
An initial modal focus test failed; explicit Tab boundary handling repaired it and the
focused retests passed. Two actual narrow-screen bounds checks passed for dialog/workbench.
Save-dialog and applied-layout captures were reviewed. Syntax/diff checks passed; the tailnet
page and frames loaded in the browser. No shell HTTP success is claimed under current socket
restrictions. No native changes, Gradle/device run, installation or Git publication.

On 2026-10-26 the user selected **always save a new copy** for edits to custom layouts.
Existing saved configurations remain unchanged; no in-place Save changes action is planned.
The revision 33 prototype already behaves this way. This decision/copy update passed syntax
and diff checks; the earlier interaction matrix was not rerun.

Evidence: `.gradle/design-layouts17-presets33-verification.json`,
`design-layouts17-save-dialog33.png` and `design-layouts17-named33.png`. Earlier reload
platform/browser diagnostics remain unresolved; this work does not establish native behavior.

Revision 34 records the user's constraint that narrow feeds must use one column and tablet
presentation needs a separate adaptive review. The browser computes an effective count from
available width/text size while retaining the requested wide-window count. Its cutoffs are
provisional CSS heuristics. Wider fixtures cover landscape 720 × 480 and 840/1280 × 960;
they do not approve a tablet shell. DESIGN.md owns the adaptive constraints and pending review.
The named-layout proposal now includes per-action visibility/order, above/below-content
toolbar placement, and Compact's existing hidden/Always show option. Compact's in-row editor
and the parent workbench synchronize. More stays available, including hidden votes.

Current revision-34 browser verification: **144 family/width/text/appearance views passed**
without feed/row horizontal overflow or multiple narrow-window columns. This includes all
six fixture widths at 100/130/200%, plus Light/Dark/AMOLED coverage at narrow, landscape and
wide sizes. Focused interaction checks covered icon hiding/showing/reordering, toolbar
placement, reset and saved-copy restoration, retained wide-column preference, Compact's
Shift+F10 reveal/menu synchronization, RTL at 200%, and More access after hiding every icon.
The last check found a missing-hidden-vote-menu case; it was repaired and retested with both
vote actions reachable. An actual 360px browser viewport had no editor overflow, seven rows
with 48px button targets, and a bounded dialog dismissed with Escape. JavaScript syntax and
diff checks passed. The existing MutationObserver reload diagnostic reproduced and remains
unresolved; successful fixture checks do not close it. No Gradle/device run, native change,
installation, commit or push in this step.

Evidence: `.gradle/design-layouts17-adaptive34-verification.json` and
`design-layouts17-action-editor34.png`. Earlier revision counts above are historical.

Revision 35 records **below-content as the Large card toolbar default**, with Above retained
in Settings, and the user's requirement to cap icons to the available width. Large/Compact
toolbars now keep one row, reserve More, retain full-size targets and move lower-priority
actions into More. Counts are measured with the actions; multi-column cards use their own
width. The selected priority order survives narrowing. Resizing a focused action into More
moves focus there. Large's upvote accessibility label includes the point count.

Fresh checks after correcting an inherited Large-toolbar content-width sizing defect:
**108 family/width/text/appearance combinations, covering 1,080 toolbar rows, passed**
one-row, bounds, More availability and ≥48px target checks with all seven actions selected.
Coverage: Large/Compact, six widths, 100/130/200%, Light/Dark/AMOLED. Focused checks also
passed for two-column card widths, Card 2 + Above + RTL + 200%, an overflowed Upvote reached
and used through More, and Copy link focus falling back to More when the real browser window
narrowed to 360px. A long batch exceeded the browser-tool time limit; verification was rerun
in bounded batches. Syntax/diff checks passed, and the capped-toolbar capture was reviewed.
The earlier reload diagnostic remains open. No native/Gradle/device work or Git publication.
Evidence: `.gradle/design-layouts17-toolbar35-verification.json` and
`design-layouts17-toolbar35.png`. Revision-34 counts above are historical.

Revision 36 records Filled as the selected Compact card surface default, alongside Large
card. The family editor, Reset and Composition default now resolve Compact to Filled;
Outlined and Flat remain available. Focused browser checks passed for all three selections,
reset/default resolution, narrow Dark at 200% and AMOLED at 100%, without horizontal row/feed
overflow. Compact still starts with its toolbar hidden. Syntax/diff checks passed; the Compact
capture was reviewed. The prior 108-view toolbar matrix was not rerun for this default-only
change. No native/Gradle/device work or Git publication. Evidence:
`.gradle/design-layouts17-filled36-verification.json` and `design-layouts17-filled36.png`.

Revision 37 records Fit whole media as the selected Large card preview default. This was
already the fixture default; Square crop remains configurable. Fresh browser checks confirmed
initial Fit/contain rendering, Square/cover selection and Reset returning to Fit/contain.
Copy/syntax/diff checks passed and the preview capture was reviewed. No new layout matrix or
Gradle/device run was needed for this decision/copy update. Video previews remain placeholders;
these image checks do not establish native video framing, autoplay or performance. Evidence:
`.gradle/design-layouts17-framing37-verification.json` and `design-layouts17-framing37.png`.

Gallery clarification supersedes revision 34's narrow Gallery fallback: **at least two
columns, Fit whole media scaled to tile width**. Continuum source confirms two-column
portrait/landscape defaults, staggered placement, natural-ratio previews and the existing
tap/long-press media/detail swap preference. Revision 38 corrects the HTML grid and adds
measured staggered placement. Initial rapid-resize checks exposed overlap; synchronous
placement/resize updates repaired it. **54 settled grid combinations passed** across six
widths, 100/130/200% and Light/Dark/AMOLED for column minimum, no overlap/overflow, fitted
aspect ratios and ≥48px More targets. One intermediate reflow sample needed another settled
observation; this is not evidence of native layout performance. Actual 360px viewport and
RTL checks passed; the Gallery one-column option is disabled, while narrow Large card stays
one column.

Selected Gallery viewer behavior: media-first + Comments; **Horizontal by default, Vertical
selectable in Settings**; swipe through album images before the next visual post. The proposal
retraces the sequence backward. Only visual-media posts enter this stream; text/link tiles
open details. Closing keeps the current post visible in Gallery. Revision 39 reuses the
existing viewer with scoped axis/exit callbacks and keeps zoom paging locks, controls and
playback/gate policy. Its direction is captured by the browser's named-layout copies;
native preference scope/migration and the horizontal presentation remain implementation work.

Fresh revision-39 checks: **24 viewer combinations passed** across both axes, Light/Dark/
AMOLED, narrow/landscape and 100/200% for horizontal bounds, ≥48px controls and Comments.
Actual horizontal drags entered an album, advanced its image, then the next post; a zoomed
drag kept the same page. An actual vertical drag passed with Vertical selected. Keyboard
checks covered both axes, backward album boundaries, first-post bounds and the inactive axis.
Comments/text tiles reached the details route fixture; current-post grid visibility/focus
passed after swiping to another post and exiting, including a farther tile. Direction Reset
and saved-copy reapply passed. The original Vertical feed's ArrowDown behavior remained.
Gated media stayed unloaded before reveal, unavailable media kept its error state, and
the final-post boundary stayed on the final visual post.
Syntax/diff checks and grid/viewer captures passed review. No native changes, Gradle/device
run, installation, commit or push. Earlier reload diagnostic remains unresolved.
Evidence: `.gradle/design-layouts17-gallery39-verification.json`,
`design-layouts17-gallery39-grid.png` and `design-layouts17-gallery39-viewer.png`.

Revision 40 records the user-selected boundary: Horizontal stays limited to Gallery entry;
the standalone feed remains Vertical swipe. Gallery grid defaults to visual media only, with
All posts retained. Browser checks confirmed direction-control visibility only in the
standalone Gallery workbench, seven default visual tiles/two columns, ten tiles (including
three text/link fallbacks) with All posts, and Reset restoring the visual-only default.
Syntax/diff checks passed; the earlier grid/viewer matrix was not rerun for these default/
scope-control edits. Evidence: `.gradle/design-layouts17-gallery40.png` and
`design-layouts17-gallery40-verification.json`. No native/Gradle/device work or Git publication.

Create/act study 18 revision 41 implements the user-selected unified composer with a compact
six-type selector. Text is the first interactive proposal; the other five forms are explicitly
pending and cannot submit. DESIGN.md owns its grouping and source-backed contracts. Native
services/account/flair/restoration remain authoritative; the browser uses synthetic data and
in-memory input only, with no Reddit requests or uploads.

Current browser verification: missing subreddit/title focus and feedback; required flair
blocking versus best-effort loading/failure; guest/account-loading blocking; all six selector
routes with Text retained; selected-text formatting and focus return; safe Markdown preview
(literal HTML stayed text), inert link destination preview and forward/reverse dialog focus
wrap; simulated failure retained writing/flair/options, retry succeeded; posting/dirty exit,
discard/clear/reopen, shared Home cancel and Search return. Escape returned preview focus.
All 36 appearance × text size × preview-size cases had no form horizontal overflow or measured
button/select/summary/checkbox-label targets below 48px (rounding tolerance 0.5px). An actual
360px browser at 200% text also kept page/form/dialog within horizontal bounds. Light and
AMOLED/large-text captures were visually reviewed; current console warning/error query was
empty. Evidence: `.gradle/design-compose18-verification41.json`,
`design-compose18-review41.png` and `design-compose18-large-text41.png`. These checks do not
establish native keyboard/TalkBack, real account/rule/API validation, restoration or performance.
The earlier reload diagnostic remains unresolved. No Gradle/device run, native source/identity
change, installation or Git publication was performed for this specimen.

Revision 42 implements the user's choice to keep Spoiler, NSFW and reply notifications
visible below the body, using a labelled fieldset instead of a disclosure. Targeted browser
checks passed for mouse/Space toggling and keyboard progression to Preview, plus six views:
Light/Dark/AMOLED at 100%/720px landscape and 200%/360px narrow. Controls remained exposed,
labels had at least 48px height and the form had no horizontal overflow. The options capture
was visually reviewed; syntax/diff checks passed. The full revision 41 interaction matrix
was not rerun for this grouping change. Evidence: `.gradle/design-compose18-options42.png`
and `design-compose18-options42-verification.json`. No native/Gradle/device or Git publication.

Revision 43 implements the selected Preview placement beside Post in the top bar. At 200%
text the pair moves together onto a second header row. Twelve header cases (four preview
sizes × three text sizes) retained adjacent buttons, at least 48px targets, no title overlap
and no header horizontal overflow. Actual 360px/AMOLED/200% and a Dark spot check passed;
captures were visually reviewed. Preview opened the existing dialog without losing input;
Escape returned focus, Tab progressed from Preview to Post, and pending forms/closed composer
disabled Preview. Syntax/diff checks passed. Evidence: `.gradle/design-compose18-header43.png`,
`design-compose18-header43-large.png` and `design-compose18-header43-verification.json`.
Earlier broad form checks remain revision 41 evidence; no native/Gradle/device or publication.

Revision 44 adds the Link-post proposal after inspecting `PostLinkActivity`, its XML/menu and
`TitleSuggestionUtils`. URL-before-title is proposed; Suggest title, optional formatted body,
shared header/options and separate in-memory Text/Link bodies are demonstrated. The browser
does not fetch entered URLs; title lookup and posting are synthetic. Image/Gallery/Video/Poll
remain disabled follow-up forms. DESIGN.md records capabilities and boundaries.

Current checks passed: empty-URL suggestion/post feedback and focus; explicit suggestion
success and failure retention; cancellation after manual title/URL edits; inert URL plus
formatted-body preview and Escape focus return; separate body/URL retention through type
changes; formatting with no invented Link image-upload action; guest/account-loading/required
flair gates versus best-effort lookup failure; posting locks, failed-post field/option retention,
simulated success, Search return, discard clearing inactive Text input, URL-only dirty-exit
prompt and long-URL preview wrapping. All 36 appearance × text-size × preview-size views had
no measured form/header horizontal overflow or measured visible controls below 48px (0.5px
rounding tolerance). Actual 360px/200% had no page/form horizontal overflow. Light and
AMOLED/large-text captures were visually reviewed; current warning/error query was empty.
Syntax/diff checks passed. Evidence: `.gradle/design-compose18-link44-verification.json`,
`design-compose18-link44.png` and `design-compose18-link44-large.png`. Earlier reload diagnostic
remains unresolved; no native account/API/IME/TalkBack/restoration/performance proof, Gradle/
device run, installation or Git publication.

Revision 45 applies the selected Link order: Title → URL → Suggest title → optional Body.
Targeted browser checks confirmed Tab from Title to URL to Suggest title, completed suggestion
success and correct field order without form overflow at 720px/100% and 360px/200%. The capture
was visually reviewed; diff checks passed. Evidence: `.gradle/design-compose18-link-order45.png`
and `design-compose18-link-order45-verification.json`. The revision 44 matrix was not rerun
for this DOM reorder. No native/Gradle/device changes or Git publication.

Revision 46 adds the single Image-post proposal after inspecting `PostImageActivity`, its XML
and the `SubmitPostService` image/GIF job paths. The user selected Title → Image → optional
Body; visible Replace/Remove and replacement staging remain proposed details. The chooser/camera use bundled samples; GIF preview is a static
first frame. Camera denial/unavailable, picker/preview failure and posting remain synthetic.
Native URI permissions, camera/temp-file cleanup, decoding, GIF processing, real upload/
server errors and restoration remain authoritative and unverified by the browser.

Current browser checks passed: required-image feedback/focus, chooser cancellation, camera
denial/unavailable, selected image/focus/Contain fit, cancelled/failed replacement retention,
camera cancel/confirmation, GIF poster, image/body preview, preview failure/retry without
an added posting block, separate Text/Link/Image body retention, Text and Link field regression,
guest/account-loading/required-flair versus lookup-failure gates, shared Search return,
posting locks and failed-post attachment/body retention. Remove kept writing and focused the
chooser; image-only dirty exit prompted and discard cleared image/inactive input. All 36
appearance × text-size × preview-size selected-image cases had no measured form/header
horizontal overflow, Contain framing and no measured visible controls below 48px (0.5px
rounding tolerance). Empty chooser at 360px/200% and actual 360px/200% picker bounds/targets/
forward/reverse focus wrap passed. A close click immediately after viewport reset had no
effect; a settled retry opened the expected discard prompt, with no console warning/error.
Selected-image and large-picker captures were visually reviewed. Syntax/diff checks passed.
Evidence: `.gradle/design-compose18-image46-verification.json`, `design-compose18-image46.png`
and `design-compose18-image46-picker-large.png`. Earlier reload diagnostic remains unresolved.
No native changes, Gradle/device run, installation or Git publication.

Revision 47 adds the Gallery-post proposal after inspecting its Activity, adapter, ViewModel,
caption/URL sheet and upload utility. It demonstrates ordered bundled samples, the existing
20-image/180-caption limits, per-image Edit/Remove, optional formatted body and safe preview.
Selection-time ready/pending/failure states are synthetic; no device files/camera or uploads.
DESIGN.md owns the source contracts and proposed grid/editor placement.

Current browser checks passed: empty-gallery feedback/focus; append order/distinct IDs;
caption save/cancel/focus and metadata retained after earlier-image removal; caption/body/
inert-URL preview; pending Add/edit/remove and all-image Post guards; completion unlock;
failure removal by identity after an index shift; cap at 20 with 20 unique IDs despite repeated
sample files, and Add returning at 19; posting locks/failure retention; type-switch input,
guest/required-flair gates, simulated success/Search return, discard and Gallery-only dirty
exit. The first caption stress check exceeded 180 despite maxlength; explicit input/save
guards fixed it, with 180-character and Unicode-boundary retests passing. A long UI batch
timed out/reset the tool session; the page was preserved and cap checks passed again in a
bounded batch. This is an automation limitation, not an app performance measurement.

All 36 appearance × text-size × preview-size grid cases had no measured form/header horizontal
overflow or measured visible controls below 48px (0.5px rounding tolerance). Actual 360px/200%
kept two grid columns without page/form overflow; details-dialog bounds, forward/reverse focus
wrap and Escape passed. Light grid/details and AMOLED large-text details captures were visually
reviewed. Current warning/error query was empty; syntax/diff checks passed. Evidence:
`.gradle/design-compose18-gallery47-verification.json` (includes summaries of checks observed
before the tool reset), `design-compose18-gallery47.png`, `design-compose18-gallery47-details.png`
and `design-compose18-gallery47-details-large.png`. Earlier reload diagnostic remains unresolved.
Browser fixtures do not verify native uploads, account/API/media policy, URI/camera handling,
IME/TalkBack, recreation/restoration or performance. No native changes, Gradle/device run,
installation or Git publication.

Revision 48 adds the Video-post proposal after inspecting its Activity/XML, player constants
and service error paths. It demonstrates selected/recorded bundled media, an optional formatted
body, visible playback/edit actions and separate file-access/processing failures. Gallery
caption/link fields remain behind Edit provisionally after the user's request to continue;
that unanswered question is retained for consistency review.

Current checks passed: required-video focus/feedback, picker Cancel/failure, camera permission/
unavailable fixtures, muted start-after-selection, Play/Pause, 10-second seek boundaries,
keyboard seeking and mute; recording Cancel/confirmation and clip/position retention; paused
Post Preview at the editor position with formatted body, close cleanup/focus, Search/type-change
pause and input retention; posting locks and distinct file/processing failure retention;
preview failure/retry without an added Post block; Remove preserving writing/releasing the
player; Video-only dirty exit and discard. The initial served URL exposed a zero-length
seekable range, so initial seek probes stayed at zero. Revision 48.1's page-local object URL
for the bundled clip fixed that fixture transport issue: seekable duration 5.055s, keyboard
seek to 0.2s and forward clamp to 5.055s were observed. This is not native policy/performance
verification; no arbitrary URL or device media is fetched.

All 36 appearance × text-size × preview-size cases had no measured form/header horizontal
overflow, Contain framing and no measured visible controls below 48px (0.5px rounding tolerance).
Actual 360px/200% controls and post-preview bounds/forward/reverse keyboard wrap passed. Light
and AMOLED/large-text captures were visually reviewed. Current console warning/error query
was empty; syntax/diff checks passed. Evidence: `.gradle/design-compose18-video48-verification.json`
(includes the initial seek diagnostics and corrected checks), `design-compose18-video48.png`
and `design-compose18-video48-large.png`. Earlier reload diagnostic remains unresolved.
Native audio/eligibility/loop settings, URI/camera access, upload/processing, account/API,
IME/TalkBack and restoration remain unverified. No native changes, Gradle/device run,
installation or Git publication.

Revision 49 adds the Poll proposal after inspecting its Activity/XML, `PollPayload` and
submission service. It starts with two options, supports Add/Remove up to six, omits empty
options in order, and uses a compact 1–7 day selector with the existing three-day default.
These presentation choices remain proposals. Text/Poll body image insertion remains a
follow-up placeholder; native uploaded-image/rich-text/camera paths must be retained.

Current Poll checks passed: empty/one-option feedback and focus; Add focus/six-row cap;
Remove renumbering, preserved values and two-row floor; ordered preview/blank omission,
literal HTML-like option text and formatted body; one-/seven-day values; preview keyboard
wrap/Escape/focus return; type-switch and failure retention; pending editing locks, simulated
success and account/flair guards; Keep composing/discard, option-only and duration-only dirty
prompts; shared Search round trip. All 36 appearance × text-size × preview-size cases had no
measured form/header overflow or visible Poll controls below 48px (0.5px rounding tolerance).
Actual 360px/200% form and preview bounds passed. Light and AMOLED/large-text captures were
visually reviewed. The current console warning/error query was empty; syntax/diff checks
passed. Evidence: `.gradle/design-compose18-poll49-verification.json`,
`design-compose18-poll49.png` and `design-compose18-poll49-large.png`. Earlier reload diagnostic
remains unresolved. These browser checks establish no native account/API, uploads, server
validation, IME/TalkBack, restoration or performance correctness. No native changes,
Gradle/device run, installation or Git publication.

Revision 50 adds Text/Poll inline images after inspecting the uploaded-image sheet/adapter,
upload helper, parser and rich-text converter. DESIGN.md records source caveats and the
proposed manager, insertion/reuse, per-type memory and pending/account guards. Interrupted
verification was resumed from the preserved work. The user subsequently selected visible
Images beside formatting; manager details and pending/account guards remain proposals.

Browser checks covered cursor/selected-text insertion, reuse, plain-text captions and known-ID
preview rendering; unknown IDs/entered image URLs stayed text. Picker/camera/upload/processing
failures, camera cancellation, delayed results after writing/type changes, Text/Poll separation,
dirty Keep/discard cleanup, type/account availability, final insertion feedback, failed posting
and Search return retained the expected input. A stale reopened-manager completion state was
found and repaired in revision 50.1; recovery was observed. Manager forward/reverse focus wrap,
Escape/focus return and actual 360px/200% bounds passed. All 36 appearance × text-size ×
preview-size cases had no measured form/toolbar/dialog overflow or visible manager buttons
below 48px (0.5px rounding tolerance). Light and AMOLED/large-text captures were visually
reviewed; current syntax/diff checks passed. Evidence is ignored at
`.gradle/design-compose18-inline50-verification.json`, `design-compose18-inline50.png` and
`design-compose18-inline50-large.png`. Native uploads, URI/camera cleanup, account ownership,
rich-text parity, IME/TalkBack, restoration and performance remain unverified. No native
changes, Gradle/device run, installation or further Git publication. Earlier reload diagnostic
remains unresolved.

Study 19 revision 51 adds the first dedicated Reply proposal after inspecting `CommentActivity`,
its layout/menu, caller guards, ViewModel, repository/DAO and `SendComment`. DESIGN.md owns the
context/layout/exit proposals; ARCHITECTURE.md records the native parent-keyed, account-less
draft key and text-only saved content. At that checkpoint no native draft migration or account policy had been selected; the future
Reply draft requirement below supersedes the product decision, with migration still unimplemented.
Images/GIF are labelled capability previews; the reply-specific attachment flow remains next.

Browser checks passed: empty-Send focus/feedback, expansion preserving text, safe Markdown and
preview return; draft dialog focus wrap, Cancel, save/reopen, older-draft retention, target-change
guard and per-parent restoration, empty-close deletion, selected-text formatting; Images/GIF
entry previews; pending duplicate/context locks, failure retention, stale exit-prompt dismissal,
Guest/account/post-lock/comment-lock/archive guards, comment-lock scope, success/draft cleanup,
Search return and closed pending-failure recovery. All 72 long-parent cases (three appearances
× three text sizes × four preview widths × compact/full context) had no measured form/header/
parent horizontal overflow or visible controls below 48px (0.5px rounding tolerance). Actual
360px/200% editor/draft-dialog bounds passed; Light and AMOLED/large-text captures were visually
reviewed. Console warning/error query was empty; JS syntax/diff checks passed. Ignored evidence:
`.gradle/design-reply19-51-verification.json`, `design-reply19-51.png` and
`design-reply19-51-large.png`. Earlier reload diagnostic remains unresolved. Browser fixtures
do not verify native IME/TalkBack, account isolation, real drafts/uploads/Giphy, result/lifecycle
restoration or performance. No native changes, Gradle/device run, installation or Git publication.

Revision 52 implements the requested inline-under-comment alternative in HTML and renames
parent-only expansion to Expand/Collapse. Separate/inline styles are a required future Settings
choice; no native setting or shipping default is implemented. The shared editor moves among
fixed parent slots with draft guards. The existing separate-screen flow and native contracts
remain; the thread is a synthetic sketch, not a replacement for the accepted details study.

Checks covered opening under the correct comment/main post, one visible editor, text retention
across style changes, Expand/Collapse semantics, Cancel/save before changing parent, per-parent
draft return, inline close/save focus and retained thread, pending guards, failed-send retention,
Guest/lock/archive row actions, success collapse/draft cleanup and Search return. All 72
style × appearance × text-size × width views had no measured form/editor/header horizontal
overflow or visible controls below 48px (0.5px rounding tolerance). Visual inspection caught
letter-by-letter narrow large-text header wrapping despite those bounds; revision 52.1 moves
the subtitle below the title, with 12 targeted large-text header rechecks and an actual
360px/200% capture. The final shorter inline editor was checked at actual 360px/200%, with
style-switch text/row preservation and success cleanup rechecked in 52.2. Light/AMOLED captures
were visually reviewed. Syntax/diff checks passed. Ignored evidence:
`.gradle/design-reply19-inline52-verification.json`, `design-reply19-inline52.png` and
`design-reply19-inline52-large.png`. Native IME/TalkBack, preference scope/persistence,
RecyclerView recycling, account/draft/attachment ownership, restoration and performance remain
unverified. No native changes, Gradle/device run, installation or Git publication.

Revision 53 records the selected Inline default and retains the Separate screen override.
That revision proposed GIF beside Images, with Italic in More. A bundled sample supports
cancel/insertion at the cursor, paused Preview and a proposed re-selection guard for restored
text without GIF metadata. Native single-descriptor and draft limitations are recorded in
DESIGN.md/ARCHITECTURE.md; no Giphy service is contacted.

Current browser checks: 17 focused checks passed for defaults/override, GIF cancel/insertion/
preview/re-selection, text-only draft limitation, style retention, Guest/pending guards,
failed-send retention, success collapse and keyboard focus. The final toolbar passed 48
style × light/dark/AMOLED × 100%/200% × four-width cases: no measured horizontal overflow,
controls at least 48px (rounding tolerance), and one toolbar row at normal text. The picker
also fit an actual 360×800 viewport at 200% text, with focus wrapping. Visual review prompted
moving Italic into More to avoid an orphaned toolbar button; all 48 final views were rechecked.
Current console query was empty; JS syntax, local links and diff checks passed. Evidence:
`.gradle/design-reply19-gif53-verification.json` and `design-reply19-gif53.png`.
Native IME/TalkBack, real provider/upload/eligibility, preference and draft ownership,
restoration and performance remain unverified. No native/Gradle/device or Git publication work.

Revision 54 records GIF beside Images (Italic in More) as selected and adds the Reply image
manager proposal. Choose/Take/reuse use immediate bundled-sample insertion; no upload/provider
request occurs. Current checks: 24 focused browser checks passed for picker/camera cancel,
image insertion/reuse/removal, all five error fixtures, Preview, style retention, account/
missing-descriptor guards, draft exit/cancel/reselection, pending/failure/success and focus.
The manager passed 18 actual viewport × light/dark/AMOLED × 100%/130%/200% cases at 360×800
and 720×480, with no horizontal overflow or sub-48px controls (rounding tolerance). The final
shorter helper text and two-image list were rechecked at 360px/200%; the normal-text capture
was reviewed. Current console query was empty; syntax/local-reference/diff checks passed.
Evidence: `.gradle/design-reply19-images54-verification.json` and `design-reply19-images54.png`.
Real upload timing/races/cancellation, camera/URI handling, native account/draft ownership,
IME/TalkBack, restoration and performance remain unverified. No native/Gradle/device or Git
publication work. The row presentation was pending at that checkpoint; revision 55 records its selection.

Revision 55 records thumbnail/filename image rows as selected and makes the native text-only
draft limitation explicit in the exit proposal. Replies containing image/GIF blocks show an
attachment warning and Save text draft; plain replies keep Save draft. This does not select
text-only storage as the future product behavior. Fourteen current browser checks passed for
Cancel/preview retention, text-only save/reopen, older-draft retention, empty-close deletion,
image/GIF/unused-image warning conditions, Separate screen parity and keyboard focus.
Twelve actual viewport × appearance × 100%/200% cases passed at 360×800 and 720×480, with no
measured horizontal overflow or sub-48px controls (rounding tolerance). Syntax/local-reference/
diff checks passed; current console query was empty. Evidence:
`.gradle/design-reply19-exit55-verification.json` and `design-reply19-exit55.png`.
Native persistence, account/attachment restoration, IME/TalkBack and performance remain
unverified. No native/Gradle/device or Git publication work. Next: draft attachment retention.

Revision 56 records complete, account/parent-scoped Reply drafts as required and demonstrates
cloned page-memory snapshots of text, reusable sample images and the selected GIF. Twenty
current browser checks passed for save/restore with both previews and reusable rows, style
retention, unchanged older snapshots after leaving without saving, parent/account isolation,
account-change Cancel/guard behavior, scoped success/empty-close cleanup and failed-send
retention. Six 360×800 theme × 100%/200% draft-prompt views and a 200% restored media Preview
fit without measured horizontal overflow; visible prompt controls stayed at least 48px high
(rounding tolerance). Current console query was empty; syntax/local-reference/diff checks
passed. Evidence: `.gradle/design-reply19-drafts56-verification.json` and
`design-reply19-drafts56.png`. Native Room/account migration, attachment/URI/asset lifetimes,
process/exit recovery, IME/TalkBack and performance remain unimplemented/unverified. No native,
Gradle/device or Git publication work. Next: Edit comment follows Reply style versus always
Separate screen, then the edit presentation/content/action review.

Study 20 revision 57 records Edit comment following the Reply style setting and adds a shared
writer Edit mode. Twenty-six focused browser checks passed for stable own-comment editing,
fixed author/unchanged state, original-body keep/replace, formatting/Preview, Cancel/empty/
unchanged exits, failed/successful save and same-comment update, Guest/other-user/loading/
post-lock/archive versus comment-lock guards, original-media import, proposed complete EDIT
draft restore/cleanup, actual 360px/200% prompt/focus and Search return. Seventy-two style/
original-body × appearance × text-size × preview-width cases passed measured form/editor
horizontal bounds and 48px control dimensions (rounding tolerance). Eight Reply regression
checks passed for full drafts, styles, lock/validation, parent/account isolation and success.
Current Edit/Reply console queries were empty; syntax, local-reference/ID and diff checks passed.
Evidence: `.gradle/design-edit20-57-verification.json`, `design-edit20-57.png` and
`design-edit20-57-replace.png`.
Other native entry guards, real media conversion, stable result reconciliation/lifecycle,
EDIT draft persistence/ownership, IME/TalkBack and performance remain unverified. Those were proposals at that checkpoint; later selections are recorded in DESIGN.md. No native/Gradle/device or Git
publication work. Next: original-body keep/replace, then Edit draft retention and edit-post.

Revision 58 records keeping the original above the inline Edit editor and removes the
comparison control. Its `media=1&scenario=edit-draft` fixture opens a changed edit with original
image metadata plus a new sample image/GIF. Eight focused checks passed for original-above
placement, Cancel, full proposed draft restore without publishing, preserved older snapshot,
Separate screen/Inline continuity and keyboard focus. Six actual 360×800/720×480 × theme
views at 200% text passed modal horizontal bounds and 48px control dimensions (rounding
tolerance). Current console query was empty; syntax, local-reference/ID and diff checks passed.
Evidence: `.gradle/design-edit20-drafts58-verification.json` and `design-edit20-drafts58.png`.
Complete EDIT draft retention was still proposed at that checkpoint; native storage/ownership,
media lifetimes,
restoration, IME/TalkBack and performance remain unverified. No native/Gradle/device or Git
publication work. Next: settle Edit draft retention, then edit-post/private-message flows.

Study 21 revision 59 records complete Edit comment draft recovery as required and adds the
first body-only post-edit proposal. Twenty-five current browser checks passed for fixed title,
formatting/limited safe Preview, empty/unchanged/changed discard behavior, placement continuity,
ownership/type/media guards, pending/failure/success and browser failure recovery after leaving,
shared Search return, direct Inline entry, actual 360px/200% dialogs and keyboard focus.
Forty-eight presentation × theme × 100%/200% × preview-width cases passed measured form/editor
horizontal bounds and 48px visible control dimensions (rounding tolerance). The normal-screen
capture was visually reviewed. Current console query was empty; syntax/reference/ID/diff checks
passed. Evidence: `.gradle/design-edit-post21-59-verification.json`, `design-edit-post21-59.png`
and `design-edit-post21-inline59.png`. Native API/Markdown behavior, all caller eligibility,
refresh/results, account switching, IME/TalkBack, restoration and performance remain unverified.
Complete comment drafts still need native storage/migration. No native, Gradle/device or Git
publication work. Next: post-edit placement, then remaining post-edit/private-message flows.

Study 22 revision 60 continues private-message creation while leaving study 21 placement
unselected. Source inspection confirms Recipient/Subject/Message, optional recipient prefill,
100-character subject limit, active-account ComposeMessage/API error handling, and no explicit
draft repository or formatting toolbar in the inspected Activity. The HTML proposes compact
Markdown controls versus plain entry, Preview, pending input locking and unsent-message
discard handling. None of those additions are native implementations or selected defaults.
Twenty-one browser interaction checks passed for required-field focus, subject limit,
formatting/limited safe Preview, dialog focus, comparison retention, Guest blocking, pending,
failure/retry, completion, discard and shared Search/navigation guards. Twenty-four theme ×
100%/200% × preview-width cases passed measured horizontal bounds and visible 48px controls;
six actual 360px portrait / 720px landscape × theme cases at 200% text passed page bounds.
The actual 360px/200% discard dialog fit and focus wrap passed. The initial recipient-value
assertion was replaced because browser privacy redacts that field; no claim of exact returned
recipient text is made. The form capture was visually inspected; console query empty,
JavaScript syntax and diff checks passed. Evidence:
`.gradle/design-private-message22-60-verification.json` and `design-private-message22-60.png`.
Native sending, full Markdown, account switching, IME/TalkBack, process restoration and
performance remain unverified. No native, Gradle/device, installation or Git publication work.
Revision 61 records the user’s conditional selection of the Markdown toolbar from official
API format evidence; the plain-entry comparison is retired. Sources and the distinct current
Chat/read-only PM archive compatibility issue are recorded in DESIGN.md. This is not live
send verification. Six focused current browser checks passed for the retained toolbar, retired
comparison, text insertion/focus, More actions and 360px/200% layout in Light/Dark/AMOLED.
Console query empty; JavaScript syntax/diff checks passed. Evidence:
`.gradle/design-private-message22-61-verification.json` and `design-private-message22-61.png`.
Next: unsent handling and thread/reply presentation; check route capability before native work.
Revision 60’s checks above remain historical, not rerun wholesale. No native/Gradle/device run.

The subsequent user-requested Continuum messaging audit is source-only: Inbox uses separate
legacy API Notifications/PM lists; PM threads render sent/received Markdown balloons and reply
via `/api/comment`; new messages use `/api/compose`. No Chat integration, dedicated shortcut
or capability/read-only fallback was found in the inspected routes. FetchMessage documents
the inaccessible Chat/archive unread-count problem and counts the first unread listing page
instead (cap 100); it does not implement Chat. Detailed boundaries are in ARCHITECTURE.md.
Reddit's current help still describes Chat and read-only PM archives; documentation/API source
presence does not establish live account capability. No authenticated request, message send,
device/build/browser rerun or prototype change was performed for this audit. The user then
selected alignment with Continuum's legacy functionality and reviewed upstream compatibility
fixes, retaining the Markdown toolbar, deferring external Chat and excluding a custom Chat
client or compatibility/read-only layer. This supersedes the earlier shortcut recommendation.
Revision 62 records that direction and adds a direct unsent-message review entry; the existing
discard prompt remains a presentation proposal, with no saved PM draft support. Next: choose
unsent-message confirmation, then thread/reply presentation. Seven focused current browser
checks passed for seeded direct entry, Keep writing retention/focus return, focus wrap,
Discard clearing and 360px preview/200% text dialog bounds/48px controls in Light/Dark/AMOLED.
Console query empty; JavaScript syntax, local references/unique IDs and diff checks passed.
Evidence: `.gradle/design-private-message22-62-verification.json` and
`design-private-message22-62.png`. Existing user work is preserved. No native, Gradle/device,
installation or Git publication work; earlier wider verification is historical, not rerun.

Revision 63 records the user's explicit mobile choice 1: show Keep writing / Discard message
when leaving an unsent PM. Five current browser checks passed for the approved copy, Keep
writing retention, non-destructive Escape, Discard clearing/closing, and formatted Preview
for the next review. Console query empty; syntax/diff checks passed. Evidence:
`.gradle/design-private-message22-63-verification.json` and `design-private-message22-63.png`.
No new native behavior, draft persistence, Gradle/device run or Git publication. Next: the
numbered in-chat choice to keep or omit Preview beside Send; wait for the user's answer
before continuing to thread presentation. Wider theme/responsive checks above are historical.

Revision 64 records selected PM Preview beside Send and adds study 23's unselected thread
comparison. Two current New message browser checks passed for formatted Preview without
submission and close/focus/writing retention. Fifteen thread interaction checks passed for
sent/received rendering, validation/focus, formatting/More/safe Preview, presentation/buffer
continuity, Guest/pending/failure/retry/success, accepted discard/Keep writing, shared Search,
navigation guard/focus wrap and Discard returning to Inbox with account/appearance context.
Forty-eight presentation × theme × 100%/200% × preview-width cases passed measured horizontal
bounds, positive message reading area and 48px controls. Twelve actual portrait/landscape ×
presentation × theme cases passed long-message bounds at 200% text. Both compositions were
captured and visually reviewed; console queries empty. Syntax/local-reference/unique-ID
and diff checks passed. Evidence: `.gradle/design-pm-preview22-64-verification.json`,
`design-pm-thread23-64-verification.json` and `design-pm-thread23-64-{bubbles,rows}.png`.
This establishes browser fixture behavior only. Native APIs, Markdown fidelity, per-message
timestamp/copy actions, account/read-count/result/restoration, IME/TalkBack and performance
remain unverified. Pending-exit wait, footer scrolling and exact density remain proposals.
No native source, Gradle/device, installation or Git publication work. Next: the numbered
bubbles/rows choice; wait for the user's answer before refining the presentation.

Revision 65 records the user's choice of Continuum-style PM bubbles and starts study 24's
unselected grouped/flat More comparison. Four focused current PM checks passed for selected
bubbles, received/sent alignment, retired row parameter, formatted Reply Preview and Keep
writing retention. Twelve More interaction checks passed for grouped/flat inventory/state
continuity, focus wrap/Escape/Close and underlying-post return, background inertness, fixture
Save/read/Hide toggles, separate Guest state, Guest/locked/archived row rules and route-preview
feedback. The initial inert-property assertion was adapted to the DOM proxy's supported
attribute read; the sheet was already inert. Forty-eight organization × theme × text-size ×
preview-width cases passed sheet/list/control horizontal bounds, at least 48px list area and
48px targets. Twelve actual portrait/landscape × organization × theme cases passed 200% bounds.
Both compositions were visually inspected; console queries empty. Syntax, local references,
unique IDs and diff checks passed. Evidence: `.gradle/design-pm-bubbles23-65-verification.json`,
`design-post-actions24-65-verification.json` and `design-post-actions24-65-{grouped,flat}.png`.
No native source, API/clipboard/share/report/download, Gradle/device, installation or Git
publication work. Browser fixtures do not establish complete action parity or Android
correctness/performance. Next: the numbered grouped/flat question; wait for the user's reply.

Revision 66 (2026-10-27) records grouped sections and reorderability as selected. The flat
comparison is retired; the ordering editor uses stable section/action IDs, Up/Down controls,
position announcements, focus retention, Done/menu preview and reset of the current fixture
account only. Twenty-four current interaction checks passed for section/action moves and
boundaries, eligibility hiding/restoration without lost positions, separate account buffers,
Guest reset isolation, retained Save state, keyboard activation/wrap/Escape and close/reopen.
Forty-eight surface × theme × 100%/200% × preview-width cases passed sheet/control horizontal
bounds, 48px targets and at least 48px scroll area. Twelve actual portrait/landscape × surface
× theme cases passed 200% bounds with Guest unavailable labels. Editor and reordered menu
captures were inspected; console query empty. Syntax/reference/unique-ID and diff checks
passed. Evidence: `.gradle/design-post-actions24-66-verification.json`,
`design-post-actions24-66-{editor,reordered}.png`. Scope across layouts, Settings location,
native persistence/backup/import and drag/accessibility mapping remain unimplemented/open.
No native source, Gradle/device, API, clipboard/share/report/download, installation or Git
publication work. Next: the numbered shared-account/per-layout ordering-scope question; wait
for the user's reply. Whole-app styling remains in progress; continue this chat.

Revision 67 records the selected More scope: one section/action order per active account,
shared across all feed layouts including saved custom layouts, with Guest separate. The
existing study 24 controller already keys ordering by fixture account only; its description
now matches that selection. This was a source/copy check, not native persistence or a new
cross-layout rendering test. Revision 66's interaction results above were not rerun.

Study 25 revision 67 drafts dedicated-screen versus bottom-sheet Report presentations from
the inspected native Activity/adapter/reason/rules/report helpers and post/comment callers.
Presentation remains unselected. Seventeen browser interaction checks passed for validation,
clearable single selection across groups, rules loading/empty/failure, target reset,
appearance/presentation retention, synthetic failure/success, keyboard focus wrap and Escape/
return. Twenty-four preview cases (two presentations × three themes × 100%/200% × narrow/
landscape dimensions) passed horizontal bounds, 48px buttons/rows and usable scroll area.
Four actual 360×800/720×480 viewport cases at 200% passed both presentations' page/panel
bounds, controls and scroll area. Screen/sheet captures were inspected; console errors/warnings
query empty. JavaScript syntax, local-reference/unique-ID and diff checks passed. Evidence:
`.gradle/design-report25-67-verification.json` and `design-report25-67-{screen,sheet}.png`.
No live reports/API, Android changes, Gradle/device tests, installation or Git publication.
Browser fixtures do not establish native behavior/performance. Next: ask the numbered Report
presentation question in chat and wait for the user's reply. Whole-app styling is in progress;
continue this chat, then remaining action/moderation/utilities and settings/accounts/onboarding.

Reporting research (2026-10-27) checked current Reddit Help, official 2020 inline-report and
2024 reporting announcements, the public report API and the existing `ReportThing` source.
DESIGN.md records sources, dates and category/explanation/conditional-detail/submit/confirmation
structure. Exact current Android pill styling/order was not independently verified; live
Reddit browser access showed a human-verification challenge, left untouched. No authenticated
flow or report submission occurred. Public API documentation specifies implicit hide for
reported links/comments, correcting any inference from the unchanged synthetic post. Native
side effects/reconciliation and official-app category mappings still need verification.
Only documentation changed for this research; earlier browser checks above were not rerun.
The category-first flow is now selected and demonstrated in revision 68 below; container
selection remains open.

Revision 68 records category pills → relevant details → Submit → confirmation as selected.
The combined-list comparison is superseded. Five sample categories, a Spam detail branch,
sample subreddit-rule choices and explanation-only general branches demonstrate the flow;
the precise taxonomy and native payload mappings are not established. Twenty-four browser
interaction checks passed for immediate category entry/focus, validation, clearable single
choices, Back/reopen retention, category/target reset, theme/presentation retention, missing
rules, failure retention, separate confirmation/Done and keyboard wrap/Escape/return. Forty-eight
entry/detail × theme × text-size × narrow/landscape preview cases passed horizontal bounds,
48px targets and usable scroll area. Eight actual portrait/landscape × entry/detail × container
cases passed at 200% text. Category-screen, category-sheet and Spam-detail captures were
inspected; console errors/warnings query empty. JavaScript syntax, unique HTML IDs, local
references and diff checks passed. Evidence: `.gradle/design-report25-68-verification.json`
and `design-report25-68-{categories,sheet,details}.png`. No native, Gradle/device, API/report,
installation or Git publication work. Whole-app styling remains in progress; continue this
chat. Next: numbered dedicated-screen versus bottom-sheet choice for this flow, then remaining
action/moderation/utilities and settings/accounts/onboarding; Android refinement stays later.

Revision 69 records the bottom sheet as selected for all Report stages. The screen comparison
and selector are retired; three fresh stage checks passed the sheet/retired-control contract,
and a legacy `presentation=screen` URL still opened a sheet. Revision 68's broader interaction
and responsive results were not rerun. Study 26 adds the Delete excerpt-versus-brief content
comparison from the inspected confirmation/caller/ViewModel/deletion-helper sources.
Fourteen browser interaction checks passed Cancel/Escape/no mutation, comparison contents,
failure retention, post-close/childless-comment removal/parent-with-replies outcomes, owner/
Guest eligibility and focus wrapping/return. Twenty-four theme × content × text-size ×
narrow/landscape preview cases and four actual portrait/landscape × content cases at 200%
passed horizontal bounds, 48px buttons and usable scroll area. Preview/brief captures were
inspected; both studies' console errors/warnings queries empty. An initial ambiguous test
locator stopped at two Delete buttons; scoping it to the dialog resolved the test without an
app change. Syntax/unique-ID/local-reference/diff checks passed. Evidence:
`.gradle/design-actions26-69-verification.json`, `design-delete26-69-{preview,brief,review}.png`.
No real deletion/report/API, Android/Gradle/device, installation or Git publication occurred.
Whole-app styling stays in progress; continue this chat. Next: numbered compact-excerpt versus
target-and-warning choice, then remaining action/moderation/utilities and settings/accounts/
onboarding. Native behavior, accessibility, performance and restoration remain later work.

Revision 70 records the compact post/comment excerpt as selected for Delete. Its brief
comparison/selector are retired. Fresh post/legacy-brief and comment checks passed visible
matching excerpts and absence of the comparison control; revision 69's broader suite was
not rerun. Study 27 drafts moderator primary full-width rows versus compact buttons from
the inspected post/comment sheets, layouts and entry callers. Fourteen browser interaction
checks passed 9/5 post/comment inventories, approved/removed/flair visibility, reverse toggle
labels, unchanged inventories across arrangements, Member/Guest/no-handler fixtures, route-only
dismissal and keyboard wrap/Escape/return. Twenty-four arrangement × theme × text-size ×
narrow/landscape preview cases and four actual portrait/landscape × arrangement cases at
200% passed horizontal bounds, 48px targets and usable scrolling. Rows/buttons captures were
inspected; console errors/warnings query empty. Syntax/unique-ID/local-reference/diff checks
passed. Evidence: `.gradle/design-moderation27-70-verification.json` and
`design-moderation27-70-{rows,buttons,review}.png`. No actual moderation/deletion/API, native,
Gradle/device, installation or Git publication. Whole-app styling remains in progress;
continue this chat. Next: numbered full-width versus compact-primary-action choice, then
remaining action/moderation/utilities and settings/accounts/onboarding. Native route/access,
state, restoration, accessibility and performance remain unverified.

Revision 71 records compact moderator primary buttons as selected. The full-width comparison
is retired; a fresh legacy-row URL check retained compact layout, no selector and nine normal
post actions. Inspected fragment/ViewModel removal paths dispatch without confirmation;
the added Remove/Spam confirmation is an unselected proposal, with Immediate as comparison.
Fourteen fresh browser interaction checks passed confirmation target/excerpt/Cancel focus,
background inertness, Cancel/Escape return, explicit route-only confirmation, target/access/
state invalidation, immediate behavior, unaffected Approve, theme retention and focus wrap.
Twenty-four action × theme × text-size × narrow/landscape confirmation cases and four actual
portrait/landscape × action cases at 200% passed bounds, 48px buttons and usable scroll area.
Sheet/Remove/Spam captures were inspected; console errors/warnings query empty. Syntax,
unique-ID/local-reference and diff checks passed. Revision 70's inventory/layout suite was
not rerun. Evidence: `.gradle/design-moderation27-71-verification.json` and
`design-moderation27-71-{sheet,remove,spam,review}.png`. No real moderation/API, native,
Gradle/device, installation or Git publication. Whole-app styling remains in progress;
continue this chat. Next: numbered confirmation-versus-immediate Remove/Spam choice, then
remaining action/moderation/utilities and settings/accounts/onboarding. Native behavior,
restoration, accessibility and performance remain implementation/verification work.

Revision 72 records confirmation for moderator Remove/Spam as selected and retires Immediate.
Fresh post/legacy-immediate and comment-Spam checks passed; revision 71's wider suite was not
rerun. Study 28 adds separate download rows versus one-entry/chooser proposals from the
inspected More download branches. Eighteen browser checks passed output availability, known/
unknown gallery position, GIF video variants, single-output direct routes, link empty state,
Guest context, chooser Back/Escape/reset, explicit no-download feedback and focus return/wrap.
Twenty-four theme/text-size/width × row/expanded-chooser cases and four actual portrait/
landscape cases at 200% passed bounds, 48px controls and usable scrolling. Row/entry/chooser
captures were inspected; both console queries empty; syntax, IDs/references and diff checks
passed. Evidence: `.gradle/design-download28-72-verification.json` and
`design-download28-72-{rows,entry,chooser,review}.png`. No real moderation, downloads, permission/
file/job actions, native/Gradle/device, installation or publication. Whole-app styling remains
in progress; continue this chat. Next: numbered download rows-versus-chooser choice, then
remaining media utilities and settings/accounts/onboarding; native correctness stays later.

Revision 73 records separate download rows as selected and retires the extra chooser.
Three fresh delta checks passed legacy-query retirement, direct gallery-all/focus return and
unknown-index availability; revision 72's full download suite was not rerun. Study 29 adds the
unselected paired Share/Copy versus labelled-row comparison, retaining source-dependent links
and image-sharing routes. Eighteen browser checks passed fixture availability, route-only
feedback, Guest reset, modal inertness, focus wrap/return, theme retention and Escape. Twenty-
four arrangement/theme/text-size/width cases and four actual portrait/landscape cases at 200%
passed bounds, 48px controls and usable scrolling; actual pages had no horizontal overflow.
Paired/row captures were inspected, both console queries empty, and syntax, unique IDs/local
references and diff checks passed. Evidence: `.gradle/design-share29-73-verification.json`
and `design-share29-73-{paired,rows,review}.png`. No clipboard writes, system sharing, comment
fetching, image/file export, downloads, native/Gradle/device, installation or Git publication.
Whole-app styling remains in progress; continue this chat. Next: numbered Share arrangement
choice, then remaining utilities and settings/accounts/onboarding. Android rendering, native
accessibility, restoration and performance remain unverified.

Revision 74 records paired Share/Copy beneath each URL as selected and removes the row
comparison. Three fresh delta checks passed selector/legacy-row retirement, media Copy route/
focus return and GIF video-variant pairs; revision 73's wider Share suite was not rerun.
Study 30 proposes inline versus dialog feedback for an unset download destination, with an
explicit route to existing Download locations and no automatic retry. Thirteen browser
interaction checks passed inline/modal behavior, destination labels, route-only Settings
feedback, Guest reset, theme retention, focus wrap/return and Escape. Twenty-four style/theme/
text-size/width cases and four actual portrait/landscape cases at 200% passed bounds, 48px
buttons and usable scrolling, without page horizontal overflow. Inline/dialog captures were
inspected; syntax, IDs/local references and diff checks passed. Evidence:
`.gradle/design-download-feedback30-74-verification.json` and
`design-download-feedback30-74-{inline,dialog,review}.png`. No folder/permission/preference,
job/notification, real download/retry, clipboard/share, native/Gradle/device, installation or
Git publication. Whole-app styling remains in progress; continue this chat. Next: numbered
missing-folder feedback choice, then remaining utility/result and external-opening review,
settings/accounts/onboarding and consistency. Native Settings return, lifecycle/accessibility
and storage/network correctness remain unverified.

Revision 75 records the inline missing-folder notice as selected and removes the dialog.
Three fresh delta checks passed legacy-dialog retirement, route-only Settings/focus return
and Dismiss with usable shell; revision 74's full setup-feedback suite was not rerun.
Service inspection preserves existing notification-owned progress/results without proposing
an HTML download manager or automatic retry. Study 31 compares a visible Open in browser
button with More placement, retaining current-URL and Back/Close distinctions as local
fixtures. Fifteen browser checks passed inventory/no duplicates, initial/current URL routes,
page change/focus, direct Close/history-first Back, Guest reset, inertness, focus wrap/return,
theme retention and independent website colors. Twenty-four placement/theme/text-size/width
cases checked both chrome and open menu, plus four actual portrait/landscape cases at 200%,
passed bounds, 48px buttons and usable scroll areas with no page horizontal overflow.
Chrome/menu captures were inspected; syntax, IDs/ARIA/local references and diff checks passed.
Evidence: `.gradle/design-browser31-75-verification.json` and
`design-browser31-75-{toolbar,more,review}.png`. No external page/WebView, browser launch,
clipboard/share, real reload, folder/job/notification, native/Gradle/device, installation or
Git publication. Whole-app styling remains in progress; continue this chat. Next: numbered
browser-action placement choice, remaining utility/result details and open post-edit placement,
then settings/accounts/onboarding and consistency. Native privacy/access, error handling,
restoration, accessibility and performance remain unverified.

Revision 76 records visible Open in browser as selected and retires its placement comparison.
Quick Copy access is required; visible Copy plus toolbar hold versus hold/More-only remains
open. Ten fresh browser checks passed retirement, visible/hidden Copy, current-URL Copy,
context-click/simulation routes, More/focus return, distinct external action and Guest reset.
Twenty-four Copy-access/theme/text-size/width chrome cases and four actual portrait/landscape
cases at 200% (chrome and menu) passed bounds, 48px controls and usable scroll areas without
page horizontal overflow. Captures were inspected; syntax, IDs/ARIA/local references and diff
checks passed. Evidence: `.gradle/design-browser31-76-verification.json` and
`design-browser31-76-{visible,gesture,review}.png`. The timed touch/pen hold and cancellation
were not exercised by the desktop context-click/simulation checks; native timing, haptics,
TalkBack gestures and clipboard remain unverified. Revision 75's full history/Close/menu suite
was not rerun. No clipboard writes, real browser/website/share, native/Gradle/device,
installation or Git publication. Whole-app styling remains in progress; continue this chat.
Next: numbered Copy-access choice, then remaining create/act and settings/accounts/onboarding.

Revision 77 records required Copy customization in Settings and replaces the workbench-only
comparison with two independent switches. Seventeen fresh browser checks passed More/direct
entry, independent visibility/hold states, both-off Copy fallback, enabled/disabled context-
click, panel reopening, local navigation, account/Guest isolation, theme retention, focus
wrap/return and Back/Escape. Twelve theme/text-size/width Settings cases and two actual
portrait/landscape cases at 200% passed bounds, 48px button/label targets and usable scrolling
without horizontal page overflow. Settings captures were inspected; syntax, IDs/ARIA/local
references and diff checks passed. Evidence: `.gradle/design-browser31-77-verification.json`
and `design-browser31-77-{settings,review}.png`. The prior toolbar/history suite was
not rerun; timed touch remains unverified. There were no native keys/storage, clipboard/external
sharing/browser, Gradle/device, installation or publication. Whole-app styling stays in
progress; continue this chat. Next: choose initial Copy settings, then remaining create/act,
settings/accounts/onboarding and consistency. Final category placement, migration/persistence
and native gesture/accessibility behavior remain later work.

Revision 78 records both browser Copy switches as enabled by default and still editable.
Fresh signed-in/Guest initial-state checks passed; revision 77's full Settings suite was not
rerun. Study 21's existing Edit post placement comparison is resurfaced without changing its
controller. Eight fresh browser checks passed original/inline entry, editor placement, fixed
title/body-only controls, unchanged Save/Close and changed Close/Keep editing/Discard behavior.
Twelve presentation/theme/width cases at 200% and four actual portrait/landscape cases at 200%
passed bounds, 48px buttons and usable scrolling without page horizontal overflow. Screen/
inline captures were inspected; syntax, IDs/ARIA/local references and diff checks passed.
Evidence: `.gradle/design-edit-post21-78-verification.json` and
`design-edit-post21-78-{screen,inline,review}.png`. Broader save/failure/eligibility/lifecycle
coverage was not rerun; no native/API, clipboard/browser launch, Gradle/device, installation
or Git publication. Whole-app styling remains in progress; continue this chat. Next: choose
Edit post placement, then assess remaining create/act details and proceed to Settings/accounts/
onboarding. Browser preferences/persistence and native post editing remain unimplemented by
these HTML studies.

Revision 79 records Edit post following the shared Reply/Edit style, Inline by default with
Separate screen available. Three fresh entry/alternate/explicit-screen checks passed; revision
78's wider editor suite was not rerun. Settings study 32 opens the next group with the 25-entry
source root inventory and brief-description versus title-only proposals. Eleven browser checks
passed grouping/order, descriptions, Security availability, route-only category/search/account
feedback, Guest reset and keyboard order. Twenty-four density/theme/text-size/width cases and
four actual portrait/landscape cases at 200% passed bounds, 48px controls and usable scrolling,
without page horizontal overflow. Both density captures were inspected; syntax, IDs/ARIA/local
references, all source inventory IDs/order and diff checks passed. Evidence:
`.gradle/design-settings32-79-verification.json` and
`design-settings32-79-{summary,titles,review}.png`. The existing preview processes had stopped;
restarted the localhost and docs-only tailnet servers with existing forwarding unchanged, then
verified the tailnet HTML in the browser. No native preferences/account/security/API-key,
search index, reset/import/export, Gradle/device, installation or Git publication changed.
Whole-app styling remains in progress; continue this chat. Next: numbered Settings row-density
choice, then detailed Settings/accounts/onboarding, tablet adaptation and consistency/native
verification of the documented provisional details.

Revision 80 records brief Settings category descriptions as selected and removes title-only
rows/selector. The next proposal compares a direct Feed layouts entry with Interface → Posts.
All 25 source root entries remain; direct mode adds one clearly proposed navigation row.
Sixteen fresh browser checks passed retirement, source-row retention, direct/nested paths,
shared family/saved destination, route-only feedback, Back/scroll/focus restoration, Escape,
theme retention, Security gates, Guest reset and cleared stack. Twenty-four placement/theme/
text-size/width cases checked every local path stage, and four actual portrait/landscape
cases at 200% passed bounds, 48px controls and usable scrolling without page horizontal
overflow. Root/nested captures were inspected; syntax, IDs/ARIA/local references, source
inventory/order and diff checks passed. Evidence:
`.gradle/design-settings32-80-verification.json` and
`design-settings32-80-{root,nested,review}.png`. Interface/Posts remain navigation excerpts,
not complete preference forms; layout-family/saved rows announce routes only. No native keys,
preferences/account/security/API changes, settings writes, Gradle/device, installation or Git
publication. Whole-app styling stays in progress; continue this chat. Next: numbered Feed
layouts entry choice, then detailed settings/accounts/onboarding, tablet and consistency work.

Revision 81 records nested Feed layouts as selected and removes the root comparison.
Three fresh checks passed retirement/25 described root rows, the complete nested path and
Back/origin focus. The section label remains Posts temporarily: the requested rename names
both Posts and Feed and Posts, so exact wording needs clarification. The prior theme/large-
text/viewport suite was not rerun. Syntax, IDs/ARIA/local references and diff checks passed;
the current nested capture was inspected. Evidence: `.gradle/design-settings32-81-verification.json`
and `design-settings32-81-review.png`. No native, preference/storage, Gradle/device or Git
publication changes. Whole-app styling remains in progress. Next: clarify the section label,
then continue detailed Settings/accounts/onboarding in this chat.

Revision 82 applies Posts and Feed to the Interface row and heading without changing native
identifiers. The new comparison shows synthetic saved layouts with the four families versus
a separate Saved layouts entry. Eleven browser interaction checks passed before a larger
layout batch timed out and lost its unreturned results. That incomplete batch is not a pass.
Reran bounded checks: twelve theme/width/access cases at 200% across the renamed parent and
landing/saved pages, plus four actual portrait/landscape cases, passed bounds, 48px controls,
usable scrolling and page overflow checks. Normal-size and both arrangement captures were
inspected; console query empty; syntax, IDs/ARIA/local references and diff checks passed.
Evidence: `.gradle/design-settings32-82-verification.json` and
`design-settings32-82-{section,together,separate,review}.png`. `page=layouts` is a review-only
entry with a local Back chain, not native deep-link/resume integration. Samples establish no
account/context ownership, persistence or layout application; Save as layout still requires
new copies. No native preferences/keys/API/account, Gradle/device, installation or Git
publication changed. Whole-app styling remains in progress; continue this chat. Next: numbered
saved-layout access choice, then detailed Settings/accounts/onboarding and consistency work.

Revision 83 records saved layouts below the four families as selected and retires the
separate-page route/comparison. Fresh browser checks confirmed the four-plus-two grouping,
route-only example feedback, parent Back/focus and the 25-entry Guest root. Six theme/width
cases at 200% passed content bounds, 48px targets and usable scrolling. The current capture
was inspected, console query was empty, and JS syntax/diff checks passed. Evidence:
`.gradle/design-settings32-83-verification.json` and `design-settings32-83-review.png`.
The broader revision 82 suite was not rerun. No native, preference/storage, Gradle/device,
installation or Git publication changes. Settings review remains active in this chat; next
choose live inline versus separate-screen layout-editor preview before building it.

Revision 84 records the live preview above controls, scrolling on the same page, as selected.
The focused Large card editor updates composition/surface/framing/toolbar position with accepted
defaults and a non-interactive sample. Verified initial hierarchy/defaults, four live changes,
comparison retention, Back/origin focus, re-entry, separate Guest defaults and signed-in buffer
retention, keyboard section expansion and route-only Save as layout feedback. Twelve grouping/
theme/width cases at 200% and four actual portrait/landscape viewport cases passed overflow,
target/scroll checks as applicable; the bundled image loaded. Console query empty. Current
normal capture inspected; JS syntax, HTML IDs/ARIA/local references and diff checks passed.
Evidence: `.gradle/design-settings32-84-verification.json` and `design-settings32-84-review.png`.
This does not rerun study 17's broader customization/library suite or native account/storage,
media/action policy, lifecycle, TalkBack, Gradle/device checks. No native, installation or Git
publication. Whole-app styling remains in progress; continue this chat. Next: numbered control-
grouping choice before extending the editor and remaining Settings/accounts/onboarding.

Revision 85 records all layout controls visible under section headings as selected; expandable
sections and their comparison selector are retired. Fresh checks confirmed all four controls
visible, section headings, live toolbar update, Back/origin focus and re-entry retention. Six
light/dark/AMOLED width cases at 200% passed bounds, 48px targets and usable scroll height.
The normal control capture was inspected; console query empty; syntax, HTML IDs/ARIA/local
references and diff checks passed. Evidence: `.gradle/design-settings32-85-verification.json`
and `design-settings32-85-review.png`. Broader account, viewport and library suites were not
rerun; no native/storage/API/Gradle/device, installation or Git publication. Whole-app styling
remains in progress in this chat. Next: choose preview-only until Use layout versus immediate
feed activation, separately from always-new-copy saving, before extending editor controls.

Revision 86 records preview-only edits until explicit Use layout as selected, separate from
new-copy saving. The HTML demo copies current controls into a separate selection snapshot only
on Use layout. Fresh checks confirmed initial/edit-only state, explicit selection, subsequent
edits leaving the snapshot unchanged, Save route not selecting, repeat Use, Back/focus/re-entry
and Guest/keyboard activation. Six theme/width cases at 200% passed bounds, 48px targets,
stacked actions and usable scroll height; two actual mobile portrait/landscape cases passed
page/content overflow checks. Console query empty. The action capture was inspected; JS syntax,
HTML IDs/ARIA/local assets and diff checks passed. Evidence:
`.gradle/design-settings32-86-verification.json` and `design-settings32-86-review.png`.
No real feed/default/context assignment, native storage, saved-copy write, API, Gradle/device,
installation or Git publication. Broader study 17 and native lifecycle suites were not rerun.
Whole-app styling remains in progress; continue this chat. Next: numbered unapplied-edit exit
policy choice before extending remaining controls and Settings/accounts/onboarding.

Revision 87 records Keep editing / Discard changes as selected and adds the requested feed-only
contextual sheet proposal. The shared editor supports new-copy naming before or after Use
layout, independent activation, temporary feed-sample appearance, collapse/expand and guarded
exits. Fresh browser checks covered live changes, collapse retention, Keep editing/Discard
rollback, saving after Use and before Use without selection, immutable saved copies, duplicate/
empty names, library/reopen behavior, header Back/Escape and app-bar interception, keyboard
focus/cancel and Guest copy isolation/root inventory. Eighteen sheet-state/theme/width cases
at 200% passed overflow, visible target and footer/body bounds; two matching actual mobile
window cases at 200%, two focused-mode cases at 100%, and two large-text dialog widths passed
relevant bounds checks. Console query empty. Collapsed, expanded, balanced and discard captures
were inspected; JS syntax, HTML IDs/ARIA/local assets and diff checks passed. Evidence:
`.gradle/design-settings32-87-verification.json` and `design-settings32-87-{sheet,collapsed,
expanded,discard}.png`. The latest dialog width was rechecked separately after constraining it
to the preview phone. Focused mode has not been separately run at 200%; the large-text cases
used the full workbench. Drag gestures, IME/TalkBack, native feed/media/lifecycle/anchors and
performance are unverified. No Android preferences, API/feed assignment, durable storage,
Gradle/device, installation or Git publication. Whole-app styling remains active in this chat;
next clarify post-details contextual-sheet scope before building that context.

Revision 88 requires the feed to scroll independently while the editor sheet is open. Fixed
its scroll viewport to the exposed region rather than the full phone, removed hidden app-bar
padding while editing and added four consistently styled image/text posts. Fresh browser wheel
checks moved the feed without moving controls, and controls without moving the feed. Verified
all-post live surface updates, collapse/reopen retention, keyboard scrolling, last-post visibility
above the sheet, rollback on Discard, normal viewport reset and keyboard access after closing.
Twelve theme/text/width combinations checked balanced and collapsed states: exposed feed bounds,
scroll range, targets and overflow passed; covered large-text feed was correctly inert until
collapsed. Two focused actual portrait/landscape cases passed exposed bounds/overflow checks.
Runtime IDs/ARIA references, console, syntax, local assets and diff checks passed. The scrolled
feed capture was inspected. Evidence: `.gradle/design-settings32-88-verification.json` and
`design-settings32-88-review.png`. Browser scroll pixels do not prove native anchor restoration,
touch arbitration, media/paging, IME or TalkBack correctness. The broader new-copy/account suite
was not rerun. No native/API/storage, Gradle/device, installation or Git publication changed.
Whole-app styling remains active in this chat. Next: review independent scrolling and extend
remaining visibility/order/spacing controls; post-details scope stays deferred without a choice.

Revision 89 adds six study 17 parameters to the shared Large card editor: title/info order,
author/flair/age visibility, content padding and post gaps. Fresh checks confirmed all four
posts update, zero gap removes inter-card space, title/info DOM reading order and separators,
Use layout includes all ten fields, later edits leave selection unchanged, Discard restores
new fields, and saved copies reopen unchanged after a different selection is applied. Guest
copies/defaults remained separate. Twelve theme/text/width cases with roomy padding and all
information shown passed overflow, controls/48px targets, footer and usable-body checks. Two
actual mobile window cases at 200% and the Settings route with two samples at narrow/200%
passed relevant bounds; runtime IDs/ARIA references, console, JS syntax, static local assets and
diff checks passed. Feed-wheel scrolling moved only the feed after the new controls were added.
Information and spacing captures were inspected. Evidence:
`.gradle/design-settings32-89-verification.json` and `design-settings32-89-{review,spacing}.png`.
Exact new defaults/preset dimensions and grouping remain proposals. Broader library validation,
native storage/account/context mappings, IME/TalkBack, media/paging/anchors and performance were
not rerun or established; no Gradle/device, native, installation or Git publication changes.
Whole-app styling remains active in this chat; next integrate individual toolbar action
visibility/order and width-aware More from study 17, then remaining text/media/column controls.

Revision 90 adds toolbar action visibility/priority and study 17's measured one-row fitting
to the shared editor. Eleven presentation fields participate in Use layout/new-copy snapshots.
Fresh browser checks covered checkbox and Up/Down moves, focus retention/visibility, apply,
subsequent edits, Discard, immutable saved-copy reopening, More-only state, all seven actions
remaining reachable, More Escape/focus wrapping, Guest sign-in routing and actual Guest-copy/
default isolation. Narrowing hid a focused Share and moved focus visibly to More; widening
restored desired priorities unchanged. Twelve theme/text/width cases with all actions enabled
and roomy padding passed toolbar/body bounds, More availability, visible targets and usable
scroll checks. Two actual mobile window cases at 200%, and final grouped-More checks at two
large-text widths passed relevant bounds. Runtime IDs/ARIA references and console were clean.
Toolbar/More captures inspected; syntax, static HTML/local assets and diff checks passed.
Evidence: `.gradle/design-settings32-90-verification.json` and
`design-settings32-90-{review,more}.png`. The seven-action grouped More fixture is not study 24's
complete menu/order implementation. Action buttons announce routes only; no API/read/vote/save,
clipboard, browser or share operation occurs. No native preference/account/context persistence,
IME/TalkBack/media/anchor/performance proof, Gradle/device run, installation or Git publication.
The user accepted the preceding feed-sheet and information/spacing direction at HTML level;
new toolbar placement remains for review. Whole-app styling stays active in this chat. Next:
text-post excerpts and media-height limits, then adaptive columns and remaining Settings work.

Revision 91 adds the requested User/Subreddit toolbar choices and explicitly identifies More
options as fixed-last/always available. The catalog now has nine choices; desired defaults
are unchanged. Fresh browser checks confirmed enabling/reordering both new IDs, per-post route
targets despite hidden author metadata, a different post targeting a different author, Use/
save/reopen/Discard retention, and all nine actions in More. Six theme/width cases at 200%
passed controls/48px targets, toolbar bounds and More availability; two actual mobile window
cases and the nine-action More sheet at narrow/200% passed relevant bounds/scroll checks.
Runtime IDs/ARIA references and console were clean; the enabled-example capture was inspected.
Syntax, static HTML/local assets and diff checks passed. Evidence:
`.gradle/design-settings32-91-verification.json` and `design-settings32-91-review.png`.
The screenshot enables/promotes the new entries as an example; it does not change the desired
default set. Routing is still a proposal: profile/subreddit page versus user/subreddit actions
menu requires a numbered reply. “Options” is interpreted as existing More. No actual profile/
subreddit navigation, menu/API action, native settings/storage, Gradle/device, installation or
Git publication occurred. Broader Guest/library/lifecycle and native accessibility suites were
not rerun. Whole-app styling remains active; clarify the two routes next, then resume excerpts,
media-height limits and adaptive columns.

Revision 92 records direct profile/subreddit page routing as selected and defers icon artwork,
selection and sizing to Android implementation. Existing glyphs were not refined. The editor
adds excerpt length and Fit-media height limits to thirteen-field snapshots. Fresh browser
checks measured Hidden/2/4/Full text without hiding titles, all height presets preserving contain,
Square remaining square with its limit disabled/retained, return-to-Fit restoration, Use/Discard
and immutable copy reopening with a different active selection. The route announcements now
explicitly say Open profile/Open subreddit with the correct target; no navigation occurred.
Twelve theme/text/width cases passed clamp/contain/target/overflow checks; an initial inspection
helper incompatibility returned no completed batch and was resolved before the compatible rerun.
Two actual mobile window cases at 200% passed overflow checks. The review-only text positioning
flag, reserved image ratios, runtime IDs/ARIA references, console, syntax/static references and
diff checks passed; the two-line comparison capture was inspected. Evidence:
`.gradle/design-settings32-92-verification.json` and `design-settings32-92-review.png`.
Full text/No limit preserve the prior sample baseline, not an approved new default. Fit-only
height applicability and preset units remain proposals. Native Markdown/AT behavior, video/GIF
and provider policy, restoration/performance/account persistence remain unverified; broader
Guest/More/library-validation suites were not rerun. No native/Gradle/device, installation or
Git publication. Whole-app styling remains active in this chat. Next: choose the Large card
text-body default, then media-limit defaults/applicability and adaptive columns.

Revision 93 selects **2 lines** as the Large card text-body default and applies it to fresh
HTML editor state; 4 lines, Full text and Hidden remain available. Fresh browser checks across
Light/Dark/AMOLED at 100% and 200% (390/360 fixture widths) confirmed the selected default,
two-line body height, visible titles, retained alternatives and no horizontal content overflow.
The focused two-line screenshot was inspected. Syntax and diff checks passed. Evidence:
`.gradle/design-settings32-93-verification.json` and `design-settings32-93-review.png`.
This narrow default change did not rerun the earlier full copy/More/Guest/media suites or
native/device/Gradle checks. No native preferences, identity or Git publication changed.
Whole-app styling remains in progress. Next: decide the media-height default, then its
applicability/dimensions, adaptive columns and remaining Settings review. Continue this chat.

Revision 94 adds an isolated media-height comparison using a shared tall SVG illustration,
a provisional 320px cap and width-led natural height. At desktop comparison width, measured
image heights were 320px versus 698px; a wide-photo toggle stayed equal in both examples.
Six theme/text cases (Light/Dark/AMOLED, 100/200%) passed contain and horizontal-overflow
checks; the 360px/200% mobile view stacked examples without overflow. Keyboard End reached
the following post in one feed while leaving the other at the top. An initial immediate
scroll inspection sampled an unfinished keyboard scroll; the settled check passed. Runtime
console, syntax, static local references and diff checks passed. The final comparison capture
was inspected. Evidence: `.gradle/design-media-height94-verification.json` and
`design-media-height94-review.png`. This fixture does not select a default or alter the
Settings editor/account state. No Android/Gradle/device verification or Git publication.
Whole-app styling remains active; decide the media-height default next, then its final cap
and applicability. Continue this chat.

Revision 95 records No limit as the selected Large card media-height default, with optional
height limits in Settings. The fixture default was already `none`; labels/help now make the
distinction explicit and the comparison identifies the selection. Fresh browser checks passed
initial No limit selection, switching to a contained 200px cap and back to No limit, and explicit
Use layout retaining the thirteen-field snapshot with `mediaheight: none` and `excerpt: 2`.
Console, syntax and diff checks passed; the Settings capture was inspected. Evidence:
`.gradle/design-settings32-95-verification.json` and `design-settings32-95-review.png`.
The change did not rerun the broader theme/Guest/library/media suites or Gradle/device checks.
No native changes or Git publication. Next: adaptive columns; whole-app styling stays active.

Revision 96 integrates preferred/effective columns in the shared Large card editor and
fourteen-field snapshots. Eight browser width/text cases (360/720/840/1280, 100/200%, cycling
Light/Dark/AMOLED) passed expected fallback/restoration, retained preferred count, clean applied
state, card/toolbar overflow and minimum action-target checks. An actual 360px window also
fell back despite the 840px fixture preference; focus moved from the disabled picker to its
explanation. Use/Discard restored two columns, Guest started separately at one, and a saved
two-column copy reopened intact after applying a different one-column selection. The wider
collapsed-sheet feed remained scrollable and the review capture was inspected. Console,
syntax and diff checks passed. Evidence: `.gradle/design-settings32-96-verification.json`
and `design-settings32-96-review.png`. No native/Gradle/device checks, persistence migration,
Git publication or tablet-shell implementation. Next numbered reply: **1 = Two columns when
readable space permits (recommended); 2 = One until the user enables two.** Existing values
must still be preserved. Whole-app styling remains in progress; continue this chat.

Revision 97 selects a fresh Large card preferred count of two; fresh browser checks confirmed
two at an 840px fixture and one in an actual 360px window while retaining the preference.
Revision 98 adds a focused Compact thumbnail comparison using the existing study 17 bridge,
with no new Compact editor/state owner. Twelve placement/theme/text cases passed left/right
position, equal 64px thumbnails, Filled surface, collapsed toolbar and feed overflow checks.
At actual 360px/200%, stacked examples and both feeds passed overflow checks; AMOLED resolved
to black. Shift+F10 revealed the existing toolbar and More, then returned to collapsed state.
Console, syntax/local-reference and diff checks passed; the side-by-side capture was inspected.
Evidence: `.gradle/design-compact98-verification.json` and `design-compact98-review.png`.
Broader lifecycle/menu/library and native/Gradle/device suites were not rerun; no Git publication.
Next numbered reply: **1 = Left thumbnail (recommended); 2 = Right**. Whole-app styling remains
active; the shared Compact Settings editor, other families and detailed Settings review remain.

Revision 99 selects Right as the Compact thumbnail default, retaining Left and Hidden in
Settings. Fresh browser checks confirmed the family workbench and direct study 17 entry both
start Right; Left/Hidden/Right switching changed placement/visibility correctly while keeping
Filled and the 64px example. The selected-default capture was inspected. Console, syntax and
diff checks passed. Evidence: `.gradle/design-compact99-verification.json` and
`design-compact99-review.png`. No new layout schema/state store, native preference migration,
Gradle/device checks or Git publication; the broader theme/accessibility suite was not rerun.
Next: integrate Compact controls with the shared Settings/contextual editor. Whole-app styling
remains active; continue this chat.

Revision 100 integrates Compact into the shared Settings/contextual editor, reusing study 17
rather than rebuilding its rows. Compact's twelve-field and Large's fourteen-field snapshots
are partitioned by fixture account/family. Browser checks passed Right/Left/Hidden and retained
size, surfaces, metadata order/visibility, hidden/always toolbar, all nine action IDs and width
fitting, User profile announcements without read changes, keyboard reveal/tap collapse, Use,
new-copy/reopen and Discard. Saved Compact copies stayed intact after applying other choices;
Guest had no signed-in copies, defaulted independently and requested sign-in for votes. Large
retained its separate selected defaults. Feed scroll offset survived a surface edit, shared
navigation hid down/reappeared up, and six theme/text/width cases passed feed/form overflow
and primary-target checks. An actual 360px/200% case passed form overflow, inert covered-feed
handling and collapsed-feed access. Runtime IDs/ARIA references, syntax/local references and
diff checks passed; the Compact capture was inspected.

**Unresolved browser diagnostic:** intermittent `MutationObserver.observe` exceptions occur
while preview frames are replaced/inspected. Some fresh reload/account-switch cycles were
clear, but later cycles reproduced the exception. Temporary page-owned observer diagnostics
in parent/navigation/feed documents did not capture its stack, so its origin is not established;
do not claim a clean console or a confirmed application/tooling cause. Those hooks were removed.
The shared shell now waits for a body to install its observer and the Compact frame is revealed
only when ready; all functional checks above still passed. Native/browser tooling investigation
is separate from the open control-group design choice. Evidence:
`.gradle/design-settings32-100-verification.json` and `design-settings32-100-review.png`.
No Android/Gradle/device checks, new native store/migration, icon refinement or Git publication.
Whole-app styling remains active. Next numbered reply: **1 = Thumbnails first (recommended),
2 = Appearance first**, then Vertical swipe/Gallery editors and detailed Settings review.

Revision 101 records Compact Thumbnails-first as selected and adds Gallery to the shared
editor with seven family-scoped presentation fields and a media-title comparison. Browser
checks passed 7 media tiles versus 10 All-post tiles (3 readable non-media tiles), zero versus
seven captions, two-column Fit/Square framing, axis selection, Use/save/Discard and immutable
copy reopening; Guest retained a separate initial caption setting. Compact's Thumbnails/Right/
hidden-toolbar and Large's columns/text/media defaults remained intact. Six theme/text/width
cases passed Gallery/form overflow and retained two columns; the actual 360px/200% comparison
stacked safely and both frames kept two columns and accessible tile names.

Initial viewer interaction exposed duplicate inner navigation and reached Profile; suppressing
that inner bar in the settings/grid excerpt fixed the interaction. Rechecks passed caption
entry with controls initially hidden, next-post entry to album image 1/2, ArrowRight paging
to image 2/2, and Back retaining the current album tile in view. This is browser interaction
evidence, not native gesture/playback/history/restoration verification. The existing intermittent
observer exception recurred twice during this run; its origin remains unresolved and no clean
console result is claimed. Syntax, local references and diff checks passed; the final comparison
capture was inspected. Evidence: `.gradle/design-gallery101-verification.json` and
`design-gallery101-review.png`. No native/Gradle/device, identity or Git publication changes.
Revision 102 selects Media only and removes grid More. Real 650ms pointer holds opened the
correct scoped details route; release did not open media. Short taps opened media with controls
hidden. Shift+F10, right click and the 48px focus-visible details action reached the same target.
A drag initially opened media on release; after adding Gallery-specific movement suppression,
the repeated drag retained all seven grid tiles with no viewer/dialog. Horizontal keyboard paging
entered the next post's album and then image 2/2; return retained the grid. Six 360px theme/text
cases (Light/Dark/AMOLED at 100/200%) retained two columns with no grid overflow, captions or
More; optional captions still showed seven titles with zero More in the shared editor. Static
syntax/reference/diff checks passed. The existing observer exception recurred once in this run;
its cause remains unresolved, so no clean-console claim. Evidence: ignored
`.gradle/design-gallery102-verification.json` and `design-gallery102-review.png`.
No Android/Gradle/device or Git publication. Whole-app styling remains active; revision 103 below continues with the
Vertical swipe editor proposal and remaining Settings reviews.

Revision 103 audits existing Video/Data Saving Mode preferences and adds a two-field Vertical
framing editor proposal. Photo/album and video/GIF Fit/Fill were independently previewed;
vertical post and horizontal album keyboard paging remained functional. Use and named-copy
saving passed; Back reopened the immutable photo-Fill/video-Fit copy. Guest showed no such
copy and started Fit/Fit. Discard restored the applied snapshot. Collapse exposed a usable
viewer region; Video settings announced its existing category without changing policy.
Six 360px Light/Dark/AMOLED × 100/200% cases had no panel/body horizontal overflow, with
Use/Save targets at least 48px high. Gallery retained seven tiles, hidden captions and no
More; Compact retained Right thumbnails and its hidden toolbar. Syntax, local references
and diff checks passed. The known observer exception recurred; its cause remains unresolved.
Evidence: ignored `.gradle/design-vertical103-verification.json` and
`design-vertical103-review.png`. Native/Gradle/device checks and Git publication were not run.
Separate framing was subsequently selected; revision 104 below continues detailed Video
review. Whole-app styling remains active and this chat remains suitable.

Revision 104 records separate Vertical framing as selected and adds the Video category
proposal. Static source parity confirmed all 18 keys, defaults, list values and account scopes;
slider min/step are also source-backed. Browser checks passed switch/keyboard, select and
percentage updates, Back/re-entry retention and Guest isolation. Vertical-to-Video entry
invoked Keep editing/Discard when dirty; after Use, Back returned to the editor/draft and
triggering row. Twelve cases across 360/720px, Light/Dark/AMOLED and 100/200% text had no
horizontal overflow, no unnamed controls and all targets at least 48px. Final visual checking
confirmed readable label columns (217px minimum at the narrow size) after correcting a
row/button style collision. The existing observer
exception recurred; no clean-console or native restoration claim. Syntax, changed local
references and diff checks passed. Evidence: ignored `.gradle/design-video104-verification.json`
and `design-video104-review.png`. No Android source, Gradle/device run or Git publication.
Whole-app styling remains in progress. Video single-page organization was subsequently selected; revision 105 below continues the
remaining detailed Settings/accounts/onboarding review.

Revision 105 records the Video organization decision and adds Data Saving Mode using the
shared control renderer. Static source parity confirmed six keys/defaults/options and global
scope. Browser checks passed all five disabled while Off, enabling for Cellular/Always,
preview-switch mutual exclusion in both directions, quality retention through Off and across
account/Guest switches, and Back re-entry. The hidden comparison showed one control while
Off and six while On. Vertical entry invoked the dirty guard; Discard and Back restored the
editor/rolled-back draft and triggering row. Video retained 18 controls and switch/list values
after Back. Twenty-four cases across 360/720px, three themes, 100/200% text and Off/Always had
no overflow, narrow label collapse or undersized controls. Syntax/reference/diff checks passed.
The known intermittent embedded observer exception recurred during the editor-navigation
check; its cause remains unresolved and no clean-console claim is made. No native, Gradle/device or Git publication.
Evidence: ignored `.gradle/design-data105-verification.json` and `design-data105-review.png`.
Whole-app styling remains active; Data Saving inactive visibility was subsequently selected; revision 106 continues Gestures &
Buttons and the remaining Settings/account/onboarding reviews. Continue this chat.

Revision 106 records Data Saving Mode disabled-while-Off as selected and retires its hidden
comparison. The Media gestures excerpt retains the source image/GIF switch/default/account
scope; Back/re-entry kept its local value, while Guest started separately at On. Twelve
360/720px × three-theme × 100/200% cases had readable labels, named controls, at-least-48px
height and no overflow. The old Data Saving `inactive=hidden` query now showed all six controls
with five disabled. An unchanged Vertical viewer keyboard check kept the first post/viewer on
Previous and moved to the next post on Next; this is not touch/native Back verification.
Syntax/reference/diff and source-key/default/scope checks passed. The known intermittent
embedded observer diagnostic remains unresolved; current console output is saved locally.
No native source, Gradle/device run or Git publication. Evidence: ignored
`.gradle/design-gestures106-verification.json` and `design-gestures106-review.png`.
The mode-specific exit behavior was subsequently selected and is reflected in revision 107
below. Whole-app styling remains in progress; continue remaining gesture groups and Settings/accounts/onboarding. This chat remains suitable.

Revision 107 records the user's mode distinction and updates shared HTML pointer handling.
Real pointer drags closed a normal Compact thumbnail preview and Horizontal Gallery, retained
Horizontal media with the close preference Off, and retained zoomed media. Vertical mode stayed
at the first post on downward drag and advanced on upward drag. Gallery Vertical likewise stayed
at the start, then paged into the next post's album and through its second image. Settings' Off
account preference reached the embedded Compact preview and blocked downward close. The close
flag is not an editor field or saved-layout property. Responsive/theme/large-text checks, source
key/default/scope, syntax/reference/diff checks and the inspected final capture are recorded in
ignored `.gradle/design-media107-verification.json` and `design-media107-review.png`. The known embedded observer exception recurred twice during this run;
console output is in that local evidence and its cause remains unresolved. No native, Gradle/device or Git publication. Whole-app styling stays active; next
revision 108 below continues General controls and the remaining Settings/accounts/onboarding reviews in this chat.

Revision 108 adds General's seven source-backed gesture controls with Navigation/Bars/Volume
keys grouping. Static parity checks confirm the seven native keys/defaults/account scopes.
Browser Space toggles and Back/re-entry retention passed; visiting Media did not overwrite
General values, and Guest retained separate source defaults. Twelve 360/720px × three-theme ×
100/200% cases retained all seven named controls, readable labels, at-least-48px targets and
no horizontal overflow. Syntax/reference/diff checks passed and the volume-group capture was
inspected. Native pager/bar/hardware-volume behavior and full swipe-action coupling remain
unverified; the original observer diagnostic remains unresolved. Current console output is
saved with ignored `.gradle/design-general108-verification.json` and
`design-general108-review.png`. No Android/Gradle/device or Git publication. Whole-app styling
volume placement was subsequently selected; revision 109 continues sensitivity/remaining gesture groups. This
chat remains suitable for the current review milestone.

Revision 109 records the volume placement decision and adds four sensitivity menus with a
three-step slider comparison. Source checks passed four keys/defaults/enum strings/account
scopes and slider index mappings; syntax/local references/diff checks passed. Browser access
is disabled in Work settings, so visual, responsive, themes, keyboard and interaction checks
were not run. Do not present the historical revision 108 results as current verification.
The existing docs-only preview server was stopped; it was restarted behind the unchanged
Tailscale route. Local and tailnet HTTP checks returned 200 with revision 109 assets. No route,
firewall, identity, native preference or app behavior change; no Gradle/device or Git publication.
Evidence: ignored `.gradle/design-sensitivity109-verification.json`; no new screenshot exists.
The earlier embedded observer exception remains unresolved. Whole-app styling stays active;
three-step sliders were subsequently selected; revision 110 continues remaining gesture and Settings/accounts/onboarding
reviews in this chat. Browser verification should resume when access is available.

Revision 110 records three-step sliders as selected and makes them unconditional in the
sensitivity renderer, retaining native enum values/defaults. Comments adds three source-backed
fields, with named collapse behavior versus source Swap switch as a comparison. Static checks
passed three keys/defaults/account scopes, boolean choice mapping and absence of duplicate
volume controls; syntax/local references/diff checks passed. Both Comments pages and the script
returned HTTP 200 through the unchanged Tailscale preview. Local browser access remains disabled;
visual, responsive, theme, keyboard, conditional interaction and account-restoration checks were
not run. Do not reuse historical browser checks as current verification. Evidence: ignored
`.gradle/design-comments110-verification.json`; no screenshot. Earlier observer diagnostic
remains unresolved. No native source/preference changes, Gradle/device run or Git publication.
Whole-app styling remains active; named touch choices were subsequently selected; revision 111 continues post gestures/swipe
actions and remaining Settings/accounts/onboarding. Continue this chat; resume browser checks
when access becomes available.

Revision 111 records named comment touch choices as selected and retires the Swap comparison.
Post gestures now exposes two shared source preferences plus layout-specific guidance/editor
links, with selector/all-sections comparisons. Static checks passed two native keys/defaults/
options/account scopes, no duplicate volume controls and selected Comments rendering; syntax/
local references/diff checks passed. Both Post pages and current script returned HTTP 200 on
the unchanged Tailscale preview. Browser access remains disabled, so visual/responsive/theme,
keyboard/account retention and new editor Back/guard checks were not run. No screenshot exists;
ignored evidence is `.gradle/design-posts111-verification.json`. Earlier embedded observer issue
remains unresolved. No native/schema/identity changes, Gradle/device run or Git publication.
Whole-app styling remains active; the layout selector was subsequently selected. Continue
with swipe-action side organization and remaining Settings/accounts/onboarding in this chat.

Revision 112 selects Post gestures' layout selector and retires its all-sections override.
Swipe actions now has a shared-behavior page plus separate post/comment forms; both-sides
sections versus a compact side selector is pending. Static parity checks passed all 19 source
keys/defaults/list values/account scopes (3 shared, 9 post, 7 comment); JS syntax, local asset
references and diff checks passed. Both post comparisons, the comment page and current script
returned HTTP 200 through the existing preview. Browser discovery still reports local browser
use disabled in Work settings: visual/responsive/theme, keyboard, account retention and Back
checks were not run. No screenshot exists; evidence is `.gradle/design-swipe112-verification.json`.
The earlier observer diagnostic remains unresolved. No native changes, Gradle/device run or
Git publication. Whole-app styling remains in progress; both side sections were subsequently selected.
Continue Fonts and detailed Settings/accounts/API access/themes/onboarding in this chat.

Revision 113 records both swipe-action side sections as selected and retires the selector
and its fixture view state. Fonts now opens six source-backed lists in General/Titles/Content,
with three conditional custom-file route placeholders. Inline versus separate Preview is
pending; samples show approximate sizes only, without bundled/custom Android fonts. Static
checks passed all six defaults/list values/labels, nine account-scoped keys, 17 family choices,
retired swipe override handling, local references and JS syntax; diff checks passed. Both Fonts
variants, the Preview route and current script returned HTTP 200. Browser access remains
disabled in Work settings, so no visual/responsive/theme, keyboard, account retention or Back
verification was run; no screenshot exists. Evidence is `.gradle/design-fonts113-verification.json`.
The earlier observer diagnostic remains unresolved. No native changes, Gradle/device run or Git
publication. Whole-app styling is still active; the Fonts inline sample was subsequently selected.
Continue drawer controls and remaining Interface/detailed Settings/accounts/API access/themes/
onboarding in this chat.

Revision 114 selects Fonts' sample above the controls and ignores the retired comparison
query. Navigation drawer now opens a fourteen-Boolean source-backed form with Account header,
Sections and Quick toggles groups. Section selectors versus separate source switches is pending;
only the two existing subreddit hide keys can produce Hidden. Static key/type/default and
whole-file account-scope checks, six-collapse/two-hide mapping checks, JS syntax/local references
and diff checks passed. Both drawer variants, Fonts and the current script returned HTTP 200
through the existing preview. Browser discovery still reports local browser use disabled in
Work settings, so visual/responsive/theme, keyboard, account retention and Back checks were
not run; no screenshot exists. Evidence is `.gradle/design-drawer114-verification.json`. The
shared drawer fixture is unchanged; native events/persistence are not exercised. Earlier observer
diagnostic remains unresolved. No native changes, Gradle/device run or Git publication.
Whole-app styling remains in progress; drawer section selectors were subsequently selected.
Continue Home feed tab placement and remaining Interface/detailed Settings/accounts/API access/
themes/onboarding in this chat.

Revision 115 records drawer section selectors as selected and retires the switch override.
Home feed tabs now compares an inline ordered list with the source's separate Edit tabs path.
Seven source switches and the three initial record IDs/account-keyed list contract passed
static parity checks; syntax, local references and diff checks passed. Up/Down orders fixture
records; Add/Options and live source merging remain unimplemented route/data boundaries.
Explicit control attributes also fix a source-inspected DOMStringMap construction issue for
hyphenated swipe/tab prefixes; browser runtime confirmation is still unavailable. Both tab
variants, the separate editor route and current script returned HTTP 200. Browser access
remains disabled in Work settings, so visual/responsive/theme, keyboard, order/account retention
and Back checks were not run; no screenshot exists. Evidence is
`.gradle/design-hometabs115-verification.json`. Native restart and account copy/reset semantics
remain source requirements, not simulated behavior. The prior observer diagnostic remains
unresolved. No native changes, Gradle/device run or Git publication. Whole-app styling remains
in progress; the inline tab list was subsequently selected. Continue Add tab chooser organization,
then follow-up fields/Options and remaining Interface/detailed Settings/accounts/API access/
themes/onboarding in this chat.

Revision 116 selects the inline Home feed tab list and retires its comparison query. Add tab
now opens a grouped-choice bottom-sheet proposal with a flat source-order comparison. Static
checks passed all sixteen labels/order, five Guest exclusions (eleven remaining), retired-query
handling, modal labels/underlying Escape guard, JS syntax/local references and diff checks.
Both chooser links and both current scripts returned HTTP 200. Selection only announces its
next route; actual adding, follow-up entry/pickers and Options are not implemented by this slice.
Browser discovery still reports local browser use disabled in Work settings: visual/responsive/
theme, large-text, modal scroll/focus/keyboard and account/Back checks were not run; no screenshot
exists. Evidence is `.gradle/design-addtabs116-verification.json`. Native IDs, source records,
Guest gates, duplicate/delete rules, restart and persistence contracts remain untouched; prior
observer diagnostic remains unresolved. No native changes, Gradle/device run or Git publication.
Whole-app styling is still in progress; grouped Add choices were subsequently selected.
Continue name-entry presentation, then pickers/Options before remaining Settings/accounts/API
access/themes/onboarding in this chat.

Revision 117 selects the grouped Add tab chooser and ignores its retired flat-list query.
Subreddit/User/User multireddit now have same-sheet versus centered-dialog name-entry proposals,
source type IDs 3/5/4, blank/duplicate submit guards and page-memory account list appends only.
Ten pure-helper cases passed for case-insensitive/type-separated duplicates, group-source
duplicate identity, trimmed records, prefix retention, distinct row identity and multireddit
label/fallback handling. Source mappings, retained choice counts, JS syntax/local references
and diff checks passed. Both Subreddit variants, the multireddit link and current script returned
HTTP 200. Browser access is still disabled in Work settings: no visual/theme/large-text,
modal keyboard/focus/scroll, account retention or Back interaction verification was run; no
screenshot exists. Evidence is `.gradle/design-addtab-name117-verification.json` and its ignored
pure-helper check script. Those checks do not exercise a DOM or establish native correctness.
Other Add choices/pickers and Options remain route previews; restart/persistence/API behavior
is unchanged. Prior observer diagnostic remains unresolved. No native changes, Gradle/device
run or Git publication. Whole-app styling stays in progress; same-sheet name entry was subsequently selected.
Continue picker filtering, then Options and remaining Interface/detailed Settings/accounts/
API access/themes/onboarding in this chat.

Revision 118 selects same-sheet name entry and retires its dialog override. Subscribed-
subreddit and owned-multireddit fixture pickers now compare a visible local filter with a plain
list; tap adds source-USER records, duplicates are disabled, and empty/no-match states differ.
Ten pure-picker helper cases passed, plus source record/scope-boundary, syntax, local-reference
and diff checks. Both subscription variants, Multireddit, empty state and script returned HTTP
200. Browser access remains disabled in Work settings: no visual/theme/large-text, focus/scroll,
keyboard, account retention or Back checks were run. Evidence is
`.gradle/design-tabpickers118-verification.json` and its ignored helper script. No screenshot,
native changes, Gradle/device run or Git publication; earlier observer diagnostic is unresolved.
Whole-app styling remains active; visible picker filtering was subsequently selected. Continue
tab Remove placement, then bottom navigation and remaining Interface/detailed Settings/
accounts/API access/themes/onboarding in this chat.

Revision 119 selects visible picker filtering and retires its plain-list override. Tab Options
now compares Remove inside the sheet with the source-style visible row action; Rename,
conditional Reset, boundary moves, user-only removal and last-tab guards are preserved in
fixture helpers. Twelve focused helper cases passed, plus source/syntax/local-reference and
diff checks. Options, row comparison, last/group guard pages and current script returned HTTP
200. Browser access remains disabled in Work settings: visual/theme/large-text, modal focus/
scroll, keyboard, account retention and Back were not verified. Evidence is
`.gradle/design-taboptions119-verification.json` and its ignored helper script; no screenshot
exists. Native behavior/storage is unchanged, no Gradle/device checks or Git publication ran,
and the prior observer diagnostic remains unresolved. Whole-app styling stays active; visible row Remove was subsequently selected. Continue bottom-
navigation editor scope, then detailed controls and remaining Interface/Settings/accounts/API
access/themes/onboarding in this chat.

Revision 120 selects visible row Remove and retires its inside-Options override. Bottom
navigation now compares a shared default/optional other-page editor with always-separate
Home/Other editors; the accepted five-button bar is a read-only specimen and Customize routes
remain placeholders. Source inventory confirmed twelve whole-file-account-scoped integer
keys, 19/20 signed-in and 11/12 Guest outer choices, 10/8 center choices and 2/4 counts. The
Guest FAB source-index discrepancy is recorded in ARCHITECTURE.md, not fixed or runtime-
verified. Syntax/local-reference/diff checks passed; both scope pages, tab rows and current
script returned HTTP 200. Browser access remains disabled in Work settings: no visual/theme/
large-text, scope/account retention, keyboard or Back checks were run. Evidence is
`.gradle/design-bottomscope120-verification.json`; no screenshot exists. Native assignments,
identity/storage, Gradle/device checks and Git publication are untouched; prior observer issue
remains unresolved. Whole-app styling is active; one default with optional overrides was subsequently selected.
Continue button-control presentation, then counts/retained assignments and remaining Interface/
Settings/accounts/API access/themes/onboarding in this chat.

Revision 121 selects the shared default with optional overrides and retires the always-
separate query. Default/Other editors now compare preview-button targets with five visible
selectors, updating only symbolic account/context fixture arrays. Source inventories matched
20 outer semantic entries, 10/8 center choices and the Guest command allowlist, with accepted
local/sign-in shell destinations retained separately. Twelve pure-helper cases passed for
assignment availability, invalid input, account/context isolation, Guest route labels and
allowed duplicates; syntax/local-reference/diff checks passed. Both editor variants, Other,
overview and script returned HTTP 200. Browser access remains disabled: no visual/theme/
large-text, keyboard, modal focus/scroll, Back or account/context interaction checks were run.
Evidence is `.gradle/design-bottomcontrols121-verification.json` and its ignored helper script;
no screenshot exists. Native index mapping/Guest discrepancy, 2/4 counts and migration remain
pending. No native changes, Gradle/device run or Git publication; prior observer issue remains
unresolved. Whole-app styling is active; preview-button editing was subsequently selected. Continue
Post-details embedded-media control, then remaining Interface/Settings/accounts/API access/themes/
onboarding in this chat.

Revision 122 selects preview-target editing and retires the visible-selector query. Buttons
in bar now labels source outer counts 4/2 as totals 5/3. Three-button mode binds side 1 /
center / side 2, retaining editable side 3/4 without truncation. Expandable versus always-
visible retained controls were compared; the expandable group is now selected. Eight focused helper cases passed for active indices,
count round trips, hidden editing, account/context isolation, invalid counts/scopes and center
availability. Source Main/subreddit bindings, syntax/local-reference/diff checks passed; both
retained variants, Other, overview and script returned HTTP 200. Browser access remains disabled:
no visual/theme/large-text, disclosure/modal focus, keyboard, Back or account/context interaction
checks were run. Evidence is `.gradle/design-bottomcounts122-verification.json` and its ignored
helper script; no screenshot exists. Native storage/migration/Guest mapping remain unchanged,
no Gradle/device run or Git publication occurred, and the prior observer issue is unresolved.
Whole-app styling remains active; the expandable retained group is selected. Continue Time format,
then remaining Interface/Settings/accounts/API access/themes/onboarding, tablet adaptation and consistency.

Revision 123 selects the expandable retained-button group and retires its always-visible query.
Time format now compares a named display selector with the source-style elapsed-time switch,
using two existing account keys and all 23 patterns. Source/default/array order, syntax/local-reference/diff checks passed. Both Time format
variants, the selected 3-button editor and script returned HTTP 200 through the existing
preview routes, with no-store headers. Evidence: `.gradle/design-time123-verification.json`.
Browser inventory reports local browser use disabled in Work settings. No fresh visual/theme/
large-text, keyboard, disclosure/modal focus, Back or account/context interaction checks ran.
Native locale/time rendering, event dispatch, preference persistence and restoration remain
unchanged and unverified. No native edits, Gradle/device run or Git publication. The earlier
observer diagnostic remains unresolved. Whole-app styling is in progress; wait for the Time
format control choice (subsequently selected as the switch), then continue the remaining Settings groups.

Revision 124 selects Show elapsed time and ignores its retired selector comparison. Post details
now presents 12 source preferences, comparing four embedded-media switches with the 16-combination
menu. Source inventory/defaults/order, code mapping (16 round trips, 64 single-kind transitions),
11 capacity boundaries, syntax/local-reference/diff checks passed. Browser access resumed:
verified independent click/keyboard toggling, landscape dependency, invalid/zero capacity feedback, Back/focus
return and retained media/split values, Guest isolation, timestamp switch/format preview, and
None in the comparison menu. Narrow 360/200% AMOLED/custom and 720/130% dark fixtures measured
no horizontal overflow; switches measured at least 48px. Default light media controls were
visually reviewed. A browser-found validation timing issue was corrected and rechecked. This
is targeted HTML coverage, not a blanket rerun of earlier Settings forms or native verification.
Evidence: `.gradle/design-details124-verification.json`, ignored helper script and screenshot.
No fresh warnings/errors were returned for this tab; historical observer attribution remains
unresolved. Both media-control variants, Time format and script returned HTTP 200 with no-store headers. No native changes, Gradle/device
run or Git publication. Whole-app styling remains in progress; the four media switches were subsequently selected; continue Comments in this chat.

Revision 125 selects the four embedded-media switches, retires their menu query and shares
one renderer between separate Comments/Post details buffers. Comments now presents all 12
source keys; its divider control compares one Off/All/Top-level selector with the source
switch and conditionally visible type list. Source key/default and option-list inventories,
syntax/references/diff checks passed. Four divider state combinations passed pure-helper checks
for Off type retention, All/Top-level mapping and invalid-choice rejection; existing media
encoding checks also passed against current source. Both divider variants, Post details with
the retired query and script returned HTTP 200/no-store.

Browser checks passed for divider transitions, source-list visibility and retained type,
keyboard media toggling, Back/focus return, retained Comments values, separation from Post
details and Guest isolation. Light 390/100%, dark 390/130% and AMOLED/custom 360/200% were
visually spot-checked; measured fixtures had no horizontal overflow, duplicate IDs or switches
under 48px. The shortened Top-level only label fits the large-text selector. A stale browser
connection recovered after a tool-session reset; fresh warning/error logs were empty. This is
not full Settings coverage or native Android verification; historical observer attribution
remains unresolved. Evidence: `.gradle/design-comments125-verification.json`, helper/source
scripts and screenshot (all ignored). No native changes, Gradle/device run or Git publication.
Whole-app styling remains active. The single Comments divider selector was subsequently selected; continue
remaining Settings/accounts/API access/themes/onboarding, tablet adaptation and consistency
in this chat.

Revision 126 selects the combined Comment dividers control and ignores its retired source
query. Sort Type now presents eight source preferences and five source enum lists, comparing
visible-disabled versus conditional subreddit/user time ranges. Source defaults/options,
account classification, route/local references, syntax and diff checks passed. Both Sort Type
variants, Comments with its retired query and script returned HTTP 200/no-store.

Browser checks passed for Hot/New inactive ranges, Top/Controversial activation, retaining
Day/Week/Month through type changes and Back, independent remember switches, parent focus
return and Guest isolation. Comments' retired query still rendered the selected combined
control. Light 390/100%, dark 390/130% and AMOLED/custom 360/200% were visually spot-checked;
measured narrow fixtures had no horizontal overflow, duplicate IDs or controls below 48px.
A stale browser connection recovered after a tool-session reset; fresh warning/error logs were
empty. Evidence: `.gradle/design-sort126-verification.json`, source-check script and screenshot
(all ignored). These fixtures do not execute saved-sort resolution, recommendation fallback,
reader refresh, API calls, preference persistence or native accessibility/lifecycle checks.
Earlier observer attribution remains unresolved. No native changes, Gradle/device run or Git
publication. Whole-app styling remains in progress; wait for the Sort Type range-presentation
choice, then continue remaining Interface/Settings/accounts/API access/themes/onboarding,
tablet adaptation and consistency in this chat.

Revision 127 records the user's visible-disabled time-range selection, ignores the retired
sort-range query and updates DESIGN/ARCHITECTURE and this handoff. Next is remaining Interface
controls as a grouped review, not another Sort Type question. Whole-app styling remains in
progress; a fresh chat is recommended. No native edits, Git publication or Gradle/device run.
Syntax/source/local-reference/diff checks passed; selected HTML and script returned HTTP 200.
Current lightweight verification is recorded in `.gradle/design-sort127-verification.json`;
revision 126 browser screenshots/results remain historical, with no fresh browser run here.

Ignored evidence: `.gradle/design-foundations-verification.json`,
`.gradle/design-foundations-07-review.json`, `.gradle/design-navigation-verification.json`,
`.gradle/design-navigation-extra.json`, `.gradle/design-navigation09-verification.json`, and the
corresponding `design-*.png` captures. Revision 09b evidence is
`.gradle/design-navigation09b-verification.json` and `design-navigation09b-*.jpg`.
Study 10 evidence: `.gradle/design-subreddit10-verification.json` and `design-subreddit10-*.jpg`.
Contrast checks cover explicit fixtures, not every arbitrary custom theme or rendered pixel.
The browser does not establish Android IME/drag behavior, TalkBack, nonlinear scaling,
landscape/tablet/system-bar handling, process restoration, real API behavior or performance.
Gradle/device checks were not rerun; foundation verification above remains historical evidence.
Those earlier study runs made no native source/identity, installation or Git publication changes.

User-requested setup: GPT-6.1 Sol / High for synthesis/prototypes; up to two useful,
non-recursive subagents with GPT-6 Luna / Medium for narrow read-only work or GPT-6.1 Sol /
High for demanding analysis. Two Luna / Medium audits covered theme/font/scope and search/
navigation contracts. This records requested setup, not a claim that tools changed the main model.

Continue **this chat**; the [Gallery interaction preview](prototypes/relaxe-exploration/gallery-titles.html?rev=102)
is the current checkpoint. Compact Thumbnails-first and Gallery Media only / no grid More /
tap-to-view / hold-for-details are selected. Gallery is integrated at HTML level with its own
family snapshot; Vertical swipe separate framing is selected; Video single-page organization is selected; Data Saving Mode disabled-while-Off is selected; mode-specific media exit is selected; General controls are proposed; volume placement is selected; sensitivity sliders are selected; named comment touch choices are selected; next choose post layout guidance organization. Large/Compact defaults remain selected; native
geometry and icons remain later work. Post-details scope is deferred without a selection. Brief category descriptions are selected. Edit post follows the shared Reply/Edit style; browser Copy customization
and both enabled defaults are selected. Visible Open in browser is selected. Inline missing-folder feedback, paired Share/Copy, separate download rows, moderator compact buttons and Remove/Spam confirmation, Report sheet
and Delete excerpt are selected. Study 24’s grouped More, section/action reordering and shared per-account
order across all layouts are selected; native persistence remains unimplemented. The unified composer/compact selector choice is accepted; its detailed
Text layout is a proposal apart from the selected visible Spoiler/NSFW/reply-notification
controls and Preview beside Post. Title-first Link order is selected; separate per-type body
retention remains a proposal. The Image form now demonstrates bundled-sample attachment,
camera/error and replacement/removal states. Image before optional Body is selected;
attachment-action details remain for consistency review. Gallery now has a two-column grid
and per-image caption/link editor proposal, kept behind Edit provisionally. Video now has a
playable bundled-sample form; always-visible controls while editing are selected. Other Video
details and native resume behavior remain unapproved. Poll now has an interactive proposal.
The user requested continuation without selecting the initial Poll field arrangement; keep
two fields plus Add option provisional. Inline images now have a browser-checked proposal.
Visible Images beside Text/Poll formatting is selected; manager details and guards remain
proposals. Study 19 now demonstrates Reply context, writing and draft/exit/send states;
the user requires Expand/Collapse wording and a Settings choice between Separate screen and
Inline below comment; Inline is now the selected default. GIF beside Images with Italic in
More is selected. Revision 54 adds the Reply image manager
with bundled-sample Choose/Take/reuse and failure fixtures; thumbnail/filename rows are selected.
Complete Reply draft restoration is selected: text, image/GIF selections and account/parent
isolation. Revision 56 demonstrates that behavior in page memory. Edit comment follows the
Reply style setting, and keeping the original above the inline editor is selected. Study 20
revision 58 demonstrates complete Edit comment draft recovery, now required alongside Reply
drafts with separate identity. Native storage remains unimplemented. Study 21 revision 59
compares dedicated and inline post editing; that choice stays open after continuation without
a selection. Study 22 adds a dedicated private-message form; the Markdown toolbar is selected
under the user’s support condition, based on official format documentation. Live route
compatibility remains unverified after Reddit's Chat/archive changes. Continuum alignment
is now selected; external Chat is deferred and no custom detection/read-only layer is planned.
Unsent-message confirmation, Preview beside Send and PM bubbles are selected. Study 24's
grouped More and section/action reordering are selected, shared across feed layouts per account.
The mobile review uses numbered
questions in chat and waits for a reply.
Reply parent display
remains provisional.
Native draft account/attachment ownership remains an explicit source gap.
Retain all
six native types and their services;
uploads, user-profile posting, real rules/allowed types and restoration remain separate work.
[Study 17’s layout checkpoint](prototypes/relaxe-exploration/layouts-overview.html?rev=40)
remains the accepted layout-direction reference.
The surface comparison remains a reference; Filled is selected for Large and Compact cards.
The user selected Large card, Compact card, Vertical swipe and Gallery, with adjustable
elements, positions and surfaces within families. Keep Card 1 and Card 2 as Large card
compositions; **Card 1 (text above preview) is the selected Large card default** as of
2026-10-26. Card 2 remains selectable and customizable. Reject Compact 2 and omit Card 3 as a
separate proposed layout. Compact uses
the accepted refined A base and hidden customizable toolbar. Large card's below-content toolbar
default and a width-limited action count are selected; Above remains configurable. Revision 35
demonstrates one row with More reserved and lower-priority actions in More. The scope clarification is resolved: Horizontal stays limited to Gallery entry for now; the
standalone feed remains Vertical swipe. Gallery grid defaults to visual media, with All posts
available. Gallery entry/content/axis/album/scope/return rules are selected and demonstrated in HTML; no native horizontal viewer is implemented.
Gallery keeps at least two columns even on phones, with Fit whole media
scaled to tile width; this supersedes revision 34's Gallery one-column fallback. Minor layout defaults return in the consistency pass. Large card's Fit whole media default is
selected; Square crop stays configurable. Card 1 + Filled is the Large card default;
Compact also defaults to Filled. Outlined and Flat stay available; other defaults remain open for consistency review.
Continue create/act, then settings/accounts/onboarding. A dedicated tablet adaptive-shell/
pane review is required before native implementation; wide feed previews do not approve a
tablet UI. These HTML choices do not implement
native layout-ID migration: map legacy choices/account/context overrides explicitly before
native work. Recently visited’s two visible Subreddits/Users tabs and visible Subscribe,
Follow and Save user actions remain selected. Inline filter/time labels remain proposals.
After the source-backed History behavior
explanation, the user chose to retain Continuum's basics and explicitly include thumbnail-to-
media viewing without requiring post details. DESIGN.md owns that requirement and its existing
settings/account/retention boundaries. Source inspection confirms thumbnail, gallery and
fullscreen-video handlers already call the guarded read-marking helper in several layouts;
this is existing coverage to preserve, not proof that every redesigned native route works.
No native implementation or device verification was performed for this decision. The user
selected Today / Yesterday / Earlier headings in revision 21; its wording now distinguishes
stored record time from last-visit time. Preserve that read-state model. Recently
visited's tab/action decisions do not approve new recording, deletion or account-switch behavior.
Saved study 14 retains accepted Posts/Comments tabs plus the source selector; Find in Saved
inside More remains provisional after the user's general request to continue. Inbox's compact
selector and two-line previews, and Profile's header/actions/comment context remain selected.
[Study 11](prototypes/relaxe-exploration/navigation.html?study=11&destination=subscriptions&rev=14)
now retains the accepted single four-category selector and visible stars, with tighter rows
as requested. Final row density must be judged on Android; favorites grouping and list-filter
details can return in the consistency pass. The user accepted study 10/shared-shell
revision 12 and moved to this group. Bottom Search opens over the same page, and the
top Search button was removed as explicitly confirmed. Feed, details, results and shell
destinations use the same bar; media includes it with revealed controls. The reduced feed
chrome remains demonstrated: Posts/About scroll away, Sort sits beside More, and horizontal swipes
switch pages with menu/top-button/keyboard alternatives and the existing disable-swiping
preference. Subscribe placement A beside the name and the Continuum-style sort/time flow are
accepted, alongside the toolbar/gesture revision and current header proportions/spacing at
HTML level. The user selected a large
banner/description on first load/at top, collapsing to a compact header as posts scroll beneath;
returning to top expands it again. Preserve a restored below-header position rather than force
the banner on return. Saved/History/Recently visited now have the selected directions recorded
above; create/act is the active review group.
Use the corrected Reddit terminology in DESIGN.md; search labels are Posts/Subreddits/Users,
and opaque fixture/native identifiers remain compatible. AGENTS.md now links this vocabulary.
Study 09b's simplified entry, compact type/scope selector, history/tools and current results
presentation are accepted at HTML design level. Keep the Continuum-like drawer and balanced →
expanded search. Keyboard-on-open/focus policy is deferred to native review, alongside IME/insets,
Back/reopening and accessibility; it does not block the remaining HTML groups. The browser reload
diagnostic above remains unresolved. The latest work changes HTML/JS/CSS fixtures and design/
handoff guidance only. No native source/identity, Gradle/device run, installation or Git
publication was performed during those earlier studies. The styling checkpoint was later pushed
as recorded above; the user authorized the subsequent documentation/linked-study checkpoint
on 2026-10-26. Native implementation remains
outside this task.

Chat assessment (2026-10-26): a new chat is not required for the current HTML review milestone;
the branch, accepted decisions and next group remain coherent and are documented here. Keep
this chat for the remaining small review groups. Start a separately authorized task when
moving to native implementation or another materially different objective.

Use a local HTTP preview: `python -m http.server 8765 --bind 127.0.0.1` from the repository
root, then open `/docs/prototypes/relaxe-exploration/navigation.html` or `foundations.html`
on `http://127.0.0.1:8765`. Stop the server when the preview is no longer needed. Use HTTP for
the integrated feed/details shell too: contextual Search now needs the shared preview origin.

Remote review is also available through a user-authorized, tailnet-only preview. A separate
Python server binds `127.0.0.1:8766` and serves only `docs`; Tailscale Serve forwards TCP port
8765 to it (`tailscale serve --bg --tcp=8765 tcp://127.0.0.1:8766`). Open
`http://<Tailscale-address>:8765/prototypes/relaxe-exploration/subreddit.html?rev=12` for the
accepted subreddit review, or
`profile.html?rev=16&tab=comments` in the same directory for the latest profile reference.
The Subscriptions density reference remains `navigation.html?study=11&destination=subscriptions&rev=14`.
Only the docs tree is served; repository configuration and source are outside that root.
The original localhost preview and pre-existing Tailscale routes remain in place. The user
has accessed the remote preview; revision 12 was also verified in a browser through that
endpoint. The local, ignored helper `.gradle/tailnet-preview-server.py` supplies the no-store
headers and fixed docs root; restart it with `python .gradle/tailnet-preview-server.py` from
the repository root. It is workspace setup, not a tracked production server. Serve forwarding
persists, but the Python process must be restarted after reboot. When remote review ends, disable this route with
`tailscale serve --tcp=8765 off` and stop its dedicated Python process. No public Funnel
or firewall changes were made. Keep machine addresses and identifiers out of shared docs.

Resume from actual working-tree state on `codex/whole-app-styling`, preserving unrelated
edits. A wording-only `index.html` change appeared during the task and was left intact.
Keep production implementation, identity changes, installation and Git publication outside
this task; API/access/account/preference/media/restoration behavior remains a constraint.
