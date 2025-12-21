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
router.get("/fix-images", async (req, res) => {
    const updates = [
        { title: "Modern Loft in Downtown", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60" },
        { title: "Mountain Retreat", url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60" },
        { title: "Historic Villa in Tuscany", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60" },
        { title: "Secluded Treehouse Getaway", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60" },
        { title: "Beachfront Paradise", url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60" },
        { title: "Luxury Penthouse with City Views", url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=60" },
        { title: "Safari Lodge in the Serengeti", url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=60" },
        { title: "Private Island Retreat", url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?auto=format&fit=crop&w=800&q=60" },
        { title: "Luxury Villa in the Maldives", url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=60" },
        { title: "Cozy Beachfront Cottage", url: "https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y290dGFnZXxlbnwwfHwwfHx8MA%3D%3D" }
    ];

    try {
        const Listing = require("../models/listing.js");
        for (const item of updates) {
            await Listing.updateMany({ title: item.title }, { $set: { "image.url": item.url, "image.filename": "unsplash" } });
        }
        res.send("Images updated successfully!");
    } catch (e) {
        res.send("Error updating images: " + e.message);
    }
});

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
