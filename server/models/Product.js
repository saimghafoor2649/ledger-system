import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Product", productSchema);
