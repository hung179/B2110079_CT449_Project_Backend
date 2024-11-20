const home = require('./home.route');
const admin = require('./admin.route');
const user = require('./user.route');

function route(app){
    app.use('/api', home);
    app.use('/api/admin', admin);
    app.use('/api/user', user)
}
module.exports = route;