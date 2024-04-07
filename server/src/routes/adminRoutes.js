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


router.post("/notifications/post", UserController.postAdminNotification);
router.get("/notifications/get", UserController.getAllNotifications); 
router.get("/notifications/get/:userId", UserController.getNotificationsByUserId);
router.delete("/notifications/delete/:notificationId", UserController.deleteNotificationById);

module.exports = router;
