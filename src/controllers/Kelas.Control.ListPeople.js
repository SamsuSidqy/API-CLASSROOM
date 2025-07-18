import ListPeopleService from '../services/ListPeopleKelas.Service.js'
import GetDataToken from '../utils/GetDataToken.js'
import {RequestError} from '../utils/ErrorsHandler.js';

export default async function ListPeopleKelasControl(req,res,next){
	if (!req.params) {
		next(new RequestError("Data Not Found",400))
	}
	const payload = await GetDataToken(req)	
	const listServices = await ListPeopleService(req.params.kodeKelas,payload)
	res.status(200).json(listServices)
}