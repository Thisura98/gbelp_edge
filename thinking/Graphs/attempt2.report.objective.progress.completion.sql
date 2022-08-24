SELECT 
    J2.objective_id, 
    SUM(J2.progress) as progress_sum, 
    COUNT(J2.progress) as users, 
    ROUND( SUM(J2.progress) / COUNT(J2.progress), 4 ) as objective_progress
FROM (
	SELECT 
    	J.user_id, 
        J.objective_id, 
        J.max_user_progress, 
        O.max_value, 
        ROUND((J.max_user_progress / O.max_value), 4) as progress
    FROM (
        SELECT user_id, objective_id, MAX(progress) as max_user_progress
        FROM `gsession_user_objective` 
        WHERE session_id = 35
        GROUP BY user_id, objective_id
    ) J
    INNER JOIN game_objective O ON J.objective_id = O.objective_id
) J2
GROUP BY J2.objective_id