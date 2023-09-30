const mysql = require('mysql');

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',  
	password : 'kkyd1411',
	database : 'nodesql'
});

module.exports = {connection}
