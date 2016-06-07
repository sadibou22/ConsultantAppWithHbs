var express = require('express');
var router = express.Router();
var fs = require('fs');
var ConsultantController = require('../controllers/consultant-controller.js')
var serviceConsultant = require('../services/Services-Consultant.js');
var serviceModel= require('../models/consultant-model.js');


/* GET users listing. */
router.get('/', function(req, res){
	serviceModel.ConsultantModel.find(function(err, consultants){
		if(err) {
			throw err;
		}
		res.render('consultant', { title: 'Liste des consultants',allConsultants:consultants});
	});
});

router.get('/edit/:id', function(req, res){
	var consulId = req.params.id;
	serviceModel.ConsultantModel.findById(consulId,function(err, result){
		if(err) {
			throw err;
		}
		var pageConsultant = 'Mise a jour du consultant '+result.Prenom;
		return res.render('edit', { title: pageConsultant, consultant:result});
	});
	
	
});

router.get('/affiche/:id', function(req, res){
	var consulId = req.params.id;
	serviceModel.ConsultantModel.findById(consulId,function(err, consultant){
		if(err) {
			throw err;
		}
		return res.render('affiche', { title: 'Consultant', unConsultant:consultant});
	});
});


/*router.get('/delete/:id', function(req, res){
	
});
*/
module.exports = router;
