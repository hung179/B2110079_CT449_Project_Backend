const express = require('express');
const UserAuthentication = require('../controllers/UserAuthentication.controller');
const LibraryOperations = require('../controllers/LibraryOperations.controller');
const BookManagement = require('../controllers/BookManagement.controller');

const router = express.Router();

router.route('/')
    .post(BookManagement.addBooks)
router.route('/book/:id')
    .get(BookManagement.findBook)
    .put(BookManagement.updateBooks)
    .delete(BookManagement.deleteBooks)
router.route('/search')
    .get(BookManagement.findBook)
router.route('/users/history')
    .get(LibraryOperations.viewAllUserHistory)
router.route('/users/history/:id')
    .get(LibraryOperations.ViewHistory)
module.exports = router;