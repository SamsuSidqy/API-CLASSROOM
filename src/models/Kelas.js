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
			return true

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
}