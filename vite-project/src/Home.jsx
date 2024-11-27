import React from "react";
import "./signup.css";
function Home() {
  return (
    <div>
      <h2 className="text-center text-light shadow">Home</h2>
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
      <aside></aside>
    </div>
  );
}

export default Home;
