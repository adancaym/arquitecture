const login = async (page, data) => {
  await page.setViewport({ width: 1366, height: 900 })
  await page.goto('https://facebook.com')
  await page.click('#email')
  await page.type('#email', data.user.email)
  await page.click('#pass')
  await page.type('#pass', data.user.pass)
  await page.keyboard.down('Enter')
}

module.exports = {
  login
}
