const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const axios = require('axios');

const testemail = "testianag211a5@example.com"
const password = "Testing132315"
describe('Login Page Tests', () => {
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

  test('signup', async () => {
    await driver.get('http://localhost:3000');
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    const loginButton = await driver.findElement(By.id("login"));
    await loginButton.click();
    await new Promise(resolve => setTimeout(resolve, 1000));

    const signUpLink = await driver.findElement(By.linkText('Sign up'));
    await signUpLink.click();
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    const emailInput = await driver.findElement(By.id("email"));
    await emailInput.sendKeys(testemail);
    const passwordInput = await driver.findElement(By.id("password"));
    await passwordInput.sendKeys(password);
    const continueButton = await driver.findElement(By.xpath("//button[contains(text(), 'Continue')]"));
    await continueButton.click();

    await new Promise(resolve => setTimeout(resolve, 1000));

    const currentUrl = await driver.getCurrentUrl();
    if (!currentUrl.includes('localhost')) {
        const acceptButton = await driver.findElement(By.xpath('//*[@value="accept"]'));
        await acceptButton.click();
        await driver.sleep(500);
    }
    await new Promise(resolve => setTimeout(resolve, 500));


    expect(await driver.getCurrentUrl()).toContain('localhost');
    // Gotta change the email every new test


    

  }, 999999);

  test('login logout', async () => {
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


    expect(await driver.getCurrentUrl()).toContain('localhost');

    // test that user is actually logged in after
        // also delete the user completely for every new test


  }, 999999);  
});
