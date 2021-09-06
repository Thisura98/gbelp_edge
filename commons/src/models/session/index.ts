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