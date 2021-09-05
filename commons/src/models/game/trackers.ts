/**
 * Lightweight representation of `GameGuidanceTracker`.
 * Use concrete GameGuidanceTracker for modifying data.
 */
export interface IGameGuidanceTracker{
    tracker_id: number | undefined,
    game_entry_id: number | undefined,
    name: string,
    message: string | undefined,
    max_threshold: number
}

export class GameGuidanceTracker implements IGameGuidanceTracker{
    constructor(
        public tracker_id: number | undefined,
        public game_entry_id: number | undefined,
        public name: string,
        public message: string | undefined,
        public max_threshold: number
    ){}
}