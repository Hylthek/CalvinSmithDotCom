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
        PreloadedImages.intro_background.src = "Assets/introroombackground.webp"
        PreloadedImages.act1_background.src = "Assets/actoneRoomBackground.webp"
        PreloadedImages.blank_floor.src = "Assets/blankfloor.webp"
        PreloadedImages.outro_background.src = "Assets/outroroombackground.webp"
        PreloadedImages.closet.src = "Assets/opencloset.webp"
        PreloadedImages.broom.src = "Assets/Broom.webp"
        PreloadedImages.cabinet.src = "Assets/Cabinet.webp"
        PreloadedImages.dirt1.src = "Assets/Dirt1.webp"
        PreloadedImages.dirt2.src = "Assets/Dirt2.webp"
        PreloadedImages.dirt3.src = "Assets/Dirt3.webp"
        PreloadedImages.fly.src = "Assets/Fly.webp"
        PreloadedImages.goob.src = "Assets/Goob.webp"
        PreloadedImages.heart.src = "Assets/Heart.webp"
        PreloadedImages.horsejean.src = "Assets/Horsejean.webp"
        PreloadedImages.leopard.src = "Assets/Leopard.webp"
        PreloadedImages.monkey.src = "Assets/Monkey.webp"
        PreloadedImages.shrimp.src = "Assets/Shrimp.webp"
        PreloadedImages.spiderman.src = "Assets/Spiderman.webp"
        PreloadedImages.trashcan.src = "Assets/Trashcan.webp"
        PreloadedImages.wolfman.src = "Assets/Wolfman.webp"
        PreloadedImages.alligator.src = "Assets/Alligator.webp"
        PreloadedImages.blackcanvas.src = "Assets/BlackCanvas.webp"
        PreloadedImages.blackplaid.src = "Assets/BlackPlaid.webp"
        PreloadedImages.blueslug.src = "Assets/BlueSlug.webp"
        PreloadedImages.box.src = "Assets/Box.webp"
        PreloadedImages.comb.src = "Assets/Comb.webp"
        PreloadedImages.combjar.src = "Assets/CombJar.webp"
        PreloadedImages.cow.src = "Assets/Cow.webp"
        PreloadedImages.crab.src = "Assets/Crab.webp"
        PreloadedImages.crumpledblackplaid.src = "Assets/CrumpledBlackPlaid.webp"
        PreloadedImages.deodorant.src = "Assets/Deodorant.webp"
        PreloadedImages.earrings.src = "Assets/Earrings.webp"
        PreloadedImages.fancycrumpled.src = "Assets/FancyCrumpled.webp"
        PreloadedImages.fancyshirt.src = "Assets/FancyShirt.webp"
        PreloadedImages.flowervase.src = "Assets/FlowerVase.webp"
        PreloadedImages.glassdragon.src = "Assets/GlassDragon.webp"
        PreloadedImages.glassescane.src = "Assets/GlassesCane.webp"
        PreloadedImages.glassmonkey.src = "Assets/GlassMonkey.webp"
        PreloadedImages.gordon.src = "Assets/Gordon.webp"
        PreloadedImages.gradcane.src = "Assets/GradCane.webp"
        PreloadedImages.greenfuzzcrumpled.src = "Assets/GreenFuzzCrumpled.webp"
        PreloadedImages.greenshirt.src = "Assets/GreenShirt.webp"
        PreloadedImages.greypatternedshirt.src = "Assets/GreyPatternedShirt.webp"
        PreloadedImages.gumdrop.src = "Assets/Gumdrop.webp"
        PreloadedImages.happysnail.src = "Assets/HappySnail.webp"
        PreloadedImages.headphones.src = "Assets/Headphones.webp"
        PreloadedImages.hotcocoa.src = "Assets/HotCocoa.webp"
        PreloadedImages.leather.src = "Assets/Leather.webp"
        PreloadedImages.legored.src = "Assets/LEGORed.webp"
        PreloadedImages.legovenusflytrap.src = "Assets/LEGOVenusFlytrap.webp"
        PreloadedImages.makeupjar.src = "Assets/MakeupJar.webp"
        PreloadedImages.mucin.src = "Assets/Mucin.webp"
        PreloadedImages.patternedcrumpled.src = "Assets/PatternedCrumpled.webp"
        PreloadedImages.penguinduck.src = "Assets/PenguinDuck.webp"
        PreloadedImages.percussionfrog.src = "Assets/PercussionFrog.webp"
        PreloadedImages.pineapplefrog.src = "Assets/PineappleFrog.webp"
        PreloadedImages.pinktray.src = "Assets/PinkTray.webp"
        PreloadedImages.planathan.src = "Assets/Planathan.webp"
        PreloadedImages.pocky.src = "Assets/Pocky.webp"
        PreloadedImages.pockybox.src = "Assets/PockyBox.webp"
        PreloadedImages.polka.src = "Assets/Polka.webp"
        PreloadedImages.polkacrumpled.src = "Assets/PolkaCrumpled.webp"
        PreloadedImages.rainbowturtle.src = "Assets/RainbowTurtle.webp"
        PreloadedImages.raven.src = "Assets/Raven.webp"
        PreloadedImages.redplaid.src = "Assets/RedPlaid.webp"
        PreloadedImages.redplaidcrumpled.src = "Assets/RedPlaidCrumpled.webp"
        PreloadedImages.shrimpcasket.src = "Assets/ShrimpCasket.webp"
        PreloadedImages.strawberry.src = "Assets/Strawberry.webp"
        PreloadedImages.tacocup.src = "Assets/TacoCup.webp"
        PreloadedImages.tissue1.src = "Assets/Tissue1.webp"
        PreloadedImages.tissue2.src = "Assets/Tissue2.webp"
        PreloadedImages.tissue3.src = "Assets/Tissue3.webp"
        PreloadedImages.toucan.src = "Assets/Tucan.webp"
        PreloadedImages.turtle.src = "Assets/Turtle.webp"
        PreloadedImages.valentinemonkeyplush.src = "Assets/ValentineMonkeyPlush.webp"
        PreloadedImages.waterbottle.src = "Assets/WaterBottle.webp"
        PreloadedImages.whale.src = "Assets/Whale.webp"
        PreloadedImages.whitesquish.src = "Assets/WhiteSquish.webp"
        PreloadedImages.whitetray.src = "Assets/WhiteTray.webp"
        PreloadedImages.yellowslug.src = "Assets/YellowSlug.webp"
        PreloadedImages.yellowsquish.src = "Assets/YellowSquish.webp"
        PreloadedImages.act_3_bed.src = "Assets/BedTopView.webp"
    }
}