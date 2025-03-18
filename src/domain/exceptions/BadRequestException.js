const { HttpException }  = require('./HttpException.js')

// Exception for 400 Bad Request
class BadRequestException extends HttpException {
    constructor(message = 'Bad Request') {
        super(message, 400)
    }
}

module.exports = { BadRequestException }