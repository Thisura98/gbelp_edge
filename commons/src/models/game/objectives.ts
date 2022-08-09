/**
 * Lightweight representation of `GameGuidanceTracker`.
 * Use concrete GameGuidanceTracker for modifying data.
 */
export interface IGameObjective{
    objective_id: number | undefined,
    game_entry_id: number | undefined,
    name: string,
    description: string | undefined,
    max_value: number
}

export class GameObjective implements IGameObjective{
    constructor(
        public objective_id: number | undefined,
        public game_entry_id: number | undefined,
        public name: string,
        public description: string | undefined,
        public max_value: number
    ){

    }
}

export class ProgressfulGameObjective extends GameObjective{
    constructor(
        public objective_id: number | undefined,
        public game_entry_id: number | undefined,
        public name: string,
        public description: string | undefined,
        public max_value: number,
        public progress: number
    ){
        super(objective_id, game_entry_id, name, description, max_value);
    }

    /**
     * Initialize a progressful objective from an ordinary one.
     * Default hit is zero.
     */
    public static from(objective: GameObjective, withProgress: number = 0): ProgressfulGameObjective{
        return new ProgressfulGameObjective(
            objective.objective_id,
            objective.game_entry_id,
            objective.name,
            objective.description,
            objective.max_value,
            withProgress
        )
    }
}