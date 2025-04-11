export const ITEMS_PER_PAGE = 10;
export const AUTH_API_ENDPOINT = "http://localhost:8080/api/v1/auth"
export const USER_API_ENDPOINT = "http://localhost:8080/api/v1/user"
export const PRODUCT_API_ENDPOINT = "http://localhost:8080/api/v1/products"
export const CATEGORY_API_ENDPOINT = "http://localhost:8080/api/v1/category"
export const BRAND_API_ENDPOINT = "http://localhost:8080/api/v1/brand"
export const CART_API_ENDPOINT = "http://localhost:8080/api/v1/cart"
export const ORDER_API_ENDPOINT = "http://localhost:8080/api/v1/order"

export function discountedPrice(item){
    return Math.floor(item.price*(1-item.discountPercentage/100),2)
}