var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var lease_status = ['notified','extended','expired','current','declined','pending'];
// current = currently active (not in 90 day window)
// expired = not renewed, not current
// notified = in 90 day window and tenant notified
// extended = tenant will continue current lease
// declined = tenant will not continue current lease

var LeaseSchema = new mongoose.Schema({
	link: String,
	name: String,
	rent: Number,
	status: {type: String, enum: lease_status},
	end_date: {type: Date, default: '1/1/2000'},
	start_date: {type: Date, default: '1/1/2000'},
	tenant_ids: [{type: ObjectId, ref: 'Tenant'}],
	apartment_id: {type: ObjectId, ref: 'Apartment'},
	landlord_id: {type: ObjectId, ref: 'Landlord'},
	broker_id: {type: ObjectId, ref: 'Broker'}
});

mongoose.model('Lease', LeaseSchema);
