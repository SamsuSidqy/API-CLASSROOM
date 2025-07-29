import GenerateKodeKelas from '../utils/GenerateKodeKelas.js'
import Kelas from '../models/Kelas.js'
import {RequestError} from '../utils/ErrorsHandler.js';

export default async function UpdateKelasService(data,payload,kode){
	const kelas = new Kelas()
	await kelas.init()

	const author = await kelas.CheckKelasAuthor(payload,kode)
	if (!author) {throw new RequestError("Access Rejected",403)}

	const result = await kelas.UpdateKelasAuthor(data,kode,payload)
	if (result) {
		return {
			status:200,
			message:"Kelas Berhasil Di Update" 
		}
	}else{
		throw new RequestError("Failed Create Kelas",501)
	}

}