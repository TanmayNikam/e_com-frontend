import { API } from "../config.js";

export const createCategory = (userId, category, token) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "applcation/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      //  console.log(response)
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createProduct = (userId, product, token) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "applcation/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      //  console.log(response)
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      //  console.log(response)
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const listOrders = (userId, token) => {
  return fetch(`${API}/order/list/${userId}`, {
    method: "GET",
    headers: {
      Accept: "applcation/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      //  console.log(response)
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getStatusValues = (userId, token) => {
  return fetch(`${API}/order/status-values/${userId}`, {
    method: "GET",
    headers: {
      Accept: "applcation/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateOrderStatus = (userId, token, orderId, status) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "applcation/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status, orderId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getProducts = () => {
  return fetch(`${API}/products?limit=undefined`, {
    method: "GET",
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${userId}/${productId}`, {
    method: "DELETE",
    headers: {
      Accept: "applcation/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/update/${userId}/${productId}`, {
    method: "PUT",
    headers: {
      Accept: "applcation/json",  
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
