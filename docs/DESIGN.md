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

## Shared design-system process

Inventory existing elements and states, research references, compare a small number of
alternatives, then approve components before broad implementation. Cover foundations,
components, loading/error/empty/selected states, and screen patterns. Do not choose an entire
design system from a single card mockup or expand speculative settings prematurely.

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

Framing, overlays, tap/seek behavior, preloading budget, and navigation chrome are not yet
specified. Research SnapReel and other vertical viewers as interaction references, along with
Reddit clients. SnapReel is a local-media viewer; Reddit provider/network behavior needs
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

## Research references

- [SnapReel](https://github.com/shahriar-ahmed-seam/SnapReel): source/README reference only;
  not installed or behaviorally verified during foundations.
- Sync, Boost, Relay, Infinity, and modern Android apps: detailed comparative research pending.
- [Android touch-target guidance](https://developer.android.com/guide/topics/ui/accessibility/apps)
- [Views/Compose interoperability](https://developer.android.com/develop/ui/compose/migrate/interoperability-apis)
