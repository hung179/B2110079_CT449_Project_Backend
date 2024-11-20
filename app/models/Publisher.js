const mongoose = require('mongoose');
const {Schema} = mongoose
const {bookDB} = require('../../utils/CreateConnect')

const publisher = new Schema ({
    id: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = bookDB.model( 'Publisher', publisher)