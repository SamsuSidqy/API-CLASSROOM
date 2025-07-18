import RequestCreateTugas from '../validation/RequestCreateTugas.js'
import GetDataToken from '../utils/GetDataToken.js'
import {RequestError} from '../utils/ErrorsHandler.js';
import CreateKelasService from '../services/CreateTugas.Service.js'

export default async function KelasTugasControl(req,res,next){
	const payload = await GetDataToken(req)	
	const validasi = await RequestCreateTugas(req.body,req.files,payload)
	if (!validasi.status) {
		return next(new RequestError(validasi.message,400))
	}
	const addTugas = await CreateKelasService(req.body,payload,req.files)
	res.status(200).json(addTugas)
}