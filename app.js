if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");

// Routers
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// Session & Auth
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// -------------------------------------------
//  Database Connection
// -------------------------------------------
const dbUrl = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbUrl);
}
main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(" MongoDB Connection Error:", err));

// -------------------------------------------
// 🔧 App Configuration
// -------------------------------------------
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

// -------------------------------------------
//  Session Store
// -------------------------------------------
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600, // update session every 24h
});

store.on("error", (err) => {
  console.log(" ERROR IN MONGO SESSION STORE:", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// -------------------------------------------
//  Passport Configuration
// -------------------------------------------
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// -------------------------------------------
//  Global Middleware ( Must be above routes)
// -------------------------------------------
app.use((req, res, next) => {
  res.locals.currUser = req.user || null; // safe default
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});


// -------------------------------------------
//  Routes
// -------------------------------------------
app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// -------------------------------------------
// Test Route (optional)
// -------------------------------------------
app.get("/test", (req, res) => {
  res.send(req.headers);
});

// -------------------------------------------
//  Error Handling Middleware
// -------------------------------------------
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", {
    message,
    success: req.flash("success"),
    error: req.flash("error"),
  });
});


// -------------------------------------------
// Server Start
// -------------------------------------------
app.listen(8080, () => {
  console.log(" Server running on http://localhost:8080");
});
