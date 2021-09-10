require('../../phaser/phaser');

class LevelScene_EDGTOKEN_1 extends Phaser.Scene{
    constructor(){
        super({key: "LevelScene_EDGTOKEN_1", active: false });
    }

    preload(){
        Phaser
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