import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./signup.css";
import patternbg from "./assets/patternbg.jpg";
import logo from "./assets/logo1_ramayworldzone.png";

function Signup() {
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (!validateEmail(email)) {
      setEmailError("Invalid email format. Please enter a valid email.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 10) {
      errors.push("Password must be at least 10 characters.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Include at least one uppercase letter.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Include at least one special character.");
    }
    return errors;
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
    const errors = validatePassword(password);
    setPasswordError(errors.join(" "));
  };

  const handleRegistration = async (event) => {
    event.preventDefault();

    if (!Name || !Email || !Password || !ConfirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (emailError) {
      toast.error("Please fix the email error before proceeding.");
      return;
    }

    if (Password !== ConfirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (passwordError) {
      toast.error("Please fix the password requirements.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8081/api/auth/register", {
        Name,
        Email,
        Password,
        ConfirmPassword,
      });

      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error(error);
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="signup-container">
        <h2 className="text-center">Register</h2>
        <form onSubmit={handleRegistration}>
          <ul>
            <li>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </li>
            <li>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                value={Email}
                onChange={handleEmailChange}
                required
              />
              {emailError && (
                <p style={{ color: "red", fontSize: "14px" }}>{emailError}</p>
              )}
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                value={Password}
                onChange={handlePasswordChange}
                required
              />
              {passwordError && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {passwordError}
                </p>
              )}
            </li>
            <li>
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </li>
            <li>
              <button type="submit" className="btn btn-success w-100">
                Register
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default Signup;
