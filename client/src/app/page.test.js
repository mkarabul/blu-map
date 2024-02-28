const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Home Component', () => {
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

  test('renders without crashing', async () => {
    await driver.get('http://localhost:3000');
    await new Promise(resolve => setTimeout(resolve, 3000));


    const pageTitle = await driver.getTitle();
    expect(pageTitle).toBe('Your Page Title'); // Replace 'Your Page Title' with the actual title of your page

    // Add more assertions or interactions here if needed

  }, 999999);
});
