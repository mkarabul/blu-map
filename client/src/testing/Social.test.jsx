// const { Builder, By, Key, until } = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');
// const axios = require('axios');

// const testUsername = 'testUser';
// const userApiUrl = `http://localhost:5000/api/users/${testUsername}`;

// const testemail = "testing@example.com"
// const password = "Testing123"

// describe('Social Page Tests', () => {
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

//   test('Social Posts', async () => {
//     await driver.get('http://localhost:3000');
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     const loginButton = await driver.findElement(By.id("login"));
//     await loginButton.click();
//     await new Promise(resolve => setTimeout(resolve, 300));

//     const emailInput = await driver.findElement(By.id("username"));
//     await emailInput.sendKeys(testemail);
//     const passwordInput = await driver.findElement(By.id("password"));
//     await passwordInput.sendKeys(password);
//     await new Promise(resolve => setTimeout(resolve, 300));

//     const submitButton =  await driver.findElement(By.name("action"));
//     await submitButton.click();

//     await new Promise(resolve => setTimeout(resolve, 300));
//     const currentUrl = await driver.getCurrentUrl();
//     if (!currentUrl.includes('localhost')) {
//         const acceptButton = await driver.findElement(By.xpath('//*[@value="accept"]'));
//         await acceptButton.click();
//         await driver.sleep(300);
//     }
  
//     const socialButton = await driver.findElement(By.xpath("//button[contains(@class, 'btn-outline') and contains(text(), 'Social')]"));
//     await socialButton.click();

//     await new Promise(resolve => setTimeout(resolve, 1000));
  
  
//   }, 999999);
  
// });
