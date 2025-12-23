export const state = {
    cart: JSON.parse(localStorage.getItem("cart")) || []
};