SELECT M.child, GROUP_CONCAT(U2.user_name) as guardians, GROUP_CONCAT(U2.user_id) as guardian_ids
FROM (
    SELECT u_one_id as child, u_two_id as guardian FROM user_relationship WHERE u_one_id = 9 AND type = 1
    UNION ALL 
    SELECT u_two_id as child, u_one_id as guardian FROM user_relationship WHERE u_two_id = 9 AND type = 1
) M
INNER JOIN `users` U2 ON U2.user_id = M.guardian
GROUP BY M.child;