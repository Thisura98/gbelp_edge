SELECT J.user_id, J.objective_id, MAX(J.progress) as progress, O.max_value
FROM `gsession_user_objective` J
INNER JOIN `game_objective` O ON J.objective_id = O.objective_id
WHERE J.progress >= O.max_value AND session_id = 35
GROUP BY J.user_id, J.objective_id


SELECT Q.user_id, COUNT(Q.progress) as completed_objective_count
FROM (
	SELECT J.user_id, MAX(J.progress) as progress, O.max_value
    FROM `gsession_user_objective` J
    INNER JOIN `game_objective` O ON J.objective_id = O.objective_id
    WHERE J.progress >= O.max_value AND session_id = 35
    GROUP BY J.user_id, J.objective_id
) Q
GROUP BY Q.useR_id;