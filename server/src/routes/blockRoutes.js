const express = require("express");
const {
  checkJwt,
  getUserInfoMiddleware,
} = require("../middleware/authMiddleware");
const router = express.Router();
const BlockController = require("../controllers/BlockController");

router.post(
  "/:userName/:blockerId",
  checkJwt,
  getUserInfoMiddleware,
  BlockController.createBlock
);

router.get(
  "/:userName",
  checkJwt,
  getUserInfoMiddleware,
  BlockController.getBlockedUsers
);

router.get(
  "/:userName/:blockerId",
  checkJwt,
  getUserInfoMiddleware,
  BlockController.getBlocked
);

router.delete(
  "/:userName/:blockerId",
  checkJwt,
  getUserInfoMiddleware,
  BlockController.removeBlock
);

router.get(
  "/profile/:userName/:blockedUserId",
  checkJwt,
  getUserInfoMiddleware,
  BlockController.isBlocked
);

module.exports = router;
