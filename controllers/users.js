
const User = require("../models/users.js");

module.exports.RenderSignupform = (req, res) => {
    res.render("users/signup.ejs");

};

module.exports.Signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({
            username: username,
            email: email,
        });



        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to travel website");
            res.redirect("/listings");
        })


    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }

};

module.exports.RenderLoginform = (req, res) => {
    res.render("users/login.ejs");

};

module.exports.Loginpage = async (req, res) => {
    req.flash("success", "you log in successfully");
    let redirectUrl = res.locals.redirectUrl;
    res.redirect(redirectUrl);

    // res.send("Welcome to travel you are logged in")

};

module.exports.LogOut=(req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you logged out from this page");
        res.redirect("/listings");

    });

};