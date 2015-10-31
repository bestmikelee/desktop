var Router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');
var visit = Promise.promisifyAll(mongoose.model('Visit'));
var async = require('async');
var _ = require('lodash');
// Requiring in all mongo models needed

var Broker = Promise.promisifyAll(mongoose.model('Broker'));
var brokerHelper = require('../dbHelper')(Broker)

//broker route
Router.get('/:id',function(req,res, next){

	Broker.findById(req.params.id).populate('brokerage_id showings').then(function(docs){
		var options = [{
			path:'sales.apartment_id',
			model:'Apartment'
		},{
			path:'showings.apartment_id',
			model: 'Apartment'
		},{
			path: 'showings.tenant_id',
			model: 'Tenant'
		}]
		Broker.populate(docs,options,function(err,theDocs){
			if (err) {console.error(err); return}
			var secondOptions = {
				path: 'showings.tenant_id.user_id',
				model: 'User'
			}
			Broker.populate(theDocs, secondOptions, function(err, full){
				res.json(full);
			})
		})
	})
});		


Router.post('/add',function(req,res,next){
	var broker = new Broker(brokerHelper.newDoc(req.body));
	broker.save(function(err){
		if (err) return next(err);
		res.status(200).send(broker);
	})
})

Router.post('/edit',function(req,res,next){
	if (req.body.overwrite)
		var options = brokerHelper.updateSet(req.body)
	else
		var options = brokerHelper.updateAppend(req.body)

	Broker.findByIdAndUpdate(req.body._id, options, {
			new: true
		},
		function(err,broker){
			if(err) return next(err);
			res.json(broker);
		})
})

module.exports = Router;