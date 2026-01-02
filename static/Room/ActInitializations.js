function Lerp(a, b, t) {
    return a + (b - a) * t;
}

// Function gives slope of bisecting line, given two slopes
function BisectingSlope(m, n) {
    const sqrt = Math.sqrt
    const numer = m * sqrt(1 + n * n) + n * sqrt(1 + m * m)
    const denom = sqrt(1 + m * m) + sqrt(1 + n * n)
    return numer / denom
}

class ActInitializations {
    constructor() {
        console.error(": Cannot instantiate this static class.")
    }

    static SplashScreen() {
        // Decoration images.
        const monkey_img = PreloadedImages.monkey
        const heart_image = PreloadedImages.heart
        const fly_img = PreloadedImages.fly
        // Add decorations.
        const monkey = new Decoration(kW * 0.39, kH * 0.6, kW * 0.12, kW * 0.1, [monkey_img])
        const heart = new Decoration(kW * 0.5, kH * 0.6, kW * 0.1, kW * 0.1, [heart_image])
        const fly = new Decoration(kW * 0.6, kH * 0.6, kW * 0.1, kW * 0.1, [fly_img])
        monkey.visible = true;
        fly.visible = true;
        heart.visible = true;
        ActManager.active_decorations.push(monkey)
        ActManager.active_decorations.push(fly)
        ActManager.active_decorations.push(heart)
    }

    static Intro() {
        // GameEvent characters.
        const shrimp_img = PreloadedImages.shrimp
        const shrimp = new Decoration(kW * 0.6, kH * 0.5, kW * 0.2, kW * 0.2, [shrimp_img])

        // GameEvent dialogue.
        const intro_dialogue = new Dialogue([
            "My goodness, I need to clean my room.",
            "It smells like doodoo in here.",
            ">:(",
            "// Dialogue WIP."
        ])

        // GameEvent sequence.
        const intro_sequence = (game_object) => {
            const shrimp = game_object.decorations[0]
            const dialogue = game_object.dialogue
            const curr_stage = game_object.curr_stage;
            if (curr_stage != -1) {
                shrimp.visible = true
                dialogue.visible = true
                dialogue.curr_text = curr_stage
            }
            else {
                shrimp.visible = false
                dialogue.visible = false
            }

            // End of event action.
            if (curr_stage == -1 && game_object.can_start == false)
                ActManager.NextAct()
        }

        // GameEvent
        ActManager.game_events.push(new GameEvent(intro_dialogue, [shrimp], intro_sequence))

        // Run event.
        ActManager.game_events[0].Run()
    }

    static act_1_total_draggables = 27
    static ActOne() {
        // Images
        // Draggables
        const clothes_img = PreloadedImages.clothes
        const clothes_unraveled_img = PreloadedImages.clothes
        const trash_img = PreloadedImages.trash
        const trinket_img = PreloadedImages.trinket
        // Containers
        const trashcan_img = PreloadedImages.trashcan
        const closet_img = PreloadedImages.closet
        const cabinet_img = PreloadedImages.cabinet
        // Characters (decorations)
        const shrimp_img = PreloadedImages.shrimp
        const horse_img = PreloadedImages.horsejean

        // Add draggables
        for (let i = 0; i < ActInitializations.act_1_total_draggables / 3; i++) {
            ActManager.active_draggables.push(new Draggable(
                0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH,
                kW * 0.05, kW * 0.05, [clothes_img, clothes_unraveled_img]
            ))
            ActManager.active_draggables.push(new Draggable(
                (0.2 + 0.6 * Math.random()) * kW, (0.7 + 0.2 * Math.random()) * kH,
                kW * 0.05, kW * 0.05, [trash_img, trash_img]
            ))
            ActManager.active_draggables.push(new Draggable(
                (0.2 + 0.6 * Math.random()) * kW, (0.7 + 0.2 * Math.random()) * kH,
                kW * 0.05, kW * 0.05, [trinket_img, trinket_img]
            ))

            const new_draggables = ActManager.active_draggables.slice(-3)
            new_draggables[0].description = "Clothes";
            new_draggables[0].compatibilities = ["clothes"]
            new_draggables[1].description = "Trash";
            new_draggables[1].compatibilities = ["trash"]
            new_draggables[2].description = "Trinket";
            new_draggables[2].compatibilities = ["trinkets"]
        }

        // Add containers.
        ActManager.active_containers.push(new Container(kW * 0.47, kH * 0.54, kW * 0.1, kH * 0.2, [closet_img]))
        ActManager.active_containers.push(new Container(kW * 0.76, kH * 0.65, kW * 0.05, kH * 0.1, [trashcan_img]))
        ActManager.active_containers.push(new Container(kW * 0.675, kH * 0.24, kW * 0.2, kH * 0.3, [cabinet_img]))
        ActManager.active_containers[0].description = "The Closet"
        ActManager.active_containers[0].compatibilities = ["clothes"]
        ActManager.active_containers[1].description = "The Trashcan"
        ActManager.active_containers[1].compatibilities = ["trash"]
        ActManager.active_containers[2].description = "The Trinket Cabinet"
        ActManager.active_containers[2].compatibilities = ["trinkets"]

        // Add hud.
        ActManager.active_decorations.push(new ProgressHud("Hoarding Progress", 0.025*kW, 0.065*kW, "act-1"))

        // Initialize dialogue.
        const poem_dialogue = new Dialogue([ // Note: newlines in the IDE are part of the string literal.
            "O, ever, do the crepances of the small, four-legged mite dote me unnerved.",
            "For I too once possessed such an abhorration of the mind.",
            "To live without the slight whisper of a morality is to be consumed by night,\nlosing that which binds us to the body,",
            "SOUL.",
            "If this sloth were to ever reach my teeth again, I fear I will not recover.",
            "The predisposition of my own SOUL is that of air, to be strewn about, ceasing in seconds.",
            "Alas, the four-legged mite perseveres, taunting me with subjugations of the psyche.",
            "Will I ever escape this body?",
            "Will I ever defy my bones?",
            "My untimely death would bring no more to you than a breath.",
            "Its time for a bath.",
            "Goodbye."
        ])

        // Initialize characters.
        const horse_character = new Decoration(0.1 * kW, 0.5 * kH, 0.2 * kW, 0.2 * kW, [horse_img])

        // Initialize game event sequence.
        const foo_sequence = (game_object) => {
            let horse = game_object.decorations[0]
            let poem = game_object.dialogue
            const curr_stage = game_object.curr_stage
            if (curr_stage == -1) { // -1 is deactivated state.
                horse.visible = false
                poem.visible = false
            }
            else {
                horse.visible = true
                poem.visible = true
                poem.curr_text = curr_stage
            }
            switch (curr_stage) {
                case 0:
                case 2:
                case 4:
                case 6:
                case 8:
                case 10:
                    horse.x = 0.2 * kW
                    break;
                case 1:
                case 3:
                case 5:
                case 7:
                case 9:
                case 11:
                    horse.x = 0.15 * kW
                    break;
            }

            // End of event action.
            if (curr_stage == -1 && game_object.can_start == false)
                ActManager.NextAct()
        };
        ActManager.game_events.push(new GameEvent(poem_dialogue, [horse_character], foo_sequence))
    }

    static act_2_total_dirt = 3000
    static ActTwo() {
        // Add draggables
        const broom_img = PreloadedImages.broom
        ActManager.active_draggables.push(new Broom(kW * 0.5, kH * 0.8, kW * 0.075, kW * 0.025, [broom_img, broom_img]))
        ActManager.active_draggables[ActManager.active_draggables.length - 1].description = "Broom"
        
        // Add HUD.
        ActManager.active_decorations.push(new ProgressHud("Cleaning Progress", 0.025*kW, 0.065*kW, "act-2"))

        // Add decorations (dirt).
        const dirt_imgs = [PreloadedImages.dirt1, PreloadedImages.dirt2, PreloadedImages.dirt3]
        for (let i = 0; i < ActInitializations.act_2_total_dirt; i++) {
            // Randomize (x, y) but do it so that every dirt image is entirely inside the floor trapezoid.
            const dirt_radius = 0.01 * kW // The center of the square image, to an outer corner.
            const scene_point = ScenePerspective.GetScenePoints()[2] // Bottom left point of the back wall.
            const rand_coef_y = Math.random() // [0, 1]
            const y_val = Lerp(scene_point[1] + dirt_radius, kH - dirt_radius, rand_coef_y) // Dirt image is strictly contained to floor, vertically.
            const slope_1 = BisectingSlope(0, (kH - scene_point[1]) / scene_point[0]) // Slope between the bottom-left room-edge & a horizontal line (acute).
            const slope_2 = -1 / slope_1 // Slope between the bottom-left room-edge & a horizontal line (obtuse).
            const x_offset = Lerp(scene_point[0] - 1 / slope_2 * dirt_radius, 1 / slope_1 * dirt_radius, rand_coef_y) // Multiply dirt radius with RUN/RISE of each slope.
            const x_val = Lerp(x_offset, kW - x_offset, Math.random()) // Use the offset to create a trapezoid shape with (x_val, y_val).
            const rand_idx = Math.floor(Math.random() * 2.999) // 0:2
            ActManager.active_decorations.push(new Decoration(x_val, y_val, dirt_radius * Math.SQRT2, dirt_radius * Math.SQRT2, [dirt_imgs[rand_idx]]))
            const just_pushed = ActManager.active_decorations[ActManager.active_decorations.length - 1]
            just_pushed.visible = true
            just_pushed.rotation = Math.random() * 360
            just_pushed.is_background = true
        }
        // Characters
        const leopard_img = PreloadedImages.leopard
        const spiderman_img = PreloadedImages.spiderman
    }
}