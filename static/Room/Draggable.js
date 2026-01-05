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

    parent_quad = null
    parent_quad_index = null

    // Function override to store pickup_offsets.
    Pickup() {
        this.picked_up = true
        this.pickup_offset = [this.x - gMouseX, this.y - gMouseY]
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

        if (this.is_hovered) {
            kCtx.beginPath()
            kCtx.arc(this.x, this.y, this.diameter * 0.7, 0, Math.PI * 2);
            kCtx.fillStyle = "rgba(107, 168, 81, 0.4)"
            kCtx.fill();
        }
        if (this.picked_up) {
            kCtx.beginPath()
            kCtx.arc(this.x, this.y, this.diameter * 0.9, 0, Math.PI * 2);
            kCtx.fillStyle = "rgba(42, 126, 252, 0.25)"
            kCtx.fill();
            kCtx.beginPath()
            kCtx.arc(this.x, this.y, this.diameter * 0.9, 0, Math.PI * 2);
            kCtx.strokeStyle = "#7EBF19"
            kCtx.lineWidth = kW * 0.004
            kCtx.stroke();
        }

        kCtx.restore();
    }

    SnapToValidPos() {
        const ideal_point = this.parent_quad.FindIdealBedPoint(this.parent_quad_index)
        const distance = Math.sqrt((this.x - ideal_point.x) ** 2 + (this.y - ideal_point.y) ** 2)
        if (distance > this.parent_quad.tolerance * kW) {
            const direction = {
                x: (ideal_point.x - this.x) / distance,
                y: (ideal_point.y - this.y) / distance
            };
            this.x = ideal_point.x - direction.x * this.parent_quad.tolerance * kW;
            this.y = ideal_point.y - direction.y * this.parent_quad.tolerance * kW;
        }
    }

    DrawHoverText() {
        // Do nothing.
    }
}

// This class currently goes in ActManager.active_decorations. Should be refactored later.
class NodeQuadrilateral {
    constructor(ul_node, ur_node, bl_node, br_node, image) {
        this.nodes = [ul_node, ur_node, bl_node, br_node]
        this.image = image
    }

    tolerance = 0.02 // Proportion of kW.

    DrawBed() {
        // Find average of nodes for center of image.
        let avg_point = [0, 0]
        for (let i = 0; i < 4; i++) {
            avg_point[0] += this.nodes[i].x
            avg_point[1] += this.nodes[i].y
        }
        avg_point[0] /= 4
        avg_point[1] /= 4

        // Find rotation of image.
        const rotation =
            Math.atan2(this.nodes[1].y - this.nodes[0].y, this.nodes[1].x - this.nodes[0].x) / 4 +
            Math.atan2(this.nodes[3].y - this.nodes[2].y, this.nodes[3].x - this.nodes[2].x) / 4 +
            -Math.atan2(this.nodes[2].x - this.nodes[0].x, this.nodes[2].y - this.nodes[0].y) / 4 +
            -Math.atan2(this.nodes[3].x - this.nodes[1].x, this.nodes[3].y - this.nodes[1].y) / 4

        // Draw image.
        kCtx.save()
        kCtx.setTransform(
            Math.cos(rotation), Math.sin(rotation),
            -Math.sin(rotation), Math.cos(rotation),
            avg_point[0], avg_point[1]
        )
        kCtx.drawImage(this.image,
            -ActInitializations.bed_dims[0] / 2 * kW,
            -ActInitializations.bed_dims[1] / 2 * kW,
            ActInitializations.bed_dims[0] * kW,
            ActInitializations.bed_dims[1] * kW
        )
        kCtx.restore()

        // If a point is picked up, draw its valid locations circle, centered at a point that is bed_dims[0] from point A and bed_dims[1] from point B.
        const which_picked_up = (this.nodes[0].picked_up << 3) + (this.nodes[1].picked_up << 2) + (this.nodes[2].picked_up << 1) + this.nodes[3].picked_up
        if (which_picked_up) {
            // Find points A and B.
            let node_index = null
            switch (which_picked_up) {
                case 8: node_index = 0; break;
                case 4: node_index = 1; break;
                case 2: node_index = 2; break;
                case 1: node_index = 3; break;
                default: console.error("More than one point picked up.");
            }

            // Find a point that is bed_dims[0] from point A' and bed_dims[1] from point B'.
            const ideal_point = this.FindIdealBedPoint(node_index)

            // Draw the valid locations circle.
            kCtx.save()
            kCtx.beginPath();
            kCtx.arc(ideal_point.x, ideal_point.y, this.tolerance * kW + this.nodes[0].diameter / 2, 0, Math.PI * 2);
            kCtx.fillStyle = "rgba(255,0,0,0.5)";
            kCtx.strokeStyle = "black"
            kCtx.lineWidth = kW * 0.001
            kCtx.fill();
            kCtx.stroke();
            kCtx.restore()
        }
    }

    // Function to find the intersection points of two circles
    FindIdealBedPoint(node_index) {
        let node_a = null
        let node_b = null
        switch (node_index) {
            case 0: node_a = this.nodes[1]; node_b = this.nodes[2]; break;
            case 1: node_a = this.nodes[0]; node_b = this.nodes[3]; break;
            case 2: node_a = this.nodes[3]; node_b = this.nodes[0]; break;
            case 3: node_a = this.nodes[2]; node_b = this.nodes[1]; break;
            default: console.error("Invalid node_index", node_index);
        }
        // Find A' and B', versions of A and B that are the correct distance apart.
        const midpoint = {
            x: (node_a.x + node_b.x) / 2,
            y: (node_a.y + node_b.y) / 2
        }
        // Ideal distance is the expected diagonal length of the bed.
        const ideal_dist = Math.sqrt((ActInitializations.bed_dims[0] * kW) ** 2 + (ActInitializations.bed_dims[1] * kW) ** 2)
        const a_prime = {
            x: midpoint.x + (node_a.x - midpoint.x) / Math.sqrt((node_a.x - midpoint.x) ** 2 + (node_a.y - midpoint.y) ** 2) * ideal_dist / 2,
            y: midpoint.y + (node_a.y - midpoint.y) / Math.sqrt((node_a.x - midpoint.x) ** 2 + (node_a.y - midpoint.y) ** 2) * ideal_dist / 2
        }
        const b_prime = {
            x: midpoint.x + (node_b.x - midpoint.x) / Math.sqrt((node_b.x - midpoint.x) ** 2 + (node_b.y - midpoint.y) ** 2) * ideal_dist / 2,
            y: midpoint.y + (node_b.y - midpoint.y) / Math.sqrt((node_b.x - midpoint.x) ** 2 + (node_b.y - midpoint.y) ** 2) * ideal_dist / 2
        }

        const d = Math.sqrt((node_b.x - node_a.x) ** 2 + (node_b.y - node_a.y) ** 2);
        const dist_a = ActInitializations.bed_dims[0] * kW
        const dist_b = ActInitializations.bed_dims[1] * kW

        // Check if there are no intersections
        if (d > dist_a + dist_b || d < Math.abs(dist_a - dist_b) || d === 0) {
            return null; // No intersection
        }

        // Calculate the distance from node_a to the midpoint of the intersection line
        const a = (dist_a ** 2 - dist_b ** 2 + d ** 2) / (2 * d);

        // Calculate the coordinates of the midpoint
        const mid_x = node_a.x + (a / d) * (node_b.x - node_a.x);
        const mid_y = node_a.y + (a / d) * (node_b.y - node_a.y);

        // Calculate the height of the intersection points from the midpoint
        const h = Math.sqrt(dist_a ** 2 - a ** 2);

        // Calculate the offsets for the intersection points
        const offset_x = (h / d) * (node_b.y - node_a.y);
        const offset_y = (h / d) * (node_b.x - node_a.x);

        // Calculate the intersection points
        const intersection1 = {
            x: mid_x + offset_x,
            y: mid_y - offset_y
        };

        const intersection2 = {
            x: mid_x - offset_x,
            y: mid_y + offset_y
        };

        // Choose which intersection is on the correct side.
        if (node_index == 1 || node_index == 2)
            return intersection1;
        else
            return intersection2;
    }
}
