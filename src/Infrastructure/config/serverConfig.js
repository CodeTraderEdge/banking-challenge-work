const { loadEnvFile, env }  = require('node:process')

// Load environment variables from .env file
loadEnvFile()

const serverConfig = {
  port: env.PORT || 3000,
  cors: {
    origin: env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
}

module.exports = { serverConfig }