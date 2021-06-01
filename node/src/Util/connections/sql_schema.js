// Tables
const tables = {
    metaConfig: 'meta_config',
    users: 'users',
    userAuth: 'user_auth',
    userType: 'user_type',
    userCapability: 'user_capability',
    userTypeCapability: 'user_type_capability',
    userRelationship: 'user_relationship',
    userRelationshipType: 'user_relationship_type',
    /// Higher ranking user of a userRelationship gains these capabilities
    userRelationshipCapability: 'user_relationship_capability'
};

// Columns
const columns = {
    metaConfig: {
        key: 'meta_key',
        value: 'meta_value'
    },
    userAuth: {
        authId: 'auth_id',
        userId: 'user_id',
        authKey: 'auth_key',
        expiryDate: 'expiry_date'
    },
    users: {
        userId: 'user_id',
        userName: 'user_name',
        userEmail: 'user_email',
        userType: 'user_type_id',
        userPasswordHash: 'password_hash'
    },
    userType: {
        userTypeId: 'user_type_id',
        name: 'name'
    },
    userCapability: {
        capId: 'cap_id',
        capName: 'cap_name',
        capDesc: 'cap_desc'
    },
    userTypeCapability: {
        userTypeId: 'user_type_id',
        capId: 'cap_id'
    },
    userRelationship: {
        id: 'rid',
        userOneId: 'u_one_id',
        userOneRank: 'u_one_rnk',
        userTwoId: 'u_two_id',
        userTwoRank: 'u_two_rnk',
        relationshipType: 'type'
    },
    userRelationshipType: {
        typeId: 'type_id',
        typeName: 'name'
    },
    userRelationshipCapability: {
        relationshipTypeId: 'relationship_type_id',
        gainedCapabilityId: 'gained_cap_id'
    }
}

module.exports.tables = tables;
module.exports.columns = columns;