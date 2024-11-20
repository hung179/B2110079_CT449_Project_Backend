const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authorize = () => {
    return (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) return res.status(403).send('Access denied');
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY, { expiresIn: '1d' });
            if (!roles.includes(decoded.role)) {
                return res.status(403).send('You do not have permission to perform this action');
            }
            req.user = decoded;
            next();
        } catch (err) {
            res.status(401).send('Invalid token');
        }
    }
}