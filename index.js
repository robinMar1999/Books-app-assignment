import express, { json } from "express";
import connectDB from "./db/mongoose.js";
import authRoutes from "./src/routes/auth.js";
import payRoutes from "./src/routes/pay.js";

const app = express();
const port = process.env.PORT || 5000;

// connect to database
connectDB();

app.use(json());

app.use("/auth", authRoutes);
app.use("/pay", payRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
