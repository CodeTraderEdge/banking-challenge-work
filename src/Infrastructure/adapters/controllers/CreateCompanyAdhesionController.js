const { CreateCompanyAdhesionService } = require('../../../Application/services/CreateCompanyAdhesionService.js')

class CreateCompanyAdhesionController {
    constructor() {}

    async handle(req, res) {
        try {
            const { name, cuit } = req.body
            
            if (!name || !cuit) {
                return res.status(400).json({ error: 'Missing required fields: name and cuit' })
            }

            const createCompanyAdhesionService = new CreateCompanyAdhesionService()
            await createCompanyAdhesionService.create({ name, cuit })

            return res.status(201).send()
        } catch (error) {
            return res.status(error.statusCode).json({ error: error.message })
        }
    }
}

module.exports = { CreateCompanyAdhesionController }