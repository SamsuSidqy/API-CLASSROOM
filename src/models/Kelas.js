import Dbconnection from '../config/database.js';
import {WaktuTimestampCreatedat} from '../utils/Times.js'
import logging from '../config/logging.js'

export default class Kelas{
	async init() {
		// Database
	    this.connect = await Dbconnection();
	}


	async InsertKelas(data){
		try{
			const [result] = await this.connect.execute(
				"INSERT INTO kelas (kode_kelas,mata_pelajaran,nama_kelas,created_at,id_user_created) VALUES(?,?,?,?,?)",
				[
					data.kode_kelas,
					data.mata_pelajaran,
					data.nama_kelas,
					WaktuTimestampCreatedat(),
					data.id_user_created
				]
			)

			const [rows] = await this.connect.execute(
				`
				SELECT * ,
						IF(kelas.id_user_created = ? ,true,false) as teacher
				FROM kelas WHERE id_kelas =?
				`,
				[data.id_user_created,result.insertId]
			);
			return rows[0]

		}catch(er){
			logging.error(er.message)
			return false;
		}
	}


	async CheckKelasExists(kode){
		try{
			const [result] = await this.connect.query(
				"SELECT * FROM kelas WHERE kode_kelas = ?",
				[kode]
			)
			return result[0]
		}catch(e){
			logging.error(e.message)
			return null;
		}
	}

	async CheckJoinedKelas(id_kelas,id_users){
		try{
			const [result] = await this.connect.query(
				"SELECT * FROM joined_kelas WHERE id_kelas = ? AND id_users = ?",
				[id_kelas,id_users]
			)
			const [result2] = await this.connect.query(
				"SELECT * FROM kelas WHERE id_kelas = ? AND id_user_created = ?",
				[id_kelas,id_users]
			)
			const bol = result[0] || result2[0]
			return bol
		}catch(e){
			logging.error(e.message)
			return null;
		}
	}

	async JoinedKelas(data){
		try{
			const [result] = await this.connect.execute(
				"INSERT INTO joined_kelas (id_kelas,id_users,created_at) VALUES(?,?,?)",
				[
					data.id_kelas,
					data.id_users,
					WaktuTimestampCreatedat()
				]
			)
			return true
		}catch(e){
			logging.error(e.message)
			return null
		}
	}

	async ListKelas(users){
		try{
			const [results] = await this.connect.query(
			"SELECT kelas.mata_pelajaran, kelas.id_kelas, kelas.deskripsi_kelas, kelas.kode_kelas, kelas.nomor_ruangan, kelas.nama_kelas, kelas.created_at, IF(kelas.id_user_created = ? ,true,false) AS teacher FROM kelas LEFT JOIN joined_kelas ON joined_kelas.id_kelas = kelas.id_kelas WHERE joined_kelas.id_users = ? OR kelas.id_user_created = ?",
			[users.id_users,users.id_users,users.id_users]
			)
			return results
		}catch(er){
			logging.error(er.message)
			return []
		}
	}

	async CheckKelasAuthor(users,kode){
		try{
			const [result] = await this.connect.query(
			"SELECT * FROM kelas WHERE id_user_created = ? AND kode_kelas = ?",
			[users.id_users,kode]
			)
			return result.length > 0
		}catch(e){
			logging.error(e.message)
			return false
		}
	}

	async UpdateKelasAuthor(data,kode,user){
		try{
			const [result] = await this.connect.query(
			"UPDATE kelas SET deskripsi_kelas = ?, mata_pelajaran = ?, nomor_ruangan = ? WHERE id_user_created = ? AND kode_kelas = ?",
			[data.deskripsi_kelas,data.mata_pelajaran,data.nomor_ruangan,user.id_users,kode]
			)
			return true
		}catch(e){
			logging.error(e.message)
			return false
		}
	}

	async KelasDetail(id){
		try{
			const [result] = await this.connect.query(
			`
			SELECT
				kelas.id_kelas,
				kelas.kode_kelas,
				kelas.deskripsi_kelas,
				kelas.nomor_ruangan,
				kelas.nama_kelas,
				kelas.mata_pelajaran,
				kelas.created_at
			FROM kelas
			WHERE id_kelas = ?
			`,
			[id]
			)
			return result.length > 0 ? result[0] : false
		}catch(er){
			logging.error(er.message)
			return false
		}
	}

}