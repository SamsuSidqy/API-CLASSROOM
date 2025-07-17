import Tugas from '../models/Tugas.js'
import {RequestError} from '../utils/ErrorsHandler.js'

export default async function DetailTugasService(id_tugas,users){
	const tugas = new Tugas()
	await tugas.init()

	const results = await tugas.DetailTugas(users,id_tugas)
	if (!results) {
		throw new RequestError("Terjadi Kesalahan Internal",500)
	}
	return{
		status:200,
		data:results
	}
}