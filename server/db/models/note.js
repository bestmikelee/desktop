var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var NoteSchema = new Schema({
  to: {type: ObjectId, ref: 'User'},
  from: {type: ObjectId, ref: 'User'},
  date_created: { type: Date, default: Date.now },
  content: String,
  appt_date: Date,
  status_new: Boolean,
  status_archive: Boolean
});

mongoose.model('Note', NoteSchema);