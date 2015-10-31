var crypto = require('crypto');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var validators = require('./validation');

var UserSchema = new mongoose.Schema({
    lockitronId: String,
    userType: [String],
    userTypeIds: {
      landlord: {type: ObjectId, ref: 'Landlord'},
      broker: {type: ObjectId, ref: 'Broker'},
      tenant: {type: ObjectId, ref: 'Tenant'}
    },
    firstName: String,
    lastName: String,
    photo: String,
    phone: String,
    email: String
});

UserSchema.path('email').validate(validators.email, 'Must be a valid email');
UserSchema.path('phone').validate(validators.phone, 'Must be a valid phone number');

mongoose.model('User', UserSchema);
