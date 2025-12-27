const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

// -------------------------------------------
//  Enhanced Listing Schema
// -------------------------------------------
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        url: String,
        filename: String,
    },
    price: {
        type: Number,
        min: 0
    },
    location: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    // New enhanced fields
    category: {
        type: String,
        enum: ['trending', 'rooms', 'cities', 'mountains', 'castles', 'pools', 'camping', 'farms', 'arctic', 'domes', 'beach', 'lakefront', 'tropical', 'islands', 'vineyards', 'design', 'luxe', 'other'],
        default: 'other'
    },
    amenities: [{
        type: String
    }],
    guests: {
        type: Number,
        default: 4
    },
    bedrooms: {
        type: Number,
        default: 2
    },
    bathrooms: {
        type: Number,
        default: 1
    },
    isGuestFavourite: {
        type: Boolean,
        default: false
    },
    isSuperhost: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Virtual for average rating
listingSchema.virtual('averageRating').get(function () {
    if (this.reviews && this.reviews.length > 0) {
        const sum = this.reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
        return (sum / this.reviews.length).toFixed(2);
    }
    return null;
});

// Virtual for formatted price
listingSchema.virtual('formattedPrice').get(function () {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(this.price);
});

// Middleware: Delete associated reviews when listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

// Create indexes for search performance
listingSchema.index({ title: 'text', location: 'text', country: 'text' });
listingSchema.index({ category: 1 });
listingSchema.index({ price: 1 });

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;