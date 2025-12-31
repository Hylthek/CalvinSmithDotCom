class CanvasWrapper {
    constructor() {
        console.error("This is a static class and should not be instantiated.")
    }
    static pixelation_factor = 1.75 // Must be defined before ResizeCanvas()
    static canvas = document.getElementById("canvas")
    static context = CanvasWrapper.canvas.getContext("2d")
}
// Some canvas initialization boilerplate.
CanvasWrapper.canvas.width = CanvasWrapper.canvas.getBoundingClientRect().width / CanvasWrapper.pixelation_factor
CanvasWrapper.canvas.height = CanvasWrapper.canvas.getBoundingClientRect().height / CanvasWrapper.pixelation_factor

// Some globals for frequent usage.
const kW = CanvasWrapper.canvas.width // It doesn't matter whether to reference kW or kH for normalization because 16:9 is maintained (kW preferred). TODO, make a copy of kW for normalization usage.
const kH = CanvasWrapper.canvas.height
const kCtx = CanvasWrapper.context