import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Customerform.css";
import logo from "./assets/logo1_ramayworldzone.png";
import Logout from "./Logout";

function Sidebar() {
  return (
    <>
      <aside className="col-12 col-md-2 bg-secondary p-3 rounded hover-container">
        <nav className="navbar navbar-expand-md navbar-dark flex-md-column">
          <button
            className="navbar-toggler mb-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="sidebarMenu">
            <ul className="navbar-nav flex-column w-100">
              <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />{" "}
                {/* Display the logo */}
              </div>
              <li className="nav-item">
                <a className="nav-link text-white active" href="/">
                  <Logout></Logout>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/Dashboard">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/Customerform">
                  Add Customer
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/Productform">
                  Add Product
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/CreditVoucher">
                  Add CreditVoucher
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
}
export default Sidebar;
