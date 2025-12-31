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

    DrawHud() {
        kCtx.save()

        // Draw text. 
        kCtx.fillStyle = 'black'
        kCtx.font = `${this.font_size * kW}px Arial`
        kCtx.textAlign = 'right'
        kCtx.textBaseline = 'middle'
        kCtx.fillText(this.hud_text, this.x - this.buffer / 2, this.y)

        // Draw progress bar.
        const font_size_px = this.font_size * kW
        kCtx.fillStyle = 'green'
        kCtx.fillRect(this.x + this.buffer / 2, this.y - font_size_px / 2, kCtx.measureText(this.hud_text).width * this.hud_progress, font_size_px * 0.8) // The 0.8 makes it look more even.
        kCtx.strokeStyle = 'black'
        kCtx.lineWidth = 0.002 * kW
        kCtx.strokeRect(this.x + this.buffer / 2, this.y - font_size_px / 2, kCtx.measureText(this.hud_text).width, font_size_px * 0.8) // The 0.8 makes it look more even.

        kCtx.restore()
    }

    UpdateHud() {
        if (this.hud_type == "act-1")
            this.hud_progress = ActManager.TotalContainerScore() / ActInitializations.act_1_total_draggables
    }
}