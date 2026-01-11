// export function renderProducts(list) {
//     const container = document.getElementById("products");
//     if (!container) return;

//     container.innerHTML = "";

//     list.forEach(product => {
//         container.innerHTML += `
//             <div class="card">
//                 <img src="${product.image}">
//                 <h3>${product.title}</h3>
//                 <p>$${product.price}</p>
//                 <button data-id="${product.id}">Add</button>
//             </div>
//         `;
//     });
// }


import { state } from "./store.js";
import { removeFromCart } from "./cart.js";

export function renderProducts(list) {
    const container = document.getElementById("products");
    if(!container) return;

    container.innerHTML = "";

    list.forEach(product => {
        container.innerHTML += `
            <div class="card">
                <img src="${product.image}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <button data-id="${product.id}">Add</button>
            </div>
        `;
    });
}

export function renderCart() {
    const cartEl = document.getElementById("cart");
    if(!cartEl) return;

    if(state.cart.length === 0) {
        cartEl.innerHTML = "<p> Cart is empty</p>";
        return;
    }

    let total = 0;

    cartEl.innerHTML = `
        <h2>Cart</h2>
        <div class="cart-items"></div>
        <p class="total"></p>
    `;

    const itemsEl = cartEl.querySelector(".cart-items");

    state.cart.forEach(item => {
        total += item.price * item.qty;

        itemsEl.innerHTML += `
            <div class="cart-item">
                <span>${item.title} x ${item.qty}</span>
                <button data-id="${item.id}">X</button>
            </div>
        `;
    });

    cartEl.querySelector(".total").textContent =
        `Total: $${total.toFixed(2)}`;

    itemsEl.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
            removeFromCart(Number(btn.dataset.id));
            renderCart();
        });
    });
}