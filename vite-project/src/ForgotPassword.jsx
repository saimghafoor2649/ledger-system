import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./signup.css";

function ForgotPassword() {
  const [Email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/api/auth/forgot-password", {
        Email,
      });
      toast.success("Password reset link sent to your email");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to send reset link");
    }
  };

  return (
    <div className="signup-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
