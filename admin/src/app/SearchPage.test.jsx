const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const axios = require('axios');

const testUsername = 'testUser';
const userApiUrl = `http://localhost:5000/api/users/${testUsername}`;

describe('SearchPage Component Tests', () => {
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

  test('suspends a user successfully', async () => {
    await driver.get('http://localhost:3000');
    
    // Click search button
    const searchButton = await driver.findElement(By.id("search-button"));
    await searchButton.click();
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    const userElements = await driver.findElements(By.className('username-class'));

    for (const userElement of userElements) {
        const element = await userElement.findElement(By.className('username-name'));
        const username = await element.getText();
        if (username === testUsername) {
            const suspendButton = await userElement.findElement(By.id('suspendOrUnsuspend'));
            await suspendButton.click();
            await new Promise(resolve => setTimeout(resolve, 2000));

            const alert = await driver.switchTo().alert();
            const alertContent = await alert.getText();
            await alert.accept();
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Verify API response
            const response = await axios.get(userApiUrl);
            expect(response.data.isSuspended).toBe(true);

            // Verify alert content
            expect(alertContent).toBe(`${testUsername} is suspended successfully`);
            return;
          } 
    }
    throw new Error('User not found');
  }, 999999);


  test('unsuspends a user successfully', async () => {
    await driver.get('http://localhost:3000');
    
    // Click search button
    const searchButton = await driver.findElement(By.id("search-button"));
    await searchButton.click();
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    const userElements = await driver.findElements(By.className('username-class'));

    for (const userElement of userElements) {
        const element = await userElement.findElement(By.className('username-name'));
        const username = await element.getText();
        if (username === testUsername) {
            const suspendButton = await userElement.findElement(By.id('suspendOrUnsuspend'));
            await suspendButton.click();
            await new Promise(resolve => setTimeout(resolve, 2000));

            const alert = await driver.switchTo().alert();
            const alertContent = await alert.getText();
            await alert.accept();
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Verify API response
            const response = await axios.get(userApiUrl);
            expect(response.data.isSuspended).toBe(false);

            // Verify alert content
            expect(alertContent).toBe(`${testUsername} is unsuspended successfully`);
            return;
          } 
    }
    throw new Error('User not found');
  }, 999999);
});
