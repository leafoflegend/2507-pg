import chalk from 'chalk';
import { config } from 'dotenv';
import { startDB } from './db/db.js';
import { startRedis } from './redis/redis.js';
import app from './server/server.js';

config();

const PORT = process.env.PORT || 2500;

const startServer = async () => {
    await startDB(true);
    await startRedis();

    app.listen(PORT, () => {
        console.log(chalk.green(`Server is now listening on PORT:${PORT}`));
    });
};

startServer();
