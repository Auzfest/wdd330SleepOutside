const baseURL = import.meta.env.VITE_SERVER_URL


function convertToJson(res) {
  const jsonResponse = res.json();
  if (res.ok) {
    return jsonResponse
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export async function getProductByCategory(category) {
  console.log(category);
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  console.log(options);
  const url = await fetch(baseURL + "checkout/", options).then(convertToJson);;
  console.log(url);
  return url;
}

export async function loginRequest(creds) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  };
  const response = await fetch(baseURL + "login", options).then(convertToJson);
  return response.accessToken;
}

export async function getOrders(token) {
  const options = {
    method: "GET ",
    headers: {
      'Authorization': `Bearer ${token}`
      },
  };
  const response = await fetch(baseURL + "orders", options).then(convertToJson);
  return response;
}
