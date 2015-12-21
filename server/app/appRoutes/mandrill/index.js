var Router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');
var async = require('async');
var _ = require('lodash');
var env = require('../../../env');

//closure for mandrill
var mandrill = require('mandrill-api/mandrill');
var mandrill_clients = new mandrill.Mandrill('D-IwXJumJGLKAuI-a3DqNQ')

var Tenant = mongoose.model('Tenant')
var Renewal = mongoose.model('Renewal');
var Lease = mongoose.model('Lease')
// helper Functions
function findTenantEmail(tenantId){
	return Tenant
			.findById(tenantId)
			.populate('user_id')
			.then(function(tenant){ return tenant.user_id.email})
	}



Router.get('/accept',function(req,res) { 
  console.log(req.query);
  var renewalId = req.query.renewalId;
  assignStatusToLease(renewalId, 'extended')
  .then((lease) => res.json(lease))
});

Router.get('/decline',function(req,res) { 
  console.log(req.query);
  var renewalId = req.query.renewalId;
  assignStatusToLease(renewalId, 'declined')
  .then((lease) => res.json(lease))
});

Router.get('/counter',function(req,res) { 
  console.log(req.query);
  var renewalId = req.query.renewalId;
  assignStatusToLease(renewalId, 'pending')
  .then((lease) => {
  	console.log(lease)
  	res.json(lease);
  })
});

function assignStatusToLease(renewalId, leaseStatus){
	return Renewal.findByIdAsync(renewalId)
	.then((renewal) => {
		return Lease.findByIdAndUpdateAsync(renewal.lease_id, {status: leaseStatus}, {new: true})
	})
}



module.exports = Router


