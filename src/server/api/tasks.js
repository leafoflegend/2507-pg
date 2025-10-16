import { Router } from 'express';
import taskModel from '../../db/models/tasks.js';

const tasksRouter = Router();

tasksRouter.get('/', async (req, res, next) => {
    const tasks = await taskModel.getAllTasks();

    res.send({
        tasks,
    });
});

export default tasksRouter;
