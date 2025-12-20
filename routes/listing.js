// routes/listing.js
const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listing.js");
const { isLoggedIn } = require("../middleware.js");
const multer = require("multer");

// 🧩 If you’re not using Cloudinary, use local uploads
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// -------------------------------------------
// 🟢 Show All Listings
// -------------------------------------------
router.get("/", listingController.index);

// 🟢 New Listing Form
router.get("/new", isLoggedIn, listingController.renderNewForm);

// 🟢 Create New Listing
router.post("/", isLoggedIn, upload.single("listing[image]"), listingController.createListing);

// 🟢 Search Listings (Must be before show route)
router.get("/search", listingController.search);

// 🟢 Show Single Listing
router.get("/:id", listingController.showListing);

// 🟢 Edit Listing Form
router.get("/:id/edit", isLoggedIn, listingController.renderEditForm);

// 🟢 Update Listing
router.put("/:id", isLoggedIn, upload.single("listing[image]"), listingController.updateListing);

// 🟢 Delete Listing
router.delete("/:id", isLoggedIn, listingController.deleteListing);

module.exports = router;
