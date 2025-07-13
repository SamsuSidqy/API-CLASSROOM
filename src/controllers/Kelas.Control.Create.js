import RequestCreateKelas from '../validation/RequestCreateKelas.js'
import GetDataToken from '../utils/GetDataToken.js'
import CreateKelasService from '../services/CreateKelas.Service.js'


export default async function CreateKelas(req,res,next){
	const validate = await RequestCreateKelas(req.body)
	const payload = await GetDataToken(req)
	const service = await CreateKelasService(req.body,payload)
	res.status(200).json(service)
}