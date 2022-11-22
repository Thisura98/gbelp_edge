-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: mysqlhost
-- Generation Time: Nov 22, 2022 at 12:01 AM
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
(38, '1', 'RocketLogic', 1, 1, 0, NULL, 1, 0, 1, '6372aaa75959633a814b9973', 1, 1, 1, 0, 1);

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
(13, 38, 'No points for 30 seconds', 'No points obtained for first 30 seconds of gameplay', 30);

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
(14, 38, '5 points in 12 seconds', 'Obtain 5 points within 12 seconds!', 5);

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
(38, 3, 3, 38, 28, '2022-11-15 02:47:36', NULL);

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
(126, 38, 12, 1, 1, '98f742dcaaf752cd138591f785eeb1c9c6c950c1afdae0eaebe40a34db27db5c', '2022-11-21 22:34:16');

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
(89, 38, 14, 1, 0, '5258c01e0daf0b9a62283a51802b65c8e19f749306d1660fbee26a88d447d3b6', '2022-11-19 09:27:15');

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
(1290, 38, 1, 0, '98f742dcaaf752cd138591f785eeb1c9c6c950c1afdae0eaebe40a34db27db5c', '2022-11-21 22:36:17');

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
(150, 1, '7f058924-2a29-41ab-8c2d-779af384644b', '2021-09-11 21:21:50'),
(152, 1, 'a4dd7bfb-28e6-4d59-96c8-f4b530f9e322', '2021-09-12 02:38:28'),
(153, 1, 'f3a4aa28-2149-498d-8bf0-10040bc62260', '2021-09-12 05:42:03'),
(154, 1, 'd743e6df-0698-43e6-a508-f5fade294d09', '2021-09-12 06:04:49'),
(155, 1, 'd22670ca-ec52-4f22-81e0-16a11b29758e', '2021-09-12 06:15:37'),
(156, 1, '9511eb53-e3ea-4375-98b3-f789182f9b43', '2021-09-12 06:20:10'),
(159, 1, 'bc02a614-a0ee-46cd-b5e8-574cfec3ddec', '2021-09-12 20:21:11'),
(161, 1, 'f288cc5a-319f-4d52-b25d-4bbeccad043c', '2021-09-12 21:56:00'),
(163, 1, '21d5f869-16d4-4710-b1a8-a0357461badb', '2021-09-13 03:22:58'),
(165, 8, 'c16f16ad-3cef-4e0a-87eb-7eb16d6512b6', '2021-09-13 04:57:00'),
(168, 1, '7fa27d02-7abc-4a77-82df-edcab6ce911b', '2021-09-18 01:29:10'),
(169, 1, 'b27518ba-fc9f-45a9-a5ef-94ab0290fd1c', '2022-07-03 23:48:22'),
(172, 12, '5a519b12-be77-47ff-acbb-3d1a73af2d72', '2022-07-04 02:53:53'),
(178, 1, '18212c87-ee37-4460-9518-c596cbc13954', '2022-07-09 01:33:51'),
(189, 1, '25a5c72b-355b-4978-90f2-1d0e571689f6', '2022-07-18 02:29:38'),
(191, 1, '9e9bd719-add6-410f-aaa6-8bfb4209259b', '2022-07-18 04:24:52'),
(212, 1, '6b16c101-c19f-474a-a9e5-5070b6e45b9b', '2022-08-09 19:27:08'),
(213, 1, 'b30f4ab9-2edd-49cb-a3b7-46ebb21739e2', '2022-08-09 19:29:27'),
(216, 1, '1f27c374-1316-4b69-90ea-a5eb4e088804', '2022-08-10 07:24:27'),
(219, 1, '4eb4452c-beed-4509-b28a-c6b25ace9c4c', '2022-08-11 18:30:05'),
(220, 1, '43e06803-add7-4195-92e1-ffb93175d1fd', '2022-08-11 18:30:59'),
(226, 1, '90985833-3d70-463c-80af-137bc0144201', '2022-08-14 01:54:19'),
(227, 1, 'c2975456-38a1-43d5-a83b-66a29cfb4fd0', '2022-08-14 04:53:33'),
(228, 1, 'd10587ec-f8b3-47f2-99ee-2c817bd8b05b', '2022-08-15 04:39:13'),
(229, 1, '204788b7-4780-409c-8eca-b074385103e3', '2022-08-16 03:13:59'),
(230, 1, '8709e0f5-6d9e-4c9e-b347-bde5b8ce41ae', '2022-08-16 03:14:10'),
(231, 1, '74dc26b7-eebe-4bd9-a88a-85e8e4944e45', '2022-08-16 12:44:33'),
(232, 1, 'ec3864e6-38a7-4a4e-8dbe-bd4c851b39ee', '2022-08-16 12:44:33'),
(234, 13, 'e44c2377-73bf-47a0-a424-e62f26343473', '2022-08-16 13:29:25'),
(236, 1, 'a58e7971-c27b-41ff-89d1-0c455ba5991e', '2022-08-24 00:00:59'),
(237, 8, '02816fec-5cd9-4fc7-b761-e07fa2723e65', '2022-08-24 00:30:20'),
(239, 13, 'f62b2d77-c18d-4e53-8447-1cf101c70331', '2022-08-24 00:34:44'),
(241, 1, '2f0c5be6-e6ee-46a3-84c8-b899f75b0f86', '2022-08-24 02:46:13'),
(244, 1, '50b4e93f-17ab-4407-b7ed-2f5036f37a8f', '2022-08-24 13:25:50'),
(251, 1, '226e004c-ad06-436c-9c27-b1ad2522947a', '2022-08-25 13:25:01'),
(256, 1, '44fe27a1-5774-469b-b014-0e0750546c77', '2022-09-01 02:35:53'),
(258, 1, '48ef767e-1307-4862-936a-b535b3f9dc4a', '2022-09-02 01:49:50'),
(266, 1, '456af522-835e-47ab-b42a-d1afcf6ff10f', '2022-09-15 03:03:10'),
(268, 1, '586e8e8a-0962-4fa7-82a7-6df1fdb491c6', '2022-09-18 14:20:07'),
(270, 1, 'c16a786c-91d4-4d27-819b-c09bd36ae815', '2022-09-19 00:18:41'),
(271, 1, '91ba9734-2861-4aed-b576-c5b41878d55a', '2022-09-19 05:25:07'),
(274, 9, '4ab4637b-f553-4034-8f6b-bff4131489d6', '2022-09-20 04:06:42'),
(275, 10, '194121eb-762f-493d-9384-88a25ef62d0c', '2022-09-20 04:07:39'),
(276, 1, 'a7608220-7ec5-4b13-a50e-9d2ac76f2773', '2022-09-21 00:48:39'),
(282, 1, '8192215c-8cb0-4e0f-8631-c733fcf81d73', '2022-10-05 04:22:43'),
(287, 8, '3f670352-4c9a-4d4a-ac75-7e263b12dde4', '2022-11-13 14:51:05'),
(288, 8, 'ea8e862d-5cda-44af-b731-777a85d9c5e0', '2022-11-13 14:52:51'),
(289, 13, '7e30cbba-ee83-4eed-992b-825f21dccb67', '2022-11-13 14:53:32'),
(295, 1, '487312a3-8278-4ed3-8f3e-a8e174e37fb5', '2022-11-15 10:28:31'),
(296, 1, 'f8e1bd88-bf43-4c6c-a51b-12259f03c968', '2022-11-15 11:30:47'),
(298, 1, '9e059f53-38fc-460a-9e70-aa82174e67b0', '2022-11-15 16:31:12'),
(302, 1, '329dfa48-4852-40cd-ae33-11b8fb910090', '2022-11-19 11:17:20'),
(303, 1, 'bf23ac48-1f0d-40cd-9919-3e518725d98b', '2022-11-19 11:17:56'),
(306, 8, '3317a53e-b7ff-4c6c-8adb-c6658ff70ab3', '2022-11-22 05:42:39'),
(307, 1, '8c612171-620f-4359-9ae1-718f5675800a', '2022-11-22 05:43:35'),
(308, 1, 'cc79d04c-53c0-408c-aec1-866dda63cec6', '2022-11-22 06:02:13'),
(309, 1, '63f39ff1-93a4-46d8-8968-ebec73478c9f', '2022-11-22 06:03:41');

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
(28, 'Test Group', 'Group for for testing game ID \'34\' - Test Template', '', '94c18e03a1061b80e491b383cbc8c80d', 1);

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
(1, 28, '2022-09-20 17:21:43');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `game_guidance_tracker`
--
ALTER TABLE `game_guidance_tracker`
  MODIFY `tracker_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `game_objective`
--
ALTER TABLE `game_objective`
  MODIFY `objective_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `gsessions`
--
ALTER TABLE `gsessions`
  MODIFY `session_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `gsession_user_guidance_tracker`
--
ALTER TABLE `gsession_user_guidance_tracker`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT for table `gsession_user_objective`
--
ALTER TABLE `gsession_user_objective`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `gsession_user_usage`
--
ALTER TABLE `gsession_user_usage`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1291;

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
  MODIFY `auth_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=310;

--
-- AUTO_INCREMENT for table `user_capability`
--
ALTER TABLE `user_capability`
  MODIFY `cap_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_group`
--
ALTER TABLE `user_group`
  MODIFY `group_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

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
