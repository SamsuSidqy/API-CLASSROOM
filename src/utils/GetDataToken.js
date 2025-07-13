
import { GetPayload, VerifyToken } from "./TokensJwt.js";

export default async function GetDataToken(data){
	let auth = data.headers.authorization;
	const token = auth.split("Bearer").pop().split(" ").join("");
	const result = await GetPayload(token);
	const verif = await VerifyToken(token);
	if (result && verif) {
		return result.data
	}else{
		return null
	}

}