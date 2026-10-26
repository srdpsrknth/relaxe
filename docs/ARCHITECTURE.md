# Architecture

## Baseline and scope

Assessed on 2026-10-23 at Continuum commit
`ab9f3f59f0d5790f61a5acb71cd9f298798d6344` (2026-10-21), version `8.3.3.6`.
This supersedes the earlier August assessment and the discarded Relaxe implementation.
The foundations change contains documentation, a local skill, and build/test baseline repairs,
not app features. Production UI and Reddit behavior remain unchanged.
Verification results and outstanding work live in [ROADMAP.md](ROADMAP.md).

The app still declares `org.cygnusx1.continuum`, with `.debug` and `.beta` variants.
The approved future ID is `com.zweilous.relaxe`; the source namespace remains
`ml.docilealligator.infinityforreddit`. Identity changes are not implemented yet.

## Build and source inventory

- `settings.gradle`: `:app` Android application and `:lint-checks` JVM custom Android Lint jar.
- `build.gradle`: AGP 9.3.0, Kotlin 2.3.21; Google, Maven Central, and JitPack repositories.
- `gradle/wrapper/gradle-wrapper.properties`: Gradle 9.6.1.
- `gradle/gradle-daemon-jvm.properties`: JDK 25 daemon criteria. App Java source/target: 24;
  lint-checks bytecode: 17. Gradle can use a different daemon JVM from the launcher JVM.
- `app/build.gradle`: min SDK 24, target 36, compile 37; ViewBinding and Compose enabled;
  ARM32/ARM64 APK splits, without a universal APK.
- Production sources under `app/src/main`: 703 Java and 252 Kotlin files by extension.
  This is a file count, not a lines-of-code or complexity measurement.
- JVM tests/support: 130 source files; instrumented tests/screen support: 23 source files.
  File counts are not test-case counts or coverage percentages.

## Source map

Paths below are relative to `app/src/main/java/ml/docilealligator/infinityforreddit/`
unless otherwise stated.

| Responsibility | Main source locations | Boundary implications |
| --- | --- | --- |
| App setup and dependency injection | `Infinity.java`, `AppComponent.java`, `AppModule.java`, `NetworkModule.java` | Dagger supplies networking, database, preferences, and other app dependencies; this is not a separately packaged core. |
| Navigation and shell | `activities/MainActivity.java`, `activities/BaseActivity.java`, `fragments/PostFragment.java` | Activities, intents, FragmentManager, ViewPager2, callbacks, and EventBus participate; preserve back and restoration behavior. |
| User profiles | `activities/ViewUserDetailActivity.java`, `fragments/CommentsListingFragment.java`, `user/UserSaving.kt`, `user/UserFollowing.java` | Posts reuse `PostFragment` with user/submitted scope; Comments use a separate listing. Preserve explicit opening tab/sort precedence over resume, per-tab anchors, Follow versus local Save user, own/other-user visibility and Guest behavior. |
| Inbox | `activities/InboxActivity.java`, `fragments/InboxFragment.java`, `adapters/MessageRecyclerViewAdapter.java`, `message/MessageDataSource.java`, `message/ReadMessage.java`, `message/InboxCount.kt` | Notifications use the inbox listing; Messages use the private-message listing. Preserve context-link versus thread routes, displayed-message read/rollback and unread descendants, account badge updates, paging/retry, user marks and explicit Messages launch precedence over restored tab. |
| Saved/history | `activities/AccountSavedThingActivity.java`, `activities/HistoryActivity.java`, `localsaved/LocalSaved.java`, `utils/SavedThingSearchFilter.java`, `utils/SavedSearchCache.java` | Saved has separate Reddit posts/comments and recovered Local posts/comments. Guest save storage is distinct. Preserve query matching and continued paging, cache/bypass scope, reconciliation, post-tab resume anchors and history recording/account rules; a visual selector does not merge data stores. |
| Recently visited | `activities/RecentlyVisitedActivity.java`, `fragments/RecentlyVisitedListingFragment.java`, `adapters/RecentlyVisitedRecyclerViewAdapter.java`, `recentlyvisited/RecordRecentlyVisited.kt`, `recentlyvisited/RecentlyVisitedDao.kt` | Separate local subreddit/user visits; account/name/type key, replace on revisit, newest first and 50 per account/type. Preserve recording exclusions and opt-out/purge, shared name query, observed subscription/follow/save state, Guest helpers and selected-tab resume. Account switching closes the native activity. |
| Feed | `post/PostViewModel.java`, `post/PostPagingSource.java`, `post/ParsePost.java`, `post/Post.java` | Paging 3/LiveData, filtering, local read state, network loading, and mutable Parcelable models. |
| Networking and authentication | `NetworkModule.java`, `apis/RedditAPI.java`, `apis/RedditAPIKt.kt`, `network/`, `viewmodels/AppAuthLoginViewModel.kt` | Retrofit/OkHttp and authenticators remain the integration path; retain existing client-ID/access behavior. |
| Persistence | `RedditDataRoomDatabase.java`, entity/DAO packages | Room schema version 43 with explicit migrations, `exportSchema=false`; no schema changes are justified by a visual redesign alone. |
| Account settings | `account/AccountScope.kt`, `account/AccountScopedSharedPreferences.kt`, `account/AccountScopedPreferenceDataStore.kt` | Reuse account-key and preference wrappers; do not introduce competing account namespaces. |
| Post rendering/actions | `adapters/PostRecyclerViewAdapter.java`, `thing/VoteThing.java`, `thing/SaveThing.java`, `thing/SaveThing.kt` | Holders own network actions, optimistic updates, rollback, read state, navigation, and presentation. Helpers are reusable but not uniformly UI-independent. |
| Comments | `viewmodels/ViewPostDetailFragmentViewModelNew.kt`, `fragments/ViewPostDetailFragmentNew.java`, `adapters/CommentsRecyclerViewAdapterNew.java` | ViewModel UI/data state is a reuse point; rendering, Markdown, gestures, and some actions remain coupled. |
| Media | `VideoLinkFetcher.java`, `VideoLinkFetcherKt.kt`, `activities/ViewVideoActivity.java`, `videoautoplay/`, `services/` | Media3, provider resolution, playback/cache, Glide and downloads already exist. Preserve policy and resource ownership. |
| Themes/settings | `customtheme/`, `customviews/compose/AppTheme.kt`, `settings/`, `utils/MaterialYouUtils.java`, `app/src/main/res/values/styles.xml` | XML Material 3 plus custom theme storage and limited Compose screens. Shared styling must map consistently into both toolkits. |
| Restoration | `resume/FeedResumeState.kt`, `resume/ResumeState.kt`, `resume/ScrollAnchor.kt`, `resume/ResumeGalleryPage.kt` | Feed identity, post fullname/position/offset, and gallery positions have existing representations. Reuse them before adding new restoration state. |

Caching is distributed across Paging, saved-content disk caches, comment-detail caches,
Glide, and media infrastructure. This is not a uniform offline feed repository.

Compose is already used by login, multireddit copying, and reminder screens. Its availability
does not establish a need to migrate the feed. Java and Kotlin coexist throughout the app.

## Important upstream changes relevant to the redesign

- `PostViewModel.getPosts()` exposes a cached, filtered Paging stream.
- `setMediaOnly(boolean)` already supports the gallery layout's media-only mode. Enabling it
  may invalidate the paging source to avoid a filtered-empty feed that never requests another
  page. Inspect `PostPagingSource` alongside it; merely filtering currently loaded rows is
  insufficient. `Post.isMediaPost()` is an existing predicate to evaluate against our needs.
- Compact thumbnails have a runtime size preference, default 112dp. Both Compact and
  Compact 2 also have structural contributions to height; see `docs/DESIGN.md`.
- Account-scoped settings and resume-state records now have dedicated abstractions and tests.
- `lint-checks` adds layout-variant ID parity validation. Layout changes must account for
  landscape/tablet resources and ViewBinding, not just the default phone XML.

The discarded fork's `getMediaPosts()` and Vertical Swipe holder are not part of this baseline.

## Approved architecture decision: incremental presentation separation

**Status: approved on 2026-10-23; extraction and redesign not implemented.**

Replace presentation feature by feature, creating small boundaries only when a concrete
screen needs them. Retain the feed, APIs, persistence, providers, and established behavior.
Start the first feed proof of concept with existing Views/RecyclerView/Paging infrastructure.
Evaluate Compose individually where it reduces real screen complexity.

Shared-styling decision (2026-10-23): use Continuum's resolved `CustomTheme` roles and
existing wrapper/attrs in Views, and `LocalAppTheme` in Compose, for replacement components.
Keep wallpaper/system generation, custom-theme persistence, light/dark/AMOLED selection,
font preferences and account ownership in their current mechanisms. Adapt presentation
roles progressively; do not add a parallel theme engine. `AppTheme.kt` currently supplies
custom roles explicitly, rather than populating a Material 3 color scheme automatically.
DESIGN.md owns the selected type/shape/icon direction and component-role mapping.

Shell/search prototypes likewise target existing Android presentation primitives: drawer
helpers/`DrawerLayout`, Material sheets and existing result fragments. The current shared
`LandscapeExpandedRoundedBottomSheetDialogFragment` forces expanded state and skips collapsed
state; a future balanced-entry search sheet needs local configuration, not a global change
to existing sheets. DESIGN.md records the selected behavior and native validation boundaries.
No native shell/search extraction or migration has been implemented by the HTML study.

The shared-shell HTML revision reuses one bottom-bar fixture and embeds the accepted search
study over feed/subreddit/details without replacing the originating document. The same-origin
browser bridge and account-partitioned synthetic session state are prototype scaffolding only;
they do not establish a new native router, persistence boundary or account namespace. Map the
selected presentation back onto existing native navigation/search and restoration mechanisms.

Profile study 12 extends the scoped HTML feed fixture hook with a render-completion callback,
so profile headers reuse compact rows/actions/media and remount after redraw. The shell feed
also uses that callback for decoration. These browser hooks and fixture readiness controls
are scaffolding, not a native state layer. Profile Search carries a user target through the
existing shared sheet/history fixture; native implementation must preserve the existing
user-scoped search and account boundaries rather than adopt this browser state store.

Saved study 14 reuses a separate scoped copy of the existing HTML post renderer, rather than
mutating Home’s fixture list. Its fixture hooks seed/capture synthetic save state and settle
pending demo actions before iframe teardown. The renderer now handles a text-only or empty
filtered media list safely. These additions are browser scaffolding; native Saved continues
to use its existing fragments, caches, reconciliation, account stores and request lifecycle.

Retained-layout study 17 adds an optional scoped row-rendering callback to the HTML fixture.
It reuses the existing demo action/media handlers and account-partitioned post IDs; other
studies keep the default compact renderer. Returning null from the optional hook also lets
study 17’s Compact card reuse that renderer and toolbar rather than duplicate them. The comparison board's same-origin messages only
set validated review controls. Feed initialization handles already-loaded iframes and avoids
refreshing before fixtures/CSS are ready. These browser hooks introduce no Android interface,
layout-ID migration, preference store or account model. Existing native layout/context and
media/action contracts remain authoritative. The selected four-family model and Card 1/2
compositions require a future explicit migration of legacy layout IDs/context overrides;
no native preference is removed or remapped by this prototype. DESIGN.md owns that decision.

The selected Save as layout feature needs a future persistent named-configuration boundary:
family plus presentation options, with explicit legacy-ID/context mapping and schema migration.
The native picker currently routes fixed `SharedPreferencesUtils.POST_LAYOUT_*` constants;
the HTML library does not replace those IDs. Revision 33 stores versioned named copies only
in the parent page’s memory and sends the same validated presentation controls to the iframe.
It captures no account/search/API/theme policy. Native scope, library assignment, backup and
restoration require a separate design/implementation review using existing account stores.
No new native persistence interface is implemented or approved by the fixture schema.

Revision 34 adds a scoped HTML toolbar setter/change callback so the named-layout editor
reuses Compact's action order/visibility and existing menu rather than maintaining a second
toolbar state. Large/Gallery menus receive their visible-action set so hidden votes remain
available through More. Same-origin parent/iframe messages validate action IDs and choices.
Column capacity is computed from available fixture width/text size separately from the stored
preferred count; narrowing does not overwrite the latter. Native
`number_of_columns_in_post_feed_preferences.xml` already defines per-layout portrait,
landscape and unfolded preferences. Preserve and explicitly map those preferences in future
adaptive work; this HTML heuristic adds no native preference or tablet shell.

Revision 35 fits toolbar actions against each rendered card's available width, reserving
More and retaining the full selected priority order as the presentation preference. A scoped
visible-action callback supplies the row menu with the effective visible set, so an overflowed
vote remains reachable even when it is selected in Settings. Resize/text/font changes recompute
capacity without mutating saved copies or action state. Other studies keep the existing menu
fallback. These measurement/observer hooks are HTML scaffolding, not an Android action API.

Gallery clarification supersedes revision 34's browser one-column fallback: revision 38
keeps at least two columns with natural-ratio Fit previews and measured staggered row spans.
Native `PostFragmentBase.getNColumns`/column preferences already default Gallery to two in
both orientations, and `PostFragment` uses `StaggeredGridLayoutManager`. The native Gallery
holder routes through existing media/detail entry and guarded read marking, with the tap/
long-press swap preference. Its account/media/restoration contracts remain authoritative.
Revision 39's scoped `mediaNavigation` callback chooses Gallery's axis while other studies
keep their existing gesture/key mapping. Sequential Gallery gestures step album pages before
posts; a scoped exit callback restores the current tile's visibility/focus. It reuses the
existing viewer actions, media eligibility/gates and per-post page/playback fixture state.
The visual-only stream is derived from the same scoped feed fixtures; text/link tiles retain
the details route. Native media routing, setting scope, gesture arbitration and recreation
need a separately authorized implementation; these callbacks add no Android API or boundary.
The user explicitly limited Horizontal to Gallery entry; the standalone Vertical feed keeps
its prior mapping. Revision 40 hides the Gallery direction control outside Gallery and selects
the visual-only Gallery grid default while retaining All posts. This changes only browser
presentation defaults; native account-scoped preferences remain untouched.

Study 18 revision 41 demonstrates the selected unified Create post entry using a compact
six-type selector, with only the Text form interactive. The form is browser scaffolding:
synthetic account/subreddit/flair states, safe limited Markdown preview, in-memory input and
simulated submission. It reuses shared theme roles and navigation; Search overlays preserve
input while dirty destination changes prompt before leaving. It introduces no native account,
draft, upload or submission abstraction. `PostTextActivity`/its layout retain the source
contracts for account loading, rules, formatting/image insertion, posting/dirty exits and
restoration. `FlairRequirementController` treats lookup as a best-effort hint, ignores stale
responses and blocks only a known unmet requirement (or active posting). Preserve those
per-account/subreddit semantics rather than copying the fixture state machine into Android.
DESIGN.md owns the chosen entry and pending type-specific forms.

Revision 44 adds a browser Link form with URL/title/optional formatted body, separate in-memory
Text/Link bodies and synthetic title suggestions. `PostLinkActivity` retains the native
incoming link/title, context/flair/options, URL/body dirty-exit, restoration and submission-job
extras. Its explicit title lookup uses the named title-suggestion Retrofit and
`TitleSuggestionUtils` (YouTube oEmbed or bounded HTML reads), with request cancellation and
failure handling. Lookup normalization is separate from the submitted URL. The browser makes
no URL requests and introduces no URL resolver, network client, native draft schema or new
validation contract. Its pending-suggestion/input guards are fixture behavior only.

Revision 46 adds a browser single-Image form using bundled samples, including a static GIF
poster. It opens no device files/camera and performs no upload. Native `PostImageActivity`
owns shared/picked/captured URI context, camera permission and cancellation/error cleanup,
per-account flair and job construction. MIME/extension GIF detection routes through the
existing video submission path; `SubmitPostService` retains the upload/submission boundary.
The Image body toolbar has no implemented image-upload callback. HTML replacement staging,
preview-error retry and per-type in-memory body/selection retention are proposals/scaffolding;
they introduce no native attachment model or URI/persistence/lifecycle guarantees. DESIGN.md
records the difference between proposed replacement and native Select again.

Revision 47 adds the browser Gallery form. Native `PostGalleryActivity` and
`RedditGallerySubmissionRecyclerViewAdapter` retain ordered entries, the 20-image cap,
caption/outbound-URL payloads and all-entry readiness validation. `PostGalleryViewModel` owns
selection-time upload work/outcomes across configuration changes; stable item IDs and
idempotent outcome application avoid misattribution or duplicate uploads on recreation.
`UploadImageUtils` returns the media key used by Gallery payloads; `SubmitPostService` owns
final submission. Failed entries are removed, and pending edit/removal/Add guards stay part
of the source contract (with the thumbnail-failure removal exception). The HTML state uses
bundled samples and synthetic completion/failure controls, with no upload, native lifecycle,
URI-grant or persistence implementation. It adds no parallel media/account service or model.

Revision 48 adds the browser Video form. Native `PostVideoActivity` retains selected/shared/
recorded URI context, camera/error handling and account/flair requirements. Its Media3 player
uses `DurationAwareSeekPlayer`, existing seek constants and loop preference, starts after
selection, pauses on stop and releases on destruction. `SubmitPostService` retains file-access,
cache/thumbnail, upload/processing and final-submission handling. The HTML player uses only the
bundled clip and page-local state; its separate paused Post Preview and overlay/type-change
pauses establish no native lifecycle or restoration guarantee. A single object URL supplies
the bundled sample after the served URL exposed no usable seek range; it is reused and revoked
on non-cached exit. No native player, upload service, account store or URI model is added.

Revision 49 adds the browser Poll form. Native `PostPollActivity`/`activity_post_poll.xml`
provide six fixed option fields, omit empty strings in field order, require at least two
nonempty options and allow 1–7 voting days (default 3). `PollPayload` retains duration,
ordered options, body/plain-text or rich-text image content, selected account/destination,
flair and post options; `SubmitPostService` owns submission and error/result events. Poll
body image insertion uses the existing uploaded-image/camera path, unlike the empty callbacks
in some attachment composers. Preserve it during the inline-attachment review. Two initial
rows with Add/Remove, a duration selector and a combined body/options preview are HTML
presentation proposals. Page-memory retention and dirty-state checks establish no native
restoration, account isolation, upload or server-validation correctness.

History source inspection also confirms caller-owned read marking in
`PostRecyclerViewAdapter`: thumbnail, gallery and fullscreen-video handlers call
`markPostRead` before opening media. The helper requires feed read handling, the account's
master preference and an unread post. Media entry therefore need not pass through post details
to create the existing read record. Preserve that boundary when replacing media presentation;
DESIGN.md owns the approved media-entry requirement. This is source evidence, not complete
route coverage or device verification.

This trades some short-term extraction effort for testable behavior and fewer repeated edits
inside upstream UI classes. It does not eliminate merge conflicts or make upstream a stable
core API. A full core-module extraction or full UI rewrite would create substantially more
migration work before showing product value.

Proposed first boundaries, to validate with a focused implementation plan:

1. **Post actions:** vote/save results and state transitions, preserving rollback, read state,
   cache effects, and cross-screen updates. Keep rendering feedback out of new behavior code.
2. **Presentation state:** layout/selection/loading/error and restoration mapping, using the
   current feed context and upstream state records.
3. **Media policy/lifecycle:** content gates, autoplay eligibility, mute/data settings, provider
   resolution, active playback, bounded preparation, and release on leaving the screen.

These are responsibilities, not new implemented interfaces. Do not add a generic abstraction
for every helper. Prefer small upstream call-site changes and fork-owned component files.

## Verification and risks

- JUnit/Jupiter/Vintage, Mockito, Robolectric and Roborazzi cover JVM behavior and layouts;
  Espresso/Kaspresso cover selected device flows. Test coverage is not complete.
- Screenshot tests include theme/width/orientation/text-size cases and committed goldens.
  Inflated layouts with fixture content cannot establish real adapter, gesture, network,
  accessibility-service, or media lifecycle correctness.
- `:app:check` includes screenshots, shipped subreddit lists, and device tests. The device
  task uses a shell helper; Windows execution must be verified rather than assumed.
- `.github/workflows/build.yml` disables its build job even in the fresh upstream tree.
- Lint now reports warnings without an ignored local baseline and fails on errors. The
  956 existing warnings remain visible, including 207 `ContentDescription` findings;
  they have not been fixed or suppressed by this repair.
- `layout/BaselineScreenshotOptions.kt` in the JVM test source set defines shared screenshot
  comparison options. Full analysis of the original 1,216 failures found no dimension changes
  and at most 5/255 drift per channel. RGBA distance 0.035 tolerates that grayscale rounding,
  with zero positional tolerance and zero allowed pixels outside the color tolerance.
  Seven policy tests cover noise, real color changes, geometry, dimensions, and sparse changes.
  Small color changes within that distance are intentionally indistinguishable. Goldens remain
  unchanged; see the roadmap for actual verification results and exclusions.
- Bundled subreddit lists use Git symlinks into a sibling `subreddit-lists` checkout. The
  initial Windows checkout contained 52/53-byte text placeholders. The repaired build gate
  validates every name and rejects those placeholders instead of packaging them silently.
  The data dependency and Windows symlink setup are validated; both rebuilt ARM APKs contain
  lists matching the source bytes and hashes. No production asset paths or link blobs changed.
  See the roadmap for the current environment state and recorded dependency commit.
- Preserve AGPLv3 and third-party notices. API approval is user-reported and personal use is
  the current scope. A future public release needs its own identity/signing/source review.
