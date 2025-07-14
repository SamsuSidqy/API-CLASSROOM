import GenerateKodeKelas from '../utils/GenerateKodeKelas.js'
import Kelas from '../models/Kelas.js'
import Tugas from '../models/Tugas.js'
import {RequestError} from '../utils/ErrorsHandler.js';

export default async function CreateAnnounchService(data,payload,files){
	const kelas = new Kelas()
	const tugas = new Tugas()
	await kelas.init()
	await tugas.init()

	const result = await kelas.CheckKelasExists(data.kode_kelas)
	if (result) {
		const addTugas = await tugas.InsertAnnounch(data,result,files)
		if (addTugas) {
			return true
		}
		throw new RequestError("Failed Create Announch",400)
	}else{
		throw new RequestError("Failed Announch",501)
	}

}