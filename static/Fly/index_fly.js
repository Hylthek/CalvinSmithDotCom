// Globals.
const fly_obj = document.getElementById("fly-id");

// Code execution.
setInterval(() => {
    MainLoop();
}, 50);

let state = "none";
StopMoving();

// Functions.
function MainLoop() {
    if (state == "moving") {
        // Get current angle. CW=positive, North=0.
        let curr_angle_deg = 30;
        const match = fly_obj.style.transform.match(/rotate\((.+)\)/);
        if (match && match[1])
            curr_angle_deg = parseFloat(match[1]);

        const rand_angle = Math.random() * 20 - 10;
        curr_angle_deg += rand_angle;

        const prevTransform = fly_obj.style.transform;
        const newTransform = prevTransform.replace(/rotate\([^)]+\)/, "").trim();
        fly_obj.style.transform = `${newTransform} rotate(${curr_angle_deg}deg)`;
    }
}

function StopMoving() {
    state = "stopped";
    setTimeout(StartMoving, 3000 * Math.random() + 3000);
}
function StartMoving() {
    state = "moving";
    setTimeout(StopMoving, 300 * Math.random() + 300);
}