// -------------------------------------------
//  Data Seeder for TripTales (MongoDB Atlas)
//  Premium Sample Listings with Diverse Locations
// -------------------------------------------

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const Listing = require("../models/listing.js");

// MongoDB Atlas URL from .env
const dbUrl = process.env.ATLASDB_URL;

// Enhanced Sample Listings - Diverse & Premium
const sampleListings = [
  // Beach & Coastal Properties
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach. Perfect for romantic weekends or family vacations. Features a private deck, outdoor shower, and full kitchen.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60",
    },
    price: 8500,
    location: "Malibu",
    country: "United States",
  },
  {
    title: "Beachfront Paradise Villa",
    description:
      "Step out of your door onto the sandy beach. This beachfront villa offers the ultimate relaxation with infinity pool, private chef service, and breathtaking sunset views. 4 bedrooms, 5 bathrooms.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60",
    },
    price: 25000,
    location: "Cancun",
    country: "Mexico",
  },
  {
    title: "Oceanfront Bali Retreat",
    description:
      "Experience paradise in this stunning oceanfront villa in Bali. Traditional architecture meets modern luxury with open-air living, private pool, and dedicated staff. Perfect for honeymoons and special celebrations.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=60",
    },
    price: 18000,
    location: "Ubud",
    country: "Indonesia",
  },

  // Mountain & Nature Retreats
  {
    title: "Mountain Retreat Cabin",
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature with hiking trails, it's a perfect place to recharge. Features fireplace, hot tub, and panoramic mountain views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60",
    },
    price: 12000,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Swiss Alps Chalet",
    description:
      "Luxury ski chalet in the heart of the Swiss Alps. Ski-in/ski-out access, private sauna, gourmet kitchen, and stunning valley views. Perfect for winter sports enthusiasts.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=60",
    },
    price: 45000,
    location: "Zermatt",
    country: "Switzerland",
  },
  {
    title: "Himalayan Mountain Lodge",
    description:
      "Authentic mountain lodge with breathtaking Himalayan views. Experience local culture, fresh mountain air, and world-class trekking. Includes breakfast and guide services.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60",
    },
    price: 5500,
    location: "Manali",
    country: "India",
  },

  // City & Urban Stays
  {
    title: "Modern Loft in Downtown NYC",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers! Walking distance to Times Square, Central Park, and world-class dining. High-speed wifi and smart home features.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    },
    price: 15000,
    location: "New York City",
    country: "United States",
  },
  {
    title: "Luxury Penthouse with City Views",
    description:
      "Indulge in luxury living with panoramic city views from this stunning penthouse apartment. 3 bedrooms, private terrace, concierge service, and rooftop pool access.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=60",
    },
    price: 35000,
    location: "Los Angeles",
    country: "United States",
  },
  {
    title: "Tokyo Shibuya Modern Apartment",
    description:
      "Experience the energy of Tokyo from this modern apartment in Shibuya. Steps from the famous crossing, great restaurants, and nightlife. Minimalist design with traditional touches.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=60",
    },
    price: 12000,
    location: "Tokyo",
    country: "Japan",
  },
  {
    title: "Paris Montmartre Artist Loft",
    description:
      "Charming artist loft in the historic Montmartre neighborhood. Walk to Sacré-Cœur, enjoy croissants at local cafés, and soak in Parisian culture. High ceilings and original art throughout.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=60",
    },
    price: 18000,
    location: "Paris",
    country: "France",
  },

  // Heritage & Historic Properties
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored 16th-century villa. Explore the rolling hills and vineyards. Includes wine tasting, cooking classes, and pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
    },
    price: 28000,
    location: "Florence",
    country: "Italy",
  },
  {
    title: "Scottish Highland Castle",
    description:
      "Live like royalty in this authentic Scottish castle. Original 15th-century architecture with modern comforts. Includes guided tours, whisky tasting, and traditional breakfast.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=800&q=60",
    },
    price: 55000,
    location: "Edinburgh",
    country: "Scotland",
  },
  {
    title: "Rajasthan Heritage Haveli",
    description:
      "Step back in time in this stunning heritage haveli featuring traditional Rajasthani architecture, rooftop dining, and cultural experiences. Perfect for experiencing royal India.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=60",
    },
    price: 9500,
    location: "Jaipur",
    country: "India",
  },

  // Unique & Special Stays
  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise with stunning forest views. Features outdoor deck, hammocks, and private nature trails.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60",
    },
    price: 7500,
    location: "Portland",
    country: "United States",
  },
  {
    title: "Desert Dome Under the Stars",
    description:
      "Sleep under the stars in this unique geodesic dome in the desert. 360-degree views, stargazing telescope, and sunrise yoga. A truly unique experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1509312809692-5f08c196bafd?auto=format&fit=crop&w=800&q=60",
    },
    price: 11000,
    location: "Joshua Tree",
    country: "United States",
  },
  {
    title: "Floating Houseboat in Kerala",
    description:
      "Cruise the tranquil backwaters of Kerala in this traditional houseboat. Includes private chef, cultural performances, and stops at local villages. An unforgettable experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1588401667987-e06480c453b5?auto=format&fit=crop&w=800&q=60",
    },
    price: 8000,
    location: "Alleppey",
    country: "India",
  },

  // Safari & Wildlife
  {
    title: "Safari Lodge in the Serengeti",
    description:
      "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close with expert guides, game drives, and bush dinners.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=60",
    },
    price: 42000,
    location: "Serengeti National Park",
    country: "Tanzania",
  },
  {
    title: "Kruger Safari Camp",
    description:
      "Luxury tented camp on the edge of Kruger National Park. Big Five game viewing, bush walks, and starlit dinners. Includes all meals and safari activities.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=60",
    },
    price: 38000,
    location: "Kruger National Park",
    country: "South Africa",
  },

  // Island & Tropical
  {
    title: "Private Island Retreat",
    description:
      "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience. Butler service, private chef, water sports, and complete privacy.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?auto=format&fit=crop&w=800&q=60",
    },
    price: 150000,
    location: "Fiji",
    country: "Fiji",
  },
  {
    title: "Luxury Overwater Villa Maldives",
    description:
      "Indulge in luxury in this overwater villa with glass floors, private pool, and direct ocean access. Watch dolphins and sea turtles from your deck. All-inclusive dining.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=60",
    },
    price: 85000,
    location: "Maldives",
    country: "Maldives",
  },
  {
    title: "Greek Island Santorini Villa",
    description:
      "Iconic white-washed villa with blue dome views. Private infinity pool overlooking the caldera. Perfect for sunset watching and romantic getaways.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=60",
    },
    price: 32000,
    location: "Santorini",
    country: "Greece",
  },

  // Indian Destinations
  {
    title: "Goa Beach House",
    description:
      "Stunning beach house in North Goa with private beach access. Modern amenities, pool, and perfect for parties or family gatherings. Walking distance to best restaurants and nightlife.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=60",
    },
    price: 12000,
    location: "Goa",
    country: "India",
  },
  {
    title: "Munnar Tea Estate Cottage",
    description:
      "Wake up to misty mountain views and endless tea gardens. This cozy cottage offers authentic Kerala hospitality, homemade food, and plantation tours.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=60",
    },
    price: 6500,
    location: "Munnar",
    country: "India",
  },
  {
    title: "Rishikesh Riverside Ashram",
    description:
      "Find your inner peace at this tranquil riverside ashram. Daily yoga and meditation, vegetarian meals, and spiritual experiences along the sacred Ganges.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Rishikesh",
    country: "India",
  },
  {
    title: "Udaipur Lake Palace Suite",
    description:
      "Experience royal living in this stunning lake-facing suite. Boat rides, heritage walks, and rooftop dining with views of the City Palace. True Rajasthani luxury.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
    },
    price: 22000,
    location: "Udaipur",
    country: "India",
  },
  {
    title: "Shimla Colonial Cottage",
    description:
      "Charming British-era cottage in the Queen of Hills. Wood-burning fireplace, mountain views, and easy access to Mall Road. Perfect for winter escapes.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1591019052241-e4d95a5dc3fc?auto=format&fit=crop&w=800&q=60",
    },
    price: 7500,
    location: "Shimla",
    country: "India",
  },
  {
    title: "Hyderabad Heritage Apartment",
    description:
      "Modern luxury apartment near Hussain Sagar Lake. Close to HITEC City and historic Charminar. Features gym, pool, and concierge. Perfect for business or leisure.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=60",
    },
    price: 8500,
    location: "Hyderabad",
    country: "India",
  },
];

// -------------------------------------------
// 🌱 Seed Function
// -------------------------------------------
async function seedDB() {
  try {
    await mongoose.connect(dbUrl);
    console.log("✅ Connected to MongoDB Atlas!");

    await Listing.deleteMany({});
    console.log("🗑️  Old listings removed!");

    await Listing.insertMany(sampleListings);
    console.log(`✅ ${sampleListings.length} sample listings inserted successfully!`);

    await mongoose.connection.close();
    console.log("✅ Database connection closed safely.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error while seeding DB:", err);
    process.exit(1);
  }
}

// -------------------------------------------
// Run Seeder
// -------------------------------------------
seedDB();
