export function fetchLoggedInUserDetails(userId) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/users/'+userId) 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function fetchLoggedInUserOrder(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/orders/?user.id=" + userId
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(updateObject) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/"+updateObject.id, {
      method: "PATCH",
      body: JSON.stringify(updateObject),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}