const { CompaniesRepository } = require('../../Infrastructure/repositories/CompaniesRepository.js')
const { Company } = require('../../domain/entities/Company.js')

class GetCompaniesByAdhesionService {
    constructor() {}

    async findAdhesionsLastMonth() {
        const companiesRepository = new CompaniesRepository()
        const companiesData = await companiesRepository.findAdhesionsLastMonth()
        const createEntities = companiesData.map(company => Company.fromPrimitives(company))
        return createEntities
    }
}

module.exports = { GetCompaniesByAdhesionService }