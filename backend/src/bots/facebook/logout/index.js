const logout = async (page, browser) => {
  await page.on('dialog', async dialog => {
    try {
      await dialog.accept()
    } catch (e) {}
  })
  await page.waitForXPath('//*[@aria-label="Cuenta"]')
  const [accountButton] = await page.$x('//*[@aria-label="Cuenta"]')
  await accountButton.click()
  await page.waitForTimeout(1000)
  await page.waitForXPath('//*[contains(text(), "Cerrar sesión")]')
  const [logoutButton] = await page.$x('//*[contains(text(), "Cerrar sesión")]')
  await logoutButton.click()
  await page.waitForTimeout(3000)
}

module.exports = { logout }
