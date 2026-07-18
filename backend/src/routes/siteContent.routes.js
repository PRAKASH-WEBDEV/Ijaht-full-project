const express = require("express");
const controller = require("../controllers/siteContent.controller");
const { adminProtect } = require("../middlewares/auth.middleware");

const router = express.Router();

// Public: read an editable content block by key.
router.get("/:key", controller.getSiteContent);

// Admin: create or update a content block by key.
router.put("/:key", adminProtect, controller.updateSiteContent);

module.exports = router;
