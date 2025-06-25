import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Customerform from "./Customerform";
import Productform from "./Productform";
import CreditVoucher from "./CreditVoucher";
import Admin from "./Admin";
import Logout from "./Logout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <BrowserRouter>
      {/* Toast Container - should be at root level */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        <Route path="/Customerform" element={<Customerform />}></Route>
        <Route path="/Productform" element={<Productform />}></Route>
        <Route path="/CreditVoucher" element={<CreditVoucher />}></Route>
        <Route path="/Admin" element={<Admin />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
