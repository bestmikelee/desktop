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

	for(var key in lxdCalendar){
		console.log(key)
		for(var key2 in lxdCalendar.key){
			console.log(lxdCalendar.key.key2)
		}
	}

}])