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
| Whole-app styling | In progress: subreddit/shared-shell and list directions selected; profile study 12 expanding header, adjacent Follow/separate Save user and parent-post context first selected | Inbox next, then Saved/History and remaining review groups. Final density, keyboard policy and native behavior remain implementation review items. |
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
No native source/identity, installation or Git publication changes were made.

User-requested setup: GPT-6.1 Sol / High for synthesis/prototypes; up to two useful,
non-recursive subagents with GPT-6 Luna / Medium for narrow read-only work or GPT-6.1 Sol /
High for demanding analysis. Two Luna / Medium audits covered theme/font/scope and search/
navigation contracts. This records requested setup, not a claim that tools changed the main model.

Continue **this chat** with Inbox: inspect existing notification/message categories, unread/read
and reply actions, account/Guest gates, refresh/paging and restoration. Show the current route
before a small HTML proposal using the shared shell, then ask about grouping and reading
density. [Profile study 12](prototypes/relaxe-exploration/profile.html?rev=16) now demonstrates
the selected expanding header, adjacent Follow/separate Save user and post-context-first
Comments. Preserve its own/other-user/Guest distinctions and source contracts from DESIGN.md.
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
the banner on return. After Inbox, continue with Saved/History as small personal-surface
reviews; retained feed layouts, create/act and settings/accounts/onboarding follow.
Use the corrected Reddit terminology in DESIGN.md; search labels are Posts/Subreddits/Users,
and opaque fixture/native identifiers remain compatible. AGENTS.md now links this vocabulary.
Study 09b's simplified entry, compact type/scope selector, history/tools and current results
presentation are accepted at HTML design level. Keep the Continuum-like drawer and balanced →
expanded search. Keyboard-on-open/focus policy is deferred to native review, alongside IME/insets,
Back/reopening and accessibility; it does not block the remaining HTML groups. The browser reload
diagnostic above remains unresolved. The latest work changes HTML/JS/CSS fixtures and design/
handoff guidance only. No native source/identity, Gradle/device run, installation or Git
publication was performed. Native implementation remains outside this task.

Chat assessment (2026-10-24): a new chat is not required for the current HTML review milestone;
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
