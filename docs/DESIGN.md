# Design direction

## Approved product constraints

Approved on 2026-10-23. These are design constraints; no new visual system or layouts have
been implemented in the fresh fork.

- **Relaxe for Reddit** is an independent presentation experience built on Continuum.
- Use progressive screen replacement with shared styling across the app. The finished
  experience should be cohesive; intermediate builds may retain existing secondary screens.
- Material You/Material 3 and relevant Expressive principles are inspiration. Exact colors,
  typography, shapes, motion, and screen composition still require design exploration.
- Shared elements must agree in color roles, typography, spacing, icon meaning, interaction
  states, and behavior. Density can vary intentionally between layouts.
- Preserve readability, one-handed use, light/dark themes, dynamic colors, accessibility,
  reduced motion, responsiveness, and efficient media use.

## Reddit terminology

**User-approved vocabulary:** use **subreddit/subreddits** and **user/users** in Relaxe's
labels, questions and design documentation. Search types are **Posts · Subreddits · Users**.
Use **Subscriptions**, **Subscribe / Subscribed / Unsubscribe**, and **multireddit/multireddits**
for their existing Reddit concepts. An **account** is the active signed-in identity (or Guest);
a **profile** is a user's page; **author** identifies the user who wrote a post or comment.
Keep **post**, **comment**, **flair**, **karma**, **upvote/downvote**, **Saved** and **Inbox** distinct.

Evidence: Reddit's [API reference](https://www.reddit.com/dev/api/) uses subreddits, users,
subscription and multi routes; Continuum's `strings.xml` labels its search and selection
screens Subreddits, Users and MultiReddit. Modern Reddit help uses other display labels in
places; Relaxe follows the requested classic/API vocabulary. This is a presentation rule,
not a native resource or API migration. Preserve opaque fixture keys and upstream identifiers,
including JSON fields. Natural-language fixture content such as a garden or a group of people
does not name a navigation destination and should retain its meaning. The accepted prefix-free
subreddit/author labels in feed cards remain; page headings may use `r/hiking` and user routes
may use `u/username` where appropriate.

## Shared design-system process

Inventory existing elements and states, research references, compare a small number of
alternatives, then approve components before broad implementation. Cover foundations,
components, loading/error/empty/selected states, and screen patterns. Do not choose an entire
design system from a single card mockup or expand speculative settings prematurely.

## Whole-app styling review 07 (2026-10-23)

**Foundation direction selected:** A's typography + B's moderate rounding + C's solid icons.
A and B's colors are liked, but the user wants wallpaper-dependent Material colors through
Continuum's existing theme mechanisms, mapped to the replacement components. This supersedes
the serif-heading exploration preference. No fixed shipping palette is selected. Preserve
existing font overrides; exact native geometry and final icon assets remain refinement work.

**Review feedback:** the user could not distinguish the three revision-05 options. Its
closely related palettes, nearly identical feed type and small-toolbar-only serif treatment
were an ineffective comparison, despite passing technical checks. Revision 06 supersedes
that comparison with stronger palette/type/icon/shape differences and an always-visible,
identical-content type/control specimen above each live preview. The earlier alternatives
remain selectable; revision 07 defaults to the selected mix across neutral A, warm B and a
simulated wallpaper-blue palette. These are theme examples of one foundation.

Open [the shared-foundations comparison](prototypes/relaxe-exploration/foundations.html)
through a local HTTP preview. It wraps the existing feed/media and details studies with
temporary styling; the underlying behavior scripts are reused. Preference rows and shared
controls are separate synthetic samples, not proposed settings organization. All three
directions use identical content on each surface. The workbench typography and study names
are review aids, not application identity.

### Proposed staged review order

Use the UI review tracker below as the area inventory. Ask focused preference questions
when each group becomes active; do not treat the following order as approval of its designs.

1. **Foundations (direction selected):** A typography + B rounding + C solid icons, using
   existing theme roles. Native geometry, assets and full-role parity remain later work.
2. **Shell/navigation (HTML direction accepted):** toolbar, destinations/tabs/drawer,
   account/subreddit switching and search entry. Native keyboard policy, Back, insets,
   restoration and large-screen adaptation remain implementation review items.
3. **Browse/personal surfaces (active):** subreddits, subscriptions/multireddits, search/filter lists,
   profiles, inbox, saved/history and other retained feed layouts, in small review groups.
4. **Create/act:** post/reply editors, formatting/attachments, action customization,
   moderation/reporting, sheets/dialogs, feedback and media/share/download utilities.
5. **Settings/accounts/onboarding and consistency:** preference organization, login/API/access,
   theme editor and account scope, then a cross-surface consistency pass.

Each group includes light/dark/AMOLED, dynamic/custom themes, pending/selected/disabled/
error/empty/loading states, large text, keyboard/accessibility alternatives, RTL, reduced
motion, landscape/tablet and safe-area requirements. Native validation remains separate.

### Selected mix and earlier alternatives

The selected preview uses A's system sans-serif/weights and 15px/1.28 compact titles, B's
12px card/control, 24px sheet and 6px thumbnail corners, and C's solid icon treatment. These
are HTML reference values, not frozen Android dimensions or a font preference migration.
Preserve existing global/title/content font choices, custom uploaded fonts and size settings.
The following table records the earlier alternatives for reference only.

| Direction | Color and type | Shape, icons and spacing | Trade-off |
| --- | --- | --- | --- |
| A · Stone | Warm white/charcoal; restrained sans-serif titles and headings | 4px cards/controls, 12px sheets, 2px thumbnails; fine square-ended outline icons; 12px sample section padding | Quiet and precise; less warmth or heading character |
| B · Hearth | Oat canvas/cream cards/terracotta accent; serif post titles and app/section headings, sans-serif body/comments | 12px cards/controls, 24px sheets, 6px thumbnails; rounded outline icons; 16px sample section padding | Stronger editorial warmth; serif post titles are a new proposal requiring review |
| C · Grove | Sage canvas, filled accent toolbar/bottom bar; bold sans-serif titles/headings | 24px cards/pill controls, 32px sheets, 12px thumbnails; solid icons; 20px sample section padding | Most expressive; color and rounding may compete with dense reading |

The earlier comparisons use browser pixels, not approved Android dp/sp. All retain the accepted compact
64px thumbnail, 8px inner padding, 6px card gap, title → wrapped metadata → statistics
hierarchy and hidden toolbar. Body/comments remain 15px system text, with 12px metadata/
statistics and 20–22px app/post headings before scaling. Compact titles are 15px/1.28 in
Stone/Grove, and 16px/1.2 serif in Hearth, preserving the same title line-box height. Hearth's
post titles now participate in the serif experiment; comment and body text remain sans-serif.
The local browser uses Segoe UI/Roboto and Georgia fallbacks; no font is downloaded or
selected for native shipping. Controls retain ≥48px targets and flexible heights.

The workbench exposes light/dark/AMOLED, fallback examples, two **simulated** dynamic
palettes (blue/rose), one custom amber fixture, 100/130/200% text and 360/390/600px widths.
Dynamic/custom fixtures share semantic canvas/card/text/secondary/outline/accent/container/
error roles. A prominent notice explains that selecting a shared color fixture makes all
three use the same palette. The selected mix keeps typography, rounding and icons identical
across themes; the earlier comparison retains its alternative treatments.
They demonstrate adaptation; they do not perform Android palette extraction,
edit a real custom theme, choose native defaults or persist account preferences. Media
retains a dark fitted canvas and opaque, high-contrast revealed control layer in all themes.

### Theme reuse and component-role mapping

**Approved reuse principle:** resolve colors through the existing Continuum theme mechanisms
and map them progressively into new components. Preserve Material You opt-in/Enable/Apply,
light/dark/AMOLED selection, custom themes, preference scope and existing font ownership.
Do not introduce a competing wallpaper extractor, theme repository or account namespace.

Source inspection, not device verification: `MaterialYouUtils.java` uses Android 12+ system
color resources, or Android 8.1–11 wallpaper colors where available. It writes generated
light/dark/AMOLED themes to existing Room/preference paths and requests activity recreation.
Unsupported/no-color paths return without generating a theme. `ThemePreferenceFragment.java`
applies on enabling and on the explicit Apply action; no new refresh policy is proposed.

`AppTheme.kt` supplies the selected persisted `CustomTheme` through `LocalAppTheme` and
resolves typography separately. Its `MaterialTheme {}` does not populate a custom Material 3
color scheme. Existing Compose controls read `LocalAppTheme` fields explicitly; Views use
their existing wrapper/attrs. Keep these two paths consistent as components are replaced.

Source-backed mapping to carry into the replacement UI (HTML demonstrates named-role
fixtures; native integration and any derived contrast/container roles require later work):

| Component role | Existing theme source |
| --- | --- |
| Canvas; normal/read cards | `backgroundColor`; `cardViewBackgroundColor` / `readPostCardViewBackgroundColor`, plus filled-card variants where applicable |
| Post title/content/read text | `postTitleColor`, `postContentColor`, `readPostTitleColor`, `readPostContentColor` |
| Post/comment metadata/icons | `postIconAndInfoColor`, `commentIconAndInfoColor`, with dedicated primary/media icon fields retained |
| Comments | `commentBackgroundColor`, `commentColor`; preserve thread/collapse and author/moderator overrides |
| Toolbar | `colorPrimary`, `toolbarPrimaryTextAndIconColor`, `toolbarSecondaryTextColor` |
| Bottom navigation | `bottomAppBarBackgroundColor`, `bottomAppBarIconColor`; destination composition reviewed separately |
| Filled controls/selection/progress | Existing `colorPrimaryLightTheme` / `buttonTextColor` control pair; `colorAccent` and progress roles; derive new containers without replacing stored overrides |
| Links/flair/votes/gates | Separate `linkColor`, flair fields, `upvoted` / `downvoted`, spoiler/NSFW and availability roles |
| Dividers, media badges, system bars | `dividerColor`, media-indicator roles, `navBarColor`, status/navigation icon-lightness flags; native contrast/insets need validation |

Fixtures do not reproduce platform extraction or select native defaults. Focused checks show
independent post/read-title, comment-background/text and link overrides reaching their own
components. Full native theme parity, including every badge/author/thread/system-bar variant,
remains unverified. Media retains the accepted high-contrast dark control layer and policy.

### Preservation and next review

The native source has more theme roles than this comparison's compact palette. Preserve
`customtheme/CustomTheme.java`'s separate normal/read text/card, vote, post/comment/media
icon, flair/gate, author/moderator, thread, message and system-bar roles. Do not collapse
user-authored role overrides into a single accent. `AppTheme.kt`, `styles.xml` and existing
font preferences/custom typefaces need consistent progressive mapping in Views and Compose.
`MaterialYouUtils.java` already derives themes through platform/wallpaper paths and chooses
foreground/system-bar contrast. `theme_preferences.xml` keeps theme choice, AMOLED, custom
editing and Material You Apply separate; `AccountScopedKeys.kt` establishes existing scope.
None of these native contracts is changed by this study.

Shell/navigation direction is accepted at HTML level in study 09b below: Home, Saved,
center Search sheet, Inbox, Profile and a drawer for subreddits/accounts. Next review is
browse/personal surfaces. Motion remains restrained with reduced-motion support; native
keyboard, navigation and gesture validation remain separate implementation work.

Verification and remaining limitations are recorded in ROADMAP.md. Browser checks support
this comparison only; native TalkBack/Switch Access, nonlinear text scaling, theme-role parity,
RTL reading order, system bars, insets, landscape/tablet layouts and restoration still need
their separately authorized implementation/device work.

## Shell and search review 09 (2026-10-23)

**User-selected starting structure:** a few bottom destinations with a drawer for subreddits
and accounts; Home, Saved, **Search**, Inbox, Profile in that starting order. Search is the
center action and opens a bottom sheet. The user wants Continuum's existing search content
refined, considers its current UI clunky/unresponsive, and requested a Sync reference.
The drawer should follow Continuum's existing design. Search starts balanced, then expands.
This is design direction, not native migration or measured performance evidence.

Open [the shell/search study](prototypes/relaxe-exploration/navigation.html). It reuses the
accepted compact feed and shared selected-foundation theme/icon helpers. It demonstrates
the five actions, subreddit/account drawer, query sheet and existing full-screen results
destination as a fixture. Saved/Inbox/Profile/subreddit content is a route preview, not
approval of those later area designs.

### Existing search and navigation evidence

Paths below are relative to `app/src/main/java/ml/docilealligator/infinityforreddit/`.

| Source | Preservation requirement |
| --- | --- |
| `activities/SearchActivity.java`, `res/layout/activity_search.xml` | Current search entry is a standalone Activity, with query, scope, history and autocomplete lists. Its toolbar contains clear/link/keyboard-privacy/random actions. A simpler sheet can change presentation without dropping these capabilities. |
| `SearchActivity.java` autocomplete/text watcher | 500ms debounce, cancellation, OAuth/no-OAuth API paths and account-scoped NSFW eligibility. User-only search skips subreddit autocomplete. Failure/parse callbacks currently provide no visible error feedback. This is source inspection, not latency measurement. |
| `RecentSearchQueryViewModel`, recent-query DAO/adapters | History is account-partitioned; records retain type and subreddit/user/custom-feed scope. Row submission versus fill, individual/all-history deletion and Undo need preservation, as does history visibility preference. |
| `activities/SearchResultActivity.java` | Existing Posts/Subreddits/Users results use `PostFragment` and listing fragments, with current query/scope/selection-return contracts, sort/filter/layout/read behavior. The entry sheet does not imply moving paged results into a small sheet. |
| `SearchActivity.java` submission and account events | Retain IME submit, special preference-controlled support route, link resolver, selection-only/multi-selection callers, keyboard-incognito semantics, guest behavior and finish-on-account-switch boundaries. These are not permission to replace their native behavior. |
| `activities/MainActivity.java`, drawer adapter | Current bottom bar is a configurable 2/4-command bar with arbitrary actions, plus FAB/rail options. A five-destination shell is a structural presentation change; preserve existing preferences or explicitly review migration/optional layout behavior later. Reuse account/subreddit routing and drawer helpers. |
| `adapters/navigationdrawer/NavigationDrawerRecyclerViewMergedAdapter.java`, `res/layout/nav_header_main.xml`, `res/xml/navigation_drawer_preferences.xml` | Keep the account header/switcher and Account, Reddit, Posts, Preferences, favorites and subscriptions groups. The account list replaces the groups while keeping the header. Preserve section visibility/collapse, avatar side, karma visibility, auth availability and quick-toggle preferences during native refinement. |

### Search references and limits

Sync's v20 announcement and beta-25 developer posts were fetched directly during revision
09b research, as were Relay's v10 developer notes. Boost's developer changelog was retrieved;
its historical Gfycat search demo was not available. These are historical references, not
current app measurements. None of the reference apps was installed or exercised on a device.

| Reference | Supported finding and application |
| --- | --- |
| [Sync v20 announcement](https://www.reddit.com/r/redditsync/comments/gx15pb/) | Documents bottom navigation, a redesigned search bottom sheet and a simpler sidebar. Supports the entry-sheet/drawer pattern, not an exact geometry or present-day support claim. |
| [v20 beta 25](https://www.reddit.com/r/redditsync/comments/k207mk/) | Documents a search-sheet menu with clear history and focus-on-open control. Keep secondary tools available without crowding the query row; Relaxe's keyboard policy is deferred to native review. |
| [v20 beta 11/12 notes](https://www.reddit.com/r/redditsync/comments/htl5mc/) | Documents search opening in a new window and constrained landscape sheet width. Supports separating search entry from results and reviewing large-screen behavior; the phone HTML is not landscape/device validation. |
| [Boost 1.6.0 developer changelog](https://boostforreddit.com/blog/2017/11/24/boost-for-reddit-1-6-0/) | Describes searching posts/subreddits and direct profile/subreddit navigation in one search screen. Supports a unified entry; the unavailable demo does not establish exact geometry or controls. |
| [Relay v10 developer announcement](https://www.reddit.com/r/RelayForReddit/comments/dj7n6b/) | Documents moving controls to the bottom for one-handed access and rewriting search. Does not establish the search sheet's exact contents; do not infer them from general bottom-bar behavior. |

Continuum's `activity_search.xml` places the query/toolbar before a scope row and recent or
autocomplete lists. `SearchActivity.onWindowFocusChanged()` requests query focus and shows
the keyboard. These are inspected source behaviors, not approval of that keyboard policy
for Relaxe. The proposed disclosure arrangement below is our synthesis of the references.

### Study 09: selected structure and remaining proposals

- Search is an action, not a permanently selected page. Dismissal restores the current
  destination/focus; Home, Saved, Inbox and Profile remain labelled. Drawer owns subreddits,
  accounts and secondary entries. Account switches clear this search session and use distinct
  history fixtures; guest Saved is local, while Inbox/Profile explain sign-in.
- Query and clear/submit are prominent. Search type and scope are explicit, with account
  context visible. Post scope is retained when switching type; subreddit/users result queries
  are global, and Users does not invent live user autocomplete. Recent rows submit; the
  arrow fills query/scope/type. Records carry the concrete subreddit target.
- The search header's tools button holds history management/clear+Undo, link opening,
  random subreddit and keyboard privacy. These are synthetic destination/state previews,
  not new permission or persistence.
- Typing updates the field immediately. Suggestion loading is local to its section; empty
  matches and failure/Retry are visible without preventing submission. The mock uses the
  existing 500ms debounce, plus a slow fixture, and discards cancelled/stale responses.
  This demonstrates presentation responsiveness, not an Android performance fix.
- Submit closes the entry sheet and previews full-screen results with query/type/scope/account.
  **The user accepted the current results presentation for now.** No results redesign is
  requested by the entry simplification.
  Existing result fragments/ranking/sorts/filters and selection-return callers remain reuse
  requirements. Result fixtures do not implement Reddit ranking or a complete results redesign.
- **Selected:** balanced entry, then expanded. The browser opens with the heading focused so
  the first state is visible, expands on query focus/edit, and starts balanced on reopening
  while retaining query context. Fixed balanced/expanded modes remain comparison controls.
  Heading focus demonstrates the transition; keyboard-on-open policy is deferred to native
  review and is not selected by the HTML fixture's focus behavior.
- **Selected reference:** Continuum's drawer structure. The fixture shows its account
  header/switcher, grouped navigation, favorite subreddits and subscriptions, including
  switching between navigation and account rows. Exact native layout/assets remain refinement.

### Revision 09b: simplify entry

**User feedback:** the previous search sheet was too cluttered. The user requested reference
research and selected **one compact type-and-scope selector**, rather than three persistent
type tabs. **The user accepted the refined entry design and current results presentation.**
The shell/search HTML review is closed for now; native implementation remains outside this task.

The working HTML revision starts with the query, a `Posts · Everywhere` disclosure, and up to
three recent searches. Opening the disclosure reveals the existing type and scope controls;
the effective scope remains visible while collapsed. Account context sits beneath the heading.
Clear appears only for a nonempty query, and the submit arrow/keyboard submit remain available.
Typed input replaces recents with subreddit matches; it no longer duplicates the submit action
as a separate row. Users keeps its global result search without inventing live autocomplete.

Manage reveals full history and individual deletion/Undo. The header tools panel retains clear
history/Undo, link, random-subreddit and keyboard-privacy actions. Tool/disclosure Escape returns
to entry before dismissing the sheet. Reopening resets disclosure/tool state and balanced height
while retaining query/type/scope. Results submission receives heading focus; editing results
retains the original destination for Back. These are browser refinements, not native restoration.

The compact selector, history/tool arrangement and overall entry composition are accepted at
HTML design level. The user noted that keyboard behavior cannot be judged adequately in this
prototype. Defer keyboard-on-open/focus policy to a separately authorized native review with
real IME/insets, expansion, Back/dismissal, reopening, large text and accessibility behavior.
No automatic-keyboard default or focus-on-open setting is selected by this acceptance. Keep
history visibility preferences, selection-only callers, account boundaries and the existing
access/content/media contracts during any later native work. ROADMAP.md owns verification and
the remaining browser reload diagnostic.

### Android presentation boundary

This task changes HTML prototypes and documentation only. The future implementation should
use existing Views/Activity/Fragment/Paging boundaries, `DrawerLayout` and Material
`BottomSheetDialogFragment`/`BottomSheetBehavior`, with native IME/insets, Back dispatch,
lifecycle/restoration and accessibility support. These provide native gestures and state
handling; browser dialogs, focus and fixed pixel heights are demonstrations, not native code.

Source inspection found that `LandscapeExpandedRoundedBottomSheetDialogFragment.onStart()`
always sets `STATE_EXPANDED` and `skipCollapsed=true`. Balanced search therefore needs a
search-specific configuration or override, rather than changing all existing shared sheets.
The balanced state must be sized for content, window size and IME using supported library
APIs; the mockup's 180px/24px offsets are not Android dimensions or a chosen state API.
Respect the project's SDK/library versions, dp/sp and nonlinear font scaling, system bars,
landscape/tablet/RTL, TalkBack/Switch Access, keyboard dismissal and process/account restoration.
Browser checks cannot establish these native behaviors. Retain existing resolved theme/font
roles and account ownership as recorded above.

Next review: browse/personal surfaces, starting with the subreddit header study below,
then subscriptions and multireddits. Retain the accepted shell/search direction, selected foundations and
Continuum drawer structure. Keyboard behavior returns during native review. Production
implementation and any actual search latency/network policy change require their own
separately authorized task and native measurements.

## Subreddit header study 10 (2026-10-23)

### Shared shell consistency revision (2026-10-24)

**HTML review accepted on 2026-10-24:** the user approved the revision-12 subreddit preview
and continued to the next group. This closes the current header proportions/spacing, Sort
placement, scrolling Posts/About controls, page-swipe and shared bottom-bar review for now.
Native geometry, accessibility and gesture/preference mapping still require implementation
review; this acceptance does not authorize Android changes.

**User-directed:** the subreddit and other pages share the Home / Saved / center Search /
Inbox / Profile bottom bar. It fades away on downward reading scroll and returns on upward
scroll. **Explicitly confirmed:** remove the subreddit toolbar's Search button and use the
bottom Search action. This replaces the cross-study shortcut that navigated away before
opening the search sheet. The accepted search type/scope/history/tools and results composition
remain the starting point; this decision does not replace them with another search design.

The HTML studies now reuse `shared-shell.js` / `shared-shell.css` on feed, subreddit, details
and shell destinations. Search reuses study 09b over the originating page; closing or backing
out of its results restores that page without replacing its DOM, scroll position or reply
draft. Results keep the shared bar, and their scrolling follows the same visibility policy.
Synthetic search history/query/type/scope/privacy context is partitioned by fixture account
in browser session storage across these examples. This is browser scaffolding, not a new
Android account store, route system or history policy.

The bar overlays reserved end padding so hiding it does not resize the reading viewport or
shift its anchor. Details' reply controls sit above it and return to the bottom when it hides.
Short directional thresholds suppress jitter in the fixture; exact native timing and physics
remain reviewable. Keyboard Tab reveals navigation; a focused bar is kept available, and hidden
navigation is inert. Reduced-motion removes transitions. Immersive media retains its accepted
entry/reveal policy: the shared bar appears with the revealed controls and hides with them;
opening Search pauses active media. Do not infer Android accessibility/service detection,
keyboard insets, gesture arbitration or performance from this browser behavior.

Retain the existing navigation customization, account ownership, search/access mechanisms,
media policy and native restoration contracts. The selected five-item structure is a design
default, not authorization to discard existing command-bar, rail/FAB or hide-on-scroll settings.
No Android UI or application identity was changed.

### Subreddit composition

**Selected by the user:** a large banner and description on first load/at the top of a
subreddit page. As the user scrolls, it becomes a compact header with posts immediately below.
Returning to the top restores the expanded header. This supersedes the proposed choice between
two fixed header sizes. The user requested Sync for Reddit as inspiration.

[Study 10](prototypes/relaxe-exploration/subreddit.html) demonstrates that direction with
synthetic `r/hiking` content and the selected foundation. The banner, name, subscriber count,
description and subscription action scroll in the same surface as the posts. The compact title
appears when the expanded title leaves view. Posts/About scroll away with the expanded header,
leaving the posts immediately below the compact bar. Bottom Search reuses study 09b with
subreddit/account context as described above. Banner proportions and spacing remain reviewable,
not frozen Android dimensions.

**Accepted: Subscribe placement A, beside the subreddit name.** A separate full row was rejected;
the banner-corner alternative is no longer in the active study. Keep a labelled subscription
state and the existing menu alternative. Large text may wrap the name-row action to preserve
readable text and touch targets.

The user also required complete sort/time controls. Continuum's
`SortTypeBottomSheetFragment` applies Hot, New and Rising directly; Top and Controversial
open `SortTimeBottomSheetFragment`, with Hour, Day, Week, Month, Year and All Time. Study 10
demonstrates that sequence; **the user accepted the sort/time presentation**. Closing the time
dialog keeps the applied pair; selection survives header collapse, theme/post redraw and
Posts/About switching. This uses the existing sort contract without changing defaults, scoped
preferences or ranking.

**Accepted at HTML design level, following the user's request:** move Sort beside More in the top bar,
with a solid sort icon. Its accessible name/tooltip and dialog identify the current pair, such
as **Top · Week**. Sort is available on Posts and hidden on About. Posts/About buttons remain
at the top of the scrolling content, with horizontal swipes switching pages: left from Posts
to About, right to return, reversed in RTL. Each page retains its offset. A page destination in
More and Left/Right keys on the focused content region provide alternatives while scrolled;
About also identifies itself below the compact subreddit title. The placement/gesture
revision is accepted for the prototype; it is not a verified native interaction specification.

Continuum's `ViewSubredditDetailActivity` already uses `ViewPager2` for these pages and respects
`DISABLE_SWIPING_BETWEEN_TABS`; retain that preference. The workbench includes enabled/disabled
fixtures. Gesture recognition is limited to post/About content, respects vertical movement,
does not own the media viewer or action toolbar, and suppresses a swipe's trailing click.
The HTML switches after release rather than reproducing native drag physics. Native edge-Back,
selection, nested media gestures, multi-touch and TalkBack arbitration remain implementation
checks, alongside the preserved upstream tab double-tap/navigation preferences.

The study reuses `app.js`'s compact-post renderer, long-press actions and media behavior through
a hook enabled only for the subreddit-study URL. Header fixtures cover long/hidden description,
missing banner, metadata failure/Retry, Guest and subscription failure. Sort selection is kept
as local presentation state; it does not implement Reddit ranking. Subscription actions and
counts are synthetic. Posts/About retain local scroll offsets; native process/account/feed
restoration remains a preservation requirement, not a browser verification result. A restored
position below the header must stay there rather than reset to the first-load banner.

Reference evidence: Sync's developer [v22 FAQ](https://www.reddit.com/r/redditsync/comments/tk02dp/)
documents an optional Material 3 large app bar, and the [v22.3.6 release notes](https://www.reddit.com/r/redditsync/comments/t8acw7/)
mention preserving expanded-toolbar position between posts/messages. Neither establishes the
exact banner/description transition here. No Sync installation or native geometry measurement
was performed; the requested transition comes from the user's direction.

Continuum already uses `AppBarLayout` / `CollapsingToolbarLayout` in
`activity_view_subreddit_detail.xml`, with a banner, subreddit information and subscription
control. `ViewSubredditDetailActivity` supplies Posts/About tabs, collapsed-app-bar restoration,
account/subscription readiness and `HIDE_SUBREDDIT_DESCRIPTION`. Reuse those boundaries and
preferences; do not replace them with a separate feed or subscription implementation. Retain
sort/filter/layout, eligibility, API/access and media/restoration contracts. A native large
header must still handle IME/insets, nonlinear font scaling, TalkBack, RTL and landscape.

ROADMAP.md records current browser verification and the next review step. No Android source,
identity, installation or Git publication is authorized by this study.

## Subscriptions and Multireddits study 11 (2026-10-24)

**HTML direction selected; native density deferred:** [open study 11](prototypes/relaxe-exploration/navigation.html?study=11&destination=subscriptions&rev=14).
It extends the existing shell with list destinations rather than introducing another bottom
bar or search sheet. **User-selected:** keep visible favorite stars on each list row and the
single list selector. The user requested tighter rows, explicitly noting that final spacing
must be judged in the Android app. Revision 14 reduces vertical padding, decorative avatar
size and section gaps, retaining the text, wrapping and separate ≥48px browser action targets.
Ordinary 390px/100% fixture rows measure 49px including the divider, previously 65px. This is
a browser reference, not a shipping dp/sp value or a measured native density improvement.
Validate actual Android fonts/font padding, nonlinear scaling, insets and ≥48dp targets
before choosing final row geometry. Larger text and long names must grow the row naturally.
Favorites grouping and list-filter presentation remain reviewable details. Favorites appear
once in a leading section, with the other rows below; both
groups are alphabetical in this fixture. The favorite state is labelled and conveyed by
filled/outlined stars, independently of color.

One selector exposes **Subreddits**, **Users**, **Your multireddits** and **Users’ multireddits**.
The latter retains the owner's username; your own multireddits show visibility and subreddit
count. The inline **Filter this list** field is distinct from bottom Search, which retains
the accepted Reddit search flow. **List options** discloses prefix-only matching and refresh.
Controls scroll with the list, and the shared bottom bar follows the accepted directional
fade. At 200% text the toolbar heading uses a full-width row rather than splitting its word.

Source evidence: `SubscribedThingListingActivity.SectionsPagerAdapter` already separates
these four browsing categories, with different tab sets in selection mode. Its add routes
are Go to subreddit, Add user, Create multireddit and Add user's multireddits. The subscription
and multireddit DAOs filter and sort by account, while the existing adapters expose favorites.
`SubscribedSubredditDao` distinguishes signed-in synchronized subscriptions from Guest's
local-only subscriptions. `MultiRedditListingFragment` separates owned/followed lists and
disables Guest refresh. Preserve those data/selection/add-route boundaries, current long-press
options, default-tab and navigation preferences; a visual selector does not merge their data.

The fixture demonstrates account-isolated lists/filter/favorites, Guest local lists, list
filtering/prefix matching, row-return scroll/filter retention, loading/empty/no-match states,
refresh failure with retained rows and Retry, and favorite failure with unchanged state.
Add actions open a labelled route preview; editors/options and full destination contents
remain later review work. No Reddit API call or native persistence/refresh behavior is
implemented. The existing native account/access/theme/font and restoration contracts remain.

## Profiles study 12 (2026-10-24)

**User-selected HTML direction:** expand the profile header at the top and collapse it while
reading, like the accepted subreddit page. Keep Follow beside the username with a separate
Save user bookmark. In the Comments list, keep the parent post context before the comment.
[Open the profile study](prototypes/relaxe-exploration/profile.html?rev=16), or
[enter Comments directly](prototypes/relaxe-exploration/profile.html?rev=16&tab=comments).
Exact header/row dimensions and remaining detail refinements are browser references; judge
final density and nonlinear font scaling on Android, as required for study 11 too.

The large header contains a banner/avatar, `u/username`, karma, cake day and bio. Other users
offer Follow and the distinct local Save user action; your own profile offers Edit profile.
At 200% text, the username takes a full row and actions wrap beneath it to preserve readable
names and touch targets. The compact toolbar retains the username/current tab, Sort and More.
Posts/Comments controls scroll away with the header. Horizontal paging follows the existing
disable-swiping preference, with top controls, More and keyboard alternatives. Each tab keeps
its scroll position and sort/time selection in the fixture. The shared bar fades with reading
direction and Search opens over the same profile, scoped to posts by that user; results Back
returns to the original document/offset. Query/history scope includes the target username.

Source evidence: `ViewUserDetailActivity` has exactly Posts and Comments, backed by user/
submitted `PostFragment` and `CommentsListingFragment`. It uses `ViewPager2`, respects
`DISABLE_SWIPING_BETWEEN_TABS`, prioritizes explicit initial tab/sort over resume and restores
the appropriate tab's feed record. `UserThingSortTypeBottomSheetFragment` exposes New, Hot,
Top and Controversial; the latter two use the retained Hour/Day/Week/Month/Year/All Time flow.
The prototype's New fixture default does not change any native sort preference.

Follow, Save user and user-list favorites remain separate: native Guest following and saving
use local lists, Save user is also local when signed in, and it is hidden on your own profile.
Do not discard the existing Room-backed user marks/favorites or remote follow eligibility.
Own-profile menu visibility differs from other-user menus. Retain sign-in/access checks for
messages/report/block, existing avatar-animation/media/content policies, Markdown bio behavior,
account scope, custom fonts/themes and restoration. The Guest own-profile destination offers
account access rather than inventing a Reddit profile for Guest.

Posts reuse the accepted compact renderer and its actions/media. Comment specimens show
subreddit/time, parent post title, full comment text and points/thread access; they are list
composition examples, not replacement native comment actions or paging. Edit, message, tag,
block, report, multireddit, filter, share and layout controls are labelled route previews.
No API request, real follow/save, message, report or native persistence is implemented.
Loading, missing banner, long bio, details failure with retained posts, empty contributions,
follow unavailability/failure and Guest states are review fixtures. ROADMAP.md records actual
verification, repairs and the remaining browser diagnostic. Continue with Inbox next.

## Feed and media review decisions (2026-10-23)

**Accepted feed direction: refined Option A; accepted media behavior is recorded below.** These are presentation
decisions and requirements; they do not authorize production implementation or approve the
whole-app theme, shell, icons or identity. Post-details decisions have their own section below.

The user reviewed revision 03 and approved the refined feed/media mockup. This closes the
current mockup review; native Android refinement and verification remain implementation work.

- Keep A's compact density, thumbnail size and title-first placement. Group rows as compact
  cards. Exact card radius, border/elevation, colors and spacing remain open to refinement.
- Below the title, group **subreddit · username · post flair (if present)**. Display neither
  `r/` nor `u/` in these feed labels. Wrap this metadata onto another line when needed;
  do not discard the author/flair to keep a fixed height. This wrapping choice was confirmed.
- The following statistics line is **bold points** · comments · time. Move the time here
  from the subreddit line. Internal names/identifiers and navigation semantics stay unchanged.
- No permanent three-dot button on the collapsed feed card. Long press reveals a toolbar
  that drops down within that card: upvote, downvote, post-details/comments destination,
  open in external browser, then More. “Post & comments” is interpreted as one combined
  destination button; its page design is recorded in the separate post-details review below.
- More contains subreddit navigation, author information, mark unread, hide, report, mute,
  share/copy and related upstream actions. Keep save/unsave reachable there unless selected
  as a direct toolbar button. Exact menu grouping and final icon assets remain open.
- Provide customization in options for long-press buttons and related behavior. The prototype
  demonstrates show/hide, ordering, reset and an always-visible-toolbar accessibility option.
  Those specific editor controls/location are proposals; customization itself is required.
- A's vertical-media presentation is the selected direction. **Eligible active video/GIF
  pages must autoplay**, with explicit pause available. Retain content gates and existing
  autoplay/data/mute preferences; this requirement does not authorize bypassing user policy.
- Media controls, post text and Reddit actions start hidden and appear on a screen tap.
  A further tap hides them without changing playback. After explicit reveal, video/GIF controls
  hide after about **four seconds while playing**, as confirmed by the user. Keep them while
  paused, seeking or navigating with keyboard/accessibility controls. Include Comments beside
  voting/save; it opens the current post's default post-details route, not a new comments panel.
- The user accepted the compact-feed mockup and otherwise accepted the direction, allowing
  further refinements during native Android implementation. This accepts the presentation
  direction, not evidence that browser pixels/gestures/lifecycle will transfer unchanged.
- Whole-app styling is a separate task/chat. Review each UI area with the user and ask focused
  questions about desired changes before choosing that area's styling. Do not infer global
  approval from the feed/media prototype. Keep this tracker current as decisions are made.

Prototype revision 03 is the default [Refined A view](prototypes/relaxe-exploration/index.html).
The original A/B/C study remains selectable for comparison. Current cards show six complete
rows at 390×844/100% with a 650px feed area and 97px median collapsed card body height
(excluding the 6px inter-card gap). This is a
browser fixture result, not a measured native improvement. Expanded toolbars intentionally
increase height. The prototype uses a 550ms hold with movement cancellation; native timing
must follow platform long-press/touch-slop behavior rather than copy this browser constant.

Right-click and Shift+F10 expose the toolbar in the browser; Escape or tapping the expanded
card body collapses it. Native presentation must expose a TalkBack custom action and keyboard/
Switch Access equivalent. The proposed always-show option provides another access path without
adding permanent dots. Only one toolbar is expanded by default; configured extra buttons wrap
with ≥48px targets. Card dismiss/selection rules and final menu appearance remain proposals.

In Refined A, entering or paging to eligible video/GIF starts playback. The local sample is
muted initially; pause persists on re-render and moving to another post re-evaluates autoplay.
Opening a dialog/backgrounding suspends playback, with explicit resume or a new page required.
Blocked browser playback falls back to Play. No gated full media is loaded before reveal.
Only one comparison player is active. Native lifecycle, provider and policy behavior still
needs its own implementation/verification; these browser mechanics are not a new player stack.

### Media overlay review and evidence (2026-10-23)

Research used official documentation and pinned source; no reference app was installed or
behaviorally exercised. This extends the earlier Sync/Boost/SnapReel research below.

| Reference | Documented / source behavior | Application to Relaxe |
| --- | --- | --- |
| [SnapReel VideoPage](https://github.com/shahriar-ahmed-seam/SnapReel/blob/57df94471fd81f9049cc1149dacffd4d69a57063/app/src/main/java/com/snapreel/app/ui/viewer/VideoPage.kt) and [ViewModel](https://github.com/shahriar-ahmed-seam/SnapReel/blob/57df94471fd81f9049cc1149dacffd4d69a57063/app/src/main/java/com/snapreel/app/ui/viewer/ReelsViewerViewModel.kt) | Source starts settled pages with hidden controls. Video controls time out after 3 seconds while playing, suspended during slider drag; its tap state machine also pauses/resumes. Untested source inspection. | Adopt hidden entry and interaction-aware hiding. Relaxe's user chose ~4 seconds and a tap that changes visibility only; Play/Pause remains explicit. Do not copy SnapReel's multi-step tap cycle. |
| [YouTube Android accessibility help](https://support.google.com/youtube/answer/6087602?hl=en) | Documents bringing up player controls, labelled playback actions and a configurable auto-hide timer. Its double-tap instructions describe TalkBack activation. No ordinary-mode timeout is specified on this page. | Keep a discoverable accessibility action and configurable/extended hiding behavior. Do not interpret TalkBack double-tap as the default media gesture or copy an assumed timeout. |
| VLC Android [player guide](https://docs.videolan.me/vlc-user/android/3.X/en/video/video_player.html) and [video settings](https://docs.videolan.me/vlc-user/android/3.X/en/more/settings/extra_video.html) | Docs describe tap-to-show controls for its pop-up player and a separate video-transition option controlling title/control display when a new playlist video begins. Full-screen timing is not established here. | Page-entry visibility and later control reveal are separate decisions. Avoid VLC's brightness/volume/seek swipe mappings, which conflict with Relaxe's vertical posts and horizontal galleries. |

Revision 03 implements the user's hidden-by-default requirement as an overlay on a stable
Fit canvas: revealing metadata/controls does not shrink/reframe the media or replace its
video element. Both up/down voting, an explicit Comments button, save and More are in the
revealed Reddit action group. Comments uses the existing post-details destination with the
current post/account; its screen was accepted in the separate post-details review below.

The four-second countdown begins after reveal/interaction during active video/GIF playback.
It resets on interaction, stops during pause/scrubbing/keyboard navigation, and restarts when
eligible playback resumes. Photos have no countdown. Every new post starts with overlays
hidden; gallery navigation retains the same post's visibility state. Swipe movement must not
also register as a reveal tap. Explicit buttons remain alternatives once controls are shown.

Browser keyboard focus can reveal controls and suspend their timeout. Native Android must
provide a named Show controls accessibility action, honor accessibility timeout requirements
and keep controls available while accessibility focus/interaction needs them. This is not a
TalkBack service test. Error/loading/content-gate feedback and recovery remain visible as
functional states; hidden chrome must not strand the user on failed or gated media.

The mockup replaces browser-native video chrome with explicit play/mute/seek controls so a
native browser control bar cannot remain visible over the hidden state. Android should reuse
the existing Media3/provider stack and control visibility mechanisms. Validate timer policy,
tap/scroll/zoom arbitration, safe areas, focus and playback ownership on Android before treating
HTML timing or geometry as final. Global icon/type/color styling remains a separate task.

## Post-details/comments review (2026-10-23)

**Study 04 accepted by the user for now:** full post followed by comments, with the top-right
“−” button collapsing that comment branch (“+” reopens it). Add an explicit main-post Reply
button for top-level comments. The current mockup, including long-press comment actions, is
the working direction; retain the always-visible comparison and existing native preferences.
Native refinements are expected during implementation. Whole-app styling, app identity and
production implementation remain outside this review.

Open [the post-details prototype](prototypes/relaxe-exploration/details.html). It is separate
from the approved revision 03 feed/media study and reuses its local assets and provisional
visual roles. It includes photo, text, gallery, video and GIF posts; light/dark, 100/130/200%
text, three widths, full/summary comparisons and two comment-action modes. Full post is the
selected default; a summary never replaces it automatically on scrolling.

### Existing behavior inspected for this review

Paths are relative to `app/src/main/java/ml/docilealligator/infinityforreddit/` unless marked
`res/`. These are source findings, not newly verified Android behavior.

| Owner | Evidence / preservation requirement |
| --- | --- |
| `viewmodels/ViewPostDetailFragmentViewModelNew.kt:98–155` | UiState separates initial load/failure, refresh, child loading and error reasons; DataState holds post/comments/child IDs. Recovery has completed versus interrupted partial-result semantics. Reuse these states rather than a separate comments repository. |
| `fragments/ViewPostDetailFragmentNew.java:1298–1388` | Existing scroll anchors, collapsed-thread records, above-comments anchors and gallery page restoration; gallery state is captured independently of whether a thread anchor exists. Do not reduce restoration to a list index alone. |
| `adapters/CommentsRecyclerViewAdapterNew.java:1373–1430` | Existing reply launches `CommentActivity` with parent fullname/depth/body and subreddit context. Guest/archive block reply and vote; post/comment locks block replies. Keep current action/helpers and availability checks. |
| `adapters/CommentsRecyclerViewAdapterNew.java:1664–1742` | Toolbar visibility, branch expansion and Markdown interaction are coupled to the tap/hold-swap preference. Spoiler/link/text-selection paths must not accidentally collapse branches. Proposed hold actions cannot silently reverse existing user preferences. |
| `customviews/CommentToolbar.kt`, `CollapsedCommentHeader.kt` | Existing width-aware toolbar/header compaction and reuse behavior. Preserve reply access; evaluate target sizes when reusing compaction rather than copying its smallest icon stages into the redesign. |
| `res/xml/comment_preferences.xml`, `post_details_preferences.xml` | Existing toolbar/collapse/avatar/prefix/embedded-media settings, top-level-first mode, gallery-grid and landscape split/swap preferences. Preserve scoped settings and layout variants; the phone mockup does not replace them. |

### Study 04 accepted composition and interaction direction

- Present the full title, prefix-free subreddit/author/flair metadata and bold-points/comments/
  time, then full post content/media and post actions. The photo is fitted without a forced
  crop; gallery pages have labelled controls. A jump-to-comments control avoids forcing a
  long scroll. Compact summary is an explicit alternative/toggle for comparison only.
- Use a clear comments boundary with sort and active-account context. Group top-level threads;
  show replies with indentation and explicit parent/level text. Cap visual indentation at
  40px; large text removes that margin while preserving the parent relationship/level labels.
  This is visual presentation, not flattening or changing the underlying thread model.
- Offer an explicit ≥48px top-right “−” branch-collapse button, changing to “+” when collapsed.
  Nested collapse choices survive collapsing
  and reopening an ancestor. Comment text remains selectable; links and spoilers own their
  taps. Hold/right-click/Shift+F10 can reveal vote/reply/save/More; always-visible mode is
  available for comparison. Map this direction onto existing gesture preferences without
  silently overriding them; final action customization follows the accepted options approach.
- Include Reply among the main post's actions. It always targets the post, even when a child
  comment draft exists; each comment's Reply retains that comment as its parent. Keep drafts
  separate by parent and respect guest/locked/archived reply restrictions.
- Keep a bottom reply entry and next-top-level-thread control. The inline reply editor is a
  flow demonstration, not approval to replace `CommentActivity`. It retains local drafts by
  post/parent/fixture account, includes parent context, and keeps text on a failed send. Closing
  or switching post does not submit or discard it. Native composer location/formatting and
  persistence still need review. The Send button only appends a synthetic local comment.
- Keep optimistic vote/save feedback and rollback, stable comment IDs, gallery position,
  collapse state and local drafts across redraws. The prototype's root sorting is deterministic
  fixture ordering, not Reddit's ranking algorithm. Preserve upstream sort/recommended-sort
  semantics, read/history side effects and account context in the native route.
- Show loading, comment-load failure with retry, empty discussion, refresh over retained
  content, load-more failure/retry, guest/locked/archived availability and interrupted recovery.
  Deleted authors, removed text, hidden scores, OP/mod badges and edited comments are fixture
  cases. The source's other error classes and nested child-placeholder cases remain native
  validation requirements; the mockup does not exercise every backend failure.

Inline video in this study starts paused and retains playback through same-post redraws;
dialogs pause it. GIF animation opens on request. These are demonstration mechanics, not a
decision to change existing inline autoplay/data policy. Approved vertical-viewer autoplay
is separate. The browser Back example previews returning to the originating feed/viewer;
cross-page anchor restoration, process recreation and Android IME behavior are not implemented.

### Verification and next decisions

Study 04 passed 72 browser combinations (three widths × two themes × three text scales ×
full/summary × hidden/visible comment toolbars), with no page exceptions, horizontal-overflow
findings or visible button/select targets below 48px. Interaction checks covered nested collapse
retention, true held-pointer and keyboard access, vote failure rollback/save, reply draft close/
reopen and post isolation, explicit main-post Reply creating a root while retaining a child
draft, failed-send retention/success, link/spoiler independence, menu-to-editor
focus, locked/archive/guest rules, retry/partial recovery fixtures, load more, gallery position
and inline playback continuity/dialog pause. Normal full post, normal discussion and narrow
dark 200% thread/editor captures were visually reviewed. Ignored evidence:
`.gradle/design-details-verification.json` and `.gradle/design-details-*.png`.

These are HTML checks, not native accessibility, span hit-testing, image/provider, IME or
process-restoration verification. The approved feed/media study is retained; no native source,
identity, goldens or build files changed and no Gradle/device rerun was justified. Current
post-details mockup review is closed with the main-post Reply addition. Native preference
mapping, composer integration and device refinement remain separate implementation work.

### UI review tracker

This is a review inventory, not approval to redesign every surface now. Record user decisions
per area; ask focused questions when that area becomes active. Keep behavior, API/access,
account scope, accessibility and restoration requirements from ARCHITECTURE.md throughout.

| Area | Current decision/status | Next review |
| --- | --- | --- |
| Compact feed | Refined A accepted at HTML design level; cards, metadata/stat grouping, hidden toolbar and customization required | Native refinement/validation when implementation is separately authorized |
| Other feed layouts | Existing layouts retained | Decide which need presentation changes after compact is settled |
| Post details and comments | Study 04 accepted for now: full post → comments, top-right −/+ branch collapse, explicit main-post Reply for top-level comments | Native preference mappings, composer integration and Android refinement; exact styling separately |
| Vertical photo/gallery/video/GIF | A selected; autoplay; tap-revealed overlays; confirmed ~4s playing timeout; Comments goes to default details | Native gesture/timeout/accessibility/policy/restoration validation; exact styling separately |
| Long-press/action options | Customizable actions required | Final placement, order/toggle controls, defaults, scope/persistence and accessible alternatives |
| Shared visual foundations | A typography + B moderate rounding + C solid icons selected; reuse existing wallpaper/custom theme mechanisms through component-role mapping | Native geometry/assets, full role parity and accessibility validation remain later work |
| Shell/navigation | Study 09b accepted at HTML design level: shell/drawer, balanced → expanded search, compact type/scope selector, history/tools and current results presentation | Keyboard-on-open deferred to native review; layout/preference mappings, insets, Back and restoration remain implementation work |
| Subreddits/search/list surfaces | Search 09b and subreddit/shared-shell revision 12 accepted at HTML level; study 11 single list selector and visible stars selected, tighter rows requested and demonstrated | Judge final row density on Android; retain list details for consistency review and continue to Profiles |
| Profiles/inbox/saved/history | Profile study 12 expanding header, adjacent Follow/separate Save user and parent-post context first selected; Inbox/Saved/History still route previews | Inbox messages/notifications next, then Saved/History; native profile geometry/actions/accessibility remain implementation work |
| Creation/editing/moderation | Not styled or approved | Post/reply editors, formatting/attachments, validation, moderation/report flows |
| Settings/accounts/onboarding | Review 07 has preference-row specimens; existing theme mechanism inspected, area design not reviewed | Preference organization, login/API-key/access setup, account options and theme editor in proposed group 5 |
| Sheets/dialogs/feedback | Search entry accepted in study 09b; keyboard policy deferred to native review; other shared dialog details open | Action/confirmation menus, destructive feedback and focus in create/act group |
| Media utilities/downloads | Existing behavior retained | Provider/external-open/share/save/download surfaces and status feedback |
| Accessibility/responsiveness | Cross-cutting requirement, not a separate cosmetic pass | Large text, TalkBack/Switch Access, RTL, keyboard, landscape/tablet, motion and safe areas in every slice |

Existing reuse evidence for toolbar work: `res/xml/post_preferences.xml` already has
`long_press_to_hide_toolbar_in_compact_layout` and `post_compact_layout_toolbar_hidden_by_default`;
`res/xml/gestures_and_buttons_preferences.xml` has separate media/non-media post long-press
choices. `PostPreferenceFragment.java:95–104` dispatches visibility changes; compact holder
logic around `PostRecyclerViewAdapter.java:6331` already toggles its toolbar. Extend these
through existing account-scoped preferences where suitable; selectable ordering has not been
established as an existing capability. Do not introduce a competing options/account system.

## Visual-media Vertical Swipe

Approved scope: photos, photo albums/galleries, videos, and GIFs. Exclude text-only posts and
ordinary links without supported visual media from this presentation.

Reuse the active account/feed, sort, filters, paging order, and existing Reddit interactions.
Use upstream's media predicate/filtering as a starting point and verify provider eligibility
and mixed galleries before adopting it unchanged.

Design and validate:

- Vertical page movement with horizontal galleries and image zoom that do not fight each other.
- One actively playing media item, bounded preparation, and predictable pause/release on
  swipe, backgrounding, layout exit, and recreation.
- Existing content gates, mute/autoplay/data preferences, usable controls, and explicit
  loading, unavailable-media, and retry states.
- Consistent actions and metadata with safe-area insets, TalkBack alternatives, readable
  contrast, and reduced-motion behavior.

The selected A mockup uses Fit framing and the tap-revealed overlay behavior above. Native
seek/zoom arbitration, preloading budget and exact styling still require validation. SnapReel
and other viewers are interaction references. SnapReel is local media; Reddit provider/network behavior needs
separate validation. References are inspiration, not a requirement to copy their architecture.

## Denser compact feed

The user finds Continuum's Compact and Compact 2 too tall and wants the density associated
with Boost/Sync: smaller individual feed entries and more posts visible at once.

Verified starting points:

- `app/src/main/res/values/dimens.xml` defines a 112dp compact thumbnail default.
- `app/src/main/res/xml/post_preferences.xml` exposes a thumbnail-size preference, applied
  at runtime by `PostRecyclerViewAdapter`.
- `item_post_compact.xml` separates metadata/content/action areas; Compact 2 includes a
  vertical voting group. Thumbnail size alone is not the only contributor to row height.

Compare smaller thumbnails, consolidated metadata, title wrapping, padding, and action
placement using identical realistic posts at the same device/font settings. Measure visible
posts per viewport, retain readable text and usable touch targets, and check long titles,
flair, missing media, and large fonts. Exact dimensions, controls, and final layout names
remain open. Keep existing layouts available while validating a new composition.

## Exploration checkpoint (2026-10-23)

**Status: original research/comparison retained; the review decisions above supersede its
feed composition/action recommendations.** Remaining visual tokens and unselected gestures
below are proposals. No production source, identity, build configuration, goldens, or upstream
API/access mechanisms changed during this exploration.

Open [the local interactive comparison](prototypes/relaxe-exploration/index.html) directly in
a browser. No server, installation, account, external font, or network connection is needed.
Choose Refined A or the original comparison, feed/media, light/dark, 100/130/200% text,
360/390/600px width, and loading/error/empty/gate states. The wordmark,
browser workbench typography and study names are presentation aids, not an approved identity.

### Shared component and state inventory

Inspected at foundation checkpoint `dd68e7479`; source is evidence, not a claim of device
verification. Source paths below are relative to `app/src/main/java/ml/docilealligator/infinityforreddit/`
unless prefixed with `res/`. The broader source map remains in [ARCHITECTURE.md](ARCHITECTURE.md).

| Family | Shared elements and states to carry forward | Existing owner / incremental reuse |
| --- | --- | --- |
| Shell/navigation | Account/subreddit identity, toolbar, sort/filter context, tabs, sheets, Back, selected tab, insets, restored position | `activities/MainActivity.java:160,1760`; `fragments/PostFragment.java:1637`; retain intents/FragmentManager and `resume/FeedResumeState.kt` |
| Feed containers | Initial load, loaded, refresh with content, append/retry, filtered-empty/end, selected layout, read state | `post/PostViewModel.java:358,405,420`, `post/PostPagingSource.java`; use the existing cached filtered Paging stream; media-only must reach paging/invalidation |
| Post rows | Title, subreddit/author/time, flair/type/gates, thumbnail/placeholder/gallery count, points/comments, read/saved/vote/pending/error | `adapters/PostRecyclerViewAdapter.java:181,740,828`; holders mix presentation with action/cache/read effects; replace one holder and extract only the boundary it needs |
| Dense composition | Thumbnail width, title wrapping, metadata, action/footer blocks, row padding | `res/values/dimens.xml:16` has 112dp default; `res/layout/item_post_compact.xml:104,163,181,195,285,308` plus Compact 2/right-thumbnail variants; runtime size preference alone cannot remove structural height |
| Actions/feedback | Save/unsave; neutral/up/down vote; pending, confirmed, failure/rollback; action sheet; cross-screen feedback | Existing `thing/SaveThing.*`, `thing/VoteThing.java` and adapter callbacks; preserve optimistic results, cache updates and account scope; do not duplicate network calls |
| Comments/detail | Post header, Markdown/link spans, depth/collapse, sort, reply/actions, initial failure, refresh, more children, partial recovery, gated/error states | `viewmodels/ViewPostDetailFragmentViewModelNew.kt:102` exposes UiState/DataState; `adapters/CommentsRecyclerViewAdapterNew.java`; keep existing recovery/sort/rendering contracts |
| Media | Provider/poster, photo/gallery page, buffering/first frame, playing/paused/muted, seek, zoom, gated, unavailable/retry, restored position | `VideoLinkFetcher.*`, `activities/ViewVideoActivity.java`, `videoautoplay/`, Glide/Media3, adapter Toro holders and gallery touch arbitration around `PostRecyclerViewAdapter.java:6893`; retain provider/policy/lifecycle paths |
| Settings/themes | Preference rows, switches/lists, enabled/disabled, account-specific values, custom/dynamic colors, light/dark | `account/AccountScope.kt`, scoped preference wrappers, `settings/PostPreferenceFragment.java`, `customtheme/`, `customviews/compose/AppTheme.kt`, MaterialYouUtils; map semantic tokens into XML and Compose progressively |

Cross-cutting states include keyboard/focus, pressed/selected/disabled, content descriptions,
large text, narrow/landscape/tablet layouts, reduced motion, and recreation. An empty filtered
feed, a failed request and an unavailable provider need different messages and recovery actions.
Existing accessibility debt is not evidence that these requirements already pass.

### Reference evidence and limits

Research used primary developer pages/release notes and pinned source, not installed apps.
No row heights, gesture thresholds, current Reddit connectivity, or accessibility behavior
were measured in Sync, Boost or SnapReel. Historical feature descriptions are not present-day
support guarantees. There are no screenshot-derived behavioral claims in this study.

| Reference | Documented/source evidence | Design implication; uncertainty |
| --- | --- | --- |
| Sync compact/list | Developer [v20 beta notes](https://www.reddit.com/r/redditsync/comments/l7hes5) document optional single-line titles; [v11.2.1 notes](https://www.reddit.com/r/redditsync/comments/4k84g1) document reduced compact padding and long-press post options | Density combines wrapping, padding and thumbnail choices. Exact action layout and touch dimensions remain unverified. Long-press should be supplementary. |
| Sync navigation/actions | Developer [v23 notes](https://www.reddit.com/r/redditsync/comments/10s1bui) describe bottom navigation, customizable quick actions, swipe actions and position restoration | Keep density and navigation/action preference separable; copying gesture behavior is not required. |
| Boost feed/media | [Developer feature page](https://boostforreddit.com/) describes compact list, cards, slideshow, gallery modes, per-subreddit presentation, left-handed configuration and media previews | A dense feed can coexist with dedicated media browsing. Slideshow direction, gallery gestures and exact density are not established. |
| Boost playback | [Developer changelog](https://boostforreddit.com/blog/) records compact dimension reductions, mute preferences, GIF autoplay always/Wi-Fi/never and lower-data album loading | Preserve policy explicitly when changing presentation. These are historical descriptions, not tested current network behavior. |
| SnapReel image/paging | Pinned [viewer](https://github.com/shahriar-ahmed-seam/SnapReel/blob/57df94471fd81f9049cc1149dacffd4d69a57063/app/src/main/java/com/snapreel/app/ui/viewer/ReelsViewerScreen.kt) and [ImagePage](https://github.com/shahriar-ahmed-seam/SnapReel/blob/57df94471fd81f9049cc1149dacffd4d69a57063/app/src/main/java/com/snapreel/app/ui/viewer/ImagePage.kt): vertical pager, URI/index restoration, 1–5× zoom, Fit/Fill, optional timed advance | Source inspection only. Image pan is processed with multiple pointers; familiar one-finger panning is not established. A local folder sequence does not define horizontal Reddit galleries. |
| SnapReel video/lifecycle | Pinned [VideoPage](https://github.com/shahriar-ahmed-seam/SnapReel/blob/57df94471fd81f9049cc1149dacffd4d69a57063/app/src/main/java/com/snapreel/app/ui/viewer/VideoPage.kt) and [ViewModel](https://github.com/shahriar-ahmed-seam/SnapReel/blob/57df94471fd81f9049cc1149dacffd4d69a57063/app/src/main/java/com/snapreel/app/ui/viewer/ReelsViewerViewModel.kt): seek/mute/retry, first-frame poster, control visibility cycle, lifecycle pause/trim/release | Useful explicit states; the three-step tap cycle is not usability evidence. [Current README](https://github.com/shahriar-ahmed-seam/SnapReel/blob/57df94471fd81f9049cc1149dacffd4d69a57063/README.md) describes up to three players and decoder-pressure fallback. That is not an appropriate default streaming budget without measurement. |

SnapReel here is shahriar-ahmed-seam's offline Android folder viewer. Its current source
differs from older indexed README content. GIF extension recognition does not establish
animated decoding/pause support. Reddit mixed galleries, provider failures, network budgets,
and account/content policy require separate verification. The similar ExoReel demo adds no
useful photo/gallery/GIF evidence, so it was not used as a design authority.

### Three comparable directions

All directions use the same ten synthetic posts, titles, scores and order: mountain photo,
two-image hiking gallery, flower video, Earth GIF, long discussion with flair, ordinary link,
gated photo, failed visual-media item, text discussion and forest photo. The viewer preserves
their relative order while excluding text and ordinary links. Seven visual posts remain.
These are realistic fixtures, not fetched Reddit content or user data.

| Direction | Compact feed | Vertical media | Main trade-off |
| --- | --- | --- | --- |
| A · Index (recommended) | 64px left thumbnail; title first, two lines at normal size; consolidated metadata/stats; text opens comments; visible overflow for save/vote | Fit whole media; reserved dark control/metadata bands; explicit gallery and page buttons | Most title space without a separate action bar; save/vote require opening the sheet |
| B · Dock | 56px left thumbnail; title/subreddit above a 48px action strip with upvote/comments/save/overflow | Fit whole media above a themed persistent bottom dock | Best direct action discoverability; the tallest feed rows |
| C · Context | Subreddit above title; points/menu rail on left; 64px thumbnail on right | Fill with prominent metadata and controls over an opaque lower scrim | Strong subreddit scanning; narrower text and cropping/overlay costs |

Original-comparison measurements in headless Chrome, local fixture, at scroll top, with
Segoe UI fallback (these do not describe revision 02's refined cards):

| Viewport / text | A complete rows / median height | B complete rows / median height | C complete rows / median height |
| --- | --- | --- | --- |
| 390×844 / 100% (650px feed area) | 6 / 96px | 5 / 123px | 6 / 98px |
| 360×800 / 100% (606px feed area) | 5 / 96px | 4 / 123px | 5 / 98px |
| 600×960 / 100% (766px feed area) | 8 / 81px | 6 / 120px | 8 / 81px |

Measurements are browser comparisons, not native dp/sp results. The current native 112dp
thumbnail default is only one structural input, not a measured baseline row. Establish the
actual improvement over both Continuum compact layouts in the first native slice. B is a
useful action-rich comparison but is less likely to meet the strong density objective.

At 130/200% text, titles expand fully. A/C switch to a wider text column and 48px media/menu
column rather than retaining both side rails. Media switches from overlays to a scrollable
stack with a bounded preview area. Density yields to readability; native Android nonlinear
font scaling, TalkBack and real insets still require device verification.

### Recommended shared rules (proposal)

| Role | Proposed rule |
| --- | --- |
| Color | Semantic surface/on-surface/muted/divider/accent/accent-container/error roles. Prototype fallback: light `#FAFBF7` / ink `#202B24`, dark `#141B17` / ink `#E8EEE7`, accent `#315E42` / dark `#B4D4AD`. Map existing dynamic/custom theme roles; do not force this fallback over user themes. |
| Type | Native system Roboto; compact title 15sp/roughly 19sp line height, metadata/stats 12sp/16sp, body 16sp/22sp, toolbar 20sp. Use sp with wrap-content; do not freeze row heights. Two title lines at normal size; full title in detail and accessible name; expand with large text. |
| Space/density | 4dp spacing grid, 8dp compact row padding/gaps, 12–16dp screen/control insets. Start with 64dp thumbnails, 48dp at large text; omit empty image space only after comparing alignment with the approved composition. |
| Shape | Compact card grouping is user-selected; exact corners/elevation/borders remain proposals. Start with restrained card separation and 6dp thumbnail radius; 20–24dp sheet corners are unapproved. |
| Icons/actions | Reuse upstream icon assets/meaning with 20–24dp visuals and non-overlapping ≥48dp targets. No idle card overflow: More belongs in the revealed customizable toolbar. Preserve labelled save state and up/down/neutral vote semantics. Prototype Unicode symbols are placeholders. |
| Feedback | Keep content during refresh/append failure; localize spinners; pending action → confirmation or restored previous state + retry. Saved/read/vote state uses labels/semantics as well as color. Sheet dismissal restores focus. |
| Motion | Short state transitions only; no timed page advance by default. Honor system reduced motion, suppress decorative animation, retain functional playback controls. Avoid new post-swipe voting in the first slice. |

The same semantic roles should style rows, comments, sheets, media controls, navigation and
preferences incrementally. Reuse XML/custom-theme/Compose mappings before introducing
parallel theme or account preference systems. Secondary screens can keep current layouts
while shared roles are adopted.

### Proposed gestures, media policy and accessibility

- Thumbnail opens visual media; text/comments affordance opens the existing detail route.
  Keep upstream mark-read timing and preferences in production; the prototype's read mark
  is only an illustrative local transition. The user-selected feed long press reveals its
  in-card toolbar; provide accessible alternatives without an idle three-dot control.
- Vertical swipe moves one visual post; horizontal swipe moves one gallery item. Lock the
  dominant axis after touch slop; do not transfer a gallery-edge gesture into post movement.
  Prototype uses a 48px end-distance and 1.3 axis ratio for demonstration, not approved native
  thresholds. Adopt platform slop and validate actual nested scrolling before specifying them.
- Pinch zoom and one-finger image pan should own touches above 1×; disable post/gallery paging
  until zoom resets. Double-tap image can zoom/reset; it must never vote. Prototype demonstrates
  center zoom/reset and paging lock only; pinch, pan, edge handoff and double-tap are unverified.
- Fit whole media is the selected mockup framing. Fill is explicit and reversible. A tap
  reveals/hides media controls, post text and Reddit actions without pausing; all actions remain
  accessible through reveal and accessibility alternatives. Video
  autoplays when eligible, with explicit Play/Pause and seek; avoid the three-step
  hidden/visible/paused tap cycle. Whole-media Fit is the A prototype's current framing.
- Keep previous/next post and gallery controls and accessible actions as alternatives to swipes.
  Announce post title/type and gallery index, state and action result without reading every
  nested label twice. Provide adjustable seek semantics, elapsed/duration and captions where
  supplied. A true silent GIF has no sound control; provider video classified as GIF may differ.
- Retain current autoplay, mute, data-saver, account and content-gate preferences. Never fetch
  gated full media before reveal. A conservative candidate budget is one active player, at most
  the next permitted poster, and no neighboring video preparation on metered/data-saving use.
  No three-player pool or exact byte budget is approved; profile existing cache/player ownership.
- Pause on drag-away/loss of active page, focus loss and opening comments/actions; stop on
  background/exit, release according to existing owner/lifecycle. Restore position but do not
  resume sound unexpectedly. Keep poster until first frame; distinguish buffering, unavailable,
  provider error and retry; failure must not trap navigation or silently skip a post.
- Restore feed identity/fullname/offset, gallery index and playback position through existing
  resume records where supported. Back closes sheet, then resets zoom, then returns to the
  preserved feed anchor. Prototype preserves feed scroll on media return and gallery index
  in memory; process-death/native restoration is not implemented here.
- Require non-overlapping ≥48dp touch targets, logical traversal, labelled roles/states,
  TalkBack/Switch Access alternatives and keyboard/D-pad access. Normal text contrast ≥4.5:1;
  large text and functional icons ≥3:1. Audit every dynamic/custom palette, scrim and gate state.
  Do not place metadata directly over arbitrary imagery without a contrast surface.
- Verify 100/130/200% text, 360dp width, landscape/tablet and safe areas. Reflow before shrinking
  text or hiding controls; support RTL and long subreddit names/titles. Do not make density
  counts an accessibility pass condition at large text.

These requirements follow [Android accessible Views guidance](https://developer.android.com/guide/topics/ui/accessibility/views/apps-views),
[touch-target guidance](https://support.google.com/accessibility/android/answer/7101858),
[text-scaling guidance](https://support.google.com/accessibility/android/answer/12159181), and
[Media3 lifecycle guidance](https://developer.android.com/media/implement/playback-app).
They are requirements to validate, not claims that the prototype proves Android accessibility
or lifecycle correctness. [Views/Compose interoperability](https://developer.android.com/develop/ui/compose/migrate/interoperability-apis)
remains available where a later slice justifies it.

### First implementation proposal and acceptance criteria

After final feed review and separate implementation authorization, build **one optional
refined Index-style image-post holder in the existing
Views/RecyclerView/Paging adapter**, plus only the focused save/action boundary it needs.
Reuse existing detail navigation and save helper. Keep existing layouts as fallback. Validate
the dense composition in a fixture harness; converting every post type or adding playback
is a later slice. No API, auth, database, account namespace, identity or wholesale toolkit change.

1. At 390dp width, 100% text and a normalized 650dp feed viewport, show at least six complete
   collapsed image cards using the same realistic titles/flair/stats, with card gaps included
   in the viewport count; target median card body ≤100dp and record the separate inter-card
   gap. Use occupied row stride including that gap for the relative reduction below.
   Expanded/custom always-show toolbars are measured separately. Measure
   both current Compact layouts with identical fixtures and target ≥20% median height reduction
   against each. If the native measurements miss this, revise the composition before expansion.
2. At 360/390/600dp and 100/130/200% text in light/dark/custom/dynamic themes, no overlap,
   inaccessible ellipsis-only title, clipped actions or overlapping targets. Preserve full-title
   access; all controls ≥48dp. Check native landscape/tablet resource and ViewBinding ID parity.
3. Image-post save/unsave reaches the existing helper exactly once per accepted action; verify
   pending/success/failure/rollback, cache/cross-screen state and account isolation. Repeated taps
   during pending work must not invert or duplicate requests unexpectedly.
4. Opening comments preserves fullname, account, sort/filter/feed order and existing read/history
   effects. Back/recreation/layout switch restores the anchor/offset; no extra fetch policy or
   settings defaults change solely for the new row.
5. Verify read/saved/vote/flair/gated/missing-thumbnail and loading/append-retry states; preserve
   the title → prefix-free subreddit/author/flair → bold-points/comments/time hierarchy with
   metadata wrapping. Long press reveals an in-card toolbar with no idle overflow; verify
   touch cancellation, TalkBack/keyboard alternatives, configurable button order/visibility,
   pending-action state and focus return. Reuse existing preference scope/visibility settings
   and persist native options through recreation/account switches as defined by their scope.
6. Reuse wrapper build/JVM/lint and screenshot checks appropriate to the actual native changes;
   do not update goldens just to hide failures. Native accessibility/restoration checks require
   an explicitly selected isolated installation after identity/device setup is separately resolved.

The browser prototype is not that production implementation. The original comparison's 36 combinations
(3 sizes × 2 themes × 3 text scales × 2 surfaces, each showing 3 directions) passed DOM checks
for horizontal overflow and ≥48px button bounds. Interaction checks covered comments/read,
save failure rollback/success, modal focus return, gallery button/pointer navigation and index
restoration, feed scroll return, zoom paging lock, one
playing video, leaving-video pause/removal, GIF poster/play and gate/retry states. Four captures
(normal feed/media and narrow dark 200% feed/media) were visually reviewed. Local evidence is
`.gradle/design-prototype-verification.json` and `.gradle/design-*-review.png`; these are ignored
diagnostics, not portable golden tests. Native Gradle/device checks were not rerun: no app code
changed. The foundation verification in ROADMAP.md remains historical evidence.

Revision 02 verification adds 36 Refined A size/theme/text/surface combinations, checking an
expanded toolbar on feed cases. No horizontal-overflow or <48px button-bound findings or
page exceptions were reported. Checks also covered held-pointer/right-click/Shift+F10 opening,
Escape dismissal, vote state, More destinations, save failure rollback, focus return, button
selection/reordering/reset/always-show, separate post destination, automatic muted video/GIF,
pause persistence, leaving playback, content gating and dialog suspension. Normal collapsed/
expanded feed and narrow dark 200% feed captures were visually reviewed; autoplay capture
records the video state. Evidence: `.gradle/design-refinement-verification.json` and
`.gradle/design-refined-*.png`. The original comparison was rechecked unchanged. Toolbar
configuration is local in-memory preview state, not implemented native persistence.

Revision 03 rechecks the original 36 comparison configurations and 36 Refined A configurations
after the overlay change. An additional 18 playing-video size/theme/text cases check revealed
controls, including seek and wrapped Reddit actions. All passed with no page exceptions,
horizontal-overflow findings or visible button/input targets below 48px. Interaction checks
verify hidden entry, tap without playback/video-node/frame changes, video/GIF four-second
hiding, paused/scrubbing/keyboard timeout suppression, swipe without accidental reveal,
Comments to default details and keyboard Back/Escape behavior. Hidden/shown normal and dark
narrow 200% captures were visually reviewed. Evidence is ignored at
`.gradle/design-media-03-verification.json` and `.gradle/design-media-03-*.png`.
This validates the HTML study only; it is not Android service, gesture or lifecycle coverage.

Remaining prototype limits: no real Reddit actions/providers, native nonlinear scaling,
TalkBack service test, pinch/pan, process recreation, bandwidth/decoder/battery profiling or
measured native density comparison. Refined A uses custom HTML playback controls; the archived
original comparison still uses browser-native video chrome. Both differ from Android.

### Fixture asset sources

Local assets are for the isolated comparison, not production packaging. All fixture text is
synthetic. [Unsplash license](https://unsplash.com/license) applies to the resized
[mountain photograph](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=85)
and [forest photograph](https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=85).
The flower clip is the [MDN CC0 video sample](https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4).
[Rotating Earth by Marvel](https://commons.wikimedia.org/wiki/File:Rotating_earth_(large).gif)
is used under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
`earth.gif` is unchanged; `earth-poster.png` extracts its first frame and is offered under the
same license. UI display cropping is illustrative. Asset rights are separate from repository
code licensing; retaining these fixtures in any later publication requires their credits.
