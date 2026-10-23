package ml.docilealligator.infinityforreddit.layout

import com.dropbox.differ.SimpleImageComparator
import com.github.takahirom.roborazzi.RoborazziOptions

/**
 * Compare existing goldens across native rendering platforms without re-recording them.
 * All 1,216 Windows mismatches at the untouched upstream baseline had matching dimensions
 * and at most 5/255 channel drift. A normalized RGBA distance of 0.035 covers that grayscale
 * rounding (sqrt(3) * 5/255), while a six-level grayscale or nine-level single-channel change
 * still fails. Small color changes below this distance are intentionally not distinguished.
 *
 * Keep positional tolerance at zero and retain Roborazzi's zero changed-pixel allowance:
 * a single pixel outside the color tolerance must fail, even on a large screenshot.
 * BaselineScreenshotOptionsTest guards those limits. This does not permit layout shifts.
 */
internal val BASELINE_SCREENSHOT_OPTIONS = RoborazziOptions(
    captureType = RoborazziOptions.CaptureType.Screenshot(),
    compareOptions = RoborazziOptions.CompareOptions(
        imageComparator = SimpleImageComparator(maxDistance = 0.035f, hShift = 0, vShift = 0),
    ),
)
