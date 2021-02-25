const ACCOUNT_FILE = '/root/Projects/top-like/data/accounts.txt'

module.exports = ip => {
    const lines = require('fs')
        .readFileSync(ACCOUNT_FILE)
        .toString()
        .split('\n')

    const currentUsedIPs = lines
        .map(line => {
            if (typeof line === 'string' && line.length > 0) {
                const [, , , ip] = line.split('|')

                return ip
            }
        })
        .filter(ip => { if (ip) { return ip } })

    console.log(`Total used IP: ${currentUsedIPs.length}`)

    return currentUsedIPs.includes(ip)
}