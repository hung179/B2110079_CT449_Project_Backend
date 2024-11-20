const mongoose = require('mongoose');
const { Schema } = mongoose;
const { borrowListDB } = require('../../utils/CreateConnect.js');

const borrowList = new Schema({
    user_id: {
        type: String,
        required: true
    },
    book_id: {
        type: String,
        required: true
    },
    turn: {
        type: Number,
        required: true,
        default: 0
    },
    borrow_date: {
        type: Date,
        default: Date.now
    },
    return_date: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['Borrowed', 'Returned'],
        default: 'Borrowed'
    }
})

borrowList.pre('save', function (next) {
    if (!this.return_date && this.borrow_date) {
        const returnDate = new Date(this.borrow_date);
        returnDate.setDate(returnDate.getDate() + 7);
        this.return_date = returnDate;
    }
    next();
});

module.exports = borrowListDB.model('BorrowList', borrowList);