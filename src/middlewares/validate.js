import User from "../models/user.js";
import jwt from "jsonwebtoken";
import config from "../../config/config.js";

export const validateRegBody = async (req, res, next) => {
  const { body } = req;
  if (!body.name || body.name === "") {
    return res
      .status(406)
      .json({ msg: "Name is required & should not be empty!" });
  }
  if (!body.email || body.email === "") {
    return res
      .status(406)
      .json({ msg: "Email is required & should not be empty!" });
  }
  const email = await User.findOne({ email: body.email });
  if (email) {
    return res.status(409).json({ msg: "Email is already present!" });
  }

  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

  if (!body.password || !re.test(body.password)) {
    return res.status(406).json({
      msg: "Password should consist of minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character!",
    });
  }

  if (!body.referralToken) {
    next();
  } else {
    const decoded = jwt.verify(body.referralToken, config.jwtSecret);
    const { email: referredEmail } = decoded;
    const referrer = await User.findOne({ email: referredEmail });
    if (!referrer) {
      return res.status(404).json({
        msg: "referralToken Not Found!",
      });
    }
    req.body.referrerId = referrer.id;
    next();
  }
};

export const validateLoginBody = async (req, res, next) => {
  const { body } = req;
  if (!body.email || body.email === "") {
    return res
      .status(400)
      .json({ msg: "Email is required & should not be empty!" });
  }

  if (!body.password || body.password === "") {
    return res.status(400).json({
      msg: "Password should not be empty!",
    });
  }
  next();
};

const validate = {
  validateLoginBody,
  validateRegBody,
};

export default validate;
