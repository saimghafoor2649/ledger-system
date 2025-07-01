import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Name: String,
  Email: { type: String, unique: true },
  Password: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

export default mongoose.model("User", userSchema);
