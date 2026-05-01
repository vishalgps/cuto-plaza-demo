if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}




const mongoose = require("mongoose");
const express = require("express");
const port = 3000;
const app = express();
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listingsRouter = require("./Routes/listing.js");
const reviewsRouter = require("./Routes/reviews.js");
const userRouter = require("./Routes/user.js");

const dbUrl = process.env.ATLASDB_URL;


const session = require("express-session");
const { MongoStore } = require('connect-mongo');

const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/users.js");




app.set("view engine", "ejs");
app.set("/views", path.join(__dirname, "/views"));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine("ejs", ejsMate);


const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.MYSECRETE,
    },
    touchAfter: 24 * 3600,


});

store.on("error", () => {
    console.log("ERROR IN MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret: process.env.MYSECRETE,
    resave: false,
    saveUnitialized: true,
    cookie: {
        expire: Date.now() + 1000 * 60 * 60 * 24 * 3,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true,

    }
}


app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user
    next();

});



app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);


app.use((req, res, next) => {
    next(new ExpressError(404, "page not found"));

});

app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong" } = err;
    res.status(status).render("error.ejs", { err });
});


app.listen(port, () => {
    console.log("listening to server through port", port);
});

main().then((res) => {
    console.log("connections successfully");
}).catch((err) => {
    console.log(err);

});

async function main() {
    await mongoose.connect(dbUrl)
        .then(() => console.log("Connected to Atlas"))
        .catch(err => console.log(err));
}



