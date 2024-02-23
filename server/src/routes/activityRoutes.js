const express = require("express");
const ActivityController = require("../controllers/ActivityController");

const router = express.Router();

// route to handle GET requests for fetching frequently planned activities
// when a GET request is made to "/frequently-planned-activities"
// call the getFrequentlyPlannedActivities function from the ActivityController
router.get(
  "/frequently-planned-activities",
  ActivityController.getFrequentlyPlannedActivities
);

module.exports = router;
