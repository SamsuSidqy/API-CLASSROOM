import validator from 'validator';
import Tugas from '../models/Tugas.js'
import Kelas from '../models/Kelas.js'
import Assigsment from '../models/Assigsment.js'

export default async function RequestCreateAssigsment(data,file,users){
	let message = {}
	let status = false
	let Fields = ['kode_kelas','id_tugas']

    const tugas = new Tugas()
    const asigs = new Assigsment()
    const kelas = new Kelas()

    await kelas.init()
    await asigs.init()
    await tugas.init()

    const newData = Object.assign({}, data)

	const missingFields = Fields.filter(field => !newData.hasOwnProperty(field))
    if (missingFields.length > 0) {
        return {
            status: false,
            message: `Missing required fields: ${missingFields.join(', ')}`
        }
    }
    if (file.length == 0) {
        return{
            status: false,
            message: "Files Not Found"
        }
    }

    const kelasExists = await kelas.CheckKelasExists(data.kode_kelas)
    if (!kelasExists) {
        return{
            status:false,
            message:"Kelas Not Found"
        }
    }

   if (kelasExists) {
     const joinExists = await asigs.CheckJoinExists(kelasExists,users)
     if (!joinExists) {
        return{
            status:false,
            message:"Your Not Joined"
        }
     }

   }

   const checkAsigsment = await asigs.CheckAsigsment(data,users)
   if (checkAsigsment) {
        return{
            status:false,
            message:"Your Already Send it"
        }
   }


    const CheckAuthor = await tugas.CheckTugasKelasAuthor(users.id_users,data.kode_kelas)
    if (CheckAuthor) {
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