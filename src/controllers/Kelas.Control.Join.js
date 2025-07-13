import RequestJoinKelas from '../validation/RequestJoinKelas.js'
import GetDataToken from '../utils/GetDataToken.js'
import JoinKelasService from '../services/JoinKelas.Service.js'


export default async function JoinKelasControl(req,res,next){
	const payload = await GetDataToken(req)	
	const validasi = await RequestJoinKelas(req.body)
	if (!validasi.status) {return next(new RequestError(validasi.message,400))}
	const services = await JoinKelasService(req.body,payload)
	res.status(200).json(services)
}