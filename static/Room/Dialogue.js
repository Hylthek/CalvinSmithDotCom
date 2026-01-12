class Dialogue {
    static outer_margin = kW * 0.025
    static inner_margin = kW * 0.005
    static line_spacing = kW * 0.020
    visible = false // Visibility.
    curr_text = -1; // Current index of this.text
    text = null
    visible_start_time = [null] // The time of performance.now() that the respective line of text started to be visible.
    chars_per_sec = null

    /**@param text An array of dialogue strings. */
    constructor(text, chars_per_sec = 100) {
        this.text = text // Array of dialogue strings.
        this.chars_per_sec = chars_per_sec
    }
}
