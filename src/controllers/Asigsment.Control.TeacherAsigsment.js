import TeacherAsigsmentService from '../services/TeacherAsigsment.Service.js'
import GetDataToken from '../utils/GetDataToken.js'
import {RequestError} from '../utils/ErrorsHandler.js';

export default async function TeacherAsigsmentControl(req,res,next){
	if (!req.params) {
		next(new RequestError("Data Not Found",400))
	}
	const payload = await GetDataToken(req)	
	const asigsmentService = await TeacherAsigsmentService(req.params.idKelas,payload)
	res.status(200).json(asigsmentService)
}