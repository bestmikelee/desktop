// var passport = require('passport');
// var _ = require('lodash');
// var LocalStrategy = require('passport-local').Strategy;
// var mongoose = require('mongoose');
// var User = mongoose.model('User');
// var Admin = mongoose.model('Admin');
//
// module.exports = function(app) {
//
//     // A POST /login route is created to handle login.
//     //// This never happens Max! lol :)
//     app.post('/login', function(req, res, next) {
//
//             if (!req.session.user) {
//                 var error = new Error('Invalid login credentials.');
//                 error.status = 401;
//                 return next(error);
//             }
//
//         Admin.isAdmin(req.session.user).then(function(isAnAdmin){
//           res.status(200).json({
//             user: req.session.user,
//             admin: isAnAdmin
//           });
//       });
//
//     });
// };
