import express from 'express';
import chalk from 'chalk';
import tasksRouter from './api/tasks.js';
import usersRouter from './api/users.js';
import loggingMiddleware from './middleware/logging.js';
import authenticationMiddleware from './middleware/authentication.js';

const app = express();

app.use(express.json());
app.use(authenticationMiddleware);
app.use(loggingMiddleware);
app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);

export default app;
