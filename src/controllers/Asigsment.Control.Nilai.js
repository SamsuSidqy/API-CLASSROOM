import RequestNilaiSiswa from '../validation/RequestNilaiSiswa.js'
import GetDataToken from '../utils/GetDataToken.js'
import NilaiSiswaService from '../services/NilaiSiswa.Service.js'
import {RequestError} from '../utils/ErrorsHandler.js';

export default async function NilaiSiswaControl(req,res,next){
	const payload = await GetDataToken(req)
	if (!payload) {return next(new RequestError("Gagal Buat Kelas",500))}
	const validate = await RequestNilaiSiswa(req.body,payload)
	const service = await NilaiSiswaService(req.body)
	res.status(200).json(service)
}