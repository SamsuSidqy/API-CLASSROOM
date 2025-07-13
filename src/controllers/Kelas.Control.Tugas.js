import RequestCreateTugas from '../validation/RequestCreateTugas.js'
import GetDataToken from '../utils/GetDataToken.js'

export default async function KelasTugasControl(req,res,next){
	const payload = await GetDataToken(req)	
	const validasi = await RequestCreateTugas(req.body,req.files,payload)
	console.log(validasi)
	res.status(200).send("ss")
}