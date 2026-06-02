const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadsDir = path.resolve(__dirname, "../../uploads");

fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    const safeName = path
      .basename(file.originalname)
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9._-]/g, "");
    cb(null, Date.now() + "-" + safeName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    // Documents (Keep these if you use this middleware for manuscript uploads too)
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    // ADDED IMAGES: Allow profile pictures
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp"
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPG, PNG, PDF, and DOC are allowed."), false);
  }
};

module.exports = multer({ storage, fileFilter });
