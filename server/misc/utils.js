const mysql   = require('mysql');
const request = require('request');

const connection = mysql.createPool({
    host     : 'localhost',
    user     : 'bingo',
    password : 'amsta04-bingo',
	database : 'paddatabase'
});

module.exports = {
	sendRequest: function(url, callback){
	    const options = {
	        url: url,
	        json: true
	    };

	    request.get(options, (err, response, body) => {
	        if(err) throw err;
	        callback(body);
	    })
	},
	sqlRequest: function (query, callback) {
	    connection.getConnection(function(err, connection) {
	            if (err) throw err;
	            connection.query(query,(err, rows, fields) => {
	                connection.release();

	                if (err) console.log(err);
	                callback(rows);
	            });
	    });
	},
	generateDatabase: function(){
		connection.getConnection(function(err, connection) {
		if (err) throw err;
			connection.query("CREATE DATABASE paddatabase",(err, rows, fields) => {


				if (err) console.log(err);
				console.log(rows);
			});
			connection.query("CREATE TABLE buttons (button1 BOOLEAN, button2 BOOLEAN)",(err, rows, fields) => {


				if (err) console.log(err);
				console.log(rows);
			});
			connection.release();

		});
		/*sqlRequest("CREATE DATABASE mydb", function (err, result) {
			if (err) throw err;
			console.log("Database created");
		});*/
	}

};