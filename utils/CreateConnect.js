const mongoose = require('mongoose');
const config = require('../app/config/config');

const userDB = mongoose.createConnection(config.dbUsers.uri);
const bookDB = mongoose.createConnection(config.dbBooks.uri);
const borrowListDB = mongoose.createConnection(config.dbBorrowList.uri);

module.exports = {userDB, bookDB, borrowListDB};
