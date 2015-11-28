var mongoose = require('mongoose');

var VisitSchema = new mongoose.Schema({
	apartment_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Apartment'},
	tenant_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Tenant'},
	broker_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Broker'},
	landlord_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Landlord'},
	date: Date
});

mongoose.model('Visit',VisitSchema);