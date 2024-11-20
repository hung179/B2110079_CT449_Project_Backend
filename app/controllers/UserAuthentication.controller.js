const Users = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

exports.register = async (req, res) => {

    if (!req.body.userId) {
        const randomUserId = crypto.randomBytes(4).toString('hex');
        req.body.userId = randomUserId.toLowerCase();
        console.log(req.body);
    }


    await Users.create(req.body)
        .then(user => res.status(200).json(user))
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
}

exports.getAllUsers = async (req, res) => {
    await Users.find()
       .then(users => res.json(users))
       .catch(err => { res.status(500).send({ message: err.message }); })
}

exports.login = async (req, res) => {
    await Users.findOne({ username: req.body.username })
        .then(async user => {
            // Không tìm thấy user
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }
            // Kiểm tra mật khẩu đã mã hóa
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
            // Nếu khớp
            if (!isPasswordValid) {
                return res.status(401).send({ message: 'Invalid password' });
            }
            // Nếu không khớp
            res.status(200).send({ message: 'Login successful', user: user });
        })
        .catch(err => { res.status(500).send({ message: err.message }); })
}
exports.findUser = async (req, res) => {
    await Users.findOne({ username: req.params.id })
        .then(user => {
            if (!user) return res.status(404).send({ message: 'User not found' });
            res.json(user)
        })
        .catch(err => { res.status(500).send({ message: err.message }); })
}
