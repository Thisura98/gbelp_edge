export class UserGroupMemberAssociation{
  constructor(
    public self_type: string,
    public associated_user_type: string,
    public associated_user_id: string
  ){}
}

export class UserGroupMember{
  constructor(
    public user_id: string,
    public user_name: string,
    public association: UserGroupMemberAssociation
  ){}
}

export class UserGroupMemberData{
  constructor(
    public teachers: UserGroupMember[],
    public students: UserGroupMember[],
    public parents: UserGroupMember[]
  ){}
}