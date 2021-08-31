// import { getNewObjectId } from "../../common";
import { GameProjectResource } from "../resources";

export enum SceneObjectType{
    sprite = 'sprite'
}

export class SceneObjectFrame{
    constructor(
        public x: number,
        public y: number,
        public w: number,
        public h: number
    ){

    }
}

export enum SceneObjectPhysicsBehavior{
    solid, none
}

export enum SceneObjectPhysicsCollision{
    rect, round, none
}

export enum SceneObjectSpawnBehavior{
    perPlayer, perLevel
}

export enum SceneObjectSpriteStretch{
    /**
     * Scale to width and size
     */
    scale, 
    /**
     * Scale maintaining Aspect Ratio
     */
    fit
}

export class SceneObject{
    constructor(
        public _id: string | null,
        public spriteResourceId: string,
        public type: string,
        public name: string,
        public frame: SceneObjectFrame,
        public rotation: number,
        public physicsBehavior: string,
        public physicsCollision: string,
        public opacity: number,
        public spawnBehavior: string,
        public spriteStretch: string, 
        public hidden: boolean,
    ){
    }
}

export class LevelScene{
    constructor(
        public objects: SceneObject[]
    ){}
}

export class SceneObjectHelper{

    static createFromResource(
        resource: GameProjectResource, 
        frame: SceneObjectFrame | undefined = undefined
    ): SceneObject{
        let objframe: SceneObjectFrame

        if (frame == undefined)
            objframe = new SceneObjectFrame(0, 0, 100, 100);
        else
            objframe = frame;

        return new SceneObject(
            null,
            resource._id,
            SceneObjectType.sprite,
            resource.displayName.replace(/[\.-_]/g, '_'),
            objframe,
            0,          // Rotation
            SceneObjectPhysicsBehavior.solid.toString(),
            SceneObjectPhysicsCollision.rect.toString(),
            1.0,        // opacity
            SceneObjectSpawnBehavior.perLevel.toString(),
            SceneObjectSpriteStretch.fit.toString(),
            false       // hidden?
        )
    }

}