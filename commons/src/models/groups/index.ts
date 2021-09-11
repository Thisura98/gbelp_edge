/**
 * A row in the usergroup composition query.
 * e.g.
 * ```
 * | type_name | count |
 * | --------- | ----- |
 * | teacher   | 2     |
 * | student   | 3     |
 * ```
 */
export interface UserGroupComposition{
    type_id: string
    type_name: string
    count: number
}

/**
 * The "group of users" entity
 */
export class UserGroup{
    constructor(
        public group_id: number | undefined,
        public name: string,
        public description: string | undefined,
        public banned_user_ids: string | undefined,
        public invite_link: string | undefined,
        public user_limit: number
    ){}
}

/**
 * How users belong to groups
 */
export class UserGroupMembership{

}