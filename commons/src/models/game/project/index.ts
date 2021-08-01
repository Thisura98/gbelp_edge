import { GameLevel } from "../levels";
import { GameProjectResource } from "../resources";

export class GameProject{
    constructor(
        public _id: string,
        public resources: GameProjectResource[],
        public levels: GameLevel[]
    ){

    }
}