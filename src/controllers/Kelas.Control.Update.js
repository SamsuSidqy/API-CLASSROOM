import RequestUpdateKelas from '../validation/RequestUpdateKelas.js'
import GetDataToken from '../utils/GetDataToken.js'
import UpdateKelasService from '../services/UpdateKelas.Service.js'
import {RequestError} from '../utils/ErrorsHandler.js';

export default async function UpdateKelasControl(req,res,next){
	const payload = await GetDataToken(req)
	const validasi = await RequestUpdateKelas(req.body)
	if (!validasi.status) {return next(new RequestError(validasi.message,400))}
	if (!req.params) { return next(new RequestError("Params Not Found",404))}		
	if (!payload) {return next(new RequestError("Gagal Buat Kelas",500))}

	const result = await UpdateKelasService(req.body,payload,req.params.kodeKelas)	
	res.status(200).send(result)
}