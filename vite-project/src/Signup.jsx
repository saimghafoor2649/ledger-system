import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation
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
      errors.push("Password must be greater than 10 characters.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must include at least one uppercase letter.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must include at least one special character.");
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
      alert("All fields are required.");
      return;
    }
    if (emailError) {
      alert("Please fix the email error before proceeding.");
      return;
    }
    if (Password !== ConfirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      // Directly register the user without OTP
      const res = await axios.post("http://localhost:8081/api/auth/register", {
        Name,
        Email,
        Password,
        ConfirmPassword,
      });
      alert("Registration successful!");
      navigate("/");
    } catch (res) {
      console.error(res);
      alert("Registration failed.");
    }
  };

  return (
    <div>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="signup-container">
        <h2 className="text-center">Register</h2>
        <form>
          <ul>
            <li>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor="email">Email</label>
              <input
                type="text"
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
                className="form-control"
                onChange={handlePasswordChange}
              />
            </li>
            {passwordError && (
              <p style={{ color: "red", fontSize: "14px" }}>{passwordError}</p>
            )}
            <li>
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </li>
            <li>
              <button
                type="submit"
                className="btn btn-success w-100"
                onClick={handleRegistration}
              >
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
