app.service('expiration', ['Session', function(Session){
        // grab all landlords' real estate
        var portfolio = Session.user.data.building_ids;

        // filter if building ID provided
        if (typeof buildingID === "string") {
            portfolio = portfolio.filter(function(building) {
                return building._id === buildingID;
            });
        }

        var today = new Date();
        //A day in milliseconds
        var oneDay = 86400000;

        function daysToExpiration(leaseExpiry){
        	return Math.floor(((new Date(leaseExpiry)) - today) / (oneDay))
        }

        this.expiration = function(){

	        var expirationList = {
	        	hundred:[],
	        	ninety:[],
	        	sixty:[],
	        	thirty:[],
	        	zero:[]
	        }

        	portfolio.forEach(function(building) {

            if (typeof building.apartments !== 'object') return console.log("No apartments provided for ", building.streetNumber, " ", building.streetName);

            building.apartments.forEach(function(apartment) {

            	var daysToExpire = apartment.lease_ids[0] ? daysToExpiration(apartment.lease_ids[0].end_date) : 0

            	console.log(daysToExpire)

                if (daysToExpire < 0) return expirationList.zero.push([apartment,building.street_number+" "+building.street_name])
                if (daysToExpire < 30) return expirationList.thirty.push([apartment,building.street_number+" "+building.street_name])
                if (daysToExpire < 60) return expirationList.sixty.push([apartment,building.street_number+" "+building.street_name])
                if (daysToExpire < 90) return expirationList.ninety.push([apartment,building.street_number+" "+building.street_name])
                if(daysToExpire < 100) return expirationList.hundred.push([apartment,building.street_number+" "+building.street_name])
			}
        )});
		return expirationList
		}
	
}])