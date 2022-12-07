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

        this.obj1 = 'CollectTrophy1';
        this.obj2 = 'CollectTrophy2';
        this.guide1 = 'Fall';

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

        // Our Vars

        /**
         * @type {Phaser.GameObjects.Sprite}
         */
        this.player;

        this.playerStartPosition = { x: 0, y: 0 };
        this.cameraHeight = 0;

        /**
         * @type {Phaser.GameObjects.Sprite}
         */
        this.stand1;

        /**
         * @type {Phaser.GameObjects.Sprite}
         */
        this.stand2;

        /**
         * @type {Phaser.GameObjects.Sprite}
         */
        this.stand3;

        /**
         * @type {Phaser.GameObjects.Sprite}
         */
        this.trophy1;

        /**
         * @type {Phaser.GameObjects.Sprite}
         */
        this.trophy2;

        /**
         * @type {Phaser.Types.Input.Keyboard.CursorKeys}
         */
        this.cursors = null;

        this.didPressUp = false;
    }

    preload(){
        this.load.setBaseURL('EDGTOKEN_LOADBASEURL');
        

		this.load.setBaseURL('http://localhost/');


		this.rawResources = {}
		this.rawResources['bg.jpeg'] = "fs/res_upload/image/399c96bd-d16c-429c-930b-9fa68379da3f.jpeg";
		this.rawResources['slime1.png'] = "fs/res_upload/image/463e66c4-7318-4825-865b-c68f0fe41a01.png";
		this.rawResources['slime1_squashed.png'] = "fs/res_upload/image/1c692542-22a1-4fd3-90e8-f890791e936a.png";
		this.rawResources['stand.png'] = "fs/res_upload/image/50f4e464-eecf-47aa-acba-cb23cba0c967.png";
		this.rawResources['trophy1.png'] = "fs/res_upload/image/c2d2635d-36ac-40ca-b14f-8c1653eeb595.png";


		this.load.image('bg', 'fs/res_upload/image/399c96bd-d16c-429c-930b-9fa68379da3f.jpeg');
		this.load.image('slime', 'fs/res_upload/image/463e66c4-7318-4825-865b-c68f0fe41a01.png');
		this.load.image('slime_squished', 'fs/res_upload/image/1c692542-22a1-4fd3-90e8-f890791e936a.png');
		this.load.image('stand1', 'fs/res_upload/image/50f4e464-eecf-47aa-acba-cb23cba0c967.png');
		this.load.image('stand2', 'fs/res_upload/image/50f4e464-eecf-47aa-acba-cb23cba0c967.png');
		this.load.image('stand3', 'fs/res_upload/image/50f4e464-eecf-47aa-acba-cb23cba0c967.png');
		this.load.image('trophy1', 'fs/res_upload/image/c2d2635d-36ac-40ca-b14f-8c1653eeb595.png');
		this.load.image('trophy2', 'fs/res_upload/image/c2d2635d-36ac-40ca-b14f-8c1653eeb595.png');


		this.levelData = {
    "objects": [
        {
            "_id": "638188e34645dd4e39f96b13",
            "spriteResourceId": "",
            "type": "camera",
            "name": "Camera",
            "frame": {
                "x": 0,
                "y": 0,
                "w": 800,
                "h": 500
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
            "_id": "temp_1669433661779",
            "spriteResourceId": "6381892475cad65356065a9c",
            "type": "sprite",
            "name": "bg",
            "frame": {
                "x": 0,
                "y": 0,
                "w": 805,
                "h": 529
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
            "_id": "temp_1669433709881",
            "spriteResourceId": "6381892775cad65356065a9d",
            "type": "sprite",
            "name": "slime",
            "frame": {
                "x": 95,
                "y": 232,
                "w": 57,
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
            "_id": "temp_1669433759178",
            "spriteResourceId": "6381892a75cad65356065a9e",
            "type": "sprite",
            "name": "slime_squished",
            "frame": {
                "x": 12,
                "y": 519,
                "w": 57,
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
            "_id": "temp_1669434497960",
            "spriteResourceId": "63818c7e75cad65356065aa0",
            "type": "sprite",
            "name": "stand1",
            "frame": {
                "x": 64,
                "y": 304,
                "w": 119,
                "h": 224
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
            "_id": "temp_1669434552436",
            "spriteResourceId": "63818c7e75cad65356065aa0",
            "type": "sprite",
            "name": "stand2",
            "frame": {
                "x": 284,
                "y": 303,
                "w": 119,
                "h": 224
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
            "_id": "temp_1669435788944",
            "spriteResourceId": "63818c7e75cad65356065aa0",
            "type": "sprite",
            "name": "stand3",
            "frame": {
                "x": 512,
                "y": 303,
                "w": 119,
                "h": 224
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
            "_id": "temp_1669435956373",
            "spriteResourceId": "6381922f75cad65356065aa3",
            "type": "sprite",
            "name": "trophy1",
            "frame": {
                "x": 324,
                "y": 217,
                "w": 38,
                "h": 38
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
            "_id": "temp_1669435967088",
            "spriteResourceId": "6381922f75cad65356065aa3",
            "type": "sprite",
            "name": "trophy2",
            "frame": {
                "x": 553,
                "y": 217,
                "w": 38,
                "h": 38
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


		this.levelProperties = {}
	
        // EDGTOKEN_LEVEL
        // EDGTOKEN_PROPERTIES
        // EDGTOKEN_SETCAMERA

        // Add your code below this line


        
    }
    create(){
        let scaleX = 0, scaleY = 0;
		this.spriteReferences = {}
		// --- scene object bg ---
		const sprite_1 = this.add.sprite(402.5, 264.5, 'bg').setInteractive();
		sprite_1.name = "bg";
		scaleX = 805 / sprite_1.displayWidth;
		scaleY = 529 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences['bg'] = sprite_1;


		// --- scene object slime ---
		const sprite_2 = this.add.sprite(123.5, 257, 'slime').setInteractive();
		sprite_2.name = "slime";
		scaleX = 57 / sprite_2.displayWidth;
		scaleY = 50 / sprite_2.displayHeight;
		sprite_2.setScale(scaleX, scaleY);
		this.spriteReferences['slime'] = sprite_2;


		// --- scene object slime_squished ---
		const sprite_3 = this.add.sprite(40.5, 544, 'slime_squished').setInteractive();
		sprite_3.name = "slime_squished";
		scaleX = 57 / sprite_3.displayWidth;
		scaleY = 50 / sprite_3.displayHeight;
		sprite_3.setScale(scaleX, scaleY);
		this.spriteReferences['slime_squished'] = sprite_3;


		// --- scene object stand1 ---
		const sprite_4 = this.add.sprite(123.5, 416, 'stand1').setInteractive();
		sprite_4.name = "stand1";
		scaleX = 119 / sprite_4.displayWidth;
		scaleY = 224 / sprite_4.displayHeight;
		sprite_4.setScale(scaleX, scaleY);
		this.spriteReferences['stand1'] = sprite_4;


		// --- scene object stand2 ---
		const sprite_5 = this.add.sprite(343.5, 415, 'stand2').setInteractive();
		sprite_5.name = "stand2";
		scaleX = 119 / sprite_5.displayWidth;
		scaleY = 224 / sprite_5.displayHeight;
		sprite_5.setScale(scaleX, scaleY);
		this.spriteReferences['stand2'] = sprite_5;


		// --- scene object stand3 ---
		const sprite_6 = this.add.sprite(571.5, 415, 'stand3').setInteractive();
		sprite_6.name = "stand3";
		scaleX = 119 / sprite_6.displayWidth;
		scaleY = 224 / sprite_6.displayHeight;
		sprite_6.setScale(scaleX, scaleY);
		this.spriteReferences['stand3'] = sprite_6;


		// --- scene object trophy1 ---
		const sprite_7 = this.add.sprite(343, 236, 'trophy1').setInteractive();
		sprite_7.name = "trophy1";
		scaleX = 38 / sprite_7.displayWidth;
		scaleY = 38 / sprite_7.displayHeight;
		sprite_7.setScale(scaleX, scaleY);
		this.spriteReferences['trophy1'] = sprite_7;


		// --- scene object trophy2 ---
		const sprite_8 = this.add.sprite(572, 236, 'trophy2').setInteractive();
		sprite_8.name = "trophy2";
		scaleX = 38 / sprite_8.displayWidth;
		scaleY = 38 / sprite_8.displayHeight;
		sprite_8.setScale(scaleX, scaleY);
		this.spriteReferences['trophy2'] = sprite_8;


		const objects = this.levelData.objects;
		const camera = objects.find((o) => o.type == 'camera');
		console.log("Camera width & height", camera.frame.w, camera.frame.h);
		this.scale.setGameSize(camera.frame.w, camera.frame.h);
		this.scale.resize(camera.frame.w, camera.frame.h);
		this.cameras.main.setBounds(camera.frame.x, camera.frame.y, camera.frame.w, camera.frame.h)



        // Add your code below this line
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = this.spriteReferences['slime'];
        this.stand1 = this.spriteReferences['stand1'];
        this.stand2 = this.spriteReferences['stand2'];
        this.stand3 = this.spriteReferences['stand3'];
        this.trophy1 = this.spriteReferences['trophy1'];
        this.trophy2 = this.spriteReferences['trophy2'];

        this.playerStartPosition.x = this.player.x;
        this.playerStartPosition.y = this.player.y;
        this.cameraHeight = this.cameras.main.displayHeight;

        this.createSlimeAnimation();
        this.createPhysics();
    }
    update(){

        // Add your code below this line
        this.handlePlayerMovement();
        this.trackFalling();

    }
    destroy(){
        
        // Add your code below this line

    }

    // private methods

    createSlimeAnimation(){
        this.anims.create({
            key: 'squish',
            frames: [
                { key: 'slime' },
                { key: 'slime_squished', duration: 5 },
            ],
            frameRate: 2,
            repeat: -1
        });

        this.player.anims.play('squish');
    }

    /**
     * @param sprite {Phaser.GameObjects.Sprite}
     * @returns {Phaser.Physics.Arcade.Body}
     */
    getBody(sprite){
        return sprite.body;
    }

    createPhysics(){
        this.physics.world.gravity.y = 1000;
        this.physics.world.enableBody(this.player);
        this.physics.world.enableBody(this.stand1);
        this.physics.world.enableBody(this.stand2);
        this.physics.world.enableBody(this.stand3);
        this.physics.world.enableBody(this.trophy1);
        this.physics.world.enableBody(this.trophy2);
        
        /**
         * @type {Phaser.Physics.Arcade.Body}
         */
        const body = this.getBody(this.player);
        const stand1Body = this.getBody(this.stand1);
        const stand2Body = this.getBody(this.stand2);
        const stand3Body = this.getBody(this.stand3);
        const trophy1Body = this.getBody(this.trophy1);
        const trophy2Body = this.getBody(this.trophy2);

        // body.setVelocityX(10);
        stand1Body.allowGravity = false;
        stand2Body.allowGravity = false;
        stand3Body.allowGravity = false;
        stand1Body.setImmovable(true);
        stand2Body.setImmovable(true);
        stand3Body.setImmovable(true);
        trophy1Body.allowGravity = false;
        trophy2Body.allowGravity = false;

        this.physics.add.collider(this.player, this.stand1);
        this.physics.add.collider(this.player, this.stand2);
        this.physics.add.collider(this.player, this.stand3);
        this.physics.add.collider(this.player, this.trophy1, () => {
            EdgeProxy.increaseObjectiveProgress(this.obj1, 1);
            this.trophy1.destroy();
        });
        this.physics.add.collider(this.player, this.trophy2, () => {
            EdgeProxy.increaseObjectiveProgress(this.obj2, 1);
            EdgeProxy.notifyGameCompleted('You Finished the game!');
            this.trophy2.destroy();
        });
    }

    /**
     * Add keyboard controls to rocket
     */
    handlePlayerMovement(){
        // let velocity = this.rocketVelocity;
        const velocity = 5;
        let kb = this.cursors;
        let player = this.player;
        let x = player.x;

        if (kb.left.isDown)
            player.setX(x - velocity);

        if (kb.right.isDown)
            player.setX(x + velocity);

        if (kb.up.isDown){
            if (!this.didPressUp){
                const body = this.getBody(this.player);
                body.setVelocityY(-500);
                this.didPressUp = true;
            }
        }
        else{
            this.didPressUp = false;
        }
    }

    trackFalling(){
        const player = this.player;
        const startPos = this.playerStartPosition;

        if (player.getBottomCenter().y > this.cameraHeight){
            EdgeProxy.increaseGuidanceProgress(this.guide1, 1);
            player.setX(startPos.x);
            player.setY(startPos.y - 200);
        }
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
		this.rawResources['bg.jpeg'] = "fs/res_upload/image/399c96bd-d16c-429c-930b-9fa68379da3f.jpeg";
		this.rawResources['slime1.png'] = "fs/res_upload/image/463e66c4-7318-4825-865b-c68f0fe41a01.png";
		this.rawResources['slime1_squashed.png'] = "fs/res_upload/image/1c692542-22a1-4fd3-90e8-f890791e936a.png";
		this.rawResources['stand.png'] = "fs/res_upload/image/50f4e464-eecf-47aa-acba-cb23cba0c967.png";
		this.rawResources['trophy1.png'] = "fs/res_upload/image/c2d2635d-36ac-40ca-b14f-8c1653eeb595.png";




		this.levelData = {
    "objects": [
        {
            "_id": "638188e34645dd4e39f96b13",
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

const scenes = [LevelScene_Title_Screen, LevelScene_Game_Over_Screen];
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