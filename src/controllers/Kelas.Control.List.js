import ListKelasService from '../services/ListKelas.Service.js'
import GetDataToken from '../utils/GetDataToken.js'
import {RequestError} from '../utils/ErrorsHandler.js';

export default async function ListKelasControl(req,res,next){
	const payload = await GetDataToken(req)	
	const listServices = await ListKelasService(payload)
	res.status(200).json(listServices)
}