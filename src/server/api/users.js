import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import usersModel from '../../db/models/users.js';

config();

const usersRouter = Router();

usersRouter.post('/signup', async (req, res, next) => {
    const { username, password } = req.body;

    const createdUser = await usersModel.signupUser(username, password);

    if (createdUser) {
        res.status(201).send({
            message: `${createdUser.username} was created.`,
        });
    }
});

usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    const user = await usersModel.loginUser(username, password);

    const loginJWT = jwt.sign(user, process.env.JWT_SECRET);

    res.send({
        message: `Logged in as "${username}" successfully.`,
        token: loginJWT,
    });
});

export default usersRouter;