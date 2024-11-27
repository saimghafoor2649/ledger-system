import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.css";

function Signup() {
  const navigate = useNavigate();

  const handleloginRedirect = () => {
    navigate("/login");
  };

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
  const register = async (event) => {
    event.preventDefault();
    if (!Name || !Email || !Password || !ConfirmPassword) {
      alert("All fields are required.");
      return;
    }
    if (Password !== ConfirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8081/register", {
        Name,
        Email,
        Password,
        ConfirmPassword,
      });
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Failed to register.");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="text-center">Register</h2>
      <form>
        <ul>
          <li>
            <label htmlFor="name">Name</label>
          </li>
          <li>
            <input
              type="text"
              name="fname"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="email">Email</label>
          </li>
          <li>
            <input
              type="text"
              name="Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
          </li>
          <li>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handlePasswordChange}
            />
          </li>
          {passwordError && (
            <p style={{ color: "red", fontSize: "14px" }}>{passwordError}</p>
          )}
          <li>
            <label htmlFor="confirmpassword">Confirm Password</label>
          </li>
          <li>
            <input
              type="password"
              name="confirmpassword"
              className="form-control"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </li>
          <li>
            <input
              type="submit"
              name="submit"
              className="btn btn-success w-100"
              onClick={register}
            />
          </li>
        </ul>
      </form>
      <p className="text-center">Already have an account?</p>
      <button
        onClick={handleloginRedirect}
        className="btn btn-default border w-100 bg-light mb-1"
      >
        Login
      </button>
    </div>
  );
}

export default Signup;
