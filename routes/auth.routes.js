const express = require('express');
const { authController } = require('../controllers');
router = express.Router();

const auth = require("../middleware/auth");

// Register
router.post("/register", authController.registerUser);

// Login
router.post("/login", authController.loginUser);

// Get Users (Admin only)
router.get("/users", auth, authController.getUsers);
// Get User
router.get("/users/:email", auth, authController.getUser);

// Delete User
router.delete("/delete/:email", auth, authController.deleteUser);

module.exports = router;