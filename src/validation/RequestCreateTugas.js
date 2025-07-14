import validator from 'validator';
import Tugas from '../models/Tugas.js'

export default async function RequestCreateTugas(data,file,users){
	let message = {}
	let status = false
	let Fields = ['judul','deskripsi','kode_kelas','tenggat_waktu']
    const tugas = new Tugas()
    await tugas.init()
    const newData = Object.assign({}, data)

	const missingFields = Fields.filter(field => !newData.hasOwnProperty(field))
    if (missingFields.length > 0) {
        return {
            status: false,
            message: `Missing required fields: ${missingFields.join(', ')}`
        }
    }


    const CheckAuthor = await tugas.CheckTugasKelasAuthor(users.id_users,data.kode_kelas)
    if (!CheckAuthor) {
        return{
            status:false,
            message:"Bad Requests & Akses Forbideen"
        }
    }

    return {
        status:true,
        message:null
    }
}