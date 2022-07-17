// import { getNewObjectId } from "../../common";
import { GameProjectResource } from "../resources";

export enum SceneObjectType{
    camera = 'camera',
    sprite = 'sprite',
    sound = 'sound'
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

    static createBlankCamera(objectId: string, frame: SceneObjectFrame | undefined = undefined): SceneObject{
        let cameraFrame: SceneObjectFrame;
        const rotation = 0;
        const opacity = 0;
        const isHidden = false;

        if (frame == undefined)
            cameraFrame = new SceneObjectFrame(0, 0, 1366, 768);
        else
            cameraFrame = frame;

        return new SceneObject(
            objectId, 
            "", 
            SceneObjectType.camera,
            "Camera", 
            cameraFrame,
            rotation,
            SceneObjectPhysicsBehavior.none.toString(),
            SceneObjectPhysicsCollision.none.toString(),
            opacity,
            SceneObjectSpawnBehavior.perLevel.toString(),
            SceneObjectSpriteStretch.fit.toString(),
            isHidden
        );
    }

    static createFromResource(
        resource: GameProjectResource, 
        frame: SceneObjectFrame | undefined = undefined
    ): SceneObject{
        let objframe: SceneObjectFrame
        const objectName = resource.displayName.replace(/[\.-_]/g, '_');
        const rotation = 0;
        const opacity = 0;
        const isHidden = false;

        if (frame == undefined)
            objframe = new SceneObjectFrame(0, 0, 100, 100);
        else
            objframe = frame;

        return new SceneObject(
            null,
            resource._id,
            SceneObjectType.sprite,
            objectName,
            objframe,
            rotation,
            SceneObjectPhysicsBehavior.solid.toString(),
            SceneObjectPhysicsCollision.rect.toString(),
            opacity,
            SceneObjectSpawnBehavior.perLevel.toString(),
            SceneObjectSpriteStretch.fit.toString(),
            isHidden
        )
    }

}