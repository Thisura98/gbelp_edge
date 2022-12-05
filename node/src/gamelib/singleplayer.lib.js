require('../game_compiler/phaser/phaser');
require('./edgeinternals');

/**
 * Communicate with the EDGE system.
 */
const EdgeProxy = {
    /**
     * Increase progress points for an objective
     * @param {string} name The 'name' of the objective. Case insensitive.
     * @param {number} points Number of points to add to the objective.
     */
    increaseObjectiveProgress: function(name, points){
        if (window.InternalsFromAngular._on_updateObjective != null)
            window.InternalsFromAngular._on_updateObjective(name, points);
        else
            console.log("Edge Internal implementation for _on_updateObjective missing");
    },
    /**
     * Increase hitpoints for a guidance tracker
     * @param {string} name The 'name' of the guidance tracker. Case insensitive.
     * @param {number} points Number of points to add to the objective.
     */
    increaseGuidanceProgress: function(name, points){
        if (window.InternalsFromAngular._on_updateGuidance != null)
            window.InternalsFromAngular._on_updateGuidance(name, points);
        else
            console.log("Edge Internal implementation for _on_updateGuidance missing");
    },
    /**
     * Notify the EDGE system that the user finished the game.
     * For example, when the user is at the last level.
     * @param {string} message The message to show to the user.
     * @param {object | null | undefined} data Optional data
     */
    notifyGameCompleted: function(message, data){
        if (window.InternalsFromAngular._on_gameCompleted != null)
            window.InternalsFromAngular._on_gameCompleted(message, data);
        else
            console.log("Edge Internal implementation for _on_gameCompleted missing");
    },
    
    /**
     * Get a Phaser Sprite by using it's object name
     * @param {Phaser.Scene} scene Pass `this` as the first argument
     * @param {string} key The scene object name you want the sprite for
     * @returns {Phaser.GameObjects.Sprite} The sprite corresponding to the sceneObject name
     */
    getLevelSprite: function(scene, key){
        return scene.spriteReferences[key];
    },

    /**
     * Get a raw object with the displayNames and filePaths of resources
     * @param {Phaser.Scene} scene Pass `this` as the first argument
     * @param {string} displayName Display name of the resources in the resource tab
     * @returns {string} The filePath of the resource
     */
    getLevelRawResourcePath: function(scene, displayName){
        return scene.rawResources[displayName];
    },

    /**
     * Get the entire level as an object. Explore the 'objects' key in the return object.
     * @param {Phaser.Scene} scene Pass `this` as the first argument
     * @returns {object}
     */
    getLevelData: function(scene){
        return scene.levelData;
    },

    /**
     * Get the value for each level property by it's name
     * @param {Phaser.Scene} scene Pass `this` as the first argument
     * @param {string} propertyName The name of the property
     * @returns {object}
     */
    getLevelProperty: function(scene, propertyName){
        return scene.levelProperties[propertyName];
    },

    /**
     * Returns the underlying raw level properties object
     * @param {Phaser.Scene} scene Pass `this` as the first argument
     * @returns {{ [key: string]: object }}
     */
    getAllProperties: function(scene) {
        return scene.levelProperties;
    }
}