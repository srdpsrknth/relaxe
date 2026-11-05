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

## Account/access source boundaries (revision 137 audit)

`MainActivity` Add account defaults to `LoginActivity` (Reddit WebView). Its normal click guards
custom overrides still using the built-in Client ID; long press bypasses that caller check.
Record this inconsistency for native correction, without silently changing source behavior.
`LoginChromeCustomTabActivity` shares `OAuthLoginHelper` state/token handling with the WebView
path; `AppAuthLoginActivity`/`AppAuthLoginViewModel` have their own Auth Tab/profile flow and
unsupported-Auth-Tab WebView fallback. Keep original scopes/callback scheme and access mechanisms;
branding does not authorize redirect changes. Their error parsing is not fully identical.

`AccountManagement.switchAccount` retains accounts. `switchToAnonymousMode(false)` retains saved
sign-ins/resume; true clears current resume, deletes its Account row and clears current-account
state while preserving the Redgifs token and resetting inbox count. `removeAccount` removes another
local row/resume without switching current identity. These paths do not delete a Reddit account
or themselves remotely revoke authorization; they do not clear all scoped preferences. Account
chooser names can be gated by the existing device-authentication flow. Guest's `.anonymous` Room
parent is excluded from signed-in lists, not a second signed-in identity.

**Lifecycle conflict:** `AccountDao` insert uses REPLACE; login insertion in
`ParseAndInsertNewAccount`/`AppAuthLoginViewModel` can replace an existing account row and cascade
related rows. `insertIfNotExists` exists for parent preservation. Returning-login retention needs
explicit native correction/verification, not just an onboarding marker. No fix is implemented.

`APIKeysPreferenceFragment` owns global override/client/user-agent/redirect/Giphy validation and
deferred restart for client/agent/redirect changes. Giphy is independent; override itself is not
marked restart-pending there. Keep existing native validation, QR and API owners. Revision 137's
`settings-accounts.js` only models workflow/examples; it establishes no native router, account
namespace, authentication, token storage or schema. Product proposals live in DESIGN.md.

## Theme source boundaries (2026-10-31 audit)

`ThemePreferenceFragment`/`theme_preferences.xml` own mode (0 Light, 1 Dark, 2 system on API29+
or battery saver below), independent AMOLED switch, current-slot Customize entries and Material
You enable/refresh. AccountScopedKeys scopes these choices; the library and three selected palette
slots remain shared. `CustomThemeSettingsItem` maps up to 92 fields plus a separate editor name,
including six booleans and platform-gated system-bar controls. Preserve the complete role map.

`InsertCustomTheme` unsets shared slot flags, writes corresponding theme preference files and
inserts the Room row; unchecking a previously held slot clears its preference file. Saving can
therefore apply colors, not merely add a library item. `CustomizeThemeActivity` updates the same
opened name, creates on a different non-case-only name with duplicate checks, and treats case-only
renames specially. Its draft items/name survive recreation, with load guards and explicit Preview.
Existing Back always asks discard. Online owner saves use separate local/remote/both choices;
do not generalize commented-out publishing paths into current capabilities.

`CustomThemeListingActivity` retains Local/Online tab resume, clipboard JSON import/copy, duplicate
rename/override and confirmed deletion. Delete restores affected slots through stored exact-name
defaults when present, preserving their edits. List Rename uses `ChangeThemeName`/DAO, separate
from editor save semantics; validation and active-slot/name synchronization need native review.
`MaterialYouUtils` replaces its three named generated themes and shared assignments; the source
warns about name collisions. Disabling generation does not restore the previous palette. API31+
uses system colors, API27–30 wallpaper colors, and lower versions cannot generate in that helper.
Account-specific independent palette assignment is not established by a per-account enable key.
The proposed grouped screens/save guards in DESIGN.md do not implement a new engine, schema,
account isolation, online service or migration. No native changes are authorized by this audit.

### Planned unified Material theme resolution (not implemented)

The user requires all themes to use Material You, simpler choose/edit/save flows and equivalent
customization depth. Separate Save new copy / Update shared theme is accepted. This supersedes
preserving the source's optional Material You versus other-theme UI; the source audit above still
describes current code. Wallpaper and chosen base colors are both selected; product workflow is authoritative in
DESIGN.md. Revision 138 models the workflow, not the native resolver or migration.

Candidate boundary for later native work: resolve a selected theme recipe plus appearance,
system palette and explicit overrides into one semantic role set, consumed by existing Views/XML,
CustomThemeWrapper and Compose adapters. Inspect/reuse existing mappings before adding any new
abstraction. Keep account assignment separate from the shared reusable definition and draft.
One definition can derive light/dark/black-surface variants; no raw shared-slot booleans should be
required to choose a theme. This needs explicit migration from global active-slot flags/preference
files to the accepted per-account selection intent. Stable identity/name separation, versioning,
copy/reset/account removal/backup/import treatment and shared-edit impact need a concrete native
design before schema or persistence changes. No exact new key/schema is selected.

Plan an inventory mapping every source color/system-bar capability into M3 foundation or Relaxe
extension roles. Preserve precision and meaningful state distinctions, with inherited/generated
versus explicit values and reset semantics. Dynamic palette updates must re-resolve, not overwrite
named Room themes or discard edits. Legacy literals/JSON need retained originals and reviewed
conversion where exact appearance conflicts with the unified Material model. Do not silently
force a legacy engine or claim lossless visual conversion. API/access, account data and online
theme service behavior remain separate and unchanged by a color resolver.

Research sources: [Android color design](https://developer.android.com/design/ui/mobile/guides/styles/color),
[Views dynamic colors](https://developer.android.com/develop/ui/views/theming/dynamic-colors),
[M3 Compose theming](https://developer.android.com/develop/ui/compose/designsystems/material3),
[Material Color Utilities](https://github.com/material-foundation/material-color-utilities).
System dynamic palettes are API31+; API24–30/unavailable-source fallback remains necessary without
dropping supported devices. MCU is a candidate generation/contrast/harmonization building block;
pin APIs only during native implementation. The project already declares Material Views and M3
Compose dependencies; no dependency/build change or toolkit rewrite is made/authorized now.
Native verification must cover palette changes during drafts/foreground/background, account
switches, process recreation, shared edits, failed save/import, contrast including alpha/black
surfaces, role parity in both toolkits, and device performance. HTML fixtures cannot prove these.

### Theme HTML boundary (revision 138)

`settings-themes.js` contains page-memory recipe/account/draft buffers; `settings-theme-roles.js`
inventories the source's 86 colors and three system-bar switches. Three legacy assignment flags
are represented by explicit account selection, not silently discarded capabilities. Main Settings
routes themes/chooser/editor and guards dirty Back and fixture changes; unrelated renders deactivate
the theme view before appearance updates, preventing the module from redrawing another screen.
Per-preview-mode overrides accept alpha and retain/reset invalid buffers. The synthetic library
supports explicit copy/use/update/rename/delete. At revision 138, import/Online were route
explanations; revision 139 extends those workflow models below.

This is no new native account namespace, schema, preference store, clipboard/network service or
Material algorithm. Browser color mixing is deliberately illustrative; only selected core roles
are rendered. Every source field being present is inventory coverage, not visual or Android parity.
Wallpaper fixture updates leave shared recipe definitions intact. Native implementation must adapt
existing wrapper/Views/Compose consumers to an explicitly reviewed resolver and account migration,
preserve legacy originals, and verify generated pairs/overrides/system bars and lifecycle on device.

### Theme transfer/Online audit and HTML extension (revision 139)

`CustomTheme` serialization reflects color integers to ARGB hex. Its deserializer starts from a
new object, accepts Color.parseColor strings/integer colors and booleans, and skips unknown fields;
it is not a versioned unified-Material recipe importer. Native clipboard import goes through
`InsertCustomTheme`, so embedded slot flags can immediately mutate shared active palettes. Target
review/save-copy/use separation needs an explicit native behavior boundary, not just new labels.

`OnlineCustomThemeRepository` uses PagingConfig(25,4,false,10); the filter class is empty. The paging
source uses page keys, exposes load/parse failures and has no refresh key. Metadata is separate
from the theme payload fetched for editing/copy. Preserve paging/load-state/retry ownership rather
than introducing a new browser-backed online service. Owner checks in Options hide Edit/Rename
for other authors, while the add route permits local creation from downloaded data. Owner editor
saves distinguish local/online/both, with local success before the subsequent remote update.

**Source mismatch:** Online Options Delete invokes `CustomThemeListingActivity.delete(name)` and
the local `DeleteTheme` helper regardless of metadata. Rename also invokes local `ChangeThemeName`,
not a remote rename. Do not promise remote deletion or accidentally delete/rename a same-named local
theme in a redesign. Preserve actual service/access contracts and explicitly review this native
correction later. The service consumes legacy color JSON; a new local recipe is not automatically
a compatible upload format. No endpoint, backend, OAuth or server authorization has been changed.

`settings-theme-library.js` adds synthetic Local/Online, pasted-text inspection, retained original,
review/save-copy, manual text export and owned-update review through a narrow bridge to the existing
theme study's library/editor/preview. No native parser, clipboard, file, network or converter runs.
Its version marker/64-KiB guard are fixture contracts only. Legacy field staging into preview modes
is illustrative; reviewed native role mapping, compatibility checks and schema/migration still need
design. Failed/unsupported input remains in per-account page-memory sessions; a failed online update
after a local save retains that copy without duplicating it on retry. These models establish no
production account isolation, file lifetime, persistence or remote-operation correctness.

### Adaptive source boundaries (2026-10-31 audit; planning only)

`layout-land/app_bar_main.xml` and its sw600dp counterpart use an 80dp navigation rail with four
generic slots and a FAB header, in place of the portrait bottom bar. `MainActivity` dispatches
those slots through the configured bottom-bar action values. Its sticky hidden-bar state survives
portrait/landscape/portrait. Reuse these navigation owners and preserve assignments/visibility;
resource qualifiers don't establish sufficient live pane width, height or large-text readability.

The land/sw600 `fragment_view_post_detail.xml` variants have post and comments recycler views.
`ViewPostDetailFragmentNew.onCreateView` hides/discards the comments recycler reference when the
applicable orientation separation preference is Off; swap reorders the post child when enabled.
Landscape separation defaults true, portrait false, swap false. These are reader-internal panes;
they do not implement a feed beside the detail Activity. `ViewPostDetailActivity`/its fragment,
view models, resume/anchors and media owners remain the source boundary. A future list/detail
composition must explicitly coordinate them, not mount duplicate reader/action/player owners.

Feed column/layout keys already distinguish portrait/landscape/unfolded contexts. The approved
effective-width fallback and Gallery minimum remain product requirements, not a key migration.
No default or native preference is changed. Feed/reader with a readable single-screen fallback
is selected in DESIGN.md. Revision 140 models it in HTML; no native router or Compose migration
is implemented.
Native proof must cover resize/fold/IME, selection and independent scroll restoration, Back/focus,
account/sort/filter boundaries and exactly-once read/save/vote/media effects. Source code inspection
and official adaptive guidance inform the plan; the audit supplied no build/device/rendered proof.

### Adaptive HTML boundary (revision 140)

`adaptive-state.js` computes provisional composition; `adaptive.js` keeps persistent feed and lazy
reader frames, validates child messages and forwards configuration without remounting on resize.
The model retains selected fixture identity/preferred columns/open count. `adaptive-feed-bridge.js`
wraps the scoped feed fixture's replacement method so supported post IDs remain mapped correctly
after its account-namespaced refresh, and delegates existing media/Back behavior. The reader adapter
uses existing details discussion/scroll/draft functions, token styling and Back priority; short-height
Reply controls move within the existing scroll owner. Child dialogs/media and hidden video remain
fixture responsibilities, not a second native action/player store. Adapters are inert outside their
query gates. Navigation/details HTML only add these adapters/shared tokens; standalone behavior is
intended to stay as before, with rendered regression verification unavailable.

No native router, preference/account namespace, data synchronization, fold/IME detection or persistence
is implemented. Window/keyboard/unavailable-width controls are simulations. Five shared fixtures
avoid substituting unrelated post data; missing/content-gated/provider states and real reconciliation
are not covered. Same-origin bridge/controller models are useful contract checks, not actual browser
focus/scroll/gesture or Android lifecycle/performance proof. Native work still needs the reviewed
window/pane, source-pref migration, restoration and exactly-once side-effect boundaries above.

### Adaptive workflow boundary (revision 141)

`adaptive-workflow-state.js`/`adaptive-workflows.js` coordinate synthetic list/detail/workspace
transitions using a pending token, expected frame owner and explicit read-commit acknowledgement.
`adaptive-workflow-embed.js` is query-gated on the existing Inbox/PM/Settings/composer pages. It uses
their current guards and scroll/form owners instead of a new message, preference or draft service.
Frame persistence demonstrates control flow only, not Android lifecycle or process restoration.

The Inbox module's scoped hook defers its existing fixture click/read path until navigation is
allowed; canceled selections, guard replies and resizing do not create read jobs. Native
`MessageRecyclerViewAdapter` remains authoritative: context items use `LinkResolverActivity`, PM
items use `ViewPrivateMessagesActivity`, and `ReadMessage` targets the displayed message fullname,
decrements InboxCount on success and restores unread state on failure with recycled-holder checks.
Future adaptive routing must coordinate guards with accepted entry and preserve those owners,
descendants and badge/rollback semantics. The HTML hook is not a replacement Reddit read helper.

The scoped PM API accepts the exact selected row, keeps same-thread input and caches synthetic
messages/scroll by thread. Notifications/Sent use a separate minimal route/content preview, not a
fabricated PM conversation. Native Sent behavior is not changed. The Settings API caches HTML
category view/stack/scroll and delegates to existing dirty guards. Native `SettingsActivity` still
copies preference extras, instantiates through FragmentFactory, records resume navigation and uses
FragmentManager Back/title restoration; reuse this boundary when adapting rather than adopt the
browser cache as a new native router/schema. The six-type composer exposes its existing exit/pause
helpers only under the adaptive flag. Real Reply/PM/composer restoration must be verified on Android.

Short-height adapters move existing controls within existing scroll regions; scoped DOM models
exercise routing/guard/content contracts, not actual reflow, IME, focus, service accessibility or
simultaneous player ownership. No Room/account/pref/API/identity/toolkit migration or native action
is implemented. Exact adaptive thresholds and full standalone rendered regression remain pending.

Revision 142 keeps browser focus routing separate from data/state owners: current-configuration
acknowledgement gates explicit content focus; reflow repairs focus only when its pane becomes
hidden. Theme validation reveals the existing draft field and reports update failure inside its
existing modal. These are HTML adapter/validation refinements, not new native navigation, draft,
preference or action boundaries. Model/source checks do not prove actual focus/service behavior.

Revision 143’s reader Appearance editor uses an allowlisted adapter into `settings-video.js`’s
existing `details|account` and `comment-display|account` fixture buffers. The draft is copied on
entry; both groups are validated before an Apply writes only exposed keys. Native ownership stays
with PostDetailsPreferenceFragment’s dedicated preferences and CommentPreferenceFragment’s default
account-scoped keys. Media encoding reuses the existing table; no new Boolean media keys, feed
layout scope, cache operation or native write is introduced. The text snapshot drops controls/IDs
and media nodes before insertion. Reader appearance decoration leaves the source discussion/draft/
action/scroll owners in place. The adaptive child reports modal presence through its checked
source/origin channel; the host gates sibling selection while its draft is open, and Back delegates
to the same editor guard. These helpers remain HTML scaffolding, with no native correctness claim.

### Rendered HTML repairs (revision 149)

The actual browser pass found that theme/filter modals removed themselves synchronously after
`close()`, before the adaptive adapter's capturing close listener could reject a canceled guard.
Their modal helpers now retain the closed element until its close event, then remove it. Successful
discard still invokes the existing allowed-transition callback; no second router/token/state owner
is introduced. Repeated Keep editing/Escape and subsequent discard transitions were verified in
the real adaptive Settings frames. Theme account fixture changes also clear transient preview
choice/notice, while shared recipes and each account's assignment/mode stay with their existing
HTML owners.

Saved-row flex sizing and reader short/narrow scrolling/focus repairs are presentation-only. Reader
Appearance keeps its existing Settings buffers, apply/dirty guards, snapshot and sibling-pane gate;
there is no native preference, action, account, schema or restoration change. ROADMAP.md records
the actual rendered coverage. The 2026-11-05 isolation follow-up reproduced the observer error on a
script-free parent/iframe, with a clear iframe-free control, placing it outside Relaxe page scripts.
No prototype observer or native architecture change was justified; the supported browser does not
expose the exact internal call site. The minimal reproducer and regression limits live in ROADMAP.md.
No native verification is inferred from it.

## Planned per-account onboarding and download default

User-requested during HTML exploration: set up basic layout/theme choices and prompt for a
default download folder per account. The user selected an optional Choose folder / Set up later prompt, with browsing available
without storage access. Product flow is owned by DESIGN.md's “Per-account onboarding” section;
native work remains unauthorized.

Source findings: `AccountScopedKeys` already classifies layout/theme selection as per-account;
the custom-theme library is shared. The four download-location keys and folder switches are
not in that account-key set; `DownloadLocationPreferenceFragment` reads/writes the global
values through the default preferences. This needs an explicit scope/migration change, not
just another entry in a wizard. `DefaultTheme.applyOnFirstLaunch` seeds unused installations;
`AppAuthLoginViewModel` completes existing Reddit profile/token/account insertion. No general
basics wizard was found in the inspected launcher/login/settings paths. Retain existing API
checks, login owners and `AccountScope` rather than adding another identity or preference
namespace. HTML `setup-account` and page-memory buffers are synthetic scaffolding only.

Revision 148 selects Large card / Card 1 / Filled as the initial highlight for genuinely new
account/Guest setup. `settings-onboarding.js` changes only the fresh page-memory draft initializer;
existing-account ensureExisting and chosen progress remain separate. No completed/native write is
made merely by opening. Actual custom compositions/context overrides are not loaded by the minimal
fixture and must remain with existing native owners on returning/restored-account setup.

Future native setup should coordinate existing layout/theme owners, with a separately scoped
default-folder choice and account completion/progress where needed. Define new-account versus
existing/restored-account eligibility without resetting existing choices. Explicitly map the
new default against legacy global image/GIF/video/NSFW locations and separation flags, plus
copy/reset/removal/backup behavior, before migrating any stored values. URI access grants stay
Android app/device resources, not per-account security boundaries; preserve validity checks,
shared-grant ownership and reselection when a restored URI lacks access. Device/global settings
must not be accidentally re-scoped. No storage schema, key spelling, migration algorithm,
login hook or native onboarding state machine is implemented by revision 135.

## Planned native motion work

The user requested a coherent motion pass across the app during Android implementation.
DESIGN.md owns its scope and accessibility/state constraints. Reuse existing presentation/
lifecycle/state owners through incremental native slices; do not infer a wholesale UI rewrite,
a new animation framework or approved timings from the HTML samples. Include interruption,
rollback, restoration, account/gesture ownership, reduced-motion and real-device performance
verification. Revision 136's onboarding frames reuse the existing Settings/feed/media HTML
renderers and a constrained same-origin preview bridge; they add no native animation or state
API and do not establish Android performance.

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

Revision 144 reinspection confirms the disclosure proposal does not require a new send, upload or
draft boundary. CommentActivity retains parent extras; PostPollActivity retains ordered nonempty
options, minimum two and its existing payload. PostImageActivity Select again clears imageUri and
preview immediately; the HTML’s staged replacement/retained-old-selection behavior is a deliberate
future presentation/lifecycle change, still unimplemented natively. Preserve source Gallery pending
and failure ownership rather than apply a generic keep-all-attachments rule. DESIGN.md owns the
grouped direction, selected as option 1 at revision 145. The Reply entry comparison is retired;
no native send/upload/draft owner or persistence contract changes. Saved-layout fixture buffers
remain scaffolding: their per-account organization does not decide reusable-definition ownership
or active-copy deletion/migration behavior; that product review is still outstanding.

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

Revision 50 adds Text/Poll inline-image fixtures. Native `UploadedImagesBottomSheetFragment`
and its adapter reuse an Activity-owned `UploadedImage` list. `Utils.uploadImageToReddit`
calls the existing uploader for a media key, inserts a Markdown block at the body selection,
and cleans up app-owned camera scratch files on success/failure. The uploaded-image parser
and `RichTextJSONConverter` map known keys/captions into the existing submission payloads;
retain Activity state, failure handling and the upstream account/formatting/editing caveats.
The HTML uses only bundled samples, separate page-local Text/Poll lists and guarded delayed
insertion. Its account-picker lock, pending-Post guard and thumbnail manager are proposals,
not native upload coordination, account isolation or persistence guarantees.

Reply study 19 reuses shared HTML styling/shell without replacing study 04's inline fixture.
Native `CommentActivity` receives parent fullname/body/depth/position, renders parent Markdown,
selects an account and retains image/Giphy capabilities. `CommentActivityViewModel` owns
in-flight sending/result delivery through configuration changes; `SendComment` keeps the
per-account authenticated path and plain versus rich-text submission. Success returns the
comment/parent data and deletes the saved reply draft; failure retains writing. Caller guards
cover Guest, archived/locked posts and locked comments. Global account switching closes the
Activity. Preserve these routes and result/restoration contracts in native implementation.

Revision 52 moves the same HTML reply editor/actions between a dedicated screen and a slot
under a stable synthetic parent card; it does not create a second draft/send state machine.
Thread cards remain while the inline editor opens, moves or closes. The user requires this
as a configurable native reply style, with Inline selected as the default and Separate screen
retained. Settings scope/storage and RecyclerView editor
ownership remain implementation/design work. Reuse existing preference wrappers, parent IDs,
ViewModel/send paths and result handling; no new native abstraction is implemented here.

Source gap for explicit native review: `CommentDraft` is keyed by parent fullname + REPLY/EDIT
type, with no account key. It stores text/time, not uploaded-image/GIF metadata; Activity state
separately retains attachments across recreation. This is not evidence of cross-account draft
isolation or attachment recovery after leaving. Revision 56 models account/parent/REPLY
snapshots of text and bundled sample metadata in page memory. Author labels, compact/expanded context, draft-exit labels and reply attachment entries
are presentation proposals; no schema/account model, network or native restoration is changed.

GIF source inspection: `CommentActivity.onGifSelected` keeps one `GiphyGif` descriptor and
inserts its Markdown token at the editor selection. `GiphyGifBlockParser` resolves matching
descriptor/upload metadata; saved draft text alone does not establish recovery. Revision 53
uses an allowlisted bundled sample with a paused preview and proposed re-selection guard,
without contacting Giphy. Reuse existing provider/access/eligibility and rich-text conversion;
multiple independent GIF descriptors and draft-metadata persistence are not established.

Reply revision 54 reuses the earlier HTML manager presentation with bundled images only.
Native `UploadedImagesBottomSheetFragment`/adapter provide Choose/Take and filename/key reuse;
`Utils.uploadImageToReddit` inserts at callback-time selection, retaining uploaded metadata in
Activity state. The HTML inserts samples immediately at its captured selection and proposes
account locking and missing-descriptor guards; native upload races/timing, permissions/camera
URI ownership and cross-exit metadata recovery are not established or changed.

Approved future behavior: Reply drafts must restore text and image/GIF selections together
for the same account and parent, keeping draft type distinct. Revision 56 demonstrates that
contract with cloned, page-memory sample snapshots and account-scoped deletion on success/
empty close. This is not a Room migration or proof of native recovery. Native work must use
existing account wrappers and draft/send helpers, explicitly design metadata/asset lifetime
and migration, and verify recreation/process/exit behavior before claiming this requirement
is delivered. Draft account-switch guarding in HTML is a proposal. The user also requires
complete Edit comment draft recovery for the same account/comment, kept separate from Reply
drafts through EDIT identity. Native account/metadata storage and migration remain unimplemented.

Edit source starting points: `EditCommentActivity` loads original content/media metadata,
uses the existing image/Giphy helpers and ViewModel submission/results, and reads separate
`DraftType.EDIT` records via `EditCommentActivityRepository`. `EditPostActivity` displays the
post title with a body editor; its ViewModel retains the existing `editPostOrComment` path.
The user selected Edit comment to follow the Reply style setting. Study 20 reuses the HTML
writer in Edit mode, while native code remains separate and unchanged. The inspected comment
adapter exposes Edit for the current author on a known post that is neither archived nor
locked; it checks comment lock separately for Reply. Preserve that distinction and inspect
other entry routes before native work. Parsed edit results reconcile fullname if position
changed; a local-content fallback remains available. The original body stays visible above the inline editor. Complete account/comment-scoped
EDIT draft retention is now required in DESIGN.md; no native ViewModel/API/draft refactor
is implemented by the shared browser script.

Edit post study 21 keeps a separate HTML controller because this native flow has different
contracts: a fixed title and plain body update, no enabled image/Giphy toolbar, and no saved
post-edit draft in `EditPostActivity`/`EditPostActivityViewModel`. The two-argument Markdown
adapter constructor disables attachment entries. The inspected details menu requires an owned
text post, then rejects media metadata; other entry routes remain to audit. Preserve its own
eligibility, changed-body discard (including empty body), ViewModel HTTP/API error handling,
result/refresh and account scope. Revision 79 selects the shared Reply/Edit comment style:
Inline by default, Separate screen available. This is a shared presentation preference, not
a merger of edit/reply behavior, guards or drafts. HTML style selection/local success/failure
remain fixtures; native preference integration, lifecycle, API and persistence are unchanged.

Private-message creation has a different boundary from Reply/comment editing:
`SendPrivateMessageActivity` holds the active account token and optional recipient prefill,
validates recipient/subject/body, then delegates to `message/ComposeMessage`. The helper calls
the existing authenticated compose API with `api_type`, `return_rtjson`, `subject`, `text` and
`to`, checking HTTP and parsed API errors. The layout caps subject at 100 characters. Its
Activity-owned submitting flag prevents duplicate Send; failure keeps fields and re-enables
Send, success exits. No formatting/attachment toolbar, explicit draft repository or custom
discard guard is present in this inspected form; `onSaveInstanceState` only calls super.
Do not infer process/account-switch correctness from that. Study 22 selects text formatting
because Reddit documents Markdown for the existing compose body (sources in DESIGN.md).
Current Reddit help describes Chat migration/read-only PM archives; live compose/reply route
availability needs a separate capability audit before native work. The toolbar selection is
not proof of live API support. The user selected alignment with Continuum's legacy messaging
and reviewed upstream compatibility fixes: preserve existing read/compose/reply/API/error
boundaries, defer the external Chat shortcut, and add no Chat client or custom runtime
compatibility-detection/read-only system. Verification of service availability is later native
validation, not approval to introduce a new capability layer. The user separately selected
Keep writing / Discard message confirmation for leaving an unsent PM; it changes presentation
only, with no saved PM draft repository or API change. Native integration is unimplemented.
Preview beside Send is also selected as a presentation addition; its limited HTML renderer
does not establish native Markdown fidelity. Pending input locking remains a browser proposal.
The study adds no
native storage, attachment or messaging capability.

The checked-out Continuum Inbox has two native pages: `WHERE_INBOX` for Notifications and
`WHERE_MESSAGES` for Messages, fetched through `/message/{where}.json`. `ParseMessage` excludes
`t4` PMs from the first and accepts only `t4` for the second. PMs are not Reddit Chat:
`PrivateMessagesDetailRecyclerViewAdapter` renders the root and replies as sent/received
balloons with Markwon, and `ViewPrivateMessagesActivity` has a bottom text field/Send action.
`ReplyMessage` submits Markdown with the target fullname through `/api/comment`. Success adds
the returned reply, clears the input and updates the Inbox; failure keeps input and reports
the API error. New messages still use the separate `/api/compose` form. The inspected routes
contain no Chat migration, automatic read-only capability fallback or dedicated Chat launcher.
A source/manifest/dependency search found no Reddit Chat client integration; references to
chat previews concern external sharing, not messaging transport.

`FetchMessage.fetchUnreadMessagesCount` explicitly avoids Reddit's account `inbox_count`,
which can stick on archived PMs/Chat that the app cannot clear (source references #334/#361).
It counts the accessible unread listing's first page, capped at 100, through the existing
`InboxCount` account preference handling. This is a badge workaround, not Chat support or
proof archived PMs are available through the API. Preserve it when restyling Inbox. Source
presence of Compose/Reply does not establish live service support. DESIGN.md owns the selected
Continuum-alignment policy and remaining composer/thread presentation questions.

Study 23 now uses selected received-left/sent-right bubbles, following Continuum; the stacked
row comparison is retired without adding a native setting. Thread identity and the reply
buffer are preserved. Its standalone HTML controller reuses the theme/shell
fixtures and simulates replies locally; it does not replace the native Activity/adapter/API
helpers. Keep native sent/received, timestamp/copy, reply-target, account/read-count and result
handling. The fixture's pending-exit wait and independently scrolling composer are not
approved native lifecycle/IME decisions. No API requests, persistent drafts or native changes.

Study 24 selects grouped More sections and user reordering of sections/actions within each
section. The HTML ordering editor preserves stable IDs and full order before filtering
availability, so a temporarily hidden action keeps its position without gaining capability.
Guest/signed-in ordering buffers are separate page-memory fixtures, not native storage. One
More order per account shared across all feed layouts, including saved custom layouts, is
selected; layout copies must not fork it. Later persistence
must reuse the existing account/preference mechanisms and consider imports, backup and new
upstream action IDs; no native preference/schema or parallel action backend is implemented.
Native `PostOptionsBottomSheetFragment`
owns conditional rows and dispatch, while read/save/navigation and other accepted Compact
actions also involve existing helpers and callers. Preserve Guest versus authenticated local/
API paths, separate Guest/locked/archived Reply visibility, owner/moderation-handler checks,
media/recovery/preferences, caller fullname/position, permissions, events and rollback. The
HTML's representative text-post menu and per-fixture state are not a new action layer or
proof of complete native parity. Settings entry and native drag/accessibility
mapping remain review work;
actual report/moderation/filter/share/download flows still require their own source review.

Study 25's Report comparison reuses HTML theme/shell fixtures only. Native `ReportActivity`
receives subreddit and thing fullname, starts with four `ReportReason` general entries, and
loads rule short names through `post/FetchRules`. `ReportReasonRecyclerViewAdapter` enforces
one clearable checkbox across general/rule arrays; Parcelable selection is saved with those
arrays. Rules failure leaves the general entries available. `ReportThing` retains OAuth,
`thing_id`, `sr_name`, reason-type/value, selected-type marker and `api_type=json`; its current
helper treats successful HTTP status as success without parsing API error content. The
inspected Send handler has no submitting guard. The HTML does not implement or validate those
network/lifecycle mechanisms. General display wording is provisional and must not rewrite
native payload strings. Preserve caller eligibility: post More hides Report for Guest, while
the inspected comment binding/layout does not apply that same guard. This requires later
caller/access verification, not an inferred global behavior change. No Other free-text field
or additional Hide/Block call was found in the inspected Report form. However, the
[public report endpoint documentation](https://www.reddit.com/dev/api/#POST_api_report)
states that reporting links/comments implicitly hides them. The browser's unchanged post
after synthetic success cannot establish a no-hide contract. Verify real server behavior
and caller/cache/list reconciliation before native replacement; do not blindly add a second
Hide request. Official-app category/follow-up parity is not established by the helper's
parameter names. The category-first flow is selected; revision 68 demonstrates branch-local selection,
Back/category focus return, validation and a distinct confirmation in browser page memory.
Its representative categories and Spam sub-reasons are not verified native payload mappings.
A bottom sheet is selected for every Report stage; revision 69 removes the screen selector
and ignores legacy presentation overrides. Source-backed reporting research lives in
DESIGN.md; native lifecycle/results/accessibility remain unverified.

Study 26's deletion fixture does not replace native caller checks or result handling.
`ViewPostDetailFragmentNew` confirms own-post/comment deletion; `CommentMoreBottomSheetFragment`
receives edit/delete eligibility from its caller inside signed-in/token handling. The details
ViewModel uses `thing/ThingDeletion.kt`: post Deleted closes the Activity through its observer;
comment deletion resolves fullname/position, retains a [deleted] parent with replies or removes
a childless comment, and publishes its event. Failure does not apply the success update.
`ViewUserDetailActivity` separately confirms and calls `thing/DeleteThing.java`. Both inspected
helpers use OAuth/fullname and HTTP success, without establishing complete API error parsing,
pending/recreation safety or cross-screen reconciliation. Preserve these existing boundaries.
The compact content excerpt is selected; revision 70 retires the brief-content comparison.
The HTML's owner gate, local outcomes and selected excerpt establish no native parity.

Study 27 maps the post/comment moderator sheet inventories and dispatch boundaries from
`PostModerationActionBottomSheetFragment.kt` and `CommentModerationActionBottomSheetFragment.kt`.
Post More requires `isCanModPost` and a parent `PostModerationActionHandler`, launching on that
parent's child manager. Comment More checks `isCanModComment`, with parent/activity launch
branches; the inspected comment sheet casts its parent to `CommentModerationActionHandler`.
Do not treat the HTML no-handler gate as an implemented native guard. Preserve approvals/
removal visibility, distinct spam flag, toggle labels, caller flair suppression, account,
fullname/position and handler/API/event results. The HTML's own-content route previews
establish neither moderation success nor fine-grained permissions; no state/backend or
moderator preference system is added. Compact primary buttons and confirmation for
Remove/Spam are selected. Revision 72 retires the immediate comparison and legacy overrides.
Inspected fragment handlers delegate directly to ViewModels; the details ViewModel calls
`removeThing` with fullname/spam flag and updates approval/removal models and events on its
result. The selected confirmation is a new required presentation step, not implemented
native behavior. The browser
pending route is cleared on target/access/state changes and never sends a request. DESIGN.md
owns the selected behavior; native pending/recreation/result handling is unverified.

Study 28 maps the More download presentation to existing `PostOptionsBottomSheetFragment`
branches: type-specific downloads, GIF MP4 availability, known gallery-current index and
gallery-all without a current index. Preserve separate download/in-gallery/MP4 flags through
permission results, folder/NSFW checks, naming and service dispatch. The source uses shared
download-location preferences in this path; do not invent account-specific folder semantics
from the visual account fixture. GIF video variants use the plain-video media service path;
Reddit video has its existing dedicated service handling. The HTML only previews choices and
Back/return; no new download backend, permissions or job-state model is implemented. DESIGN.md
owns the selected separate-row presentation; revision 73 retires the extra chooser. Exact
native parity remains unverified.

Study 29 preserves `ShareBottomSheetFragment` post-link, supplied media-link, conditional
GIF/video-variant and post-object screenshot routes. The inspected Gallery More caller supplies
no media URL. `BaseActivity` retains ACTION_SEND text/plain with system chooser and clipboard
helpers, both using the existing shared-domain preference; the variant's raw display does not
bypass final helper processing. Share-with-comments uses supplied comments or existing Guest/
OAuth fetching with BEST/filter, then the existing image helper/settings. Keep failure feedback,
account/access and all other caller contracts. Paired Share/Copy controls are selected;
revision 74 retires the row comparison. The HTML remains presentation only, with inert sample
URLs and route announcements; no clipboard, system sharing,
fetch, screenshot/file export or new native state model is implemented. DESIGN.md owns the
selected arrangement; comment-specific sharing and native restoration remain separate work.

Study 30 isolates missing download-location feedback. The inspected More download branch
uses a short Toast and dismisses when its destination is unset; Gallery-all checks potentially
several locations. The inline notice with direct Settings route is selected; revision 75
retires the dialog comparison. It remains a new native presentation requirement. Reuse `DownloadLocationPreferenceFragment` and its destination settings,
ACTION_OPEN_DOCUMENT_TREE and persisted URI access; retain existing preference scope. No
folder picker, grant, preference write, retry, job or notification is implemented in HTML.
The proposed Settings route must not queue/resume downloads implicitly. Missing destinations,
permission denial, revoked access and transfer failures remain distinct native states; service
progress/results and lifecycle/restoration still require later work.

Download service inspection confirms existing notification-owned progress/results and eligible
finished-file Open/Share/Delete actions. `DownloadMediaService.onStopJob` returns false in the
inspected path; do not invent automatic retry/resume from a browser fixture. Keep service,
notification permission, output/error and partial-gallery contracts for native verification.
Study 31 isolates in-app-browser external-action placement. Preserve `LinkResolverActivity`
link-handler/account-scoped provider preferences and fallback order, and `WebViewActivity`
current URL, Guest/no-token mode, direct Close, history-first system Back, state saving and
errors. The WebView menu's external route uses ACTION_VIEW + `applyBrowserDomain`, while
Share/Copy use existing outbound-share helpers. Visible Open in browser is selected; revision
76 retires its placement comparison. Quick Copy access is required, with visible Copy plus
toolbar hold independently editable in Settings. Revision 77 adds page-memory account/Guest
buffers for those switches; revision 78 records both switches defaulting on as selected. Native work must reuse existing
account-key/preference wrappers, with keys, migration and persistence mapping still unimplemented.
All Copy entry points must reuse the current-URL native helper, not a new clipboard/domain
mechanism. The HTML gesture/context-click
and simulation routes are illustrative, with no WebView, external launch, cookies/session
behavior, clipboard, sharing or live restoration. Native hold thresholds/cancellation and
accessible custom actions remain unverified. DESIGN.md owns the required customization and
selected defaults.

Study 32 maps the 25 Settings root entries/order/sections from `main_preferences.xml`.
`MainPreferenceFragment` hides Security on unavailable strong-biometric/device-credential
capability and gives Filter/Privacy rows their existing routes. `SettingsActivity` owns native
search, account chooser, fragment/title stack, per-file account-scoped preference lookup and
resume recording. Preserve these boundaries, per-key scope and API/access/theme/storage
mechanisms. Brief category descriptions are selected; revision 80 retires title-only rows. Feed layouts
entry is selected under Interface → Posts and Feed. Revision 81 retires the root comparison;
revision 82 applies Posts and Feed as presentation text without changing native identifiers. Existing Interface/
Posts XML already owns the post-layout defaults/overrides, columns and Compact/Gallery
settings; a consolidated editor must map to those mechanisms. The selected navigation must retain existing routes and preference stores. Local path/Back restoration
is illustrative; the Interface/Posts excerpts and four-family page are not full native forms.
Other category/search/account actions remain route announcements only. No key, migration,
credential, authentication, settings/account/reset/import/export or search implementation is
changed. The root group names do not establish uniform scope for every nested preference.

Revision 146 confirms `AccountScopedKeys` scopes default post/unfolded/link layout keys and the
whole POST_LAYOUT_SHARED_PREFERENCES_FILE; SharedPreferencesUtils retains separate front-page,
subreddit, multireddit, user, search and History layout contexts. Browser savedByAccount holds
definitions, while row opening copies into editorBuffers and explicit Use copies into
selectedBuffers. These are distinct fixture responsibilities, not a native reusable-library or
context-assignment model. DESIGN.md proposes stable reusable identity with applied snapshots so
rename/delete cannot silently alter active appearance; shared device-library ownership with independent
account/context use is selected at revision 147. No schema, key, native library, account removal or
migration is implemented. The HTML library holds only projected family presentation snapshots and
provenance; existing selectedBuffers now use account/context/family keys. A contextual baseline can
inherit its account default, while explicit Use writes only that context. Definitions, editor drafts
and selected snapshots remain separate page-memory concerns. The host reuses its dirty-exit/sheet
return guards. Synthetic context labels are not a native router or proof of all override precedence.

Revision 83 selects saved-copy access below the four families on Feed layouts and retires
the separate-page comparison. The synthetic catalog does not implement a library, apply a
feed layout, save/overwrite data or select account/context ownership. Native saved-copy
assignment, persistence and management still need mapping; retain existing contextual overrides
and the selected always-new-copy Save as layout contract. DESIGN.md owns selected navigation
and the selected scrolling preview placement. Revision 84 adds a focused Large card editor
with separate page-memory account/Guest buffers and four presentation controls. It uses existing
study theme tokens/assets/icons, not the production feed renderer. Revision 85 selects all
layout controls visible under section headings. Revision 86 selects explicit Use layout,
separate from saving a new copy. Revision 87 selects Keep editing / Discard changes on an
unapplied exit and demonstrates guarded header/sheet/keyboard/app-bar exits, rollback to the
last selected fixture snapshot, and new-copy naming/saving before or after Use layout.
Draft/selection/saved-copy buffers are separate by account fixture and clear on reload; this
does not choose native library ownership, assignment or persistence. Saved copies are not
mutated by later edits or rollback.

The contextual feed-sheet direction is accepted at HTML level, using the same controls and
synthetic sample. It temporarily renders draft appearance beneath a non-modal expandable/collapsible
sheet; explicit activation retains the selection and Discard restores it. No native settings,
feed/default/context override, media/network/read/vote/save side effects, preference keys or
API/access mechanisms change. Post-details entry meaning remains open: it must not silently
reuse feed-card controls for comments. Native implementation must preserve account/context
lookup, layout migrations, scroll anchors, media policy and restoration; non-modal sheet focus,
IME/system Back, gesture coordination and performance remain unverified.

Revision 88 requires independent scrolling of the exposed feed and editor controls. The
browser bounds the feed's scroll viewport to the sheet top using a ResizeObserver, without
replacing feed DOM during control changes, and restores its normal viewport on close. Hidden
feed focus is disabled when no useful exposed area remains. All four synthetic posts receive
presentation changes; no read/media/API or native preference behavior is established. Preserve
native feed identity/paging/anchors, media lifecycle and touch/accessibility arbitration when
mapping this interaction. The earlier post-details scope question was not understood; it is
deferred without a decision while the feed editor is refined.

Revision 89 extends the focused Large card editor from four to ten presentation fields, adding
study 17's information visibility/order and spacing controls. Draft/selection/new-copy snapshots
include all fields, with no theme/access/media policy or account data captured. All synthetic
cards share live styles; title/info DOM order follows visual order, and hidden author/age spans
include their separators. Wrapper reuse and exposed-feed scrolling remain. No native keys,
units, defaults, context migration, saved-library ownership or persistence are implemented.
Revision 90 adds a primitive toolbar-priority string to those snapshots and carries study
17's measurement/priority contract into this fixture. ResizeObserver-driven fitting reserves
More and hides only a suffix without rewriting the configured order; focus falls back to More.
Checkboxes and accessible Up/Down controls configure direct actions. The seven-item grouped
More preview and route announcements do not replace study 24's complete per-account menu or
its ordering/eligibility. Guest vote/save previews require sign-in; no API, read/vote/save,
clipboard or external launch occurs. Native action/preference/menu abstractions still own
those contracts. No native toolbar implementation or account/persistence mapping is added.

Revision 91 requires User and Subreddit toolbar choices, extending the fixture catalog to nine
without changing the priority/snapshot schema or native default keys. Per-post author/subreddit
identity is separate from metadata visibility, active account and saved layout data. More
options retains its required fixed-last availability; “options” is interpreted as that menu.
Revision 92 selects direct profile/subreddit pages for those taps. The fixture only announces
that destination and current post target; native routes must reuse the existing navigation,
account/access, eligibility and restoration mechanisms. No real navigation/API behavior is
implemented. Icons remain placeholders until Android implementation, as requested.

Revision 92 adds excerpt length and image-preview height limit to the flat presentation
snapshots. Title/body visibility stays separate. Fit mode contains the complete image within
the proposed cap; Square retains a square frame and its preferred cap for later Fit use. Native
media dimensions/applicability, Markdown/AT truncation, video/GIF lifecycle and provider
behavior remain unapproved/unverified. Revision 95 selects No limit as the Large card media
default with optional height limits in Settings, reusing the same `mediaheight` field; no
native preference key/store/migration changes are implemented. Revision 93 selects the two-line Large card text-body default
at design level and applies it to the HTML fixture only; native defaults/migration are not changed. The `sample=text` review flag only positions synthetic content/controls;
it is not resume-state mapping. Existing native media, read, paging and account policies remain
constraints when implementing these settings.

Revision 96 adds `columns` to the HTML editor's flat layout snapshots (fourteen fields).
Preferred count is saved with presentation choices; effective count is recomputed from the
actual grid width/text scale and current gap. The study 17 readable-width heuristic is reused,
with its provisional CSS units/two-column ceiling. This does not implement a new native
preference or override existing portrait/landscape/unfolded values. Native mapping remains
required before implementation. No tablet panes/navigation, paging or restoration boundary
is established by the fixture. Narrowing preserves preferred count and moves focus to the
picker explanation if the focused picker becomes unavailable. Revision 97 selects a fresh
Large card preferred count of two at design level, retaining one as a selectable option and
the narrow/large-text fallback. Only the HTML initial value changes; native stored values,
preference keys, migration and restoration are untouched. Revision 98's thumbnail comparison
reuses the existing study 17 bridge/feed rather than introducing a new Compact state owner. Revision
99 selects Right thumbnails for fresh Compact presentation configurations, keeping Left/Hidden
configurable and existing named snapshots intact. Only HTML defaults/labels change; native
thumbnail-side preferences and existing user values are not changed.

Revision 100 makes the HTML editor family-aware. Large retains fourteen presentation fields;
Compact has twelve. Draft/applied buffers use account+family keys and named copies carry their
family so opening/changing one cannot overwrite another family's selection. This is fixture
state, not approval of native library ownership/migration or a replacement preference store.

Compact reuses the study 17 renderer and same-origin comparison protocol inside a settings-only
embed. Source checks validate origin and current iframe identity; only known control/action
values are accepted. The inner shell is suppressed, actual viewport height replaces the old
fixed sample height, and existing scroll-intent messages reach the outer shared shell. Inner
toolbar customization updates the outer draft. User/Subreddit extend existing fixture action
IDs with destination announcements; settings-only post/media/actions do not mutate synthetic
read/vote/save state and Guest vote/save stays gated. Other workbench fixture behavior stays
separate. Shared-shell startup now waits for a body before installing its observer, including
while previews are replaced. None of this establishes native lifecycle/restoration, gesture,
performance, API, storage or TalkBack correctness.

Revision 101 reuses the embedded study 17 protocol for Gallery as well as Compact. Gallery
adds a seven-field, family-scoped presentation snapshot; applied/draft/copy separation is
unchanged. The new caption ID is validated by an enumerated select in the same-origin bridge.
It controls a visual caption, not post eligibility, content filtering or media policy. Visual
tile captions use the same media-entry action as their images; non-media titles keep details
entry. The settings embed suppresses duplicate inner media navigation; the outer shared shell
owns it. Existing Gallery viewer paging/return behavior is reused. No native preference schema,
API, lifecycle, account store or restoration implementation is changed; existing orientation/
unfolded column settings still need explicit mapping, and wider Gallery counts remain open.

Revision 102 delegates Gallery hold/context-menu/Shift+F10 to the existing feed gesture
handler through a scoped `RelaxeFeedStudy.longPress` hook. Other layouts retain their existing
toolbar behavior. Gallery removes its visible grid More and adds a focus-visible details action;
short media taps retain the existing viewer/axis/album/return path. Hold and accessible details
entry resolve the exact post in the current scoped fixture list through the existing details
route handler. That dialog is a destination demonstration, not a new post-details implementation.
Gallery movement cancels hold and suppresses its release click; timings remain browser-only.
Viewer More is unchanged. These HTML changes do not establish native read marking, account
restoration, gesture arbitration or accessibility correctness.

The revision 103 Vertical framing proposal extends the same family-scoped HTML editor and
validated study 17 select bridge. `RelaxeFeedStudy.mediaFraming` resolves the current post's
photo/album or video/GIF framing; temporary player overrides reset on a framing edit or entry
to another Vertical post. Non-Vertical viewers retain their existing framing behavior. The
settings embed permits Vertical media entry through the existing viewer, as it does Gallery,
instead of intercepting it as a route announcement. Two framing values alone are copied;
At revision 103, Video/Data Saving Mode rows only announced their existing Settings destinations.

Source audit: `res/xml/video_preferences.xml` separates feed autoplay/its mute/visibility
controls from general mute, loop, speed and resolution preferences. `VideoPreferenceFragment`
keeps its EventBus change notifications and dependencies. `ViewVideoActivity.preparePlayer`
uses full-screen loop/mute/resume state and explicitly starts playback; its initial frame is
FIT. Feed autoplay defaults and explicitly opened full-screen playback must not be conflated.
`data_saving_mode_preferences.xml` and `DataSavingModePreferenceFragment` retain network-mode,
preview-disable and provider-quality behavior. `CustomFontPreferenceFragmentCompat` installs
`AccountScopedPreferenceDataStore` through `SettingsActivity.accountScopedPreferencesFor` for
scoped files. Category placement alone does not establish per-key/global scope. The HTML
proposal changes none of these native classes, keys or defaults; native Vertical integration
must reuse the existing mechanisms rather than save playback/data policies inside a layout.

Revision 104's `settings-video.js` presents all 18 `video_preferences.xml` controls with
resolved `strings.xml`/`arrays.xml` values. `AccountScopedKeys` lists every one as account-scoped;
its page-memory fixture Map therefore isolates the selected account and Guest. HTML control
changes never call a player, provider, preferences store or API. The existing Settings root
Video row now enters this HTML category; its standalone query and Back/parent row restoration
use the same navigation stack. Vertical editor entry uses the existing discard guard and
restores sheet size/control scroll/draft on Back; it reconstructs the embedded viewer and does
not establish post position, playback time or native lifecycle restoration. Playback and
Autoplay single-page organization is selected at HTML design level. Native source keys/defaults/EventBus/access paths
remain untouched; do not serialize playback/data policy in saved layout snapshots.

Revision 105 reuses `settings-video.js`'s field renderer for the six Data Saving Mode keys.
Their absence from `AccountScopedKeys.DEFAULT_FILE_SCOPED` keeps them global under the
existing wrapper; the HTML fixture likewise uses one shared data buffer across accounts/Guest,
not Video's account buffers. `DataSavingModePreferenceFragment` hides five children while mode
is Off and clears the other preview switch when either is enabled. The HTML preserves mode
values and this mutual exclusion, retaining child values across Off. Showing disabled children
while Off is now selected at HTML design level. The hidden comparison is retired; old review
overrides no longer change it. Native behavior remains unchanged.
No network detection, provider fetching, autoplay decisions, native storage or EventBus calls
are added. Root and Vertical links share the category/navigation/guard, including return to
the triggering editor row. Native media position/lifecycle restoration remains separate work.

Revision 106 begins the Gestures & Buttons review with a Media excerpt. The existing
`swipe_vertically_to_go_back_from_media` key defaults true and is account-scoped. Inspected
readers are `ViewImageOrGifActivity` (Slidr vertical dismissal) and `ViewImgurMediaActivity`
(UP/DOWN drag dismissal, disabled when the preference is off). Do not generalize this preference
to every video/player route. The shared HTML renderer retains separate account/Guest fixture
values but does not bind the preference to a gesture. Reserving vertical post-paging gestures
for paging and using Back for exit is now selected, including at the first item. Downward
dismissal is selected for normal previews and Horizontal mode, subject to the close preference.

Revision 107 adds an explicit HTML `mediaGestureMode` boundary (preview / horizontal / vertical)
and `mediaDismissEnabled` callback. Shared pointer handling checks zoom ownership first, then
allows a dominant downward close only outside vertical mode. Normal preview keeps within-post
horizontal album paging; Gallery retains its axis/album-first navigation and return-to-tile hook.
The original standalone media-direction fixture keeps its Vertical fallback; scoped header
studies default to normal preview. Settings media entry now uses the existing viewer for normal
cards as well. This remains HTML fixture behavior, not a native media/navigation replacement.

The Media preference fixture exposes its account value to the existing validated same-origin
preview bridge through a separate enumerated on/off control. It is forwarded outside editor
snapshots, so neither layout Use nor Save as layout owns a gesture preference. Native source
readers/key scope/default remain unchanged. Native video support, mode-aware gesture owners,
account restoration and accessibility alternatives still require explicit mapping/verification.

Further source constraints for the remaining gesture review: `GesturesAndButtonsPreferenceFragment`
turns off post and comment swipe actions when Swipe Between Posts is enabled; `SwipeActionPreferences`
provides the reciprocal helpers, and the fragment refreshes the checkbox on resume. Locking
the next-top-level-comment button controls visibility of its swipe-to-hide preference. The
XML repeats volume-navigation keys across sections, so future presentation should keep their
single stored identity; no native source fix or preference migration was made in this study.
All gesture/lifecycle/accessibility and existing-layout mapping work remains native validation.

Revision 108 presents the seven opening General gesture preferences through the same HTML
renderer. General and Media share a gesture buffer per account; missing defaults are initialized
without replacing existing values. This models a single key identity for the volume controls
repeated in the native XML, while future page placement is still a design choice. Enabling
`swipe_between_posts` clears the two swipe-action flags in the fixture; native EventBus and
onResume synchronization remain unchanged and unverified by the HTML form.

Source scope: `ViewPostDetailActivity` reads Swipe Between Posts to enable its ViewPager2;
when disabled, it attaches its applicable Back slider instead. This is post-details navigation,
not approval of another feed layout. `MainActivity` observes `LOCK_TOOLBAR` to switch app-bar
scroll flags and handles `LOCK_BOTTOM_APP_BAR` through its existing field/event path. Reuse
those owners in native work. HTML controls retain source defaults/scope but do not change shell
behavior, hardware volume handling or native preferences. General grouping remains provisional; volume controls together once in General are selected; no native source or schema change was made.

Revision 109 adds four sensitivity fields to the shared gesture buffer, without changing
stored values. `BaseActivity.fixViewPager2Sensitivity` multiplies native touch slop by the tab
setting (fallback 4), while its applicable Back slider reads a separate float (fallback 0.1).
Comment consumers read their own sensitivity (fallback 5); `MainActivity` observes drawer swipe
area (fallback 0) and calls its existing `setSwipeEdgeSize` path. These scales must not be
merged or reused as a new browser/native threshold. The selected three-step HTML controls
map indices back to the same source enum strings and uses named ARIA value text. No native
consumer, preference scope or schema is changed. Browser visual/interaction checks for this
revision are unavailable because local browser access is disabled in Work settings.

Revision 110 retires the sensitivity menu comparison and adds three Comments gesture fields
to the shared account gesture buffer. The selected named collapse selector must map back to
`SWAP_TAP_AND_LONG_COMMENTS` as a boolean in native integration; the HTML string representation
is not a preference-type migration. `CommentsRecyclerViewAdapterNew` true maps taps to branch
expansion/collapse, while false maps long presses; toolbar toggling is additionally conditional
on `COMMENT_TOOLBAR_HIDE_ON_CLICK`. Explicit expand-button, spoiler/link and selection paths
must remain independent. Inline Reply/Edit contracts are unchanged.

The native jump lock hides its scroll-direction setting through `GesturesAndButtonsPreferenceFragment`.
The HTML proposal disables it while preserving its value. `ViewPostDetailFragmentNew` uses the
unlocked button's direction flag in its dy branches, with a separate end-of-list hide path;
keep native visibility/lifecycle owners and global FAB gates intact. Comments volume-key UI
is omitted here because General owns its selected placement. Native keys/defaults/account scope
and storage remain unchanged; runtime browser and native gesture verification are not run.

Revision 111 retires the comment Swap comparison and adds the two shared post long-press keys
through the same account gesture buffer. Their source values/defaults/options are unchanged;
layout selection is separate fixture view state and never serializes into a native preference
or saved layout. Revision 112 selects the layout selector and ignores the retired all-sections override;
shared fields remain visible once.
Editor links call the existing Settings `enter` path with the current account, preserving its
stack/guard ownership; this new UI route is not browser-verified while access is disabled.

Source `PostRecyclerViewAdapter` maps the generic actions to no action, post options, or a
fullscreen preview with guarded read marking. Compact body handling can give toolbar toggling
precedence via `LONG_PRESS_TO_HIDE_TOOLBAR_IN_COMPACT_LAYOUT`; Gallery has its separate
`CLICK_TO_SHOW_MEDIA_IN_GALLERY_LAYOUT` tap/hold mapping. Native integration must retain these
owners and existing user overrides while expressing selected Relaxe defaults; the HTML
organization does not change key scope, global defaults or implement those migrations.
Settings edits execute no native/media/read action. Menu ordering remains the previously
selected per-account shared More order, not a new per-layout action order.

The revision 112 swipe forms reuse `swipe_action_preferences.xml`,
`post_swipe_action_preferences.xml`, `comment_swipe_action_preferences.xml` and
`SwipeActionPreferences.kt`: three shared keys, nine post keys and seven comment keys,
all in `AccountScopedKeys`. Numeric IDs/thresholds remain source strings and enable/haptic/tab
flags remain native Booleans; HTML page-memory strings are not a storage migration. The
existing account gesture buffer shares reciprocal enable-state coupling with General.
Side mappings initialize once, retain values while disabled and do not enter saved layouts.
Post/comment IDs and level counts stay separate; left/right name row sides, not drag direction.
Preserve `SwipeActionSideMigration` rather than swapping keys again. The forms execute no
native action or preference write. Revision 113 selects both side sections and ignores the
retired selector override;
new navigation, rendering and runtime behavior are not browser-verified while access is disabled.

Revision 113's Fonts slice reads `font_preferences.xml`, source arrays and
`FontPreferenceFragment`/`FontPreviewFragment`. Six list controls and three conditional
custom-file routes retain existing identifiers; all nine keys are listed in `AccountScopedKeys`.
HTML values use a separate account font buffer, never a layout snapshot. Source custom import
uses the existing content picker, copies into three role-specific font files, validates through
Typeface and triggers existing recreation events; file ownership/loading and failure paths
must remain in those owners, not be inferred from per-account HTML buffers. No file import,
native typeface loading or recreation is simulated. Samples show approximate size hierarchy
only. Revision 114 selects the inline sample and ignores the retired comparison query; old
direct Preview links remain usable. Settings navigation is not browser-verified while access
is disabled.

Revision 114 adds the Navigation drawer form from `navigation_drawer_preferences.xml` and
`NavigationDrawerPreferenceFragment`. All fourteen Booleans belong to the whole-file-scoped
`NAVIGATION_DRAWER_SHARED_PREFERENCES_FILE`; `CustomFontPreferenceFragmentCompat` installs
its existing `AccountScopedPreferenceDataStore`. Do not move them into the mixed default file
or infer scope from the Settings root category. HTML stores an independent drawer buffer per
account, outside layout snapshots. Selected section selectors derive from existing collapse
and hide pairs: Hidden sets only hide=true and retains collapse; Expanded/Collapsed clear
hide where supported and set collapse explicitly. Four sections have no hide key and expose
no Hidden choice. Revision 115 retires the separate-switch comparison and ignores its query. No native enum,
migration, drawer event or side effect is implemented. Native avatar/karma events and deferred
section-change dispatch after persistence stay in their current owners. The shared drawer HTML
is not connected to this form; interaction, restoration and visual verification remain pending.

Revision 115's Home feed tabs slice uses `CustomizeMainPageTabsFragment`,
`CustomizeTabsOrderActivity`, `MainPageTabsUtils` and `MainPageTabInput`: seven Booleans and
the variable ordered JSON list remain explicitly keyed with `AccountScope.key` in
`MAIN_PAGE_TABS_SHARED_PREFERENCES_FILE`. Do not move them to default preferences or a layout
snapshot. HTML has account-specific switch/order/changed buffers, three default source-user
records and local Up/Down ordering. Revision 116 selects the inline list and ignores the
retired separate-editor query. Add supports named/picker fixture records and Options now has
a presentation proposal. It does not load/merge source lists, migrate preferences or implement
native add/rename/delete flows. Preserve
native source IDs, item identity/provenance, customTitle/displayName, deduplication, unloaded-
source retention and legacy migration in `MainPageTabsUtils`. AccountSettings excludes tabs
from cross-account copy but includes them in reset; retain that existing distinction.
Native Settings defers restart until leaving a changed tab screen via `AppRestartHelper`.
The HTML notice illustrates that contract; no restart or native write happens here.

The revision 116 Add chooser mirrors all sixteen `showAddTabDialog` entries and its explicit
Guest exclusion of five account feeds. Revision 117 selects grouping/descriptions and retires
the flat-list query; exact geometry/wording remain refinements. No new post/source IDs or
preference keys are added. Three named choices now append only fixture records; the remaining
choices announce preserved picker/nameless routes. Source add routes retain native duplicate/empty-input gates; random variants
remain subreddit type with existing pseudo names. `MainPageTabsRecyclerViewAdapter` offers
rename/conditional reset/move top/bottom; delete is only visible on user-source rows and
rejects removal of the final tab. Preserve those guards when Options is reviewed. The HTML
modal isolates Escape from the underlying Settings back handler and restores its opening
button on close, but browser focus/scroll/large-text checks remain unavailable.

Revision 117 adds name entry for source Subreddit/User/User multireddit (types 3/5/4).
`homeTabIdentity` uses type plus case-folded name for these types and type alone otherwise;
`homeTabDuplicate` gates the page-memory form alongside nonempty trimmed input. Native
`promptForName`/`MainPageTabsUtils.userKey` remain the production owners. The fixture appends
`{postType,name,source:0}` only to its current account order and derives optional multireddit
displayName using the inspected path helper's fallback. No canonical path rewrite, lookup,
new validation rule, serialized key or preference migration is added. DOM focus identities
include type/name so repeated post types are distinguishable; never replace native stableTabId
with those DOM keys. Revision 118 selects same-sheet name entry and ignores the retired
centered-dialog query.
Back restores chooser scroll/focus and clears the unsent input; Cancel closes, Add validates
and updates only fixture state/restart-notice visibility. These navigation and focus paths
remain browser-unverified; IME/lifecycle/Android Back and native persistence are untested.

Revision 118 adds fixture candidates for `pickSubscribedSubreddit` and `pickOwnMultiReddit`.
The source uses observed subscribed subreddit names and owned multireddit path/displayName,
guards null/empty lists, checks `MainPageTabsUtils.isDuplicate` on selection and adds with
source USER, not a group source. HTML candidate records mirror those type/name/displayName
boundaries and append through the existing account-local callback. Guest/empty fixture data
must not become a new eligibility rule. No native ViewModel, picker, loading or API behavior
is implemented or replaced. Revision 119 selects visible local filtering and ignores its
retired plain-list query. Filtering preserves input order and checks name/
displayName/path; no external search or persistent filter preference is added. Proposed
Already-added disabled rows differ from the native selection/toast feedback and remain a
presentation refinement. The named/chooser stages retain ownership of Back/focus cleanup;
new picker DOM behavior remains browser-unverified while access is disabled.

Revision 119's tab Options fixture derives from `MainPageTabsRecyclerViewAdapter` and
`CustomizeTabsOrderActivity.promptRenameTab`: customTitle is separate from feed identity;
empty/exact-default names clear it; Reset is conditional; moves preserve the item; delete
is user-source only and retains at least one tab. HTML keeps those mutation guards in pure
helpers, resolves current object membership before action and updates only the account-local
ordered array. Source controls put Delete on the row and other options in a popup. Revision
120 selects visible row Remove, omits it from Options and ignores the retired comparison query. Boundary controls
are disabled in HTML instead of native no-ops; native toast feedback remains an integration
owner. Group/last/renamed query scenarios are synthetic initial buffers, not stored settings.
Rename/Reset leave native identity and group provenance unchanged. Modal Escape isolation,
cleanup and focus to surviving rows are included but remain browser-unverified. No new native
preference, stable tab ID, settings copy/reset rule or lifecycle/restart behavior is implemented.

Revision 120 introduced the Bottom navigation scope overview. Revision 121 selects shared
default/optional Other-page overrides and retires the always-separate comparison. Its scope
switch remains fixture view state, not a native preference or configuration migration. The
actual shared HTML shell is unchanged. Existing `CustomizeBottomAppBarFragment` uses twelve integer keys
in the whole-file-scoped `BOTTOM_APP_BAR_SHARED_PREFERENCES_FILE`: count/four slots/FAB for
Home and for Other activities. Action IDs differ between the two lists; Guest outer-action
lists use explicit source-ID arrays. Keep existing account wrappers, integer types, two/four
counts, hidden assignments, FAB/action capability and current event/readers. The accepted
Home/Saved/Search/Inbox/Profile default cannot simply be written as raw indices in those lists:
Home's existing list has no Home entry, and the current bar is a command bar rather than the
new shell. Structural mapping and migrations remain unimplemented; preserve existing separate
values and recoverable overrides regardless of the chosen editor organization.

Source inspection also found an unresolved Guest FAB mapping inconsistency in
`CustomizeBottomAppBarFragment`: anonymous Filter posts is visible index 6, but its `i >= 7`
write formula maps that to stored 7 while Filter posts is full-list index 8. Both Home and
Other handlers share that formula. Record this as source evidence needing native confirmation;
no Guest mapping fix or behavior change is authorized/implemented in this HTML task. Do not
claim full action-ID parity or silently reproduce/fix it in the future editor fixture.

Revision 121 adds default/other five-position editor arrays per account in
`bottomNavigationBarsByAccount`, outside layout snapshots and native preferences. Choices
use source resource-name symbols, never raw main/other/Guest indices. Outer semantic inventory
comes from the twenty Other-page entries; the center mask uses the ten/eight source FAB lists.
Guest preserves the legacy command allowlist, with the accepted shell's Saved(local) and
Inbox/Profile(sign-in entry) destinations represented separately in the presentation contract;
that is not an expansion of API/access capability. Native dispatch/migration must reuse the
existing local-data/auth/access mechanisms and resolve per-context IDs explicitly. No numeric
Guest mapping is performed, so the recorded FAB source inconsistency remains untouched.

Revision 122 selects preview-target editing and retires the visible-selector comparison.
Assignments still use one validated helper.
Default/other arrays are independent and retained through scope toggles; account/Guest buffers
are isolated. Center availability is checked separately; invalid scope/index/choice is rejected,
and duplicate assignments are allowed. These are prototype value guards, not native storage
or dispatch verification. Settings editor links use the existing stack; the chooser isolates
Escape and returns focus to the newly rendered preview button. Browser/Android verification
remains unavailable/not run. The source count/retained-assignment fixture is described below;
integer persistence, restoration and migration remain native work.

Revision 122 reads the 2/4 count boundary in `MainActivity` and
`ViewSubredditDetailActivity`: two-mode binds options 1/2; four-mode also reads options 3/4.
The new page-memory count map is per account/default-or-other, independent from the existing
five-value arrays. Integer count 2 renders fixed array indices [0,2,1] (side 1, center, side 2);
count 4 renders [0,1,2,3,4]. Array indices 3/4 remain editable/retained while absent from the
bar. The UI labels total counts 3/5, never serializes those totals as native count values and
never truncates/reorders assignments when switching. Center capability/identity is unchanged.
A validated setter accepts only count 2/4 and known scopes. One-time review-query initialization
is fixture scaffolding, not restoration or a preference key. Revision 123 selects expandable
retained controls and ignores the retired comparison query; native details/summary DOM state
is not an Android contract.
Pure-helper checks cover value retention and scope boundaries, not DOM/native behavior.

Revision 123 adds the Time format HTML slice. `time_format_preferences.xml` owns the existing
Boolean `show_elapsed_time` (false) and string `time_format` ("MMM d, yyyy, HH:mm");
`AccountScopedKeys` includes both. `TimeFormatPreferenceFragment` dispatches the existing
ChangeShowElapsedTimeEvent / ChangeTimeFormatEvent. `PostRecyclerViewAdapter` chooses
Utils.getElapsedTime or Utils.getFormattedTime using these values; Utils retains Android's
localized elapsed strings and locale-aware SimpleDateFormat. All 23 pattern values stay in
source order. Revision 124 selects the source-style switch and retires the selector query; fixed English preview strings and per-account `time|` memory buffers are scaffolding,
not a new formatter, event owner, preference namespace or migration. Native readers, locale,
time zone, refresh and restoration contracts remain unchanged and unverified here.

Revision 124 adds all twelve `post_details_preferences.xml` fields as a separate HTML form.
`PostDetailsPreferenceFragment` selects POST_DETAILS_SHARED_PREFERENCES_FILE, whole-file scoped
by AccountScopedKeys; identical-looking feed/default-file keys must not be conflated. Its
capacity listener accepts String.toInt values >= 0, calls PostDetailCommentsCacheManager and
rejects parsing/negative values. HTML mirrors input acceptance with a separate `details|`
account buffer; it never calls that cache manager or writes native preferences. The dependent
swap setting retains its value when landscape splitting is off. Native split-layout/autoplay,
adaptive shell, reader refresh and cache lifecycle remain untouched.

SharedPreferencesUtils.embeddedMediaFlags maps legacy 0–15 named combinations and newer
16-plus-mask codes. The 16 source entries cover all subsets of Image(4), GIF(2), Emote(1),
Comment face(8), with All stored as 15. Revision 125 selects four switches, retires the menu
query and reuses one renderer across Comments/Post details. Controls decode/re-encode through
that explicit table rather than write raw masks or add Boolean preference keys. Source ordering/defaults and all 16 code round trips / 64
single-kind transitions are checked; no rendering, download or policy behavior is simulated.

Revision 125's Comments form inventories all twelve `comment_preferences.xml` keys. The source
CommentPreferenceFragment uses default preferences; AccountScopedKeys lists these account keys,
including show_comment_divider, comment_divider_type and embedded_media_type. This is distinct
from the whole-file-scoped Post details settings. Its native divider listener shows/hides the
type list based on the Boolean without clearing the type. Revision 126 selects HTML's combined selector
mapping Off to Boolean false only; All/Top-level set true plus string 0/1. The source-style
comparison is retired and old divider-control overrides are ignored. `comment-display|` is page-memory
scaffolding, not a new native store or preference key. Existing comment data/order/collapse,
click/touch ownership, toolbar/embedded renderers and refresh/restoration remain their native
owners; this form executes no comment/media actions. Section routing uses the existing
Settings stack with focus return. The source's commented-out toolbar threshold is not an active
field and is not added by this slice.

Revision 126 adds `sort_type_preferences.xml`'s eight keys through SortTypePreferenceFragment's
existing default-preference path; AccountScopedKeys classifies all eight as per account. The
separate SORT_TYPE_SHARED_PREFERENCES_FILE contains per-feed choices and remains untouched.
PostFragment.savedOrDefaultSortType reads those choices with subreddit/user defaults as fallback;
it attaches time only for TOP/CONTROVERSIAL. Its changed-default following logic protects a sort
the user picked or saved. ViewPostDetailFragmentViewModelNew keeps saved subreddit comment
sort, live recommendation and default tiers, with existing failure fallback. Do not replace
those owners with HTML form state or merge comment/post sorting scopes.

The fixture's `sort|` account buffer holds only source defaults/options. Revision 127 selects visible-disabled ranges and retires the hidden-range
query. This changes form reachability, not stored time values or sort precedence. Source XML currently leaves both range lists editable. Remember switches do
not disable/reset defaults; no actual per-feed record, request, sort event or reader is invoked.
Six range values, native enum spellings and the comment CONFIDENCE/Best distinction remain.

The shared form renderer now uses explicit `data-<prefix>-control` attributes, supporting
hyphenated prefixes for swipe and Home tab forms without invalid DOMStringMap property names.
This fixes a source-inspected construction issue in the earlier swipe forms; syntax/source
checks do not replace the still-outstanding browser runtime checks for those earlier forms.

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
