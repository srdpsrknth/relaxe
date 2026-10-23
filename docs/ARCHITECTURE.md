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
