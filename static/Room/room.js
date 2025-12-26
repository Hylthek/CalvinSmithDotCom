'use strict'; // Makes sure variables don't accidentally pollute the global scope.

//     $$$$$$\                                  $$\                          $$\               
//    $$  __$$\                                 $$ |                         $$ |              
//    $$ /  \__| $$$$$$\  $$$$$$$\   $$$$$$$\ $$$$$$\    $$$$$$\  $$$$$$$\ $$$$$$\    $$$$$$$\ 
//    $$ |      $$  __$$\ $$  __$$\ $$  _____|\_$$  _|   \____$$\ $$  __$$\\_$$  _|  $$  _____|
//    $$ |      $$ /  $$ |$$ |  $$ |\$$$$$$\    $$ |     $$$$$$$ |$$ |  $$ | $$ |    \$$$$$$\  
//    $$ |  $$\ $$ |  $$ |$$ |  $$ | \____$$\   $$ |$$\ $$  __$$ |$$ |  $$ | $$ |$$\  \____$$\ 
//    \$$$$$$  |\$$$$$$  |$$ |  $$ |$$$$$$$  |  \$$$$  |\$$$$$$$ |$$ |  $$ | \$$$$  |$$$$$$$  |
//     \______/  \______/ \__|  \__|\_______/    \____/  \_______|\__|  \__|  \____/ \_______/ 
//                                                                                             
//                                                                                             
//                                                                                             
// Constants pt1.
const kPixelationFactor = 2 // Must be defined before ResizeCanvas()

// Canvas boilerplate.
const kCanvas = document.getElementById("canvas")
const kCtx = kCanvas.getContext("2d")
kCanvas.width = kCanvas.getBoundingClientRect().width / kPixelationFactor
kCanvas.height = kCanvas.getBoundingClientRect().height / kPixelationFactor
const kW = kCanvas.width // It doesn't matter whether to reference kW or kH for normalization because 16:9 is maintained.
const kH = kCanvas.height

// Constants pt2.
const kVanishingPoint = [0.5 * kW, 0.2 * kH]
const kSceneDepth = 0.45 // Proportional length to the vanishing point that the room edges are drawn.

//    $$$$$$$$\                             $$\     $$\       $$\             $$\                                                       
//    $$  _____|                            $$ |    $$ |      \__|            $$ |                                                      
//    $$ |  $$\    $$\  $$$$$$\  $$$$$$$\ $$$$$$\   $$ |      $$\  $$$$$$$\ $$$$$$\    $$$$$$\  $$$$$$$\   $$$$$$\   $$$$$$\   $$$$$$$\ 
//    $$$$$\\$$\  $$  |$$  __$$\ $$  __$$\\_$$  _|  $$ |      $$ |$$  _____|\_$$  _|  $$  __$$\ $$  __$$\ $$  __$$\ $$  __$$\ $$  _____|
//    $$  __|\$$\$$  / $$$$$$$$ |$$ |  $$ | $$ |    $$ |      $$ |\$$$$$$\    $$ |    $$$$$$$$ |$$ |  $$ |$$$$$$$$ |$$ |  \__|\$$$$$$\  
//    $$ |    \$$$  /  $$   ____|$$ |  $$ | $$ |$$\ $$ |      $$ | \____$$\   $$ |$$\ $$   ____|$$ |  $$ |$$   ____|$$ |       \____$$\ 
//    $$$$$$$$\\$  /   \$$$$$$$\ $$ |  $$ | \$$$$  |$$$$$$$$\ $$ |$$$$$$$  |  \$$$$  |\$$$$$$$\ $$ |  $$ |\$$$$$$$\ $$ |      $$$$$$$  |
//    \________|\_/     \_______|\__|  \__|  \____/ \________|\__|\_______/    \____/  \_______|\__|  \__| \_______|\__|      \_______/ 
//                                                              
//                                                              
//                                                              
// Globals
let gMouseX = 0
let gMouseY = 0
let gMb1State = false
let gMb1StateChanged = false

kCanvas.addEventListener("mousemove", (event) => {
    gMouseX = (event.clientX - kCanvas.getBoundingClientRect().left) / kPixelationFactor
    gMouseY = (event.clientY - kCanvas.getBoundingClientRect().top) / kPixelationFactor
})
kCanvas.addEventListener("mousedown", (event) => {
    gMb1State = true
    gMb1StateChanged = true // Value is reset by main().
})
kCanvas.addEventListener("mouseup", () => {
    gMb1State = false
    gMb1StateChanged = true // Value is reset by main().
})
document.addEventListener("keydown", (event) => {
    // Progress dialogues.
    if (event.code === "Space") {
        ActManager.game_events.forEach(event => {
            if (event.curr_stage != -1) {
                event.curr_stage++
                if (event.curr_stage >= event.dialogue.text.length)
                    event.curr_stage = -1;
                event.sequence(event)
            }
        });
    }
    if (event.code === 'KeyN') {
        ActManager.NextAct()
    }
})

//     $$$$$$\              $$\     $$\      $$\                                                             
//    $$  __$$\             $$ |    $$$\    $$$ |                                                            
//    $$ /  $$ | $$$$$$$\ $$$$$$\   $$$$\  $$$$ | $$$$$$\  $$$$$$$\   $$$$$$\   $$$$$$\   $$$$$$\   $$$$$$\  
//    $$$$$$$$ |$$  _____|\_$$  _|  $$\$$\$$ $$ | \____$$\ $$  __$$\  \____$$\ $$  __$$\ $$  __$$\ $$  __$$\ 
//    $$  __$$ |$$ /        $$ |    $$ \$$$  $$ | $$$$$$$ |$$ |  $$ | $$$$$$$ |$$ /  $$ |$$$$$$$$ |$$ |  \__|
//    $$ |  $$ |$$ |        $$ |$$\ $$ |\$  /$$ |$$  __$$ |$$ |  $$ |$$  __$$ |$$ |  $$ |$$   ____|$$ |      
//    $$ |  $$ |\$$$$$$$\   \$$$$  |$$ | \_/ $$ |\$$$$$$$ |$$ |  $$ |\$$$$$$$ |\$$$$$$$ |\$$$$$$$\ $$ |      
//    \__|  \__| \_______|   \____/ \__|     \__| \_______|\__|  \__| \_______| \____$$ | \_______|\__|      
//                                                                             $$\   $$ |                    
//                                                                             \$$$$$$  |                    
//                                                                              \______/                     
class ActManager {
    static current_act = 0 // Values 0-4: (intro,clean,sweep,moveBed,credits)
    static active_draggables = []
    static active_containers = []
    static active_decorations = []
    static game_events = []

    constructor() {
        console.error(": Cannot instantiate this \"static\" class.")
    }

    static NextAct() {
        switch (this.current_act) {
            case 0:
                ActManager.ClearArrays()
                ActInitializations.ActOne()
                this.current_act = 1
                break;
            case 1:
                ActManager.ClearArrays()
                // Load.
                this.current_act = 2
                break;
            case 2:
                ActManager.ClearArrays()
                // Load.
                this.current_act = 3
                break;
            case 3:
                ActManager.ClearArrays()
                // Load.
                this.current_act = 4
                break;
            case 4:
                ActManager.ClearArrays()
                // Load.
                console.log("End of game reached.")
                break;
            default:
                console.error("Invalid act number.", this.current_act)
                break;
        }
    }

    static ClearArrays() {
        this.active_containers = []
        this.active_draggables = []
        this.active_decorations = []
        this.game_events = []
    }

    static GetHoveredDraggable() {
        // Iterate in reverse to prioritize front-most draggables.
        for (let i = this.active_draggables.length - 1; i >= 0; i--) {
            const draggable = this.active_draggables[i];
            const w2 = draggable.w / 2
            const h2 = draggable.h / 2
            if (gMouseX > draggable.x - w2 && gMouseX < draggable.x + w2 &&
                gMouseY > draggable.y - h2 && gMouseY < draggable.y + h2)
                return draggable
        }
        return null
    }

    static GetHoveredContainer() {
        // Iterate in reverse to prioritize front-most draggables.
        for (let i = this.active_containers.length - 1; i >= 0; i--) {
            const container = this.active_containers[i];
            const w2 = container.w / 2
            const h2 = container.h / 2
            if (gMouseX > container.x - w2 && gMouseX < container.x + w2 &&
                gMouseY > container.y - h2 && gMouseY < container.y + h2)
                return container
        }
        return null
    }

    static UpdateDraggables() {
        for (let i = 0; i < this.active_draggables.length; i++) {
            // Handle pickups.
            const draggable = this.active_draggables[i];
            if (draggable.picked_up) {
                draggable.x = gMouseX
                draggable.y = gMouseY
            }
            if (gMb1State == false)
                draggable.Drop()

            // Gravity.
            if (draggable.falling) {
                // Update pos and velo.
                draggable.y += kH * draggable.velocity
                draggable.velocity += 0.01;
                // Fix bugged pickup locations.
                if (draggable.pickup_location[1] < GetScenePoints()[2][1])
                    draggable.pickup_location[1] = (GetScenePoints()[2][1] + kH) / 2
                // Stop gravity if object hit pickup height.
                if (draggable.y > draggable.pickup_location[1]) {
                    draggable.falling = false
                    draggable.velocity = 0;
                    draggable.y = draggable.pickup_location[1]
                }
            }
        }
    }

    static TotalContainerScore() {
        let score = 0;
        for (let i = 0; i < this.active_containers.length; i++) {
            const element = this.active_containers[i];
            score += element.eaten_counter;
        }
        return score;
    }

    static UpdateGameEvents() {
        for (let i = 0; i < this.game_events.length; i++) {
            const game_event = this.game_events[i];
            if (game_event.StartCriterionMet()) {
                game_event.can_start = false
                game_event.Run()
            }
        }
    }
}

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

    /** images is an array of HTML Image objects. */
    constructor(x, y, w, h, images) {
        // This function is.
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.images = images
    }

    Pickup() {
        this.picked_up = true
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
        if (this.y < GetScenePoints()[2][1])
            this.falling = true
    }

    DrawHoverText() {
        kCtx.save()

        //Set font.
        kCtx.font = `${kW * 0.016}px Arial`;

        // Draw background.
        kCtx.fillStyle = "white"
        const text_size = kCtx.measureText(this.description)
        kCtx.fillRect(this.x + this.w / 2, this.y - kW * 0.008, text_size.width, kW * 0.016)

        // Draw text.
        kCtx.fillStyle = "black";
        kCtx.textAlign = "left";
        kCtx.textBaseline = "middle"
        kCtx.fillText(this.description, this.x + this.w / 2, this.y);

        kCtx.restore()
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
        ActManager.active_draggables.splice(ActManager.active_draggables.indexOf(draggable), 1)
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

//    $$$$$$$\                                                    $$\     $$\                     
//    $$  __$$\                                                   $$ |    \__|                    
//    $$ |  $$ | $$$$$$\   $$$$$$$\  $$$$$$\   $$$$$$\  $$$$$$\ $$$$$$\   $$\  $$$$$$\  $$$$$$$\  
//    $$ |  $$ |$$  __$$\ $$  _____|$$  __$$\ $$  __$$\ \____$$\\_$$  _|  $$ |$$  __$$\ $$  __$$\ 
//    $$ |  $$ |$$$$$$$$ |$$ /      $$ /  $$ |$$ |  \__|$$$$$$$ | $$ |    $$ |$$ /  $$ |$$ |  $$ |
//    $$ |  $$ |$$   ____|$$ |      $$ |  $$ |$$ |     $$  __$$ | $$ |$$\ $$ |$$ |  $$ |$$ |  $$ |
//    $$$$$$$  |\$$$$$$$\ \$$$$$$$\ \$$$$$$  |$$ |     \$$$$$$$ | \$$$$  |$$ |\$$$$$$  |$$ |  $$ |
//    \_______/  \_______| \_______| \______/ \__|      \_______|  \____/ \__| \______/ \__|  \__|
//                                                                                                
//                                                                                                
//                                                                                                
// Decorations are drawn after draggables and containers.
class Decoration {
    x = null
    y = null
    w = null
    h = null
    images = null
    curr_image = 0;
    visible = false;

    /** images is an array of HTML Image objects. */
    constructor(x, y, w, h, images) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.images = images
    }
}

//    $$$$$$$\  $$\           $$\                                         
//    $$  __$$\ \__|          $$ |                                        
//    $$ |  $$ |$$\  $$$$$$\  $$ | $$$$$$\   $$$$$$\  $$\   $$\  $$$$$$\  
//    $$ |  $$ |$$ | \____$$\ $$ |$$  __$$\ $$  __$$\ $$ |  $$ |$$  __$$\ 
//    $$ |  $$ |$$ | $$$$$$$ |$$ |$$ /  $$ |$$ /  $$ |$$ |  $$ |$$$$$$$$ |
//    $$ |  $$ |$$ |$$  __$$ |$$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |$$   ____|
//    $$$$$$$  |$$ |\$$$$$$$ |$$ |\$$$$$$  |\$$$$$$$ |\$$$$$$  |\$$$$$$$\ 
//    \_______/ \__| \_______|\__| \______/  \____$$ | \______/  \_______|
//                                          $$\   $$ |                    
//                                          \$$$$$$  |                    
//                                           \______/                     
class Dialogue {
    static outer_margin = kW * 0.025
    static inner_margin = kW * 0.005
    static line_spacing = kW * 0.020
    visible = false // Visibility.
    curr_text = -1; // Current index of this.text
    text = null

    /**@param text An array of dialogue strings. */
    constructor(text) {
        this.text = text // Array of dialogue strings.
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
    dialogue = null
    decorations = null
    sequence = null
    can_start = true // Ensures GameEvent can only run once.
    curr_stage = -1 // The current stage of this.program

    /**
     * @param {Dialogue} dialogue The dialogue to play for the event.
     * @param {Decoration[]} decorations An array of the characters involved in the event.
     * @param {function} sequence An anonymous function with the prototype <_(GameObject): void>. 
     */
    constructor(dialogue, decorations, sequence) {
        this.dialogue = dialogue
        this.decorations = decorations
        this.sequence = sequence
    }

    Run() {
        this.curr_stage = 0;
        this.sequence(this)
    }

    StartCriterionMet() { return ActManager.TotalContainerScore() == 2 && this.can_start; }
}

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

class DrawingHelperFunctions {
    constructor() {
        console.error(": Cant instantiate static class.")
    }

    static ClearScreen() { kCtx.clearRect(0, 0, kW, kH) }

    static DrawBackground() {
        if (ActManager.current_act != 1)
            return;

        kCtx.save()

        const scene_points = GetScenePoints()
        kCtx.strokeStyle = "black";
        kCtx.lineWidth = kW * 0.0015;
        kCtx.beginPath();
        kCtx.moveTo(0, 0);
        kCtx.lineTo(scene_points[0][0], scene_points[0][1]);
        kCtx.lineTo(scene_points[1][0], scene_points[1][1]);
        kCtx.lineTo(kW, 0);
        kCtx.moveTo(0, kH);
        kCtx.lineTo(scene_points[2][0], scene_points[2][1]);
        kCtx.lineTo(scene_points[3][0], scene_points[3][1]);
        kCtx.lineTo(kW, kH);
        kCtx.moveTo(scene_points[0][0], scene_points[0][1]);
        kCtx.lineTo(scene_points[2][0], scene_points[2][1]);
        kCtx.moveTo(scene_points[1][0], scene_points[1][1]);
        kCtx.lineTo(scene_points[3][0], scene_points[3][1]);
        kCtx.stroke();

        kCtx.font = `${kW * 0.02}px Arial`;
        kCtx.fillStyle = "black";
        kCtx.textAlign = "center";
        kCtx.textBaseline = "middle";
        kCtx.fillText("Placeholder", kW * 0.1, kH * 0.5);
        kCtx.fillText("Placeholder", kW * 0.9, kH * 0.5);
        kCtx.fillText("Placeholder", kW * 0.5, kH * 0.4);
        kCtx.fillText("Placeholder", kW * 0.5, kH * 0.8);
        kCtx.fillText("Placeholder", kW * 0.5, kH * 0.05);

        kCtx.restore()
    }

    static DrawDraggables() {
        ActManager.active_draggables.forEach(draggable => {
            kCtx.drawImage(draggable.images[draggable.curr_image], draggable.x - draggable.w / 2, draggable.y - draggable.h / 2, draggable.w, draggable.h);
        })
    }

    static DrawContainers() {
        ActManager.active_containers.forEach(container => {
            kCtx.drawImage(container.images[container.curr_image], container.x - container.w / 2, container.y - container.h / 2, container.w, container.h);
        })
    }

    static DrawDecorations() {
        ActManager.game_events.forEach(game_event => {
            game_event.decorations.forEach(decoration => {
                if (decoration.visible)
                    kCtx.drawImage(decoration.images[decoration.curr_image], decoration.x - decoration.w / 2, decoration.y - decoration.h / 2, decoration.w, decoration.h);
            })
        })
    }

    static DrawDialogues() {
        kCtx.save()

        ActManager.game_events.forEach(game_event => {
            if (game_event.dialogue.visible) {
                // Process text.
                const lines = game_event.dialogue.text[game_event.dialogue.curr_text].split("\n")
                const dialogue_height = lines.length * Dialogue.line_spacing

                // Find maximum text width in lines.
                kCtx.font = `${kW * 0.02}px Arial`; // Must be called before ctx.measureText().
                let max_text_width = 0;
                lines.forEach(line => {
                    if (kCtx.measureText(line).width > max_text_width)
                        max_text_width = kCtx.measureText(line).width;
                });

                // Draw box
                kCtx.strokeStyle = "black";
                kCtx.lineWidth = kW * 0.001;
                kCtx.fillStyle = "#bbbbbb";
                const x = (kW - (max_text_width + 2 * Dialogue.inner_margin)) / 2
                const y = kH - (Dialogue.outer_margin + dialogue_height + 2 * Dialogue.inner_margin)
                const w = max_text_width + 2 * Dialogue.inner_margin
                const h = dialogue_height + 2 * Dialogue.inner_margin
                kCtx.fillRect(x, y, w, h)
                kCtx.strokeRect(x, y, w, h)

                // Draw text.
                kCtx.fillStyle = "black";
                kCtx.textAlign = "center";
                kCtx.textBaseline = "bottom";
                lines.forEach((line, index) => {
                    kCtx.fillText(line, x + w / 2, (y + Dialogue.line_spacing) + Dialogue.inner_margin + Dialogue.line_spacing * index);
                })

                // Draw instruction text.
                const w2 = kCtx.measureText("Press space to continue.").width
                kCtx.fillStyle = "#bbbbbb";
                kCtx.fillRect((kW - w2) / 2, y + h + Dialogue.outer_margin / 2 - Dialogue.line_spacing / 2, w2, Dialogue.line_spacing)
                kCtx.strokeRect((kW - w2) / 2, y + h + Dialogue.outer_margin / 2 - Dialogue.line_spacing / 2, w2, Dialogue.line_spacing)
                kCtx.fillStyle = "black"
                kCtx.fillText("Press space to continue.", kW / 2, y + h + Dialogue.line_spacing / 2 + Dialogue.outer_margin / 2)
            }
        })

        kCtx.restore
    }
}

// Helper function
// Returns a double array of the 2D coordinates of the room corners.
// [TopLeft, TopRight, BottomLeft, BottomLeft]
function GetScenePoints() {
    return [
        [kVanishingPoint[0] * kSceneDepth, kVanishingPoint[1] * kSceneDepth],
        [kW - kVanishingPoint[0] * kSceneDepth, kVanishingPoint[1] * kSceneDepth],
        [kVanishingPoint[0] * kSceneDepth, kH - (kH - kVanishingPoint[1]) * kSceneDepth],
        [kW - kVanishingPoint[0] * kSceneDepth, kH - (kH - kVanishingPoint[1]) * kSceneDepth]
    ]
}

//     $$$$$$\              $$\               
//    $$  __$$\             $$ |              
//    $$ /  $$ | $$$$$$$\ $$$$$$\    $$$$$$$\ 
//    $$$$$$$$ |$$  _____|\_$$  _|  $$  _____|
//    $$  __$$ |$$ /        $$ |    \$$$$$$\  
//    $$ |  $$ |$$ |        $$ |$$\  \____$$\ 
//    $$ |  $$ |\$$$$$$$\   \$$$$  |$$$$$$$  |
//    \__|  \__| \_______|   \____/ \_______/ 
//                                            
//                                            
//                                            
class ActInitializations {
    constructor() {
        console.error(": Cannot instantiate this static class.")
    }

    static ActOne() {
        // Images
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
        for (let i = 0; i < 9; i++) {
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
                    horse.x = 0.2 * kW
                    break;
                case 1:
                    horse.x = 0.15 * kW
                    break;
                case 2:
                    horse.x = 0.2 * kW
                    break;
                case 3:
                    horse.x = 0.15 * kW
                    break;
                case 4:
                    horse.x = 0.2 * kW
                    break;
                case 5:
                    horse.x = 0.15 * kW
                    break;
                case 6:
                    horse.x = 0.2 * kW
                    break;
                case 7:
                    horse.x = 0.15 * kW
                    break;
                case 8:
                    horse.x = 0.2 * kW
                    break;
                case 9:
                    horse.x = 0.15 * kW
                    break;
                case 10:
                    horse.x = 0.2 * kW
                    break;
                case 11:
                    horse.x = 0.15 * kW
                    break;
                default:
                    console.error("Invalid curr_stage.", curr_stage)
                    break;
            }
        };
        ActManager.game_events.push(new GameEvent(poem_dialogue, [horse_character], foo_sequence))
    }
}

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
    DrawingHelperFunctions.ClearScreen()
    DrawingHelperFunctions.DrawBackground()
    DrawingHelperFunctions.DrawContainers()
    DrawingHelperFunctions.DrawDraggables()
    DrawingHelperFunctions.DrawDecorations()

    // Accept input. (get raw input)
    const mb1_state = gMb1State
    const state_changed = gMb1StateChanged
    if (gMb1StateChanged) gMb1StateChanged = false; // gMb1StateChanged is set by eventlistener and reset by main.

    // Calculate next screen. (mutate objects)
    const hovered_draggable = ActManager.GetHoveredDraggable()
    const hovered_container = ActManager.GetHoveredContainer()
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
    DrawingHelperFunctions.DrawDialogues()

    ActManager.UpdateGameEvents()
    ActManager.UpdateDraggables()
}
main();

