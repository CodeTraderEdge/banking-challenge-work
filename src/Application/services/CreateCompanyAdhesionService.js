const { CompaniesRepository } = require('../../Infrastructure/repositories/CompaniesRepository.js')
const { Company } = require('../../domain/entities/Company.js')
const { CompanyAlreadyExistsException }  = require('../../domain/exceptions/CompanyAlreadyExistsException.js')
const { UnprocessableEntityException } = require('../../../src/domain/exceptions/UnprocessableEntityException.js')

class CreateCompanyAdhesionService {
    constructor() {}

    async create({ name, cuit }) {
        if (!Company.isValidCuit(cuit)) {
            throw new UnprocessableEntityException('Invalid CUIT format')
        }

        const companiesRepository = new CompaniesRepository()
        const existingCompany = await companiesRepository.findByCuit(cuit)
        
        if (existingCompany) {
            throw new CompanyAlreadyExistsException(cuit)
        }

        return companiesRepository.addCompany({ name, cuit })
    }
}

module.exports = { CreateCompanyAdhesionService }