const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const axios = require('axios');

const testUsername = 'auth0|65e16df785816c4a38ce3180';
const userApiUrl = `http://localhost:5000/api/admin-profile-trip/${testUsername}`;

const testemail = "testing@example.com";
const password = "Testing123";

describe('Social Page Tests', () => {
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


  test('Social Posts', async () => {
      await driver.get('http://localhost:3000');
      await driver.sleep(1000);

      const loginButton = await driver.findElement(By.id("login"));
      await loginButton.click();
      await driver.sleep(1000);

      const emailInput = await driver.findElement(By.id("username"));
      await emailInput.sendKeys(testemail);
      const passwordInput = await driver.findElement(By.id("password"));
      await passwordInput.sendKeys(password);
      await driver.sleep(1000);

      const submitButton = await driver.findElement(By.name("action"));
      await submitButton.click();

      await driver.sleep(1000);
      const currentUrl = await driver.getCurrentUrl();
      if (!currentUrl.includes('localhost')) {
        const acceptButton = await driver.findElement(By.xpath('//*[@value="accept"]'));
        await acceptButton.click();
        await driver.sleep(1000);
      }

      const socialButton = await driver.findElement(By.xpath("//button[contains(@class, 'btn-outline') and contains(text(), 'Social')]"));
      await socialButton.click();
      await driver.sleep(1000);


      const response = await axios.get(userApiUrl);
      const trips = response.data;

      for (const trip of trips) {
        // from the api
        const { description, header } = trip;
        // from the html
        const buttonByDescription = await driver.findElement(By.id("description"));
        const buttonByHeader = await driver.findElement(By.id("header"));
        const buttonTextByDescription = await buttonByDescription.getText();
        const buttonTextByHeader = await buttonByHeader.getText();

        expect(buttonTextByDescription).toEqual(description);
        expect(buttonTextByHeader).toEqual(header);
      }

      await driver.sleep(1000);

    
  }, 999999);
});
