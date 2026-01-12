class PreloadedImages {
    constructor() {
        console.error(": Cant instantiate static class.")
    }

    // Backgrounds
    static intro_background = new Image()
    static act1_background = new Image()
    static blank_floor = new Image()
    static outro_background = new Image()

    // Act 1 containers
    static closet = new Image()
    static trashcan = new Image()
    static cabinet = new Image()

    
    // Act 2 assets
    static broom = new Image()
    static dirt1 = new Image()
    static dirt2 = new Image()
    static dirt3 = new Image()

    // Splash screen
    static monkey = new Image()
    static heart = new Image()
    static fly = new Image()

    // Characters
    static shrimp = new Image()
    static horsejean = new Image()
    static leopard = new Image()
    static spiderman = new Image()
    static goob = new Image()
    static wolfman = new Image()

    // Act 1 closet draggables.
    static blackcanvas = new Image();
    static blackplaid = new Image(); static crumpledblackplaid = new Image()
    static comb = new Image()
    static combjar = new Image()
    static deodorant = new Image()
    static earrings = new Image()
    static fancyshirt = new Image(); static fancycrumpled = new Image()
    static greenshirt = new Image(); static greenfuzzcrumpled = new Image()
    static greypatternedshirt = new Image(); static patternedcrumpled = new Image()
    static leather = new Image()
    static makeupjar = new Image()
    static mucin = new Image()
    static polka = new Image(); static polkacrumpled = new Image()
    static pinktray = new Image()
    static redplaid = new Image(); static redplaidcrumpled = new Image()
    static strawberry = new Image()
    static whitetray = new Image()
    static gordon = new Image()
    static gumdrop = new Image()
    static flowervase = new Image()
    
    // Act 1 cabinet draggables.
    static alligator = new Image()
    static blueslug = new Image()
    static cow = new Image()
    static crab = new Image()
    static glassdragon = new Image()
    static glassescane = new Image()
    static glassmonkey = new Image()
    static gradcane = new Image()
    static happysnail = new Image()
    static headphones = new Image()
    static legored = new Image()
    static legovenusflytrap = new Image()
    static penguinduck = new Image()
    static percussionfrog = new Image()
    static pineapplefrog = new Image()
    static planathan = new Image()
    static rainbowturtle = new Image()
    static raven = new Image()
    static shrimpcasket = new Image()
    static toucan = new Image()
    static turtle = new Image()
    static valentinemonkeyplush = new Image()
    static whale = new Image()
    static whitesquish = new Image()
    static yellowslug = new Image()
    static yellowsquish = new Image()
    
    // Act 1 trash draggables
    static box = new Image()
    static hotcocoa = new Image()
    static pocky = new Image()
    static pockybox = new Image()
    static tacocup = new Image()
    static tissue1 = new Image()
    static tissue2 = new Image()
    static tissue3 = new Image()
    static waterbottle = new Image()

    static act_3_bed = new Image()

    static PreloadAllImages() {
        PreloadedImages.intro_background.src = "Room/Assets/introroombackground.webp"
        PreloadedImages.act1_background.src = "Room/Assets/actoneRoomBackground.webp"
        PreloadedImages.blank_floor.src = "Room/Assets/blankfloor.webp"
        PreloadedImages.outro_background.src = "Room/Assets/outroroombackground.webp"
        PreloadedImages.closet.src = "Room/Assets/opencloset.webp"
        PreloadedImages.broom.src = "Room/Assets/Broom.webp"
        PreloadedImages.cabinet.src = "Room/Assets/Cabinet.webp"
        PreloadedImages.dirt1.src = "Room/Assets/Dirt1.webp"
        PreloadedImages.dirt2.src = "Room/Assets/Dirt2.webp"
        PreloadedImages.dirt3.src = "Room/Assets/Dirt3.webp"
        PreloadedImages.fly.src = "Room/Assets/Fly.webp"
        PreloadedImages.goob.src = "Room/Assets/Goob.webp"
        PreloadedImages.heart.src = "Room/Assets/Heart.webp"
        PreloadedImages.horsejean.src = "Room/Assets/Horsejean.webp"
        PreloadedImages.leopard.src = "Room/Assets/Leopard.webp"
        PreloadedImages.monkey.src = "Room/Assets/Monkey.webp"
        PreloadedImages.shrimp.src = "Room/Assets/Shrimp.webp"
        PreloadedImages.spiderman.src = "Room/Assets/Spiderman.webp"
        PreloadedImages.trashcan.src = "Room/Assets/Trashcan.webp"
        PreloadedImages.wolfman.src = "Room/Assets/Wolfman.webp"
        PreloadedImages.alligator.src = "Room/Assets/Alligator.webp"
        PreloadedImages.blackcanvas.src = "Room/Assets/BlackCanvas.webp"
        PreloadedImages.blackplaid.src = "Room/Assets/BlackPlaid.webp"
        PreloadedImages.blueslug.src = "Room/Assets/BlueSlug.webp"
        PreloadedImages.box.src = "Room/Assets/Box.webp"
        PreloadedImages.comb.src = "Room/Assets/Comb.webp"
        PreloadedImages.combjar.src = "Room/Assets/CombJar.webp"
        PreloadedImages.cow.src = "Room/Assets/Cow.webp"
        PreloadedImages.crab.src = "Room/Assets/Crab.webp"
        PreloadedImages.crumpledblackplaid.src = "Room/Assets/CrumpledBlackPlaid.webp"
        PreloadedImages.deodorant.src = "Room/Assets/Deodorant.webp"
        PreloadedImages.earrings.src = "Room/Assets/Earrings.webp"
        PreloadedImages.fancycrumpled.src = "Room/Assets/FancyCrumpled.webp"
        PreloadedImages.fancyshirt.src = "Room/Assets/FancyShirt.webp"
        PreloadedImages.flowervase.src = "Room/Assets/FlowerVase.webp"
        PreloadedImages.glassdragon.src = "Room/Assets/GlassDragon.webp"
        PreloadedImages.glassescane.src = "Room/Assets/GlassesCane.webp"
        PreloadedImages.glassmonkey.src = "Room/Assets/GlassMonkey.webp"
        PreloadedImages.gordon.src = "Room/Assets/Gordon.webp"
        PreloadedImages.gradcane.src = "Room/Assets/GradCane.webp"
        PreloadedImages.greenfuzzcrumpled.src = "Room/Assets/GreenFuzzCrumpled.webp"
        PreloadedImages.greenshirt.src = "Room/Assets/GreenShirt.webp"
        PreloadedImages.greypatternedshirt.src = "Room/Assets/GreyPatternedShirt.webp"
        PreloadedImages.gumdrop.src = "Room/Assets/Gumdrop.webp"
        PreloadedImages.happysnail.src = "Room/Assets/HappySnail.webp"
        PreloadedImages.headphones.src = "Room/Assets/Headphones.webp"
        PreloadedImages.hotcocoa.src = "Room/Assets/HotCocoa.webp"
        PreloadedImages.leather.src = "Room/Assets/Leather.webp"
        PreloadedImages.legored.src = "Room/Assets/LEGORed.webp"
        PreloadedImages.legovenusflytrap.src = "Room/Assets/LEGOVenusFlytrap.webp"
        PreloadedImages.makeupjar.src = "Room/Assets/MakeupJar.webp"
        PreloadedImages.mucin.src = "Room/Assets/Mucin.webp"
        PreloadedImages.patternedcrumpled.src = "Room/Assets/PatternedCrumpled.webp"
        PreloadedImages.penguinduck.src = "Room/Assets/PenguinDuck.webp"
        PreloadedImages.percussionfrog.src = "Room/Assets/PercussionFrog.webp"
        PreloadedImages.pineapplefrog.src = "Room/Assets/PineappleFrog.webp"
        PreloadedImages.pinktray.src = "Room/Assets/PinkTray.webp"
        PreloadedImages.planathan.src = "Room/Assets/Planathan.webp"
        PreloadedImages.pocky.src = "Room/Assets/Pocky.webp"
        PreloadedImages.pockybox.src = "Room/Assets/PockyBox.webp"
        PreloadedImages.polka.src = "Room/Assets/Polka.webp"
        PreloadedImages.polkacrumpled.src = "Room/Assets/PolkaCrumpled.webp"
        PreloadedImages.rainbowturtle.src = "Room/Assets/RainbowTurtle.webp"
        PreloadedImages.raven.src = "Room/Assets/Raven.webp"
        PreloadedImages.redplaid.src = "Room/Assets/RedPlaid.webp"
        PreloadedImages.redplaidcrumpled.src = "Room/Assets/RedPlaidCrumpled.webp"
        PreloadedImages.shrimpcasket.src = "Room/Assets/ShrimpCasket.webp"
        PreloadedImages.strawberry.src = "Room/Assets/Strawberry.webp"
        PreloadedImages.tacocup.src = "Room/Assets/TacoCup.webp"
        PreloadedImages.tissue1.src = "Room/Assets/Tissue1.webp"
        PreloadedImages.tissue2.src = "Room/Assets/Tissue2.webp"
        PreloadedImages.tissue3.src = "Room/Assets/Tissue3.webp"
        PreloadedImages.toucan.src = "Room/Assets/Tucan.webp"
        PreloadedImages.turtle.src = "Room/Assets/Turtle.webp"
        PreloadedImages.valentinemonkeyplush.src = "Room/Assets/ValentineMonkeyPlush.webp"
        PreloadedImages.waterbottle.src = "Room/Assets/WaterBottle.webp"
        PreloadedImages.whale.src = "Room/Assets/Whale.webp"
        PreloadedImages.whitesquish.src = "Room/Assets/WhiteSquish.webp"
        PreloadedImages.whitetray.src = "Room/Assets/WhiteTray.webp"
        PreloadedImages.yellowslug.src = "Room/Assets/YellowSlug.webp"
        PreloadedImages.yellowsquish.src = "Room/Assets/YellowSquish.webp"
        PreloadedImages.act_3_bed.src = "Room/Assets/BedTopView.webp"
    }
}