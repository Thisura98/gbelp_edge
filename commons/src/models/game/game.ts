/**
 * Denotes the game type
 */
export enum GameType{
    Singleplayer = 1,
    Multiplayer = 2
}

/**
 * Games have resources (images, sounds) and are
 * stored in the project object in a common array.
 * Type helps distinguish the resource's meta data type.
 */
export enum GameResourceType{
    SOUND = "sound",
    IMAGE = "image"
}