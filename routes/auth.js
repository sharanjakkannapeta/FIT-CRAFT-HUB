const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

router.post("/signup", async (req,res)=>{
  const hash = await bcrypt.hash(req.body.password,10);
  const user = await User.create({
    email:req.body.email,
    password:hash
  });
  res.json(user);
});

router.post("/login", async (req,res)=>{
  const user = await User.findOne({email:req.body.email});
  const valid = await bcrypt.compare(req.body.password,user.password);
  if(!valid) return res.send("Invalid");

  const token = jwt.sign({id:user._id},"secret");
  res.json({token});
});

module.exports = router;