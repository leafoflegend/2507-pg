import db from '../db.js';

class TaskModel {
    constructor(db) {
        this.db = db;
    }

    getAllTasks = async () => {
        const { rows } = await this.db.query(`SELECT tasks.complete, tasks.title, tasks.description, users.username AS task_owner FROM tasks JOIN users ON tasks.user_id = users.id;`);

        return rows;
    }
}

const taskModel = new TaskModel(db);

export default taskModel;
