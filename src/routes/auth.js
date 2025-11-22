const express = require('express')
const { registerForm, registerUser, loginForm, loginUser, logout } = require('../controllers/authController')
const router = express.Router()


router.get("/register", registerForm)
router.post("/register", registerUser)

router.get("/login", loginForm)
router.post("/login", loginUser)

router.get("/logout", logout)

module.exports = router