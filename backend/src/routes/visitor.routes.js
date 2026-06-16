const express = require("express");
const { trackVisit } = require("../controllers/visitor.controller");

const router = express.Router();

router.post("/", trackVisit);

module.exports = router;
