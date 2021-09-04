/**
 * Base64 encoded scripts for the level
 */
export class LevelScript{
    constructor(
        public setup: string,
        public perframe: string,
        public destroy: string
    ){}
}

export class LevelLogic{
    constructor(
        public script: LevelScript
    ){}
}