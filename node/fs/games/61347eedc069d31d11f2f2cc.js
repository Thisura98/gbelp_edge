/*
 * Single player game library. 
 * This file is used by the frontend to,
 *      i. Provide auto compeltion in Logic Editor
 *      ii. Provide game scripting functionality
 */


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
        EdgeProxy.sprites[this.name].moveBy(dx, dy);
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
}

// removed import

class LevelScene_Title_Screen extends Phaser.Scene{
    constructor(){
        super({key: "LevelScene_Title_Screen", active: false });
    }

    preload(){
        Phaser
        console.log("Title_Screen, preload called!");
    }
    create(){
        console.log("Title_Screen, create called!");
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
    }

    preload(){
        Phaser
        console.log("Example_Level_Screen, preload called!");
    }
    create(){
        console.log("Example_Level_Screen, create called!");
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
    }

    preload(){
        Phaser
        console.log("Game_Over_Screen, preload called!");
    }
    create(){
        console.log("Game_Over_Screen, create called!");
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
    title: 'Shock and Awesome'
};

const edgeGame = new Phaser.Game(config);

/**
 * @type Phaser.Scene
 */
const startingScene = LevelScene_Title_Screen;

edgeGame.scene.add('scene', startingScene, true, null);

/**
 * Proxying methods
 */

window.EdgeProxy = {
    unloadGame: function(){
        console.log("EdgeProxy manual destroy invoked");
        edgeGame.destroy();
    }
}