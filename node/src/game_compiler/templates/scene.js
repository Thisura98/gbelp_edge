require('../phaser/phaser');

class LevelScene_EDGTOKEN_1 extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_EDGTOKEN_1", active: false });

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
        // EDGTOKEN_LEVEL
        // EDGTOKEN_PROPERTIES

        // Add your code below this line


        
    }
    create(){
        // EDGTOKEN_CREATE

        // Add your code below this line

    }
    update(){

        // Add your code below this line

    }
    destroy(){
        
        // Add your code below this line

    }
}