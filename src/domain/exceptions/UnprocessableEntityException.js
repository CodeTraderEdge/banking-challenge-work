const { HttpException }  = require('./HttpException.js')

class UnprocessableEntityException extends HttpException {
    constructor(message = 'Unprocessable Entity') {
        super(message, 422)
    }
}

module.exports = { UnprocessableEntityException }