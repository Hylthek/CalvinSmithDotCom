class AudioObject {
    constructor(src, start_time = 0, end_time = Infinity) {
        this.src = src
        this.audio = new Audio(this.src)
        this.start_time = start_time
        this.end_time = end_time
    }

    Update() {
        if (this.audio.currentTime > this.end_time)
            this.audio.pause()
    }

    Draw() {
        // Nothing.
    }

    Play() {
        this.audio.currentTime = this.start_time
        this.audio.play()
    }
}

class PreloadedAudio {
    constructor() {
        console.error(": Cannot instantiate this \"static\" class.")
    }

    static background_music = new AudioObject("room/assets/KnightAcademy.mp3", 1, Infinity)
}