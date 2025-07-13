import validator from 'validator';
import Tugas from '../models/Tugas.js'

export default async function RequestCreateTugas(data,file,users){
	let message = {}
	let status = false
	let Fields = ['judul','deskripsi','kode_kelas']
    const tugas = new Tugas()
    await tugas.init()
    
	

    const CheckAuthor = await tugas.CheckTugasKelasAuthor(users.id_users,data.kode_kelas)
    if (!CheckAuthor) {
        return{
            status:false,
            message:"Bad Requests"
        }
    }

    return {
        status:true,
        message:null
    }
}