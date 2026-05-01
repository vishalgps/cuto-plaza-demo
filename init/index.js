const mongoose = require("mongoose");
const Listing = require("../models/Listing.js");
const initdata = require("./data.js");
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
}

const initDB = async () => {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({ ...obj, owner: "69d65f215c94d3a2956ea07a" }))
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
}
initDB();