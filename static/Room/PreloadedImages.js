class PreloadedImages {
    constructor() {
        console.error(": Cant instantiate static class.")
    }

    static intro_background = new Image()
    static act1_background = new Image()
    static blank_floor = new Image()
    static outro_background = new Image()
    static closet = new Image()
    static clothes = new Image()
    static broom = new Image()
    static cabinet = new Image()
    static dirt1 = new Image()
    static dirt2 = new Image()
    static dirt3 = new Image()
    static fly = new Image()
    static goob = new Image()
    static heart = new Image()
    static horsejean = new Image()
    static leopard = new Image()
    static monkey = new Image()
    static shrimp = new Image()
    static spiderman = new Image()
    static trash = new Image()
    static trashcan = new Image()
    static trinket = new Image()
    static wolfman = new Image()

    static PreloadAllImages() {
        PreloadedImages.intro_background.src = "Room/Assets/introroombackground.png"
        PreloadedImages.act1_background.src = "Room/Assets/actoneRoomBackground.png"
        PreloadedImages.blank_floor.src = "Room/Assets/blankfloor.png"
        PreloadedImages.outro_background.src = "Room/Assets/outroroombackground.png"
        PreloadedImages.closet.src = "Room/Assets/opencloset.png"
        PreloadedImages.clothes.src = "Room/Assets/Clothes.png"
        PreloadedImages.broom.src = "Room/Assets/Broom.png"
        PreloadedImages.cabinet.src = "Room/Assets/Cabinet.png"
        PreloadedImages.dirt1.src = "Room/Assets/Dirt1.png"
        PreloadedImages.dirt2.src = "Room/Assets/Dirt2.png"
        PreloadedImages.dirt3.src = "Room/Assets/Dirt3.png"
        PreloadedImages.fly.src = "Room/Assets/Fly.png"
        PreloadedImages.goob.src = "Room/Assets/Goob.png"
        PreloadedImages.heart.src = "Room/Assets/Heart.png"
        PreloadedImages.horsejean.src = "Room/Assets/Horsejean.png"
        PreloadedImages.leopard.src = "Room/Assets/Leopard.png"
        PreloadedImages.monkey.src = "Room/Assets/Monkey.png"
        PreloadedImages.shrimp.src = "Room/Assets/Shrimp.png"
        PreloadedImages.spiderman.src = "Room/Assets/Spiderman.png"
        PreloadedImages.trash.src = "Room/Assets/Trash.png"
        PreloadedImages.trashcan.src = "Room/Assets/Trashcan.png"
        PreloadedImages.trinket.src = "Room/Assets/Trinket.png"
        PreloadedImages.wolfman.src = "Room/Assets/Wolfman.png"
    }
}