const http  = require('http')

const { ResponseHandler }  = require('./Infrastructure/http/ResponseHandler.js')
const { setupRoutes }  = require('./Infrastructure/http/routes.js')

const { serverConfig }  = require('./Infrastructure/config/serverConfig.js')
const { port, cors } = serverConfig

const startServer = () => {
    const server = http.createServer((req, res) => {
        const response = new ResponseHandler(res)

        // Set CORS headers from configuration
        response.set('Access-Control-Allow-Origin', cors.origin)
        response.set('Access-Control-Allow-Methods', cors.methods.join(', '))
        response.set('Access-Control-Allow-Headers', cors.allowedHeaders.join(', '))

        // Handle preflight requests (CORS for OPTIONS method)
        if (req.method === 'OPTIONS') {
            return response.status(204).end()
        }

        // Delegate request handling to the router
        setupRoutes(req, res)
    })

    server.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
}

module.exports = { startServer }