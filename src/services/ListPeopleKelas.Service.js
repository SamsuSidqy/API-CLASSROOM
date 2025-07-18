import Users from '../models/Users.js'


export default async function ListPeopleService(kode_kelas,users){
	const tugas = new Users()
	await tugas.init()

	const results = await tugas.ListUsersKelas(kode_kelas,users)
	return{
		status:200,
		data:results
	}
}