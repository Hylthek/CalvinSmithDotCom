function FlyMain() {
    // Globals.
    const fly_obj = document.getElementById("fly-id");
    const portrait_obj = document.getElementById("portrait-id");
    const portrait_bb = portrait_obj.getBoundingClientRect();

    // Set size relative to portrait.
    const portrait_width = portrait_bb.width;
    const fly_width = portrait_width * 0.15;
    fly_obj.style.width = `${fly_width}px`;
    fly_obj.style.height = "auto";
    
    // Set position relative to portrait.
    const absLeft = portrait_bb.left + window.scrollX;
    const absTop = portrait_bb.top + window.scrollY;
    fly_obj.style.left = (absLeft + fly_width / 2) + "px";
    fly_obj.style.top = (absTop + fly_width / 2) + "px";
    fly_obj.style.display = "block";

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

            const currTop = parseFloat(getComputedStyle(fly_obj).top);
            const currLeft = parseFloat(fly_obj.style.left);

            const randTop = Math.random() * 1 - 0.5;
            const randLeft = Math.random() * 1 - 0.5;

            fly_obj.style.top = `${currTop + randTop}px`;
            fly_obj.style.left = `${currLeft + randLeft}px`;
        }
    }

    function StopMoving() {
        state = "stopped";
        setTimeout(StartMoving, 500 * Math.random() + 300);
    }
    function StartMoving() {
        state = "moving";
        setTimeout(StopMoving, 300 * Math.random() + 300);
    }
}

FlyMain()