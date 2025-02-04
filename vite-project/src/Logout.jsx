import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8081/logout", {
        method: "POST",
        credentials: "include", // Include cookies in the request
      });
      if (response.ok) {
        alert("Logged out successfully");
        navigate("/"); // Redirect to the login page
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
