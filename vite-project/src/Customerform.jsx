import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Customerform.css";
import logo from "./assets/logo1_ramayworldzone.png";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

function Customerform() {
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editCustomerId, setEditCustomerId] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/customers");
        setCustomers(response.data.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        toast.error("Failed to load customers");
      }
    };
    fetchCustomers();
  }, []);

  const handleEdit = (customer) => {
    setName(customer.name);
    setPhoneNo(customer.phoneNo);
    setEditCustomerId(customer.customerId);
  };

  const handleDelete = async (customerId) => {
    // Changed parameter name from id to customerId
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`http://localhost:8081/api/customers/${customerId}`);
        const response = await axios.get("http://localhost:8081/api/customers");
        setCustomers(response.data.data);
        toast.success("Customer deleted successfully");
      } catch (error) {
        console.error("Error deleting customer:", error);
        toast.error(
          error.response?.data?.message || "Failed to delete customer"
        );
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !phoneNo) {
      toast.error("All fields are required");
      return;
    }

    try {
      if (editCustomerId) {
        // Update existing customer - ensure using customerId
        await axios.put(
          `http://localhost:8081/api/customers/${editCustomerId}`,
          {
            name,
            phoneNo,
          }
        );
        toast.success("Customer updated successfully");
      } else {
        // Add new customer
        await axios.post("http://localhost:8081/api/customers", {
          name,
          phoneNo,
        });
        toast.success("Customer created successfully");
      }

      // Reset form and refresh list
      setName("");
      setPhoneNo("");
      setEditCustomerId(null);
      const response = await axios.get("http://localhost:8081/api/customers");
      setCustomers(response.data.data);
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.data?.code === 11000) {
        toast.error("Phone number already exists");
      } else {
        toast.error(
          error.response?.data?.message || "An error occurred. Please try again"
        );
      }
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phoneNo.includes(searchTerm)
  );

  return (
    <>
      <div className="row">
        <Sidebar />
        <main className="p-4 bg-light rounded shadow col-12 col-md-9 mt-4">
          <h2>Customer Form</h2>
          <div className="container border-black border-3 shadow col-md-6">
            <form onSubmit={handleSubmit}>
              <ul>
                <li>
                  <label className="fw-bold" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </li>
                <li>
                  <label className="fw-bold" htmlFor="phoneNo">
                    Phone Number
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Phone Number"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </li>
                <li>
                  <input
                    className="btn btn-success w-30"
                    type="submit"
                    value={editCustomerId ? "Update" : "Submit"}
                  />
                </li>
              </ul>
            </form>
          </div>

          <div className="mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or phone number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <h3 className="mt-4">Customer List</h3>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.customerId}>
                      <td>{customer.customerId}</td>
                      <td>{customer.name}</td>
                      <td>{customer.phoneNo}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEdit(customer)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(customer.customerId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}

export default Customerform;
