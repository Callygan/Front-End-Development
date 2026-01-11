// import { state } from './store.js';

// export function addToCart(product) {
//     const existing = state.cart.find(p => p.id === product.id);

//     if (existing) {
//         existing.qty += 1;
//     } else {
//         state.cart.push({ ...product, qty: 1 });
//     }

//     localStorage.setItem("cart", JSON.stringify(state.cart));
// }

// export function renderCart() {
//     const cartEl = document.getElementById("cart");
//     cartEl.innerHTML = "";

//     state.cart.forEach(item => {
//         cartEl.innerHTML += `
//             <div>
//                 <span>&{item.title}</span>
//                 <span>&{item.qty}</span>
//             </div>
//             `;
//     });
// }

import { state, saveCart } from "./store.js";
import { products } from "./data.js";

export function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if(!product) return;

    const existing = state.cart.find(item => item.id === productId);

    if (existing) {
        existing.qty += 1;
    } else {
        state.cart.push({ ...product, qty: 1});
    }
    saveCart();
}

export function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    saveCart();
}