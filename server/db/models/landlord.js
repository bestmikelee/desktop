var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var validators = require('./validation');

var LandlordSchema = new Schema({
  user_id: {type: ObjectId, ref: 'User'},
  company: String,
  address: String,
  city: String,
  state: String,
  gender: String,
  building_ids: [{type: ObjectId, ref: 'Building'}],
  notifications: [{type: ObjectId, ref: 'Note'}]
});

mongoose.model('Landlord', LandlordSchema);
