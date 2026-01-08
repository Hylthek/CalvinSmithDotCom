class PreloadedAudio {
    constructor() {
        console.error("PreloadedAudio is a static class.");
    }

    static background_music = new Audio("Room/Assets/KnightAcademy.mp3");

    static LoadAll() {
        this.background_music.loop = true
        this.background_music.volume = 0.5
        this.background_music.currentTime = 1;
    }
}