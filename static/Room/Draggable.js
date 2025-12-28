class Draggable {
    x = null
    y = null
    w = null
    h = null
    images = null
    picked_up = false
    curr_image = 0;
    description = ""
    compatibilities = []
    pickup_location = [null, null]
    falling = false;
    velocity = 0; // A proportion of gH.

    /** images is an array of HTML Image objects. */
    constructor(x, y, w, h, images) {
        // This function is.
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.images = images
    }

    Pickup() {
        this.picked_up = true
        this.curr_image = 1;

        // Make last on draw order.
        const idx = ActManager.active_draggables.indexOf(this)
        ActManager.active_draggables.splice(idx, 1)
        ActManager.active_draggables.push(this)

        this.pickup_location = [this.x, this.y]
        this.falling = false
        this.velocity = 0
    }

    Drop() {
        this.picked_up = false
        this.curr_image = 0;

        // Handle gravity.
        if (this.y < GetScenePoints()[2][1])
            this.falling = true
    }

    DrawHoverText() {
        if (this.picked_up)
            return

        kCtx.save()

        //Set font.
        kCtx.font = `${kW * 0.016}px Arial`;

        // Draw background.
        kCtx.fillStyle = "white"
        const text_size = kCtx.measureText(this.description)
        kCtx.fillRect(this.x + this.w / 2, this.y - kW * 0.008, text_size.width, kW * 0.016)

        // Draw text.
        kCtx.fillStyle = "black";
        kCtx.textAlign = "left";
        kCtx.textBaseline = "middle"
        kCtx.fillText(this.description, this.x + this.w / 2, this.y);

        kCtx.restore()
    }

    Reject() {
        this.x = this.pickup_location[0];
        this.y = this.pickup_location[1];
    }
}

// Broom inherits from Draggable
class Broom extends Draggable {
    broom_tip = [kW * -0.009, kH * 0.17] // Location of the broom tip relative to image center.
    buffer_factor = 5 // Amount of extra this.heights to stretch sprite upwards.

    // Function will draw the broom handle above the bounding box of the object.
    Draw() {
        const buffer = this.buffer_factor * this.h
        kCtx.drawImage(this.images[this.curr_image], this.x - this.w / 2, this.y - this.h / 2 - buffer, this.w, this.h + buffer);
    }
}