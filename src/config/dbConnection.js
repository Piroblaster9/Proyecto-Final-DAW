// configuramos la conexión
const mysql = require('mysql');

// mysql.createPool
// para crear una pila de conexiones si tenemos que realizar simultaneamente
// muchas consulatas SQL
// con este comando luego podremos liberar la conexión pero sin cerrarla
// connection.release()

// exportamos la conexión
module.exports = () => {
	return mysql.createConnection(
		{
			host: 'localhost',
			user: 'jorge',
			password: '666666',
			database: 'personajes'
		});
}
