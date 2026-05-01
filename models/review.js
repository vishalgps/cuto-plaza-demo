const mongoose = require("mongoose");
const dbUrl = process.env.ATLASDB_URL;


main().then((res) => {
    console.log("connections successfully");
}).catch((err) => {
    console.log(err);

});

async function main() {

   await mongoose.connect(dbUrl);
}


const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
        
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },

    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",

    }
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;