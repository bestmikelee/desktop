var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var validators = require('./validation');

var TenantSchema = new Schema({
  apt_id: {type: ObjectId, ref: 'Apartment'},
  building_id: {type: ObjectId, ref: 'Building'},
  user_id: {type: ObjectId, ref: 'User'},
  landlord_id: {type: ObjectId, ref: 'Landlord'}
});

// TenantSchema.path('email').validate(validators.email, 'Must be a valid email');
// TenantSchema.path('phone').validate(validators.phone, 'Must be a valid phone number');

mongoose.model('Tenant', TenantSchema);
