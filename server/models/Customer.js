import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";

const AutoIncrementPlugin = AutoIncrement(mongoose);

const customerSchema = new mongoose.Schema(
  {
    customerId: {
      // New numeric ID field
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Apply auto-increment plugin to customerId instead of _id
customerSchema.plugin(AutoIncrementPlugin, {
  inc_field: "customerId",
  id: "customer_id",
  start_seq: 1,
});

export default mongoose.model("Customer", customerSchema);
