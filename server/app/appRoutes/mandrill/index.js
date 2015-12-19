var Router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');
var async = require('async');
var _ = require('lodash');

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



Router.post('/renewalEmails',function(req,res) { 
// console log out the data coming in from the HTTP post
  // console.log(req.body)
  const mandrillArry = [];
  req.body.forEach(function(obj){
  	var mandrillObj = {};
  	obj
  	.tenant_ids
  	.forEach((tenant) => {
  		findTenantEmail(tenant)
  		.then(function(email){console.log(email)})
  	})
  })
  var message = {
  	"html": "<p>This is a test renewal email using the mandrill node API</p>",
    "text": "Renewal Text Content",
    "subject": "Renew Your Apartment",
    "from_email": "renewals@effektiv.com",
    "from_name": "Effektiv.Property",
    "to": [
        {
            "email": "rwcbeaman@gmail.com",
            "name": "Roger Beaman",
            "type": "to"
        },
        {
            "email": "mike.sj.lee@gmail.com",
            "name": "Mike Lee",
            "type": "to"
        },
        {
            "email": "alexander.holman@gmail.com",
            "name": "Alexander Holman",
            "type": "to"
        }]
  }

  mandrill_clients.messages.send({'message':message},function(success){console.log(success)},function(e){console.log(e)})
});

module.exports = Router


