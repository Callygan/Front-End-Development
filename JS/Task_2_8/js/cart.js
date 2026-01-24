import { state, saveCart } from "./store.js";
import { products } from "./data.js";
import { parsePrice } from "./utils/price.js";

function getCartElements() {
    return {
        cart: document.getElementById("cart"),
        overlay: document.getElementById("cart-overlay"),
        closeBtn: document.getElementById("cart-close"),
    };
}

export function openCart() {
    const { cart, overlay } = getCartElements();
    if (!cart || !overlay) return;

    cart.classList.add("open");
    overlay.classList.add("open");
}

export function closeCart() {
    const { cart, overlay } = getCartElements();
    if (!cart || !overlay) return;

    cart.classList.remove("open");
    overlay.classList.remove("open");
}

export function initCartUi() {
    const { overlay, closeBtn } = getCartElements();

    if (overlay) overlay.addEventListener("click", closeCart);
    if (closeBtn) closeBtn.addEventListener("click", closeCart);

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeCart();
    });
}

/* ======================
   ADD / REMOVE
====================== */

export function addToCart(productId) {
    const id = Number(productId);
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existing = state.cart.find(item => item.id === id);

    if (existing) {
        existing.qty += 1;
    } else {
        state.cart.push({
            ...product,
            price: parsePrice(product.price),
            qty: 1,
        });
    }

    saveCart();
    renderCart();
}

export function removeFromCart(productId) {
    const id = Number(productId);
    state.cart = state.cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
}

/* ======================
   QUANTITY
====================== */

function changeQty(productId, delta) {
    const id = Number(productId);
    const item = state.cart.find(i => i.id === id);
    if (!item) return;

    item.qty = Math.max(0, item.qty + delta);

    saveCart();
    renderCart();
}

/* ======================
   RENDER
====================== */

export function renderCart() {
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");

    if (!container || !totalEl) return;

    container.innerHTML = "";

    let total = 0;

    state.cart.forEach(item => {
        total += item.price * item.qty;

        container.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="cart-item-details">
                        <h4>${item.title}</h4>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-qty">
                        <button data-dec="${item.id}">−</button>
                        <span>${item.qty}</span>
                        <button data-inc="${item.id}">+</button>
                    </div>
                    <button data-id="${item.id}" class="cart-remove-btn">Remove <span>X</span></button>
                </div>
            </div>
        `;
    });

    totalEl.textContent = `$${total.toFixed(2)}`;

    bindQtyButtons();
}

/* ======================
   EVENTS
====================== */

function bindQtyButtons() {
    document.querySelectorAll("[data-inc]").forEach(btn => {
        btn.addEventListener("click", () =>
            changeQty(btn.dataset.inc, 1)
        );
    });

    document.querySelectorAll("[data-dec]").forEach(btn => {

        btn.addEventListener("click", () =>
            changeQty(btn.dataset.dec, -1)
        );
    });

    document.querySelectorAll(".cart-remove-btn").forEach(btn => {
        btn.addEventListener("click", () => 
            removeFromCart(btn.dataset.id)
        );
    });
}
