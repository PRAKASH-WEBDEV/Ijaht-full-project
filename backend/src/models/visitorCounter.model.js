const mongoose = require("mongoose");

const visitorCounterSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "site",
    },
    count: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("VisitorCounter", visitorCounterSchema);
