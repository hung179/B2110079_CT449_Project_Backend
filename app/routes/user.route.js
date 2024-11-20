const express = require('express');
const UserAuthentication = require('../controllers/UserAuthentication.controller');
const LibraryOperations = require('../controllers/LibraryOperations.controller');
const BookManagement = require('../controllers/BookManagement.controller');

const router = express.Router();

router.route('/')
    .get(BookManagement.getAllBook)
router.route('/history/:id')
    .get(LibraryOperations.ViewHistory)
router.route('/search/:id')
    .get(BookManagement.findBook)
router.route('/borrowBook')
    .post(LibraryOperations.BorrowBook)
router.route('/returnBook')
    .put(LibraryOperations.ReturnBook)
router.route('/extendLoan')
    .put(LibraryOperations.ExtendLoan)
module.exports = router;
