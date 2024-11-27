import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Customerform.css";

function Customerform() {
  const [customerid, setcustomerid] = useState("");
  const [customername, setcustomername] = useState("");
  const [customerphoneno, setcustomerphoneno] = useState("");
  const customerinfo = async (event) => {
    event.preventDefault();
    if (!customerid || !customername || !customerphoneno) {
      alert("All fields are required.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8081/Customerform", {
        customerid,
        customername,
        customerphoneno,
      });
      alert(res.data.message, "Customer add successfully");
    } catch (err) {
      console.error(err);
      if (err.response) {
        alert(err.response.data.error);
      } else {
        alert("Customer info has not been add. Please try again");
      }
    }
  };
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
        <div class="container-fluid d-flex justify-content-between">
          <div class="collapse navbar-collapse d-flex">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row gap-3">
              <li class="nav-item d-inline">
                <a class="nav-link active" href="/login">
                  Login
                </a>
              </li>
              <li class="nav-item d-inline">
                <a class="nav-link active" href="/register">
                  Signup
                </a>
              </li>
              <li class="nav-item d-inline">
                <a class="nav-link" href="/home">
                  Home
                </a>
              </li>
              <li class="nav-item d-inline">
                <a class="nav-link" href="/Customerform">
                  Add Customer
                </a>
              </li>
              <li class="nav-item d-inline">
                <a class="nav-link" href="#">
                  Add Product
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <h2 class="text-md-center">Customer Form</h2>
      <div class=" container container-md border-black border-3 shadow">
        <form>
          <ul>
            <li>
              <label class="fw-bold" htmlFor="id">
                Customer Id
              </label>
              <input
                class="form-control"
                type="number"
                name="Name"
                min="0"
                placeholder="Customer id"
                onChange={(e) => setcustomerid(e.target.value)}
              />
            </li>
            <li>
              <label class="fw-bold" htmlFor="Name">
                Name
              </label>
              <input
                class="form-control"
                type="text"
                name="Name"
                placeholder="name"
                onChange={(e) => setcustomername(e.target.value)}
              />
            </li>
            <li>
              <label class="fw-bold" htmlFor="Phoneno">
                Phone no
              </label>
              <input
                class="form-control"
                type="number"
                name="Name"
                min="0"
                placeholder="Phone no"
                onChange={(e) => setcustomerphoneno(e.target.value)}
              />
            </li>
            <li>
              <input
                onClick={customerinfo}
                class="btn btn-success w-30"
                type="submit"
                name="Submit"
              />
            </li>
          </ul>
        </form>
      </div>
    </>
  );
}
export default Customerform;
