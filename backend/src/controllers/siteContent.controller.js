const SiteContent = require("../models/siteContent.model");

/**
 * Default content for known CMS keys. Used as a fallback so the website and the
 * admin editor always show sensible content even before the block has been
 * saved to the database for the first time.
 */
const defaults = {
  "reviewer-how-to-apply": {
    heading: "How to Apply?",
    content: "Send your updated CV to support@ijaht.com",
  },
};

// PUBLIC + ADMIN: read a content block by key (falls back to defaults).
exports.getSiteContent = async (req, res) => {
  try {
    const { key } = req.params;
    const existing = await SiteContent.findOne({ key });

    if (existing) {
      return res.json({
        key: existing.key,
        heading: existing.heading,
        content: existing.content,
      });
    }

    const fallback = defaults[key] || { heading: "", content: "" };
    res.json({ key, ...fallback });
  } catch (error) {
    console.error("Site content fetch failed:", error.message);
    res.status(500).json({ message: "Unable to load content" });
  }
};

// ADMIN: create or update a content block by key.
exports.updateSiteContent = async (req, res) => {
  try {
    const { key } = req.params;
    const { heading = "", content = "" } = req.body;

    const updated = await SiteContent.findOneAndUpdate(
      { key },
      { key, heading, content },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({
      message: "Content updated",
      data: {
        key: updated.key,
        heading: updated.heading,
        content: updated.content,
      },
    });
  } catch (error) {
    console.error("Site content update failed:", error.message);
    res.status(500).json({ message: "Unable to update content" });
  }
};
