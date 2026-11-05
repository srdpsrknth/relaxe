# Design direction

## Approved product constraints

Approved on 2026-10-23. These are design constraints; no new visual system or layouts have
been implemented in the fresh fork.

- **Relaxe for Reddit** is an independent presentation experience built on Continuum.
- Product-facing names, warnings and policy links must use **Relaxe for Reddit**, not the
  upstream brand. Relaxe needs its own privacy policy; an upstream repository/policy is not
  a substitute. Preserve source identifiers, actual subreddit names, provenance and required
  legal attribution. This is an HTML/product direction, not authorization for native identity
  changes or wholesale renaming.
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

The user clarified that HTML studies decide hierarchy, placement, interactions and styling
direction. Their browser controls, exact spacing and rendering are provisional. Translate
accepted intent into refined native Android components and existing Continuum mechanisms,
then review native density, feedback, keyboard/gestures, accessibility and adaptive layouts
on Android; the browser appearance is not a pixel-for-pixel shipping specification.

## Whole-app styling review 07 (2026-10-23)

**Foundation direction selected:** A's typography + B's moderate rounding + C's solid icons.
**Icon review is deferred to Android implementation**, explicitly requested by the user.
Current HTML glyphs are placeholders; exact artwork, glyph choice and sizing are not signed
off. Keep the shared style direction, but do not spend the remaining HTML pass polishing icons.
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
3. **Browse/personal surfaces (directions selected):** subreddits, subscriptions/multireddits, search/filter lists,
   profiles, inbox, saved/history and other retained feed layouts, in small review groups.
4. **Create/act (active; six post-type proposals drafted):** post/reply editors, formatting/attachments, action customization,
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
verification, repairs and the remaining browser diagnostic. Inbox study 13 follows below.

## Inbox study 13 (2026-10-24)

**Selected requirement: Boost-inspired Inbox views**, following the user's screenshot:
All, Unread, Messages, Sent and Mentions must be reachable; tabs are not required. This
supersedes the earlier two-visible-tabs selection. **The compact selector and two-line
reply/message previews are now selected** at HTML design level. Revision 18 uses those five
views plus Comment replies and Post replies, a direct Mark all read action and More.
Open [study 13](prototypes/relaxe-exploration/navigation.html?study=13&destination=inbox&rev=18)
through HTTP. The earlier placeholder and two-tab draft were shown before this revision.
Action placement and exact native geometry remain consistency/implementation review work.

All shows received items; Sent stays separate and names the recipient with To. Unread shows
only unread received items and updates after a successful synthetic read. Mentions and reply
views select their matching specimens. Each view retains its own in-document offset; account
switching and Search/results return preserve the selected view in this fixture. These local
arrays are not a native paging, API-filtering or persistence implementation. Native filters
must cover the complete account-scoped listing, not only an already loaded client page.

Rows show the other party, textual Unread marker and time; replies/mentions add type/subreddit,
parent post title and a two-line body preview. Messages use the subject and displayed message
preview. Tinted unread rows supplement the text marker. Opening shows full synthetic text with
a labelled context/thread route. The user selected two-line previews; native Markdown bodies
currently render without this truncation. At large text, actions wrap below
the full-width selector. Final density remains Android review work.

Mark all read remains account-wide even when viewing a subset or Sent; its label names Inbox
scope. More contains New private message, Refresh and Back to top. Compose and Reply are
labelled route previews that send nothing. Loading, initial failure/retry, empty, read-status
failure, paging failure/retry and Guest account access are synthetic review states. Sent
specimens do not acquire incoming unread state or offer Reply to the user's own message.
The shared bottom bar and Search/results return are reused.

Current source: `InboxActivity` still builds Notifications from `FetchMessage.WHERE_INBOX`
and Messages from `WHERE_MESSAGES`; native seven-view navigation is not implemented. A
Messages launch extra takes precedence over the restored tab. Retain account scope,
`DISABLE_SWIPING_BETWEEN_TABS` and explicit-launch/resume precedence when extending this
presentation. Current native resume stores the tab, not the prototype's view offsets.

`InboxFragment` retains refresh and initial/page error handling. `MessageRecyclerViewAdapter`
uses recursive unread detection, the displayed message, existing context links for inbox
items and the private-thread activity for Messages. Preserve optimistic read rollback,
success-only badge decrement, account-wide mark-all semantics, Markdown/link/media handling,
deleted/subreddit parties and Room-backed user marks/tags. The simple fixture read set does
not establish correctness for native threads or unread descendants. Guest does not receive
signed-in Inbox content. Existing API/access/account/theme/font mechanisms remain.

Source references: [Reddit message API](https://www.reddit.com/dev/api/#GET_message_where)
documents inbox/unread/sent listings; local `FetchMessage` also exposes messages/comments
constants and `RedditAPI.getMessages` accepts a listing path. Exact Mentions/Post replies
endpoint and parser coverage must be verified during native implementation, without replacing
access mechanisms or inventing unsupported moderator-mail access from the screenshot.

Continue with Saved/History. Thread/editor design belongs to create/act; exact Inbox action
placement can return in the consistency pass. ROADMAP.md records verification and limitations.

## Saved study 14 and History preparation (2026-10-24)

**Selected: Posts / Comments tabs plus a separate Reddit saved / Local saved source selector.**
The user chose this over a single four-view selector. The previous Saved placeholder was shown
before drafting [study 14](prototypes/relaxe-exploration/navigation.html?study=14&destination=saved&rev=19).
The draft reuses the accepted compact renderer/actions/media in a separate scoped frame;
Home’s fixtures/state remain separate. Saved comments use parent-post context before full
comment text, following the profile pattern. This composition and final density remain review
work. `AccountSavedThingActivity` currently has four pages, with query matching applied across
page changes; the new grouping does not merge those content sources.

More → Find in Saved currently reveals an inline filter field. Always-visible filtering is
the pending alternative. The query carries across both tabs and sources, separately from
bottom global Reddit Search. More also exposes Refresh, a layout route preview and the existing
Reddit Saved posts cache-bypass fixture only in its applicable source/tab. Loading, empty,
failure/retry, no-match and Guest specimens are included. Native full-list searching, cache
reconciliation, comment actions and persistence are not implemented by these fixture arrays.
Post-save fixture state is partitioned by account/source; pending synthetic actions settle
before destroying their iframe so a failed save does not become a stale success after return.
That is browser fixture lifecycle handling, not a proposed native request policy.

Guest uses its existing device-local saved-post route, not signed-in recovered Local Saved;
the fixture fixes its source to On this device and disables Comments. Native Guest routing
is evidenced by `MainActivity` selecting `ReadPostType.ANONYMOUS_SAVED_POSTS` in `HistoryActivity`.
History/Recently visited remain drawer route previews for the next small review.

`LocalSaved` reconciles signed-in saved fullnames against Reddit's listing; promoted missing
items appear in Local Saved. It is not a general offline-download switch or the Guest save
store. Guest saves use the existing anonymous read-post mechanisms. `SavedThingSearchFilter`
matches all whitespace-separated terms and the existing exact `/r/subreddit` form, while
saved searching continues loading further pages. Keep query/cache/bypass behavior, action
side effects and account boundaries; a search within Saved is distinct from global Reddit
Search in the bottom bar. Current resume restores a selected Saved page and post-tab anchor;
comment tabs have no equivalent feed anchor. `HistoryActivity` hosts a history post fragment
selected by `ReadPostType`; Recently visited remains a separate surface. This inventory is
source evidence, not approval to combine histories, change recording preferences or erase data.

## History behavior review and media-entry requirement (2026-10-24)

**Approved: retain Continuum's basic History model, including recording when the user taps a
thumbnail to view media without opening post details.** Media-only entry must participate in
the same account-scoped read/history mechanism and its existing settings, retention and clearing
rules. This is a coverage requirement for the redesigned image, gallery, GIF and video routes;
it does not create a separate media history or a record for every repeat visit. Preserve the
existing recording opt-out. Merely displaying a thumbnail or preloading media is not the
explicit viewing action described by the user. Passive autoplay and additional media-viewer
navigation triggers have not been separately approved as new recording rules.

The source already marks posts read in several thumbnail/gallery/fullscreen entry handlers,
so this requirement includes preserving existing behavior rather than assuming all such paths
need a new implementation. Native coverage across all redesigned routes remains to be verified.
**Study 15: Today / Yesterday / Earlier date headings are selected.** Revision 21 retains the
accepted compact cards, hidden post actions and shared bottom navigation. A small Added label
distinguishes the stored History record time from the post's age; it does not claim a reliably
updated last-visit time. Date headings group that record time. The continuous-list comparison
remains in the workbench only. Exact density, time formatting and Android behavior still need
native review; the browser writes no History records. More contains Refresh, Change post layout
and a labelled History settings route preview; that extra shortcut placement remains a proposal.
The previous Saved filter placement remains a provisional More entry, not an explicit approval.

Current-source findings:

- `ReadPost` stores account name, post ID, a millisecond timestamp and record type in Room.
  Its key is account + post ID + type, so this is one read-state record per post/account,
  not an event for every visit. Insert uses replace; a new write updates the timestamp.
- Normal automatic paths (`PostRecyclerViewAdapter.markPostRead` and detail ViewModel
  `tryMarkingPostAsRead`) skip posts already marked read. Consequently, reopening a known
  read post is not a reliable last-visit timestamp update. Do not equate stored time with
  first-read or last-visit time without defining new behavior and verifying all entry paths.
- Account-scoped Mark Posts As Read defaults off. Opening/detail handling can mark unread
  posts when enabled. Media-only thumbnail taps in card and compact holders, gallery taps,
  fullscreen-video entry and configured fullscreen previews also call the guarded marking
  helper before opening media. These paths require read handling to be enabled for that feed,
  the master preference, and an unread post; opening the details page is not required.
  Separate after-vote and on-scroll options also default off; the feed
  invokes the guarded marking helper. On-scroll marking occurs on holder recycling, which
  is not proof the user opened or read the content. Explicit read/unread actions use their
  own stored-state path in supported feeds.
- The default enabled history-limit target is 500, configurable down to a minimum 100 or
  disabled. The writer prunes the oldest 100 records while above the target before insertion;
  the configured number is not a strict count after every write. The helper also supplies
  limits to separate Guest saved/voted/hidden record types; retain those distinctions.
- `ReadPostDao` selects this account/type in descending stored timestamp order, 25 records
  per page. `HistoryPostPagingSource` fetches current post data through existing Reddit info
  calls (authenticated or Guest), with existing filtering. The local record is not a full
  saved copy of the post, comments or media, nor an offline availability guarantee.
- Marking a post unread deletes its READ_POSTS record. Account stored-data management can
  delete that account's read history without deleting other accounts or Guest saved/voted/
  hidden types. History toolbar actions currently provide Refresh and Change post layout.
  Read appearance and automatic hiding remain separate settings using the same read state.
- Recently visited is separate: account/type-scoped subreddit and user rows, ordered by
  `last_visited`, with name search and separate Subreddits/Users tabs. Search history and
  Saved are also distinct surfaces; do not combine or clear them as part of a History redesign.

Source anchors: `readpost/ReadPost.java`, `ReadPostDao.java`, `ReadPostModification.java/.kt`,
`ReadPostsUtils.java`, `settings/PostHistoryFragment.java`,
`adapters/PostRecyclerViewAdapter.java`, `viewmodels/ViewPostDetailFragmentViewModelNew.kt`,
`post/HistoryPostPagingSource.java`, `account/AccountStoredData.kt` and
`recentlyvisited/RecentlyVisitedDao.kt`. These are code findings, not device verification.

## Recently visited study 16 (2026-10-24)

**Selected: two visible Subreddits / Users tabs.** Revision 23 replaces the initial compact
selector proposal following the user's explicit choice. Keep Recently visited separate from
post History, search history, Saved and Subscriptions. The shared drawer, account caption,
bottom navigation and global Search remain present; the bar hides on downward reading and
returns on upward reading, with existing focus/accessibility exceptions.

Current proposal: compact rows show name, icon placeholder and a last-visited label, ordered
newest first. An inline name filter applies across both tabs. Subreddit rows show Subscribe;
user rows show Follow and a separate Save user bookmark. **The user selected keeping Subscribe,
Follow and Save user visible.** Actions stay beside the name at normal text sizes and wrap below
it at large text. Inline filter placement, time labels and final density remain proposals,
not blanket approval from the tab/action choices. More currently previews Recently
visited settings. There is no invented per-row delete or separate clear action.

Source-backed contracts to preserve:

- `RecordRecentlyVisited` records only after subreddit/user data has loaded, when the account's
  separate Recently visited setting is enabled (default off). It excludes existing subscribed
  subreddits and followed/saved users at record time; own profiles and pseudo-subreddits such
  as All/Popular are also excluded. Preserve the special `u_` profile-feed checks.
- The Room key is account + name + type. Replace updates `last_visited` on eligible revisits;
  the DAO orders newest first and trims to 50 per account/type. This differs from post History's
  automatic already-read guard. These stores must not be merged.
- Subscribing/following/saving from an existing visited row keeps that row. Live subscription
  tables supply its current action state. Guest uses existing local subscription/follow/save
  helpers and content restrictions; signed-in actions retain their existing API/failure paths.
- Name matching uses the existing account/type-scoped, case-insensitive database query. The
  native query carries across tabs; closing its search clears it. The proposed always-visible
  inline filter changes presentation, not the native matching or account boundary.
- Turning the account's recording setting off also purges its Recently visited rows. No browser
  specimen changes that setting or deletes native data. Preserve backup and account-cascade
  behavior. The native activity closes on account switching; its dedicated resume contract
  stores the selected tab, rather than claiming the prototype's in-memory offsets are native
  process restoration.

Source anchors: `recentlyvisited/RecordRecentlyVisited.kt`, `RecentlyVisited.kt`,
`RecentlyVisitedDao.kt`, `activities/RecentlyVisitedActivity.java`,
`fragments/RecentlyVisitedListingFragment.java`, `adapters/RecentlyVisitedRecyclerViewAdapter.java`
and `settings/RecentlyVisitedPreferenceFragment.java`. These are source findings, not device
verification. HTML fixtures cover ready/off/loading/empty/load-failure/action-failure states,
account isolation and labelled destination/settings previews. No native recording or Reddit
action is implemented by these synthetic arrays.

## Retained feed layouts study 17 (2026-10-25)

**Selected direction: four layout families, with customizable elements and positions within
families.** Keep Card 1 and Card 2 as Large card compositions. Use the accepted refined A
compact feed as Compact card; reject Compact 2. Card 3 is not a separate proposed layout.
Vertical swipe and Gallery complete the set. This is a presentation decision, not a native
preference migration or permission to discard stored layout choices. **Large card default:
Card 1, text above preview**, selected on 2026-10-26. Card 2 remains selectable/customizable;
**Filled is the selected Large and Compact card surface default** (2026-10-26); Settings must retain
Filled / Outlined / Flat choices. Other defaults remain open; native preferences are unchanged.
Large card's toolbar defaults below content, with Above retained as a setting; direct actions
are capped to the actual width with More reserved (details under Named custom layouts).
**Large card preview framing defaults to Fit whole media** (2026-10-26). Preserve the whole
image or available video frame within the preview area; Square crop remains configurable.
This selects the fixture's existing Fit default, not a change to autoplay, media access,
content gating or the accepted fullscreen viewer. Gallery also uses Fit whole media, scaled
to its columns, as clarified below.

| Selected family | Working direction |
| --- | --- |
| Large card | Card 1 + Filled is the default; Card 2, Outlined and Flat remain selectable; adjustable elements, order and surface |
| Compact card | Accepted refined A base + Filled, with hidden customizable actions; adjustable elements, thumbnail placement and surface |
| Vertical swipe | Accepted visual-media viewer and its autoplay/control policy; media-specific controls remain a separate review |
| Gallery | At least two columns, including phones; Fit whole media scaled to tile width; swipe-viewer entry requested, content/direction under clarification |

[Family/settings preview](prototypes/relaxe-exploration/layouts-overview.html?rev=40) replaces
the five-source comparison. Choose a family in Layout settings; its changes stay independent
of the other previews. The first settings proposal covers filled/outlined/flat surfaces,
metadata/title order, author/flair/age visibility, compact thumbnail left/right/hidden, large
preview framing/actions/text excerpts and Gallery framing/columns/media-only content.
Specific controls, ranges, other defaults, final names and settings organization remain proposals.
This browser workbench is not an approved native Settings screen. Vertical swipe reuses the
accepted viewer rather than introducing card controls there. Compact retains its existing
long-press customization flow and accessible alternatives.

Surface reference: [comparison](prototypes/relaxe-exploration/surfaces.html?rev=36)
shows Filled, Outlined and Flat rows beside one another, using identical Card 1 content.
A family selector switches all three to the accepted Compact renderer. Filled uses a tonal
surface without a visible outline; Outlined uses the canvas color with an outline; Flat rows
use the canvas with square outer edges and a divider. The comparison leaves visibility,
ordering and actions fixed. Filled is selected for both Large and Compact cards. Revision 36
applies the Compact default in the family editor, family Reset and standalone study's
Composition default. Outlined and Flat remain selectable. Existing per-family customization
remains available. This focused board is review scaffolding, not native Settings organization.

### Named custom layouts (selected direction, 2026-10-26)

Settings must offer **Save as layout** so users can keep named custom configurations based
on the four families. The user explicitly included card size, icon visibility/position,
feed gaps and the positions of title, preview and toolbar. Custom layouts are presentation
presets built from these families, rather than additional renderer families. They must be
reusable and persist natively. Saved copies appear below the four families on Feed layouts
(selected in study 32 revision 83). Revision 147 selects shared device-library definitions with
independent account/context applied snapshots and management below; native mapping still needs
implementation. Preserve existing account ownership and contextual overrides.

Revision 33’s first working proposal adds named copies to the family workbench. It captures
current controls plus card padding, feed gap, large-preview height limit and compact thumbnail
size. Sizes remain content-driven so large text can grow. Save requires a name; duplicate
names in a family are rejected. Applying a copy restores its presentation controls. Further
edits make a draft; Reset restores family defaults without deleting copies. **Selected saving
behavior (2026-10-26): always save a new named copy.** Existing saved configurations stay
unchanged; no in-place Save changes action is offered. Renaming, deleting and picker placement
remain separate management reviews.
Names use text nodes, and dialog keyboard focus wraps and returns to its origin/picker.

The browser library is in memory and clears on reload, as labelled. It excludes accounts,
search, global theme and media/access policy; it establishes no native persistence or account
boundary. Revision 34 extends the proposal with individual action visibility/order and
above/below-content toolbar placement for Large and Compact cards. Checkboxes and Up/Down
controls provide keyboard alternatives to dragging. More stays available and fixed last;
hidden actions remain reachable there. Existing defaults are preserved (Large's five direct
actions below content; Compact's four hidden actions). Compact's existing long-press menu
and Always show setting synchronize with this editor. These controls are included in new
named copies; editor organization and other defaults remain review proposals.

**Selected toolbar rules (2026-10-26): Large card defaults to below post content; Above
remains a setting. Cap direct actions to the number that comfortably fits the actual toolbar
width.** Keep one row, readable counts and full touch targets; do not squeeze buttons, wrap
them into another row or allow horizontal overflow. Reserve space for More. The revision 35
proposal treats selected icons as a priority order: lower-priority actions beyond capacity
stay reachable in More, and widening restores them without editing the saved order. Capacity
uses each card's width (including multi-column cards), action/count widths and text size;
there is no universal fixed icon count. Compact uses the same cap when its toolbar is revealed.
The browser's 48px target floor and 4px gaps demonstrate the rule, not final Android geometry.
If resizing removes a focused action, focus moves to More. Overflow actions retain their
vote/save and other action behavior; fitting does not change read state or saved configurations.

### Responsive columns and tablet review (selected constraint, 2026-10-26)

Narrow **card feeds** must show one column. **Gallery is an explicit exception:** the user
clarified that it must retain at least two columns, including narrow phones and large text,
with whole-media previews scaled to tile width. This supersedes revision 34's Gallery
single-column fallback. Wider Gallery column counts and tablet shell composition remain open.
For card feeds, multiple columns are appropriate only when available width supports readable items, such as a sufficiently wide
landscape phone or tablet window. Orientation or device type alone must not enable them:
split-screen, text size and future side panes can reduce usable space. Keep the preferred
wide-window count when temporarily showing one column; restore it when space permits.

Revision 34 introduced effective versus preferred columns and a disabled card-column picker
when only one fits. Revision 38 keeps Gallery at two columns and disables its one-column
choice; it demonstrates staggered tiles and natural-ratio Fit previews rather than shrinking
text/touch targets. Preview sizes include 720 × 480, 840 × 960 and 1280 × 960. The card CSS-width
cutoffs/minimum card widths and text multiplier are provisional browser heuristics, not
approved Android dp breakpoints or proof of native scaling. Existing portrait/landscape/
unfolded column preferences require an explicit mapping before native changes.

**Tablet presentation needs a dedicated adaptive review before native implementation.**
Review navigation rail/sidebar versus bottom navigation, bounded reading widths, feed/detail
panes, media and dialogs, window height/IME, split-screen/folds, selection/Back and restoration.
No tablet shell or pane arrangement is approved; the wide feed fixture does not establish one.
Use Android's [window-size guidance](https://developer.android.com/develop/ui/views/layout/use-window-size-classes)
and [canonical layouts](https://developer.android.com/develop/ui/views/layout/canonical-layouts)
as implementation references: decisions follow the current app window and preserve state
through resizing, rather than assuming a physical tablet is always wide.

### Gallery entry and swipe viewer (selected behavior, HTML proposal, 2026-10-26)

The user requests Gallery → tap a post → a viewer that can move between posts by swiping.
**Selected: media-first with a Comments action; horizontal post swiping by default, with
Vertical selectable in Settings.** Revision 39 proposes this behavior in HTML by reusing the
accepted media viewer; it is not a fifth feed family or a completed native horizontal layout.
**Selected boundary: Horizontal is limited to Gallery entry for now.** The standalone feed
remains Vertical swipe; no general Swipe-axis setting or additional feed family is selected.
**Selected grid default: visual-media posts only, with All posts still available.** This is
independent of the viewer's visual-only stream. Revision 40 applies this default in the family
editor, standalone Gallery and Reset, and hides Gallery's axis control in other workbenches.
Do not silently add it as a fifth feed family, treat two gesture axes as interchangeable, or
confuse next-post navigation with images within one Reddit gallery post. **Selected sequence:**
swipes follow the chosen axis through the current post's images, then advance to the next
visual post. The proposal retraces this sequence backward, entering the previous album at
its last image. Explicit image controls remain available; labelled Previous/Next post controls
can jump between posts. Zoom locks paging, following the accepted viewer's existing policy.
**Selected scope:** browse visual-media posts only, in the current filtered feed's order;
text/link tiles open post details instead. **Selected return:** closing the viewer keeps the
current post visible in the grid. The prototype scrolls to and focuses its media tile.
Gallery's viewer direction is configurable, and its named browser configurations capture it;
native setting scope/migration still needs explicit design. System Back/edge/zoom gesture
arbitration and restoration through recreation require native review. Existing accounts,
read/history guards, vote/save effects,
gates, playback policy and media-page restoration remain requirements.

Continuum source reference: `PostFragmentBase.getNColumns` and
`number_of_columns_in_post_feed_preferences.xml` default Gallery to two in portrait and
landscape. `PostFragment` uses `StaggeredGridLayoutManager`; `item_post_gallery.xml`,
`AspectRatioGifImageView` and `PostRecyclerViewAdapter` bind aspect-ratio/center-inside previews
unless fixed-height settings apply. The Gallery holder's tap/long-press behavior uses
`click_to_show_media_in_gallery_layout` (default true): media tap/detail long-press, swapped
when disabled; text posts open details. It calls guarded read marking on entry. Preserve
`media_only_posts_in_gallery_layout` (also default true) and explicitly map the existing
tap/long-press preference rather than silently resetting users' choices. Preserve
the native preference and access contracts; inspecting this code is not device verification
or evidence of native correctness for the requested cross-post horizontal viewer.

Revision 28's source inventory compared `PostRecyclerViewAdapter.onCreateViewHolder` and
`item_post_with_preview`, `item_post_card_2_*`, `item_post_card_3_*`, `item_post_compact_2*`
and `item_post_gallery*`. The current sketches retain the shared foundation; they are not
native pixel replicas. Gallery albums use cover entries opening the existing viewer; inline
album paging and feed autoplay are not simulated. Explicit More buttons remain browser access.

The customization philosophy applies across families, not just Compact card. Reuse existing
Continuum preferences for context/default layouts, fixed-height previews, visibility,
thumbnail size/side, compact toolbar, columns, Gallery policy and fonts. New controls may be
needed, but no parallel theme/account store is approved. Before native implementation, define
an explicit mapping for existing layout IDs and account/context overrides, including legacy
Card 3 and Compact 2 choices; do not silently discard saved preferences or restoration state.
API access, read/save/vote effects and media policy remain unchanged contracts.

Historical primary references, researched without installing either app:

- Sync's developer releases describe its view families and expanded Slides options
  ([v22.3.3](https://www.reddit.com/r/redditsync/comments/t5yrba/)), configurable image/title
  order ([v22.3.6](https://www.reddit.com/r/redditsync/comments/t8acw7/)), separate post/comment
  customization ([v20 beta 27](https://www.reddit.com/r/redditsync/comments/kxlrbe/)) and
  full-height album previews ([v22.4.20](https://www.reddit.com/r/redditsync/comments/u72362/)).
- Boost's [official overview](https://boostforreddit.com/) describes multiple view families
  and per-subreddit choices. Its [2017 developer notes](https://boostforreddit.com/blog/)
  document preview placement, [1.6.0](https://boostforreddit.com/blog/2017/11/24/boost-for-reddit-1-6-0/)
  text-preview lines, [1.10.0](https://www.reddit.com/r/BoostForReddit/comments/ec4rt6/)
  icons/link thumbnails/thumbnail side, and
  [1.3.1](https://boostforreddit.com/blog/2017/03/17/boost-for-reddit-1-3-1-auto-night-mode-mute-videos-autoplay-in-swipe-view-and-more/)
  management of saved views per subreddit.

These references are version-specific; they do not establish current installed behavior or
arbitrary action reordering. Some old linked image demos were unavailable. The user has now
selected the four-family/customization direction above, superseding the earlier proposal to
retain every source layout as a separate option. Large card's below-content toolbar default
and width-limited action count are selected. Filled is selected for Compact card as well.
Gallery's two-column minimum and Fit framing are selected. Its requested viewer is media-first
with Comments, horizontal by default and optionally vertical, with the sequence/scope/return
rules above. Horizontal stays limited to Gallery entry, and the grid defaults to visual media
with All posts available. These directions are sufficient to proceed to create/act; exact
settings organization, minor layout defaults and interaction/density can return in the
consistency pass. Tablet adaptation and native migration remain separate reviews.
Next review: Create post entry and composer, then reply/edit/action flows and
settings/accounts/onboarding. Native migration remains separately authorized work.
Browser verification and remaining limitations are recorded in ROADMAP.md.

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

### Create/act review: unified composer selected (2026-10-26)

Begin with Create post. Source inventory: `PostTypeBottomSheetFragment` offers Text, Link,
Image, Gallery, Video and Poll, routing to separate activities. `PostTextActivity` and
`activity_post_text.xml` provide account/subreddit selection, rules, flair requirements,
NSFW/spoiler, reply notifications, title/body, Markdown formatting/preview and image insertion.
Submission requires a selected subreddit, nonempty title and a loaded signed-in account;
account changes re-fetch flair requirements. Preserve existing submission/upload services,
error handling, dirty-exit/posting-exit prompts and restored input/context. Do not infer a
persistent post-draft library from Activity state restoration or the separate comment drafts.

The user selected **one composer with a compact post-type selector**, retaining all six types
and their capabilities. [Study 18 revision 50](prototypes/relaxe-exploration/compose.html?rev=50&type=text)
implements HTML proposals for all six types. The user selected **Preview beside Post in
the top bar**; Close stays at the start. At 200% text, Preview and Post remain together on a
second header row so labels and touch targets fit. Account,
subreddit/Rules and type/flair remain explicit. The user selected **visible Spoiler, NSFW
and reply-notification controls below the body**; revision 42 replaces the folded Post options
row with a labelled, non-collapsible group. Other detailed composer placement remains proposed.

The fixture supports title/body entry, selection formatting, a safe limited Markdown preview,
required-field feedback, account/guest/flair states, simulated submission success/failure and
dirty/posting-exit prompts. Text survives preview, type changes, Search overlays and failed
attempts in page memory only; reload clears it. Native Activity restoration remains required;
this does not approve or implement persistent post drafts. Flair lookup is a best-effort hint:
loading/failure alone does not block posting; a known unmet flair requirement does.

Link source inventory: `PostLinkActivity`/`activity_post_link.xml` provide URL, title,
optional formatted body and an explicit Suggest title action alongside the shared context
and options. Submission requires a nonempty URL, title, selected subreddit and loaded
signed-in account; it retains the entered URL in the existing job/service extras. Preserve
incoming link/title prefill and URL/body dirty-exit/restoration. Title lookup is separate:
it trims/prepends HTTPS when needed for lookup, uses `TitleSuggestionUtils` for supported
YouTube oEmbed versus bounded HTML-title reads, cancels replaced requests and handles failure.
This is source evidence, not proof of a redesigned native route.

The user selected **Title first** for Link posts. Revision 45 orders Title → URL → Suggest
title → optional Body, superseding revision 44's URL-first proposal. It preserves the selected
header/options. Suggestion success replaces the title
only after pressing the action; failure retains it. Both results are synthetic, with no URL
fetch. Pending fixture suggestions cancel on title/URL edit, type change, posting or leaving;
this scaffolding does not establish native callback correctness. Preview shows an inert URL
destination and the optional formatted body. Local URL validation checks presence only;
native/server validation remains authoritative. Text and Link bodies stay separate in page
memory while sharing title/context; discard clears both bodies and the URL. Type-switch
retention is a proposal and adds no persistent draft model. Link's native image-upload callback
is empty; the fixture's Link formatting does not invent an image insertion action.

Image source inventory: `PostImageActivity`/`activity_post_image.xml` provide title, optional
formatted body, an image-library choice (`image/*`), camera capture and selected-image preview/
Select again. A selected URI is required alongside the existing title/subreddit/account/flair
checks. Preserve shared-image intent data, URI/input/context restoration, camera permission
and unavailable/cancel/error handling, temporary-capture cleanup and service result feedback.
GIF detection uses MIME then the URI extension and routes through the existing video/GIF
submission path. `SubmitPostService` owns upload/submission; no new crop/compression UI or
upload-size promise follows from this inventory. The Image body toolbar's image-upload
callback is empty, so this form must not invent inline image uploads.

The user selected **Image before optional Body** in revision 46: Title → Image → optional
Body, retaining the selected header and visible options. Choose image and Take photo open bundled-sample chooser/camera fixtures,
with no device-file, camera or upload access. The selected image fits its preview without
cropping; GIFs use a labelled static first frame. Replace and Remove remain visible. Proposed
replacement keeps the previous attachment until a new choice is confirmed; Cancel/failure
keeps it, while Remove clears only the selection. This differs from native Select again's
immediate clear and remains a proposal. Optional Image body text is retained separately from
Text/Link in page memory; type changes keep the image and discard clears every form's input.
The camera/selection/preview errors and Retry are synthetic. Preview failure alone keeps the
selection and does not add a posting block. Real URI grants, decoding, camera lifecycle,
upload/GIF processing, notifications and restoration still require native verification.
Inline Text attachments remain a separate pending review; this specimen only covers the
single Image-post form.

Gallery source inventory: `PostGalleryActivity`, `RedditGallerySubmissionRecyclerViewAdapter`,
`PostGalleryViewModel` and the caption/URL bottom sheet provide a selection-order image grid,
camera/library add, optional per-image caption (180 characters) and outbound URL, removal and
an optional formatted post body. The adapter caps the list at 20 and hides the add tile there;
the current submit check requires at least one image and a payload for every entry. Selection
starts each upload before final posting; Add is guarded while uploading, caption editing waits
for a payload, and pending removal is normally unavailable except when its thumbnail fails.
Upload failure removes the corresponding entry. Stable IDs distinguish duplicate pictures and
shifted positions. The ViewModel retains upload work/outcomes across configuration changes,
with idempotent application rather than repeated uploads. Preserve the existing URI/camera
cleanup, account/flair/options, restoration, media-ID payload and submission-service contracts.

Revision 47 proposes Title → two-column image grid → optional Body. Each image has an Edit
action for a labelled caption/outbound-URL dialog plus an accessible Remove action. Caption
save/cancel and the 180-character limit are demonstrated; previews show captions, inert URL
destinations and the formatted post body. The grid keeps selection order; no reordering UI is
introduced by this specimen. Whole-image thumbnail framing, editor placement and action
presentation remain proposals. The two-column composer fixture does not approve tablet UI.
Camera/library reuse bundled samples; bench controls simulate ready, pending/completion and
failed uploads without transferring files. The existing cap, pending guards, failure removal
and duplicate-image identities are retained in those fixtures. Type changes/Search/failed
posting retain Gallery input in page memory; discard clears it. Native upload ownership,
URI grants, real account changes, callbacks, recreation and process restoration remain separate
verification. No new cross-account attachment store or persistent draft model is established.

After the user's request to continue, Gallery caption/link fields remain behind Edit as a
provisional choice; the unanswered placement question is not blanket approval of those details.

Video source inventory: `PostVideoActivity`/`activity_post_video.xml` support a selected/shared
or camera-recorded video URI, title, optional formatted body and the shared context/options.
The source starts playback after selection, reads the existing loop preference, uses
`DurationAwareSeekPlayer` and the existing 10-second seek constants, pauses on stop and releases
the player on destruction. Preserve URI/context restoration, camera permission/cancel/error
handling and selected-account/flair checks. The service retains file-access/cache, thumbnail,
upload/processing and final-submission feedback. Do not invent a trim/compression/size-limit
UI or a second upload path from this inventory. The body toolbar's image-upload callback is
empty. Activity URI restoration does not establish preserved seek position or playback state.

Revision 48 proposes Title → Video → optional Body, with Choose/Record, visible Replace/Remove,
Play/Pause, 10-second seeks, mute and a labelled keyboard-accessible position slider. Controls
stay visible while editing, as selected by the user. This editing rule is separate from the
accepted feed/media viewer's tap-to-reveal and roughly four-second hiding policy.
The bundled sample attempts muted playback after selection; native mute, autoplay eligibility,
loop, focus and lifecycle preferences remain authoritative. Replacement/capture are staged
sample choices; cancellation keeps the current clip/position. Dialogs, Search, type changes,
posting and page exit pause playback. Post Preview starts a separate paused player at the
editor position and stops it on close; returning to the editor requires Play. These fixture
choices do not approve a native resume-policy change. Preview failure keeps the selection and
does not add a posting block. File-access and processing failures are separately simulated and
retain input. Each form's body and the clip/position remain page-local; discard clears them.

The original served sample exposed a zero-length seekable range in this browser. Revision
48.1 loads only the bundled `garden.mp4` into one page-local object URL, reused by the editor/
preview and revoked on non-cached page exit. This permits actual browser seeking; it is HTML
transport scaffolding, not a native media strategy or performance result. No entered URL,
device file, camera or upload endpoint is accessed by the fixture.

Poll source inventory: `PostPollActivity`/`activity_post_poll.xml` show six option fields,
collect nonempty strings in field order and require at least two options. Voting length is
an integer slider from 1–7 days, default 3. The optional formatted body supports image
insertion/capture via existing uploaded-image and rich-text paths. `PollPayload` and
`SubmitPostService` retain selected-account/destination, flair, post options, duration, ordered
options and submission/error handling. Native Preview currently previews the body; a combined
poll preview is a presentation proposal. No new option-length cap, deduplication or reorder
requirement is established by this inspection; retain server validation and feedback.

Revision 49 proposes Title → optional Body → Poll options → Voting length → shared post
options. Start with two labelled fields, Add option up to six, and show Remove when more than
two rows exist. Removing a row preserves the remaining values/order, renumbers their labels
and focuses a surviving field; Add focuses the new field. Empty strings are omitted from
the ordered preview, matching native collection. Voting length uses a compact 1–7 day
selector with the existing three-day default. These presentation details remain proposed.
Preview includes formatted body, nonempty options and duration without voting controls.
Submission is simulated; failure/type changes/Search preserve body/options/duration in page
memory. Posting locks option editing, and discard resets to two empty rows/three days. Poll
option edits and duration changes trigger the fixture's dirty-exit guard. Revision 49 left
inline insertion as a placeholder; revision 50 below replaces it for Text and Poll.

Inline-image source inventory: `UploadedImagesBottomSheetFragment` exposes library/camera
selection and a reusable filename/media-key list. `Utils.uploadImageToReddit` uploads,
records an `UploadedImage` and inserts a block at the current body selection on completion,
with leading/trailing newlines. Camera scratch files are cleaned up on success/failure;
picked files are not deleted. Text/Poll save the uploaded-image list in Activity state and
reuse the existing submission/rich-text paths. `UploadedImageBlockParser` matches known media
keys and reads captions as plain text; `RichTextJSONConverter` emits the image ID/caption.
The upstream notice warns about formatting loss during conversion, preview limitations,
inability to edit submitted embedded-image posts and changing accounts inside the composer.
Preserve those constraints and verify native account/upload/lifecycle ownership separately.

The user selected a visible **Images** button beside body formatting for Text/Poll, as shown
in revision 50. This entry placement is accepted at HTML design level.
Its manager offers Choose image, Take photo and reusable thumbnails; inserting replaces
the selected body range with a Markdown image block. Deleting that block removes the image
from the post while leaving it available for reuse in this composition. No server-delete,
cross-post image library, persistent drafts or rich-text editor is introduced. Captions stay
plain text between brackets. Only known bundled sample IDs render as images in Preview;
unknown IDs and entered image URLs do not trigger image fetching. GIF is a static first frame.

Sample pending/failure/picker/camera outcomes retain writing. A delayed result inserts only
if the original type/account/body still match; otherwise the ready image waits in that type's
image list for explicit insertion. Discard cancels pending work and clears both lists. The
fixture holds Post while a sample upload is pending and fixes the account once images exist;
these are proposed guards reflecting the upstream warning, not verified native behavior or
approval of new account-switch/restoration rules. Revision 50.1 refreshes the manager when
completion occurs while it is open, and keeps insertion feedback current. Manager composition
and these guards remain proposals; the entry-placement choice does not approve those details.

Actual uploads, user-profile posting, allowed-type/rule fetching, type-change
safeguards and full native Markdown rendering remain later review work. Synthetic rules and
accounts establish no API, server-validation or account-switch correctness. Reuse existing
account/API/access/submission/upload/restoration contracts when implementing natively.

The user's request to continue after revision 49 leaves the two-field/Add option presentation
provisional; it is not an explicit selection over six visible fields. Reply study 19 follows
below. Keep Poll fields, Gallery caption placement and attachment-action details for
consistency review; reply/edit/action flows remain.
Browser interaction/large-text/theme evidence is recorded in ROADMAP.md; Android keyboard,
TalkBack, lifecycle/restoration and performance remain unverified.

## Reply composer study 19 (2026-10-26)

Source inventory: `CommentActivity`/`activity_comment.xml` provide a dedicated writing screen
with parent title/body Markdown where supplied, account selection, body formatting, Preview,
Send, uploaded images/camera and Giphy. Main-post replies and comment replies pass distinct
parent fullnames/depth; comment replies also return the adapter position. Caller guards cover
Guest, archived/locked posts and locked comments. Existing parent text-selection/copy, links,
spoilers, comment faces and media/data policy remain native requirements. Author labels in
the proposal need mapping from caller data; they are not established existing Intent extras.

`CommentActivityViewModel` owns sending/result delivery across configuration changes and
prevents duplicate sends. The selected account feeds the existing authenticator/`SendComment`
path. Successful submission returns comment/parent data and deletes the reply draft; failure
keeps input. Back while sending warns that leaving may not stop submission. Nonempty Back
offers save/leave/cancel; leaving without saving does not delete an older draft, while empty
Back deletes it. Global account switching finishes the native Activity.

Draft limitation: the current `CommentDraft` key is parent fullname + REPLY/EDIT, without an
account key. It stores text/time but no uploaded-image/GIF metadata. Activity state retains
attachments separately across recreation. Do not claim account-isolated drafts, cross-exit
attachment recovery or process-restoration correctness. Resolve those boundaries explicitly
before native implementation; this HTML work introduces no migration or new persistence.

**User-required future Reply drafts:** restore text, images and GIF selections together for
the same account and parent post/comment. Preserve the REPLY/EDIT distinction. This supersedes
keeping native text-only storage with a warning. The native schema and metadata lifecycle
still require separately authorized implementation; existing source does not satisfy this
requirement. The user also selected complete recovery for comment EDIT drafts, separately
from Reply drafts; study 20 records that requirement.

[Study 19](prototypes/relaxe-exploration/reply.html?rev=56) proposes a dedicated
Reply/Comment screen, a compact two-line parent preview with **Expand / Collapse**, account
selection, writing area and formatting/Images, plus Preview/Send together in the header.
Parent context scrolls with the form. The workbench compares **Full on entry**, main-post,
comment and long-comment targets. It preserves target identity through expansion/preview and
guards target changes with the exit choices. This is a proposal; study 04's inline editor was
shown as the earlier fixture and remains unchanged, not a separate approved editor strategy.

The HTML demonstrates safe limited Markdown, validation, pending/failure/success feedback,
Save draft/Leave without saving/Cancel, older-draft retention, empty-close deletion and
success cleanup. Revision 56 stores snapshots of text, reusable sample-image metadata and the selected sample
GIF, keyed by account + parent + REPLY in page memory; reload clears them. Search returns
to the same reply. Revision 51.1 shows Guest explicitly and dismisses stale sending-exit
prompts on completion. Closed-screen failure recovery is fixture behavior, not proof of
native result delivery after leaving. Native keyboard-on-entry is present in source; the
browser does not settle Android IME/insets/focus policy.

**User-selected Reply toolbar:** keep **GIF beside Images**, with Italic available in More.
This retains the one-row normal-text toolbar; larger text can wrap. The GIF sample flow and
other formatting placements remain proposals apart from that selection.

Revision 54 adds the Reply Images manager proposal: Choose image, Take photo and reusable
thumbnail/filename rows that insert an image again. It follows the existing Text/Poll manager
direction, using bundled samples only. Selecting a sample inserts its image block at the
current selection; Preview resolves known samples with their caption/description. Removing
the block leaves the sample available for reuse. Picker/camera/upload/processing failure
fixtures retain text. Selection is immediate: real upload progress, timing, cancellation,
permissions and URI ownership are not simulated or verified here.

The native `UploadedImagesBottomSheetFragment` and `UploadedImagesRecyclerViewAdapter` already
provide Choose/Take and reusable filename/key rows. **User-selected presentation: thumbnail
and filename rows** for the reusable image list.
`Utils.uploadImageToReddit` uploads immediately and inserts at the selection present when the
callback completes, rather than a captured earlier selection. Preserve the existing upload/
access path and camera scratch cleanup (never delete a user-picked file). No native behavior
changes are made. Native rich Markdown/parent selection and real provider flow remain later.

The fixture fixes the account while image descriptors exist and refuses to send unknown
sample tokens without descriptors. These guards remain proposals. Revision 56 restores its
bundled sample metadata with the saved writing, including the reusable list. Where account
selection is available, the proposal guards the old account’s writing before loading the
new account’s draft. This demonstrates the selected isolation without establishing native
account/draft recovery or choosing the final account-switch interaction.

**User-selected terminology:** use **Expand / Collapse** to reveal/hide the parent post or
comment. Do not call this “Show context,” which implies the surrounding Reddit thread. The
compact-versus-full parent display default remains provisional; the user corrected labels
and requested an alternate reply style rather than selecting that default.

**User-required option:** Settings must offer a separate Reply screen and an inline editor
directly below the comment being replied to. Revision 52 adds a thread sketch with Reply on
the main post and two comments. Clicking Reply inserts the shared editor below that target;
surrounding comments remain. In this proposal one editor is open at a time, target changes
offer the existing draft choices, and presentation changes keep the same writing/target.
Close/save collapses the inline editor and returns focus to its Reply button. Success clears
the saved draft and collapses the editor; this sketch reports a synthetic result rather than
implementing native comment insertion. Preview/Send/Close move into the inline editor, whose
writing area starts shorter. These detailed placements and one-editor behavior remain proposals.

The workbench's Reply style selector previews the future Settings choice; it is not native
preference storage. **User-selected default: Inline below comment**, with Separate screen
retained as an option. Preference scope/migration remains open. The native
source still uses `CommentActivity`; a suitable existing inline-style preference was not found
in the inspected comments/post-details settings. Reuse existing account-scoped preference and
reply/send/restoration mechanisms when implementing, with explicit stable target/editor state
through RecyclerView recycling. No Android correctness/performance is established here.

Revision 52.1 repairs focus after a draft-guarded target move and a narrow large-text header;
52.2 uses a shorter initial inline writing area without changing text. Revision 53 starts
inline without a URL override; `style=screen` still opens the separate comparison.

GIF source detail: `CommentActivity.onGifSelected` retains one `GiphyGif` descriptor and inserts
`![gif](giphy|ID|downsized)` at the current selection. `GiphyGifBlockParser` requires matching
metadata. Do not infer support for several independently selected GIFs from the toolbar. The
fixture likewise keeps one sample descriptor, now included in its page-memory draft snapshot.
Provider eligibility/media policy and native restoration remain implementation work.

Revision 56 supersedes revision 55’s text-only closing warning with **Save draft** and a summary
that writing and image/GIF selections will return together. Cancel retains the active editor;
Leave without saving keeps the older complete snapshot; empty close deletes only the current
account/parent Reply draft. Successful submission likewise clears only that draft.
`scenario=attachment-exit` opens a synthetic image+GIF closing example. No persistent browser
storage, actual file/URI recovery, upload/provider request or native migration is implemented.

**User-selected editing behavior:** Edit comment follows the same Reply style setting: Inline
by default, with Separate screen available. Study 20 below begins the edit presentation review.
Exact native spacing, feedback and gestures remain refinement work. ROADMAP.md records checks.

## Edit comment study 20 (2026-10-26)

[Study 20](prototypes/relaxe-exploration/edit-comment.html?rev=58) reuses the Reply writing,
formatting, image/GIF and shell code with a distinct Edit mode. **Selected:** follow the Reply
style setting. The first proposal opens below your comment, fixes the author, loads existing
content, and places Preview / Save changes together. **User-selected inline presentation: keep
the original comment visible above the editor**, with metadata and surrounding comments retained.
Revision 58 removes the comparison control and retires the replace-body option; this adds no
Settings preference. The original-image fixture (`media=1`)
loads known bundled metadata into both displayed comment and editor Preview.

Source: `CommentsRecyclerViewAdapterNew` supplies `EXTRA_EDIT_AND_DELETE_AVAILABLE` for the
account’s own comment when the post exists and is neither archived nor locked. Its separate
Reply guard also checks comment lock; the inspected Edit menu guard does not. `CommentMoreBottomSheetFragment` passes fullname, Markdown, media metadata and adapter position to the
native `EditCommentActivity`. Other entry routes still need review; this is not proof of all
native eligibility. Preserve Guest/account ownership and existing API/access mechanisms.

`EditCommentActivity` maps original media URLs back to metadata keys, retains image/Giphy
helpers and Preview, and submits plain Markdown or existing rich-text conversion through its
ViewModel. Success returns parsed comment or modified-content fallback plus position and clears
only the EDIT draft; `ViewPostDetailFragmentViewModelNew` reconciles a parsed result using
fullname if the old position moved. Failure retains editing input. Empty or unchanged Back
clears the edit draft; changed Back offers save/leave/cancel. Those exits are demonstrated in
HTML. Native result/lifecycle, metadata conversion, IME and accessibility remain unverified.

Proposal details: disable Save changes while unchanged or saving; reject empty submission
without turning it into Delete; keep writing on failure; on success update the existing
synthetic comment, mark it edited and close the editor. Closing/Cancel restores the displayed
body without publishing changes. **User-required Edit comment drafts:** restore text, images
and GIF selections together for the same account/comment, separately from Reply drafts. The
HTML already demonstrates complete snapshots. Current native EDIT storage remains text-only
and lacks an account key; native persistence/migration and metadata recovery are unimplemented.

Revision 58’s `scenario=edit-draft` demonstrates the selected complete recovery with original
image metadata plus a new sample image/GIF. This is page-memory behavior only, not evidence of
native draft isolation or recovery. Continue to Edit post study 21, then private-message and
action flows. Exact Android rendering remains later refinement.

## Edit post study 21 (2026-10-26)

[Study 21](prototypes/relaxe-exploration/edit-post.html?rev=79) now follows the selected
**shared Reply/Edit comment style setting: Inline by default, Separate screen available**.
The post title, subreddit and author remain fixed; Preview / Save changes share the header
or inline action row. Inline keeps the original visible and updates that same post after
saving. Revision 79 defaults to the original post with an Edit action; `style=screen` previews
the other supported preference. The workbench control illustrates the shared setting, not
native preference storage or integration. The standalone placement comparison is retired.

Source: the inspected `ViewPostDetailFragmentNew` menu exposes Edit for the current author’s
`Post.TEXT_TYPE` post; dispatch rejects a non-null media-metadata map with the existing
cannot-edit-images message. Do not reuse comment archive/lock guards without checking each
post entry route. `EditPostActivity` receives fullname/title/body/subreddit, displays the title
as text and edits the body. Its two-argument `MarkdownBottomBarRecyclerViewAdapter` constructor
disables image and Giphy entries, despite retained upload callbacks. The prototype preserves
all eleven Markdown actions and does not expose image/GIF selection or post-type changes.
HTML Preview is a safe limited subset; full native Markdown rendering remains separate.

`EditPostActivityViewModel` owns duplicate-send/result state across configuration changes and
submits only body text through the existing authenticated `editPostOrComment` path. It checks
HTTP/API errors; success returns to the caller, while failure leaves writing available. The
HTML demonstrates pending/failure/retry, same-post update, unchanged Close without a prompt,
and changed Close with Keep editing / Discard changes. Unlike the comment editor’s exit
condition, an emptied changed post body still prompts on Close. Leaving while saving warns
that the update may continue. Closed-editor failure recovery is a browser illustration, not
proof of native delivery after leaving. Preserve caller refresh/results and account switching.

No saved Edit post draft is used by this inspected Activity/ViewModel flow, so the proposal
adds no Save draft action. The complete Reply and comment EDIT draft requirements do not
establish a post-edit draft mechanism. Native migration, eligibility across other callers,
real API/Markdown errors, IME/insets, accessibility, restoration and performance remain later.

Edit post presentation is selected. Sharing the style does not merge its eligibility, body-
only update, attachment restrictions or discard/no-draft contract with Reply/comment editing.
Exact Android geometry, keys/account-scoped preference mapping and native integration remain
implementation work. Continue to Settings overview study 32; detailed form/guard/feedback
proposals remain for consistency/native review rather than blanket approval.

## Private message study 22 (2026-10-26)

[Study 22](prototypes/relaxe-exploration/message.html?rev=64) proposes a dedicated New message
form with the shared styling and bottom navigation. Recipient → Subject → Message preserves
the native field order. The sending account is shown explicitly; recipient prefill, required
fields and the existing 100-character subject limit are retained. This is private messaging,
not Reddit Chat or a comment reply.

**Selected by the user’s support condition:** keep compact Bold / Italic / Link / More controls
below Message, since Reddit documents Markdown private-message bodies. Its
[compose API](https://www.reddit.com/dev/api/#POST_api_compose) specifies raw Markdown, and its
[SendPrivateMessageOptions](https://developers.reddit.com/docs/api/redditapi/models/type-aliases/SendPrivateMessageOptions)
also defines the body as Markdown. Formatting changes the text being composed, not a sent
message. The plain-entry comparison is retired. There are no Images/GIF entries.
**Preview beside Send is selected:** it lets users check formatting without submitting, then
returns to the same writing. The safe limited HTML preview never executes HTML or
fetches links and is not a replacement for the native Markdown renderer.

**Compatibility remains unverified:** Reddit’s
[current Chat help](https://support.reddithelp.com/hc/en-us/articles/39411701270036-How-to-use-Reddit-Chat)
describes direct messaging moving to Chat and old private messages as a read-only archive.
The API documentation establishes the text format, not live sending availability for the
existing Continuum route. Audit that capability and supported rendering before native work;
no Chat integration or successful live send is claimed by this HTML decision.

**Continuum comparison and selected product direction:** the checked-out baseline retains its
legacy PM implementation. Native Inbox separates Notifications from Messages; PM threads use
sent/received balloons with Markdown rendering and a bottom reply field. New message calls
`/api/compose`, while thread Reply calls `/api/comment` for the PM fullname. These controls
remain in source; there is no inspected Chat integration, migration, automatic read-only
fallback or dedicated Chat shortcut. The unread badge workaround excludes dependence on the
account-wide count that can stick on inaccessible Chat/archived items; see ARCHITECTURE.md.
This source inspection is not a live sending/reading test.

**User approved:** stay aligned with Continuum's messaging functionality while applying
Relaxe styling. Retain legacy PM reading, composing and replying through the existing API,
plus the selected Markdown toolbar. Follow relevant upstream compatibility fixes through
reviewed imports. Defer the external Chat shortcut. Do not build a Chat client, a custom
compatibility-detection/read-only system, or new messaging transport for this redesign.
This supersedes the earlier external-shortcut recommendation and read-only PM alternatives;
neither was selected. Live availability/rendering still needs verification during native
work; this does not imply new automatic runtime gating. Preserve existing account, API/access,
read/count and error handling mechanisms. The decision does not approve all remaining form
details or saved PM drafts. Preview and the unsent-message confirmation were selected
separately.

`SendPrivateMessageActivity` obtains the active account token, optionally prefills a recipient,
checks all three fields and calls `ComposeMessage`. That helper uses the existing authenticated
compose API and checks HTTP/API errors. Native failure keeps the form and re-enables Send;
success exits. The inspected Activity has no explicit saved-draft repository or custom discard
prompt; its save-state override only calls super. This does not establish process restoration
or account-switch correctness. Preserve the native access path and audit those contracts later.

**User-selected unsent-message confirmation:** changed Close or navigation shows
“Discard message?” with “Your unsent message will be discarded.” Keep writing returns to the
same recipient, subject and message without losing text; Discard message clears the unsent
writing and closes the composer. Dismissing the dialog is non-destructive. An unchanged form
with only the original recipient prefill closes directly. This adds an exit confirmation to
the presentation; it does not add saved PM drafts or change sending/account/API mechanisms.

The browser also illustrates required-field errors/focus, pending, failure/retry, completion
and Search returning to the same writing. Input locking while pending remains a proposal.
Leaving while sending warns delivery may continue; that warning and browser recovery after a
closed failure remain illustrative only. No saved private-message drafts are selected or implemented;
the selected Reply/comment EDIT draft requirements do not implicitly extend to this flow.

Next review: study 23 thread/reply presentation, retaining the selected PM writing direction
where composition is supported. Retain sent-versus-received, read/count, account and thread identity
contracts. Then continue action customization/reporting/moderation and media utilities before
settings/accounts/onboarding, tablet adaptation and consistency. No native changes are made.

## Legacy PM thread study 23 (2026-10-26)

[Study 23](prototypes/relaxe-exploration/message-thread.html?rev=65) uses **user-selected
received-left / sent-right bubbles**, following Continuum. Keep author/You labels and the
same root/reply content and buffer. The stacked-row comparison is retired; it does not
establish a native preference, and the old `presentation=rows` parameter no longer changes
the fixture. Exact native density, geometry and keyboard behavior remain later refinement.

The source baseline is `ViewPrivateMessagesActivity` and
`PrivateMessagesDetailRecyclerViewAdapter`: passed-in root/replies, sent/received layouts,
Markwon rendering, latest-message initial positioning and a bottom reply field. Its
`ReplyMessage` API helper and read/count/result contracts remain unchanged targets; this is
not a Chat transport or a native implementation. The local controller demonstrates empty
validation/focus, Markdown/limited safe Preview, pending/failure/retry, successful append,
Guest blocking, discard guard and shared Search returning to the same reply buffer.

The thread's writing controls follow the selected PM direction: Markdown, Preview beside
Send and unsent-message confirmation, without attachment pickers or saved PM drafts. Their
bottom arrangement, visible timestamps, subject heading and density are proposals. Native
per-message timestamp/copy actions are not modeled; preserve them when implementing. The
fixture waits for an in-progress reply before leaving; that is not an approved native
pending-exit policy. Browser appends/readiness do not establish API delivery, unread updates,
account/process restoration or IME correctness. The independently scrolling composer at
large text/short height is a review fixture, not an approved tablet/keyboard solution.

Next review: post More actions in study 24. Remaining PM detail density, timestamps/copy and
pending-exit/IME behavior return during consistency/native review; no new PM transport or
saved-draft mechanism is added.

## Post More actions study 24 (2026-10-26; ordering selected 2026-10-27)

[Study 24](prototypes/relaxe-exploration/post-actions.html?rev=67) uses **user-selected grouped
sections**, with **reorderable sections and reorderable actions within each section**.
The flat comparison is retired; the old `organization=flat` parameter no longer changes it.
Default sample headings are Post, Navigate, Share and copy, Reading and Manage; they do not
collapse. Their names and the full action inventory remain consistency-review details.
This does not alter the accepted hidden Compact toolbar, width cap,
More availability or required action customization; those controls/settings mappings remain
separate reviews. The visible More post actions button is a study trigger, not a permanent
button on the collapsed shipping feed card.

Revision 66 adds an ordering-editor proposal at `surface=order`, or via the workbench's
Preview surface selector. Up/Down controls move a whole section or an action inside its
section. Moves update the menu preview; Done returns to More, while Reset order restores only
the current fixture account's defaults. Disabled boundary controls and spoken position
announcements accompany focus-preserving moves. The user requested reordering, not cross-section
action moves, renaming or new visibility/capability controls; those are not added.

Keep the full configured order even when availability hides a row. The editor retains all
sample actions with unavailable labels; More still applies account/post eligibility after
ordering. An unavailable action cannot be enabled by moving it. Section/action identity uses
stable IDs, not translated display text. Settings location, native drag/accessibility actions,
save/reset presentation, persistent storage and future-action reconciliation remain native
mapping/review work through existing preference mechanisms.

**Selected scope:** one More section/action order per active account, shared across every
feed layout, including saved custom layouts. Guest retains a separate order. Layout copies
do not copy or fork More ordering. The prototype uses Guest/signed-in page-memory buffers;
it does not establish native persistence, import/backup or account-switch restoration.

Source baseline: `PostOptionsBottomSheetFragment` / `fragment_post_options_bottom_sheet` use
labelled rows with conditional visibility. The inspected Guest branch hides Reply, Crosspost
and Report; locked/archived posts independently hide Reply, not those other two actions.
Report receives the subreddit and thing fullname. Native own-post notification and moderation
actions depend on ownership/handler; media, recovery and preferences govern other rows.
Guest hiding has a local path while authenticated hiding uses the existing API/results.
Preserve all these boundaries, caller identity/position, read/save/filter behavior, permissions
and rollback during later native replacement. This text-post sample is not a complete action
inventory. Save, subreddit/author and read rows also reflect the accepted Compact More design
and need existing helpers/caller mapping, rather than a parallel action backend.

Fixture toggles for Save, Hide and read state change page memory only, separately for Guest
and the signed-in account. Other buttons announce route previews; no API, clipboard, download,
share or report occurs. The contained sheet demonstrates dismissal/focus return, background
inertness, keyboard wrap, scrolling and readable labels. Native touch/drag/Back, accessibility
services, API/account effects and performance remain unverified. Final icon assets, complete
action inventory, Settings entry, real report/moderation and utility flows remain open.

The ordering scope is selected. Next review: study 25 Report presentation below; use numbered
choices in chat and wait before selecting a presentation.

## Report presentation study 25

[Study 25](prototypes/relaxe-exploration/report.html?rev=69) demonstrates the **selected
category pills → relevant details → explicit Submit → confirmation flow in a bottom sheet**.
The user selected the sheet for all stages. Revision 69 retires the screen comparison and its
workbench selector; old presentation query parameters are ignored. Exact labels, category
inventory, immediate pill advancement, sheet geometry and footer placement remain proposals.
Native sheet expansion, gestures, Back/insets and accessibility still require implementation
and device review through existing mechanisms.

The source baseline is `ReportActivity`, `ReportReasonRecyclerViewAdapter`, `ReportReason`,
`post/FetchRules` and `thing/ReportThing`. Four general reasons precede fetched subreddit
rule short names. One checkbox selection spans both lists and can be cleared. General reasons
remain available when rules fail; no free-text Other field is exposed in the inspected form.
Preserve the exact native `site_reason`/`rule_reason`, selected-reason markers, localized
payload strings, subreddit/thing fullname and OAuth helper. Browser labels are not payloads.

Revision 68 replaces the combined list with five representative categories: Subreddit rules
and Continuum's four general reason families. Spam demonstrates sample sub-reasons; Subreddit
rules shows one clearable rule choice. Other categories show an explanation before Submit.
This is not Reddit's complete current taxonomy. Spam sub-reason labels and native API mappings
are unverified proposals; no new capability is established by the browser. No free-text Other
input is added. The broader flow is selected, not an endorsement of all sample reasons.

The fixture resets to categories on Post/Comment change and new sessions, retains the current
step/selection across appearance/presentation changes, and provides rules-loading/empty/failure
and synthetic submission outcomes. Back returns focus to the category and retains its detail
if reopened; switching category clears it. Escape goes back from details, then closes from
categories. Demo failure retains the form/reason; success shows a separate confirmation with
Done returning to the original post. Native Back/lifecycle behavior remains unverified.
No extra Hide/Block operation, reason, draft, network request or native state is simulated.
This does not establish the real report endpoint's side effects; see the research below.
Loading/empty copy and persistent inline feedback are presentation proposals; native rules
failure currently uses a Snackbar and submit validation/results use Toasts.

Guest reporting is not established by this comparison. The native post menu hides Report for
Guest; the inspected comment Report binding is outside its signed-in edit/delete block and
the layout does not hide it. Audit caller/access behavior before native changes rather than
imposing the post menu's eligibility globally. Report is distinct from moderator actions.
Native Back/insets, restoration, access/results and accessibility remain verification work.

**Official Reddit flow research (2026-10-27; followed by flow selection):** the user requested
research of the official app's category pills and follow-up steps before selecting a container.
Reddit's [2020 inline-report announcement](https://www.reddit.com/r/modnews/comments/jr4y9n/big_update_to_the_inline_reporting_experience/)
describes category definitions, separation of subreddit-rule versus sitewide issues, and
post-submission confirmation. Its age makes it evidence of the flow's rationale, not an
exact current Android screenshot. The [2024 reporting update](https://www.reddit.com/r/modnews/comments/1fpcso8/new_multicontent_reporting_experience/)
confirms reason-specific follow-up with Spam sub-reasons, including excessive reposting.
It also describes moderator-only multi-content reports (same user/subreddit/reason), which
must not be implied as a general user capability. The [current post/comment help](https://support.reddithelp.com/hc/en-us/articles/360058309512-How-do-I-report-a-post-or-comment)
confirms More → Report and separate optional blocking. Custom subreddit reports depend on
the subreddit's setting; additional-information fields depend on the applicable report flow.

The supported design model is **category → explanation/relevant follow-up → explicit submit
→ confirmation**, with branch length varying by reason. It is not an assertion that every
category needs exactly two screens. Exact current Android pill labels/order/geometry were
not independently verified; the live Reddit browser page presented a human-verification
challenge, which was not completed. No report or authenticated submission was attempted.

The [public report API](https://www.reddit.com/dev/api/#POST_api_report) documents implicit
hiding for reported links/comments. Revision 67's no-network success fixture leaves the
post visible, but that is not an approved no-hide contract. Later native work must verify
server behavior and caller/cache/list reconciliation without adding duplicate Hide calls.
Public parameter names do not establish parity with every official-app category/follow-up;
validate exact mappings/access through existing Continuum helpers before promising support.

The bottom-sheet choice is recorded. Next review: study 26 deletion confirmation content
below. Report taxonomy/payload parity, eligible routes and native effects remain later work.

## Delete confirmation study 26

[Study 26](prototypes/relaxe-exploration/delete.html?rev=70) uses the **selected compact
post/comment excerpt**, together with the active account, target, warning and Cancel/Delete.
Revision 70 retires the brief comparison and selector; old `preview=brief` links still show
the excerpt. Excerpt length, exact warning, contained dialog presentation, initial Cancel
focus and persistent result feedback remain proposals. Relaxe offers no deletion Undo.
This is author deletion, separate from moderator Remove and from reporting.

Inspected source: `ViewPostDetailFragmentNew` offers own-post Delete and asks Delete This
Post/Comment + Are you sure? + Cancel/Delete. `CommentMoreBottomSheetFragment` takes caller
edit/delete eligibility inside its signed-in/token block. Post-details ViewModel deletion
uses `ThingDeletion.kt`, retaining fullname/token and result events. Post success closes
details. Comment success keeps a [deleted] parent when it has replies, otherwise removes
the comment; failure does not apply that update. Profile deletion uses `DeleteThing.java`
with its own result handling. Preserve these caller/identity/event boundaries rather than
assuming one visual dialog establishes complete route parity or consistent synchronization.

The synthetic owner fixture can confirm a page-memory outcome; other-author/Guest fixtures
offer no Delete action. Cancel/Escape/outside dismissal leaves content unchanged. Failure
closes the dialog and leaves the target visible; synthetic success illustrates the inspected
post/comment distinctions. Reset demo is a workbench control, not a product Undo. No Reddit
request or native content is changed. Real pending/duplicate handling, result parsing,
access/ownership, restoration, cross-screen effects and accessibility remain Android work.

The compact excerpt is selected. Next review: study 27 moderator action arrangement below.
Native deletion integration, result handling and accessibility remain later work.

## Moderator actions study 27

[Study 27](prototypes/relaxe-exploration/moderation.html?rev=72) uses the **selected compact
wrapping buttons** for Approve / Remove / Mark as spam. Other actions stay labelled rows.
Revision 71 retires the full-width comparison/selector and ignores legacy `primary` query
parameters. Review/Post controls/Comment controls headings reuse the More grouping direction,
but these names, exact geometry and context copy remain proposals; no moderator-specific
ordering preference is added. Buttons must fit available width and wrap for large text.

Source baseline: `PostModerationActionBottomSheetFragment.kt` has nine normal post actions;
`CommentModerationActionBottomSheetFragment.kt` has five comment actions. Both hide Approve
when approved and Remove/Mark as spam when removed. Post controls include sticky, lock,
NSFW, spoiler, caller-optional Change flair and moderator distinction; comment controls
include lock and moderator distinction. Toggle labels reflect the supplied model flags.
Preserve separate Remove versus spam flag, current account, target fullname/position, caller
flair suppression and existing handlers/API/results. This is not author Delete or a new
moderator dashboard, queue or permission system.

The fixture targets the active moderator's own content, with explicit state presets and
Member/Guest/no-handler variants. Ineligible fixtures expose neither entry nor hidden action
rows. This is an illustrative boundary, not proof of uniform native gates: post More checks
`isCanModPost` and a valid parent handler; comment More uses `isCanModComment` with parent/
activity launch paths, and the inspected comment sheet casts its parent handler. Audit those
routes before native replacement; do not infer a completed fix or fine-grained permissions.

Buttons announce route previews only; no approval/removal, model mutation, request or
persistence occurs. **Confirmation is selected for Remove and Mark as spam**, showing the
account, target and compact excerpt before the explicit action. Revision 72 retires the
immediate comparison/selector and ignores legacy confirmation query parameters. Approve and
other controls keep direct route previews. Confirmation identifies account, post/comment and excerpt; Cancel/Escape returns
to the same action, while confirming dismisses and previews its route. Target/access/state
changes cancel the pending preview; theme/size changes retain it. This is not
a new Settings preference. Real pending/result/failure feedback, removal reasons, all native
caller routes, restoration and accessibility remain further review/implementation work.

Inspected `PostFragment`, `ViewPostDetailFragmentNew` and `CommentsListingFragment` removal
handlers delegate directly to their ViewModels; no confirmation was found in those paths.
The details ViewModel sends fullname + spam flag through the existing OAuth `removeThing`,
then updates removal/approval state and publishes the matching success/failure event. The
selected confirmation adds a design requirement before dispatch; native implementation
remains later work. It is not existing native behavior in the inspected paths.
Preserve distinct spam flags and success/failure/event semantics rather than treating the
browser route announcement as a successful moderation action.

Remove/Spam confirmation is selected. Author Delete retains its separate existing
confirmation. Next: study 29 Share presentation below; real moderator result/pending and
removal-reason integration still require later review/implementation.

## Download actions study 28

[Study 28](prototypes/relaxe-exploration/downloads.html?rev=73) now uses **separate download
rows**, selected by the user for direct access to each available output. Revision 73 retires
the one-entry/chooser comparison and ignores legacy arrangement query parameters. This is a
Media excerpt of More; it does not add a permanent feed button or approve complete menu
order/viewer mappings.

`PostOptionsBottomSheetFragment` exposes image/video/GIF downloads by post type, a GIF video
row only when `mp4Variant` exists, and gallery-current-item download only with a supplied
nonnegative gallery index. Gallery Download all remains available without that index. Keep
the same post/album scope; never substitute index zero for an unknown current item. Source
labels the current gallery row Download image; the fixture's Download current item and count
subtitles are wording proposals. Mixed media, provider eligibility and all caller routes need
native verification. The photo stands in for media; there is no GIF/video playback here.

The fixture includes a three-item gallery with/without current position, single image/video,
GIF with/without a video variant and an ordinary link with no download row. Guest/signed-in
fixtures share sample download choices. Selections only announce a route and dismiss.
Close/Escape returns to the post; account/media changes clear the previous route and rebuild
available actions so a stale gallery item is not retained. No request, download, permission,
file, folder change or service job occurs.

Preserve native permission/version checks and flags, configured image/GIF/video/NSFW folders,
filenames, content/data/media policy, `DownloadMediaService` versus Reddit-video service and
gallery-all handling. Browser choices establish neither storage correctness nor provider/
job success. Setup/progress/failure, sharing/external-open and Android restoration/accessibility
remain later review/implementation work.

## Share actions study 29

[Study 29](prototypes/relaxe-exploration/share.html?rev=74) now uses **paired Share / Copy
buttons beneath each URL**, selected by the user. Revision 74 retires the separate-row
comparison and its selector. The pair uses a heading and destination-specific accessible
names; grouping/order and exact wording remain proposals. This is the post Share sheet,
not a replacement for every comment Share/thread route or the Android system share chooser.

Source: `ShareBottomSheetFragment`, `fragment_share_link_bottom_sheet.xml`, the More caller in
`PostOptionsBottomSheetFragment`, `BaseActivity.shareLink/copyLink` and `RedditLinkUtils`.
Keep post-link Share/Copy, media-type-labelled Share/Copy when a media URL is supplied, and
GIF video-variant rows only when media, post object and variant are available. The inspected
Gallery caller supplies no media URL: do not invent a current-gallery-image share URL.
Share post as image and Share with comments require a post object. Comment sharing uses
supplied nonempty comments or fetches with the existing Guest/OAuth account path, BEST sort
and filter before invoking the existing screenshot helper. Preserve error handling and image
settings; the fixture does not fetch comments or generate files.

Post/media preview strings and final Share/Copy dispatch retain the existing shared-domain
preference/helpers. The variant is displayed from its raw value in this fragment but still
passes through the activity helper on dispatch; do not bypass that helper. Native Share uses
ACTION_SEND text/plain and the Android chooser; Copy uses the clipboard with version-aware
feedback/failure handling. Theme/font, account/access, provider/media/content policy and
restoration remain contracts. No new link rewrite, backend, clipboard or export mechanism is
implemented by the HTML study.

Fixtures cover image/text/Gallery/GIF/video/link, missing media URL, link-only without a post
object, and Guest. Sample URLs are inert text. Buttons only announce route previews, dismiss
and restore focus. Account/content changes clear earlier route feedback; appearance/size
changes retain the sheet. Paired controls keep the same eligible routes, wrap at large text,
contain keyboard focus and make their underlay inert. Browser checks establish no native
sharing, clipboard, generated-image, loading/failure, accessibility or restoration correctness.

## Download setup feedback study 30

[Study 30](prototypes/relaxe-exploration/download-feedback.html?rev=75) now uses the selected
**inline missing-folder notice**, with Download locations and Dismiss. It stays beside the
attempted action until dismissed or a fixture reset, without a timer or blocking browsing.
Revision 75 retires the dialog comparison and its selector; old style query parameters cannot
restore it. The Settings button remains route-only: it sets no folder and starts no job.
Returning from future native setup requires another explicit attempt; automatic retry is not
proposed.

Current `PostOptionsBottomSheetFragment.download()` checks the configured destination,
shows `download_location_not_set` as a short Toast and dismisses if missing. Gallery-all
checks relevant media destinations separately; it is outside this single-location slice.
The selected inline notice and direct Settings action require later native presentation
work; they are not existing behavior. `DownloadLocationPreferenceFragment` already owns separate
Images/GIFs/Videos/optional NSFW settings, ACTION_OPEN_DOCUMENT_TREE and persisted read/write
URI grants. Reuse those mechanisms and preference scope; the account fixture does not create
per-account folder semantics. Missing location is distinct from denied permission, revoked
folder access, transfer failure or a completed download.

The preview includes the four destination labels, Guest, themes, large text and phone/
landscape sizes. It has no storage, Settings writes, folder picker, permission prompt,
notification, download service, real retry or file operation. Keep native permission/version,
media variant, destination/NSFW, naming, policy, service/result and restoration contracts.
Existing services own job progress/notifications; their correctness is not established here.
Settings return and all native gates, failure, lifecycle and accessibility coverage remain
later review/implementation work.

The inspected `DownloadMediaService` and `DownloadRedditVideoService` already own progress
and result notifications, including eligible finished-file Open/Share/Delete actions. Keep
those service/notification mechanisms for native verification rather than invent a new HTML
download manager or imply browser route feedback is a job result. Media-service stop returns
false for rescheduling in the inspected path. Exact result, error, partial-gallery, permission,
retry and lifecycle behavior still require native coverage.

## In-app browser study 31

[Study 31](prototypes/relaxe-exploration/browser.html?rev=78) keeps **Open in browser visible
in the toolbar**, selected by the user. Quick Copy access must now be **editable in Settings**.
Revision 77 replaces the workbench-only comparison with Browser settings: independent Show
Copy link button and Long-press toolbar to copy link switches. **Both switches are selected to default on**; users can change either independently. Copy link always remains in More, alongside Refresh and
Share link; the selected external action remains visible. Large text moves toolbar actions
to a separate row. Title/address, menu geometry and exact wording remain proposals.

More → Browser settings and the workbench preview button open the same scoped-settings
specimen. Changes apply immediately in page memory and survive panel close/reopen, theme/size
changes and local page navigation. Signed-in and Guest buffers stay separate. Reload clears
these fixtures; no native preferences are written. Back/Escape from settings returns to the
action list; Close/Done exits to the initiating control. The two switches may both be off,
with Copy still reachable in More. Pending holds are cancelled when their setting changes.
Use the existing account-scoped preference wrappers in native work; final category placement,
keys, persistence, migrations and import/export mapping remain for Settings implementation.
This requirement does not approve rearranging/hiding every browser action or a new storage
system. Open in browser's selected visible default stays unchanged.

Long press targets non-button toolbar areas; buttons retain their own actions. HTML touch/pen
hold, desktop context-click and an explicit simulation button route to the same current-URL
Copy preview. Movement, release/cancel/leave, context change, blur and visibility loss cancel
a pending hold; the context-click fallback suppresses a duplicate following the timed preview.
The illustrative 600ms threshold is not an approved Android timing. Native haptics, gesture
arbitration and TalkBack/Switch Access custom actions remain implementation/verification work.
The More action remains a labelled keyboard-accessible alternative; no clipboard writes occur.

Sources: `WebViewActivity`, `res/menu/web_view_activity.xml`, `LinkResolverActivity` and the
existing domain helpers. Entry continues to honor the existing link handler, Custom Tabs,
ephemeral provider and specific-browser preferences, account scope and fallbacks. This study
does not change the default or replace system-browser/Custom Tabs UI. Open in browser keeps
ACTION_VIEW + `applyBrowserDomain`; Share/Copy keep their distinct shared-domain helpers.
Actions use the current URL, not just the original link. Preserve errors and saved WebView
state. Close finishes directly; system Back first navigates page history, then exits.
The inspected WebView sets anonymous mode on Android O+ when the current token is absent;
this fixture is not evidence of anonymity, cookies/session isolation or provider behavior.

The local article and its single next-page transition demonstrate current-URL routing and
Back/Close distinctions only. No WebView, real website, external launch, clipboard write,
share request or reload occurs. Account fixture changes reset its local page state; this is
not an approved new account-switch behavior. The shared bar reuses the selected app shell;
WebView scroll/hide integration remains native work. Theme applies to app chrome; the example
article keeps its own colors, rather than promising arbitrary website theming. Loading/error,
redirect/long-address handling, real Back/history/restoration, insets, accessibility and
performance remain further review/implementation work.

Both Copy defaults and Settings customization are selected. Edit post's shared Reply/Edit
style is also selected in revision 79. The create/act direction pass can move on; detailed
form fields, category/reason wording, guards, result feedback and native contracts remain
provisional or unverified where documented above.

## Settings overview study 32

[Study 32](prototypes/relaxe-exploration/settings.html?rev=92) now keeps **brief descriptions
beneath category titles**, selected by the user. Revision 80 retires title-only rows and their
selector. Existing source root sections/order remain; exact labels, summaries, decoration and
header geometry are proposals. This does not approve every Settings surface or change a
preference.

The 25 root entries map to `res/xml/main_preferences.xml` and its title resources. The
inventoried `MainPreferenceFragment` hides Security when `BiometricManager.canAuthenticate`
for strong biometrics/device credential is unavailable, and routes Post/Comment Filter and
Privacy Policy separately. The fixture demonstrates only the Security visibility boundary.
Guest/account context is synthetic. Root group labels are navigation evidence, not proof that
every child key has a uniform storage scope; retain per-key/account wrappers and native gates.
All API-key/access, theme/font, media, account, backup/reset and privacy mechanisms stay intact.

`SettingsActivity` already provides Search settings, account-chooser integration, fragment/
title/back-stack navigation and resume recording. Most HTML category, Search settings and Switch account buttons announce routes only.
Revision 80 additionally illustrates the local navigation path described below. No real search index, nested native
preference, account switch, credential, authentication, reset, import/export or storage action
occurs. The shared app bar is reused; native scroll/insets/restoration/accessibility remain
unverified. Customizable feed layouts/actions, shared Reply/Edit style and browser Copy
controls must be mapped into the existing system in later detailed Settings review.

### Feed layouts entry (revision 80)

**Interface → Posts and Feed → Feed layouts is selected.** Revision 82 applies the exact
section name Posts and Feed to the Interface row and child heading. Native identifiers and
preference keys remain unchanged. Revision 81 already retired the direct-root comparison,
retaining all 25 source root entries.

This reaches the shared illustrative four-family/saved-layout destination. No second layout
store, preference keys or applying/resetting behavior is introduced. Existing Post preferences
and their routes/overrides must remain available, with the accepted per-account/per-feed and
saved-layout contracts.

`interface_preferences.xml` routes Posts to `PostPreferenceFragment`; `post_preferences.xml`
already owns default normal/unfolded/link layout choices, column configuration and Compact/
Gallery options. The accepted new families/custom saved layouts need later native mapping
into those mechanisms. A consolidated Feed layouts child page is a proposal,
not an existing native child page. Keep width eligibility, media/content policy, saved-copy
semantics, per-account scope and the accepted Settings customization requirements.

Interface/Posts and Feed are navigation excerpts for this path, not complete preference
forms or proof of platform visibility. Other Interface rows, saved examples and families except Large card
announce routes only. Revision 84 adds the focused Large card editor below. Local Back restores parent scroll and initiating-row focus; local child
entry moves focus to its heading. Theme/size changes retain the path, while workbench account/
authentication changes reset it. These fixture resets do not approve new native
account-switch or restoration behavior. Native Settings search, account-scoped writes, resume,
imports/backups, keyboard/accessibility and detailed settings remain further work.

### Saved-layout management (revision 146 direction selected; revision 147 HTML workflow)

Current reference: [Feed layouts](prototypes/relaxe-exploration/settings.html?rev=145&page=layouts&focus=1).
The user selected option 1: shared device library and the common management/snapshot rules. Existing selected rules
stand: copies below four families; Open previews; explicit Use layout; Save as layout always makes
a new named copy; no in-place overwrite; existing dirty-exit guard. Current HTML `savedByAccount`
and `selectedBuffers` are scaffolding, not approved reusable-definition ownership or native schema.

**Selected workflow:** one reusable layout library on this device, including Guest access,
with independent account/context appearance selections. The separate-library alternative is retired.
The workflow below changes no API/access,
accounts, feed ordering/filtering, read/vote/save effects, media policy or restoration.

| Step | Selected screen behavior |
| --- | --- |
| Browse | Saved copies remain below families on Feed layouts, labelled by name and family. Show current use in the account/context being reviewed; no automatic application on row tap |
| Open/edit | Open the copy in the existing preview/editor. Changes are an unapplied draft. Use layout applies its current appearance; Save as layout creates another named copy and does not apply it. Keep editing / Discard changes retains its accepted behavior |
| Apply | Name the exact target: this account’s default from Settings, or the existing current-feed/context override from a contextual editor. Preserve existing precedence and other overrides; do not turn one contextual use into an account/global reset |
| Copy semantics | Apply a snapshot, without a live link that future library operations can mutate. Keep the originating preset identity only as useful presentation provenance; later edits become a custom selection. No mutable library reference is a prerequisite for rendering/restoration |
| Rename | Options → Rename changes only the library label; preserve identity and appearance. Validate nonempty names and existing within-family duplicate rules. No feed reapply, overwrite or scope change |
| Delete | Options → Delete asks confirmation and explains that current appearances will be kept. Remove only the reusable copy; active account/context snapshots retain their appearance and become custom selections without a saved-copy label. Never silently fall back to a family default |
| Isolation | Library entries contain presentation values only. Exclude credentials, account identity, sort/filter, data/autoplay/content policy and shared per-account More-section ordering. Preserve accepted family toolbar capabilities without conflating them with shared More order |
| Failure | Failed save/rename/delete retains the library, active selections and draft, with readable retry feedback and focus return. Account switching must resolve the current editor’s dirty guard and load that account’s own selection |

Shared library is recommended because the same visual recipe can be reused without rebuilding it
for every login; per-account application still satisfies per-account setup. This is an explicit
proposal, not an inference from the theme library. Separate libraries offer stronger separation
of preset names and eliminate cross-account library-management effects, at the cost of repeating
creation. No cross-account copy/import feature is implicitly added by the separate-library option.
Neither choice adds cloud synchronization. Guest is an existing local context, not a new account.
Backup/reset/account-removal treatment must be mapped explicitly during native persistence design;
do not automatically purge presets or change existing removal contracts based on this proposal.

**Source evidence:** `AccountScopedKeys` includes `default_post_layout`, unfolded/link defaults and
the whole `POST_LAYOUT_SHARED_PREFERENCES_FILE`. `SharedPreferencesUtils` defines front-page,
subreddit, multireddit, user, search and History layout keys. The fixture’s row handler loads a
saved snapshot into the editor; Use layout separately copies it into `selectedBuffers`. Saving
always appends a snapshot, with within-family duplicate-name checks. Example rows are route-only,
and native reusable-library persistence, stable IDs, management and migration are not implemented.
Existing native layout IDs/context precedence must be explicitly mapped before new preferences.

Revision 147 implements [shared saved-layout management](prototypes/relaxe-exploration/settings.html?rev=147&page=layouts&focus=1)
using `settings-layout-library.js` and the existing editor. Seeded examples now open real fixture
snapshots. Rows have separate Open and Options targets; Options offers Rename and confirmed Delete.
Blank/within-family duplicate names are rejected; identities are monotonic and unaffected by rename.
Names are rendered as text. Save as layout adds a shared snapshot and leaves application separate;
Use after saving can identify that newly saved copy. Failed operations retain data and draft.
`layout-failure=save|rename|delete|all` simulates one failure per operation for explicit retry.

Use targets the account default from normal Settings, or a synthetic current-context override from
the feed study. `layout-context=home|subreddit|user|default` supplies labelled fixtures (Home,
r/EarthPorn, u/ridgewalker); these are not real native routing or complete override enumeration.
Selected snapshots remain in existing account/context/family buffers; names/provenance are separate.
Deleting a preset clears its saved-copy provenance while keeping all applied snapshots. Inherited
account defaults are not overwritten by a contextual Use. The contextual editor’s Saved layouts
entry uses the existing dirty guard and sheet-return path. Returning after Use reflects the selected
family. Account fixture changes also resolve unapplied layout edits before switching.

All data is page-memory and clears on reload. Library rows are shared with Guest; account selection,
backup/reset/removal migration and native persistence are not implemented. Existing Settings opened
in another tab has independent fixture memory. The current module projects only family presentation
keys; it introduces no account/data/media-policy store or native API action.

**Current verification:** pure library and actual host models pass shared Guest access, snapshot
copies/field allowlist, stable IDs, name validation, open without apply, explicit account application,
independent account snapshots, contextual/default isolation, rename/delete preservation, guard/
discard and management-dialog failure/retry retention. Existing adaptive Settings/embed/host and
focus/theme models were rerun and passed. These models do not render the snapshot/controls or prove
actual focus/bounds. Syntax/static/reference/served-byte checks are recorded in ROADMAP.md. Browser
opening again reports local browser use disabled in Work settings. No native/Gradle/device check.

### Browse finishing and new-account starting layout (selected at revision 148)

The user selected option 2, including the common finishing direction: keep Find in Saved under More, revealing its
local filter with the query retained across Posts/Comments and source changes; keep global Reddit
Search separate. Keep Subscriptions favorites once in a leading group and remaining entries below,
alphabetical within each, with existing visible stars and Filter this list. Keep Recently visited’s
inline name filter across its two tabs and a clear Visited relative-time label based on its stored
visit timestamp. Preserve recording exclusions/cap/opt-out purge and Subscribe/Follow/Save user
owners; do not add deletion or recording controls. Exact wording/density remains native refinement.

Source `AccountSavedThingActivity` filters loaded items and continued paging; Find in Saved must
not imply Reddit server search or a new complete offline index. `post_preferences.xml` defaults
post/unfolded layout to legacy ID 0 (Card), while theme mode defaults to 2 (system, with the existing
older-platform behavior). The onboarding study’s Compact highlight is a fixture candidate, not
permission to migrate returning accounts to Compact.

**Selected first-use starting layout:** Large card / Card 1 / Filled, highlighted on Layout for
genuinely new account/Guest setup. Compact is no longer the starting candidate. All four live samples
remain selectable. Follow system mode, the accepted unified Material theme system, optional Choose
folder / Set up later and explicit Review/Finish remain. Existing/restored accounts load actual saved
choices; this decision does not migrate a returning account or reset contextual overrides.

[Revision-148 onboarding](prototypes/relaxe-exploration/settings.html?rev=148&page=onboarding&focus=1&setup-account=newreader)
starts fresh drafts with Large, whose existing sample defaults are Card 1/Filled. Only fresh drafts
show the starting-layout note. Existing-account `ensureExisting` stays separate; already chosen
draft/progress is retained. Opening setup creates no completed marker or native preference write.
The simplified existing-account fixture does not load every real custom composition/override;
native setup must preserve those actual values rather than infer Card 1 from the family label.

The browse arrangements already exist in the HTML: Find in Saved is under More, favorites lead
Subscriptions once, and Recently visited has its own inline filter and Visited-labelled synthetic
times. Their exact localized elapsed/date rendering must reuse native formatting and the accepted
time settings. This selection does not replace an account’s formatter or fabricate visit recording.
Earlier wording calling these arrangements or Compact/Follow system starting candidates provisional
is superseded here; exact native geometry, caps, spacing, icons and motion remain implementation
refinement, with source values preserved unless an explicit decision above changes them.

Current setup/account models pass fresh signed-in/Guest Large + system, returning Compact/Dark
retention, unchanged chosen draft/progress, account isolation, no completion on opening, new-login
setup/Finish, optional folder deferral and returning-account bypass. API/account guard models also
pass. Syntax/static/reference/HTTP results and the complete handoff are in ROADMAP.md. Browser use
remains disabled in Work settings; no rendered or native accessibility/performance claim is made.
Whole-app styling remains in progress pending the rendered review and native preparation boundaries.

### Saved layouts access (selected, revision 83)

**Saved custom layouts appear below the four families on Feed layouts**, selected by the
user. Keep Layout families and Saved layouts sections on the same page. The separate-page
comparison and its selector are retired. The synthetic examples Quiet reading (Compact/Filled)
and Weekend photos (Gallery/Fit) remain navigation fixtures, not loaded user data.
Account/context assignment, active-layout selection, native library persistence and management
remain open under Named custom layouts. An identical catalog across account fixtures does
not establish global ownership or cross-account access.

Saved examples and families other than Large card preview customization routes only. Large
card opens the focused editor below. Neither applies a feed layout, creates or overwrites a copy. Save as layout must always create a new named copy, as
already selected; Rename/Delete and active-layout selection remain separate reviews. Local
Back restores the parent row and scroll. No native route, preference key or storage changes.

### Layout editor preview (selected, revision 84)

**Show a live preview above the controls, scrolling with the same page**, selected by the user.
Do not pin it or require a separate Preview screen. Study 32 starts with a focused Large card
editor using the existing selected defaults: text above media (Card 1), Filled, Fit whole media
and toolbar below content. Composition, surface, framing and toolbar placement update a
non-interactive sample using the existing theme tokens, bundled mountain image and icon helper.
This is an editor-organization illustration, not a replacement feed renderer or action-capacity
implementation; study 17 remains the fuller customization/library reference. The other families,
action visibility/order, spacing, columns and complete family editing remain outside this focused editor.

**All layout controls visible under section headings is selected (revision 85).** Keep
Appearance and Actions headings; the expandable sections and comparison selector are retired.
This applies to the layout editor, not every unrelated Settings category. Local Back returns to
Feed layouts and its initiating row; unapplied changes now use the selected exit guard below. Signed-in
and Guest buffers are separate and clear on reload. They establish no native persistence,
account-switch behavior, native saved-library ownership or contextual assignment. Revision 87
adds new-copy saving in page memory as described below. Native
preferences and their existing scope, media/access policy and restoration still require mapping.

### Explicit layout activation (selected, revision 86)

**Editor changes affect only the preview until Use layout is tapped**, selected by the user.
Saving a new named copy remains separate from activating a layout. The focused editor now
shows primary Use layout and secondary Save as layout actions after the controls. This action
placement and exact feedback are proposals, not additional accepted defaults.

Use layout copies the current presentation controls into a separate selection snapshot in page memory.
Later edits cannot mutate that snapshot; subsequent Use layout replaces it. Draft, selection
and new-copy buffers stay isolated by the synthetic account/Guest fixture and clear on reload.
No real feed/default/context override or Android preference is changed. Native work must map
explicit activation to the existing scoped mechanisms. Saving remains available after Use
layout; the prototype keeps the editor open to demonstrate it. Exact post-Use height remains
a proposal.

### Unapplied changes and independent saving (selected direction, revision 87)

**Keep editing / Discard changes is selected when leaving with unapplied edits.** Keep editing
returns focus to the initiating control without changing the draft. Discard restores the last
applied configuration (or initial defaults before the first Use layout). Existing named copies
are retained. No-change or already-applied exits need no discard confirmation. Sheet collapse
is not an exit and does not discard. The fixture guards header Back, sheet Close, Escape and
shared app-bar exits. Workbench account/authentication switches remain comparison controls,
not a native account-switch flow; native process/system navigation still requires verification.

**Use layout and Save as layout remain independent**, including saving after Use layout.
Revision 87 adds a name dialog and always creates a new page-memory copy, never overwriting.
Empty/duplicate names are rejected; names use text nodes, focus returns after saving/cancelling,
and both dialogs have keyboard focus wrapping. Saved copies appear below the four families,
reopen in the editor, and remain unchanged by later edits or Discard. Saving before Use layout
does not activate it. This is a focused Large card browser demonstration, not the complete native
library, account ownership, contextual assignment, backup or persistence implementation.

### Contextual layout sheet (HTML direction accepted; revision 87 onward)

The user proposed opening layout controls above the current feed/post details as a collapsible,
expandable bottom sheet, so changes can be seen on the underlying page. The feed version was accepted during the subsequent scrolling/control review; the current
[feed-only preview](prototypes/relaxe-exploration/settings.html?rev=92&page=feed&focus=1&editor=1): Change layout opens
the same Large card controls as a non-modal sheet. While open, its synthetic feed temporarily
shows draft appearance. Use layout keeps the fixture selection; Discard restores the baseline.
Collapse keeps the draft and reveals more feed; Expand restores controls. The standalone
Settings entry retains its scrolling sample. This accepted feed direction retains the Settings route; it does not approve every other
surface's sheet design.

The prototype provides explicit Expand/Collapse buttons and heading/return focus. Review-only
focus/editor query flags hide the workbench, fit the phone to the browser height and open the
sheet; they are not native entry/restoration contracts. Initial
60%/expanded 92% heights, an accessibility-driven larger sheet at 200% text, action placement
and post-Use height are provisional HTML geometry. Drag gestures, IME/insets, touch/scroll
coordination, TalkBack, feed-anchor restoration and native performance are unverified. The
posts are synthetic and perform no read/save/vote/media/autoplay/network actions; the feed
itself must remain scrollable as specified below.
Do not repurpose feed-card controls to style post details/comments by assumption.

### Independent feed scrolling (required, revision 88)

**The feed must remain independently scrollable while the contextual layout editor is open.**
The earlier fixture incorrectly sized its scroll range for the full phone height, leaving
later content obscured by the sheet. Revision 88 limits the feed viewport to the exposed space
above the sheet, observes height/window changes and removes the hidden app-bar padding from
that exposed region. This allows the final post to be scrolled fully above the sheet. Closing
restores the normal feed viewport/padding. Feed and editor controls have separate labelled,
keyboard-focusable scroll regions; wheel/touch scrolling over one should not scroll the other
or change the sheet detent. Collapse reveals more feed without discarding. An expanded or
large-text sheet may cover the feed entirely; its hidden region is removed from keyboard/
accessibility focus until exposed again. Native touch arbitration and accessibility remain
unverified.

Four synthetic posts (images and text) now receive the same temporary style changes without
rebuilding the feed on each edit. Use layout, new-copy saving, Keep editing and Discard retain
their existing boundaries. The feed's limited browser position handling is not proof of native
anchor restoration across card resizing, media playback, paging or process recreation.

The post-details context question was deferred at this checkpoint. It is now resolved by the
user’s revision-143 choice: Post More → Appearance edits the reader and comments; contextual feed
editing remains separate. See “Reader Appearance” below for the selected scope and current study.

### Large card information and spacing (HTML control set accepted, revision 89)

The user accepted this information/spacing control set before continuing to toolbar review.
The contextual sheet and Settings editor share ten presentation controls at this checkpoint. Six additions
reuse the study 17 parameter direction: title versus post-info order; author, post flair and
post age visibility; content padding; and gaps between posts. All remain visible under section
headings. The feed updates all four samples; Settings now has image and text samples to show
spacing. Subreddit information stays inside each card; the duplicate heading outside feed cards
is hidden so a zero gap removes the empty space between cards.

The previous illustrative title-first arrangement remains, with author/flair/age shown, plus
Default/Tight/Standard/Roomy padding and Default/None/Small/Medium/Large gaps. Exact defaults,
preset ranges, grouping and final native units remain proposals. Default spacing preserves this
study's existing geometry, not an approved Android dimension. Padding adjusts text/action
insets while media stays edge-to-edge. Post flair means subreddit-assigned flair; it does not
control NSFW/spoiler policy or content/access indicators.

These parameters participate in explicit Use layout, dirty comparison, Discard rollback,
new-copy saving and reopen. Saved copies remain independent from later applied/draft changes;
Guest defaults and copies stay separate in page memory. Visible metadata separators hide with
their field, and DOM reading order follows the chosen title/info order. This is browser evidence,
not native TalkBack or persistent account/context mapping. **Next:** text excerpts, media-height limits and adaptive columns; revision 90 integrates the
existing toolbar visibility/order and width cap below. Post-details scope remains deferred.

### Large card toolbar controls (revision 90 proposal)

The shared editor now has eleven presentation fields, including a toolbar-priority string.
Study 17's seven action choices are carried into the sheet: Upvote, Downvote, Comments, Save,
Share, Open externally and Copy link. Checkboxes choose direct actions; Up/Down moves checked
actions in priority order, with disabled boundaries and focus-preserving moves. Unchecked
actions remain available in More. Default desired actions retain study 17's Large card set:
Upvote, Downvote, Comments, Save and Share. More is always available and fixed last.

The sample uses study 17's actual-width measurement rule: reserve More, account for padding,
gaps, icon/count widths and text size, then keep the longest fitting prefix of the selected
order on one row. Lower-priority actions go into More; growing the window restores them
without rewriting saved priorities. If resizing removes the focused action, focus moves to
More. Four synthetic scores/comment counts exercise differing capacities. This is illustrative
browser fitting, not an approved Android pixel breakpoint or measured native performance.

Visibility/order participates in Use layout, saved new copies, reopening and Discard, separately
from the accepted per-account full More-menu section/action order. The reachable More preview
uses grouped Post, Navigate and Share and copy sections for these seven fixture actions only;
it does not replace the complete study 24 menu, redefine native eligibility, persist its order
or make that order layout-specific. Its bottom-sheet geometry is provisional. Action buttons
announce fixture routes only; no votes, save/read state, clipboard, system browser, share or
network work occurs. Guest vote/save attempts announce sign-in instead. Native action routing,
account/context lookup, all native menu actions and accessibility still require mapping.

**Next:** text-post excerpt controls and media-height limits, then adaptive columns using the
accepted minimum-width/large-text constraints. Other families, remaining Settings/accounts/API
access/onboarding and the deferred post-details scope remain later.

### User, Subreddit and options toolbar entries (revision 91)

**User and Subreddit must be available as configurable toolbar actions**, requested by the
user. Revision 91 expands the catalog to nine choices. They are opt-in, reorderable and use
the same width cap, Use layout, new-copy and Discard behavior; the existing desired default
set is retained. The existing stable author concept is used for the User action. Its icon
reuses the study 24 author shape; Subreddit reuses the existing native subreddit vector path.
Neither introduces a native asset or application-identity change.

The controls now explicitly show **More options — Always available · fixed last**. “Options”
is interpreted as the existing More menu; no second options menu or optional removal of More
is introduced. If the user intended a different options action, clarify before changing that
accepted availability rule. All nine fixture actions remain reachable in grouped More.

User/Subreddit route previews identify the current post's author/subreddit, independently of
metadata visibility and the signed-in account. Saved copies contain only toolbar IDs/order,
not post identities. These are announcements only: no profile/subreddit navigation, user or
subreddit menu operations, authentication, API calls or side effects occur.

**Selected routing (revision 92): User opens the current post author's profile; Subreddit opens
the corresponding subreddit page.** Use the existing navigation/account/access mechanisms.
Do not substitute user/subreddit action menus for those taps. The HTML now announces the
selected destination explicitly, including per-post identity, but does not perform navigation
or prove native restoration. The user also deferred icon work to Android implementation;
existing glyphs remain placeholders.

### Text excerpts and media height (selected defaults, revision 95)

The shared Large card editor adds two study 17 parameters, bringing its presentation snapshots
to thirteen fields. **Text post excerpt** offers Hidden, 2 lines, 4 lines and Full text, affecting
the body only; title, post info and toolbar remain. The longer synthetic text fixture makes the
choices visible. **Selected: Large card text-post bodies default to 2 lines.** Keep 4 lines,
Full text and Hidden configurable. Revision 93 applies this default in the HTML editor; native
preference integration and migration remain unimplemented. CSS line clamping is illustrative and does not establish native Markdown,
link, code-block, nonlinear scaling or TalkBack behavior.

**Selected: Large card media previews default to No limit.** Keep a Settings option to
switch to Limit height and back. The current single selector offers No limit (default) plus
Limit height · Short / Standard / Tall; it uses the existing `mediaheight` snapshot field,
without changing account scope or introducing a second setting store. With a cap enabled,
Fit whole media scales down the complete frame instead of cropping it. Exact Android caps
remain undecided; the prototype's 200/320/440px presets are illustrative. The proposal keeps
Square crop square and disables this selector in that mode, retaining the selected value
for a return to Fit; that applicability is still provisional, not a media-policy decision.
These fixtures are images only; native video/GIF/provider/playback behavior remains unverified. The
[revision 94 comparison](prototypes/relaxe-exploration/media-height.html?rev=94) uses the same
1:2 SVG illustration in two independently scrollable feed excerpts: a provisional 320px cap
versus width-led natural height. A wide-photo toggle shows cases where the cap makes no
difference. The cap contains the complete frame with side space; No limit requires more
scrolling for tall media. The comparison now identifies No limit as the selected default; it does not set editor state
or define Android dimensions, a new shell or action behavior.

Both fields participate in explicit Use layout, immutable new-copy saving/reopen and Discard.
They do not capture post content/identity, themes or account credentials. The review-only
`sample=text` flag positions the text sample and its control for comparison; it is not a native
entry/restoration rule and does not choose a setting.

**Next review:** adaptive columns, then remaining families and detailed
Settings/accounts/API access/onboarding. Native cap dimensions and Square applicability
remain provisional. Post-details scope stays deferred; icon refinement belongs to Android
implementation. Do not ask the media-default question again.

### Large card adaptive columns (selected default, revision 97; geometry provisional)

Study 32 now brings the existing study 17 column constraint into the same Settings/contextual
editor. **Wide-window columns** offers 1 or 2. It measures the actual preview grid width and
text size; narrow windows show one column and disable the picker without overwriting the
preferred wide-window count. Resizing/text changes restore that preference when it fits.
The existing 320px minimum-card/text heuristic is reused with this editor's current gap;
all CSS dimensions, the two-column ceiling and exact section placement remain proposals,
not Android breakpoints or a complete tablet design. Grid items retain source/keyboard order;
no dense packing or new feed/paging behavior is introduced.

The preferred `columns` value extends the flat HTML layout snapshot to fourteen fields and
participates in Use layout, immutable saved copies, reopening and Discard. The effective count
is computed, not saved. If a focused picker becomes unavailable on resize, focus moves to its
explanation. Existing Guest/account buffers stay separate. Native portrait/landscape/unfolded
preferences still require explicit mapping; do not reset those values or replace their stores.
Gallery's accepted two-column minimum and Vertical swipe behavior are unchanged.

The `window` URL flag selects a fixture width only; CSS still constrains it to the real window.
Available workbench widths now include 840 and 1280. Standalone samples and contextual feed
reuse the same grid adaptation; the latter remains independently scrollable above the editor.

**Selected (revision 97): a fresh Large card layout defaults to two columns when readable
space permits.** One column remains selectable. Narrow windows and large-text layouts still
fall back to one without overwriting the preferred count. This design default does not
reset existing native user preferences; preservation/migration still requires explicit mapping.
Exact native breakpoints and a tablet shell remain unapproved. Do not ask this default again.

### Compact thumbnail placement (Right selected, revision 99)

The [focused comparison](prototypes/relaxe-exploration/compact-thumbnails.html?rev=98) reuses
two study 17 Compact feeds with the existing same-origin bridge. Identical posts, selected
Filled surface, compact density, title-first information hierarchy and hidden customizable
toolbar stay fixed. Only Left versus Right thumbnail placement differs. Both use the accepted
64px browser starting point; native dimensions still need refinement. Left / Right / Hidden
remain configurable in the existing workbench. The comparison stacks on mobile and exposes
existing theme/text fixtures without adding account/persistence or native preference state.

**Selected: Compact card thumbnails default to Right.** Left and Hidden remain configurable.
Revision 99 updates fresh study 17/workbench defaults and labels the comparison accordingly.
Keep the accepted Filled surface, density, hierarchy and hidden toolbar. Existing named copies
retain their own placement; the native preference/migration mapping remains unimplemented.
Do not ask the side-default question again. Continue remaining Compact controls/shared Settings editor integration,
then Vertical swipe/Gallery controls and detailed Settings/accounts/API access/theme/onboarding.
Revision 100 integrates Compact into the shared editor as described below. Tablet adaptation
and cross-surface consistency remain.

### Compact in the shared layout editor (revision 100 HTML proposal)

Study 32's Compact card row now opens the shared Settings editor. The contextual feed path
uses the same controls: [Compact live editor](prototypes/relaxe-exploration/settings.html?rev=100&page=feed&family=compact&focus=1&editor=1).
The accepted defaults remain Right thumbnails, Filled surface, compact title-first hierarchy,
64px browser example and hidden customizable toolbar. Left/Right/Hidden, thumbnail size,
surface, title/info order, author/flair/age visibility, padding/gap, toolbar position/visibility
and action visibility/priority are exposed under visible section headings. Exact native units,
remaining preset values and this editor's grouping are proposals.

The actual study 17 Compact feed is embedded; the inner shell/filter are hidden because the
outer Settings shell owns navigation. Its height follows the exposed viewport, so the feed
scrolls independently of sheet controls. Standalone Settings has the same scrolling sample
above its controls. Collapse/Expand changes space only; explicit Use layout remains separate
from Save as layout. New named copies are immutable; Back/Close/Escape/app-shell exits retain
the existing Keep editing / Discard guard. The prototype now partitions draft/applied buffers
by synthetic account **and family** and records the family on named copies; Large's fourteen
fields remain independent of Compact's twelve. This is page-memory demonstration, not a new
native store or native account/context migration. Duplicate names are checked within a family.

Compact reuses its existing long-press/right-click/Shift+F10 toolbar reveal and measured fitting.
User/Subreddit are now recognized in that fixture's action catalog as optional direct profile/
subreddit destinations; glyphs remain placeholders. The settings-only embed announces post,
media and action routes without even changing synthetic read/vote/save state; Guest vote/save
asks for sign-in. The retained workbench outside this embed keeps its prior local fixture
behavior. More/customize uses the existing study 17 sample; this is not proof of study 24's
full native grouped-menu/account-order integration. Toolbar edits made in the inner sample
are reflected in the shared controls and participate in the same draft/copy semantics.

**Selected (revision 101): Compact controls start with Thumbnails**, followed by Appearance,
Post information, Spacing and Actions. Keep every control group visible. This settles the
control-group order, not final native dimensions or the unresolved startup diagnostic in ROADMAP.

### Gallery in the shared editor (revision 102; selected entry behavior)

Gallery now opens in the shared Settings and contextual editor, using the existing study 17
grid/viewer. Its seven-field presentation snapshot holds surface, framing, content, viewer
swipe axis, columns, gap and media-tile titles; draft/applied values and copies remain separate
from Large/Compact and Guest. Explicit Use, new named copies and Discard use the existing flow.

The selected defaults remain visual-media grid, Fit whole media, at least two columns and
Horizontal viewer paging with Vertical selectable. This slice uses two columns; wider counts
and the tablet shell still require adaptive review and explicit native preference mapping.
All posts remains selectable; text/link tiles retain readable titles and open post details.
The title control affects visual-media tiles only. Both their image and optional caption enter
the same media-first viewer. Album images still page before the next post for the selected
swipe/key direction; exit brings the current tile into view. Native gesture, playback policy,
read-history and restoration correctness are not established by these fixtures.

**Selected:** Media only is the default, with no visible More button in the Gallery grid.
A short tap opens the media-first viewer, Horizontal by default. A long press opens the
corresponding post details. The previously selected optional Vertical viewer direction remains
available in Settings; horizontal browsing remains limited to Gallery entry. Optional short
titles remain configurable and included in saved copies. Full titles remain in accessible tile
names, and native content/title gates must be preserved. Text/link tiles in All posts keep
readable titles and details entry, without a More button.

The [Gallery interaction preview](prototypes/relaxe-exploration/gallery-titles.html?rev=102)
replaces the title comparison. Right click, Shift+F10 and a focus-visible Post details action
provide alternatives to holding. Existing hold cancellation and release-click suppression are
reused; Gallery movement also suppresses the release tap so dragging does not open media.
The prototype's 550ms/8px thresholds are browser fixtures, not selected native gesture values.
The details entry uses the existing exact-target route dialog, not the complete study 04
screen. Viewer controls retain their existing More action; only the grid loses More.
Surface/gap presets and Grid / Appearance / Viewer grouping remain proposals. No native
key/store, media eligibility, read/history policy or API mechanism is added.

The existing embed now suppresses the inner navigation in media mode as well as in the grid,
so the outer shell owns navigation. A duplicate inner bar was found during viewer checking;
with it suppressed, viewer entry, album paging and return-to-tile checks passed. The unrelated
intermittent observer exception remains recorded as unresolved in ROADMAP; do not claim a
clean startup/console run or a known application/tooling cause.

### Vertical swipe shared editor (separate framing selected)

Vertical swipe now opens from Feed layouts in the shared standalone/contextual editor and
reuses study 17's accepted viewer. The user selected two separate Fit/Fill controls:
**Photos and albums** and **Videos and GIFs**, both starting at the selected Fit direction.
Fill crops edges; it is an optional presentation choice. This does not add Horizontal as a
feed direction. Vertical post paging, horizontal album paging, tap-revealed overlays and the
selected roughly four-second playing timeout/exceptions remain unchanged.

These two fields use independent family/account draft/applied snapshots and immutable named
copies. The player's Fit/Fill action is temporary; changing a layout framing field resets that
override, and a new Vertical post starts with its media-type layout choice. Playback and data
are outside the saved layout. Video settings now opens the revision 104 HTML category; Data
Saving Mode opens its revision 105 HTML category. Neither adds a duplicate autoplay/mute/quality policy.
The embedded preview suppresses duplicate inner navigation and uses the outer shared shell.
Native storage, policy integration, accessibility, gesture arbitration and process restoration
remain unimplemented. Separate framing controls are selected; exact wording and native
geometry remain to refine.

### Video settings (single-page organization selected)

The selected Video organization is one scrollable page with **Playback** and **Autoplay**
section headings. It retains all 18 keys from `video_preferences.xml` in source order, with
the same initial values, list options and 0–100/step-1 sliders. Labels/summary presentation
are refined without renaming native keys. Source defaults are examples for an unused fixture;
existing users' native values must be retained, not overwritten by these defaults. Feed
Video Autoplay starts at Never in source XML; explicitly opened full-screen playback and the
accepted eligible Vertical autoplay contract are distinct and still need native integration.

The 12 switches, four lists and two percentage sliders update page-memory account/Guest
fixtures only. All 18 source keys are account-scoped in `AccountScopedKeys`. Native preference
wrappers, EventBus updates, media eligibility, provider access, network and lifecycle handling
are unchanged. Back retains local values and restores the prior Settings row/scroll. Entry
from the Vertical editor uses its unapplied-change guard and returns to the same editor
controls/draft and triggering row; the media iframe is reconstructed, not native post/playback
restoration. No Video values are included in a saved custom layout. Data Saving Mode has its own revision 105 slice below; native Settings search/deep links
remain required later.

Single-page organization is selected; exact labels and native controls remain refinement work.
This is not approval of changed media defaults or a finished native form.

### Data Saving Mode (disabled options while Off selected)

The six fields reuse the Video control renderer: mode (Off / Only on Cellular Data / Always
On), two preview switches, Reddit and Redgifs resolution, and MLB bitrate. Keys, choices and
initial values come from `data_saving_mode_preferences.xml`; no stored native values change.
These keys are absent from `AccountScopedKeys` and remain global, including Guest. The page
therefore shows global scope and no account switcher. Its page-memory values are shared across
account fixtures, independently of Video's account-scoped values and saved layout snapshots.

The two preview switches retain `DataSavingModePreferenceFragment`'s mutual exclusion: enabling
one clears the other. Turning the mode Off retains child values. No network type is detected
and no media/network/autoplay policy is executed. Native EventBus and provider-quality behavior
must be retained later. The mode's source default stays Off; this is not a new data-use default.

**Selected:** keep the five child controls visible but disabled while Off, with an explanation,
so the options remain discoverable. The hidden comparison is retired; old `inactive` overrides
are ignored. Either non-Off mode enables the same retained fields. Group labels, helper wording and exact native rendering remain proposals.
Root and Vertical editor links open the same category. Editor entry retains its exit guard and
returns to its controls/draft; native media post/playback restoration remains unverified.

### Gestures & Buttons: media exit (selected; revision 107)

The first detailed gesture slice is Media, reached from a source-group navigation excerpt
(General, Gesture sensitivity, Media, Comments, Posts and Swipe actions). The other groups
remain route previews; this is not a complete gesture settings form or approved final menu.

**Selected mode distinction:** normal media previews opened from a thumbnail and Horizontal
swipe mode can close with a downward swipe, subject to the user's close setting. Vertical swipe
mode uses up/down for paging and must use the viewer Back button or Android Back to exit,
including at the very beginning. Gallery's Vertical viewer follows that rule and browses album
images before changing posts. There is no first-item downward-dismiss exception. This supersedes
the previous open question and deferred Horizontal dismissal mapping. Zoom/pan owns touches while
zoomed; existing open-sheet/zoom Back handling and restoration contracts remain required.

The HTML viewer now distinguishes normal preview / Horizontal / Vertical entry. Pointer swipes
exercise downward dismissal in normal and Horizontal mode, first-item clamping and subsequent
paging in Vertical mode, with dismissal blocked when zoomed or the close preference is Off.
The shared Settings preview forwards the account's close preference separately from layout
values; it is not part of Use/Save-as-layout snapshots. Other embedded header studies default
to normal preview; the standalone original media-direction study retains its Vertical meaning.

The Media preference keeps its existing opaque account-scoped key and source On default in
page memory, with Guest separate. Its new wording describes the selected direction. Native
readers currently cover image/GIF and Imgur media activities; applying this design consistently
to native video and post-paging viewers is future integration, not existing parity. No native
preference, player, API/access, eligibility, lifecycle or read/history policy was changed.

Browser pointer tests do not establish Android touch slop, gesture arbitration, Android Back/
predictive Back, restoration or accessibility correctness. **Next:** review General gesture
controls, then sensitivity, comment/post interactions and swipe actions. Preserve upstream
swipe-action/post-paging mutual exclusion and current preference ownership throughout.

### General gesture controls (volume placement selected)

General now presents seven source preferences in **Navigation**, **Bars** and **Volume keys**
groups. Their stored keys, defaults and account ownership remain those in the opening section
of `gestures_and_buttons_preferences.xml`; the labels are refined for readability. Bar locks
start Off, retaining the accepted hide-on-scroll default. Pull to refresh and supported swipe-
right Back start On. The post-details swipe preference starts Off and is explicitly labelled
as post-details navigation, not an additional Horizontal feed layout.

Enabling Swipe between posts retains the native requirement to turn off post/comment swipe
actions. The shared gesture fixture contains that coupling; detailed action forms remain for
later review. It does not operate a real pager, app bar, refresh, device volume button or native
preference. General and Media use one lazily initialized per-account gesture buffer, adding
missing source defaults without overwriting another gesture page's existing values. Guest is
separate. Other Settings categories and saved layout snapshots keep their existing ownership.

**Selected:** keep the two independent volume-key controls together once in General.
The source XML repeats these same keys under Comments and Posts; the redesign should not show
duplicate controls or invent new stored keys. Grouping and exact labels remain proposals;
source defaults are fixture initial values, not approval to overwrite existing users' settings.

### Gesture sensitivity (three-step sliders selected)

Four source preferences now share the per-account gesture fixture: tab switching, swipe-right
Back, comment swipe actions and drawer swipe area. General's selected volume controls are not
duplicated on later Posts/Comments forms. Sensitivity retains the native keys, three choices
per field and starting values (tab Low, Back Very Low, comment actions Low, drawer Default).
This distinction matters: source arrays label their first sensitivity preset Default even
though it is not the fresh default of those three fields. The proposal calls that preset
**Standard**, preserving its exact value; the drawer still offers Default / Large / Very Large.
Exact native labels remain to refine, and existing users' preferences must not be reset.

**Selected:** use three-step sliders for all four fields. The menu comparison is retired;
old review overrides are ignored. Sliders preserve the same discrete native values, using
Very Low → Low → Standard for sensitivity and Default → Large → Very Large for drawer area.
The position is an index, not a replacement native value; accessible value text names the
current choice. No continuous/common numerical sensitivity scale or changed default is added.

The controls do not tune browser recognition, native touch slop, Slidr, comment gestures or
drawer width. Browser access was disabled for revisions 109/110; source/mapping/syntax/reference
and HTTP checks are current, while visual/responsive/theme/interaction checks were not run.
Prior browser checks remain historical. Native controls and device feel still need Android review.

### Comment gesture controls (named touch selector selected)

Comments presents three existing account-scoped preferences: lock the jump-to-next-top-level-
comment button, its scroll-hide direction, and tap/long-press swapping. Volume-key navigation
stays only in General, as selected. Values join the same per-account gesture buffer; Guest
remains separate. Source defaults stay false / false / true. Locking the jump button disables
the scroll-hide control in this proposal, retains its value, and re-enables it when unlocked;
native Settings currently hides it. This follows the selected discoverability direction but
is a presentation proposal for this control, not a native change or global gate override.

Direction wording is grounded in `ViewPostDetailFragmentNew.onScrolled`: with the button
unlocked, true hides it toward earlier comments and false hides it toward later comments;
the end-of-list path and other native FAB visibility rules remain distinct. The HTML form
changes no real scrolling or button behavior.

**Selected:** replace the relative “Swap tap and long press” wording with a
named selector: **Tap to collapse/expand** / **Long press to collapse/expand**. It maps to the
existing boolean (`swap_tap_and_long_in_comments`: true / false), not a new list/string preference.
The Swap comparison is retired; old `tap-control` overrides are ignored. The explicit top-right −/+ branch
control remains available in either mode. Toolbar behavior retains its independent setting;
link/spoiler handling and text-selection priority remain native contracts. Inline Reply/Edit
and draft decisions are unaffected. No comment/post action is executed by these settings fixtures.

### Post gesture settings (layout selector selected, revision 112)

The two existing shared post long-press preferences remain together and visible: text/non-media
area and media preview, each retaining None / Show Post Options / Preview in Fullscreen and
source default Show Post Options. They retain their original account-scoped keys and shared
ownership. No new per-layout preference namespace or saved-layout property is introduced.
Volume-key navigation stays only in General.

Layout-specific guidance follows these shared fields. The selected **layout selector** shows
Large card, Compact card, Gallery or Vertical swipe one at a time. The all-sections comparison
is retired and old `post-controls` overrides are ignored. Shared fields remain visible once.
The selector is per-account fixture view state only. Editor links
use the existing Settings navigation stack and active account; this new path has not yet had
browser interaction/restoration verification.

The guidance preserves selected intent: Compact long press reveals its customizable in-card
toolbar; Gallery media tap opens its viewer and long press opens details; Vertical taps reveal
controls and swipes page posts. Native Compact toolbar overrides and Gallery's existing
`click_to_show_media_in_gallery_layout` must be mapped explicitly, preserving existing users'
choices. These shared controls must not silently undo accepted layout gestures, nor may the
layout labels imply new native ownership or removal of existing overrides. Full precedence/
legacy migration and media-versus-body behavior remain native integration work.

This page changes fixture values only; it executes no More action, fullscreen preview or read
marking. Existing account, read/history, API/access and media-policy side effects remain required.
The selected presentation has source/syntax/reference/HTTP checks only while browser access
is disabled; visual/responsive/theme and editor Back/guard paths remain unverified.

### Swipe-action settings (both side sections selected, revision 113)

Swipe actions now opens separate Post swipe actions and Comment swipe actions, followed by
shared Threshold (30% default; 35%/40% available), Haptic feedback (On) and Disable swiping
between tabs (Off). All 19 existing source keys stay account scoped, including Guest.
Posts and comments have independent enable switches, both Off by default. Enabling either
clears post-details Swipe between posts; enabling that setting clears both action switches.

Each post side retains four action levels; each comment side retains three. Left side means
the row edge revealed by dragging right, and Right side means the edge revealed by dragging
left. First defaults are Downvote on the left and Upvote on the right; deeper levels are None.
Preserve exact action IDs, per-surface action lists and the existing side migration. Post swipe
actions remain limited by native feed applicability, including the single-column restriction;
these forms add no new applicability to Gallery, Vertical swipe or post details.

Both side sections on one scrollable page are selected. The compact-side-selector comparison
is retired and old `swipe-sides` overrides are ignored. No side-selection preference or
saved-layout field is introduced.
Mappings remain visible but disabled when their surface's enable switch is Off; values are
retained. Controls reuse shared theme roles, labels and target sizes. The forms execute no
vote/save/read/reply/share action and do not simulate swipe thresholds, haptics or tab gestures.
Browser rendering, large text, themes, keyboard, account retention and Back paths are unverified
while browser access is disabled. Native gesture/accessibility verification remains later work.

### Fonts (sample above controls selected, revision 114)

Interface → Fonts now opens three groups: General, Titles and Content. The six existing
font-family/size lists retain their source values/defaults and account-scoped preference keys.
Each family list retains all 17 source choices, including Custom. General/Title sizes retain
five presets; Content retains its sixth, Enormously large. A separate Choose font file route
appears only for Custom in each group, retaining the three existing custom-font identifiers.
These routes announce a fixture destination; they do not open a picker or import files.

A compact sample above the controls is selected. The separate-screen comparison is retired;
old `font-preview` overrides are ignored. Existing direct Preview study links remain readable.
Samples adjust approximate role-specific sizes in page memory. They
do not load or imitate Android's bundled/custom typefaces or apply typography throughout the
app. General, title and content values remain separate and outside saved layouts; workbench
large text remains an independent review setting. Native resource geometry, inheritance,
recreation, file validation/copy failures and font application must use existing mechanisms.
The page is a navigation/preview proposal, not approval of a new font engine or shipping sizes.

New rendering, themes, large text, keyboard, account retention and Back paths are unverified
while browser access is disabled.

### Navigation drawer settings (section selectors selected, revision 115)

Interface → Navigation drawer now opens Account header, Sections and Quick toggles groups.
The fourteen source Boolean keys/defaults stay in the existing whole-file account-scoped
drawer namespace, with Guest isolated. Avatar side and karma visibility remain unchanged.
Theme and NSFW quick-toggle visibility default On; thumbnail-side and Resume toggle visibility
default Off. These switches control visibility, not the underlying theme/content/media policy.

The selected section selectors use Expanded / Collapsed for Account, Reddit, Posts and
Preferences. Favorite subreddits and Subscribed subreddits additionally offer Hidden, mapping
to their existing separate hide keys. All six start Expanded from the source defaults.
Choosing Hidden retains the underlying collapse value; choosing Expanded or Collapsed makes
the section visible and explicitly sets its collapse flag. No new storage enum or new hide
capability is introduced. The separate-switch comparison is retired; old `drawer-controls`
overrides are ignored. The fourteen original Boolean preferences remain the storage contract.

The source fragment dispatches existing avatar/karma events and deferred section-change events
after preference persistence. Retain those owners and active-account behavior in native work.
This HTML form only changes page-memory values, without changing the shared drawer fixture,
account header/switcher, actual quick toggles or subscriptions. It does not execute an event,
account switch, network call or native preference write. The selected Continuum-like grouped
drawer design remains; this comparison is about its Settings controls.

Source/syntax/reference/HTTP checks are separate from browser verification; rendering,
themes, large text, keyboard, account retention and Back remain unverified while browser
access is disabled.

### Home feed tab settings (inline list selected, revision 116)

Interface → Home feed tabs represents the row above the feed (Home / Popular / All initially),
separate from the accepted shared Home / Saved / Search / Inbox / Profile bottom navigation.
The ordered tab list on the same settings page is selected, between Show feed tabs and the
six existing list-source visibility switches. The separate-editor comparison is retired;
old `tab-editor` overrides are ignored. Earlier direct editor links remain readable. Up/Down
moves provide accessible ordering controls; source drag refinement remains native work.
Per-row Options opens its proposal below; the Add chooser is described below. No
restricted tab-type inventory or new add/rename/delete behavior has been approved by this slice.

Preserve the existing seven account-keyed Booleans in the tabs preference file: Show tab names
controls bar visibility and defaults On; six list-source switches default Off. Preserve the
variable-length ordered list, per-item type/name/source/displayName/customTitle, all current
add sources (including random/picker variants), rename/delete guards, legacy migration and
native live-source merging. Toggle-sourced individual tabs retain provenance and ordering;
disabling a group removes its items, and unloaded live data must not erase valid saved tabs.
The HTML fixture loads no live list data; source switches update only form values and add no
synthetic list items. Guest buffers stay isolated and no real account or subscription is read.

Native changes currently persist through existing owners and restart once when leaving the
changed tab-settings screen. A conditional restart notice illustrates that requirement; HTML
Back navigates locally and never restarts an app. This placement review does not approve
changing persistence, restart, account copy/reset or restoration semantics. Tabs remain outside
saved feed layouts, and their account settings copy/reset rules stay intact.

### Add Home feed tab (grouped chooser selected, revision 117)

Add tab opens the selected grouped chooser with brief route descriptions: Feeds, Subreddits,
Multireddits, Users and Account feeds. The plain-list comparison is retired; old `add-tabs`
overrides are ignored. Exact wording/geometry remain refinements; existing native
`showAddTabDialog` still uses a list dialog until later Android work.

Preserve all sixteen signed-in choices: Home, Popular, All, Subreddit, Subscribed subreddits,
Random subreddit, Random subscribed subreddit, Random NSFW subreddit, Multireddit, User
multireddit, User, Upvoted, Downvoted, Hidden, Saved posts and Saved comments. Guest omits the
same five account-only choices (Upvoted through Saved comments), retaining the other eleven.
Do not turn the three random variants into new native post types; retain existing pseudo-
subreddit names and refresh behavior. Subscribed subreddits/own multireddits use native pickers,
while Subreddit/User/User multireddit retain their source name/path entry routes.

Subreddit, User and User multireddit now open the name-entry proposal below. Other choices
still announce their next route and add no tab; no real picker or live lookup runs. Modal
labels, a scrollable choice region, fixed Cancel, native dialog Escape behavior, focus return
and protection against underlying Settings Escape navigation are included in the HTML. None
has fresh browser verification while access is disabled. A direct `open=add-tab` review link
opens the chooser; no native authentication, account lookup, API call or persistence occurs.
Native duplicate checks, empty-name/duplicate submit guards, source picker loading/empty states,
rename/reset-name, move-to-top/bottom, user-only delete and at-least-one-tab guard remain required.

### Add tab name entry (same sheet selected, revision 118)

Subreddit, User and User multireddit use their existing source type IDs (3, 5 and 4) and source
name/path conventions. Continuing inside the same bottom sheet is selected. The centered-
dialog comparison is retired; old `tab-name` overrides are ignored. Keep the labeled field,
permanent hint, inline duplicate message and Back / Cancel / Add tab actions. Android
IME-on-open policy and keyboard/insets correctness remain for native review.

Blank trimmed input and case-insensitive duplicates of the same type disable Add. The fixture
retains the entered name/path without prefix stripping, path rewriting, server validation or
new syntax rejection; source only trims and checks identity at this step. A successful Add
appends a user-source record to the current account's page-memory ordered list, retains other
accounts' fixture values, shows the source restart notice and closes the chooser. There is no
native preference write, app restart, Reddit lookup or subscription/follow operation. Multireddit
display-name derivation follows the inspected helper for these user-entered fixture paths;
native rendering/restoration must still reuse `MainPageTabsUtils`.

Back (or Escape at the name step) returns to the chooser and restores its scroll/choice focus,
clearing the unsent name. Cancel closes without adding. These are proposed staged navigation
behaviors, not evidence of Android Back or saved drafts. No draft store is added. DOM row focus
keys now include type/name identity so several subreddit or user tabs can be distinguished;
these are not native stable tab IDs. Options opens its proposal below. Other Add
choices and native live-source merging remain separate review/integration work. The two
picker proposals are described below.

### Add tab list pickers (visible filter selected, revision 119)

Subscribed subreddits and Multireddit now continue in the same Add tab sheet with synthetic
candidate lists. A visible labeled filter field is selected; the plain-list comparison is
retired and old `picker-filter` overrides are ignored. Filtering is local to available candidates,
matching subreddit names or multireddit display names/paths without changing their order.
It performs no Reddit search, API call, lookup, subscription or follow operation.

Tap a candidate to append a user-source record to the current account's page-memory tab list,
then close. Subreddits retain type 3/name/source 0; owned multireddits retain type 4/raw path/
displayName/source 0. These are individually added tabs, not toggle-sourced entries. The same
case-insensitive/type-aware duplicate guard applies; the proposal shows Already added and
disables duplicate rows, whereas native currently checks on selection and gives a toast.
That feedback detail is provisional. Native candidates must still come from the existing
account ViewModels; the HTML's twelve subreddit and six multireddit examples are not user data.

Guest starts with empty fixture lists, and `picker-state=empty` demonstrates the same state
for either picker. This is fixture data only, not a new Guest eligibility rule. Preserve native
Guest/local-data mechanisms and the current missing/unloaded/empty list guard. No loading,
retry, sign-in or backend mechanism is invented. A nonempty list filtered to zero matches
shows a separate no-match message. Back/Escape returns to chooser scroll/choice focus; Cancel
closes without adding. Filtering starts unfocused; Android IME behavior remains unverified.
Native lifecycle, account updates and source merging are not established by these fixtures.

### Home feed tab Options (visible Remove selected, revision 120)

Each Home feed tab row's Options button now opens a sheet with Rename, conditional Reset
name, Move to top and Move to bottom. Existing Up/Down controls remain accessible on the
row; native drag and long-press entry remain required for Android refinement. Boundary moves
are disabled in the HTML; native popup commands currently no-op at those boundaries.

A visible Remove action on each user-added row is selected, matching the source arrangement.
Remove is omitted from Options; the inside-Options comparison is retired and old `tab-remove`
overrides are ignored. Reject removing the final tab and omit removal for toggle-sourced rows. These
rows must instead be managed through their existing list-source switch; no new removal
capability or preference key is introduced. Remove affects only the page-memory tab list.

Rename continues within the Options sheet. Saving trimmed empty text or the exact computed
default clears customTitle; another name sets that override without changing feed type/name/
source or identity. Reset name is shown only when an override exists. Display-name duplicates
are allowed, as in source; no feed change, server rename or lookup occurs. Rename/Reset/moves/
Remove update the existing account fixture order and source-style restart notice, never native
preferences. No new saved-layout field, native stable-ID scheme or restart mechanism is added.

`tab-scenario=last`, `renamed` and `group` are explicit review fixtures for the last-tab guard,
conditional Reset and source-provided rows. They initialize only an empty page-memory account
buffer and do not replace native accounts or user tabs. Options resolves the current item
before mutating; stale items and invalid removals are rejected. Cancel closes without saving
an open rename; Back/Escape from Rename returns to Options. Close returns focus to the row's
current Options button, or another surviving row after removal. These focus/navigation paths
remain unverified in a browser. Exact sheet geometry and disabled-action feedback are proposals.

### Bottom navigation settings (shared default with overrides selected, revision 121)

Interface → Bottom navigation starts with the accepted Home / Saved / center Search / Inbox /
Profile default. Its hide-on-reading/return-on-upscroll behavior remains selected. Assignment
changes in the editor below update only its page-memory previews, not the shared shell.

One Default bar with optional Other pages customization is selected. Use the same bar on
other pages starts On in fixtures; Off reveals an Other pages bar editor. The always-separate
comparison is retired and old `bottom-scope` overrides are ignored. Other pages includes the
source subreddit, multireddit and user detail readers. Both buffers start with the accepted
default; they do not load real inherited action assignments. Customize now opens the editor
below. Separate override values survive switching shared mode On and Off.

Native `CustomizeBottomAppBarFragment` currently has separate Home/Other-page integer slots:
2 or 4 outer actions, four retained assignments and a center/FAB choice in each context.
Keep all existing action choices, Guest restrictions, account-scoped ownership, retained hidden
slot values and existing enable/visibility/event/restoration mechanisms. Do not silently merge,
reset or overwrite existing separate configurations when introducing the new shared default.
Any later shared mode must retain a separate override so existing choices can be recovered;
preference/migration design and the five-destination structural mapping are not implemented.
The HTML scope switch is not a native preference and never updates the actual shared shell
or saved feed layouts. Native defaults are not inferred from the specimen values. Existing
customization remains required.

### Bottom-navigation button editor (preview targets selected, revision 122)

Default and Other pages use the selected preview-button edit targets, opening a destination/
action chooser. The permanently visible selector comparison is retired and old `bottom-controls`
overrides are ignored. Account/context buffers, symbolic choices and immediate page-memory
updates are retained. Back uses the
existing Settings stack and restores the Customize row. No native action executes and no
Android preference, feed layout or live shared shell is changed.

Outer choices retain the twenty semantic entries in the source Other-pages action list,
including the accepted five navigation/Search defaults. The new shell also needs Home on the
main page; source main/other integer indices are not interchangeable. Center choices retain
the source ten actions (eight for Guest), with Search the selected default. Duplicate
assignments remain allowed, as source does not enforce uniqueness. The five-button default
remains selected. The count/retained-assignment presentation is described below; native
integer mapping and migration remain pending.

Guest keeps the source outer-command allowlist and omits private account commands. The three
additional accepted shell destinations remain represented: Saved uses the device-local route;
Inbox/Profile are sign-in entry routes, labeled accordingly in choice controls. They add no
Guest API permission. The actual Guest action dispatch/auth/access/local-data contracts still
require existing native owners. These semantic fixture choices are not a numeric migration
or a fix for the recorded Guest FAB index inconsistency. Icon artwork remains deferred.

Default and Other-page arrays are independent, remain separate across scope switches and are
isolated from Guest/other accounts. Invalid positions, scopes and unavailable choices are
rejected before a fixture assignment. Center choices use their own capability mask. The
chooser has selected-state labels, Cancel, modal Escape protection and focus return to the
updated preview button; browser verification of those paths is unavailable.

### Bottom-navigation counts and retained assignments (expandable group selected, revision 123)

Buttons in bar offers 5 buttons (four sides plus center) and 3 buttons (two sides plus center),
using the source integer outer-action values 4 and 2. Five remains the accepted default. This
is clearer counting in the UI, not a new native count value or a three-button default decision.
MainActivity and the subreddit reader bind source options 1/2 in two-side mode; options 3/4
are only read in four-side mode. The fixture therefore shows side 1 / center / side 2 with
three buttons, retaining side 3/4 in their original independent assignments. It does not pick
arbitrary physical edge slots, swap the center or truncate the stored five-value fixture array.

In three-button mode, the selected presentation keeps the other two assignments inside an
initially closed Buttons not shown (2) group. The always-visible comparison is retired and old
`hidden-buttons` overrides are ignored. Assignments remain editable using the selected
tap-to-choose interaction, and all values restore when returning to five buttons. Expanding is an accessible native HTML details/summary control;
its open state is retained during an assignment update so focus can return to an exposed button.
No extra configuration preference or native disclosure behavior is established by that fixture.

Counts are per account/default-or-other context, independent from the assignment arrays and
shared/override view state. Invalid scope/count requests are rejected. A `button-count=3` link
initializes only the current review buffer once; manual count changes are not reset by later
rendering. Native count and hidden integer slot ownership, persistence, restoration, migration
and Guest numeric mapping still require existing Android mechanisms. The shared shell is not
updated and no assignment action is executed by this slice.

### Time format (Show elapsed time switch selected, revision 124)

Interface → Time format preserves the source `show_elapsed_time` Boolean (false) and
`time_format` pattern ("MMM d, yyyy, HH:mm"), with all 23 source patterns in order. Values remain
account scoped, including a separate Guest fixture. The selected presentation uses Continuum's
Show elapsed time switch. The named-selector comparison is retired and old `time-control`
overrides are ignored. This changes no Boolean meaning or default. The date-format picker remains editable in either mode, as in source.

An inline preview shows the selected style for a fixed English timestamp, using source patterns
and illustrative elapsed text. It is not a locale-aware Android formatter, live clock or a
new timestamp policy. The two controls update only page-memory values; no feed is reformatted,
preference persisted or native change event dispatched. Back uses the existing Settings stack.

### Post-details settings (four media switches selected, revision 125)

Interface → Post details now presents all twelve source preferences in Post information,
Embedded media, Landscape and Continuity groups. Their keys/defaults and source scope remain;
post-details values belong to the separate account-scoped file, even where feed preference
names match. These are form fixtures, not a live post-details editor. Exact grouping, labels,
native geometry and tablet adaptation remain proposals.

For embedded media, four switches are selected: Images, GIFs, Emotes and Comment faces
(subreddit stylesheet images). The combination-menu comparison is retired and old
`embedded-control` overrides are ignored. These represent the existing encoded
`embedded_media_type` value, default All (15).
Legacy values are named combinations rather than raw flags; preserve their meanings. No new
media preference keys, autoplay, data saving, NSFW or content policy is introduced.

Landscape splitting retains its source On default and autoplay warning. Side swapping stays
visible but disabled while splitting is Off, retaining its value. This preserves the setting;
it does not approve a tablet shell or supersede the full-post-then-comments phone direction.
Cached comment threads retains string default 10 and native nonnegative signed-Int validation,
including zero; invalid input announces feedback and keeps the last valid fixture value. The
HTML never creates, evicts or clears a native cache. Native memory/performance and restoration
remain implementation work.

### Comments settings (single divider selector selected, revision 126)

Interface → Comments now presents the twelve source preferences in Appearance, Thread display,
Toolbar and Embedded media groups. Keep their existing account/default-file scope and source
values; Post details' similarly named media key belongs to a different file. Both pages reuse
one four-switch renderer and legacy-code mapping, with separate buffers. No source preference
is deleted or remapped. Comment gestures remain in Gestures & Buttons, and the study 04 explicit
−/+ collapse control, selectable text and hidden-action direction remain. This form does not
approve replacement native defaults or modify a comment tree/toolbar/media renderer.

For dividers, the selected presentation combines Show comment divider and Divider type into one selector:
Off / All comments / Top-level only. These map to the existing Boolean and 0/1 string; Off
preserves the stored type. The switch-plus-type-menu comparison is retired and old
`divider-control` overrides are ignored. This introduces no additional preference or changed
separator policy. Labels,
section grouping and final native layout remain proposals.

### Sort Type settings (visible-disabled ranges selected, revision 127)

Settings → Sort Type presents all eight source preferences in Post feeds, Subreddits, Users
and Comments groups. Preserve the existing account/default-file keys and values: remembered
post/comment sorts On; subreddit Hot, user New, both ranges All Time; comment Best
(CONFIDENCE); subreddit recommendation Off. Source choices remain five subreddit sorts, four
user sorts, six ranges and six comment sorts. No comment time-range setting is added.

The selected presentation keeps subreddit/user time ranges visible but disabled unless the
corresponding sort is Top or Controversial. The hidden-range comparison is retired and old
`sort-range` overrides are ignored. The chosen range is retained when inactive, including
across local Back/account changes. The
native Settings XML currently leaves those lists editable regardless of sort; these alternatives
are presentation proposals, not source behavior or new preference values. Remember switches
remain independent; turning them Off does not reset defaults or ranges in the fixture.

This form does not load, erase or write existing per-feed sorting records, change a feed,
perform a request or implement recommendation precedence. Preserve PostFragment's saved/default
and changed-default ownership, and the comment view model's saved/recommended/default tiers.
Exact wording, grouping, migration and native rendering remain later review work. Interface's
remaining controls/platform-gated subpages are still pending; this slice does not complete it.

### Remaining Interface screen (five inline groups selected, revision 128)

The [full Interface proposal](prototypes/relaxe-exploration/settings.html?rev=128&page=interface&focus=1)
uses five groups: Appearance (Fonts, Time format); Navigation (drawer, Home feed tabs,
bottom-navigation editor, Hide floating action button, Enable bottom navigation, default
search result tab); Posts and comments (the three existing child pages, hide subreddit
description, vote-button side, exact vote counts, available-space toolbar behavior); Viewing
(Lazy Mode interval and Shadowbox filtering); Display (Immersive interface and refresh rate).
It reuses the selected switch/list patterns without reopening the accepted child screens.
The user selected keeping all five groups inline. Do not reopen the inline-versus-child-page
comparison. This accepts the screen organization; browser checks and native compatibility
mapping remain open, so it does not establish complete Interface implementation or verification.

Audit: `interface_preferences.xml` has ten value controls beyond the previously represented
routes. All ten keys/defaults are retained in the fixture: hide FAB false, bottom bar false,
hide subreddit description false, search Posts (0), Lazy Mode 2.5 seconds (all seven source
choices), Shadowbox filter false, votes-right false, full vote counts true, space-based
items false and maximum refresh false. `Utils.getNVotes` confirms that “absolute” means
full integer counts rather than abbreviated counts. Search retains Posts/Subreddits/Users
and native explicit-tab precedence (`SearchResultActivity`). Lazy Mode interval does not
enable auto-scrolling; Shadowbox filtering remains distinct from Gallery's Media only and
Vertical swipe. This study does not change any feed, action, media policy or search result.

`InterfacePreferenceFragment` exposes Immersive interface at API 26+, with the source two
switches: `immersive_interface` true and `disable_immersive_interface_in_landscape_mode`
false. Both remain independently editable, including while immersive mode is Off, matching
source. `BaseActivity` applies the landscape exclusion only when immersive is active;
this is existing system-bar behavior, not a new fullscreen/media mode. Its page-eligibility
contract remains. The refresh-rate gate is API 23, below the app's min SDK 24, so every
supported version retains that control; it requests a best-effort maximum, not a guarantee.
A workbench Android 7/8/16 fixture demonstrates the entry gate; an API-24 immersive deep
link returns to Interface. Account/Guest buffers are separate and page-memory only.
Native events, recreation, persistence, insets and platform behavior remain unimplemented.

**Compatibility conflicts remain explicit:** the accepted five-button shell specimen does
not establish a new value for the source bottom-bar switch (false). Preserve existing
Off/On values, independent Home/Other assignments and hidden slots. The source hide-FAB
switch (false) controls a floating action button; it must not silently hide the accepted
center Search destination. The source available-space switch (false) can hide existing
post/detail toolbar items at width thresholds, while the accepted feed study already fits
its selected actions to width. Retain that preference and resolve its exact native mapping
before implementation; do not turn it On or erase it to match the HTML. Vote-side and
subreddit-description preferences also remain contracts for later renderer integration.
The Guest FAB index discrepancy and integer assignment migration remain open. No default,
preference or live shared shell changes when these form controls are edited.

Revision 128 syntax, source key/default parity, lightweight DOM-model switch/select changes,
rerender retention, Guest isolation and served-asset checks passed. These are not browser
interaction or layout checks. Browser opening was rejected because local browser use is
disabled in Work settings. Light/dark/AMOLED/custom palettes, 360px/landscape/wide layouts,
100/130/200% text, focus, keyboard and contrast need browser review when available; Android
accessibility, restoration and performance require later native verification. No Gradle run.

### History and Recently Visited settings (Off-and-clear confirmation selected, revision 129)

The user selected revision 128's five inline Interface groups. Revision 129 advances to the
[Post History form](prototypes/relaxe-exploration/settings.html?rev=129&page=history-settings&focus=1)
and [Recently Visited form](prototypes/relaxe-exploration/settings.html?rev=129&page=recently-settings&focus=1).
Both remain separate account-scoped root categories, consistent with the existing History
and Recently visited design contracts above. They use a small page-memory fixture module,
`settings-history.js`; no native preferences, read records, stored visits, events or APIs change.

Post History presents all nine `PostHistoryFragment` values: Save read posts Off; after-vote
and on-scroll marking Off; automatic hiding and its additional subreddit/user/search scopes
Off; history limiting On, target 500. Recording, Automatic hiding and Storage are the proposed
screen groups. Reuse the selected visible-disabled pattern: marking/hiding dependencies stay
visible while recording is Off; extra hiding scopes require both recording and automatic
hiding. Values survive toggling parents, local navigation and account changes. Native source
hides these dependencies; the proposal changes discoverability without changing values or
read/hide eligibility. The independent limit switch remains usable with recording Off. The
proposal consistently shows its number field, disabled only when limiting is Off; source's
number-field visibility depends on `updateOptions` and recording state. This is presentation,
not a new dependency or retention policy. Storage is not a new clear-history action.

The limit saves already-valid numeric input in the fixture as it is typed, then settles on
blur/Enter like source: blank/unparseable becomes 500, below 100 becomes 100, above signed-Int
maximum is capped. Preserve the native numeric keyboard, ten-character input, focus/IME Done
handling and actual persistence in later implementation. Batch trimming means this target
is not a strict maximum after each insertion. Existing Guest saved/voted/hidden record-type
limit handling remains authoritative. Turning recording Off does not purge existing history.
Clear remains in existing Account Settings Management; the fixture adds explanatory text,
not a new operation or merged history store. Media-open recording coverage stays as approved;
no passive-autoplay or repeat-visit timestamp policy is added.

Recently Visited keeps the single `_recently_visited_enabled` Boolean, Off by default, and
source explanation that Off clears the current account's visited subreddit/user rows. The
existing recorder keeps 50 per type, applies its subscription/follow/save/own-profile/pseudo-
subreddit exclusions and records only after data loading. Keep these existing mechanisms;
there is no new pause-without-clearing mode, separate Clear action or per-row deletion.

**Selected:** confirmation before Recently Visited Off-and-clear. The source immediate-Off
alternative is retired. On is immediate; attempting Off leaves On until “Turn off and clear”
is confirmed. The prompt identifies the account (including Guest) and explains that turning
On again will not restore cleared visits. Cancel/Escape keep On and return focus to the switch.
Confirmation changes only the fixture flag and announces that no actual stored visits were
deleted. The dialog protects the underlying Settings Escape/Back handler. Preserve the source
account-scoped purge on eventual native confirmation; no pause-without-clearing mode is added.
The user’s choice selects this interaction, not native persistence or deletion correctness.

Current checks: JavaScript syntax; all ten field keys/defaults against source fragments and
constants; lightweight DOM-model dependency/retention and account isolation; numeric boundaries
250, 2, empty, signed-Int overflow, ten-digit overflow and invalid text; Recently Visited
On/Cancel/Escape/confirm and focus callbacks. Five served revision-129 assets match workspace
bytes through the existing tailnet route. These are model/source/serving checks, not browser
layout or native coverage. Browser access is disabled; responsive light/dark/AMOLED/custom,
100/130/200% text, keyboard/focus, modal scrolling and contrast checks remain pending. No Gradle.

### NSFW/spoiler and filter workflows (source organization selected; revision 131 branding correction)

Recently Visited confirmation before Off-and-clear is selected; no decision there remains.
The [NSFW/spoiler form](prototypes/relaxe-exploration/settings.html?rev=130&page=content-settings&focus=1)
reuses existing switches and visible-disabled dependencies without asking another routine
control-pattern question. Four source values remain independently account scoped: NSFW Off,
blur NSFW On, do-not-blur-in-NSFW-subreddits Off, spoiler blur Off. NSFW's two blur choices
stay disabled while NSFW is Off and retain their values; native hides them. The subreddit
exception remains editable whenever NSFW is On, including when general NSFW blur is Off,
as source does. Spoiler blur stays independent. These controls never fetch/reveal media,
change a feed or override global/API/content eligibility.

`NsfwAndSpoilerFragment` shows a noncancelable entry warning on page creation, before changing
these settings. Revision 131 retains the entry interaction and four preferences, but corrects the product
wording to Relaxe for Reddit and uses a separate Relaxe privacy-policy draft, as requested
by the user. Copy must not carry the upstream brand or substitute its policy/repository for
Relaxe’s own policy. The unsupported inherited prediction that NSFW content is “unlikely”
is replaced by a neutral access-rules statement. The Reddit User Agreement remains a separate
external link. Agree acknowledges only the synthetic warning and returns focus to the NSFW
switch; Do not agree goes Back.
Escape does not accept or close it. There is no stored legal acceptance, real account write,
new access approval or Reddit request. The Relaxe policy is explicitly a non-effective draft; no agreement is submitted or persisted.
Final policy content, release URL and native resolution remain later work.

Historical revision-130 filter navigation studies used synthetic rows and route announcements,
not operational editors (superseded by the revision-132 editable forms below):
[Post Filter](prototypes/relaxe-exploration/settings.html?rev=130&page=post-filters&focus=1),
[Comment Filter](prototypes/relaxe-exploration/settings.html?rev=130&page=comment-filters&focus=1),
[post editor structure](prototypes/relaxe-exploration/settings.html?rev=130&page=post-filter-editor&focus=1)
and [comment editor structure](prototypes/relaxe-exploration/settings.html?rev=130&page=comment-filter-editor&focus=1).
The list → options → editor paths follow source. Post options has Edit/Delete; Comments also
has Apply to, continuing to its separate subreddit-assignment page. Empty-list fixtures use
`filters=empty`. Create announces the existing empty-name editor route; it does not prefill
a new named filter from the synthetic example. Delete/Save/Add/Edit rows announce route
previews and mutate no filter, rule or assignment. Do not call these complete filter forms.

Source-backed workflow boundaries:
- Named filters and usage rows are owned by account, including Guest, with account/name keys;
  do not turn them into one global filter or use a saved layout to own their state.
- Post editor order is Name, Rules, Applies to, Post types, Show only and Limits. Source rule
  terms cover subreddit/user/flair/domain/title keyword/title regex, each include/exclude;
  rule-list filtering is display only. Preserve source regex replacement/validation,
  duplicate-term handling, removal/Undo, wildcard/plain-rule restrictions, ContinuumAll pinning,
  blocked-subreddit counts/exceptions and legacy stored-column mapping. No browser evaluator
  establishes matching correctness. The stored model includes legacy NSFW/award fields, but
  the current source editor exposes six post types, Only NSFW/Only spoilers, and vote/comment
  range fields. It does not expose Allow NSFW or award controls. `constructPostFilter` clears
  the legacy award bounds on Save; the redesign must follow the current source behavior
  rather than turn every model column into a new UI control.
- Post assignments are in the editor for saved Settings filters; the transient one-feed filter
  path omits stored targets. Preserve that distinction. “All feeds” is a display grouping for
  Home plus all subreddits, users and multireddits (four stored usage rows), not every usage
  type. Search, History, Upvoted, Downvoted, Hidden and Saved retain separate types. Empty names
  and `NO_USAGE` scope, Guest restrictions, pickers and the read-history discriminator remain
  authoritative native contracts.
- Comment editor retains Name, excluded comma-separated text/users, Remove (0)/Collapse (10)
  and two vote bounds. Comment text uses case-insensitive substring matching, users exact
  case-insensitive matches, and only positive vote bounds apply. Do not copy post regex,
  include/exclude rule capabilities or post feed-type assignments into comment filters.
  The native comment Apply to screen manages subreddit usage separately from rule saving.
- Save requires a nonempty name and retains duplicate-name override, rename/usage ownership,
  result/failure and account boundaries. Contextual “add this post/author/subreddit to filter”
  routes retain existing seed/merge and return-to-reader behavior; Settings studies do not
  replace them. Source native save/delete/usage operations remain the future implementation
  owners. No new auto-save, merged transaction or destructive guard is approved here.

**Selected by the user:** retain the source organization with shared styling: post assignments
inside its editor, comment subreddit assignments on their separate Apply to screen. The
unified-comment-editor alternative is retired. Do not silently bundle comment usage writes
into rule Save/cancel. Full editor controls, rule and target sheets, failure/duplicate/dirty-
exit details remain subsequent review work; navigation studies do not establish their parity.

Revision 130 checks passed: four NSFW/spoiler keys/defaults against source; syntax of both
changed navigation/content scripts; lightweight DOM-model warning cancel/Agree/decline/focus,
four switch states, dependent retention and account isolation; filter list/options/editor/
target navigation callbacks; six served assets matched workspace bytes through the unchanged
tailnet preview. These are source/model/serving checks. Browser remains unavailable per the
last access result; no current responsive/theme/large-text/keyboard/contrast or real browser
modal checks are claimed. No Gradle or native verification. Whole-app styling stays in progress.

Next: refine the complete filter-editor workflows using the selected source organization,
then remaining miscellaneous/link and management/device Settings. Accounts/API access/onboarding,
themes, tablet/landscape and consistency/accessibility remain.

### Editable filter workflows (unsaved-exit guard selected, revision 132)

The [post editor](prototypes/relaxe-exploration/settings.html?rev=132&page=post-filter-editor&focus=1)
and [comment editor](prototypes/relaxe-exploration/settings.html?rev=132&page=comment-filter-editor&focus=1)
now use editable HTML forms and synthetic account-separated named-filter libraries, replacing
the old route-only editor outlines. The source organization remains selected. Root filter
lists support Create, Options, Edit and synthetic Delete; Comments keeps its separate Apply to
route. Create starts unnamed, without copying the existing example. Nothing writes native
preferences/Room, evaluates Reddit content, changes a feed or sends requests. Browser state
is page memory, not an approved persistence schema or new draft-recovery store.

Post form: Name; rule list with local Find rules; Applies to; six post-type switches; Only
NSFW/Only spoilers; Votes and Comment count range fields; Save. Rule search changes only
list visibility. Field/match/value sheets cover subreddit, user, flair, domain, title keyword
and title regex, with Exclude/Only include. Add/Edit trim rule values, reject blank/duplicate
terms, reject comma-separated storage terms and typed wildcard markers where source does,
and offer Exact/Starts with/Ends with/Contains for subreddit terms. Wildcard matches need at
least three characters. The model preserves plain/wildcard admission restrictions, including
same-kind edits to legacy mixed filters, one regex per polarity with explicit replacement,
and rule Remove/Undo. Wildcard additions pin targets; other target changes stay disabled until
wildcard rules are removed. `filter-rules=wildcard` and `mixed` are explicit synthetic fixtures.
No browser regex evaluator substitutes for Java `Pattern`: `filter-regex=invalid` demonstrates
source-style validation feedback, but arbitrary Java-pattern syntax still needs native checks.

The source scope `Constants.CONTINUUM_ALL_SUBREDDIT` identifies a registered placeholder whose
**post listing fetches r/all**, distinct from the ordinary All scope; About/Subscribe resolve
the placeholder name. It is not simply an ordinary subreddit post listing. The HTML shows
“All · wildcard filtering” as a neutral proposed display label while retaining the opaque
`ContinuumAll` scope value. No native target, Reddit name, API path, sorting key or stored usage
is renamed. Source/native display and navigation mapping must preserve that distinction;
the user's ban on upstream product branding does not authorize merging these scopes.

Post assignments have all eleven chooser entries (All feeds group plus ten source types),
with Home/Subreddit/User/Multireddit grouped expansion, blank names broadening only their type,
comma-split post names, case-insensitive duplicate suppression and read-history type identity.
Changes are staged with the post filter and committed by its synthetic Save. The native
pickers remain labelled route previews; no user/subreddit lists or live blocked-subreddit
records are loaded. Wildcard Blocked subreddits preserves its route for later scope/count/
exception verification, rather than inventing a second browser recorder.

Post numeric fields mirror `PostFilterRange` presentation: `100-5000`, `100-`, `0-5000`, bare
positive lower bound and empty/no-limit. Nonpositive or unparseable endpoints are inactive;
leading `-5000` gives the source missing-lower-bound hint and no limits. There is no new
minimum-less-than-maximum rejection. Current source shows no award limits and no Allow NSFW
switch; revision 132 corrects the revision-130 outline, which inferred extra controls from
legacy model columns. Native Save's legacy award reset remains authoritative.

Comment form: Name, comma-separated excluded text/users, existing user-picker route, Remove
(0)/Collapse (10), and minimum/maximum vote fields. It adds no post regex, wildcard or include
features. Positive bounds apply; empty maps to the native unset value. The HTML proposes
inline rejection of non-integer/out-of-Int input rather than reproducing a native parsing
exception. Text/name buffers remain separate from post filters and Guest. Post names trim on
Save; comment names retain source raw nonempty behavior. Duplicate-name replacement is exact
within the current account, with Cancel retaining input. `filter-save=fail` fails the first
synthetic Save without clearing input and lets retry succeed. No actual database failure or
transaction behavior is established.

Comment assignments change independently on their separate page, immediately in the synthetic
saved record. Source inspection found a native quirk: editing a usage inserts the newly named
row without deleting the previous key (`CommentFilterUsageListingActivity` +
`SaveCommentFilterUsage`). The fixture retains that behavior and explains it in the Edit
assignment dialog; Remove remains separate. Do not silently replace/delete the previous row
or treat this as an approved native bug fix. This source behavior needs a later explicit fix
review if changing it is desired. Empty comment target entry is refused; it is not broadened
to all subreddits like a blank post usage. Synthetic Delete removes that filter and its usages
immediately, following the existing native operation; no new filter-delete guard is selected.

**Selected:** Keep editing / Discard changes before leaving unsaved filter edits. The source
immediate-discard comparison is retired. Revision 132's Settings Back/Escape guard reuses
the other editor pattern. Keep editing retains input; Discard changes leaves without changing
saved criteria or staged post assignments. This selects the interaction, not native system
Back, process-death or arbitrary-navigation correctness. Cancel/Escape in a rule/target/replace
sheet closes only that modal and restores focus. Workbench account/auth/platform fixture
changes discard the unsaved editor buffer and return to root; they are not native account-
switch semantics. No new persisted filter-draft store is approved.

Revision 132 checks: syntax of Settings/content/new filters scripts; lightweight DOM-model
create/edit/save, duplicate replacement/cancel, failure/retry, duplicate rules, plain/wildcard
scope admission, regex replacement, list search, pin/remove/Undo, separate comment usage
append behavior, numeric errors/display mode, discard/cancel and Guest isolation. Ten range
examples/boundaries and legacy mixed-rule admission checked against source contracts. Source
inventory confirms six post types, two Show only fields and no current award UI. Eight served
assets matched workspace bytes; local references, modal-Escape integration and Settings Back
wiring checked. Browser opening was attempted again and returned “Local browser use is disabled
in Work settings”. No current rendered responsive/theme/large-text/contrast/keyboard/modal
proof, Android tests or Gradle run is claimed. CSS provides wrapping, explicit labels/focus
styles and minimum 48px controls, but actual accessibility remains to be verified.

Next: miscellaneous/link and management/device Settings are covered by revision 133 below. Keep full Java validation, live pickers/blocked lists, contextual seed/return
flows, storage/failure/restoration/account checks and actual Android behavior on the native
verification list; do not declare whole Settings complete. Policy draft remains pending its
operator/contact and release data-flow review.

### Miscellaneous, Device and management screens (revision 133 proposal)

Filter unsaved-exit confirmation is selected. The next grouped proposal covers
[Miscellaneous](prototypes/relaxe-exploration/settings.html?rev=133&page=misc-settings&focus=1),
[Device](prototypes/relaxe-exploration/settings.html?rev=133&page=device-settings&focus=1),
[Account Settings Management](prototypes/relaxe-exploration/settings.html?rev=133&page=account-management&focus=1),
[Global Settings Management](prototypes/relaxe-exploration/settings.html?rev=133&page=global-management&focus=1)
and [Backup and Restore route](prototypes/relaxe-exploration/settings.html?rev=133&page=backup-settings&focus=1).
Control definitions are extracted from source XML. Miscellaneous has eleven source values,
Device two; the account/global management screens retain ten/three actions, Backup/Restore
two routes. No native value, data, backup, credential or file changes. These are distinct
screens with their existing root categories, not a new merged settings or data store.

Miscellaneous groups: Navigation and restoration, Opening links, Sharing links, History and
appearance, Language. All values remain account scoped, Guest separate, including Language;
link-handler/package choices use their existing explicit account keys. Defaults stay Home-
position saving Off, session resume Off, External App (0), empty browser packages, shared
www.reddit.com (fragment-derived default), custom www.reddit.com, Back Default (0), search
history On, disable-avatar-animation Off and language auto. All 25 language choices remain;
changing the fixture language does not translate/restart the HTML. Native recreation/events,
search-history collection and restoration are preserved future integration contracts.

Session resume takes precedence over Home/Best-only position saving. Both remain independent
switches. Turning resume Off clears this account's recorded screen/cache through
`ResumeState.clear` → `clearAccount`. **Source scope conflict:** Home-position Off calls
`cache.edit().clear()` on the raw shared position file (`AppModule`), clearing positions
across accounts, although the setting itself is per-account. The proposal makes this consequence
explicit and clears nothing. Account Management's separate deletion already removes only
the named account key (`AccountStoredData.deleteFrontPageScrolledPosition`). Do not silently
claim the toggle is account-only, or silently introduce a fix in HTML/native implementation;
resolve the scoped native correction explicitly before implementing that control. Account
scope preservation remains required; this is a current-source defect to carry forward.

Opening links retains External App, Custom Tab, Ephemeral Custom Tab, Internal Browser and
Specific Browser values in source order. A workbench browser-capability fixture (private,
standard, none) supplies synthetic candidates; it does not enumerate installed apps. Native
installed-browser sorting/detection and resolver fallback remain authoritative. Private-tab
choice is offered only with support; package rows follow handler/capability gates. If a stored
private-tab choice becomes unavailable, the study shows a disabled “Saved choice unavailable”
option without overwriting the buffer. Native currently omits that option and may show no
matching entry; this is an explanatory presentation refinement, not a new fallback. Handler
and package values survive mode/capability changes. No link is launched by changing a setting.

Sharing retains all six source domain choices and independent custom-host value. Custom stays
visible-disabled outside Custom; Apply domain normalizes lowercase bare hosts, strips pasted
scheme/path/query/fragment and refuses invalid hosts/ports using the inspected source rule.
A synthetic post-link example demonstrates the saved domain without a fetch, clipboard or
share. Preserve `RedditLinkUtils`: non-Reddit embed-fixer hosts affect outbound post/comment
share/copy links only; browser links use only Reddit-owned domains; media/shorteners and API
paths stay separate. The study is not a replacement URL resolver or proof of Android URI parity.

Device is global across accounts/Guest: fold support Off and max decoded preview area
5000000. It retains the source warning that higher resolution can cause unexpected crashes;
Apply resolution accepts positive signed-Int-range values and keeps the saved value on errors.
It changes no image decoding, device mode, configuration or performance policy.

Account management separates Settings (Copy/Reset) from Stored data (eight existing local
clear operations). Copy is disabled with `other-account=none`, as source does; otherwise a
synthetic chooser excludes the current account/Guest as sources. The confirmation identifies
source → destination, replacement rather than merge, filters included, Home tabs excluded,
source unchanged and native restart. Reset explicitly includes Home tabs and filters, and
names the account. Stored-data confirmations stay account scoped; read-history displays
unmeasured Size/Count placeholders and preserves READ_POSTS-only clearing, including separation
from Guest saved/voted/hidden types. The study never copies/restarts/deletes or queries counts.
Exact native filter replacement, stored-data categories and event/recreation handling remain
`AccountSettings`/`AccountStoredData`/the source fragment's responsibility.

Global management groups Themes, Legacy settings and Reset. It retains three existing
operations. **Reset scope:** `AccountScopedSharedPreferences.Editor.clear` delegates whole-file
clear, so the current reset clears the shared default, Home-tab and NSFW files across accounts;
it is not a complete erasure of every preference file/database/export. The proposal explains
that breadth instead of suggesting only the selected account is reset. Future native work
must preserve or explicitly review the operation and its name, not broaden it by assumption.
Backup/restore preserve the existing password/encrypted-archive, Android file-picker and
validation paths as route previews. No password entry or real backup content is requested in
HTML; sensitive accounts/tokens/API settings in backups remain disclosed, without reading them.
Notifications, Security, Proxy and Download Locations source XML was inventoried but their
remaining runtime gates/detail review is not complete. Do not mark all detailed Settings done.

**Selected:** Back up first inside management copy/reset/clear confirmations. The reminder-
only comparison is retired. The extra action sits alongside Cancel and the operation action.
It closes/cancels the pending operation and opens Backup and Restore; returning requires
choosing/reviewing that operation again, with no automatic execution/export/retry. It is not
mandatory backup or approval for a native destructive operation. Account/global scope and
existing confirmations remain. Native export, file/password handling and operation correctness
still require later implementation verification.

Verification: all 28 source action/value keys and defaults matched XML (shared-domain default
cross-checked with its fragment/helper). Syntax passed for Settings, utilities and filters.
Lightweight DOM-model checks covered eleven Misc controls/25 languages, browser gates/retained
choices, custom-host normalization/rejection and account isolation, restoration feedback,
Device validation/global scope, ten/three management actions, copy target, Cancel/Back up first
without operation execution, read-only-history scope, no-other-account gating and backup route
announcements. Nine served assets matched workspace bytes; local references resolved. Browser
access remains disabled per the last attempt; responsive/theme/large-text/contrast/focus/modal
rendering and Android events/persistence/Back remain unverified. No Gradle/native checks.

Next: the global-settings source boundaries are reviewed in revision 134 below, before
Accounts/Guest/login/API access/onboarding. Whole-app styling remains active;
policy operator/contact and release data-flow review, themes, tablet and consistency remain.

### Global Settings and restore boundary (revision 134; restore review proposed)

Back up first is selected. This grouped proposal covers
[Notification](prototypes/relaxe-exploration/settings.html?rev=134&page=notification-settings&focus=1),
[Security](prototypes/relaxe-exploration/settings.html?rev=134&page=security-settings&focus=1),
[Proxy](prototypes/relaxe-exploration/settings.html?rev=134&page=proxy-settings&focus=1),
[Download Locations](prototypes/relaxe-exploration/settings.html?rev=134&page=download-settings&focus=1)
and [Backup and Restore](prototypes/relaxe-exploration/settings.html?rev=134&page=backup-settings&focus=1).
These are global across accounts/Guest. Their 18 source value/action keys/defaults are retained;
no extra credential, proxy-auth, folder permission, polling or backup format is introduced.
The separate `settings-global.js` owns these screens; the obsolete utility backup renderer was
removed. HTML fixtures never schedule work, authenticate a device, protect a real window,
change network traffic, grant file access, read passwords/archives or restore/restart anything.

Notification retains Enable On and interval 1 hour, with all nine source options. Minutes
15/30 and hour values keep their source encodings, including the source typo in the interval
key. The interval stays visible-disabled while Off, retaining its value; source hides it.
Android 13+ permission is a separate state and does not overwrite the app preference. The
workbench adds API 33 and granted/denied fixtures; denial shows the existing Android app-
settings route. Preserve source's permission request on entry, denial feedback and stored
request flag. The native worker checks signed-in accounts and notification availability;
it is not a Guest Inbox feature. Existing connected-network constraints, initial delay,
unique periodic-work replace/cancel and inexact Android scheduling remain authoritative.
Changing these controls does not create a browser timer or real permission request.

Security entry remains hidden when strong biometric/device-credential authentication is
unavailable. A direct unavailable route exposes no controls. The synthetic Authenticate step
models the native `SecurityPreferenceFragment.onResume` boundary: no fields before success,
Cancel/error returns Back; successful fixture entry focuses the first control. It collects
no credential/biometric. All four defaults remain account-section auth Off, secure mode Off,
app lock Off, timeout 600000, with all sixteen timeout options. Timeout stays editable while
App Lock is Off, matching source. Every new entry requires the route again; no browser
“unlocked forever” flag is stored. Keep the native strong-biometric-or-device-credential
prompt, events, secure-window application (including this screen), lock timing and return
handling. Browser switch values do not establish actual capture protection or authentication.
`auth-result=cancel|error` demonstrates exit callbacks only.

Proxy retains Off, HTTP, 127.0.0.1 and port 1080; choices are HTTP/SOCKS/Direct. Host/port remain
editable while Off or Direct, as source does. Apply fields refuse invalid values while
retaining saved ones; port **0–65535** is source-valid, not a new 1-based rule. HTML host checks
mirror source hostname intent and common IPv4/IPv6 cases without DNS requests, but native
Java regex and Guava address parsing remain authoritative. `PreferenceProxySelector` reads
settings for new OkHttp connections and evicts tracked pools on change. Off/Direct delegate
to the system proxy selector rather than guarantee bypassing a system proxy. The study adds
no restart requirement, connection test, encryption/anonymity promise or credential fields.
Native connection/pool behavior remains unverified by these forms.

Download Locations retains four independent folder values and the two source Off switches
(subreddit subfolders and separate NSFW destination). The source NSFW folder stays editable
while separate NSFW storage is Off, enabling preconfiguration. Choose folder announces the
existing Android document-tree picker/persistable read-write-URI permission route; no web
folder picker or typed filesystem path replaces it. `folder-state=chosen` supplies synthetic
paths, not real device data. Visible Forget folder buttons provide an accessible alternative
to the source long-press handler for all four locations (despite an older source comment saying
NSFW lacks it). Forget clears only that location value, retains other locations/switches and
moves focus to Choose folder; it does not delete downloaded media or revoke URI grants. Source
path formatting, picker cancellation, revoked/invalid access, storage/provider behavior and
native download services remain later checks. No new automatic download retry is introduced.

Backup retains password → Android destination picker → encrypted archive/result, with native
6–32 trimmed-character validation and Show password behavior. Restore retains Android file
selection, supported legacy compatibility-password attempt, password prompt when needed,
archive parsing/validation, supported data replacement, outcomes and success-triggered restart.
The browser exposes route/outcome studies, not a password field or archive processor. Real
password memory clearing, retry lifecycle, partial/invalid archive handling, Room/preferences
write scope and rollback limitations must be verified natively; the study promises neither
whole-app atomic rollback nor a complete device wipe. The policy draft gains source-backed
notification-content and folder-grant disclosures; it remains unfinalized and unpublished.

**Selected:** replacement review after choosing a backup and before the first native restore
attempt. Immediate continuation is retired. Native `onActivityResult` currently starts restore
after selection, including an automatic supported compatibility attempt that may succeed
without a prompt; the new review must precede that first call. It names the selected file,
explains that accounts/settings/themes/supported data across accounts may be replaced and
that successful restore restarts the app. Cancel/Escape clears the pending fixture and returns
focus to Choose backup. Confirm continues only into native-route/outcome feedback, not an
actual operation. Wrong-password/invalid/failure/success fixtures retain their documented
boundaries. No decrypted archive inventory is invented and no native change is implemented.

Verification: all 18 source keys/defaults matched XML; syntax of global/Settings/utility/privacy
scripts passed. Lightweight DOM-model checks covered Notification defaults/nine choices/Off
retention/API gate; Security pre-auth hiding/success/cancel/focus/global retention/sixteen
choices; Proxy seven host and five port cases/Off-Direct editing; four folder routes/isolated
Forget/retention; Backup boundary and Restore Cancel/Escape/confirmation/four outcome models.
Ten served assets matched workspace bytes, local references and global route/modal integration
checked. No actual permission/authentication/URI/network/archive behavior was exercised. Browser
access remains disabled per the last attempt: rendered responsive/theme/large-text/keyboard/
contrast checks are pending; no Gradle or native tests were run. Existing source scope defects
from revision 133 remain open and are not silently fixed by this group.

Next: the requested per-account basics onboarding is proposed in revision 135 below;
Accounts/Guest/login/API access remains a related unfinished workflow group. Themes/custom editor, tablet/landscape and cross-screen consistency/accessibility remain.
Detailed Settings directions are covered to this point, but source conflicts, native mechanisms,
prototype route-only boundaries and browser checks prevent declaring Settings/whole-app styling
fully complete. Policy operator/contact, release data-flow audit and production URL remain.

### Per-account onboarding and download default (live layout samples, revision 136)

**Approved requirement:** prompt for a default download location during onboarding; basic
settings such as layout and theme are set up per account. Add an onboarding flow if there
is no existing one. The source inspection found first-launch theme seeding and separate
login/account entry, but no general basics-setup wizard in the inspected launcher/login/
settings paths. ARCHITECTURE.md records the confirmed storage boundaries and planned integration.
This is design/HTML authorization, not native implementation, application-ID change or a new
login/API-access mechanism. Restore replacement review is also selected; no restore choice
remains open.

The [revision-136 onboarding study](prototypes/relaxe-exploration/settings.html?rev=136&page=onboarding&focus=1)
starts after an account/Guest context is available and proposes Layout → Theme → Downloads →
Review. The API-key/access checks and successful native account acquisition must happen through
existing owners before first account setup; the study does not fake a Reddit sign-in or collect
keys/passwords. Fresh Guest entry has its own setup context. Revision 137 connects these entries to the account/access workflow proposal below.

**User-requested correction:** the layout selector must show a rendered feed sample (or an
appropriate animation) for the selected family. “Keep current layout” is not useful for login/
first-use setup. Revision 136 therefore shows four actual choices: Compact, Large, Gallery and
Vertical. First-use Theme also shows actual modes (Follow system, Light, Dark, AMOLED), rather
than the same inheritance placeholder. Compact/Follow system are starting candidates in the
synthetic study, not approval of new shipping defaults or replacement of source first-launch
theme seeding. Existing-account re-entry must load its actual saved family/mode/custom choices
from their owners, not reset them to these fixture candidates or offer a generic Keep current
item. Custom palettes, saved/context-specific layouts and the shared theme library stay intact.

The Layout step embeds the existing Settings **feed** renderer in a same-origin frame, rather
than drawing a second approximate post card. Large reuses the shared editor's post samples and
accepted controls; Compact/Gallery/Vertical reuse its established nested feed/media fixture.
The sample changes with selection and forwards theme/palette/text/window controls. Embedded
status/header/bottom-navigation duplicates are suppressed locally. Each frame is isolated
from the parent onboarding buffers and performs no native action. Only the current selected
sample is mounted, using that family's accepted starting configuration. First-use setup now
keeps detailed customization in Settings, rather than opening a parent editor whose separate
fixture buffer is not synchronized with this account's sample. Family choice survives moving
between setup steps. Final basic/advanced persistence still needs one native owner and explicit
mapping; the sample is not a mirror of arbitrary saved/context-specific layout overrides.

Vertical has an interactive viewer with its existing touch/keyboard behavior plus visible
Previous sample / Next sample controls outside the frame. These commands use existing viewer
buttons and respect an open modal, disabled endpoint and zoom-owned paging. This is rendered
browser interaction, not a timed demonstration or native animation benchmark. No automatic
page-advance loop is added. The existing album/post distinction, gating and media-policy
fixtures remain; appearance does not establish Android correctness. Parent/child messages are
limited to the expected same-origin frame/source with validated family/theme/text/width and
±1 commands; stale frames cannot update the current sample. Ready feedback waits for the
existing nested fixture signal for media families; Large uses its rendered page readiness.
Actual readiness/gesture playback still requires browser verification when available.

Theme uses the existing foundation tokens for its local sample. Follow system is illustrated
by the workbench appearance; it is not a new browser/system-theme implementation. It forwards
appearance controls without replacing native theme persistence or a custom-theme library.
No second native theme engine or competing onboarding preference copies are approved.

Downloads explicitly prompts for **this account's default folder**, including a separate Guest
choice. Choose folder previews the existing Android document-tree route and uses a clearly
synthetic example folder; Cancel/Escape or `setup-folder=denied|invalid` keeps the previous
choice. There is no real path browsing or URI permission grant. The review shows the target
account, chosen layout/theme and folder or deferred status. Finish stores only a page-memory
setup snapshot/completion marker for that identity. Re-entering the same identity retains its
local choices/progress; another signed-in identity or Guest starts independently. For direct
review links, `setup-account=secondreader` and `guest` select synthetic identities; these are
not new account namespaces or actual account switches. No localStorage/native persistence is
introduced, and process-death restoration remains future work.

**Source/target scope conflict:** current four media/NSFW locations and two folder-organization
switches are global, as revision 134's source-backed Download Locations study shows. Layout and
theme selection already have account-scoped mechanisms. The user's new requirement approves a
per-account default download setting; the existing global source is not proof it exists. Plan
its scope/migration and Settings ownership before native implementation. Keep existing explicit
image/GIF/video/NSFW locations and NSFW separation values intact; do not silently collapse them
into one folder, clear them on setup or change another account when one chooses a default.
The relationship of a new base folder, per-media overrides and legacy shared values must have
an explicit mapping. The onboarding study intentionally collects only the new account default; it does
not relabel the existing global source form or pretend the mapping is implemented. Optional
advanced overrides remain existing mechanisms, not four compulsory onboarding picker prompts.

Native integration requirements: use `AccountScope`/existing scoped preference owners for
completion and default selection; trigger for genuinely new account/Guest setup, not every
account switch/token refresh. Existing users/restored accounts must retain their choices and
not be forcibly reset because a new completion key is absent. Offer a future re-entry path for
account setup; eligibility/versioning, copy/reset/remove-account and backup/restore treatment
need explicit mapping. An Android URI grant is app/device owned even when a folder preference
is per account; two accounts may deliberately choose the same folder. Do not claim file-level
account sandboxing or revoke a shared grant when one account forgets its default. Restoring a
saved URI does not restore its device permission; retain validation/reselection and existing
missing-location download feedback, without automatic download retries. Device security,
proxy, Android permissions and the theme library retain global/OS scope and are not silently
made per-account by the setup request. Other “etc.” basics can follow the account/access review;
no additional data/content/notification policy defaults are chosen here.

**Selected:** Choose folder / Set up later during each new account's onboarding. Folder
selection is optional: browsing and finishing setup remain available without storage access.
When no usable download location exists, retain the existing download-setup prompt; do not
silently choose a folder, reuse another account's selection or automatically retry a download.
Cancelling/denying folder access keeps the previous choice and allows deferral. Completing
onboarding is separate from holding a valid folder permission. The mandatory-folder-before-
Finish alternative is retired. This selects product behavior; per-account native preferences,
URI validity/grants and legacy media/NSFW mapping remain planned implementation work.

Revision 135 checks remain historical for its initial setup flow. Revision 136 checks passed:
JavaScript syntax; lightweight DOM models for four actual family/mode choices, per-family feed
URLs/titles, preview origin/source/stale-frame handling, Vertical sample commands, theme/text
forwarding, step-to-step choice retention and per-account selection retention. A separate model of the
actual child bridge checked readiness/configuration validation and existing-button paging
with modal/zoom/disabled-boundary rejection. Eleven served assets matched workspace bytes;
four embedded feed URLs returned 200 and local references resolved. An initial test-harness
syntax error was corrected and that bridge model passed on rerun; it was not an application
syntax failure. Browser opening was retried and returned “Local browser use is disabled in
Work settings”. Therefore no actual nested-frame rendering/ready timing, animation, gesture,
responsive/theme/large-text/keyboard/contrast or Android proof is claimed. No native change,
installation or Gradle check occurred. Whole-app styling/onboarding remain in progress.

Folder deferral is now explicitly selected by the user; no choice remains open there.
The current HTML already offers Set up later and permits finishing with no selected folder;
this decision updates its status, not a new runtime branch. Earlier revision verification
remains historical; no new browser/native verification is implied by accepting the behavior.

Next: review Themes/custom editor and retain native setup eligibility/default-folder
migration work. Theme/custom-editor, tablet/landscape and cross-screen
consistency/accessibility remain. Privacy-policy draft operator/contact and actual release
data-flow verification remain pending.

### Accounts, Guest and API access (revision 137; workflow proposal)

The [Accounts study](prototypes/relaxe-exploration/settings.html?rev=137&page=accounts&focus=1),
[sign-in](prototypes/relaxe-exploration/settings.html?rev=137&page=account-login&focus=1) and
[API configuration](prototypes/relaxe-exploration/settings.html?rev=137&page=api-access&focus=1)
cover this group together. Settings Switch account/API Keys open these studies without moving
account management exclusively into Settings or replacing the accepted drawer/shell. Synthetic
identities/configuration stay in page memory. No Reddit page, OAuth request, token exchange,
native switch or restart is performed. Use example keys only.

Preserve source distinctions: switching retains saved sign-ins; Use Guest retains sign-ins and
resume records; Log out removes the current local account/resume and enters Guest; removing
another saved sign-in leaves the current account active. This is not Reddit account deletion or
itself remote authorization revocation. Related database rows may be removed; scoped preferences
may remain. The policy draft now describes these source-backed limits. Visible Options provides
an alternative to long press. Existing optional device authentication gates names; cancellation
or error returns without exposing them.

**Selected:** confirm current-account Log out, naming its local removal, with Cancel and
the Use Guest alternative. The user selected option 1. Source immediate logout is retired as
the target presentation; other-account removal already confirms in source. Revision 137 already
demonstrates this guard. Native implementation remains unchanged; no logout question is pending.

Proposed eligibility connects successful new sign-in/first Guest use to approved Layout → Theme
→ Downloads → Review. Existing/returning accounts bypass automatic setup; optional Review account
setup loads their own choices. Failed/cancelled/denied/unverified sign-in or profile loading
creates no account/setup. Leaving setup does not roll back a successful sign-in. Completion is
separate from folder access. Existing/restored users must never reset just because a new marker
is absent. Native eligibility/versioning, account lifecycle and download migration remain planned.

Keep default in-app Reddit WebView and existing Chrome Custom Tab/Auth Tab routes. Auth Tab retains
its explicit agreement/decline and unsupported-Auth-Tab WebView fallback; app policy uses Relaxe's
draft. Browser capability is separate from the ephemeral-browser fixture. Preserve native OAuth
scopes, redirect scheme, state checks and token/profile owners. Error previews offer explicit retry
without changing accounts; distinct native login implementations do not share every error classifier.

API settings stay global: overrides Off by default, Client ID/User agent/Redirect dependent on it,
Giphy independent. Example edits mirror source normalization: Client ID 22 characters after whitespace
removal; User agent trims ends; Redirect removes whitespace; Giphy 32 characters or empty. Built-in
client rejection remains native; no built-in key is copied. Client/agent/redirect edits show the
existing deferred-restart consequence. QR/camera is a route preview. No entitlement or access change.

Revision 137 syntax/model checks passed for Guest/switch retention, existing setup, new login through
Finish, logout Cancel/confirm, returning bypass, ten failed/unknown results, new Guest, API gate and
validation/restart markers, Auth Tab agreement/fallback and protected-name/focus behavior. Additional
checks covered normalization and unavailable-browser guards. Twelve served assets matched workspace
bytes; local HTML references resolved. These are source/model/HTTP checks only. Browser access remains
disabled; rendered responsive/theme/large-text/keyboard/contrast and native correctness are pending.
No native changes, installation or Gradle run. Next: Themes/custom editor.
Native account conflicts are recorded in ARCHITECTURE.md. Whole-app styling remains in progress.

### Themes and custom-theme editor (unified Material You direction; revision 138 study)

**Approved direction:** the user selected separate Save new copy / Update shared theme, with an
impact confirmation for shared updates. The user also requires a more elegant, easier theming
system than Continuum, with equivalent depth and all themes using Material You. This supersedes
the earlier source-shaped proposal to expose Material You as an optional second theme system.
Research/design planning is authorized now; native implementation belongs to the later Android
phase. Revision 138 now demonstrates the core workflow in HTML. Android behavior and persistence are
unchanged; this study does not implement native Material palette generation or migration.

**Selected color sources:** wallpaper or chosen base color, both using the same Material system.
The user selected option 1; Wallpaper-only is retired. There is no Material You On/Off or separate
legacy theme category in the target. Material You personalization/M3 roles do not require wallpaper
as the sole source. System wallpaper palettes are API31+; supported older devices still need a
Material fallback. Exact native source/fallback and migration behavior remain planned.

**Revision 138 accepted:** the user reviewed the study and said “Looks good.” Appearance →
Choose theme → Customize/Preview → Save new copy or confirmed shared update, with explicit Use
theme, is the accepted HTML direction. Retain its basic/Advanced hierarchy, draft protection and
per-account appearance intent. This accepts the demonstrated workflow, not unbuilt import/Online/
conversion behavior, exact native geometry, palette algorithms or accessibility/performance proof.
Palette-style/contrast presets below remain planning candidates where absent from the study.

**Screen/workflow direction and planned extensions:**

- Appearance opens with an active-theme card and a realistic Posts/Comments sample. Keep
  Follow system / Light / Dark distinct from Black backgrounds in dark mode. These control how
  the current theme renders, rather than requiring users to assign three separate theme files.
  Exact defaults remain unselected; existing-account values must migrate without reset.
- Choose theme shows visual choices, active/preview labels and a clear Use theme button for the
  current account. Wallpaper follows system colors; saved recipes are reusable choices in the
  same system. Wallpaper and chosen base color are selected sources. No application
  occurs on merely opening a tile, and no editable global slot flags appear in the basic chooser.
- Customize opens a draft with Basics first: source (if offered), coordinated palette style and
  readable contrast controls, with Light/Dark/Black preview modes and Posts/Comments examples.
  Exact style/contrast presets and ranges require native capability/accessibility review; do not
  add arbitrary sliders just to appear powerful. Advanced reveals searchable grouped role controls,
  current value/source, inherited/generated versus explicit override, and Reset this override.
  Main app colors stay unchanged while previewing. Dirty exits use Keep editing / Discard.
- Save new copy requests a unique name and stores a reusable recipe; Use theme separately assigns
  it to this account. Updating a shared theme explicitly confirms affected users/assignments
  where known; built-in themes are copied for editing. Failed saves retain the draft. No Save
  action implicitly publishes, imports, changes account assignment or switches appearance.
- Saved themes offers explicit Customize, Rename, Copy/export and confirmed Delete. Local and
  existing Online capabilities remain discoverable under library/browsing, not a second theme
  engine. Online-owner updates stay separate from local saving, with existing access mechanisms.
  Import reviews compatibility, source/override conversion and name conflict before applying;
  deletion explains active-account fallback and never silently changes unrelated accounts.

**Depth without the flat source list:** retain an inventory/migration map for all source fields:
up to 86 color roles, three slot-assignment flags and three system-bar switches, plus name.
Color roles map into M3 foundation roles or Relaxe extension roles (read posts, vote states,
NSFW/spoilers/flair, comment depth, messages, etc.). The three source assignment flags become
explicit account selection/adaptation, not three compulsory tasks inside color editing. System
bar controls retain supported intent/platform gates. Keep existing fonts/layout settings in
their owners; a theme is not a hidden bundle that resets those choices. Advanced must retain
equivalent useful role control, alpha precision and clear override reset; do not claim all
legacy literal values can remain visually identical after conversion. Incompatible raw imported
palettes need review/backup and explicit conversion, not silent deletion or a hidden legacy engine.

**Dynamic behavior proposal:** save recipes/overrides, not generated wallpaper snapshots under
reserved names. A wallpaper update re-resolves generated roles without replacing library rows,
changing recipe identity or erasing overrides. Track which values inherit and which are explicit;
offer review/reset if a locked override loses contrast after wallpaper changes. Preserve semantic
meaning of votes, errors, read state and moderation with labels/states as well as color; don't
blindly harmonize them into indistinguishable accents. Generated pairs, alpha, scrims, black
surfaces and custom extensions all need measured contrast, not a generic Material accessibility
claim. Refresh is a recovery action if needed, not a second way users must apply a theme.

**Account model target versus current source:** selection and appearance should satisfy accepted
per-account setup, with reusable library recipes shared. Current source actually shares the three
active palettes, so this requires planned explicit account-reference/assignment migration. Editing
a shared recipe may affect its users only through an explicit shared-update operation; a copy
leaves original users unchanged. Exact reference/versioning/removal and backup contracts remain
native design work. Stable identity separate from display name is a candidate technical boundary,
not an implemented schema. No source defaults, existing account choices or stored theme data are
changed by this plan.

Research checked 2026-10-31 against primary sources:
[Android color design](https://developer.android.com/design/ui/mobile/guides/styles/color)
supports source-generated tonal roles, custom schemes, semantic extensions and harmonization;
[Material 3 theming](https://developer.android.com/develop/ui/compose/designsystems/material3)
distinguishes system dynamic color on API31+ from custom light/dark schemes;
[Views dynamic colors](https://developer.android.com/develop/ui/views/theming/dynamic-colors)
provides a Views path, so this does not require a Compose rewrite;
[Material Color Utilities](https://github.com/material-foundation/material-color-utilities)
provides scheme, HCT, contrast and harmonization building blocks. The screen/recipe model above
is our design inference, not a Google-prescribed theme manager. Exact library APIs/version and
Views/Compose mapping must be verified at native implementation time.

**Implemented HTML study:** [Appearance](prototypes/relaxe-exploration/settings.html?rev=138&page=themes&focus=1)
→ [Choose theme](prototypes/relaxe-exploration/settings.html?rev=138&page=theme-chooser&focus=1)
→ [Customize](prototypes/relaxe-exploration/settings.html?rev=138&page=theme-editor&focus=1).
The existing Theme root entry now opens Appearance. Preview tile selection does not apply; Use theme
changes only the selected account's synthetic reference. Display mode and the black-background
switch are per account, retained independently; system mode uses workbench appearance (battery-saver
label on older fixtures). Starting selections are fixture candidates, not approved shipping defaults.
Shared reusable examples include Wallpaper, Fern, Clay and editable Evening. Built-ins save as copies.

The editor supports Wallpaper/chosen base color (picker plus six-digit value), Light/Dark/Black and Posts/Comments
samples, and all 86 source color fields plus three system-bar switches under searchable groups.
The three source slot booleans map to explicit selection rather than editor controls. Override values
accept #RRGGBB/#AARRGGBB, are separated by preview mode, retain invalid input across preview changes,
and can reset to inherited values. Navigation-bar dark-icon control keeps its API26 gate. Other
source roles remain retained controls, not proof every role is rendered in the sample. Defaults are
illustrative derived fixture values, not a loaded native palette or final role map. Typography/layout
owners and media/read/save/vote actions are not changed by this editor.

Save new copy checks a unique trimmed name and leaves the active assignment alone; its result opens
Choose theme with the copy previewed and explicit Use theme. Shared update names affected synthetic
accounts and confirms; Cancel preserves the library. `theme-save=fail` retains the draft. Dirty Back/
Escape and account/platform fixture changes use Keep editing/Discard; opening a modal does not exit
editing. Preview tabs/modes alone do not make the draft dirty. Resetting the last override restores
clean state. Shared Rename preserves fixture identity; confirmed Delete names affected accounts and
uses Wallpaper fallback only for references to that deleted example. Built-ins have no Delete action.
At revision 138, Copy/export, import and Online explained existing native routes only. Revision
139 below extends their HTML workflows; real clipboard/file/network and native conversion remain
unimplemented.

**Important prototype boundary:** color mixing and default role values are illustrative browser
fixtures, not Material Color Utilities/HCT or a faithful Continuum renderer. The sample reuses a
local post image/content and shows selected role mappings with inert action text. It does not claim
Material palette validity, complete role parity or native system-bar rendering. Wallpaper workbench
changes re-render samples without replacing saved recipe rows or clearing overrides. The future
native resolver/migration must deliver the accepted all-Material behavior. No preferences, database,
account data, native identity, Android permission, online service or real theme file is changed.

**Revision 138 verification:** JS syntax passed for main/theme/inventory modules. Lightweight DOM
models passed preview/apply separation, copy naming/no implicit apply, draft Keep/Discard, account
mode/black isolation, per-mode alpha overrides/reset, invalid-input retention/guard, search, shared
update Cancel/confirm, failed save, wallpaper/library retention, deletion Cancel/confirm/fallback and
89-control/platform coverage. Thirty-six default sample text-color pair ratios were >=4.5:1; this
covers those computed sample pairs only, not arbitrary overrides or overall accessibility. Source
inventory equality passed: 86 colors plus three switches, with three slot flags explicitly mapped.
Fifteen served assets matched workspace bytes, three theme routes returned HTTP200, local refs and
script order resolved. Browser opening again reported “Local browser use is disabled in Work
settings”; no rendered responsive/themes/large-text/keyboard/focus/contrast proof. No Gradle, native
or device checks.

**Next:** retain accepted revision 138 as the baseline; review the revision-139 library extension
below and retain native per-account assignment/recipe migration planning. Visually refine when
browser access returns. Tablet/landscape and cross-screen consistency/accessibility remain.
Whole-app styling remains in progress.

### Theme library, import and Online (revision 139 proposal)

[Theme library](prototypes/relaxe-exploration/settings.html?rev=139&page=theme-library&focus=1)
adds Local/Online tabs behind the accepted chooser's Import / browse online entry. Local retains
Preview → Use theme and Options for Customize/Rename/Copy/Delete. This extends the accepted core
workflow rather than adding a second theme engine or changing approved appearance choices.

Import accepts pasted theme text, with example buttons; it reads no clipboard or file. Review
happens before creating any library item, replacing anything or applying account assignments.
Supported study-recipe input retains its source/per-mode overrides. Legacy review shows recognized
controls, unmapped field names and ignored Light/Dark/AMOLED assignment flags; the exact original
text is retained with the copy in page memory. A unique trimmed name is required. Save Material
copy does not apply it; it returns to the accepted chooser with explicit Use theme. Existing
same-named themes are kept. Updating a shared theme remains the separate accepted editor operation.

**Selected default:** keep compatible legacy customizations in Advanced while generating the
Material foundation, retaining the original and requiring review. The user selected option 1.
Fresh Material colors remains an explicit alternative in the study, not the default. This decides
conversion intent, not the final native mapper or blanket approval of every library/Online detail.
The study stages recognized legacy overrides for all
three preview modes; that is an illustration, not an accepted native light/dark conversion rule
or a promise of exact old appearance. Unmapped data is retained, not silently applied or dropped.
No legacy-conversion default question remains. [Direct legacy review example](prototypes/relaxe-exploration/settings.html?rev=139&page=theme-import-review&theme-import-example=legacy&focus=1).

The parser accepts the provisional `relaxe-theme-study` version-1 fixture recipe or recognized
legacy field names; supported study colors are six/eight-digit hex or legacy signed/unsigned
32-bit integers. Native Android also accepts color-name/other Color.parseColor forms; unsupported
study inputs stop with compatibility feedback and keep the original. This is deliberately not a
production-format/schema commitment or a complete native validator. Invalid JSON, unsupported
future versions/maps and unrecognized objects do not mutate the library. Input is capped at 64 KiB
for this fixture only; no shipping size limit is chosen. `theme-import=fail` retains review/text.
Import text/review is partitioned by account fixture; no native persistence is introduced.

Copy/export now opens labelled read-only theme text with manual Select text, separate from public
sharing. Exported fixture recipes contain theme values, not account references, tokens or API
settings. Retained originals are separately viewable. No clipboard write, file export, upload or
real backup is performed. Original legacy text must be preserved through actual native conversion;
future format compatibility/backup/storage ownership remain explicit Android work.

Online uses synthetic author/name listings, retained Local access, explicit more/retry and detail
download/error handling. No new search/filter capabilities are invented from the empty source
filter class. `theme-online=offline|error|empty|append-error` and `theme-download=fail|malformed`
exercise examples; retry advances fixture state only. Other authors/Guest can review a local Material
copy, not edit the online listing. An owned listing offers Edit my online theme; the editor keeps
Save new copy separate from Review online save. This retains source owner-only update intent,
not proof of server authorization. Existing native service/access mechanisms must stay unchanged.

Owned online-save review distinguishes local-only, online-only and local-then-online, with an
explicit confirmation for online updating and an editable online name. A local-save failure stops
the proposed subsequent update. If online update fails after local success, the copy is kept and
explicit retry must not duplicate it. `theme-upload=fail` demonstrates partial success. No automatic
retry, publishing of a new listing, endpoint replacement, live download or public update occurs.
The current native service uses older color JSON; compatibility conversion/serialization is still
required and no recipe-upload support is claimed. Online Delete/Rename are not shown as remote
operations: source actually invokes local helpers by name, as ARCHITECTURE.md records. Local
Options remain the explicit place for local Rename/Delete.

This extension also captures in-progress text edits before blur, so Escape/fixture-change guards
can protect unfinished color input. Theme dialogs now use the existing canvas/foreground tokens,
including dark appearance. These are HTML corrections, not native behavior changes.

**Revision 139 verification:** main/theme/library JS syntax and lightweight DOM models passed for
legacy/recipe review, duplicate naming/no apply, ignored slot flags, retained originals/unknown
fields, fresh-palette path, malformed/future formats and signed colors, failure retention, export
separation, offline/download retry, Guest/owner gates, online-only/local+online, partial-save retry
without duplicate copies, and local failure stopping update. In-progress text/invalid-map guards
passed. The accepted revision-138 core models were rerun after integration and passed, including
its 36 computed default text-pair contrast checks. Six library URLs returned HTTP200; 16 served
assets matched workspace bytes and references/script order resolved. Browser opening again returned
“Local browser use is disabled in Work settings”; rendered responsive/theme/large-text/keyboard/
focus/contrast and native performance/accessibility remain unverified. No app edits or Gradle run.

**Next:** retain the selected conversion default and continue tablet/landscape adaptation, carrying
the library proposal and native role/account/recipe migration and real service
compatibility as later Android work. Whole-app styling remains in progress.

### Tablet and landscape direction (selected composition; revision 140 study)

The accepted wide card-feed default and Gallery minimum-two-column rule remain in force. They
do not decide the shell or whether an opened post shares a window with its feed. The current
[wide-feed study](prototypes/relaxe-exploration/settings.html?rev=139&page=feed&window=1280&focus=1)
is the prior baseline. Revision 140 adds the dedicated compositor below without changing native
preferences or the accepted standalone feed.

**Source distinctions:** `layout-land` and `layout-sw600dp/app_bar_main.xml` already use an 80dp
navigation rail. `MainActivity` maps its slots to configured bottom-bar actions; retain those
assignments, visibility and accepted per-context overrides rather than install a fixed new list
of destinations. The native rail is unlabeled; accessible labels/selected states and readable
presentation need native refinement. Existing portrait hidden-bar state is retained across rail
configurations. Exact rail width, expansion or an always-open drawer is not approved by this audit.

Post-details land/sw600 resources contain separate post/comments recyclers. The fragment gates
their use by orientation preferences; landscape separation defaults On, portrait separation Off,
and side swap Off. This is **post/comments**, not **feed/post reader**. Keep preferences/values
and explicitly map effective layouts; don't silently equate these two splits or force three panes.
Portrait/landscape/unfolded feed-layout/column preferences also remain stored choices. Adaptive
available width affects the effective layout, not those saved values. Gallery's two-column minimum
must not be weakened just to fit an extra reader pane.

**Proposed screen-level direction:** preserve the selected drawer/account/search and configured
navigation actions; put those same actions in a rail when usable space supports it. Reserve the
remaining window for content. No automatic permanently expanded drawer consumes a third region.
Use the current window, height, text size, insets, IME and folds to choose composition, not a
physical tablet flag or orientation alone. Bound reading line lengths; don't stretch a phone
article edge to edge. Exact thresholds and dimensions remain native/prototype review work.

**Selected composition:** feed + post reader beside each other when both are readable, with a
single-screen fallback. The user selected option 1. Separate post screens at every width is
retired as the target. Exact thresholds/geometry and remaining adaptive surfaces are not approved
by this choice. No feed/reader composition question remains.

Open a reader only after an explicit post/comment action; don't auto-select the first
post and trigger read/history/media effects on resize. Preserve the feed's account, identity,
sort/filter, scroll anchor and the reader's selected post/comment position independently. Back
closes the relevant modal/zoom first, then returns focus to the selected feed item through the
existing contract. Narrowing shows the active reader alone; widening restores the feed beside it
without reopening, reordering or replaying actions. Reader post/comments stays the accepted full
post followed by comments within a narrow pane; any preferred internal split is effective only
when it fits, without overwriting the saved split/swap values. A full reader can use the source
split preference when appropriate. Native nested-split policy needs an explicit mapping.

Apply the same relationship consistently to Inbox list/thread and Settings categories/controls
when wide; narrow views retain the existing navigation stack. User/subreddit/Saved/History feeds
reuse their accepted layout and data boundaries. Media gets a focused viewer and existing Back,
zoom/paging, autoplay and sound ownership; it doesn't silently become a decorative side pane.
Compose/Reply, sheets and dialogs stay bounded and reflow for short height/IME, preserving drafts,
focus and reachable actions. Separate scroll regions need labelled keyboard/accessibility access.
At large text, collapse panes before clipping text/actions or shrinking targets. Folds/hinges must
not cross readable content; native posture detection and actual input/service behavior remain later.

This recommendation is an inference from source and official
[list-detail guidance](https://developer.android.com/develop/ui/compose/layouts/adaptive/list-detail)
and [window-size guidance](https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes),
checked 2026-10-31. The guidance supports side-by-side content when space permits and one-pane
navigation when it does not; it doesn't authorize a Compose rewrite or fix Relaxe's breakpoints.
The source audit established no rendered/native verification. Revision 140's actual scope/checks
are recorded below. Whole-app styling and the broader adaptive/accessibility review remain active.

#### Adaptive feed/reader study 40 (revision 140; first slice)

[Open adaptive reading](prototypes/relaxe-exploration/adaptive.html?rev=140&focus=1).
The compositor reuses study 17's feed and study 04's full-post/comments renderer through scoped
same-origin adapters. Compact, Large card and Gallery are available. Vertical keeps its focused
viewer and is not a split-feed fixture here. Five compatible existing post fixtures cover photo,
gallery, video, GIF and text so feed/reader identities match. Other posts, loading/content gates
and cross-screen data reconciliation are outside this slice, not native correctness claims.

No reader is mounted or post selected until explicit entry. Feed/reader frames stay mounted across
window/text/appearance changes. Resize does not change selected identity, preferred columns or
fixture open count. Parent readability heuristics choose composition; the reused renderer computes
its own actual columns, reported separately. Gallery retains at least two. Reader content remains
full post then comments within a narrow pane; native post/comments split/swap values are not changed
or mapped to a third pane. Exact cutoffs and pane/rail sizes are browser proposals, not Android dp.

Presets cover 360/390/720/840/1024/1280 widths, short landscape, 100/130/200% text, Light/Dark/Black
and palette fixtures. Simulated keyboard reduces available height; unavailable-width/hinge reserves
conservative space without modelling actual fold position/posture. The shell's same navigation
sample moves between rail/bottom row. It does not load/change real configured native assignments,
visibility, hidden state or per-context overrides. Those require explicit later native mapping.

Media uses the reused viewer in focused space; its Comments can show the reader over that context.
Feed dialogs take Back before closing the reader. Reader Back handles dialog, composer, revealed
toolbar, then return to feed; explicit return focuses the selected item with nearest scrolling.
Media Back delegates to existing Escape/zoom/control handling. Hidden reader, host dialog and host
visibility loss pause fixture video; resize does not automatically resume sound. The short-height
reader moves Reply controls into its existing scroll region instead of crowding reading space.
Existing discussion/scroll/draft owners remain, with validated post/account/text/appearance/palette
configuration. Signed-in/Guest are fixed entry fixtures (`account=guest`), not real switching.
Foundation colors are forwarded locally, not a native Material resolver. Messages require expected
same-origin source windows; namespaced feed IDs map explicitly to matching reader fixture IDs.
Adapters return immediately outside their adaptive query flags.

**Verification:** syntax passed for controller/state and both adapters. Models passed 162 window/
height/text/family combinations for no auto-selection, fallback, selected-post/preferred-column/
open-count retention and Gallery minimum; additional models covered media, IME and reserved width.
Controller smoke passed lazy mount, Guest, source rejection, stable frame across resize, palette
forwarding, overlay Back/focus and hidden pause. Real adapter code passed models for namespaced IDs
across refresh, routing/focus, modal/media delegation, reader config guards, Guest, short-height
footer, Back order and pause. A return-focus scope error found by the adapter model was fixed and
the rerun passed. Nine changed/new assets matched served bytes; local refs and three host/child
routes returned HTTP200. Browser opening again reported “Local browser use is disabled in Work
settings”. No actual frame readiness/rendering, scroll/draft/focus retention, responsive bounds,
themes/large-text/contrast/keyboard/IME/gestures or native performance/accessibility proof. No app
edits or Gradle/device checks. Earlier theme/account checks remain historical, not rerun evidence.

**Revision 140 accepted:** the user said “Looks good, continue.” The demonstrated feed/reader
composition is the HTML baseline; exact native geometry, lifecycle and rendered verification are
still separate. Revision 141 below extends the adaptive group. Whole-app styling remains active.

#### Adaptive Inbox, Settings and writing (revision 141 accepted)

[Inbox](prototypes/relaxe-exploration/adaptive-workflows.html?rev=141&workspace=inbox&focus=1),
[Settings](prototypes/relaxe-exploration/adaptive-workflows.html?rev=141&workspace=settings&focus=1)
and [Create post](prototypes/relaxe-exploration/adaptive-workflows.html?rev=141&workspace=compose&focus=1)
share the selected readable-width pane policy. No Inbox item or Settings category is preselected.
Inbox/Settings use a list and selected item when both fit, and a single-screen stack when narrow;
Create post stays a bounded focused form. Same shell navigation sample, window/text/appearance/
palette controls and simulated keyboard are reused. Exact rail/pane thresholds remain provisional.

Inbox reuses the existing study-13 listing and read/failure logic. Its scoped selection hook requests
the transition first; only after an existing thread/editor exit is allowed does it commit selection
through the source fixture. Canceling or resizing starts no read job. Success/failure feedback,
views, paging, Mark all semantics and Guest gate stay with that module. Notifications retain their
comment-context route preview; received messages seed the existing PM thread with the exact row's
subject, other party and body; Sent is a distinct read-only preview in this study. It is not a new
native Sent restriction. Subreddit parties keep r/ labels. No notification is substituted with an
unrelated PM/post. Real context navigation and new-PM composition remain existing routes/previews.

The PM frame keeps typed text on resize and uses the existing sending/exit guard, formatting,
preview and success/failure behavior. Switching threads/workflows first resolves that guard. Local
message/scroll snapshots are retained by thread fixture; discarded unsent text is not silently
restored. Accepted reply/update behavior remains synthetic, not a real send or native draft store.
Read-status attempts, account badge/descendant rules and reconciliation still require native owners.

Settings reuses the existing root categories and forms. Its scoped API preserves nested category
view/stack/scroll snapshots in page memory, with existing scoped preference buffers unchanged.
Choosing another category/workflow uses its actual theme/filter/layout dirty-exit guard first;
choosing the same category retains the editor. Back unwinds nested controls before closing the
category to its list. UI-only/route-only categories remain so; no missing source mechanism is faked.
Shared/global/account scope captions remain owned by their original forms. Current category/row
markers and focus return use the list, with a selector/first-category fallback if the row is gone.

Create post reuses the six-type composer, including its pending submission, media/formatting,
validation and discard guards. Resizing keeps the frame/form; leaving uses the existing guard
once. The adapter forwards exit acknowledgement instead of asking the same question twice.
Guest uses existing sign-in gating. New PM creation is not replaced by the public-post composer.

At short height or large text, PM header/reply form, Settings header and composer header can move
inside their existing scroll region, keeping controls reachable without a second draft/scroll store.
Navigation/pane headings give way during simulated IME/very short space; fields are not reset or
shrunk to force a fit. Dialogs remain bounded to the frame and scroll; cancellation respects existing
cancel handlers (including non-dismissible warnings). Current video is paused on hidden-workflow/
host visibility changes, including accessible nested study frames. Native IME extraction, focus,
TalkBack, actual folds, predictive Back and player/resource lifecycle remain unverified.

The compositor uses a single pending-transition token, expected child source/origin and commit
acknowledgement. A canceled/stale/unrelated guard reply cannot select/read a different row. It
keeps frames mounted across workspace/size changes; configuration acknowledges readiness but does
not prove all nested previews have rendered. Fixed account entry (`account=guest`) is a fixture,
not real switching or native account isolation. Source adapters are gated by `adaptive-screen` and
intended to be inert in standalone studies. Native identity, APIs/access, preferences and data are
unchanged. The user accepted this screen group with “Looks good, continue”. This establishes HTML direction; native implementation and rendered verification remain separate.

**Verification:** JS syntax and parent/state models passed no-auto-selection, guard owner/token
checks, cancel-without-read, exactly-one allowed commit, correct row/party routing, stable frames
on resize, Settings guard, composer text/IME and single close guard. Actual Inbox source models
passed deferred read jobs, source read/failure handling, Guest and intended standalone detail-first
behavior. Scoped PM API models passed exact row content, same-thread text and per-thread message/
scroll retention. Embed/Settings API models passed cancel/allow acknowledgement, freeze/resume,
short-height header/reply placement, owner guard, nested view/scroll retention, Back and reentry.
Revision-140 state/controller/adapter models were rerun after optional navigation-layout integration
and passed, including 162 size/text/family cases. Nineteen changed/new served assets matched workspace
bytes, references resolved and nine workspace/child routes returned HTTP200. Browser opening again
reported “Local browser use is disabled in Work settings”. No actual rendered frames, overflow,
focus/scroll/draft retention, large-text/themes/contrast, keyboard/IME or native accessibility/
performance verification is claimed. No app edits, installation or Gradle/device run.

**Next:** revision 141 is accepted; the revision-142 audit below owns the current consistency work.
Native preference/role/route/migration mapping remains later Android work. Whole-app styling remains
in progress; rendered verification is an outstanding requirement.

#### Cross-screen consistency and accessibility audit (revision 142)

The current [adaptive workflows](prototypes/relaxe-exploration/adaptive-workflows.html?rev=142&focus=1)
and [theme editor](prototypes/relaxe-exploration/settings.html?rev=142&page=themes&focus=1)
retain accepted hierarchy and behavior. Explicit list/workspace selections focus a named content
region after the current child configuration acknowledges readiness, without focusing a text input.
Ordinary resizing preserves visible focus; if reflow hides the focused pane, focus moves to the
remaining content. Returning to a list scrolls its selected row into view before focus. Busy state,
navigation current state, menu relationships and region focus indicators are explicit.

Theme save validation reveals an invalid Advanced field even when hidden by search or another
preview mode, then focuses it with associated help. A failed shared update reports inside its
dialog. An unfinished base-color entry is retained while wallpaper colors are active and does not
block saving those colors; switching back reveals that unfinished entry for correction. Changing
the wallpaper fixture palette refreshes inherited displayed values while retaining overrides.
These refinements add no account, preference, read, save, vote or network side effects.

Audit references: [WCAG focus visibility](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)
and [status messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html).
Model checks cover acknowledgement/focus intent, hidden-pane repair without read commits,
cross-mode validation, inactive-color retention, inherited values and dialog-local failure.
Static checks of 17 active HTML pages found no duplicate IDs, unnamed static form controls,
missing iframe titles/image alternatives or broken static ARIA references. This is limited source
coverage, not a rendered accessibility pass. Bounds, focus traversal/visibility, contrast, themes,
large text, keyboard and service accessibility still require rendered/native verification.

#### Reader Appearance (revision 143; screen accepted)

The user selected option 1, the separate reader Appearance shortcut, then accepted the screen with “Looks good, continue”. The earlier context question
is resolved: Post More → Appearance previews that post and its comments, while feed-family controls
stay in the feed editor. [Open the reader Appearance study](prototypes/relaxe-exploration/details.html?rev=143&post=p5&appearance=1).
No per-post preference namespace is introduced; the caption identifies the current account.

The screen groups Post information, Comments and separate media controls for post text/comments.
Six post visibility controls map to existing hide-type/flair/ratio/prefix/vote-count/comment-count
keys. Comments reuse spacing, single level indicator, avatar, prefix, vote count and the accepted
Off / All comments / Top-level only divider selector. Off retains the divider type. Both media
groups use the accepted four switches and encoded combination table, with separate existing values.
Cache capacity, landscape split/swap, gallery grid, FAB, thread ordering/collapse and toolbar/gesture
behavior remain available through their existing Settings pages. Fonts links to its existing page;
font settings have wider scope and are not duplicated as reader-only controls.

The preview is a read-only text snapshot from the current renderer, with its post/comment structure
and synthetic metadata. Media is represented by labelled placeholders and illustrative visibility
samples; opening it does not create another player or fetch gated/remote media. It is not a full
media-rendering or native palette proof. Wide windows place preview beside controls; phones place
it above independently scrolling controls. Short-height geometry remains a browser proposal.

Changes update the preview draft only. Apply writes the exposed keys to the same `settings-video.js`
page-memory buffers and decorates the existing reader without rebuilding it. Cancel/Back/Escape
close a clean editor, or offer Keep editing / Discard changes. Account ownership is captured on
entry; post/comment media stay separate. Existing sort, collapse, reply draft, vote/save and scroll
owners are retained. Playback pauses on entry and does not automatically resume sound on exit.
An open adaptive editor makes the sibling feed/navigation inert until it closes, preventing a
different post selection behind the draft; existing host Back delegates to the editor’s guard.
Window/text/theme changes retain the editor draft. These are browser interactions, not a native
router, draft store or preference migration. Settings opened in another tab has its own fixture
memory; no cross-tab preference synchronization is claimed.

**Current verification:** actual Settings-buffer and editor control-flow models passed draft/apply
separation, account isolation, separate media values, all 16 media encodings, retained divider type,
unchanged unrelated fields, invalid-commit atomicity, 19 switches plus divider, Apply disabled while
clean, Keep editing/Apply/Discard/clean close, unchanged model scroll and focus return. Snapshot
cloning/rendering is excluded from that control-flow model. Source renderer checks preserve sort,
vote/save, collapsed state and reply drafts. Adaptive host/source guard and 162 layout/state cases
pass. Static references/syntax/HTTP checks are recorded in ROADMAP.md. Browser use is disabled in
Work settings; actual layout, themes/large text, focus/traversal, contrast and keyboard behavior
remain unverified. No native/app changes or Gradle/device run.

**Next:** the reader screen is accepted. The grouped create/act proposal below owns the remaining
parent context, Poll fields, attachment editing/guards and result feedback review.

#### Create/act consistency packet (revision 144 audit; option 1 selected at revision 145)

The user selected option 1: compact disclosure plus the common attachment/feedback direction below. This is explicit approval of this screen/workflow packet, not a native implementation claim.
Review [separate-screen Reply](prototypes/relaxe-exploration/reply.html?rev=144&style=screen&target=long),
[Poll](prototypes/relaxe-exploration/compose.html?rev=144&type=poll), and
[Gallery](prototypes/relaxe-exploration/compose.html?rev=144&type=gallery).
The accepted inline Reply default and original-above-inline Edit comment remain unchanged.

**Selected screen direction:** keep writing foremost with progressive disclosure. A separate-
screen Reply starts with a compact two-line parent and Expand / Collapse, preserving full context
on request. Inline Reply already sits under its full parent and needs no duplicate parent card.
Poll starts with two options plus Add option up to six; remove is available above two, preserving
order and labels. Its body/options/duration preview and 1–7 day selector retain the three-day
default. Gallery keeps caption and optional outbound URL behind each image’s Edit action, with
caption/link summaries on the grid, explicit Save details / Cancel and the 180-character source cap.
The full-parent/six-field alternative is retired. Expand / Collapse remains a user action; compact
entry is the selected separate-screen starting state. The following common directions are selected.

| Workflow | Selected consistent treatment | Source boundary retained |
| --- | --- | --- |
| Single Image/Video replacement | Choose/Record replacement provisionally; cancel/failure retains the existing selection; explicit Remove clears it | Native Image Select again currently clears immediately. Staged replacement is an intentional future UX change requiring native implementation, not source behavior already present |
| Gallery | Whole-image thumbnails, selection order, Edit details, accessible Remove and count; no new reorder workflow | Existing 20-image cap, pending Add/edit/remove restrictions including thumbnail-failure exception, stable IDs and upload-failure removal |
| Inline image/GIF insertion | Accepted thumbnail/filename reuse; deleting a body block removes it from the writing while keeping it reusable within that composition | No remote delete or cross-post library; original account/type/body/selection must own a delayed result; mismatched results wait for explicit insertion |
| Closing writing | Reuse each owner’s exit contract with clear scope | Reply/comment Edit retain Save draft / Leave without saving / Cancel and complete account/parent/type attachment recovery requirement; post composer retains its own discard contract. No new saved post draft store is proposed |
| Pending work and failure | Disable duplicate submission; keep writing and eligible selections; identify upload versus submission errors and offer the existing retry route | Leaving may not cancel a native submission; do not promise cancellation, automatic retries, or retained Gallery entries after source upload failure |
| Validation and result | Field-local error plus focus on the first invalid field; persistent readable result/status; retain source success return/update behavior | No invented server validation, success Undo or extra posting action. Browser “nothing sent” feedback remains explicitly synthetic; it does not establish native success navigation |

Current source reinspection confirms `CommentActivity` carries parent identity/title/body extras;
`PostPollActivity` collects nonempty options in order, requires two, and its layout uses 1–7 days
with default 3. No new trimming, duplicate rejection or option-length cap is proposed.
`PostImageActivity` Select again clears its URI/preview immediately, so replacement retention must
be explicitly implemented later rather than described as existing Android behavior. Gallery detail
edits are staged in the HTML dialog until Save details. Type changes are not discard operations;
the existing separate browser body/attachment buffers are retained, with native ownership and
restoration still requiring implementation review. Native account draft and attachment gaps remain
recorded in ARCHITECTURE.md.

Revision 144 corrects the app-facing embedded-image limitation notice to Relaxe for Reddit;
upstream attribution in research notes remains. It implements no unresolved disclosure/guard choice.
Syntax/static/reference/served-byte checks are current in ROADMAP.md; no fresh interaction or
rendered verification is claimed for this copy/docs slice. Browser opening remains disabled in
Work settings. Earlier fixture checks remain historical. No app/native/identity or Gradle change.

Revision 145 records selection and retires the Reply workbench’s full-on-entry comparison.
Target entry starts compact; Expand / Collapse still works. Existing Poll Add/Remove and Gallery
Edit already match the selected direction. Earlier sections describing these choices as provisional
are historical; this selected packet supersedes them. It does not select a native schema, migration,
pixel dimension or motion implementation.

#### Rendered follow-up (revision 149; 2026-11-01)

The finishing directions through revision 148 remain selected. Browser access worked in the
current chat after the stopped docs-only preview helper was restarted. Earlier statements that
browser use was disabled describe their historical checks; current rendered evidence and its
limits are authoritative in ROADMAP.md's revision-149 handoff.

The rendered pass found and corrected saved-row wrapping; cramped short/narrow reader Appearance
columns and inadequate preview space; partly obscured reader guard focus; theme/filter cancellation
leaving adaptive transitions pending; and stale theme feedback/preview selection after an account
fixture change. In short/narrow frames the reader dialog now scrolls as a whole, keeping a bounded,
independently scrollable preview and reachable controls/actions. Larger frames retain the existing
pane arrangement. Dirty-guard entry/return lets the focused control scroll fully into view.
These are HTML repairs to accepted behavior, not new product choices or native geometry decisions.

The recorded 48-case matrices per surface use 360/390/720-landscape/1280-wide, 100/130/200% text
and representative light/dark/AMOLED/custom fixtures. Actual frames, screenshots and focused
cancel/failure/retry/keyboard/account checks supplement parent bounds measurements. Gallery's
keyboard-only details shortcut intentionally stays visually clipped until focus, when it expands
to a visible target; it is not a failed idle touch target. Sampled text contrast is not exhaustive
theme-role/alpha/icon contrast or native Material parity. The 2026-11-05 follow-up reproduced the
observer TypeError independently of Relaxe scripts and completed the bounded HTML closeout; see
ROADMAP.md for the controlled comparison and real-route regression. No clean-console or Android
correctness/performance claim is made. Prototype revision 149 and accepted directions remain.

#### Remaining consistency inventory (revision 149 update)

| Area | Current status | Remaining work |
| --- | --- | --- |
| Settings, accounts/access, onboarding, themes, adaptive screens and reader Appearance | Screen directions and recorded rendered fixture review complete | Native owner/migration/service conflicts and device verification remain; no automatic re-review of accepted controls |
| Create/act | Compact parent, two initial Poll fields, Gallery Edit, staged replacement and owner-specific feedback/guards selected | Native attachment/draft lifecycle and exact action eligibility; retain each original action/service owner |
| Named saved layouts | Shared device library, independent account/context snapshots and rename/delete preservation selected; rendered fixture review recorded at revision 149 | Native identity/persistence/migration/backup/reset/removal design; do not reset existing choices |
| Browse finishing details | Find in Saved under More, leading favorites once, Recently visited inline filter/Visited time labels selected at revision 148 | Preserve native formatting, density, query/paging, action and recording contracts during implementation and device verification |
| Shipping defaults | New setup starts with Large/Card 1/Filled and Follow system; existing/restored choices retained | Unselected geometry/gap/cap fixtures are not shipping defaults; map all actual native values and context overrides before implementation |
| Accessibility and rendering | Revision-149 rendered fixture coverage complete; observer follow-up isolated outside Relaxe scripts and affected flows rerun | Exhaustive custom-role/alpha/icon contrast and native TalkBack/Switch Access, RTL, IME/Back, restoration and performance remain separate |
| Native refinement | Icons and cohesive motion explicitly deferred | Native geometry, semantic role parity/real Material palette generation, preference/layout migrations, service compatibility and release data-flow audit require a separately authorized task |
| Privacy policy | Relaxe draft and warning branding established | Operator/contact, release-specific data-flow/retention/deletion audit and production URL before distribution; draft is not effective policy |

**Precise next task:** plan the Android architecture proof of concept in a new chat using ROADMAP.md's
closeout handoff. Whole-app styling is complete at the recorded HTML exploration scope; accepted
choices stay recorded. Define one bounded presentation slice and its owner/verification contracts.
Planning does not authorize native implementation, identity changes, installation or publication.

### Native motion pass (required during Android implementation)

**User requirement:** make the Android app feel modern and slick through coherent animations
across the app. This belongs to the later native phase; current authorization remains HTML/
documentation only. Treat motion as a shared design concern, not only Vertical swipe or a
literal reproduction of browser rendering. Exact timing, easing/spring behavior, geometry
and implementation APIs remain to be designed and verified on Android.

Plan the motion pass with progressive screen implementation: navigation/Back and account-
context transitions; sheets/dialogs and disclosure; toolbar/action reveal and row expansion;
layout changes and previews; theme changes; refresh/loading/error/optimistic action feedback;
media paging/zoom/control reveal; and keyboard/inset/adaptive-pane changes. Use motion to
explain hierarchy, gesture ownership and state change. Keep shared patterns consistent without
forcing every element to animate. Reuse existing native/state owners and suitable platform/
Material mechanisms before adding a parallel animation framework or a wholesale UI rewrite.

Animation must not alter account scope, sorting/filtering, vote/save/read side effects, API/
access, media fetching, restoration or action eligibility. Interruptions/cancellation, reverse
navigation, sheet dismissal, rapid taps and optimistic rollback must finish in the correct
state without duplicate actions or lost anchors. Do not introduce timed paging or extra media
preparation merely for a visual demonstration. Preserve zoom/gesture locks and existing
playback/resource ownership.

Respect system animation/accessibility and reduced-motion preferences, providing clear
immediate state changes where motion is reduced/disabled. Preserve focus order/return and
readable labels without depending on movement or color alone. Verify with real device frame/
input measurements, accessibility services, large text, themes, tablet/landscape, interruptions
and constrained devices; refine density and responsiveness natively. Do not claim browser
smoothness or a passing build proves native animation quality/performance. Record the eventual
motion patterns and actual verification alongside their native slices, without changing
accepted behavior just to achieve an effect.

### Relaxe for Reddit privacy-policy draft (revision 131; not effective)

The user requires Relaxe branding and an independent app privacy policy. The
[privacy-policy draft](prototypes/relaxe-exploration/settings.html?rev=131&page=privacy&focus=1)
is reachable from Settings → Privacy Policy and the NSFW entry warning. It is written for
Relaxe for Reddit, not copied from upstream policy text. The warning’s policy link opens the
same-origin draft in a separate tab without accepting the warning; its existing gating remains.
The root policy route uses the existing Settings stack and hides the account-specific caption,
because this is an app-wide policy. No native policy link, legal acceptance or app ID changed.

The draft covers account authorization/tokens and actions, Guest requests, local records,
media/third-party/browser/proxy traffic, permissions, backups, diagnostics and retention/deletion.
Do not claim that Guest is network-anonymous, that no information leaves the device, that every
connection/local store is encrypted, or that no telemetry exists without a release-build audit.
Source evidence inspected: `account/Account.java`, `account/AccountStoredData.kt`,
`utils/APIUtils.java`, `settings/CrashReportsFragment.java`, `asynctasks/BackupSettings.java`,
`settings/BackupAndRestorePreferenceFragment.kt`, the manifest and dependency declarations.
In particular, existing crash export includes logs and device/app/Android details in an
external issue-form URL, transmitting when the form opens, before issue submission. The
current target belongs to upstream; a Relaxe support target and data disclosure need later
native/release decisions. Backups include account records and use password-encrypted archives;
exported files must not be equated with local app storage deletion. Provider constants and
a dependency declaration are inventory evidence, not proof of all runtime traffic or absence
of automatic collection. No credentials or real logs were read into shared documentation.

**Draft limitations:** operator identity, public privacy contact, effective date, production
policy URL, enabled services/dependencies, exact diagnostic behavior, category-specific retention,
account-removal/token deletion instructions and applicable privacy-request process still need
confirmation against the intended release. An optional text question requests operator/contact;
until answered they remain explicitly pending. This is a review artifact, not a published
policy, legal-compliance claim or release approval. The draft does not invent a service
operator, address or privacy guarantee. Public sharing/publication is not authorized here.

Official reference checks used the [Reddit User Agreement](https://redditinc.com/policies/user-agreement),
[Reddit Privacy Policy](https://www.reddit.com/policies/privacy-policy) and
[Google Play User Data guidance](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en-GB).
These are reference material, not evidence that a store release is planned or that Relaxe is
compliant; Google’s guidance calls for an app-specific disclosure reflecting actual data
handling, with contact and retention/deletion information. The app’s own disclosure remains
distinct from Reddit’s policy for its services.

Revision 131 verification: syntax checks for Settings, content and privacy scripts; lightweight
DOM-model warning identity/local-policy link, acknowledgement/focus and preserved four switches;
policy draft identity/status/content and external references; local asset references and route
wiring; seven served assets match workspace bytes through the existing tailnet endpoint. No
upstream branding or repository URL remains in the warning or privacy renderer. Source attribution
in research/docs remains. Browser rendering, themes/large text/responsiveness/accessibility and
actual Android behavior remain unverified; no Gradle or native check was run.

### UI review tracker

This is a review inventory, not approval to redesign every surface now. Record user decisions
per area; ask focused questions when that area becomes active. Keep behavior, API/access,
account scope, accessibility and restoration requirements from ARCHITECTURE.md throughout.

| Area | Current decision/status | Next review |
| --- | --- | --- |
| Compact feed | Refined A accepted at HTML design level; cards, metadata/stat grouping, hidden toolbar and customization required | Native refinement/validation when implementation is separately authorized |
| Other feed layouts | Four customizable families selected; Gallery minimum two columns retained; adaptive feed/reader revision 140 accepted | Legacy preference mapping, native geometry and rendered verification; preserve saved wide-column and navigation choices |
| Post details and comments | Study 04 accepted for now: full post → comments, top-right −/+ branch collapse, explicit main-post Reply for top-level comments | Native preference mappings, composer integration and Android refinement; exact styling separately |
| Vertical photo/gallery/video/GIF | A selected; autoplay; tap-revealed overlays; confirmed ~4s playing timeout; Comments goes to default details | Native gesture/timeout/accessibility/policy/restoration validation; exact styling separately |
| Long-press/action options | Grouped More, section reordering and action reordering within each section selected; ordering editor drafted | Shared order per account selected; final Settings mapping/defaults/persistence and native accessible alternatives remain |
| Shared visual foundations | A typography + B moderate rounding + C solid icons selected; reuse existing wallpaper/custom theme mechanisms through component-role mapping | Native geometry/assets, full role parity and accessibility validation remain later work |
| Shell/navigation | Study 09b accepted at HTML design level: shell/drawer, balanced → expanded search, compact type/scope selector, history/tools and current results presentation | Keyboard-on-open deferred to native review; layout/preference mappings, insets, Back and restoration remain implementation work |
| Subreddits/search/list surfaces | Search 09b and subreddit/shared-shell revision 12 accepted at HTML level; study 11 single list selector and visible stars selected, tighter rows requested and demonstrated | Judge final row density on Android; retain list details for consistency review and continue to Profiles |
| Profiles/inbox/saved/history | Profile study 12 header/actions/comment context selected; Inbox study 13 compact selector and two-line previews selected; Saved tabs/source, History date headings and Recently visited two tabs/visible row actions selected | Recently visited filter/time labels remain proposals; History keeps Continuum basics with explicit media-only viewing; native geometry/actions/accessibility remain implementation work |
| Creation/editing/moderation | Selected post-composer details recorded above; Inline Reply default/shared Edit comment style/original visible; GIF beside Images and thumbnail/filename image rows selected; complete scoped Reply/comment EDIT drafts required; PM toolbar/Preview/discard, Continuum alignment and bubbles selected; grouped/reorderable More selected; Chat shortcut deferred | Category-first Report bottom sheet and Delete excerpt selected; compact moderator primary buttons and Remove/Spam confirmation selected; download rows and paired Share/Copy selected; inline missing-folder notice selected; study 31 visible Open in browser selected; Copy customization in Settings required, both defaults enabled; Edit post shared Reply/Edit style selected; Settings direction is recorded above; continue the provisional-state audit. Other action/result details remain for review. Live PM compatibility unverified; Study 21 shared Reply/Edit style is selected. Parent display, Poll fields and attachment/feedback direction selected in revision 145; native mapping and rendered checks remain |
| Settings/accounts/onboarding | Detailed Settings, account/access and optional per-account onboarding directions recorded through revision 137; unified Material You chooser/editor/library through 139; adaptive workflows through 141 accepted | Reader Appearance shortcut selected in revision 143; native scope/migration/service conflicts and rendered verification remain open. See current audit above |
| Sheets/dialogs/feedback | Search entry accepted in study 09b; keyboard policy deferred to native review; other shared dialog details open | Action/confirmation menus, destructive feedback and focus in create/act group |
| Media utilities/downloads | Study 28 separate download rows selected; source gallery-index and GIF/video-variant boundaries recorded; study 29 paired Share/Copy selected | Study 30 inline missing-folder notice selected; study 31 visible Open in browser selected; Copy customization in Settings required, both defaults enabled; remaining native utility/result details stay for implementation/consistency review |
| Accessibility/responsiveness | Adaptive groups 140/141 accepted; revision 142 adds focus/error refinements and limited source/model audit | Rendered themes, large text, bounds, focus/keyboard checks remain unavailable; native TalkBack/Switch Access, RTL, motion, insets and restoration remain required |

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
