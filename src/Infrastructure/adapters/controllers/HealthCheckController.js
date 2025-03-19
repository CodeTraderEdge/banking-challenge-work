class HealthCheckController {
    async handle(req, res) {
        res.json({ status: 'ok' })
    }
}

module.exports = { HealthCheckController }