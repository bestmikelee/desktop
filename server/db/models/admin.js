var mongoose = require('mongoose'),
    shortid = require('shortid');

var Admin = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    privilegesFrom: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});
//why do we have this here? - Admin should be holding all the ids
mongoose.adminEmails = [
    'rwcbeaman@gmail.com',
    'alexander.holman@gmail.com',
    'mike.sj.lee@gmail.com',
    'maxrbaldwin2328@gmail.com',
    'effektiv.property@gmail.com'
];

Admin.static('isAdmin', function(user) {
    return this.findById(user._id)
    .then(function(result) {
        return mongoose.adminEmails.indexOf(user.email) !== -1 || !!result;
    }).then(function(isItGood){
        return isItGood;
    });
});

mongoose.model('Admin', Admin);