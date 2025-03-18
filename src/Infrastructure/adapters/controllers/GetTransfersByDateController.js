const { GetTransfersByDateService }  = require('../../../Application/services/GetTransfersByDateService.js')

class GetTransfersByDateController {
    constructor() {}

    async handle(req, res) {        
        try {
            const { startDate, endDate } = req.query

            if (!startDate || !endDate) {
                return res.status(400).json({ error: 'Missing required parameters: startDate and endDate' })
            }

            const getTransfersByDateService = new GetTransfersByDateService()
            const companies = await getTransfersByDateService.findByDate(startDate, endDate)

            return res.json(companies.map(company => (company.toPrimitives())))
        } catch (error) {
            return res.status(error.statusCode).json({ error: error.message })
        }
    }
}

module.exports = { GetTransfersByDateController }