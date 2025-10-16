import { Client } from 'pg';
import chalk from 'chalk';
import { config } from 'dotenv';
import seed from './seed.js';

config();

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://eliot@localhost:5432/2507_pg_test';

const db = new Client(DATABASE_URL);

export const startDB = async (forceSeed = false) => {
    console.log(chalk.yellow(`Attempting to connect to DB @ ${DATABASE_URL}`));

    await db.connect();

    if (forceSeed) {
        console.log(chalk.yellow(`Force Seed option enabled, beginning creation/deletion/insertion of and to tables...`));
        await seed(db);
        console.log(chalk.green(`Seeding complete.`));
    }

    console.log(chalk.green(`Database connection successful.`));
};

export default db;