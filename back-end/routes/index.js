var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Domus back-end.', message: 'Rien à voir par ici.' });
});

module.exports = router;
