import * as usersDAO from '../src/model/dao/users';
import * as userRelationshipsDAO from '../src/model/dao/users/relationships';
import * as groupUsersDAO from '../src/model/dao/group/users';
import * as groupsDAO from '../src/model/dao/group';
import { UserRelationshipType, UserType } from '../../commons/src/models/user';
import { initializeTestDB } from './utils/utils';

const kPrivileged = 'privileged';
const kTeachers = 'teachers';
const kStudents = 'students';
const kParents = 'parents';
const kRStudent = 'relStudent';
const kRParent = 'relParent';

let groupWithThreeUsers = '';
let groupWithFiveUsers = '';
let groupWithOneParentTwoChildren = '';
let groupWithTwoParentsOneChild = '';
let groupWithTwoFamilies = '';
let groupWithEveryone = '';

function createUser(name: string, type: string): Promise<string>{
    return new Promise<string>((resolve, reject) => {
        usersDAO.createUser(name, name + '@test.lk', type, '', (status, msg, result) => {
            if (status){
                if (result == null)
                    reject('Create user returned null response');
                else
                    resolve(result.user_id);
            }
            else
                reject(msg);
        });
    })
}

function createGroup(tag: string, users: string[]): Promise<string>{
    return groupsDAO.createGroup(tag, 'Test Group', '', 'testkey', '10', users);
}

/**
 * @param parentId Parent
 * @param childId Child
 * @returns 
 */
function createParentChildAssociation(parentId: string, childId: string): Promise<boolean>{
    return userRelationshipsDAO.createRelationship(
        parentId, childId, UserRelationshipType.guardianAndChild
    );
}

async function setupData(){
    let t1 = await createUser('teacher', UserType.teacher);

    let p1 = await createUser('parent1', UserType.parent);
    let s1 = await createUser('student1', UserType.student);
    let r1 = await createParentChildAssociation(p1, s1);

    let p2 = await createUser('parent2', UserType.parent);
    let s2 = await createUser('student2', UserType.student);
    let r2 = await createParentChildAssociation(p2, s2);

    let p3 = await createUser('parent3', UserType.parent);
    let s3 = await createUser('student3', UserType.student);
    let s4 = await createUser('student4', UserType.student);
    let r3 = await createParentChildAssociation(p3, s3);
    let r4 = await createParentChildAssociation(p3, s4);

    let p4 = await createUser('parent4', UserType.parent);
    let p5 = await createUser('parent5', UserType.parent);
    let s5 = await createUser('student5', UserType.student);
    let r5 = await createParentChildAssociation(p4, s5);
    let r6 = await createParentChildAssociation(p5, s5);

    expect(r1).toBeTrue();
    expect(r2).toBeTrue();
    expect(r3).toBeTrue();
    expect(r4).toBeTrue();
    expect(r5).toBeTrue();
    expect(r6).toBeTrue();
    
    groupWithThreeUsers = await createGroup('Three Users', [t1, p1, s1]);
    groupWithFiveUsers = await createGroup('Five Users', [t1, p1, s1, p2, s2]);
    groupWithOneParentTwoChildren = await createGroup('Single Mother', [t1, p3, s3, s4]);
    groupWithTwoParentsOneChild = await createGroup('Single Child', [t1, p4, p5, s5]);
    groupWithEveryone = await createGroup('Everyone', [t1, p1, p2, p3, p4, p5, s1, s2, s3, s4, s5]);
}

describe('Group Members DAO tests', () => {

    beforeAll(async () => {
        try{
            await initializeTestDB();
            await setupData();
        }
        catch(error){
            console.log("Database Error while setting up data...");
            fail(error);
        }
    });

    // MARK Test: Three Users

    it('Three Users - Composition', async () => {
        const result = await groupUsersDAO.getGroupUsers(groupWithThreeUsers);

        expect(result.privileged.length).withContext(kPrivileged).toBe(0);
        expect(result.teachers.length).withContext(kTeachers).toBe(1);
        expect(result.students.length).withContext(kStudents).toBe(1);
        expect(result.parents.length).withContext(kParents).toBe(1);
    });

    it('Three Users - Association Names', async () => {
        const result = await groupUsersDAO.getGroupUsers(groupWithThreeUsers);
        const relOfStudent = result.students[0].associations[0];
        const relOfParent = result.parents[0].associations[0];

        expect(relOfStudent.relationshipName).withContext(kRStudent).toBe('Child of');
        expect(relOfParent.relationshipName).withContext(kRParent).toBe('Parent of');
    });

    it('Three Users - Association Composition', async () => {
        const result = await groupUsersDAO.getGroupUsers(groupWithThreeUsers);

        const relOfStudent = result.students[0].associations[0];
        const studentRelUsers = relOfStudent.users!;

        const relOfParent = result.parents[0].associations[0];
        const parentRelUsers = relOfParent.users!;

        expect(studentRelUsers.length).withContext('sRel1').toEqual(1);
        expect(studentRelUsers[0].user_id).withContext('sRel2').toBe(result.parents[0].user_id);
        expect(studentRelUsers[0].user_name).withContext('sRel3').toBe(result.parents[0].user_name);

        expect(parentRelUsers.length).withContext('pRel1').toEqual(1);
        expect(parentRelUsers[0].user_id).withContext('pRel2').toBe(result.students[0].user_id);
        expect(parentRelUsers[0].user_name).withContext('pRel3').toBe(result.students[0].user_name);
    });

    // MARK Test: Single Mother

    it('Single Mother - Composition', async () => {
        const result = await groupUsersDAO.getGroupUsers(groupWithOneParentTwoChildren);

        expect(result.privileged.length).withContext(kPrivileged).toBe(0);
        expect(result.teachers.length).withContext(kTeachers).toBe(1);
        expect(result.students.length).withContext(kStudents).toBe(2);
        expect(result.parents.length).withContext(kParents).toBe(1);
    });

    it('Single Mother - Association Count', async () => {
        const result = await groupUsersDAO.getGroupUsers(groupWithOneParentTwoChildren);

        const student1 = result.students[0];
        const student2 = result.students[1];
        const parent = result.parents[0];

        expect(student1.associations.length).withContext('s1Rels').toEqual(1);
        expect(student2.associations.length).withContext('s2Rels').toEqual(1);
        expect(parent.associations.length).withContext('pRels').toEqual(1);
        expect(parent.associations[0].users!.length).withContext('pRelUsers').toEqual(2);
    });

    it('Single Mother - Association Composition', async () => {
        const result = await groupUsersDAO.getGroupUsers(groupWithOneParentTwoChildren);

        const student1 = result.students[0];
        const student2 = result.students[1];
        const parent = result.parents[0];

        const student1Rel = result.students[0].associations[0].users!;
        const student2Rel = result.students[1].associations[0].users!;
        const parentRel1 = result.parents[0].associations[0].users!;

        expect(student1Rel[0].user_id).withContext('s1ParentId').toBe(parent.user_id);
        expect(student2Rel[0].user_id).withContext('s2ParentId').toBe(parent.user_id);

        expect(student1Rel[0].user_name).withContext('s1ParentName').toBe(parent.user_name);
        expect(student2Rel[0].user_name).withContext('s2ParentName').toBe(parent.user_name);

        expect(parentRel1[0].user_id).withContext('pRel1Id').toBe(student1.user_id);
        expect(parentRel1[1].user_id).withContext('pRel2Id').toBe(student2.user_id);
        
        expect(parentRel1[0].user_name).withContext('pRel1Name').toBe(student1.user_name);
        expect(parentRel1[1].user_name).withContext('pRel2Name').toBe(student2.user_name);
    });
});