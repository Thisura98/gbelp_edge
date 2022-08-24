SELECT J.user_id, SUM(J.play_duration) as total_play_duration
FROM (
	SELECT user_id, play_nonce, TIMESTAMPDIFF(SECOND, MIN(last_updated), MAX(last_updated)) as play_duration
    FROM `gsession_user_objective`
    WHERE session_id = 35
    GROUP BY user_id, play_nonce
) J
GROUP BY J.user_id;