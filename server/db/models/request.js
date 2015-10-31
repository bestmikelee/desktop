var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var RequestSchema = new Schema({
  from_user: {type: ObjectId, ref: 'User'},
  to_user: {type: ObjectId, ref: 'User'},
  date: { type: Date, default: Date.now }
});

mongoose.model('Request', RequestSchema);
