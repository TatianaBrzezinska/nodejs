class Logger {
    log(user) {
        // some logger service / module
    }
}
const logger = new Logger();
const userList = [null, undefined, 'john@gmail.com', ''];

for (const user of userList) {
    user ? console.log(`User email: ${user}`) : logger.log(user)
}
