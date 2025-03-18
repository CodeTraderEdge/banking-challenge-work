class ResponseHandler {
    constructor(res) {
        this.res = res
        this.statusCode = 200
        this.headers = { 'Content-Type': 'application/json' }
        this.sent = false
    }

    status(code) {
        this.statusCode = code
        return this
    }

    set(header, value) {
        this.headers[header] = value
        return this
    }

    json(data) {
        if (this.sent) return
        this.res.writeHead(this.statusCode, this.headers)
        this.res.end(JSON.stringify(data ?? {})) // Fallback to empty object if data is undefined
        this.sent = true
    }

    send(data) {
        if (this.sent) return
        this.res.writeHead(this.statusCode, this.headers)
        this.res.end(typeof data === 'string' ? data : JSON.stringify(data ?? ''))
        this.sent = true
    }

    end() {
        if (this.sent) return
        this.res.writeHead(this.statusCode, this.headers)
        this.res.end()
        this.sent = true
    }

    redirect(url) {
        if (this.sent) return
        this.res.writeHead(302, { Location: url })
        this.res.end()
        this.sent = true
    }
}

module.exports = { ResponseHandler }