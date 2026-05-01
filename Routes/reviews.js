const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");


const { validateReview, isLoggedin, isreviewAuthor } = require("../middleware.js");
const ReviewController = require("../controllers/review.js");

router.post("/", isLoggedin, validateReview, wrapAsync(ReviewController.AddReview));
router.delete("/:reviewId", isLoggedin, isreviewAuthor, wrapAsync(ReviewController.DeleteReview));






module.exports = router;
