# 🏠 TripTales - Airbnb Clone

A full-stack vacation rental platform inspired by Airbnb, built with Node.js, Express, MongoDB, and EJS.

---

## 🔗 Live Demo

### **👉 [Visit TripTales Live](https://triptales-8b6r.onrender.com)**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-FF385C?style=for-the-badge)](https://triptales-8b6r.onrender.com)

---

## ✨ Features

### Core Functionality
- 🏡 **Browse Listings** - View vacation rentals with images, prices, and locations
- 🔍 **Search** - Find properties by title, location, or country
- ➕ **Create Listings** - Host your property with image upload
- ✏️ **Edit/Delete** - Manage your own listings
- ⭐ **Reviews** - Leave star ratings and comments
- 🔐 **Authentication** - Secure signup/login with Passport.js

### Premium UI Features
- 🎨 **Airbnb-Inspired Design** - Modern, clean interface
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 🏷️ **Category Filters** - Browse by Trending, Beach, Mountains, Castles, etc.
- ❤️ **Wishlist Hearts** - Save favorite properties
- 📱 **Responsive** - Works on desktop, tablet, and mobile
- ✨ **Animations** - Smooth transitions and micro-interactions

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose |
| **Frontend** | EJS, Bootstrap 5, CSS3 |
| **Auth** | Passport.js, Express-Session |
| **Images** | Cloudinary, Multer |
| **Deployment** | Render |

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/Anil2995/TripTales.git
cd TripTales
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
```

### 4. Run the application
```bash
node app.js
```

### 5. Open in browser
```
http://localhost:8080
```

---

## 📁 Project Structure

```
TripTales/
├── controllers/     # Route handlers
├── models/          # MongoDB schemas
├── routes/          # Express routes
├── views/           # EJS templates
├── public/          # CSS, JS, images
├── init/            # Database seeder
├── utils/           # Helper functions
└── app.js           # Main application
```

---

## 🔑 Key Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/listings` | Browse all listings |
| Search | `/listings/search?q=query` | Search results |
| View Listing | `/listings/:id` | Property details |
| Create | `/listings/new` | Add new listing |
| Login | `/login` | User login |
| Signup | `/signup` | User registration |

---

## 👨‍💻 Author

**Siddem Anil Kumar**

[![GitHub](https://img.shields.io/badge/GitHub-Anil2995-181717?style=flat-square&logo=github)](https://github.com/Anil2995)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/siddem-anil-kumar)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

### 🌐 **[Open Live Demo](https://triptales-8b6r.onrender.com)**

**⭐ Star this repo if you found it helpful!**

</div>
