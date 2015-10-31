var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var InviteSchema = new Schema({
  toId: {type: ObjectId, ref: 'User'},
  fromId: {type: ObjectId, ref: 'User'},
  accepted: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

mongoose.model('Invite', InviteSchema);
