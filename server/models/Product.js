import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";

const AutoIncrementPlugin = AutoIncrement(mongoose);
const productSchema = new mongoose.Schema({
  productId: {
    // New numeric ID field
    type: Number,
    unique: true,
  },
  productname: {
    type: String,
    required: true,
  },
});
productSchema.plugin(AutoIncrementPlugin, {
  inc_field: "productId",
  id: "product_id",
  start_seq: 1,
});
export default mongoose.model("Product", productSchema);
