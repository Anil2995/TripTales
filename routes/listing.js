const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// ------------------------------------------------------
// GET → All Listings
// POST → Create New Listing
// ------------------------------------------------------
router.route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// ------------------------------------------------------
// GET → Form for New Listing
// ------------------------------------------------------
router.get("/new", isLoggedIn, listingController.renderNewForm);

// ------------------------------------------------------
// GET → Show a Listing
// PUT → Update Listing
// DELETE → Delete Listing
// ------------------------------------------------------
router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// ------------------------------------------------------
// GET → Edit Form for a Listing
// ------------------------------------------------------
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
