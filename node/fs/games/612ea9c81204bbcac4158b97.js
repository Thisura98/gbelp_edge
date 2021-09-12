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
        

		this.load.image('cloud_png', 'fs/res_upload/image/1631444906723.png');
		this.load.image('cloud_png_2', 'fs/res_upload/image/1631444906723.png');
    }
    create(){
        let scaleX = 0, scaleY = 0;
		// --- scene object cloud_png ---
		const sprite_1 = this.add.sprite(165.5, 70, 'cloud_png');
		sprite_1.name = "cloud_png";
		scaleX = 289 / sprite_1.displayWidth;
		scaleY = 100 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences.push(sprite_1);


		// --- scene object cloud_png_2 ---
		const sprite_2 = this.add.sprite(412.5, 134, 'cloud_png_2');
		sprite_2.name = "cloud_png_2";
		scaleX = 290.99999999999994 / sprite_2.displayWidth;
		scaleY = 100 / sprite_2.displayHeight;
		sprite_2.setScale(scaleX, scaleY);
		this.spriteReferences.push(sprite_2);


        
        /**
         * EdgeProxy is defined in singleplayer.lib.js
         */
        window.EdgeProxy.currentScene = this;

        
    }
    update(){
        
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
        console.log("Example_Level_Screen, destroy called!");
    }
}

// removed import

class LevelScene_Test_Level__ extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_Test_Level__", active: false });

        /**
         * Add all references to create sprites to this array.
         */
        this.spriteReferences = [];
    }

    preload(){
        this.load.setBaseURL('http://localhost/');
        

		this.load.image('brick_png', 'fs/res_upload/image/1630448411321.png');
		this.load.image('mario_png', 'fs/res_upload/image/1630448440504.png');
    }
    create(){
        let scaleX = 0, scaleY = 0;
		// --- scene object brick_png ---
		const sprite_1 = this.add.sprite(182.6155670087044, 353.26719042928767, 'brick_png');
		sprite_1.name = "brick_png";
		scaleX = 44.5 / sprite_1.displayWidth;
		scaleY = 44.5 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences.push(sprite_1);


		// --- scene object mario_png ---
		const sprite_2 = this.add.sprite(129.75, 280.25, 'mario_png');
		sprite_2.name = "mario_png";
		scaleX = 23.499999999999996 / sprite_2.displayWidth;
		scaleY = 23.5 / sprite_2.displayHeight;
		sprite_2.setScale(scaleX, scaleY);
		this.spriteReferences.push(sprite_2);


        
        /**
         * EdgeProxy is defined in singleplayer.lib.js
         */
        window.EdgeProxy.currentScene = this;

        console.log("Hello Darkness My Old Friend...")

const mario_1 = Edge.Game.Level.Objects['mario_1.png'];

mario_1.setOpacity(0.5)
    }
    update(){
        
    }
    destroy(){
        console.log("Test_Level__, destroy called!");
    }
}

// removed import

class LevelScene_Test_Level__ extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_Test_Level__", active: false });

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
        console.log("Test_Level__, destroy called!");
    }
}

// removed import

class LevelScene_New_Level extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_New_Level", active: false });

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
        console.log("New_Level, destroy called!");
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

const scenes = [LevelScene_Title_Screen, LevelScene_Example_Level_Screen, LevelScene_Test_Level__, LevelScene_Test_Level__, LevelScene_New_Level, LevelScene_Game_Over_Screen];
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