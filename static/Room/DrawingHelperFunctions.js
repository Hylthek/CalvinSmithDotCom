class DrawingHelperFunctions {
    constructor() {
        console.error(": Cant instantiate static class.")
    }

    static ClearScreen() { kCtx.clearRect(0, 0, kW, kH) }

    static DrawBackground() {
        kCtx.save()
        switch (ActManager.current_act) {
            case "act-1":
            case "act-2":
            case "intro":
            case "outro":
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

            // fallthrough
            case "act-3":
            case "credits":
                kCtx.font = `${kW * 0.05}px Arial`;
                kCtx.fillStyle = "black";
                kCtx.textAlign = "center";
                kCtx.textBaseline = "middle";
                kCtx.fillText(ActManager.current_act, kW / 2, kH / 2);
                break;
            case "splash-screen":
                // Draw text.
                kCtx.font = `${kW * 0.05}px serif`;
                kCtx.fillStyle = "black";
                kCtx.textAlign = "center";
                kCtx.textBaseline = "middle";
                kCtx.fillText("For S.", kW / 2, kH * 0.45);
                break;
            default:
                console.error("Invalid act string.", ActManager.current_act)
        }
        kCtx.restore()
    }

    static DrawForeground() {
        kCtx.save()

        switch (ActManager.current_act) {
            case "splash-screen":
                // Draw fading.
                const curr_time = performance.now()
                const fade_time = 2000
                const hold_time = 1000
                kCtx.fillStyle = `rgba(255,255,255,0)`
                if (curr_time < fade_time)
                    kCtx.fillStyle = `rgba(255,255,255,${1 - curr_time / fade_time})`
                if (curr_time > fade_time + hold_time)
                    kCtx.fillStyle = `rgba(255,255,255,${(curr_time - fade_time - hold_time) / fade_time})`
                kCtx.fillRect(0, 0, kW, kH)
                // Draw instruction text.
                kCtx.textAlign = "center";
                kCtx.textBaseline = "middle";
                kCtx.font = `${kW * 0.02}px Arial`;
                kCtx.fillStyle = "black"
                if (curr_time > 2 * fade_time + hold_time)
                    kCtx.fillText("Click to Continue", kW / 2, kH / 2)
                break;
            default:
            // Do nothing.
        }
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

    static DrawDecorations(is_background_pass = false) {
        kCtx.save()

        // Draw GameEvent decorations (characters)
        ActManager.game_events.forEach(game_event => {
            game_event.decorations.forEach(decoration => {
                if (decoration.visible && (is_background_pass == decoration.is_background)) {
                    kCtx.setTransform(
                        Math.cos(decoration.rotation * Math.PI / 180), Math.sin(decoration.rotation * Math.PI / 180),
                        -Math.sin(decoration.rotation * Math.PI / 180), Math.cos(decoration.rotation * Math.PI / 180),
                        decoration.x, decoration.y
                    )
                    kCtx.drawImage(decoration.images[decoration.curr_image], -decoration.w / 2, -decoration.h / 2, decoration.w, decoration.h);
                }
            })
        })
        // Draw normal decorations.
        ActManager.active_decorations.forEach(decoration => {
            if (decoration.visible && (is_background_pass == decoration.is_background)) {
                kCtx.setTransform(
                    Math.cos(decoration.rotation * Math.PI / 180), Math.sin(decoration.rotation * Math.PI / 180),
                    -Math.sin(decoration.rotation * Math.PI / 180), Math.cos(decoration.rotation * Math.PI / 180),
                    decoration.x, decoration.y
                )
                kCtx.drawImage(decoration.images[decoration.curr_image], -decoration.w / 2, -decoration.h / 2, decoration.w, decoration.h);
            }
        })

        kCtx.restore()
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
