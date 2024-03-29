const express = require("express");
const UserController = require("../controllers/UserController");
const {
  checkJwt,
  getUserInfoMiddleware,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", UserController.getAllUsers);

router.get("/usernames", UserController.getAllUsernames);

router.get(
  "/:userId",
  checkJwt,
  getUserInfoMiddleware,
  UserController.getUserByUserId
);
router.get("/username/:userName", UserController.getUserByUsername);

router.get(
  "/theme/:userId",
  checkJwt,
  getUserInfoMiddleware,
  UserController.getUserThemeByUserId
);

router.post("/", checkJwt, getUserInfoMiddleware, UserController.createUser);
router.delete("/:userId", UserController.deleteUserByUserId);
router.patch(
  "/:userId/toggle-suspend",
  UserController.toggleUserSuspensionById
);

router.put(
  "/:userId",
  checkJwt,
  getUserInfoMiddleware,
  UserController.updateUserByUserId
);

router.put(
  "/theme/:userId",
  checkJwt,
  getUserInfoMiddleware,
  UserController.updateUserThemeByUserId
);

router.put("/mode/:userId", UserController.updateUserModeByUserId);

router.patch("/:userId/toggle-admin", UserController.toggleUserAdminStatusById);

router.patch("/:userId/toggle-public", UserController.toggleUserPublicById);

module.exports = router;
