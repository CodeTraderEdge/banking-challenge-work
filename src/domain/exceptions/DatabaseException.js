const { HttpException }  = require('./HttpException.js')

// Exception for 400 Bad Request
class DatabaseException extends HttpException {
    constructor(message = 'Internal Server Errorrrr') {
        super(message, 500)
    }
}

module.exports = { DatabaseException }