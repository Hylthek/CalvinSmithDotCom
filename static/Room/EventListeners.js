let gMouseX = 0
let gMouseY = 0
let gMb1State = false
let gMb1StateChanged = false

CanvasWrapper.canvas.addEventListener("mousemove", (event) => {
    gMouseX = (event.clientX - CanvasWrapper.canvas.getBoundingClientRect().left) / CanvasWrapper.pixelation_factor
    gMouseY = (event.clientY - CanvasWrapper.canvas.getBoundingClientRect().top) / CanvasWrapper.pixelation_factor
})
CanvasWrapper.canvas.addEventListener("mousedown", (event) => {
    gMb1State = true
    gMb1StateChanged = true // Value is reset by main().

    // Continue from splash screen.
    if (ActManager.current_act == "splash-screen")
        ActManager.NextAct()
})
CanvasWrapper.canvas.addEventListener("mouseup", () => {
    gMb1State = false
    gMb1StateChanged = true // Value is reset by main().
})
document.addEventListener("keydown", (event) => {
    // Progress dialogues.
    if (event.code === "Space") {
        ActManager.game_events.forEach(event => {
            if (event.curr_stage != -1) {
                event.curr_stage++
                if (event.curr_stage >= event.dialogue.text.length)
                    event.curr_stage = -1;
                event.sequence(event)
            }
        });
    }
    if (event.code === 'KeyN') {
        ActManager.game_events[0].Run()
    }
})
