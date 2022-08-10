// Tables
export const tables = {
    metaConfig: 'meta_config',
    users: 'users',
    userAuth: 'user_auth',
    userType: 'user_type',
    userCapability: 'user_capability',
    userGroup: 'user_group',
    userGroupMembership: 'user_group_membership',
    userTypeCapability: 'user_type_capability',
    userRelationship: 'user_relationship',
    userRelationshipType: 'user_relationship_type',
    /// Higher ranking user of a userRelationship gains these capabilities
    userRelationshipCapability: 'user_relationship_capability',
    gameSessions: 'gsessions',
    gameSessionMembers: 'gsession_members',
    gameSessionUserObjective: 'gsession_user_objective',
    gameSessionGuidanceTracker: 'gsession_user_guidance_tracker',
    gameSessionUsage: 'gsession_user_usage',
    gameObjective: 'game_objective',
    gameGuidanceTracker: 'game_guidance_tracker',
    gameEntry: 'game_entry'
};

// Columns
export const columns = {
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
    userGroup: {
        groupId: 'group_id',
        name: 'name',
        description: 'description',
        bannedUserIds: 'banned_user_ids',
        inviteLink: 'invite_link',
        userLimit: 'user_limit'
    },
    userGroupMembership: {
        groupId: 'group_id',
        userId: 'user_id',
        lastUpdated: 'last_updated'
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
    },
    gameSessions: {
        sessionId: 'session_id',
        typeId: 'type_id',
        state: 'state',
        gameEntryId: 'game_entry_id',
        groupId: 'group_id',
        startTime: 'start_time',
        endTime: 'end_time'
    },
    gameSessionMembers: {
        sessionId: 'session_id',
        userId: 'user_id'
    },
    gameSessionUserObjective: {
        id: 'id',
        sessionId: 'session_id',
        objectiveId: 'objective_id',
        userId: 'user_id',
        progress: 'progress',
        playNonce: 'play_nonce',
        lastUpdated: 'last_updated'
    },
    gameSessionGuidanceTracker: {
        id: 'id',
        sessionId: 'gsession_id',
        trackerId: 'tracker_id',
        userId: 'user_id',
        progress: 'progress',
        playNonce: 'play_nonce',
        lastUpdated: 'last_updated'
    },
    gameSessionUsage: {
        id: 'id',
        sessionId: 'session_id',
        userId: 'user_id',
        isStart: 'is_start',
        playNonce: 'play_nonce',
        timestamp: 'timestamp'
    },
    gameObjective: {
        objectiveId: 'objective_id',
        gameEntryId: 'game_entry_id',
        name: 'name',
        description: 'description',
        maxValue: 'max_value'
    },
    gameGuidanceTracker: {
        trackerId: 'tracker_id',
        gameEntryId: 'game_entry_id',
        name: 'name',
        message: 'message',
        maxThreshold: 'max_threshold'
    },
    gameEntry: {
        id: 'id',
        authorId: 'author_id',
        name: 'name',
        type: 'type',
        isTemplate: 'is_template',
        isPublished: 'is_published',
        parentEntryId: 'parent_entry_id',
        levelSwitch: 'level_switch',
        multiUserLimit: 'multi_user_limit',
        progressBoundType: 'progress_bound_type',
        projectId: 'project_id',
        reportOptObjectives: 'rep_opt_objectives',
        reportOptGuidanceTrg: 'rep_opt_guidance_trg',
        reportOptStudentUsage: 'rep_opt_student_usg',
        reportOptLevelScore: 'rep_opt_level_score',
        reportOptLevelTime: 'rep_opt_level_time',
    }
}