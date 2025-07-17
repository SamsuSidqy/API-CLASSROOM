import Dbconnection from '../config/database.js';
import {WaktuTimestampCreatedat} from '../utils/Times.js'


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
			return result

		}catch(er){
			console.log(er)
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
			console.log(e)
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
			console.log(e)
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
			console.log(e)
			return null
		}
	}

	async ListKelas(users){
		try{
			const [results] = await this.connect.query(
			"SELECT kelas.mata_pelajaran, kelas.id_kelas, kelas.kode_kelas, kelas.nomor_ruangan, kelas.nama_kelas, kelas.created_at, IF(kelas.id_user_created = ? ,true,false) AS teacher FROM kelas LEFT JOIN joined_kelas ON joined_kelas.id_kelas = kelas.id_kelas WHERE joined_kelas.id_users = ? OR kelas.id_user_created = ?",
			[users.id_users,users.id_users,users.id_users]
			)
			return results
		}catch(er){
			console.log(er)
			return []
		}
	}
}