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
        this.eaten_counter++
        ActManager.active_draggables.splice(ActManager.active_draggables.indexOf(draggable), 1)
    }

    DrawHoverText() {
        CanvasWrapper.context.save()

        //Set font.
        CanvasWrapper.context.font = `${kW * 0.016}px Arial`;

        // Draw background.
        CanvasWrapper.context.fillStyle = "white"
        const text_size = CanvasWrapper.context.measureText(this.description)
        CanvasWrapper.context.fillRect(this.x - this.w / 2 - text_size.width, this.y - kW * 0.008, text_size.width, kW * 0.016)

        // Draw text.
        CanvasWrapper.context.fillStyle = "black";
        CanvasWrapper.context.textAlign = "right";
        CanvasWrapper.context.textBaseline = "middle"
        CanvasWrapper.context.fillText(this.description, this.x - this.w / 2, this.y);

        CanvasWrapper.context.restore()
    }

}