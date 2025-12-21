console.log("Booting...")

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

// Get size of the canvas
let canvas_rect = canvas.getBoundingClientRect()
canvas.width = canvas_rect.width
canvas.height = canvas_rect.height
console.log("Canvas resolution is: ", canvas_rect.width.toFixed(1), canvas_rect.height.toFixed(1))

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
    gMouseX = event.clientX - canvas_rect.left
    gMouseY = event.clientY - canvas_rect.top
})

canvas.addEventListener("mousedown", (event) => {
    gMb1State = true
    gMb1StateChanged = true
})

canvas.addEventListener("mouseup", () => {
    gMb1State = false
    gMb1StateChanged = true
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
    constructor(x, y, w, h, images) {
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
    }

    Drop() {
        this.picked_up = false
        this.curr_image = 0;
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
const goobert = new Image();
const goobert2 = new Image();
goobert.src = "/room/goobert.png";
goobert2.src = "/room/goobert2.png";

gDraggables.push(new Draggable(400, 400, 100, 50, [goobert, goobert2]))

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
window.main = () => {
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
    const hovered_obj = GetHoveredObject()
    if (hovered_obj && mb1_state && state_changed) {
        hovered_obj.Pickup()
    }
    if (hovered_obj && !mb1_state) {
        hovered_obj.Drop()
    }

    UpdateDraggables([x, y], [mb1_state, state_changed])
}
main();
console.log("Main called...")

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
    canvas_rect = canvas.getBoundingClientRect()
    canvas.width = canvas_rect.width
    canvas.height = canvas_rect.height
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
    });
}

function DrawContainers() {
    ctx.save()

    ctx.translate(0.2 * canvas.width, 0.5 * canvas.height)
    ctx.fillStyle = "red";
    ctx.fillRect(-25, -50, 50, 100);

    ctx.restore()
}

function DrawDecorations() {
    ctx.save()

    const vw = canvas.width
    const vh = canvas.height
    ctx.translate(0, 0)
    ctx.strokeStyle = "green";
    ctx.lineWidth = 5;
    ctx.strokeRect(0.1 * vw, 0.1 * vh, 0.8 * vw, 0.8 * vh);

    ctx.restore()
}

function GetMouseData() {
    if (gMb1StateChanged) {
        gMb1StateChanged = false
        return [gMouseX, gMouseY, gMb1State, true]
    }
    else
        return [gMouseX, gMouseY, gMb1State, false]
}

function GetHoveredObject() {
    for (let i = 0; i < gDraggables.length; i++) {
        const element = gDraggables[i];
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