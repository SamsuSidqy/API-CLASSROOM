import DetailTugasService from '../services/DetailTugas.Service.js'

import GetDataToken from '../utils/GetDataToken.js'
import {RequestError} from '../utils/ErrorsHandler.js';

export default async function DetailTugasControl(req,res,next){
	if (!req.params) {
		next(new RequestError("Data Not Found",400))
	}
	const payload = await GetDataToken(req)	
	const detailService = await DetailTugasService(req.params.idTugas,payload)
	res.status(200).json(detailService)
}