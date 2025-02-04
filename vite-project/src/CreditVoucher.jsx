import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Customerform.css";
import logo from "./assets/logo1_ramayworldzone.png";
import "./Sidebar";
import Sidebar from "./Sidebar";

function CreditVoucher() {
  return (
    <>
      <div class="container-fluid">
        <div class="row">
          <Sidebar></Sidebar>
          <main className="col-12 col-md-9 mt-4 mt-md-0">
            <div className="p-4 bg-light rounded shadow">
              <h3>CreditVoucher</h3>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
export default CreditVoucher;
