const puppeteer = require('puppeteer')
const smsCode = require('./api/sms-code')
const { randomPhone } = require('./helper/random')
const iPhone6 = puppeteer.devices['iPhone 6']

const REGISTER_URL = 'https://goldlion.tv/index/login/register.html'
const LOGIN_URL = 'https://goldlion.tv/index/login/index.html'
const ADD_BANK_URL = 'https://goldlion.tv/index/user/add_payment.html'
const PHONE_INPUT = '#mobile'
const PHONE_LOGIN_INPUT = 'body > div > div > div.weui-cells.weui-cells_form > div:nth-child(1) > div.weui-cell__bd > input'
const INVITE_INPUT = '#invite'
const PASSWORD_INPUT = 'body > div > div > div.weui-cells.weui-cells_form > div:nth-child(4) > div.weui-cell__bd > input'
const RE_PASSWORD_INPUT = 'body > div > div > div.weui-cells.weui-cells_form > div:nth-child(5) > div.weui-cell__bd > input'
const LOGIN_PASSWORD_INPUT = 'body > div > div > div.weui-cells.weui-cells_form > div:nth-child(2) > div.weui-cell__bd > input'
const TRANSACTION_PASSWORD_INPUT = '#passwordtow'
const OTP_INPUT = 'body > div > div > div.weui-cells.weui-cells_form > div:nth-child(2) > div > input'
const REGISTER_BUTTON = '#but'
const LOGIN_BUTTON = 'body > div > div > div:nth-child(6) > div'
const ACCEPT_NOTI_BUTTON = '#layui-m-layer0 > div.layui-m-layermain > div > div > div.layui-m-layerbtn > span'

const _type = async (puppeteerObject, selector, content) => {
    await puppeteerObject.focus(selector)

    await puppeteerObject.keyboard.type(content)
}

const _click = async (puppeteerObject, selector) => {
    await puppeteerObject.click(selector)
}

const _delay = async ms => {
    await new Promise(resolve => setTimeout(resolve, ms))
}

const _parseOtp = string => string.match(/[0-9]{4}/gmi)[0]

const _parseCookieHeader = cookies => cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')

const _isValidString = string => typeof string === 'string' && string.length > 0

require('./helper/create-folder')('data')

setImmediate(async () => {
    let count = 0

    while (count <= 20) {
        try {
            const browser = await puppeteer.launch({
                headless: false,
                args: ['--no-sandbox', '--disable-setuid-sandbox', 'headless'],
                executablePath: '/usr/bin/google-chrome',
                slowMo: 150
            })

            const page = await browser.newPage()

            await page.emulate(iPhone6)

            await page.goto(REGISTER_URL)

            const phone = randomPhone()

            await _type(page, PHONE_INPUT, phone)

            await _type(page, INVITE_INPUT, '49706766')

            await _type(page, PASSWORD_INPUT, 'Pa55w0rds')

            await _type(page, RE_PASSWORD_INPUT, 'Pa55w0rds')

            await _type(page, TRANSACTION_PASSWORD_INPUT, '3009')

            let response = await smsCode(phone)

            const { msg } = response

            await _type(page, OTP_INPUT, _parseOtp(msg))

            await _click(page, REGISTER_BUTTON)

            await _delay(3000)

            await page.goto(LOGIN_URL)

            await _type(page, PHONE_LOGIN_INPUT, phone)

            await _type(page, LOGIN_PASSWORD_INPUT, 'Pa55w0rds')

            await _click(page, LOGIN_BUTTON)

            await _delay(3000)

            await _click(page, ACCEPT_NOTI_BUTTON)

            await _delay(3000)

            await page.goto(ADD_BANK_URL)

            const cookies = await page.cookies()

            const cookieHeader = _parseCookieHeader(cookies)

            console.log({ phone, cookieHeader })

            if (_isValidString(phone) && _isValidString(cookieHeader)) {
                count++

                require('fs').appendFileSync('./data/accounts.txt', `${phone}|${cookieHeader}\n`, () => { })
            }

            await browser.close()
        } catch (error) {
            console.log(error)
        }
    }
})
