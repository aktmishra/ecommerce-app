export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchCartItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart?user=" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProductQuantity(productObject) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/cart/" + productObject.id,
      {
        method: "PATCH",
        body: JSON.stringify(productObject),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

export function removeProductFromCart(productId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + productId, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });

    // const data = await response.json(); // here data is undefined
    console.log(response); // undefined
    resolve({ data: { id: productId } });
  });
}

export function resetCart(userId) {
  // get all items of user's cart - and then delete each
  return new Promise(async (resolve) => {
    const response = await fetchCartItemsByUserId(userId);
    const items = response.data;
    for (let item of items) {
      await  removeProductFromCart(item.id);
    }
    resolve({ status: "success" });
  });
}
