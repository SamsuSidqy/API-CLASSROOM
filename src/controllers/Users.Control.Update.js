import GetDataToken from '../utils/GetDataToken.js'
import {RequestError} from '../utils/ErrorsHandler.js';
import RequestUpdateProfile from '../validation/RequestUpdateProfile.js'
import UpdateUserService from '../services/UpdateProfile.Service.js'

export default async function UpdateUsersControl(req,res,next){
	const payload = await GetDataToken(req)	
	const validasi = await RequestUpdateProfile(req.body)
	if (!validasi.status) {
		return next(new RequestError(validasi.message,400))
	}
	const result = await UpdateUserService(payload,req.body,req.file)
	res.status(200).json(result)
}