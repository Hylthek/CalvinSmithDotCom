// A simple wrapper to help with trimming audio.
class AudioObject {
    constructor(src, settings) {
        this.src = src
        this.audio = new Audio(this.src)
        this.start_time = settings.start_time || 0
        this.end_time = settings.end_time || Infinity
        this.audio.volume = settings.volume || 1

        // Set if you want random entry in the specified start and end ranges.
        // Play loops instead of ending.
        this.rand_entry = settings.rand_entry || false
    }

    Update() {
        if (this.audio.currentTime > this.end_time) {

            this.audio.pause()
            if (this.rand_entry) {
                // Manually loop playback
                this.audio.currentTime = this.start_time
                this.audio.play()
            }
        }
    }

    Draw() {
        // Nothing.
    }

    Play() {
        if (this.rand_entry == false) {
            this.audio.currentTime = this.start_time
            this.audio.play()
        }
        else {
            // Pick a random start location.
            if (isFinite(this.end_time) == false)
                this.end_time = this.audio.duration
            const rand_time = this.start_time + Math.random() * (this.end_time - this.start_time)
            this.audio.currentTime = rand_time
            this.audio.play()
        }
    }
};

class PreloadedAudio {
    constructor() {
        console.error(": Cannot instantiate this \"static\" class.")
    }

    static background_music = new AudioObject("room/assets/KnightAcademy.mp3", {
        start_time: 1,
        volume: 0.3
    })
    static talking = new AudioObject("room/assets/IsabelleTalking.mp3", {
        rand_entry: true
    })

    static UpdatePreloadedAudio() {
        this.background_music.Update()
        this.talking.Update()
    }
}