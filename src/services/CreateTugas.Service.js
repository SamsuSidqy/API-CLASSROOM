import GenerateKodeKelas from '../utils/GenerateKodeKelas.js'
import Kelas from '../models/Kelas.js'
import Tugas from '../models/Tugas.js'
import {RequestError} from '../utils/ErrorsHandler.js';

export default async function CreateKelasService(data,payload,files){
	const kelas = new Kelas()
	const tugas = new Tugas()
	await kelas.init()
	await tugas.init()

	const result = await kelas.CheckKelasExists(data.kode_kelas)
	if (result) {
		const addTugas = await tugas.InsertTugas(data,result,files)
		if (addTugas) {
			return {
				status:200,
				message:"Tugas Berhasil Di Buat"
			}
		}
		throw new RequestError("Failed Create Tugas",400)
	}else{
		throw new RequestError("Failed Tugas",501)
	}

}