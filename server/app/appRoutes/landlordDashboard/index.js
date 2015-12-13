var Router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');
var Request = Promise.promisifyAll(require('request'));
var visit = Promise.promisifyAll(mongoose.model('Visit'));
var async = require('async');
var _ = require('lodash');
var io = require('../../../sockets');
// Requiring in all mongo models needed

var Landlord = Promise.promisifyAll(mongoose.model('Landlord'));
var Building = Promise.promisifyAll(mongoose.model('Building'));
var Apartment = Promise.promisifyAll(mongoose.model('Apartment'));
var Lease = Promise.promisifyAll(mongoose.model('Lease'));
var Note = Promise.promisifyAll(mongoose.model('Note'));

var llHelper = require('../dbHelper')(Landlord);

Router.get('/:user_id', function(req, res, next) {
    //should be using ids
    Landlord.find({company:"Test Company"}).exec(function(err, llord) {
        
        //var test = io().getNamespace(req.params.user_id).emit('auth',{data: 'testing'})


        if (llord.length){
            async.parallel({
                Info: function(cb){
                    cb(null, llord[0])
                },
                Buildings: function(cb){
                    Building.findAsync({landlord_id: llord[0]._id}).then(function(result){
                        cb(null, result);
                    })
                },
                Apartments: function(cb){
                    Apartment.findAsync({landlord_id: llord[0]._id}).then(function(result){
                        cb(null, result);
                    })
                },
                Leases: function(cb){
                    Lease.findAsync({landlord_id:llord[0]._id}).then(function(result){
                        cb(null, result);
                    })
                },
                Notifications: function(cb){
                    Note.findAsync({ to: llord[0].user_id }).then(function(result){
                        cb(null,result);
                    })
                }
            }, function(err,results){

                // Begin Deprecate
                Building.find({
                    landlord_id: llord[0]._id
                }).populate('apartments')
                .then(function(building) {
                    var options = {
                        path: 'apartments.lease_ids',
                        model: 'Lease'
                    };
                    Building.populate(building, options, function(err, bld) {
                        var lluser = JSON.parse(JSON.stringify(llord[0]));
                        lluser.building_ids = bld;
                        lluser.landlord_data = results
                        res.json(lluser);
                    });
                });
                // End Deprecate


                //uncomment once deprecated field is deleted:
                //res.json(results)
            })



        }else{
            res.json({})
        }
        
    });

});


Router.post('/add', function(req, res, next) {
    var ll = new Landlord(llHelper.newDoc(req.body));
    ll.save(function(err) {
        if (err) return next(err);
        res.status(200).send(ll);
    });
});

Router.post('/edit', function(req, res, next) {
    var options;
    if (req.body.overwrite)
        options = llHelper.updateSet(req.body);
    else
        options = llHelper.updateAppend(req.body);

    Landlord.findByIdAndUpdate(req.body._id, options, {
            new: true
        },
        function(err, ll) {
            if (err) return next(err);
            res.json(ll);
        });
});

Router.post('/share', function(req,res,next){
    var url = 'https://api.lockitron.com/v2/locks/' + req.body.lock_id + '/keys?access_token=' + req.body.access_token + '&email=' + req.body.email

    Request.postAsync({
        url: url
    });
})

module.exports = Router;
