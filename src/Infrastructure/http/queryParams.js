const getQueryParams = (url) => {
    const queryString = url.split('?')[1]
    if (!queryString) return {}
    return Object.fromEntries(new URLSearchParams(queryString))
}

module.exports = { getQueryParams }