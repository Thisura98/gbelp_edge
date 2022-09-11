SELECT M.parent, GROUP_CONCAT(U2.user_name) as dependents, GROUP_CONCAT(U2.user_id) as dependent_ids
FROM (
    SELECT u_one_id as parent, u_two_id as dependent FROM user_relationship WHERE u_one_id = 10 AND type = 1
    UNION ALL 
    SELECT u_two_id as parent, u_one_id as dependent FROM user_relationship WHERE u_two_id = 10 AND type = 1
) M
INNER JOIN `users` U2 ON U2.user_id = M.dependent
GROUP BY M.parent;