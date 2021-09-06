/**
 * Single player game library
 */

class EdgeSprite{
    /**
     * Initialize a sprite
     * @param {string} name Sprite name
     */
    constructor(name){
        this.name = name;
    }

    moveBy(dx, dy){
        EdgeProxy.sprites[this.name].moveBy(dx, dy);
    }
}

class Edge{

    /**
     * @param {string} name string
     * @return {EdgeSprite}
     */
    static sprite(name){

    }
}

const marioSprite = Edge.sprite('mario-1.png');

marioSprite.moveBy(1, 1);