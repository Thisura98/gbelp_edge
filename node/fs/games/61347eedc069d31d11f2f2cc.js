// removed import

/*
 * Single player game library. 
 * This file is used by the frontend to,
 *      i. Provide auto compeltion in Logic Editor
 *      ii. Provide game scripting functionality
 */

/**
 * An empty object to transfer data between game template
 * and the game scripts.
 */
window.EdgeProxy = {};

/**
 * Represents an object that can be manipulated within the game.
 * Get an instance using,
 * ```
 * Edge.sprite('your sprite name')
 * ```
 */
class EdgeObject{
    /**
     * Initialize an object.
     * @param {string} name Object Name that matches the name used in the Level (e.g. 'mario1.png')
     */
    constructor(name){
        this.name = name;
    }

    /**
     * Moves an object by the provided number of pixels
     * @param {number} dx Horizontal movement to apply to the object's position
     * @param {number} dy Vertical movement to apply to the object's position
     */
    moveBy(dx, dy){
        console.log("EdgeObject.moveBy", dx, dy);
        console.log("EdgeProxy Debug", EdgeProxy, window.EdgeProxy);
        /**
         * @type Phaser.GameObjects.Sprite
         */
        const object = Edge.getCurrenctScene().children.getByName(this.name);
        object.setX(object.x + dx, object.y + dy);
    }
}

/**
 * Main Platform Object.
 */
class Edge{
    /**
     * Reference an object inside your level (e.g. 'mario1.png')
     * @param {string} name string
     * @return {EdgeObject}
     */
    static gameObject(name){
        return new EdgeObject(name);
    }
    
    /**
     * Private method, not be used by game code.
     * @return {Phaser.Scene}
     */
    static getCurrenctScene(){
        return window.EdgeProxy.getCurrentScene();
    }
}

// removed import

class LevelScene_Title_Screen extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_Title_Screen", active: false });

        /**
         * Add all references to create sprites to this array.
         */
        this.spriteReferences = [];
    }

    preload(){
        this.load.setBaseURL('http://localhost/');
        this.load.image('kirby_png', 'fs/res_upload/image/1630855586492.png');
this.load.image('cloud__png', 'fs/res_upload/image/1630855081729.png');
    }
    create(){
        // --- scene object kirby_png ---
const sprite_1 = this.add.sprite(36, 21, 'kirby_png');
sprite_1.name = "kirby_png";
this.spriteReferences.push(sprite_1);


// --- scene object cloud__png ---
const sprite_6 = this.add.sprite(2, 1, 'cloud__png');
sprite_6.name = "cloud__png";
this.spriteReferences.push(sprite_6);


        
        /**
         * EdgeProxy is defined in singleplayer.lib.js
         */
        window.EdgeProxy.getCurrentScene = function(){
            console.log("LevelScene.getCurrentScene() invoked");
            return this;
        }
    }
    update(){
        console.log("Title_Screen, update called!");
    }
    destroy(){
        console.log("Title_Screen, destroy called!");
    }
}

// removed import

class LevelScene_Example_Level_Screen extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_Example_Level_Screen", active: false });

        /**
         * Add all references to create sprites to this array.
         */
        this.spriteReferences = [];
    }

    preload(){
        this.load.setBaseURL('http://localhost/');
        this.load.image('cloud__png', 'fs/res_upload/image/1630855081729.png');
this.load.image('kirby_png', 'fs/res_upload/image/1630855586492.png');
this.load.image('cloud__png_2', 'fs/res_upload/image/1630855081729.png');
this.load.image('cloud__png_3', 'fs/res_upload/image/1630855081729.png');
this.load.image('brick_png', 'fs/res_upload/image/1630855904902.png');
this.load.image('brick_png_2', 'fs/res_upload/image/1630855904902.png');
    }
    create(){
        // --- scene object cloud__png ---
const sprite_1 = this.add.sprite(54, 55, 'cloud__png');
sprite_1.name = "cloud__png";
this.spriteReferences.push(sprite_1);


// --- scene object kirby_png ---
const sprite_6 = this.add.sprite(3, 205.53736293488555, 'kirby_png');
sprite_6.name = "kirby_png";
this.spriteReferences.push(sprite_6);


// --- scene object cloud__png_2 ---
const sprite_11 = this.add.sprite(113, 118, 'cloud__png_2');
sprite_11.name = "cloud__png_2";
this.spriteReferences.push(sprite_11);


// --- scene object cloud__png_3 ---
const sprite_16 = this.add.sprite(256, 87.5, 'cloud__png_3');
sprite_16.name = "cloud__png_3";
this.spriteReferences.push(sprite_16);


// --- scene object brick_png ---
const sprite_21 = this.add.sprite(3, 252, 'brick_png');
sprite_21.name = "brick_png";
this.spriteReferences.push(sprite_21);


// --- scene object brick_png_2 ---
const sprite_26 = this.add.sprite(759, 313, 'brick_png_2');
sprite_26.name = "brick_png_2";
this.spriteReferences.push(sprite_26);


        
        /**
         * EdgeProxy is defined in singleplayer.lib.js
         */
        window.EdgeProxy.getCurrentScene = function(){
            console.log("LevelScene.getCurrentScene() invoked");
            return this;
        }
    }
    update(){
        console.log("Example_Level_Screen, update called!");
    }
    destroy(){
        console.log("Example_Level_Screen, destroy called!");
    }
}

// removed import

class LevelScene_Game_Over_Screen extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_Game_Over_Screen", active: false });

        /**
         * Add all references to create sprites to this array.
         */
        this.spriteReferences = [];
    }

    preload(){
        this.load.setBaseURL('http://localhost/');
        
    }
    create(){
        
        
        /**
         * EdgeProxy is defined in singleplayer.lib.js
         */
        window.EdgeProxy.getCurrentScene = function(){
            console.log("LevelScene.getCurrentScene() invoked");
            return this;
        }
    }
    update(){
        console.log("Game_Over_Screen, update called!");
    }
    destroy(){
        console.log("Game_Over_Screen, destroy called!");
    }
}

const scenes = [LevelScene_Title_Screen, LevelScene_Example_Level_Screen, LevelScene_Game_Over_Screen];

/**
 * @type Phaser.Core.Config
 */
const config = {
    type: Phaser.AUTO,
    parent: 'canvas-container',
    width: 400,
    height: 300,
    // scene: scenes,
    title: 'Shock and Awesome',
    fps: {
        target: 25,
        forceSetTimeOut: true
    },
};

const edgeGame = new Phaser.Game(config);

/**
 * @type Phaser.Scene
 */
const startingScene = LevelScene_Title_Screen;

edgeGame.scene.add('scene', startingScene, true, null);

/**
 * Proxying methods
 * 
 * EdgeProxy is defined in singleplayer.lib.js
 */
window.EdgeProxy.unloadGame = function(){
    console.log("EdgeProxy manual destroy invoked");
    edgeGame.destroy();
}