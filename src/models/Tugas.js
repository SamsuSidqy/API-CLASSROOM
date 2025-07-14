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
				"INSERT INTO tugas (deskripsi,tenggat_waktu,id_kelas,judul) VALUES(?,?,?,?)",
				[data.deskripsi,data.tenggat_waktu,kelas.id_kelas,data.judul]
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
	
}