const mongoose = require("mongoose");

const boardMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      default: "",
      trim: true,
    },
    qualification: {
      type: String,
      default: "",
      trim: true,
    },
    affiliation: {
      type: String,
      default: "",
      trim: true,
    },
    photo: {
      filename: String,
      path: String,
      mimetype: String,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BoardMember", boardMemberSchema);
