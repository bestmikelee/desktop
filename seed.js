/////////////// utility functions
var chance = require('chance')();
var _ = require('underscore');
var bluebird = require('bluebird')
var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//////////require in db

var db = require('./server/db');
db.then(function(err){
    if (err)
        console.log('database message says = ',err)
})
/////////////// require models
var Building = mongoose.model('Building');
var Apartment = mongoose.model('Apartment');
var Tenant = mongoose.model('Tenant');
var Landlord = mongoose.model('Landlord');
var User = mongoose.model('User');
var Broker = mongoose.model('Broker');
var Brokerage = mongoose.model('Brokerage');
var Visit = mongoose.model('Visit');
var Lease = mongoose.model('Lease');

//////////connect to the database



//////////////// utility variables for the entire seeded database /////////////////////////

var numOfSeededLandlords = 1



/////////////////////////////////// TENANT SEED UTILITIES AND FUNCTION

function tenantSeed(aptId, buildingId) {
    return new Tenant({
        apt_id: aptId,
        building_id: buildingId,
        user_id: null,
    })
}


/////////////// ALL UTILITIES FOR APARTMENTS
var arryOfNumApt = [4, 8, 16];
var arryOfHeat = ["Oil #6", "Oil #4", "Natural Gas"];
var arryOfRent = [1500, 1600, 1700, 1800, 1900, 2000, 2500, 3000, 3500, 4000];
var arryOfSquareFootage = [750, 1000, 1250];
var arryOfAptLetters = ["L", "R"];
var leaseExpireYear = [2015, 2016];

function leaseExpireGen() {
    var year = chance.pick(leaseExpireYear).toString();
    if (year === "2015") {
        min = 9
    } else {
        min = 1
    }
    var month = chance.integer({
        min: min,
        max: 11
    }).toString();
    return month + "/1/" + year
};

var apartmentSeed = function(tenantId, buildingId, counter) {
    return new Apartment({
        unit_number: counter + chance.pick(arryOfAptLetters),
        tenant_ids: [],
        building_id: buildingId,
        bedroom_count: chance.integer({
            min: 1,
            max: 3
        }),
        bathroom_count: chance.integer({
            min: 1,
            max: 3
        }),
        total_room_count: 33, //this is filler number - not an actual number
        sq_ft: chance.pick(arryOfSquareFootage),
        lease_ids: [],
        brokers: [],
        brokerages: []
    });
};
/////////////////////////////////////// Building Utilities /////////////////////////////////////////
var buildingSeed = function(llId) {
    return new Building({
        street_number: chance.integer({
            min: 100,
            max: 400
        }),
        street_name: chance.street(),
        city: chance.pick(['New York', 'Brooklyn', 'Queens', 'Bronx']),
        state: 'New York',
        apartments: [],
        landlord_id: llId,
        heat_type: chance.pick(arryOfHeat),
        elevator: chance.bool(),
        doorman: chance.bool(),
        gym: chance.bool(),
        pool: chance.bool(),
        parking: chance.bool(),
        common_roof: chance.bool(),
        laundry: chance.bool(),
        pets_allowed: chance.bool()
    });
}

var LLSeed = function(userId) {
    return new Landlord({
        user_id: userId,
        company: chance.word() + " LL",
        address: chance.street(),
        city: chance.city(),
        state: chance.state(),
        gender: chance.gender(),
        building_ids: []
    })
}

var userSeed = function(config) {
    return new User({
        lockitronId: chance.string({length:10}),
        userType: config.types,
        userTypeIds: config.typeIds,
        firstName: chance.name().split(' ')[0],
        lastName: chance.name().split(' ')[1],
        photo: null,
        phone: chance.phone(),
        email: chance.email()
    })
}

var brokerSeed = function(config) {
    //no sales yet.. will instead have routes create sales
    //need brokerage & visits
    return new Broker({
        license_ID: chance.word({length: 20}),
        brokerage_id: config.brokerage_id,
        user_id: null,
        showings: [],
        sales: []
    })
}

var brokerageSeed = function(config){
    //return 1 or 2 owners for each Brokerage
    //need users and buildings
    return new Brokerage({
        name: chance.name() + ', LLC',
        owner_id: config.user_ids,
        address: chance.address(),
        city: chance.city(),
        state: chance.state(),
        buildings: config.building_ids,
        brokers: []
    });
};

var visitSeed = function(config){
    //need apt, tenant and broker
    return new Visit({
        apartment_id: config.apartment_id,
        tenant_id: config.tenant_id,
        broker_id: config.broker_id,
        date: chance.date()
    });
};
var leaseSeed = function(config){
    var leaseStart = moment(chance.date({
        month: chance.integer({min: 8, max: 11}),
        year: chance.integer({min: 2014, max: 2015})
    }));
    var leaseEnd = leaseStart.clone().add(12, 'months');
    var now = moment(),
        status;
    if (leaseEnd.diff(now, 'days') > 75)
        status = 'inactive';
    else
        status = chance.pick(['renewed','pending','declined']);

    return new Lease({
        pdf: chance.word(),
        rent: chance.integer({min: 1000, max: 5000}),
        renewal_status: status,
        end_date: leaseEnd,
        start_date: leaseStart,
        tenant_ids: config.tenantIds,
        apartment_id: config.apt_id,
        landlord_id: config.landlord_id,
        broker_id: config.broker_id
    });
};



var seedOneLandLord = function() {

        var landlord = LLSeed();
        var buildings = [];
        var apartments = [];
        var tenants = [];
        var users = [];
        var brokers = [];
        var brokerages = [];
        var visits = [];
        var leases = [];

        var saveModel = function(el){
            el.save(function(err){
                if(err) throw err;
            })
        }

        var randNumOfBuildings = chance.integer({
            min: 3,
            max: 20
        });

        for (var i = 0; i < randNumOfBuildings; i++) {
            buildings.push(buildingSeed(landlord._id))
        }


        buildings.forEach(function(blding) {
            var randNumOfApartments = chance.integer({
                min: 4,
                max: 60
            })
            for (var i = 0; i < randNumOfApartments; i++) {
                apartments.push(apartmentSeed(null, blding._id, i))
            }
        })

        apartments.forEach(function(apartment) {
            var currentTenant;
            var currentUser;
            var randNumOfTenants = chance.integer({
                min: 1,
                max: 4
            })
            for (var i = 0; i < randNumOfTenants; i++) {
                currentTenant = tenantSeed(apartment._id, apartment.building_id);
                currentUser = userSeed({
                    types: ['Tenant'],
                    typeIds: {
                        tenant: currentTenant._id,
                        landlord: null,
                        broker: null
                    }
                })
                currentTenant.user_id = currentUser._id;
                users.push(currentUser)
                tenants.push(currentTenant);
            }
        })

        //tenants.forEach(saveModel(tenant))

        apartments.forEach(function(apartment) {
            tenants.forEach(function(tenant) {
                if (tenant.apt_id === apartment._id) {
                    apartment.tenant_ids.push(tenant._id)
                }
            })

        })

        buildings.forEach(function(blding) {
            apartments.forEach(function(apartment) {
                if (apartment.building_id === blding._id) {
                    blding.apartments.push(apartment._id)
                }
            })
        })

        buildings.forEach(function(building){
            landlord.building_ids.push(building._id)
        })

        //console.log(landlord.building_ids)



        var randomNumberOfBrokerages = chance.integer({
            min: 1,
            max: 3
        })

        for (var i = 1; i <= randomNumberOfBrokerages; i++){
            var config = {
                user_ids: [chance.pick(users)._id],
                building_ids: [chance.pick(buildings)._id]
            }
            brokerages.push(brokerageSeed(config))
        }

        for (var i = 0; i < 20; i ++){
            var config = {
                brokerage_id: chance.pick(brokerages)._id
            }
            var broker = brokerSeed(config)
            var chanceUser = chance.pick(users)
            var chanceBrokerage = chance.pick(brokerages)
            chanceUser.userTypeIds.broker = broker._id;
            chanceUser.userType.push('Broker');
            chanceBrokerage.brokers.push(broker._id)
            broker.user_id = chanceUser._id;
            brokers.push(broker);
        }


        apartments.forEach(function(apt){
            var tempLeaseIds = [];

            for (var i = 0; i < chance.integer({min: 1, max: 3}); i++){
                var chanceBroker = chance.integer({ min: 0, max: brokers.length-1 })
                apt.brokers = _.union(apt.brokers, [brokers[chanceBroker]._id]);
                apt.brokerages = _.union(apt.brokerages, [brokers[chanceBroker].brokerage_id])
                var config = {
                    broker_id: brokers[chanceBroker]._id,
                    tenant_id: chance.pick(tenants)._id,
                    apartment_id: chance.pick(apartments)._id
                }
                var visit = visitSeed(config)
                brokers[chanceBroker].showings.push(visit._id);
                visits.push(visit)
            }
            var leaseConfig = {
                    tenant_ids: [chance.pick(tenants)._id, chance.pick(tenants)._id],
                    apartment_id: apt._id,
                    landlord_id: landlord.user_id,
                    broker_id: brokers[chanceBroker]._id
                }
                var lease = leaseSeed(leaseConfig)
                lease.save(function(err){
                    if(err) throw err;
                })
                apt.lease_ids = [lease._id]
                apt.save(function(err){if(err) throw err})
        })

        //console.log(apartments)
        var chanceLL = chance.pick(users)
        landlord.user_id = chanceLL._id;
        chanceLL.userTypeIds.landlord = landlord._id;
        chanceLL.userType.push("Landlord");
        landlord.save(function(err){
            if (err)
                console.log("LANDLORD", err)
        })
        buildings.forEach(saveModel.bind(this))
        //apartments.forEach(saveModel.bind(this))
        tenants.forEach(saveModel.bind(this))
        users.forEach(saveModel.bind(this))
        brokerages.forEach(saveModel.bind(this))
        brokers.forEach(saveModel.bind(this))
        //leases.forEach(saveModel.bind(this))

        visits.forEach(saveModel.bind(this))
        //console.log(_.flatten(lease_ids))

        console.log('done')
    }

        var wipeDB = function() {

            Landlord.find({}).remove().exec();
            Building.find({}).remove().exec();
            Apartment.find({}).remove().exec();
            Tenant.find({}).remove().exec();
            Brokerage.find({}).remove().exec();
            Broker.find({}).remove().exec();
            Visit.find({}).remove().exec();
            User.find({email: {$ne: 'mike.sj.lee@gmail.com'}}).remove().exec();
            Lease.find({}).remove().exec();
        }

        wipeDB();


        var seedDatabase = function() {
            for (var i = 0; i < numOfSeededLandlords; i++) {
                seedOneLandLord();
            }
            return;
        }

        seedDatabase();
