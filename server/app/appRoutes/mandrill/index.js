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

// helper Functions
function findTenantEmail(tenantId){
	return Tenant
			.findById(tenantId)
			.populate('user_id')
			.then(function(tenant){ return tenant.user_id.email})
	}



Router.get('/accept',function(req,res) { 
  var userId = req.query.userId;
  var leaseId = req.query.leaseId;
  
});



module.exports = Router


