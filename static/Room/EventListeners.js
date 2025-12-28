let gMouseX = 0
let gMouseY = 0
let gMb1State = false
let gMb1StateChanged = false

kCanvas.addEventListener("mousemove", (event) => {
    gMouseX = (event.clientX - kCanvas.getBoundingClientRect().left) / kPixelationFactor
    gMouseY = (event.clientY - kCanvas.getBoundingClientRect().top) / kPixelationFactor
})
kCanvas.addEventListener("mousedown", (event) => {
    gMb1State = true
    gMb1StateChanged = true // Value is reset by main().

    // Continue from splash screen.
    if (ActManager.current_act == "splash-screen")
        ActManager.NextAct()
})
kCanvas.addEventListener("mouseup", () => {
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
        ActManager.NextAct()
    }
})
