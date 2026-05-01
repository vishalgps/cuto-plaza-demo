const mongoose = require("mongoose");
const Joi = require('joi');
const Review = require("../models/review.js");

const dbUrl = process.env.ATLASDB_URL;


main().then((res) => {
    console.log("connections successfully");
}).catch((err) => {
    console.log(err);

});

async function main() {

    await mongoose.connect(dbUrl)
        .then(() => console.log("Connected to Atlas"))
        .catch(err => console.log(err));
};


const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },

    image: {
    
        url: {
            type: String,
        },
        filename: {
            type: String,
        }
    },

    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },


    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",


        }
    ],

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }

});

listingSchema.post("/findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;