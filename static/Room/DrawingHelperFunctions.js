class DrawingHelperFunctions {
    constructor() {
        console.error(": Cant instantiate static class.")
    }

    static ClearScreen() { kCtx.clearRect(0, 0, kW, kH) }

    static DrawBackground() {
        kCtx.save()
        switch (ActManager.current_act) {
            case "splash-screen":
                // Draw text.
                kCtx.font = `${kW * 0.05}px serif`;
                kCtx.fillStyle = "black";
                kCtx.textAlign = "center";
                kCtx.textBaseline = "middle";
                kCtx.fillText("For S.", kW / 2, kH * 0.45);
                break;
            case "act-1":
                kCtx.drawImage(PreloadedImages.act1_background, 0, 0, kW, kH)
                break;
            case "intro":
            case "act-2":
                kCtx.drawImage(PreloadedImages.intro_background, 0, 0, kW, kH)
                break;
            case "act-3":
                kCtx.drawImage(PreloadedImages.blank_floor, 0, 0, kW, kH)
                break;
            case "outro":
                kCtx.drawImage(PreloadedImages.outro_background, 0, 0, kW, kH)
                break;
            case "credits":
                kCtx.font = `${kW * 0.05}px Arial`;
                kCtx.fillStyle = "black";
                kCtx.textAlign = "center";
                kCtx.textBaseline = "middle";
                kCtx.fillText("Made By:\nGod", kW / 2, kH / 2);
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
            draggable.Draw()
        })
    }

    static DrawContainers() {
        ActManager.active_containers.forEach(container => {
            kCtx.drawImage(container.images[container.curr_image], container.x - container.w / 2, container.y - container.h / 2, container.w, container.h);
        })
    }

    static DrawDecorations(is_background_pass = false) {
        kCtx.save()

        // Iterate through game_events.
        // Draw GameEvent decorations (characters)
        ActManager.game_events.forEach(game_event => {
            game_event.decorations.forEach(decoration => {
                if (decoration.visible && (is_background_pass == decoration.is_background)) {
                    kCtx.setTransform(
                        Math.cos(decoration.rotation * Math.PI / 180), Math.sin(decoration.rotation * Math.PI / 180),
                        -Math.sin(decoration.rotation * Math.PI / 180), Math.cos(decoration.rotation * Math.PI / 180),
                        decoration.x, decoration.y
                    )
                    const k = decoration.is_flipped_horizontally ? -1 : 1
                    kCtx.transform(k, 0, 0, 1, 0, 0)
                    kCtx.drawImage(decoration.images[decoration.curr_image], -decoration.w / 2, -decoration.h / 2, decoration.w, decoration.h);
                }
            })
        })

        kCtx.restore()
        kCtx.save()

        // Iterate through active_decorations.
        ActManager.active_decorations.forEach(decoration => {
            // Draw normal decorations.
            if (decoration.visible && (is_background_pass == decoration.is_background) && !decoration.DrawHud) {
                kCtx.setTransform(
                    Math.cos(decoration.rotation * Math.PI / 180), Math.sin(decoration.rotation * Math.PI / 180),
                    -Math.sin(decoration.rotation * Math.PI / 180), Math.cos(decoration.rotation * Math.PI / 180),
                    decoration.x, decoration.y
                )
                const k = decoration.is_flipped_horizontally ? -1 : 1
                kCtx.transform(k, 0, 0, 1, 0, 0)
                kCtx.drawImage(decoration.images[decoration.curr_image], -decoration.w / 2, -decoration.h / 2, decoration.w, decoration.h);
            }
            // Draw HUD decorations.
            if (decoration.DrawHud && !is_background_pass) {
                decoration.DrawHud()
            }

            // Draw act 3 bed.
            if (decoration.nodes && is_background_pass) {
                decoration.DrawBed()
            }

            if (decoration.DrawTheBedThatRepresentsTheFinalBedPosition && is_background_pass)
                decoration.DrawTheBedThatRepresentsTheFinalBedPosition()
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
