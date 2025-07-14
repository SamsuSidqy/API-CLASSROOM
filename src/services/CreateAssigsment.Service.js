import Kelas from '../models/Kelas.js'
import Assigsment from '../models/Assigsment.js'
import {RequestError} from '../utils/ErrorsHandler.js'

export default async function CreateAssigsmentService(data,file,users){
	const tugas = new Assigsment()
	await tugas.init()
	const result = await tugas.InsertAssigsment(data,users,file)
	if (!result) {
		throw new RequestError("Failed Send Assigsment",500)
	}
	return{
		status:200,
		message:"Berhasil"
	}
}