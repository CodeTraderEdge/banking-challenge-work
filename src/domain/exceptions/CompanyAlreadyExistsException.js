const { HttpException }  = require('./HttpException.js')

class CompanyAlreadyExistsException extends HttpException {
    constructor(cuit) {
        super(`Company with CUIT ${cuit} already exists`, 409) // 409 Conflict
    }
}

module.exports = { CompanyAlreadyExistsException }