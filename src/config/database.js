import mysql from 'mysql2/promise';
// Create the connection to database
async function Dbconnection(){
	const conect = await mysql.createConnection({
	  host: 'localhost',
	  user: 'root',
	  database: 'zx_classroom',
	  waitForConnections: true
	  //connectionLimit: 10,
	});
	return conect
}
export default Dbconnection