import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import { validateRegBody, validateLoginBody } from "../middlewares/validate.js";
import config from "../../config/config.js";

const router = Router();

// @route   POST auth/register
// @desc    Register New User
// @access  Public
router.post("/register", validateRegBody, async (req, res) => {
  try {
    const { name, email, password, referrerId } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const referralToken = jwt.sign({ email }, config.jwtSecret);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      referralToken,
    });
    if (referrerId) {
      user.referredUser = referrerId;
    }
    await user.save();
    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    res.status(201).json({ token, referralToken });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// @route   POST auth/login
// @desc    Login User
// @access  Public
router.post("/login", validateLoginBody, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    res.status(201).json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// @route   Delete auth/
// @desc    Development route to delete all users
// @access  Public
router.delete("/", async (req, res) => {
  try {
    await User.deleteMany();
    res.status(200).json({ msg: "All users deleted!" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;
