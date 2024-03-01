// const { Builder, By, Key, until } = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');
// const axios = require('axios');

// const testUsername = 'auth0|65e16df785816c4a38ce3180';
// const userApiUrl = `http://localhost:5000/api/admin-profile-trip/${testUsername}`;

// const testemail = "testing1234@gmail.com";
// const password = "Testing123";

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

//   test('a', async () => {
//       await driver.get('http://localhost:3000');
//       await driver.sleep(1000);

//       const loginButton = await driver.findElement(By.id("login"));
//       await loginButton.click();
//       await driver.sleep(1000);

//       const emailInput = await driver.findElement(By.id("username"));
//       await emailInput.sendKeys(testemail);
//       const passwordInput = await driver.findElement(By.id("password"));
//       await passwordInput.sendKeys(password);
//       await driver.sleep(1000);

//       const submitButton = await driver.findElement(By.name("action"));
//       await submitButton.click();

//       await driver.sleep(1000);
//       const currentUrl = await driver.getCurrentUrl();
//       if (!currentUrl.includes('localhost')) {
//         const acceptButton = await driver.findElement(By.xpath('//*[@value="accept"]'));
//         await acceptButton.click();
//         await driver.sleep(1000);
//       }

//       const tripsButton = await driver.findElement(By.xpath("//button[contains(@class, 'btn-outline') and contains(text(), 'Trips')]"));
//       await tripsButton.click();
//       await driver.sleep(1000);

//       const addButton = await driver.findElement(By.id("add-itinerary"));
//       await addButton.click();

//       await driver.sleep(1000);
//       // what do i do now??



    
//   }, 999999);
// });
