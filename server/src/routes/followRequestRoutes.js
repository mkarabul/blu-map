const express = require('express');
const FollowRequestController = require('../controllers/FollowRequestController');
const router = express.Router();

router.get('/', FollowRequestController.getAllInfo);
router.get('/following/:userName', FollowRequestController.getFollowerRequest);
router.post('/send-request', FollowRequestController.createFollowRequest);
router.delete('/cancel-request', FollowRequestController.cancelFollowRequest);


module.exports = router;
