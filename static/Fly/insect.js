// Get html objects.
const fly_swatter = document.getElementById('fly-swatter-id');

// Globals.
let gCursorX = 0;
let gCursorY = 0;
let gMouseClicked = false;

// Listen for events.
document.addEventListener('mousemove', (event) => {
    gCursorX = event.clientX; // X-coordinate of the cursor
    gCursorY = event.clientY; // Y-coordinate of the cursor
});
document.addEventListener('mousedown', (event) => {
    gMouseClicked = true;
    gCursorX = event.clientX;
    gCursorY = event.clientY;
});

// Fly class.
class Fly {
    static kFlySpeed = 5;
    static kStopTimeMin = 10000;
    static kStopTimeMax = 20000;
    static kWakeUpThreshold = 60;
    static kFlyAwayMaxSpeed = 50;
    static kFlyAwayThreshold = 60;
    static kWallThreshold = 50;
    static kWallSpeed = 10;
    static kWallBuffer = 200;
    static kCrawlingMaxAngle = 10;

    constructor() {
        this.html_element = document.getElementById('insect-id');
        this.state = "NULL";
        this.stateTimeoutId = null;
        this.velo_x = 0;
        this.velo_y = 0;
    }

    // This is where the control flow of the fly automaton is defined.
    ChangeState(state) {
        // Update state immediately.
        this.state = state;
        console.log("FlyState: ", state);

        // Find string and timeout for the next state.
        let state_later = null;
        let timeout_ms = null;
        switch (state) {
            case "moving": // Moving -> Stopped.
                state_later = "stopped";
                timeout_ms = Math.random() * 3000 + 1000;
                break;
            case "stopped": // Stopped -> Crawling.
                state_later = "crawling";
                timeout_ms = Math.random() * 1000 + 300;
                break;
            case "crawling": // Crawling -> Stopped.
                state_later = "stopped";
                timeout_ms = Math.random() * 1000 + 100;
                // There is also an additional requirement for entering crawling state.
                this.html_element.style.transform = `rotate(${Math.random() * 360}deg)`;
                break;
            default:
                console.error("Unknown state:", state);
                return;
        }

        clearTimeout(this.stateTimeoutId);
        this.stateTimeoutId = setTimeout(() => {
            this.ChangeState(state_later);
        }, timeout_ms);
    }

    // Update function called per-frame.
    InsectUpdate() {
        switch (this.state) {
            case "moving": {
                // Get curr pos.
                const curr_x = parseFloat(gFly.html_element.style.left) || window.innerWidth / 2;
                const curr_y = parseFloat(gFly.html_element.style.top) || window.innerHeight / 2;

                // Get vector from cursor to insect.
                const dist_x = curr_x - gCursorX;
                const dist_y = curr_y - gCursorY;
                const dist_mag = Math.sqrt(dist_x * dist_x + dist_y * dist_y);

                // Update accel and velo and pos.
                const accel_x = (2 * Math.random() - 1) * 30;
                const accel_y = (2 * Math.random() - 1) * 30;
                this.velo_x = this.velo_x + accel_x;
                this.velo_y = this.velo_y + accel_y;

                // Bounce off walls.
                let x = curr_x + this.velo_x;
                let y = curr_y + this.velo_y;
                if (x < Fly.kWallBuffer) {
                    x = Fly.kWallBuffer;
                    this.velo_x *= -1;
                }
                if (y < Fly.kWallBuffer) {
                    y = Fly.kWallBuffer;
                    this.velo_y *= -1;
                }
                if (x > window.innerWidth - Fly.kWallBuffer - 40) {
                    x = window.innerWidth - Fly.kWallBuffer - 40;
                    this.velo_x *= -1;
                }
                if (y > window.innerHeight - Fly.kWallBuffer - 40) {
                    y = window.innerHeight - Fly.kWallBuffer - 40;
                    this.velo_y *= -1;
                }

                // Update pos.
                gFly.html_element.style.left = `${x}px`;
                gFly.html_element.style.top = `${y}px`;


                // Apply drag.
                const velo_mag = Math.sqrt(this.velo_x * this.velo_x + this.velo_y * this.velo_y);
                const drag_x = 0.001 * velo_mag * velo_mag * -this.velo_x / velo_mag;
                const drag_y = 0.001 * velo_mag * velo_mag * -this.velo_y / velo_mag;
                this.velo_x += drag_x;
                this.velo_y += drag_y;

                // Rotate sprite.
                const angle = Math.atan2(this.velo_y, this.velo_x) * 180 / Math.PI + 90;
                gFly.html_element.style.transform = `rotate(${angle}deg)`;

                // Check mouse position if reset timeout.
                if (dist_mag < Fly.kWakeUpThreshold) {
                    this.ChangeState("moving");
                }

                break;
            }
            case "stopped": {
                // Stop fly.
                this.velo_x = 0;
                this.velo_y = 0;

                // Check if cursor is close.
                const curr_x = parseFloat(gFly.html_element.style.left) || window.innerWidth / 2;
                const curr_y = parseFloat(gFly.html_element.style.top) || window.innerHeight / 2;
                const dist_x = curr_x - gCursorX;
                const dist_y = curr_y - gCursorY;
                if (Math.sqrt(dist_x * dist_x + dist_y * dist_y) < Fly.kWakeUpThreshold) {
                    this.ChangeState("moving");
                    return;
                }

                // Check if fly is outside window.
                if (curr_x < 0 || curr_x > window.innerWidth || curr_y < 0 || curr_y > window.innerHeight) {
                    this.ChangeState("moving");
                    return;
                }

                break;
            }
            case "crawling": {
                // Get current angle. CW=positive, North=0.
                let curr_angle_deg;
                const match = gFly.html_element.style.transform.match(/rotate\((.+)\)/);
                if (match && match[1]) {
                    curr_angle_deg = parseFloat(match[1]);
                }
                else {
                    gFly.html_element.style.transform = `rotate(0deg)`
                }

                // Turn angle into radians in standard orientation.
                const curr_angle_rad = (90 - curr_angle_deg) * Math.PI / 180;
                const rand_angle_rad = curr_angle_rad + Fly.kCrawlingMaxAngle * Math.PI / 180 * (2 * Math.random() - 1)

                // Turn angle into velocity.
                const kCrawlingVelocity = 20;
                let velo_x = kCrawlingVelocity * Math.cos(rand_angle_rad);
                let velo_y = -kCrawlingVelocity * Math.sin(rand_angle_rad);

                // If out of bounds, reflect velocity.
                const curr_x = parseFloat(gFly.html_element.style.left) || window.innerWidth / 2;
                const curr_y = parseFloat(gFly.html_element.style.top) || window.innerHeight / 2;
                if (curr_x < Fly.kWallBuffer && velo_x < 0)
                    velo_x *= -1;
                if (curr_x + 40 > window.innerWidth - Fly.kWallBuffer && velo_x > 0)
                    velo_x *= -1;
                if (curr_y < Fly.kWallBuffer && velo_y < 0)
                    velo_y *= -1;
                if (curr_y + 40 > window.innerHeight - Fly.kWallBuffer && velo_y > 0)
                    velo_y *= -1;

                // Update position.
                const x = curr_x + velo_x;
                const y = curr_y + velo_y;
                gFly.html_element.style.left = `${x}px`;
                gFly.html_element.style.top = `${y}px`;

                // Update rotation.
                const angle = Math.atan2(velo_y, velo_x) * 180 / Math.PI + 90;
                gFly.html_element.style.transform = `rotate(${angle}deg)`;

                // Check if cursor is close.
                const dist_x = curr_x - gCursorX;
                const dist_y = curr_y - gCursorY;
                if (Math.sqrt(dist_x * dist_x + dist_y * dist_y) < Fly.kWakeUpThreshold) {
                    this.ChangeState("moving");
                    return;
                }

                break;
            }
            default: {
                console.error("Unknown state:", this.state);
                break;
            }
        }
    }
}

// Update function for fly swatter object.
let gFlySwatterTimeoutId = null;
function FlySwatterUpdate() {
    // Poll for a mouse click interrupt.
    if (gMouseClicked == false)
        return;
    gMouseClicked = false;

    PlayRandFlySwatterSfx();

    fly_swatter.style.display = "inline";
    fly_swatter.style.top = `${gCursorY}px`;
    fly_swatter.style.left = `${gCursorX}px`;
    clearTimeout(gFlySwatterTimeoutId);
    gFlySwatterTimeoutId = setTimeout(() => {
        fly_swatter.style.display = "none";
    }, 100);
}

let fly_swatter_sfx_timeout_id = null;
function PlayRandFlySwatterSfx() {
    buzzing_sfx.play();

    const rand_num = Math.floor(4.99 * Math.random()); // i.e. {0,1,2,3,4}.

    switch (rand_num) {
        case 0:
            fly_swatter_sfx.currentTime = 0.43; break;
        case 1:
            fly_swatter_sfx.currentTime = 1.83; break;
        case 2:
            fly_swatter_sfx.currentTime = 2.76; break;
        case 3:
            fly_swatter_sfx.currentTime = 5.37; break;
        case 4:
            fly_swatter_sfx.currentTime = 7.928; break;
        default:
            console.error("WHAT?"); break;
    }

    fly_swatter_sfx.play()
    clearTimeout(fly_swatter_sfx_timeout_id);
    fly_swatter_sfx_timeout_id = setTimeout(() => {
        fly_swatter_sfx.pause();
        fly_swatter_sfx.currentTime = 0;
    }, 300);
}

function MainLoop() {
    gFly.InsectUpdate();
    FlySwatterUpdate();
    setTimeout(() => {
        MainLoop();
    }, 50);
}

// Instantiate Fly object.
const gFly = new Fly();

// Initialize fly buzzing sfx.
const buzzing_sfx = new Audio("Fly/buzzing.mp3");
buzzing_sfx.loop = true;

// Initialize fly swatter sfx.
const fly_swatter_sfx = new Audio("Fly/fly_swatter_sfx.mp3");

// Click to start.
document.addEventListener('mousedown', () => {
    // Make the object with id "kill-him" bob up and down.
    const kill_him = document.getElementById("kill-him");
    function BobbingAnimation() {
        const bobbing_offset = Math.sin(Date.now() / 500) * 10;
        const pulsating_factor = Math.sin(Date.now() / 785) * 0.1;
        
        kill_him.style.transform = `translateX(-50%) translateY(calc(${bobbing_offset}px - 50%)) scale(${pulsating_factor + 1})`;
        
        requestAnimationFrame(BobbingAnimation);
    }
    // Start the bobbing animation.
    BobbingAnimation();
    
    // Make the object with id "fly-container" lerp sinusoidally between two outline styles.
    const fly_container = document.getElementById("fly-container");
    // Initialize new audio objects.
    const demon_breathe_in = new Audio("Fly/demon_breathe_in.mp3");
    const demon_breathe_out = new Audio("Fly/demon_breathe_out.mp3");
    demon_breathe_in.volume = 0.4;
    demon_breathe_out.volume = 0.6;
    function OutlineAnimation() {
        const lerp_factor = (Math.sin(Date.now() / 1500) + 1) / 2; // Normalized between 0 and 1.
        const outline_width = 20 + lerp_factor * 10;
        const outline_color = `rgb(${241 + lerp_factor * (220 - 241)}, ${245 + lerp_factor * (20 - 245)}, ${249 + lerp_factor * (9 - 249)})`; // Lerp between #F1F5F9 and crimson.
        
        fly_container.style.outline = `${outline_width}px solid ${outline_color}`;
        
        if (lerp_factor > 0.99)
            demon_breathe_out.play();
        if (lerp_factor < 0.01)
            demon_breathe_in.play();
        
        requestAnimationFrame(OutlineAnimation);
    }
    // Start the outline animation.
    OutlineAnimation();
    
    // Hide start screen.
    const click_start_screen = document.getElementById("click-start-screen");
    console.log("checking")
    if (click_start_screen) {
        click_start_screen.style.display = "none";
    }

    // Initial call.
    gFly.ChangeState("moving");
    buzzing_sfx.play();
    MainLoop();
}, { once: true });
