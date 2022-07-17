// Will be reomved by game compiler.
// Used to provide Type-completion in this script.
// require('../game_compiler/phaser/phaser');

// nothing much here :)

// removed import

class LevelScene_Title_Screen extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_Title_Screen", active: false });

        /**
         * Add all references to create sprites to this array.
         */
        this.spriteReferences = {};

        /**
         * @type {Phaser.Sprite}
         */
        this.star = null;
    }

    preload(){
        this.load.setBaseURL('http://localhost/');
        

		this.load.image('sprite_png', 'fs/res_upload/image/1657959470527.png');
		this.load.image('sprite_png_2', 'fs/res_upload/image/1657959470527.png');

        // Add your code below this line


        
    }
    create(){
        let scaleX = 0, scaleY = 0;
		// --- scene object Camera ---
		const sprite_1 = this.add.sprite(503.99999999999994, 245.5, 'Camera');
		sprite_1.name = "Camera";
		scaleX = 591.9999999999999 / sprite_1.displayWidth;
		scaleY = 431 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences['Camera'] = sprite_1;


		// --- scene object sprite_png ---
		const sprite_2 = this.add.sprite(368.4458642695158, 263.5580766424917, 'sprite_png');
		sprite_2.name = "sprite_png";
		scaleX = 100 / sprite_2.displayWidth;
		scaleY = 100 / sprite_2.displayHeight;
		sprite_2.setScale(scaleX, scaleY);
		this.spriteReferences['sprite_png'] = sprite_2;


		// --- scene object sprite_png_2 ---
		const sprite_3 = this.add.sprite(632, 263, 'sprite_png_2');
		sprite_3.name = "sprite_png_2";
		scaleX = 100 / sprite_3.displayWidth;
		scaleY = 100 / sprite_3.displayHeight;
		sprite_3.setScale(scaleX, scaleY);
		this.spriteReferences['sprite_png_2'] = sprite_3;



        // Add your code below this line

        /**
         * @type {Phaser.Sprite}
         */
        const star = this.spriteReferences['sprite_png'];
        this.star = star;
    }
    update(){

        // Add your code below this line
        this.star.angle += 1;

    }
    destroy(){
        
        // Add your code below this line

    }
}

// removed import

class LevelScene_Example_Level_Screen extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_Example_Level_Screen", active: false });

        /**
         * Add all references to create sprites to this array.
         */
        this.spriteReferences = {};
    }

    preload(){
        this.load.setBaseURL('http://localhost/');
        


        // Add your code below this line


        
    }
    create(){
        let scaleX = 0, scaleY = 0;

        // Add your code below this line

    }
    update(){

        // Add your code below this line

    }
    destroy(){
        
        // Add your code below this line

    }
}

// removed import

class LevelScene_Game_Over_Screen extends Phaser.Scene{

    constructor(){
        super({key: "LevelScene_Game_Over_Screen", active: false });

        /**
         * Add all references to create sprites to this array.
         */
        this.spriteReferences = {};
    }

    preload(){
        this.load.setBaseURL('http://localhost/');
        


        // Add your code below this line


        
    }
    create(){
        let scaleX = 0, scaleY = 0;
		// --- scene object Camera ---
		const sprite_1 = this.add.sprite(683, 384, 'Camera');
		sprite_1.name = "Camera";
		scaleX = 1366 / sprite_1.displayWidth;
		scaleY = 768 / sprite_1.displayHeight;
		sprite_1.setScale(scaleX, scaleY);
		this.spriteReferences['Camera'] = sprite_1;



        // Add your code below this line

    }
    update(){

        // Add your code below this line

    }
    destroy(){
        
        // Add your code below this line

    }
}

const scenes = [LevelScene_Title_Screen, LevelScene_Example_Level_Screen, LevelScene_Game_Over_Screen];
const gameZoom = 1.0;

/**
 * @type Phaser.Core.Config
 */
const config = {
    type: Phaser.AUTO,
    parent: 'canvas-container',
    width: 1366,
    height: 500,
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
// window.EdgeProxy.unloadGame = function(){
//     console.log("EdgeProxy manual destroy invoked");
//     edgeGame.destroy();
// }

// window.addEventListener('resize', () => {
//     // const parent
//     // edgeGame.scale.setZoom
// });