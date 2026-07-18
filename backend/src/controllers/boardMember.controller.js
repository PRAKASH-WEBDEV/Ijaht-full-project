
const fs = require("fs/promises");
const path = require("path");
const BoardMember = require("../models/boardMember.model");

const imageMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
]);

// Build the stored photo object from an uploaded file (multer disk storage).
const buildPhoto = (file) => ({
  filename: file.filename,
  path: `uploads/${file.filename}`,
  mimetype: file.mimetype,
});

// Remove a previously uploaded photo from disk (best effort, never throws).
const removePhotoFile = async (photo) => {
  if (!photo?.path) return;

  try {
    await fs.unlink(path.resolve(photo.path));
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("Board member photo cleanup failed:", error.message);
    }
  }
};

// PUBLIC: active board members, ordered for display on the Editorial Board page.
exports.getPublicBoardMembers = async (req, res) => {
  try {
    const members = await BoardMember.find({ status: "active" }).sort({
      displayOrder: 1,
      createdAt: 1,
    });

    res.json(members);
  } catch (error) {
    console.error("Public board member fetch failed:", error.message);
    res.status(500).json({ message: "Unable to load board members" });
  }
};

// ADMIN: full list (active + inactive).
exports.getAllBoardMembers = async (req, res) => {
  try {
    const members = await BoardMember.find().sort({
      displayOrder: 1,
      createdAt: 1,
    });

    res.json(members);
  } catch (error) {
    console.error("Admin board member fetch failed:", error.message);
    res.status(500).json({ message: "Unable to load board members" });
  }
};

// ADMIN: create a new board member (optional photo upload).
exports.createBoardMember = async (req, res) => {
  try {
    const { name, designation, qualification, affiliation, displayOrder, status } =
      req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Member name is required" });
    }

    if (req.file && !imageMimeTypes.has(req.file.mimetype)) {
      return res.status(400).json({ message: "Photo must be a JPG, PNG, or WEBP image" });
    }

    const member = await BoardMember.create({
      name: name.trim(),
      designation: designation || "",
      qualification: qualification || "",
      affiliation: affiliation || "",
      displayOrder: Number(displayOrder) || 0,
      status: status === "inactive" ? "inactive" : "active",
      photo: req.file ? buildPhoto(req.file) : undefined,
    });

    res.status(201).json({ message: "Board member added", member });
  } catch (error) {
    console.error("Board member create failed:", error.message);
    res.status(500).json({ message: "Unable to add board member" });
  }
};

// ADMIN: update an existing board member (optional new photo replaces old).
exports.updateBoardMember = async (req, res) => {
  try {
    const member = await BoardMember.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ message: "Board member not found" });
    }

    const { name, designation, qualification, affiliation, displayOrder, status } =
      req.body;

    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({ message: "Member name is required" });
      }
      member.name = name.trim();
    }

    if (designation !== undefined) member.designation = designation;
    if (qualification !== undefined) member.qualification = qualification;
    if (affiliation !== undefined) member.affiliation = affiliation;
    if (displayOrder !== undefined) member.displayOrder = Number(displayOrder) || 0;
    if (status !== undefined) {
      member.status = status === "inactive" ? "inactive" : "active";
    }

    if (req.file) {
      if (!imageMimeTypes.has(req.file.mimetype)) {
        return res.status(400).json({ message: "Photo must be a JPG, PNG, or WEBP image" });
      }

      await removePhotoFile(member.photo);
      member.photo = buildPhoto(req.file);
    }

    await member.save();

    res.json({ message: "Board member updated", member });
  } catch (error) {
    console.error("Board member update failed:", error.message);
    res.status(500).json({ message: "Unable to update board member" });
  }
};

// ADMIN: delete a board member and its uploaded photo.
exports.deleteBoardMember = async (req, res) => {
  try {
    const member = await BoardMember.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({ message: "Board member not found" });
    }

    await removePhotoFile(member.photo);

    res.json({ message: "Board member deleted" });
  } catch (error) {
    console.error("Board member delete failed:", error.message);
    res.status(500).json({ message: "Unable to delete board member" });
  }
};
