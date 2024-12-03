export function fetchAllProducts() {
    return new Promise(async (resolve) =>{
      // TODO-- We will not hard-code here server url  here
      const response = await fetch('http://localhost:8080/products') 
      const data = await response.json()
      resolve({data})
    }
    );
  }