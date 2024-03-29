const express = require("express");
const FriendController = require("../controllers/FriendController");
const {
  checkJwt,
  getUserInfoMiddleware,
} = require("../middleware/authMiddleware");
const Friend = require("../models/Friend");

const router = express.Router();

router.post(
  "/:userName",
  checkJwt,
  getUserInfoMiddleware,
  FriendController.addFriend
);

router.patch(
  "/:userName/accept-friend",
  checkJwt,
  getUserInfoMiddleware,
  FriendController.acceptFriend
);

router.patch(
  "/:userName/reject-friend",
  checkJwt,
  getUserInfoMiddleware,
  FriendController.rejectFriend
);

router.get(
  "/:userId/friends",
  checkJwt,
  getUserInfoMiddleware,
  FriendController.getUserFriends
);

router.get(
  "/:userName/:userId/is-friend",
  checkJwt,
  getUserInfoMiddleware,
  FriendController.isFriend
);

router.get(
  "/:userId/pending-friends",
  checkJwt,
  getUserInfoMiddleware,
  FriendController.getPendingFriends
);

router.delete(
  "/:userName",
  checkJwt,
  getUserInfoMiddleware,
  FriendController.deleteFriend
);

module.exports = router;
