const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const axios = require('axios');
const testemail = "testing@example.com"
const testUserID = "auth0|65e16d09f0c1754329edac35"
const password = "Testing123"
const baseApiUrl = `http://localhost:5000/api/admin/${testUserID}`;

async function getUserNameByUserID(userID) {
  try {
    const response = await axios.get(baseApiUrl);
    const user = response.data;
    return user.userName;
  } catch (error) {
    console.error('Failed to fetch user ID:', error);
    return null;
  }
}

describe('Admin Actions Tests', () => {
  let driver;
  let testuserName;

  beforeEach(async () => {
    const chromeOptions = new chrome.Options();
    chromeOptions.headless = true;
    driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
    testuserName = await getUserNameByUserID(testUserID);
  });

  afterEach(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test('suspends, unsuspends, and deletes a user successfully', async () => {
    await driver.get('http://localhost:3000');
    await new Promise(resolve => setTimeout(resolve, 500));
  
    const loginButton = await driver.findElement(By.id("login"));
    await loginButton.click();
    await new Promise(resolve => setTimeout(resolve, 500));

    const emailInput = await driver.findElement(By.id("username"));
    await emailInput.sendKeys(testemail);
    const passwordInput = await driver.findElement(By.id("password"));
    await passwordInput.sendKeys(password);
    await new Promise(resolve => setTimeout(resolve, 500));

    const submitButton =  await driver.findElement(By.name("action"));
    await submitButton.click();

    await new Promise(resolve => setTimeout(resolve, 500));
    const currentUrl = await driver.getCurrentUrl();
    if (!currentUrl.includes('localhost')) {
        const acceptButton = await driver.findElement(By.xpath('//*[@value="accept"]'));
        await acceptButton.click();
        await driver.sleep(500);
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
    await driver.get('http://localhost:3000/admin');
    await new Promise(resolve => setTimeout(resolve, 4000));

    const userApiUrl = `http://localhost:5000/api/admin/${testUserID}`;
    const userElements = await driver.findElements(By.className('userName-class'));

    for (const userElement of userElements) {
        const element = await userElement.findElement(By.className('userName-name'));
        const userName = await element.getText();
        if (userName === testuserName) {
            // Suspend User
            const suspendButton = await userElement.findElement(By.id('suspendOrUnsuspend'));
            await suspendButton.click();
            await new Promise(resolve => setTimeout(resolve, 2000));
            let alert = await driver.switchTo().alert();
            let alertContent = await alert.getText();
            await alert.accept();
            await new Promise(resolve => setTimeout(resolve, 2000));
            // Verify API response after suspending
            let response = await axios.get(userApiUrl);
            expect(response.data.isSuspended).toBe(true);
            expect(alertContent).toBe(`User is suspended successfully`);

            // Unsuspend User
            await suspendButton.click();
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert = await driver.switchTo().alert();
            alertContent = await alert.getText();
            await alert.accept();
            await new Promise(resolve => setTimeout(resolve, 2000));
            // Verify API response after unsuspending
            response = await axios.get(userApiUrl);
            expect(response.data.isSuspended).toBe(false);
            expect(alertContent).toBe(`User is unsuspended successfully`);

            // Delete User
            const deleteButton = await userElement.findElement(By.id('delete_user'));
            await deleteButton.click();
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert = await driver.switchTo().alert();
            alertContent = await alert.getText();
            await alert.accept();
            await new Promise(resolve => setTimeout(resolve, 2000));
            // Verify API response after deletion
            try {
              response = await axios.get(userApiUrl);
              throw new Error('User still found after deletion');
            } catch (error) {
              expect(error.response.data.error).toBe('User not found');
              // Add User Back
              await axios.post('http://localhost:5000/api/admin', {
                "userId": "auth0|65e16d09f0c1754329edac35",
                "email": "recognizedmugger@gmail.com",
              });
              expect(alertContent).toBe(`User is deleted successfully`);
              return;
            }
          } 
    }
    throw new Error('User not found');
  }, 999999);
});
