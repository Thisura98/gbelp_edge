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
        public _id: string,
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
        public hidden: string,
    ){
    }
}

export class LevelScene{
    constructor(
        public objects: SceneObject[]
    ){}
}

