/**
 * Lightweight representation of `GameGuidanceTracker`.
 * Use concrete GameGuidanceTracker for modifying data.
 */
export interface IGameObjective{
    objective_id: number | undefined,
    game_id: number | undefined,
    name: string,
    description: string | undefined,
    max_value: number
}

export class GameObjective implements IGameObjective{
    constructor(
        public objective_id: number | undefined,
        public game_id: number | undefined,
        public name: string,
        public description: string | undefined,
        public max_value: number
    ){

    }
}