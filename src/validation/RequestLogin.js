import validator from 'validator';
import PenggunaUsers from '../models/Users.js'

export default async function RequestLogin(data){
	let message = {}
	let status = false
	let Fields = ['username','password']
	

	for (let field of Fields) {
        if (!data.hasOwnProperty(field)) {
            return {
                status: false,
                message: `Field ${field} is required`
            };
        }
    }



	const User = new PenggunaUsers()
    await User.init()
    const resultEmail = await User.ChecData(data.username,'email')  
    const resultUsername = await User.ChecData(data.username,'username')   
    if (!resultEmail && !resultUsername) {
	  return {
	    status: false,
	    message: "Email or Username does not exist"
	  };
	}


	return{
		status:true,
		message:message
	}
}