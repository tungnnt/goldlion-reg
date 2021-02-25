const HttpsProxyAgent = require('https-proxy-agent');
const request = require('request');

const [apiKey] = process.argv.slice(2);

const tinsoftAPIKey = apiKey || 'TLGm61ZmgyagCRwpb1w4LkEcMgySY0ovNdUiQ6';

console.log({ tinsoftAPIKey })

const getCurrentIP = (host, port) => {
    let proxy = `http://${host}:${port}`;
    let agent = new HttpsProxyAgent(proxy);

    let headers = {
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-User': '?1',
        'Sec-Fetch-Dest': 'document',
        'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8'
    };

    let options = {
        agent: agent,
        url: 'http://api.ipify.org/',
        headers: headers
    };

    return new Promise(async (resolve, reject) => {
        await request(options, (err, res) => {
            if (err) return reject(err);
            if (res && res.body) resolve(res.body);
            else resolve({});
        });

    })

}

const getAPIKeyInfo = () => {
    let headers = {
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
        'Cookie': '__cfduid=d416230e1e67e06a9557ed71ae6b598c21594458783'
    };

    let options = {
        url: `http://proxy.tinsoftsv.com/api/getKeyInfo.php?key=${tinsoftAPIKey}`,
        headers: headers
    };

    return new Promise(async (resolve, reject) => {
        await request(options, (err, res) => {
            if (err) return reject(err);
            if (res && res.body) resolve(res.body);
            else resolve({});
        });

    })

}

const getNewProxy = () => {
    let headers = {
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
        'Cookie': '__cfduid=d416230e1e67e06a9557ed71ae6b598c21594458783'
    };

    let options = {
        url: `http://proxy.tinsoftsv.com/api/changeProxy.php?key=${tinsoftAPIKey}&location=0`,
        headers: headers
    };

    return new Promise(async (resolve, reject) => {
        await request(options, (err, res) => {
            if (err) return reject(err);
            if (res && res.body) resolve(
                JSON.parse(res.body)
            );
            else resolve({});
        });

    })
}

const checkCurrentProxy = () => {
    let headers = {
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
        'Cookie': '__cfduid=d416230e1e67e06a9557ed71ae6b598c21594458783'
    };

    let options = {
        url: `http://proxy.tinsoftsv.com/api/getProxy.php?key=${tinsoftAPIKey}`,
        headers: headers
    };

    return new Promise(async (resolve, reject) => {
        await request(options, (err, res) => {
            if (err) return reject(err);
            if (res && res.body) resolve(res.body);
            else resolve({});
        });

    })
}

module.exports = {
    getNewProxy,
    checkCurrentProxy,
    getAPIKeyInfo,
    getCurrentIP,
}
