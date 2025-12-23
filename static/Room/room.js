'use strict';

// Canvas boilerplate.
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
let gW = canvas.width
let gH = canvas.height
ResizeCanvas()

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
    gMouseX = event.clientX - ResizeCanvas().left
    gMouseY = event.clientY - ResizeCanvas().top
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

    Draw() {
        ctx.save()

        if (this.images) {
            ctx.drawImage(this.images[this.curr_image], this.x, this.y, this.w, this.h);
        }

        ctx.restore()
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

        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle"
        ctx.fillText(this.description, this.x + this.w, this.y + this.h / 2);

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

        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "right";
        ctx.textBaseline = "middle"
        ctx.fillText(this.description, this.x, this.y + this.h / 2);

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
    static outer_margin = 25
    static inner_margin = 5
    static line_spacing = 20

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
        100, 100, [clothes_img, clothes_unraveled_img]
    ))
    gDraggables.push(new Draggable(
        (0.2 + 0.6 * Math.random()) * gW, (0.7 + 0.2 * Math.random()) * gH,
        100, 100, [trash_img, trash_img]
    ))
    gDraggables.push(new Draggable(
        (0.2 + 0.6 * Math.random()) * gW, (0.7 + 0.2 * Math.random()) * gH,
        100, 100, [trinket_img, trinket_img]
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
gContainers.push(new Container(gW*0.2, gH*0.3, gW/10, gH/10, [closet_img]))
gContainers.push(new Container(gW*0.9, gH*0.5, gW/10, gH/10, [trashcan_img]))
gContainers.push(new Container(gW*0.8, gH*0.2, gW/10, gH/10, [cabinet_img]))
gContainers[0].description = "The Closet"
gContainers[0].compatibilities = ["clothes"]
gContainers[1].description = "The Trashcan"
gContainers[1].compatibilities = ["trash"]
gContainers[2].description = "The Cabinet"
gContainers[2].compatibilities = ["trinkets"]

// Add game event.
const poem_dialogue = new Dialogue([ // Note: newlines in the IDE are part of the string literal.
    "O, ever, do the crepances of the small, four-legged mite dote me unnerved.",
    "For I too once possessed such an abhorration of the mind.",
    "To live without the slight whisper of a morality is to be consumed by night, losing that which binds us to the body,",
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
const horse_character = new Decoration(100, 100, 100, 100, [horse_img])
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
            horse.x = 200
            break;
        case 1:
            horse.x = 100
            break;
        case 2:
            horse.x = 200
            break;
        case 3:
            horse.x = 100
            break;
        case 4:
            horse.x = 200
            break;
        case 5:
            horse.x = 100
            break;
        case 6:
            horse.x = 200
            break;
        case 7:
            horse.x = 100
            break;
        case 8:
            horse.x = 200
            break;
        case 9:
            horse.x = 100
            break;
        case 10:
            horse.x = 200
            break;
        case 11:
            horse.x = 100
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
    DrawDialogues()

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

    UpdateDecorations()
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
    canvas.width = canvas_rect.width
    canvas.height = canvas_rect.height
    gW = canvas.width
    gH = canvas.height
    return canvas_rect
}

function ClearScreen() { ctx.clearRect(0, 0, gW, gH) }

function DrawBackground() {
    ctx.save()

    const gridSize = 100
    const time_thing = GetTime() * 100 % gridSize
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 1
    for (let t = time_thing; t <= gW; t += gridSize) {
        ctx.beginPath()
        ctx.moveTo(t, 0)
        ctx.lineTo(t, gH)
        ctx.stroke()
    }
    for (let y = time_thing; y <= gH; y += gridSize) {
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
    gDraggables.forEach(element => {
        element.Draw()
    })
}

function DrawContainers() {
    gContainers.forEach(element => {
        ctx.drawImage(element.images[element.curr_image], element.x, element.y, element.w, element.h);
    })
}

function DrawDecorations() {
    gGameEvents.forEach(game_event => {
        game_event.decorations.forEach(decoration => {
            if (decoration.visible)
                ctx.drawImage(decoration.images[decoration.curr_image], decoration.x, decoration.y, decoration.w, decoration.h);
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

            // Draw box
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
            const x = Dialogue.outer_margin
            const y = gH - (Dialogue.outer_margin + dialogue_height + 2 * Dialogue.inner_margin)
            const w = gW - (2 * Dialogue.outer_margin)
            const h = dialogue_height + 2 * Dialogue.inner_margin
            ctx.strokeRect(x, y, w, h)
            ctx.fillRect(x, y, w, h)

            // Draw text.
            ctx.font = "20px Arial";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";
            lines.forEach((line, index) => {
                ctx.fillText(line, x + w / 2, (y + Dialogue.line_spacing) + Dialogue.inner_margin + Dialogue.line_spacing * index);
            })

            // Draw instruction text.
            ctx.fillText("Press space to continue.", x + w / 2, y + h + Dialogue.line_spacing / 2 + Dialogue.outer_margin / 2)
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
        if (gMouseX > draggable.x && gMouseX < draggable.x + draggable.w &&
            gMouseY > draggable.y && gMouseY < draggable.y + draggable.h)
            return draggable
    }
    return null
}

function GetHoveredContainer() {
    // Iterate in reverse to prioritize front-most draggables.
    for (let i = gContainers.length - 1; i >= 0; i--) {
        const container = gContainers[i];
        if (gMouseX > container.x && gMouseX < container.x + container.w &&
            gMouseY > container.y && gMouseY < container.y + container.h)
            return container
    }
    return null
}

function UpdateDraggables() {
    for (let i = 0; i < gDraggables.length; i++) {
        const draggable = gDraggables[i];
        if (draggable.picked_up) {
            draggable.x = gMouseX - draggable.w / 2
            draggable.y = gMouseY - draggable.h / 2
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

function UpdateDecorations() {
    // Placeholder.
}

function UpdateGameEvents() {
    for (let i = 0; i < gGameEvents.length; i++) {
        const game_event = gGameEvents[i];
        if (TotalContainerScore() == 10 && game_event.can_start) {
            game_event.can_start = false
            game_event.Run()
        }
    }
}

function UpdateDialogue() {
    for (let i = 0; i < gDialogues.length; i++) {
        const element = gDialogues[i];
        if (TotalContainerScore() == 10 && element.can_start) {
            element.can_start = false
            element.Start()
        }
    }
}
