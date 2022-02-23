// Working with time - Moment.js library
const moment = require('moment'); 

function formatMessage(username, text) {
    return {
        username, 
        text,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;