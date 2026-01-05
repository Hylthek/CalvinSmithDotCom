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
        PreloadedImages.intro_background.src = "Room/Assets/introroombackground.png"
        PreloadedImages.act1_background.src = "Room/Assets/actoneRoomBackground.png"
        PreloadedImages.blank_floor.src = "Room/Assets/blankfloor.png"
        PreloadedImages.outro_background.src = "Room/Assets/outroroombackground.png"
        PreloadedImages.closet.src = "Room/Assets/opencloset.png"
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
        PreloadedImages.trashcan.src = "Room/Assets/Trashcan.png"
        PreloadedImages.wolfman.src = "Room/Assets/Wolfman.png"
        PreloadedImages.alligator.src = "Room/Assets/Alligator.png"
        PreloadedImages.blackcanvas.src = "Room/Assets/BlackCanvas.png"
        PreloadedImages.blackplaid.src = "Room/Assets/BlackPlaid.png"
        PreloadedImages.blueslug.src = "Room/Assets/BlueSlug.png"
        PreloadedImages.box.src = "Room/Assets/Box.png"
        PreloadedImages.comb.src = "Room/Assets/Comb.png"
        PreloadedImages.combjar.src = "Room/Assets/CombJar.png"
        PreloadedImages.cow.src = "Room/Assets/Cow.png"
        PreloadedImages.crab.src = "Room/Assets/Crab.png"
        PreloadedImages.crumpledblackplaid.src = "Room/Assets/CrumpledBlackPlaid.png"
        PreloadedImages.deodorant.src = "Room/Assets/Deodorant.png"
        PreloadedImages.earrings.src = "Room/Assets/Earrings.png"
        PreloadedImages.fancycrumpled.src = "Room/Assets/FancyCrumpled.png"
        PreloadedImages.fancyshirt.src = "Room/Assets/FancyShirt.png"
        PreloadedImages.flowervase.src = "Room/Assets/FlowerVase.png"
        PreloadedImages.glassdragon.src = "Room/Assets/GlassDragon.png"
        PreloadedImages.glassescane.src = "Room/Assets/GlassesCane.png"
        PreloadedImages.glassmonkey.src = "Room/Assets/GlassMonkey.png"
        PreloadedImages.gordon.src = "Room/Assets/Gordon.png"
        PreloadedImages.gradcane.src = "Room/Assets/GradCane.png"
        PreloadedImages.greenfuzzcrumpled.src = "Room/Assets/GreenFuzzCrumpled.png"
        PreloadedImages.greenshirt.src = "Room/Assets/GreenShirt.png"
        PreloadedImages.greypatternedshirt.src = "Room/Assets/GreyPatternedShirt.png"
        PreloadedImages.gumdrop.src = "Room/Assets/Gumdrop.png"
        PreloadedImages.happysnail.src = "Room/Assets/HappySnail.png"
        PreloadedImages.headphones.src = "Room/Assets/Headphones.png"
        PreloadedImages.hotcocoa.src = "Room/Assets/HotCocoa.png"
        PreloadedImages.leather.src = "Room/Assets/Leather.png"
        PreloadedImages.legored.src = "Room/Assets/LEGORed.png"
        PreloadedImages.legovenusflytrap.src = "Room/Assets/LEGOVenusFlytrap.png"
        PreloadedImages.makeupjar.src = "Room/Assets/MakeupJar.png"
        PreloadedImages.mucin.src = "Room/Assets/Mucin.png"
        PreloadedImages.patternedcrumpled.src = "Room/Assets/PatternedCrumpled.png"
        PreloadedImages.penguinduck.src = "Room/Assets/PenguinDuck.png"
        PreloadedImages.percussionfrog.src = "Room/Assets/PercussionFrog.png"
        PreloadedImages.pineapplefrog.src = "Room/Assets/PineappleFrog.png"
        PreloadedImages.pinktray.src = "Room/Assets/PinkTray.png"
        PreloadedImages.planathan.src = "Room/Assets/Planathan.png"
        PreloadedImages.pocky.src = "Room/Assets/Pocky.png"
        PreloadedImages.pockybox.src = "Room/Assets/PockyBox.png"
        PreloadedImages.polka.src = "Room/Assets/Polka.png"
        PreloadedImages.polkacrumpled.src = "Room/Assets/PolkaCrumpled.png"
        PreloadedImages.rainbowturtle.src = "Room/Assets/RainbowTurtle.png"
        PreloadedImages.raven.src = "Room/Assets/Raven.png"
        PreloadedImages.redplaid.src = "Room/Assets/RedPlaid.png"
        PreloadedImages.redplaidcrumpled.src = "Room/Assets/RedPlaidCrumpled.png"
        PreloadedImages.shrimpcasket.src = "Room/Assets/ShrimpCasket.png"
        PreloadedImages.strawberry.src = "Room/Assets/Strawberry.png"
        PreloadedImages.tacocup.src = "Room/Assets/TacoCup.png"
        PreloadedImages.tissue1.src = "Room/Assets/Tissue1.png"
        PreloadedImages.tissue2.src = "Room/Assets/Tissue2.png"
        PreloadedImages.tissue3.src = "Room/Assets/Tissue3.png"
        PreloadedImages.toucan.src = "Room/Assets/Tucan.png"
        PreloadedImages.turtle.src = "Room/Assets/Turtle.png"
        PreloadedImages.valentinemonkeyplush.src = "Room/Assets/ValentineMonkeyPlush.png"
        PreloadedImages.waterbottle.src = "Room/Assets/WaterBottle.png"
        PreloadedImages.whale.src = "Room/Assets/Whale.png"
        PreloadedImages.whitesquish.src = "Room/Assets/WhiteSquish.png"
        PreloadedImages.whitetray.src = "Room/Assets/WhiteTray.png"
        PreloadedImages.yellowslug.src = "Room/Assets/YellowSlug.png"
        PreloadedImages.yellowsquish.src = "Room/Assets/YellowSquish.png"
        PreloadedImages.act_3_bed.src = "Room/Assets/BedTopView.png"
    }
}