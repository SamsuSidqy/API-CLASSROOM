import MyAssigsmentService from '../services/MyAssigsment.Service.js'
import GetDataToken from '../utils/GetDataToken.js'
import {RequestError} from '../utils/ErrorsHandler.js';

export default async function MyAsigsmentControl(req,res,next){
	if (!req.params) {
		next(new RequestError("Data Not Found",400))
	}
	const payload = await GetDataToken(req)	
	const asigsmentService = await MyAssigsmentService(req.params.idKelas,payload)
	res.status(200).json(asigsmentService)
}