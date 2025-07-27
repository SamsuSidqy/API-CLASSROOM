import Dbconnection from '../config/database.js';
import {WaktuTimestampCreatedat, WaktuTimestampCreatedatSQLCompare} from '../utils/Times.js'

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
				"INSERT INTO assigsment (id_users,kode_kelas,id_tugas) VALUES(?,?,?)",
				[users.id_users,data.kode_kelas,data.id_tugas]
			)
			const id_asigsment = asigsment.insertId;
			const timestamp = WaktuTimestampCreatedat();
			if (files && files.length > 0) {
				const lampiranAs = "INSERT INTO lampiran_assigsment (id_assigsment,name_file,created_at,updated_at) VALUES ?"
				const lampiranData = files.map(file => [
					id_asigsment,
					file.filename,
					timestamp,
					timestamp
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
			"SELECT * FROM assigsment WHERE kode_kelas = ? AND id_users = ? AND id_tugas = ?",
			[
				data.kode_kelas,
				users.id_users,
				data.id_tugas
			]
			)
			return results.length > 0
		}catch(er){
			console.log(er)
			return false
		}
	}

	async CheckAssigsmentExpired(data){
		try{
			const [results] = await this.connect.query(
				"SELECT * FROM tugas WHERE id_tugas = ? AND tenggat_waktu IS NOT NULL",
				[
					data.id_tugas,				
				]
			)
			const tenggat = new Date(results[0].tenggat_waktu)
			if(results.length > 0){
				if (!isNaN(tenggat.getTime())) {					
					return results[0].tenggat_waktu > WaktuTimestampCreatedatSQLCompare()
				}else{
					return true
				}
			}			
			return true
		}catch(er){
			console.log(er)
			return false
		}
	}

	async MyAssigsment(id_tugas,users){
		try{
			const [results] = await this.connect.query(
				`
				SELECT 
					GROUP_CONCAT(lampiran_assigsment.name_file SEPARATOR ",") as name_file,
				    assigsment.nilai
				FROM assigsment
				LEFT JOIN lampiran_assigsment ON lampiran_assigsment.id_assigsment = assigsment.id_assigsment
				WHERE assigsment.id_users = ? AND assigsment.id_tugas = ?
				`,[users.id_users,id_tugas]
			)
			return results
		}catch(er){
			return false
		}
	}

	async TeacherAsugsment(id_tugas,users){
		try{
			const [results] = await this.connect.query(
				`
				SELECT
				    users.username,
				    users.profile,
				    GROUP_CONCAT(lampiran_assigsment.name_file SEPARATOR ",") AS lampiran,
				    assigsment.id_tugas,
				    assigsment.nilai
				FROM users
				LEFT JOIN assigsment 
				    ON assigsment.id_users = users.id_users 
				    AND assigsment.id_tugas = ?
				LEFT JOIN lampiran_assigsment 
				    ON lampiran_assigsment.id_assigsment = assigsment.id_assigsment
				LEFT JOIN tugas 
				    ON tugas.id_tugas = assigsment.id_tugas
				LEFT JOIN kelas 
				    ON kelas.id_kelas = tugas.id_kelas
				WHERE users.id_users != kelas.id_user_created and kelas.id_user_created = ?
				GROUP BY users.id_users;
				`,[id_tugas,users.id_users]
			)		
			return results
		}catch(er){
			return false
		}
	}
}