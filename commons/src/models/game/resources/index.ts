/**
 * Games have resources (images, sounds) and are
 * stored in the project object in a common array.
 * Type helps distinguish the resource's meta data type.
 */
 export enum GameResourceType{
    SOUND = "sound",
    IMAGE = "image",
    OTHER = "other"
}

export class GameProjectResource{
    /**
     * @param _id Warning! Might be instance of ObjectId sometimes!
     */
    constructor(
        public _id: string,
        public filename: string,
        public displayName: string,
        public type: string
    ){

    }
}