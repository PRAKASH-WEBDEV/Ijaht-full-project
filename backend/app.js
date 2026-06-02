const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./src/routes/auth.routes");
const adminRoutes = require("./src/routes/admin.routes");
const userRoutes = require("./src/routes/user.routes");
const { getCorsOrigins } = require("./src/config/env");
const app = express();

const allowedOrigins = getCorsOrigins();
const uploadsDir = path.resolve(__dirname, "uploads");

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);

// Admin Login API
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/contact", require("./src/routes/contact.routes"));
app.use("/api/newsletter", require("./src/routes/newsletter.routes"));
// Manuscript APIs
app.use("/api/manuscript", require("./src/routes/manuscript.routes"));

// Uploaded files
app.use(
  "/uploads",
  express.static(uploadsDir, {
    fallthrough: false,
    index: false,
  })
);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error("Unhandled API error:", {
    method: req.method,
    path: req.originalUrl,
    message: err.message,
  });

  return res.status(err.status || 500).json({
    message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
  });
});

module.exports = app;
