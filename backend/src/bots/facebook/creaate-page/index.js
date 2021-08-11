const puppeteerConfig = require('../../../services/puppeteer')
const { login } = require('../login')
const { logout } = require('../logout')

const data = {
  user: {
    email: 'gestion.bots@outlook.com',
    pass: 'asdasdasd.asd'
  },
  page: {
    name: 'Mely Spa',
    category: 'Salud',
    description: 'Descripcion',
    link: 'https://www.facebook.com/Dsads-102439322109947'
  }
}

const deletePage = async (data2) => {
  const { browser, page } = await puppeteerConfig()

  try {
    await login(page, data)
    await page.waitForXPath('//*[contains(text(),"Te damos la bienvenida a Facebook")]')
    await page.goto(data.page.link)
    const [configButon] = await page.$x('//*[contains(text(),"Configuración")]')
    await configButon.click()

    await page.waitForSelector('iframe')
    const elementHandle = await page.$('iframe')
    const frame = await elementHandle.contentFrame()
    await frame.waitForXPath('//*[contains(text(),"Elimina tu página")]')
    const [deleteButon] = await frame.$x('//h3[contains(text(),"Eliminar página")]//parent::a')
    await deleteButon.click()
    await frame.waitForXPath('//*[contains(text(),"definitivamente")]')
    const [confirmDeleteButton] = await frame.$x('//a[contains(text(),"definitivamente")]')
    await confirmDeleteButton.click()
    await page.waitForTimeout(100000)
    await page.click('input[value="Eliminar"]')
    await page.waitForTimeout(10000)
  } catch (e) {
    await logout(page)
    await browser.close()
    console.log(e.stack, e.toString())
  }
}

const createPage = async (data2) => {
  const { browser, page } = await puppeteerConfig()

  try {
    await login(page, data)
    await page.waitForTimeout(2000)
    await page.waitForXPath('//*[contains(text(), "Páginas")]')
    const [link] = await page.$x('//*[contains(text(), "Páginas")]')
    await link.click()
    await page.waitForXPath('//*[contains(text(), "Crear nueva")]')
    const [createLink] = await page.$x('//*[contains(text(), "Crear nueva")]')
    await createLink.click()

    await page.waitForXPath('//*[contains(text(), "Nombre de la página (obligatorio)")]')

    const [inputName] = await page.$x('//*[contains(text(), "Nombre de la página (obligatorio)")]')
    await inputName.type(data.page.name)
    const [inputCategorie] = await page.$x('//*[@aria-label="Categoría (obligatorio)"]')
    await inputCategorie.type(data.page.category)
    await page.waitForXPath('//span[contains(text(), "' + data.page.category + '")]/parent::div/parent::div/parent::div/parent::div')
    const [option] = await page.$x('//span[contains(text(), "' + data.page.category + '")]/parent::div/parent::div/parent::div/parent::div')
    await option.click()
    await page.type('textarea', data.page.description)
    const [createButton] = await page.$x('//span[contains(text(), "Crear página")]')
    await createButton.click()
    await logout(page)
    await browser.close()
  } catch (e) {
    await logout(page)
    await browser.close()
    console.log(e.stack, e.toString())
  }
}


module.exports = { createPage }
