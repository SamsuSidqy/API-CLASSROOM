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
	
}