const express = require("express");
const UserController = require("../controllers/AdminController");

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get("/:userId", UserController.getUserByUserId);

router.post("/", UserController.createUser);
router.delete("/:userId", UserController.deleteUserByUserId);
router.patch(
  "/:userId/toggle-suspend",
  UserController.toggleUserSuspensionById
);
router.patch('/:userId/toggle-admin', UserController.toggleUserAdminStatusById);
router.patch('/:userId/toggle-darkmode', UserController.toggleUserDarkModeById);

module.exports = router;
