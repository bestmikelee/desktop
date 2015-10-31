var mongoose = require('mongoose');

var BuildingSchema = new mongoose.Schema({
	name: String,
	street_number: String,
	street_name: String,
	city: String,
	state: String,
	apartments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Apartment'}],
	landlord_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Landlord'},
	heat_type: String,
	elevator: Boolean,
	doorman: Boolean,
	gym: Boolean,
	pool: Boolean,
	parking: Boolean,
	common_roof: Boolean,
	laundry: Boolean,
	pets_allowed: Boolean
});

mongoose.model('Building', BuildingSchema);