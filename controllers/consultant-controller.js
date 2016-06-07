
var http = require('http');
var express = require('express'),
fs = require('fs');
var csv=require('csv2json-convertor');//importing csv2json-
var serviceModel= require('../models/consultant-model.js');
var serviceConsultant = require('../services/Services-Consultant.js');
var mongoose = require('mongoose');
exports.c;

//get un consultant by id
exports.getConsultant = function(id, callback) {
    serviceModel.ConsultantModel.findById(id, function(err, consultant){
		if(err) {
			console.log(err);
		} else if(consultant == null) {
			console.log('D�sol�, consultant inexistant');
			callback.json(consultant);		
		} else{callback.json(consultant); }
	});
    //console.log('test jai trouv? un consultant avec son id');
};

//get tous les consultants
exports.getAllConsultants = function(consultants) {
	
    serviceModel.ConsultantModel.find(function(err, consultants){
		if(err) {
			throw err;
		}
		return consultants;
		//console.log(c);
		
	});

	//console.log(c);
    //console.log('test Tous les consultants');
};

//upload
exports.upload = function(FileName){
	//validation fichier avec l'extension
	var valideExt = serviceConsultant.verifFileExtension(serviceConsultant.extensionsValides,FileName);
	//console.log(valideExt);
	if(valideExt){
		console.log('Bon fichier '+valideExt);
		var data1=csv.csvtojson(FileName); //csvtojson is function that accepts csv filenames and returns JSON object
		console.log(data1);
		//save data in mongo
		saveInMongo(data1);
	}else{
		console.log('Sorry fichier invalide '+ valideExt);
	}
	//ensuite delete le file pour ne pas encombr� a activer apres
	fs.unlink(FileName, function(err) {
		if (err) {
		return console.error(err);
		}
		console.log("File deleted successfully!");
	});
	
}

//methode pour sauvegarder dans mongodb a optimiser after 
var saveInMongo = function (data){ 
    for (var i=0; i< data.length; i++){
		saveConsultant(data, i);
	}   
}






//fonction qui teste si consultant existe le save ou le update
var saveConsultant = function(data,j){
	
	var c = new serviceModel.ConsultantModel({
		
		_id :  data[j].EmpId,
		Prenom : data[j].Prenom,
		Nom : data[j].Nom,
		Competences: [data[j].Competences],
		Projets : [data[j].Projet]
	});
	//c.Competences.push(data[j].Competences);
	//c.Projets.push(data[j].Projet);
	
	serviceModel.ConsultantModel.findById(data[j].EmpId, function(err, consultant){
		if(err) {
			console.log(err);
		} else if(consultant == null) {
			//console.log('D�sol�, consultant inexistant donc save like insert');
			c.save(function (err) {
			if(err) {console.log(err);throw err;}
			//console.log('saved!!!! yeah');
			});
		} else{
			//console.log('yes, consultant existe donc save like update');
		 	c.update({
		
				//_id :  data[j].EmpId,
				Prenom : data[j].Prenom,
				Nom : data[j].Nom,
				Competences: [data[j].Competences],
				Projets : [data[j].Projet]
				},function (err) {
					if(err) {console.log(err);throw err;}
					//console.log('saved!!!! yeah');
			}); 
		}
	});
	
}
//module.exports = c;