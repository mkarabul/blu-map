import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

class LoginTest(unittest.TestCase):

    def setUp(self):
        # Initialize the WebDriver instance
        self.driver = webdriver.Chrome()

    def navigate_to_home(self):
        # Navigate to the home page before each test
        self.driver.get("http://localhost:3000")

    def test_login_success(self):
        self.navigate_to_home()  # Refresh/navigate to the page at the beginning of the test
        driver = self.driver

        username_field = driver.find_element(By.ID, "userName")
        password_field = driver.find_element(By.ID, "passWord")

        username_field.send_keys("example")
        password_field.send_keys("password")

        # Press Enter to submit the form
        password_field.send_keys(Keys.RETURN)
        time.sleep(2)

        # Wait for redirection and check if we are on the /home page
        WebDriverWait(driver, 2).until(EC.url_to_be("http://localhost:3000/home"))
        self.assertEqual(driver.current_url, "http://localhost:3000/home")

    def test_login_failure(self):
        self.navigate_to_home()  # Refresh/navigate to the page at the beginning of the test
        driver = self.driver

        username_field = driver.find_element(By.ID, "userName")
        password_field = driver.find_element(By.ID, "passWord")

        username_field.send_keys("wrong")
        password_field.send_keys("credentials")

        # Press Enter to submit the form
        password_field.send_keys(Keys.RETURN)
        time.sleep(2)

        # Wait for the alert and check its text
        WebDriverWait(driver, 2).until(EC.alert_is_present())
        alert = driver.switch_to.alert
        self.assertEqual(alert.text, "Invalid username or password")
        alert.accept()  # Close the alert

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
