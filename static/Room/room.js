'use strict';

// Constants
const kPixelationFactor = 2 // Must be defined before ResizeCanvas()

// Canvas boilerplate.
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
let gW = undefined // Can't read non-existent inline value as we are using a media query.
let gH = undefined
ResizeCanvas() // Must be called here to set gW and gH to proper values.

//     $$$$$$\  $$\           $$\                 $$\           
//    $$  __$$\ $$ |          $$ |                $$ |          
//    $$ /  \__|$$ | $$$$$$\  $$$$$$$\   $$$$$$\  $$ | $$$$$$$\ 
//    $$ |$$$$\ $$ |$$  __$$\ $$  __$$\  \____$$\ $$ |$$  _____|
//    $$ |\_$$ |$$ |$$ /  $$ |$$ |  $$ | $$$$$$$ |$$ |\$$$$$$\  
//    $$ |  $$ |$$ |$$ |  $$ |$$ |  $$ |$$  __$$ |$$ | \____$$\ 
//    \$$$$$$  |$$ |\$$$$$$  |$$$$$$$  |\$$$$$$$ |$$ |$$$$$$$  |
//     \______/ \__| \______/ \_______/  \_______|\__|\_______/ 
//                                                              
//                                                              
//                                                              
let gMouseX = 0
let gMouseY = 0
let gMb1State = false
let gMb1StateChanged = false

canvas.addEventListener("mousemove", (event) => {
    gMouseX = (event.clientX - canvas.getBoundingClientRect().left) / kPixelationFactor
    gMouseY = (event.clientY - canvas.getBoundingClientRect().top) / kPixelationFactor
})

canvas.addEventListener("mousedown", (event) => {
    gMb1State = true
    gMb1StateChanged = true // Value is reset by GetMouseData()
})

canvas.addEventListener("mouseup", () => {
    gMb1State = false
    gMb1StateChanged = true
})

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        gGameEvents.forEach(event => {
            if (event.curr_stage != -1) {
                event.curr_stage++
                if (event.curr_stage >= event.dialogue.text.length)
                    event.curr_stage = -1;
                event.program(event)
            }
        });
    }
})

//    $$$$$$$\                                                   $$\       $$\           
//    $$  __$$\                                                  $$ |      $$ |          
//    $$ |  $$ | $$$$$$\  $$$$$$\   $$$$$$\   $$$$$$\   $$$$$$\  $$$$$$$\  $$ | $$$$$$\  
//    $$ |  $$ |$$  __$$\ \____$$\ $$  __$$\ $$  __$$\  \____$$\ $$  __$$\ $$ |$$  __$$\ 
//    $$ |  $$ |$$ |  \__|$$$$$$$ |$$ /  $$ |$$ /  $$ | $$$$$$$ |$$ |  $$ |$$ |$$$$$$$$ |
//    $$ |  $$ |$$ |     $$  __$$ |$$ |  $$ |$$ |  $$ |$$  __$$ |$$ |  $$ |$$ |$$   ____|
//    $$$$$$$  |$$ |     \$$$$$$$ |\$$$$$$$ |\$$$$$$$ |\$$$$$$$ |$$$$$$$  |$$ |\$$$$$$$\ 
//    \_______/ \__|      \_______| \____$$ | \____$$ | \_______|\_______/ \__| \_______|
//                                 $$\   $$ |$$\   $$ |                                  
//                                 \$$$$$$  |\$$$$$$  |                                  
//                                  \______/  \______/                                   
class Draggable {
    /** images is an array of HTML Image objects. */
    constructor(x, y, w, h, images) {
        // This function is.
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.images = images
        this.picked_up = false
        this.curr_image = 0;
        this.description = "Drag me!"
        this.compatibilities = []
        this.pickup_location = [null, null]
    }

    Pickup() {
        this.picked_up = true
        this.curr_image = 1;

        // Make last on draw order.
        const idx = gDraggables.indexOf(this)
        gDraggables.splice(idx, 1)
        gDraggables.push(this)

        this.pickup_location = [this.x, this.y]
    }

    Drop() {
        this.picked_up = false
        this.curr_image = 0;
    }

    DrawHoverText() {
        ctx.save()

        //Set font.
        ctx.font = `${gW * 0.016}px Arial`;

        // Draw background.
        ctx.fillStyle = "white"
        const text_size = ctx.measureText(this.description)
        ctx.fillRect(this.x + this.w / 2, this.y - gW * 0.008, text_size.width, gW * 0.016)

        // Draw text.
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle"
        ctx.fillText(this.description, this.x + this.w / 2, this.y);

        ctx.restore()
    }

    Reject() {
        this.x = this.pickup_location[0];
        this.y = this.pickup_location[1];
    }
}

//     $$$$$$\                       $$\               $$\                               
//    $$  __$$\                      $$ |              \__|                              
//    $$ /  \__| $$$$$$\  $$$$$$$\ $$$$$$\    $$$$$$\  $$\ $$$$$$$\   $$$$$$\   $$$$$$\  
//    $$ |      $$  __$$\ $$  __$$\\_$$  _|   \____$$\ $$ |$$  __$$\ $$  __$$\ $$  __$$\ 
//    $$ |      $$ /  $$ |$$ |  $$ | $$ |     $$$$$$$ |$$ |$$ |  $$ |$$$$$$$$ |$$ |  \__|
//    $$ |  $$\ $$ |  $$ |$$ |  $$ | $$ |$$\ $$  __$$ |$$ |$$ |  $$ |$$   ____|$$ |      
//    \$$$$$$  |\$$$$$$  |$$ |  $$ | \$$$$  |\$$$$$$$ |$$ |$$ |  $$ |\$$$$$$$\ $$ |      
//     \______/  \______/ \__|  \__|  \____/  \_______|\__|\__|  \__| \_______|\__|      
//                                                                                       
//                                                                                       
//                                                                                       
class Container {
    /** images is an array of HTML Image objects. */
    constructor(x, y, w, h, images) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.images = images
        this.curr_image = 0;
        this.eaten_counter = 0;
        this.description = "Drop here!"
        this.compatibilities = []
    }

    EatDraggable(draggable) {
        // Scan compatibility lists for a match.
        let compatible = false
        for (let i = 0; i < draggable.compatibilities.length; i++) {
            const type = draggable.compatibilities[i]
            if (this.compatibilities.indexOf(type) != -1) {
                compatible = true
                break
            }
        }
        if (compatible == false) {
            draggable.Reject()
            return;
        }

        // Process successful eat.
        this.eaten_counter++
        gDraggables.splice(gDraggables.indexOf(draggable), 1)
    }

    DrawHoverText() {
        ctx.save()

        //Set font.
        ctx.font = `${gW * 0.016}px Arial`;

        // Draw background.
        ctx.fillStyle = "white"
        const text_size = ctx.measureText(this.description)
        ctx.fillRect(this.x - this.w / 2 - text_size.width, this.y - gW * 0.008, text_size.width, gW * 0.016)

        // Draw text.
        ctx.fillStyle = "black";
        ctx.textAlign = "right";
        ctx.textBaseline = "middle"
        ctx.fillText(this.description, this.x - this.w / 2, this.y);

        ctx.restore()
    }

}

class Decoration {
    /** images is an array of HTML Image objects. */
    constructor(x, y, w, h, images) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.images = images
        this.curr_image = 0;
        this.visible = false;
    }
}

class Dialogue {
    // In pixels
    static outer_margin = gW * 0.025
    static inner_margin = gW * 0.005
    static line_spacing = gW * 0.020

    /**@param text An array of dialogue strings. */
    constructor(text) {
        this.text = text // Array of dialogue strings.
        this.visible = false // Visibility.
        this.curr_text = -1; // Current index of this.text
    }
}

//     $$$$$$\                                    $$$$$$$$\                             $$\     
//    $$  __$$\                                   $$  _____|                            $$ |    
//    $$ /  \__| $$$$$$\  $$$$$$\$$$$\   $$$$$$\  $$ |  $$\    $$\  $$$$$$\  $$$$$$$\ $$$$$$\   
//    $$ |$$$$\  \____$$\ $$  _$$  _$$\ $$  __$$\ $$$$$\\$$\  $$  |$$  __$$\ $$  __$$\\_$$  _|  
//    $$ |\_$$ | $$$$$$$ |$$ / $$ / $$ |$$$$$$$$ |$$  __|\$$\$$  / $$$$$$$$ |$$ |  $$ | $$ |    
//    $$ |  $$ |$$  __$$ |$$ | $$ | $$ |$$   ____|$$ |    \$$$  /  $$   ____|$$ |  $$ | $$ |$$\ 
//    \$$$$$$  |\$$$$$$$ |$$ | $$ | $$ |\$$$$$$$\ $$$$$$$$\\$  /   \$$$$$$$\ $$ |  $$ | \$$$$  |
//     \______/  \_______|\__| \__| \__| \_______|\________|\_/     \_______|\__|  \__|  \____/ 
//                                                                                              
//                                                                                              
//                                                                                              
class GameEvent {
    /**
     * @param {Dialogue} dialogue The dialogue to play for the event.
     * @param {Decoration[]} decorations An array of the characters involved in the event.
     * @param {function} program An anonymous function with the prototype <_(GameObject): void>. 
     */
    constructor(dialogue, decorations, program) {
        this.dialogue = dialogue
        this.decorations = decorations
        this.program = program
        this.can_start = true // Ensures GameEvent can only run once.
        this.curr_stage = -1 // The current stage of this.program
    }

    Run() {
        this.curr_stage = 0;
        this.program(this)
    }

    StartCriterion() { return TotalContainerScore() == 2 && this.can_start; }
}

//    $$$$$$\           $$\   $$\     $$\           $$\ 
//    \_$$  _|          \__|  $$ |    \__|          $$ |
//      $$ |  $$$$$$$\  $$\ $$$$$$\   $$\  $$$$$$\  $$ |
//      $$ |  $$  __$$\ $$ |\_$$  _|  $$ | \____$$\ $$ |
//      $$ |  $$ |  $$ |$$ |  $$ |    $$ | $$$$$$$ |$$ |
//      $$ |  $$ |  $$ |$$ |  $$ |$$\ $$ |$$  __$$ |$$ |
//    $$$$$$\ $$ |  $$ |$$ |  \$$$$  |$$ |\$$$$$$$ |$$ |
//    \______|\__|  \__|\__|   \____/ \__| \_______|\__|
//                                                      
//                                                      
//                                                      
let gDraggables = []
let gContainers = []
let gGameEvents = []
// Draggables
const clothes_img = new Image()
const clothes_unraveled_img = new Image()
const trash_img = new Image()
const trinket_img = new Image()
clothes_img.src = "/room/clothes.png";
clothes_unraveled_img.src = "/room/clothes.png";
trash_img.src = "/room/trash.png";
trinket_img.src = "/room/trinket.png";
// Containers
const trashcan_img = new Image()
const closet_img = new Image()
const cabinet_img = new Image()
trashcan_img.src = "/room/trashcan.png";
closet_img.src = "/room/closet.jpg";
cabinet_img.src = "/room/cabinet.png";
// Characters (decorations)
const shrimp_img = new Image()
const horse_img = new Image()
const leopard_img = new Image()
const spiderman_img = new Image()
const goob_img = new Image()
const wolfman_img = new Image()
shrimp_img.src = "/room/shrimp.png";
horse_img.src = "/room/horsejean.png";
leopard_img.src = "/room/leopard.png";
spiderman_img.src = "/room/spiderman.png";
goob_img.src = "/room/goob.png";
wolfman_img.src = "/room/wolfman.png";

// Add draggables
for (let i = 0; i < 3; i++) {
    gDraggables.push(new Draggable(
        0.2 * gW + 0.6 * Math.random() * gW, (0.7 + 0.2 * Math.random()) * gH,
        gW * 0.05, gW * 0.05, [clothes_img, clothes_unraveled_img] // It doesn't matter whether to use gW or gH for sizes because 16:9 is maintained.
    ))
    gDraggables.push(new Draggable(
        (0.2 + 0.6 * Math.random()) * gW, (0.7 + 0.2 * Math.random()) * gH,
        gW * 0.05, gW * 0.05, [trash_img, trash_img]
    ))
    gDraggables.push(new Draggable(
        (0.2 + 0.6 * Math.random()) * gW, (0.7 + 0.2 * Math.random()) * gH,
        gW * 0.05, gW * 0.05, [trinket_img, trinket_img]
    ))

    const new_draggables = gDraggables.slice(-3)
    new_draggables[0].description = "Clothes";
    new_draggables[0].compatibilities = ["clothes"]
    new_draggables[1].description = "Trash";
    new_draggables[1].compatibilities = ["trash"]
    new_draggables[2].description = "Trinket";
    new_draggables[2].compatibilities = ["trinkets"]
}

// Add containers.
gContainers.push(new Container(gW * 0.2, gH * 0.3, gW * 0.1, gH * 0.2, [closet_img]))
gContainers.push(new Container(gW * 0.9, gH * 0.5, gW * 0.075, gH * 0.15, [trashcan_img]))
gContainers.push(new Container(gW * 0.8, gH * 0.2, gW * 0.1, gH * 0.2, [cabinet_img]))
gContainers[0].description = "The Closet"
gContainers[0].compatibilities = ["clothes"]
gContainers[1].description = "The Trashcan"
gContainers[1].compatibilities = ["trash"]
gContainers[2].description = "The Cabinet"
gContainers[2].compatibilities = ["trinkets"]

// Initialize dialogue.
const poem_dialogue = new Dialogue([ // Note: newlines in the IDE are part of the string literal.
    "O, ever, do the crepances of the small, four-legged mite dote me unnerved.",
    "For I too once possessed such an abhorration of the mind.",
    `To live without the slight whisper of a morality is to be consumed by night,
    losing that which binds us to the body,`,
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
const horse_character = new Decoration(0.1 * gW, 0.5 * gH, 0.2 * gW, 0.2 * gW, [horse_img])

// Initialize game event sequence.
const foo_program = (game_object) => {
    let horse = game_object.decorations[0]
    let poem = game_object.dialogue
    const curr_stage = game_object.curr_stage
    if (curr_stage != -1) {
        horse.visible = true
        poem.visible = true
        poem.curr_text = curr_stage
    }
    switch (curr_stage) {
        case -1:
            horse.visible = false
            poem.visible = false
            break;
        case 0:
            horse.x = 0.2 * gW
            break;
        case 1:
            horse.x = 0.15 * gW
            break;
        case 2:
            horse.x = 0.2 * gW
            break;
        case 3:
            horse.x = 0.15 * gW
            break;
        case 4:
            horse.x = 0.2 * gW
            break;
        case 5:
            horse.x = 0.15 * gW
            break;
        case 6:
            horse.x = 0.2 * gW
            break;
        case 7:
            horse.x = 0.15 * gW
            break;
        case 8:
            horse.x = 0.2 * gW
            break;
        case 9:
            horse.x = 0.15 * gW
            break;
        case 10:
            horse.x = 0.2 * gW
            break;
        case 11:
            horse.x = 0.15 * gW
            break;
        default:
            console.error("Invalid curr_stage.", curr_stage)
            break;
    }
};
gGameEvents.push(new GameEvent(poem_dialogue, [horse_character], foo_program))

//    $$\      $$\           $$\           
//    $$$\    $$$ |          \__|          
//    $$$$\  $$$$ | $$$$$$\  $$\ $$$$$$$\  
//    $$\$$\$$ $$ | \____$$\ $$ |$$  __$$\ 
//    $$ \$$$  $$ | $$$$$$$ |$$ |$$ |  $$ |
//    $$ |\$  /$$ |$$  __$$ |$$ |$$ |  $$ |
//    $$ | \_/ $$ |\$$$$$$$ |$$ |$$ |  $$ |
//    \__|     \__| \_______|\__|\__|  \__|
//                                         
//                                         
//                                         
function main() {
    window.requestAnimationFrame(main);

    // Present screen. (draw objects)
    ResizeCanvas()
    ClearScreen()
    DrawBackground()
    DrawContainers()
    DrawDraggables()
    DrawDecorations()

    // Accept input. (get raw input)
    const _ = GetMouseData()
    const x = _[0]
    const y = _[1]
    const mb1_state = _[2]
    const state_changed = _[3]

    // Calculate next screen. (mutate objects)
    const hovered_draggable = GetHoveredDraggable()
    const hovered_container = GetHoveredContainer()
    if (hovered_draggable && mb1_state && state_changed)
        hovered_draggable.Pickup()
    if (hovered_draggable && !mb1_state)
        hovered_draggable.Drop()
    if (hovered_container && hovered_draggable && !mb1_state && state_changed)
        hovered_container.EatDraggable(hovered_draggable)

    if (hovered_draggable)
        hovered_draggable.DrawHoverText()
    if (hovered_container)
        hovered_container.DrawHoverText()

    // Draw dialogue on top of hover text.
    DrawDialogues()

    UpdateGameEvents()
    UpdateDraggables([x, y], [mb1_state, state_changed])
}
main();

//    $$$$$$$$\                              $$\     $$\                               
//    $$  _____|                             $$ |    \__|                              
//    $$ |   $$\   $$\ $$$$$$$\   $$$$$$$\ $$$$$$\   $$\  $$$$$$\  $$$$$$$\   $$$$$$$\ 
//    $$$$$\ $$ |  $$ |$$  __$$\ $$  _____|\_$$  _|  $$ |$$  __$$\ $$  __$$\ $$  _____|
//    $$  __|$$ |  $$ |$$ |  $$ |$$ /        $$ |    $$ |$$ /  $$ |$$ |  $$ |\$$$$$$\  
//    $$ |   $$ |  $$ |$$ |  $$ |$$ |        $$ |$$\ $$ |$$ |  $$ |$$ |  $$ | \____$$\ 
//    $$ |   \$$$$$$  |$$ |  $$ |\$$$$$$$\   \$$$$  |$$ |\$$$$$$  |$$ |  $$ |$$$$$$$  |
//    \__|    \______/ \__|  \__| \_______|   \____/ \__| \______/ \__|  \__|\_______/ 
//                                                                                     
//                                                                                     
//                                                                                     

function ResizeCanvas() {
    const canvas_rect = canvas.getBoundingClientRect()
    canvas_rect.width /= kPixelationFactor
    canvas_rect.height /= kPixelationFactor
    canvas.width = canvas_rect.width
    canvas.height = canvas_rect.height
    gW = canvas.width
    gH = canvas.height
    return canvas_rect
}

function ClearScreen() { ctx.clearRect(0, 0, gW, gH) }

function DrawBackground() {
    ctx.save()

    // Define frequencies.
    const hz_1 = Math.sin(GetTime()) / 2 + 1
    const hz_2 = Math.sin(GetTime() * 1.314159) / 2 + 1
    const hz_3 = Math.sin(GetTime() * 2.618034) / 2 + 1
    // Draw back rectangle.
    ctx.fillStyle = `rgb(${hz_2 * 50},${hz_3 * 50},${hz_1 * 50})`
    ctx.fillRect(0, 0, gW, gH)
    // Draw gridlines.
    ctx.strokeStyle = `rgb(${hz_1 * 100},${hz_2 * 100},${hz_3 * 100})`
    ctx.lineWidth = gW * 0.05
    const gridSize = gW * 0.1
    for (let t = hz_1 * gridSize - gridSize; t <= gW + gridSize; t += gridSize) {
        ctx.beginPath()
        ctx.moveTo(t, 0)
        ctx.lineTo(t, gH)
        ctx.stroke()
    }
    for (let y = hz_2 * gridSize - gridSize; y <= gH + gridSize; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(gW, y)
        ctx.stroke()
    }

    ctx.restore()
}

// Track the time the page has been running.
function GetTime() {
    const currentTime = performance.now();
    return ((currentTime) / 1000); // Return elapsed time in seconds.
}

function DrawDraggables() {
    gDraggables.forEach(draggable => {
        ctx.drawImage(draggable.images[draggable.curr_image], draggable.x - draggable.w / 2, draggable.y - draggable.h / 2, draggable.w, draggable.h);
    })
}

function DrawContainers() {
    gContainers.forEach(container => {
        ctx.drawImage(container.images[container.curr_image], container.x - container.w / 2, container.y - container.h / 2, container.w, container.h);
    })
}

function DrawDecorations() {
    gGameEvents.forEach(game_event => {
        game_event.decorations.forEach(decoration => {
            if (decoration.visible)
                ctx.drawImage(decoration.images[decoration.curr_image], decoration.x - decoration.w / 2, decoration.y - decoration.h / 2, decoration.w, decoration.h);
        })
    })
}

function DrawDialogues() {
    ctx.save()

    gGameEvents.forEach(game_event => {
        if (game_event.dialogue.visible) {
            // Process text.
            const lines = game_event.dialogue.text[game_event.dialogue.curr_text].split("\n")
            const dialogue_height = lines.length * Dialogue.line_spacing

            // Find maximum text width in lines.
            ctx.font = `${gW * 0.02}px Arial`; // Must be called before ctx.measureText().
            let max_text_width = 0;
            lines.forEach(line => {
                if (ctx.measureText(line).width > max_text_width)
                    max_text_width = ctx.measureText(line).width;
            });

            // Draw box
            ctx.strokeStyle = "black";
            ctx.lineWidth = gW * 0.001;
            ctx.fillStyle = "#bbbbbb";
            const x = (gW - (max_text_width + 2 * Dialogue.inner_margin)) / 2
            const y = gH - (Dialogue.outer_margin + dialogue_height + 2 * Dialogue.inner_margin)
            const w = max_text_width + 2 * Dialogue.inner_margin
            const h = dialogue_height + 2 * Dialogue.inner_margin
            ctx.fillRect(x, y, w, h)
            ctx.strokeRect(x, y, w, h)

            // Draw text.
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";
            lines.forEach((line, index) => {
                ctx.fillText(line, x + w / 2, (y + Dialogue.line_spacing) + Dialogue.inner_margin + Dialogue.line_spacing * index);
            })

            // Draw instruction text.
            const w2 = ctx.measureText("Press space to continue.").width
            ctx.fillStyle = "#bbbbbb";
            ctx.fillRect((gW - w2) / 2, y + h + Dialogue.outer_margin / 2 - Dialogue.line_spacing / 2, w2, Dialogue.line_spacing)
            ctx.strokeRect((gW - w2) / 2, y + h + Dialogue.outer_margin / 2 - Dialogue.line_spacing / 2, w2, Dialogue.line_spacing)
            ctx.fillStyle = "black"
            ctx.fillText("Press space to continue.", gW / 2, y + h + Dialogue.line_spacing / 2 + Dialogue.outer_margin / 2)
        }
    })

    ctx.restore
}

function GetMouseData() {
    if (gMb1StateChanged) {
        gMb1StateChanged = false
        return [gMouseX, gMouseY, gMb1State, true]
    }
    else
        return [gMouseX, gMouseY, gMb1State, false]
}

function GetHoveredDraggable() {
    // Iterate in reverse to prioritize front-most draggables.
    for (let i = gDraggables.length - 1; i >= 0; i--) {
        const draggable = gDraggables[i];
        const w2 = draggable.w / 2
        const h2 = draggable.h / 2
        if (gMouseX > draggable.x - w2 && gMouseX < draggable.x + w2 &&
            gMouseY > draggable.y - h2 && gMouseY < draggable.y + h2)
            return draggable
    }
    return null
}

function GetHoveredContainer() {
    // Iterate in reverse to prioritize front-most draggables.
    for (let i = gContainers.length - 1; i >= 0; i--) {
        const container = gContainers[i];
        const w2 = container.w / 2
        const h2 = container.h / 2
        if (gMouseX > container.x - w2 && gMouseX < container.x + w2 &&
            gMouseY > container.y - h2 && gMouseY < container.y + h2)
            return container
    }
    return null
}

function UpdateDraggables() {
    for (let i = 0; i < gDraggables.length; i++) {
        const draggable = gDraggables[i];
        if (draggable.picked_up) {
            draggable.x = gMouseX
            draggable.y = gMouseY
        }
        if (gMb1State == false)
            draggable.Drop()
    }
}

function TotalContainerScore() {
    let score = 0;
    for (let i = 0; i < gContainers.length; i++) {
        const element = gContainers[i];
        score += element.eaten_counter;
    }
    return score;
}

function UpdateGameEvents() {
    for (let i = 0; i < gGameEvents.length; i++) {
        const game_event = gGameEvents[i];
        if (game_event.StartCriterion()) {
            game_event.can_start = false
            game_event.Run()
        }
    }
}