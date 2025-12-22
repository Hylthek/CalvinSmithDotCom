'use strict';

// Canvas boilerplate.
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
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
        gDialogues.forEach(dialogue => {
            if (dialogue.started) {
                dialogue.curr_text++;
                if (dialogue.curr_text >= dialogue.text.length) {
                    dialogue.curr_text = 0;
                    dialogue.started = false;
                }
            }
        });
    }
})

//     $$$$$$\  $$\                                                   
//    $$  __$$\ $$ |                                                  
//    $$ /  \__|$$ | $$$$$$\   $$$$$$$\  $$$$$$$\  $$$$$$\   $$$$$$$\ 
//    $$ |      $$ | \____$$\ $$  _____|$$  _____|$$  __$$\ $$  _____|
//    $$ |      $$ | $$$$$$$ |\$$$$$$\  \$$$$$$\  $$$$$$$$ |\$$$$$$\  
//    $$ |  $$\ $$ |$$  __$$ | \____$$\  \____$$\ $$   ____| \____$$\ 
//    \$$$$$$  |$$ |\$$$$$$$ |$$$$$$$  |$$$$$$$  |\$$$$$$$\ $$$$$$$  |
//     \______/ \__| \_______|\_______/ \_______/  \_______|\_______/ 
//                                                                    
//                                                                    
//                                                                    
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
    }

    Drop() {
        this.picked_up = false
        this.curr_image = 0;
    }

    Delete() {
        gDraggables.splice(gDraggables.indexOf(this), 1)
    }
}

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
    }

    EatDraggable() {
        this.eaten_counter++
        if (this.eaten_counter == 10) {
            gDialogues[0].Start()
        }
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
        this.visible = true;
    }
}

class Dialogue {
    // In pixels
    static outer_margin = 25
    static inner_margin = 5
    static line_spacing = 20

    constructor(text) {
        this.text = text
        this.started = false
        this.curr_text = 0;
        this.w = 800
        this.h = 200
    }

    Start() {
        this.started = true
        this.curr_text = 0
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
let gDecorations = []
let gDialogues = []
const goobert = new Image()
const goobert2 = new Image()
const goobhole = new Image()
const rat = new Image()
goobert.src = "/room/goobert.png";
goobert2.src = "/room/goobert2.png";
goobhole.src = "/room/goobhole.png";
rat.src = "/room/rat.png";

for (let i = 0; i < 10; i++) {
    const element = gDraggables[i];
    gDraggables.push(new Draggable(250 + 500 * Math.random(), 200 + 300 * Math.random(), 100, 50, [goobert, goobert2]))
}
gContainers.push(new Container(100 + 600 * Math.random(), 100 + 400 * Math.random(), 100, 100, [goobhole]))
gDecorations.push(new Decoration(50, 50, 200, 120, [rat]))
gDialogues.push(new Dialogue([ // Note: newlines in the IDE are part of the string literal.
    `O, ever, do the crepances of the small, four-legged mite dote me unnerved.
For I too once possessed such an abhorration of the mind.
To live without the slight whisper of a morality is to be consumed by night, losing that which binds us to the body,
SOUL.
If this sloth were to ever reach my teeth again, I fear I will not recover.
The predisposition of my own SOUL is that of air, to be strewn about, ceasing in seconds.
Alas, the four-legged mite perseveres, taunting me with subjugations of the psyche.
Will I ever escape this body?
Will I ever defy my bones?
My untimely death would bring no more to you than a breath.`,
    "Its time for a bath.", ":)"]))

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
    if (hovered_draggable && mb1_state && state_changed) {
        hovered_draggable.Pickup()
    }
    if (hovered_draggable && !mb1_state) {
        hovered_draggable.Drop()
        if (hovered_container && state_changed) {
            hovered_draggable.Delete()
            hovered_container.EatDraggable()
        }
    }

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
    return canvas_rect
}

function ClearScreen() { ctx.clearRect(0, 0, canvas.width, canvas.height) }

function DrawBackground() {
    ctx.save()

    const gridSize = 100
    const time_thing = GetTime() * 100 % gridSize
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 1
    for (let x = time_thing; x <= canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
    }
    for (let y = time_thing; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
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
    gDecorations.forEach(element => {
        ctx.drawImage(element.images[element.curr_image], element.x, element.y, element.w, element.h);
    })
}

function DrawDialogues() {
    ctx.save()

    gDialogues.forEach(element => {
        if (element.started) {
            // Process text.
            const lines = element.text[element.curr_text].split("\n")
            const dialogue_height = lines.length * Dialogue.line_spacing

            // Draw box
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
            const x = Dialogue.outer_margin
            const y = canvas.height - (Dialogue.outer_margin + dialogue_height + 2 * Dialogue.inner_margin)
            const w = canvas.width - (2 * Dialogue.outer_margin)
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
        const element = gDraggables[i];
        if (gMouseX > element.x && gMouseX < element.x + element.w &&
            gMouseY > element.y && gMouseY < element.y + element.h)
            return element
    }
    return null
}

function GetHoveredContainer() {
    // Iterate in reverse to prioritize front-most draggables.
    for (let i = gContainers.length - 1; i >= 0; i--) {
        const element = gContainers[i];
        if (gMouseX > element.x && gMouseX < element.x + element.w &&
            gMouseY > element.y && gMouseY < element.y + element.h)
            return element
    }
    return null
}

function UpdateDraggables() {
    for (let i = 0; i < gDraggables.length; i++) {
        const element = gDraggables[i];
        if (element.picked_up) {
            element.x = gMouseX - element.w / 2
            element.y = gMouseY - element.h / 2
        }
        if (gMb1State == false)
            element.Drop()
    }
}