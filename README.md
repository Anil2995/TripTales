# 🏠 TripTales - Airbnb Clone

<div align="center">

![TripTales Logo](https://img.shields.io/badge/TripTales-FF385C?style=for-the-badge&logo=airbnb&logoColor=white)

**A premium, full-featured vacation rental platform inspired by Airbnb**

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=flat-square&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

[Live Demo](#) • [Features](#-features) • [Installation](#-installation) • [Technologies](#-technologies)

</div>

---

## ✨ Features

### 🎨 Premium UI/UX Design
- **Airbnb-Inspired Interface** - Modern, clean design that mirrors the world's leading vacation rental platform
- **Dark Mode Support** - Toggle between light and dark themes with persistent preference storage
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - Fade-in effects, card animations, and micro-interactions
- **Custom Scrollbars** - Styled scrollbars matching the overall design aesthetic

### 🔍 Advanced Search & Filtering
- **Smart Search** - Search by title, location, or country name
- **Category Filters** - Filter by property types: Trending, Mountains, Beaches, Castles, Pools, Camping, Farms, and more
- **Tax Toggle** - Display total prices with or without taxes

### 🏡 Listing Features
- **Image Upload** - Cloudinary integration for high-quality image storage
- **Guest Favourite Badges** - Highlight top-rated properties
- **Wishlist System** - Heart icons to save favorite listings
- **Star Ratings** - Visual rating display with interactive stars
- **Price Formatting** - Indian Rupee formatting with locale support

### 📄 Property Details Page
- **Hero Image Gallery** - Full-width property images with gallery view
- **Host Information** - Owner details with avatar and stats
- **Property Highlights** - Self check-in, free cancellation, fast wifi
- **Amenities Grid** - Wifi, TV, Kitchen, Parking, A/C, and more
- **Sticky Booking Card** - Price breakdown with reserve functionality
- **Share & Save** - Share listings via native share API

### ⭐ Reviews System
- **Star Rating Input** - Beautiful starability widget for ratings
- **User Reviews** - Display reviews with author avatars
- **Delete Protection** - Only authors and owners can delete reviews

### 🔐 Authentication
- **User Registration** - Secure signup with password strength indicator
- **Login System** - Session-based authentication with Passport.js
- **Social Login UI** - Google, Facebook, Apple login buttons (UI ready)
- **Protected Routes** - Middleware for authenticated actions

### 🦶 Premium Footer
- **Multi-Column Layout** - Support, Hosting, TripTales, and Explore sections
- **Social Links** - Facebook, Twitter, Instagram, LinkedIn, GitHub
- **Legal Links** - Terms, Privacy, Sitemap

---

## 🛠️ Technologies

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB Atlas** | Cloud database |
| **Mongoose** | ODM for MongoDB |
| **Passport.js** | Authentication |
| **Express Session** | Session management |
| **Connect-Mongo** | Session store |
| **Cloudinary** | Image storage |
| **Multer** | File uploads |
| **Joi** | Schema validation |

### Frontend
| Technology | Purpose |
|------------|---------|
| **EJS** | Templating engine |
| **Bootstrap 5** | CSS framework |
| **Font Awesome 6** | Icons |
| **Plus Jakarta Sans** | Typography |
| **Animate.css** | Animations |
| **Custom CSS** | Premium styling |

---

## 🚀 Installation

### Prerequisites
- Node.js 18.x or higher
- MongoDB Atlas account
- Cloudinary account

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/triptales.git
   cd triptales
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   # Create .env file with the following variables:
   ATLASDB_URL=your_mongodb_atlas_connection_string
   SECRET=your_session_secret_key
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```

4. **Seed the database (optional)**
   ```bash
   cd init
   node data.js
   ```

5. **Start the server**
   ```bash
   node app.js
   ```

6. **Open in browser**
   ```
   http://localhost:8080
   ```

---

## 📁 Project Structure

```
TripTales/
├── controllers/          # Route controllers
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── init/                 # Database seeder
│   └── data.js
├── models/               # Mongoose schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── public/               # Static assets
│   ├── css/
│   │   ├── style.css     # Main stylesheet (1400+ lines)
│   │   └── rating.css    # Star rating styles
│   └── js/
│       └── script.js     # Client-side JavaScript
├── routes/               # Express routes
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── utils/                # Utility functions
│   ├── ExpressError.js
│   └── wrapAsync.js
├── views/                # EJS templates
│   ├── includes/
│   │   ├── flash.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── listings/
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   ├── users/
│   │   ├── login.ejs
│   │   └── signup.ejs
│   └── error.ejs
├── app.js                # Main application file
├── cloudConfig.js        # Cloudinary configuration
├── middleware.js         # Custom middleware
├── schema.js             # Joi validation schemas
└── package.json
```

---

## 🎯 Key Design Features

### CSS Custom Properties
The design system uses CSS variables for consistent theming:
- `--primary: #FF385C` (Airbnb-style red)
- `--dark: #222222`
- `--grey: #717171`
- `--shadow-md`, `--shadow-lg` for elevation
- `--radius-sm`, `--radius-lg` for border radius
- `--transition-fast`, `--transition-normal` for animations

### Dark Mode
Toggle between themes with persistent localStorage:
```javascript
[data-theme="dark"] {
  --dark: #FFFFFF;
  --background: #121212;
  --border: #333333;
}
```

### Responsive Breakpoints
- **1200px**: Layout adjustments
- **992px**: Gallery and grid changes
- **768px**: Mobile navigation
- **576px**: Compact layouts

---

## 🔮 Future Enhancements

- [ ] Map integration with Mapbox
- [ ] Real booking system with dates
- [ ] Payment integration (Stripe/Razorpay)
- [ ] Host dashboard
- [ ] Messaging system
- [ ] Email notifications
- [ ] Social login implementation
- [ ] Advanced filtering (price range, amenities)
- [ ] Multi-image gallery per listing
- [ ] User profile pages

---

## 👨‍💻 Author

**Siddem Anil Kumar**

- GitHub: [@Anil2995](https://github.com/Anil2995)
- LinkedIn: [Siddem Anil Kumar](#)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ and lots of ☕**

⭐ Star this repo if you found it helpful!

</div>
