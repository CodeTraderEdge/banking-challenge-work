class HttpException extends Error {
    constructor(message, statusCode) {
        super(message)
        this.name = this.constructor.name
        this.statusCode = statusCode
    }
}

module.exports = { HttpException }