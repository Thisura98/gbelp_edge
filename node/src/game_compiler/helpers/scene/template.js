require('../../phaser/phaser');

class LevelScene_EDGTOKEN_1 extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_EDGTOKEN_1", active: false });

        /**
         * Add all references to create sprites to this array.
         */
        this.spriteReferences = [];
    }

    preload(){
        this.load.setBaseURL('EDGTOKEN_LOADBASEURL');
        EDGTOKEN_PRELOAD
    }
    create(){
        EDGTOKEN_CREATE
        
        /**
         * EdgeProxy is defined in singleplayer.lib.js
         */
        window.EdgeProxy.currentScene = this;

        EDGTOKEN_GAMESCRIPT_LEVEL_SETUP
    }
    update(){
        EDGTOKEN_GAMESCRIPT_EACH_FRAME
    }
    destroy(){
        EDGTOKEN_DESTROY
    }
}