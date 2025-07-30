import Dbconnection from '../config/database.js';
import {WaktuTimestampCreatedat} from '../utils/Times.js'
import logging from '../config/logging.js'

export default class Messages{
	async init() {
		// Database
	    this.connect = await Dbconnection();
	}


	async SavePesan(data){
		try{
			const [results] = await this.connect.query(
			`INSERT INTO message_chat (kode_room,users,message) VALUES(?,?,?)`,
			[data.kode_room,data.users,data.message]
			)
			return results
		}catch(er){
			logging.error(er.message)
			return er
		}
	}

	async ListPesan(kode_room,user){
		try{
			const [results] = await this.connect.query(
			`
			SELECT
			    users.id_users,
			    users.username,
			    users.profile,
			    message_chat.message,
			    message_chat.created_at
			FROM message_chat
			LEFT JOIN users ON users.id_users = message_chat.users
			WHERE message_chat.kode_room = ?
			AND (
			    EXISTS (
			        SELECT 1
			        FROM joined_kelas jk
			        WHERE jk.id_users = ?
			    )
			    OR EXISTS (
			        SELECT 1
			        FROM kelas k
			        WHERE k.id_user_created = ?
			    )
			)
			`,
			[kode_room,user.id_users,user.id_users]
			)
			return results
		}catch(er){
			logging.error(er.message)
			return null
		}
	}
	
}