var mongoose = require('mongoose');
var Promise = require('bluebird');
var async = require('async');
var _ = require('lodash');

var moment = require('moment')
//closure for mandrill
var mandrill = require('mandrill-api/mandrill');
var mandrill_clients = new mandrill.Mandrill('D-IwXJumJGLKAuI-a3DqNQ')

var Tenant = mongoose.model('Tenant');
var Renewal = Promise.promisifyAll(mongoose.model('Renewal'));

// helper Functions
function findUser(tenantId){
	return Tenant
			.findById(tenantId)
			.populate('user_id')
			.then(function(tenant){ return tenant.user_id})
	}


module.exports = function(app){
  var env = require('../../../env')(app);

  app.post('/tenantRenewal',function(req,res) { 
    // console log out the data coming in from the HTTP post
    // console.log(req.body)
    
    req.body.leases.forEach((lease) => {
      lease.tenant_ids.forEach((tenant) => {
        
        findUser(tenant)
        .then((user) => {
          
          createRenewalEmail(user,lease)
          .then((renewal)=>{
            mandrill_clients.messages.send({'message': renewal},
            function(success){
              console.log(success)
            },
            function(e){console.log(e)})
          })

        })
      })
    })

    

    
  });

  function createRenewalEmail(user,lease){

  return Renewal.createAsync({
    user_id: user._id,
    exp_date: moment().add(2, 'days').toDate(),
    new_rent: lease.new_rent,
    lease_id: lease._id
  }).then((renew) => {
    var emailBody = "<h3>" + user.firstName + ", this is a test renewal email using the mandrill node API</h3>" +
                  "<p> Previous Rent: " + lease.rent + "</p>" +
                  "<p> New Rent: " + lease.newrent + "</p>" +
                  "<a href=" + env.MANDRILL.AcceptUrl + "?renewalId=" + renew._id + ">Accept</a> " +
                  "<a href=" + env.MANDRILL.CounterUrl + "?renewalId=" + renew._id + ">Counter</a> " +
                  "<a href=" + env.MANDRILL.DeclineUrl + "?renewalId=" + renew._id + ">Decline</a>"

    return Promise.resolve({
      "html": emailBody,
      "text": "Renewal Text Content",
      "subject": "Renew Your Apartment " + user.firstName,
      "from_email": "renewals@effektiv.com",
      "from_name": "Effektiv.Property",
      "to": [{
              "email": user.email,
              "name": user.fullName,
              "type": "to"
          }]
    })
  })
  
}


}

