EDGTOKEN_SCENECODE

const scenes = [EDGTOKEN_SCENES];

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
const startingScene = EDGTOKEN_STARTING_SCENE;

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