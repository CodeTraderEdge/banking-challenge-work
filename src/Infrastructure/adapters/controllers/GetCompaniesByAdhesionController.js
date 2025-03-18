const { GetCompaniesByAdhesionService }  = require('../../../Application/services/GetCompaniesByAdhesionService.js')

class GetCompaniesByAdhesionController {
    constructor() {}

    async handle(req, res) {
        try {
            const getCompaniesService = new GetCompaniesByAdhesionService()
            const companies = await getCompaniesService.findAdhesionsLastMonth()
            
            return res.json(companies)
        } catch (error) {
            return res.status(error.statusCode).json({ error: error.message })
        }
    }
}

module.exports = { GetCompaniesByAdhesionController }