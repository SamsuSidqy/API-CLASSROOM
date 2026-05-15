-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 15, 2026 at 09:33 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
  `kode_kelas` varchar(10) NOT NULL,
  `id_tugas` int(11) NOT NULL,
  `nilai` int(11) DEFAULT NULL,
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

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `id_kelas` int(11) NOT NULL,
  `deskripsi_kelas` text DEFAULT NULL,
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
(3, NULL, 5, 'WFYFWU', 'Penambangan Data', NULL, '2026-05-15 05:51:27', 'R6Q');

-- --------------------------------------------------------

--
-- Table structure for table `lampiran_assigsment`
--

CREATE TABLE `lampiran_assigsment` (
  `id_lampiran_assigsment` int(11) NOT NULL,
  `id_assigsment` int(11) NOT NULL,
  `name_file` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
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

--
-- Dumping data for table `lampiran_tugas`
--

INSERT INTO `lampiran_tugas` (`id_lampiran_tugas`, `id_tugas`, `name_file`, `created_at`, `updated_at`) VALUES
(3, 8, 'a89033f3.png', '2026-05-15 06:52:52', '2026-05-15 06:52:52'),
(4, 8, 'ebb048db.jpg', '2026-05-15 06:52:52', '2026-05-15 06:52:52'),
(5, 9, 'bf6cc7f8.jpg', '2026-05-15 06:54:46', '2026-05-15 06:54:46'),
(6, 9, '0d994eb2.jpg', '2026-05-15 06:54:46', '2026-05-15 06:54:46'),
(7, 9, '66f503a8.png', '2026-05-15 06:54:46', '2026-05-15 06:54:46'),
(8, 9, '8f8e0dc9.jpg', '2026-05-15 06:54:46', '2026-05-15 06:54:46'),
(9, 10, 'caf5a247.jpg', '2026-05-15 06:56:27', '2026-05-15 06:56:27'),
(10, 10, '37a994e5.png', '2026-05-15 06:56:27', '2026-05-15 06:56:27'),
(11, 11, '4fca8521.jpg', '2026-05-15 07:20:34', '2026-05-15 07:20:34'),
(12, 11, '737e2b21.jpg', '2026-05-15 07:20:34', '2026-05-15 07:20:34'),
(13, 11, 'c243d9fd.png', '2026-05-15 07:20:34', '2026-05-15 07:20:34'),
(14, 11, 'a58a5429.jpg', '2026-05-15 07:20:34', '2026-05-15 07:20:34'),
(15, 11, 'fe566533.pdf', '2026-05-15 07:20:34', '2026-05-15 07:20:34'),
(16, 12, 'aca0c7ee.jpg', '2026-05-15 07:21:57', '2026-05-15 07:21:57'),
(17, 14, '582ab015.jpg', '2026-05-15 07:30:18', '2026-05-15 07:30:18');

-- --------------------------------------------------------

--
-- Table structure for table `message_chat`
--

CREATE TABLE `message_chat` (
  `kode_room` text NOT NULL,
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
  `jenis_tugas` tinyint(1) NOT NULL DEFAULT 1,
  `tingkat_kesulitan` enum('1','2','3','4','5') NOT NULL,
  `tempat_pengerjaan` tinyint(1) NOT NULL DEFAULT 0,
  `batasan_nilai` enum('10','20','30','40','50','60','70','80','90','100') NOT NULL DEFAULT '70',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tugas`
--

INSERT INTO `tugas` (`id_tugas`, `deskripsi`, `tenggat_waktu`, `type`, `id_kelas`, `judul`, `jenis_tugas`, `tingkat_kesulitan`, `tempat_pengerjaan`, `batasan_nilai`, `created_at`) VALUES
(8, 'Ini adalah inti dari deskripsi. Uraikan detail secara spesifik. Jika tempat, jelaskan bentuk, warna, aroma, dan suasana. Jika produk, jabarkan material, kegunaan, dan keunggulannya. Gunakan kata-kata yang merangsang panca indra (visual, pendengaran, penciuman).Contoh: \"Saat menaiki tangga kayu yang berderit pelan, aromanya khas kayu jati tua. Ruangan utamanya berukuran \\(4 \\times 5\\) meter, dengan dinding papan coklat gelap yang kokoh. Jendela kaca besar menghadap langsung ke sungai, memberikan pemandangan aliran air yang jernih. Di dalamnya terdapat tempat tidur gantung berukuran besar dengan bantal-bantal empuk berwarna krem. Saat sore, cahaya matahari menyelinap masuk, menciptakan nuansa emas yang hangat dan menenangkan...', '2026-05-30 17:00:00', 'Tugas', 3, 'Tugas baru', 0, '4', 0, '60', '2026-05-15 07:26:32'),
(9, 'Testimg', '2026-05-15 17:00:00', 'Tugas', 3, 'Tugas danger', 1, '5', 1, '80', '2026-05-15 06:54:46'),
(10, '*Poin penting*\n1. pastikan minimal 15 jurnal terkait topik (tahun 2016-2026) \n2. Wajib gunakan Mendeley atau reference manager lainnya\n3. buat folder di Gdrive (ada di deskripsi grup)\ncontoh: \npenamaan folder jika saya sbg dosen materi: Materi_<nama anda>\npenamaan folder jika saya sbg dosen teknik: Teknik_<nama anda>\n4. Buat list jika sdh upload file PDF ke dalam Gdrive untuk saya koreksi\n5. bab yang diupload boleh per bab atau dari bab 1-3 dulu\n6. jika aplikasi sudah jadi sesuai dengan topik penelitian, demokan aplikasi kepada saya via zoom untuk saya berikan masukkan dan saran.\n7. gunakan waktu 4bulan ini untuk finalisasi penulisan dan aplikasinya..\n\nsemoga sukses dan selesai tepat waktu', '2026-05-15 09:10:00', 'Tugas', 3, 'Real danger', 1, '5', 0, '90', '2026-05-15 07:14:52'),
(11, '*Poin penting*\n1. pastikan minimal 15 jurnal terkait topik (tahun 2016-2026) \n2. Wajib gunakan Mendeley atau reference manager lainnya\n3. buat folder di Gdrive (ada di deskripsi grup)\ncontoh: \npenamaan folder jika saya sbg dosen materi: Materi_<nama anda>\npenamaan folder jika saya sbg dosen teknik: Teknik_<nama anda>\n4. Buat list jika sdh upload file PDF ke  sukses dan selesai tepat waktu', '2026-05-15 17:00:00', 'Tugas', 3, 'Tws', 1, '5', 1, '80', '2026-05-15 07:20:34'),
(12, 'Hshs', '2026-05-15 17:00:00', 'Tugas', 3, 'Hshs', 1, '1', 0, '30', '2026-05-15 07:22:59'),
(13, 'Jkk', '2026-05-15 17:00:00', 'Tugas', 3, 'Hu', 1, '1', 1, '30', '2026-05-15 07:23:45'),
(14, 'Nansna*Poin penting*\n1. pastikan minimal 15 jurnal terkait topik (tahun 2016-2026) \n2. Wajib gunakan Mendeley atau reference manager lainnya\n3. buat folder di Gdrive (ada di deskripsi grup)\ncontoh: \npenamaan folder jika saya sbg dosen materi: Materi_<nama anda>\npenamaan folder jika saya sbg dosen teknik: Teknik_<nama anda>\n4. Buat list jika sdh upload file PDF ke dalam Gdrive untuk saya koreksi\n5. bab yang diupload boleh per bab atau dari bab 1-3 dulu\n6. jika aplikasi sudah jadi sesuai dengan topik penelitian, demokan aplikasi kepada saya via zoom untuk saya berikan masukkan dan saran.\n7. gunakan waktu 4bulan ini untuk finalisasi penulisan dan aplikasinya..\n\nsemoga sukses dan selesai tepat waktu', '2026-05-15 09:00:00', 'Tugas', 3, '30 hari', 1, '5', 1, '70', '2026-05-15 07:31:43');

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
(5, 'Teacher1', 'guru1@guru.com', '$2b$10$LG/MnBNG2UFFIxzhRvjgMuLYz1fkhIMiCWKVaMFwhMw122kiS5bQy', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkX3VzZXJzIjo1LCJ1c2VybmFtZSI6IlRlYWNoZXIxIn0sImlhdCI6MTc3ODgyNDI1MywiZXhwIjoxNzgxNDE2MjUzfQ.jTg0iW8u19UIEOpKiyyAqVD5gBl0IsZCXJdrRXM8iB4', NULL, '2026-05-15 05:50:53');

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
  MODIFY `id_assigsment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `joined_kelas`
--
ALTER TABLE `joined_kelas`
  MODIFY `id_join` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id_kelas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `lampiran_assigsment`
--
ALTER TABLE `lampiran_assigsment`
  MODIFY `id_lampiran_assigsment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `lampiran_tugas`
--
ALTER TABLE `lampiran_tugas`
  MODIFY `id_lampiran_tugas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tugas`
--
ALTER TABLE `tugas`
  MODIFY `id_tugas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_users` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
