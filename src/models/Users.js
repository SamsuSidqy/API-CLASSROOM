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
				`INSERT INTO users (username,email,password,refresh_token,profile,created_at)
				VALUES(?,?,?,?,?,?)`,
				[
					data.username,
					data.email,
					await this.HashingPassword(data.password),
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
				"SELECT id_users,username,email,password,refresh_token,profile FROM users WHERE email = ? OR username = ?",
				[data,data]
			)
			return result[0]
		}catch(err){
			console.log(err)
			return null
		}
	}
	async LoginUpdateToken(data,token){
		try{
			await this.connect.beginTransaction()

			const [user] = await this.connect.query(
				"SELECT * FROM users WHERE username = ? OR email = ?",
				[data,data]
			)
			const id_users = user[0].id_users

			const [result] = await this.connect.query(
				"UPDATE users SET refresh_token = ? WHERE id_users = ?",
				[token,id_users]
			)
			await this.connect.commit()
			return true
		}catch(err){
			await this.connect.rollback()
			console.log(err)
			return false
		}
	}

	async ListUsersKelas(kode_kelas,users){
		try{
			const [results] = await this.connect.query(
			`SELECT
				users.username,
			    users.profile,
			    users.id_users,
			    kelas.id_kelas,
			    kelas.kode_kelas,
			    IF(kelas.id_user_created = users.id_users,true,false) AS teacher
			FROM users
			LEFT JOIN joined_kelas ON joined_kelas.id_users = ?
			LEFT JOIN kelas ON kelas.id_kelas = joined_kelas.id_kelas OR kelas.id_user_created = ?
			WHERE kelas.kode_kelas = ?`,
			[users.id_users,users.id_users,kode_kelas]
			)
			return results
		}catch(err){
			console.log(err)
			return []
		}
	}

	async UpdateUser(data,body,files=null){
		try{
			if(files){
				const [result] = await this.connect.query(
					`UPDATE users SET username = ?, profile = ? WHERE id_users = ?`,
					[body.username,files,data.id_users]
				)
			}else{
				const [result] = await this.connect.query(
					`UPDATE users SET username = ? WHERE id_users = ?`,
					[body.username,data.id_users]
				)
			}

			const [results] = await this.connect.query(
				`SELECT username,email,id_users,refresh_token,profile FROM users WHERE id_users = ?`,
				[data.id_users]
			)
			return results[0] || null
		}catch(e){
			console.log(e)
			return null
		}
	}


}