const express = require("express");
const upload = require("../middlewares/upload.middleware");
const controller = require("../controllers/boardMember.controller");
const { adminProtect } = require("../middlewares/auth.middleware");

const router = express.Router();

// Public: active board members for the Editorial Board page.
router.get("/", controller.getPublicBoardMembers);

// Admin: full CRUD management.
router.get("/admin/list", adminProtect, controller.getAllBoardMembers);
router.post("/", adminProtect, upload.single("photo"), controller.createBoardMember);
router.put("/:id", adminProtect, upload.single("photo"), controller.updateBoardMember);
router.delete("/:id", adminProtect, controller.deleteBoardMember);

module.exports = router;
