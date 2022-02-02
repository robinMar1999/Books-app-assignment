import { Router } from "express";
import User from "../models/user.js";
import auth from "../middlewares/auth.js";
import config from "../../config/config.js";

const router = Router();

// @route   POST pay/
// @desc    Make Payment
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (user.isPaymentMade) {
      return res.json({ msg: "Non-first Payment Successful" });
    }
    user.isPaymentMade = true;
    await user.save();
    if (user.referredUser) {
      const referredUser = await User.findById(user.referredUser);
      referredUser.totalEarnings += 10;
      await referredUser.save();
    }
    res.json({ msg: "First Payment Successful!" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;
