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
    floating_freq = null // Set randomly at instantiation.
    floating_phase = null // Set randomly at instantiation.
    floating_amplitude = 0.001 * kW

    /** images is an array of HTML Image objects. */
    constructor(x, y, w, h, images, description = "Description", compatibilities = []) {
        // This function is.
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.images = images
        this.description = description
        this.compatibilities = compatibilities
        this.floating_freq = 1.5 + Math.random()
        this.floating_phase = Math.random() * Math.PI * 2
    }

    Pickup() {
        this.picked_up = true
        if (this.images.length >= 2)
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
        if (this.y < ScenePerspective.GetScenePoints()[2][1])
            this.falling = true
    }

    Draw() { // Animates floating too.
        const floating_y_offset = this.floating_amplitude * Math.sin(performance.now() / 1000 * this.floating_freq + this.floating_phase)
        kCtx.drawImage(this.images[this.curr_image], this.x - this.w / 2, this.y - this.h / 2 + floating_y_offset, this.w, this.h);
    }

    DrawHoverText() {
        if (this.picked_up)
            return

        kCtx.save()

        //Set font.
        kCtx.font = `${kW * 0.016}px Arial`;

        const text_width = kCtx.measureText(this.description).width
        const destination_text = "Goes in: " + this.compatibilities[0]
        const destination_text_width = kCtx.measureText(destination_text).width
        if (this.x + this.w / 2 + Math.max(text_width, destination_text_width) < kW) { // If text box fits in screen.
            // Draw background.
            kCtx.fillStyle = "white"
            kCtx.fillRect(this.x + this.w / 2, this.y - kW * 0.008, text_width, kW * 0.016)
            if (this.compatibilities.length > 0)
                kCtx.fillRect(this.x + this.w / 2, this.y + kW * 0.008, destination_text_width, kW * 0.016)

            // Draw text.
            kCtx.fillStyle = "black";
            kCtx.textAlign = "left";
            kCtx.textBaseline = "middle"
            kCtx.fillText(this.description, this.x + this.w / 2, this.y);
            if (this.compatibilities.length > 0)
                kCtx.fillText(destination_text, this.x + this.w / 2, this.y + kW * 0.016) // expression uses the arbitrary font size.
        }
        else { // Draw on left hand side.
            // Draw background.
            kCtx.fillStyle = "white"
            kCtx.fillRect(this.x - this.w / 2 - text_width, this.y - kW * 0.008, text_width, kW * 0.016)
            if (this.compatibilities.length > 0)
                kCtx.fillRect(this.x - this.w / 2 - destination_text_width, this.y + kW * 0.008, destination_text_width, kW * 0.016)

            // Draw text.
            kCtx.fillStyle = "black";
            kCtx.textAlign = "right";
            kCtx.textBaseline = "middle"
            kCtx.fillText(this.description, this.x - this.w / 2, this.y);
            if (this.compatibilities.length > 0)
                kCtx.fillText(destination_text, this.x - this.w / 2, this.y + kW * 0.016)
        }

        kCtx.restore()
    }

    Reject() {
        this.x = this.pickup_location[0];
        this.y = this.pickup_location[1];
    }
}

// Broom inherits from Draggable
class Broom extends Draggable {
    // Positional and scale offsets to draw the broom independent from its bounding box.
    drawing_offsets = {
        x: 0 * kW,
        y: -0.22 * kW,
        w: 1.2,
        h: 10
    }
    is_broom = true

    // Function will draw the broom handle above the bounding box of the object.
    Draw() {
        const pos = [this.drawing_offsets.x + this.x - this.w / 2, this.drawing_offsets.y + this.y - this.h / 2]
        const scale = [this.drawing_offsets.w * this.w, this.drawing_offsets.h * this.h]
        kCtx.drawImage(this.images[this.curr_image], pos[0], pos[1], scale[0], scale[1]);
        kCtx.strokeStyle = "black";
        kCtx.lineWidth = kW * 0.002;
    }

    prev_dirt = [] // Dirt previously inside broom hitbox.
    chance_of_removal = 0.25
    // Manages dirt removal.
    CleanDirt() {
        // Find all dirt in hitbox.
        let new_dirt = []
        let curr_dirt = []
        ActManager.active_decorations.forEach((dirt) => {
            const w2 = dirt.w / 2
            const h2 = dirt.h / 2
            if (this.x - this.w / 2 < dirt.x + w2 &&
                this.x + this.w / 2 > dirt.x - w2 &&
                this.y - this.h / 2 < dirt.y + h2 &&
                this.y + this.h / 2 > dirt.y - h2) {
                if (this.prev_dirt.includes(dirt) == false)
                    new_dirt.push(dirt)
                curr_dirt.push(dirt)
            }
        })
        this.prev_dirt = curr_dirt

        // Process new dirt.
        new_dirt.forEach((dirt) => {
            if (Math.random() < this.chance_of_removal) {
                const idx = ActManager.active_decorations.indexOf(dirt)
                ActManager.active_decorations.splice(idx, 1)
                ActManager.dirt_swept++
            }
        });
    }
}

class Node extends Draggable {
    constructor(x, y, diameter) {
        super(x, y, diameter, diameter, [])
        this.x = x;
        this.y = y;
        this.diameter = diameter
    }

    // Function override to disable gravity.
    Drop() {
        super.Drop()
        this.falling = false
    }

    Draw() {
        kCtx.save();

        kCtx.beginPath();
        kCtx.arc(this.x, this.y, this.diameter / 2, 0, Math.PI * 2);
        kCtx.fillStyle = "#6BA851";
        kCtx.fill();

        kCtx.restore();
    }
}