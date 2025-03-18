const parseJsonBody = (req) => new Promise((resolve, reject) => {
    let body = ''

    req.on('data', chunk => {
        body += chunk.toString()
    })

    req.on('end', () => {
        try {
            resolve(body ? JSON.parse(body) : {})
        } catch (error) {
            reject(new Error('Invalid JSON'))
        }
    })

    req.on('error', reject)
})

module.exports = { parseJsonBody }