import Kelas from '../models/Kelas.js'



export default async function ListKelasService(users){
	const kelas = new Kelas()
	await kelas.init()

	const result = await kelas.ListKelas(users)
	return{
		status:200,
		data:result
	}
}