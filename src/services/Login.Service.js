import {RequestError} from '../utils/ErrorsHandler.js';
import PenggunaUsers from '../models/Users.js'
import {
	GenerateToken,
	RefreshToken,
	VerifyToken
} from '../utils/TokensJwt.js';

import bcrypt from 'bcrypt';

export default async function LoginService(data) {
	const User = new PenggunaUsers();
	await User.init();

	const result = await User.ResultFirstData(data.username);
	if (!result) throw new RequestError("Username Or Password Invalid", 400);

	const isPasswordValid = await bcrypt.compare(data.password, result.password);
	if (!isPasswordValid) throw new RequestError("Username Or Password Invalid", 400);

	const needsNewToken =
		!result.refresh_token || !(await VerifyToken(result.refresh_token));

	if (needsNewToken) {
		const token = await GenerateToken(result)		
		result['refresh_token'] = await RefreshToken(result);
		const updated = await User.LoginUpdateToken(result);
		result['token'] = token;
		if (!updated) throw new RequestError("Login Failed", 400);
	}
	return result;
}
