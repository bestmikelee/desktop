var mongoose = require('mongoose'),
    bluebird = require('bluebird'),
    Lease = mongoose.model('Lease'),
    AWS = require('aws-sdk'),
    dbHelper = require('../../appRoutes/dbHelper'),
    s3 = new AWS.S3(),
    LeaseHelper = dbHelper(Lease);

// promisify s3 + models
bluebird.promisifyAll(s3);
bluebird.promisifyAll(Lease);

module.exports = function(app) {


    app.use(function(req, res, next) {
        if(req.body && req.body.newLease) {

            var newLease = req.body.newLease;

            var awsPDF = {
                Bucket: app.getValue('env').AWS.bucketName,
                Key: Number(new Date()).toString() + '_' + newLease.name, //the shortId generates a unique string of characters each time
                Body: new Buffer(newLease.file, 'base64')
            };

            // link
            newLease.link = 'https://s3.amazonaws.com/' + awsPDF.Bucket + '/' + awsPDF.Key;

            var leaseObj = new Lease(LeaseHelper.newDoc(newLease));
            s3.putObjectAsync(awsPDF).then(function(data) {
                console.log("Successfully uploaded data to " + newLease.link);
                return Lease.createAsync(leaseObj);
            }).then(function(lease) {
                req.body.lease_ids = [lease._id]; //apartment update
                req.body.lease = lease;
                next();
            }).catch(function(err) {
                console.log(err);
            });
        } else {
          next();
        }
    });
};
