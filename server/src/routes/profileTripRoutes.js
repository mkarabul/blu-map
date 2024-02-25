const express = require("express");
const ProfileTripController = require("../controllers/ProfileTripController");

const router = express.Router();

router.get("", (req, res) => {
  res.status(200).send(req.body);
});

router.post("", ProfileTripController.createProfileTrip);

module.exports = router;
