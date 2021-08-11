const puppeteer = require('puppeteer')
const fs = require('fs')
module.exports = async () => {
  const browser = await puppeteer.launch(
    {
      headless: false,
      ignoreDefaultArgs: ['--enable-automation', '--enable-blink-features=IdleDetection'],
      ignoreHTTPSErrors: true,
      executablePath: process.platform === 'darwin'
        ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        : process.platform === 'linux'
          ? 'google-chrome'
          : fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
            ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
            : 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      args: [
        '--no-sandbox',
        '--lang=en-US,en',
        '--start-maximized',
        '--disable-infobars',
        '--lang=en-US,en;q=0.9',
        '--disable-web-security',
        '--disable-notifications',
        '--window-position = 0,0',
        '--disable-setuid-sandbox',
        '--ignore-certificate-errors',
        '--no-default-puppeteer-check',
        '--disable-background-networking',
        ' --ignore-certificate-errors-skip-list ',
        '--disable-features=IsolateOrigins,site-per-process',
        '--flag-switches-begin --disable-site-isolation-trials --flag-switches-end'
      ]
    }
  )
  const page = await browser.newPage()

  return { browser, page }
}
