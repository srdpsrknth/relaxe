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
| Whole-app styling | In progress: browse/personal and layout directions selected; unified composer, visible options, top-bar Preview, Title-first Link, Image-before-Body order and always-visible Video editing controls selected; all six composer types have browser-checked proposals | Next: inline attachments for Text/Poll, then reply/edit/action flows and settings/accounts/onboarding. Poll initial fields, Gallery caption placement/attachment details, tablet adaptation, final density, keyboard policy and native verification remain separate. |
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

### Current review checkpoint (2026-10-26)

- **Selected directions:** compact feed/media/details; shared typography/rounding/icons;
  shell/drawer/search; subreddit and profile headers; subscriptions, Inbox, Saved, History
  and Recently visited; four customizable feed families and Gallery viewer navigation.
- **Current step:** create/act study 18 has browser proposals for Text, Link, Image, Gallery,
  Video and Poll. Selected details include the unified type selector, visible post options,
  Preview beside Post, Title-first Link, Image before optional Body and visible Video editing
  controls. Other form details remain proposals; continuing is not blanket design approval.
- **Precise next task:** inspect Text/Poll inline-image insertion, uploaded-image management,
  camera/error states and Markdown/rich-text conversion, then draft one small HTML proposal.
  Keep Poll's two-field/Add option choice, Gallery caption placement and attachment-action
  details provisional for consistency review.
- **Remaining design groups:** finish create/act (inline attachments, reply/edit/private
  messages, action customization, reporting/moderation, dialogs/feedback and media utilities),
  then settings/accounts/onboarding, tablet adaptation and cross-surface consistency.
- **Later milestones:** separately authorize a focused native architecture proof, incremental
  Android replacement and native accessibility/state/performance/device verification, then
  upstream integration/refinement and any release. No native implementation is authorized here.
- **Checkpoint scope:** the user authorized updating, committing and pushing documentation
  on this date. Include the HTML/CSS/JS design studies linked by the documents so the checkpoint
  is usable from a fresh checkout. User attachments and ignored diagnostics are not part of it.
  Existing browser results below are historical checks, not reruns for this documentation update.

Continue this chat for the current review; the documents provide the handoff if the user
prefers a new one. No new chat is required at this boundary.

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

Continue **this chat**; [study 18’s Poll composer](prototypes/relaxe-exploration/compose.html?rev=49&type=poll)
is the current review. The unified composer/compact selector choice is accepted; its detailed
Text layout is a proposal apart from the selected visible Spoiler/NSFW/reply-notification
controls and Preview beside Post. Title-first Link order is selected; separate per-type body
retention remains a proposal. The Image form now demonstrates bundled-sample attachment,
camera/error and replacement/removal states. Image before optional Body is selected;
attachment-action details remain for consistency review. Gallery now has a two-column grid
and per-image caption/link editor proposal, kept behind Edit provisionally. Video now has a
playable bundled-sample form; always-visible controls while editing are selected. Other Video
details and native resume behavior remain unapproved. Poll now has an interactive proposal.
The user requested continuation without selecting the initial Poll field arrangement; keep
two fields plus Add option provisional. Next review inline image insertion for Text/Poll. Retain all
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
