class GameEvent {
    dialogue = null
    decorations = null
    sequence = null
    can_start = true // Ensures GameEvent can only run once.
    curr_stage = -1 // The current stage of this.program (-1 is deactivated).

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
        if (!this.can_start)
            return
        this.can_start = false
        this.curr_stage = 0;
        this.sequence(this)
    }

    StartCriterionMet() { return ActManager.TotalContainerScore() == 2; }
}
