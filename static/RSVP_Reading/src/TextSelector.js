// Function returns a word to display given an array and the current time.
class TextSelector {
    constructor(word_array) {
        this.word_array = word_array
    }

    wpm = 500
    period_delay_multiplier = 2
    next_word_ms = 0
    curr_index = 0

    UpdateIndexTask(curr_time_ms) {
        const curr_word = this.word_array[this.curr_index]
        const period_ms = 60000 / this.wpm
        if (curr_time_ms > this.next_word_ms) {
            this.curr_index++
            const next_word = this.word_array[this.curr_index]
            if (next_word.includes("."))
                this.next_word_ms = curr_time_ms + period_ms * this.period_delay_multiplier
            else
                this.next_word_ms = curr_time_ms + period_ms
        }
    }

    FindOptimalRecognitionPoint() {
        const curr_word = this.word_array[this.curr_index]
        return Math.floor(Math.min((curr_word.length - 1) / 2, 3))
    }
}

export { TextSelector }