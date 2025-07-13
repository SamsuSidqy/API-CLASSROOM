import Kelas from '../models/Kelas.js'
import {RequestError} from '../utils/ErrorsHandler.js';


export default async function JoinKelasService(data,payload){
	const kelas = new Kelas()
	await kelas.init()
	const checkKelas = await kelas.CheckKelasExists(data.kode_kelas)
	if(checkKelas){
		const checkJoinOrNot = await kelas.CheckJoinedKelas(checkKelas.id_kelas,payload.id_users)
		if (checkJoinOrNot) {
			return{
				status:200,
				kelas:checkKelas.kode_kelas
			}
		}
		let main = {}
		main['id_kelas'] = checkKelas.id_kelas
		main['id_users'] = payload.id_users
		const result = await kelas.JoinedKelas(main)
		if (result) {
			return {
				status:200,
				kelas:checkKelas.kode_kelas
			}
		}else{
			throw new RequestError("Gagal Join Kelas")
		}
	}else{
		throw new RequestError("Kelas Tidak Di Temukan",404)
	}
}