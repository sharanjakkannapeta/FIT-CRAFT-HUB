require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
// import route
const productRoutes = require("./routes/products");

// use route
app.use("/api/products", productRoutes);

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// Routes
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/payment", require("./routes/payment"));

// Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  const paymentRoutes = require("./routes/payment");
app.use("/api/payment", paymentRoutes);
});
let products = [];

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/products", (req, res) => {
  const { name, price, image } = req.body;

  const newProduct = {
    _id: Date.now().toString(),
    name,
    price,
    image
  };

  products.push(newProduct);

  res.json(newProduct);
});