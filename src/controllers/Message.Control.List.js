import Messages from '../models/Message.js'
import {RequestError} from '../utils/ErrorsHandler.js';
import GetDataToken from '../utils/GetDataToken.js'

export default async function ControlListPesan(req,res,next){
	if (!req.params) { return next(new RequestError("Params Not Found",404))}
	const payload = await GetDataToken(req)
	const message = new Messages()
	await message.init()

	const results = await message.ListPesan(req.params.kodeRoom,payload)
	res.status(200).json({
		status:true,
		data:results ? results : []
	})	
}