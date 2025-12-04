import { createClient } from 'redis';
import chalk from 'chalk';

let redis;

const getRedis = () => {
    return redis;
}

const startRedis = async () => {
    if (redis) {
        return redis;
    }
    console.log(chalk.cyan(`Connecting to Redis...`));

    redis = await createClient();
    redis.on('error', (err) => console.log('Redis Client Error', err));
    await redis.connect();

    const pong = await redis.ping();

    if (!pong) {
        console.log(chalk.red(`Failed to connect to Redis.`));
        throw new Error(`Failed to connect to Redis.`);
    }

    console.log(chalk.green(`Connected to Redis!`));
    return redis;
}

export { startRedis, getRedis };
