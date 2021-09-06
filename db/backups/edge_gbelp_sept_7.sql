-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: mysqlhost
-- Generation Time: Sep 06, 2021 at 07:22 PM
-- Server version: 8.0.25
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edge_gbelp`
--

-- --------------------------------------------------------

--
-- Table structure for table `game_entry`
--

CREATE TABLE `game_entry` (
  `id` int NOT NULL,
  `author_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'CSV of User IDs',
  `name` varchar(1000) NOT NULL,
  `type` tinyint(1) NOT NULL COMMENT '1=single, 2=multi',
  `level_switch` tinyint(1) NOT NULL COMMENT '1=time, 2=score, 3=manual',
  `multi_user_limit` int UNSIGNED DEFAULT NULL COMMENT 'No of users allowed in multi-game at once',
  `progress_bound_type` tinyint(1) NOT NULL COMMENT '1=limited, 0=unlimited',
  `project_id` varchar(30) DEFAULT NULL COMMENT 'MongoDB Document ID',
  `rep_opt_objectives` tinyint(1) NOT NULL COMMENT 'Enable Objective Reports?',
  `rep_opt_guidance_trg` tinyint(1) NOT NULL COMMENT 'Enable Guidance Trigger Reports?',
  `rep_opt_student_usg` tinyint(1) NOT NULL COMMENT 'Enable Student Usage Reports?',
  `rep_opt_level_score` tinyint(1) NOT NULL COMMENT 'Enable Level Score Reports?',
  `rep_opt_level_time` tinyint(1) NOT NULL COMMENT 'Enable Level Time Reports?'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `game_entry`
--

INSERT INTO `game_entry` (`id`, `author_id`, `name`, `type`, `level_switch`, `multi_user_limit`, `progress_bound_type`, `project_id`, `rep_opt_objectives`, `rep_opt_guidance_trg`, `rep_opt_student_usg`, `rep_opt_level_score`, `rep_opt_level_time`) VALUES
(21, '1', 'Test Game 1', 1, 1, 0, 1, '612ea9c81204bbcac4158b97', 1, 1, 1, 0, 1),
(22, '1', 'Test Game 2', 1, 1, 0, 1, '61347eedc069d31d11f2f2cc', 0, 0, 1, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `game_guidance_tracker`
--

CREATE TABLE `game_guidance_tracker` (
  `tracker_id` int NOT NULL,
  `game_entry_id` int DEFAULT NULL,
  `name` varchar(200) NOT NULL,
  `message` varchar(300) NOT NULL,
  `max_threshold` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `game_guidance_tracker`
--

INSERT INTO `game_guidance_tracker` (`tracker_id`, `game_entry_id`, `name`, `message`, `max_threshold`) VALUES
(6, 21, 'Kokuhana Tracker 1', 'This is an example tracker with 5 points', 5),
(7, 22, 'Tracker 1', 'Hello World', 12);

-- --------------------------------------------------------

--
-- Table structure for table `game_objective`
--

CREATE TABLE `game_objective` (
  `objective_id` int NOT NULL,
  `game_entry_id` int DEFAULT NULL,
  `name` varchar(200) NOT NULL,
  `description` varchar(300) DEFAULT NULL COMMENT 'Description of the Objective',
  `max_value` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `game_objective`
--

INSERT INTO `game_objective` (`objective_id`, `game_entry_id`, `name`, `description`, `max_value`) VALUES
(6, 22, 'Test Objective', 'This is a test objective that requires 5 points for complation', 5),
(7, 21, 'Kokuhana Objective 1', 'This is an example objective with 5 points', 5),
(8, 21, 'Kokuhana Objective 2', 'This is an example objective with 10 points', 10),
(9, 22, 'Test Objective 2', 'This is a test objective with 8 points', 8);

-- --------------------------------------------------------

--
-- Table structure for table `gsessions`
--

CREATE TABLE `gsessions` (
  `session_id` int NOT NULL,
  `type_id` int NOT NULL COMMENT '1=single, 2=multi, 3=test',
  `state` int UNSIGNED NOT NULL DEFAULT '0' COMMENT '0=scheduled, 1=m_staging, 2=m_ready, 3=live, 4=complete, 5=canceled',
  `start_time` timestamp NOT NULL,
  `end_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `gsessions`
--

INSERT INTO `gsessions` (`session_id`, `type_id`, `state`, `start_time`, `end_time`) VALUES
(1, 1, 0, '2021-06-01 04:35:13', '2021-06-30 04:35:13');

-- --------------------------------------------------------

--
-- Table structure for table `gsession_members`
--

CREATE TABLE `gsession_members` (
  `session_id` int NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `gsession_members`
--

INSERT INTO `gsession_members` (`session_id`, `user_id`) VALUES
(1, 8);

-- --------------------------------------------------------

--
-- Table structure for table `gsession_user_objective`
--

CREATE TABLE `gsession_user_objective` (
  `session_id` int NOT NULL,
  `objective_id` int NOT NULL,
  `user_id` int NOT NULL,
  `progress` float NOT NULL,
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `meta_config`
--

CREATE TABLE `meta_config` (
  `meta_key` varchar(100) NOT NULL,
  `meta_value` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `meta_config`
--

INSERT INTO `meta_config` (`meta_key`, `meta_value`) VALUES
('migrate', '1');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int NOT NULL,
  `recipient_id` int NOT NULL,
  `content_main` varchar(200) NOT NULL,
  `sender_name` varchar(100) DEFAULT NULL,
  `topic` varchar(100) DEFAULT NULL,
  `origin` varchar(50) NOT NULL,
  `seen` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0=not seen, 1=seen',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_type_id` int DEFAULT NULL,
  `password_hash` varchar(33) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_type_id`, `password_hash`) VALUES
(1, 'admin', 'admin@admin.lk', 1, '57d7e6105555f0c74dadfa823f451604'),
(8, 'Thisura', 'thisura@bhasha.lk', 3, '57d7e6105555f0c74dadfa823f451604');

-- --------------------------------------------------------

--
-- Table structure for table `user_auth`
--

CREATE TABLE `user_auth` (
  `auth_id` int NOT NULL,
  `user_id` int NOT NULL,
  `auth_key` varchar(200) DEFAULT NULL,
  `expiry_date` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_auth`
--

INSERT INTO `user_auth` (`auth_id`, `user_id`, `auth_key`, `expiry_date`) VALUES
(120, 1, '7b4e217a-1977-4037-9c8f-50727b9a0bef', '2021-09-06 23:50:25');

-- --------------------------------------------------------

--
-- Table structure for table `user_capability`
--

CREATE TABLE `user_capability` (
  `cap_id` int NOT NULL,
  `cap_name` varchar(100) NOT NULL,
  `cap_desc` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_group`
--

CREATE TABLE `user_group` (
  `group_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `banned_user_ids` varchar(200) NOT NULL,
  `invite_link` varchar(200) DEFAULT NULL,
  `user_limit` int DEFAULT '-1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_group_membership`
--

CREATE TABLE `user_group_membership` (
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_relationship`
--

CREATE TABLE `user_relationship` (
  `rid` int NOT NULL,
  `u_one_id` int NOT NULL,
  `u_one_rnk` int NOT NULL,
  `u_two_id` int NOT NULL,
  `u_two_rnk` int NOT NULL,
  `type` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_relationship_capability`
--

CREATE TABLE `user_relationship_capability` (
  `relationship_type_id` int NOT NULL,
  `gained_cap_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_relationship_type`
--

CREATE TABLE `user_relationship_type` (
  `type_id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE `user_type` (
  `user_type_id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`user_type_id`, `name`) VALUES
(1, 'admin'),
(2, 'teacher'),
(3, 'student'),
(4, 'parent');

-- --------------------------------------------------------

--
-- Table structure for table `user_type_capability`
--

CREATE TABLE `user_type_capability` (
  `user_type_id` int NOT NULL,
  `cap_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `game_entry`
--
ALTER TABLE `game_entry`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `game_guidance_tracker`
--
ALTER TABLE `game_guidance_tracker`
  ADD PRIMARY KEY (`tracker_id`),
  ADD KEY `fk_tracker_game_entry` (`game_entry_id`);

--
-- Indexes for table `game_objective`
--
ALTER TABLE `game_objective`
  ADD PRIMARY KEY (`objective_id`),
  ADD KEY `fk_objective_game_entry` (`game_entry_id`);

--
-- Indexes for table `gsessions`
--
ALTER TABLE `gsessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `gsession_members`
--
ALTER TABLE `gsession_members`
  ADD UNIQUE KEY `fk_session_id` (`session_id`) USING BTREE,
  ADD KEY `user_id` (`user_id`) USING BTREE;

--
-- Indexes for table `gsession_user_objective`
--
ALTER TABLE `gsession_user_objective`
  ADD KEY `fk_gsu_session_id` (`session_id`),
  ADD KEY `fk_gsu_objective_id` (`objective_id`),
  ADD KEY `fk_gsu_user_id` (`user_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_notif_rec_id_user_id` (`recipient_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `user_type_id` (`user_type_id`);

--
-- Indexes for table `user_auth`
--
ALTER TABLE `user_auth`
  ADD PRIMARY KEY (`auth_id`),
  ADD KEY `fkid_userid` (`user_id`);

--
-- Indexes for table `user_capability`
--
ALTER TABLE `user_capability`
  ADD PRIMARY KEY (`cap_id`);

--
-- Indexes for table `user_group`
--
ALTER TABLE `user_group`
  ADD PRIMARY KEY (`group_id`);

--
-- Indexes for table `user_group_membership`
--
ALTER TABLE `user_group_membership`
  ADD KEY `fk_user_grpmb_user_id` (`group_id`),
  ADD KEY `fk_user_grpmb_group_id` (`user_id`);

--
-- Indexes for table `user_relationship`
--
ALTER TABLE `user_relationship`
  ADD PRIMARY KEY (`rid`),
  ADD KEY `type` (`type`),
  ADD KEY `u_one_id` (`u_one_id`),
  ADD KEY `u_two_id` (`u_two_id`);

--
-- Indexes for table `user_relationship_capability`
--
ALTER TABLE `user_relationship_capability`
  ADD KEY `relationship_type_id` (`relationship_type_id`),
  ADD KEY `gained_cap_id` (`gained_cap_id`);

--
-- Indexes for table `user_relationship_type`
--
ALTER TABLE `user_relationship_type`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`user_type_id`);

--
-- Indexes for table `user_type_capability`
--
ALTER TABLE `user_type_capability`
  ADD KEY `user_type_id` (`user_type_id`),
  ADD KEY `cap_id` (`cap_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `game_entry`
--
ALTER TABLE `game_entry`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `game_guidance_tracker`
--
ALTER TABLE `game_guidance_tracker`
  MODIFY `tracker_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `game_objective`
--
ALTER TABLE `game_objective`
  MODIFY `objective_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `gsessions`
--
ALTER TABLE `gsessions`
  MODIFY `session_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_auth`
--
ALTER TABLE `user_auth`
  MODIFY `auth_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT for table `user_capability`
--
ALTER TABLE `user_capability`
  MODIFY `cap_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_group`
--
ALTER TABLE `user_group`
  MODIFY `group_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_relationship`
--
ALTER TABLE `user_relationship`
  MODIFY `rid` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_relationship_type`
--
ALTER TABLE `user_relationship_type`
  MODIFY `type_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_type`
--
ALTER TABLE `user_type`
  MODIFY `user_type_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `game_guidance_tracker`
--
ALTER TABLE `game_guidance_tracker`
  ADD CONSTRAINT `fk_tracker_game_entry` FOREIGN KEY (`game_entry_id`) REFERENCES `game_entry` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `game_objective`
--
ALTER TABLE `game_objective`
  ADD CONSTRAINT `fk_objective_game_entry` FOREIGN KEY (`game_entry_id`) REFERENCES `game_entry` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `gsession_members`
--
ALTER TABLE `gsession_members`
  ADD CONSTRAINT `fk_session_id` FOREIGN KEY (`session_id`) REFERENCES `gsessions` (`session_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `gsession_user_objective`
--
ALTER TABLE `gsession_user_objective`
  ADD CONSTRAINT `fk_gsu_objective_id` FOREIGN KEY (`objective_id`) REFERENCES `game_objective` (`objective_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_gsu_session_id` FOREIGN KEY (`session_id`) REFERENCES `gsessions` (`session_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_gsu_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_notif_rec_id_user_id` FOREIGN KEY (`recipient_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_type_id`) REFERENCES `user_type` (`user_type_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user_auth`
--
ALTER TABLE `user_auth`
  ADD CONSTRAINT `fkid_userid` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_group_membership`
--
ALTER TABLE `user_group_membership`
  ADD CONSTRAINT `fk_user_grpmb_group_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_grpmb_user_id` FOREIGN KEY (`group_id`) REFERENCES `user_group` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_relationship`
--
ALTER TABLE `user_relationship`
  ADD CONSTRAINT `user_relationship_ibfk_1` FOREIGN KEY (`type`) REFERENCES `user_relationship_type` (`type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_relationship_ibfk_2` FOREIGN KEY (`u_one_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_relationship_ibfk_3` FOREIGN KEY (`u_two_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_relationship_capability`
--
ALTER TABLE `user_relationship_capability`
  ADD CONSTRAINT `user_relationship_capability_ibfk_1` FOREIGN KEY (`relationship_type_id`) REFERENCES `user_relationship_type` (`type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_relationship_capability_ibfk_2` FOREIGN KEY (`gained_cap_id`) REFERENCES `user_capability` (`cap_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_type_capability`
--
ALTER TABLE `user_type_capability`
  ADD CONSTRAINT `user_type_capability_ibfk_1` FOREIGN KEY (`user_type_id`) REFERENCES `user_type` (`user_type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_type_capability_ibfk_2` FOREIGN KEY (`cap_id`) REFERENCES `user_capability` (`cap_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
