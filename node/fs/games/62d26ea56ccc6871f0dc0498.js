// removed import
// removed import

/**
 * Communicate with the EDGE system.
 */
const EdgeProxy = {
    /**
     * Increase progress points for an objective
     * @param {string} name The 'name' of the objective. Case insensitive.
     * @param {number} points Number of points to add to the objective.
     */
    increaseObjectiveProgress: function(name, points){
        if (window.EdgeInternals._on_updateObjective != null)
            window.EdgeInternals._on_updateObjective(name, points);
        else
            console.log("Edge Internal implementation for _on_updateObjective missing");
    },
    /**
     * Increase hitpoints for a guidance tracker
     * @param {string} name The 'name' of the guidance tracker. Case insensitive.
     * @param {number} points Number of points to add to the objective.
     */
    increaseGuidanceProgress: function(name, points){
        if (window.EdgeInternals._on_updateGuidance != null)
            window.EdgeInternals._on_updateGuidance(name, points);
        else
            console.log("Edge Internal implementation for _on_updateGuidance missing");
    }
}

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

    constructor(){
        super({key: "LevelScene_Title_Screen", active: false });

        this.star = null;
        this.star2 = null;
        this.btnObjective = null;
        this.btnGuidance = null;
        
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
		this.load.image('btn_objective', 'fs/res_upload/image/1660211080337.png');
		this.load.image('btn_guidance', 'fs/res_upload/image/1660211080337.png');
        this.levelData = {
    "objects": [
        {
            "_id": "62d26abc47296535fac2889d",
            "spriteResourceId": "",
            "type": "camera",
            "name": "Camera",
            "frame": {
                "x": 30,
                "y": 18,
                "w": 800,
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
                "x": 291,
                "y": 90,
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
        },
        {
            "_id": "temp_1660211100896",
            "spriteResourceId": "62f4cf88ca6ee9ad4bd59690",
            "type": "sprite",
            "name": "btn_objective",
            "frame": {
                "x": 139,
                "y": 323,
                "w": 50,
                "h": 50
            },
            "rotation": 0,
            "physicsBehavior": "0",
            "physicsCollision": "0",
            "opacity": 0,
            "spawnBehavior": "1",
            "spriteStretch": "1",
            "hidden": false
        },
        {
            "_id": "temp_1660211110414",
            "spriteResourceId": "62f4cf88ca6ee9ad4bd59690",
            "type": "sprite",
            "name": "btn_guidance",
            "frame": {
                "x": 515.5,
                "y": 328.5,
                "w": 50,
                "h": 50
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
		// --- scene object sprite_png_1 ---
		const sprite_1 = this.add.sprite(341, 140, 'sprite_png_1').setInteractive();
		sprite_1.name = "sprite_png_1";
		scaleX = 100 / sprite_1.displayWidth;
		scaleY = 100 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences['sprite_png_1'] = sprite_1;


		// --- scene object sprite_png_2 ---
		const sprite_2 = this.add.sprite(341, 287, 'sprite_png_2').setInteractive();
		sprite_2.name = "sprite_png_2";
		scaleX = 100 / sprite_2.displayWidth;
		scaleY = 100 / sprite_2.displayHeight;
		sprite_2.setScale(scaleX, scaleY);
		this.spriteReferences['sprite_png_2'] = sprite_2;


		// --- scene object btn_objective ---
		const sprite_3 = this.add.sprite(164, 348, 'btn_objective').setInteractive();
		sprite_3.name = "btn_objective";
		scaleX = 50 / sprite_3.displayWidth;
		scaleY = 50 / sprite_3.displayHeight;
		sprite_3.setScale(scaleX, scaleY);
		this.spriteReferences['btn_objective'] = sprite_3;


		// --- scene object btn_guidance ---
		const sprite_4 = this.add.sprite(540.5, 353.5, 'btn_guidance').setInteractive();
		sprite_4.name = "btn_guidance";
		scaleX = 50 / sprite_4.displayWidth;
		scaleY = 50 / sprite_4.displayHeight;
		sprite_4.setScale(scaleX, scaleY);
		this.spriteReferences['btn_guidance'] = sprite_4;


        		const objects = this.levelData.objects;
		const camera = objects.find((o) => o.type == 'camera');
		console.log("Camera width & height", camera.frame.w, camera.frame.h);
		this.scale.setGameSize(camera.frame.w, camera.frame.h);
		this.scale.resize(camera.frame.w, camera.frame.h);
		this.cameras.main.setBounds(camera.frame.x, camera.frame.y, camera.frame.w, camera.frame.h)

        // Add your code below this line

        this.star = this.spriteReferences['sprite_png_1'];
        this.star2 = this.spriteReferences['sprite_png_2'];
        this.btnObjective = this.spriteReferences['btn_objective'];
        this.btnGuidance = this.spriteReferences['btn_guidance'];

        if (this.levelProperties['Character Color'] != null){
            const tints = [0xFF0000, 0x00FF00, 0x0000EE, 0x00FFFF];
            const index = Number.parseInt(this.levelProperties['Character Color']) - 1;
            this.star.setTint(tints[index]);
            this.star2.setTint(this.star.tintTopLeft);
        }

        this.btnObjective.on('pointerdown', (pointer) => {
            this.btnObjective.setTint(0xFF0000);
        });

        this.btnObjective.on('pointerup', (pointer) => {
            this.btnObjective.setTint(0xFFFFFF);
        });
        
    }
    update(){

        // Add your code below this line
        // this.star.angle += 1;
        this.star.frame.x = 800 + Math.sin(this.t) * 1000;

        // Uncomment to add camera movement tests
        // this.cameras.main.setPosition(Math.cos(this.t) * 100, Math.sin(this.t) * 100);

        // Increase animation clock
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
        		const objects = this.levelData.objects;
		const camera = objects.find((o) => o.type == 'camera');
		console.log("Camera width & height", camera.frame.w, camera.frame.h);
		this.scale.setGameSize(camera.frame.w, camera.frame.h);
		this.scale.resize(camera.frame.w, camera.frame.h);
		this.cameras.main.setBounds(camera.frame.x, camera.frame.y, camera.frame.w, camera.frame.h)

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
        		const objects = this.levelData.objects;
		const camera = objects.find((o) => o.type == 'camera');
		console.log("Camera width & height", camera.frame.w, camera.frame.h);
		this.scale.setGameSize(camera.frame.w, camera.frame.h);
		this.scale.resize(camera.frame.w, camera.frame.h);
		this.cameras.main.setBounds(camera.frame.x, camera.frame.y, camera.frame.w, camera.frame.h)

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

const scenes = [LevelScene_Title_Screen, LevelScene_Example_Level_Screen, LevelScene_Game_Over_Screen];
const gameZoom = 1.0;

/**
 * Remove all elements inside the canvas container
 */
document.getElementById(canvasName).replaceChildren([]);

/**
 * @type {Phaser.Core.Config}
 */
const config = {
    type: Phaser.WEBGL,
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