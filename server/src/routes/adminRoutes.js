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
router.patch("/:userId/toggle-admin", UserController.toggleUserAdminStatusById);


router.post("/notifications", UserController.postAdminNotification);
router.get("/notifications/:userId", UserController.getNotificationsByUserId);
router.get("/notifications", UserController.getAllNotifications); 
router.delete("/notifications/:notificationId", UserController.deleteNotificationById);

module.exports = router;
