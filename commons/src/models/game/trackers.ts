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

/**
 * Used as ViewModel for Splay component. Parent class is `GameGuidanceTracker`
 */
export class ProgressfulGameGuidanceTracker extends GameGuidanceTracker{
    constructor(
        public tracker_id: number | undefined,
        public game_entry_id: number | undefined,
        public name: string,
        public message: string | undefined,
        public max_threshold: number,
        public hits: number
    ){
        super(tracker_id, game_entry_id, name, message, max_threshold)
    }

    /**
     * Initialize a progressful guidance tracker from an ordinary one.
     * Default hit is zero.
     */
    public static from(tracker: GameGuidanceTracker, withProgress: number = 0): ProgressfulGameGuidanceTracker{
        return new ProgressfulGameGuidanceTracker(
            tracker.tracker_id,
            tracker.game_entry_id,
            tracker.name,
            tracker.message,
            tracker.max_threshold,
            withProgress
        );
    }
}