var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var note_types = ['Lease'];

var NoteSchema = new Schema({
  to: {type: ObjectId, ref: 'User'},
  from: {type: ObjectId, ref: 'User'},
  date_created: { type: Date, default: Date.now },
  title: String,
  body: String,
  type: {type: String, enum: note_types},
  payload: [Schema.Types.Mixed],
  start_date: Date,
  end_date: Date,
  status_new: { type: Boolean, default: true },
  status_archive: Boolean
});

mongoose.model('Note', NoteSchema);