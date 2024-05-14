const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  console.log("Find All Users");
  try {
    const result = await User.find();
    res.json({ rows: result });
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

router.get("/:id", async (req, res) => {
  console.log("Find All Users");
  try {
    const result = await User.findById(req?.params?.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

router.post("/", async (req, res) => {
  console.log("Create User Body", req.body);
  const newUser = new User(req.body);
  try {
    await newUser.save({});
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ err: error });
  }
});
router.delete("/:id", async (req, res) => {
  console.log("Delete Users");
  try {
    const result = await User.findByIdAndDelete(req?.params?.id);
    res.status(204).json(result);
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

router.put("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

module.exports = router;
