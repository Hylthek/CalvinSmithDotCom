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

// Stolen from stack overflow. "Fisher–Yates (aka Knuth) Shuffle"
function ShuffleArray(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
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

    static total_closet_draggables = 2
    static total_cabinet_draggables = 2
    static total_trashcan_draggables = 2
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
        ActInitializations.AddActOneDraggables()

        // Add containers.
        ActManager.active_containers.push(new Container(kW * 0.385, kH * 0.34, kW * 0.195, kH * 0.45, [closet_img]))
        ActManager.active_containers.push(new Container(kW * 0.76, kH * 0.62, kW * 0.075, kH * 0.15, [trashcan_img]))
        ActManager.active_containers.push(new Container(kW * 0.653, kH * 0.253, kW * 0.2, kH * 0.2, [cabinet_img]))
        ActManager.active_containers[0].description = "The Closet"
        ActManager.active_containers[0].compatibilities = ["closet"]
        ActManager.active_containers[1].description = "The Trashcan"
        ActManager.active_containers[1].compatibilities = ["trashcan"]
        ActManager.active_containers[2].description = "The Trinket Cabinet"
        ActManager.active_containers[2].compatibilities = ["cabinet"]

        // Add hud.
        ActManager.active_decorations.push(new ProgressHud("Closet Progress", 0.025 * kW, 0.065 * kW, "closet-progress"))
        ActManager.active_decorations.push(new ProgressHud("Cabinet Progress", 0.025 * kW, 0.085 * kW, "cabinet-progress"))
        ActManager.active_decorations.push(new ProgressHud("Trash Progress", 0.025 * kW, 0.105 * kW, "trashcan-progress"))

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
        ActManager.active_decorations.push(new ProgressHud("Sweeping Progress", 0.025 * kW, 0.065 * kW, "sweeping-progress"))

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

    // Magic numbers are derived from background image.
    static bed_dims = [0.835 - 0.585, 0.4 - 0.05] // Width and height in proportions of kW.
    static ActThree() {
        // Add bed nodes.
        const n1 = new Node(kW * 0.585, kW * 0.05, kW * 0.03)
        const n2 = new Node(kW * 0.835, kW * 0.05, kW * 0.03)
        const n3 = new Node(kW * 0.835, kW * 0.4, kW * 0.03)
        const n4 = new Node(kW * 0.585, kW * 0.4, kW * 0.03)
        ActManager.active_draggables.push(n1)
        ActManager.active_draggables.push(n2)
        ActManager.active_draggables.push(n3)
        ActManager.active_draggables.push(n4)
        ActManager.active_decorations.push(new NodeQuadrilateral(n1, n2, n3, n4, PreloadedImages.act_3_bed))
    }

    // A bulk push for act1 draggables.
    static AddActOneDraggables() {
        const default_size = 0.1 * kW

        // Closet draggables. Closet draggables. Closet draggables. Closet draggables.
        // Closet draggables. Closet draggables. Closet draggables. Closet draggables.
        // Closet draggables. Closet draggables. Closet draggables. Closet draggables.
        // Closet draggables. Closet draggables. Closet draggables. Closet draggables.
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.blackcanvas],
            "A shirt",
            ["closet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.crumpledblackplaid, PreloadedImages.blackplaid],
            "A shirt",
            ["closet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.comb],
            "A comb",
            ["closet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.combjar],
            "A jar",
            ["closet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.deodorant],
            "Some deodorant",
            ["closet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.earrings],
            "An earring stand",
            ["closet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.fancycrumpled, PreloadedImages.fancyshirt],
            "A shirt",
            ["closet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.greenfuzzcrumpled, PreloadedImages.greenshirt],
            "A shirt",
            ["closet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.patternedcrumpled, PreloadedImages.greypatternedshirt],
            "A shirt",
            ["closet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.leather],
            "A leather jacket",
            ["closet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.makeupjar],
            "A jar",
            ["closet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.mucin],
            "Snail mucin",
            ["closet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.polkacrumpled, PreloadedImages.polka],
            "A shirt",
            ["closet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.pinktray],
            "A tray",
            ["closet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.redplaidcrumpled, PreloadedImages.redplaid],
            "A shirt",
            ["closet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.strawberry],
            "A strawberry tray",
            ["closet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.whitetray],
            "A cat tray",
            ["closet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.gordon],
            "Gordon",
            ["closet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.gumdrop],
            "Gumdrop",
            ["closet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.flowervase],
            "A vase",
            ["closet"]
        ))

        // Cabinet draggables. Cabinet draggables. Cabinet draggables. Cabinet draggables.
        // Cabinet draggables. Cabinet draggables. Cabinet draggables. Cabinet draggables.
        // Cabinet draggables. Cabinet draggables. Cabinet draggables. Cabinet draggables.
        // Cabinet draggables. Cabinet draggables. Cabinet draggables. Cabinet draggables.
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.alligator],
            "An alligator that kinda looks like you.",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.blueslug],
            "A tiny blue glass slug. \"Meow\"",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.cow],
            "Rainbow cow",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.crab],
            "He will hold your pens",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.glassdragon],
            "A red glass dragon. \"RAHHH\"",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.glassescane],
            "A cool dude",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.glassmonkey],
            "A brown glass monkey \"Hello I am a monkey\"",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.gradcane],
            "Graduated valedogtorian",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.happysnail],
            "A happy snail",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.headphones],
            "Your trusty headphones",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.legored],
            "A LEGO plant",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.legovenusflytrap],
            "A LEGO Venus Flytrap",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.penguinduck],
            "A duck in penguin's clothing",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.percussionfrog],
            "Frog instrument",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.pineapplefrog],
            "A frog that is also a mutated pineapple.",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.planathan],
            "Planathan",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.rainbowturtle],
            "A rainbow turtle",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.raven],
            "Quoth The Raven",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.shrimpcasket],
            "in pace, requiescat!",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.toucan],
            "Quoth The Toucan",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.turtle],
            "A flying turtle",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.valentinemonkeyplush],
            "A cute monkey with no insidious backstory whatsoever",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.whale],
            "A big blue whale",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.whitesquish],
            "A squishy guy",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.yellowslug],
            "A tiny yellow glass slug \"Meow\"",
            ["cabinet"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.yellowsquish],
            "A squishy guy",
            ["cabinet"]
        ))

        // Trash draggables. Trash draggables. Trash draggables. Trash draggables.
        // Trash draggables. Trash draggables. Trash draggables. Trash draggables.
        // Trash draggables. Trash draggables. Trash draggables. Trash draggables.
        // Trash draggables. Trash draggables. Trash draggables. Trash draggables.
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.box],
            "An empty box of cookies",
            ["trashcan"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.hotcocoa],
            "An empty box of hot cocoa",
            ["trashcan"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.pocky],
            "An empty bag of Pocky",
            ["trashcan"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.pockybox],
            "An empty box of Pocky",
            ["trashcan"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.tacocup],
            "A cup from TacoBell",
            ["trashcan"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.tissue1],
            "A tissue",
            ["trashcan"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.tissue2],
            "A tissue",
            ["trashcan"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.tissue3],
            "I rotoscoped these tissues by hand",
            ["trashcan"]
        ))
        ActManager.active_draggables.push(new Draggable(0.2 * kW + 0.6 * Math.random() * kW, (0.7 + 0.2 * Math.random()) * kH, default_size, default_size,
            [PreloadedImages.waterbottle],
            "An empty WinCo-brand water bottle",
            ["trashcan"]
        ))

        // Randomize the array.
        ShuffleArray(ActManager.active_draggables)
    }
}