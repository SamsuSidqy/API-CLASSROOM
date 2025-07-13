
import { GetPayload, VerifyToken } from "./TokensJwt.js";

export default async function GetDataToken(data){
	let auth = data.headers.authorization;
	const token = auth.split("Bearer").pop().split(" ").join("");
	const result = await GetPayload(token);	
	if (result) {
		return result
	}else{
		return null
	}

}