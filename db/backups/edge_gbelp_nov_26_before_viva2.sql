-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: mysqlhost
-- Generation Time: Nov 26, 2022 at 05:08 AM
-- Server version: 8.0.29
-- PHP Version: 8.0.20

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
  `is_template` tinyint(1) NOT NULL DEFAULT '0',
  `is_published` tinyint(1) NOT NULL DEFAULT '0',
  `parent_entry_id` int DEFAULT NULL,
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

INSERT INTO `game_entry` (`id`, `author_id`, `name`, `type`, `is_template`, `is_published`, `parent_entry_id`, `level_switch`, `multi_user_limit`, `progress_bound_type`, `project_id`, `rep_opt_objectives`, `rep_opt_guidance_trg`, `rep_opt_student_usg`, `rep_opt_level_score`, `rep_opt_level_time`) VALUES
(33, '1', 'CoolTemplate', 1, 1, 0, NULL, 1, 0, 1, '62d26ea56ccc6871f0dc0498', 1, 1, 1, 0, 1),
(34, '1', 'Test Template', 1, 1, 0, NULL, 1, 0, 1, '62faa29a4b661559f9f8b7e5', 1, 1, 1, 0, 0),
(35, '1', 'TestTemplate2', 1, 1, 0, NULL, 1, 0, 1, '62fb2cc1a605fe1445c2ed76', 1, 1, 1, 0, 1),
(37, '1', 'LightTest', 1, 1, 0, NULL, 3, 0, 0, '636fb7402fdac37412723cf6', 1, 0, 1, 0, 0),
(38, '1', 'RocketLogic', 1, 1, 0, NULL, 1, 0, 1, '6372aaa75959633a814b9973', 1, 1, 1, 0, 1),
(39, '1', 'Test', 1, 0, 0, 35, 1, 0, 1, '637f40c59a9ee03b42e6c6e2', 0, 0, 1, 0, 1),
(40, '1', 'CustomRocketLogic', 1, 0, 0, 38, 1, 0, 1, '637fb58cb57a466919d159c6', 1, 0, 1, 0, 1),
(41, '1', 'Match3', 1, 1, 0, NULL, 1, 0, 1, '6380c7ddb1c472a0ff8b786d', 1, 0, 1, 0, 1),
(42, '1', 'ObjectivesAndGuidanceTest', 1, 1, 0, NULL, 1, 0, 1, '638188e375cad65356065a9b', 1, 1, 1, 0, 0);

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
(8, 33, 'Trigger 1: Interact with coins timeout', 'Jump, or move across a coin to collect it', 100),
(9, 34, 'Collect 1 coin timeout', 'Jump or move across a coin to collect it', 60),
(10, 35, 'Collect 1 coin timeout', 'Jump or move across a coin to collect it', 60),
(11, 33, 'Trigger 2: Interact with game timeout', 'Use the arrow keys to move your character!', 60),
(12, 38, 'No points for 10 seconds', 'No points obtained for first 10 seconds of gameplay', 10),
(13, 38, 'No points for 30 seconds', 'No points obtained for first 30 seconds of gameplay', 30),
(14, 39, 'Collect 1 coin timeout', 'Jump or move across a coin to collect it', 60),
(15, 40, 'No points for 10 seconds', 'No points obtained for first 10 seconds of gameplay', 10),
(16, 40, 'No points for 30 seconds', 'No points obtained for first 30 seconds of gameplay', 30),
(17, 42, 'Fall', 'Try landing on the platform to avoid falling', 3);

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
(10, 33, 'Objective 1: Collect 10 gold coins', 'Collect 10 gold coins throughout the game', 10),
(11, 34, 'Collect 5 coins', 'Collect 5 coins to complete the game!', 5),
(12, 35, 'Collect 10 gold coins', 'Collect 10 gold coins throughout the game', 10),
(13, 33, 'Objective 2: Collect 50 gold coins', 'Collect 50 gold coins throughout the game', 50),
(14, 38, '5 points in 12 seconds', 'Obtain 5 points within 12 seconds!', 5),
(15, 39, 'Collect 10 gold coins', 'Collect 10 gold coins throughout the game', 10),
(16, 38, 'Finish 3 Levels', 'Finish all three levels', 3),
(17, 40, 'Finish 3 Levels', 'Finish all three levels', 3),
(18, 40, '5 points in 12 seconds', 'Obtain 5 points within 12 seconds!', 5),
(19, 42, 'CollectTrophy2', 'Collect the second Trophy', 1),
(20, 42, 'CollectTrophy1', 'Collect the first Trophy', 1);

-- --------------------------------------------------------

--
-- Table structure for table `gsessions`
--

CREATE TABLE `gsessions` (
  `session_id` int NOT NULL,
  `type_id` int NOT NULL COMMENT '1=single, 2=multi, 3=test',
  `state` int UNSIGNED NOT NULL DEFAULT '0' COMMENT '0=scheduled, 1=m_staging, 2=m_ready, 3=live, 4=complete, 5=canceled',
  `game_entry_id` int DEFAULT NULL,
  `group_id` int NOT NULL,
  `start_time` timestamp NOT NULL,
  `end_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `gsessions`
--

INSERT INTO `gsessions` (`session_id`, `type_id`, `state`, `game_entry_id`, `group_id`, `start_time`, `end_time`) VALUES
(32, 3, 3, 33, 26, '2022-08-09 15:30:29', NULL),
(33, 3, 3, 34, 26, '2022-08-16 01:24:13', NULL),
(34, 3, 3, 35, 26, '2022-08-16 11:17:36', NULL),
(35, 3, 3, 33, 27, '2022-08-23 22:51:31', NULL),
(36, 3, 3, 34, 28, '2022-09-20 22:51:44', NULL),
(37, 3, 3, 33, 28, '2022-10-21 00:18:45', NULL),
(38, 3, 3, 38, 28, '2022-11-15 02:47:36', NULL),
(41, 1, 0, 39, 28, '2022-11-23 19:00:00', '2022-11-27 19:00:00'),
(42, 1, 5, 39, 28, '2022-11-25 19:14:00', '2022-11-27 19:14:00'),
(43, 1, 3, 39, 28, '2022-11-25 20:32:00', '2022-11-26 20:32:00'),
(44, 1, 0, 40, 29, '2022-11-24 23:49:00', '2022-11-27 23:50:00'),
(45, 3, 3, 37, 29, '2022-11-25 00:19:41', NULL),
(46, 3, 3, 38, 29, '2022-11-25 11:15:20', NULL),
(47, 3, 3, 41, 29, '2022-11-25 20:17:12', NULL),
(48, 3, 3, 42, 29, '2022-11-26 09:04:42', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `gsession_members`
--

CREATE TABLE `gsession_members` (
  `session_id` int NOT NULL,
  `user_id` int NOT NULL,
  `last_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `gsession_members`
--

INSERT INTO `gsession_members` (`session_id`, `user_id`, `last_modified`) VALUES
(32, 1, '2022-08-09 10:00:28'),
(33, 1, '2022-08-15 19:54:13'),
(34, 1, '2022-08-16 05:47:36'),
(35, 1, '2022-08-23 17:21:30'),
(36, 1, '2022-09-20 17:21:43'),
(37, 1, '2022-10-20 18:48:45'),
(38, 1, '2022-11-14 21:17:36'),
(41, 1, '2022-11-24 13:30:52'),
(42, 1, '2022-11-24 13:44:32'),
(43, 1, '2022-11-24 15:02:11'),
(44, 1, '2022-11-24 18:20:05'),
(45, 1, '2022-11-24 18:49:41'),
(46, 1, '2022-11-25 05:45:19'),
(47, 1, '2022-11-25 14:47:11'),
(48, 1, '2022-11-26 03:34:41'),
(34, 13, '2022-08-23 17:26:32'),
(35, 13, '2022-08-23 17:28:16');

-- --------------------------------------------------------

--
-- Table structure for table `gsession_user_guidance_tracker`
--

CREATE TABLE `gsession_user_guidance_tracker` (
  `id` int NOT NULL,
  `session_id` int NOT NULL,
  `tracker_id` int NOT NULL,
  `user_id` int NOT NULL,
  `progress` float NOT NULL,
  `play_nonce` varchar(100) DEFAULT NULL COMMENT 'Identifies the play attempt',
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `gsession_user_guidance_tracker`
--

INSERT INTO `gsession_user_guidance_tracker` (`id`, `session_id`, `tracker_id`, `user_id`, `progress`, `play_nonce`, `last_updated`) VALUES
(1, 32, 8, 1, 1, 'abcd123', '2022-08-10 01:04:40'),
(2, 32, 8, 1, 1.2, 'abcd123', '2022-08-10 01:04:52'),
(3, 32, 8, 1, 1.3, 'abcd123', '2022-08-10 01:05:00'),
(4, 32, 8, 1, 20, 'abcd123', '2022-08-10 01:05:25'),
(5, 32, 8, 1, 21, 'abcd123', '2022-08-10 01:05:31'),
(6, 32, 8, 1, 21, 'abcd123', '2022-08-10 01:05:33'),
(7, 32, 8, 1, 0.05, 'b4e5fa45df66f1eea0d8758a5deba7ddcc2b1c2a1151e67199186cf51631c1ea', '2022-08-11 11:47:09'),
(8, 32, 8, 1, 0.1, 'b4e5fa45df66f1eea0d8758a5deba7ddcc2b1c2a1151e67199186cf51631c1ea', '2022-08-11 11:47:11'),
(9, 32, 8, 1, 0.15, 'b4e5fa45df66f1eea0d8758a5deba7ddcc2b1c2a1151e67199186cf51631c1ea', '2022-08-11 11:47:12'),
(10, 32, 8, 1, 0.2, 'b4e5fa45df66f1eea0d8758a5deba7ddcc2b1c2a1151e67199186cf51631c1ea', '2022-08-11 11:47:12'),
(11, 32, 8, 1, 0.25, 'b4e5fa45df66f1eea0d8758a5deba7ddcc2b1c2a1151e67199186cf51631c1ea', '2022-08-11 11:47:12'),
(12, 32, 8, 1, 0.3, 'b4e5fa45df66f1eea0d8758a5deba7ddcc2b1c2a1151e67199186cf51631c1ea', '2022-08-11 11:47:12'),
(13, 32, 8, 1, 0.025, 'c292f067f67224fbfe8123ac691a60a87a150324e89edefacba79c2ee7b9ed94', '2022-08-11 11:59:07'),
(14, 32, 8, 1, 0.05, 'c292f067f67224fbfe8123ac691a60a87a150324e89edefacba79c2ee7b9ed94', '2022-08-11 11:59:08'),
(15, 32, 8, 1, 0.075, 'c292f067f67224fbfe8123ac691a60a87a150324e89edefacba79c2ee7b9ed94', '2022-08-11 11:59:08'),
(16, 32, 8, 1, 0.05, '9bff5de1f2f9160a2b7f4c7debdc7d3b82b87d5d8a085752a4729fcbbfa7ba0b', '2022-08-13 20:42:01'),
(17, 32, 8, 1, 0.05, '0712a8423c6ad8ca4c4b3b8aa42c0b3274ee30c98aa975ade2cb2c4ca38f1e84', '2022-08-13 20:48:21'),
(18, 32, 8, 1, 0.1, '0712a8423c6ad8ca4c4b3b8aa42c0b3274ee30c98aa975ade2cb2c4ca38f1e84', '2022-08-13 20:48:21'),
(19, 32, 8, 1, 0.05, 'e4c5aa86a080123a4a9b56caac5bd3c8fff8c7101afd79598098775a67b557f0', '2022-08-13 23:47:36'),
(20, 32, 8, 1, 0.1, 'e4c5aa86a080123a4a9b56caac5bd3c8fff8c7101afd79598098775a67b557f0', '2022-08-13 23:47:36'),
(21, 32, 8, 1, 0.15, 'e4c5aa86a080123a4a9b56caac5bd3c8fff8c7101afd79598098775a67b557f0', '2022-08-13 23:47:37'),
(22, 32, 8, 1, 0.05, '97bdeedcbd815b5223ae444ad1fc088ce791295248b293908e67adda7242fd87', '2022-08-14 08:49:33'),
(23, 32, 8, 1, 0.1, '97bdeedcbd815b5223ae444ad1fc088ce791295248b293908e67adda7242fd87', '2022-08-14 08:49:33'),
(24, 32, 8, 1, 0.15, '97bdeedcbd815b5223ae444ad1fc088ce791295248b293908e67adda7242fd87', '2022-08-14 08:49:33'),
(25, 32, 8, 1, 0.05, '91f4f40a1948a886ece5f761ef025888a795f2a6b97a419681e93a60e47a3572', '2022-08-15 20:36:27'),
(26, 32, 8, 1, 0.1, '91f4f40a1948a886ece5f761ef025888a795f2a6b97a419681e93a60e47a3572', '2022-08-15 20:36:27'),
(27, 35, 8, 1, 0.05, 'c44bba3328d4e8008579678b413e6456e3c1eb81f9d949c433720a92bdc068b3', '2022-08-23 17:22:25'),
(28, 35, 8, 13, 0.05, '77b6b33880a4a76725058a7daefe0ecdff8b76d82867a4e09b49341d10ef975d', '2022-08-23 17:28:24'),
(29, 35, 8, 13, 0.1, '77b6b33880a4a76725058a7daefe0ecdff8b76d82867a4e09b49341d10ef975d', '2022-08-23 17:28:25'),
(30, 35, 8, 13, 0.15, '77b6b33880a4a76725058a7daefe0ecdff8b76d82867a4e09b49341d10ef975d', '2022-08-23 17:28:25'),
(31, 35, 8, 13, 0.2, '77b6b33880a4a76725058a7daefe0ecdff8b76d82867a4e09b49341d10ef975d', '2022-08-23 17:28:25'),
(32, 35, 8, 13, 0.25, '77b6b33880a4a76725058a7daefe0ecdff8b76d82867a4e09b49341d10ef975d', '2022-08-23 17:28:25'),
(33, 35, 8, 13, 0.3, '77b6b33880a4a76725058a7daefe0ecdff8b76d82867a4e09b49341d10ef975d', '2022-08-23 17:28:25'),
(34, 35, 8, 13, 0.35, '77b6b33880a4a76725058a7daefe0ecdff8b76d82867a4e09b49341d10ef975d', '2022-08-23 17:28:25'),
(35, 35, 8, 13, 0.4, '77b6b33880a4a76725058a7daefe0ecdff8b76d82867a4e09b49341d10ef975d', '2022-08-23 17:28:25'),
(36, 35, 8, 13, 0.45, '77b6b33880a4a76725058a7daefe0ecdff8b76d82867a4e09b49341d10ef975d', '2022-08-23 17:28:26'),
(37, 35, 8, 13, 0.5, '77b6b33880a4a76725058a7daefe0ecdff8b76d82867a4e09b49341d10ef975d', '2022-08-23 17:28:30'),
(38, 35, 8, 13, 0.55, '77b6b33880a4a76725058a7daefe0ecdff8b76d82867a4e09b49341d10ef975d', '2022-08-23 17:28:30'),
(39, 35, 8, 13, 0.6, '77b6b33880a4a76725058a7daefe0ecdff8b76d82867a4e09b49341d10ef975d', '2022-08-23 17:28:43'),
(40, 35, 11, 1, 0.025, '182a825ba4a3cccee22e95490c2c6c4740089e51a1f306aabc2a1d8f090bdacc', '2022-09-01 18:57:00'),
(41, 35, 11, 1, 0.05, '182a825ba4a3cccee22e95490c2c6c4740089e51a1f306aabc2a1d8f090bdacc', '2022-09-01 18:57:00'),
(42, 35, 11, 1, 0.075, '182a825ba4a3cccee22e95490c2c6c4740089e51a1f306aabc2a1d8f090bdacc', '2022-09-01 18:57:00'),
(43, 35, 11, 1, 0.1, '182a825ba4a3cccee22e95490c2c6c4740089e51a1f306aabc2a1d8f090bdacc', '2022-09-01 18:57:00'),
(44, 35, 11, 1, 0.125, '182a825ba4a3cccee22e95490c2c6c4740089e51a1f306aabc2a1d8f090bdacc', '2022-09-01 18:57:00'),
(45, 35, 11, 1, 0.15, '182a825ba4a3cccee22e95490c2c6c4740089e51a1f306aabc2a1d8f090bdacc', '2022-09-01 18:57:01'),
(46, 35, 11, 1, 0.175, '182a825ba4a3cccee22e95490c2c6c4740089e51a1f306aabc2a1d8f090bdacc', '2022-09-01 18:57:01'),
(47, 35, 8, 1, 0.05, '182a825ba4a3cccee22e95490c2c6c4740089e51a1f306aabc2a1d8f090bdacc', '2022-09-01 18:57:02'),
(48, 35, 8, 1, 0.1, '182a825ba4a3cccee22e95490c2c6c4740089e51a1f306aabc2a1d8f090bdacc', '2022-09-01 18:57:03'),
(49, 35, 8, 1, 0.15, '182a825ba4a3cccee22e95490c2c6c4740089e51a1f306aabc2a1d8f090bdacc', '2022-09-01 18:57:03'),
(50, 35, 11, 1, 0.025, '093caab1a1119aba74ac11034696103d645e97fc731a93b9f2fa62e152be0c56', '2022-09-01 18:57:19'),
(51, 35, 11, 1, 0.05, '093caab1a1119aba74ac11034696103d645e97fc731a93b9f2fa62e152be0c56', '2022-09-01 18:57:20'),
(52, 35, 11, 1, 0.025, '093caab1a1119aba74ac11034696103dd9a2fadb7e2b31449b68fae73d8b724c', '2022-09-01 18:57:31'),
(53, 35, 11, 1, 0.05, '093caab1a1119aba74ac11034696103dd9a2fadb7e2b31449b68fae73d8b724c', '2022-09-01 18:57:32'),
(54, 35, 11, 1, 0.075, '093caab1a1119aba74ac11034696103dd9a2fadb7e2b31449b68fae73d8b724c', '2022-09-01 18:57:32'),
(55, 35, 11, 1, 0.1, '093caab1a1119aba74ac11034696103dd9a2fadb7e2b31449b68fae73d8b724c', '2022-09-01 18:57:35'),
(56, 35, 11, 1, 0.125, '093caab1a1119aba74ac11034696103dd9a2fadb7e2b31449b68fae73d8b724c', '2022-09-01 18:57:35'),
(57, 35, 8, 1, 0.05, '093caab1a1119aba74ac11034696103dd9a2fadb7e2b31449b68fae73d8b724c', '2022-09-01 18:57:38'),
(58, 35, 11, 1, 0.025, '093caab1a1119aba74ac11034696103dabab48a940635c2e52ef72190b1876f8', '2022-09-01 18:57:55'),
(59, 35, 11, 1, 0.05, '093caab1a1119aba74ac11034696103dabab48a940635c2e52ef72190b1876f8', '2022-09-01 18:57:56'),
(60, 35, 11, 1, 0.075, '093caab1a1119aba74ac11034696103dabab48a940635c2e52ef72190b1876f8', '2022-09-01 18:57:57'),
(61, 35, 11, 1, 0.025, '2fda65b9c56284d5318d5e5a0cc23a1e845fbe7ef4e7fe4696110387ab00fc0e', '2022-09-01 18:58:18'),
(62, 35, 8, 1, 10, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:47:45'),
(63, 35, 8, 1, 20, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:47:46'),
(64, 35, 8, 1, 30, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:47:46'),
(65, 35, 8, 1, 40, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:47:46'),
(66, 35, 8, 1, 50, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:47:46'),
(67, 35, 8, 1, 60, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:47:46'),
(68, 35, 8, 1, 70, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:47:46'),
(69, 35, 8, 1, 80, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:47:47'),
(70, 35, 8, 1, 90, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:47:47'),
(71, 35, 8, 1, 100, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:47:47'),
(72, 35, 8, 1, 110, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:47:47'),
(73, 35, 8, 1, 120, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:47:47'),
(74, 35, 8, 1, 130, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:47:47'),
(75, 35, 8, 1, 140, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:47:47'),
(76, 35, 8, 1, 150, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:47:48'),
(77, 35, 8, 1, 160, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:47:48'),
(78, 35, 8, 1, 170, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:47:48'),
(79, 35, 8, 1, 180, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:47:48'),
(80, 35, 8, 1, 190, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:47:48'),
(81, 35, 8, 1, 200, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:47:48'),
(82, 35, 8, 1, 210, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:47:48'),
(83, 35, 8, 1, 220, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:48:25'),
(84, 35, 8, 1, 230, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:48:27'),
(85, 35, 8, 1, 240, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:48:27'),
(86, 37, 8, 1, 10, '684eddbde9a1d5399dcd43bbc8368683742eee9bef2a1acd46a7424604da6250', '2022-10-20 18:49:17'),
(87, 37, 11, 1, 0.025, '684eddbde9a1d5399dcd43bbc8368683742eee9bef2a1acd46a7424604da6250', '2022-10-20 18:49:17'),
(88, 37, 8, 1, 10, '461111413fac402bdda8ebdeed44f72b5e72738e0e1980a8463a7bdae5146580', '2022-11-08 02:32:53'),
(89, 37, 11, 1, 0.025, '461111413fac402bdda8ebdeed44f72b5e72738e0e1980a8463a7bdae5146580', '2022-11-08 02:32:54'),
(90, 37, 8, 1, 20, '461111413fac402bdda8ebdeed44f72b5e72738e0e1980a8463a7bdae5146580', '2022-11-08 02:32:56'),
(91, 38, 12, 1, 1, '5a5654c8b257d9a10c09f1811ebbdf588c4fbac764cd013b164553642e7571a1', '2022-11-15 03:54:12'),
(92, 38, 13, 1, 1, '5a5654c8b257d9a10c09f1811ebbdf588c4fbac764cd013b164553642e7571a1', '2022-11-15 03:54:12'),
(93, 38, 12, 1, 1, '933cf645ce102b86caaa7eadc51cc22ffb4c942f52b5e12e93900f3ceb252e0c', '2022-11-15 04:04:21'),
(94, 38, 13, 1, 1, '933cf645ce102b86caaa7eadc51cc22ffb4c942f52b5e12e93900f3ceb252e0c', '2022-11-15 04:04:21'),
(95, 38, 13, 1, 1, '71c253d3b8f921b0ca841e1fd3cdff01ce30b36a60a9d6eb50f7cd6d103f2cf3', '2022-11-15 04:12:46'),
(96, 38, 12, 1, 1, '71c253d3b8f921b0ca841e1fd3cdff01ce30b36a60a9d6eb50f7cd6d103f2cf3', '2022-11-15 04:12:46'),
(97, 38, 12, 1, 1, '809948b1132f708da5222e811b353f13dec78ed6cbe1ce519462e78db7d20138', '2022-11-15 04:13:30'),
(98, 38, 13, 1, 1, '809948b1132f708da5222e811b353f13dec78ed6cbe1ce519462e78db7d20138', '2022-11-15 04:13:30'),
(99, 38, 12, 1, 1, '809948b1132f708da5222e811b353f1387c03b7bae18846c014d594475ad26fb', '2022-11-15 04:13:52'),
(100, 38, 13, 1, 1, '809948b1132f708da5222e811b353f1387c03b7bae18846c014d594475ad26fb', '2022-11-15 04:13:52'),
(101, 38, 12, 1, 1, '030e26d1c3e6a357c7a9d2f463e1b923c3b18199adaff0fbd088501e56e125d5', '2022-11-15 04:15:18'),
(102, 38, 13, 1, 1, '030e26d1c3e6a357c7a9d2f463e1b923c3b18199adaff0fbd088501e56e125d5', '2022-11-15 04:15:18'),
(103, 38, 12, 1, 1, '030e26d1c3e6a357c7a9d2f463e1b923c213636756a47043f2618fc6650a515b', '2022-11-15 04:15:55'),
(104, 38, 13, 1, 1, '030e26d1c3e6a357c7a9d2f463e1b923c213636756a47043f2618fc6650a515b', '2022-11-15 04:15:55'),
(105, 38, 13, 1, 1, 'b137d39b83317bcd0de970bb7a496521f54a57e39c3f966ec211f430834f8645', '2022-11-15 04:23:29'),
(106, 38, 12, 1, 1, 'b137d39b83317bcd0de970bb7a496521f54a57e39c3f966ec211f430834f8645', '2022-11-15 04:23:29'),
(107, 38, 13, 1, 1, '55c92ffb9c8d392cecefe3d4029c022a57325da4d428c5fcd3001882777f47c5', '2022-11-15 04:32:01'),
(108, 38, 12, 1, 1, '55c92ffb9c8d392cecefe3d4029c022a57325da4d428c5fcd3001882777f47c5', '2022-11-15 04:32:01'),
(109, 38, 12, 1, 1, '5f5f29160e91f0ebe19d3a2d0efe375b9cad538228bbbf347618cd41469433eb', '2022-11-15 05:59:48'),
(110, 38, 13, 1, 1, '5f5f29160e91f0ebe19d3a2d0efe375b9cad538228bbbf347618cd41469433eb', '2022-11-15 05:59:48'),
(111, 38, 12, 1, 1, '75dec924dbf01f2378b4d562fd38728169e7173e721de31e8394e49f3e80b18d', '2022-11-15 06:00:43'),
(112, 38, 13, 1, 1, '75dec924dbf01f2378b4d562fd38728169e7173e721de31e8394e49f3e80b18d', '2022-11-15 06:00:43'),
(113, 38, 12, 1, 1, 'da966be17ef07a99a1742f229af042991372271404e20b5e3edad7df74742ea2', '2022-11-15 06:16:34'),
(114, 38, 13, 1, 1, 'da966be17ef07a99a1742f229af042991372271404e20b5e3edad7df74742ea2', '2022-11-15 06:16:34'),
(115, 38, 12, 1, 1, '9ac465c6f055ee6f4df44b240e03aab828d0d824b83476419a41fdfc76481612', '2022-11-15 06:18:16'),
(116, 38, 13, 1, 1, '9ac465c6f055ee6f4df44b240e03aab828d0d824b83476419a41fdfc76481612', '2022-11-15 06:18:16'),
(117, 38, 13, 1, 1, '879eb0b7317a28ecddaf6a0f2e725eb43fa1276a87a607b7111e3dd76c55b7f4', '2022-11-15 09:02:28'),
(118, 38, 12, 1, 1, '879eb0b7317a28ecddaf6a0f2e725eb43fa1276a87a607b7111e3dd76c55b7f4', '2022-11-15 09:02:28'),
(119, 38, 13, 1, 1, 'cde307dab781f361ddfad4d1859e689fee9fe0f16543d3a913a8393ab3b53ac6', '2022-11-16 21:18:58'),
(120, 38, 12, 1, 1, 'cde307dab781f361ddfad4d1859e689fee9fe0f16543d3a913a8393ab3b53ac6', '2022-11-16 21:18:58'),
(121, 38, 13, 1, 1, 'e93adf8755363489d5d6db905824290a61d850c8275ca81c602a85ab97f9e94f', '2022-11-19 03:49:21'),
(122, 38, 12, 1, 1, 'e93adf8755363489d5d6db905824290a61d850c8275ca81c602a85ab97f9e94f', '2022-11-19 03:49:21'),
(123, 38, 13, 1, 1, '5258c01e0daf0b9a62283a51802b65c8e19f749306d1660fbee26a88d447d3b6', '2022-11-19 09:27:15'),
(124, 38, 12, 1, 1, '5258c01e0daf0b9a62283a51802b65c8e19f749306d1660fbee26a88d447d3b6', '2022-11-19 09:27:15'),
(125, 38, 13, 1, 1, '98f742dcaaf752cd138591f785eeb1c9c6c950c1afdae0eaebe40a34db27db5c', '2022-11-21 22:34:16'),
(126, 38, 12, 1, 1, '98f742dcaaf752cd138591f785eeb1c9c6c950c1afdae0eaebe40a34db27db5c', '2022-11-21 22:34:16'),
(127, 38, 12, 1, 1, 'adf7592dc9214de12378b00b6bb625d1604bdf42018e33dbf150ae3823408462', '2022-11-24 15:43:41'),
(128, 38, 13, 1, 1, 'adf7592dc9214de12378b00b6bb625d1604bdf42018e33dbf150ae3823408462', '2022-11-24 15:43:41'),
(129, 38, 12, 1, 1, '138dd3c110c644747a1f4b9db5bc03523cdb0c97bebe50a1ca950d0c4663afc7', '2022-11-24 15:44:07'),
(130, 38, 13, 1, 1, '138dd3c110c644747a1f4b9db5bc03523cdb0c97bebe50a1ca950d0c4663afc7', '2022-11-24 15:44:07'),
(131, 38, 13, 1, 1, 'e6717477d0325357db03c799705e4f5cbc8d645b081bfc1786682098889bec1a', '2022-11-24 15:45:32'),
(132, 38, 12, 1, 1, 'e6717477d0325357db03c799705e4f5cbc8d645b081bfc1786682098889bec1a', '2022-11-24 15:45:32'),
(133, 38, 13, 1, 1, 'e46c408b18f802433cdb886961a440514a3f72b1050179c192d5a3693884ca5e', '2022-11-24 15:46:26'),
(134, 38, 12, 1, 1, 'e46c408b18f802433cdb886961a440514a3f72b1050179c192d5a3693884ca5e', '2022-11-24 15:46:26'),
(135, 38, 12, 1, 1, 'ccfb119592d959fcb7587d21ec8c245cb869d5317f888bb2d6cce418d22a0e67', '2022-11-24 15:48:28'),
(136, 38, 13, 1, 1, 'ccfb119592d959fcb7587d21ec8c245cb869d5317f888bb2d6cce418d22a0e67', '2022-11-24 15:48:28'),
(137, 38, 12, 1, 1, '6b9e340d340ede4d6f5bec6c5a41ad1ce5ed5691f43e5d19e5bc4a459696cbfd', '2022-11-24 15:50:45'),
(138, 38, 13, 1, 1, '6b9e340d340ede4d6f5bec6c5a41ad1ce5ed5691f43e5d19e5bc4a459696cbfd', '2022-11-24 15:50:45'),
(139, 38, 12, 1, 1, '31c08ef0246300586c55ef49f09b74a7cba84bc6bfb5ee29a7fd88ccd6749627', '2022-11-24 15:51:25'),
(140, 38, 13, 1, 1, '31c08ef0246300586c55ef49f09b74a7cba84bc6bfb5ee29a7fd88ccd6749627', '2022-11-24 15:51:25'),
(141, 38, 13, 1, 1, '31c08ef0246300586c55ef49f09b74a77bb82859d5ebc7dc3ef3b28c578f73ef', '2022-11-24 15:51:46'),
(142, 38, 12, 1, 1, '31c08ef0246300586c55ef49f09b74a77bb82859d5ebc7dc3ef3b28c578f73ef', '2022-11-24 15:51:46'),
(143, 38, 13, 1, 1, '7590495c85b317741dd6ac07cc18078d043e3a55f379781b5253b2f40b1d0210', '2022-11-24 16:02:02'),
(144, 38, 12, 1, 1, '7590495c85b317741dd6ac07cc18078d043e3a55f379781b5253b2f40b1d0210', '2022-11-24 16:02:02'),
(145, 38, 12, 1, 1, '7590495c85b317741dd6ac07cc18078d964796fc2b35f0965af1291e96d65b9b', '2022-11-24 16:02:34'),
(146, 38, 13, 1, 1, '7590495c85b317741dd6ac07cc18078d964796fc2b35f0965af1291e96d65b9b', '2022-11-24 16:02:34'),
(147, 38, 12, 1, 1, '9e899b7ffb50ccb3f1d3203cbd557d2ee5b2463633821e66587426a56d0c0407', '2022-11-24 16:07:53'),
(148, 38, 13, 1, 1, '9e899b7ffb50ccb3f1d3203cbd557d2ee5b2463633821e66587426a56d0c0407', '2022-11-24 16:07:53'),
(149, 38, 12, 1, 1, '87523bd7964e313c437a3236c3d000fd42640219bdf83899a71440348055d154', '2022-11-24 16:50:22'),
(150, 38, 13, 1, 1, '87523bd7964e313c437a3236c3d000fd42640219bdf83899a71440348055d154', '2022-11-24 16:50:22'),
(151, 38, 12, 1, 1, '87523bd7964e313c437a3236c3d000fdb32e37adcf196f03d2b785a7221c866b', '2022-11-24 16:50:44'),
(152, 38, 13, 1, 1, '87523bd7964e313c437a3236c3d000fdb32e37adcf196f03d2b785a7221c866b', '2022-11-24 16:50:44'),
(153, 38, 12, 1, 1, '87523bd7964e313c437a3236c3d000fd4b3700cff70ae2d808c388df244145c3', '2022-11-24 16:50:58'),
(154, 38, 13, 1, 1, '87523bd7964e313c437a3236c3d000fd4b3700cff70ae2d808c388df244145c3', '2022-11-24 16:50:58'),
(155, 38, 12, 1, 1, '99032886c5220ca097abe253860bc5d9b2ac7c89667bb85bb8006ed777d0f297', '2022-11-24 17:04:37'),
(156, 38, 13, 1, 1, '99032886c5220ca097abe253860bc5d9b2ac7c89667bb85bb8006ed777d0f297', '2022-11-24 17:04:37'),
(157, 38, 13, 1, 1, '9c3a93a37b8db3c5c5de750f9eea8f5a6986bc66c5aa84135fd0ccf37df67efd', '2022-11-24 17:27:46'),
(158, 38, 12, 1, 1, '9c3a93a37b8db3c5c5de750f9eea8f5a6986bc66c5aa84135fd0ccf37df67efd', '2022-11-24 17:27:46'),
(159, 38, 13, 1, 2, '9c3a93a37b8db3c5c5de750f9eea8f5a6986bc66c5aa84135fd0ccf37df67efd', '2022-11-24 17:28:26'),
(160, 38, 12, 1, 2, '9c3a93a37b8db3c5c5de750f9eea8f5a6986bc66c5aa84135fd0ccf37df67efd', '2022-11-24 17:28:26'),
(161, 38, 12, 1, 1, 'dea492dd3e2851a5d998435f7591a7afcb04bfaa2dc4d39cff698dab4a144d6b', '2022-11-24 17:35:05'),
(162, 38, 13, 1, 1, 'dea492dd3e2851a5d998435f7591a7afcb04bfaa2dc4d39cff698dab4a144d6b', '2022-11-24 17:35:05'),
(163, 38, 12, 1, 2, 'dea492dd3e2851a5d998435f7591a7afcb04bfaa2dc4d39cff698dab4a144d6b', '2022-11-24 17:36:57'),
(164, 38, 13, 1, 2, 'dea492dd3e2851a5d998435f7591a7afcb04bfaa2dc4d39cff698dab4a144d6b', '2022-11-24 17:36:57'),
(165, 38, 12, 1, 1, '11552ad8d4a14a73b241035ba734764286f1ccd60bbdbb097090e575ab89ca34', '2022-11-24 17:44:02'),
(166, 38, 13, 1, 1, '11552ad8d4a14a73b241035ba734764286f1ccd60bbdbb097090e575ab89ca34', '2022-11-24 17:44:02'),
(167, 38, 12, 1, 1, '11552ad8d4a14a73b241035ba7347642a657e0c085e59ff88f885941ac0cc6af', '2022-11-24 17:44:12'),
(168, 38, 13, 1, 1, '11552ad8d4a14a73b241035ba7347642a657e0c085e59ff88f885941ac0cc6af', '2022-11-24 17:44:12'),
(169, 38, 12, 1, 1, '2d6a9686ae4ef88fba2a562e6f8b41c4c310c1b5fd68d59d9a5194a04d10a2e9', '2022-11-24 17:47:57'),
(170, 38, 13, 1, 1, '2d6a9686ae4ef88fba2a562e6f8b41c4c310c1b5fd68d59d9a5194a04d10a2e9', '2022-11-24 17:47:57'),
(171, 38, 12, 1, 2, '2d6a9686ae4ef88fba2a562e6f8b41c4c310c1b5fd68d59d9a5194a04d10a2e9', '2022-11-24 17:48:42'),
(172, 38, 13, 1, 2, '2d6a9686ae4ef88fba2a562e6f8b41c4c310c1b5fd68d59d9a5194a04d10a2e9', '2022-11-24 17:48:42'),
(173, 38, 12, 1, 3, '2d6a9686ae4ef88fba2a562e6f8b41c4c310c1b5fd68d59d9a5194a04d10a2e9', '2022-11-24 17:49:52'),
(174, 38, 13, 1, 3, '2d6a9686ae4ef88fba2a562e6f8b41c4c310c1b5fd68d59d9a5194a04d10a2e9', '2022-11-24 17:49:52'),
(175, 38, 12, 1, 1, '4135d4f2f91cc829251f9659bd26391688b7c7f73b163cb8f2700dc73309f06e', '2022-11-24 17:57:23'),
(176, 38, 13, 1, 1, '4135d4f2f91cc829251f9659bd26391688b7c7f73b163cb8f2700dc73309f06e', '2022-11-24 17:57:23'),
(177, 38, 12, 1, 1, 'e7477b9c76f4f2c7f7b5a0cc757517c481de05e9f16cb56631282d95f4d62c57', '2022-11-24 18:15:10'),
(178, 38, 13, 1, 1, 'e7477b9c76f4f2c7f7b5a0cc757517c481de05e9f16cb56631282d95f4d62c57', '2022-11-24 18:15:10'),
(179, 38, 12, 1, 2, 'e7477b9c76f4f2c7f7b5a0cc757517c481de05e9f16cb56631282d95f4d62c57', '2022-11-24 18:16:01'),
(180, 38, 13, 1, 2, 'e7477b9c76f4f2c7f7b5a0cc757517c481de05e9f16cb56631282d95f4d62c57', '2022-11-24 18:16:01'),
(181, 46, 12, 1, 1, '707a4975fe5607d3ff984992c57844e98d96feb6277423fcdca7c0baf1ecbad5', '2022-11-25 05:45:22'),
(182, 46, 13, 1, 1, '707a4975fe5607d3ff984992c57844e98d96feb6277423fcdca7c0baf1ecbad5', '2022-11-25 05:45:22'),
(183, 48, 17, 1, 1, '47386cd777bc0c0136dae367329bcc1fe99db610f8bec198ddc8dc87c9b0b244', '2022-11-26 04:22:17'),
(184, 48, 17, 1, 1, '47386cd777bc0c0136dae367329bcc1f035749538461f2530132c4979d22ad32', '2022-11-26 04:22:29'),
(185, 48, 17, 1, 2, '47386cd777bc0c0136dae367329bcc1f035749538461f2530132c4979d22ad32', '2022-11-26 04:22:36'),
(186, 48, 17, 1, 3, '47386cd777bc0c0136dae367329bcc1f035749538461f2530132c4979d22ad32', '2022-11-26 04:22:41'),
(187, 48, 17, 1, 4, '47386cd777bc0c0136dae367329bcc1f035749538461f2530132c4979d22ad32', '2022-11-26 04:22:45'),
(188, 48, 17, 1, 1, '75db4ed15c994b3fe28a441d960c35d96e82c4f07fecebb5931b3325dcfd26a5', '2022-11-26 04:24:26'),
(189, 48, 17, 1, 2, '75db4ed15c994b3fe28a441d960c35d96e82c4f07fecebb5931b3325dcfd26a5', '2022-11-26 04:24:26'),
(190, 48, 17, 1, 3, '75db4ed15c994b3fe28a441d960c35d96e82c4f07fecebb5931b3325dcfd26a5', '2022-11-26 04:24:27'),
(191, 48, 17, 1, 4, '75db4ed15c994b3fe28a441d960c35d96e82c4f07fecebb5931b3325dcfd26a5', '2022-11-26 04:24:27'),
(192, 46, 13, 1, 1, '7ea44fe33bf17d03c6f135d27efda8376e6b0aad118be3f76869a1c057499e9c', '2022-11-26 04:58:12'),
(193, 46, 12, 1, 1, '7ea44fe33bf17d03c6f135d27efda8376e6b0aad118be3f76869a1c057499e9c', '2022-11-26 04:58:12'),
(194, 46, 12, 1, 1, '51a93f869ee887e83b9ceb9966cc29817c8be43691e3541a6abbc76bd99352cf', '2022-11-26 05:01:32'),
(195, 46, 13, 1, 1, '51a93f869ee887e83b9ceb9966cc29817c8be43691e3541a6abbc76bd99352cf', '2022-11-26 05:01:32'),
(196, 46, 12, 1, 1, 'e0f946355c02ca7529411376ea0f278b985ea1e32d10b49826043d901ffdea40', '2022-11-26 05:02:18'),
(197, 46, 13, 1, 1, 'e0f946355c02ca7529411376ea0f278b985ea1e32d10b49826043d901ffdea40', '2022-11-26 05:02:18'),
(198, 46, 13, 1, 2, 'e0f946355c02ca7529411376ea0f278b985ea1e32d10b49826043d901ffdea40', '2022-11-26 05:03:11'),
(199, 46, 12, 1, 2, 'e0f946355c02ca7529411376ea0f278b985ea1e32d10b49826043d901ffdea40', '2022-11-26 05:03:11');

-- --------------------------------------------------------

--
-- Table structure for table `gsession_user_objective`
--

CREATE TABLE `gsession_user_objective` (
  `id` int NOT NULL,
  `session_id` int NOT NULL,
  `objective_id` int NOT NULL,
  `user_id` int NOT NULL,
  `progress` float NOT NULL,
  `play_nonce` varchar(100) DEFAULT NULL COMMENT 'A Value identifying the play attempt',
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `gsession_user_objective`
--

INSERT INTO `gsession_user_objective` (`id`, `session_id`, `objective_id`, `user_id`, `progress`, `play_nonce`, `last_updated`) VALUES
(1, 32, 10, 1, 11, 'abcd123', '2022-08-10 00:42:50'),
(2, 32, 10, 1, 11, 'abcd123', '2022-08-10 00:43:06'),
(3, 32, 10, 1, 11.4, 'abcd123', '2022-08-10 00:43:15'),
(4, 32, 10, 1, 11.5, 'abcd123', '2022-08-10 00:45:01'),
(5, 32, 10, 1, 11.5, 'abcd123', '2022-08-10 00:56:46'),
(7, 32, 10, 1, 11.6, 'abcd123', '2022-08-10 00:57:03'),
(8, 32, 10, 1, 11.7, 'abcd123', '2022-08-10 00:57:40'),
(9, 32, 10, 1, 0.1, 'a846493ca5285e64bd2f76a6c83510c8fcc41e2e9eefaaf0898c4982e5cfe952', '2022-08-11 11:09:31'),
(10, 32, 10, 1, 0.2, 'a846493ca5285e64bd2f76a6c83510c8fcc41e2e9eefaaf0898c4982e5cfe952', '2022-08-11 11:09:38'),
(11, 32, 10, 1, 0.3, 'a846493ca5285e64bd2f76a6c83510c8fcc41e2e9eefaaf0898c4982e5cfe952', '2022-08-11 11:09:38'),
(12, 32, 10, 1, 0.4, 'a846493ca5285e64bd2f76a6c83510c8fcc41e2e9eefaaf0898c4982e5cfe952', '2022-08-11 11:09:47'),
(13, 32, 10, 1, 0.5, 'a846493ca5285e64bd2f76a6c83510c8fcc41e2e9eefaaf0898c4982e5cfe952', '2022-08-11 11:09:47'),
(14, 32, 10, 1, 0.6, 'a846493ca5285e64bd2f76a6c83510c8fcc41e2e9eefaaf0898c4982e5cfe952', '2022-08-11 11:09:47'),
(15, 32, 10, 1, 0.7, 'a846493ca5285e64bd2f76a6c83510c8fcc41e2e9eefaaf0898c4982e5cfe952', '2022-08-11 11:09:47'),
(16, 32, 10, 1, 0.8, 'a846493ca5285e64bd2f76a6c83510c8fcc41e2e9eefaaf0898c4982e5cfe952', '2022-08-11 11:09:47'),
(17, 32, 10, 1, 0.1, 'd38a6c5ec821c73dc4bf624e99c483cea25cc3c3d0c5ee7c4b6760b1b8a8ef36', '2022-08-11 11:44:28'),
(18, 32, 10, 1, 0.2, 'd38a6c5ec821c73dc4bf624e99c483cea25cc3c3d0c5ee7c4b6760b1b8a8ef36', '2022-08-11 11:44:30'),
(19, 32, 10, 1, 0.3, 'd38a6c5ec821c73dc4bf624e99c483cea25cc3c3d0c5ee7c4b6760b1b8a8ef36', '2022-08-11 11:44:31'),
(20, 32, 10, 1, 0.4, 'd38a6c5ec821c73dc4bf624e99c483cea25cc3c3d0c5ee7c4b6760b1b8a8ef36', '2022-08-11 11:44:33'),
(21, 32, 10, 1, 0.5, 'd38a6c5ec821c73dc4bf624e99c483cea25cc3c3d0c5ee7c4b6760b1b8a8ef36', '2022-08-11 11:44:33'),
(22, 32, 10, 1, 0.6, 'd38a6c5ec821c73dc4bf624e99c483cea25cc3c3d0c5ee7c4b6760b1b8a8ef36', '2022-08-11 11:44:34'),
(23, 32, 10, 1, 0.7, 'd38a6c5ec821c73dc4bf624e99c483cea25cc3c3d0c5ee7c4b6760b1b8a8ef36', '2022-08-11 11:44:34'),
(24, 32, 10, 1, 0.8, 'd38a6c5ec821c73dc4bf624e99c483cea25cc3c3d0c5ee7c4b6760b1b8a8ef36', '2022-08-11 11:44:34'),
(25, 32, 10, 1, 0.9, 'd38a6c5ec821c73dc4bf624e99c483cea25cc3c3d0c5ee7c4b6760b1b8a8ef36', '2022-08-11 11:44:34'),
(26, 32, 10, 1, 0.1, '9bff5de1f2f9160a2b7f4c7debdc7d3b82b87d5d8a085752a4729fcbbfa7ba0b', '2022-08-13 20:42:02'),
(27, 32, 10, 1, 0.1, 'e4c5aa86a080123a4a9b56caac5bd3c8fff8c7101afd79598098775a67b557f0', '2022-08-13 23:47:34'),
(28, 32, 10, 1, 0.2, 'e4c5aa86a080123a4a9b56caac5bd3c8fff8c7101afd79598098775a67b557f0', '2022-08-13 23:47:35'),
(29, 32, 10, 1, 0.1, '97bdeedcbd815b5223ae444ad1fc088ce791295248b293908e67adda7242fd87', '2022-08-14 08:49:32'),
(30, 32, 10, 1, 0.1, '39b6b7b839ee8c2e9fae897eff488c73a52fa7a3f5e660a62f1d0c7c532a78e6', '2022-08-14 22:01:58'),
(31, 32, 10, 1, 0.2, '39b6b7b839ee8c2e9fae897eff488c73a52fa7a3f5e660a62f1d0c7c532a78e6', '2022-08-14 22:01:58'),
(32, 32, 10, 1, 0.3, '39b6b7b839ee8c2e9fae897eff488c73a52fa7a3f5e660a62f1d0c7c532a78e6', '2022-08-14 22:01:59'),
(33, 32, 10, 1, 0.4, '39b6b7b839ee8c2e9fae897eff488c73a52fa7a3f5e660a62f1d0c7c532a78e6', '2022-08-14 22:01:59'),
(34, 32, 10, 1, 0.5, '39b6b7b839ee8c2e9fae897eff488c73a52fa7a3f5e660a62f1d0c7c532a78e6', '2022-08-14 22:02:00'),
(35, 32, 10, 1, 0.6, '39b6b7b839ee8c2e9fae897eff488c73a52fa7a3f5e660a62f1d0c7c532a78e6', '2022-08-14 22:02:00'),
(36, 32, 10, 1, 0.7, '39b6b7b839ee8c2e9fae897eff488c73a52fa7a3f5e660a62f1d0c7c532a78e6', '2022-08-14 22:02:00'),
(37, 32, 10, 1, 0.1, '91f4f40a1948a886ece5f761ef025888a795f2a6b97a419681e93a60e47a3572', '2022-08-15 20:36:25'),
(38, 32, 10, 1, 0.2, '91f4f40a1948a886ece5f761ef025888a795f2a6b97a419681e93a60e47a3572', '2022-08-15 20:36:25'),
(39, 32, 10, 1, 0.3, '91f4f40a1948a886ece5f761ef025888a795f2a6b97a419681e93a60e47a3572', '2022-08-15 20:36:38'),
(40, 32, 10, 1, 0.4, '91f4f40a1948a886ece5f761ef025888a795f2a6b97a419681e93a60e47a3572', '2022-08-15 20:36:38'),
(41, 32, 10, 1, 0.5, '91f4f40a1948a886ece5f761ef025888a795f2a6b97a419681e93a60e47a3572', '2022-08-15 20:36:39'),
(42, 32, 10, 1, 0.6, '91f4f40a1948a886ece5f761ef025888a795f2a6b97a419681e93a60e47a3572', '2022-08-15 20:36:39'),
(43, 32, 10, 1, 0.7, '91f4f40a1948a886ece5f761ef025888a795f2a6b97a419681e93a60e47a3572', '2022-08-15 20:36:39'),
(44, 32, 10, 1, 0.8, '91f4f40a1948a886ece5f761ef025888a795f2a6b97a419681e93a60e47a3572', '2022-08-15 20:36:40'),
(45, 35, 10, 1, 0.1, 'c44bba3328d4e8008579678b413e6456e3c1eb81f9d949c433720a92bdc068b3', '2022-08-23 17:22:26'),
(46, 35, 10, 13, 0.1, '77b6b33880a4a76725058a7daefe0ecdff8b76d82867a4e09b49341d10ef975d', '2022-08-23 17:28:23'),
(47, 35, 10, 13, 0.2, '77b6b33880a4a76725058a7daefe0ecdff8b76d82867a4e09b49341d10ef975d', '2022-08-23 17:28:23'),
(48, 35, 10, 13, 0.3, '77b6b33880a4a76725058a7daefe0ecdff8b76d82867a4e09b49341d10ef975d', '2022-08-23 17:28:23'),
(49, 35, 10, 13, 0.4, '77b6b33880a4a76725058a7daefe0ecdff8b76d82867a4e09b49341d10ef975d', '2022-08-23 17:28:23'),
(50, 35, 10, 13, 0.5, '77b6b33880a4a76725058a7daefe0ecdff8b76d82867a4e09b49341d10ef975d', '2022-08-23 17:28:28'),
(51, 35, 10, 13, 0.6, '77b6b33880a4a76725058a7daefe0ecdff8b76d82867a4e09b49341d10ef975d', '2022-08-23 17:28:29'),
(52, 35, 10, 13, 0.7, '77b6b33880a4a76725058a7daefe0ecdff8b76d82867a4e09b49341d10ef975d', '2022-08-23 17:28:29'),
(53, 35, 10, 13, 0.8, '77b6b33880a4a76725058a7daefe0ecdff8b76d82867a4e09b49341d10ef975d', '2022-08-23 17:28:44'),
(54, 35, 10, 1, 0.1, '7d167637d664a6caaf9ad3f5d5a4632ca9e8131356a72475b2819167387fb60d', '2022-08-23 19:28:43'),
(55, 35, 10, 1, 0.2, '7d167637d664a6caaf9ad3f5d5a4632ca9e8131356a72475b2819167387fb60d', '2022-08-23 19:28:43'),
(56, 35, 13, 1, 1, 'c84c307959894b6ed243f553ef2cbe34d274561270f80f7819b7f47b601c61ae', '2022-08-24 05:13:22'),
(57, 35, 13, 1, 2, 'c84c307959894b6ed243f553ef2cbe34d274561270f80f7819b7f47b601c61ae', '2022-08-24 05:13:22'),
(58, 35, 13, 1, 3, 'c84c307959894b6ed243f553ef2cbe34d274561270f80f7819b7f47b601c61ae', '2022-08-24 05:13:23'),
(59, 35, 13, 1, 4, 'c84c307959894b6ed243f553ef2cbe34d274561270f80f7819b7f47b601c61ae', '2022-08-24 05:13:24'),
(60, 35, 13, 1, 5, 'c84c307959894b6ed243f553ef2cbe34d274561270f80f7819b7f47b601c61ae', '2022-08-24 05:13:25'),
(61, 35, 13, 1, 6, 'c84c307959894b6ed243f553ef2cbe34d274561270f80f7819b7f47b601c61ae', '2022-08-24 05:13:25'),
(62, 35, 13, 1, 7, 'c84c307959894b6ed243f553ef2cbe34d274561270f80f7819b7f47b601c61ae', '2022-08-24 05:13:25'),
(63, 35, 13, 1, 8, 'c84c307959894b6ed243f553ef2cbe34d274561270f80f7819b7f47b601c61ae', '2022-08-24 05:13:25'),
(64, 35, 13, 1, 9, 'c84c307959894b6ed243f553ef2cbe34d274561270f80f7819b7f47b601c61ae', '2022-08-24 05:13:25'),
(65, 35, 13, 1, 10, 'c84c307959894b6ed243f553ef2cbe34d274561270f80f7819b7f47b601c61ae', '2022-08-24 05:13:26'),
(66, 35, 13, 1, 11, 'c84c307959894b6ed243f553ef2cbe34d274561270f80f7819b7f47b601c61ae', '2022-08-24 05:13:26'),
(67, 35, 13, 1, 1, '093caab1a1119aba74ac11034696103dd9a2fadb7e2b31449b68fae73d8b724c', '2022-09-01 18:57:34'),
(68, 35, 13, 1, 2, '093caab1a1119aba74ac11034696103dd9a2fadb7e2b31449b68fae73d8b724c', '2022-09-01 18:57:34'),
(69, 35, 10, 1, 0.1, '093caab1a1119aba74ac11034696103dd9a2fadb7e2b31449b68fae73d8b724c', '2022-09-01 18:57:37'),
(70, 35, 10, 1, 0.2, '093caab1a1119aba74ac11034696103dd9a2fadb7e2b31449b68fae73d8b724c', '2022-09-01 18:57:37'),
(71, 37, 13, 1, 1, '684eddbde9a1d5399dcd43bbc8368683742eee9bef2a1acd46a7424604da6250', '2022-10-20 18:49:18'),
(72, 37, 10, 1, 0.1, '684eddbde9a1d5399dcd43bbc8368683742eee9bef2a1acd46a7424604da6250', '2022-10-20 18:49:19'),
(73, 37, 10, 1, 0.2, '684eddbde9a1d5399dcd43bbc8368683742eee9bef2a1acd46a7424604da6250', '2022-10-20 18:49:21'),
(74, 37, 10, 1, 0.3, '684eddbde9a1d5399dcd43bbc8368683742eee9bef2a1acd46a7424604da6250', '2022-10-20 18:49:21'),
(75, 37, 10, 1, 0.1, '461111413fac402bdda8ebdeed44f72b5e72738e0e1980a8463a7bdae5146580', '2022-11-08 02:32:52'),
(76, 37, 13, 1, 1, '461111413fac402bdda8ebdeed44f72b5e72738e0e1980a8463a7bdae5146580', '2022-11-08 02:32:53'),
(77, 38, 14, 1, 0, '5a5654c8b257d9a10c09f1811ebbdf588c4fbac764cd013b164553642e7571a1', '2022-11-15 03:54:12'),
(78, 38, 14, 1, 0, '933cf645ce102b86caaa7eadc51cc22ffb4c942f52b5e12e93900f3ceb252e0c', '2022-11-15 04:04:21'),
(79, 38, 14, 1, 0, '71c253d3b8f921b0ca841e1fd3cdff01ce30b36a60a9d6eb50f7cd6d103f2cf3', '2022-11-15 04:12:46'),
(80, 38, 14, 1, 0, '809948b1132f708da5222e811b353f13dec78ed6cbe1ce519462e78db7d20138', '2022-11-15 04:13:30'),
(81, 38, 14, 1, 0, '809948b1132f708da5222e811b353f1387c03b7bae18846c014d594475ad26fb', '2022-11-15 04:13:52'),
(82, 38, 14, 1, 0, '030e26d1c3e6a357c7a9d2f463e1b923c3b18199adaff0fbd088501e56e125d5', '2022-11-15 04:15:18'),
(83, 38, 14, 1, 0, '030e26d1c3e6a357c7a9d2f463e1b923c213636756a47043f2618fc6650a515b', '2022-11-15 04:15:55'),
(84, 38, 14, 1, 0, '75dec924dbf01f2378b4d562fd38728169e7173e721de31e8394e49f3e80b18d', '2022-11-15 06:00:43'),
(85, 38, 14, 1, 0, '9ac465c6f055ee6f4df44b240e03aab828d0d824b83476419a41fdfc76481612', '2022-11-15 06:18:16'),
(86, 38, 14, 1, 0, '879eb0b7317a28ecddaf6a0f2e725eb43fa1276a87a607b7111e3dd76c55b7f4', '2022-11-15 09:02:28'),
(87, 38, 14, 1, 0, 'cde307dab781f361ddfad4d1859e689fee9fe0f16543d3a913a8393ab3b53ac6', '2022-11-16 21:18:58'),
(88, 38, 14, 1, 0, 'e93adf8755363489d5d6db905824290a61d850c8275ca81c602a85ab97f9e94f', '2022-11-19 03:49:21'),
(89, 38, 14, 1, 0, '5258c01e0daf0b9a62283a51802b65c8e19f749306d1660fbee26a88d447d3b6', '2022-11-19 09:27:15'),
(90, 38, 14, 1, 0, 'adf7592dc9214de12378b00b6bb625d1604bdf42018e33dbf150ae3823408462', '2022-11-24 15:43:41'),
(91, 38, 14, 1, 0, '138dd3c110c644747a1f4b9db5bc03523cdb0c97bebe50a1ca950d0c4663afc7', '2022-11-24 15:44:07'),
(92, 38, 14, 1, 0, 'e6717477d0325357db03c799705e4f5cbc8d645b081bfc1786682098889bec1a', '2022-11-24 15:45:32'),
(93, 38, 14, 1, 0, 'e46c408b18f802433cdb886961a440514a3f72b1050179c192d5a3693884ca5e', '2022-11-24 15:46:26'),
(94, 38, 14, 1, 0, 'ccfb119592d959fcb7587d21ec8c245cb869d5317f888bb2d6cce418d22a0e67', '2022-11-24 15:48:28'),
(95, 38, 14, 1, 0, '6b9e340d340ede4d6f5bec6c5a41ad1ce5ed5691f43e5d19e5bc4a459696cbfd', '2022-11-24 15:50:45'),
(96, 38, 14, 1, 0, '31c08ef0246300586c55ef49f09b74a7cba84bc6bfb5ee29a7fd88ccd6749627', '2022-11-24 15:51:25'),
(97, 38, 14, 1, 0, '31c08ef0246300586c55ef49f09b74a77bb82859d5ebc7dc3ef3b28c578f73ef', '2022-11-24 15:51:46'),
(98, 38, 14, 1, 0, '7590495c85b317741dd6ac07cc18078d043e3a55f379781b5253b2f40b1d0210', '2022-11-24 16:02:02'),
(99, 38, 14, 1, 0, '7590495c85b317741dd6ac07cc18078d964796fc2b35f0965af1291e96d65b9b', '2022-11-24 16:02:34'),
(100, 38, 14, 1, 0, '9e899b7ffb50ccb3f1d3203cbd557d2ee5b2463633821e66587426a56d0c0407', '2022-11-24 16:07:53'),
(101, 38, 14, 1, 0, '87523bd7964e313c437a3236c3d000fd42640219bdf83899a71440348055d154', '2022-11-24 16:50:21'),
(102, 38, 14, 1, 0, '87523bd7964e313c437a3236c3d000fdb32e37adcf196f03d2b785a7221c866b', '2022-11-24 16:50:44'),
(103, 38, 14, 1, 0, '87523bd7964e313c437a3236c3d000fd4b3700cff70ae2d808c388df244145c3', '2022-11-24 16:50:58'),
(104, 38, 14, 1, 0, '99032886c5220ca097abe253860bc5d9b2ac7c89667bb85bb8006ed777d0f297', '2022-11-24 17:04:37'),
(105, 38, 14, 1, 0, '9c3a93a37b8db3c5c5de750f9eea8f5a6986bc66c5aa84135fd0ccf37df67efd', '2022-11-24 17:28:26'),
(106, 38, 14, 1, 0, 'dea492dd3e2851a5d998435f7591a7afcb04bfaa2dc4d39cff698dab4a144d6b', '2022-11-24 17:35:05'),
(107, 38, 14, 1, 0, 'dea492dd3e2851a5d998435f7591a7afcb04bfaa2dc4d39cff698dab4a144d6b', '2022-11-24 17:36:56'),
(108, 38, 14, 1, 0, '11552ad8d4a14a73b241035ba734764286f1ccd60bbdbb097090e575ab89ca34', '2022-11-24 17:44:02'),
(109, 38, 14, 1, 0, '11552ad8d4a14a73b241035ba7347642a657e0c085e59ff88f885941ac0cc6af', '2022-11-24 17:44:12'),
(110, 38, 14, 1, 0, '2d6a9686ae4ef88fba2a562e6f8b41c4c310c1b5fd68d59d9a5194a04d10a2e9', '2022-11-24 17:47:57'),
(111, 38, 14, 1, 0, '2d6a9686ae4ef88fba2a562e6f8b41c4c310c1b5fd68d59d9a5194a04d10a2e9', '2022-11-24 17:48:42'),
(112, 38, 14, 1, 0, '2d6a9686ae4ef88fba2a562e6f8b41c4c310c1b5fd68d59d9a5194a04d10a2e9', '2022-11-24 17:49:52'),
(113, 38, 14, 1, 0, '4135d4f2f91cc829251f9659bd26391688b7c7f73b163cb8f2700dc73309f06e', '2022-11-24 17:57:23'),
(114, 38, 16, 1, 3, '4135d4f2f91cc829251f9659bd26391688b7c7f73b163cb8f2700dc73309f06e', '2022-11-24 17:57:23'),
(115, 38, 16, 1, 3, 'e7477b9c76f4f2c7f7b5a0cc757517c481de05e9f16cb56631282d95f4d62c57', '2022-11-24 18:15:10'),
(116, 38, 16, 1, 4, 'e7477b9c76f4f2c7f7b5a0cc757517c481de05e9f16cb56631282d95f4d62c57', '2022-11-24 18:16:01'),
(117, 38, 14, 1, 0, 'e7477b9c76f4f2c7f7b5a0cc757517c481de05e9f16cb56631282d95f4d62c57', '2022-11-24 18:16:01'),
(118, 46, 14, 1, 0, '707a4975fe5607d3ff984992c57844e98d96feb6277423fcdca7c0baf1ecbad5', '2022-11-25 05:45:22'),
(119, 46, 16, 1, 3, '707a4975fe5607d3ff984992c57844e98d96feb6277423fcdca7c0baf1ecbad5', '2022-11-25 05:45:22'),
(120, 48, 20, 1, 1, '47386cd777bc0c0136dae367329bcc1f035749538461f2530132c4979d22ad32', '2022-11-26 04:22:33'),
(121, 48, 19, 1, 1, '47386cd777bc0c0136dae367329bcc1f035749538461f2530132c4979d22ad32', '2022-11-26 04:22:45'),
(122, 48, 20, 1, 1, '75db4ed15c994b3fe28a441d960c35d93fea3264264b2c5929349e30e5d6fb52', '2022-11-26 04:24:40'),
(123, 48, 19, 1, 1, '75db4ed15c994b3fe28a441d960c35d93fea3264264b2c5929349e30e5d6fb52', '2022-11-26 04:24:42'),
(124, 48, 20, 1, 1, 'dd90939b847c5161c5fe3a482633f63b86a127d75851700ceffc2fabd7ac67c2', '2022-11-26 04:25:08'),
(125, 48, 19, 1, 1, 'dd90939b847c5161c5fe3a482633f63b86a127d75851700ceffc2fabd7ac67c2', '2022-11-26 04:25:16'),
(126, 48, 20, 1, 1, '1ed722c94e9dcfbd8c0667b4aed580602ec9618bb589d536c7c65663f48fb3bf', '2022-11-26 04:37:54'),
(127, 48, 20, 1, 1, '4a6cad8ffc6ad9db9ec403a971c3bebba03329cdad8287fe73118725cecdf728', '2022-11-26 04:42:43'),
(128, 48, 19, 1, 1, '4a6cad8ffc6ad9db9ec403a971c3bebba03329cdad8287fe73118725cecdf728', '2022-11-26 04:42:45'),
(129, 48, 20, 1, 1, 'f111c4588a11fb0947b43607a8ea847ab151d4908cd2c6500c2e976cee77dd92', '2022-11-26 04:50:19'),
(130, 48, 20, 1, 1, '603efb67dc71695ce5dcb486cb9baa0f67dceaef98154184865c27077b3a4ecb', '2022-11-26 04:55:44'),
(131, 48, 19, 1, 1, '603efb67dc71695ce5dcb486cb9baa0f67dceaef98154184865c27077b3a4ecb', '2022-11-26 04:55:48'),
(132, 48, 20, 1, 1, '8489734efa536b49b87ff980622c369ad3a47b4546a2fbaa77a33758c4ca399d', '2022-11-26 04:57:47'),
(133, 48, 19, 1, 1, '8489734efa536b49b87ff980622c369ad3a47b4546a2fbaa77a33758c4ca399d', '2022-11-26 04:57:50'),
(134, 46, 16, 1, 3, '7ea44fe33bf17d03c6f135d27efda8376e6b0aad118be3f76869a1c057499e9c', '2022-11-26 04:58:12'),
(135, 46, 16, 1, 1, 'e0f946355c02ca7529411376ea0f278b985ea1e32d10b49826043d901ffdea40', '2022-11-26 05:03:11'),
(136, 46, 14, 1, 0, 'e0f946355c02ca7529411376ea0f278b985ea1e32d10b49826043d901ffdea40', '2022-11-26 05:03:11');

-- --------------------------------------------------------

--
-- Table structure for table `gsession_user_usage`
--

CREATE TABLE `gsession_user_usage` (
  `id` int NOT NULL,
  `session_id` int NOT NULL,
  `user_id` int NOT NULL,
  `is_start` tinyint(1) NOT NULL COMMENT '0=end,1=start',
  `play_nonce` varchar(100) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `gsession_user_usage`
--

INSERT INTO `gsession_user_usage` (`id`, `session_id`, `user_id`, `is_start`, `play_nonce`, `timestamp`) VALUES
(640, 32, 1, 1, '837d715bffc4bba0ac6e8fe3e9a3df7197fda05999e7d30af7d8df2bb10b9cb9', '2022-08-09 10:00:29'),
(641, 32, 1, 0, '837d715bffc4bba0ac6e8fe3e9a3df7197fda05999e7d30af7d8df2bb10b9cb9', '2022-08-09 10:00:31'),
(642, 32, 1, 1, 'c54563a43bde9ad89cb149b64c41e7d0a67b74462c36d2948c989e39da57d26c', '2022-08-09 10:08:03'),
(643, 32, 1, 1, 'c38d48dac90ff13ae499a460673556601ed501c182fe652442754b647b839070', '2022-08-09 10:10:17'),
(644, 32, 1, 1, 'e2137c5d9760fa21f84d90c43d33afb7cabd3a27c0584c1d8fc695f0d10f6f88', '2022-08-09 10:11:42'),
(645, 32, 1, 1, '42d9d333f6033fcd9560a95c3720df6eae2fd3c086e6b7ab9ae276634f80a295', '2022-08-09 10:17:18'),
(646, 32, 1, 1, 'caaa0ad329e3f782e2ee279f22dec23d036fc4c3ed4a823d4338d4da58b7415a', '2022-08-09 10:19:53'),
(647, 32, 1, 0, 'caaa0ad329e3f782e2ee279f22dec23d036fc4c3ed4a823d4338d4da58b7415a', '2022-08-09 10:20:53'),
(648, 32, 1, 1, 'fa30743f5b9d6f6afc096edbcfd4d111229a724fd3ffc537306aade4a4e9f68a', '2022-08-09 10:41:58'),
(649, 32, 1, 0, 'fa30743f5b9d6f6afc096edbcfd4d111229a724fd3ffc537306aade4a4e9f68a', '2022-08-09 10:42:02'),
(650, 32, 1, 1, '9fd919e082305078faf1a3ed42d87edbcb442156769489e5ce977efc1ab017fb', '2022-08-09 12:31:12'),
(651, 32, 1, 0, '9fd919e082305078faf1a3ed42d87edbcb442156769489e5ce977efc1ab017fb', '2022-08-09 12:31:20'),
(652, 32, 1, 1, '19d86cd16e088b897224e4893d830b162557c46b80857e778c44d00b1598c6f7', '2022-08-09 13:30:37'),
(653, 32, 1, 1, '76aaa31690f4c17d7b9573878de343a4594263a1a722d7d8b065ce7de660c2c2', '2022-08-09 13:32:34'),
(654, 32, 1, 0, '19d86cd16e088b897224e4893d830b162557c46b80857e778c44d00b1598c6f7', '2022-08-09 13:32:40'),
(655, 32, 1, 0, '76aaa31690f4c17d7b9573878de343a4594263a1a722d7d8b065ce7de660c2c2', '2022-08-09 13:32:40'),
(656, 32, 1, 1, '827a8745dcd2a172e0d392eacc44a831e8936d614c88be1d1775eb0191bcb006', '2022-08-09 13:37:14'),
(657, 32, 1, 0, '827a8745dcd2a172e0d392eacc44a831e8936d614c88be1d1775eb0191bcb006', '2022-08-09 13:43:28'),
(658, 32, 1, 1, 'a043e1d3589e28c1654033e0cc8b9a1816ef7dad0f18ec0f062073b7e8ddaff5', '2022-08-09 14:45:36'),
(659, 32, 1, 0, 'a043e1d3589e28c1654033e0cc8b9a1816ef7dad0f18ec0f062073b7e8ddaff5', '2022-08-09 14:45:38'),
(660, 32, 1, 1, 'd9b160b0722d9d993ba6ff2a23cecda8e0f84cb821372043ea21b2c6d4227adc', '2022-08-09 14:49:57'),
(661, 32, 1, 0, 'd9b160b0722d9d993ba6ff2a23cecda8e0f84cb821372043ea21b2c6d4227adc', '2022-08-09 14:50:37'),
(662, 32, 1, 1, '3354ab78aa32d6545b72207cd025b3124cac5a1b5cedf0e25f85af3eeba47503', '2022-08-09 14:50:38'),
(663, 32, 1, 0, '3354ab78aa32d6545b72207cd025b3124cac5a1b5cedf0e25f85af3eeba47503', '2022-08-09 14:57:09'),
(664, 32, 1, 1, '328ee99456f0290279aee2ae0a9c1b45ac2d5fbd0c3f02c2da41b0a7acd85735', '2022-08-09 14:57:13'),
(665, 32, 1, 0, '328ee99456f0290279aee2ae0a9c1b45ac2d5fbd0c3f02c2da41b0a7acd85735', '2022-08-09 14:58:36'),
(666, 32, 1, 1, '97e76de786fd963101027bd56902c3584454e8eec5652a55fcf5ee06cda01f7a', '2022-08-09 14:58:39'),
(667, 32, 1, 0, '97e76de786fd963101027bd56902c3584454e8eec5652a55fcf5ee06cda01f7a', '2022-08-09 14:58:53'),
(668, 32, 1, 1, '97e76de786fd963101027bd56902c358c3efafb8c30f16dc199528c4fb131a2a', '2022-08-09 14:58:56'),
(669, 32, 1, 0, '97e76de786fd963101027bd56902c358c3efafb8c30f16dc199528c4fb131a2a', '2022-08-09 15:00:00'),
(670, 32, 1, 1, '72ee16f8e0781efdaa6a1f54f3d8f9eae08912202a563be11cabfa6c50b405da', '2022-08-09 15:00:02'),
(671, 32, 1, 1, 'c0afe09950ad3492c5ed9b7d01b07d4e07a8094e806a41b596d2ee9665f6ecad', '2022-08-09 15:09:17'),
(672, 32, 1, 0, 'c0afe09950ad3492c5ed9b7d01b07d4e07a8094e806a41b596d2ee9665f6ecad', '2022-08-09 15:24:21'),
(673, 32, 1, 1, 'e2aa6e367d506ac367cd730416c5f1cc8fa2c1c6fcfed7199cb77e44bb1c12cb', '2022-08-09 15:24:23'),
(674, 32, 1, 0, 'e2aa6e367d506ac367cd730416c5f1cc8fa2c1c6fcfed7199cb77e44bb1c12cb', '2022-08-09 15:24:23'),
(675, 32, 1, 1, 'e2aa6e367d506ac367cd730416c5f1cc5e9299c915911662a66992d3e73b7b43', '2022-08-09 15:24:25'),
(676, 32, 1, 0, 'e2aa6e367d506ac367cd730416c5f1cc5e9299c915911662a66992d3e73b7b43', '2022-08-09 16:08:26'),
(677, 32, 1, 1, 'ebd6071b196cb8fd22051afcbd521552bd5bcd2c41e0d9108efe23573e0cd6a9', '2022-08-09 16:08:28'),
(678, 32, 1, 0, 'ebd6071b196cb8fd22051afcbd521552bd5bcd2c41e0d9108efe23573e0cd6a9', '2022-08-09 16:08:28'),
(679, 32, 1, 1, 'ebd6071b196cb8fd22051afcbd5215526e22633de40f119ff6a14a77a5371dbf', '2022-08-09 16:08:30'),
(680, 32, 1, 1, '27c9e5f7a9ca7fe7ac2d84ce9c92b2e48a36f42905bf6064e0fd070ceef8be5d', '2022-08-10 02:00:50'),
(681, 32, 1, 0, '27c9e5f7a9ca7fe7ac2d84ce9c92b2e48a36f42905bf6064e0fd070ceef8be5d', '2022-08-10 02:01:10'),
(682, 32, 1, 1, '90897ebab75ba1cb7c297c7c2bea67916830d18fc31a76826874490352c45b7a', '2022-08-10 02:01:11'),
(683, 32, 1, 0, '90897ebab75ba1cb7c297c7c2bea67916830d18fc31a76826874490352c45b7a', '2022-08-10 02:03:33'),
(684, 32, 1, 1, '70e6e81236b02e079472321f86a96aeaea10561604b2eb5517ab4de6e7326e04', '2022-08-10 02:03:36'),
(685, 32, 1, 0, '70e6e81236b02e079472321f86a96aeaea10561604b2eb5517ab4de6e7326e04', '2022-08-10 02:03:42'),
(686, 32, 1, 1, '0262399b408e8228ed6fe2646717a579fc59f1f4dd3408383b13d970d011efc9', '2022-08-10 02:07:25'),
(687, 32, 1, 0, '0262399b408e8228ed6fe2646717a579fc59f1f4dd3408383b13d970d011efc9', '2022-08-10 02:10:43'),
(688, 32, 1, 1, 'f259483fba6ad1662cfdebd87de4d7de89b113e005a4ac3279a77943c412fcdf', '2022-08-10 02:22:48'),
(689, 32, 1, 1, 'da0b62636c678b9407b7fbf7fb9d6410001a7dd612b51bdb94cf1885a29b9a12', '2022-08-10 02:23:19'),
(690, 32, 1, 0, 'da0b62636c678b9407b7fbf7fb9d6410001a7dd612b51bdb94cf1885a29b9a12', '2022-08-10 02:23:20'),
(691, 32, 1, 1, 'da0b62636c678b9407b7fbf7fb9d6410224f7b857db9b1384841519405c48d9e', '2022-08-10 02:23:20'),
(692, 32, 1, 0, 'da0b62636c678b9407b7fbf7fb9d6410224f7b857db9b1384841519405c48d9e', '2022-08-10 02:23:41'),
(693, 32, 1, 1, 'a698fa6223e3ee908cc8d2182748356a0c9bd64f56dfa7e74fa1853b2b88cc52', '2022-08-10 02:25:26'),
(694, 32, 1, 0, 'a698fa6223e3ee908cc8d2182748356a0c9bd64f56dfa7e74fa1853b2b88cc52', '2022-08-10 02:25:29'),
(695, 32, 1, 1, '96990417537ad0a34c25f6a1ec6cdd8da105090f0a7e99fb1d715fe2e2698b7d', '2022-08-10 03:21:54'),
(696, 32, 1, 0, '96990417537ad0a34c25f6a1ec6cdd8da105090f0a7e99fb1d715fe2e2698b7d', '2022-08-10 03:22:03'),
(697, 32, 1, 1, '5941e8be4176f5de4e74b37af0f22f849370d4526b71cb5a0a21b811b1755d78', '2022-08-10 03:22:05'),
(698, 32, 1, 0, '5941e8be4176f5de4e74b37af0f22f849370d4526b71cb5a0a21b811b1755d78', '2022-08-10 03:24:03'),
(699, 32, 1, 1, 'cc49b472ddb5d5a9bc9c51f3ac744be72788ec2a36d207626568eff64b078d87', '2022-08-10 03:24:05'),
(700, 32, 1, 0, 'cc49b472ddb5d5a9bc9c51f3ac744be72788ec2a36d207626568eff64b078d87', '2022-08-10 03:26:55'),
(701, 32, 1, 1, '0a8ebbea99c1d7ec87c451dd9f63af8c5bbf3cf20878033e90aab2f3d0de30b6', '2022-08-10 03:27:03'),
(702, 32, 1, 0, '0a8ebbea99c1d7ec87c451dd9f63af8c5bbf3cf20878033e90aab2f3d0de30b6', '2022-08-10 03:27:25'),
(703, 32, 1, 1, '0a8ebbea99c1d7ec87c451dd9f63af8c693eb885aae09778ffc6e9303c3909c7', '2022-08-10 03:27:26'),
(704, 32, 1, 0, '0a8ebbea99c1d7ec87c451dd9f63af8c693eb885aae09778ffc6e9303c3909c7', '2022-08-10 03:28:06'),
(705, 32, 1, 1, 'e11d21a1a17130d586eecda8b00c63c3ac8ef37c9ad6faa247ec07e87857749a', '2022-08-10 03:28:08'),
(706, 32, 1, 0, 'e11d21a1a17130d586eecda8b00c63c3ac8ef37c9ad6faa247ec07e87857749a', '2022-08-10 03:28:28'),
(707, 32, 1, 1, 'e11d21a1a17130d586eecda8b00c63c39947d3149f6f0ffa3849426df267fcdb', '2022-08-10 03:28:30'),
(708, 32, 1, 0, 'e11d21a1a17130d586eecda8b00c63c39947d3149f6f0ffa3849426df267fcdb', '2022-08-10 03:28:54'),
(709, 32, 1, 1, 'e11d21a1a17130d586eecda8b00c63c37e82428510a847d4c9edfb4e3cb6b5ea', '2022-08-10 03:28:56'),
(710, 32, 1, 0, 'e11d21a1a17130d586eecda8b00c63c37e82428510a847d4c9edfb4e3cb6b5ea', '2022-08-10 03:29:10'),
(711, 32, 1, 1, 'ccf661c6ec7f01a3ce70e84551df922661bd2ca6bafbd9bcebe1f9481e62ae66', '2022-08-10 03:29:11'),
(712, 32, 1, 0, 'ccf661c6ec7f01a3ce70e84551df922661bd2ca6bafbd9bcebe1f9481e62ae66', '2022-08-10 03:36:48'),
(713, 32, 1, 1, 'ce58afb98fddc22a95023ce02742d1c328cf2ff079bcafb58dff95c6f83637bf', '2022-08-10 03:36:53'),
(714, 32, 1, 0, 'ce58afb98fddc22a95023ce02742d1c328cf2ff079bcafb58dff95c6f83637bf', '2022-08-10 03:37:46'),
(715, 32, 1, 1, 'cb056a0b50e328587529284c093a771805a8743095fb1ec7cd82442b2ec131ba', '2022-08-10 03:37:50'),
(716, 32, 1, 0, 'cb056a0b50e328587529284c093a771805a8743095fb1ec7cd82442b2ec131ba', '2022-08-10 03:38:11'),
(717, 32, 1, 1, '3bd097ae9374f4f04ca2e669e309445bb5ba0dc3d6ff37a849d52a9605f21c7c', '2022-08-10 03:38:13'),
(718, 32, 1, 1, 'e46e17aace78ffa3e9df690dbac9f074f7aa1dd8a2170882ed51790e67a4070f', '2022-08-11 08:57:24'),
(719, 32, 1, 0, 'e46e17aace78ffa3e9df690dbac9f074f7aa1dd8a2170882ed51790e67a4070f', '2022-08-11 08:57:28'),
(720, 32, 1, 1, 'e46e17aace78ffa3e9df690dbac9f074c140e4d92b27f6a2f210aec97713690a', '2022-08-11 08:57:40'),
(721, 32, 1, 0, 'e46e17aace78ffa3e9df690dbac9f074c140e4d92b27f6a2f210aec97713690a', '2022-08-11 08:59:49'),
(722, 32, 1, 1, '53714f347ff90818fec06460143400560ba92a33f6c0292f17dec411c3250ef9', '2022-08-11 08:59:52'),
(723, 32, 1, 0, '53714f347ff90818fec06460143400560ba92a33f6c0292f17dec411c3250ef9', '2022-08-11 09:03:11'),
(724, 32, 1, 1, '48f00000be2c11c966683341ef020977abc170bef72e8f34c23ec9f4d411c0ee', '2022-08-11 09:03:15'),
(725, 32, 1, 0, '48f00000be2c11c966683341ef020977abc170bef72e8f34c23ec9f4d411c0ee', '2022-08-11 09:06:17'),
(726, 32, 1, 1, '534bc80d6dbaaded2dadb07582ae7dc4c304734c583da70eff38e029969e9a87', '2022-08-11 09:06:23'),
(727, 32, 1, 1, 'cc6a2c8e786c3f5183a208ff7d48afb6f9aa61d9d7a69a1c022e58d7a9e742ff', '2022-08-11 09:07:45'),
(728, 32, 1, 1, 'fef6ced286b5859c15cfc1577013d9e47edb0fdb4624a4a44abf041978069c89', '2022-08-11 09:09:05'),
(729, 32, 1, 1, '1d969b02b954b2473a9b0bf7c58c925d7d63f8d9bf1a9c37a25122e47b9df1a0', '2022-08-11 09:12:26'),
(730, 32, 1, 1, '2df961a90704c816722736665572e24d03ddb997d1c30f25198aaf069318e406', '2022-08-11 09:13:20'),
(731, 32, 1, 1, '3ec640f4cdf8f028b6c2480d61bfe5731edd951c4f270ab68e17d24ee5e1414f', '2022-08-11 09:14:28'),
(732, 32, 1, 1, '70b971ae4f9c76639e811241463c6c353011651c832d11ab9a2d56333a27c2b4', '2022-08-11 09:15:12'),
(733, 32, 1, 1, '2cf3cdcae5f151bb1a5a7e4f1d7f9f55272ecc3c0c5dc3b87676e755f0f36755', '2022-08-11 09:17:07'),
(734, 32, 1, 1, '3ae5991d524b2170cdb32adc95cf54649e73fabfa0310811484b8125070a76bc', '2022-08-11 09:19:24'),
(735, 32, 1, 1, 'fcff51781dc413607c9ddcbae26b747181817b7938541a753b4724e8da524d6e', '2022-08-11 09:21:05'),
(736, 32, 1, 1, 'fcff51781dc413607c9ddcbae26b74718d76fa96c6996b6f68461d2f70af30b9', '2022-08-11 09:21:42'),
(737, 32, 1, 1, 'd3de5308768f293fbc044f1489c57881c512367f986d7eee20caa710331dd9d5', '2022-08-11 09:22:42'),
(738, 32, 1, 1, '2f0e4f9880f2b54ddbf2ee6e1da0c43e0192d372ec4b9d73ae99a2aa3c41bd6c', '2022-08-11 09:23:02'),
(739, 32, 1, 1, '2f0e4f9880f2b54ddbf2ee6e1da0c43eabe9e93ae57f50703a3a13b510772fed', '2022-08-11 09:23:22'),
(740, 32, 1, 1, '2f0e4f9880f2b54ddbf2ee6e1da0c43eac9590e572a08ad429a9744bdc6234d4', '2022-08-11 09:23:34'),
(741, 32, 1, 1, 'a2c69573689349022ce906deb6a26942866be0ef9a311226bc882ff91677f723', '2022-08-11 09:24:08'),
(742, 32, 1, 1, 'a2c69573689349022ce906deb6a2694261a23c2647df140799b3000482750050', '2022-08-11 09:24:35'),
(743, 32, 1, 1, '7ee893a64e89a47fba06a909022a8010a12b0dfe3e18f4dd4707c799c6949858', '2022-08-11 09:25:51'),
(744, 32, 1, 1, '2ceab174694cb5b90a4e83b635d20cf0efb59ecf975c006ad65239d1fd5f1722', '2022-08-11 09:26:14'),
(745, 32, 1, 1, '332beed7ef03d4eb9af76633fef69b31705771a2dcefa80cecc92a485ec69869', '2022-08-11 09:28:23'),
(746, 32, 1, 1, '332beed7ef03d4eb9af76633fef69b31a613ddb6e35c7a5b0e30a708c3f20ceb', '2022-08-11 09:28:49'),
(747, 32, 1, 0, '332beed7ef03d4eb9af76633fef69b31a613ddb6e35c7a5b0e30a708c3f20ceb', '2022-08-11 09:36:38'),
(748, 32, 1, 1, '5257d2dfe1aa1a63ec4b4f68c7d8a7d4ae47e18f66222834622fd828dd826ba4', '2022-08-11 09:36:43'),
(749, 32, 1, 0, '5257d2dfe1aa1a63ec4b4f68c7d8a7d4ae47e18f66222834622fd828dd826ba4', '2022-08-11 09:37:36'),
(750, 32, 1, 1, '41f32f1f4e0944eeeaa8e73be017b35ce9ca5c6c2fe5a03bc3fc1870e1519048', '2022-08-11 09:37:38'),
(751, 32, 1, 0, '41f32f1f4e0944eeeaa8e73be017b35ce9ca5c6c2fe5a03bc3fc1870e1519048', '2022-08-11 09:38:02'),
(752, 32, 1, 1, 'f14063188424bf2c0ad20c3673719a609eeeefed0bb34217f8db96c7c918195c', '2022-08-11 09:51:32'),
(753, 32, 1, 0, 'f14063188424bf2c0ad20c3673719a609eeeefed0bb34217f8db96c7c918195c', '2022-08-11 09:52:46'),
(754, 32, 1, 1, '1eb38cafcbf783a2867a5dbb4846109722e54d2e4084cafe9b3b70a3a7714aea', '2022-08-11 09:52:47'),
(755, 32, 1, 1, 'c05cab1c189860de3bf63106394b5453fec52ab750d978464f78db6f8e0de94c', '2022-08-11 09:55:30'),
(756, 32, 1, 1, '6d781312a832ec36a9d52c56bfc133038bf3a68cefdc2c1a9fe644ea084b2a07', '2022-08-11 10:02:00'),
(757, 32, 1, 0, '6d781312a832ec36a9d52c56bfc133038bf3a68cefdc2c1a9fe644ea084b2a07', '2022-08-11 10:02:08'),
(758, 32, 1, 1, '6d781312a832ec36a9d52c56bfc13303e0abc5543f43d465c7b73d1226d02b12', '2022-08-11 10:02:08'),
(759, 32, 1, 1, '4106114ef92c7bb5acee1ef355214720fdeee03e8eab0f6a351b8a5da0f3d8ad', '2022-08-11 10:03:20'),
(760, 32, 1, 0, '4106114ef92c7bb5acee1ef355214720fdeee03e8eab0f6a351b8a5da0f3d8ad', '2022-08-11 10:03:24'),
(761, 32, 1, 1, '4106114ef92c7bb5acee1ef355214720e7bfcd23d8cd08d402712a2302d1e6e6', '2022-08-11 10:03:53'),
(762, 32, 1, 0, '4106114ef92c7bb5acee1ef355214720e7bfcd23d8cd08d402712a2302d1e6e6', '2022-08-11 10:03:58'),
(763, 32, 1, 1, '83bda1fc4330fc69c20118025afaec9744fd8d900253fb58f7a24bc36a16c546', '2022-08-11 10:04:06'),
(764, 32, 1, 0, '83bda1fc4330fc69c20118025afaec9744fd8d900253fb58f7a24bc36a16c546', '2022-08-11 10:04:11'),
(765, 32, 1, 1, '83bda1fc4330fc69c20118025afaec97784f267c919abeae399e2a3cc26a264f', '2022-08-11 10:04:16'),
(766, 32, 1, 0, '83bda1fc4330fc69c20118025afaec97784f267c919abeae399e2a3cc26a264f', '2022-08-11 10:04:25'),
(767, 32, 1, 1, '32ed205a847ac7807037959fee8f463be8cc79292efa2060c0e1f2c01f1985d7', '2022-08-11 10:15:18'),
(768, 32, 1, 1, '50c16fd01365288a4104795189be56f4fb6ca201ead4e5f150f2152b5bbff5b8', '2022-08-11 10:16:39'),
(769, 32, 1, 0, '50c16fd01365288a4104795189be56f4fb6ca201ead4e5f150f2152b5bbff5b8', '2022-08-11 10:16:42'),
(770, 32, 1, 1, '50c16fd01365288a4104795189be56f470117f950596124ab5efc529205fc0f2', '2022-08-11 10:16:45'),
(771, 32, 1, 0, '50c16fd01365288a4104795189be56f470117f950596124ab5efc529205fc0f2', '2022-08-11 10:27:35'),
(772, 32, 1, 1, '0e493c1131fa27914cdb4ec8e4796b81fd1787420a6b3afedc6a739586333326', '2022-08-11 10:27:37'),
(773, 32, 1, 0, '0e493c1131fa27914cdb4ec8e4796b81fd1787420a6b3afedc6a739586333326', '2022-08-11 10:32:50'),
(774, 32, 1, 1, '8bd5e4690be4979d352c2ec5bd1758c7531a00fa575a3f65728b78a838bc585f', '2022-08-11 10:32:54'),
(775, 32, 1, 0, '8bd5e4690be4979d352c2ec5bd1758c7531a00fa575a3f65728b78a838bc585f', '2022-08-11 10:33:40'),
(776, 32, 1, 1, 'ab48a351840b35be00572012fdbaa6074696151838294ab4a328cae545614fca', '2022-08-11 10:33:42'),
(777, 32, 1, 0, 'ab48a351840b35be00572012fdbaa6074696151838294ab4a328cae545614fca', '2022-08-11 10:34:02'),
(778, 32, 1, 1, '98e1808e8f3a5f9a13ba1e475a34840fc727ba5d7cf4de41807579919df1324a', '2022-08-11 10:34:05'),
(779, 32, 1, 0, '98e1808e8f3a5f9a13ba1e475a34840fc727ba5d7cf4de41807579919df1324a', '2022-08-11 10:40:47'),
(780, 32, 1, 1, 'd91c8b919d938a1974ffe32062d3eba57796452a0b9619bbc7d3067d51fd671d', '2022-08-11 10:40:51'),
(781, 32, 1, 0, 'd91c8b919d938a1974ffe32062d3eba57796452a0b9619bbc7d3067d51fd671d', '2022-08-11 10:51:31'),
(782, 32, 1, 1, '6bd07531b3ddd6a5eddf942697ca82b57a29d5a41ba56f915f48902629f23d16', '2022-08-11 10:51:35'),
(783, 32, 1, 0, '6bd07531b3ddd6a5eddf942697ca82b57a29d5a41ba56f915f48902629f23d16', '2022-08-11 10:53:41'),
(784, 32, 1, 1, 'b1fe5c5daa6d32a97249701e79ca0f49b0be13245f7ca65346f41ff1626fd5d0', '2022-08-11 10:53:44'),
(785, 32, 1, 0, 'b1fe5c5daa6d32a97249701e79ca0f49b0be13245f7ca65346f41ff1626fd5d0', '2022-08-11 10:54:55'),
(786, 32, 1, 1, 'b6b1c072455aaa4a7ae6eb086c2e8fec27bcd54aca6295ab3ec458bd56ddee85', '2022-08-11 10:54:58'),
(787, 32, 1, 0, 'b6b1c072455aaa4a7ae6eb086c2e8fec27bcd54aca6295ab3ec458bd56ddee85', '2022-08-11 10:55:59'),
(788, 32, 1, 1, '9f9cf20cfbe3db2b24a143594d2e38e732309b9a4dd224aae763ecff07bbdfd3', '2022-08-11 10:56:04'),
(789, 32, 1, 0, '9f9cf20cfbe3db2b24a143594d2e38e732309b9a4dd224aae763ecff07bbdfd3', '2022-08-11 11:00:07'),
(790, 32, 1, 1, '238835774ea9e15f263dc99bb58dcb26a03aaba5039ea0850490ae5fb04f29f6', '2022-08-11 11:00:46'),
(791, 32, 1, 0, '238835774ea9e15f263dc99bb58dcb26a03aaba5039ea0850490ae5fb04f29f6', '2022-08-11 11:00:56'),
(792, 32, 1, 1, '376eb7fe2b0b48c4224c390fda1638c90752853fda1f28ff54e94f8c92ebe239', '2022-08-11 11:01:26'),
(793, 32, 1, 0, '376eb7fe2b0b48c4224c390fda1638c90752853fda1f28ff54e94f8c92ebe239', '2022-08-11 11:04:05'),
(794, 32, 1, 1, 'e69fa483159f3d2bef147f36f761d947caaf627943acb3d34c21d2f9190c6de2', '2022-08-11 11:04:50'),
(795, 32, 1, 0, 'e69fa483159f3d2bef147f36f761d947caaf627943acb3d34c21d2f9190c6de2', '2022-08-11 11:05:18'),
(796, 32, 1, 1, 'da7c5a016cc04ff57c60ad90a7a3eebadb35c9146d09acd85f5363fe0a49df34', '2022-08-11 11:05:20'),
(797, 32, 1, 1, '6074e6c9457cd5694d906d8e04baa3a6b3238d66ae17336c59608eeee258ec1c', '2022-08-11 11:08:16'),
(798, 32, 1, 0, '6074e6c9457cd5694d906d8e04baa3a6b3238d66ae17336c59608eeee258ec1c', '2022-08-11 11:09:13'),
(799, 32, 1, 1, 'a846493ca5285e64bd2f76a6c83510c8fcc41e2e9eefaaf0898c4982e5cfe952', '2022-08-11 11:09:18'),
(800, 32, 1, 1, 'c5275ae4f07320aedee9e97113de92eb4cf8426754405381b970ea70e681f92f', '2022-08-11 11:10:13'),
(801, 32, 1, 0, 'c5275ae4f07320aedee9e97113de92eb4cf8426754405381b970ea70e681f92f', '2022-08-11 11:10:39'),
(802, 32, 1, 1, 'd38a6c5ec821c73dc4bf624e99c483cea25cc3c3d0c5ee7c4b6760b1b8a8ef36', '2022-08-11 11:44:22'),
(803, 32, 1, 0, 'd38a6c5ec821c73dc4bf624e99c483cea25cc3c3d0c5ee7c4b6760b1b8a8ef36', '2022-08-11 11:45:55'),
(804, 32, 1, 1, 'e38aab416db96f95e620ad135cea8206929758243fd32d7c9786af117e810453', '2022-08-11 11:45:57'),
(805, 32, 1, 0, 'e38aab416db96f95e620ad135cea8206929758243fd32d7c9786af117e810453', '2022-08-11 11:46:58'),
(806, 32, 1, 1, 'b4e5fa45df66f1eea0d8758a5deba7ddcc2b1c2a1151e67199186cf51631c1ea', '2022-08-11 11:47:01'),
(807, 32, 1, 0, 'b4e5fa45df66f1eea0d8758a5deba7ddcc2b1c2a1151e67199186cf51631c1ea', '2022-08-11 11:47:25'),
(808, 32, 1, 1, 'b4e5fa45df66f1eea0d8758a5deba7dd29517ae6dd177df801e370b583edf36f', '2022-08-11 11:47:25'),
(809, 32, 1, 0, 'b4e5fa45df66f1eea0d8758a5deba7dd29517ae6dd177df801e370b583edf36f', '2022-08-11 11:50:18'),
(810, 32, 1, 1, 'c292f067f67224fbfe8123ac691a60a87a150324e89edefacba79c2ee7b9ed94', '2022-08-11 11:59:05'),
(811, 32, 1, 0, 'c292f067f67224fbfe8123ac691a60a87a150324e89edefacba79c2ee7b9ed94', '2022-08-11 11:59:20'),
(812, 32, 1, 1, '9bff5de1f2f9160a2b7f4c7debdc7d3b82b87d5d8a085752a4729fcbbfa7ba0b', '2022-08-13 20:41:58'),
(813, 32, 1, 0, '9bff5de1f2f9160a2b7f4c7debdc7d3b82b87d5d8a085752a4729fcbbfa7ba0b', '2022-08-13 20:42:03'),
(814, 32, 1, 1, '0712a8423c6ad8ca4c4b3b8aa42c0b3274ee30c98aa975ade2cb2c4ca38f1e84', '2022-08-13 20:48:18'),
(815, 32, 1, 0, '0712a8423c6ad8ca4c4b3b8aa42c0b3274ee30c98aa975ade2cb2c4ca38f1e84', '2022-08-13 20:48:24'),
(816, 32, 1, 1, '4c484467b45967e45846471dad99c0cfd45fd685e423396252ccf8ecfa01e01c', '2022-08-13 20:49:09'),
(817, 32, 1, 0, '4c484467b45967e45846471dad99c0cfd45fd685e423396252ccf8ecfa01e01c', '2022-08-13 20:49:12'),
(818, 32, 1, 1, 'c278bd4f73a44f8beebcf27f3873eb54a6d76f185519241e63c1c3916941fab8', '2022-08-13 21:01:18'),
(819, 32, 1, 0, 'c278bd4f73a44f8beebcf27f3873eb54a6d76f185519241e63c1c3916941fab8', '2022-08-13 21:01:21'),
(820, 32, 1, 1, 'bf78182abc873abfefbb033acd09e3d3878aa8140effbb97821a51ea4bcfb777', '2022-08-13 21:09:28'),
(821, 32, 1, 0, 'bf78182abc873abfefbb033acd09e3d3878aa8140effbb97821a51ea4bcfb777', '2022-08-13 21:09:55'),
(822, 32, 1, 1, 'b90f17a9e6533c5f294bcfc4bc3b2a0abf0d98501054f550b4ddec6fd5e29a06', '2022-08-13 21:43:45'),
(823, 32, 1, 0, 'b90f17a9e6533c5f294bcfc4bc3b2a0abf0d98501054f550b4ddec6fd5e29a06', '2022-08-13 21:43:46'),
(824, 32, 1, 1, 'e4c5aa86a080123a4a9b56caac5bd3c8fff8c7101afd79598098775a67b557f0', '2022-08-13 23:47:30'),
(825, 32, 1, 0, 'e4c5aa86a080123a4a9b56caac5bd3c8fff8c7101afd79598098775a67b557f0', '2022-08-13 23:47:41'),
(826, 32, 1, 1, '97bdeedcbd815b5223ae444ad1fc088ce791295248b293908e67adda7242fd87', '2022-08-14 08:49:24'),
(827, 32, 1, 0, '97bdeedcbd815b5223ae444ad1fc088ce791295248b293908e67adda7242fd87', '2022-08-14 08:49:35'),
(828, 32, 1, 1, '39b6b7b839ee8c2e9fae897eff488c73a52fa7a3f5e660a62f1d0c7c532a78e6', '2022-08-14 22:00:56'),
(829, 32, 1, 0, '39b6b7b839ee8c2e9fae897eff488c73a52fa7a3f5e660a62f1d0c7c532a78e6', '2022-08-14 22:02:09'),
(830, 33, 1, 1, '553a5d45b381c3b4b36fc221ff2d50002e881f1f58a03068b0ba3b3e4fca39e3', '2022-08-15 19:54:14'),
(831, 33, 1, 0, '553a5d45b381c3b4b36fc221ff2d50002e881f1f58a03068b0ba3b3e4fca39e3', '2022-08-15 19:55:14'),
(832, 33, 1, 1, 'db6983b2c9d9081566c0f184f2ea734820fbc9b888a4ca1fdbdd149eb8e62e7f', '2022-08-15 19:56:26'),
(833, 33, 1, 0, 'db6983b2c9d9081566c0f184f2ea734820fbc9b888a4ca1fdbdd149eb8e62e7f', '2022-08-15 19:56:38'),
(834, 33, 1, 1, 'db6983b2c9d9081566c0f184f2ea73486c08e2f557aae0fa27b5ef5fc85b0d20', '2022-08-15 19:56:48'),
(835, 33, 1, 0, 'db6983b2c9d9081566c0f184f2ea73486c08e2f557aae0fa27b5ef5fc85b0d20', '2022-08-15 19:56:54'),
(836, 33, 1, 1, 'e1796a0830c870f89437229522ef1eca4c94dff71f648be449a357bed9f33eb4', '2022-08-15 20:07:36'),
(837, 33, 1, 0, 'e1796a0830c870f89437229522ef1eca4c94dff71f648be449a357bed9f33eb4', '2022-08-15 20:07:43'),
(838, 33, 1, 1, 'e1796a0830c870f89437229522ef1eca2ab255b90ca78558620c97fc856f9164', '2022-08-15 20:07:51'),
(839, 33, 1, 0, 'e1796a0830c870f89437229522ef1eca2ab255b90ca78558620c97fc856f9164', '2022-08-15 20:08:02'),
(840, 33, 1, 1, '4ddbe2be79b28e55c708d01746cfd72f685679407736a157fa2499f7f989f22a', '2022-08-15 20:17:02'),
(841, 33, 1, 0, '4ddbe2be79b28e55c708d01746cfd72f685679407736a157fa2499f7f989f22a', '2022-08-15 20:17:09'),
(842, 33, 1, 1, '75a784afe5bc4986ebc30c5bf378eaf0dc8a36b5de4d988c6ecb2ca7248e0496', '2022-08-15 20:25:03'),
(843, 33, 1, 0, '75a784afe5bc4986ebc30c5bf378eaf0dc8a36b5de4d988c6ecb2ca7248e0496', '2022-08-15 20:25:32'),
(844, 33, 1, 1, '75a784afe5bc4986ebc30c5bf378eaf0788efca12f86e184cbba8a2e76f6601d', '2022-08-15 20:25:33'),
(845, 33, 1, 0, '75a784afe5bc4986ebc30c5bf378eaf0788efca12f86e184cbba8a2e76f6601d', '2022-08-15 20:25:50'),
(846, 33, 1, 1, '75a784afe5bc4986ebc30c5bf378eaf0af4010b6d0ffc25c38e96a78eadd5eec', '2022-08-15 20:25:51'),
(847, 33, 1, 0, '75a784afe5bc4986ebc30c5bf378eaf0af4010b6d0ffc25c38e96a78eadd5eec', '2022-08-15 20:26:06'),
(848, 33, 1, 1, '234b49282f3ee4b6266a43b95bdc4de09c488a4b06e98c572ed7c52e45e8f4f6', '2022-08-15 20:26:06'),
(849, 33, 1, 0, '234b49282f3ee4b6266a43b95bdc4de09c488a4b06e98c572ed7c52e45e8f4f6', '2022-08-15 20:26:11'),
(850, 32, 1, 1, '91f4f40a1948a886ece5f761ef025888a795f2a6b97a419681e93a60e47a3572', '2022-08-15 20:36:22'),
(851, 32, 1, 0, '91f4f40a1948a886ece5f761ef025888a795f2a6b97a419681e93a60e47a3572', '2022-08-15 20:36:50'),
(852, 34, 1, 1, 'e7ee00b30d7be10ff4bf9c6c340c6b70cc53ffe141534a88a0586f86d8252c93', '2022-08-16 05:47:38'),
(853, 34, 1, 1, '880c7fdcb35004fcc921bff9405eb5cd1aeff65359244179e2277b838821138e', '2022-08-16 05:48:24'),
(854, 34, 1, 0, '880c7fdcb35004fcc921bff9405eb5cd1aeff65359244179e2277b838821138e', '2022-08-16 05:48:43'),
(855, 34, 1, 0, 'e7ee00b30d7be10ff4bf9c6c340c6b70cc53ffe141534a88a0586f86d8252c93', '2022-08-16 05:49:39'),
(856, 34, 1, 1, '30ca3abc8e8731039afac1bd536fa0109c330cd5b7b9b891f1651508408be419', '2022-08-16 05:49:51'),
(857, 34, 1, 0, '30ca3abc8e8731039afac1bd536fa0109c330cd5b7b9b891f1651508408be419', '2022-08-16 05:49:55'),
(858, 34, 1, 1, '7b6d7408f393395f17d90f344536c17b381f269774fcd9e2e425f92f8a1f7d50', '2022-08-16 05:52:10'),
(859, 34, 1, 0, '7b6d7408f393395f17d90f344536c17b381f269774fcd9e2e425f92f8a1f7d50', '2022-08-16 05:52:16'),
(860, 34, 1, 1, '7b6d7408f393395f17d90f344536c17b8cd3266a43a756257298cd813c0a3e9d', '2022-08-16 05:52:17'),
(861, 34, 1, 0, '7b6d7408f393395f17d90f344536c17b8cd3266a43a756257298cd813c0a3e9d', '2022-08-16 05:52:20'),
(862, 34, 1, 1, 'cc1e676a17900c853d88e7bce90cf3ec771fde175f5d7cf1ed9cd0f0435a082e', '2022-08-16 05:55:13'),
(863, 34, 1, 1, 'cc1e676a17900c853d88e7bce90cf3eca494f605f5cd22f9b3ff28f47e2a637d', '2022-08-16 05:55:48'),
(864, 34, 1, 0, 'cc1e676a17900c853d88e7bce90cf3ec771fde175f5d7cf1ed9cd0f0435a082e', '2022-08-16 05:55:49'),
(865, 34, 1, 0, 'cc1e676a17900c853d88e7bce90cf3eca494f605f5cd22f9b3ff28f47e2a637d', '2022-08-16 05:55:53'),
(866, 34, 1, 1, '95b5e038489ce803639bbf6bbd8631eb7eb009d72da38d6e3c86ee981fbf6671', '2022-08-16 06:05:01'),
(867, 34, 1, 0, '95b5e038489ce803639bbf6bbd8631eb7eb009d72da38d6e3c86ee981fbf6671', '2022-08-16 06:05:28'),
(868, 32, 1, 1, '632c023ad8fb94ab8624dd2f13bd55f2eede159b6f0275e272c504f702a98b75', '2022-08-23 17:07:53'),
(869, 32, 1, 0, '632c023ad8fb94ab8624dd2f13bd55f2eede159b6f0275e272c504f702a98b75', '2022-08-23 17:08:18'),
(870, 32, 1, 1, 'd03c2af858c603af876bba91a02384dec1d88d4c6204db9615ded2543ae1d63c', '2022-08-23 17:11:02'),
(871, 32, 1, 0, 'd03c2af858c603af876bba91a02384dec1d88d4c6204db9615ded2543ae1d63c', '2022-08-23 17:11:48'),
(872, 32, 1, 1, 'd03c2af858c603af876bba91a02384de6bcc65c5a6ac7658fa37556102684619', '2022-08-23 17:11:49'),
(873, 32, 1, 0, 'd03c2af858c603af876bba91a02384de6bcc65c5a6ac7658fa37556102684619', '2022-08-23 17:12:50'),
(874, 32, 1, 1, '40797c1e7825f65d9abe75e0493d4f002dd1ec0120eccb25361cdb83c23b72a3', '2022-08-23 17:12:52'),
(875, 32, 1, 1, 'c515e71e94f79871576e467c29ba276626928453ce6d77b145e8814e9ce08ff5', '2022-08-23 17:16:27'),
(876, 32, 1, 1, '535fd0b8884ba37ed9439857e61863963c9b8bf85b5fb2922f987b8918f65721', '2022-08-23 17:21:00'),
(877, 32, 1, 1, 'c44bba3328d4e8008579678b413e6456c76acb8b60d6d885686ba2ae01481b07', '2022-08-23 17:21:19'),
(878, 32, 1, 0, 'c44bba3328d4e8008579678b413e6456c76acb8b60d6d885686ba2ae01481b07', '2022-08-23 17:21:24'),
(879, 32, 1, 1, 'c44bba3328d4e8008579678b413e645618c13dd25238516dbdd829533ace47b6', '2022-08-23 17:21:25'),
(880, 32, 1, 0, 'c44bba3328d4e8008579678b413e645618c13dd25238516dbdd829533ace47b6', '2022-08-23 17:21:27'),
(881, 35, 1, 1, 'c44bba3328d4e8008579678b413e6456e3c1eb81f9d949c433720a92bdc068b3', '2022-08-23 17:21:31'),
(882, 35, 1, 0, 'c44bba3328d4e8008579678b413e6456e3c1eb81f9d949c433720a92bdc068b3', '2022-08-23 17:22:27'),
(883, 35, 1, 1, 'ab4831645fbc6a80dde733af7f4b0a26e808ef3950319f43abb2f3e881535e3c', '2022-08-23 17:22:54'),
(884, 35, 1, 0, 'ab4831645fbc6a80dde733af7f4b0a26e808ef3950319f43abb2f3e881535e3c', '2022-08-23 17:23:18'),
(885, 35, 1, 1, '72e8a6c439ddebae5b91d303357919dfbd6d569d167fac123a4e0b35967b047d', '2022-08-23 17:23:23'),
(886, 35, 1, 0, '72e8a6c439ddebae5b91d303357919dfbd6d569d167fac123a4e0b35967b047d', '2022-08-23 17:23:34'),
(887, 34, 13, 1, '5ece58ac950897ca5457932a0092258db7438ef5bb4471952912324e06b19574', '2022-08-23 17:24:00'),
(888, 34, 13, 0, '5ece58ac950897ca5457932a0092258db7438ef5bb4471952912324e06b19574', '2022-08-23 17:24:03'),
(889, 34, 13, 1, '5ece58ac950897ca5457932a0092258dcb5f69cece709fa58bcdf5d940c9a0cc', '2022-08-23 17:24:04'),
(890, 34, 13, 0, '5ece58ac950897ca5457932a0092258dcb5f69cece709fa58bcdf5d940c9a0cc', '2022-08-23 17:24:04'),
(891, 35, 1, 1, '5ece58ac950897ca5457932a0092258ddee7110ed840f6af03a43e8aa78ab7a5', '2022-08-23 17:24:42'),
(892, 35, 1, 0, '5ece58ac950897ca5457932a0092258ddee7110ed840f6af03a43e8aa78ab7a5', '2022-08-23 17:24:52'),
(893, 34, 13, 1, 'ed44ed6eb4bfa008d40b9ccd4a518e1d4dcd131b65dcc0786d6d9234ffc8e7d7', '2022-08-23 17:26:51'),
(894, 34, 13, 0, 'ed44ed6eb4bfa008d40b9ccd4a518e1d4dcd131b65dcc0786d6d9234ffc8e7d7', '2022-08-23 17:27:30'),
(895, 34, 13, 1, 'e88b202b10465317353d6d259024293133bd7b83919ff3fa37e7c47dcb104c20', '2022-08-23 17:27:31'),
(896, 34, 13, 0, 'e88b202b10465317353d6d259024293133bd7b83919ff3fa37e7c47dcb104c20', '2022-08-23 17:28:20'),
(897, 35, 13, 1, '77b6b33880a4a76725058a7daefe0ecdff8b76d82867a4e09b49341d10ef975d', '2022-08-23 17:28:21'),
(898, 35, 13, 0, '77b6b33880a4a76725058a7daefe0ecdff8b76d82867a4e09b49341d10ef975d', '2022-08-23 17:28:49'),
(899, 35, 1, 1, '7d167637d664a6caaf9ad3f5d5a4632ca9e8131356a72475b2819167387fb60d', '2022-08-23 19:28:24'),
(900, 35, 1, 0, '7d167637d664a6caaf9ad3f5d5a4632ca9e8131356a72475b2819167387fb60d', '2022-08-23 19:30:30'),
(901, 35, 1, 1, 'f4d0d62850bc82a803006b596226f57efd841a9992c4853d64a39a00291f0410', '2022-08-24 05:12:42'),
(902, 35, 1, 0, 'f4d0d62850bc82a803006b596226f57efd841a9992c4853d64a39a00291f0410', '2022-08-24 05:12:45'),
(903, 35, 1, 1, 'c84c307959894b6ed243f553ef2cbe34d274561270f80f7819b7f47b601c61ae', '2022-08-24 05:13:19'),
(904, 35, 1, 0, 'c84c307959894b6ed243f553ef2cbe34d274561270f80f7819b7f47b601c61ae', '2022-08-24 05:13:52'),
(905, 35, 1, 1, '182a825ba4a3cccee22e95490c2c6c4740089e51a1f306aabc2a1d8f090bdacc', '2022-09-01 18:56:58'),
(906, 35, 1, 0, '182a825ba4a3cccee22e95490c2c6c4740089e51a1f306aabc2a1d8f090bdacc', '2022-09-01 18:57:04'),
(907, 35, 1, 1, '093caab1a1119aba74ac11034696103d645e97fc731a93b9f2fa62e152be0c56', '2022-09-01 18:57:18'),
(908, 35, 1, 0, '093caab1a1119aba74ac11034696103d645e97fc731a93b9f2fa62e152be0c56', '2022-09-01 18:57:22'),
(909, 35, 1, 1, '093caab1a1119aba74ac11034696103dd9a2fadb7e2b31449b68fae73d8b724c', '2022-09-01 18:57:30'),
(910, 35, 1, 0, '093caab1a1119aba74ac11034696103dd9a2fadb7e2b31449b68fae73d8b724c', '2022-09-01 18:57:40'),
(911, 35, 1, 1, '093caab1a1119aba74ac11034696103dabab48a940635c2e52ef72190b1876f8', '2022-09-01 18:57:54'),
(912, 35, 1, 0, '093caab1a1119aba74ac11034696103dabab48a940635c2e52ef72190b1876f8', '2022-09-01 18:57:58'),
(913, 35, 1, 1, '2fda65b9c56284d5318d5e5a0cc23a1e845fbe7ef4e7fe4696110387ab00fc0e', '2022-09-01 18:58:16'),
(914, 35, 1, 0, '2fda65b9c56284d5318d5e5a0cc23a1e845fbe7ef4e7fe4696110387ab00fc0e', '2022-09-01 18:58:20'),
(915, 35, 1, 1, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:47:43'),
(916, 35, 1, 0, '061a71bcb780a1fb61d8a655ea1265d12870fc4fb425f442589adfc5d6f1db8a', '2022-09-11 05:50:03'),
(917, 36, 1, 1, '6ce2da96202c6fe4c0f157e3612e9c39084029f9f0c76201af10eafb6a0b750b', '2022-09-20 17:21:44'),
(918, 36, 1, 0, '6ce2da96202c6fe4c0f157e3612e9c39084029f9f0c76201af10eafb6a0b750b', '2022-09-20 17:21:47'),
(919, 36, 1, 1, '6ce2da96202c6fe4c0f157e3612e9c397b927c45269170ca2e1e1170d7bf329f', '2022-09-20 17:21:54'),
(920, 36, 1, 0, '6ce2da96202c6fe4c0f157e3612e9c397b927c45269170ca2e1e1170d7bf329f', '2022-09-20 17:21:57'),
(921, 37, 1, 1, '684eddbde9a1d5399dcd43bbc8368683742eee9bef2a1acd46a7424604da6250', '2022-10-20 18:48:46'),
(922, 37, 1, 1, 'e8a6e989b53205e87e853efad37b3250d0dda42b286d756de1b2547aa8255e7d', '2022-10-20 18:49:38'),
(923, 37, 1, 0, 'e8a6e989b53205e87e853efad37b3250d0dda42b286d756de1b2547aa8255e7d', '2022-10-20 18:49:38'),
(924, 37, 1, 0, '684eddbde9a1d5399dcd43bbc8368683742eee9bef2a1acd46a7424604da6250', '2022-10-20 18:49:41'),
(925, 37, 1, 1, '461111413fac402bdda8ebdeed44f72b5e72738e0e1980a8463a7bdae5146580', '2022-11-08 02:32:31'),
(926, 37, 1, 0, '461111413fac402bdda8ebdeed44f72b5e72738e0e1980a8463a7bdae5146580', '2022-11-08 02:53:21'),
(927, 37, 1, 1, '217ccb09ef46c58c38ce159f512d17ec690e16e5385ed51923d6486a771463c3', '2022-11-08 02:53:23'),
(928, 37, 1, 0, '217ccb09ef46c58c38ce159f512d17ec690e16e5385ed51923d6486a771463c3', '2022-11-08 02:53:23'),
(929, 37, 1, 1, '217ccb09ef46c58c38ce159f512d17ec77dab6ff985697b3f64c402b27a8e586', '2022-11-08 02:53:24'),
(930, 37, 1, 0, '217ccb09ef46c58c38ce159f512d17ec77dab6ff985697b3f64c402b27a8e586', '2022-11-08 04:22:44'),
(931, 37, 1, 1, '814740018f5448ef30cb6b3569b4b3e1632fddfc942b8bd4cb9cbe73a6df0874', '2022-11-08 04:22:46'),
(932, 37, 1, 0, '814740018f5448ef30cb6b3569b4b3e1632fddfc942b8bd4cb9cbe73a6df0874', '2022-11-08 04:22:46'),
(933, 37, 1, 1, '814740018f5448ef30cb6b3569b4b3e1df5293efc606d9f6e0695a826bfe64db', '2022-11-08 04:22:47'),
(934, 37, 1, 0, '814740018f5448ef30cb6b3569b4b3e1df5293efc606d9f6e0695a826bfe64db', '2022-11-08 04:31:42'),
(935, 38, 1, 1, '5d8f9ecd20664e1d8b519c598d3bba4873552ffb2bd601810c58b77317fc07fa', '2022-11-14 21:17:37'),
(936, 38, 1, 0, '5d8f9ecd20664e1d8b519c598d3bba4873552ffb2bd601810c58b77317fc07fa', '2022-11-14 21:17:39'),
(937, 38, 1, 1, '5d8f9ecd20664e1d8b519c598d3bba4832c3ed23f03f3060b0be628fec841df8', '2022-11-14 21:17:41'),
(938, 38, 1, 0, '5d8f9ecd20664e1d8b519c598d3bba4832c3ed23f03f3060b0be628fec841df8', '2022-11-14 21:17:52'),
(939, 38, 1, 1, 'eb14a99123af0b67df3061c577ff3af3b8b6188ce989b475d5cc01c29f54b606', '2022-11-14 21:22:46'),
(940, 38, 1, 0, 'eb14a99123af0b67df3061c577ff3af3b8b6188ce989b475d5cc01c29f54b606', '2022-11-14 21:22:51'),
(941, 38, 1, 1, 'b08bfb45762dde128557f813f5ae0a7d437e8d7223ee9b5452d7841247f4b636', '2022-11-14 21:24:16'),
(942, 38, 1, 0, 'b08bfb45762dde128557f813f5ae0a7d437e8d7223ee9b5452d7841247f4b636', '2022-11-14 21:24:20'),
(943, 38, 1, 1, 'b08bfb45762dde128557f813f5ae0a7dccb49d1f07156a0af0976b65e885f164', '2022-11-14 21:24:46'),
(944, 38, 1, 0, 'b08bfb45762dde128557f813f5ae0a7dccb49d1f07156a0af0976b65e885f164', '2022-11-14 21:24:48'),
(945, 38, 1, 1, '1c6248c50cdd4e1a572c208c03264cea37ab0d50fddf659fea95af52dea8b671', '2022-11-14 21:27:41'),
(946, 38, 1, 0, '1c6248c50cdd4e1a572c208c03264cea37ab0d50fddf659fea95af52dea8b671', '2022-11-14 21:28:03'),
(947, 38, 1, 1, '258444a54f01546a401468f4d7451d5fea829b0432c12292632bd8b848613692', '2022-11-14 21:29:04'),
(948, 38, 1, 0, '258444a54f01546a401468f4d7451d5fea829b0432c12292632bd8b848613692', '2022-11-14 21:29:19'),
(949, 38, 1, 1, '2a4ac096e88c5b25893bcfb9d7b97bad4252809fb870e538d2dc9ea76bd5128c', '2022-11-14 21:32:38'),
(950, 38, 1, 0, '2a4ac096e88c5b25893bcfb9d7b97bad4252809fb870e538d2dc9ea76bd5128c', '2022-11-14 21:33:23'),
(951, 38, 1, 1, '76be63b53ac83327a9657d4f89f34ac9396d8206a6f5b0532a7ceb4b8c177165', '2022-11-14 21:33:46'),
(952, 38, 1, 0, '76be63b53ac83327a9657d4f89f34ac9396d8206a6f5b0532a7ceb4b8c177165', '2022-11-14 21:33:50'),
(953, 38, 1, 1, 'c5291181811eb8e939863a4012bd3784344d8d89e2a3a7d3b0eb91ade508c4bd', '2022-11-14 21:34:30'),
(954, 38, 1, 0, 'c5291181811eb8e939863a4012bd3784344d8d89e2a3a7d3b0eb91ade508c4bd', '2022-11-14 21:34:37'),
(955, 38, 1, 1, '3b0bf262d2807f22fae5b1074386d04ce0d7cb80221a7431c008b627cf84f6e2', '2022-11-14 21:36:30'),
(956, 38, 1, 0, '3b0bf262d2807f22fae5b1074386d04ce0d7cb80221a7431c008b627cf84f6e2', '2022-11-14 21:36:48'),
(957, 38, 1, 1, '6f9b106716a232653c68a6759c413a2fd55c4595c18dda6bf8d635cc1124cb78', '2022-11-14 21:37:40'),
(958, 38, 1, 0, '6f9b106716a232653c68a6759c413a2fd55c4595c18dda6bf8d635cc1124cb78', '2022-11-14 21:37:52'),
(959, 38, 1, 1, '6f9b106716a232653c68a6759c413a2f0dc9e22042a98010b28681b38aa30f60', '2022-11-14 21:37:52'),
(960, 38, 1, 0, '6f9b106716a232653c68a6759c413a2f0dc9e22042a98010b28681b38aa30f60', '2022-11-14 21:39:21'),
(961, 38, 1, 1, '3b3fcee70e20562155d9f92215960d3bbf414f3a2448880e149cee858f34ad0c', '2022-11-14 21:40:19'),
(962, 38, 1, 0, '3b3fcee70e20562155d9f92215960d3bbf414f3a2448880e149cee858f34ad0c', '2022-11-14 21:40:28'),
(963, 38, 1, 1, '3b3fcee70e20562155d9f92215960d3b29df0be3adb980ccf0dcdcaaf6d76ee9', '2022-11-14 21:40:57'),
(964, 38, 1, 0, '3b3fcee70e20562155d9f92215960d3b29df0be3adb980ccf0dcdcaaf6d76ee9', '2022-11-14 21:41:25'),
(965, 38, 1, 1, '656f6d74c6de998de7e768bd67835cf361fe585174d7413b067c24413b3f8278', '2022-11-14 21:41:27'),
(966, 38, 1, 0, '656f6d74c6de998de7e768bd67835cf361fe585174d7413b067c24413b3f8278', '2022-11-14 21:41:31'),
(967, 38, 1, 1, '656f6d74c6de998de7e768bd67835cf3d38b79f817199ad2b3080f731da83505', '2022-11-14 21:41:34'),
(968, 38, 1, 0, '656f6d74c6de998de7e768bd67835cf3d38b79f817199ad2b3080f731da83505', '2022-11-14 21:42:44'),
(969, 38, 1, 1, '8dbb5883b2ef854d0f4364c8a936734e629b7bd4c7ca9f134547041a63897d4f', '2022-11-14 21:43:18'),
(970, 38, 1, 0, '8dbb5883b2ef854d0f4364c8a936734e629b7bd4c7ca9f134547041a63897d4f', '2022-11-14 21:46:28'),
(971, 38, 1, 1, '7aff99d1de2ba31866c8601269f61d77b51ba5f415c3d9b94a129620d4a28d8d', '2022-11-14 21:46:31'),
(972, 38, 1, 0, '7aff99d1de2ba31866c8601269f61d77b51ba5f415c3d9b94a129620d4a28d8d', '2022-11-14 21:46:39'),
(973, 38, 1, 1, '676dae591debfdaf051eeda6a62c763d32a795f7fe10c8c27d37444932dbc411', '2022-11-14 21:47:20'),
(974, 38, 1, 0, '676dae591debfdaf051eeda6a62c763d32a795f7fe10c8c27d37444932dbc411', '2022-11-14 21:48:05'),
(975, 38, 1, 1, '3c46b471c09a39f933e5fb26251e23401f0632f0bca3ad1464194af87ac58550', '2022-11-14 21:48:06'),
(976, 38, 1, 0, '3c46b471c09a39f933e5fb26251e23401f0632f0bca3ad1464194af87ac58550', '2022-11-14 21:48:07'),
(977, 38, 1, 1, '3c46b471c09a39f933e5fb26251e234056e54147fe5421e8f696ab50e0c3d03d', '2022-11-14 21:48:11'),
(978, 38, 1, 0, '3c46b471c09a39f933e5fb26251e234056e54147fe5421e8f696ab50e0c3d03d', '2022-11-14 21:48:54'),
(979, 38, 1, 1, '3c46b471c09a39f933e5fb26251e2340fdebd8bdb05b1eb0fd04efc10995f43d', '2022-11-14 21:48:56'),
(980, 38, 1, 0, '3c46b471c09a39f933e5fb26251e2340fdebd8bdb05b1eb0fd04efc10995f43d', '2022-11-14 21:49:14'),
(981, 38, 1, 1, '1f10341c14ea2d36764b2c0c5353d9ddd68cdc58622d62c60dc2dd96112489f1', '2022-11-14 21:49:16'),
(982, 38, 1, 0, '1f10341c14ea2d36764b2c0c5353d9ddd68cdc58622d62c60dc2dd96112489f1', '2022-11-14 21:49:18'),
(983, 38, 1, 1, '1f10341c14ea2d36764b2c0c5353d9dd814d84e633c8ab524bdf7d5d8f5d1f7d', '2022-11-14 21:49:20'),
(984, 38, 1, 0, '1f10341c14ea2d36764b2c0c5353d9dd814d84e633c8ab524bdf7d5d8f5d1f7d', '2022-11-14 21:51:55'),
(985, 38, 1, 1, 'ff2e88b7a617286a3111307528a6f3b30e146ee8feea42e1d264d04df19f0c85', '2022-11-14 21:51:57'),
(986, 38, 1, 0, 'ff2e88b7a617286a3111307528a6f3b30e146ee8feea42e1d264d04df19f0c85', '2022-11-14 21:53:22'),
(987, 38, 1, 1, '3439ff42dd8f4d222f4e87839ee07e061274ed894f4890eb5b366c5088df5108', '2022-11-14 21:53:22'),
(988, 38, 1, 0, '3439ff42dd8f4d222f4e87839ee07e061274ed894f4890eb5b366c5088df5108', '2022-11-14 21:54:36'),
(989, 38, 1, 1, '513d0e1218bee58874c07e7831baf4d5050cb947d69cdd224234925bd77e66eb', '2022-11-14 21:54:37'),
(990, 38, 1, 0, '513d0e1218bee58874c07e7831baf4d5050cb947d69cdd224234925bd77e66eb', '2022-11-14 21:55:09'),
(991, 38, 1, 1, '9366ce8350e1b435c306d4202d010f4ee3d22738a0133e4ab212335e23015f36', '2022-11-14 21:55:10'),
(992, 38, 1, 0, '9366ce8350e1b435c306d4202d010f4ee3d22738a0133e4ab212335e23015f36', '2022-11-14 21:55:39'),
(993, 38, 1, 1, '9366ce8350e1b435c306d4202d010f4e929003dc72262c85e91165c6e632bf94', '2022-11-14 21:55:39'),
(994, 38, 1, 0, '9366ce8350e1b435c306d4202d010f4e929003dc72262c85e91165c6e632bf94', '2022-11-14 21:56:28'),
(995, 38, 1, 1, '382f7754f78951e2d101259b340daff795779161c2b065533fdfd38d719a87cd', '2022-11-14 21:56:31'),
(996, 38, 1, 0, '382f7754f78951e2d101259b340daff795779161c2b065533fdfd38d719a87cd', '2022-11-14 21:56:55'),
(997, 38, 1, 1, '382f7754f78951e2d101259b340daff7eb5591a5af29130e1fa40b077d83c7b5', '2022-11-14 21:56:57'),
(998, 38, 1, 1, '0c7135818adfc047cba6148025cca4ec77dc484d9ff281890a0f687d2c4b5ce6', '2022-11-14 21:58:11'),
(999, 38, 1, 1, 'cb5d0244971edad5b21ac130e0e4cb11e0a00b8df6308ee30202c3d248574267', '2022-11-14 22:00:59'),
(1000, 38, 1, 0, '0c7135818adfc047cba6148025cca4ec77dc484d9ff281890a0f687d2c4b5ce6', '2022-11-14 22:01:00'),
(1001, 38, 1, 0, 'cb5d0244971edad5b21ac130e0e4cb11e0a00b8df6308ee30202c3d248574267', '2022-11-14 22:01:03'),
(1002, 38, 1, 1, '2da8278d23c0c181552cef9b6926f4e2e6d2f3bb1552fe3e37122d48b0ebcf72', '2022-11-14 22:01:20'),
(1003, 38, 1, 0, '2da8278d23c0c181552cef9b6926f4e2e6d2f3bb1552fe3e37122d48b0ebcf72', '2022-11-14 22:01:29'),
(1004, 38, 1, 1, '2da8278d23c0c181552cef9b6926f4e28b61e2d03e556aa6db485cb2932f7190', '2022-11-14 22:01:38'),
(1005, 38, 1, 0, '2da8278d23c0c181552cef9b6926f4e28b61e2d03e556aa6db485cb2932f7190', '2022-11-14 22:01:41'),
(1006, 38, 1, 1, 'ec44cc9c2364cd6d9eee93fabdbc30100671efb50b5402b73cb64c3d084d1fc1', '2022-11-14 22:02:23'),
(1007, 38, 1, 0, 'ec44cc9c2364cd6d9eee93fabdbc30100671efb50b5402b73cb64c3d084d1fc1', '2022-11-14 22:02:25'),
(1008, 38, 1, 1, 'ec44cc9c2364cd6d9eee93fabdbc3010f3597b714ee21ea34eac58aae9a04127', '2022-11-14 22:02:35'),
(1009, 38, 1, 0, 'ec44cc9c2364cd6d9eee93fabdbc3010f3597b714ee21ea34eac58aae9a04127', '2022-11-14 22:02:37'),
(1010, 38, 1, 1, 'ec44cc9c2364cd6d9eee93fabdbc3010cff58e22c57c221dd7fd5e9b83fd3b34', '2022-11-14 22:02:48'),
(1011, 38, 1, 0, 'ec44cc9c2364cd6d9eee93fabdbc3010cff58e22c57c221dd7fd5e9b83fd3b34', '2022-11-14 22:02:53'),
(1012, 38, 1, 1, '9b035f8b8efbfdd19b21e83fa2fcc90603951b6634c15d0fc28e0261757b2f49', '2022-11-14 22:03:00'),
(1013, 38, 1, 0, '9b035f8b8efbfdd19b21e83fa2fcc90603951b6634c15d0fc28e0261757b2f49', '2022-11-14 22:03:07'),
(1014, 38, 1, 1, '6a7c173ae90273e8ed7a45850fdf58fc163ed8ff24f40af91350a58fdda6e2e5', '2022-11-14 22:05:06'),
(1015, 38, 1, 0, '6a7c173ae90273e8ed7a45850fdf58fc163ed8ff24f40af91350a58fdda6e2e5', '2022-11-14 22:05:08'),
(1016, 38, 1, 1, '6a7c173ae90273e8ed7a45850fdf58fca370a969627efef803df92bf8530f2df', '2022-11-14 22:05:32'),
(1017, 38, 1, 0, '6a7c173ae90273e8ed7a45850fdf58fca370a969627efef803df92bf8530f2df', '2022-11-14 22:05:35'),
(1018, 38, 1, 1, 'fdd6db1266f79c072e21c05cfdc448082a0013c57073aedd973603c7039fbe0f', '2022-11-14 22:06:16'),
(1019, 38, 1, 0, 'fdd6db1266f79c072e21c05cfdc448082a0013c57073aedd973603c7039fbe0f', '2022-11-14 22:06:18'),
(1020, 38, 1, 1, 'fdd6db1266f79c072e21c05cfdc4480832197c760912d0de8e3002e88e16d902', '2022-11-14 22:06:24'),
(1021, 38, 1, 0, 'fdd6db1266f79c072e21c05cfdc4480832197c760912d0de8e3002e88e16d902', '2022-11-14 22:06:26'),
(1022, 38, 1, 1, 'fdd6db1266f79c072e21c05cfdc448082836d52096f324c8b1d156fafbd53963', '2022-11-14 22:06:30'),
(1023, 38, 1, 0, 'fdd6db1266f79c072e21c05cfdc448082836d52096f324c8b1d156fafbd53963', '2022-11-14 22:06:32'),
(1024, 38, 1, 1, 'fdd6db1266f79c072e21c05cfdc44808074553761459dec5243a92e993068103', '2022-11-14 22:06:41'),
(1025, 38, 1, 0, 'fdd6db1266f79c072e21c05cfdc44808074553761459dec5243a92e993068103', '2022-11-14 22:06:42'),
(1026, 38, 1, 1, 'fdd6db1266f79c072e21c05cfdc44808da294ffe1cc852d4a250625fb1a503b6', '2022-11-14 22:06:53'),
(1027, 38, 1, 0, 'fdd6db1266f79c072e21c05cfdc44808da294ffe1cc852d4a250625fb1a503b6', '2022-11-14 22:06:57'),
(1028, 38, 1, 1, 'ecaf8fcf65cdb2ebafb246eeb8f61ff0885c26f1920c6e63ff7f613f5e01d300', '2022-11-14 22:07:37'),
(1029, 38, 1, 0, 'ecaf8fcf65cdb2ebafb246eeb8f61ff0885c26f1920c6e63ff7f613f5e01d300', '2022-11-14 22:07:39'),
(1030, 38, 1, 1, 'ecaf8fcf65cdb2ebafb246eeb8f61ff0b203f620f6eea76b2ec55cad7e135c10', '2022-11-14 22:07:50'),
(1031, 38, 1, 0, 'ecaf8fcf65cdb2ebafb246eeb8f61ff0b203f620f6eea76b2ec55cad7e135c10', '2022-11-14 22:07:52'),
(1032, 38, 1, 1, '69318af432a7a8af18ee6bf4d9b05a7be746fe8a6dd0dea2c3957047f019ae3e', '2022-11-14 22:14:51'),
(1033, 38, 1, 0, '69318af432a7a8af18ee6bf4d9b05a7be746fe8a6dd0dea2c3957047f019ae3e', '2022-11-14 22:15:01'),
(1034, 38, 1, 1, 'c0b9adff9b8ad7d87be17402a65dd252727e7318cb1da161954ea6e36e0a5e71', '2022-11-14 22:15:28'),
(1035, 38, 1, 0, 'c0b9adff9b8ad7d87be17402a65dd252727e7318cb1da161954ea6e36e0a5e71', '2022-11-14 22:15:32'),
(1036, 38, 1, 1, 'c4ea86c503359e277503eb2baca359a5823978abd528f228c659851e690566cb', '2022-11-14 22:27:08'),
(1037, 38, 1, 0, 'c4ea86c503359e277503eb2baca359a5823978abd528f228c659851e690566cb', '2022-11-14 22:27:12'),
(1038, 38, 1, 1, 'c4ea86c503359e277503eb2baca359a59fe08b75818a13a9f9f3bd9300ed7eed', '2022-11-14 22:27:34'),
(1039, 38, 1, 0, 'c4ea86c503359e277503eb2baca359a59fe08b75818a13a9f9f3bd9300ed7eed', '2022-11-14 22:27:38'),
(1040, 38, 1, 1, '02655031bfaa0e3e772714f7cd8abaf1cd1df1ac0217d2d320e1c8064883746f', '2022-11-14 22:28:49'),
(1041, 38, 1, 0, '02655031bfaa0e3e772714f7cd8abaf1cd1df1ac0217d2d320e1c8064883746f', '2022-11-14 22:28:58'),
(1042, 38, 1, 1, 'ddb111d8db0ec2ab46fc56f71c4a985f36f1311c1962765833c50da79843d451', '2022-11-14 22:29:46'),
(1043, 38, 1, 0, 'ddb111d8db0ec2ab46fc56f71c4a985f36f1311c1962765833c50da79843d451', '2022-11-14 22:29:50'),
(1044, 38, 1, 1, 'f8784346e2598418c6c6f8ecb0ffe497031505c1503e8292dc325ee424e32456', '2022-11-14 22:32:38'),
(1045, 38, 1, 0, 'f8784346e2598418c6c6f8ecb0ffe497031505c1503e8292dc325ee424e32456', '2022-11-14 22:32:41'),
(1046, 38, 1, 1, '7e890d133a52b212368cab1b8b421846aea75720a85671064fad6d07a1947a89', '2022-11-14 22:33:15'),
(1047, 38, 1, 0, '7e890d133a52b212368cab1b8b421846aea75720a85671064fad6d07a1947a89', '2022-11-14 22:33:19'),
(1048, 38, 1, 1, '7e890d133a52b212368cab1b8b421846478ff7197d0f9482faa9beb3c6cbd22e', '2022-11-14 22:33:33'),
(1049, 38, 1, 1, '5c6cd681a2fb2f7e96886cf7d3d73aad8b37a34aa2e6907832e8a2ec3b41d72a', '2022-11-14 22:34:30'),
(1050, 38, 1, 0, '7e890d133a52b212368cab1b8b421846478ff7197d0f9482faa9beb3c6cbd22e', '2022-11-14 22:34:31'),
(1051, 38, 1, 0, '5c6cd681a2fb2f7e96886cf7d3d73aad8b37a34aa2e6907832e8a2ec3b41d72a', '2022-11-14 22:34:37'),
(1052, 38, 1, 1, '5c6cd681a2fb2f7e96886cf7d3d73aadd75ffa3ddf7b4face5a4dce7d4fc3210', '2022-11-14 22:34:55'),
(1053, 38, 1, 0, '5c6cd681a2fb2f7e96886cf7d3d73aadd75ffa3ddf7b4face5a4dce7d4fc3210', '2022-11-14 22:35:01'),
(1054, 38, 1, 1, 'e4db100a46bc4d42dfd2cfc223573ab8d2b8b1f6bb49ff1899b8daffc03a81bd', '2022-11-14 22:35:15'),
(1055, 38, 1, 0, 'e4db100a46bc4d42dfd2cfc223573ab8d2b8b1f6bb49ff1899b8daffc03a81bd', '2022-11-14 22:35:20'),
(1056, 38, 1, 1, 'e4db100a46bc4d42dfd2cfc223573ab80a514ace9000e41f6dc92fd27e4599f8', '2022-11-14 22:35:42'),
(1057, 38, 1, 0, 'e4db100a46bc4d42dfd2cfc223573ab80a514ace9000e41f6dc92fd27e4599f8', '2022-11-14 22:35:48'),
(1058, 38, 1, 1, 'b3db04c30218e4ee5c7e8aa2f61127fb72bfb0c3fbc29c96cbc9aa9304729a08', '2022-11-14 22:36:07'),
(1059, 38, 1, 0, 'b3db04c30218e4ee5c7e8aa2f61127fb72bfb0c3fbc29c96cbc9aa9304729a08', '2022-11-14 22:36:16'),
(1060, 38, 1, 1, '8d32d967e73d7ea2538e470d1f7b4b90ed6db8639a907c2faa8a53b856ac1aaa', '2022-11-14 22:37:10'),
(1061, 38, 1, 0, '8d32d967e73d7ea2538e470d1f7b4b90ed6db8639a907c2faa8a53b856ac1aaa', '2022-11-14 22:37:15'),
(1062, 38, 1, 1, '8d32d967e73d7ea2538e470d1f7b4b90005ee39239d7a6917b4d28ca9df53b24', '2022-11-14 22:37:33'),
(1063, 38, 1, 0, '8d32d967e73d7ea2538e470d1f7b4b90005ee39239d7a6917b4d28ca9df53b24', '2022-11-14 22:37:36'),
(1064, 38, 1, 1, '44f30e3556cea6ca22484f6d3cfa77f1ef944c930ffc096b965d4f1b3f95ba91', '2022-11-14 22:38:03'),
(1065, 38, 1, 0, '44f30e3556cea6ca22484f6d3cfa77f1ef944c930ffc096b965d4f1b3f95ba91', '2022-11-14 22:38:13'),
(1066, 38, 1, 1, '19d03fd4a547f3c5e43b7b800141cb321d6a7dea709507a248321b72aa0b7356', '2022-11-14 22:40:37'),
(1067, 38, 1, 0, '19d03fd4a547f3c5e43b7b800141cb321d6a7dea709507a248321b72aa0b7356', '2022-11-14 22:40:40'),
(1068, 38, 1, 1, '7bc1c68d9d9c90f9fb7763b52d000cd3186cef95e89d0d58f9240e8b232e2e5a', '2022-11-14 22:59:31'),
(1069, 38, 1, 0, '7bc1c68d9d9c90f9fb7763b52d000cd3186cef95e89d0d58f9240e8b232e2e5a', '2022-11-14 22:59:43'),
(1070, 38, 1, 1, '01024e4dd04cad7a78715e69e66ef5630cce9bb78104df8bbef5ad9ee24be334', '2022-11-14 23:02:15'),
(1071, 38, 1, 0, '01024e4dd04cad7a78715e69e66ef5630cce9bb78104df8bbef5ad9ee24be334', '2022-11-14 23:02:26'),
(1072, 38, 1, 1, '01024e4dd04cad7a78715e69e66ef563e57721c29a900789a04bc0c7e67cdb32', '2022-11-14 23:02:56'),
(1073, 38, 1, 0, '01024e4dd04cad7a78715e69e66ef563e57721c29a900789a04bc0c7e67cdb32', '2022-11-14 23:03:05'),
(1074, 38, 1, 1, 'd3f24d0e55168ce7e80790a37de4c44a573cf7052ea6d116989695998cba78c4', '2022-11-14 23:04:12'),
(1075, 38, 1, 0, 'd3f24d0e55168ce7e80790a37de4c44a573cf7052ea6d116989695998cba78c4', '2022-11-14 23:04:19'),
(1076, 38, 1, 1, 'd3f24d0e55168ce7e80790a37de4c44ad858650aeaf3d9bb54f2c31ffc33c1c8', '2022-11-14 23:04:39'),
(1077, 38, 1, 0, 'd3f24d0e55168ce7e80790a37de4c44ad858650aeaf3d9bb54f2c31ffc33c1c8', '2022-11-14 23:04:49'),
(1078, 38, 1, 1, 'd3f24d0e55168ce7e80790a37de4c44a4be167bf7c2734c343a2eaa614502716', '2022-11-14 23:04:56'),
(1079, 38, 1, 0, 'd3f24d0e55168ce7e80790a37de4c44a4be167bf7c2734c343a2eaa614502716', '2022-11-14 23:05:07'),
(1080, 38, 1, 1, '2edbc2ea7690c863485158936972fdb9b14f8ce5e981ee25574a2843d635e6d8', '2022-11-14 23:05:19'),
(1081, 38, 1, 0, '2edbc2ea7690c863485158936972fdb9b14f8ce5e981ee25574a2843d635e6d8', '2022-11-14 23:05:38'),
(1082, 38, 1, 1, '3fd23aaac82e1c8ba0173dcab8f0af86f7ea43f3c835a582ebfb8f592809e687', '2022-11-14 23:07:05'),
(1083, 38, 1, 0, '3fd23aaac82e1c8ba0173dcab8f0af86f7ea43f3c835a582ebfb8f592809e687', '2022-11-14 23:07:29'),
(1084, 38, 1, 1, '0c45e93213b15ce1b2f473959503295a822b6904e23ff0c02a024e1a19f26531', '2022-11-14 23:08:17'),
(1085, 38, 1, 0, '0c45e93213b15ce1b2f473959503295a822b6904e23ff0c02a024e1a19f26531', '2022-11-14 23:08:19'),
(1086, 38, 1, 1, '0c45e93213b15ce1b2f473959503295a37eadfc8803a5d443ae9d91ce40808f6', '2022-11-14 23:08:24'),
(1087, 38, 1, 0, '0c45e93213b15ce1b2f473959503295a37eadfc8803a5d443ae9d91ce40808f6', '2022-11-14 23:09:22'),
(1088, 38, 1, 1, '18ef1ba01602f6f0162b9608b5c9a9cf2cdec539b30ba92a478ef05ecbc6ed31', '2022-11-14 23:10:19'),
(1089, 38, 1, 0, '18ef1ba01602f6f0162b9608b5c9a9cf2cdec539b30ba92a478ef05ecbc6ed31', '2022-11-14 23:14:48'),
(1090, 38, 1, 1, '48e9b04fec4da0cd73a59d7d71a3c4ae5d2fd5ee3499fc9efe5d2b1eaebe5809', '2022-11-14 23:14:50'),
(1091, 38, 1, 0, '48e9b04fec4da0cd73a59d7d71a3c4ae5d2fd5ee3499fc9efe5d2b1eaebe5809', '2022-11-14 23:15:12'),
(1092, 38, 1, 1, 'f3147299b3c23b502b2a346c37fa79a04e682c8c07ecb75f16d7347012ff132d', '2022-11-14 23:15:30'),
(1093, 38, 1, 0, 'f3147299b3c23b502b2a346c37fa79a04e682c8c07ecb75f16d7347012ff132d', '2022-11-14 23:15:49'),
(1094, 38, 1, 1, '7643c54938038b522ca6b14cdd3a2237ca6519aebbd8795045562c388f7d03c0', '2022-11-14 23:16:30'),
(1095, 38, 1, 0, '7643c54938038b522ca6b14cdd3a2237ca6519aebbd8795045562c388f7d03c0', '2022-11-14 23:16:57'),
(1096, 38, 1, 1, 'b45ceea6c43563d2a728de0ba0fc47404177efb8db301ce5298308c5709a2269', '2022-11-14 23:18:28'),
(1097, 38, 1, 0, 'b45ceea6c43563d2a728de0ba0fc47404177efb8db301ce5298308c5709a2269', '2022-11-14 23:18:31'),
(1098, 38, 1, 1, 'b45ceea6c43563d2a728de0ba0fc47401e251ba048eae4378bc0faca8c72da45', '2022-11-14 23:18:36'),
(1099, 38, 1, 0, 'b45ceea6c43563d2a728de0ba0fc47401e251ba048eae4378bc0faca8c72da45', '2022-11-14 23:18:52'),
(1100, 38, 1, 1, '0fc04d72fdf5f9aba64bc1f9f960d56accb978279cef794ace62f01414887683', '2022-11-14 23:19:26'),
(1101, 38, 1, 1, 'cc2b41b28c1c8c78b4575094518ffabae8242b41336f43999b11feff980a311a', '2022-11-14 23:20:06'),
(1102, 38, 1, 0, '0fc04d72fdf5f9aba64bc1f9f960d56accb978279cef794ace62f01414887683', '2022-11-14 23:20:07'),
(1103, 38, 1, 1, 'ec81db3998a5633c802f0ad5374c58624ce576234d8d5d8140a7736eea3c9d81', '2022-11-14 23:22:15'),
(1104, 38, 1, 0, 'cc2b41b28c1c8c78b4575094518ffabae8242b41336f43999b11feff980a311a', '2022-11-14 23:22:16'),
(1105, 38, 1, 0, 'ec81db3998a5633c802f0ad5374c58624ce576234d8d5d8140a7736eea3c9d81', '2022-11-14 23:22:32'),
(1106, 38, 1, 1, 'db7b03a1ff7d19b99f120d6a28bd02957d92c64e8a0d61775f8c5df4db9e8658', '2022-11-14 23:25:06'),
(1107, 38, 1, 0, 'db7b03a1ff7d19b99f120d6a28bd02957d92c64e8a0d61775f8c5df4db9e8658', '2022-11-14 23:25:19'),
(1108, 38, 1, 1, 'db7b03a1ff7d19b99f120d6a28bd02953566957fee077e1e0a90c98bd00bc1b2', '2022-11-14 23:25:36');
INSERT INTO `gsession_user_usage` (`id`, `session_id`, `user_id`, `is_start`, `play_nonce`, `timestamp`) VALUES
(1109, 38, 1, 0, 'db7b03a1ff7d19b99f120d6a28bd02953566957fee077e1e0a90c98bd00bc1b2', '2022-11-14 23:25:47'),
(1110, 38, 1, 1, '2d1b15f02238593ae05cb36cdb60c2f6e81da0c2be65223f4705586b28183636', '2022-11-14 23:28:39'),
(1111, 38, 1, 1, 'b6ecbbe864ed62c398d23c82ac8972ccb5234a38757f1276d2313c9256b1840d', '2022-11-14 23:29:17'),
(1112, 38, 1, 0, '2d1b15f02238593ae05cb36cdb60c2f6e81da0c2be65223f4705586b28183636', '2022-11-14 23:29:18'),
(1113, 38, 1, 0, 'b6ecbbe864ed62c398d23c82ac8972ccb5234a38757f1276d2313c9256b1840d', '2022-11-14 23:29:29'),
(1114, 38, 1, 1, 'b6ecbbe864ed62c398d23c82ac8972cc7e1ea5036d9aa0ccae4549801187c15c', '2022-11-14 23:29:46'),
(1115, 38, 1, 0, 'b6ecbbe864ed62c398d23c82ac8972cc7e1ea5036d9aa0ccae4549801187c15c', '2022-11-14 23:30:01'),
(1116, 38, 1, 1, 'c19d6c5ab1a409be3441aeb3e50b1dd3cf46c9f890d066a6907865e7f371da0a', '2022-11-14 23:51:39'),
(1117, 38, 1, 0, 'c19d6c5ab1a409be3441aeb3e50b1dd3cf46c9f890d066a6907865e7f371da0a', '2022-11-14 23:51:46'),
(1118, 38, 1, 1, 'c19d6c5ab1a409be3441aeb3e50b1dd37e5f4be2ff124dbf98db987e5d0b7859', '2022-11-14 23:51:54'),
(1119, 38, 1, 0, 'c19d6c5ab1a409be3441aeb3e50b1dd37e5f4be2ff124dbf98db987e5d0b7859', '2022-11-14 23:53:53'),
(1120, 38, 1, 1, '6f9d22474d21d848bc93990922084adda251ff1992042c611c7a267af2f6ec3e', '2022-11-14 23:59:01'),
(1121, 38, 1, 0, '6f9d22474d21d848bc93990922084adda251ff1992042c611c7a267af2f6ec3e', '2022-11-14 23:59:04'),
(1122, 38, 1, 1, '6f9d22474d21d848bc93990922084addaa34e068dcd43307bbfa25c6f14463f9', '2022-11-14 23:59:35'),
(1123, 38, 1, 0, '6f9d22474d21d848bc93990922084addaa34e068dcd43307bbfa25c6f14463f9', '2022-11-14 23:59:38'),
(1124, 38, 1, 1, 'b4a4a1f7d2e4017bd54662e12c2d3b5164c72ad5cdb2403f3aa1c03f1b088fe7', '2022-11-15 00:01:45'),
(1125, 38, 1, 0, 'b4a4a1f7d2e4017bd54662e12c2d3b5164c72ad5cdb2403f3aa1c03f1b088fe7', '2022-11-15 00:02:01'),
(1126, 38, 1, 1, 'c1018ea58f94cb30b412f2d838bc30b68e971bec40d60704e1b286f55ec91efd', '2022-11-15 00:02:04'),
(1127, 38, 1, 1, '9c253537543f81f864fd2a18eb7067d9c2858a059cf870108fcf6cdef5c2930e', '2022-11-15 00:04:08'),
(1128, 38, 1, 0, '9c253537543f81f864fd2a18eb7067d9c2858a059cf870108fcf6cdef5c2930e', '2022-11-15 00:04:14'),
(1129, 38, 1, 0, 'c1018ea58f94cb30b412f2d838bc30b68e971bec40d60704e1b286f55ec91efd', '2022-11-15 00:04:16'),
(1130, 38, 1, 1, '9c253537543f81f864fd2a18eb7067d948b3cb696a698b9d7e558b851b00ce5e', '2022-11-15 00:04:31'),
(1131, 38, 1, 0, '9c253537543f81f864fd2a18eb7067d948b3cb696a698b9d7e558b851b00ce5e', '2022-11-15 00:04:42'),
(1132, 38, 1, 1, '9c253537543f81f864fd2a18eb7067d9b72e6f732f3db0742de027643b27baaf', '2022-11-15 00:04:59'),
(1133, 38, 1, 0, '9c253537543f81f864fd2a18eb7067d9b72e6f732f3db0742de027643b27baaf', '2022-11-15 00:05:28'),
(1134, 38, 1, 1, 'bd5407edf68d361bbe9cb06b42c7fa1cd4d6eb78c86ab9eb0fb20dd9b4381966', '2022-11-15 00:06:52'),
(1135, 38, 1, 0, 'bd5407edf68d361bbe9cb06b42c7fa1cd4d6eb78c86ab9eb0fb20dd9b4381966', '2022-11-15 00:06:56'),
(1136, 38, 1, 1, 'd92391788d9008b5728684afc40ab4788b47b5dbf8935ec17d5155797e3f9858', '2022-11-15 00:07:04'),
(1137, 38, 1, 0, 'd92391788d9008b5728684afc40ab4788b47b5dbf8935ec17d5155797e3f9858', '2022-11-15 00:07:14'),
(1138, 38, 1, 1, 'd92391788d9008b5728684afc40ab4782c349fee4c4672983f9993aa677104d8', '2022-11-15 00:07:42'),
(1139, 38, 1, 0, 'd92391788d9008b5728684afc40ab4782c349fee4c4672983f9993aa677104d8', '2022-11-15 00:07:47'),
(1140, 38, 1, 1, 'd92391788d9008b5728684afc40ab478eb8a29da64c285cdbf4cb7c59cbb8342', '2022-11-15 00:07:52'),
(1141, 38, 1, 0, 'd92391788d9008b5728684afc40ab478eb8a29da64c285cdbf4cb7c59cbb8342', '2022-11-15 00:33:09'),
(1142, 38, 1, 1, '5b5d6eb61f84411710d37f97393a3c760ecafcfef2778cfeef875d17d8dec732', '2022-11-15 00:39:19'),
(1143, 38, 1, 0, '5b5d6eb61f84411710d37f97393a3c760ecafcfef2778cfeef875d17d8dec732', '2022-11-15 00:41:06'),
(1144, 38, 1, 1, '59b70dbf863801e7847084f0cf6f3c51801a6ecf3a7afc5bec497c73ebe49cc3', '2022-11-15 00:41:08'),
(1145, 38, 1, 1, '672779d0fefb40daed4b39307df96683b48e152158ecce21c519dbca064785a3', '2022-11-15 00:43:00'),
(1146, 38, 1, 0, '59b70dbf863801e7847084f0cf6f3c51801a6ecf3a7afc5bec497c73ebe49cc3', '2022-11-15 00:43:01'),
(1147, 38, 1, 1, '672779d0fefb40daed4b39307df9668308cfbc4118f36fd02f00b0f14a11e2c2', '2022-11-15 00:43:15'),
(1148, 38, 1, 0, '672779d0fefb40daed4b39307df96683b48e152158ecce21c519dbca064785a3', '2022-11-15 00:43:16'),
(1149, 38, 1, 0, '672779d0fefb40daed4b39307df9668308cfbc4118f36fd02f00b0f14a11e2c2', '2022-11-15 00:44:19'),
(1150, 38, 1, 1, 'f37037c4181226e779d9aa9438db2790caee935c7ad06a1b9014881bc9bc9d45', '2022-11-15 00:44:22'),
(1151, 38, 1, 0, 'f37037c4181226e779d9aa9438db2790caee935c7ad06a1b9014881bc9bc9d45', '2022-11-15 00:44:37'),
(1152, 38, 1, 1, 'f37037c4181226e779d9aa9438db27908af4163a8ba4ac922dd66bfcd9ed0881', '2022-11-15 00:44:48'),
(1153, 38, 1, 0, 'f37037c4181226e779d9aa9438db27908af4163a8ba4ac922dd66bfcd9ed0881', '2022-11-15 00:45:19'),
(1154, 38, 1, 1, 'ae91c53317d780e4712d218e1de9df03a7409ec59f16cc8b993da1e0f22dedc2', '2022-11-15 00:45:19'),
(1155, 38, 1, 0, 'ae91c53317d780e4712d218e1de9df03a7409ec59f16cc8b993da1e0f22dedc2', '2022-11-15 00:46:01'),
(1156, 38, 1, 1, '70b8bdd2e00c85c1e394cf263ed965ae818a1338bd24e4b51d2503c31c3b3544', '2022-11-15 00:46:02'),
(1157, 38, 1, 0, '70b8bdd2e00c85c1e394cf263ed965ae818a1338bd24e4b51d2503c31c3b3544', '2022-11-15 00:46:08'),
(1158, 38, 1, 1, '70b8bdd2e00c85c1e394cf263ed965aea161a15ec529deeeb184525f13a1bc5f', '2022-11-15 00:46:47'),
(1159, 38, 1, 0, '70b8bdd2e00c85c1e394cf263ed965aea161a15ec529deeeb184525f13a1bc5f', '2022-11-15 00:46:56'),
(1160, 38, 1, 1, 'cce3b6a1f02f57f997ecb7dca3dbb17e7b82a05fa1c2728ab101a1f302d27feb', '2022-11-15 00:51:14'),
(1161, 38, 1, 0, 'cce3b6a1f02f57f997ecb7dca3dbb17e7b82a05fa1c2728ab101a1f302d27feb', '2022-11-15 00:52:25'),
(1162, 38, 1, 1, '24561e4c585b146c935f2976a3e80f9221713ca921a630c75b03f1de6b46744c', '2022-11-15 00:52:27'),
(1163, 38, 1, 0, '24561e4c585b146c935f2976a3e80f9221713ca921a630c75b03f1de6b46744c', '2022-11-15 00:52:38'),
(1164, 38, 1, 1, 'dd372f9a51e9fd6cc9a99d598eae380b33c5bb6904cbb0ce7521ac9ae098026c', '2022-11-15 00:54:39'),
(1165, 38, 1, 0, 'dd372f9a51e9fd6cc9a99d598eae380b33c5bb6904cbb0ce7521ac9ae098026c', '2022-11-15 00:54:49'),
(1166, 38, 1, 1, 'ac9c461e5c2ad7e2e044bd7f2cc62a6b5d80841411d7c14c9ed87b1b3896ba25', '2022-11-15 00:55:26'),
(1167, 38, 1, 0, 'ac9c461e5c2ad7e2e044bd7f2cc62a6b5d80841411d7c14c9ed87b1b3896ba25', '2022-11-15 00:55:40'),
(1168, 38, 1, 1, 'b63a3a21df617e5046b57160a0911b4db0c182781fc7fd8f4b2ce34b4259739f', '2022-11-15 00:57:25'),
(1169, 38, 1, 0, 'b63a3a21df617e5046b57160a0911b4db0c182781fc7fd8f4b2ce34b4259739f', '2022-11-15 00:57:36'),
(1170, 38, 1, 1, 'b63a3a21df617e5046b57160a0911b4d1e41582d5f2d02c548ea790f8f3e39f3', '2022-11-15 00:57:36'),
(1171, 38, 1, 0, 'b63a3a21df617e5046b57160a0911b4d1e41582d5f2d02c548ea790f8f3e39f3', '2022-11-15 00:57:45'),
(1172, 38, 1, 1, 'b63a3a21df617e5046b57160a0911b4dc07c7a46bf660df1dcf76c27d9c9700f', '2022-11-15 00:57:45'),
(1173, 38, 1, 0, 'b63a3a21df617e5046b57160a0911b4dc07c7a46bf660df1dcf76c27d9c9700f', '2022-11-15 00:57:51'),
(1174, 38, 1, 1, 'b63a3a21df617e5046b57160a0911b4d0c719568318d2b095209267fdb463bad', '2022-11-15 00:57:52'),
(1175, 38, 1, 0, 'b63a3a21df617e5046b57160a0911b4d0c719568318d2b095209267fdb463bad', '2022-11-15 00:58:34'),
(1176, 38, 1, 1, '17133ed47bdb2e6bc9d0526137a51d0aeefd4c40a3db8a2613ea63258b042a41', '2022-11-15 00:59:22'),
(1177, 38, 1, 0, '17133ed47bdb2e6bc9d0526137a51d0aeefd4c40a3db8a2613ea63258b042a41', '2022-11-15 00:59:31'),
(1178, 38, 1, 1, 'b1d5365fd0260dddf17672f50bd927b7151e94c14e148ded238c30b256ec72cd', '2022-11-15 01:00:54'),
(1179, 38, 1, 0, 'b1d5365fd0260dddf17672f50bd927b7151e94c14e148ded238c30b256ec72cd', '2022-11-15 01:01:02'),
(1180, 38, 1, 1, 'ec4f7c524e4f2a0008014f2a146afd16fe1f77d325b899171f6dc69bfe25d569', '2022-11-15 01:04:27'),
(1181, 38, 1, 1, 'ec4f7c524e4f2a0008014f2a146afd16e69f4e8c97a3eea04acc94462bd44f0c', '2022-11-15 01:04:53'),
(1182, 38, 1, 0, 'ec4f7c524e4f2a0008014f2a146afd16fe1f77d325b899171f6dc69bfe25d569', '2022-11-15 01:04:54'),
(1183, 38, 1, 0, 'ec4f7c524e4f2a0008014f2a146afd16e69f4e8c97a3eea04acc94462bd44f0c', '2022-11-15 01:05:02'),
(1184, 38, 1, 1, '42438b7647a9c2b5d22aa0d39d61fe37b72124d11ffeee94da939038b6a76732', '2022-11-15 01:05:03'),
(1185, 38, 1, 0, '42438b7647a9c2b5d22aa0d39d61fe37b72124d11ffeee94da939038b6a76732', '2022-11-15 01:05:10'),
(1186, 38, 1, 1, '5c24ca6556f04ea7de5594f74527da6a7e563cefa884dbdf9e2a6dfff3a330c9', '2022-11-15 01:11:24'),
(1187, 38, 1, 0, '5c24ca6556f04ea7de5594f74527da6a7e563cefa884dbdf9e2a6dfff3a330c9', '2022-11-15 01:12:09'),
(1188, 38, 1, 1, '9a0aa88cd0e5758bacd9aefc1f21fc229d26113bf81b6fe2f59110d9b17727ee', '2022-11-15 01:27:08'),
(1189, 38, 1, 0, '9a0aa88cd0e5758bacd9aefc1f21fc229d26113bf81b6fe2f59110d9b17727ee', '2022-11-15 01:27:10'),
(1190, 38, 1, 1, '9a0aa88cd0e5758bacd9aefc1f21fc22a8b6137a0ce271b09e9d716ae36a868f', '2022-11-15 01:27:58'),
(1191, 38, 1, 0, '9a0aa88cd0e5758bacd9aefc1f21fc22a8b6137a0ce271b09e9d716ae36a868f', '2022-11-15 01:29:08'),
(1192, 38, 1, 1, '066333bde67b87217eadd909b362a329910097a517c30209849c47789e33e34e', '2022-11-15 01:37:09'),
(1193, 38, 1, 0, '066333bde67b87217eadd909b362a329910097a517c30209849c47789e33e34e', '2022-11-15 01:37:55'),
(1194, 38, 1, 1, '112691eb85055d1867a91c710704c63a21dbbe21bca1175f09147924324a8875', '2022-11-15 03:01:50'),
(1195, 38, 1, 0, '112691eb85055d1867a91c710704c63a21dbbe21bca1175f09147924324a8875', '2022-11-15 03:02:09'),
(1196, 38, 1, 1, '7606d64bb4aab1dcc75a4946016d9ffd06f1f6b8fcad5810ee6659c5d43c34bd', '2022-11-15 03:02:31'),
(1197, 38, 1, 0, '7606d64bb4aab1dcc75a4946016d9ffd06f1f6b8fcad5810ee6659c5d43c34bd', '2022-11-15 03:03:18'),
(1198, 38, 1, 1, '0ac710310e465cabc17da67e89d311584debed038992a6ab32b64ee554ca5e29', '2022-11-15 03:03:40'),
(1199, 38, 1, 0, '0ac710310e465cabc17da67e89d311584debed038992a6ab32b64ee554ca5e29', '2022-11-15 03:03:49'),
(1200, 38, 1, 1, '0ac710310e465cabc17da67e89d31158ec987d38284d664fedcd046a670e4203', '2022-11-15 03:03:59'),
(1201, 38, 1, 0, '0ac710310e465cabc17da67e89d31158ec987d38284d664fedcd046a670e4203', '2022-11-15 03:04:33'),
(1202, 38, 1, 1, '44a3aa36f49e8982008148bd994e82f03987330fd90f2d8532f43044737ce5ea', '2022-11-15 03:21:52'),
(1203, 38, 1, 0, '44a3aa36f49e8982008148bd994e82f03987330fd90f2d8532f43044737ce5ea', '2022-11-15 03:22:08'),
(1204, 38, 1, 1, 'f57e53237b903bec458509e79ed9401aa5586c3d40264f41cb47af454a191da6', '2022-11-15 03:22:39'),
(1205, 38, 1, 0, 'f57e53237b903bec458509e79ed9401aa5586c3d40264f41cb47af454a191da6', '2022-11-15 03:24:04'),
(1206, 38, 1, 1, 'aebad8179b7d28b9639a24a6195e6c5b4447cf5289080acb55baaa9b35652ca6', '2022-11-15 03:25:45'),
(1207, 38, 1, 0, 'aebad8179b7d28b9639a24a6195e6c5b4447cf5289080acb55baaa9b35652ca6', '2022-11-15 03:25:52'),
(1208, 38, 1, 1, '7fe282fb10df08bb47bd4986b97a76fee3a03b53d61b42bc569d6875a2dda4b3', '2022-11-15 03:26:06'),
(1209, 38, 1, 0, '7fe282fb10df08bb47bd4986b97a76fee3a03b53d61b42bc569d6875a2dda4b3', '2022-11-15 03:26:21'),
(1210, 38, 1, 1, '718b58e56ff46a60af0dc3ede9be2b56fc05005239a3edaf029f078edead1210', '2022-11-15 03:28:59'),
(1211, 38, 1, 0, '718b58e56ff46a60af0dc3ede9be2b56fc05005239a3edaf029f078edead1210', '2022-11-15 03:29:06'),
(1212, 38, 1, 1, '56f5038ca854d5e37f481db078c44c57b008e3c4d4322b9fe0254643e2838f7b', '2022-11-15 03:29:39'),
(1213, 38, 1, 0, '56f5038ca854d5e37f481db078c44c57b008e3c4d4322b9fe0254643e2838f7b', '2022-11-15 03:29:49'),
(1214, 38, 1, 1, '96821bad6e9494c9a845746429db191bcbdd15fde9f34a047338dfdeac7c0e64', '2022-11-15 03:31:15'),
(1215, 38, 1, 0, '96821bad6e9494c9a845746429db191bcbdd15fde9f34a047338dfdeac7c0e64', '2022-11-15 03:31:23'),
(1216, 38, 1, 1, '96821bad6e9494c9a845746429db191b04daf254358e51c796424a2833a5eb93', '2022-11-15 03:31:32'),
(1217, 38, 1, 0, '96821bad6e9494c9a845746429db191b04daf254358e51c796424a2833a5eb93', '2022-11-15 03:31:42'),
(1218, 38, 1, 1, '96821bad6e9494c9a845746429db191b4246475aa11764b61379f165b99edaac', '2022-11-15 03:31:51'),
(1219, 38, 1, 0, '96821bad6e9494c9a845746429db191b4246475aa11764b61379f165b99edaac', '2022-11-15 03:32:06'),
(1220, 38, 1, 1, '1f7dee2387e838a6871f85e421a008b662e69828df2219d90c64071b9e231a96', '2022-11-15 03:35:05'),
(1221, 38, 1, 0, '1f7dee2387e838a6871f85e421a008b662e69828df2219d90c64071b9e231a96', '2022-11-15 03:35:39'),
(1222, 38, 1, 1, 'a5b0eb9059614c170cf9fd8f9cfc4405e40dd0cc38043585ec53099045729ddc', '2022-11-15 03:36:15'),
(1223, 38, 1, 0, 'a5b0eb9059614c170cf9fd8f9cfc4405e40dd0cc38043585ec53099045729ddc', '2022-11-15 03:37:23'),
(1224, 38, 1, 1, '89e882e021fef476d6681a51aaf48d8c9c217ea9bd9ea5366e8426b66978291e', '2022-11-15 03:53:50'),
(1225, 38, 1, 0, '89e882e021fef476d6681a51aaf48d8c9c217ea9bd9ea5366e8426b66978291e', '2022-11-15 03:54:02'),
(1226, 38, 1, 1, '5a5654c8b257d9a10c09f1811ebbdf588c4fbac764cd013b164553642e7571a1', '2022-11-15 03:54:09'),
(1227, 38, 1, 0, '5a5654c8b257d9a10c09f1811ebbdf588c4fbac764cd013b164553642e7571a1', '2022-11-15 03:54:44'),
(1228, 38, 1, 1, '933cf645ce102b86caaa7eadc51cc22ffb4c942f52b5e12e93900f3ceb252e0c', '2022-11-15 04:04:19'),
(1229, 38, 1, 0, '933cf645ce102b86caaa7eadc51cc22ffb4c942f52b5e12e93900f3ceb252e0c', '2022-11-15 04:04:27'),
(1230, 38, 1, 1, '71c253d3b8f921b0ca841e1fd3cdff01ce30b36a60a9d6eb50f7cd6d103f2cf3', '2022-11-15 04:12:45'),
(1231, 38, 1, 0, '71c253d3b8f921b0ca841e1fd3cdff01ce30b36a60a9d6eb50f7cd6d103f2cf3', '2022-11-15 04:12:59'),
(1232, 38, 1, 1, '809948b1132f708da5222e811b353f13dec78ed6cbe1ce519462e78db7d20138', '2022-11-15 04:13:29'),
(1233, 38, 1, 0, '809948b1132f708da5222e811b353f13dec78ed6cbe1ce519462e78db7d20138', '2022-11-15 04:13:40'),
(1234, 38, 1, 1, '809948b1132f708da5222e811b353f1387c03b7bae18846c014d594475ad26fb', '2022-11-15 04:13:50'),
(1235, 38, 1, 0, '809948b1132f708da5222e811b353f1387c03b7bae18846c014d594475ad26fb', '2022-11-15 04:14:49'),
(1236, 38, 1, 1, '030e26d1c3e6a357c7a9d2f463e1b923c3b18199adaff0fbd088501e56e125d5', '2022-11-15 04:15:16'),
(1237, 38, 1, 0, '030e26d1c3e6a357c7a9d2f463e1b923c3b18199adaff0fbd088501e56e125d5', '2022-11-15 04:15:35'),
(1238, 38, 1, 1, '030e26d1c3e6a357c7a9d2f463e1b923c213636756a47043f2618fc6650a515b', '2022-11-15 04:15:53'),
(1239, 38, 1, 0, '030e26d1c3e6a357c7a9d2f463e1b923c213636756a47043f2618fc6650a515b', '2022-11-15 04:16:07'),
(1240, 38, 1, 1, 'b137d39b83317bcd0de970bb7a49652131654783aaa1bfc495013653770442cd', '2022-11-15 04:23:12'),
(1241, 38, 1, 0, 'b137d39b83317bcd0de970bb7a49652131654783aaa1bfc495013653770442cd', '2022-11-15 04:23:17'),
(1242, 38, 1, 1, 'b137d39b83317bcd0de970bb7a496521f54a57e39c3f966ec211f430834f8645', '2022-11-15 04:23:23'),
(1243, 38, 1, 1, '3368af8c25ea2616717c4aba7df21de54e6bf463f8194d5ce8a40f3b007a8eef', '2022-11-15 04:26:03'),
(1244, 38, 1, 0, 'b137d39b83317bcd0de970bb7a496521f54a57e39c3f966ec211f430834f8645', '2022-11-15 04:26:05'),
(1245, 38, 1, 0, '3368af8c25ea2616717c4aba7df21de54e6bf463f8194d5ce8a40f3b007a8eef', '2022-11-15 04:26:40'),
(1246, 38, 1, 1, '3368af8c25ea2616717c4aba7df21de56b7770aff28a8b9023f30e7541db8a40', '2022-11-15 04:26:41'),
(1247, 38, 1, 0, '3368af8c25ea2616717c4aba7df21de56b7770aff28a8b9023f30e7541db8a40', '2022-11-15 04:26:42'),
(1248, 38, 1, 1, '3368af8c25ea2616717c4aba7df21de57f0b6861f721f677d6889022228b3119', '2022-11-15 04:26:45'),
(1249, 38, 1, 0, '3368af8c25ea2616717c4aba7df21de57f0b6861f721f677d6889022228b3119', '2022-11-15 04:26:47'),
(1250, 38, 1, 1, '3368af8c25ea2616717c4aba7df21de5e038f1388c7fb9bab9d33bb4bb736d3f', '2022-11-15 04:26:47'),
(1251, 38, 1, 0, '3368af8c25ea2616717c4aba7df21de5e038f1388c7fb9bab9d33bb4bb736d3f', '2022-11-15 04:27:32'),
(1252, 38, 1, 1, '83bf9f51be99a533fa0fef3214485cd0f5ca2864cf688a5857174efa4cca0a52', '2022-11-15 04:27:34'),
(1253, 38, 1, 0, '83bf9f51be99a533fa0fef3214485cd0f5ca2864cf688a5857174efa4cca0a52', '2022-11-15 04:29:06'),
(1254, 38, 1, 1, '1f7236236f4b88f22f14847f5bb822605079e9a8b5b88ac591506ac6962a1636', '2022-11-15 04:29:07'),
(1255, 38, 1, 0, '1f7236236f4b88f22f14847f5bb822605079e9a8b5b88ac591506ac6962a1636', '2022-11-15 04:29:20'),
(1256, 38, 1, 1, '1f7236236f4b88f22f14847f5bb82260fb53e57f7d523d59e095c07195e7f953', '2022-11-15 04:29:20'),
(1257, 38, 1, 0, '1f7236236f4b88f22f14847f5bb82260fb53e57f7d523d59e095c07195e7f953', '2022-11-15 04:29:40'),
(1258, 38, 1, 1, '1f7236236f4b88f22f14847f5bb8226026458c5da2a7993583b412b4daf737eb', '2022-11-15 04:29:41'),
(1259, 38, 1, 0, '1f7236236f4b88f22f14847f5bb8226026458c5da2a7993583b412b4daf737eb', '2022-11-15 04:30:04'),
(1260, 38, 1, 1, '55c92ffb9c8d392cecefe3d4029c022a3a0c1e506a069dd2927b5c2fc0a98699', '2022-11-15 04:30:04'),
(1261, 38, 1, 0, '55c92ffb9c8d392cecefe3d4029c022a3a0c1e506a069dd2927b5c2fc0a98699', '2022-11-15 04:30:19'),
(1262, 38, 1, 1, '55c92ffb9c8d392cecefe3d4029c022a8c08509e696bb182453ef0fb4b7ef010', '2022-11-15 04:30:19'),
(1263, 38, 1, 1, '55c92ffb9c8d392cecefe3d4029c022a83e1dfa4d0491f479f05741de912d7a6', '2022-11-15 04:30:48'),
(1264, 38, 1, 0, '55c92ffb9c8d392cecefe3d4029c022a83e1dfa4d0491f479f05741de912d7a6', '2022-11-15 04:30:49'),
(1265, 38, 1, 1, '55c92ffb9c8d392cecefe3d4029c022a57325da4d428c5fcd3001882777f47c5', '2022-11-15 04:30:50'),
(1266, 38, 1, 0, '55c92ffb9c8d392cecefe3d4029c022a57325da4d428c5fcd3001882777f47c5', '2022-11-15 04:32:38'),
(1267, 38, 1, 1, 'ea86e18ed2fff863ae71df1b231f6078a7ac6c2d1afca23d7bfe09a8ea721f8d', '2022-11-15 05:58:11'),
(1268, 38, 1, 0, 'ea86e18ed2fff863ae71df1b231f6078a7ac6c2d1afca23d7bfe09a8ea721f8d', '2022-11-15 05:58:28'),
(1269, 38, 1, 1, 'ea86e18ed2fff863ae71df1b231f60789934790aeaef2318a3437a7dc0937b7e', '2022-11-15 05:58:51'),
(1270, 38, 1, 0, 'ea86e18ed2fff863ae71df1b231f60789934790aeaef2318a3437a7dc0937b7e', '2022-11-15 05:58:54'),
(1271, 38, 1, 1, '5f5f29160e91f0ebe19d3a2d0efe375baad7c32371f21f1f6875fd35bfb711e1', '2022-11-15 05:59:01'),
(1272, 38, 1, 0, '5f5f29160e91f0ebe19d3a2d0efe375baad7c32371f21f1f6875fd35bfb711e1', '2022-11-15 05:59:07'),
(1273, 38, 1, 1, '5f5f29160e91f0ebe19d3a2d0efe375b9cad538228bbbf347618cd41469433eb', '2022-11-15 05:59:39'),
(1274, 38, 1, 0, '5f5f29160e91f0ebe19d3a2d0efe375b9cad538228bbbf347618cd41469433eb', '2022-11-15 06:00:04'),
(1275, 38, 1, 1, '75dec924dbf01f2378b4d562fd38728169e7173e721de31e8394e49f3e80b18d', '2022-11-15 06:00:41'),
(1276, 38, 1, 0, '75dec924dbf01f2378b4d562fd38728169e7173e721de31e8394e49f3e80b18d', '2022-11-15 06:00:46'),
(1277, 38, 1, 1, 'da966be17ef07a99a1742f229af042991372271404e20b5e3edad7df74742ea2', '2022-11-15 06:16:20'),
(1278, 38, 1, 0, 'da966be17ef07a99a1742f229af042991372271404e20b5e3edad7df74742ea2', '2022-11-15 06:17:31'),
(1279, 38, 1, 1, '9ac465c6f055ee6f4df44b240e03aab828d0d824b83476419a41fdfc76481612', '2022-11-15 06:18:15'),
(1280, 38, 1, 0, '9ac465c6f055ee6f4df44b240e03aab828d0d824b83476419a41fdfc76481612', '2022-11-15 06:20:27'),
(1281, 38, 1, 1, '879eb0b7317a28ecddaf6a0f2e725eb43fa1276a87a607b7111e3dd76c55b7f4', '2022-11-15 09:02:24'),
(1282, 38, 1, 0, '879eb0b7317a28ecddaf6a0f2e725eb43fa1276a87a607b7111e3dd76c55b7f4', '2022-11-15 09:03:27'),
(1283, 38, 1, 1, 'cde307dab781f361ddfad4d1859e689fee9fe0f16543d3a913a8393ab3b53ac6', '2022-11-16 21:18:55'),
(1284, 38, 1, 0, 'cde307dab781f361ddfad4d1859e689fee9fe0f16543d3a913a8393ab3b53ac6', '2022-11-16 21:19:05'),
(1285, 38, 1, 1, 'e93adf8755363489d5d6db905824290a61d850c8275ca81c602a85ab97f9e94f', '2022-11-19 03:49:19'),
(1286, 38, 1, 0, 'e93adf8755363489d5d6db905824290a61d850c8275ca81c602a85ab97f9e94f', '2022-11-19 03:50:15'),
(1287, 38, 1, 1, '5258c01e0daf0b9a62283a51802b65c8e19f749306d1660fbee26a88d447d3b6', '2022-11-19 09:27:13'),
(1288, 38, 1, 0, '5258c01e0daf0b9a62283a51802b65c8e19f749306d1660fbee26a88d447d3b6', '2022-11-19 09:27:55'),
(1289, 38, 1, 1, '98f742dcaaf752cd138591f785eeb1c9c6c950c1afdae0eaebe40a34db27db5c', '2022-11-21 22:33:56'),
(1290, 38, 1, 0, '98f742dcaaf752cd138591f785eeb1c9c6c950c1afdae0eaebe40a34db27db5c', '2022-11-21 22:36:17'),
(1291, 38, 1, 1, 'f5f71f9db38f46ef5f973e115153f667bcbdf6364e924e9ec3a9735e54d93ab1', '2022-11-22 16:54:36'),
(1292, 38, 1, 0, 'f5f71f9db38f46ef5f973e115153f667bcbdf6364e924e9ec3a9735e54d93ab1', '2022-11-22 16:54:40'),
(1293, 38, 1, 1, 'f5f71f9db38f46ef5f973e115153f667b2b8ec88b0469d4d59f32786e47c51e6', '2022-11-22 16:54:41'),
(1294, 38, 1, 0, 'f5f71f9db38f46ef5f973e115153f667b2b8ec88b0469d4d59f32786e47c51e6', '2022-11-22 16:54:43'),
(1295, 43, 1, 1, 'ee40fbbacea3bccad4078e5376ee0af616da1c229e3d695775a001c5cb9a9969', '2022-11-24 15:05:39'),
(1296, 43, 1, 0, 'ee40fbbacea3bccad4078e5376ee0af616da1c229e3d695775a001c5cb9a9969', '2022-11-24 15:05:54'),
(1297, 43, 1, 1, 'f3bc76c0ff1e6fc5ad3e9cd62e1d51c056d0904816b1536269044e75c06c8be8', '2022-11-24 15:06:34'),
(1298, 43, 1, 0, 'f3bc76c0ff1e6fc5ad3e9cd62e1d51c056d0904816b1536269044e75c06c8be8', '2022-11-24 15:06:37'),
(1299, 38, 1, 1, 'adf7592dc9214de12378b00b6bb625d1604bdf42018e33dbf150ae3823408462', '2022-11-24 15:43:37'),
(1300, 38, 1, 0, 'adf7592dc9214de12378b00b6bb625d1604bdf42018e33dbf150ae3823408462', '2022-11-24 15:43:49'),
(1301, 38, 1, 1, '138dd3c110c644747a1f4b9db5bc03523cdb0c97bebe50a1ca950d0c4663afc7', '2022-11-24 15:44:05'),
(1302, 38, 1, 0, '138dd3c110c644747a1f4b9db5bc03523cdb0c97bebe50a1ca950d0c4663afc7', '2022-11-24 15:44:13'),
(1303, 38, 1, 1, 'e6717477d0325357db03c799705e4f5cbc8d645b081bfc1786682098889bec1a', '2022-11-24 15:45:30'),
(1304, 38, 1, 0, 'e6717477d0325357db03c799705e4f5cbc8d645b081bfc1786682098889bec1a', '2022-11-24 15:46:05'),
(1305, 38, 1, 1, 'e46c408b18f802433cdb886961a440514a3f72b1050179c192d5a3693884ca5e', '2022-11-24 15:46:24'),
(1306, 38, 1, 0, 'e46c408b18f802433cdb886961a440514a3f72b1050179c192d5a3693884ca5e', '2022-11-24 15:46:30'),
(1307, 38, 1, 1, 'ccfb119592d959fcb7587d21ec8c245cb869d5317f888bb2d6cce418d22a0e67', '2022-11-24 15:48:27'),
(1308, 38, 1, 0, 'ccfb119592d959fcb7587d21ec8c245cb869d5317f888bb2d6cce418d22a0e67', '2022-11-24 15:48:35'),
(1309, 38, 1, 1, '6b9e340d340ede4d6f5bec6c5a41ad1ce5ed5691f43e5d19e5bc4a459696cbfd', '2022-11-24 15:50:44'),
(1310, 38, 1, 0, '6b9e340d340ede4d6f5bec6c5a41ad1ce5ed5691f43e5d19e5bc4a459696cbfd', '2022-11-24 15:50:49'),
(1311, 38, 1, 1, '31c08ef0246300586c55ef49f09b74a7cba84bc6bfb5ee29a7fd88ccd6749627', '2022-11-24 15:51:23'),
(1312, 38, 1, 0, '31c08ef0246300586c55ef49f09b74a7cba84bc6bfb5ee29a7fd88ccd6749627', '2022-11-24 15:51:33'),
(1313, 38, 1, 1, '31c08ef0246300586c55ef49f09b74a77bb82859d5ebc7dc3ef3b28c578f73ef', '2022-11-24 15:51:43'),
(1314, 38, 1, 0, '31c08ef0246300586c55ef49f09b74a77bb82859d5ebc7dc3ef3b28c578f73ef', '2022-11-24 15:53:51'),
(1315, 38, 1, 1, '7590495c85b317741dd6ac07cc18078d043e3a55f379781b5253b2f40b1d0210', '2022-11-24 16:02:01'),
(1316, 38, 1, 0, '7590495c85b317741dd6ac07cc18078d043e3a55f379781b5253b2f40b1d0210', '2022-11-24 16:02:28'),
(1317, 38, 1, 1, '7590495c85b317741dd6ac07cc18078df19428405a94d8754f527807d17a18a7', '2022-11-24 16:02:28'),
(1318, 38, 1, 0, '7590495c85b317741dd6ac07cc18078df19428405a94d8754f527807d17a18a7', '2022-11-24 16:02:31'),
(1319, 38, 1, 1, '7590495c85b317741dd6ac07cc18078d964796fc2b35f0965af1291e96d65b9b', '2022-11-24 16:02:31'),
(1320, 38, 1, 0, '7590495c85b317741dd6ac07cc18078d964796fc2b35f0965af1291e96d65b9b', '2022-11-24 16:04:43'),
(1321, 38, 1, 1, '9e899b7ffb50ccb3f1d3203cbd557d2ee5b2463633821e66587426a56d0c0407', '2022-11-24 16:07:52'),
(1322, 38, 1, 0, '9e899b7ffb50ccb3f1d3203cbd557d2ee5b2463633821e66587426a56d0c0407', '2022-11-24 16:48:08'),
(1323, 38, 1, 1, '87523bd7964e313c437a3236c3d000fd42640219bdf83899a71440348055d154', '2022-11-24 16:50:20'),
(1324, 38, 1, 0, '87523bd7964e313c437a3236c3d000fd42640219bdf83899a71440348055d154', '2022-11-24 16:50:28'),
(1325, 38, 1, 1, '87523bd7964e313c437a3236c3d000fdb32e37adcf196f03d2b785a7221c866b', '2022-11-24 16:50:42'),
(1326, 38, 1, 0, '87523bd7964e313c437a3236c3d000fdb32e37adcf196f03d2b785a7221c866b', '2022-11-24 16:50:50'),
(1327, 38, 1, 1, '87523bd7964e313c437a3236c3d000fd4b3700cff70ae2d808c388df244145c3', '2022-11-24 16:50:56'),
(1328, 38, 1, 0, '87523bd7964e313c437a3236c3d000fd4b3700cff70ae2d808c388df244145c3', '2022-11-24 16:51:09'),
(1329, 38, 1, 1, 'b2215ccfcba31a5dee2ad232a3b928ef15484636b72c535527a19ed6eb55bbe2', '2022-11-24 16:54:22'),
(1330, 38, 1, 0, 'b2215ccfcba31a5dee2ad232a3b928ef15484636b72c535527a19ed6eb55bbe2', '2022-11-24 16:54:22'),
(1331, 38, 1, 1, 'a2d4dbd218132ae0c8eeff33db20262d39976a60db2fffff753cf35fff7f75ad', '2022-11-24 16:59:12'),
(1332, 38, 1, 0, 'a2d4dbd218132ae0c8eeff33db20262d39976a60db2fffff753cf35fff7f75ad', '2022-11-24 16:59:59'),
(1333, 38, 1, 1, '99032886c5220ca097abe253860bc5d9d03e057a2a8848b4c8e1eef5996a6a7d', '2022-11-24 17:04:13'),
(1334, 38, 1, 0, '99032886c5220ca097abe253860bc5d9d03e057a2a8848b4c8e1eef5996a6a7d', '2022-11-24 17:04:24'),
(1335, 38, 1, 1, '99032886c5220ca097abe253860bc5d9b2ac7c89667bb85bb8006ed777d0f297', '2022-11-24 17:04:35'),
(1336, 38, 1, 0, '99032886c5220ca097abe253860bc5d9b2ac7c89667bb85bb8006ed777d0f297', '2022-11-24 17:05:21'),
(1337, 38, 1, 1, '9c6270c13a4d954acc71ae9cccea12a73b9bbc46094b678706d03c131c6a7faa', '2022-11-24 17:24:49'),
(1338, 38, 1, 0, '9c6270c13a4d954acc71ae9cccea12a73b9bbc46094b678706d03c131c6a7faa', '2022-11-24 17:25:21'),
(1339, 38, 1, 1, 'e0d35041d40efafad4bc800bd75678c6e6204849d0b5dd323d2d6f0ac9edef14', '2022-11-24 17:26:19'),
(1340, 38, 1, 0, 'e0d35041d40efafad4bc800bd75678c6e6204849d0b5dd323d2d6f0ac9edef14', '2022-11-24 17:26:55'),
(1341, 38, 1, 1, '9c3a93a37b8db3c5c5de750f9eea8f5a6986bc66c5aa84135fd0ccf37df67efd', '2022-11-24 17:27:43'),
(1342, 38, 1, 0, '9c3a93a37b8db3c5c5de750f9eea8f5a6986bc66c5aa84135fd0ccf37df67efd', '2022-11-24 17:29:53'),
(1343, 38, 1, 1, 'dea492dd3e2851a5d998435f7591a7af8ce57746340a7a58b3752f73ab40d930', '2022-11-24 17:35:01'),
(1344, 38, 1, 0, 'dea492dd3e2851a5d998435f7591a7af8ce57746340a7a58b3752f73ab40d930', '2022-11-24 17:35:02'),
(1345, 38, 1, 1, 'dea492dd3e2851a5d998435f7591a7afcb04bfaa2dc4d39cff698dab4a144d6b', '2022-11-24 17:35:04'),
(1346, 38, 1, 0, 'dea492dd3e2851a5d998435f7591a7afcb04bfaa2dc4d39cff698dab4a144d6b', '2022-11-24 17:37:13'),
(1347, 38, 1, 1, '11552ad8d4a14a73b241035ba734764286f1ccd60bbdbb097090e575ab89ca34', '2022-11-24 17:44:00'),
(1348, 38, 1, 0, '11552ad8d4a14a73b241035ba734764286f1ccd60bbdbb097090e575ab89ca34', '2022-11-24 17:44:06'),
(1349, 38, 1, 1, '11552ad8d4a14a73b241035ba7347642a657e0c085e59ff88f885941ac0cc6af', '2022-11-24 17:44:11'),
(1350, 38, 1, 0, '11552ad8d4a14a73b241035ba7347642a657e0c085e59ff88f885941ac0cc6af', '2022-11-24 17:44:24'),
(1351, 38, 1, 1, '2d6a9686ae4ef88fba2a562e6f8b41c4c310c1b5fd68d59d9a5194a04d10a2e9', '2022-11-24 17:47:55'),
(1352, 38, 1, 0, '2d6a9686ae4ef88fba2a562e6f8b41c4c310c1b5fd68d59d9a5194a04d10a2e9', '2022-11-24 17:54:18'),
(1353, 38, 1, 1, '4135d4f2f91cc829251f9659bd26391688b7c7f73b163cb8f2700dc73309f06e', '2022-11-24 17:57:20'),
(1354, 38, 1, 0, '4135d4f2f91cc829251f9659bd26391688b7c7f73b163cb8f2700dc73309f06e', '2022-11-24 17:58:30'),
(1355, 38, 1, 1, 'c3afc0a29b70fdcc8b5be8f24f2630908d4071bcbfa35db1b2dc355a1e4fcf83', '2022-11-24 18:06:07'),
(1356, 38, 1, 0, 'c3afc0a29b70fdcc8b5be8f24f2630908d4071bcbfa35db1b2dc355a1e4fcf83', '2022-11-24 18:06:14'),
(1357, 41, 1, 1, 'f377e2e3c1cd2b9aa20fadb49454cd19312ca6d04df03f304195a2ed6bfbcdc9', '2022-11-24 18:07:06'),
(1358, 41, 1, 0, 'f377e2e3c1cd2b9aa20fadb49454cd19312ca6d04df03f304195a2ed6bfbcdc9', '2022-11-24 18:07:10'),
(1359, 41, 1, 1, 'f377e2e3c1cd2b9aa20fadb49454cd1931b174e6b4ccf402254d6ee8b3f5482a', '2022-11-24 18:07:15'),
(1360, 41, 1, 0, 'f377e2e3c1cd2b9aa20fadb49454cd1931b174e6b4ccf402254d6ee8b3f5482a', '2022-11-24 18:09:15'),
(1361, 41, 1, 1, '0e9e26082a6352acb0fc9ab0404a19bbe64f08868b2b7163a09939fd5b473dc2', '2022-11-24 18:09:19'),
(1362, 41, 1, 0, '0e9e26082a6352acb0fc9ab0404a19bbe64f08868b2b7163a09939fd5b473dc2', '2022-11-24 18:10:34'),
(1363, 41, 1, 1, '2f0df3ad696a61efd50d69069578e15c7646e9da0012cb2fb843b00c19646b6a', '2022-11-24 18:10:39'),
(1364, 41, 1, 0, '2f0df3ad696a61efd50d69069578e15c7646e9da0012cb2fb843b00c19646b6a', '2022-11-24 18:11:29'),
(1365, 41, 1, 1, '2245c36b3e3604aea7136a9d16f5fa52bc6ab8dc32f568cef7caa01c24280ace', '2022-11-24 18:11:32'),
(1366, 41, 1, 0, '2245c36b3e3604aea7136a9d16f5fa52bc6ab8dc32f568cef7caa01c24280ace', '2022-11-24 18:11:55'),
(1367, 41, 1, 1, '2245c36b3e3604aea7136a9d16f5fa527df7ec560dae52f25bacee09663500ab', '2022-11-24 18:11:59'),
(1368, 41, 1, 0, '2245c36b3e3604aea7136a9d16f5fa527df7ec560dae52f25bacee09663500ab', '2022-11-24 18:12:22'),
(1369, 41, 1, 1, '0ec1ed5b5eea26530ef6aebf6d7a6dc1908edc21a529ae780adeccc36f0a9d0a', '2022-11-24 18:12:29'),
(1370, 41, 1, 0, '0ec1ed5b5eea26530ef6aebf6d7a6dc1908edc21a529ae780adeccc36f0a9d0a', '2022-11-24 18:12:32'),
(1371, 38, 1, 1, '0ec1ed5b5eea26530ef6aebf6d7a6dc19f7ba480c24927dd3278deef9accb517', '2022-11-24 18:12:40'),
(1372, 38, 1, 0, '0ec1ed5b5eea26530ef6aebf6d7a6dc19f7ba480c24927dd3278deef9accb517', '2022-11-24 18:14:54'),
(1373, 38, 1, 1, 'e7477b9c76f4f2c7f7b5a0cc757517c481de05e9f16cb56631282d95f4d62c57', '2022-11-24 18:14:59'),
(1374, 38, 1, 0, 'e7477b9c76f4f2c7f7b5a0cc757517c481de05e9f16cb56631282d95f4d62c57', '2022-11-24 18:17:20'),
(1375, 45, 1, 1, 'fd9666e59dde849a9a7aa9eb844551c222d28cc3091cac7c63b082bb399998e7', '2022-11-24 18:49:41'),
(1376, 45, 1, 0, 'fd9666e59dde849a9a7aa9eb844551c222d28cc3091cac7c63b082bb399998e7', '2022-11-24 18:49:46'),
(1377, 45, 1, 1, 'fd9666e59dde849a9a7aa9eb844551c23f9b0bdd1bcf60fd86d1601c498eaff6', '2022-11-24 18:49:46'),
(1378, 45, 1, 0, 'fd9666e59dde849a9a7aa9eb844551c23f9b0bdd1bcf60fd86d1601c498eaff6', '2022-11-24 18:49:54'),
(1379, 45, 1, 1, 'ad90ed8052f73e060f93a5dd6aa2d3f60107ec20094e0b55c3a021a5fa359577', '2022-11-24 18:50:07'),
(1380, 45, 1, 0, 'ad90ed8052f73e060f93a5dd6aa2d3f60107ec20094e0b55c3a021a5fa359577', '2022-11-24 18:50:11'),
(1381, 45, 1, 1, 'ad90ed8052f73e060f93a5dd6aa2d3f6172ba67b44d133b4393c39f299febad7', '2022-11-24 18:50:45'),
(1382, 45, 1, 0, 'ad90ed8052f73e060f93a5dd6aa2d3f6172ba67b44d133b4393c39f299febad7', '2022-11-24 18:50:51'),
(1383, 45, 1, 1, 'ad90ed8052f73e060f93a5dd6aa2d3f60c34683e4e26791e6fb7cbbc2c32f81d', '2022-11-24 18:50:57'),
(1384, 45, 1, 0, 'ad90ed8052f73e060f93a5dd6aa2d3f60c34683e4e26791e6fb7cbbc2c32f81d', '2022-11-24 18:50:59'),
(1385, 45, 1, 1, 'd01d8a908571629cb974a0c21ea6df30f028fb285468746387c25fafa9c7d2df', '2022-11-24 18:51:19'),
(1386, 45, 1, 0, 'd01d8a908571629cb974a0c21ea6df30f028fb285468746387c25fafa9c7d2df', '2022-11-24 18:51:21'),
(1387, 46, 1, 1, '707a4975fe5607d3ff984992c57844e98d96feb6277423fcdca7c0baf1ecbad5', '2022-11-25 05:45:20'),
(1388, 46, 1, 0, '707a4975fe5607d3ff984992c57844e98d96feb6277423fcdca7c0baf1ecbad5', '2022-11-25 05:46:22'),
(1389, 47, 1, 1, '3e5e021ce11174d51ca044fc1bc53f0c2815bd8ad9010c22f7258ce8dd61397f', '2022-11-25 14:47:12'),
(1390, 47, 1, 0, '3e5e021ce11174d51ca044fc1bc53f0c2815bd8ad9010c22f7258ce8dd61397f', '2022-11-25 14:47:27'),
(1391, 47, 1, 1, '94c0407486c49a5d5c5131279cc2071cddf5e3f8efaaae14910bd0e746b5c531', '2022-11-25 14:56:35'),
(1392, 47, 1, 0, '94c0407486c49a5d5c5131279cc2071cddf5e3f8efaaae14910bd0e746b5c531', '2022-11-25 14:56:41'),
(1393, 47, 1, 1, 'd0019771359e9feb1b8bf26d7dbdcd1e3147e6724d48e217babb03f4168f0f85', '2022-11-25 15:39:39'),
(1394, 47, 1, 0, 'd0019771359e9feb1b8bf26d7dbdcd1e3147e6724d48e217babb03f4168f0f85', '2022-11-25 15:40:09'),
(1395, 47, 1, 1, 'e1f85f7e17c4139a1fe18282209dccd4d637d4f324461d20c27f2b9ba5749677', '2022-11-25 15:40:11'),
(1396, 47, 1, 0, 'e1f85f7e17c4139a1fe18282209dccd4d637d4f324461d20c27f2b9ba5749677', '2022-11-25 15:40:42'),
(1397, 47, 1, 1, 'e1f85f7e17c4139a1fe18282209dccd47569a48e9d0af64ee385993d70521fe8', '2022-11-25 15:40:44'),
(1398, 47, 1, 0, 'e1f85f7e17c4139a1fe18282209dccd47569a48e9d0af64ee385993d70521fe8', '2022-11-25 15:41:54'),
(1399, 47, 1, 1, '41eafaf0d02619c16e640fae00ee9f792ba26d8b167c24ddd78b28c5c691ff63', '2022-11-25 15:42:00'),
(1400, 47, 1, 0, '41eafaf0d02619c16e640fae00ee9f792ba26d8b167c24ddd78b28c5c691ff63', '2022-11-25 15:42:00'),
(1401, 47, 1, 1, '41eafaf0d02619c16e640fae00ee9f798dca58b914fcd0326d906d3726c4ad92', '2022-11-25 15:42:08'),
(1402, 47, 1, 1, 'd439f7a35736b705fa477d4b9f3f308fd49bd6bb5baba39d67ef411ad67479bc', '2022-11-25 15:43:31'),
(1403, 47, 1, 0, '41eafaf0d02619c16e640fae00ee9f798dca58b914fcd0326d906d3726c4ad92', '2022-11-25 15:43:50'),
(1404, 47, 1, 0, 'd439f7a35736b705fa477d4b9f3f308fd49bd6bb5baba39d67ef411ad67479bc', '2022-11-25 15:43:57'),
(1405, 47, 1, 1, '0c307b1fb6824891fb341d1b8a7d6ddbe3c7c09800a8926ee4c94bd64ca5600c', '2022-11-25 15:47:26'),
(1406, 47, 1, 0, '0c307b1fb6824891fb341d1b8a7d6ddbe3c7c09800a8926ee4c94bd64ca5600c', '2022-11-25 15:47:39'),
(1407, 47, 1, 1, '50a53c496345bf66e6a83b890a0a36af8d66c78362db6063c271d43b1844affa', '2022-11-25 15:48:25'),
(1408, 47, 1, 0, '50a53c496345bf66e6a83b890a0a36af8d66c78362db6063c271d43b1844affa', '2022-11-25 15:48:33'),
(1409, 47, 1, 1, '5af5f21f5fdf824f7ad7a8f741d1e3b80dc269b8d65f388fefdc6ccef4dd10c5', '2022-11-25 15:58:37'),
(1410, 47, 1, 0, '5af5f21f5fdf824f7ad7a8f741d1e3b80dc269b8d65f388fefdc6ccef4dd10c5', '2022-11-25 15:59:08'),
(1411, 47, 1, 1, 'd1ec7ad261f5fd275e835938534097d440a6fe5a0caba7be4333173853a213f2', '2022-11-25 15:59:08'),
(1412, 47, 1, 0, 'd1ec7ad261f5fd275e835938534097d440a6fe5a0caba7be4333173853a213f2', '2022-11-25 16:00:21'),
(1413, 47, 1, 1, 'bf78974c2a68dcc2941a4eb1820e477995b7e9c856c5adf5aa0f97ac52d51499', '2022-11-25 16:00:36'),
(1414, 47, 1, 0, 'bf78974c2a68dcc2941a4eb1820e477995b7e9c856c5adf5aa0f97ac52d51499', '2022-11-25 16:05:02'),
(1415, 47, 1, 1, 'cd70de2be6b8579004a4cef102afe40b49d58a30592e841db0bffe9fbf5fca9f', '2022-11-25 16:23:05'),
(1416, 47, 1, 0, 'cd70de2be6b8579004a4cef102afe40b49d58a30592e841db0bffe9fbf5fca9f', '2022-11-25 16:23:13'),
(1417, 47, 1, 1, 'cd70de2be6b8579004a4cef102afe40b5d42bdbe63617899a08fc80e945f7e83', '2022-11-25 16:23:14'),
(1418, 47, 1, 1, 'b88f210d1aac224acf7207dc256f0eeab9c1bd7a46056e7b4085261487d5b3d2', '2022-11-25 16:26:34'),
(1419, 47, 1, 0, 'cd70de2be6b8579004a4cef102afe40b5d42bdbe63617899a08fc80e945f7e83', '2022-11-25 16:26:34'),
(1420, 47, 1, 0, 'b88f210d1aac224acf7207dc256f0eeab9c1bd7a46056e7b4085261487d5b3d2', '2022-11-25 16:26:52'),
(1421, 47, 1, 1, 'b5058d784fbe626bcd911c6b4d4956a7c16950a64801f85ce3143dec242ac662', '2022-11-25 16:27:34'),
(1422, 47, 1, 0, 'b5058d784fbe626bcd911c6b4d4956a7c16950a64801f85ce3143dec242ac662', '2022-11-25 16:28:29'),
(1423, 47, 1, 1, 'ab1887e664012ec9c1372adb67acdc569192271dca64541c80ec45fc49ac9fed', '2022-11-25 17:48:35'),
(1424, 47, 1, 0, 'ab1887e664012ec9c1372adb67acdc569192271dca64541c80ec45fc49ac9fed', '2022-11-25 17:49:07'),
(1425, 47, 1, 1, '21e228512cac06415f3588b86008c4133c0ba4669d517e7a65acfa0fa02cdee2', '2022-11-25 17:49:09'),
(1426, 47, 1, 0, '21e228512cac06415f3588b86008c4133c0ba4669d517e7a65acfa0fa02cdee2', '2022-11-25 17:50:05'),
(1427, 47, 1, 1, '17a0b3cf623214ee24098f18739f1b41591733d5784d9619ff9fd87f40de66ac', '2022-11-25 17:50:07'),
(1428, 47, 1, 0, '17a0b3cf623214ee24098f18739f1b41591733d5784d9619ff9fd87f40de66ac', '2022-11-25 17:51:28'),
(1429, 47, 1, 1, '750dc1b6edf755fb89c607623f96e11c33d76321edb9217b057b783a15db310c', '2022-11-25 17:51:29'),
(1430, 47, 1, 0, '750dc1b6edf755fb89c607623f96e11c33d76321edb9217b057b783a15db310c', '2022-11-25 17:52:29'),
(1431, 47, 1, 1, 'fb76d5ec59213a199a4e0e2904da2c59e7e28b1e68d51308354221c3e8ee0cb0', '2022-11-25 17:52:30'),
(1432, 47, 1, 0, 'fb76d5ec59213a199a4e0e2904da2c59e7e28b1e68d51308354221c3e8ee0cb0', '2022-11-25 17:53:48'),
(1433, 47, 1, 1, 'd188a00c79f231b471d1373023026496973f703a82b2da2dd0ea42cb296eb31b', '2022-11-25 17:53:49'),
(1434, 47, 1, 0, 'd188a00c79f231b471d1373023026496973f703a82b2da2dd0ea42cb296eb31b', '2022-11-25 17:54:44'),
(1435, 47, 1, 1, '3811b6de35e1f0d3bd30eaf6f0a02d06d85718b4dfb4af2b13e5ce0b90e3c2fe', '2022-11-25 17:54:45'),
(1436, 47, 1, 0, '3811b6de35e1f0d3bd30eaf6f0a02d06d85718b4dfb4af2b13e5ce0b90e3c2fe', '2022-11-25 17:55:14'),
(1437, 47, 1, 1, '24f9ae4171f02ca35fa3ae12e549b6805dbb44cc2aea6f43fe2a69cf2d7f9207', '2022-11-25 17:55:15'),
(1438, 47, 1, 1, 'a0da79aa8a5be90a36810e846b9d654e4e678c1e83c3c9db17c1760a2321b349', '2022-11-25 17:58:19'),
(1439, 47, 1, 0, '24f9ae4171f02ca35fa3ae12e549b6805dbb44cc2aea6f43fe2a69cf2d7f9207', '2022-11-25 17:58:20'),
(1440, 47, 1, 1, '1560f7b1de6f5d34890d1f152b444f95535b3d2755f5144c66004c26444e5675', '2022-11-25 18:01:55'),
(1441, 47, 1, 0, 'a0da79aa8a5be90a36810e846b9d654e4e678c1e83c3c9db17c1760a2321b349', '2022-11-25 18:01:56'),
(1442, 47, 1, 0, '1560f7b1de6f5d34890d1f152b444f95535b3d2755f5144c66004c26444e5675', '2022-11-25 18:02:17'),
(1443, 47, 1, 1, '115769c3d7e1a33a3e728f4f4fcdfaeb47f8f79f3333861e929ae4c5ca6ad4d6', '2022-11-25 18:02:59'),
(1444, 47, 1, 0, '115769c3d7e1a33a3e728f4f4fcdfaeb47f8f79f3333861e929ae4c5ca6ad4d6', '2022-11-25 18:32:39'),
(1445, 47, 1, 1, '4c879416418b52126340f2341450105c331462cf22f9f815ef311e43fd7a272b', '2022-11-25 18:37:29'),
(1446, 47, 1, 0, '4c879416418b52126340f2341450105c331462cf22f9f815ef311e43fd7a272b', '2022-11-25 18:38:20'),
(1447, 47, 1, 1, 'f6768d5227a7dd069dfc2c5b22b5969b344bee159e6a8d806d1f07eaab21279d', '2022-11-25 18:38:22'),
(1448, 47, 1, 0, 'f6768d5227a7dd069dfc2c5b22b5969b344bee159e6a8d806d1f07eaab21279d', '2022-11-25 18:39:58'),
(1449, 47, 1, 1, '8c414b2a1e85540e73834fbb52bd0e9e4390f67a79b4163eb8afe4d764ace918', '2022-11-25 18:39:58'),
(1450, 47, 1, 0, '8c414b2a1e85540e73834fbb52bd0e9e4390f67a79b4163eb8afe4d764ace918', '2022-11-25 18:46:19'),
(1451, 47, 1, 1, 'e1ff2db1bbb9c3bd4e6618196ef2703fb36dd113b9e873c11c33d081d765ac4c', '2022-11-25 18:46:22'),
(1452, 47, 1, 0, 'e1ff2db1bbb9c3bd4e6618196ef2703fb36dd113b9e873c11c33d081d765ac4c', '2022-11-25 18:50:29'),
(1453, 47, 1, 1, 'bcc723c16a7f1647bf4cdb50a2da4c7f904203b7db39dd228dc50fa7c52a66c2', '2022-11-25 18:50:31'),
(1454, 47, 1, 0, 'bcc723c16a7f1647bf4cdb50a2da4c7f904203b7db39dd228dc50fa7c52a66c2', '2022-11-25 18:51:08'),
(1455, 47, 1, 1, 'bacd150f00be136403693c381c4def63b6357cb18bce7788a2a300a287c759ef', '2022-11-25 18:51:15'),
(1456, 47, 1, 0, 'bacd150f00be136403693c381c4def63b6357cb18bce7788a2a300a287c759ef', '2022-11-25 18:51:34'),
(1457, 47, 1, 1, 'bacd150f00be136403693c381c4def63f61ea36b6511365e269ac1ea4ffc706a', '2022-11-25 18:51:35'),
(1458, 47, 1, 0, 'bacd150f00be136403693c381c4def63f61ea36b6511365e269ac1ea4ffc706a', '2022-11-25 18:51:50'),
(1459, 47, 1, 1, '909a4edb907c01b6bdc130c255cd3e477ffdcd42057901aad20ece8e57d38dbf', '2022-11-25 18:52:57'),
(1460, 47, 1, 0, '909a4edb907c01b6bdc130c255cd3e477ffdcd42057901aad20ece8e57d38dbf', '2022-11-25 18:53:05'),
(1461, 47, 1, 1, 'e12161f130b916756f9b20e8417ab92427e0b0b6b16eec330219584058dae178', '2022-11-25 18:53:06'),
(1462, 47, 1, 0, 'e12161f130b916756f9b20e8417ab92427e0b0b6b16eec330219584058dae178', '2022-11-25 18:53:35'),
(1463, 47, 1, 1, 'e12161f130b916756f9b20e8417ab9248c5c02a99443709bff7ad2a4938d9f90', '2022-11-25 18:53:36'),
(1464, 47, 1, 0, 'e12161f130b916756f9b20e8417ab9248c5c02a99443709bff7ad2a4938d9f90', '2022-11-25 18:53:48'),
(1465, 47, 1, 1, 'b38cebfd3efc3c20da01d5d3ae9538895911441e46441d447565cdfa1eaa6df9', '2022-11-25 19:00:54'),
(1466, 47, 1, 0, 'b38cebfd3efc3c20da01d5d3ae9538895911441e46441d447565cdfa1eaa6df9', '2022-11-25 19:01:56'),
(1467, 47, 1, 1, 'd15a9b9ed01f69abd71e220dbef5bbbf8367299c0cd914b31398e9310f2a303f', '2022-11-25 19:01:56'),
(1468, 47, 1, 0, 'd15a9b9ed01f69abd71e220dbef5bbbf8367299c0cd914b31398e9310f2a303f', '2022-11-25 19:02:06'),
(1469, 47, 1, 1, 'bf1c79f4f5a3f01aac0970a94e628cc9d3bbfafab71580c9d4075060ac54f229', '2022-11-25 19:02:41'),
(1470, 47, 1, 0, 'bf1c79f4f5a3f01aac0970a94e628cc9d3bbfafab71580c9d4075060ac54f229', '2022-11-25 19:03:04'),
(1471, 47, 1, 1, '646cff0d45678218c0a10072b023df0e082367c9819fe6f190229920d74926a4', '2022-11-25 19:03:11'),
(1472, 47, 1, 0, '646cff0d45678218c0a10072b023df0e082367c9819fe6f190229920d74926a4', '2022-11-25 19:04:34'),
(1473, 47, 1, 1, 'af1398a9e3e5149713f9c41d9da34f8b37680d3fd160fdb722390b7766d54d02', '2022-11-25 19:04:48'),
(1474, 47, 1, 0, 'af1398a9e3e5149713f9c41d9da34f8b37680d3fd160fdb722390b7766d54d02', '2022-11-25 19:05:09'),
(1475, 47, 1, 1, 'a29a8aaef21465d34bf886e253e8f37bc3b602af8b376fce6011d6d34c40cc2e', '2022-11-25 19:06:55'),
(1476, 47, 1, 0, 'a29a8aaef21465d34bf886e253e8f37bc3b602af8b376fce6011d6d34c40cc2e', '2022-11-25 19:07:21'),
(1477, 47, 1, 1, '02ddae8f0e45467732ba3f384c7c98383bb1308464bd0474b4377d77889277f0', '2022-11-25 19:07:36'),
(1478, 47, 1, 0, '02ddae8f0e45467732ba3f384c7c98383bb1308464bd0474b4377d77889277f0', '2022-11-25 19:07:39'),
(1479, 47, 1, 1, '02ddae8f0e45467732ba3f384c7c9838c903a2796444f9d2ddafc6beb8fa3e7c', '2022-11-25 19:07:46'),
(1480, 47, 1, 0, '02ddae8f0e45467732ba3f384c7c9838c903a2796444f9d2ddafc6beb8fa3e7c', '2022-11-25 19:07:50'),
(1481, 47, 1, 1, 'bc85382c7b2d45f2a587cb06501d786d5352baae933998f71f0cd8b38ef74421', '2022-11-25 19:10:49'),
(1482, 47, 1, 0, 'bc85382c7b2d45f2a587cb06501d786d5352baae933998f71f0cd8b38ef74421', '2022-11-25 19:10:54'),
(1483, 47, 1, 1, 'bc85382c7b2d45f2a587cb06501d786dd740ec3aad1ef9ccd35b6c7be0ab64cc', '2022-11-25 19:10:59'),
(1484, 47, 1, 0, 'bc85382c7b2d45f2a587cb06501d786dd740ec3aad1ef9ccd35b6c7be0ab64cc', '2022-11-25 19:11:02'),
(1485, 47, 1, 1, '1e03d6c6022f823ec413fbfdacfcf2a56a1f1ed3f4959d132371f0a4751aefd9', '2022-11-25 19:11:15'),
(1486, 47, 1, 0, '1e03d6c6022f823ec413fbfdacfcf2a56a1f1ed3f4959d132371f0a4751aefd9', '2022-11-25 19:11:18'),
(1487, 47, 1, 1, '1e03d6c6022f823ec413fbfdacfcf2a590962fe0a7262cbfdd28414dbeb1615b', '2022-11-25 19:11:26'),
(1488, 47, 1, 0, '1e03d6c6022f823ec413fbfdacfcf2a590962fe0a7262cbfdd28414dbeb1615b', '2022-11-25 19:11:31'),
(1489, 47, 1, 1, 'a26fc5c97c21b6a73a22be022b1c4c77915c7fdbaeadbf2c61b4e2241fbc6c0c', '2022-11-25 19:16:51'),
(1490, 47, 1, 0, 'a26fc5c97c21b6a73a22be022b1c4c77915c7fdbaeadbf2c61b4e2241fbc6c0c', '2022-11-25 19:18:47'),
(1491, 47, 1, 1, '97b096b836b2d0a41c2b8ecdbb4b3abc72aef611992c0ee1303eab2daea2c9b0', '2022-11-25 19:18:49'),
(1492, 47, 1, 0, '97b096b836b2d0a41c2b8ecdbb4b3abc72aef611992c0ee1303eab2daea2c9b0', '2022-11-25 19:19:26'),
(1493, 47, 1, 1, '8f988d6803c6f84c5c3ae517a35a025db7d6b762e4126a5c8a33f107996a090a', '2022-11-25 19:19:35'),
(1494, 47, 1, 0, '8f988d6803c6f84c5c3ae517a35a025db7d6b762e4126a5c8a33f107996a090a', '2022-11-25 19:21:58'),
(1495, 47, 1, 1, 'cf48ec78a4b7bd1cb481e33320999df283001c0aa56a166dd9790a3d2bcf5ae0', '2022-11-25 19:22:35'),
(1496, 47, 1, 0, 'cf48ec78a4b7bd1cb481e33320999df283001c0aa56a166dd9790a3d2bcf5ae0', '2022-11-25 19:22:37'),
(1497, 47, 1, 1, 'd03a5a70f65d56cb6dd6ca3a4f04bf3828c201ff8b7514d441898217e39765d9', '2022-11-25 19:29:37'),
(1498, 47, 1, 0, 'd03a5a70f65d56cb6dd6ca3a4f04bf3828c201ff8b7514d441898217e39765d9', '2022-11-25 19:30:08'),
(1499, 47, 1, 1, 'f4702021e1d6386f627128f45228f817398d548ad2826a888c99b12907fe5f45', '2022-11-25 19:34:44'),
(1500, 47, 1, 0, 'f4702021e1d6386f627128f45228f817398d548ad2826a888c99b12907fe5f45', '2022-11-25 19:35:03'),
(1501, 47, 1, 1, '64538814434f8b8a43e1fcefd3bd46a9d19d5d14de0e7a77837e4e7c7ecea7fd', '2022-11-25 19:35:48'),
(1502, 47, 1, 0, '64538814434f8b8a43e1fcefd3bd46a9d19d5d14de0e7a77837e4e7c7ecea7fd', '2022-11-25 19:35:57'),
(1503, 47, 1, 1, '9f8d8f3b4361efc3fbfb751cf362114acfa6f0417cf88943b8f41033d60907e8', '2022-11-25 19:36:47'),
(1504, 47, 1, 0, '9f8d8f3b4361efc3fbfb751cf362114acfa6f0417cf88943b8f41033d60907e8', '2022-11-25 19:37:07'),
(1505, 47, 1, 1, '92a82ca9bb2f36095c9c7b88094dccb984029fd5e150b71f03f12d873900c808', '2022-11-25 19:37:50'),
(1506, 47, 1, 0, '92a82ca9bb2f36095c9c7b88094dccb984029fd5e150b71f03f12d873900c808', '2022-11-25 19:38:13'),
(1507, 47, 1, 1, '0ce9d57ef4b6043b6923e89f99246c176fc732cf0e3928afe18c65166d16179d', '2022-11-25 19:40:04'),
(1508, 47, 1, 1, '0ce9d57ef4b6043b6923e89f99246c1749b7063d1167ff02b3bccb85de1c7882', '2022-11-25 19:40:50'),
(1509, 47, 1, 0, '0ce9d57ef4b6043b6923e89f99246c176fc732cf0e3928afe18c65166d16179d', '2022-11-25 19:40:51'),
(1510, 47, 1, 0, '0ce9d57ef4b6043b6923e89f99246c1749b7063d1167ff02b3bccb85de1c7882', '2022-11-25 19:41:45'),
(1511, 47, 1, 1, 'a226357405ae53733a65683ccc3377ef0ce1754b0430ed603834c1814d9af5ce', '2022-11-25 19:47:09'),
(1512, 47, 1, 0, 'a226357405ae53733a65683ccc3377ef0ce1754b0430ed603834c1814d9af5ce', '2022-11-25 19:47:21'),
(1513, 47, 1, 1, 'a226357405ae53733a65683ccc3377efa22033deffc404e1a6a0940c7a6352da', '2022-11-25 19:47:21'),
(1514, 47, 1, 0, 'a226357405ae53733a65683ccc3377efa22033deffc404e1a6a0940c7a6352da', '2022-11-25 19:48:00'),
(1515, 47, 1, 1, '62f8439c95b66f20120db5cd0d6dfd589c81fc8145c4e37f5d1d77d32a4e0939', '2022-11-25 19:48:44'),
(1516, 47, 1, 0, '62f8439c95b66f20120db5cd0d6dfd589c81fc8145c4e37f5d1d77d32a4e0939', '2022-11-25 19:49:10'),
(1517, 47, 1, 1, 'fcc04b05a78210b0d56d456383e3cf310dd4ed64525e800d7cdc5b3df7652c57', '2022-11-25 19:49:11'),
(1518, 47, 1, 0, 'fcc04b05a78210b0d56d456383e3cf310dd4ed64525e800d7cdc5b3df7652c57', '2022-11-25 19:51:22'),
(1519, 47, 1, 1, '8fc985103d6db7d993bc30793207b6c0d37d59dcfd01f4303bf4048853f8f779', '2022-11-25 19:51:54'),
(1520, 47, 1, 0, '8fc985103d6db7d993bc30793207b6c0d37d59dcfd01f4303bf4048853f8f779', '2022-11-25 19:52:15'),
(1521, 47, 1, 1, '3026155b436bb9e2ee3d38790383140f48efb94dac0f42d9f4e14d7c413606a7', '2022-11-25 19:52:53'),
(1522, 47, 1, 0, '3026155b436bb9e2ee3d38790383140f48efb94dac0f42d9f4e14d7c413606a7', '2022-11-25 19:53:15'),
(1523, 47, 1, 1, '118ece1c43d496926b0d24d421c85c7541c3ebba6d43190103f22c3abaa326fb', '2022-11-25 19:53:15'),
(1524, 47, 1, 0, '118ece1c43d496926b0d24d421c85c7541c3ebba6d43190103f22c3abaa326fb', '2022-11-25 19:53:25'),
(1525, 47, 1, 1, '118ece1c43d496926b0d24d421c85c750909b853be6167790c86189bca0a36fa', '2022-11-25 19:53:25'),
(1526, 47, 1, 0, '118ece1c43d496926b0d24d421c85c750909b853be6167790c86189bca0a36fa', '2022-11-25 19:54:18'),
(1527, 47, 1, 1, '266a5abf2dea6384ab4a6bbe5c05d9919030ea039c6f49e3dd961eef8e04df7f', '2022-11-25 20:00:20'),
(1528, 47, 1, 0, '266a5abf2dea6384ab4a6bbe5c05d9919030ea039c6f49e3dd961eef8e04df7f', '2022-11-25 20:03:05'),
(1529, 47, 1, 1, '87f1258a01bee2847b475f4d75e194a6aee8b84fd6dce8701a6e52261f460904', '2022-11-25 20:03:05'),
(1530, 47, 1, 0, '87f1258a01bee2847b475f4d75e194a6aee8b84fd6dce8701a6e52261f460904', '2022-11-25 20:03:09'),
(1531, 47, 1, 1, '87f1258a01bee2847b475f4d75e194a60b4593c3d378159bd0f0969067b69530', '2022-11-25 20:03:25'),
(1532, 47, 1, 0, '87f1258a01bee2847b475f4d75e194a60b4593c3d378159bd0f0969067b69530', '2022-11-25 20:03:28'),
(1533, 47, 1, 1, '87f1258a01bee2847b475f4d75e194a686676e6d4c3034bf6754340705b0462c', '2022-11-25 20:03:59'),
(1534, 47, 1, 0, '87f1258a01bee2847b475f4d75e194a686676e6d4c3034bf6754340705b0462c', '2022-11-25 20:04:17'),
(1535, 47, 1, 1, 'cc3512b8280f2cb655d00ba6554bcb9512efc3ea573abf4bd7584e09c353f13d', '2022-11-25 20:04:55'),
(1536, 47, 1, 0, 'cc3512b8280f2cb655d00ba6554bcb9512efc3ea573abf4bd7584e09c353f13d', '2022-11-25 20:05:20'),
(1537, 47, 1, 1, '854446656e2786ccbe14cd6b31c86a1195aa16063fefbed82bdae5d4961194a4', '2022-11-25 20:05:46'),
(1538, 47, 1, 0, '854446656e2786ccbe14cd6b31c86a1195aa16063fefbed82bdae5d4961194a4', '2022-11-25 20:06:02'),
(1539, 47, 1, 1, 'f115063e4c3e3d2b8b21711660f71d65dc378f7b67964c9539d98ff8aeef0c83', '2022-11-25 20:06:42'),
(1540, 47, 1, 0, 'f115063e4c3e3d2b8b21711660f71d65dc378f7b67964c9539d98ff8aeef0c83', '2022-11-25 20:06:53'),
(1541, 47, 1, 1, '68a710ce8acc2d5cbe70a29b48579a73ed332ddeb02b98dafd90fc3f8e7944f1', '2022-11-25 20:07:48'),
(1542, 47, 1, 0, '68a710ce8acc2d5cbe70a29b48579a73ed332ddeb02b98dafd90fc3f8e7944f1', '2022-11-25 20:08:11'),
(1543, 47, 1, 1, 'be560ddc8334a94760058d2816002c3dbaec6be04da111f8c9f4f0af7c16ed14', '2022-11-25 20:10:59'),
(1544, 47, 1, 0, 'be560ddc8334a94760058d2816002c3dbaec6be04da111f8c9f4f0af7c16ed14', '2022-11-25 20:11:07'),
(1545, 47, 1, 1, 'd5aa3b542879af4a802a82527093c485d5c473c32afc2530640a4020c3537159', '2022-11-25 20:11:14'),
(1546, 47, 1, 0, 'd5aa3b542879af4a802a82527093c485d5c473c32afc2530640a4020c3537159', '2022-11-25 20:11:36'),
(1547, 47, 1, 1, 'd5aa3b542879af4a802a82527093c485b53f2cb143249fe7ad2873216bb2dd9f', '2022-11-25 20:11:38'),
(1548, 47, 1, 0, 'd5aa3b542879af4a802a82527093c485b53f2cb143249fe7ad2873216bb2dd9f', '2022-11-25 20:12:36'),
(1549, 47, 1, 1, 'a2ce43a418977dc97e9b1420bc4f301225dc939fdeca5833017c7d0cfa6c4bcf', '2022-11-25 20:12:42'),
(1550, 47, 1, 0, 'a2ce43a418977dc97e9b1420bc4f301225dc939fdeca5833017c7d0cfa6c4bcf', '2022-11-25 20:13:05'),
(1551, 47, 1, 1, '25418827842885036bcca76a8491d10ad518d2b9784e7b56c66b01ad5d953b37', '2022-11-25 20:13:05'),
(1552, 47, 1, 0, '25418827842885036bcca76a8491d10ad518d2b9784e7b56c66b01ad5d953b37', '2022-11-25 20:13:18'),
(1553, 47, 1, 1, '25418827842885036bcca76a8491d10a2d99032e3c57104c8352d11ecc18b9a0', '2022-11-25 20:13:19'),
(1554, 47, 1, 0, '25418827842885036bcca76a8491d10a2d99032e3c57104c8352d11ecc18b9a0', '2022-11-25 20:13:31'),
(1555, 47, 1, 1, '25418827842885036bcca76a8491d10af208efa500f120f323ba219431fcf69a', '2022-11-25 20:13:32'),
(1556, 47, 1, 0, '25418827842885036bcca76a8491d10af208efa500f120f323ba219431fcf69a', '2022-11-25 20:15:01'),
(1557, 47, 1, 1, '8034217e8f69e3e2e2bb14ec52a937e7fadb37fa24be3a7a15e2b00d43b24267', '2022-11-25 20:16:38'),
(1558, 47, 1, 0, '8034217e8f69e3e2e2bb14ec52a937e7fadb37fa24be3a7a15e2b00d43b24267', '2022-11-25 20:17:15'),
(1559, 47, 1, 1, 'b028f06573ba2f10d347b4416f2294f4b1ec93c90209d28ba6bd94f716a8a4a5', '2022-11-25 20:17:16'),
(1560, 47, 1, 0, 'b028f06573ba2f10d347b4416f2294f4b1ec93c90209d28ba6bd94f716a8a4a5', '2022-11-25 20:17:22'),
(1561, 47, 1, 1, 'b028f06573ba2f10d347b4416f2294f47f00d17c6e1eee0438edd4bf2dfb84b3', '2022-11-25 20:17:22'),
(1562, 47, 1, 0, 'b028f06573ba2f10d347b4416f2294f47f00d17c6e1eee0438edd4bf2dfb84b3', '2022-11-25 20:17:28'),
(1563, 47, 1, 1, 'b028f06573ba2f10d347b4416f2294f4630d229e5e33017c36639c12cb492ac8', '2022-11-25 20:17:29'),
(1564, 47, 1, 0, 'b028f06573ba2f10d347b4416f2294f4630d229e5e33017c36639c12cb492ac8', '2022-11-25 20:17:30'),
(1565, 47, 1, 1, 'b028f06573ba2f10d347b4416f2294f41c26e9a9e4bfe406dc924e466d835499', '2022-11-25 20:17:30'),
(1566, 47, 1, 0, 'b028f06573ba2f10d347b4416f2294f41c26e9a9e4bfe406dc924e466d835499', '2022-11-25 20:17:38'),
(1567, 47, 1, 1, 'b028f06573ba2f10d347b4416f2294f44a6de8c2dbd4c25dca553f701ac72e90', '2022-11-25 20:17:38'),
(1568, 47, 1, 0, 'b028f06573ba2f10d347b4416f2294f44a6de8c2dbd4c25dca553f701ac72e90', '2022-11-25 20:17:45'),
(1569, 47, 1, 1, '84da99c796e03cf820cf71c738ac75004b10bafc7a531d7e500b559ef0368022', '2022-11-25 20:22:22'),
(1570, 47, 1, 0, '84da99c796e03cf820cf71c738ac75004b10bafc7a531d7e500b559ef0368022', '2022-11-25 20:22:29'),
(1571, 47, 1, 1, '84da99c796e03cf820cf71c738ac750036033e17badaf8a22070d8137cea6622', '2022-11-25 20:22:59'),
(1572, 47, 1, 0, '84da99c796e03cf820cf71c738ac750036033e17badaf8a22070d8137cea6622', '2022-11-25 20:23:10'),
(1573, 47, 1, 1, 'ea8d891d1245d1fc05725ec681e886aff2098f28d3a84f95efe29181f64340fe', '2022-11-25 20:25:56'),
(1574, 47, 1, 0, 'ea8d891d1245d1fc05725ec681e886aff2098f28d3a84f95efe29181f64340fe', '2022-11-25 20:26:14');
INSERT INTO `gsession_user_usage` (`id`, `session_id`, `user_id`, `is_start`, `play_nonce`, `timestamp`) VALUES
(1575, 47, 1, 1, '85601720b865225fac0719753717452417ab4a2b36d714c07f836663e8126ea0', '2022-11-25 20:26:28'),
(1576, 47, 1, 0, '85601720b865225fac0719753717452417ab4a2b36d714c07f836663e8126ea0', '2022-11-25 20:27:39'),
(1577, 47, 1, 1, '01b549e1a82e8208457e88b356f89b8c0d73e25ac5a2806298c13dd22af070a9', '2022-11-25 20:27:45'),
(1578, 47, 1, 0, '01b549e1a82e8208457e88b356f89b8c0d73e25ac5a2806298c13dd22af070a9', '2022-11-25 20:28:25'),
(1579, 47, 1, 1, '992353fe8a52610afe563de3671e5da35bb0fd6806eb9707b2ebe7a203944340', '2022-11-25 20:28:32'),
(1580, 47, 1, 0, '992353fe8a52610afe563de3671e5da35bb0fd6806eb9707b2ebe7a203944340', '2022-11-25 20:28:38'),
(1581, 47, 1, 1, '992353fe8a52610afe563de3671e5da3f1e6438112069bb64761fc624421f606', '2022-11-25 20:28:41'),
(1582, 47, 1, 0, '992353fe8a52610afe563de3671e5da3f1e6438112069bb64761fc624421f606', '2022-11-25 20:28:57'),
(1583, 47, 1, 1, 'e169fe8741e376d46453499eb98fcec3c79fa1a7297e52f73456bbcad3c08a30', '2022-11-25 21:09:18'),
(1584, 47, 1, 0, 'e169fe8741e376d46453499eb98fcec3c79fa1a7297e52f73456bbcad3c08a30', '2022-11-25 21:10:21'),
(1585, 47, 1, 1, '9a819912e937bada83bc91ccefb9afde9d668f3d5bc6a8b900002df5b75aeb32', '2022-11-25 21:10:24'),
(1586, 47, 1, 0, '9a819912e937bada83bc91ccefb9afde9d668f3d5bc6a8b900002df5b75aeb32', '2022-11-25 21:10:31'),
(1587, 47, 1, 1, '899f71bd6b2073af7f082799f10eaa64b2b7a5bb894ca7e72bd45d29bdc4fdcc', '2022-11-25 21:13:31'),
(1588, 47, 1, 0, '899f71bd6b2073af7f082799f10eaa64b2b7a5bb894ca7e72bd45d29bdc4fdcc', '2022-11-25 21:14:18'),
(1589, 47, 1, 1, '227ef256e5ad9e573d74d785bbf6ecb9eafaf00c843413f380218b1968a72b6c', '2022-11-25 21:14:34'),
(1590, 47, 1, 0, '227ef256e5ad9e573d74d785bbf6ecb9eafaf00c843413f380218b1968a72b6c', '2022-11-25 21:14:55'),
(1591, 47, 1, 1, '0ee496f0620a378ad37d5e9edd772451212d46c332ff14e52adb5d9d7c99b91a', '2022-11-25 21:15:02'),
(1592, 47, 1, 0, '0ee496f0620a378ad37d5e9edd772451212d46c332ff14e52adb5d9d7c99b91a', '2022-11-25 21:15:26'),
(1593, 47, 1, 1, '0ee496f0620a378ad37d5e9edd77245134289fce42dbb6ae28ae8c66cf1678fa', '2022-11-25 21:15:49'),
(1594, 47, 1, 0, '0ee496f0620a378ad37d5e9edd77245134289fce42dbb6ae28ae8c66cf1678fa', '2022-11-25 21:16:54'),
(1595, 47, 1, 1, 'd35a15c4ea076b9d85b58878a73d1927d81b64541637c4e7c5497754af8a5ed9', '2022-11-25 21:17:02'),
(1596, 47, 1, 0, 'd35a15c4ea076b9d85b58878a73d1927d81b64541637c4e7c5497754af8a5ed9', '2022-11-25 21:17:07'),
(1597, 47, 1, 1, 'd35a15c4ea076b9d85b58878a73d19276a17535427c51453bc7a978746d5a33a', '2022-11-25 21:17:07'),
(1598, 47, 1, 0, 'd35a15c4ea076b9d85b58878a73d19276a17535427c51453bc7a978746d5a33a', '2022-11-25 21:17:22'),
(1599, 47, 1, 1, 'd35a15c4ea076b9d85b58878a73d1927aec99f7e777d950689dab671b98dff3b', '2022-11-25 21:17:23'),
(1600, 47, 1, 0, 'd35a15c4ea076b9d85b58878a73d1927aec99f7e777d950689dab671b98dff3b', '2022-11-25 21:18:33'),
(1601, 47, 1, 1, '6ff1b3306ba04a9d8875f481330e78b520250565f8bd23ab4759b780508e33ec', '2022-11-25 21:19:04'),
(1602, 47, 1, 0, '6ff1b3306ba04a9d8875f481330e78b520250565f8bd23ab4759b780508e33ec', '2022-11-25 21:19:50'),
(1603, 47, 1, 1, 'daa250ca6a5b976d04b7895e5d436cbcfffceb5ddaef7a5f653a5c10c0bc500b', '2022-11-25 21:20:40'),
(1604, 47, 1, 0, 'daa250ca6a5b976d04b7895e5d436cbcfffceb5ddaef7a5f653a5c10c0bc500b', '2022-11-25 21:21:40'),
(1605, 47, 1, 1, '0c82bdee34b10012243fa2d3b7d92a6b51c78dda1e334ff7ee969703a9a78d95', '2022-11-25 21:21:41'),
(1606, 47, 1, 0, '0c82bdee34b10012243fa2d3b7d92a6b51c78dda1e334ff7ee969703a9a78d95', '2022-11-25 21:21:41'),
(1607, 47, 1, 1, '35cba2fc9bab638eb03b96e84adf904e919939238e6d5670a4e5d019b6ace8c5', '2022-11-25 21:23:19'),
(1608, 47, 1, 0, '35cba2fc9bab638eb03b96e84adf904e919939238e6d5670a4e5d019b6ace8c5', '2022-11-25 21:23:33'),
(1609, 47, 1, 1, '35cba2fc9bab638eb03b96e84adf904e58615e04e82ef002c86cdc037b0d6788', '2022-11-25 21:23:34'),
(1610, 47, 1, 0, '35cba2fc9bab638eb03b96e84adf904e58615e04e82ef002c86cdc037b0d6788', '2022-11-25 21:23:47'),
(1611, 47, 1, 1, '35cba2fc9bab638eb03b96e84adf904eb1042524abb457cfd48e0a9c43a5aac0', '2022-11-25 21:23:47'),
(1612, 47, 1, 0, '35cba2fc9bab638eb03b96e84adf904eb1042524abb457cfd48e0a9c43a5aac0', '2022-11-25 21:23:56'),
(1613, 47, 1, 1, '35cba2fc9bab638eb03b96e84adf904e4596ba9acffd7bb12b75cec5b187e76c', '2022-11-25 21:23:57'),
(1614, 47, 1, 0, '35cba2fc9bab638eb03b96e84adf904e4596ba9acffd7bb12b75cec5b187e76c', '2022-11-25 21:24:19'),
(1615, 47, 1, 1, 'ec6dc062ea15b0eb066165d449747cc342ca68b34f22285bf71574a110229e49', '2022-11-25 21:26:06'),
(1616, 47, 1, 0, 'ec6dc062ea15b0eb066165d449747cc342ca68b34f22285bf71574a110229e49', '2022-11-25 21:27:08'),
(1617, 47, 1, 1, 'aa633dc2aae5bb0127d1c91ed07c13c1d330a00377928e5c337842ec08457ef6', '2022-11-25 21:27:25'),
(1618, 47, 1, 0, 'aa633dc2aae5bb0127d1c91ed07c13c1d330a00377928e5c337842ec08457ef6', '2022-11-25 21:27:37'),
(1619, 47, 1, 1, '3a52f69a444aa5329053c2d2bfce9d54a1cde23f05d18b9407c66cb13e64b61d', '2022-11-25 21:34:01'),
(1620, 47, 1, 0, '3a52f69a444aa5329053c2d2bfce9d54a1cde23f05d18b9407c66cb13e64b61d', '2022-11-25 21:34:23'),
(1621, 47, 1, 1, '3a52f69a444aa5329053c2d2bfce9d5415b723f983162cf7580e09d0ee2c3bd0', '2022-11-25 21:34:23'),
(1622, 47, 1, 0, '3a52f69a444aa5329053c2d2bfce9d5415b723f983162cf7580e09d0ee2c3bd0', '2022-11-25 21:35:03'),
(1623, 47, 1, 1, 'aa26d18839b6917285080895953dbf1113e3ddafdfc88808e71d3f077267658a', '2022-11-25 21:38:03'),
(1624, 47, 1, 0, 'aa26d18839b6917285080895953dbf1113e3ddafdfc88808e71d3f077267658a', '2022-11-25 21:41:56'),
(1625, 47, 1, 1, '3c8b0c05bce502b4cdc838269de3ff22a29c9d1da83c5f3d469a6dda37f38978', '2022-11-25 22:00:04'),
(1626, 47, 1, 0, '3c8b0c05bce502b4cdc838269de3ff22a29c9d1da83c5f3d469a6dda37f38978', '2022-11-25 22:00:40'),
(1627, 47, 1, 1, '3c8b0c05bce502b4cdc838269de3ff22477f0376818fe04876bbc2f1b494a087', '2022-11-25 22:00:43'),
(1628, 47, 1, 0, '3c8b0c05bce502b4cdc838269de3ff22477f0376818fe04876bbc2f1b494a087', '2022-11-25 22:02:18'),
(1629, 47, 1, 1, '0ce65d7f173b32471a137b1d8345d5c50346b6dcc2e711cc69a9e3bd9e054ce6', '2022-11-25 22:03:29'),
(1630, 47, 1, 0, '0ce65d7f173b32471a137b1d8345d5c50346b6dcc2e711cc69a9e3bd9e054ce6', '2022-11-25 22:03:47'),
(1631, 47, 1, 1, '46a5477bcb1fc59b45d981e400b0cb8d828258955f73ad07c13fa647ea6a31ea', '2022-11-25 22:04:40'),
(1632, 47, 1, 0, '46a5477bcb1fc59b45d981e400b0cb8d828258955f73ad07c13fa647ea6a31ea', '2022-11-25 22:04:59'),
(1633, 47, 1, 1, 'e4661165c5306d4cf941827709799866a9bce44d24c79a6db6c07970b3638ca3', '2022-11-25 22:06:03'),
(1634, 47, 1, 0, 'e4661165c5306d4cf941827709799866a9bce44d24c79a6db6c07970b3638ca3', '2022-11-25 22:06:48'),
(1635, 47, 1, 1, '53b8dd744203d77ec778826674505d73fd70d77c605e74140ddcf44010b9da3d', '2022-11-25 22:10:28'),
(1636, 47, 1, 0, '53b8dd744203d77ec778826674505d73fd70d77c605e74140ddcf44010b9da3d', '2022-11-25 22:10:56'),
(1637, 47, 1, 1, '53b8dd744203d77ec778826674505d73203a39bd276a264a163740bcf3a55a5d', '2022-11-25 22:10:58'),
(1638, 47, 1, 0, '53b8dd744203d77ec778826674505d73203a39bd276a264a163740bcf3a55a5d', '2022-11-25 22:11:43'),
(1639, 47, 1, 1, 'c3053a52dd2c1f12b1593404688a45086721531428e58df8dd062e3c0772f09d', '2022-11-25 22:15:56'),
(1640, 47, 1, 0, 'c3053a52dd2c1f12b1593404688a45086721531428e58df8dd062e3c0772f09d', '2022-11-25 22:16:00'),
(1641, 47, 1, 1, 'fa6c7ca432cc3df488ace4ad8340c4eab8084f0b48a8e33e9fbbbba2f865827f', '2022-11-25 22:16:14'),
(1642, 47, 1, 0, 'fa6c7ca432cc3df488ace4ad8340c4eab8084f0b48a8e33e9fbbbba2f865827f', '2022-11-25 22:16:18'),
(1643, 47, 1, 1, 'fa6c7ca432cc3df488ace4ad8340c4ea0655c041f60bb5d98324f4e6a8042615', '2022-11-25 22:16:29'),
(1644, 47, 1, 0, 'fa6c7ca432cc3df488ace4ad8340c4ea0655c041f60bb5d98324f4e6a8042615', '2022-11-25 22:16:32'),
(1645, 47, 1, 1, 'fa6c7ca432cc3df488ace4ad8340c4ea27c58357707b675f49c29c317c97881c', '2022-11-25 22:16:33'),
(1646, 47, 1, 0, 'fa6c7ca432cc3df488ace4ad8340c4ea27c58357707b675f49c29c317c97881c', '2022-11-25 22:16:42'),
(1647, 47, 1, 1, '5092642701daa61b63a876d69b0f1928b284106a282cbb0b9bc25fac2a1e8d7b', '2022-11-25 22:17:12'),
(1648, 47, 1, 0, '5092642701daa61b63a876d69b0f1928b284106a282cbb0b9bc25fac2a1e8d7b', '2022-11-25 22:17:16'),
(1649, 47, 1, 1, '5092642701daa61b63a876d69b0f1928e8d2a31a33e493b564bceaaa5ba52031', '2022-11-25 22:17:49'),
(1650, 47, 1, 0, '5092642701daa61b63a876d69b0f1928e8d2a31a33e493b564bceaaa5ba52031', '2022-11-25 22:17:53'),
(1651, 47, 1, 1, '5092642701daa61b63a876d69b0f1928a5414076a6139c251fd6cecf6f3af29a', '2022-11-25 22:17:58'),
(1652, 47, 1, 0, '5092642701daa61b63a876d69b0f1928a5414076a6139c251fd6cecf6f3af29a', '2022-11-25 22:18:02'),
(1653, 47, 1, 1, '59047a7eb249a9864b62008c20aa80e7a10d5248115b1b3a802367932a38a8d2', '2022-11-25 22:18:09'),
(1654, 47, 1, 0, '59047a7eb249a9864b62008c20aa80e7a10d5248115b1b3a802367932a38a8d2', '2022-11-25 22:18:13'),
(1655, 47, 1, 1, '59047a7eb249a9864b62008c20aa80e717f17ada143b12abc97f4a3742010a37', '2022-11-25 22:18:28'),
(1656, 47, 1, 1, 'eae710c64ebd989b97b54d20ead15a3773a3468d09f8f44fe9afa51768971cc6', '2022-11-25 22:19:10'),
(1657, 47, 1, 0, '59047a7eb249a9864b62008c20aa80e717f17ada143b12abc97f4a3742010a37', '2022-11-25 22:19:10'),
(1658, 47, 1, 0, 'eae710c64ebd989b97b54d20ead15a3773a3468d09f8f44fe9afa51768971cc6', '2022-11-25 22:19:17'),
(1659, 47, 1, 1, 'f2854b1038a7c531afe698d08f142d2e27b861cf03a1321b8535319129092ed6', '2022-11-25 22:30:32'),
(1660, 47, 1, 0, 'f2854b1038a7c531afe698d08f142d2e27b861cf03a1321b8535319129092ed6', '2022-11-25 22:30:40'),
(1661, 47, 1, 1, 'f2854b1038a7c531afe698d08f142d2e80bd7835110c007941a360e5dfb84c6f', '2022-11-25 22:30:56'),
(1662, 47, 1, 0, 'f2854b1038a7c531afe698d08f142d2e80bd7835110c007941a360e5dfb84c6f', '2022-11-25 22:31:54'),
(1663, 47, 1, 1, 'd57092a8c9caece5cbf805f1ee2e16c1d75df265ffc173286a992e2e286ec65c', '2022-11-25 22:32:40'),
(1664, 47, 1, 0, 'd57092a8c9caece5cbf805f1ee2e16c1d75df265ffc173286a992e2e286ec65c', '2022-11-25 22:34:04'),
(1665, 48, 1, 1, 'e428c6b5ccdf394049c979cb524a0f0318a27f87e9f268231723e304b8ca11b4', '2022-11-26 03:34:42'),
(1666, 48, 1, 0, 'e428c6b5ccdf394049c979cb524a0f0318a27f87e9f268231723e304b8ca11b4', '2022-11-26 03:34:45'),
(1667, 48, 1, 1, '81de1d9b7d7aabeb1a34ca60040d99d87aded266453e5c1b6ebf652a3d29756c', '2022-11-26 03:35:02'),
(1668, 48, 1, 0, '81de1d9b7d7aabeb1a34ca60040d99d87aded266453e5c1b6ebf652a3d29756c', '2022-11-26 03:35:05'),
(1669, 48, 1, 1, 'df4e20b4f81ba9f9036297a973bb92674c76333706af2ce23b7525b2eeab5833', '2022-11-26 03:36:25'),
(1670, 48, 1, 0, 'df4e20b4f81ba9f9036297a973bb92674c76333706af2ce23b7525b2eeab5833', '2022-11-26 03:36:27'),
(1671, 48, 1, 1, 'ceb191e9935e2baf41b58bad157f90801456f4086bb322aefcf8c5b120ec7dc1', '2022-11-26 03:39:08'),
(1672, 48, 1, 0, 'ceb191e9935e2baf41b58bad157f90801456f4086bb322aefcf8c5b120ec7dc1', '2022-11-26 03:39:11'),
(1673, 48, 1, 1, 'ceb191e9935e2baf41b58bad157f90806a640038fa4aacb77c401a11a4ad3096', '2022-11-26 03:39:11'),
(1674, 48, 1, 0, 'ceb191e9935e2baf41b58bad157f90806a640038fa4aacb77c401a11a4ad3096', '2022-11-26 03:40:36'),
(1675, 48, 1, 1, 'b93025e56849b02580c727381158bde44a5a66d730a458f86c461f29a235de15', '2022-11-26 03:40:39'),
(1676, 48, 1, 0, 'b93025e56849b02580c727381158bde44a5a66d730a458f86c461f29a235de15', '2022-11-26 03:40:45'),
(1677, 48, 1, 1, 'b93025e56849b02580c727381158bde455b6da92eeef22a7be4892d31c9b874e', '2022-11-26 03:40:51'),
(1678, 48, 1, 0, 'b93025e56849b02580c727381158bde455b6da92eeef22a7be4892d31c9b874e', '2022-11-26 03:40:56'),
(1679, 48, 1, 1, '5e891eea67def7d85b739e1dd45252ab36489310600a7c3aef4d0f1af18e5f34', '2022-11-26 03:41:00'),
(1680, 48, 1, 0, '5e891eea67def7d85b739e1dd45252ab36489310600a7c3aef4d0f1af18e5f34', '2022-11-26 03:41:18'),
(1681, 48, 1, 1, '5e891eea67def7d85b739e1dd45252ab2037c4fb0300766b17c71a0ab6b079ce', '2022-11-26 03:41:35'),
(1682, 48, 1, 0, '5e891eea67def7d85b739e1dd45252ab2037c4fb0300766b17c71a0ab6b079ce', '2022-11-26 03:41:39'),
(1683, 48, 1, 1, '4c7bbb31a3004d25e2ef30787f081cf932af1697101e7ceaa57de31341d84330', '2022-11-26 03:45:43'),
(1684, 48, 1, 0, '4c7bbb31a3004d25e2ef30787f081cf932af1697101e7ceaa57de31341d84330', '2022-11-26 03:45:50'),
(1685, 48, 1, 1, 'b947245a0da806199d5220438e01ca75e636b8273f77548422d8c695d878b0d2', '2022-11-26 03:46:43'),
(1686, 48, 1, 0, 'b947245a0da806199d5220438e01ca75e636b8273f77548422d8c695d878b0d2', '2022-11-26 03:46:51'),
(1687, 48, 1, 1, '6f8c838747b377e7d876fab36525452902fbdd4c60e2fc97b7e7e8e84749e162', '2022-11-26 03:47:35'),
(1688, 48, 1, 0, '6f8c838747b377e7d876fab36525452902fbdd4c60e2fc97b7e7e8e84749e162', '2022-11-26 03:47:39'),
(1689, 48, 1, 1, 'cd7d8568fab2ddea787e4a8f995aa0be0c64222dd10adc53cc259a2f6ff1f312', '2022-11-26 03:51:12'),
(1690, 48, 1, 0, 'cd7d8568fab2ddea787e4a8f995aa0be0c64222dd10adc53cc259a2f6ff1f312', '2022-11-26 03:51:15'),
(1691, 48, 1, 1, 'cd7d8568fab2ddea787e4a8f995aa0befd6fcb8220c300860ad36452f22047a9', '2022-11-26 03:51:25'),
(1692, 48, 1, 0, 'cd7d8568fab2ddea787e4a8f995aa0befd6fcb8220c300860ad36452f22047a9', '2022-11-26 03:51:27'),
(1693, 48, 1, 1, '183327e019cf220f28d260fec4b45d56fe6b61d21a6fef049cec367fcad76654', '2022-11-26 03:56:39'),
(1694, 48, 1, 0, '183327e019cf220f28d260fec4b45d56fe6b61d21a6fef049cec367fcad76654', '2022-11-26 03:56:46'),
(1695, 48, 1, 1, '183327e019cf220f28d260fec4b45d56326deecdddb2440e35a4dfb75bbaebb2', '2022-11-26 03:56:57'),
(1696, 48, 1, 0, '183327e019cf220f28d260fec4b45d56326deecdddb2440e35a4dfb75bbaebb2', '2022-11-26 03:56:59'),
(1697, 48, 1, 1, '183327e019cf220f28d260fec4b45d5613e408fa48385005dd83ae95b7807abb', '2022-11-26 03:56:59'),
(1698, 48, 1, 0, '183327e019cf220f28d260fec4b45d5613e408fa48385005dd83ae95b7807abb', '2022-11-26 03:57:01'),
(1699, 48, 1, 1, '6f963edf7d469bc63a225f269649d5c8120d0f4f766d7d2765c3f855b742a57b', '2022-11-26 03:57:02'),
(1700, 48, 1, 0, '6f963edf7d469bc63a225f269649d5c8120d0f4f766d7d2765c3f855b742a57b', '2022-11-26 03:57:09'),
(1701, 48, 1, 1, '6f963edf7d469bc63a225f269649d5c8ba51aa8e04e491084a126a10e2718cb2', '2022-11-26 03:57:42'),
(1702, 48, 1, 0, '6f963edf7d469bc63a225f269649d5c8ba51aa8e04e491084a126a10e2718cb2', '2022-11-26 03:57:54'),
(1703, 48, 1, 1, 'da850b743b072ba8a2000859b599fdd6992e253d2331e7bc2c2cc2490e05489c', '2022-11-26 03:58:11'),
(1704, 48, 1, 0, 'da850b743b072ba8a2000859b599fdd6992e253d2331e7bc2c2cc2490e05489c', '2022-11-26 03:58:19'),
(1705, 48, 1, 1, 'e257b86cb25b9c32dd7695a0c0b08a84a9d1466d3c3ce49cbc219d15c4108a4b', '2022-11-26 03:59:31'),
(1706, 48, 1, 0, 'e257b86cb25b9c32dd7695a0c0b08a84a9d1466d3c3ce49cbc219d15c4108a4b', '2022-11-26 03:59:36'),
(1707, 48, 1, 1, 'e257b86cb25b9c32dd7695a0c0b08a846af03eb871a3d1e1796a6032282fa4c6', '2022-11-26 03:59:52'),
(1708, 48, 1, 0, 'e257b86cb25b9c32dd7695a0c0b08a846af03eb871a3d1e1796a6032282fa4c6', '2022-11-26 03:59:56'),
(1709, 48, 1, 1, '8b208b6973bdfce366eb158429a42d241d9023960ea7deef5ed5807ee13ac0c2', '2022-11-26 04:01:34'),
(1710, 48, 1, 0, '8b208b6973bdfce366eb158429a42d241d9023960ea7deef5ed5807ee13ac0c2', '2022-11-26 04:01:37'),
(1711, 48, 1, 1, '92fbdc7ab35a21cba6fa3e1c113bc3661515ca9d18400a90464bdc12b94c55d7', '2022-11-26 04:02:03'),
(1712, 48, 1, 0, '92fbdc7ab35a21cba6fa3e1c113bc3661515ca9d18400a90464bdc12b94c55d7', '2022-11-26 04:02:15'),
(1713, 48, 1, 1, '9d24c27e93e460a324008e46e737da28eb4eb4f15c42fff359e04638e4085407', '2022-11-26 04:04:23'),
(1714, 48, 1, 0, '9d24c27e93e460a324008e46e737da28eb4eb4f15c42fff359e04638e4085407', '2022-11-26 04:04:29'),
(1715, 48, 1, 1, '9d24c27e93e460a324008e46e737da280644691577fa488b4b117b06a6f3c8bd', '2022-11-26 04:04:52'),
(1716, 48, 1, 0, '9d24c27e93e460a324008e46e737da280644691577fa488b4b117b06a6f3c8bd', '2022-11-26 04:04:58'),
(1717, 48, 1, 1, '8d85627482fd14519f7a8f7c6fd7b26e271a743dd6ffe857ec1ee9d800fbac04', '2022-11-26 04:05:11'),
(1718, 48, 1, 0, '8d85627482fd14519f7a8f7c6fd7b26e271a743dd6ffe857ec1ee9d800fbac04', '2022-11-26 04:05:18'),
(1719, 48, 1, 1, '8d85627482fd14519f7a8f7c6fd7b26ec2327e539b0974203eda1dca6714b850', '2022-11-26 04:05:23'),
(1720, 48, 1, 0, '8d85627482fd14519f7a8f7c6fd7b26ec2327e539b0974203eda1dca6714b850', '2022-11-26 04:05:28'),
(1721, 48, 1, 1, 'c8135331eb28e6a58e0eb0da90823f7959f1b78dded0f485b6c3b282245ef407', '2022-11-26 04:06:13'),
(1722, 48, 1, 0, 'c8135331eb28e6a58e0eb0da90823f7959f1b78dded0f485b6c3b282245ef407', '2022-11-26 04:06:21'),
(1723, 48, 1, 1, 'c8135331eb28e6a58e0eb0da90823f79d498390b1020b8bec6aafa61712676c2', '2022-11-26 04:06:27'),
(1724, 48, 1, 0, 'c8135331eb28e6a58e0eb0da90823f79d498390b1020b8bec6aafa61712676c2', '2022-11-26 04:06:37'),
(1725, 48, 1, 1, 'bcf5c6f603f69b24d6bfd57f9bccbe2592df5a23a9c1c635ab0279ac93a09c74', '2022-11-26 04:07:49'),
(1726, 48, 1, 0, 'bcf5c6f603f69b24d6bfd57f9bccbe2592df5a23a9c1c635ab0279ac93a09c74', '2022-11-26 04:07:54'),
(1727, 48, 1, 1, '529b5519caad3d622c4acca0bc48e673758f9b3f683c2d7641af963e128d938e', '2022-11-26 04:08:01'),
(1728, 48, 1, 0, '529b5519caad3d622c4acca0bc48e673758f9b3f683c2d7641af963e128d938e', '2022-11-26 04:08:06'),
(1729, 48, 1, 1, '529b5519caad3d622c4acca0bc48e6738e4409343e1368d3e73cea5c32068bed', '2022-11-26 04:08:16'),
(1730, 48, 1, 0, '529b5519caad3d622c4acca0bc48e6738e4409343e1368d3e73cea5c32068bed', '2022-11-26 04:08:20'),
(1731, 48, 1, 1, '529b5519caad3d622c4acca0bc48e6735b5a78b481eacffd45f0db9dfed745c7', '2022-11-26 04:08:24'),
(1732, 48, 1, 0, '529b5519caad3d622c4acca0bc48e6735b5a78b481eacffd45f0db9dfed745c7', '2022-11-26 04:08:29'),
(1733, 48, 1, 1, '24fec7a47e0fb381d3d0d4d73ae172fee92ef199e31de91273f906de609df7da', '2022-11-26 04:21:57'),
(1734, 48, 1, 0, '24fec7a47e0fb381d3d0d4d73ae172fee92ef199e31de91273f906de609df7da', '2022-11-26 04:22:05'),
(1735, 48, 1, 1, '47386cd777bc0c0136dae367329bcc1fe99db610f8bec198ddc8dc87c9b0b244', '2022-11-26 04:22:13'),
(1736, 48, 1, 0, '47386cd777bc0c0136dae367329bcc1fe99db610f8bec198ddc8dc87c9b0b244', '2022-11-26 04:22:19'),
(1737, 48, 1, 1, '47386cd777bc0c0136dae367329bcc1f035749538461f2530132c4979d22ad32', '2022-11-26 04:22:26'),
(1738, 48, 1, 0, '47386cd777bc0c0136dae367329bcc1f035749538461f2530132c4979d22ad32', '2022-11-26 04:22:47'),
(1739, 48, 1, 1, '75db4ed15c994b3fe28a441d960c35d96e82c4f07fecebb5931b3325dcfd26a5', '2022-11-26 04:24:24'),
(1740, 48, 1, 0, '75db4ed15c994b3fe28a441d960c35d96e82c4f07fecebb5931b3325dcfd26a5', '2022-11-26 04:24:27'),
(1741, 48, 1, 1, '75db4ed15c994b3fe28a441d960c35d93fea3264264b2c5929349e30e5d6fb52', '2022-11-26 04:24:38'),
(1742, 48, 1, 0, '75db4ed15c994b3fe28a441d960c35d93fea3264264b2c5929349e30e5d6fb52', '2022-11-26 04:25:01'),
(1743, 48, 1, 1, 'dd90939b847c5161c5fe3a482633f63b86a127d75851700ceffc2fabd7ac67c2', '2022-11-26 04:25:02'),
(1744, 48, 1, 0, 'dd90939b847c5161c5fe3a482633f63b86a127d75851700ceffc2fabd7ac67c2', '2022-11-26 04:25:31'),
(1745, 48, 1, 1, 'e3bdd6a94b6e2e9b6086316c7b4a188eee51523aecda7b9f961c3473a1cc399d', '2022-11-26 04:26:32'),
(1746, 48, 1, 0, 'e3bdd6a94b6e2e9b6086316c7b4a188eee51523aecda7b9f961c3473a1cc399d', '2022-11-26 04:26:35'),
(1747, 48, 1, 1, '1ed722c94e9dcfbd8c0667b4aed580602ec9618bb589d536c7c65663f48fb3bf', '2022-11-26 04:37:46'),
(1748, 48, 1, 0, '1ed722c94e9dcfbd8c0667b4aed580602ec9618bb589d536c7c65663f48fb3bf', '2022-11-26 04:42:27'),
(1749, 48, 1, 1, '4a6cad8ffc6ad9db9ec403a971c3bebba03329cdad8287fe73118725cecdf728', '2022-11-26 04:42:31'),
(1750, 48, 1, 0, '4a6cad8ffc6ad9db9ec403a971c3bebba03329cdad8287fe73118725cecdf728', '2022-11-26 04:42:48'),
(1751, 48, 1, 1, 'f111c4588a11fb0947b43607a8ea847ab151d4908cd2c6500c2e976cee77dd92', '2022-11-26 04:50:14'),
(1752, 48, 1, 0, 'f111c4588a11fb0947b43607a8ea847ab151d4908cd2c6500c2e976cee77dd92', '2022-11-26 04:55:21'),
(1753, 48, 1, 1, '603efb67dc71695ce5dcb486cb9baa0f67dceaef98154184865c27077b3a4ecb', '2022-11-26 04:55:33'),
(1754, 48, 1, 0, '603efb67dc71695ce5dcb486cb9baa0f67dceaef98154184865c27077b3a4ecb', '2022-11-26 04:56:25'),
(1755, 48, 1, 1, 'ae606878c3e43af231b520c259fb3d4ba000975d81913d388ac9e9fa2501d5ef', '2022-11-26 04:56:27'),
(1756, 48, 1, 0, 'ae606878c3e43af231b520c259fb3d4ba000975d81913d388ac9e9fa2501d5ef', '2022-11-26 04:56:46'),
(1757, 48, 1, 1, 'ae606878c3e43af231b520c259fb3d4b786f149bb440ee5fe33d08b26ced853f', '2022-11-26 04:56:47'),
(1758, 48, 1, 0, 'ae606878c3e43af231b520c259fb3d4b786f149bb440ee5fe33d08b26ced853f', '2022-11-26 04:57:32'),
(1759, 48, 1, 1, '8489734efa536b49b87ff980622c369ad3a47b4546a2fbaa77a33758c4ca399d', '2022-11-26 04:57:34'),
(1760, 48, 1, 0, '8489734efa536b49b87ff980622c369ad3a47b4546a2fbaa77a33758c4ca399d', '2022-11-26 04:57:54'),
(1761, 46, 1, 1, '7ea44fe33bf17d03c6f135d27efda8376e6b0aad118be3f76869a1c057499e9c', '2022-11-26 04:58:04'),
(1762, 46, 1, 0, '7ea44fe33bf17d03c6f135d27efda8376e6b0aad118be3f76869a1c057499e9c', '2022-11-26 04:58:43'),
(1763, 46, 1, 1, '51a93f869ee887e83b9ceb9966cc29817c8be43691e3541a6abbc76bd99352cf', '2022-11-26 05:00:57'),
(1764, 46, 1, 0, '51a93f869ee887e83b9ceb9966cc29817c8be43691e3541a6abbc76bd99352cf', '2022-11-26 05:01:41'),
(1765, 46, 1, 1, 'e0f946355c02ca7529411376ea0f278b985ea1e32d10b49826043d901ffdea40', '2022-11-26 05:02:13'),
(1766, 46, 1, 0, 'e0f946355c02ca7529411376ea0f278b985ea1e32d10b49826043d901ffdea40', '2022-11-26 05:03:18');

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
(8, 'Thisura', 'thisura@edge.lk', 2, '57d7e6105555f0c74dadfa823f451604'),
(9, 'Nithika', 'nithika@edge.lk', 3, '57d7e6105555f0c74dadfa823f451604'),
(10, 'Tissa', 'tissa@edge.lk', 4, '57d7e6105555f0c74dadfa823f451604'),
(11, 'kesara', 'kesara@gmail.com', 4, '57d7e6105555f0c74dadfa823f451604'),
(12, 'test3', 'test3@edge.lk', 3, '25d55ad283aa400af464c76d713c07ad'),
(13, 'Nishanthi', 'nishanthi@edge.lk', 5, '57d7e6105555f0c74dadfa823f451604');

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
(325, 1, '5da9d347-fc16-4bc6-8a55-904c95dac535', '2022-11-26 11:03:26'),
(326, 1, '67a6e656-86b5-499f-aef0-ef9f2c464f69', '2022-11-26 11:03:26');

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
  `invite_link` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'May store the cryptographic invitation key, but not the complete path or URL',
  `user_limit` int DEFAULT '-1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_group`
--

INSERT INTO `user_group` (`group_id`, `name`, `description`, `banned_user_ids`, `invite_link`, `user_limit`) VALUES
(8, 'Test Group 1', 'This is the first group created through Angular Dashboard.', '', NULL, NULL),
(11, 'Crypto Test 3', 'Test #3 I\'m so tired.', '', NULL, NULL),
(12, 'Crypto Test #3', 'I don\'t think this will ever count towards my future.', '', '4e564ea26b7fd00d24727c049e137127', NULL),
(20, 'Test Group', 'Group for for testing game ID \\\'22\\\'', '', 'a9f8174f9125ba093adcc898bb807a7b', 1),
(26, 'Test Group', 'Group for for testing game ID \'33\' - CoolTemplate', '', 'b56390c3d631ada9d793422a54b71276', 1),
(27, 'Test Group', 'Group for for testing game ID \'35\' - TestTemplate2', '', 'd8b01c3527309d326dbd214bc3828044', 1),
(28, 'Test Group', 'Group for for testing game ID \'34\' - Test Template', '', '94c18e03a1061b80e491b383cbc8c80d', 1),
(29, 'My Classroom 1', 'Test Classroom!', '', '44503bb2fcbf2d37f8f739ccd74971a5', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_group_membership`
--

CREATE TABLE `user_group_membership` (
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_group_membership`
--

INSERT INTO `user_group_membership` (`user_id`, `group_id`, `last_updated`) VALUES
(11, 12, '2021-09-11 22:55:23'),
(1, 26, '2022-08-09 10:00:28'),
(13, 26, '2022-08-16 05:59:26'),
(1, 27, '2022-08-16 06:05:00'),
(9, 27, '2022-09-19 20:37:00'),
(10, 27, '2022-09-19 20:37:53'),
(13, 27, '2022-11-13 07:24:09'),
(1, 28, '2022-09-20 17:21:43'),
(1, 29, '2022-11-24 18:19:50');

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
  `approved` int NOT NULL DEFAULT '0' COMMENT 'Is Relationship Verified?',
  `type` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_relationship`
--

INSERT INTO `user_relationship` (`rid`, `u_one_id`, `u_one_rnk`, `u_two_id`, `u_two_rnk`, `approved`, `type`) VALUES
(1, 13, 2, 9, 1, 1, 1),
(3, 10, 2, 9, 1, 1, 1),
(4, 8, 1, 10, 2, 1, 1);

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

--
-- Dumping data for table `user_relationship_type`
--

INSERT INTO `user_relationship_type` (`type_id`, `name`) VALUES
(1, 'guardian_child');

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
(4, 'parent'),
(5, 'creator');

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_game_entry_parent_template` (`parent_entry_id`);

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
  ADD PRIMARY KEY (`session_id`),
  ADD KEY `fk_gsession_game_entry_id` (`game_entry_id`),
  ADD KEY `fk_gsession_group_id` (`group_id`);

--
-- Indexes for table `gsession_members`
--
ALTER TABLE `gsession_members`
  ADD UNIQUE KEY `gsession_user_id_session_id` (`user_id`,`session_id`),
  ADD KEY `fk_gsession_user_id` (`user_id`) USING BTREE,
  ADD KEY `fk_gsession_session_id` (`session_id`) USING BTREE;

--
-- Indexes for table `gsession_user_guidance_tracker`
--
ALTER TABLE `gsession_user_guidance_tracker`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_gugt_session_id` (`session_id`),
  ADD KEY `fk_gugt_tracker_id` (`tracker_id`),
  ADD KEY `fk_gugt_user_id` (`user_id`);

--
-- Indexes for table `gsession_user_objective`
--
ALTER TABLE `gsession_user_objective`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_gsu_session_id` (`session_id`),
  ADD KEY `fk_gsu_objective_id` (`objective_id`),
  ADD KEY `fk_gsu_user_id` (`user_id`);

--
-- Indexes for table `gsession_user_usage`
--
ALTER TABLE `gsession_user_usage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_gusg_session_id` (`session_id`),
  ADD KEY `fk_gusg_user_id` (`user_id`);

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
  ADD UNIQUE KEY `group_id` (`group_id`,`user_id`),
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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `game_guidance_tracker`
--
ALTER TABLE `game_guidance_tracker`
  MODIFY `tracker_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `game_objective`
--
ALTER TABLE `game_objective`
  MODIFY `objective_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `gsessions`
--
ALTER TABLE `gsessions`
  MODIFY `session_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `gsession_user_guidance_tracker`
--
ALTER TABLE `gsession_user_guidance_tracker`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=200;

--
-- AUTO_INCREMENT for table `gsession_user_objective`
--
ALTER TABLE `gsession_user_objective`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT for table `gsession_user_usage`
--
ALTER TABLE `gsession_user_usage`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1767;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user_auth`
--
ALTER TABLE `user_auth`
  MODIFY `auth_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=327;

--
-- AUTO_INCREMENT for table `user_capability`
--
ALTER TABLE `user_capability`
  MODIFY `cap_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_group`
--
ALTER TABLE `user_group`
  MODIFY `group_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `user_relationship`
--
ALTER TABLE `user_relationship`
  MODIFY `rid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_relationship_type`
--
ALTER TABLE `user_relationship_type`
  MODIFY `type_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_type`
--
ALTER TABLE `user_type`
  MODIFY `user_type_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `game_entry`
--
ALTER TABLE `game_entry`
  ADD CONSTRAINT `fk_game_entry_parent_template` FOREIGN KEY (`parent_entry_id`) REFERENCES `game_entry` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

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
-- Constraints for table `gsessions`
--
ALTER TABLE `gsessions`
  ADD CONSTRAINT `fk_gsession_game_entry_id` FOREIGN KEY (`game_entry_id`) REFERENCES `game_entry` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_gsession_group_id` FOREIGN KEY (`group_id`) REFERENCES `user_group` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `gsession_members`
--
ALTER TABLE `gsession_members`
  ADD CONSTRAINT `fk_session_id` FOREIGN KEY (`session_id`) REFERENCES `gsessions` (`session_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `gsession_user_guidance_tracker`
--
ALTER TABLE `gsession_user_guidance_tracker`
  ADD CONSTRAINT `fk_gugt_session_id` FOREIGN KEY (`session_id`) REFERENCES `gsessions` (`session_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_gugt_tracker_id` FOREIGN KEY (`tracker_id`) REFERENCES `game_guidance_tracker` (`tracker_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_gugt_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `gsession_user_objective`
--
ALTER TABLE `gsession_user_objective`
  ADD CONSTRAINT `fk_gsu_objective_id` FOREIGN KEY (`objective_id`) REFERENCES `game_objective` (`objective_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_gsu_session_id` FOREIGN KEY (`session_id`) REFERENCES `gsessions` (`session_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_gsu_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `gsession_user_usage`
--
ALTER TABLE `gsession_user_usage`
  ADD CONSTRAINT `fk_gusg_session_id` FOREIGN KEY (`session_id`) REFERENCES `gsessions` (`session_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_gusg_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
