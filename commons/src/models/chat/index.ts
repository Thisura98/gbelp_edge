export enum ChatGroupType{
  chatAtSessionLevel = 1,
  chatAtGroupLevel = 2
}

/**
 * Holds information about a single chat message
 * in a `ChatGroup`.
 */
export class ChatMessage{
  constructor(
    public timestamp: number,
    public content: string,
    public sender: string,
    public user_id: string,
    public profile: string | undefined
  ){}
}

export interface IChatGroup{
  _id: string | undefined;
  type: number;
  key: string;
  members: string[];
  special_admins: string[];
  messages: ChatMessage[];
}

/**
 * Holds information about a chat group
 * for the EDGE system
 */
export class ChatGroup implements IChatGroup{
  /**
   * @param _id MongoDB Document ID
   * @param type 1 = Session Chat, 2 = Group Chat
   * @param key if Type is session, session id. if Group, group_id
   * @param members user id array of all the members
   * @param special_admins user ids of special admins (other than teachers)
   * @param mesages list of messages
   */
  constructor(
    public _id: string | undefined,
    public type: number,
    public key: string,
    public members: string[],
    public special_admins: string[],
    public messages: ChatMessage[]
  ){}
}