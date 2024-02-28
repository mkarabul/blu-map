const express = require("express");
const UserController = require("../controllers/UserController");

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get("/:userId", UserController.getUserByUserId);
router.post("/", UserController.createUser);
router.delete('/:userId', UserController.deleteUserByUserId);
router.patch('/:userId/toggle-suspend', UserController.toggleUserSuspensionById); 

module.exports = router;
