import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Customerform.css";
import logo from "./assets/logo1_ramayworldzone.png";
import backgroundvideo from "./assets/back_video.mp4";
import Sidebar from "./Sidebar";

function Productform() {
  const [productname, setProductName] = useState("");
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from MongoDB
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8081/Productform");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products.");
    }
  };

  // Handle form submission
  const productInfo = async (event) => {
    event.preventDefault();

    if (!productname) {
      toast.warn("Product name is required.");
      return;
    }

    try {
      if (editProductId) {
        // Update existing product
        await axios.put(`http://localhost:8081/Productform/${editProductId}`, {
          productname,
        });
        toast.success("Product updated successfully");
      } else {
        // Add new product
        await axios.post("http://localhost:8081/Productform", { productname });
        toast.success("Product added successfully");
      }

      setEditProductId(null);
      setProductName("");
      fetchProducts(); // refresh list
    } catch (err) {
      console.error("Error saving product:", err);
      toast.error("Error occurred while saving product.");
    }
  };

  // Edit button logic
  const handleEdit = (product) => {
    setProductName(product.productname);
    setEditProductId(product._id);
  };

  // Filter by search term
  const filteredProducts = products.filter((product) =>
    product.productname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ToastContainer />
      <div className="video-background">
        <video autoPlay loop muted>
          <source src={backgroundvideo} type="video/mp4" />
        </video>
      </div>

      <div className="container-fluid">
        <div className="row">
          <Sidebar />

          <main className="col-12 col-md-9 mt-4 mt-md-0">
            <div className="p-4 bg-light rounded shadow">
              <h3>Product Form</h3>
              <div className="container border-black border-3 shadow col-md-6">
                <form onSubmit={productInfo}>
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
                        onChange={(e) => setProductName(e.target.value)}
                      />
                    </li>
                    <li>
                      <input
                        className="btn btn-success w-30"
                        type="submit"
                        value={editProductId ? "Update" : "Submit"}
                      />
                    </li>
                  </ul>
                </form>
              </div>

              {/* Search box */}
              <div className="mt-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by product name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Product list table */}
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
                        <tr key={product._id}>
                          <td>{product._id}</td>
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
                        <td colSpan="3" className="text-center">
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
