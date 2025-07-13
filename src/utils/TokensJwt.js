import jwt from 'jsonwebtoken'

const secret = "aa&8a76sd$$3"

async function GenerateToken(data) {
	try{		
		const payload = {
			data
		}
		const token = await jwt.sign(payload,secret,{expiresIn:"6h"})	
		return token
	}catch(e){
		console.log(e)
		return null
	}	
}

async function RefreshToken(data) {
	try{		
		const payload = {
			data
		}
		const token = await jwt.sign(payload,secret,{expiresIn:"30d"})
		return token
	}catch(e){
		console.log(e)
		return null
	}
}

async function VerifyToken(token){
	try{		
		const verify = await jwt.verify(token,secret)
		return true
	}catch(e){		
		return false
	}
}

async function GetPayload(token){
	try{		
		const verify = await jwt.verify(token,secret)
		return verify.data
	}catch(e){		
		return null
	}
}

export{
	GenerateToken,
	RefreshToken,
	VerifyToken,
	GetPayload
}
