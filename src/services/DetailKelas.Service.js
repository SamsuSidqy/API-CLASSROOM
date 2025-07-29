import GenerateKodeKelas from '../utils/GenerateKodeKelas.js'
import Kelas from '../models/Kelas.js'
import {RequestError} from '../utils/ErrorsHandler.js';

export default async function DetailKelasService(id,payload){		
	const kelas = new Kelas()
	await kelas.init()
	const result = await kelas.KelasDetail(id)
	if (result) {
		return {
			status:200,
			kelas:result 
		}
	}else{
		throw new RequestError("Failed Create Kelas",501)
	}

}