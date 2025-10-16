import bcrypt from 'bcrypt';

const seed = async (db) => {
    await db.query(`
DROP TABLE IF EXISTS tasks;
    `);

    await db.query(`
DROP TABLE IF EXISTS users;
    `);

    await db.query(`
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    admin BOOLEAN DEFAULT false
);
    `);

    await db.query(`
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    complete BOOLEAN DEFAULT false,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL 
);
    `);

    const hashedPassword = await bcrypt.hash('password123', 3);

    const { rows } = await db.query(`
INSERT INTO users (
    username,
    password,
    admin
) VALUES (
    $1,
    $2,
    $3
) RETURNING id;
    `, ['eliotpszw', hashedPassword, true]);

    await db.query(`
INSERT INTO tasks (
    title,
    description,
    user_id
) VALUES (
    $1,
    $2,
    $3
);
    `, [
        'Monday Lecture',
        'The first lecture on SQL Schemas, bogged down endlessly by Eliots computer problems.',
        rows[0].id,
    ]);
};

export default seed;
