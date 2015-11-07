var Promise = require('bluebird');
var mongoose = require('mongoose');
var _ = require('lodash');
var Request = Promise.promisifyAll(require('request'));
var User = Promise.promisifyAll(mongoose.model('User'));
var Landlord = Promise.promisifyAll(mongoose.model('Landlord'));

module.exports = function(app) {

    var lockitronConfig = app.getValue('env').LOCKITRON;

    app.get('/lockitron-redirect', function(req, res) {
        res.redirect('https://api.lockitron.com/oauth/authorize?client_id=' + lockitronConfig.clientID + '&response_type=code&redirect_uri=' + lockitronConfig.callbackURL + '&state=' + req.query.state);
    });

    app.get('/auth/lockitron', function(req, res) {
        // If we got an auth code from lockitron, send to get an access token for this user.
        console.log(req.query.code);
        var access_token;

        function RepeatedRouteHit() {
            return Request.postAsync({
                url: 'https://api.lockitron.com/oauth/token',
                json: {
                    client_id: lockitronConfig.clientID,
                    client_secret: lockitronConfig.clientSecret,
                    grant_type: 'authorization_code',
                    redirect_uri: lockitronConfig.callbackURL,
                    code: req.query.code
                }
            });
        }

        if (req.query.code) {
            switch (req.query.state) {
                case 'login':
                    RepeatedRouteHit().then(function(response) {
                            // If there is a response, use the access token.
                            if (response && response[0] && response[0].body && response[0].body.access_token) {
                                access_token = response[0].body.access_token;
                                return Request.getAsync('https://api.lockitron.com/v2/users/me?access_token=' + response[0].body.access_token);
                            } else {
                                return Promise.reject('no token');
                            }
                        }).then(function(user) {
                            user = JSON.parse(user[0].body);
                            // If we get a response, find the user in our db.
                            if (user) {
                                return [User.findOne({
                                    lockitronId: user.id,
                                    email: user.email
                                }), Promise.resolve(user)];
                            } else {
                                res.send('no user');
                            }
                        })
                        .spread(function(doc, user) {
                            // If there was a user in the db, send them to their dashboard, else, create them.
                            if (doc) {
                                req.session.user = doc;
                                req.session.access_token = access_token;
                                res.status(200).redirect('/');
                            } else if (user) {
                                return User.createAsync({
                                    lockitronId: user.id,
                                    email: user.email,
                                    firstName: user.first_name,
                                    lastName: user.last_name,
                                    photo: user.avatar_url.replace('http:','').replace('https:',''),
                                    phone: user.phone
                                });
                            }
                        })
                        .then(function(user) {
                            // If they were created ask them what user type they want to be.
                            if (user) {
                                req.session.user = user;
                                req.session.access_token = access_token;
                                // @TODO: should redirect to a page where the user can select what kind of user they are.
                                // Automatically assigning new users as landlords
                                return Landlord.createAsync({
                                    user_id: user._id
                                })
                            }
                        })
                        .then(function(llord){
                            console.log(llord)
                            if (llord)                                
                                res.status(200).redirect('/');

                        })
                        .catch(function(err) {
                            console.log(err);
                            res.send('Error!!!');
                        });
                    break;
                case 'userlocks':
                    //if no locks return all locks
                    var accessToken; //declaring at higher level
                    RepeatedRouteHit().then(function(response) {
                        //console.log(response)
                        if (response && response[0] && response[0].body && response[0].body.access_token) {
                            accessToken = response[0].body.access_token;
                            return Request.getAsync('https://api.lockitron.com/v2/locks?access_token=' + response[0].body.access_token);
                        } else {
                            return Promise.reject('no token');
                        }
                    }).then(function(obj) {
                        // Promise.resolve(obj).then(function)
                        // console.log(obj)
                        var locks = JSON.parse(obj[0].body).map(function(el) {
                            return _.pick(el, ['id', 'keys']);
                        });

                        var resObj = {
                            access_token: accessToken,
                            locks: locks
                        };

                        //console.log(locks)
                        res.json(resObj);
                    });
                    break;
                default:
                    res.sendStatus(404);
            }

        } else {
            res.send('no code');
        }
    });
};
