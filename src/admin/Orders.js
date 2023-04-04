import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
// import { Link } from "react-router-dom";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
// import  Moment from "react-moment"
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrders = (orders) => {
    if (orders.length > 0) {
      return (
        <h1 className="text-success display-6">
          Total Orders: {orders.length}
        </h1>
      );
    } else {
      return <h1 className="text-danger">No orders</h1>;
    }
  };

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
        <input type="text" value={value} className="form-control" readOnly />
      </div>
    </div>
  );

  const handleStatusChange = (event, orderId) => {
    updateOrderStatus(user._id, token, orderId, event.target.value).then(
      (data) => {
        if (data.error) {
          console.log("Status Update failed");
        } else {
          loadOrders();
        }
      }
    );
  };

  const showStatus = (order) => (
    <div className="form-group">
      <h3 className="mark mb-4"> Status: {order.status}</h3>
      <select
        className="form-control"
        onChange={(e) => handleStatusChange(e, order._id)}
      >
        <option>Update Status</option>
        {statusValues.map((stat, ind) => (
          <option key={ind} value={stat}>
            {stat}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <Layout
      title="Orders"
      description={`Hello ${user.name}, manage all orders here`}
    >
      <div className="row">
        <div className="col-md-4 offset-md-4">
          {showOrders(orders)}
          {orders.map((order, ind) => {
            return (
              <div
                className="mt-5"
                key={ind}
                style={{ borderBottom: "5px solid blue" }}
              >
                <h2 className="mb-5">
                  <span className="bg-primary">Order id: {order._id}</span>
                </h2>
                <ul className="list-group mb-2">
                  <li className="list-group-item">{showStatus(order)}</li>
                  <li className="list-group-item">
                    Transaction Id: {order.transaction_id}
                  </li>
                  <li className="list-group-item">Amount: ${order.amount}</li>
                  <li className="list-group-item">
                    Ordered By: {order.user.name}
                  </li>
                  <li className="list-group-item">
                    Ordered on: {moment(order.createAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    Delivery Address: {order.address}
                  </li>
                </ul>
                <h5 className="mt-4 mb-4">
                  Total Product Ordered: {order.products.length}
                </h5>
                {order.products.map((product, index) => (
                  <div
                    className="mb-4"
                    key={index}
                    style={{ padding: "20px", border: "1px solid indigo" }}
                  >
                    {showInput("Product Name", product.name)}
                    {showInput("Product Price", product.price)}
                    {showInput("Product Total", product.count)}
                    {showInput("Product Id", product._id)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
