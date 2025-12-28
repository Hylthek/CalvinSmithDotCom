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

    /** images is an array of HTML Image objects. */
    constructor(x, y, w, h, images) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.images = images
    }
}
