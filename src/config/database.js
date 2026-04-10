import mysql from 'mysql2/promise';
// Create the connection to database
async function Dbconnection(){
	const conect = await mysql.createConnection({
	  host: 'localhost',
	  port:3307,
	  user: 'root',
	  passwword:'',
	  database: 'zx_classroom',
	  waitForConnections: true
	  //connectionLimit: 10,
	});
	return conect
}
export default Dbconnection