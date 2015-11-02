app.service('RenewalStartPageService', ['$http','Session', function($http,Session){

	var buildings = Session.user.data.building_ids;
	var lxdCalendar = {};
	buildings.forEach(function(building){
		var address = building.street_number + " " + building.street_name 
		lxdCalendar[address] = {};
		building.apartments.forEach(function(apartment){
			var unit_numeber = apartment.unit_number
			lxdCalendar[address][apartment.unit_number] = {};
			lxdCalendar[address][apartment.unit_number]['lxd'] = apartment.lease_ids[0].end_date
			lxdCalendar[address][apartment.unit_number]['brokers']
		})
	})
	this.lxdCalendar = lxdCalendar

	var today = new Date();
	var oneDay = 86400000

	function dateOrganize(leftBound,rightBound,value){
		var lxd = new Date(value)
		var daysToExpiry = (lxd - today)/oneDay
		console.log('test',lxd)
		return value > leftBound && value < rightBound

	}

	var organizedLXD = {
		hundred:[],
		ninety:[],
		seventyFive: [],
		sixty:[]
	}

	for (var building in lxdCalendar){
		for (var apartment in lxdCalendar[building]){
			if (dateOrganize(0,105,lxdCalendar[building][apartment].lxd)) organizedLXD.hundred.push(lxdCalendar[building],lxdCalendar[building][apartment])
		}
	}


	this.organizedLXD = organizedLXD

}])