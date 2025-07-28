import {RequestError} from '../utils/ErrorsHandler.js';
import PenggunaUsers from '../models/Users.js'


export default async function UpdateUserService(data,body,files){
	const user = new PenggunaUsers()
	await user.init()
	const results = await user.UpdateUser(data,body,files ? files.filename : null)
	if (!results) {
		return new RequestError('Gagal Update',500)
	}else{
		return{
			status:200,
			data:results
		}
	}
}