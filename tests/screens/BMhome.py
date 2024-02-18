import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

from testaccounts import TEST_ACCOUNTS

class LoginTest(unittest.TestCase):

    def setUp(self):
        # Setup method to initialize the webdriver
        self.driver = webdriver.Chrome()

    def navigate_to_home(self):
        # Navigate to the home page
        self.driver.get("http://localhost:3000")

    def test_login_success(self):
        # Test for successful login
        self.navigate_to_home()
        driver = self.driver

        try:
            username_field = driver.find_element(By.ID, "userName")
            password_field = driver.find_element(By.ID, "passWord")

            username_field.send_keys(TEST_ACCOUNTS["valid_user"]["username"])
            password_field.send_keys(TEST_ACCOUNTS["valid_user"]["password"])

            password_field.send_keys(Keys.RETURN)
            time.sleep(2)

            WebDriverWait(driver, 10).until(EC.url_to_be("http://localhost:3000/profile"))
            self.assertEqual(driver.current_url, "http://localhost:3000/profile")
        except NoSuchElementException as e:
            self.fail(f"Test failed due to missing element: {e}")
        except TimeoutException as e:
            self.fail(f"Test failed due to timeout waiting for condition: {e}")

    def test_login_failure(self):
        # Test for failed login
        self.navigate_to_home()
        driver = self.driver

        try:
            username_field = driver.find_element(By.ID, "userName")
            password_field = driver.find_element(By.ID, "passWord")

            username_field.send_keys(TEST_ACCOUNTS["invalid_user"]["username"])
            password_field.send_keys(TEST_ACCOUNTS["invalid_user"]["password"])

            password_field.send_keys(Keys.RETURN)
            WebDriverWait(driver, 10).until(EC.alert_is_present())
            alert = driver.switch_to.alert
            time.sleep(2)
            self.assertEqual(alert.text, "Invalid username or password")
            alert.accept()
        except NoSuchElementException as e:
            self.fail(f"Test failed due to missing element: {e}")
        except TimeoutException as e:
            self.fail(f"Test failed due to timeout waiting for condition: {e}")


if __name__ == "__main__":
    unittest.main()
