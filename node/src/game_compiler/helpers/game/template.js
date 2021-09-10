EDGTOKEN_SCENECODE

const scenes = [EDGTOKEN_SCENES];
const gameZoom = 2;

/**
 * @type Phaser.Core.Config
 */
const config = {
    type: Phaser.AUTO,
    parent: 'canvas-container',
    width: 400*1.5,
    height: 300*1.5,
    // scene: scenes,
    title: 'Shock and Awesome',
    backgroundColor: "#00ff00",
    fps: {
        target: 25,
        forceSetTimeOut: true
    },
    scaleMode: Phaser.Scale.FIT,
    // zoom: gameZoom
};


/**
 * @type Phaser.Scene
 */
const startingScene = EDGTOKEN_STARTING_SCENE;
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