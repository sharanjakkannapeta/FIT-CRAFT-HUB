const express = require("express");
const router = express.Router();

let products = [];

// GET products
router.get("/", (req, res) => {
  res.json(products);
});

// POST product
router.post("/", (req, res) => {
  try {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const newProduct = {
      _id: Date.now().toString(),
      name,
      price,
      image
    };

    products.push(newProduct);

    res.json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE product
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  products = products.filter(p => p._id !== id);

  res.json({ message: "Deleted" });
});

module.exports = router;