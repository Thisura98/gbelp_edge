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
        return window.EdgeProxy.currentScene;
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
        let scaleX = 0, scaleY = 0;
// --- scene object kirby_png ---
		const sprite_1 = this.add.sprite(73, 22, 'kirby_png');
		sprite_1.name = "kirby_png";
		scaleX = 38 / sprite_1.displayWidth;
		scaleY = 38 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences.push(sprite_1);


// --- scene object cloud__png ---
		const sprite_2 = this.add.sprite(20, 19, 'cloud__png');
		sprite_2.name = "cloud__png";
		scaleX = 36 / sprite_2.displayWidth;
		scaleY = 36 / sprite_2.displayHeight;
		sprite_2.setScale(scaleX, scaleY);
		this.spriteReferences.push(sprite_2);


        
        /**
         * EdgeProxy is defined in singleplayer.lib.js
         */
        window.EdgeProxy.currentScene = this;
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
        let scaleX = 0, scaleY = 0;
// --- scene object cloud__png ---
		const sprite_1 = this.add.sprite(71.5, 72.5, 'cloud__png');
		sprite_1.name = "cloud__png";
		scaleX = 35 / sprite_1.displayWidth;
		scaleY = 34.99999999999999 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences.push(sprite_1);


// --- scene object kirby_png ---
		const sprite_2 = this.add.sprite(20.268681467442807, 222.76868146744275, 'kirby_png');
		sprite_2.name = "kirby_png";
		scaleX = 34.537362934885614 / sprite_2.displayWidth;
		scaleY = 34.4626370651144 / sprite_2.displayHeight;
		sprite_2.setScale(scaleX, scaleY);
		this.spriteReferences.push(sprite_2);


// --- scene object cloud__png_2 ---
		const sprite_3 = this.add.sprite(130.25, 135.25, 'cloud__png_2');
		sprite_3.name = "cloud__png_2";
		scaleX = 34.50000000000001 / sprite_3.displayWidth;
		scaleY = 34.50000000000001 / sprite_3.displayHeight;
		sprite_3.setScale(scaleX, scaleY);
		this.spriteReferences.push(sprite_3);


// --- scene object cloud__png_3 ---
		const sprite_4 = this.add.sprite(273.25, 104.75, 'cloud__png_3');
		sprite_4.name = "cloud__png_3";
		scaleX = 34.5 / sprite_4.displayWidth;
		scaleY = 34.5 / sprite_4.displayHeight;
		sprite_4.setScale(scaleX, scaleY);
		this.spriteReferences.push(sprite_4);


// --- scene object brick_png ---
		const sprite_5 = this.add.sprite(465.5, 260.5, 'brick_png');
		sprite_5.name = "brick_png";
		scaleX = 925 / sprite_5.displayWidth;
		scaleY = 17.000000000000004 / sprite_5.displayHeight;
		sprite_5.setScale(scaleX, scaleY);
		this.spriteReferences.push(sprite_5);


// --- scene object brick_png_2 ---
		const sprite_6 = this.add.sprite(1210.5, 322, 'brick_png_2');
		sprite_6.name = "brick_png_2";
		scaleX = 902.9999999999999 / sprite_6.displayWidth;
		scaleY = 17.999999999999996 / sprite_6.displayHeight;
		sprite_6.setScale(scaleX, scaleY);
		this.spriteReferences.push(sprite_6);


        
        /**
         * EdgeProxy is defined in singleplayer.lib.js
         */
        window.EdgeProxy.currentScene = this;
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
        let scaleX = 0, scaleY = 0;
        
        /**
         * EdgeProxy is defined in singleplayer.lib.js
         */
        window.EdgeProxy.currentScene = this;
    }
    update(){
        console.log("Game_Over_Screen, update called!");
    }
    destroy(){
        console.log("Game_Over_Screen, destroy called!");
    }
}

const scenes = [LevelScene_Title_Screen, LevelScene_Example_Level_Screen, LevelScene_Game_Over_Screen];
const gameZoom = 2;

/**
 * @type Phaser.Core.Config
 */
const config = {
    type: Phaser.AUTO,
    parent: 'canvas-container',
    width: 400*1.5,
    height: 300*1.5,
    // scene: scenes,
    title: 'Shock and Awesome',
    backgroundColor: "#000022",
    fps: {
        target: 25,
        forceSetTimeOut: true
    },
    scaleMode: Phaser.Scale.FIT,
    // zoom: gameZoom
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
window.EdgeProxy.unloadGame = function(){
    console.log("EdgeProxy manual destroy invoked");
    edgeGame.destroy();
}

window.addEventListener('resize', () => {
    // const parent
    // edgeGame.scale.setZoom
});