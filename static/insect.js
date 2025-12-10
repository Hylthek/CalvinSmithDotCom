const insect = document.getElementById('insect-id');
const fly_swatter = document.getElementById('fly-swatter-id');
insect.style.position = 'absolute';

const kFlySpeed = 5;
const kStopTimeMin = 10000;
const kStopTimeMax = 20000;
const kWakeUpThreshold = 60;
const kFlyAwayMaxSpeed = 50;
const kFlyAwayThreshold = kWakeUpThreshold;
const kWallThreshold = 50;
const kWallSpeed = 10;
const kWallBuffer = 200;

let state = "NULL";
let cursor_x = 0;
let cursor_y = 0;
let accel_x = 0;
let accel_y = 0;
let velo_x = 0;
let velo_y = 0;

let state_timeout_id;

let mouse_clicked = false;

const kCrawlingMaxAngle = 10;

// Listen for mousemove events
document.addEventListener('mousemove', (event) => {
    cursor_x = event.clientX; // X-coordinate of the cursor
    cursor_y = event.clientY; // Y-coordinate of the cursor
});

// Listen for mouse click events
document.addEventListener('mousedown', (event) => {
    mouse_clicked = true;
    cursor_x = event.clientX;
    cursor_y = event.clientY;
});

function InsectUpdate() {
    if (state == "moving") {
        // Get curr pos.
        const curr_x = parseFloat(insect.style.left) || window.innerWidth / 2;
        const curr_y = parseFloat(insect.style.top) || window.innerHeight / 2;

        // Get vector from cursor to insect.
        const dist_x = curr_x - cursor_x;
        const dist_y = curr_y - cursor_y;
        const dist_mag = Math.sqrt(dist_x * dist_x + dist_y * dist_y);

        // Vector from insect to center.
        // const bulb_x = window.innerWidth / 2;
        // const bulb_y = window.innerHeight / 4;
        // const dist_bulb_x = bulb_x - curr_x;
        // const dist_bulb_y = bulb_y - curr_y;
        // const dist_bulb_mag = Math.sqrt(dist_bulb_x * dist_bulb_x + dist_bulb_y * dist_bulb_y);

        // Accelerate toward lightbulb center.
        // accel_toward_bulb_x = (dist_bulb_x / dist_bulb_mag) * 30;
        // accel_toward_bulb_y = (dist_bulb_y / dist_bulb_mag) * 30;
        accel_toward_bulb_x = 0;
        accel_toward_bulb_y = 0;

        // Bounce off light bulb
        // if (dist_bulb_mag < 100 && ((velo_x * dist_bulb_x + velo_y * dist_bulb_y) > 0)) {
        //     velo_x *= -1;
        //     velo_y *= -1;
        // }

        // Update accel and velo and pos.
        accel_x = (2 * Math.random() - 1) * 30 + accel_toward_bulb_x;
        accel_y = (2 * Math.random() - 1) * 30 + accel_toward_bulb_y;
        velo_x = velo_x + accel_x;
        velo_y = velo_y + accel_y;

        // Bounce off walls.
        let x = curr_x + velo_x;
        let y = curr_y + velo_y;
        if (x < kWallBuffer) {
            velo_x *= -1;
            x = kWallBuffer;
        }
        if (y < kWallBuffer) {
            y = kWallBuffer;
            velo_y *= -1;
        }
        if (x > window.innerWidth - kWallBuffer - 40) {
            x = window.innerWidth - kWallBuffer - 40;
            velo_x *= -1;
        }
        if (y > window.innerHeight - kWallBuffer - 40) {
            y = window.innerHeight - kWallBuffer - 40;
            velo_y *= -1;
        }

        // Update pos.
        insect.style.left = `${x}px`;
        insect.style.top = `${y}px`;


        // Apply drag.
        const velo_mag = Math.sqrt(velo_x * velo_x + velo_y * velo_y);
        const drag_x = 0.001 * velo_mag * velo_mag * -velo_x / velo_mag;
        const drag_y = 0.001 * velo_mag * velo_mag * -velo_y / velo_mag;
        velo_x += drag_x;
        velo_y += drag_y;

        // Rotate sprite.
        const angle = Math.atan2(velo_y, velo_x) * 180 / Math.PI + 90;
        insect.style.transform = `rotate(${angle}deg)`;

        // Check mouse position if reset timeout.
        if (dist_mag < kWakeUpThreshold) {
            StartMoving();
        }
    }
    else if (state == "stopped") {
        // Stop fly.
        accel_x = 0;
        accel_y = 0;
        velo_x = 0;
        velo_y = 0;

        // Check if cursor is close.
        const curr_x = parseFloat(insect.style.left) || window.innerWidth / 2;
        const curr_y = parseFloat(insect.style.top) || window.innerHeight / 2;
        const dist_x = curr_x - cursor_x;
        const dist_y = curr_y - cursor_y;
        if (Math.sqrt(dist_x * dist_x + dist_y * dist_y) < kWakeUpThreshold) {
            StartMoving();
            return;
        }

        // Check if fly is outside window.
        if (curr_x < 0 || curr_x > window.innerWidth || curr_y < 0 || curr_y > window.innerHeight) {
            StartMoving();
            return;
        }
    }
    else if (state == "crawling") {
        // Get current angle. CW=positive, North=0.
        let curr_angle_deg;
        const match = insect.style.transform.match(/rotate\((.+)\)/);
        if (match && match[1]) {
            curr_angle_deg = parseFloat(match[1]);
        }
        else {
            insect.style.transform = `rotate(0deg)`
        }

        // Turn angle into radians in standard orientation.
        const curr_angle_rad = (90 - curr_angle_deg) * Math.PI / 180;
        const rand_angle_rad = curr_angle_rad + kCrawlingMaxAngle * Math.PI / 180 * (2 * Math.random() - 1)

        // Turn angle into velocity.
        const kCrawlingVelocity = 20;
        let velo_x = kCrawlingVelocity * Math.cos(rand_angle_rad);
        let velo_y = -kCrawlingVelocity * Math.sin(rand_angle_rad);

        // If out of bounds, reflect velocity.
        const curr_x = parseFloat(insect.style.left) || window.innerWidth / 2;
        const curr_y = parseFloat(insect.style.top) || window.innerHeight / 2;
        if (curr_x < kWallBuffer && velo_x < 0)
            velo_x *= -1;
        if (curr_x + 40 > window.innerWidth - kWallBuffer && velo_x > 0)
            velo_x *= -1;
        if (curr_y < kWallBuffer && velo_y < 0)
            velo_y *= -1;
        if (curr_y + 40 > window.innerHeight - kWallBuffer && velo_y > 0)
            velo_y *= -1;

        // Update position.
        const x = curr_x + velo_x;
        const y = curr_y + velo_y;
        insect.style.left = `${x}px`;
        insect.style.top = `${y}px`;

        // Update rotation.
        const angle = Math.atan2(velo_y, velo_x) * 180 / Math.PI + 90;
        insect.style.transform = `rotate(${angle}deg)`;

        // Check if cursor is close.
        const dist_x = curr_x - cursor_x;
        const dist_y = curr_y - cursor_y;
        if (Math.sqrt(dist_x * dist_x + dist_y * dist_y) < kWakeUpThreshold) {
            StartMoving();
            return;
        }
    }
    else {
        console.error("Unknown state:", state);
    }
}

// State change functions that reset timeout to next state accordingly.
function StartMoving() {
    // Set state.
    state = "moving";

    // Clear and re-set state timeout
    const time_to_stop = Math.random() * 3000 + 1000;
    clearTimeout(state_timeout_id);
    state_timeout_id = setTimeout(() => {
        StopMoving();
    }, time_to_stop);

    console.log("start moving");
}
function StopMoving() {
    // Set state.
    state = "stopped";

    // Clear and re-set state timeout
    clearTimeout(state_timeout_id);
    const time_to_stop = Math.random() * 1000 + 300;
    state_timeout_id = setTimeout(() => {
        StartCrawling();
    }, time_to_stop);

    console.log("stop moving");
}
function StartCrawling() {
    state = "crawling";

    // Randomize rotation.
    const random_angle = Math.random() * 360;
    insect.style.transform = `rotate(${random_angle}deg)`;

    // Clear and re-set state timeout
    clearTimeout(state_timeout_id);
    const time_to_stop = Math.random() * 1000 + 100;
    state_timeout_id = setTimeout(() => {
        StopMoving();
    }, time_to_stop);

    console.log("start crawling");
}

// Update function for fly swatter object.
let fly_swatter_timeout_id = null;
function FlySwatterUpdate() {
    // Poll for a mouse click interrupt.
    if (mouse_clicked == false)
        return;
    mouse_clicked = false;

    fly_swatter.style.display = "inline";
    fly_swatter.style.top = `${cursor_y}px`;
    fly_swatter.style.left = `${cursor_x}px`;
    clearTimeout(fly_swatter_timeout_id);
    fly_swatter_timeout_id = setTimeout(() => {
        fly_swatter.style.display = "none";
    }, 300);
}

function Main() {
    InsectUpdate();
    FlySwatterUpdate();
    setTimeout(() => {
        Main();
    }, 50);
}

// Initial call.
StartMoving();
Main();