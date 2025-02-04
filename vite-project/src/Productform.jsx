import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./Customerform.css";
import logo from "./assets/logo1_ramayworldzone.png";
import backgroundvideo from "./assets/back_video.mp4";
import "./Sidebar";
import Sidebar from "./Sidebar";

function Productform() {
  const [productname, setproductname] = useState("");
  const [products, setProducts] = useState([]); // State to store product data
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [editproductId, setEditProductId] = useState(null);
  // Handle edit button click
  const handleEdit = (product) => {
    setproductname(product.productname);
    setEditProductId(product.productid);
  };

  useEffect(() => {
    // Fetch products from the database
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8081/Productform");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []); // Empty dependency array ensures this runs once when the component loads

  const productinfo = async (event) => {
    event.preventDefault();

    if (!productname) {
      alert("All fields are required.");
      return;
    }

    if (editproductId) {
      // Update existing product
      const res = await axios.put(
        `http://localhost:8081/Productform/${editproductId}`,
        {
          productname,
        }
      );
    } else {
      // Add new product
      const res = await axios.post("http://localhost:8081/Productform", {
        productname,
      });
      if (res.status === 200 || res.status === 201) {
        alert("Added product successfully");
      } else {
        alert("Failed to add product. Please try again.");
      }
    }

    setEditProductId(null); // Clear the edit state
    setproductname(""); // Reset the input field
    setProducts([...products]); // Trigger re-render
  };

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.productname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="video-background">
        <video autoPlay loop muted>
          <source src={backgroundvideo} type="video/mp4" />
        </video>
      </div>
      <div className="container-fluid">
        <div className="row">
          <Sidebar></Sidebar>

          {/* Main Content Area */}
          <main className="col-12 col-md-9 mt-4 mt-md-0">
            <div className="p-4 bg-light rounded shadow">
              <h3>Product Form</h3>
              <div className="container border-black border-3 shadow col-md-6">
                <form>
                  <ul>
                    <li>
                      <label className="fw-bold" htmlFor="Name">
                        Product Name
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="Name"
                        placeholder="Product name"
                        value={productname}
                        onChange={(e) => setproductname(e.target.value)}
                      />
                    </li>
                    <li>
                      <input
                        onClick={productinfo}
                        className="btn btn-success w-30"
                        type="submit"
                        value={editproductId ? "Update" : "Submit"}
                      />
                    </li>
                  </ul>
                </form>
              </div>
              {/* Search Box */}
              <div className="mt-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by product name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {/* Product Table */}
              <h3 className="mt-4">Product List</h3>
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Product ID</th>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <tr key={product.productid}>
                          <td>{product.productid}</td>
                          <td>{product.productname}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleEdit(product)}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="text-center">
                          No product found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
export default Productform;
