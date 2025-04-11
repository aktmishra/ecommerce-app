import { ORDER_API_ENDPOINT, USER_API_ENDPOINT } from "../../app/constant";

export function fetchLoggedInUserDetails(userId) {
  return new Promise(async (resolve) =>{
    const response = await fetch(`${USER_API_ENDPOINT}/${userId}`) 
    const data = await response.json()
    console.log(data)
    resolve({data})
  }
  );
}

export function fetchLoggedInUserOrder(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${ORDER_API_ENDPOINT}/${userId}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(updateObject) {
  return new Promise(async (resolve) => {
    const response = await fetch( `${USER_API_ENDPOINT}/edit/${updateObject.id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObject),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}