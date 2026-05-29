const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/auth.routes");
const adminRoutes = require("./src/routes/admin.routes");
const userRoutes = require("./src/routes/user.routes");
const app = express();

app.use(cors());
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
app.use("/uploads", express.static("uploads"));

module.exports = app;
