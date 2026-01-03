// Displays text and progress bars, goes in ActManager.active_decorations for now.
class ProgressHud {
    hud_text = "Heads-up Display." // The text to write above the 
    hud_progress = 0.5 // Proportion of completion [0, 1]
    font_size = 0.016 // Size in proportions of kW
    buffer = 0.01 * kW // Space between the text and progress bar.
    hud_type = "" // A string id that describes how hud_progress is calculated.

    constructor(text, x, y, hud_type) {
        this.hud_text = text
        this.x = x
        this.y = y
        this.hud_type = hud_type
    }

    // Origin is left-center of object.
    // HUD is text and progress bar on one line.
    DrawHud() {
        kCtx.save()

        // Draw text. 
        kCtx.fillStyle = 'black'
        kCtx.font = `${this.font_size * kW}px Arial`
        kCtx.textAlign = 'left'
        kCtx.textBaseline = 'middle'
        kCtx.fillText(this.hud_text, this.x, this.y)

        // Draw progress bar.
        const font_size_px = this.font_size * kW * 0.8 // The 0.8 makes it look more even.
        const text_width = kCtx.measureText(this.hud_text).width
        kCtx.fillStyle = 'green'
        kCtx.fillRect(this.x + text_width + this.buffer, this.y - font_size_px / 2, text_width * this.hud_progress, font_size_px)
        kCtx.strokeStyle = 'black'
        kCtx.lineWidth = 0.002 * kW
        kCtx.strokeRect(this.x + text_width + this.buffer, this.y - font_size_px / 2, text_width, font_size_px)

        kCtx.restore()
    }

    UpdateHud() {
        if (this.hud_type == "closet-progress")
            this.hud_progress = ActManager.container_contents["closet"] / ActInitializations.total_closet_draggables
        if (this.hud_type == "cabinet-progress")
            this.hud_progress = ActManager.container_contents["cabinet"] / ActInitializations.total_cabinet_draggables
        if (this.hud_type == "trashcan-progress")
            this.hud_progress = ActManager.container_contents["trashcan"] / ActInitializations.total_trashcan_draggables
        if (this.hud_type == "dirt-progress")
            this.hud_progress = ActManager.dirt_swept / ActInitializations.act_2_total_dirt
    }
}