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


  
describe('Delete User Component Tests', () => {
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

  test('delete a user successfully and add the user back after deletion', async () => {
    // Verify user exists before deletion
    let responseBeforeDeletion;
    try {
      responseBeforeDeletion = await axios.get(userApiUrl);
      // Verify user exists before deletion
      expect(responseBeforeDeletion.data.username).toBe(testUsername);
    } catch (error) {
      throw new Error('User not found before deletion');
    }
  
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
            const deleteButton = await userElement.findElement(By.id('delete_user'));
            await deleteButton.click();
            await new Promise(resolve => setTimeout(resolve, 2000));
  
            const alert = await driver.switchTo().alert();
            const alertContent = await alert.getText();
            await alert.accept();
            await new Promise(resolve => setTimeout(resolve, 2000));
  
            // Verify API response after deletion
            try {
              const responseAfterDeletion = await axios.get(userApiUrl);
              throw new Error('User still found after deletion');
            } catch (error) {
              expect(error.response.data.error).toBe('User not found');
              
              try {
                const responseAfterDeletion = await axios.post('http://localhost:5000/api/users', {
                  username: testUsername,
                  email: 'testUser@example.net',
                  age: 44,
                  gender: 'Other',
                  isSuspended: false
                });
                expect(responseAfterDeletion.status).toBe(201);
                expect(responseAfterDeletion.data.user.username).toBe(testUsername);
              } catch (error) {
                throw new Error('Failed to add user back after deletion');
              }
              expect(alertContent).toBe(`${testUsername} is deleted successfully`);

  
              return;
            }
          } 
    }
    throw new Error('User not found');
  }, 999999);
  

 
});
});