// const { Builder, By, Key, until } = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');
// const axios = require('axios');

// const testUsername = 'testUser';
// const userApiUrl = `http://localhost:5000/api/users/${testUsername}`;

// describe('Settings Page Tests', () => {
//   let driver;

//   beforeEach(async () => {
//     const chromeOptions = new chrome.Options();
//     chromeOptions.headless = true;
//     driver = await new Builder()
//       .forBrowser('chrome')
//       .setChromeOptions(chromeOptions)
//       .build();
//   });

//   afterEach(async () => {
//     if (driver) {
//       await driver.quit();
//     }
//   });


//   test('navigate to settings page from dropdown menu', async () => {
//     await driver.get('http://localhost:3000');
//     await new Promise(resolve => setTimeout(resolve, 1000));
  
//     // Click on the dropdown button
//     const dropdownButton = await driver.findElement(By.id("dropdown-button"));
//     await dropdownButton.click();
//     await new Promise(resolve => setTimeout(resolve, 1000));
  
//     // Click on the settings link
//     const settingsLink = await driver.findElement(By.id("settings-link"));
//     await settingsLink.click();
//     await new Promise(resolve => setTimeout(resolve, 1000));
  
//     // Verify that the URL navigates to the settings page
//     expect(await driver.getCurrentUrl()).toContain('/settings');
//   }, 999999);
  
// });
