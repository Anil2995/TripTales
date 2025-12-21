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
// -------------------------------------------
// 🟢 Show All Listings
// -------------------------------------------
router.get("/fix-reviews", async (req, res) => {
    const reviewData = {
        "Modern Loft in Downtown": [
            { rating: 5, comment: "Amazing location right in the city center. The loft was clean, modern, and exactly as shown in the photos. Loved the vibe!" },
            { rating: 4, comment: "Great stay overall. A bit noisy at night due to traffic, but that’s expected in downtown NYC." },
            { rating: 5, comment: "Perfect for exploring the city. Everything was within walking distance. Would definitely stay again." },
            { rating: 3, comment: "Nice apartment but smaller than expected. Good for short stays, not ideal for long ones." },
            { rating: 4, comment: "Stylish interiors and comfortable bed. Check-in was smooth and hassle-free." }
        ],
        "Mountain Retreat": [
            { rating: 5, comment: "Absolutely peaceful and refreshing. Surrounded by nature—exactly what I needed." },
            { rating: 4, comment: "Cabin was cozy and well maintained. Wi-Fi was a bit slow, but understandable." },
            { rating: 5, comment: "Woke up to stunning mountain views. A perfect escape from city life." },
            { rating: 3, comment: "Beautiful location, but getting there was a little tricky in snowy weather." },
            { rating: 4, comment: "Great for couples or solo travelers who want quiet time." }
        ],
        "Historic Villa in Tuscany": [
            { rating: 5, comment: "A dream stay! The villa felt straight out of a movie. Loved the vineyards nearby." },
            { rating: 5, comment: "Authentic Italian charm with modern comfort. Highly recommended." },
            { rating: 4, comment: "Spacious and beautiful. A car is necessary to explore nearby towns." },
            { rating: 3, comment: "Lovely place, but maintenance could be slightly better in some rooms." },
            { rating: 4, comment: "Perfect for family vacations and relaxed evenings." }
        ],
        "Secluded Treehouse Getaway": [
            { rating: 5, comment: "Such a unique experience! Sleeping among trees was magical." },
            { rating: 4, comment: "Very peaceful and cozy. Limited space, but that’s part of the charm." },
            { rating: 5, comment: "Great for nature lovers. Loved the eco-friendly design." },
            { rating: 3, comment: "Not ideal for people afraid of heights, but still a fun stay." },
            { rating: 4, comment: "Clean, quiet, and perfect for a weekend retreat." }
        ],
        "Beachfront Paradise": [
            { rating: 5, comment: "Waking up to the ocean every morning was incredible!" },
            { rating: 4, comment: "Fantastic beach access. Slightly crowded during peak hours." },
            { rating: 5, comment: "Clean condo, amazing view, and very relaxing atmosphere." },
            { rating: 3, comment: "Great location, but nearby nightlife can be noisy at night." },
            { rating: 4, comment: "Perfect vacation spot for couples and families." }
        ],
        "Luxury Penthouse with City Views": [
            { rating: 5, comment: "Stunning views and luxury interiors. Felt like a celebrity stay!" },
            { rating: 4, comment: "Very stylish and comfortable. Parking was slightly inconvenient." },
            { rating: 5, comment: "Sunsets from the balcony were breathtaking." },
            { rating: 3, comment: "Beautiful place, but price felt a bit high for the amenities." },
            { rating: 4, comment: "Great for business trips or luxury vacations." }
        ],
        "Safari Lodge in the Serengeti": [
            { rating: 5, comment: "Once-in-a-lifetime experience. Saw wildlife right from the lodge." },
            { rating: 5, comment: "Comfortable stay with incredible views and friendly staff." },
            { rating: 4, comment: "Food was great, but limited menu options." },
            { rating: 3, comment: "Amazing location, but connectivity was limited." },
            { rating: 4, comment: "Perfect for adventure seekers and nature lovers." }
        ],
        "Private Island Retreat": [
            { rating: 5, comment: "Pure luxury and privacy. Worth every penny." },
            { rating: 5, comment: "Felt like paradise on earth. Exceptional service." },
            { rating: 4, comment: "Amazing experience, but very expensive." },
            { rating: 3, comment: "Beautiful island, but limited activities beyond relaxation." },
            { rating: 4, comment: "Perfect honeymoon destination." }
        ],
        "Luxury Villa in the Maldives": [
            { rating: 5, comment: "Overwater villa was breathtaking. Crystal-clear water everywhere. " },
            { rating: 5, comment: "Ultimate luxury and relaxation. Staff was extremely helpful." },
            { rating: 4, comment: "Amazing views, but food prices were high." },
            { rating: 3, comment: "Beautiful stay, but weather was unpredictable." },
            { rating: 4, comment: "Perfect for couples looking for a romantic getaway." }
        ],
        "Cozy Beachfront Cottage": [
            { rating: 5, comment: "Absolutely loved this place! The ocean view was stunning, and falling asleep to the sound of waves was magical." },
            { rating: 4, comment: "Beautiful and cozy cottage right on the beach. Great location, though nearby traffic can be heard during the day." },
            { rating: 5, comment: "Perfect getaway spot. Clean, well-maintained, and just steps away from the beach. Highly recommend!" },
            { rating: 3, comment: "The view is amazing, but the cottage felt a bit small for our group. Best suited for couples." },
            { rating: 4, comment: "Loved the peaceful mornings and sunsets. Kitchen had all the essentials for a comfortable stay." },
            { rating: 5, comment: "One of the best stays I’ve had. Cozy, relaxing, and truly beachfront. Would love to come back!" }
        ]
    };

    try {
        const Listing = require("../models/listing.js");
        const Review = require("../models/review.js");
        const User = require("../models/user.js");

        // Use the first user found as the author
        const user = await User.findOne({});

        for (const [listingTitle, reviews] of Object.entries(reviewData)) {
            const listing = await Listing.findOne({ title: listingTitle });
            if (listing && user) {
                // Determine existing review count to avoid duplication if possible, 
                // but simpler for this fix is just to append new ones for now.
                for (const r of reviews) {
                    const newReview = new Review({
                        rating: r.rating,
                        comment: r.comment,
                        author: user._id
                    });
                    const savedReview = await newReview.save();
                    listing.reviews.push(savedReview);
                }
                await listing.save();
            }
        }
        res.send("Reviews updated successfully on live DB!");
    } catch (e) {
        res.send("Error updating reviews: " + e.message);
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
