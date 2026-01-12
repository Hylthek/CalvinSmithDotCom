class ActManager {
    static current_act = null // Values: (splash-screen, intro, act-1, act-2, act-3, outro, credits)
    static active_draggables = []
    static active_containers = []
    static active_decorations = []
    static game_events = []

    constructor() {
        console.error(": Cannot instantiate this \"static\" class.")
    }

    static NextAct() {
        switch (this.current_act) {
            case null:
                ActInitializations.SplashScreen()
                this.current_act = "splash-screen"
                break
            case "splash-screen":
                ActManager.ClearArrays()
                ActInitializations.Intro()
                PreloadedAudio.background_music.Play()
                this.current_act = "intro"
                break;
            case "intro":
                ActManager.ClearArrays()
                ActInitializations.ActOne()
                this.current_act = "act-1"
                break;
            case "act-1":
                ActManager.ClearArrays()
                ActInitializations.ActTwo()
                this.current_act = "act-2"
                break;
            case "act-2":
                ActManager.ClearArrays()
                ActInitializations.ActThree()
                this.current_act = "act-3"
                break;
            case "act-3":
                ActManager.ClearArrays()
                ActInitializations.Outro()
                this.current_act = "outro"
                break;
            case "outro":
                ActManager.ClearArrays()
                // Load credits
                this.current_act = "credits"
                break;
            case "credits":
                console.warn("End of game reached.")
                break;
            default:
                console.error("Invalid act string.", this.current_act)
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
                gMouseY > draggable.y - h2 && gMouseY < draggable.y + h2) {
                draggable.is_hovered = true
                return draggable
            }
            else
                draggable.is_hovered = false
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

    static DropPickedUp() {
        for (let i = 0; i < this.active_draggables.length; i++) {
            const draggable = this.active_draggables[i];
            if (draggable.picked_up) 
                draggable.Drop()
        }
    }

    static UpdateCycle() {
        this.UpdateDraggables()
        this.UpdateHuds()
        this.UpdateDecorations()
    }

    static UpdateDraggables() {
        for (let i = 0; i < this.active_draggables.length; i++) {
            const draggable = this.active_draggables[i];

            if (draggable.Update) {
                draggable.Update()
                continue
            }

            // Handle pickups.
            if (draggable.picked_up) {
                draggable.x = gMouseX
                draggable.y = gMouseY

                // Handle node 
                if (draggable.pickup_offset) {
                    draggable.x += draggable.pickup_offset[0]
                    draggable.y += draggable.pickup_offset[1]
                    draggable.SnapToValidPos()
                }
            }

            // Gravity.
            if (draggable.falling) {
                // Update pos and velo.
                draggable.y += kH * draggable.velocity
                draggable.velocity += 0.01;
                // Fix bugged pickup locations.
                if (draggable.pickup_location[1] < ScenePerspective.GetScenePoints()[2][1])
                    draggable.pickup_location[1] = (ScenePerspective.GetScenePoints()[2][1] + kH) / 2
                // Stop gravity if object hit pickup height.
                if (draggable.y > draggable.pickup_location[1]) {
                    draggable.falling = false
                    draggable.velocity = 0;
                    draggable.y = draggable.pickup_location[1]
                }
            }
        }
    }

    static UpdateHuds() {
        for (let i = 0; i < this.active_decorations.length; i++) {
            const decoration = this.active_decorations[i];
            if (!decoration.UpdateHud)
                continue;
            decoration.UpdateHud()
        }
    }

    static UpdateDecorations() {
        for (let i = 0; i < this.active_decorations.length; i++) {
            const decoration = this.active_decorations[i];
            if (decoration.Update)
                decoration.Update()
        }
    }

    static act_3_goal_met = false
    static IsGoalMet() {
        switch (ActManager.current_act) {
            case "act-1":
                const _1 = ActManager.container_contents.cabinet >= ActInitializations.total_cabinet_draggables
                const _2 = ActManager.container_contents.closet >= ActInitializations.total_closet_draggables
                const _3 = ActManager.container_contents.trashcan >= ActInitializations.total_trashcan_draggables
                return _1 && _2 && _3
            case "act-2":
                return ActManager.dirt_swept >= ActInitializations.act_2_total_dirt
            case "act-3":
                return ActManager.act_three_goal_met
            case "outro":
                return true
            default:
            // Do nothing.
        }
    }



    static container_contents = { closet: 0, cabinet: 0, trashcan: 0 } // Incremented by containers.

    static dirt_swept = 0 // Incremented by Broom.CleanDirt().

    static UpdateGameEvents() {
        for (let i = 0; i < this.game_events.length; i++) {
            const game_event = this.game_events[i];
            if (ActManager.IsGoalMet()) {
                game_event.Run()
            }
        }
    }
}
