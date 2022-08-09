// Will be reomved by game compiler.
// Used to provide Type-completion in this script.
// require('../game_compiler/phaser/phaser');

// nothing much here :)

// removed import

/**
 * Check SPLAY component for this canvas.
 */
const canvasName = 'canvas-container';

// Start of file
class LevelScene_Title_Screen extends Phaser.Scene{

    /**
     * @type {Phaser.GameObjects.Sprite}
     */
    star = undefined;

    t = 0;

    cameraBaseX = 0;

    constructor(){
        super({key: "LevelScene_Title_Screen", active: false });

        this.star = null;
        this.star2 = null;
        
        /**
         * All sprites loaded in the create() method
         * @type {{ [key: string] : Phaser.GameObjects.Sprite }}
         */
        this.spriteReferences = {};
        /**
         * The entire scene object (contains the raw game objects in the 'objects' array)
         * @type {Array}
         */
        this.levelData = null;
        /**
         * Properties loaded from the Property Editor
         * @type {Object.<string, any>}
         */
        this.levelProperties = null;
    }

    preload(){
        this.load.setBaseURL('http://localhost/');
        

		this.load.image('sprite_png_1', 'fs/res_upload/image/1657959470527.png');
		this.load.image('sprite_png_2', 'fs/res_upload/image/1657959470527.png');
        this.levelData = {
    "objects": [
        {
            "_id": "62d26abc47296535fac2889d",
            "spriteResourceId": "",
            "type": "camera",
            "name": "Camera",
            "frame": {
                "x": 100,
                "y": 18,
                "w": 640,
                "h": 380
            },
            "rotation": 0,
            "physicsBehavior": "1",
            "physicsCollision": "2",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1657961437079",
            "spriteResourceId": "62d2742ed7b1f90c30e4e176",
            "type": "sprite",
            "name": "sprite_png_1",
            "frame": {
                "x": 291.4458642695158,
                "y": 89.5580766424917,
                "w": 100,
                "h": 100
            },
            "rotation": 0.5086715234408358,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1658062025726",
            "spriteResourceId": "62d2742ed7b1f90c30e4e176",
            "type": "sprite",
            "name": "sprite_png_2",
            "frame": {
                "x": 291,
                "y": 237,
                "w": 100,
                "h": 100
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        }
    ]
}
        this.levelProperties = {
    "Level Difficulty": 0,
    "Game Title": "Example title",
    "Character Color": "2"
}

        // Add your code below this line
        
    }
    create(){
        let scaleX = 0, scaleY = 0;
		// --- scene object Camera ---
		const sprite_1 = this.add.sprite(420, 208, 'Camera');
		sprite_1.name = "Camera";
		scaleX = 640 / sprite_1.displayWidth;
		scaleY = 380 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences['Camera'] = sprite_1;


		// --- scene object sprite_png_1 ---
		const sprite_2 = this.add.sprite(341.4458642695158, 139.5580766424917, 'sprite_png_1');
		sprite_2.name = "sprite_png_1";
		scaleX = 100 / sprite_2.displayWidth;
		scaleY = 100 / sprite_2.displayHeight;
		sprite_2.setScale(scaleX, scaleY);
		this.spriteReferences['sprite_png_1'] = sprite_2;


		// --- scene object sprite_png_2 ---
		const sprite_3 = this.add.sprite(341, 287, 'sprite_png_2');
		sprite_3.name = "sprite_png_2";
		scaleX = 100 / sprite_3.displayWidth;
		scaleY = 100 / sprite_3.displayHeight;
		sprite_3.setScale(scaleX, scaleY);
		this.spriteReferences['sprite_png_2'] = sprite_3;



        // Add your code below this line

        this.star = this.spriteReferences['sprite_png_1'];
        this.star2 = this.spriteReferences['sprite_png_2'];

        if (this.levelProperties['Character Color'] != null){
            const tints = [0xFF0000, 0x00FF00, 0x0000EE, 0x00FFFF];
            const index = Number.parseInt(this.levelProperties['Character Color']) - 1;
            this.star.setTint(tints[index]);
            this.star2.setTint(this.star.tintTopLeft);
        }

        /**
         * @type {Object[]}
         */
        const objects = this.levelData.objects; 
        const camera = objects.find((o) => o.type == 'camera');
        const camX = camera.frame.x;
        const camY = camera.frame.y;
        const camWidth = camera.frame.w;
        const camHeight = camera.frame.h;

        console.log("Camera width & height", camWidth, camHeight);

        this.scale.setGameSize(camWidth, camHeight);
        this.scale.resize(camWidth, camHeight);

        this.cameraBaseX = camX;
        
        this.cameras.main.setBounds(camX, camY, camWidth, camHeight)

        // Demo Code
        // const asteroids = this.properties['no_asteroids'];

        
    }
    update(){

        // Add your code below this line
        // this.star.angle += 1;
        this.star.frame.x = 800 + Math.sin(this.t) * 1000;

        this.cameras.main.setPosition(Math.cos(this.t) * 100, Math.sin(this.t) * 100);

        this.t += 0.1;

    }
    destroy(){
        
        // Add your code below this line

    }
}

// removed import

class LevelScene_Example_Level_Screen extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_Example_Level_Screen", active: false });

        /**
         * All sprites loaded in the create() method
         * @type {{ [key: string] : Phaser.GameObjects.Sprite }}
         */
        this.spriteReferences = {};
        /**
         * The entire scene object (contains the raw game objects in the 'objects' array)
         * @type {Array}
         */
        this.levelData = null;
        /**
         * Properties loaded from the Property Editor
         * @type {Object.<string, any>}
         */
        this.levelProperties = null;
    }

    preload(){
        this.load.setBaseURL('http://localhost/');
        

        this.levelData = {
    "objects": []
}
        this.levelProperties = {}

        // Add your code below this line


        
    }
    create(){
        let scaleX = 0, scaleY = 0;

        // Add your code below this line

    }
    update(){

        // Add your code below this line

    }
    destroy(){
        
        // Add your code below this line

    }
}

// removed import

class LevelScene_Game_Over_Screen extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_Game_Over_Screen", active: false });

        /**
         * All sprites loaded in the create() method
         * @type {{ [key: string] : Phaser.GameObjects.Sprite }}
         */
        this.spriteReferences = {};
        /**
         * The entire scene object (contains the raw game objects in the 'objects' array)
         * @type {Array}
         */
        this.levelData = null;
        /**
         * Properties loaded from the Property Editor
         * @type {Object.<string, any>}
         */
        this.levelProperties = null;
    }

    preload(){
        this.load.setBaseURL('http://localhost/');
        

        this.levelData = {
    "objects": [
        {
            "_id": null,
            "spriteResourceId": "",
            "type": "camera",
            "name": "Camera",
            "frame": {
                "x": 0,
                "y": 0,
                "w": 1366,
                "h": 768
            },
            "rotation": 0,
            "physicsBehavior": "1",
            "physicsCollision": "2",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        }
    ]
}
        this.levelProperties = {}

        // Add your code below this line


        
    }
    create(){
        let scaleX = 0, scaleY = 0;
		// --- scene object Camera ---
		const sprite_1 = this.add.sprite(683, 384, 'Camera');
		sprite_1.name = "Camera";
		scaleX = 1366 / sprite_1.displayWidth;
		scaleY = 768 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences['Camera'] = sprite_1;



        // Add your code below this line

    }
    update(){

        // Add your code below this line

    }
    destroy(){
        
        // Add your code below this line

    }
}

const scenes = [LevelScene_Title_Screen, LevelScene_Example_Level_Screen, LevelScene_Game_Over_Screen];
const gameZoom = 1.0;

/**
 * @type {Phaser.Core.Config}
 */
const config = {
    type: Phaser.AUTO,
    parent: canvasName,
    width: 1366,
    height: 500,
    title: 'Shock and Awesome',
    backgroundColor: "#0000dd",
    fps: {
        target: 30,
        forceSetTimeOut: true
    },
    scaleMode: Phaser.Scale.NONE,
    zoom: gameZoom
};


/**
 * @type Phaser.Scene
 */
const startingScene = LevelScene_Title_Screen;
const edgeGame = new Phaser.Game(config);
edgeGame.scene.add('scene', startingScene, true, null);

/**
 * Proxying methods
 * 
 * EdgeProxy is defined in singleplayer.lib.js
 */
// window.EdgeProxy.unloadGame = function(){
//     console.log("EdgeProxy manual destroy invoked");
//     edgeGame.destroy();
// }

// window.addEventListener('resize', () => {
//     // const parent
//     // edgeGame.scale.setZoom
// });