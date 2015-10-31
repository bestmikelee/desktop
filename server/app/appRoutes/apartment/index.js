var Router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');
var visit = Promise.promisifyAll(mongoose.model('Visit'));
var async = require('async');
var _ = require('lodash');
// Requiring in all mongo models needed

var Building = Promise.promisifyAll(mongoose.model('Building'));
var Apartment = Promise.promisifyAll(mongoose.model('Apartment'));
var Tenant = Promise.promisifyAll(mongoose.model('Tenant'));

var aptHelper = require('../dbHelper')(Apartment);


//Apartment Route
Router.get('/:id',function(req, res, next){
	var options ={
		path: "tenant_ids.user_id",
		model: "User"
	};
	var brokersOpt ={
		path: "brokers.user_id",
		model: "User"
	};
	Apartment.findById(req.params.id).populate('tenant_ids brokers brokerages lease_ids').then(function(apt){
		Apartment.populate(apt, options, function(err, aptPop){
			Apartment.populate(aptPop, brokersOpt, function(err,brokPop){
				res.json(brokPop);
			});
		});
	});
});


//create new apartment
Router.post('/add', function(req,res,next){
	var apt = new Apartment(aptHelper.newDoc(req.body));
	Building.findByIdAndUpdate(req.body.building_id, {$addToSet: {apartments: apt._id}}, {
		new: true
	},function(err, build){
		if(err) console.log(err);
		else {
			apt.save(function(err){
				if (err) return next(err);
				var apt_dupe = JSON.parse(JSON.stringify(apt));

				if (req.body.lease){

					apt_dupe.lease_ids = [req.body.lease];

				} else {

					apt_dupe.lease_ids = [];
				}
				console.log(apt_dupe);
				res.status(200).send(apt_dupe);
			});
		}
	});
});

Router.post('/edit',function(req,res,next){
	if (req.body.overwrite)
		var options = aptHelper.updateSet(req.body)
	else
		var options = aptHelper.updateAppend(req.body)

	Apartment.findByIdAndUpdate(req.body._id, options, {
			new: true
		},
		function(err,apt){
			if(err) return next(err);
			res.json(apt);
		})
})

module.exports = Router;
