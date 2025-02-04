import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
      alert("All fields are required.");
      return;
    }
    if (emailError) {
      alert(emailError);
      return;
    }
    if (Email === "admin@gmail.com" && Password === "Admin12345@") {
      alert("Welcome, Admin!");
      navigate("/Admin"); // Navigate to the Admin page
      return;
    }
    try {
      const res = await axios.post("http://localhost:8081/login", {
        Email,
        Password,
      });
      alert(res.data.message);
      navigate("/Dashboard");
    } catch (err) {
      console.error(err);
      if (err.response) {
        alert(err.response.data.error);
      } else {
        alert("Failed to login. Please try again.");
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
        <form>
          <ul>
            <li>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="Email"
                className="form-control"
                onChange={handleEmailChange}
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
                //onChange={handlePasswordChange}
              />
            </li>

            <li>
              <input
                onClick={login}
                type="submit"
                name="submit"
                className="btn btn-success w-100"
              />
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
      </div>
    </>
  );
}
export default Login;
