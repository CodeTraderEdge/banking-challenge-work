const { CompaniesRepository } = require('../../Infrastructure/repositories/CompaniesRepository.js')
const { Company } = require('../../domain/entities/Company.js')

class GetCompaniesByAdhesionService {
    constructor() {}

    async findAdhesionsLastMonth() {
        const companiesRepository = new CompaniesRepository()
        const companiesData = await companiesRepository.findAdhesionsLastMonth()
        return companiesData.map(company => Company.fromPrimitives(company))
    }
}

module.exports = { GetCompaniesByAdhesionService }