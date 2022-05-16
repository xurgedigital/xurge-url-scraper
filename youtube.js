const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))


async function main(url, callback) {
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({ headless: false, ignoreHTTPSErrors: true });
    var [page] = await browser.pages();
    await page.goto(url, {waitUntil: 'networkidle0'});
    await delay(5000)
    const data = await page.evaluate(() => {
        const text = document.querySelector('span[class="style-scope yt-formatted-string"]')
        return text.innerHTML.trim()
    })
    await browser.close()
    const finalData = {
        "contents": data,
        "character_count": Number(String(data).length)
    }
    return callback(finalData)
}


module.exports = {
    main: main
}