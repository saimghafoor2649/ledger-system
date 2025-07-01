import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./signup.css";
import patternbg from "./assets/patternbg.jpg";
import logo from "./assets/logo1_ramayworldzone.png";
import "./Dashboard.jsx";

function Login() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (!validateEmail(email)) {
      setEmailError(
        "Please enter a valid email address (e.g., example@gmail.com)."
      );
    } else {
      setEmailError("");
    }
  };

  const login = async (event) => {
    event.preventDefault();

    if (!Email || !Password) {
      toast.error("All fields are required.");
      return;
    }
    if (emailError) {
      toast.error(emailError);
      return;
    }
    if (Email === "admin@gmail.com" && Password === "Admin12345@") {
      toast.success("Welcome, Admin!");
      navigate("/Admin");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8081/api/auth/login", {
        Email,
        Password,
      });
      toast.success(res.data.message);
      navigate("/Dashboard");
    } catch (err) {
      console.error(err);
      if (err.response) {
        toast.error(err.response.data.error || "Login failed");
      } else {
        toast.error("Failed to login. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="signup-container">
        <h2 className="text-center">Login</h2>
        <form onSubmit={login}>
          <ul>
            <li>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="Email"
                className="form-control"
                onChange={handleEmailChange}
                value={Email}
              />
              {emailError && (
                <p style={{ color: "red", fontSize: "14px" }}>{emailError}</p>
              )}
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                value={Password}
              />
            </li>
            <li>
              <button type="submit" className="btn btn-success w-100">
                Login
              </button>
            </li>
          </ul>
        </form>
        <p className="text-center">First You create the account</p>
        <button
          onClick={() => navigate("/register")}
          className="btn btn-default border w-100 bg-light mb-1"
        >
          Signup
        </button>
        <p className="text-center mt-3">
          <button
            onClick={() => navigate("/forgot-password")}
            className="btn btn-link"
          >
            Forgot Password?
          </button>
        </p>
      </div>
    </>
  );
}

export default Login;
