var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var LeaseSchema = new mongoose.Schema({
	link: String,
	name: String,
	rent: Number,
  	status: String,
	end_date: {type: Date, default: '1/1/2000'},
	start_date: {type: Date, default: '1/1/2000'},
	tenant_ids: [{type: ObjectId, ref: 'Tenant'}],
	apartment_id: {type: ObjectId, ref: 'Apartment'},
  landlord_id: {type: ObjectId, ref: 'Landlord'},
  broker_id: {type: ObjectId, ref: 'Broker'}
});

mongoose.model('Lease', LeaseSchema);
