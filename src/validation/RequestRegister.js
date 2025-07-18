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
        }else if (validator.isEmpty(data[field].trim())) {
            return {
                status: false,
                message: `Field ${field} is Cannot Be Empty`
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

    const resultUsername = await User.ChecData(data.username,'username')
    if (resultUsername) {
    	return{
    		status:false,
    		message:"Username Already Use"
    	}
    }

	return{
		status:true,
		message:message
	}
}