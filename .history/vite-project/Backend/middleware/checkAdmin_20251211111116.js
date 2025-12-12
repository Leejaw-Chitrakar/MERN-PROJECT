import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

const JWT_SECRET = 'your_jwt_secret'; // Use your actual secret

const checkAdmin = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: 'Please authenticate using a valid token' });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;

        const user = await User.findById(req.user.id).select('userType');
        if (!user || user.userType !== 'admin') {
            return res.status(403).send({ error: 'Access Forbidden: Not an Admin' });
        }
        next();
    } catch (err) {
        res.status(401).send({ error: 'Please authenticate using a valid token' });
        console.error('checkAdmin middleware error:', err);
    }
};

export default checkAdmin;