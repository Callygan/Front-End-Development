import { state, saveCart } from "./store.js";
import { products } from "./data.js";
import { parsePrice } from "./utils/price.js";

function getCartElements() {
    return {
        cart: document.querySelector("[data-cart]"),
        overlay: document.querySelector("[data-cart-overlay]"),
        closeBtn: document.querySelector("[data-cart-close]"),
        countEl: document.querySelector("[data-cart-count]"),
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
    const { cart, overlay, closeBtn } = getCartElements();

    if (cart) {
        cart.addEventListener("click", (e) => e.stopPropagation());
    }

    if (overlay) {
        overlay.addEventListener("click", (e) => {
            if (e.target.closest("[data-cart]")) return;
            closeCart();
        });
    }
    if (closeBtn) closeBtn.addEventListener("click", closeCart);

    const checkoutBtn = document.querySelector("[data-cart-checkout]");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", handleCheckout);
    }

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeCart();
    });
}

function handleCheckout() {
    if (!state.cart.length) {
        showToast("Your cart is empty.");
        closeCart();
        return;
    }

    state.cart = [];
    saveCart();
    renderCart();
    closeCart();
    showToast("Checkout successful!");
}

function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    // force reflow to allow transition
    void toast.offsetWidth;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 250);
    }, 2000);
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

    item.qty = Math.max(1, item.qty + delta);

    saveCart();
    renderCart();
}

/* ======================
   RENDER
====================== */

export function renderCart() {
    const container = document.querySelector("[data-cart-items]");
    const totalEl = document.querySelector("[data-cart-total]");
    const { countEl } = getCartElements();

    if (!container || !totalEl) return;

    container.innerHTML = "";

    let total = 0;

    state.cart.forEach(item => {
        total += item.price * item.qty;

        container.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.title}">
                    <div>
                        <h4>${item.title}</h4>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <div>
                        <button data-dec="${item.id}" ${item.qty <= 1 ? "disabled" : ""}>−</button>
                        <span>${item.qty}</span>
                        <button data-inc="${item.id}">+</button>
                    </div>
                    <button data-id="${item.id}" data-cart-remove-item>Remove <span>X</span></button>
                </div>
            </div>
        `;
    });

    totalEl.textContent = `$${total.toFixed(2)}`;

    if (countEl) {
        const distinct = state.cart.length;
        countEl.textContent = distinct;
        countEl.classList.toggle("is-zero", distinct === 0);
    }

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

    document.querySelectorAll("[data-cart-remove-item]").forEach(btn => {
        btn.addEventListener("click", () => 
            removeFromCart(btn.dataset.id)
        );
    });
}
