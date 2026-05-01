const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const { isLoggedin, isOwner, validateListing } = require("../middleware.js");

const ListingController = require("../controllers/listings.js");

const multer = require('multer');
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });



router.route("/")
    .get(wrapAsync(ListingController.indexRoute))
    .post(isLoggedin, validateListing, upload.single('listing[image][url]'), wrapAsync(ListingController.AddNewListing));


router.get("/new", isLoggedin, ListingController.RenderNewForm);

// show rout
router.route("/:id")
    .get(wrapAsync(ListingController.ShowListing))
    .put(isOwner, isLoggedin, validateListing, upload.single('listing[image][url]'), wrapAsync(ListingController.EditListing))
    .delete(isOwner, isLoggedin, wrapAsync(ListingController.DeleteListing));

// Edit Rout
router.get("/:id/edit", isOwner, isLoggedin, wrapAsync(ListingController.RenderEditForm));

module.exports = router;











