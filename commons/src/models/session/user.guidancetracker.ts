export class GameSessionUserGuidanceTracker{
    constructor(
        public id: string,
        public session_id: string,
        public tracker_id: string,
        public user_id: string,
        public progress: string,
        public play_nonce: string,
        public last_updated: string
    ){}
}