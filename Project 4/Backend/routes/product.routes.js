const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const Product = require("../models/Product");
const Image = require("../models/image");

router.get("/", async (req, res) => {
  console.log("Find All Product");
  try {
    const result = await Product.find().populate("pImage");
    res.json({ rows: result });
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

router.get("/:id", async (req, res) => {
  console.log("Find Product by ID");
  try {
    const productId = req.params.id;
    const populateImage = req.query.populateImage === 'true';

    let result;
    if (populateImage) {
      result = await Product.findById(productId).populate("pImage");
    } else {
      result = await Product.findById(productId);
    }
    if (!result) {
      return res.status(404).json({ err: "Product not found" });
    }
    res.json(result);
  }
  catch (error) {
    res.status(404).json({ err: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const playload = req.body
    if (
      req.body.pImage
    ) {
      console.log(req.body)
      const newImage = new Image({ url: req.body.pImage });
      await newImage.save();
      playload.pImage = newImage._id
    }
    const newProduct = new Product(playload);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ error: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  console.log("Delete Products");
  try {
    const result = await Product.findByIdAndDelete(req?.params?.id);
    res.status(204).json(result);
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  try {
    if (
      req.body.pImage
    ) {
      try {
        const foundImage = await Image.findById(req.body.pImage)
        console.log(foundImage)
      } catch (error) {
        const newImage = new Image({ url: req.body.pImage });
        await newImage.save();
        updateData.pImage = newImage._id
      }
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, { $set: updateData });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

module.exports = router;
