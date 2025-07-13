import RequestRegister from '../validation/RequestRegister.js';
import RequestLogin from '../validation/RequestLogin.js';

import {RequestError} from '../utils/ErrorsHandler.js';
import GetDataToken from '../utils/GetDataToken.js';
import {GenerateToken} from '../utils/TokensJwt.js'

import PenggunaUsers from '../models/Users.js'


import LoginService from '../services/Login.Service.js'

async function RegisterControl(req, res, next) {
    const validatedData = await RequestRegister(req.body);
    if (!validatedData.status) {
    	return next(new RequestError(validatedData.message,400));
    }

    const User = new PenggunaUsers()
    await User.init()
    const Create = await User.InsertData(req.body);

    if(!Create){
    	return next(new RequestError('Registerd Failed',500))
    }

    res.status(200).json({
    	status:200,
    	message:"Successfuly Registerd"
    })

    
}

async function LoginControl(req, res, next){
	const validatedData = await RequestLogin(req.body);
    if (!validatedData.status) {
    	return next(new RequestError(validatedData.message,400));
    }    
    const result = await LoginService(req.body)
    res.status(200).json({
    	status:200,
    	users:result
    })
}

async function RefreshTokenControl(req,res,next){
    const data = await GetDataToken(req);
    if (data) {
        const results = await GenerateToken(data)
        res.status(200).json({
            status:200,
            token:results
        })
    }else{
        return next(new RequestError('Wrong Credentials',401))
    }
}

export {
    RegisterControl,
    LoginControl,
    RefreshTokenControl
};
