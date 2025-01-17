import { CART_API_ENDPOINT } from "../../app/constant";

export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${CART_API_ENDPOINT}/create`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response
      reject(errorData);
    }
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchCartItemsByUserId(userId) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${CART_API_ENDPOINT}/${userId}`);
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response
      reject(errorData);
    }
    const data = await response.json();
    console.log(data)
    resolve({ data });
  });
}

export function updateProductQuantity(itemObject) {
  return new Promise(async (resolve) => {
    const response = await fetch(
       `${CART_API_ENDPOINT}/edit/${itemObject.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({quantity:itemObject.quantity}),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response
      reject(errorData);
    }
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

export function removeProductFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${CART_API_ENDPOINT}/${itemId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response
      reject(errorData);
    }
    const data = await response.json();
    // const data = await response.json(); // here data is undefined
    console.log(response); // undefined
    resolve({ data });
  });
}

// export function resetCart(userId) {
//   // get all items of user's cart - and then delete each
//   return new Promise(async (resolve) => {
//     const response = await fetchCartItemsByUserId(userId);
//     const items = response.data.data;
//     for (let item of items) {
//      await removeProductFromCart(item.id);
//     }
//     resolve({ status: "success" });
//   });
// }
