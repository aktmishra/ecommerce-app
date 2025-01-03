export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    // TODO-- We will not hard-code here server url  here
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchProductsByFilters(filter, sort, pagination) {
  //  filter = {"category":"smartpone"}
  //  filter = {"category":["smartphone", "laptop"] } for multiple filter
  //  sort = {_sort="price", _order="asc"}
  //  pagination = {_page=1, _limit=10}
  //  TODO : on server we will support multiple values for filter
  //  TODO : server will filter deleted product in case of non-admin user
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    // TODO-- We will not hard-code here server url  here
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    const totalItems = response.headers.get("X-Total-Count");
    console.log(data);

    resolve({ data: { products: data.data, totalItems: +totalItems } });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    // TODO-- We will not hard-code here server url  here
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchBrands() {
  return new Promise(async (resolve) => {
    // TODO-- We will not hard-code here server url  here
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    // TODO-- We will not hard-code here server url  here
    const response = await fetch(`http://localhost:8080/products?id=${id}`);
    const data = await response.json();
    resolve({ data: data[0] });
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products/" + product.id,
      {
        method: "PATCH",
        body: JSON.stringify(product),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
