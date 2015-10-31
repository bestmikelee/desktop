var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var BrokerSchema = new mongoose.Schema({
	license_ID: String,
	user_id: {type: ObjectId, ref: 'User'},
	brokerage_id: {type: ObjectId, ref: 'Brokerage'},
	showings: [{type: ObjectId, ref: 'Visit'}],
	sales: [{
		apartment_id: {type: ObjectId, ref: 'Apartment'},
		price: Number,
		commission: Number,
		date_leased: Date
	}]
});

mongoose.model('Broker', BrokerSchema);