import Kelas from '../models/Kelas.js'
import Assigsment from '../models/Assigsment.js'
import {RequestError} from '../utils/ErrorsHandler.js'

export default async function MyAssigsmentService(data,users){
	const tugas = new Assigsment()
	await tugas.init()	

	const result = await tugas.MyAssigsment(data,users)
	if (!result) {
		throw new RequestError("Failed Assigsment",500)
	}

	return {
		status:200,
		send: result[0].name_file != null ? true : false,
		data:result[0]
	}
}