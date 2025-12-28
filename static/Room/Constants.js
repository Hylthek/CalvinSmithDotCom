'use strict'; // Makes sure variables don't accidentally pollute the global scope.

// Constants pt1.
const kPixelationFactor = 1.75 // Must be defined before ResizeCanvas()

// Canvas boilerplate.
const kCanvas = document.getElementById("canvas")
const kCtx = kCanvas.getContext("2d")
kCanvas.width = kCanvas.getBoundingClientRect().width / kPixelationFactor
kCanvas.height = kCanvas.getBoundingClientRect().height / kPixelationFactor
const kW = kCanvas.width // It doesn't matter whether to reference kW or kH for normalization because 16:9 is maintained.
const kH = kCanvas.height

// Constants pt2.
const kVanishingPoint = [0.5 * kW, 0.2 * kH]
const kSceneDepth = 0.45 // Proportional length to the vanishing point that the room edges are drawn.

// Helper function
// Returns a double array of the 2D coordinates of the room corners.
// [TopLeft, TopRight, BottomLeft, BottomLeft]
function GetScenePoints() {
    return [
        [kVanishingPoint[0] * kSceneDepth, kVanishingPoint[1] * kSceneDepth],
        [kW - kVanishingPoint[0] * kSceneDepth, kVanishingPoint[1] * kSceneDepth],
        [kVanishingPoint[0] * kSceneDepth, kH - (kH - kVanishingPoint[1]) * kSceneDepth],
        [kW - kVanishingPoint[0] * kSceneDepth, kH - (kH - kVanishingPoint[1]) * kSceneDepth]
    ]
}
