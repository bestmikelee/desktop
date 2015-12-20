var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var RenewalSchema = new Schema({
  user_id: {type: ObjectId, ref: 'User'},
  exp_date: { type: Date, default: Date.now },
  new_rent: Number,
  lease_id: {type: ObjectId, ref: 'Lease'},
  response: Boolean
});

mongoose.model('Renewal', RenewalSchema);