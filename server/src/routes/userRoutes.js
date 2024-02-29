const express = require("express");
const UserController = require("../controllers/UserController");
const {
  checkJwt,
  getUserInfoMiddleware,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get("/:userId", UserController.getUserByUserId);
router.post("/", UserController.createUser);
router.delete('/:userId', UserController.deleteUserByUserId);
router.patch('/:userId/toggle-suspend', UserController.toggleUserSuspensionById); 
router.patch('/:userId/toggle-admin', UserController.toggleUserAdminStatusById);
router.patch('/:userId/toggle-darkmode', UserController.toggleUserDarkModeById);



module.exports = router;
