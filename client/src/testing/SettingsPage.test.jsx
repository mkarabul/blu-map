const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const axios = require('axios');
const testemail = "testianag211a5@example.com"
const password = "Testing132315"
const testUsername = 'testUser';
const userApiUrl = `http://localhost:5000/api/users/${testUsername}`;
describe('Settings Page Tests', () => {
  let driver;
  beforeEach(async () => {
    const chromeOptions = new chrome.Options();
    chromeOptions.headless = true;
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();
  });
  afterEach(async () => {
    if (driver) {
      await driver.quit();
    }
  });
  test('light mode dark mode', async () => {
    await driver.get('http://localhost:3000');
    await new Promise(resolve => setTimeout(resolve, 500));
    const loginButton = await driver.findElement(By.id("login"));
    await loginButton.click();
    await new Promise(resolve => setTimeout(resolve, 300));
    const emailInput = await driver.findElement(By.id("username"));
    await emailInput.sendKeys(testemail);
    const passwordInput = await driver.findElement(By.id("password"));
    await passwordInput.sendKeys(password);
    await new Promise(resolve => setTimeout(resolve, 300));

    const submitButton =  await driver.findElement(By.name("action"));
    await submitButton.click();

    await new Promise(resolve => setTimeout(resolve, 300));
    const currentUrl = await driver.getCurrentUrl();
    if (!currentUrl.includes('localhost')) {
        const acceptButton = await driver.findElement(By.xpath('//*[@value="accept"]'));
        await acceptButton.click();
        await driver.sleep(300);
    }

    expect(await driver.getCurrentUrl()).toContain('localhost');
    const dropdownButton = await driver.findElement(By.id('dropdown-button'));
    await dropdownButton.click();
    await new Promise(resolve => setTimeout(resolve, 300));

    const settings = await driver.findElement(By.id('settings-link'));
    await settings.click();
    await new Promise(resolve => setTimeout(resolve, 300));
    expect(await driver.getCurrentUrl()).toContain('settings');
    let theme = await driver.executeScript("return document.documentElement.getAttribute('data-theme');");
    const toggleThemeOption = await driver.wait(until.elementLocated(By.xpath("//h1[contains(text(), 'Toggle between Light and Dark mode')]/ancestor::div[contains(@class, 'block border p-2 rounded-lg shadow')]")), 10000);
    await toggleThemeOption.click();
    let newTheme = await driver.executeScript("return document.documentElement.getAttribute('data-theme');");
    if (theme == newTheme) {
        throw new Error("The theme did not change")
    }


    await driver.sleep(1000);

    await toggleThemeOption.click();
    newTheme = await driver.executeScript("return document.documentElement.getAttribute('data-theme');");
    if (theme != newTheme) {
        throw new Error("The theme did not change the second time")
    }

    await driver.sleep(1000);

  }, 999999);
  
});
