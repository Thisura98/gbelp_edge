require('../phaser/phaser');

/**
 * Check SPLAY component for this canvas.
 */
const canvasName = 'canvas-container';

EDGTOKEN_SCENECODE

const scenes = [EDGTOKEN_SCENES];
const gameZoom = 1.0;

/**
 * @type {Phaser.Core.Config}
 */
const config = {
    type: Phaser.AUTO,
    parent: canvasName,
    width: 1366,
    height: 500,
    title: 'Shock and Awesome',
    backgroundColor: "#0000dd",
    fps: {
        target: 30,
        forceSetTimeOut: true
    },
    scaleMode: Phaser.Scale.NONE,
    zoom: gameZoom
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
// window.EdgeProxy.unloadGame = function(){
//     console.log("EdgeProxy manual destroy invoked");
//     edgeGame.destroy();
// }

// window.addEventListener('resize', () => {
//     // const parent
//     // edgeGame.scale.setZoom
// });