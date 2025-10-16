import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const authenticationMiddleware = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (authHeader) {
        let maybeToken = authHeader.split(' ')[1];

        const decodedToken = jwt.verify(maybeToken, process.env.JWT_SECRET);

        req.user = decodedToken;
    }

    next();
};

export default authenticationMiddleware;
