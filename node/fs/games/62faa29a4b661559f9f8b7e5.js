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

// removed import

class LevelScene_Title_Screen extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_Title_Screen", active: false });

        this.mySprite = null;
        this.direction = 1;
        this.speed = 0;
    }

    preload(){
        

		this.load.setBaseURL('http://localhost/');


		this.rawResources = {}
		this.rawResources['cloud.png'] = "fs/res_upload/image/1660593018429.png";
		this.rawResources['coin.png'] = "fs/res_upload/image/1660593041923.png";


		this.load.image('coin', 'fs/res_upload/image/1660593041923.png');
		this.load.image('cloud', 'fs/res_upload/image/1660593018429.png');


		this.levelData = {
    "objects": [
        {
            "_id": "62faa29a404f04e9d729471f",
            "spriteResourceId": "",
            "type": "camera",
            "name": "Camera",
            "frame": {
                "x": 72,
                "y": 55,
                "w": 800,
                "h": 400
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
            "_id": "temp_1660593191241",
            "spriteResourceId": "62faa3914b661559f9f8b7e7",
            "type": "sprite",
            "name": "coin",
            "frame": {
                "x": 218,
                "y": 144,
                "w": 69.5,
                "h": 69.5
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
            "_id": "temp_1660593200948",
            "spriteResourceId": "62faa37a4b661559f9f8b7e6",
            "type": "sprite",
            "name": "cloud",
            "frame": {
                "x": 93,
                "y": 384,
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
    "Difficulty": "8"
}
	

        // Add your code below this line


        
    }
    create(){
        let scaleX = 0, scaleY = 0;
		this.spriteReferences = {}
		// --- scene object coin ---
		const sprite_1 = this.add.sprite(252.75, 178.75, 'coin').setInteractive();
		sprite_1.name = "coin";
		scaleX = 69.5 / sprite_1.displayWidth;
		scaleY = 69.5 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences['coin'] = sprite_1;


		// --- scene object cloud ---
		const sprite_2 = this.add.sprite(118, 409, 'cloud').setInteractive();
		sprite_2.name = "cloud";
		scaleX = 50 / sprite_2.displayWidth;
		scaleY = 50 / sprite_2.displayHeight;
		sprite_2.setScale(scaleX, scaleY);
		this.spriteReferences['cloud'] = sprite_2;


		const objects = this.levelData.objects;
		const camera = objects.find((o) => o.type == 'camera');
		console.log("Camera width & height", camera.frame.w, camera.frame.h);
		this.scale.setGameSize(camera.frame.w, camera.frame.h);
		this.scale.resize(camera.frame.w, camera.frame.h);
		this.cameras.main.setBounds(camera.frame.x, camera.frame.y, camera.frame.w, camera.frame.h)



        // Add your code below this line
        this.mySprite = EdgeProxy.getLevelSprite(this, 'cloud');
        const property = EdgeProxy.getLevelProperty(this, 'Difficulty');
        if (property != null){
            this.speed = Number.parseInt(property)
        }

        // New Code from 2022 December 5

        this.add.tween({
            targets: this.mySprite,
            x: 300,
            yoyo: true,
            duration: 4000 * (1 / this.speed),
            repeat: -1
        })
    }
    update(){

        // Old Code deprecated 2022 December 5:

        // Add your code below this line
        // this.mySprite.frame.x += this.speed * this.direction;

        // if (this.mySprite.frame.x > 400){
        //     this.direction = -1;
        // }
        // else if (this.mySprite.frame.x < 50){
        //     this.direction = 1;
        // }
    }
    destroy(){
        
        // Add your code below this line

    }
}

// removed import

class LevelScene_Level_1 extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_Level_1", active: false });

        /**
         * Resource filename lookup using their display names
         * @type {{ [key: string] : string }}
         */
        this.rawResources = {};
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
		this.rawResources['cloud.png'] = "fs/res_upload/image/1660593018429.png";
		this.rawResources['coin.png'] = "fs/res_upload/image/1660593041923.png";




		this.levelData = {
    "objects": [
        {
            "_id": "62faa29a404f04e9d729471f",
            "spriteResourceId": "",
            "type": "camera",
            "name": "Camera",
            "frame": {
                "x": 10,
                "y": 10,
                "w": 800,
                "h": 600
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

// removed import

class LevelScene_Level_2 extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_Level_2", active: false });

        /**
         * Resource filename lookup using their display names
         * @type {{ [key: string] : string }}
         */
        this.rawResources = {};
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
		this.rawResources['cloud.png'] = "fs/res_upload/image/1660593018429.png";
		this.rawResources['coin.png'] = "fs/res_upload/image/1660593041923.png";




		this.levelData = {
    "objects": [
        {
            "_id": "62faa3ab404f04e9d7294723",
            "spriteResourceId": "",
            "type": "camera",
            "name": "Camera",
            "frame": {
                "x": 50,
                "y": 50,
                "w": 640,
                "h": 480
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

// removed import

class LevelScene_Game_Over_Screen extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_Game_Over_Screen", active: false });

        /**
         * Resource filename lookup using their display names
         * @type {{ [key: string] : string }}
         */
        this.rawResources = {};
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
		this.rawResources['cloud.png'] = "fs/res_upload/image/1660593018429.png";
		this.rawResources['coin.png'] = "fs/res_upload/image/1660593041923.png";




		this.levelData = {
    "objects": [
        {
            "_id": "62faa29a404f04e9d729471f",
            "spriteResourceId": "",
            "type": "camera",
            "name": "Camera",
            "frame": {
                "x": 60,
                "y": 60,
                "w": 700,
                "h": 400
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

const scenes = [LevelScene_Title_Screen, LevelScene_Level_1, LevelScene_Level_2, LevelScene_Game_Over_Screen];
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