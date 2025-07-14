import Dbconnection from '../config/database.js';
import {WaktuTimestampCreatedat} from '../utils/Times.js'

export default class Assigsment{
	async init() {
		// Database
	    this.connect = await Dbconnection();
	}

	async CheckJoinExists(data,users){
		try{
			const [results] = await this.connect.query(
			"SELECT * FROM joined_kelas WHERE id_kelas = ? AND id_users = ? AND accepted = true",
			[
				data.id_kelas,
				users.id_users
			]
			)
			return results.length > 0
		}catch(er){
			return false
		}
	}


	async InsertAssigsment(data,users,files){
		try{

			await this.connect.beginTransaction()
			const [asigsment] = await this.connect.query(
				"INSERT INTO assigsment (id_users,kode_kelas) VALUES(?,?)",
				[users.id_users,data.kode_kelas]
			)
			const id_asigsment = asigsment.insertId;
			if (files && files.length > 0) {
				const lampiranAs = "INSERT INTO lampiran_assigsment (id_assigsment,name_file,created_at,updated_at) VALUES ?"
				const lampiranData = files.map(file => [
					id_asigsment,
					file.filename,
					WaktuTimestampCreatedat(),
					WaktuTimestampCreatedat()
				])
				await this.connect.query(lampiranAs, [lampiranData])
			}	

			await this.connect.commit()
			return true
		}catch(e){
			console.log(e)
			await this.connect.rollback();
			return false
		}
	}

	async CheckAsigsment(data,users){
		try{
			const [results] = await this.connect.query(
			"SELECT * FROM assigsment WHERE kode_kelas = ? AND id_users = ?",
			[
				data.kode_kelas,
				users.id_users
			]
			)
			return results.length > 0
		}catch(er){
			return false
		}
	}

	
}