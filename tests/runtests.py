import unittest

if __name__ == "__main__":
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()

    # Load tests from each test class
    from screens.BMhome import LoginTest

    suite.addTests(loader.loadTestsFromTestCase(LoginTest))

    # Run the test suite
    runner = unittest.TextTestRunner(verbosity=2)
    runner.run(suite)
