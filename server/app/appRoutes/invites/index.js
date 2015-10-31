var Router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');
var mandrill = require('mandrill-api/mandrill');

var Request = Promise.promisifyAll(mongoose.model('Request'));
var Invite = Promise.promisifyAll(mongoose.model('Invite'));
var User = Promise.promisifyAll(mongoose.model('User'));
var Landlord = Promise.promisifyAll(mongoose.model('Landlord'));

var mandrill_client = new mandrill.Mandrill('Fgh-nXdW1Cia5OQNlAk51w');

Router.post('/request', function(req, res){
  // if first, last name, email, phone?, company name
  console.log(req.body);
  User.createAsync({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone
  })
  .then(function(doc){
    console.log(doc);
    if(doc) {
      Landlord.createAsync({
        userId: doc.id,
        company: req.body.company
      });
    }
  })
  .then(function(doc){
    if(doc){
      Request.createAsync({
        userId: doc.userId
      });
    }
  })
  .catch(function(err){
    console.log(err);
    res.send('Request Error');
  });
});

Router.post('/request/:id', function(req, res){
  // if state (accept or decline) true or false
  if(req.body.state) {
    Request.findOneAndUpdateAsync({
      _id: req.params.id
    }, {

    })
      .then(function(doc){
        if(doc) {

        }
      });
  } else {
    // return false response
  }
});

Router.get('/landlord', function(req, res){

});

module.exports = Router;
