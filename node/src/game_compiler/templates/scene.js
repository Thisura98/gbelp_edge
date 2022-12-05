require('../phaser/phaser');

class LevelScene_EDGTOKEN_1 extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_EDGTOKEN_1", active: false });

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
        // EDGTOKEN_PRELOAD

        // Add your code below this line
        
    }
    create(){
        // EDGTOKEN_CREATE

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