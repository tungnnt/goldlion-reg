const HttpsProxyAgent = require('https-proxy-agent')

module.exports = (host, port) => {
    const _isValidString = string => typeof string === 'string' && string.length > 0

    if (_isValidString(host) && _isValidString(port)) {
        return new HttpsProxyAgent(`http://${host}:${port}`)
    }

    return null
}