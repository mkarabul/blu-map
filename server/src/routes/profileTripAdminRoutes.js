const express = require("express");
const click = require("../controllers/ProfileTripControllerAdmin");


const router = express.Router();

router.post(
  "",
  ProfileTripControllerAdmin.createProfileTrip
);

router.get(
  "/:userId",
  ProfileTripControllerAdmin.getProfileTrips
);

router.get("", ProfileTripControllerAdmin.getPublicProfileTrips);

module.exports = router;
