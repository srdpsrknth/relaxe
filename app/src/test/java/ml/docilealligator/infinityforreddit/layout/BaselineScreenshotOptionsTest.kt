package ml.docilealligator.infinityforreddit.layout

import com.dropbox.differ.Color
import com.dropbox.differ.Image
import com.dropbox.differ.Mask
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class BaselineScreenshotOptionsTest {
    @Test
    fun identicalPixelsMatch() {
        assertTrue(matches(image { _, _ -> gray(128) }, image { _, _ -> gray(128) }))
    }

    @Test
    fun observedFiveLevelGrayscaleRoundingMatches() {
        assertTrue(matches(image { _, _ -> gray(128) }, image { _, _ -> gray(133) }))
    }

    @Test
    fun sixLevelGrayscaleChangeFails() {
        assertFalse(matches(image { _, _ -> gray(128) }, image { _, _ -> gray(134) }))
    }

    @Test
    fun nineLevelSingleChannelChangeFails() {
        assertFalse(matches(image { _, _ -> gray(128) }, image { _, _ -> Color(137, 128, 128) }))
    }

    @Test
    fun onePixelEdgeShiftFails() {
        val reference = image { x, _ -> if (x == 0) gray(0) else gray(255) }
        val shifted = image { x, _ -> if (x <= 1) gray(0) else gray(255) }
        assertFalse(matches(reference, shifted))
    }

    @Test
    fun singleChangedPixelCannotHideInLargeImage() {
        val reference = image(100, 100) { _, _ -> gray(255) }
        val changed = image(100, 100) { x, y -> if (x == 50 && y == 50) gray(0) else gray(255) }
        assertFalse(matches(reference, changed))
    }

    @Test
    fun changedDimensionsFail() {
        assertFalse(matches(image(2, 2) { _, _ -> gray(255) }, image(3, 2) { _, _ -> gray(255) }))
    }

    private fun matches(reference: Image, actual: Image): Boolean {
        val options = BASELINE_SCREENSHOT_OPTIONS.compareOptions
        val result = options.imageComparator.compare(
            reference, actual, Mask(maxOf(reference.width, actual.width), maxOf(reference.height, actual.height)),
        )
        return options.resultValidator(result)
    }

    private fun gray(value: Int) = Color(value, value, value)

    private fun image(width: Int = 3, height: Int = 2, pixel: (Int, Int) -> Color) = object : Image {
        override val width = width
        override val height = height
        override fun getPixel(x: Int, y: Int): Color = pixel(x, y)
    }
}
