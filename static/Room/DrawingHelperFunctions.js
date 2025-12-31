class DrawingHelperFunctions {
    constructor() {
        console.error(": Cant instantiate static class.")
    }

    static ClearScreen() { CanvasWrapper.context.clearRect(0, 0, kW, kH) }

    static DrawBackground() {
        CanvasWrapper.context.save()
        switch (ActManager.current_act) {
            case "act-1":
            case "act-2":
            case "intro":
            case "outro":
                const scene_points = ScenePerspective.GetScenePoints()
                CanvasWrapper.context.strokeStyle = "black";
                CanvasWrapper.context.lineWidth = kW * 0.0015;
                CanvasWrapper.context.beginPath();
                CanvasWrapper.context.moveTo(0, 0);
                CanvasWrapper.context.lineTo(scene_points[0][0], scene_points[0][1]);
                CanvasWrapper.context.lineTo(scene_points[1][0], scene_points[1][1]);
                CanvasWrapper.context.lineTo(kW, 0);
                CanvasWrapper.context.moveTo(0, kH);
                CanvasWrapper.context.lineTo(scene_points[2][0], scene_points[2][1]);
                CanvasWrapper.context.lineTo(scene_points[3][0], scene_points[3][1]);
                CanvasWrapper.context.lineTo(kW, kH);
                CanvasWrapper.context.moveTo(scene_points[0][0], scene_points[0][1]);
                CanvasWrapper.context.lineTo(scene_points[2][0], scene_points[2][1]);
                CanvasWrapper.context.moveTo(scene_points[1][0], scene_points[1][1]);
                CanvasWrapper.context.lineTo(scene_points[3][0], scene_points[3][1]);
                CanvasWrapper.context.stroke();

                CanvasWrapper.context.font = `${kW * 0.02}px Arial`;
                CanvasWrapper.context.fillStyle = "black";
                CanvasWrapper.context.textAlign = "center";
                CanvasWrapper.context.textBaseline = "middle";
                CanvasWrapper.context.fillText("Placeholder", kW * 0.1, kH * 0.5);
                CanvasWrapper.context.fillText("Placeholder", kW * 0.9, kH * 0.5);
                CanvasWrapper.context.fillText("Placeholder", kW * 0.5, kH * 0.4);
                CanvasWrapper.context.fillText("Placeholder", kW * 0.5, kH * 0.8);
                CanvasWrapper.context.fillText("Placeholder", kW * 0.5, kH * 0.05);

            // fallthrough
            case "act-3":
            case "credits":
                CanvasWrapper.context.font = `${kW * 0.05}px Arial`;
                CanvasWrapper.context.fillStyle = "black";
                CanvasWrapper.context.textAlign = "center";
                CanvasWrapper.context.textBaseline = "middle";
                CanvasWrapper.context.fillText(ActManager.current_act, kW / 2, kH / 2);
                break;
            case "splash-screen":
                // Draw text.
                CanvasWrapper.context.font = `${kW * 0.05}px serif`;
                CanvasWrapper.context.fillStyle = "black";
                CanvasWrapper.context.textAlign = "center";
                CanvasWrapper.context.textBaseline = "middle";
                CanvasWrapper.context.fillText("For S.", kW / 2, kH * 0.45);
                break;
            default:
                console.error("Invalid act string.", ActManager.current_act)
        }
        CanvasWrapper.context.restore()
    }

    static DrawForeground() {
        CanvasWrapper.context.save()

        switch (ActManager.current_act) {
            case "splash-screen":
                // Draw fading.
                const curr_time = performance.now()
                const fade_time = 2000
                const hold_time = 1000
                CanvasWrapper.context.fillStyle = `rgba(255,255,255,0)`
                if (curr_time < fade_time)
                    CanvasWrapper.context.fillStyle = `rgba(255,255,255,${1 - curr_time / fade_time})`
                if (curr_time > fade_time + hold_time)
                    CanvasWrapper.context.fillStyle = `rgba(255,255,255,${(curr_time - fade_time - hold_time) / fade_time})`
                CanvasWrapper.context.fillRect(0, 0, kW, kH)
                // Draw instruction text.
                CanvasWrapper.context.textAlign = "center";
                CanvasWrapper.context.textBaseline = "middle";
                CanvasWrapper.context.font = `${kW * 0.02}px Arial`;
                CanvasWrapper.context.fillStyle = "black"
                if (curr_time > 2 * fade_time + hold_time)
                    CanvasWrapper.context.fillText("Click to Continue", kW / 2, kH / 2)
                break;
            default:
            // Do nothing.
        }
        CanvasWrapper.context.restore()
    }

    static DrawDraggables() {
        ActManager.active_draggables.forEach(draggable => {
            if (draggable.Draw) // If method exists.
                draggable.Draw()
            else
                CanvasWrapper.context.drawImage(draggable.images[draggable.curr_image], draggable.x - draggable.w / 2, draggable.y - draggable.h / 2, draggable.w, draggable.h);
        })
    }

    static DrawContainers() {
        ActManager.active_containers.forEach(container => {
            CanvasWrapper.context.drawImage(container.images[container.curr_image], container.x - container.w / 2, container.y - container.h / 2, container.w, container.h);
        })
    }

    static DrawDecorations(is_background_pass = false) {
        CanvasWrapper.context.save()

        // Draw GameEvent decorations (characters)
        ActManager.game_events.forEach(game_event => {
            game_event.decorations.forEach(decoration => {
                if (decoration.visible && (is_background_pass == decoration.is_background)) {
                    CanvasWrapper.context.setTransform(
                        Math.cos(decoration.rotation * Math.PI / 180), Math.sin(decoration.rotation * Math.PI / 180),
                        -Math.sin(decoration.rotation * Math.PI / 180), Math.cos(decoration.rotation * Math.PI / 180),
                        decoration.x, decoration.y
                    )
                    CanvasWrapper.context.drawImage(decoration.images[decoration.curr_image], -decoration.w / 2, -decoration.h / 2, decoration.w, decoration.h);
                }
            })
        })
        // Draw normal decorations.
        ActManager.active_decorations.forEach(decoration => {
            if (decoration.visible && (is_background_pass == decoration.is_background)) {
                CanvasWrapper.context.setTransform(
                    Math.cos(decoration.rotation * Math.PI / 180), Math.sin(decoration.rotation * Math.PI / 180),
                    -Math.sin(decoration.rotation * Math.PI / 180), Math.cos(decoration.rotation * Math.PI / 180),
                    decoration.x, decoration.y
                )
                CanvasWrapper.context.drawImage(decoration.images[decoration.curr_image], -decoration.w / 2, -decoration.h / 2, decoration.w, decoration.h);
            }
        })

        CanvasWrapper.context.restore()
    }

    static DrawDialogues() {
        CanvasWrapper.context.save()

        ActManager.game_events.forEach(game_event => {
            if (game_event.dialogue.visible) {
                // Process text.
                const lines = game_event.dialogue.text[game_event.dialogue.curr_text].split("\n")
                const dialogue_height = lines.length * Dialogue.line_spacing

                // Find maximum text width in lines.
                CanvasWrapper.context.font = `${kW * 0.02}px Arial`; // Must be called before ctx.measureText().
                let max_text_width = 0;
                lines.forEach(line => {
                    if (CanvasWrapper.context.measureText(line).width > max_text_width)
                        max_text_width = CanvasWrapper.context.measureText(line).width;
                });

                // Draw box
                CanvasWrapper.context.strokeStyle = "black";
                CanvasWrapper.context.lineWidth = kW * 0.001;
                CanvasWrapper.context.fillStyle = "#bbbbbb";
                const x = (kW - (max_text_width + 2 * Dialogue.inner_margin)) / 2
                const y = kH - (Dialogue.outer_margin + dialogue_height + 2 * Dialogue.inner_margin)
                const w = max_text_width + 2 * Dialogue.inner_margin
                const h = dialogue_height + 2 * Dialogue.inner_margin
                CanvasWrapper.context.fillRect(x, y, w, h)
                CanvasWrapper.context.strokeRect(x, y, w, h)

                // Draw text.
                CanvasWrapper.context.fillStyle = "black";
                CanvasWrapper.context.textAlign = "center";
                CanvasWrapper.context.textBaseline = "bottom";
                lines.forEach((line, index) => {
                    CanvasWrapper.context.fillText(line, x + w / 2, (y + Dialogue.line_spacing) + Dialogue.inner_margin + Dialogue.line_spacing * index);
                })

                // Draw instruction text.
                const w2 = CanvasWrapper.context.measureText("Press space to continue.").width
                CanvasWrapper.context.fillStyle = "#bbbbbb";
                CanvasWrapper.context.fillRect((kW - w2) / 2, y + h + Dialogue.outer_margin / 2 - Dialogue.line_spacing / 2, w2, Dialogue.line_spacing)
                CanvasWrapper.context.strokeRect((kW - w2) / 2, y + h + Dialogue.outer_margin / 2 - Dialogue.line_spacing / 2, w2, Dialogue.line_spacing)
                CanvasWrapper.context.fillStyle = "black"
                CanvasWrapper.context.fillText("Press space to continue.", kW / 2, y + h + Dialogue.line_spacing / 2 + Dialogue.outer_margin / 2)
            }
        })

        CanvasWrapper.context.restore
    }
}
