import chalk from 'chalk';
import bcrypt from 'bcrypt';
import db from '../db.js';

class UserModel {
    constructor(db) {
        this.db = db;
    }

    signupUser = async (username, password) => {
        if (typeof password !== 'string' || typeof username !== 'string') {
            throw new Error(`Username and password must be strings.`);
        }

        if (username.length < 3) {
            throw new Error(`Usernames must be at least 3 characters.`);
        }

        if (password.length < 8) {
            throw new Error(`Passwords must be at least 8 characters.`);
        }

        let hashedPassword = '';

        try {
            hashedPassword = await bcrypt.hash(password, 3);
        } catch (e) {
            console.log(chalk.yellow(`Failed to hash password.`));
            console.error(e);

            throw new Error(`Server error, cannot sign up user at this time.`);
        }

        try {
            const result = await this.db.query(`
                INSERT INTO users (username, password) VALUES ($1, $2) RETURNING username, id;
            `, [username, hashedPassword]);

            return result.rows[0];
        } catch (e) {
            console.log(chalk.yellow(`Signup failed when writing to DB.`));
            console.error(e);

            throw new Error(`Failed to sign up. Username is already taken.`);
        }
    }

    loginUser = async (username, password) => {
        const { rows } = await this.db.query(`
            SELECT * FROM users WHERE username=$1 LIMIT 1;
        `, [username]);

        const user = rows[0];

        if (!user) {
            throw new Error(`"${username}" not found.`);
        }

        const isSamePassword = await bcrypt.compare(password, user.password);

        if (!isSamePassword) {
            throw new Error(`Failed to login.`);
        }

        return {
            username: user.username,
            id: user.id,
            admin: user.admin,
        };
    }

    confirmUserExists = async (username) => {
        const { rows } = await this.db.query(`
            SELECT * FROM users WHERE username=$1 LIMIT 1;
        `, [username]);

        const user = rows[0];

        return !!user;
    }
}

const userModel = new UserModel(db);

export default userModel;
