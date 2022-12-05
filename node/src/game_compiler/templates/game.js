require('../phaser/phaser');
require('./edgeinternals');

/**
 * Check SPLAY component for this canvas.
 */
const canvasName = 'canvas-container';

EDGTOKEN_SCENECODE

const scenes = [EDGTOKEN_SCENES];
const gameZoom = 1.0;

/**
 * Remove all elements inside the canvas container
 */
document.getElementById(canvasName).replaceChildren([]);

/**
 * @type {Phaser.Core.Config}
 */
const config = {
    type: Phaser.WEBGL,
    parent: canvasName,
    width: 1366,
    height: 500,
    title: 'Shock and Awesome',
    // backgroundColor: "#FFFFFF",
    backgroundColor: "#000000",
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    scaleMode: Phaser.Scale.NONE,
    zoom: gameZoom,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
};


/**
 * @type Phaser.Game
 */
const edgeGame = new Phaser.Game(config);
scenes.forEach((scn, index) => {
    edgeGame.scene.add('scene', scn, index == 0, null);
});

// edgeGame.scene.add('scene', startingScene, true, null);
// edgeGame.scene.scenes = scenes;

window.InternalsFromGame = {
    _on_changeGameState: (paused) => {

        edgeGame.input.enabled = !paused;
        edgeGame.input.keyboard.enabled = !paused;
        edgeGame.input.mouse.enabled = !paused;

        if (paused){
            const scenes = edgeGame.scene.getScenes(true);
            if (scenes.length > 0){
                scenes.forEach(scn => {
                    if (!scn.scene.isPaused()){
                        scn.scene.pause();
                    }
                })
            }
        }
        else{
            const pausedScenes = edgeGame.scene.getScenes(null)
                .filter(scn => scn.scene.isPaused());
            if (pausedScenes.length > 0){
                pausedScenes.forEach(scn => {
                    scn.scene.resume();
                    scn.input.enabled = true;
                });
                edgeGame.input.enabled = true;
            }
        }
    }
}

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