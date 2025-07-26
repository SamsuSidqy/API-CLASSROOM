import logging from './src/config/logging.js'
import app from './src/server.js'
import Dbconnection from './src/config/database.js'



async function StartsApp(){
	try{
		await Dbconnection()
		logging.info("Connect DB MySql Succesfully")
		app.listen(3030, () => {
			console.log('Listening Port On 3030')
		})
	}catch(err){
		if (err.code === 'ER_BAD_DB_ERROR') {
	      	logging.error('Database does not exist!');
	    }else if(err.code === 'ER_ACCESS_DENIED_ERROR'){
	      	logging.error('Worng Username Or Password');
	    }else if(err.code === 'PROTOCOL_CONNECTION_LOST'){
	      	logging.error('Connection was closed unexpectedly');
	    }else if(err.code === 'ECONNREFUSED'){
	      	logging.error('Mysql Is Not Running');
	    }
	}
}

StartsApp();