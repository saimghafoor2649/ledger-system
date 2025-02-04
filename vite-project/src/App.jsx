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
function App() {
  return (
    <BrowserRouter>
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
