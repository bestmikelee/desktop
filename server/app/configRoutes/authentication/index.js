var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var _ = require('lodash');
var passport = require('passport');
var path = require('path');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Admin = mongoose.model('Admin');
var sio = require('../../../sockets');
// var emitter = require('socket.io-emitter');

var ENABLED_AUTH_STRATEGIES = [
    // 'local',
    // 'twitter',
    // 'facebook',
    // 'google',
    'lockitron'
];


module.exports = function(app) {
   
    // First, our session middleware will set/read sessions from the request.
    // Our sessions will get stored in Mongo using the same connection from
    // mongoose. Check out the sessions collection in your MongoCLI.
    var sessionMiddleware = session({
        secret: app.getValue('env').SESSION_SECRET,
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        }),
        cookie: {
            maxAge: new Date(Date.now() + 1000 * 60 * 60 * 24) //cookie lasts one day
        }
        // resave: true
        // saveUninitialized: true
    })
    app.use(sessionMiddleware);

    // Initialize passport and also allow it to read
    // the request session information.
    app.use(passport.initialize());
    app.use(passport.session());

    // When we give a cookie to the browser, it is just the userId (encrypted with our secret).
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // When we receive a cookie from the browser, we use that id to set our req.user
    // to a user found in the database.
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            return done(err, user);
        });
    });

    // We provide a simple GET /session in order to get session information directly.
    // This is used by the browser application (Angular) to determine if a user is
    // logged in already.
    app.get('/session', function(req, res) {

        if (req.session.user) {
            Admin.isAdmin(req.session.user).then(function(isAnAdmin) {
                var example;
                //console.log(sio())
                var test = sio().getNamespace(req.session.user._id, function(socket){
                    //socket.join('thisroom')
                    //console.log('session connected', socket)
                        socket.emit('another',{example: 'hello'})
                    socket.on('disconnect', function(){
                        console.log('disconnected')
                    })

                    socket.on('hello', function(data){
                        console.log('from client', data)
                    })
                    //console.log(socket)
                })
                // console.log(sio().emitter.of('/'+ req.session.user._id))
                // sio().emitter.of('/'+ req.session.user._id).emit('auth',{newdata:'data'})

                //console.log(test) 
                // test.sockets.forEach(function(el){
                //     //console.log(el)
                // })
                // var test = sio().getNamespace(req.session.user._id).on('connection', function(socket){
                //         socket.emit('another',{example: 'hello'})
                //     })
                // test.emit('call',{yourself: 'mike'})

                res.status(200).json({
                    user: req.session.user,
                    admin: isAnAdmin,
                    id: req.sessionID,
                    access_token: req.session.access_token
                });
            });
        } else {
            res.status(401).send('No authenticated user.');
        }
    });

    // Simple /logout route.
    app.get('/logout', function(req, res) {

        var second = sio().getNamespace(req.session.user._id)
         //, function(socket){
            // socket.emit('call', {me: 'maybe'})
        //})

        second.sockets.forEach(function(el){
            //console.log(el)
            el.emit('call',{me: 'maybe'})
        }) 
        // var second = sio().getNamespace(req.session.user._id).on('connection', function(socket){
        //     socket.emit('call', {me: 'maybe'})
        // })

        // second.sockets.forEach(function(el){
        //     console.log(el)
        //     el.emit('call',{me: 'maybe'})
        // })
        req.session.destroy();
        res.status(200).end();
    });


    // Each strategy enabled gets registered.
    ENABLED_AUTH_STRATEGIES.forEach(function(strategyName) {
        require(path.join(__dirname, strategyName))(app);
    });

};
