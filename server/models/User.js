import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Name: String,
  Email: { type: String, unique: true },
  Password: String,
});

export default mongoose.model("User", userSchema);
