const Listing = require("../models/listing.js");

// ------------------------------------------------------
// 🟢 Show All Listings
// ------------------------------------------------------
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// ------------------------------------------------------
// 🟢 Search Listings
// ------------------------------------------------------
module.exports.search = async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.redirect("/listings");
  }
  const allListings = await Listing.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { location: { $regex: q, $options: "i" } },
      { country: { $regex: q, $options: "i" } },
    ],
  });
  res.render("listings/index.ejs", { allListings });
};

// ------------------------------------------------------
// 🟢 Render Form for New Listing
// ------------------------------------------------------
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// ------------------------------------------------------
// 🟢 Create New Listing
// ------------------------------------------------------
module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);

  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  } else {
    newListing.image = {
      url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      filename: "default_image",
    };
  }

  newListing.owner = req.user._id;
  await newListing.save();

  req.flash("success", "New listing created successfully!");
  res.redirect(`/listings/${newListing._id}`);
};

// ------------------------------------------------------
// 🟢 Show a Single Listing
// ------------------------------------------------------
module.exports.showListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

// ------------------------------------------------------
// 🟢 Render Edit Form
// ------------------------------------------------------
module.exports.renderEditForm = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// ------------------------------------------------------
// 🟢 Update Listing
// ------------------------------------------------------
module.exports.updateListing = async (req, res) => {
  const listing = await Listing.findByIdAndUpdate(req.params.id, { ...req.body.listing });

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  await listing.save();

  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${listing._id}`);
};

// ------------------------------------------------------
// 🟢 Delete Listing
// ------------------------------------------------------
module.exports.deleteListing = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success", "Listing deleted successfully!");
  res.redirect("/listings");
};
