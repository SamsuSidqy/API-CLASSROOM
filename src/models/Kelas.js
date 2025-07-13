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
}