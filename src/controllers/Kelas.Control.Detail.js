import DetailKelasService from '../services/DetailKelas.Service.js'
import GetDataToken from '../utils/GetDataToken.js'
import {RequestError} from '../utils/ErrorsHandler.js';

export default async function DetailKelasControl(req,res,next){

	if (!req.params) {
		next(new RequestError("Data Not Found",400))
	}
	const detailService = await DetailKelasService(req.params.idKelas)
	res.status(200).json(detailService)
}