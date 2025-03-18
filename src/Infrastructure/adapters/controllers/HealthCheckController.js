class HealthCheckController {
    async handle(req, res) {
        res.status(200).json({ status: 'ok' })
    }
}

module.exports = { HealthCheckController }