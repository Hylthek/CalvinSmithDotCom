class PreloadedImages {
    constructor() {
        console.error(": Cant instantiate static class.")
    }

    static background1 = new Image()
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
        PreloadedImages.background1.src = "Room/RoomBackground1.jpg"
        PreloadedImages.closet.src = "Room/Closet.jpg"
        PreloadedImages.clothes.src = "Room/Clothes.png"
        PreloadedImages.broom.src = "Room/Broom.png"
        PreloadedImages.cabinet.src = "Room/Cabinet.png"
        PreloadedImages.dirt1.src = "Room/Dirt1.png"
        PreloadedImages.dirt2.src = "Room/Dirt2.png"
        PreloadedImages.dirt3.src = "Room/Dirt3.png"
        PreloadedImages.fly.src = "Room/Fly.png"
        PreloadedImages.goob.src = "Room/Goob.png"
        PreloadedImages.heart.src = "Room/Heart.png"
        PreloadedImages.horsejean.src = "Room/Horsejean.png"
        PreloadedImages.leopard.src = "Room/Leopard.png"
        PreloadedImages.monkey.src = "Room/Monkey.png"
        PreloadedImages.shrimp.src = "Room/Shrimp.png"
        PreloadedImages.spiderman.src = "Room/Spiderman.png"
        PreloadedImages.trash.src = "Room/Trash.png"
        PreloadedImages.trashcan.src = "Room/Trashcan.png"
        PreloadedImages.trinket.src = "Room/Trinket.png"
        PreloadedImages.wolfman.src = "Room/Wolfman.png"
    }
}