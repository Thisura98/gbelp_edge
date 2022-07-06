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
        const object = Edge._gcs().children.getByName(this.name);
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
    static _gcs(){
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
        

		this.load.image('test_png', 'fs/res_upload/image/1656869912898.png');
		this.load.image('test_png_2', 'fs/res_upload/image/1656869912898.png');
		this.load.image('test_png_3', 'fs/res_upload/image/1656869912898.png');
    }
    create(){
        let scaleX = 0, scaleY = 0;
		// --- scene object test_png ---
		const sprite_1 = this.add.sprite(234.46626011242853, 29.66299017090057, 'test_png');
		sprite_1.name = "test_png";
		scaleX = 202 / sprite_1.displayWidth;
		scaleY = 100 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences.push(sprite_1);


		// --- scene object test_png_2 ---
		const sprite_2 = this.add.sprite(381.5, 238, 'test_png_2');
		sprite_2.name = "test_png_2";
		scaleX = 201 / sprite_2.displayWidth;
		scaleY = 100 / sprite_2.displayHeight;
		sprite_2.setScale(scaleX, scaleY);
		this.spriteReferences.push(sprite_2);


		// --- scene object test_png_3 ---
		const sprite_3 = this.add.sprite(675, 234, 'test_png_3');
		sprite_3.name = "test_png_3";
		scaleX = 206 / sprite_3.displayWidth;
		scaleY = 100 / sprite_3.displayHeight;
		sprite_3.setScale(scaleX, scaleY);
		this.spriteReferences.push(sprite_3);


        
        /**
         * EdgeProxy is defined in singleplayer.lib.js
         */
        window.EdgeProxy.currentScene = this;

        // no-o
    }
    update(){
        const element = Edge.gameObject('test_png');
var direction = 1;
if (direction == 1){
    element.moveBy(0, 5);
    direction = -1;
}
else{
    element.moveBy(0, 2);
    // not much after this
    direction = 1
}
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
        

		this.load.image('test_png', 'fs/res_upload/image/1656869912898.png');
    }
    create(){
        let scaleX = 0, scaleY = 0;
		// --- scene object test_png ---
		const sprite_1 = this.add.sprite(64, 64, 'test_png');
		sprite_1.name = "test_png";
		scaleX = 100 / sprite_1.displayWidth;
		scaleY = 100 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences.push(sprite_1);


        
        /**
         * EdgeProxy is defined in singleplayer.lib.js
         */
        window.EdgeProxy.currentScene = this;

        const element = Edge.gameObject('test_png');
element.moveBy(1, 0)
    }
    update(){
        
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
        
    }
    destroy(){
        console.log("Game_Over_Screen, destroy called!");
    }
}

const scenes = [LevelScene_Title_Screen, LevelScene_Example_Level_Screen, LevelScene_Game_Over_Screen];
const gameZoom = 1.5;

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
    backgroundColor: "#000022",
    fps: {
        target: 25,
        forceSetTimeOut: true
    },
    scaleMode: Phaser.Scale.FIT,
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
window.EdgeProxy.unloadGame = function(){
    console.log("EdgeProxy manual destroy invoked");
    edgeGame.destroy();
}

window.addEventListener('resize', () => {
    // const parent
    // edgeGame.scale.setZoom
});