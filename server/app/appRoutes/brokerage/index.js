var Router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');
var visit = Promise.promisifyAll(mongoose.model('Visit'));
var async = require('async');
var _ = require('lodash');
// Requiring in all mongo models needed

var Brokerage = Promise.promisifyAll(mongoose.model('Brokerage'));
var brokerageHelper = require('../dbHelper')(Brokerage);

Router.get('/:user_id',function(req,res, next){
	var options = {
			path:'brokers.user_id',
			model:'User'
		}
	
	Brokerage.find({owner_id: req.params.user_id}).populate('buildings brokers')
		.then(function(brokerage){
			Brokerage.populate(brokerage,options,function(err, brk){
				if(err) return next(err);
				res.json(brk);
			})
		});
});		


Router.post('/add',function(req,res){
	var brokerage = new Brokerage(brokerageHelper.newDoc(req.body));
	brokerage.save(function(err){
		if (err) return next(err);
		res.status(200).send(brokerage);
	})
})

Router.post('/edit',function(req,res){
	if (req.body.overwrite)
		var options = brokerageHelper.updateSet(req.body)
	else
		var options = brokerageHelper.updateAppend(req.body)

	Brokerage.findByIdAndUpdate(req.body._id, options, {
			new: true
		},
		function(err,build){
			if(err) return next(err);
			res.json(build);
		})
})

module.exports = Router;