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

    constructor(){
        super({key: "LevelScene_Title_Screen", active: false });

        /**
         * Add all references to create sprites to this array.
         */
        this.spriteReferences = {};
        this.star = null;
    }

    preload(){
        this.load.setBaseURL('http://localhost/');
        

		this.load.image('sprite_png', 'fs/res_upload/image/1657959470527.png');
		this.load.image('sprite_png_2', 'fs/res_upload/image/1657959470527.png');
        this.levelData = {
    "objects": [
        {
            "_id": "62d26abc47296535fac2889d",
            "spriteResourceId": "",
            "type": "camera",
            "name": "Camera",
            "frame": {
                "x": 184.828125,
                "y": 30,
                "w": 681.8092739058038,
                "h": 531.190726094196
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
            "name": "sprite_png",
            "frame": {
                "x": 318.4458642695158,
                "y": 213.5580766424917,
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
                "x": 582,
                "y": 213,
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

        // Add your code below this line


        
    }
    create(){
        let scaleX = 0, scaleY = 0;
		// --- scene object Camera ---
		const sprite_1 = this.add.sprite(525.7327619529019, 295.595363047098, 'Camera');
		sprite_1.name = "Camera";
		scaleX = 681.8092739058038 / sprite_1.displayWidth;
		scaleY = 531.190726094196 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences['Camera'] = sprite_1;


		// --- scene object sprite_png ---
		const sprite_2 = this.add.sprite(368.4458642695158, 263.5580766424917, 'sprite_png');
		sprite_2.name = "sprite_png";
		scaleX = 100 / sprite_2.displayWidth;
		scaleY = 100 / sprite_2.displayHeight;
		sprite_2.setScale(scaleX, scaleY);
		this.spriteReferences['sprite_png'] = sprite_2;


		// --- scene object sprite_png_2 ---
		const sprite_3 = this.add.sprite(632, 263, 'sprite_png_2');
		sprite_3.name = "sprite_png_2";
		scaleX = 100 / sprite_3.displayWidth;
		scaleY = 100 / sprite_3.displayHeight;
		sprite_3.setScale(scaleX, scaleY);
		this.spriteReferences['sprite_png_2'] = sprite_3;



        // Add your code below this line

        this.star = this.spriteReferences['sprite_png'];

        /**
         * @type {Object[]}
         */
        const objects = this.levelData.objects; 
        const camera = objects.find((o) => o.type == 'camera');
        const camWidth = camera.frame.w;
        const camHeight = camera.frame.h;

        console.log("Camera width & height", camWidth, camHeight);

        this.scale.setGameSize(camWidth, camHeight);
    }
    update(){

        // Add your code below this line
        this.star.angle += 1;
        this.star.frame.x += 10;

    }
    destroy(){
        
        // Add your code below this line

    }
}

// removed import

class LevelScene_Example_Level_Screen extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_Example_Level_Screen", active: false });

        this.spriteReferences = {};
        this.levelData = null;
    }

    preload(){
        this.load.setBaseURL('http://localhost/');
        

        this.levelData = {
    "objects": []
}

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

        this.spriteReferences = {};
        this.levelData = null;
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
    backgroundColor: "#000022",
    fps: {
        target: 25,
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