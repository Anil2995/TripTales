const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; // local DB

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log(" Connected to MongoDB");
}

const initDB = async () => {
  try {
    await main();

    await Listing.deleteMany({});
    console.log("Old listings removed!");

    // Ensure every listing has an owner field
    const updatedData = initdata.data.map(obj => ({
      ...obj,
      owner: obj.owner || "67e30344aa14c6fec25b3799",
    }));

    await Listing.insertMany(updatedData);
    console.log(" Data was initialized!");

  } catch (err) {
    console.error(" Error initializing DB:", err);
  } finally {
    await mongoose.connection.close();
    console.log(" MongoDB connection closed!");
  }
};

initDB();
