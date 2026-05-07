const router = require("express").Router();
const Order = require("../models/Order");

// Place order (COD supported)
router.post("/", async (req, res) => {
  router.post("/", async (req, res) => {
  try {
    const order = new Order({
      products: req.body.products,
      amount: req.body.amount,
      paymentMethod: req.body.paymentMethod || "COD",
      status: "Order Placed",
      customer: req.body.customer
    });

    await order.save();
    res.json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
});

// Get all orders (admin)
router.get("/", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// Get single order (tracking)
router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
});

// Update order status
router.put("/:id", async (req, res) => {
  const updated = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(updated);
});

module.exports = router;
// Get orders by phone number
router.get("/my-orders/:phone", async (req, res) => {
  try {
    const orders = await Order.find({
      "customer.phone": req.params.phone
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});