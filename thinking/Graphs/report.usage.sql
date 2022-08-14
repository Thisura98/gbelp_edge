SELECT MIN(user_id), play_nonce, MIN(timestamp), MAX(timestamp)
FROM `gsession_user_usage`
GROUP BY `play_nonce`;

SELECT user_id, COUNT(is_start)
FROM `gsession_user_usage`
WHERE is_start = 1
GROUP BY `user_id`;

SELECT user_id, 
MIN(`timestamp`) as start_time, 
MAX(`timestamp`) as end_time, 
TIMESTAMPDIFF(SECOND, MIN(`timestamp`), MAX(`timestamp`)) as duration_seconds
FROM `gsession_user_usage`
GROUP BY `user_id`, `play_nonce`
ORDER BY duration_seconds DESC

SELECT user_id,
MAX(TIMESTAMPDIFF(SECOND, MIN(`timestamp`), MAX(`timestamp`)))
FROM `gsession_user_usage`
GROUP BY `user_id`, `play_nonce`

SELECT user_id, MAX(K.duration) as max_usage, AVG(K.duration) as avg_usage
FROM (
    SELECT user_id,
    TIMESTAMPDIFF(SECOND, MIN(`timestamp`), MAX(`timestamp`)) as duration
    FROM `gsession_user_usage`
    GROUP BY `user_id`, `play_nonce`
    ORDER BY duration DESC
) AS K
GROUP BY user_id;

/* Average and Max usage of each user */

SELECT K.user_id, U.user_name, MAX(K.duration) as max_usage, AVG(K.duration) as avg_usage
FROM (
    SELECT user_id, MIN(`timestamp`) as start_time, MAX(`timestamp`) as end_time,
    TIMESTAMPDIFF(SECOND, MIN(`timestamp`), MAX(`timestamp`)) as duration
    FROM `gsession_user_usage`
    WHERE 
        (`is_start` = 1 AND `timestamp` > FROM_UNIXTIME(1660003200)) 
        OR 
        (`is_start` = 0 AND `timestamp` < FROM_UNIXTIME(1660089000))
    GROUP BY `user_id`, `play_nonce`
    ORDER BY duration DESC
) AS K
INNER JOIN `users` U ON K.user_id = U.user_id
GROUP BY K.user_id;

test: start > 1660003200000 AND end < 1660089600000
(between 2022-08-09 AND 2022-08-10)

/* Comparing timestamps (needs seconds) */

SELECT * 
FROM `gsession_user_usage`
WHERE `timestamp` > FROM_UNIXTIME(1660003200) AND `timestamp` < FROM_UNIXTIME(1660089600);