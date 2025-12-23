import { state } from './store.js';

export function addToCart(product) {
    const existing = state.cart.find(p => p.id === product.id);

    if (existing) {
        existing.qty += 1;
    } else {
        state.cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(state.cart));
}

export function renderCart() {
    const cartEl = document.getElementById("cart");
    cartEl.innerHTML = "";

    state.cart.forEach(item => {
        cartEl.innerHTML += `
            <div>
                <span>&{item.title}</span>
                <span>&{item.qty}</span>
            </div>
            `;
    });
}