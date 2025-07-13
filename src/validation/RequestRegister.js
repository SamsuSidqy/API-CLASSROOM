import validator from 'validator';
import PenggunaUsers from '../models/Users.js'

export default async function RequestRegister(data){
	let message = {}
	let status = false
	let Fields = ['username','email','password']
	

	for (let field of Fields) {
        if (!data.hasOwnProperty(field)) {
            return {
                status: false,
                message: `Field ${field} is required`
            };
        }
    }

	if (!validator.isEmail(data.email)) {
		return{
			status:false,
			message:"Field Is Not Email" 
		}
	}

	const User = new PenggunaUsers()
    await User.init()
    const resultEmail = await User.ChecData(data.email,'email')   
    if(resultEmail){
    	return{
    		status:false,
    		message:"Email Already Registered"
    	}
    }


	return{
		status:true,
		message:message
	}
}