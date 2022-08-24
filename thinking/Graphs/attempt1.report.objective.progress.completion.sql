SELECT J.objective_id, ROUND(SUM(J.max_progress), 2) AS cumulative_sum, O.max_value, MIN(J.session_id), COUNT(J2.user_id)
FROM (
    SELECT objective_id, user_id, MAX(progress) as max_progress, MIN(session_id) as session_id
    FROM `gsession_user_objective` 
    GROUP BY objective_id, user_id
) J
INNER JOIN `game_objective` O ON J.objective_id = O.objective_id
INNER JOIN (
    SELECT session_id, COUNT(user_id) as user_id
    FROM `gsession_members`
    GROUP BY session_id
) J2 ON J.session_id = J2.session_id
GROUP BY J.objective_id;