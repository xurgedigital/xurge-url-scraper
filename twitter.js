const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')


async function main(url, callback) {
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true });
    var [page] = await browser.pages();
    await page.goto(url, {waitUntil: 'networkidle0'});
    const text = await page.evaluate(() => {
        const text = document.querySelector('div[data-testid="tweetText"] span')
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