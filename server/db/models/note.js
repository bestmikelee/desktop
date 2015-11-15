var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var NoteSchema = new Schema({
  to: {type: ObjectId, ref: 'User'},
  from: {type: ObjectId, ref: 'User'},
  date_created: { type: Date, default: Date.now },
  title: String,
  body: String,
  start_date: Date,
  end_date: Date,
  status_new: { type: Boolean, default: true },
  status_archive: Boolean
});

mongoose.model('Note', NoteSchema);