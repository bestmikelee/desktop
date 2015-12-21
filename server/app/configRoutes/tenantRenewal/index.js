var mongoose = require('mongoose');
var Promise = require('bluebird');
var async = require('async');
var _ = require('lodash');
var moment = require('moment')
var mandrill = require('mandrill-api/mandrill');
var mandrill_clients = new mandrill.Mandrill('D-IwXJumJGLKAuI-a3DqNQ')

var Tenant = Promise.promisifyAll(mongoose.model('Tenant'));
var Renewal = Promise.promisifyAll(mongoose.model('Renewal'));

function findUser(tenantId){
	return Tenant
			.findById(tenantId)
			.populate('user_id')
			.then((tenant)=> { 
        return tenant.user_id
      })
	}


module.exports = function(app){
  var MANDRILL = app.getValue('env').MANDRILL

  app.post('/tenantRenewal',function(req,res) { 
    // console log out the data coming in from the HTTP post
    // console.log(req.body)
    
    //console.log(req.body);
    var mandrillMessages = [];

    var emails = _.flattenDeep(req.body.map((apt) => {
      var thisApt = apt;

      return apt.tenant_ids.map((tenant) => {
        
        return findUser(tenant).then((user) => {
          return createRenewalEmail(user, thisApt)
        })
        .then((renewal)=>{
          //refactor with bind/apply/call
             return Promise.resolve((()=>{
                mandrill_clients.messages.send({'message': renewal}, function(success){
                  mandrillMessages.push(success);
                  //console.log(success);
                },
                function(e){
                  console.log(e);
                })
              })())
        })    
      })

    }))
    Promise.all(emails).then((success)=> {
      
      console.log(mandrillMessages)
      res.json(success)
    })

    

    
  });

  function createRenewalEmail(user, apt){

    var currentLease = apt.lease_ids.filter((lease) => {
      return lease.status !== 'expired';
    })[0];
    var newRent = apt.newRent;
    console.log('newRent', newRent)
    return Renewal.createAsync({
      user_id: user._id,
      exp_date: moment().add(2, 'days').toDate(),
      new_rent: newRent,
      lease_id: currentLease._id
    })
    .then((renew) => {
      console.log('renewal', renew);
      var emailBody = "<h3>" + user.firstName + ", this is a test renewal email using the mandrill node API</h3>" +
                    "<p> Previous Rent: " + currentLease.rent + "</p>" +
                    "<p> New Rent: " + renew.new_rent + "</p>" +
                    "<a href=" + MANDRILL.AcceptUrl + "?renewalId=" + renew._id + ">Accept</a> " +
                    "<a href=" + MANDRILL.CounterUrl + "?renewalId=" + renew._id + ">Counter</a> " +
                    "<a href=" + MANDRILL.DeclineUrl + "?renewalId=" + renew._id + ">Decline</a>"

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

