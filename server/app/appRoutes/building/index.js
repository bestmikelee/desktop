var Router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');
var visit = Promise.promisifyAll(mongoose.model('Visit'));
var async = require('async');
var _ = require('lodash');

// Requiring in all mongo models needed
var Landlord = Promise.promisifyAll(mongoose.model('Landlord'));
var Building = Promise.promisifyAll(mongoose.model('Building'));
var Apartment = Promise.promisifyAll(mongoose.model('Apartment'));
var Tenant = Promise.promisifyAll(mongoose.model('Tenant'));

var buildingHelper = require('../dbHelper')(Building)


//Building Route
Router.get('/:id',function(req, res, next){
	var options = [{
		path: "apartments.tenant_ids",
		model: "Tenant"
	},{
		path: "apartments.brokers",
		model: "Broker"
	},{
		path: "apartments.brokerages",
		model: "Brokerage"
	}]
	
	Building.findById(req.params.id).populate('landlord_id apartments').then(function(building){
		Building.populate(building, options, function(err, buildPop){
			res.json(buildPop);
		})
	})
});		

//create new building
Router.post('/add', function(req,res,next){

	var build = new Building(buildingHelper.newDoc(req.body));	
	Landlord.findByIdAndUpdate(req.body.landlord_id, {$addToSet: {building_ids: build._id}}, {
			new: true
		},function(err,ll){
			build.save(function(err){
				if (err) return next(err);
				res.status(200).send(build);
				
			})
		})
})

Router.post('/edit',function(req,res,next){
	if (req.body.overwrite)
		var options = buildingHelper.updateSet(req.body)
	else
		var options = buildingHelper.updateAppend(req.body)

	Building.findByIdAndUpdate(req.body._id, options, {
			new: true
		},
		function(err,build){
			if(err) return next(err);
			res.json(build);
		})
})

module.exports = Router;