var Promise = require('bluebird');
var mongoose = require('mongoose');
var _ = require('lodash');
var async = require('async');
var moment = require('moment');
var Lease = Promise.promisifyAll(mongoose.model('Lease'));
var Apartment = Promise.promisifyAll(mongoose.model('Apartment'));
var Landlord = Promise.promisifyAll(mongoose.model('Landlord'));
var Note = Promise.promisifyAll(mongoose.model('Note'));
var ObjectId = mongoose.Schema.Types.ObjectId;
//var Async = Promise.promisifyAll(async);
var sockets = require('../../../sockets');

module.exports = function(app) {

	app.get('/dailyUpdate', function (req, res, next){
		var thismoment = moment();
		var today = thismoment.clone().toDate();
		var ninetydays = new Date(thismoment.clone().add(90,'days').toDate());
		console.log('90 days', ninetydays)
		//task: find date dependent notifications - specifically leases that enter a 90 day threshold
		Lease.findAsync({ end_date: { $lte : ninetydays, $gt : today }, status: 'current'})
			.then(function(leases){
				// create notification and add to landlord
				var landlord_ids = _.pluck(leases, 'landlord_id');
				//console.log('landlords', landlord_ids)
				landlord_ids = _.uniq(landlord_ids.map(function(el){
					return el.toString();
				}))
				console.log('uniq landlords', landlord_ids)

				return Promise.all(landlord_ids.map(function(id){
					var llord_leases = _.pluck(leases.filter(function(el){
						return el.landlord_id.toString() === id;
					}), '_id')
				
					return Note.createAsync({
						to: id,
						title: 'Lease Report - ' + thismoment.format('dddd, MMMM Do YYYY'),
						body: llord_leases.length !== 1 ? 
							llord_leases.length + ' leases need your attention' 
							: llord_leases.length + ' lease needs your attention',
						start_date: thismoment.toDate(),
						payload: llord_leases
					})
					.then(function(note){
						console.log('note', note)
						//.log(id)
						return Landlord.findByIdAndUpdateAsync(id, {$addToSet: { notifications : note._id } }, { new: true})	
					})
					.then(function(llord){
						console.log('landlord updated', llord);
						return Promise.all(llord_leases.map(function(leaseid){
							return Lease.findByIdAndUpdateAsync(leaseid, {status : 'notified'}, { new : true })
						}));
					})
				}));
			})
			.then(function(results){
				console.log(results);
				res.json(results);
			})

		// Landlord.findAsync({}).then(function(llord){

		// })
	})
}