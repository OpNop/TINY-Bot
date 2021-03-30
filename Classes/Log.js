const colors = require('colors');

formatMessage = (type, message) => {
    return `[${type.toUpperCase()}](${new Date(Date.now()).toLocaleTimeString([], { hour12: false, timeZone: 'America/Phoenix', timeZoneName: 'short' })}) - ${message}`;
}

module.exports = {
    Log(message) {
        console.log(formatMessage('info', message).white);
    },
    Warn(message) {
        console.log(formatMessage('warn', message).yellow);
    },
    Error(message) {
        console.log(formatMessage('error', message).red);
    },
    Debug(message) {
        console.log(formatMessage('debug', message).green);
    }
}