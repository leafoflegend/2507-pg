import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { getRedis } from '../../redis/redis.js';
import userModel from '../../db/models/users.js';

config();

const authenticationMiddleware = async (req, res, next) => {
    console.time('User Auth Middleware');
    const authHeader = req.get('Authorization');

    if (authHeader) {
        let maybeToken = authHeader.split(' ')[1];

        const decodedToken = jwt.verify(maybeToken, process.env.JWT_SECRET);

        if (decodedToken) {
            const redis = getRedis();
            let userExists = false;
            const redisUserExists = await redis.get(decodedToken.username);

            if (!redisUserExists) {
                userExists = await userModel.confirmUserExists(decodedToken.username);

                if (userExists) {
                    await redis.set(decodedToken.username, 'true', {
                        // NOTE: 60 Seconds * 5 Minutes
                        EX: 60 * 5,
                    });
                }
            } else {
                userExists = true;
            }

            if (userExists) {
                req.user = decodedToken;
            }
        }
    }

    next();
    console.timeEnd('User Auth Middleware');
};

export default authenticationMiddleware;
