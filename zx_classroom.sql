-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 13 Jul 2025 pada 15.37
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
-- Struktur dari tabel `assigsment`
--

CREATE TABLE `assigsment` (
  `id_assigsment` int(11) NOT NULL,
  `id_users` int(11) NOT NULL,
  `nilai` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `joined_kelas`
--

CREATE TABLE `joined_kelas` (
  `id_join` int(11) NOT NULL,
  `id_kelas` int(11) NOT NULL,
  `id_users` int(11) NOT NULL,
  `accepted` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `joined_kelas`
--

INSERT INTO `joined_kelas` (`id_join`, `id_kelas`, `id_users`, `accepted`, `created_at`) VALUES
(8, 2, 16, 1, '2025-07-13 12:42:56');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kelas`
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
-- Dumping data untuk tabel `kelas`
--

INSERT INTO `kelas` (`id_kelas`, `deskripsi_kelas`, `id_user_created`, `kode_kelas`, `mata_pelajaran`, `nomor_ruangan`, `created_at`, `nama_kelas`) VALUES
(2, '', 15, '5JNUJQ', 'RPL', NULL, '2025-07-13 11:39:14', 'RR');

-- --------------------------------------------------------

--
-- Struktur dari tabel `lampiran_assigsment`
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
-- Struktur dari tabel `lampiran_tugas`
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
-- Struktur dari tabel `message_chat`
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
-- Struktur dari tabel `tugas`
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
(15, 'Joni', 'joni@joni.com', '$2b$10$0sCisiRkGN71BzglgYRiv.eOpnZOXQCG/QqhBLaNhutPQBBwslGg2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkX3VzZXJzIjoxNSwidXNlcm5hbWUiOiJKb25pIiwiZW1haWwiOiJqb25pQGpvbmkuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkMHNDaXNpUmtHTjcxQnpnbGdZUml2LmVPcG5aT1hRQ0cvUXFoQkxhTmh1dFBRQkJ3c2xHZzIiLCJ0b2tlbiI6bnVsbCwicmVmcmVzaF90b2tlbiI6bnVsbCwicHJvZmlsZSI6bnVsbH0sImlhdCI6MTc1MjQwNjQ5MSwiZXhwIjoxNzUyNDI4MDkxfQ.p9YC_0LhHOGX-osTiVBfIjpoKTqzsXFgMPUHZ1SYv0E', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkX3VzZXJzIjoxNSwidXNlcm5hbWUiOiJKb25pIiwiZW1haWwiOiJqb25pQGpvbmkuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkMHNDaXNpUmtHTjcxQnpnbGdZUml2LmVPcG5aT1hRQ0cvUXFoQkxhTmh1dFBRQkJ3c2xHZzIiLCJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUprWVhSaElqcDdJbWxrWDNWelpYSnpJam94TlN3aWRYTmxjbTVoYldVaU9pSktiMjVwSWl3aVpXMWhhV3dpT2lKcWIyNXBRR3B2Ym1rdVkyOXRJaXdpY0dGemMzZHZjbVFpT2lJa01tSWtNVEFrTUhORGFYTnBVbXRIVGpjeFFucG5iR2RaVW1sMkxtVlBjRzVhVDFoUlEwY3ZVWEZvUWt4aFRtaDFkRkJSUWtKM2MyeEhaeklpTENKMGIydGxiaUk2Ym5Wc2JDd2ljbVZtY21WemFGOTBiMnRsYmlJNmJuVnNiQ3dpY0hKdlptbHNaU0k2Ym5Wc2JIMHNJbWxoZENJNk1UYzFNalF3TmpRNU1Td2laWGh3SWpveE56VXlOREk0TURreGZRLnA5WUNfMExoSE9HWC1vc1RpVkJmSWpwb0tUcXpzWEZnTVBVSFoxU1l2MEUiLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJwcm9maWxlIjpudWxsfSwiaWF0IjoxNzUyNDA2NDkxLCJleHAiOjE3NTQ5OTg0OTF9.NSZo8QBi6XuunKnbCIPhvhHVlbH3oEQklvUN9zSpj1M', NULL, '2025-07-13 11:34:51'),
(16, 'Jojo', 'jojo@jojo.com', '$2b$10$w5tPZ.aMu8Rjkz6xa.XXi.5wlEBcMmiwIxY2rDYcBLVGUyjFSxX7O', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkX3VzZXJzIjoxNiwidXNlcm5hbWUiOiJKb2pvIiwiZW1haWwiOiJqb2pvQGpvam8uY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkdzV0UFouYU11OFJqa3o2eGEuWFhpLjV3bEVCY01taXdJeFkyckRZY0JMVkdVeWpGU3hYN08iLCJ0b2tlbiI6bnVsbCwicmVmcmVzaF90b2tlbiI6bnVsbCwicHJvZmlsZSI6bnVsbH0sImlhdCI6MTc1MjQwOTQ2MCwiZXhwIjoxNzUyNDMxMDYwfQ.32F9FWSuAhm1agT2WmiiLZgjRzI4M2RcAlh6nnu1UNM', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkX3VzZXJzIjoxNiwidXNlcm5hbWUiOiJKb2pvIiwiZW1haWwiOiJqb2pvQGpvam8uY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkdzV0UFouYU11OFJqa3o2eGEuWFhpLjV3bEVCY01taXdJeFkyckRZY0JMVkdVeWpGU3hYN08iLCJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUprWVhSaElqcDdJbWxrWDNWelpYSnpJam94Tml3aWRYTmxjbTVoYldVaU9pSktiMnB2SWl3aVpXMWhhV3dpT2lKcWIycHZRR3B2YW04dVkyOXRJaXdpY0dGemMzZHZjbVFpT2lJa01tSWtNVEFrZHpWMFVGb3VZVTExT0ZKcWEzbzJlR0V1V0ZocExqVjNiRVZDWTAxdGFYZEplRmt5Y2tSWlkwSk1Wa2RWZVdwR1UzaFlOMDhpTENKMGIydGxiaUk2Ym5Wc2JDd2ljbVZtY21WemFGOTBiMnRsYmlJNmJuVnNiQ3dpY0hKdlptbHNaU0k2Ym5Wc2JIMHNJbWxoZENJNk1UYzFNalF3T1RRMk1Dd2laWGh3SWpveE56VXlORE14TURZd2ZRLjMyRjlGV1N1QWhtMWFnVDJXbWlpTFpnalJ6STRNMlJjQWxoNm5udTFVTk0iLCJyZWZyZXNoX3Rva2VuIjpudWxsLCJwcm9maWxlIjpudWxsfSwiaWF0IjoxNzUyNDA5NDYwLCJleHAiOjE3NTUwMDE0NjB9.M7jc_uBr0h_mTRE4RE9jP-Qaitf61WvgQ-4jWZUdDNo', NULL, '2025-07-13 12:24:20');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `assigsment`
--
ALTER TABLE `assigsment`
  ADD PRIMARY KEY (`id_assigsment`);

--
-- Indeks untuk tabel `joined_kelas`
--
ALTER TABLE `joined_kelas`
  ADD PRIMARY KEY (`id_join`);

--
-- Indeks untuk tabel `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id_kelas`),
  ADD UNIQUE KEY `kode_kelas` (`kode_kelas`);

--
-- Indeks untuk tabel `lampiran_assigsment`
--
ALTER TABLE `lampiran_assigsment`
  ADD PRIMARY KEY (`id_lampiran_assigsment`);

--
-- Indeks untuk tabel `lampiran_tugas`
--
ALTER TABLE `lampiran_tugas`
  ADD PRIMARY KEY (`id_lampiran_tugas`);

--
-- Indeks untuk tabel `tugas`
--
ALTER TABLE `tugas`
  ADD PRIMARY KEY (`id_tugas`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_users`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `assigsment`
--
ALTER TABLE `assigsment`
  MODIFY `id_assigsment` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `joined_kelas`
--
ALTER TABLE `joined_kelas`
  MODIFY `id_join` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id_kelas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `lampiran_assigsment`
--
ALTER TABLE `lampiran_assigsment`
  MODIFY `id_lampiran_assigsment` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `lampiran_tugas`
--
ALTER TABLE `lampiran_tugas`
  MODIFY `id_lampiran_tugas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `tugas`
--
ALTER TABLE `tugas`
  MODIFY `id_tugas` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id_users` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
