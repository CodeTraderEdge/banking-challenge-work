const { BadRequestException }  = require('../exceptions/BadRequestException.js')
const { UnprocessableEntityException }  = require('../exceptions/UnprocessableEntityException.js')

// Company entity representing a registered business
class Company {
    constructor(id, name, cuit, adhesionDate) {
        this.id = id
        this.name = name
        this.cuit = cuit
        this.adhesionDate = adhesionDate
    }

    // Create an entity from raw data with validation
    static fromPrimitives({ id, name, cuit, adhesionDate }) {
        if (!id || typeof id !== 'number' || id <= 0) {
            throw new BadRequestException('Invalid company ID')
        }
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            throw new BadRequestException('Invalid company name')
        }
        if (!Company.isValidCuit(cuit)) {
            throw new UnprocessableEntityException('Invalid CUIT format')
        }
        const date = new Date(adhesionDate)
        if (isNaN(date.getTime())) {
            throw new UnprocessableEntityException('Invalid adhesion date')
        }
    
        return new Company(id, name, cuit, date)
    }

    // Convert entity to a plain object
    toPrimitives() {
        return {
            id: this.id,
            name: this.name,
            cuit: this.cuit,
            adhesionDate: this.adhesionDate.toISOString()
        }
    }

    // Validate CUIT format (must be 11 digits)
    static isValidCuit(cuit) {
        return /^[0-9]{10,11}$/.test(cuit)
    }
    
}

module.exports = { Company }
