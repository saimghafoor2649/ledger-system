import Customer from "../models/Customer.js";

// Create a new customer
export const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: customer,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Phone number already exists",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to create customer",
      error: error.message,
    });
  }
};

// Get all customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({
      success: true,
      count: customers.length,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch customers",
      error: error.message,
    });
  }
};

// Update a customer - Modified version
export const updateCustomer = async (req, res) => {
  try {
    // Convert ID to number since params are strings
    const customerId = Number(req.params.customerId);

    const customer = await Customer.findOneAndUpdate({ customerId }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
        details: `No customer found with ID: ${customerId}`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: customer,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update customer",
      error: error.message,
    });
  }
};

// Delete a customer
// Delete a customer - Modified version
export const deleteCustomer = async (req, res) => {
  try {
    // Convert ID to number
    const customerId = Number(req.params.customerId);

    const customer = await Customer.findOneAndDelete({
      customerId,
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
        details: `No customer found with ID: ${customerId}`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
      deletedId: customerId,
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete customer",
      error: error.message,
    });
  }
};
