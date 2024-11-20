const express = require('express');
const UserAuthentication = require('../controllers/UserAuthentication.controller');
const LibraryOperations = require('../controllers/LibraryOperations.controller');
const BookManagement = require('../controllers/BookManagement.controller');

const router = express.Router();

router.route('/')
    .get(BookManagement.getAllBook)
router.route('/register')
    .post(UserAuthentication.register)
router.route('/login')
    .post(UserAuthentication.login)
router.route('/books/:id')
    .get(BookManagement.findBook)
module.exports = router;