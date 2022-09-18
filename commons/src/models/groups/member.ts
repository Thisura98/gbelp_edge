import { UserType } from "../user";

export class UserGroupMemberAssociation{
  constructor(
    public relationshipName: string,
    public users: UserGroupMemberRaw[] | undefined
  ){}
}

export class UserGroupMemberRaw{
  constructor(
    public user_id: string,
    public user_email: string,
    public user_name: string
  ){}
}

export class UserGroupMember extends UserGroupMemberRaw{
  constructor(
    public user_id: string,
    public user_email: string,
    public user_name: string,
    public associations: UserGroupMemberAssociation[]
  ){
    super(user_id, user_email, user_name);
  }
}

export class UserGroupMemberHelper{
  static fromRaw(
    raw: UserGroupMemberRaw, 
    associations: UserGroupMemberAssociation[]
  ): UserGroupMember{
    return new UserGroupMember(
      raw.user_id,
      raw.user_name,
      raw.user_email,
      associations
    );
  }
}

export class UserGroupMemberData{
  constructor(
    public privileged: UserGroupMember[],
    public teachers: UserGroupMember[],
    public students: UserGroupMember[],
    public parents: UserGroupMember[]
  ){}
}