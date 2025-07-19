import Dbconnection from '../config/database.js';
import {WaktuTimestampCreatedat} from '../utils/Times.js'

export default class Tugas{
	async init() {
		// Database
	    this.connect = await Dbconnection();
	}


	async CheckTugasKelasAuthor(id_users,kode){
		try{
			const [results] = await this.connect.query(
			"SELECT * FROM kelas WHERE id_user_created = ? AND kode_kelas = ?",
			[id_users,kode]
			)
			return results.length > 0
		}catch(e){
			console.log(e)
			return false
		}
	}

	

	async InsertTugas(data,kelas,files){
		try{
			await this.connect.beginTransaction()
			const [result] = await this.connect.execute(
				"INSERT INTO tugas (deskripsi,tenggat_waktu,id_kelas,judul,type) VALUES(?,?,?,?,?)",
				[data.deskripsi,data.tenggat_waktu,kelas.id_kelas,data.judul,'Tugas']
			)
			const id_tugas = result.insertId;

			if (files && files.length > 0) {
				const lampiranQ = "INSERT INTO lampiran_tugas (id_tugas,name_file,created_at,updated_at) VALUES ?"
				const lampiranData = files.map(file => [
					id_tugas,
					file.filename,
					WaktuTimestampCreatedat(),
					WaktuTimestampCreatedat()
				])
				await this.connect.query(lampiranQ, [lampiranData])
			}
			await this.connect.commit()
			return true
		}catch(er){
			console.log(er)
			await this.connect.rollback();
			return false
		}
	}

	async InsertAnnounch(data,kelas,files){
		try{
			await this.connect.beginTransaction()
			const [result] = await this.connect.execute(
				"INSERT INTO tugas (deskripsi,id_kelas,judul,type) VALUES(?,?,?,?)",
				[data.deskripsi,,kelas.id_kelas,data.judul,'Pengumuman']
			)
			const id_tugas = result.insertId;

			if (files && files.length > 0) {
				const lampiranQ = "INSERT INTO lampiran_tugas (id_tugas,name_file,created_at,updated_at) VALUES ?"
				const lampiranData = files.map(file => [
					id_tugas,
					file.filename,
					WaktuTimestampCreatedat(),
					WaktuTimestampCreatedat()
				])
				await this.connect.query(lampiranQ, [lampiranData])
			}
			await this.connect.commit()
			return true
		}catch(er){
			console.log(er)
			await this.connect.rollback();
			return false
		}
	}

	async ListTugas(id_kelas,users){
		try{
			const [results] = await this.connect.query(
			"SELECT tugas.deskripsi, tugas.type, tugas.id_tugas,tugas.tenggat_waktu, tugas.judul, tugas.created_at, (kelas.id_user_created = ?) AS teacher FROM tugas LEFT JOIN kelas ON kelas.id_kelas = tugas.id_kelas LEFT JOIN joined_kelas ON joined_kelas.id_kelas = tugas.id_kelas WHERE tugas.id_kelas = ? AND joined_kelas.id_users = ? OR kelas.id_user_created = ? ORDER BY tugas.id_tugas DESC"
			,[users.id_users,id_kelas,users.id_users,users.id_users]
			)
			return results
		}catch(er){
			console.log(er)
			return []
		}
	}

	async DetailTugas(users,id_tugas){
		try{
			const [results] = await this.connect.query(
			`SELECT
				tugas.id_tugas,
			    tugas.deskripsi,
			    tugas.tenggat_waktu,
			    tugas.type,
			    tugas.id_kelas,
			    tugas.judul,
			    tugas.created_at,
			    GROUP_CONCAT(lampiran_tugas.name_file SEPARATOR ",") as lampiran
			FROM tugas
			LEFT JOIN kelas ON kelas.id_kelas = tugas.id_kelas
			LEFT JOIN lampiran_tugas ON lampiran_tugas.id_tugas = tugas.id_tugas
			LEFT JOIN joined_kelas ON joined_kelas.id_kelas = kelas.id_kelas
			WHERE joined_kelas.id_users = ? OR kelas.id_user_created = ? AND tugas.id_tugas = ?`,
			[users.id_users,users.id_users,id_tugas]
			)
			return results[0]
		}catch(er){
			console.log(er)
			return false
		}
	}
	
}