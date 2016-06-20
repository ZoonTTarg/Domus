var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	 var pool = req.pool;
  res.send('respond with a resource');
});

module.exports = router;
