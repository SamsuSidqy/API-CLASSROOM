import Kelas from '../models/Kelas.js'
import Assigsment from '../models/Assigsment.js'
import {RequestError} from '../utils/ErrorsHandler.js'

export default async function TeacherAsigsmentService(data,users){
	const tugas = new Assigsment()
	await tugas.init()	

	const result = await tugas.TeacherAsugsment(data,users)
	if (!result) {
		throw new RequestError("Failed Assigsment",500)
	}

	return {
		status:200,
		data:result
	}
}