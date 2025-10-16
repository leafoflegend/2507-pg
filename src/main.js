import chalk from 'chalk';
import { config } from 'dotenv';
import { startDB } from './db/db.js';
import app from './server/server.js';

config();

const PORT = process.env.PORT || 2500;

const startServer = async () => {
    await startDB(true);

    app.listen(PORT, () => {
        console.log(chalk.green(`Server is now listening on PORT:${PORT}`));
    });
};

startServer();
