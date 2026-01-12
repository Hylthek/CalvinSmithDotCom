class Container {
    x = null
    y = null
    w = null
    h = null
    images = null
    curr_image = 0;
    eaten_counter = 0;
    description = "Drop here!"
    compatibilities = []

    /** images is an array of HTML Image objects. */
    constructor(x, y, w, h, images) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.images = images
    }

    TryEatDraggable(draggable) {
        // Scan compatibility lists for a match.
        let compatible = false
        for (let i = 0; i < draggable.compatibilities.length; i++) {
            const type = draggable.compatibilities[i]
            if (this.compatibilities.indexOf(type) != -1) {
                compatible = true
                break;
            }
        }
        if (compatible == false) {
            draggable.Reject()
            return;
        }

        // Process successful eat.
        draggable.GetEaten()
        ActManager.container_contents[draggable.compatibilities[0]]++
    }

    DrawHoverText() {
        kCtx.save()

        //Set font.
        kCtx.font = `${kW * 0.016}px Arial`;

        // Draw background.
        kCtx.fillStyle = "white"
        const text_size = kCtx.measureText(this.description)
        kCtx.fillRect(this.x - this.w / 2 - text_size.width, this.y - kW * 0.008, text_size.width, kW * 0.016)

        // Draw text.
        kCtx.fillStyle = "black";
        kCtx.textAlign = "right";
        kCtx.textBaseline = "middle"
        kCtx.fillText(this.description, this.x - this.w / 2, this.y);

        kCtx.restore()
    }

}