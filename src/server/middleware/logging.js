import chalk from 'chalk';

const loggingMiddleware = (req, res, next) => {
    console.log(`${req.user ? chalk.green(req.user.username) + ' ' : ''}${chalk.cyan(req.method)} ${chalk.magenta(req.originalUrl)}`);
    next();
};

export default loggingMiddleware;
