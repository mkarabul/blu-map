const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const axios = require('axios');

const testUsername = 'testUser';
const userApiUrl = `http://localhost:5000/api/users/${testUsername}`;

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
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    const socialButton = await driver.findElement(By.xpath("//button[contains(@class, 'btn-outline') and contains(text(), 'Social')]"));
    await socialButton.click();

    await new Promise(resolve => setTimeout(resolve, 1000));
  
  
  }, 999999);
  
});
