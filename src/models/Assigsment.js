import Dbconnection from '../config/database.js';
import {WaktuTimestampCreatedat} from '../utils/Times.js'

export default class Assigsment{
	async init() {
		// Database
	    this.connect = await Dbconnection();
	}


	
}