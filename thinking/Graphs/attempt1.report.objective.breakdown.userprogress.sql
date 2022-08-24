SELECT 
    M.user_id, 
    SUM(M.progress) as total_progress, 
    COUNT(M.progress) as objective_count, 
    ROUND( SUM(M.progress) / COUNT(M.progress), 4) as progress_percentage
FROM (
    SELECT J.user_id, J.objective_id, MAX(J.progress) as max_progress, O.max_value, ROUND(MAX(J.progress) / O.max_value, 4) as progress
    FROM `gsession_user_objective` J
    INNER JOIN `game_objective` O ON J.objective_id = O.objective_id
    WHERE J.session_id = 35
    GROUP BY J.user_id, J.objective_id
) M
GROUP BY M.user_id;