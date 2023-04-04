import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) console.log(data.error);
      else setProducts(data.data);
    });
  };
  const removeProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data & data.error) console.log(data.error);
      else loadProducts();
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title="Manage Products"
      description={`Perform CRUD operation on products`}
    >
      <h2 className="mb-4">Manage Products</h2>
      <div className="row">
        <div className="col-12">
          <h3 className="text-center">Total {products.length} products</h3>
          <hr />
          <ul className="list-group">
            {products.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong>{item.name}</strong>
                <Link to={`/admin/product/update/${item._id}`}>
                  <span className="btn btn-warning rounded-pill">Update</span>
                </Link>
                <span
                  onClick={() => removeProduct(item._id)}
                  className="btn btn-danger rounded-pill"
                >
                  Delete
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
