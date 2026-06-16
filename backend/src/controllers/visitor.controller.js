const VisitorCounter = require("../models/visitorCounter.model");

exports.trackVisit = async (req, res) => {
  try {
    const shouldIncrement = req.body?.increment !== false;
    const update = shouldIncrement ? { $inc: { count: 1 } } : { $setOnInsert: { count: 0 } };

    const counter = await VisitorCounter.findOneAndUpdate(
      { key: "site" },
      update,
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );

    res.json({ count: counter.count });
  } catch (error) {
    console.error("Visitor counter update failed:", {
      message: error.message,
      code: error.code,
    });
    res.status(500).json({ message: "Visitor counter unavailable" });
  }
};
