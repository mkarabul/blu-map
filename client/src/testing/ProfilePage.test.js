const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const axios = require('axios');

const testUsername = 'testUser';
const userApiUrl = `http://localhost:5000/api/users/${testUsername}`;

describe('Profile Page Tests', () => {
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

  test('share button', async () => {
    await driver.get('http://localhost:3000');
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    const searchButton = await driver.findElement(By.id("profile-page"));
    await searchButton.click();
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    const socialPlatforms = [
      {id: 'instagram', expectedUrl: 'instagram.com'},
      {id: 'snapchat', expectedUrl: 'snapchat.com'},
      {id: 'whatsapp', expectedUrl: 'whatsapp.com'},
    ];

    for (const platform of socialPlatforms) {
      const shareButton = await driver.findElement(By.id("sharefromsquare-button"));
      await shareButton.click();
      await new Promise(resolve => setTimeout(resolve, 500));
  
      const socialButton = await driver.findElement(By.id(platform.id));
      await socialButton.click();
      await new Promise(resolve => setTimeout(resolve, 500));
  
      let windows = await driver.getAllWindowHandles();
      await driver.switchTo().window(windows[1]);
  
      let currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).toContain(platform.expectedUrl);
  
      await driver.close();
      await driver.switchTo().window(windows[0]);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  
  }, 999999);
  
});
