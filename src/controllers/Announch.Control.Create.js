import RequestCreateAnnounch from '../validation/RequestCreateAnnounch.js'
import GetDataToken from '../utils/GetDataToken.js'
import {RequestError} from '../utils/ErrorsHandler.js';
import CreateAnnounchService from '../services/CreateAnnounch.Service.js'

export default async function AnnounchControleCreate(req,res,next){
	const payload = await GetDataToken(req)	
	const validasi = await RequestCreateAnnounch(req.body,req.files,payload)
	if (!validasi.status) {
		return next(new RequestError(validasi.message,400))
	}
	const addTugas = await CreateAnnounchService(req.body,payload,req.files)
	res.status(200).send("ss")
}