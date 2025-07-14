-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 14, 2025 at 06:13 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zx_classroom`
--

-- --------------------------------------------------------

--
-- Table structure for table `assigsment`
--

CREATE TABLE `assigsment` (
  `id_assigsment` int(11) NOT NULL,
  `id_users` int(11) NOT NULL,
  `nilai` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `joined_kelas`
--

CREATE TABLE `joined_kelas` (
  `id_join` int(11) NOT NULL,
  `id_kelas` int(11) NOT NULL,
  `id_users` int(11) NOT NULL,
  `accepted` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `joined_kelas`
--

INSERT INTO `joined_kelas` (`id_join`, `id_kelas`, `id_users`, `accepted`, `created_at`) VALUES
(9, 3, 19, 1, '2025-07-14 03:11:03');

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `id_kelas` int(11) NOT NULL,
  `deskripsi_kelas` text NOT NULL,
  `id_user_created` int(11) NOT NULL,
  `kode_kelas` varchar(7) NOT NULL,
  `mata_pelajaran` varchar(100) DEFAULT NULL,
  `nomor_ruangan` varchar(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `nama_kelas` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kelas`
--

INSERT INTO `kelas` (`id_kelas`, `deskripsi_kelas`, `id_user_created`, `kode_kelas`, `mata_pelajaran`, `nomor_ruangan`, `created_at`, `nama_kelas`) VALUES
(3, '', 18, 'MEQQO2', 'RPL', NULL, '2025-07-14 03:07:29', 'Perangkat Lunak Lanjut');

-- --------------------------------------------------------

--
-- Table structure for table `lampiran_assigsment`
--

CREATE TABLE `lampiran_assigsment` (
  `id_lampiran_assigsment` int(11) NOT NULL,
  `id_assigsment` int(11) NOT NULL,
  `name_file` int(11) NOT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lampiran_tugas`
--

CREATE TABLE `lampiran_tugas` (
  `id_lampiran_tugas` int(11) NOT NULL,
  `id_tugas` int(11) NOT NULL,
  `name_file` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `message_chat`
--

CREATE TABLE `message_chat` (
  `kode_room` int(11) NOT NULL,
  `users` int(11) NOT NULL,
  `message` text NOT NULL,
  `id_chat` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tugas`
--

CREATE TABLE `tugas` (
  `id_tugas` int(11) NOT NULL,
  `deskripsi` text NOT NULL,
  `tenggat_waktu` timestamp NULL DEFAULT NULL,
  `type` enum('Tugas','Pengumuman') NOT NULL,
  `id_kelas` int(11) NOT NULL,
  `judul` varchar(50) NOT NULL,
  `creted_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_users` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `profile` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_users`, `username`, `email`, `password`, `refresh_token`, `profile`, `created_at`) VALUES
(18, 'abi', 'abi@abi.com', '$2b$10$4B8dv/UJW4BQdLMTWrh/ru66in8KHErbm6ieiSOuBudOo929MNR5a', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkX3VzZXJzIjoxOCwidXNlcm5hbWUiOiJhYmkiLCJlbWFpbCI6ImFiaUBhYmkuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkNEI4ZHYvVUpXNEJRZExNVFdyaC9ydTY2aW44S0hFcmJtNmllaVNPdUJ1ZE9vOTI5TU5SNWEiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJwcm9maWxlIjpudWxsfSwiaWF0IjoxNzUyNDYyMzc5LCJleHAiOjE3NTUwNTQzNzl9.jwXO6Mzb3I_gCVvJZsiVC062AJpCNCIqigRCFL_1szs', NULL, '2025-07-14 03:06:19'),
(19, 'doni', 'doni@doni.com', '$2b$10$wuR2VZDiLa4Wd3vYJq3EYeMI/uyZZvx0BpWZbu8/GEc0iuTlrGPSq', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkX3VzZXJzIjoxOSwidXNlcm5hbWUiOiJkb25pIiwiZW1haWwiOiJkb25pQGRvbmkuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkd3VSMlZaRGlMYTRXZDN2WUpxM0VZZU1JL3V5Wlp2eDBCcFdaYnU4L0dFYzBpdVRsckdQU3EiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJwcm9maWxlIjpudWxsfSwiaWF0IjoxNzUyNDYyNTg0LCJleHAiOjE3NTUwNTQ1ODR9.zOd4OsSWVwbUb9_AxfNgeWp4V-DRyv-7uOQ9B6DVYvU', NULL, '2025-07-14 03:09:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assigsment`
--
ALTER TABLE `assigsment`
  ADD PRIMARY KEY (`id_assigsment`);

--
-- Indexes for table `joined_kelas`
--
ALTER TABLE `joined_kelas`
  ADD PRIMARY KEY (`id_join`);

--
-- Indexes for table `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id_kelas`),
  ADD UNIQUE KEY `kode_kelas` (`kode_kelas`);

--
-- Indexes for table `lampiran_assigsment`
--
ALTER TABLE `lampiran_assigsment`
  ADD PRIMARY KEY (`id_lampiran_assigsment`);

--
-- Indexes for table `lampiran_tugas`
--
ALTER TABLE `lampiran_tugas`
  ADD PRIMARY KEY (`id_lampiran_tugas`);

--
-- Indexes for table `tugas`
--
ALTER TABLE `tugas`
  ADD PRIMARY KEY (`id_tugas`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_users`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assigsment`
--
ALTER TABLE `assigsment`
  MODIFY `id_assigsment` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `joined_kelas`
--
ALTER TABLE `joined_kelas`
  MODIFY `id_join` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id_kelas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `lampiran_assigsment`
--
ALTER TABLE `lampiran_assigsment`
  MODIFY `id_lampiran_assigsment` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lampiran_tugas`
--
ALTER TABLE `lampiran_tugas`
  MODIFY `id_lampiran_tugas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tugas`
--
ALTER TABLE `tugas`
  MODIFY `id_tugas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_users` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
