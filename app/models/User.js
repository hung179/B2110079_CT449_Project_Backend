const mongoose = require('mongoose');
const { Schema } = mongoose;
const { userDB } = require('../../utils/CreateConnect.js');
const bcrypt = require('bcrypt');

const User = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: 6,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: 'https://icon-library.com/images/default-user-icon/default-user-icon-18.jpg'
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

User.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        // Mã hóa mật khẩu
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = userDB.model('User', User);