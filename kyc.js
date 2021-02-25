const { access } = require('fs')
const addPayment = require('./api/add-payment')
const smsCode = require('./api/sms-code')
const ocr = require("./api/ocr")
const uploadImage = require("./api/upload-image")
const authentication = require('./api/authentication')
const { normalizeName } = require('./helper/random')
const getUserInput = require('./helper/get-user-input')

const _parseOtp = string => string.match(/[0-9]{4}/gmi)[0]

const _getAccounts = () => {
    const content = require('fs').readFileSync('./data/accounts.txt').toString()

    const lines = content
        .split('\n')
        .filter(line => {
            if (typeof line === 'string' && line.length > 0) {
                return line
            }
        })

    const accounts = lines
        .map(line => {
            const [phone, cookie] = line.split('|')

            return { phone, cookie }
        })

    return accounts
}

setImmediate(async () => {
    const accounts = _getAccounts()

    for (let i = 0; i <= accounts.length; i++) {
        console.log(`${i + 1}/${accounts.length}`)

        const { phone, cookie } = accounts[i]

        if (phone && cookie) {
            const image = await getUserInput()
            
            let response = await ocr(image)

            const [info] = response.data

            const { name, id } = info

            const namePayload = normalizeName(name.toLowerCase(), '+', false).toUpperCase().trim()

            console.log({ name, namePayload, id })

            response = await smsCode(phone, cookie)

            const { msg } = response

            const otp = _parseOtp(msg)

            response = await addPayment(cookie, phone, otp, name)

            console.log(response)

            response = await uploadImage(cookie, image)

            const uploadedImage = response.data

            console.log({ uploadedImage })

            response = await authentication(cookie, namePayload, id, uploadedImage)

            console.log(response)
        }
    }

})