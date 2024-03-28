const express = require("express");
const {
  checkJwt,
  getUserInfoMiddleware,
} = require("../middleware/authMiddleware");
const router = express.Router();
const BlockController = require("../controllers/BlockController");

router.post(
  "/profile/:userId",
  checkJwt,
  getUserInfoMiddleware,
  BlockController.createBlock
);

router.get(
  "/profile/:userId",
  checkJwt,
  getUserInfoMiddleware,
  BlockController.getBlockedUsers
);

router.delete(
  "/profile/:userId",
  checkJwt,
  getUserInfoMiddleware,
  BlockController.removeBlock
);

module.exports = router;
