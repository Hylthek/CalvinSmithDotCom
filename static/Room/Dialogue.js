class Dialogue {
    static outer_margin = kW * 0.025
    static inner_margin = kW * 0.005
    static line_spacing = kW * 0.020
    visible = false // Visibility.
    curr_text = -1; // Current index of this.text
    text = null

    /**@param text An array of dialogue strings. */
    constructor(text) {
        this.text = text // Array of dialogue strings.
    }
}
