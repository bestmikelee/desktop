var Router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');
var async = require('async');
var _ = require('lodash');

console.log('are we even getting to mandrill')

Router.post('/renewalEmails',function(req,res) { 
	console.log(req.body)
  console.log('route hit!')
  res.json('test')
});

module.exports = Router


