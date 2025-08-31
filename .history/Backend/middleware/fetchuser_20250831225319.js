import jwt from "jsonwebtoken";
const JWT_SECRET = 'Harryisagoodb$oy';
import cors from 'cors';
const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        app.use(cors());
        next();
    } catch (error) {
        app.use(cors());
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

export default fetchuser;