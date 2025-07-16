import Tugas from '../models/Tugas.js'


export default async function ListTugasKelasService(id_kelas,users){
	const tugas = new Tugas()
	await tugas.init()

	const results = await tugas.ListTugas(id_kelas,users)
	return{
		status:200,
		data:results
	}
}