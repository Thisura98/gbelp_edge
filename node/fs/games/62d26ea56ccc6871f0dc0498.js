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
        if (window.InternalsFromAngular._on_updateObjective != null)
            window.InternalsFromAngular._on_updateObjective(name, points);
        else
            console.log("Edge Internal implementation for _on_updateObjective missing");
    },
    /**
     * Increase hitpoints for a guidance tracker
     * @param {string} name The 'name' of the guidance tracker. Case insensitive.
     * @param {number} points Number of points to add to the objective.
     */
    increaseGuidanceProgress: function(name, points){
        if (window.InternalsFromAngular._on_updateGuidance != null)
            window.InternalsFromAngular._on_updateGuidance(name, points);
        else
            console.log("Edge Internal implementation for _on_updateGuidance missing");
    },
    /**
     * Notify the EDGE system that the user finished the game.
     * For example, when the user is at the last level.
     * @param {string} message The message to show to the user.
     * @param {object | null | undefined} data Optional data
     */
    notifyGameCompleted: function(message, data){
        if (window.InternalsFromAngular._on_gameCompleted != null)
            window.InternalsFromAngular._on_gameCompleted(message, data);
        else
            console.log("Edge Internal implementation for _on_gameCompleted missing");
    },
    
    /**
     * Get a Phaser Sprite by using it's object name
     * @param {Phaser.Scene} scene Pass `this` as the first argument
     * @param {string} key The scene object name you want the sprite for
     * @returns {Phaser.GameObjects.Sprite} The sprite corresponding to the sceneObject name
     */
    getLevelSprite: function(scene, key){
        return scene.spriteReferences[key];
    },

    /**
     * Get a raw object with the displayNames and filePaths of resources
     * @param {Phaser.Scene} scene Pass `this` as the first argument
     * @param {string} displayName Display name of the resources in the resource tab
     * @returns {string} The filePath of the resource
     */
    getLevelRawResourcePath: function(scene, displayName){
        return scene.rawResources[displayName];
    },

    /**
     * Get the entire level as an object. Explore the 'objects' key in the return object.
     * @param {Phaser.Scene} scene Pass `this` as the first argument
     * @returns {object}
     */
    getLevelData: function(scene){
        return scene.levelData;
    },

    /**
     * Get the value for each level property by it's name
     * @param {Phaser.Scene} scene Pass `this` as the first argument
     * @param {string} propertyName The name of the property
     * @returns {object}
     */
    getLevelProperty: function(scene, propertyName){
        return scene.levelProperties[propertyName];
    },

    /**
     * Returns the underlying raw level properties object
     * @param {Phaser.Scene} scene Pass `this` as the first argument
     * @returns {{ [key: string]: object }}
     */
    getAllProperties: function(scene) {
        return scene.levelProperties;
    }
}

// removed import
// removed import

/**
 * Check SPLAY component for this canvas.
 */
const canvasName = 'canvas-container';

// Start of file
class LevelScene_Title_Screen extends Phaser.Scene{

    objective1 = 'Objective 1: Collect 10 gold coins';
    objective2 = 'Objective 2: Collect 50 gold coins';
    tracker1 = 'Trigger 1: Interact with coins timeout';
    tracker2 = 'Trigger 2: Interact with game timeout';

    t = 0;

    constructor(){
        super({key: "LevelScene_Title_Screen", active: false });

        this.star = null;
        this.star2 = null;
        this.btnObjective = null;
        this.btnObjective2 = null;
        this.btnGuidance = null;
        this.btnGuidance2 = null;
        
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
        this.load.setBaseURL('EDGTOKEN_LOADBASEURL');
        

		this.load.setBaseURL('http://localhost/');


		this.rawResources = {}
		this.rawResources['sprite.png'] = "fs/res_upload/image/1657959470527.png";
		this.rawResources['thumbstick.png'] = "fs/res_upload/image/1660211080337.png";
		this.rawResources['rooster.png'] = "fs/res_upload/image/1667874442963.png";


		this.load.image('sprite_png_1', 'fs/res_upload/image/1657959470527.png');
		this.load.image('sprite_png_2', 'fs/res_upload/image/1657959470527.png');
		this.load.image('btn_objective', 'fs/res_upload/image/1660211080337.png');
		this.load.image('btn_guidance', 'fs/res_upload/image/1660211080337.png');
		this.load.image('btn_objective_2', 'fs/res_upload/image/1660211080337.png');
		this.load.image('btn_guidance_2', 'fs/res_upload/image/1660211080337.png');


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
                "x": 356.202551845146,
                "y": 103.56931402771235,
                "w": 100,
                "h": 100
            },
            "rotation": 73.00541393271793,
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
                "x": 137,
                "y": 261,
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
                "x": 491.5,
                "y": 264,
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
            "_id": "temp_1661317810424",
            "spriteResourceId": "62f4cf88ca6ee9ad4bd59690",
            "type": "sprite",
            "name": "btn_objective_2",
            "frame": {
                "x": 137,
                "y": 332,
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
            "_id": "temp_1662058495267",
            "spriteResourceId": "62f4cf88ca6ee9ad4bd59690",
            "type": "sprite",
            "name": "btn_guidance_2",
            "frame": {
                "x": 491.5,
                "y": 332,
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
	
        // EDGTOKEN_LEVEL
        // EDGTOKEN_PROPERTIES

        // Add your code below this line
        
    }
    create(){
        let scaleX = 0, scaleY = 0;
		this.spriteReferences = {}
		// --- scene object sprite_png_1 ---
		const sprite_1 = this.add.sprite(406.202551845146, 153.56931402771235, 'sprite_png_1').setInteractive();
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
		const sprite_3 = this.add.sprite(162, 286, 'btn_objective').setInteractive();
		sprite_3.name = "btn_objective";
		scaleX = 50 / sprite_3.displayWidth;
		scaleY = 50 / sprite_3.displayHeight;
		sprite_3.setScale(scaleX, scaleY);
		this.spriteReferences['btn_objective'] = sprite_3;


		// --- scene object btn_guidance ---
		const sprite_4 = this.add.sprite(516.5, 289, 'btn_guidance').setInteractive();
		sprite_4.name = "btn_guidance";
		scaleX = 50 / sprite_4.displayWidth;
		scaleY = 50 / sprite_4.displayHeight;
		sprite_4.setScale(scaleX, scaleY);
		this.spriteReferences['btn_guidance'] = sprite_4;


		// --- scene object btn_objective_2 ---
		const sprite_5 = this.add.sprite(162, 357, 'btn_objective_2').setInteractive();
		sprite_5.name = "btn_objective_2";
		scaleX = 50 / sprite_5.displayWidth;
		scaleY = 50 / sprite_5.displayHeight;
		sprite_5.setScale(scaleX, scaleY);
		this.spriteReferences['btn_objective_2'] = sprite_5;


		// --- scene object btn_guidance_2 ---
		const sprite_6 = this.add.sprite(516.5, 357, 'btn_guidance_2').setInteractive();
		sprite_6.name = "btn_guidance_2";
		scaleX = 50 / sprite_6.displayWidth;
		scaleY = 50 / sprite_6.displayHeight;
		sprite_6.setScale(scaleX, scaleY);
		this.spriteReferences['btn_guidance_2'] = sprite_6;


		const objects = this.levelData.objects;
		const camera = objects.find((o) => o.type == 'camera');
		console.log("Camera width & height", camera.frame.w, camera.frame.h);
		this.scale.setGameSize(camera.frame.w, camera.frame.h);
		this.scale.resize(camera.frame.w, camera.frame.h);
		this.cameras.main.setBounds(camera.frame.x, camera.frame.y, camera.frame.w, camera.frame.h)


        // EDGTOKEN_SETCAMERA

        // Add your code below this line

        this.star = this.spriteReferences['sprite_png_1'];
        this.star2 = this.spriteReferences['sprite_png_2'];
        this.btnObjective = this.spriteReferences['btn_objective'];
        this.btnObjective2 = this.spriteReferences['btn_objective_2'];
        this.btnGuidance = this.spriteReferences['btn_guidance'];
        this.btnGuidance2 = this.spriteReferences['btn_guidance_2'];

        if (this.levelProperties['Character Color'] != null){
            const tints = [0xFF0000, 0x00FF00, 0x0000EE, 0x00FFFF];
            const index = Number.parseInt(this.levelProperties['Character Color']) - 1;
            this.star.setTint(tints[index]);
            this.star2.setTint(this.star.tintTopLeft);
        }

        // Add Mouse events to the joystick buttons

        this.btnObjective.on('pointerdown', () => this.btnObjective.setTint(0xFF3333));
        this.btnObjective2.on('pointerdown', () => this.btnObjective2.setTint(0xFFFF00));
        this.btnGuidance.on('pointerdown', () => this.btnGuidance.setTint(0x33FF33));
        this.btnGuidance2.on('pointerdown', () => this.btnGuidance2.setTint(0xFFFF22));

        this.btnObjective.on('pointerup', () => {
            this.btnObjective.setTint(0xFFFFFF);
            EdgeProxy.increaseObjectiveProgress(this.objective1, 0.1);
        });
        this.btnObjective2.on('pointerup', () => {
            this.btnObjective2.setTint(0xFFFFFF);
            EdgeProxy.increaseObjectiveProgress(this.objective2, 1);
        });
        this.btnGuidance.on('pointerup', () => {
            this.btnGuidance.setTint(0xFFFFFF)
            EdgeProxy.increaseGuidanceProgress(this.tracker1, 10);
        });
        this.btnGuidance2.on('pointerup', () => {
            this.btnGuidance2.setTint(0xFFFFFF)
            EdgeProxy.increaseGuidanceProgress(this.tracker2, 0.025);
        });

        this.input.keyboard.on('keyup', (event) => {
            if (event.keyCode == Phaser.Input.Keyboard.KeyCodes.W){
                EdgeProxy.increaseGuidanceProgress(this.tracker1, 0.025);
            }
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
    }

    preload(){
        this.load.setBaseURL('EDGTOKEN_LOADBASEURL');
        

		this.load.setBaseURL('http://localhost/');


		this.rawResources = {}
		this.rawResources['sprite.png'] = "fs/res_upload/image/1657959470527.png";
		this.rawResources['thumbstick.png'] = "fs/res_upload/image/1660211080337.png";
		this.rawResources['rooster.png'] = "fs/res_upload/image/1667874442963.png";




		this.levelData = {
    "objects": []
}


		this.levelProperties = {}
	
        // Add your code below this line
        
    }
    create(){
        let scaleX = 0, scaleY = 0;
		this.spriteReferences = {}
		const objects = this.levelData.objects;
		const camera = objects.find((o) => o.type == 'camera');
		console.log("Camera width & height", camera.frame.w, camera.frame.h);
		this.scale.setGameSize(camera.frame.w, camera.frame.h);
		this.scale.resize(camera.frame.w, camera.frame.h);
		this.cameras.main.setBounds(camera.frame.x, camera.frame.y, camera.frame.w, camera.frame.h)


        // Add your code below this line

    }
    update(){
        // EDGTOKEN_UPDATE
        // Add your code below this line

    }
    destroy(){
        // EDGTOKEN_DESTROY
        // Add your code below this line

    }
}

// removed import

class LevelScene_Game_Over_Screen extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_Game_Over_Screen", active: false });
    }

    preload(){
        this.load.setBaseURL('EDGTOKEN_LOADBASEURL');
        

		this.load.setBaseURL('http://localhost/');


		this.rawResources = {}
		this.rawResources['sprite.png'] = "fs/res_upload/image/1657959470527.png";
		this.rawResources['thumbstick.png'] = "fs/res_upload/image/1660211080337.png";
		this.rawResources['rooster.png'] = "fs/res_upload/image/1667874442963.png";




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
		this.spriteReferences = {}
		const objects = this.levelData.objects;
		const camera = objects.find((o) => o.type == 'camera');
		console.log("Camera width & height", camera.frame.w, camera.frame.h);
		this.scale.setGameSize(camera.frame.w, camera.frame.h);
		this.scale.resize(camera.frame.w, camera.frame.h);
		this.cameras.main.setBounds(camera.frame.x, camera.frame.y, camera.frame.w, camera.frame.h)


        // Add your code below this line

    }
    update(){
        // EDGTOKEN_UPDATE
        // Add your code below this line

    }
    destroy(){
        // EDGTOKEN_DESTROY
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
    // backgroundColor: "#FFFFFF",
    backgroundColor: "#000000",
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    scaleMode: Phaser.Scale.NONE,
    zoom: gameZoom,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
};


/**
 * @type Phaser.Game
 */
const edgeGame = new Phaser.Game(config);
scenes.forEach((scn, index) => {
    edgeGame.scene.add('scene', scn, index == 0, null);
});

// edgeGame.scene.add('scene', startingScene, true, null);
// edgeGame.scene.scenes = scenes;

window.InternalsFromGame = {
    _on_changeGameState: (paused) => {

        edgeGame.input.enabled = !paused;
        edgeGame.input.keyboard.enabled = !paused;
        edgeGame.input.mouse.enabled = !paused;

        if (paused){
            const scenes = edgeGame.scene.getScenes(true);
            if (scenes.length > 0){
                scenes.forEach(scn => {
                    if (!scn.scene.isPaused()){
                        scn.scene.pause();
                    }
                })
            }
        }
        else{
            const pausedScenes = edgeGame.scene.getScenes(null)
                .filter(scn => scn.scene.isPaused());
            if (pausedScenes.length > 0){
                pausedScenes.forEach(scn => {
                    scn.scene.resume();
                    scn.input.enabled = true;
                });
                edgeGame.input.enabled = true;
            }
        }
    }
}

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