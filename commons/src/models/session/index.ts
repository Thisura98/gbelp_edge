export enum GameSessionType{
  single = 1,
  multi = 2,
  test = 3
}

export enum GameSessionState{
  scheduled = 0,
  multiplayerStaging = 1,
  multiplayerReady = 2,
  live = 3,
  complete = 4,
  canceled = 5
}

/**
 * Game Session Entity
 */
export class GameSession{
  constructor(
    public session_id: number | undefined,
    public type_id: number,
    public state: number,
    public start_time: string,
    public end_time: string | undefined
  ){}
}

/**
 * Which users are allowed in which sessions
 */
export class GameSessionMembers{
  constructor(
    public session_id: number,
    public user_id: number
  ){}
}