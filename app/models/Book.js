const mongoose = require('mongoose');
const { Schema } = mongoose;
const { bookDB } = require('../../utils/CreateConnect.js');
const publisher =  require('./Publisher.js');


const bookInfor = new Schema({
    idBook: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    bookName: {
        type: String,
        required: true,
        minlength: 1,
    },
    image:{
        type: String,
        minlength: 10,
        maxlength: 2000
    },
    author:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    remaining: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    publicationYear:{
        type: Number,
        required: true,
        min: 1900,
        max: 2100
    },
    publisher: {
        type: publisher.schema,
        required: true
    }
})

module.exports = bookDB.model('Book', bookInfor);