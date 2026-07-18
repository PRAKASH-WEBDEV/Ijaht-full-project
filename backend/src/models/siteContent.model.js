const mongoose = require("mongoose");

/**
 * Generic key-based CMS content store.
 * Each editable content block on the website (e.g. the Reviewer "How to Apply"
 * section) is stored as a single document identified by a unique `key`.
 * This keeps small editable text blocks CMS-managed without a dedicated model
 * per block, and stays backward compatible as new keys are added.
 */
const siteContentSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    heading: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SiteContent", siteContentSchema);
