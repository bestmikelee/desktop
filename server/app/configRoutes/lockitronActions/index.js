var Promise = require('bluebird');
var mongoose = require('mongoose');
var _ = require('lodash');
var Request = Promise.promisifyAll(require('request'));
var Apartment = Promise.promisifyAll(mongoose.model('Apartment'));

module.exports = function(app) {

    // Alex Holman add in to test angular AJAX call
    app.get('/api/lockitron/approval', function(req, res) {
        res.send('you have been approved for access.');
    });

    // Share Access
    app.post('/lockitron/share', function(req, res, next) {
        // Use this to create a new key and share
        // the request body needs the access token, lockId (not lockitronId), and an email or a phone number at a minimum
        // the request body can also take in the other properties as described in the reqObj definition below

        var token = req.body.access_token;
        var lockId = req.body.lockId;
        var reqObj = _.pick(req.body, ['email', 'start_date', 'expiration_date', 'role']); //,'phone','name',
        console.log(token, lockId, reqObj);
        Request.postAsync({
            url: 'https://api.lockitron.com/v2/locks/' + lockId + '/keys?access_token=' + token,
            json: reqObj
        }).then(function(response) {
            var tempStatusCode = response[0].statusCode;
            response.statusCode = tempStatusCode;
            response = response[0].body;

            if (tempStatusCode < 400) {
                Apartment.findByIdAndUpdateAsync(req.body.apartment_id, {
                        $push: {
                            permitted_entrants: {
                                email: req.body.email,
                                role: req.body.role,
                                start_date: req.body.start_date,
                                expiration_date: req.body.expiration_date,
                                key_id: response.id
                            }
                        }
                    }, {
                        new: true
                    },
                    function(err, after) {
                        if (err) next(err);
                        else res.json(response);
                    });
            } else {
                console.log(response);
                res.json({
                    statusCode: tempStatusCode
                });
            }
        });
    });

    // Get rid of access
    app.post('/lockitron/revoke', function(req, res, next) {
        var token = req.body.access_token;
        var lockId = req.body.lockId;
        var key_id = req.body.key_id;
        console.log(req.body.apartment_id);

        Request.delAsync('https://api.lockitron.com/v2/locks/' + lockId + '/keys/' + key_id + '?access_token=' + token)
            .then(function(response) {
                var tempStatusCode = response[0].statusCode;
                response.statusCode = tempStatusCode;
                response = response[0].body;

                if (tempStatusCode < 400) {
                    Apartment.findByIdAndUpdateAsync(req.body.apartment_id, {
                            $pull: {
                                permitted_entrants: {
                                    key_id: req.body.key_id
                                }
                            }
                        }, {
                            new: true
                        },
                        function(err, after) {
                            console.log(arguments);
                            if (err) next(err);
                            else res.json(response);
                        });
                } else {
                    console.log(response);
                    res.json({
                        statusCode: tempStatusCode
                    });
                }
            });
    });

    app.post('/lockitron/lockinfo', function(req, res, next) {
        //get lock properties by id
        var token = req.body.access_token;
        var lockId = req.body.lockId;
        Request.getAsync('https://api.lockitron.com/v2/locks/' + lockId + '?access_token=' + token)
            .then(function(response) {
                var tempStatusCode = response[0].statusCode;
                response.statusCode = tempStatusCode;
                response = response[0].body;
                if (tempStatusCode < 400) {
                    res.json(response);
                } else {
                    console.log(response);
                    res.json({
                        statusCode: tempStatusCode
                    });
                }
            });
    });

    app.post('/lockitron/lockaction', function(req, res, next) {
        //turn lock on or off
        var token = req.body.access_token;
        var lockId = req.body.lockId;
        var reqObj = _.pick(req.body, ['state', 'noblock']);
        Request.putAsync('https://api.lockitron.com/v2/locks/' + lockId + '?access_token=' + token + '&state=' + reqObj.state + '&noblock=' + reqObj.noblock)
            .then(function(response) {
                var tempStatusCode = response[0].statusCode;
                response.statusCode = tempStatusCode;
                response = response[0].body;
                if (tempStatusCode < 400) {
                    res.json(response);
                } else {
                    console.log(response);
                    res.json({
                        statusCode: tempStatusCode
                    });
                }
            });
    });

    app.post('/lockitron/user', function(req, res, next) {
        //get user properties by id
        var token = req.body.access_token;
        var user_id = req.body.user_id;
        Request.putAsync('https://api.lockitron.com/v2/users/' + user_id + '?access_token=' + token)
            .then(function(lock) {
                res.json(lock);
            });
    });

};
