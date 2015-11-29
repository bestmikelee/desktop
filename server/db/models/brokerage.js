var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var BrokerageSchema = new mongoose.Schema({
	name:String,
	owner_id: [{type: ObjectId, ref: 'User'}],
	address: String,
	city: String,
	state: String,
	buildings:[{type: ObjectId, ref: 'Building'}],
	brokers:[{type: ObjectId, ref: 'Broker'}],
	landlords: [{type: ObjectId, ref: 'Landlord'}]
});

mongoose.model('Brokerage', BrokerageSchema);