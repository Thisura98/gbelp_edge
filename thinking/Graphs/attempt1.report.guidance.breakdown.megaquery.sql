SELECT 
    M.user_id, 
    U.user_name,
    ROUND( SUM(M.progress) / COUNT(M.progress), 4 ) as total_progress, 
    M2.total_play_duration, 
    COALESCE(M3.tracker_hit_count, 0) as tracker_hit_count,
    ROUND (
        COALESCE(M3.tracker_hit_count, 0) / ROUND( M2.total_play_duration, 4),
        4
    ) as velocity

/* Total Progress (M) */
FROM (
    SELECT J.user_id, J.objective_id, MAX(J.progress) as max_progress, O.max_value, ROUND(MAX(J.progress) / O.max_value, 4) as progress
    FROM `gsession_user_objective` J
    INNER JOIN `game_objective` O ON J.objective_id = O.objective_id
    WHERE J.session_id = 35
    GROUP BY J.user_id, J.objective_id
) M

/* Total Play Duration (M2) */
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

/* Triggered Tracker Counts (M3) */
LEFT JOIN (
    SELECT T.user_id, COUNT(T.user_id) as tracker_hit_count
    FROM (
        SELECT T.user_id, T.tracker_id, COALESCE(MAX(T.progress), 0) as max_progress, G.max_threshold
        FROM `gsession_user_guidance_tracker` T
        INNER JOIN `game_guidance_tracker` G ON T.tracker_id = G.tracker_id
        WHERE T.progress >= max_threshold && T.session_id = 35
        GROUP BY T.user_id, T.tracker_id
    ) T
    GROUP BY T.user_id
) M3 ON M.user_id = M3.user_id

/* Users (U) */
INNER JOIN `users` U ON M.user_id = U.user_id

GROUP BY M.user_id;