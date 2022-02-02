import mongoose from "mongoose";

const { model, Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    referredUser: {
      type: Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    isPaymentMade: {
      type: Boolean,
      default: false,
    },
    totalEarnings: {
      type: Number,
      default: 0,
    },
    referralToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = model("user", userSchema);

export default User;
