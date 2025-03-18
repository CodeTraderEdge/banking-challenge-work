class HealthCheckController {
    async handle(req, res) {
        console.log("ENTRO");
        res.json({ status: 'ok' })
    }
}

module.exports = { HealthCheckController }