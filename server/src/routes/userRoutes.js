const express = require("express");
const UserController = require("../controllers/UserController");
const {
  checkJwt,
  getUserInfoMiddleware,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get(
  "/:userId",
  checkJwt,
  getUserInfoMiddleware,
  UserController.getUserByUserId
);
router.get("/username/:userName", UserController.getUserByUsername);

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

router.patch("/:userId/toggle-admin", UserController.toggleUserAdminStatusById);
router.patch("/:userId/toggle-darkmode", UserController.toggleUserDarkModeById);
router.patch("/:userId/toggle-public", UserController.toggleUserPublicById);



router.patch("/:userId/toggle-public", UserController.toggleUserPublicById);
router.patch('/:userId/increment-following', UserController.incrementUserFollowingCount);
router.patch('/:userId/decrement-following', UserController.decrementUserFollowingCount);
router.patch('/:userId/increment-follower', UserController.incrementUserFollowerCount);
router.patch('/:userId/decrement-follower', UserController.decrementUserFollowerCount);





module.exports = router;
