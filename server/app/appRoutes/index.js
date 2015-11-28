var Router = require('express').Router();


// List API routes here
// Router.use('/members', require('./members'));
// Router.use('/forgot', require('./password'));
// Router.use('/campaigns', require('./campaigns'));
Router.use('/admin', require('./admin'));
// Router.use('/lockitron', require('./lockitron'));
Router.use('/invites', require('./invites'));
Router.use('/landlord', require('./landlordDashboard'));
Router.use('/broker', require('./broker'))
Router.use('/brokerage', require('./brokerage'))
Router.use('/tenant', require('./tenant'))
Router.use('/apartment', require('./apartment'))
Router.use('/building', require('./building'))
Router.use('/mandrill', require('./mandrill'))

// Make sure this is after all of
// the registered routes!
Router.use(function (req, res) {
    res.status(404).end();
});

module.exports = Router;
