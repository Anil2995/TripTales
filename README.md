# 🌍 Triptales – Travel Listing Web App

## 🌐 Live Demo
🔗 [https://triptales-8b6r.onrender.com](https://triptales-8b6r.onrender.com)

---

## 📖 Overview
**Triptales** is a full-stack travel listing web application inspired by Airbnb.
It allows users to **create, browse, review, and manage travel destinations** with ease.
The app is built with **Node.js, Express, MongoDB, and EJS**, and supports authentication, flash messages, and responsive UI design.

---

## ⚙️ Tech Stack

| Category | Technologies Used |
|-----------|-------------------|
| **Frontend** | EJS, HTML5, CSS3, Bootstrap, JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **Authentication** | Passport.js (Local Strategy) |
| **Session Management** | express-session, connect-mongo |
| **Templating Engine** | EJS with ejs-mate |
| **Hosting** | Render (Server) + MongoDB Atlas (Database) |

---

## 🚀 Features

✅ User authentication (Sign up, Login, Logout)  
✅ Create, edit, and delete travel listings  
✅ Upload and manage listing images  
✅ Add and manage user reviews with ratings  
✅ Flash messages for user feedback  
✅ Responsive and modern UI  
✅ Secure password hashing with Passport-Local-Mongoose  
✅ Persistent sessions stored in MongoDB  

---

## 🗂️ Project Structure

```
TRIPTALES/
│
├── app.js                # Main application file
├── init/                 # Database seeding scripts
├── models/               # Mongoose schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/               # Express route handlers
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── public/               # Static assets (CSS, JS, images)
│
├── views/                # EJS templates
│   ├── listings/
│   ├── users/
│   └── partials/
│
├── utils/                # Custom error handling, middleware
├── .env                  # Environment variables (not pushed to GitHub)
├── package.json
└── README.md
```

---

## 🔧 Environment Variables

Create a `.env` file in your project root directory and add the following:
```
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
NODE_ENV=development
```

---

## 🛠️ Setup Instructions

1️⃣ **Clone the repository**
```bash
git clone https://github.com/yourusername/triptales.git
cd triptales
```

2️⃣ **Install dependencies**
```bash
npm install
```

3️⃣ **Configure environment variables**
Create a `.env` file and add your MongoDB Atlas URL and secret key.

4️⃣ **Seed the database**
```bash
node init/index.js
```

5️⃣ **Run the application**
```bash
node app.js
```

6️⃣ **Open in your browser**
```
http://localhost:8080
```

---

## 🧠 Future Enhancements

🔹 Add **Cloudinary** for image uploads  
🔹 Add **Search and Filter** functionality  
🔹 Add **User Profile Management**  

---

## 👨‍💻 Author
**Siddem Anil Kumar**  
📧 siddemanilkumar@gmail.com  
📍 Built with ❤️ using Node.js, Express, and MongoDB
