import GenerateKodeKelas from '../utils/GenerateKodeKelas.js'
import Kelas from '../models/Kelas.js'
import {RequestError} from '../utils/ErrorsHandler.js';

export default async function CreateKelasService(data,payload){
	const kodeKelas = GenerateKodeKelas()
	data['kode_kelas'] = kodeKelas
	data['id_user_created'] = payload.id_users
	const kelas = new Kelas()
	await kelas.init()
	const result = await kelas.InsertKelas(data)
	if (result) {
		return {
			status:200,
			kelas:result 
		}
	}else{
		throw new RequestError("Failed Create Kelas",501)
	}

}