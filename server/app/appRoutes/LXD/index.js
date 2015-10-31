var router = require('express').Router,
    mongoose = require('mongoose'),
    Promise = require('bluebird'),
    visit = Promise.promsifyAll(mongoose.model('Visit'));

router.get('/',function(res,req){
	
});

router.post('/',function(res,req){

})

router.put('/',function(res,req){


})