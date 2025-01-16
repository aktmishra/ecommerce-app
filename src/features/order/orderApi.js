import { ORDER_API_ENDPOINT } from "../../app/constant";

export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${ORDER_API_ENDPOINT}/create`, {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders() {
  return new Promise(async (resolve) => {
    // TODO-- We will not hard-code here server url  here
    const response = await fetch("http://localhost:8080/orders");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchOrdersByFilters(sort, pagination) {
  //  sort = {_sort="price", _order="asc"}
  //  pagination = {_page=1, _limit=10}
  let queryString = "";

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    // TODO-- We will not hard-code here server url  here
    const response = await fetch("http://localhost:8080/orders?" + queryString);
    const data = await response.json();
    // const totalItems = response.headers.get("X-Total-Count");

    resolve({ data:{orders:data.data} });
  });
}

export function updateOrder(order){
 return new Promise(async (resolve) => {
  const response = await fetch("http://localhost:8080/orders/"+order.id, {
    method:"PATCH",
    body: JSON.stringify(order),
    headers:{"content-type":"application/json"}
  })

  const data = await response.json();
  resolve({data})
 })
}