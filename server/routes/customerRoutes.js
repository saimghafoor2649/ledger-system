import express from "express";
import {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";

const router = express.Router();

// Customer routes
router.post("/", createCustomer);
router.get("/", getCustomers);
router.put("/:customerId", updateCustomer); // Changed from :id to :customerId
router.delete("/:customerId", deleteCustomer); // Changed from :id to :customerId

export default router;
