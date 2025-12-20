console.log("Booting...")

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

// Get size of the canvas
let canvas_rect = canvas.getBoundingClientRect()
canvas.width = canvas_rect.width
canvas.height = canvas_rect.height
console.log("Canvas resolution is: ", canvas_rect.width.toFixed(1), canvas_rect.height.toFixed(1))

// Event listeners
let mouse_x = null
let mouse_y = null
let mouse_click_x = null
let mouse_click_y = null
canvas.addEventListener("mousemove", (event) => {
    mouse_x = event.clientX - canvas_rect.left
    mouse_y = event.clientY - canvas_rect.top
})
canvas.addEventListener("click", (event) => {
    const mouse_click_x = event.clientX - canvas_rect.left
    const mouse_click_y = event.clientY - canvas_rect.top
})

// Main function.
window.main = () => {
    window.requestAnimationFrame(main);

    // Present screen.
    ResizeCanvas()
    ClearScreen()
    DrawBackground()
    // DrawDraggables()
    // DrawContainers()
    // DrawDecorations()

    // Accept input.

    // Interpret actions.

    // Calculate next screen.

}
console.log("Main called...")
main(); // Initial call.

// Function definitions.
function ResizeCanvas() {
    canvas_rect = canvas.getBoundingClientRect()
    canvas.width = canvas_rect.width
    canvas.height = canvas_rect.height
}

function ClearScreen() { ctx.clearRect(0, 0, canvas.width, canvas.height) }

function DrawBackground() {
    ctx.save()

    const gridSize = 100
    const time_thing = GetTime() * 100 % gridSize
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 1
    for (let x = time_thing; x <= canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
    }
    for (let y = time_thing; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
    }

    const img = new Image();
    img.src = "/Room/goobert.png";
    const hue_thing = GetTime() * 300
    ctx.filter = `hue-rotate(${hue_thing}deg)`;

    const imgX = (canvas.width - img.width) / 2 + 3 * Math.sin(hue_thing/26); // Center the image horizontally
    const imgY = (canvas.height - img.height) / 2 + 3 * Math.sin(hue_thing/60); // Center the image vertically
    ctx.drawImage(img, imgX, imgY);


    ctx.restore()
}

// Track the time the page has been running.
function GetTime() {
    const currentTime = performance.now();
    return ((currentTime) / 1000); // Return elapsed time in seconds.
}