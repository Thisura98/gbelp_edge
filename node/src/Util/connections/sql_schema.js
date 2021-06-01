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
    userRelationshipCapability: 'user_relationship_capability'
};

// Columns
const columns = {
    metaConfig: {
        key: 'meta_key',
        value: 'meta_value'
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
    
}

module.exports.tables = tables;
module.exports.columns = columns;