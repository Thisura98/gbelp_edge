require('../../phaser/phaser');

class LevelScene_EDGTOKEN_1 extends Phaser.Scene{
    constructor(){
        super({key: "LevelScene_EDGTOKEN_1", active: false });
    }

    preload(){
        this.load.setBaseURL('EDGTOKEN_LOADBASEURL');
        EDGTOKEN_PRELOAD
    }
    create(){
        EDGTOKEN_CREATE
    }
    update(){
        EDGTOKEN_UPDATE
    }
    destroy(){
        EDGTOKEN_DESTROY
    }
}