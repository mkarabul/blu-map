const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const testemail = "testing1234@gmail.com";
const password = "Testing123";

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
  
    const loginButton = await driver.findElement(By.id("login"));
    await loginButton.click();
    await new Promise(resolve => setTimeout(resolve, 1000));

    const emailInput = await driver.findElement(By.id("username"));
    await emailInput.sendKeys(testemail);
    const passwordInput = await driver.findElement(By.id("password"));
    await passwordInput.sendKeys(password);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const submitButton =  await driver.findElement(By.name("action"));
    await submitButton.click();

    await new Promise(resolve => setTimeout(resolve, 1000));
    const currentUrl = await driver.getCurrentUrl();
    if (!currentUrl.includes('localhost')) {
        const acceptButton = await driver.findElement(By.xpath('//*[@value="accept"]'));
        await acceptButton.click();
        await driver.sleep(500);
    }
    const dropdownButton = await driver.findElement(By.id('dropdown-button'));
    await dropdownButton.click();
    await new Promise(resolve => setTimeout(resolve, 1000));

  
    const searchButton = await driver.findElement(By.id("profile-link"));
    await searchButton.click();
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    const socialPlatforms = [
      {id: 'instagram', expectedUrl: 'instagram.com'},
      {id: 'snapchat', expectedUrl: 'snapchat.com'},
      {id: 'whatsapp', expectedUrl: 'whatsapp.com'},
    ];
    const shareButton = await driver.findElement(By.id("sharefromsquare-button"));
    await shareButton.click();
    for (const platform of socialPlatforms) {
     
      await new Promise(resolve => setTimeout(resolve, 2000));
  
      const socialButton = await driver.findElement(By.id(platform.id));
      await socialButton.click();
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      let windows = await driver.getAllWindowHandles();
      await driver.switchTo().window(windows[1]);
  
      let currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).toContain(platform.expectedUrl);
  
      await driver.close();
      await driver.switchTo().window(windows[0]);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  
  }, 999999);
  
});
