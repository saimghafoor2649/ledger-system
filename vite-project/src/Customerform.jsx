import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Customerform.css";
import logo from "./assets/logo1_ramayworldzone.png";
import "./Sidebar";
import Sidebar from "./Sidebar";
function Customerform() {
  const [customerid, setcustomerid] = useState("");
  const [customername, setcustomername] = useState("");
  const [customerphoneno, setcustomerphoneno] = useState("");
  const [customers, setCustomers] = useState([]); // State to store customer data
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [editCustomerId, setEditCustomerId] = useState(null);

  const handleEdit = (customer) => {
    setcustomerid(customer.customerid); // Pre-fill Customer ID
    setcustomername(customer.customername); // Pre-fill Customer Name
    setcustomerphoneno(customer.customerphoneno); // Pre-fill Customer Phone
    setEditCustomerId(customer.customerid); // Set the ID of the customer being edited
  };
  const handleDelete = async (customerid) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        const res = await axios.delete(
          "http://localhost:8081/Customerform/${customerid}"
        );
        alert(res.data.message);
        // Fetch updated customers
        const response = await axios.get("http://localhost:8081/Customerform");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error deleting customer:", error);
        alert("Failed to delete customer.");
      }
    }
  };

  useEffect(() => {
    // Fetch customers from the database
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8081/Customerform");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  const customerinfo = async (event) => {
    event.preventDefault();
    if (!customername || !customerphoneno) {
      alert("All fields are required.");
      return;
    }

    try {
      if (editCustomerId) {
        // Update existing customer
        const res = await axios.put(
          `http://localhost:8081/Customerform/${editCustomerId}`,
          {
            customername,
            customerphoneno,
          }
        );
        alert(res.data.message);
        setEditCustomerId(null); // Clear the edit state
      } else {
        // Add new customer
        const res = await axios.post("http://localhost:8081/Customerform", {
          customerid,
          customername,
          customerphoneno,
        });
        alert(res.data.message);
      }
      setcustomerid(""); // Reset the form
      setcustomername("");
      setcustomerphoneno("");
    } catch (err) {
      console.error(err);
      if (err.response) {
        alert(err.response.data.error);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  // Filter customers based on the search term
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.customername.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customerphoneno.includes(searchTerm)
  );

  return (
    <>
      <div className="row">
        <Sidebar />
        <main className="p-4 bg-light rounded shadow col-12 col-md-9 mt-4">
          <h2>Customer Form</h2>
          <div className="container border-black border-3 shadow col-md-6">
            <form>
              <ul>
                <li>
                  <label className="fw-bold" htmlFor="id">
                    Customer ID
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    min="0"
                    placeholder="Customer ID"
                    value={customerid}
                    onChange={(e) => setcustomerid(e.target.value)}
                    disabled={!!editCustomerId} // Disable ID during edit
                  />
                </li>
                <li>
                  <label className="fw-bold" htmlFor="Name">
                    Name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    value={customername}
                    onChange={(e) => setcustomername(e.target.value)}
                  />
                </li>
                <li>
                  <label className="fw-bold" htmlFor="Phoneno">
                    Phone Number
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    min="0"
                    placeholder="Phone Number"
                    value={customerphoneno}
                    onChange={(e) => setcustomerphoneno(e.target.value)}
                  />
                </li>
                <li>
                  <input
                    onClick={customerinfo}
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
                  <th>Customer ID</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.customerid}>
                      <td>{customer.customerid}</td>
                      <td>{customer.customername}</td>
                      <td>{customer.customerphoneno}</td>
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
                          className="btn btn-primary"
                          onClick={() => handleDelete(customer.customerid)}
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
