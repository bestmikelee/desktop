var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ApartmentSchema = new mongoose.Schema({
	lock_id: String,
	unit_number: String,
	building_id: {type: ObjectId, ref: 'Building'},
	bedroom_count: Number,
	bathroom_count: Number,
	total_room_count: Number,
	sq_ft: Number,
	type: String,
	lease_ids: [{type: ObjectId, ref: 'Lease'}],
	brokers: [{type: ObjectId, ref: 'Broker'}],
	brokerages: [{type: ObjectId, ref: 'Brokerage'}],
	tenant_ids: [{type: ObjectId, ref: 'Tenant'}],
	permitted_entrants: [{
		email: String,
		role: String,
		start_date: Date,
		expiration_date: Date,
		key_id: String
	}]
});

mongoose.model('Apartment', ApartmentSchema);
