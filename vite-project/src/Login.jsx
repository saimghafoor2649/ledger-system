import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.css";
function Login() {
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const handlesignupRedirect = () => {
    navigate("/register");
  };
  const handlesHomeRedirect = () => {
    navigate("/home");
  };
  const login = async (event) => {
    event.preventDefault();

    if (!Email || !Password) {
      alert("All fields are required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8081/login", {
        Email,
        Password,
      });
      alert(res.data.message);
      navigate("/home");
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
    <div className="signup-container">
      <h2 class="text-center">Login</h2>
      <form>
        <ul>
          <li>
            <label htmlFor="email">Email</label>
          </li>
          <li>
            <input
              type="text"
              name="Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="password">Password</label>
          </li>
          <li>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </li>
          <li>
            <input
              onClick={login}
              type="submit"
              name="submit"
              className="btn btn-success w-100"
            ></input>
          </li>
        </ul>
      </form>
      <p className="text-center">First You create the account</p>
      <button
        onClick={handlesignupRedirect}
        class="btn btn-default border w-100 bg-light mb-1"
      >
        Signup
      </button>
    </div>
  );
}
export default Login;
