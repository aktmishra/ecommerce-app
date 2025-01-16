import { USER_API_ENDPOINT } from "../../app/constant";

export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch( `${USER_API_ENDPOINT}/signup`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data)
    resolve({ data });
    
  });
}

export function fetchUser(loginInfo) {
  const email = loginInfo.email;
  const password = loginInfo.password;
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch( `${USER_API_ENDPOINT}/login`, {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({data})
      } else {
        const error = await response.json();
        reject(error)
      }
    } catch (error) {
      reject(error)
    }
      
  });
}

export function logOut() {
  return new Promise(async(resolve)=>{
    resolve({data: "success"});
  })
}
