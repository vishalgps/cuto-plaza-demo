const Listing = require("../models/Listing.js");
const Review = require("../models/review.js");

module.exports.AddReview = async (req, res) => {
    // let { id } = req.params;

    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await listing.save();
    await newReview.save();
    req.flash("success", "new reviewed Added");
    res.redirect(`/listings/${listing._id}`);

};


module.exports.DeleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", " reviewe deleted");

    res.redirect(`/listings/${id}`);
};