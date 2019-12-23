const router = require('express').Router();

const {sqlRequest} = require('../misc/utils');

router.get('/getbutton1', (req, res) => {
	const query = "SELECT button1 FROM buttons";
	sqlRequest(query, (rows) => {
	    res.json(rows);
	});
});

router.get('/getbutton2', (req, res) => {
	const query = "SELECT button2 FROM buttons";
	sqlRequest(query, (rows) => {
	    res.json(rows);
	});
});

router.get('/setbutton1', (req, res) => {
	const query = "UPDATE buttons SET button1 = 0 WHERE 1";
	sqlRequest(query, (rows) => {
	    res.json(rows);
	});
});

router.get('/setbutton2', (req, res) => {
	const query = "UPDATE buttons SET button2 = 0 WHERE 1";
	sqlRequest(query, (rows) => {
	    res.json(rows);
	});
});

module.exports = router;