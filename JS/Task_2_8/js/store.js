export const state = {
  cart: JSON.parse(localStorage.getItem("cart")) || []
};

export function saveCart() {
  localStorage.setItem("cart", JSON.stringify(state.cart));
}