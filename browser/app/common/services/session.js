var globalVar;

app.service('Session', function($rootScope, $interval, AUTH_EVENTS) {

    var self = this;
    $rootScope.$on(AUTH_EVENTS.notAuthenticated, function() {
        self.destroy();
    });
    var test = io.connect(location.host + '/');
    test.on('hi', function(data){
        console.log(data)
    })
    $rootScope.$on(AUTH_EVENTS.sessionTimeout, function() {
        console.log('Im happening');
        self.destroy();
    });

    this.id = null;
    this.user = null;

    this.create = function(sessionId, user, data, access_token) {

        this.id = sessionId;
        this.user = user;
        this.user.data = data;
        this.user.access_token = access_token;
        console.log(this.user);
    };

    this.destroy = function() {
        this.id = null;
        this.user = null;
    };

    this.getRenewalsData = function(buildingID) {
        // grab all landlords' real estate
        var portfolio = self.user.data.building_ids;

        // filter if building ID provided
        if (typeof buildingID === "string") {
            portfolio = portfolio.filter(function(building) {
                return building._id === buildingID;
            });
        }

        var renewalSchedule = {
            pieChart: [{
                color: 'all_set',
                description: 'Rented',
                value: 0,
                count: 0
            }, {
                color: 'has90',
                description: '90-60 days remaining',
                value: 0,
                count: 0
            }, {
                color: 'has60',
                description: '60-30 days remaining',
                value: 0,
                count: 0
            }, {
                color: 'has30',
                description: '30-1 days remaining',
                value: 0,
                count: 0
            }, {
                color: 'vacant',
                description: 'Vacant',
                value: 0,
                count: 0
            }],
            renewalStatuses: [{
                color: 'has90',
                description: 'Awaiting Response',
                value: 0,
                count: 0
            }, {
                color: 'vacant',
                description: 'Declined',
                value: 0,
                count: 0
            }]
        };

        var keysToIndices = {
            rented: 0,
            days90: 1,
            days60: 2,
            days30: 3,
            vacant: 4,
            pending: 0,
            declined: 1
        };


        var today = new Date();
        //A day in milliseconds
        var oneDay = 86400000;
        var totalApartments = 0;
        var totalRenewalSituation = 0;

        // function calcDaysToExpire(expiryDate) {
        //     return Math.floor(((new Date(expiryDate)) - today) / (oneDay));
        // }

        portfolio.forEach(function(building) {
            if (typeof building.apartments !== 'object') console.log("No apartments provided for ", building.streetNumber, " ", building.streetName);
            building.apartments.forEach(function(apartment) {
                //check that lease and lease end date is provided
                // if (apartment.lease_ids.length) {
                //     if (!apartment.lease_ids[0].end_date) console.log("Lease end date not provided", apartment);
                // } else console.log("Lease not provided", apartment);

                var daysToExpire = apartment.lease_ids.length? Math.floor(((new Date(apartment.lease_ids[0].end_date)) - today) / (oneDay)): 0;
                if (daysToExpire < 0) return renewalSchedule.pieChart[keysToIndices.vacant].count++;
                if (daysToExpire < 30) return renewalSchedule.pieChart[keysToIndices.days30].count++;
                if (daysToExpire < 60) return renewalSchedule.pieChart[keysToIndices.days60].count++;
                if (daysToExpire < 90) { //renewed declined pending
                    //console.log(apartment.lease_ids[0].renewal_status);
                    if(apartment.lease_ids[0].renewal_status==="declined")renewalSchedule.renewalStatuses[keysToIndices.declined].count++;
                    else renewalSchedule.renewalStatuses[keysToIndices.pending].count++;
                    totalRenewalSituation++;
                    return renewalSchedule.pieChart[keysToIndices.days90].count++;
                }
                else renewalSchedule.pieChart[keysToIndices.rented].count++;
            });
            totalApartments += building.apartments.length;
        });

        renewalSchedule.pieChart = renewalSchedule.pieChart.filter(function(val){
            val.value = totalApartments? Math.round(val.count/totalApartments * 100) : 0;
            return true;
        });

        renewalSchedule.renewalStatuses = renewalSchedule.renewalStatuses.filter(function(val){
            val.value = totalRenewalSituation? Math.round(val.count/totalRenewalSituation * 100) : 0;
            return true;
        });

        return renewalSchedule;

        // Sample output
        // return  {
        //          pieChart: [{
        //              color: 'all_set',
        //              description: 'Rented',
        //              value: 0.3
        //          }, {
        //              color: 'has90',
        //              description: '90-60 days remaining',
        //              value: 0.4
        //          }, {
        //              color: 'has60',
        //              description: '60-30 days remaining',
        //              value: 0.2
        //          }, {
        //              color: 'has30',
        //              description: '30-1 days remaining',
        //              value: 0.1
        //          }, {
        //              color: 'vacant',
        //              description: 'Vacant',
        //              value: 0.1
        //          }]
        //      };
    };
});
