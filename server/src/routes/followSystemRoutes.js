const express = require('express');
const FollowSystemController = require('../controllers/FollowSystemController');
const router = express.Router();

router.get('/', FollowSystemController.getAllInfo);
router.get('/followers/:userName', FollowSystemController.getFollowers);
router.get('/following/:userName', FollowSystemController.getFollowing);
router.post('/follow', FollowSystemController.createFollowRelationship);
router.delete('/unfollow', FollowSystemController.unfollowUser);


module.exports = router;
