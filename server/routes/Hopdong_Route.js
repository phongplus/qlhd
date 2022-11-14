const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/Auth");
const Hopdong = require("../models/Hopdong_Model");

router.post("/", verifyToken, async (req, res) => {
  const { congty, maso } = req.body;

  if (!congty || !maso)
    return res
      .status(400)
      .json({ success: false, message: "Cong ty hoac ma so is required" });

  try {
    const newHopdong = new Hopdong({
      congty,
      maso,
      user: req.userId,
    });

    await newHopdong.save();

    res.json({ success: true, hopdong: newHopdong });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
