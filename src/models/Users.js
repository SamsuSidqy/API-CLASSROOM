import Dbconnection from '../config/database.js';

import bcrypt  from 'bcrypt'
import {WaktuTimestampCreatedat} from '../utils/Times.js'


export default class PenggunaUsers{


	async init() {
		// Database
	    this.connect = await Dbconnection();
	}

	async HashingPassword(pw){
		const saltRounds = 10;
		const data = await bcrypt.hash(pw, saltRounds);
		return data
	}

	async InsertData(data){
		try{
			const [result] = await this.connect.execute(
				`INSERT INTO users (username,email,password,token,refresh_token,profile,created_at)
				VALUES(?,?,?,?,?,?,?)`,
				[
					data.username,
					data.email,
					await this.HashingPassword(data.password),
					null,
					null,
					null,
					WaktuTimestampCreatedat()
				]
			)
			return true;
		}catch(err){
			console.log(err)
			return false;
		}
	}

	async ChecData(data,fields){
		try{
			const [result] = await this.connect.query(
				`SELECT * FROM users WHERE ${fields} = ?`,
				[
					data,
					fields
				]
			)			
			return result.length > 0;
		}catch(err){
			console.log(err)
			return false
		}
	}
	async ResultFirstData(data){
		try{
			const [result] = await this.connect.query(
				"SELECT id_users,username,email,password,token,refresh_token,profile FROM users WHERE email = ? OR username = ?",
				[data,data]
			)
			return result[0]
		}catch(err){
			console.log(err)
			return null
		}
	}

	async LoginUpdateToken(data){
		try{
			const [result] = await this.connect.execute(
				"UPDATE users SET token = ?, refresh_token = ? WHERE id_users = ?",
				[data.token,data.refresh_token,data.id_users]
			)
			return true
		}catch(err){
			console.log(err)
			return false
		}
	}

}