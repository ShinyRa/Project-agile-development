const mysql   = require('mysql');
const request = require('request');

const connection = mysql.createPool({
    host     : ':) nothing to see here...',
    user     : ':) nothing to see here...',
    password : ':) nothing to see here...',
	database : ':) nothing to see here...'
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
			connection.query("CREATE DATABASE padDatabase",(err, rows, fields) => {


				if (err) console.log(err);
				console.log(rows);
			});
			connection.query("CREATE TABLE Buttons (button1 BOOLEAN, button2 BOOLEAN)",(err, rows, fields) => {


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