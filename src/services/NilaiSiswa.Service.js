import GenerateKodeKelas from '../utils/GenerateKodeKelas.js'
import Assigsment from '../models/Assigsment.js'
import Tugas from '../models/Tugas.js'
import {RequestError} from '../utils/ErrorsHandler.js';

export default async function NilaiSiswaService(data){
	const asign = new Assigsment()
	await asign.init()

	const nilaiResults = await asign.NilaiAsigsment(data.id_asign,data.nilai)
	if (nilaiResults) {
		return {
			status:200,
			message:"Nilai Berhasil Di Upload"
		}
	}
	throw new RequestError("Failed Nilai Tugas",400)

}