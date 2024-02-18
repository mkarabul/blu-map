import unittest
import warnings
warnings.filterwarnings("ignore")

if __name__ == "__main__":
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    

    from screens.BMhome import LoginTest
    from screens.BMadmin import AdminTest

    suite.addTests(loader.loadTestsFromTestCase(LoginTest))
    suite.addTests(loader.loadTestsFromTestCase(AdminTest))


    runner = unittest.TextTestRunner(verbosity=2)
    runner.run(suite)
