import RequestCreateAssigsment from '../validation/RequestCreateAssigsment.js'
import GetDataToken from '../utils/GetDataToken.js'
import {RequestError} from '../utils/ErrorsHandler.js';
import CreateAssigsmentService from '../services/CreateAssigsment.Service.js'

export default async function AsigsmentControlCreate(req,res,next){
	const payload = await GetDataToken(req)	
	const validasi = await RequestCreateAssigsment(req.body,req.files,payload)

	if (!validasi.status) {
		return next(new RequestError(validasi.message,400))
	}
	const addTugas = await CreateAssigsmentService(req.body,req.files,payload)

	res.status(200).json({
		status:200,
		message:"Successfuly Send Assigsment"
	})
}