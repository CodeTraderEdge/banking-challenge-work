import { ResponseHandler } from './ResponseHandler.js'

import { getQueryParams } from './queryParams.js'
import { parseJsonBody } from './parseJsonBody.js'

import { HealthCheckController } from '../adapters/controllers/HealthCheckController.js'
import { GetTransfersByDateController } from '../adapters/controllers/GetTransfersByDateController.js'
import { GetCompaniesByAdhesionController } from '../adapters/controllers/GetCompaniesByAdhesionController.js'
import { CreateCompanyAdhesionController } from '../adapters/controllers/CreateCompanyAdhesionController.js'

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: new HealthCheckController()
    },
    {
        method: 'GET',
        path: '/transfers',
        handler: new GetTransfersByDateController()
    },
    {
        method: 'GET',
        path: '/companies/adhesions-last-month',
        handler: new GetCompaniesByAdhesionController()
    },
    {
        method: 'POST',
        path: '/companies',
        handler: new CreateCompanyAdhesionController()
    }
]

export async function setupRoutes(req, res) {
    const { url, method } = req
    const response = new ResponseHandler(res)
    const query = getQueryParams(url)
    const path = url.split('?')[0]
    const route = routes.find(route => route.method === method && route.path === path)

    if (!route) {
        return response.status(404).json({ error: 'Not Found' })
    }

    try {
        req.body = await parseJsonBody(req)
    } catch (error) {
        return response.status(400).json({ error: 'Invalid JSON' })
    }
    
    route.handler.handle({ ...req, query, body: req.body }, response)
}