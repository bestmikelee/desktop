'use strict';
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {

    var facebookConfig = app.getValue('env').FACEBOOK;

    var facebookCredentials = {
        clientID: facebookConfig.clientID,
        clientSecret: facebookConfig.clientSecret,
        callbackURL: facebookConfig.callbackURL,
        profileFields: ['id', 'first_name', 'last_name', 'photos', 'email', 'profileUrl']
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {

        UserModel.findOne({ 'facebook.id': profile.id }).exec()
            .then(function (user) {
                console.log(profile);
                console.log(profile.emails);
                if (user) {
                    return user;
                } else {
                    return UserModel.findOne({
                        email: profile._json.email
                    }).exec().then(function(user) {
                        user.firstName = user.firstName || profile._json.first_name;
                        user.lastName = user.lastName || profile._json.last_name;
                        user.photo = user.photo || profile._json.picture.data.url;
                        user.facebook = {
                            id: profile._json.id,
                            profileUrl: profile._json.link
                        };
                        return user.save();
                    });
                }
            }).then(function (userToLogin) {
                done(null, userToLogin);
            }, function (err) {
                console.error('Error creating user from Facebook authentication', err);
                done(err);
            });
    };

    passport.use(new FacebookStrategy(facebookCredentials, verifyCallback));

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email' ] }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function (req, res) {
            req.admin = req.user.isAdmin;
            res.redirect('/');
        });

};
