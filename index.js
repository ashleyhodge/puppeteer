const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function start() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto("https://finance.yahoo.com/crypto/")

  const tickers = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("#scr-res-table td")).map(x => x.textContent)
  })
  await fs.writeFile("ticker.txt", tickers.join("\r\n"))

  await browser.close()
}

start();