function InverseLerp(a, b, value) {
    if (a === b) {
        return 0; // Avoid division by zero.
    }
    return (value - a) / (b - a);
}

class Decoration {
    x = null
    y = null
    w = null
    h = null
    images = null
    curr_image = 0;
    visible = false;
    rotation = 0; // In degrees cw.
    is_background = false // Draw in the background instead of foreground.
    is_flipped_horizontally = false

    /** images is an array of HTML Image objects. */
    constructor(x, y, w, h, images) {
        this.x = x; 
        this.y = y;
        this.w = w;
        this.h = h;
        this.images = images
    }

    // Helper function.
    SetPosAndScale(x, y, scale) {
        // Store initial size.
        if (!this.initial_size)
            this.initial_size = {w: this.w, h: this.h}
        
        // Scale.
        if (scale == 0)
            console.error("Decoration scale cannot be zero.")
        if (scale < 0) {
            this.is_flipped_horizontally = true
            scale = -scale
        }
        else
            this.is_flipped_horizontally = false
        this.w = this.initial_size.w * scale
        this.h = this.initial_size.h * scale

        // Position.
        this.x = x * kW
        this.y = y * kH
    }
}
