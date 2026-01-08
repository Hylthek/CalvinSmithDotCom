// Initialize first act.
ActManager.current_act = null
ActManager.current_act = 'act-1' // A debug line.
ActManager.NextAct()

// Preload images.
PreloadedImages.PreloadAllImages()
// Preload audio.
PreloadedAudio.LoadAll()

function main() {
    window.requestAnimationFrame(main);

    // Present screen. (draw objects)
    DrawingHelperFunctions.ClearScreen()
    DrawingHelperFunctions.DrawBackground()
    DrawingHelperFunctions.DrawDecorations(true) // Performs a background decorations pass.
    DrawingHelperFunctions.DrawContainers()
    DrawingHelperFunctions.DrawDraggables()
    DrawingHelperFunctions.DrawDecorations()

    // Accept input. (get raw input)
    const mb1_state = gMb1State
    const state_changed = gMb1StateChanged
    if (gMb1StateChanged) gMb1StateChanged = false; // gMb1StateChanged is set by eventlistener and reset by main.

    // Process drag and drops.
    const hovered_draggable = ActManager.GetHoveredDraggable()
    const hovered_container = ActManager.GetHoveredContainer()
    if (hovered_draggable && mb1_state && state_changed)
        hovered_draggable.Pickup()
    if (hovered_draggable && !mb1_state)
        hovered_draggable.Drop()
    if (hovered_container && hovered_draggable && !mb1_state && state_changed)
        hovered_container.TryEatDraggable(hovered_draggable)

    // Process act 2 dirt removal.
    if (ActManager.current_act == "act-2")
        ActManager.active_draggables[0].CleanDirt()

    // Hover text.
    if (hovered_draggable)
        hovered_draggable.DrawHoverText()
    if (hovered_container)
        hovered_container.DrawHoverText()

    // Draw dialogue on top of hover text.
    DrawingHelperFunctions.DrawDialogues()

    ActManager.UpdateGameEvents()
    ActManager.UpdateDraggables()
    ActManager.UpdateHuds()

    DrawingHelperFunctions.DrawForeground()
}
// Initial call.
main();
