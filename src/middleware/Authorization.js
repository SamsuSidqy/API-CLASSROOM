import { VerifyToken } from "../utils/TokensJwt.js";
import {RequestError} from '../utils/ErrorsHandler.js';
export default async function Authorization(req, res, next) {
    try {
        let auth = req.headers.authorization;
        if (auth) {
            const token = auth.split("Bearer").pop().split(" ").join("");
            const verify = await VerifyToken(token);
            if (verify) {               
                next();
            } else {
                return next(new RequestError('Wrong Credentials', 401))
            }
        } else {
            return next(new RequestError('Unauthorize', 401))
        }
    } catch (e) {
        return next(new RequestError('Need Credentials', 401))
    }
}
