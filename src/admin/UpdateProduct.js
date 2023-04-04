import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
// import { Link } from "react-router-dom";
import { getProduct, getCategories, updateProduct } from "./apiAdmin";
import { Redirect } from "react-router-dom";

const UpdateProduct = (props) => {
  const { token, user } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: "",
    formData: "",
  });

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data.message,
          formData: new FormData(),
        });
      }
    });
  };

  const init = (productId) => {
    getProduct(productId).then((data) => {
      console.log(data);
      if (data.error) setValues({ ...values, error: data.error });
      else {
        setValues({
          ...values,
          name: data.data.name,
          description: data.data.description,
          price: data.data.price,
          category: data.data.category._id,
          shipping: data.data.shipping,
          quantity: data.data.quantity,
          formData: new FormData(),
        });
        initCategories();
      }
    });
  };

  useEffect(() => {
    init(props.match.params.productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values; // eslint-disable-line no-unused-vars

  const handleChange = (nameVal) => (event) => {
    const value =
      nameVal === "photo" ? event.target.files[0] : event.target.value;
    // console.log("Name: ", nameVal, " , Value: ",value)
    setValues({ ...values, [nameVal]: value });
    formData.set(nameVal, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(props.match.params.productId, user._id, token, formData).then(
      (data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            name: "",
            description: "",
            price: "",
            photo: "",
            quantity: "",
            loading: false,
            redirectToProfile: true,
            createdProduct: data.name,
            error: false,
          });
        }
      }
    );
  };

  const productForm = () => {
    return (
      <form className="mb-3" onSubmit={handleSubmit}>
        <div className="form-group m-4">
          <h6>Post Photo</h6>
          <label className="btn btn-secondary">
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange("photo")}
            />
          </label>
        </div>

        <div className="form-group m-4">
          <label className="text-muted">Name</label>
          <input
            type="text"
            onChange={handleChange("name")}
            className="form-control"
            value={name}
          />
        </div>

        <div className="form-group m-4">
          <label className="text-muted">description</label>
          <textarea
            onChange={handleChange("description")}
            className="form-control"
            value={description}
          />
        </div>

        <div className="form-group m-4">
          <label className="text-muted">Price</label>
          <input
            type="number"
            onChange={handleChange("price")}
            className="form-control"
            value={price}
          />
        </div>

        <div className="form-group m-4">
          <label className="text-muted">Category</label>
          <select
            onChange={handleChange("category")}
            className="form-control"
            value={category}
          >
            {categories &&
              categories.map((e, i) => (
                <option value={e._id} key={i}>
                  {e.name}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group m-4">
          <label className="text-muted">Quantity</label>
          <input
            type="number"
            onChange={handleChange("quantity")}
            className="form-control"
            value={quantity}
          />
        </div>

        <div className="form-group m-4">
          <label className="text-muted">Shipping</label>
          <select
            onChange={handleChange("shipping")}
            className="form-control"
            value={shipping}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        <center>
          <button className="btn btn-outline-success">Update Product</button>
        </center>
      </form>
    );
  };

  const dispError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        <h4>{error}</h4>
      </div>
    );
  };

  const dispSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>{`${createdProduct} Updated!`}</h4>
      </div>
    );
  };

  const dispLoading = () => {
    return (
      <div
        className="alert alert-primary"
        style={{ display: loading ? "" : "none" }}
      >
        <h4>Loading...</h4>
      </div>
    );
  };

  const redirectUser = () => {
    if (redirectToProfile & !error) return <Redirect to="/admin/dashboard" />;
  };

  return (
    <Layout
      title="Update Proudct"
      description={`Hello ${user.name}`}
      className="container col-md-6 offset-md-3"
    >
      {dispError()}
      {dispLoading()}
      {dispSuccess()}
      {productForm()}
      {redirectUser()}
    </Layout>
  );
};

export default UpdateProduct;
