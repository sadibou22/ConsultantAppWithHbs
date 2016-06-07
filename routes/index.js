var express = require('express');
var router = express.Router();
var fs = require('fs');
var ConsultantController = require('../controllers/consultant-controller.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Upload File' });
});

//uplod file
router.post('/',function(req, res){
	//faire quelque chose
	//res.send('yes cest fait');
	
	var filename = 'consultant2.csv'
	ConsultantController.upload(filename);
	//res.end(req.files.myfile.path);
	res.render('index', { title: 'Upload File' });
	//res.send('yes cest fait');
});
module.exports = router;
