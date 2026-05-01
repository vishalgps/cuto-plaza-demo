const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/users.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const UsersController = require("../controllers/users.js");
router.route("/signup")
    .get(UsersController.RenderSignupform)
    .post(wrapAsync(UsersController.Signup));

router.route("/login")
    .get(UsersController.RenderLoginform)
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), wrapAsync(UsersController.Loginpage));

router.get("/logout", UsersController.LogOut);

module.exports = router;
