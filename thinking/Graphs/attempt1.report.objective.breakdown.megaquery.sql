SELECT 
    M.user_id, 
    ROUND( SUM(M.progress) / COUNT(M.progress), 4) as total_progress, 
    M2.total_play_duration

/* Total Progress */
FROM (
    SELECT J.user_id, J.objective_id, MAX(J.progress) as max_progress, O.max_value, ROUND(MAX(J.progress) / O.max_value, 4) as progress
    FROM `gsession_user_objective` J
    INNER JOIN `game_objective` O ON J.objective_id = O.objective_id
    WHERE J.session_id = 35
    GROUP BY J.user_id, J.objective_id
) M

/* Total Play Duration */
INNER JOIN (
    SELECT J.user_id, SUM(J.play_duration) as total_play_duration
    FROM (
        SELECT user_id, play_nonce, TIMESTAMPDIFF(SECOND, MIN(last_updated), MAX(last_updated)) as play_duration
        FROM `gsession_user_objective`
        WHERE session_id = 35
        GROUP BY user_id, play_nonce
    ) J
    GROUP BY J.user_id
) M2 ON M.user_id = M2.user_id

/* Count Completed */
INNER JOIN (
    SELECT J.user_id, J.objective_id, MAX(J.progress) as progress, O.max_value
    FROM `gsession_user_objective` J
    INNER JOIN `game_objective` O ON J.objective_id = O.objective_id
    WHERE J.progress >= O.max_value AND session_id = 35
    GROUP BY J.user_id, J.objective_id
) M3 ON M.user_id = M3.user_id

GROUP BY M.user_id;