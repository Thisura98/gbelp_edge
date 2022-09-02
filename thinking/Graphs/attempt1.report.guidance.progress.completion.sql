SELECT G.name, P.tracker_hit_count
FROM `game_guidance_tracker` G 
LEFT JOIN (
	SELECT M.tracker_id, COUNT(M.tracker_id) as tracker_hit_count
    FROM (
        SELECT U.play_nonce, U.tracker_id, MAX(U.progress) as max_progress, J.max_threshold
        FROM `gsession_user_guidance_tracker` U
        INNER JOIN `game_guidance_tracker` J ON U.tracker_id = J.tracker_id
        WHERE U.progress >= 0.01 && U.session_id = 35
        GROUP BY U.play_nonce, U.tracker_id
    ) M
    GROUP BY M.tracker_id
) P ON G.tracker_id = P.tracker_id
WHERE G.game_entry_id IN (SELECT game_entry_id FROM gsessions WHERE session_id = 35);