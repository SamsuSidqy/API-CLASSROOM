-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 13 Jul 2025 pada 09.40
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.1.25

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
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id_users` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `token` text DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `profile` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id_users`, `username`, `email`, `password`, `token`, `refresh_token`, `profile`, `created_at`) VALUES
(14, 'Joni', 'joni@joni.com', '$2b$10$Eu7lyXMsr.rTNQpiCNR7r.6sO2/2smrvlniUSkr26b/CYxtj/hft6', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkX3VzZXJzIjoxNCwidXNlcm5hbWUiOiJKb25pIiwiZW1haWwiOiJqb25pQGpvbmkuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkRXU3bHlYTXNyLnJUTlFwaUNOUjdyLjZzTzIvMnNtcnZsbmlVU2tyMjZiL0NZeHRqL2hmdDYiLCJ0b2tlbiI6bnVsbCwicmVmcmVzaF90b2tlbiI6bnVsbCwicHJvZmlsZSI6bnVsbH0sImlhdCI6MTc1MjMzMzkwOCwiZXhwIjoxNzUyMzU1NTA4fQ.0Sx6wILMFAIBWWu-6YlBhPlkMFeJ7U9uon4kA8Nq_ig', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkX3VzZXJzIjoxNCwidXNlcm5hbWUiOiJKb25pIiwiZW1haWwiOiJqb25pQGpvbmkuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkRXU3bHlYTXNyLnJUTlFwaUNOUjdyLjZzTzIvMnNtcnZsbmlVU2tyMjZiL0NZeHRqL2hmdDYiLCJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUprWVhSaElqcDdJbWxrWDNWelpYSnpJam94TkN3aWRYTmxjbTVoYldVaU9pSktiMjVwSWl3aVpXMWhhV3dpT2lKcWIyNXBRR3B2Ym1rdVkyOXRJaXdpY0dGemMzZHZjbVFpT2lJa01tSWtNVEFrUlhVM2JIbFlUWE55TG5KVVRsRndhVU5PVWpkeUxqWnpUekl2TW5OdGNuWnNibWxWVTJ0eU1qWmlMME5aZUhScUwyaG1kRFlpTENKMGIydGxiaUk2Ym5Wc2JDd2ljbVZtY21WemFGOTBiMnRsYmlJNmJuVnNiQ3dpY0hKdlptbHNaU0k2Ym5Wc2JIMHNJbWxoZENJNk1UYzFNak16TXprd09Dd2laWGh3SWpveE56VXlNelUxTlRBNGZRLjBTeDZ3SUxNRkFJQldXdS02WWxCaFBsa01GZUo3VTl1b240a0E4TnFfaWciLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJwcm9maWxlIjpudWxsfSwiaWF0IjoxNzUyMzMzOTA4LCJleHAiOjE3NTQ5MjU5MDh9.R_92YxPXFCNurbd4U8fNYJAgFOt6JH849qo53jeKdK8', NULL, '2025-07-12 15:25:08');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_users`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id_users` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
