var Router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');
var visit = Promise.promisifyAll(mongoose.model('Visit'));
var async = require('async');
var _ = require('lodash');
// Requiring in all mongo models needed

var Tenant = Promise.promisifyAll(mongoose.model('Tenant'));
var tenantHelper = require('../dbHelper')(Tenant);

//Tenant Route
Router.get('/',function(req,res, next){
	Tenant.find(req.query).then(function(tenant){
		res.json(tenant);
	})
});		


Router.post('/add',function(req,res,next){

})

Router.post('/edit',function(req,res){
})

module.exports = Router;