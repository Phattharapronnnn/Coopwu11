const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const Image = require("../models/image");

router.get("/", async (req, res) => {
  console.log("Find All Image");
  try {
    const result = await Image.find();
    res.json({ rows: result });
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

router.get("/:id", async (req, res) => {
  console.log("Find All Image");
  try {
    const result = await Image.findById(req?.params?.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newImage = new Image(req.body);
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    console.error("Error creating image:", error);
    res.status(400).json({ error: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  console.log("Delete Images");
  try {
    const result = await Image.findByIdAndDelete(req?.params?.id);
    res.status(204).json(result);
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

router.put("/:id", async (req, res) => {
  const imageId = req.params.id;
  const updateData = req.body;
  try {
    const updatedImage = await Image.findByIdAndUpdate(imageId, updateData, { new: true });
    if (!updatedImage) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.json(updatedImage);
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

module.exports = router;
