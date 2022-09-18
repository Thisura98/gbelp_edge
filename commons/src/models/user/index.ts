/**
 * UserType as their integer counterparts.
 * 
 * See `UserTypeNames` for strings.
 */
export enum UserType{
    admin = '1',
    teacher = '2',
    student = '3',
    parent = '4',
    creator = '5'
}

export const UserTypeNames = {
    admin: 'admin',
    teacher: 'teacher',
    student: 'student',
    parent: 'parent',
    creator: 'creator'
}

export const UserRelationshipType = {
    guardianAndChild: '1'
}

export class UserTypeHelper{
    
    public static getTypeString(type: UserType): string{
        switch(type){
            case UserType.admin: return UserTypeNames.admin;
            case UserType.teacher: return UserTypeNames.teacher;
            case UserType.student: return UserTypeNames.student;
            case UserType.parent: return UserTypeNames.parent;
            case UserType.creator: return UserTypeNames.creator;
            default: return 'N/A';
        }
    }
}